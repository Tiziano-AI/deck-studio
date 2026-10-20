"""Atomic immutable release promotion shared by local and hosted writers.

All writers cooperate through the stable library ``.package.lock``. Staging
belongs outside ``decks/`` on the same filesystem; this module never uploads,
grants audience access, or removes an existing release. Rename gives atomic
visibility, not a guarantee of power-loss durability on every filesystem.
"""
from __future__ import annotations

import argparse
import fcntl
import hashlib
import json
import os
import re
import shutil
import stat
import tempfile
from contextlib import contextmanager
from datetime import datetime, timezone
from pathlib import Path

from proof_identity import load_object, verify_files
from release_admission import validate_manifest_metadata


COMPONENT = re.compile(r"[A-Za-z0-9][A-Za-z0-9_-]{0,127}\Z")


class ReleaseStoreError(ValueError):
    def __init__(self, code: str, message: str, result: dict | None = None):
        super().__init__(message)
        self.code = code
        # A completed rename is never reported as though it had not happened.
        self.result = result


def safe_component(value: object) -> str:
    if not isinstance(value, str) or not COMPONENT.fullmatch(value):
        raise ReleaseStoreError("invalid_identity", "deck_id and release_id must be safe path components")
    return value


def canonical_manifest(manifest: dict, *, include_release_id: bool = True) -> bytes:
    """Semantic equality includes every field, lineage and artifact identity."""
    value = dict(manifest)
    if not include_release_id:
        value.pop("release_id", None)
    if isinstance(value.get("artifacts"), list):
        value["artifacts"] = sorted(value["artifacts"], key=lambda row: row["path"])
    return json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":"), allow_nan=False).encode("utf-8")


def automatic_release_id(manifest: dict) -> str:
    return "bundle-" + hashlib.sha256(canonical_manifest(manifest, include_release_id=False)).hexdigest()


def _directory(path: Path, *, create: bool = False) -> None:
    if create:
        try:
            path.mkdir()
        except FileExistsError:
            pass
    try:
        mode = path.lstat().st_mode
    except OSError as error:
        raise ReleaseStoreError("unreadable_directory", f"cannot inspect directory {path}: {error}") from error
    if not stat.S_ISDIR(mode):
        raise ReleaseStoreError("unsafe_directory", f"not a real directory: {path}")


def _library_root(path: Path) -> Path:
    root = Path(path).expanduser().absolute()
    root.mkdir(parents=True, exist_ok=True)
    _directory(root)
    return root.resolve()


@contextmanager
def library_write_lock(library_root: Path):
    """Lock the persistent inode; never unlink the lock file after use."""
    root = _library_root(library_root)
    flags = os.O_CREAT | os.O_RDWR | getattr(os, "O_NOFOLLOW", 0)
    try:
        descriptor = os.open(str(root / ".package.lock"), flags, 0o600)
    except OSError as error:
        raise ReleaseStoreError("unsafe_lock", f"cannot open stable library lock: {error}") from error
    try:
        if not stat.S_ISREG(os.fstat(descriptor).st_mode):
            raise ReleaseStoreError("unsafe_lock", "library lock is not a regular file")
        fcntl.flock(descriptor, fcntl.LOCK_EX)
        yield root
    finally:
        os.close(descriptor)


@contextmanager
def staging_directory(library_root: Path):
    """Create exclusive owned scratch on the library filesystem and clean it."""
    root = _library_root(library_root)
    staging = root / ".staging"
    _directory(staging, create=True)
    path = Path(tempfile.mkdtemp(prefix="package-", dir=str(staging)))
    try:
        yield path
    finally:
        # Only this invocation's exclusive scratch, never other attempts.
        if path.exists():
            shutil.rmtree(path)


