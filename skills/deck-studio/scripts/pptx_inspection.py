#!/usr/bin/env python3
"""Bounded, read-only OOXML inspection; appearance requires a separate render."""
from __future__ import annotations

import argparse
import json
import posixpath
import re
import stat
import zipfile
from pathlib import Path
from urllib.parse import urlsplit
import xml.etree.ElementTree as ET

NS = {
    "p": "http://schemas.openxmlformats.org/presentationml/2006/main",
    "a": "http://schemas.openxmlformats.org/drawingml/2006/main",
    "r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
    "c": "http://schemas.openxmlformats.org/drawingml/2006/chart",
    "rel": "http://schemas.openxmlformats.org/package/2006/relationships",
}
MAX_ARCHIVE = 100 * 1024 * 1024
MAX_EXPANDED = 256 * 1024 * 1024
MAX_PART = 32 * 1024 * 1024
MAX_ENTRIES = 10000


def _safe_name(name: str) -> str:
    if (not name or "\\" in name or "\x00" in name or name.startswith("/")
            or any(part in {"", ".", ".."} for part in name.rstrip("/").split("/"))):
        raise ValueError("unsafe Office ZIP member path")
    return name


def _xml(data: bytes, name: str) -> ET.Element:
    if re.search(br"<!\s*(?:DOCTYPE|ENTITY)", data, re.IGNORECASE):
        raise ValueError(f"XML declarations are not allowed in {name}")
    try:
        return ET.fromstring(data)
    except ET.ParseError as exc:
        raise ValueError(f"malformed Office XML: {name}") from exc


def _relationship_source(name: str) -> str:
    if name == "_rels/.rels":
        return ""
    parent, filename = posixpath.split(name)
    if not parent.endswith("/_rels") or not filename.endswith(".rels"):
        raise ValueError("invalid relationship part location")
    return posixpath.join(parent[:-6], filename[:-5])


def _target(source: str, value: str) -> str:
    if not value or "\\" in value or "\x00" in value or urlsplit(value).scheme or "#" in value:
        raise ValueError("invalid internal Office relationship target")
    target = posixpath.normpath(posixpath.join(posixpath.dirname(source), value))
    if value.startswith("/"):
        target = posixpath.normpath(value.lstrip("/"))
    _safe_name(target)
    return target


