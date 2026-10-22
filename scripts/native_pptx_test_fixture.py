"""Synthetic native Office/proof fixtures; never real rendered acceptance.

Shared by offline Python contracts and real HTTP gateway tests. No authoring or
LibreOffice dependency is required to test package and evidence mechanics.
"""
from __future__ import annotations

import base64
import hashlib
import io
import json
from pathlib import Path
import sys
import zipfile

SCRIPTS = Path(__file__).resolve().parents[1] / "skills/deck-studio/scripts"
sys.path.insert(0, str(SCRIPTS))
from pptx_inspection import inspect_pptx

NATIVE_CONTRACT = {"artifact": "deck.pptx", "report": "proof/pptx-report.json", "review": "proof/pptx-visual-review.json"}
SYNTHETIC = "Synthetic mechanics fixture; no real rendered visual acceptance is claimed."
PNG = base64.b64decode("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIHWP4z8DwHwAFgAI/ScLbtAAAAABJRU5ErkJggg==")


def identity(root: Path, name: str) -> dict:
    value = (root / name).read_bytes()
    return {"path": name, "sha256": hashlib.sha256(value).hexdigest(), "bytes": len(value)}


def save_json(path: Path, value: dict) -> None:
    path.write_text(json.dumps(value, indent=2) + "\n", encoding="utf-8")


def synthetic_workbook(overrides: dict | None = None) -> bytes:
    """A small chart-data workbook for nested package and privacy contracts."""
    spreadsheet = "http://schemas.openxmlformats.org/spreadsheetml/2006/main"
    relationship = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
    parts = {
        "[Content_Types].xml": '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="xml" ContentType="application/xml"/><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/></Types>',
        "_rels/.rels": f'<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="{relationship}/officeDocument" Target="xl/workbook.xml"/></Relationships>',
        "xl/workbook.xml": f'<workbook xmlns="{spreadsheet}" xmlns:r="{relationship}"><sheets><sheet name="Chart data" sheetId="1" r:id="rId1"/></sheets></workbook>',
        "xl/_rels/workbook.xml.rels": f'<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="{relationship}/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="{relationship}/sharedStrings" Target="sharedStrings.xml"/></Relationships>',
        "xl/worksheets/sheet1.xml": f'<worksheet xmlns="{spreadsheet}"><sheetData><row r="1"><c r="A1" t="s"><v>0</v></c></row></sheetData></worksheet>',
        "xl/sharedStrings.xml": f'<sst xmlns="{spreadsheet}" count="1" uniqueCount="1"><si><t>Safe chart label</t></si></sst>',
        "docProps/core.xml": '<coreProperties xmlns="http://schemas.openxmlformats.org/package/2006/metadata/core-properties"><title>Synthetic chart workbook</title></coreProperties>',
    }
    parts.update(overrides or {})
    output = io.BytesIO()
    with zipfile.ZipFile(output, "w", compression=zipfile.ZIP_DEFLATED) as archive:
        for name, data in sorted(parts.items()):
            info = zipfile.ZipInfo(name, date_time=(1980, 1, 1, 0, 0, 0))
            info.compress_type = zipfile.ZIP_DEFLATED
            archive.writestr(info, data)
    return output.getvalue()


def add_native_pptx(root: Path, manifest: dict | None = None) -> dict:
    """Add deterministic editable text slides and explicitly synthetic receipts."""
    root = Path(root)
    if manifest is None:
        manifest = json.loads((root / "deck-manifest.json").read_text())
    count = manifest["slide_count"]
    p = "http://schemas.openxmlformats.org/presentationml/2006/main"
    a = "http://schemas.openxmlformats.org/drawingml/2006/main"
    r = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
    rel = "http://schemas.openxmlformats.org/package/2006/relationships"
    content = "http://schemas.openxmlformats.org/package/2006/content-types"
    files = {
        "[Content_Types].xml": f'<Types xmlns="{content}"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/>' + "".join(f'<Override PartName="/ppt/slides/slide{i}.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>' for i in range(1, count + 1)) + '</Types>',
        "_rels/.rels": f'<Relationships xmlns="{rel}"><Relationship Id="rId1" Type="{r}/officeDocument" Target="ppt/presentation.xml"/></Relationships>',
        "ppt/presentation.xml": f'<p:presentation xmlns:p="{p}" xmlns:r="{r}"><p:sldIdLst>' + "".join(f'<p:sldId id="{255+i}" r:id="rId{i}"/>' for i in range(1, count + 1)) + '</p:sldIdLst><p:sldSz cx="12192000" cy="6858000"/></p:presentation>',
        "ppt/_rels/presentation.xml.rels": f'<Relationships xmlns="{rel}">' + "".join(f'<Relationship Id="rId{i}" Type="{r}/slide" Target="slides/slide{i}.xml"/>' for i in range(1, count + 1)) + '</Relationships>',
    }
    for i in range(1, count + 1):
        files[f"ppt/slides/slide{i}.xml"] = f'<p:sld xmlns:p="{p}" xmlns:a="{a}"><p:cSld><p:spTree><p:sp><p:nvSpPr><p:cNvPr id="2" name="Synthetic text"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr><p:spPr/><p:txBody><a:bodyPr/><a:lstStyle/><a:p><a:r><a:rPr><a:latin typeface="Aptos"/></a:rPr><a:t>Synthetic native fixture {i}</a:t></a:r></a:p></p:txBody></p:sp></p:spTree></p:cSld></p:sld>'
    with zipfile.ZipFile(root / "deck.pptx", "w", compression=zipfile.ZIP_DEFLATED) as archive:
        for name, data in sorted(files.items()):
            info = zipfile.ZipInfo(name, date_time=(1980, 1, 1, 0, 0, 0))
            info.compress_type = zipfile.ZIP_DEFLATED
            archive.writestr(info, data)
    (root / "proof/pptx").mkdir(parents=True, exist_ok=True)
    slides = []
    for i in range(1, count + 1):
        name = f"proof/pptx/slide-{i:02d}.png"
        (root / name).write_bytes(PNG)
        slides.append({"slide": i, "screenshot": identity(root, name), "width": 1, "height": 1})
    artifact = identity(root, "deck.pptx")
    report = {"schema_version": 1, "kind": "native-pptx", "synthetic": True, "ok": True, "errors": [],
              "source": {"files": [artifact], "external_resources": []}, "artifact": artifact,
              "slideCount": count, "native": inspect_pptx(root / "deck.pptx", count),
              "renderer": {"name": "LibreOffice", "version": "synthetic fixture, not executed", "dpi": 1}, "slides": slides}
    save_json(root / NATIVE_CONTRACT["report"], report)
    save_json(root / NATIVE_CONTRACT["review"], {"schema_version": 1, "kind": "native-pptx-review", "synthetic": True,
              "report": identity(root, NATIVE_CONTRACT["report"]), "verdict": "accepted", "reviewer": "Synthetic fixture",
              "reviewedSlides": list(range(1, count + 1)), "notes": SYNTHETIC})
    manifest["pptx"] = dict(NATIVE_CONTRACT)
    manifest["artifacts"] = [identity(root, path.relative_to(root).as_posix()) for path in sorted(root.rglob("*"))
                             if path.is_file() and path.name != "deck-manifest.json"]
    save_json(root / "deck-manifest.json", manifest)
    return manifest


if __name__ == "__main__":
    add_native_pptx(Path(sys.argv[1]))
