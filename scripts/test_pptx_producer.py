"""Native producer/OOXML tests; rendering is an explicitly enabled integration."""
from __future__ import annotations

import importlib.util
import json
import os
import shutil
import subprocess
import sys
import tempfile
import unittest
import warnings
import zipfile
from pathlib import Path
from unittest.mock import patch

REPO = Path(__file__).resolve().parents[1]
SKILL = Path(os.environ.get("DECKS_TEST_SKILL_ROOT", REPO / "skills/deck-studio"))
SCRIPTS = SKILL / "scripts"
spec = importlib.util.spec_from_file_location("pptx_inspection", SCRIPTS / "pptx_inspection.py")
inspection = importlib.util.module_from_spec(spec)
spec.loader.exec_module(inspection)
render_spec = importlib.util.spec_from_file_location("render_pptx", SCRIPTS / "render_pptx.py")
renderer = importlib.util.module_from_spec(render_spec)
with patch.dict(sys.modules, {"pptx_inspection": inspection}):
    render_spec.loader.exec_module(renderer)


def fixture(path: Path, *, target="slides/slide1.xml", external=False) -> None:
    p = "http://schemas.openxmlformats.org/presentationml/2006/main"
    a = "http://schemas.openxmlformats.org/drawingml/2006/main"
    r = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
    rel = "http://schemas.openxmlformats.org/package/2006/relationships"
    parts = {
        "[Content_Types].xml": '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"/>',
        "_rels/.rels": f'<Relationships xmlns="{rel}"><Relationship Id="root" Type="{r}/officeDocument" Target="ppt/presentation.xml"/></Relationships>',
        "ppt/presentation.xml": f'<p:presentation xmlns:p="{p}" xmlns:r="{r}"><p:sldIdLst><p:sldId id="256" r:id="slide"/></p:sldIdLst><p:sldSz cx="12192000" cy="6858000"/></p:presentation>',
        "ppt/_rels/presentation.xml.rels": f'<Relationships xmlns="{rel}"><Relationship Id="slide" Type="{r}/slide" Target="{target}"/></Relationships>',
        "ppt/slides/slide1.xml": f'<p:sld xmlns:p="{p}" xmlns:a="{a}"><p:cSld><p:spTree><p:sp><p:txBody><a:p><a:r><a:rPr><a:latin typeface="Arial"/></a:rPr><a:t>Editable text</a:t></a:r></a:p></p:txBody></p:sp></p:spTree></p:cSld></p:sld>',
    }
    if external:
        parts["ppt/slides/_rels/slide1.xml.rels"] = f'<Relationships xmlns="{rel}"><Relationship Id="image" Type="{r}/image" Target="https://example.invalid/image.png" TargetMode="External"/></Relationships>'
    with zipfile.ZipFile(path, "w", zipfile.ZIP_DEFLATED) as archive:
        for name, data in parts.items():
            archive.writestr(name, data)


class NativeInspectionTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory(prefix="deck-studio-pptx-test-")
        self.addCleanup(self.temporary.cleanup)
        self.root = Path(self.temporary.name)
        self.path = self.root / "deck.pptx"

    def test_literal_native_fixture_has_expected_object_and_font_facts(self):
        fixture(self.path)
        result = inspection.inspect_pptx(self.path, expected_slides=1)
        self.assertEqual(result["slideSizeEmu"], {"width": 12192000, "height": 6858000})
        self.assertEqual(result["totals"], {"textShapes": 1, "textRuns": 1, "nativeShapes": 0, "tables": 0, "charts": 0, "pictures": 0})
        self.assertEqual(result["fonts"], ["Arial"])
        self.assertNotIn(str(self.root), json.dumps(result))
        self.assertEqual(result, inspection.inspect_pptx(self.path))

    def test_slide_count_and_missing_relationship_are_real_failures(self):
        fixture(self.path)
        with self.assertRaisesRegex(ValueError, "slide count"):
            inspection.inspect_pptx(self.path, expected_slides=2)
        fixture(self.path, target="slides/missing.xml")
        with self.assertRaisesRegex(ValueError, "relationship target"):
            inspection.inspect_pptx(self.path)

    def test_external_resources_are_rejected_not_falsely_reported_embedded(self):
        fixture(self.path, external=True)
        with self.assertRaisesRegex(ValueError, "external linked"):
            inspection.inspect_pptx(self.path)

    def test_duplicate_and_escaped_members_fail_before_xml_use(self):
        fixture(self.path)
        with warnings.catch_warnings():
            warnings.simplefilter("ignore", UserWarning)
            with zipfile.ZipFile(self.path, "a") as archive:
                archive.writestr("ppt/slides/slide1.xml", "<different/>")
        with self.assertRaisesRegex(ValueError, "duplicate"):
            inspection.inspect_pptx(self.path)
        fixture(self.path)
        with zipfile.ZipFile(self.path, "a") as archive:
            archive.writestr("../outside.xml", "<outside/>")
        with self.assertRaisesRegex(ValueError, "unsafe"):
            inspection.inspect_pptx(self.path)

    def test_xml_entities_and_macros_are_rejected(self):
        fixture(self.path)
        with zipfile.ZipFile(self.path, "a") as archive:
            archive.writestr("ppt/hostile.xml", '<!DOCTYPE x [<!ENTITY e "content">]><x>&e;</x>')
        with self.assertRaisesRegex(ValueError, "XML declarations"):
            inspection.inspect_pptx(self.path)
        fixture(self.path)
        with zipfile.ZipFile(self.path, "a") as archive:
            archive.writestr("ppt/vbaProject.bin", b"not-supported")
        with self.assertRaisesRegex(ValueError, "macros"):
            inspection.inspect_pptx(self.path)