def inspect_pptx(path: Path, expected_slides: int | None = None) -> dict:
    """Return stable structural facts, rejecting corrupt or unsafe Office packages.

    Object counts establish native structures, not that all meaningful content
    remains editable. A reviewer must compare the render with the meaning source.
    """
    path = Path(path)
    if not path.is_file() or path.stat().st_size > MAX_ARCHIVE:
        raise ValueError("PPTX must be a local file no larger than 100 MiB")
    try:
        archive = zipfile.ZipFile(path)
    except (OSError, zipfile.BadZipFile) as exc:
        raise ValueError("not a readable PPTX ZIP package") from exc
    with archive:
        entries = archive.infolist()
        if len(entries) > MAX_ENTRIES or sum(row.file_size for row in entries) > MAX_EXPANDED:
            raise ValueError("Office ZIP exceeds entry or expanded-size limit")
        names: set[str] = set()
        for row in entries:
            name = _safe_name(row.filename)
            if name in names:
                raise ValueError("duplicate Office ZIP member")
            names.add(name)
            if (row.flag_bits & 1 or row.compress_type not in {zipfile.ZIP_STORED, zipfile.ZIP_DEFLATED}
                    or row.file_size > MAX_PART or stat.S_ISLNK(row.external_attr >> 16)):
                raise ValueError("unsupported or oversized Office ZIP member")
        for required in ("[Content_Types].xml", "_rels/.rels", "ppt/presentation.xml", "ppt/_rels/presentation.xml.rels"):
            if required not in names:
                raise ValueError(f"missing Office part: {required}")
        try:
            if archive.testzip() is not None:
                raise ValueError("Office ZIP member checksum mismatch")
        except (OSError, RuntimeError, zipfile.BadZipFile) as exc:
            raise ValueError("unreadable Office ZIP member") from exc
        documents = {}
        try:
            for name in sorted(names):
                if name.endswith((".xml", ".rels")):
                    documents[name] = _xml(archive.read(name), name)
        except (OSError, RuntimeError, zipfile.BadZipFile) as exc:
            raise ValueError("unreadable Office ZIP member") from exc
        types = documents["[Content_Types].xml"]
        if any("macroenabled" in row.get("ContentType", "").lower() for row in types):
            raise ValueError("macro-enabled Office packages are not native PPTX output")
        if any("vbaproject" in name.lower() for name in names):
            raise ValueError("Office macros are not allowed")
        relationships: dict[str, dict[str, dict]] = {}
        external_hyperlinks = 0
        for name, document in documents.items():
            if not name.endswith(".rels"):
                continue
            source = _relationship_source(name)
            rows = {}
            for row in document:
                identity, target, kind = row.get("Id"), row.get("Target"), row.get("Type", "")
                if not identity or identity in rows or not target:
                    raise ValueError("missing or duplicate Office relationship identity")
                if row.get("TargetMode") == "External":
                    scheme = urlsplit(target).scheme.lower()
                    if not kind.endswith("/hyperlink") or scheme not in {"https", "http", "mailto"}:
                        raise ValueError("external linked Office resources are not allowed; embed resources")
                    external_hyperlinks += 1
                    rows[identity] = {"type": kind, "external": True}
                else:
                    resolved = _target(source, target)
                    if resolved not in names:
                        raise ValueError(f"missing Office relationship target: {resolved}")
                    rows[identity] = {"type": kind, "target": resolved, "external": False}
            relationships[source] = rows
        presentation = documents["ppt/presentation.xml"]
        size = presentation.find("p:sldSz", NS)
        try:
            width, height = int(size.get("cx")), int(size.get("cy"))
        except (TypeError, AttributeError, ValueError):
            raise ValueError("missing or invalid slide dimensions") from None
        if width <= 0 or height <= 0:
            raise ValueError("invalid slide dimensions")
        identifiers = presentation.findall("p:sldIdLst/p:sldId", NS)
        if not identifiers or len(identifiers) > 1000:
            raise ValueError("PPTX must contain between 1 and 1000 slides")
        if expected_slides is not None and len(identifiers) != expected_slides:
            raise ValueError("PPTX slide count does not match expected count")
        slides, used_parts, fonts = [], set(), set()
        for number, identifier in enumerate(identifiers, 1):
            relation = relationships["ppt/presentation.xml"].get(identifier.get(f"{{{NS['r']}}}id"))
            if not relation or relation["external"] or not relation["type"].endswith("/slide"):
                raise ValueError("invalid presentation slide relationship")
            part = relation["target"]
            if part in used_parts or part not in documents:
                raise ValueError("missing or duplicated presentation slide")
            used_parts.add(part)
            document = documents[part]
            shapes = document.findall(".//p:sp", NS)
            text_shapes = [shape for shape in shapes if any((row.text or "").strip() for row in shape.findall(".//a:t", NS))]
            for row in document.findall(".//a:latin", NS):
                if row.get("typeface"):
                    fonts.add(row.get("typeface"))
            slides.append({
                "slide": number,
                "textShapes": len(text_shapes),
                "textRuns": len(document.findall(".//a:t", NS)),
                "nativeShapes": len(shapes) - len(text_shapes),
                "tables": len(document.findall(".//a:tbl", NS)),
                "charts": len(document.findall(".//c:chart", NS)),
                "pictures": len(document.findall(".//p:pic", NS)),
            })
        keys = ("textShapes", "textRuns", "nativeShapes", "tables", "charts", "pictures")
        return {
            "slideCount": len(slides),
            "slideSizeEmu": {"width": width, "height": height},
            "slides": slides,
            "totals": {key: sum(row[key] for row in slides) for key in keys},
            "fonts": sorted(fonts),
            "embeddedWorkbookCount": sum(name.startswith("ppt/embeddings/") and name.endswith(".xlsx") for name in names),
            "externalHyperlinks": external_hyperlinks,
            "rasterOnlySlides": [row["slide"] for row in slides if row["pictures"] and not any(row[key] for key in ("textShapes", "nativeShapes", "tables", "charts"))],
        }


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("pptx", type=Path)
    parser.add_argument("--expect-slides", type=int)
    args = parser.parse_args()
    try:
        print(json.dumps(inspect_pptx(args.pptx, args.expect_slides), indent=2))
    except (OSError, ValueError) as exc:
        print(json.dumps({"ok": False, "error": str(exc)}))
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
