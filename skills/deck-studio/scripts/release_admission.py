#!/usr/bin/env python3
"""Canonical read-only release admission, using only stdlib and sibling modules.

Verifies byte-bound consistency, not a reviewer's honesty or aesthetic judgment.
Library selection requires proof captured under the exact delivery contract.
"""
from __future__ import annotations

import argparse
import hashlib
import io
import json
import posixpath
import re
import stat
from collections.abc import Mapping
from html.parser import HTMLParser
from pathlib import Path, PurePosixPath
from urllib.parse import unquote, urlsplit
import xml.etree.ElementTree as ET
import zipfile

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
NATIVE_PPTX = {"artifact": "deck.pptx", "report": "proof/pptx-report.json", "review": "proof/pptx-visual-review.json"}


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


def scan_native_pptx_text(path: Path, *, max_entries: int, max_expanded: int, max_part: int) -> None:
    """Apply publication text policy to bounded Office XML and chart workbooks.

    Structural inspection owns the outer PPTX. A chart's embedded XLSX is an
    independent ZIP: its expansion must share the outer package's scan budget.
    Other embedded payloads have no supported publication scan and fail closed.
    """
    budget = {"entries": 0, "expanded": 0}

    class PolicyTreeBuilder(ET.TreeBuilder):
        def doctype(self, name, public_id, system_id):
            fail("native Office XML declarations are not allowed")

    def scan(archive, label: str, depth: int) -> None:
        entries = archive.infolist()
        budget["entries"] += len(entries)
        budget["expanded"] += sum(row.file_size for row in entries)
        if budget["entries"] > max_entries or budget["expanded"] > max_expanded:
            fail("native Office text scan exceeds cumulative package limits")
        names = set()
        for row in entries:
            name = safe_relative(row.filename.rstrip("/") if row.is_dir() else row.filename)
            if name in names:
                fail("duplicate native Office package member")
            names.add(name)
            if (row.file_size > max_part or row.flag_bits & 1 or stat.S_ISLNK(row.external_attr >> 16)
                    or row.compress_type not in {zipfile.ZIP_STORED, zipfile.ZIP_DEFLATED}):
                fail("unsupported or oversized native Office package member")
        for row in entries:
            if row.is_dir():
                continue
            name = row.filename
            part_label = f"{label}:{name}"
            if "/embeddings/" in name and not name.endswith(".xlsx"):
                fail("native publication supports embedded chart XLSX workbooks, not opaque embedded payloads")
            if name.endswith(".xlsx"):
                if depth:
                    fail("nested embedded Office workbooks are not supported")
                with zipfile.ZipFile(io.BytesIO(archive.read(row))) as workbook:
                    scan(workbook, part_label, depth + 1)
            elif name.endswith((".xml", ".rels")):
                parser = ET.XMLParser(target=PolicyTreeBuilder(insert_comments=True, insert_pis=True))
                document = ET.fromstring(archive.read(row), parser=parser)
                for node in document.iter():
                    for text in (node.text, node.tail, *node.attrib.values()):
                        if text:
                            ensure_clean_text(text, part_label)

    try:
        with zipfile.ZipFile(path) as archive:
            scan(archive, "native PPTX", 0)
    except (zipfile.BadZipFile, ET.ParseError, RuntimeError):
        fail("native Office package changed or is not readable XML/ZIP")


