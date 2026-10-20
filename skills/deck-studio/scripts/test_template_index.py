"""Exercise catalog derivation, stale detection and metadata path boundaries."""

from __future__ import annotations

import json
import shutil
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from build_template_index import build, generated_outputs, read_templates
from validate_template_index import validate


class TemplateIndexTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name) / "templates"
        source = Path(__file__).resolve().parent.parent / "templates"
        shutil.copytree(source, self.root)
        self.metadata = self.root / "bold" / "8-bit-orbit" / "template.json"

    def edit(self, transform):
        row = json.loads(self.metadata.read_text())
        transform(row)
        self.metadata.write_text(json.dumps(row))

    def test_all_systems_retained_and_deterministic(self):
        rows = read_templates(self.root)
        self.assertEqual(len(rows), 56)
        self.assertEqual(sum(row["maturity"] == "starter" for row in rows), 8)
        self.assertEqual(sum(row["maturity"] == "developed" for row in rows), 2)
        self.assertEqual(rows, sorted(rows, key=lambda row: row["slug"]))
        first = generated_outputs(self.root)
        build(self.root)
        self.assertEqual(first, generated_outputs(self.root))
        self.assertEqual(validate(self.root / "index.json")["template_count"], 56)

    def test_check_is_read_only_on_stale_metadata(self):
        build(self.root)
        before = {p: p.read_bytes() for p in generated_outputs(self.root)}
        self.edit(lambda row: row.update(visual_signature="A newly authored signature."))
        with self.assertRaisesRegex(ValueError, "stale"):
            build(self.root, check=True)
        self.assertEqual(before, {p: p.read_bytes() for p in before})
        build(self.root)
        generated = json.loads((self.root / "index.json").read_text())
        self.assertEqual(generated["templates"][0]["visual_signature"], "A newly authored signature.")
        self.assertIn("A newly authored signature.", (self.root / "README.md").read_text())

    def test_readable_index_is_validated_too(self):
        build(self.root)
        with (self.root / "README.md").open("a") as file:
            file.write("Unauthored catalog row\n")
        with self.assertRaisesRegex(ValueError, "README.md"):
            validate(self.root / "index.json")

    def test_machine_row_cannot_diverge_from_source(self):
        build(self.root)
        path = self.root / "index.json"
        data = json.loads(path.read_text())
        data["templates"][0]["tone"] = ["unowned"]
        path.write_text(json.dumps(data))
        with self.assertRaisesRegex(ValueError, "index.json"):
            validate(path)

    def test_relative_path_cannot_escape(self):
        self.edit(lambda row: row["paths"].update(design="../outside.md"))
        with self.assertRaisesRegex(ValueError, "invalid relative"):
            read_templates(self.root)

    def test_missing_recipe_rejected(self):
        self.edit(lambda row: row["paths"].update(design="templates/bold/8-bit-orbit/missing.md"))
        with self.assertRaisesRegex(ValueError, "missing or escaping"):
            read_templates(self.root)

    def test_metadata_must_identify_its_own_file(self):
        self.edit(lambda row: row["paths"].update(metadata="templates/bold/biennale-yellow/template.json"))
        with self.assertRaisesRegex(ValueError, "own source"):
            read_templates(self.root)

    def test_font_posture_is_required(self):
        self.edit(lambda row: row["assets"].update(font_delivery="verified-all-languages"))
        with self.assertRaisesRegex(ValueError, "font delivery"):
            read_templates(self.root)


if __name__ == "__main__":
    unittest.main()
