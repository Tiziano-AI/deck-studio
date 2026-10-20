"""Read-only identity and local-evidence admission shared by proof consumers."""
from __future__ import annotations

import hashlib
import json
from pathlib import Path, PurePosixPath


TEXT_EVIDENCE_SUFFIXES = {".css", ".html", ".js", ".mjs", ".json", ".md", ".svg", ".txt", ".xml", ".log", ".csv", ".jsonl", ".tsv"}
IMAGE_EVIDENCE_SUFFIXES = {".png", ".jpg", ".jpeg", ".gif", ".webp"}


def verify_evidence_file(path: Path, secret_words: tuple[str, ...]) -> None:
    """Admit scannable UTF-8 text or a recognized screenshot image format.

    Raster content still needs visual inspection; this is not OCR or a claim
    that a screenshot's pixels contain no private information.
    """
    suffix = path.suffix.lower()
    if suffix not in TEXT_EVIDENCE_SUFFIXES | IMAGE_EVIDENCE_SUFFIXES:
        raise ValueError(f"unsupported local proof evidence type: {path.name}")
    data = path.read_bytes()
    if suffix in TEXT_EVIDENCE_SUFFIXES:
        try:
            text = data.decode("utf-8")
        except UnicodeDecodeError:
            raise ValueError(f"local proof evidence must be UTF-8 text: {path.name}") from None
        if "\x00" in text:
            raise ValueError(f"local proof evidence must be UTF-8 text without NUL bytes: {path.name}")
        lowered = text.lower()
        for token in ("/Users/", "file://", *secret_words):
            if token.lower() in lowered:
                raise ValueError(f"local proof evidence {path.name} contains {token}")
        return
    valid_image = (
        (suffix == ".png" and data.startswith(b"\x89PNG\r\n\x1a\n"))
        or (suffix in {".jpg", ".jpeg"} and data.startswith(b"\xff\xd8\xff"))
        or (suffix == ".gif" and data.startswith((b"GIF87a", b"GIF89a")))
        or (suffix == ".webp" and data.startswith(b"RIFF") and data[8:12] == b"WEBP")
    )
    if not valid_image:
        raise ValueError(f"unrecognized local proof image format: {path.name}")


def digest(path: Path) -> str:
    checksum = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            checksum.update(chunk)
    return checksum.hexdigest()


def safe_relative(name: object) -> str:
    """Require one canonical relative POSIX filename, never a directory alias."""
    if (not isinstance(name, str) or not name or "\\" in name or "\x00" in name
            or PurePosixPath(name).is_absolute()
            or any(part in {"", ".", ".."} for part in name.split("/"))):
        raise ValueError("unsafe proof identity path")
    return name


def load_object(path: Path) -> dict:
    def unique_object(pairs):
        result = {}
        for key, value in pairs:
            if key in result:
                raise ValueError(f"duplicate JSON key: {key}")
            result[key] = value
        return result

    def reject_constant(value):
        raise ValueError(f"non-finite JSON number: {value}")

    try:
        data = json.loads(path.read_text(encoding="utf-8"), object_pairs_hook=unique_object,
                          parse_constant=reject_constant)
    except (OSError, UnicodeError, ValueError) as exc:
        raise ValueError(f"{path.name}: invalid or unreadable JSON: {exc}") from exc
    if not isinstance(data, dict):
        raise ValueError(f"{path.name}: root must be a JSON object")
    return data


def verify_files(root: Path, rows: object) -> set[str]:
    if not isinstance(rows, list) or not rows:
        raise ValueError("missing byte-bound file identities; regenerate proof")
    paths: set[str] = set()
    for row in rows:
        if not isinstance(row, dict):
            raise ValueError("invalid proof identity row")
        name = safe_relative(row.get("path"))
        path = root / name
        if name in paths or not path.is_file() or not path.resolve().is_relative_to(root.resolve()):
            raise ValueError(f"missing, duplicate or escaped proof file: {name}")
        size = row.get("bytes")
        if type(size) is not int or size < 0 or row.get("sha256") != digest(path) or size != path.stat().st_size:
            raise ValueError(f"stale proof identity: {name}")
        paths.add(name)
    return paths


def verify_source(root: Path, report: dict, deck_name: str) -> set[str]:
    if not isinstance(report, dict):
        raise ValueError("invalid proof report")
    source = report.get("source")
    if not isinstance(source, dict) or source.get("external_resources") != []:
        raise ValueError("unbound source or external render resources; localize resources and regenerate proof")
    paths = verify_files(root, source.get("files"))
    if deck_name not in paths:
        raise ValueError("render proof does not bind the deck bytes")
    return paths


def verify_pdf(root: Path, report: dict, pdf: Path, slides: int) -> None:
    if (type(report.get("schema_version")) is not int or report.get("schema_version") != 2
            or report.get("ok") is not True or report.get("errors") != []):
        raise ValueError("missing byte-bound PDF export proof")
    if (type(report.get("slideCount")) is not int or type(report.get("pageCount")) is not int
            or report.get("slideCount") != slides or report.get("pageCount") != slides):
        raise ValueError("PDF export page/slide count mismatch")
    verify_source(root, report, "deck.html")
    artifact = report.get("artifact")
    if not isinstance(artifact, dict) or artifact.get("path") != pdf.name or report.get("pdf") != pdf.name:
        raise ValueError("PDF export filename identity does not match the supplied PDF")
    if (type(artifact.get("bytes")) is not int or artifact.get("sha256") != digest(pdf)
            or artifact.get("bytes") != pdf.stat().st_size):
        raise ValueError("stale PDF export identity")
