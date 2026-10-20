#!/usr/bin/env python3
"""Canonical read-only release admission, using only stdlib and sibling modules.

Verifies byte-bound consistency, not a reviewer's honesty or aesthetic judgment.
Library selection requires proof captured under the exact delivery contract.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import posixpath
import re
from collections.abc import Mapping
from html.parser import HTMLParser
from pathlib import Path, PurePosixPath
from urllib.parse import unquote, urlsplit

try:
    from proof_identity import (TEXT_EVIDENCE_SUFFIXES, digest, load_object, safe_relative,
                                verify_evidence_file, verify_files, verify_pdf, verify_source)
    from validate_deck import css_imports, js_imports, validate_document
except (ImportError, OSError, SyntaxError):
    if __name__ != "__main__":
        raise
    print(json.dumps({"ok": False, "code": "validator_unavailable", "error": "canonical admission dependency unavailable"}))
    raise SystemExit(1) from None

SECRET_WORDS = ("DECKS_SITE_PASSWORD", "DECKS_SESSION_SECRET", "DECKS_MANAGEMENT_TOKEN",
                "RAILWAY_TOKEN", "DATABASE_URL", "OPENAI_API_KEY", "ANTHROPIC_API_KEY", "XAI_API_KEY")
PASS_FIELDS = ("content_fidelity", "render_mechanics", "de_visu_inspection", "taste_judgment", "metadata_leak")
REQUIRED_TEXT_FIELDS = ("visual_thesis", "template_fit", "density_fit", "weakness", "residual_risk")
CSS_URL_RE = re.compile(r"url\(\s*(['\"]?)(.*?)\1\s*\)", re.IGNORECASE)
ID_RE = re.compile(r"[A-Za-z0-9][A-Za-z0-9_-]{0,127}")
GIT_COMMIT_RE = re.compile(r"(?:[0-9a-f]{40}|[0-9a-f]{64})")


class AdmissionError(ValueError):
    def __init__(self, message: str, code: str = "invalid_release"):
        super().__init__(message)
        self.code = code


def fail(message: str, code: str = "invalid_release") -> None:
    raise AdmissionError(message, code)


def ensure_clean_text(text: str, label: str) -> None:
    for token in ("/Users/", "file://", *SECRET_WORDS):
        if token.lower() in text.lower():
            fail(f"{label} contains {token}", "unsafe_content")


def require_text(row: Mapping, field: str) -> str:
    value = row.get(field)
    if not isinstance(value, str) or not value.strip():
        fail(f"visual review field {field!r} must be a non-empty string")
    return value.strip()


def require_string_list(row: Mapping, field: str) -> list[str]:
    values = row.get(field)
    if not isinstance(values, list) or not values or not all(isinstance(v, str) and v.strip() for v in values):
        fail(f"visual review field {field!r} must be a non-empty list of strings")
    return [value.strip() for value in values]


def validate_record_fields(row: dict) -> tuple[list[str], list[str]]:
    """Receipt content only: callers separately verify its byte identity."""
    if row.get("status") != "pass":
        fail("visual review status must be 'pass'")
    if require_text(row, "inspected_by").lower() != "agent":
        fail("visual review inspected_by must be 'agent'")
    if row.get("slides_inspected") != "all":
        fail("visual review slides_inspected must be 'all'")
    for field in PASS_FIELDS:
        if row.get(field) != "pass":
            fail(f"visual review field {field!r} must be 'pass'")
    for field in REQUIRED_TEXT_FIELDS:
        require_text(row, field)
    viewports = require_string_list(row, "inspected_viewports")
    if "desktop" not in {name.lower() for name in viewports}:
        fail("visual review inspected_viewports must include desktop")
    evidence = require_string_list(row, "evidence")
    if not any(any(kind in value.lower() for kind in ("screenshot", "contact-sheet", "browser")) for value in evidence):
        fail("visual review evidence must include screenshot, contact-sheet, or browser inspection")
    if row.get("failures") != []:
        fail("visual review pass requires failures to be empty")
    if "warnings" in row and not isinstance(row["warnings"], list):
        fail("visual review warnings must be a list when present")
    return viewports, evidence


def validate_render_report(path: Path, expect_slides: int | None) -> dict:
    report = load_object(path)
    if report.get("ok") is not True:
        fail(f"{path.name}: render report ok must be true")
    viewports = report.get("viewports")
    if not isinstance(viewports, list) or not viewports or any(not isinstance(row, dict) for row in viewports):
        fail("render report requires viewport objects")
    counts = [row.get("slideCount", row.get("slide_count")) for row in viewports]
    if expect_slides is not None and (not counts or any(type(count) is not int or count != expect_slides for count in counts)):
        fail(f"{path.name}: render report slide counts {counts} do not match expected {expect_slides}")
    return {"report": str(path), "slide_counts": counts}


def local_review_evidence(source_dir: Path, review: dict) -> list[str]:
    """Preserve explicit proof/ citations; prose and external links are not files."""
    paths: set[str] = set()
    proof_root = (source_dir / "proof").resolve()
    if not proof_root.is_relative_to(source_dir.resolve()):
        fail("unsafe local visual-review evidence: proof folder escapes the deck folder")
    evidence = review.get("evidence", [])
    if not isinstance(evidence, list):
        fail("visual review evidence must be a list")
    for value in evidence:
        if not isinstance(value, str):
            continue
        name = value.strip()
        if name.startswith("./"):
            name = name[2:]
        if not name.startswith("proof/"):
            continue
        try:
            name = safe_relative(name)
        except ValueError:
            fail(f"unsafe local visual-review evidence: {value}")
        path = source_dir / name
        if not path.resolve().is_relative_to(proof_root):
            fail(f"unsafe local visual-review evidence: {value}")
        if not path.is_file():
            fail(f"missing local visual-review evidence: {value}")
        paths.add(name)
    return sorted(paths)


def validate_visual_review(path: Path, report_path: Path | None, expect_slides: int | None,
                           deck: Path | None = None) -> dict:
    ensure_clean_text(path.read_text(encoding="utf-8"), path.name)
    review = load_object(path)
    if review.get("schema_version") != 2:
        fail("visual review is unbound; regenerate render proof and record schema_version 2 acceptance")
    if report_path is None or deck is None:
        fail("current visual acceptance requires --report and --deck")
    report = load_object(report_path)
    if report.get("schema_version") != 3 or review.get("render_report_sha256") != digest(report_path):
        fail("stale or unbound visual review render_report_sha256")
    verify_source(deck.parent, report, deck.name)
    proof_paths = verify_files(report_path.parent, report.get("proof_files"))
    viewports, evidence = validate_record_fields(review)
    for name in local_review_evidence(deck.parent, review):
        verify_evidence_file(deck.parent / name, SECRET_WORDS)
    if report.get("errors") != []:
        fail("render report must contain an empty errors list")
    summary = validate_render_report(report_path, expect_slides)
    actual_names: set[str] = set()
    for viewport in report.get("viewports", []):
        if not isinstance(viewport, dict) or not isinstance(viewport.get("name"), str):
            fail("invalid render viewport")
        name = viewport["name"].lower()
        if name in actual_names:
            fail("duplicate render viewport")
        actual_names.add(name)
        count = viewport.get("slideCount")
        slides = viewport.get("slides")
        if type(count) is not int or count < 1 or not isinstance(slides, list) or len(slides) != count:
            fail("render viewport must contain every slide")
        for index, slide in enumerate(slides, 1):
            if not isinstance(slide, dict) or type(slide.get("index")) is not int or slide["index"] != index or slide.get("ok") is not True:
                fail("render viewport has failed, missing or unordered slides")
            if not isinstance(slide.get("screenshot"), str) or slide["screenshot"] not in proof_paths:
                fail("render slide screenshot missing from byte-bound proof files")
    if not {name.lower() for name in viewports} <= actual_names:
        fail("visual review cites a viewport missing from render proof")
    return {"ok": True, "visual_review": str(path), "inspected_viewports": viewports,
            "evidence": evidence, "report": summary}


class AssetReferenceParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.urls: list[str] = []

    def handle_starttag(self, tag, attrs):
        for key, value in attrs:
            if key.lower() in {"href", "poster", "src"} and value:
                self.urls.append(value)


def normalize_local_url(value: str, label: str, base_dir: PurePosixPath) -> str | None:
    raw = value.strip()
    if not raw or raw.startswith("#"):
        return None
    parts = urlsplit(raw)
    if parts.scheme or parts.netloc:
        return None
    decoded = unquote(parts.path)
    if not decoded:
        return None
    if decoded.startswith("/") or "\\" in decoded or "\x00" in decoded:
        fail(f"{label} contains root-relative or unsafe asset URL {raw}")
    combined = posixpath.normpath(posixpath.join(base_dir.as_posix(), decoded))
    if combined == ".":
        return None
    try:
        return safe_relative(combined)
    except ValueError:
        fail(f"{label} contains unsafe asset URL {raw}")


def referenced_local_assets(text: str, label: str, base_dir: PurePosixPath) -> list[str]:
    parser = AssetReferenceParser()
    parser.feed(text)
    urls = parser.urls + [match.group(2) for match in CSS_URL_RE.finditer(text)]
    urls.extend(css_imports(text))
    urls.extend(js_imports(text))
    refs = {normalize_local_url(url, label, base_dir) for url in urls}
    return sorted(ref for ref in refs if ref and ref not in {"deck.html", "deck.pdf"})


def validate_deck_local_assets(release_dir: Path, artifact_paths: set[str]) -> None:
    pending = ["deck.html"]
    seen: set[str] = set()
    while pending:
        relative = pending.pop(0)
        if relative in seen:
            continue
        path = release_dir / relative
        text = path.read_text(encoding="utf-8")
        for ref in referenced_local_assets(text, relative, PurePosixPath(relative).parent):
            if not (release_dir / ref).is_file():
                fail(f"{relative} references missing local asset {ref}")
            if ref not in artifact_paths:
                fail(f"{relative} local asset {ref} missing from manifest artifacts")
            if Path(ref).suffix.lower() in TEXT_EVIDENCE_SUFFIXES:
                pending.append(ref)
        seen.add(relative)


def scan_release_text(release_dir: Path) -> None:
    for path in release_dir.rglob("*"):
        if path.is_file() and path.suffix.lower() in TEXT_EVIDENCE_SUFFIXES:
            ensure_clean_text(path.read_text(encoding="utf-8"), path.relative_to(release_dir).as_posix())


def library_delivery_profile() -> dict:
    # No caller-selected digest and no second Python MIME/CSP implementation.
    path = Path(__file__).resolve().with_name("delivery_profile.mjs")
    if not path.is_file() or path.is_symlink():
        fail("canonical library delivery profile is unavailable", "validator_unavailable")
    return {"id": "decks-library", "sha256": digest(path)}


def _check_tree(release_dir: Path) -> set[str]:
    if release_dir.is_symlink() or not release_dir.is_dir():
        fail("release must be a real directory", "unsafe_path")
    files: set[str] = set()
    for path in release_dir.rglob("*"):
        if path.is_symlink() or not (path.is_dir() or path.is_file()):
            fail(f"release contains symlink or special file: {path.relative_to(release_dir)}", "unsafe_path")
        if path.is_file():
            files.add(path.relative_to(release_dir).as_posix())
    return files


def validate_manifest_metadata(manifest: dict, *, allow_historical: bool = False) -> dict:
    """Check catalog metadata; this alone never admits artifact bytes or proof.

    Historical consistency retains its original visibility and source lineage.
    New v3 lineage records the producer's brief identity, not proof that a Git
    commit is available or that the brief's substantive claims are true.
    """
    if not isinstance(manifest, dict):
        fail("manifest must be an object")
    schema = manifest.get("schema_version")
    if type(schema) is not int or schema not in {1, 2, 3}:
        fail("manifest schema_version must be 1, 2 or 3")
    if schema != 3 and not allow_historical:
        fail("new publication requires byte-bound schema v3; historical v1/v2 validation is not admission")
    for field in ("title", "audience", "desired_action", "visibility"):
        value = manifest.get(field)
        if not isinstance(value, str) or not value.strip():
            fail(f"manifest {field} must be a non-empty string")
    if type(manifest.get("slide_count")) is not int or manifest["slide_count"] < 1:
        fail("manifest slide_count must be a positive int")
    if schema == 3:
        if manifest["visibility"] != "unassigned":
            fail("v3 manifest visibility must be 'unassigned'; audience access belongs to policy")
        source = manifest.get("source")
        if not isinstance(source, dict):
            fail("v3 manifest source lineage must be an object")
        if source.get("generator") != "deck-studio":
            fail("v3 manifest source.generator must be 'deck-studio'")
        commit = source.get("decks_commit")
        if not isinstance(commit, str) or not GIT_COMMIT_RE.fullmatch(commit):
            fail("v3 manifest source.decks_commit must be a full Git commit identifier")
        brief = "".join(f"{manifest[field]}\n" for field in ("title", "audience", "desired_action"))
        brief_digest = hashlib.sha256(brief.encode("utf-8")).hexdigest()
        if source.get("brief_sha256") != brief_digest:
            fail("v3 manifest source.brief_sha256 must bind title, audience and desired_action")
    return manifest


def validate_manifest(release_dir: Path, manifest: dict, *, target: str = "local", allow_historical: bool = False) -> dict:
    """Historical consistency checking never admits new selection."""
    if target not in {"local", "library"}:
        fail("target must be local or library")
    validate_manifest_metadata(manifest, allow_historical=allow_historical)
    files = _check_tree(release_dir)
    schema = manifest["schema_version"]
    if schema != 3 and target == "library":
        fail("new publication requires byte-bound schema v3; historical v1/v2 validation is not admission")
    proof = manifest.get("proof")
    if not isinstance(proof, dict):
        fail("manifest proof missing")
    required_proof = ["validate_deck", "rendered_qa", "path_leak_scan"]
    if schema in {2, 3}:
        required_proof.extend(["visual_acceptance", "content_fidelity", "pdf_export"])
    for name in required_proof:
        if proof.get(name) != "pass":
            fail(f"proof {name} must pass")
    paths = verify_files(release_dir, manifest.get("artifacts"))
    if "deck-manifest.json" in paths:
        fail("manifest cannot list itself as an artifact")
    if schema == 3 and files - {"deck-manifest.json"} != paths:
        fail("release contains unmanifested files")
    if schema in {2, 3}:
        if "proof/visual-review.json" not in paths:
            fail("manifest missing proof/visual-review.json artifact")
        slides = manifest["slide_count"]
        review_path = release_dir / "proof/visual-review.json"
        if schema == 2:
            review = load_object(review_path)
            if review.get("schema_version") != 1 or review.get("status") != "pass":
                fail("invalid historical visual review record")
            validate_record_fields(review)
            validate_render_report(release_dir / "proof/report.json", slides)
        else:
            required = {"deck.html", "deck.pdf", "proof/report.json", "proof/visual-review.json", "proof/pdf-report.json"}
            if not required <= paths:
                fail("v3 release missing required proof/artifact rows")
            report_path = release_dir / "proof/report.json"
            report = load_object(report_path)
            pdf_report = load_object(release_dir / "proof/pdf-report.json")
            sources = verify_source(release_dir, report, "deck.html") | verify_source(release_dir, pdf_report, "deck.html")
            proofs = {f"proof/{name}" for name in verify_files(release_dir / "proof", report.get("proof_files"))}
            if not (sources | proofs) <= paths:
                fail("v3 proof identities missing from manifest artifacts")
            if target == "library":
                profile = library_delivery_profile()
                if report.get("delivery_profile") != profile or pdf_report.get("delivery_profile") != profile:
                    fail("render and PDF proof must bind the current library delivery profile", "delivery_profile_mismatch")
            validate_visual_review(review_path, report_path, slides, release_dir / "deck.html")
            verify_pdf(release_dir, pdf_report, release_dir / "deck.pdf", slides)
            for relative in paths:
                if relative.startswith("proof/"):
                    verify_evidence_file(release_dir / relative, SECRET_WORDS)
            validate_document(release_dir / "deck.html", slides)
    validate_deck_local_assets(release_dir, paths)
    scan_release_text(release_dir)
    return manifest


def admit_release(release_dir: Path, *, target: str = "library", deck_id: str | None = None,
                  release_id: str | None = None) -> dict:
    """Admit one immutable v3 release, without writing bytes or audience policy."""
    try:
        release_dir = Path(release_dir).absolute()
        _check_tree(release_dir)
        manifest_path = release_dir / "deck-manifest.json"
        manifest_digest = digest(manifest_path)
        manifest = load_object(manifest_path)
        profile_before = library_delivery_profile() if target == "library" else None
        for field, expected in (("deck_id", deck_id), ("release_id", release_id)):
            value = manifest.get(field)
            if not isinstance(value, str) or not ID_RE.fullmatch(value) or (expected is not None and value != expected):
                fail(f"manifest {field} identity mismatch", "identity_mismatch")
        validate_manifest(release_dir, manifest, target=target)
        if digest(manifest_path) != manifest_digest:
            fail("manifest changed during admission", "identity_changed")
        if target == "library" and library_delivery_profile() != profile_before:
            fail("library delivery profile changed during admission", "identity_changed")
        result = {"ok": True, "deck_id": manifest["deck_id"], "release_id": manifest["release_id"],
                  "manifest_sha256": manifest_digest}
        if target == "library":
            result["delivery_profile"] = profile_before
        return result
    except AdmissionError:
        raise
    except (OSError, UnicodeError, ValueError, RecursionError) as exc:
        raise AdmissionError(str(exc)) from exc


class JsonArgumentParser(argparse.ArgumentParser):
    def error(self, message):
        raise AdmissionError(message, "invalid_arguments")


def main() -> int:
    try:
        parser = JsonArgumentParser(description=__doc__)
        parser.add_argument("release", type=Path)
        parser.add_argument("--target", choices=("library", "local"), default="library")
        parser.add_argument("--deck-id")
        parser.add_argument("--release-id")
        args = parser.parse_args()
        result = admit_release(args.release, target=args.target, deck_id=args.deck_id, release_id=args.release_id)
    except AdmissionError as exc:
        print(json.dumps({"ok": False, "code": exc.code, "error": str(exc)}))
        return 1
    print(json.dumps(result))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