def native_pptx_artifacts(source_dir: Path, expect_slides: int) -> set[str]:
    """Validate a present native companion, returning every byte-bound file.

    This is the shared proof authority for packaging and immutable admission.
    Native inspection proves structure; the separate review records a human or
    agent's inspection of these exact rendered frames, not that inspection's
    aesthetic truth. Its absence is valid for historical consistency checks;
    new library admission separately requires it. No author module or semantic
    brief is audience material.
    """
    present = any((source_dir / value).exists() or (source_dir / value).is_symlink() for value in NATIVE_PPTX.values())
    present = present or (source_dir / "proof/pptx").exists()
    if not present:
        return set()
    for name in NATIVE_PPTX.values():
        if not (source_dir / name).is_file():
            fail(f"native PPTX companion missing {name}")
    try:
        from pptx_inspection import MAX_ENTRIES, MAX_EXPANDED, MAX_PART, inspect_pptx
    except (ImportError, OSError, SyntaxError):
        fail("canonical native PPTX inspector is unavailable", "validator_unavailable")
    report_path = source_dir / NATIVE_PPTX["report"]
    review_path = source_dir / NATIVE_PPTX["review"]
    for path in (report_path, review_path):
        ensure_clean_text(path.read_text(encoding="utf-8"), path.name)
    report, review = load_object(report_path), load_object(review_path)
    if (type(report.get("schema_version")) is not int or report["schema_version"] != 1
            or report.get("kind") != "native-pptx" or report.get("ok") is not True or report.get("errors") != []):
        fail("missing successful native PPTX render report")
    if type(report.get("slideCount")) is not int or report["slideCount"] != expect_slides:
        fail("native PPTX report slide count mismatch")
    if verify_source(source_dir, report, "deck.pptx") != {"deck.pptx"}:
        fail("native PPTX render source must bind only deck.pptx")
    if verify_files(source_dir, [report.get("artifact")]) != {"deck.pptx"}:
        fail("native PPTX artifact must be deck.pptx")
    native = inspect_pptx(source_dir / "deck.pptx", expected_slides=expect_slides)
    scan_native_pptx_text(source_dir / "deck.pptx", max_entries=MAX_ENTRIES, max_expanded=MAX_EXPANDED, max_part=MAX_PART)
    if report.get("native") != native:
        fail("stale native PPTX structural inspection")
    renderer = report.get("renderer")
    if (not isinstance(renderer, dict) or renderer.get("name") != "LibreOffice"
            or not isinstance(renderer.get("version"), str) or not renderer["version"].strip()
            or type(renderer.get("dpi")) is not int or renderer["dpi"] < 1):
        fail("native PPTX report requires the actual LibreOffice render identity")
    slides = report.get("slides")
    if not isinstance(slides, list) or len(slides) != expect_slides:
        fail("native PPTX render report must include every slide")
    frames = []
    for index, slide in enumerate(slides, 1):
        if (not isinstance(slide, dict) or type(slide.get("slide")) is not int or slide["slide"] != index
                or type(slide.get("width")) is not int or type(slide.get("height")) is not int
                or slide["width"] < 1 or slide["height"] < 1):
            fail("native PPTX render slides must be complete, ordered and dimensioned")
        frame = slide.get("screenshot")
        if (not isinstance(frame, dict) or not isinstance(frame.get("path"), str)
                or not frame["path"].startswith("proof/pptx/") or not frame["path"].endswith(".png")):
            fail("native PPTX screenshot must be a PNG under proof/pptx/")
        frames.append(frame)
    paths = verify_files(source_dir, frames)
    for slide in slides:
        image = source_dir / slide["screenshot"]["path"]
        verify_evidence_file(image, SECRET_WORDS)
        header = image.read_bytes()[:24]
        if (len(header) != 24 or header[12:16] != b"IHDR"
                or int.from_bytes(header[16:20], "big") != slide["width"]
                or int.from_bytes(header[20:24], "big") != slide["height"]):
            fail("native PPTX screenshot dimensions differ from render report")
    if (type(review.get("schema_version")) is not int or review["schema_version"] != 1
            or review.get("kind") != "native-pptx-review" or review.get("verdict") != "accepted"
            or not isinstance(review.get("reviewer"), str) or not review["reviewer"].strip()
            or not isinstance(review.get("notes"), str) or not review["notes"].strip()
            or review.get("reviewedSlides") != list(range(1, expect_slides + 1))
            or any(type(value) is not int for value in review.get("reviewedSlides", []))):
        fail("native PPTX visual review must accept every rendered slide with reviewer and notes")
    if verify_files(source_dir, [review.get("report")]) != {NATIVE_PPTX["report"]}:
        fail("native PPTX review must bind its exact render report")
    return {*NATIVE_PPTX.values(), *paths}


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
    native_paths = {name for name in paths if name.lower().endswith(".pptx")}
    if native_paths - {"deck.pptx"}:
        fail("PPTX audience artifacts must be the declared native deck.pptx companion")
    has_native = native_paths or any(name in files for name in NATIVE_PPTX.values()) or any(name.startswith("proof/pptx/") for name in files)
    if has_native or "pptx" in manifest:
        if schema != 3 or manifest.get("pptx") != NATIVE_PPTX:
            fail("native PPTX requires the complete declared v3 pptx companion contract")
        if not set(NATIVE_PPTX.values()) <= files:
            fail("native PPTX companion is declared but incomplete")
        if not native_pptx_artifacts(release_dir, manifest["slide_count"]) <= paths:
            fail("native PPTX proof identities missing from manifest artifacts")
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
    if target == "library" and manifest.get("pptx") != NATIVE_PPTX:
        fail("new publication requires HTML, PDF and native editable PPTX with accepted native proof", "missing_deliverable")
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