def _load_manifest(path: Path) -> dict:
    try:
        if not stat.S_ISREG(path.lstat().st_mode):
            raise ValueError("manifest is not a regular file")
        return load_object(path)
    except OSError as error:
        raise ReleaseStoreError("unreadable_manifest", f"{path}: {error}") from error
    except ValueError as error:
        # load_object preserves the underlying read failure as its cause.
        if isinstance(error.__cause__, OSError):
            raise ReleaseStoreError("unreadable_manifest", f"{path}: {error}") from error
        raise ReleaseStoreError("invalid_manifest", f"{path}: {error}") from error


def _catalog_candidate(candidate: Path, deck_id: str, release_id: str) -> dict:
    """Read one complete stored candidate, without asserting new admission."""
    _directory(candidate)
    path = candidate / "deck-manifest.json"
    if not path.exists() and not path.is_symlink():
        raise ReleaseStoreError("incomplete_release", "missing deck-manifest.json")
    manifest = _load_manifest(path)
    if manifest.get("deck_id") != deck_id or manifest.get("release_id") != release_id:
        raise ReleaseStoreError("identity_mismatch", "manifest identity differs from directory")
    validate_manifest_metadata(manifest, allow_historical=True)
    if not isinstance(manifest.get("proof"), dict):
        raise ReleaseStoreError("invalid_manifest", "catalog proof must be an object")
    verify_files(candidate, manifest.get("artifacts"))
    return manifest


def _selected_catalog_candidates(root: Path, keys: set[tuple[str, str]]) -> list[dict]:
    """Read selected identities only; unrelated library trees do not decide them."""
    manifests = []
    for deck_id, release_id in sorted(keys):
        try:
            _directory(root / "decks")
            _directory(root / "decks" / deck_id)
            manifests.append(_catalog_candidate(root / "decks" / deck_id / release_id, deck_id, release_id))
        except (OSError, ValueError) as error:
            raise ReleaseStoreError("invalid_catalog_membership", f"catalog references missing or invalid release candidate {deck_id}/{release_id}: {error}") from error
    return manifests


def discover_releases(library_root: Path) -> dict:
    """List structurally complete candidates, not admission certificates.

    Per-candidate failures remain explicit without hiding valid neighbours.
    An unreadable subtree makes ``complete`` false. Historical schemas remain
    discoverable without pretending they qualify for a new selection.
    """
    root = Path(library_root)
    releases, issues = [], []
    decks = root / "decks"
    if not decks.exists() and not decks.is_symlink():
        return {"releases": releases, "issues": issues, "complete": True}
    complete = True
    try:
        _directory(decks)
        deck_paths = sorted(decks.iterdir())
    except (OSError, ReleaseStoreError) as error:
        return {"releases": [], "issues": [{"code": "unreadable_decks", "message": str(error)}], "complete": False}
    for deck in deck_paths:
        if not COMPONENT.fullmatch(deck.name):
            issues.append({"deck_id": deck.name, "code": "invalid_identity"})
            continue
        try:
            _directory(deck)
            candidates = sorted(deck.iterdir())
        except (OSError, ReleaseStoreError) as error:
            issues.append({"deck_id": deck.name, "code": "unreadable_deck", "message": str(error)})
            complete = False
            continue
        for candidate in candidates:
            issue = {"deck_id": deck.name, "release_id": candidate.name}
            try:
                safe_component(candidate.name)
                releases.append(_catalog_candidate(candidate, deck.name, candidate.name))
            except (OSError, ValueError) as error:
                issue.update(code=getattr(error, "code", "invalid_release"), message=str(error))
                issues.append(issue)
                if isinstance(error, OSError) or issue["code"] in {"unreadable_manifest", "unreadable_directory"}:
                    complete = False
    return {"releases": releases, "issues": issues, "complete": complete}


