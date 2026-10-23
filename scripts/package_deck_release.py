#!/usr/bin/env python3
"""Package proven deck folders as immutable releases in an explicit library.

Copies and admission happen in exclusive same-filesystem staging. The shared
release store promotes a complete bundle and atomically updates the derived
operator catalog, never audience policy.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import re
import shutil
import subprocess
import sys
from html.parser import HTMLParser
from pathlib import Path, PurePosixPath


REPO_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REPO_ROOT / "skills/deck-studio/scripts"))
from proof_identity import verify_evidence_file, verify_files, verify_source
from release_admission import (
    NATIVE_PPTX, SECRET_WORDS, load_object, local_review_evidence, native_pptx_artifacts, referenced_local_assets,
)
from release_store import (
    ReleaseStoreError, automatic_release_id, discover_releases, promote_release,
    safe_component, staging_directory, write_catalog,
)


# Direct callers must choose the explicit library, just like the CLI.
PUBLIC_ROOT = None
RELEASE_ROOT = None


class TitleParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.in_title = False
        self.title_parts: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag.lower() == "title":
            self.in_title = True

    def handle_endtag(self, tag: str) -> None:
        if tag.lower() == "title":
            self.in_title = False

    def handle_data(self, data: str) -> None:
        if self.in_title:
            self.title_parts.append(data)

    @property
    def title(self) -> str:
        return " ".join(" ".join(self.title_parts).split())


def fail(message: str) -> None:
    raise SystemExit(f"package_deck_release: {message}")


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def sha256_text(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def current_commit() -> str:
    try:
        result = subprocess.run(["git", "rev-parse", "HEAD"], cwd=REPO_ROOT,
                                check=True, text=True, capture_output=True)
    except (OSError, subprocess.CalledProcessError):
        fail("release packaging requires a Git source checkout with a committed HEAD; local authoring does not")
    return result.stdout.strip()


def extract_title(html: str, fallback: str) -> str:
    parser = TitleParser()
    parser.feed(html)
    return parser.title or fallback


def find_pdf(source_dir: Path) -> Path:
    pdfs = sorted(source_dir.glob("*.pdf"))
    if len(pdfs) != 1:
        fail(f"{source_dir} must contain exactly one PDF export, found {len(pdfs)}")
    if pdfs[0].name != "deck.pdf":
        fail(f"{source_dir}: release packaging requires deck.pdf; export again with output deck.pdf and regenerate proof/pdf-report.json")
    return pdfs[0]


def copy_file(source: Path, target: Path) -> None:
    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(source, target)


def copy_referenced_assets(source_dir: Path, release_dir: Path, html_text: str) -> list[str]:
    """Collect authored resources; canonical admission decides their validity."""
    copied: set[str] = set()
    pending = referenced_local_assets(html_text, str(source_dir / "deck.html"), PurePosixPath())
    while pending:
        relative = pending.pop(0)
        # Native companions are copied only through their accepted proof path.
        # Admission still checks that any authored PPTX link actually resolves.
        if relative in copied or relative == "deck.pptx":
            continue
        source = source_dir / relative
        if not source.is_file() or not source.resolve().is_relative_to(source_dir.resolve()):
            fail(f"{source_dir / 'deck.html'} references missing or escaped local asset {relative}")
        target = release_dir / relative
        copy_file(source, target)
        if target.suffix.lower() in {".css", ".html", ".js", ".mjs", ".svg"}:
            pending.extend(referenced_local_assets(target.read_text(encoding="utf-8"), str(source), PurePosixPath(relative).parent))
        copied.add(relative)
    return sorted(copied)


def artifact_row(release_dir: Path, relative: str) -> dict[str, object]:
    path = release_dir / relative
    return {"path": relative, "sha256": sha256_file(path), "bytes": path.stat().st_size}


def write_json(path: Path, data: dict[str, object]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def package_release(source_dir: Path, deck_id: str, title: str | None, audience: str,
                    desired_action: str, expected_slides: int, release_id: str | None,
                    *, catalog_manifests: list[dict] | None = None,
                    preserve_existing_catalog: bool = True,
                    completed: list[dict] | None = None) -> dict[str, object]:
    if PUBLIC_ROOT is None or RELEASE_ROOT != PUBLIC_ROOT / "decks":
        fail("select an explicit library root before packaging")
    try:
        safe_component(deck_id)
        if release_id is not None:
            safe_component(release_id)
        source_commit = current_commit()
        source_dir = source_dir.resolve()
        deck_html = source_dir / "deck.html"
        proof_report = source_dir / "proof/report.json"
        visual_review = source_dir / "proof/visual-review.json"
        pdf_report = source_dir / "proof/pdf-report.json"
        for path in (deck_html, proof_report, visual_review, pdf_report):
            if not path.is_file():
                fail(f"{source_dir} missing {path.relative_to(source_dir)}")
        pdf = find_pdf(source_dir)
        html_text = deck_html.read_text(encoding="utf-8")
        report, pdf_proof = load_object(proof_report), load_object(pdf_report)
        # Shared identity primitives safely locate byte-bound files to copy;
        # the one admission core judges the finished bundle, not source paths.
        source_paths = verify_source(source_dir, report, "deck.html") | verify_source(source_dir, pdf_proof, "deck.html")
        proof_paths = verify_files(proof_report.parent, report.get("proof_files"))
        evidence_paths = local_review_evidence(source_dir, load_object(visual_review))
        proof_artifacts = sorted({"proof/report.json", "proof/visual-review.json", "proof/pdf-report.json"}
                                 | {f"proof/{relative}" for relative in proof_paths} | set(evidence_paths))
        native_artifacts = native_pptx_artifacts(source_dir, expected_slides)
        if not native_artifacts:
            fail("new publication requires deck.pptx and its accepted native render/review proof; Decks delivers HTML, PDF and native editable PPTX")
        proof_artifacts = sorted(set(proof_artifacts) | (native_artifacts - {"deck.pptx"}))
        for relative in proof_artifacts:
            verify_evidence_file(source_dir / relative, SECRET_WORDS)
        with staging_directory(PUBLIC_ROOT) as stage:
            copy_file(deck_html, stage / "deck.html")
            copy_file(pdf, stage / "deck.pdf")
            if native_artifacts:
                copy_file(source_dir / "deck.pptx", stage / "deck.pptx")
            asset_paths = set(copy_referenced_assets(source_dir, stage, html_text))
            for relative in sorted(source_paths - {"deck.html"}):
                copy_file(source_dir / relative, stage / relative)
                asset_paths.add(relative)
            for relative in proof_artifacts:
                copy_file(source_dir / relative, stage / relative)
            covers = sorted(path for path in proof_paths if re.fullmatch(r"screenshots/desktop-slide-0*1\.png", path))
            if covers:
                if "cover.png" in asset_paths:
                    fail("cover.png is reserved for the accepted first-slide screenshot")
                copy_file(source_dir / "proof" / covers[0], stage / "cover.png")
                asset_paths.add("cover.png")
            resolved_title = title or extract_title(html_text, deck_id.replace("-", " ").title())
            artifacts = sorted({"deck.html", "deck.pdf", *proof_artifacts, *asset_paths, *native_artifacts})
            manifest = {
                "schema_version": 3, "deck_id": deck_id,
                "title": resolved_title, "audience": audience, "desired_action": desired_action,
                "visibility": "unassigned",
                "source": {"decks_commit": source_commit,
                           "brief_sha256": sha256_text(f"{resolved_title}\n{audience}\n{desired_action}\n"),
                           "generator": "deck-studio"},
                "slide_count": expected_slides,
                "artifacts": [artifact_row(stage, relative) for relative in artifacts],
                "proof": {"validate_deck": "pass", "rendered_qa": "pass", "visual_acceptance": "pass",
                          "content_fidelity": "pass", "pdf_export": "pass", "path_leak_scan": "pass"},
            }
            if native_artifacts:
                manifest["pptx"] = dict(NATIVE_PPTX)
            manifest["release_id"] = release_id or automatic_release_id(manifest)
            write_json(stage / "deck-manifest.json", manifest)
            try:
                result = promote_release(stage, PUBLIC_ROOT, deck_id=deck_id, release_id=manifest["release_id"],
                                         catalog_manifests=catalog_manifests,
                                         preserve_existing_catalog=preserve_existing_catalog)
            except ReleaseStoreError as error:
                if error.result is not None and completed is not None:
                    completed.append(error.result)
                raise
            if completed is not None:
                completed.append(result)
            return result["manifest"]
    except (OSError, ValueError) as error:
        fail(f"{getattr(error, 'code', 'invalid_release')}: {error}")


def parse_specs(path: Path) -> list[dict[str, object]]:
    data = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(data, list) or any(not isinstance(row, dict) for row in data):
        fail("spec file must contain a list of objects")
    return data


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--spec", type=Path, required=True, help="JSON list of deck package specs")
    parser.add_argument("--library-root", type=Path, required=True, help="Artifact library to write; packaging does not grant audience access")
    parser.add_argument("--preserve-existing-catalog", action="store_true",
                        help="Include existing release manifests in catalog.json unless replaced by this spec.")
    args = parser.parse_args()
    global PUBLIC_ROOT, RELEASE_ROOT
    PUBLIC_ROOT = args.library_root.expanduser().resolve()
    RELEASE_ROOT = PUBLIC_ROOT / "decks"
    manifests, completed = [], []
    try:
        for spec in parse_specs(args.spec):
            manifests.append(package_release(
                source_dir=Path(str(spec["source_dir"])).expanduser().resolve(),
                deck_id=str(spec["deck_id"]), title=str(spec["title"]) if spec.get("title") else None,
                audience=str(spec["audience"]), desired_action=str(spec["desired_action"]),
                expected_slides=int(spec["expected_slides"]),
                release_id=str(spec["release_id"]) if spec.get("release_id") else None,
                catalog_manifests=manifests, preserve_existing_catalog=args.preserve_existing_catalog,
                completed=completed))
        if not completed:
            write_catalog(PUBLIC_ROOT, [], preserve_existing=args.preserve_existing_catalog)
    except (SystemExit, OSError, ValueError, KeyError) as error:
        print(json.dumps({"ok": False, "completed": completed, "failed_spec_index": len(manifests), "error": str(error)}, indent=2))
        raise SystemExit(1) from None
    found = discover_releases(PUBLIC_ROOT)
    print(json.dumps({"ok": True, "completed": completed, "issues": found["issues"]}, indent=2))


if __name__ == "__main__":
    main()