class NativeRenderOutputTests(unittest.TestCase):
    def test_atomic_proof_replacement_leaves_no_scratch(self):
        with tempfile.TemporaryDirectory(prefix="deck-studio-pptx-output-") as temporary:
            root = Path(temporary)
            output = root / "capture.png"
            output.write_bytes(b"before")
            renderer.replace_output(output, b"after", root)
            self.assertEqual(output.read_bytes(), b"after")
            self.assertEqual([item.name for item in root.iterdir()], ["capture.png"])

    def test_proof_destinations_cannot_follow_file_or_directory_links(self):
        with tempfile.TemporaryDirectory(prefix="deck-studio-pptx-output-") as temporary:
            root = Path(temporary) / "deck"
            root.mkdir()
            foreign = Path(temporary) / "other"
            foreign.mkdir()
            original = foreign / "original.png"
            original.write_bytes(b"untouched")
            output = root / "capture.png"
            output.symlink_to(original)
            with self.assertRaisesRegex(ValueError, "symlink"):
                renderer.replace_output(output, b"replaced", root)
            (root / "pptx").symlink_to(foreign, target_is_directory=True)
            with self.assertRaisesRegex(ValueError, "symlink"):
                renderer.prepare_output(root / "pptx", root, directory=True)
            self.assertEqual(original.read_bytes(), b"untouched")


@unittest.skipUnless(os.environ.get("DECKS_TEST_NATIVE_PPTX") == "1", "set DECKS_TEST_NATIVE_PPTX=1 for the installed producer integration")
class NativeProducerIntegrationTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory(prefix="deck-studio-pptx-integration-")
        self.addCleanup(self.temporary.cleanup)
        self.root = Path(self.temporary.name)

    def command(self, *args):
        result = subprocess.run(list(args), capture_output=True, text=True, cwd=self.root, timeout=180)
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        return json.loads(result.stdout)

    def test_real_upstream_export_retains_table_chart_workbook_and_diagram(self):
        output = self.root / "deck.pptx"
        built = self.command(shutil.which("node") or "node", str(SCRIPTS / "build_pptx.mjs"), str(SKILL / "examples/native-pptx/deck.mjs"), str(output))
        native = inspection.inspect_pptx(output, 4)
        self.assertEqual(built["native"], native)
        self.assertEqual(native["slides"][2]["tables"], 1)
        self.assertEqual(native["slides"][3]["charts"], 1)
        self.assertEqual(native["embeddedWorkbookCount"], 1)
        self.assertGreaterEqual(native["slides"][1]["nativeShapes"], 5)
        self.assertEqual(native["rasterOnlySlides"], [])
        self.assertEqual(native["totals"]["pictures"], 0)

    @unittest.skipUnless(os.environ.get("DECKS_TEST_NATIVE_RENDER") == "1", "set DECKS_TEST_NATIVE_RENDER=1 for actual LibreOffice/Poppler rendering")
    def test_real_render_binds_artifact_and_every_native_slide(self):
        output = self.root / "deck.pptx"
        self.command(shutil.which("node") or "node", str(SCRIPTS / "build_pptx.mjs"), str(SKILL / "examples/native-pptx/deck.mjs"), str(output))
        report = self.command(shutil.which("python3") or "python3", str(SCRIPTS / "render_pptx.py"), str(output), "--expect-slides", "4")
        self.assertEqual(report["artifact"], report["source"]["files"][0])
        self.assertEqual(report["native"], inspection.inspect_pptx(output, 4))
        self.assertEqual([row["slide"] for row in report["slides"]], [1, 2, 3, 4])
        self.assertTrue(all((self.root / row["screenshot"]["path"]).is_file() for row in report["slides"]))
        self.assertTrue(report["renderer"]["pdfFonts"])
        self.assertFalse((self.root / "proof/pptx-visual-review.json").exists())


if __name__ == "__main__":
    unittest.main()