def _catalog(manifests: list[dict]) -> dict:
    rows = []
    for manifest in sorted(manifests, key=lambda item: (str(item["deck_id"]), str(item["release_id"]))):
        base = f"/decks/{manifest['deck_id']}/{manifest['release_id']}"
        rows.append({
            "deck_id": manifest["deck_id"], "title": manifest["title"],
            "audience": manifest["audience"], "desired_action": manifest["desired_action"],
            "current_release": manifest["release_id"], "visibility": manifest["visibility"],
            "slide_count": manifest["slide_count"], "proof": manifest["proof"],
            "artifacts": {"html": f"{base}/", "pdf": f"{base}/deck.pdf", "manifest": f"{base}/deck-manifest.json"},
        })
    return {"schema_version": 1, "generated_at": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"), "decks": rows}


def _catalog_keys(manifests: list[dict]) -> set[tuple[str, str]]:
    """Caller records choose membership only, never supply catalog metadata."""
    if not isinstance(manifests, list) or any(not isinstance(row, dict) for row in manifests):
        raise ReleaseStoreError("invalid_catalog_membership", "catalog membership must be a list of release identity objects")
    return {(safe_component(row.get("deck_id")), safe_component(row.get("release_id"))) for row in manifests}


def _write_catalog_locked(root: Path, manifests: list[dict], *, preserve_existing: bool) -> list[dict]:
    keys = _catalog_keys(manifests)
    # Re-read stored owners rather than copying caller-provided metadata.
    if preserve_existing:
        found = discover_releases(root)
        issues = found["issues"]
        if not found["complete"]:
            raise ReleaseStoreError("incomplete_scan", "cannot reconstruct catalog: library scan incomplete")
        available = {(m["deck_id"], m["release_id"]): m for m in found["releases"]}
        missing = keys - available.keys()
        if missing:
            raise ReleaseStoreError("invalid_catalog_membership", f"catalog references missing or invalid release candidates: {sorted(missing)}")
        manifests = list(available.values())
    else:
        manifests, issues = _selected_catalog_candidates(root, keys), []
    descriptor, name = tempfile.mkstemp(prefix=".catalog-", suffix=".json", dir=str(root))
    temporary = Path(name)
    try:
        with os.fdopen(descriptor, "w", encoding="utf-8") as handle:
            json.dump(_catalog(manifests), handle, ensure_ascii=False, indent=2)
            handle.write("\n")
            handle.flush()
        os.replace(temporary, root / "catalog.json")
    finally:
        temporary.unlink(missing_ok=True)
    return issues


def write_catalog(library_root: Path, manifests: list[dict], *, preserve_existing: bool = False) -> list[dict]:
    """Reconstruct the index; input records select identities, not metadata."""
    with library_write_lock(library_root) as root:
        return _write_catalog_locked(root, manifests, preserve_existing=preserve_existing)


def promote_release(staged_dir: Path, library_root: Path, *, deck_id: str | None = None,
                    release_id: str | None = None, catalog_manifests: list[dict] | None = None,
                    preserve_existing_catalog: bool = True) -> dict:
    """Admit a prepared bundle, promote atomically, then replace the catalog.

    The staging directory is consumed only on promotion, never on conflict or
    identical retry. Callers retain ownership of remaining staging scratch.
    ``catalog_manifests`` records select previously stored release identities;
    their other fields are ignored. Metadata always comes from stored owners.
    A catalog failure carries ``error.result`` with the completed release so a
    caller can truthfully report partial completion and retry the same bytes.
    """
    from release_admission import admit_release, library_delivery_profile

    root = _library_root(library_root)
    stage = Path(staged_dir).absolute()
    _directory(stage)
    resolved_stage = stage.resolve()
    if resolved_stage.is_relative_to(root / "decks") or root.is_relative_to(resolved_stage):
        raise ReleaseStoreError("unsafe_staging", "staging must be outside decks/ and cannot contain the library")
    if stage.stat().st_dev != root.stat().st_dev:
        raise ReleaseStoreError("cross_filesystem", "staging must share the library filesystem")
    admitted = admit_release(stage, target="library", deck_id=deck_id, release_id=release_id)
    manifest = _load_manifest(stage / "deck-manifest.json")
    deck_id, release_id = safe_component(manifest.get("deck_id")), safe_component(manifest.get("release_id"))
    catalog_rows = [] if catalog_manifests is None else catalog_manifests
    requested_keys = _catalog_keys(catalog_rows)
    with library_write_lock(root):
        # Recheck all copied bytes and the exact manifest after waiting for the
        # lock. These identity primitives are shared with canonical admission.
        if hashlib.sha256((stage / "deck-manifest.json").read_bytes()).hexdigest() != admitted["manifest_sha256"]:
            raise ReleaseStoreError("staging_changed", "staged manifest changed after admission")
        if library_delivery_profile() != admitted["delivery_profile"]:
            raise ReleaseStoreError("profile_changed", "delivery profile changed after admission")
        paths = verify_files(stage, manifest["artifacts"])
        files = set()
        for path in stage.rglob("*"):
            mode = path.lstat().st_mode
            if stat.S_ISREG(mode):
                files.add(path.relative_to(stage).as_posix())
            elif not stat.S_ISDIR(mode):
                raise ReleaseStoreError("staging_changed", "staged tree contains a link or special file after admission")
        if files != paths | {"deck-manifest.json"}:
            raise ReleaseStoreError("staging_changed", "staged tree changed after admission")
        _selected_catalog_candidates(root, requested_keys - {(deck_id, release_id)})
        decks, deck = root / "decks", root / "decks" / deck_id
        _directory(decks, create=True)
        _directory(deck, create=True)
        if stage.stat().st_dev != deck.stat().st_dev:
            raise ReleaseStoreError("cross_filesystem", "destination must share the staging filesystem")
        destination = deck / release_id
        try:
            destination.lstat()
        except FileNotFoundError:
            # Advisory lock + lstat prevents replacement among cooperating
            # writers; rename alone can replace an empty Unix directory.
            os.rename(stage, destination)
            status = "promoted"
        else:
            _directory(destination)
            try:
                admit_release(destination, target="library", deck_id=deck_id, release_id=release_id)
                existing = _load_manifest(destination / "deck-manifest.json")
            except (OSError, ValueError) as error:
                raise ReleaseStoreError("invalid_existing_release", f"existing immutable destination is incomplete or invalid: {destination}: {error}") from error
            if canonical_manifest(existing) != canonical_manifest(manifest):
                raise ReleaseStoreError("immutable_conflict", f"release identity already contains different bytes or metadata: {destination}")
            status = "already_present"
        result = {"status": status, "manifest": manifest, "catalog_updated": False, "issues": []}
        rows = [{"deck_id": d, "release_id": r} for d, r in requested_keys | {(deck_id, release_id)}]
        try:
            result["issues"] = _write_catalog_locked(root, rows, preserve_existing=preserve_existing_catalog)
        except (OSError, ValueError, KeyError, TypeError) as error:
            raise ReleaseStoreError("catalog_write_failed", f"complete release is present at {destination}; catalog update failed: {error}", result) from error
        result["catalog_updated"] = True
        return result


def main() -> int:
    """Destination-side promotion only; transport and audience policy are separate."""
    parser = argparse.ArgumentParser(description=__doc__)
    commands = parser.add_subparsers(dest="command", required=True)
    promote = commands.add_parser("promote", help="Admit and atomically promote a prepared directory; preserve the catalog")
    promote.add_argument("staging", type=Path)
    promote.add_argument("--library-root", type=Path, required=True)
    promote.add_argument("--deck-id")
    promote.add_argument("--release-id")
    catalog = commands.add_parser("catalog", help="Reconstruct operator catalog from complete release candidates")
    catalog.add_argument("--library-root", type=Path, required=True)
    args = parser.parse_args()
    try:
        if args.command == "promote":
            result = promote_release(args.staging, args.library_root, deck_id=args.deck_id, release_id=args.release_id)
        else:
            issues = write_catalog(args.library_root, [], preserve_existing=True)
            result = {"catalog_updated": True, "issues": issues}
        print(json.dumps({"ok": True, **result}))
        return 0
    except (OSError, ValueError) as error:
        result = getattr(error, "result", None)
        print(json.dumps({"ok": False, "code": getattr(error, "code", "invalid_release"), "error": str(error), "completed": result}))
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
