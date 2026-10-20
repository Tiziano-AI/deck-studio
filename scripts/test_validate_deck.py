"""Structural and local-resource regressions for the Deck Studio validator."""
from __future__ import annotations

import contextlib
import importlib.util
import io
import subprocess
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
VALIDATOR = ROOT / "skills/deck-studio/scripts/validate_deck.py"
CSS = ".deck-stage {width:1920px;height:1080px}"
JS = "window . WebSlidesStudio = {};"


def load_validator():
    spec = importlib.util.spec_from_file_location("validate_deck", VALIDATOR)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def deck(visible="Quarterly results", linked=False):
    head = '<link rel="stylesheet" href="stage.css">' if linked else f"<style>{CSS}</style>"
    script = '<script src="stage.js"></script>' if linked else f"<script>{JS}</script>"
    return (
        f"<!doctype html><html><head>{head}</head>"
        '<body data-web-slides-studio><div class="extra deck-viewport">'
        f'<main class = "theme deck-stage"><section class="slide active"><p>{visible}</p></section>'
        f"</main></div>{script}</body></html>"
    )


class DeckStructureTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.validator = load_validator()

    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.addCleanup(self.directory.cleanup)
        self.root = Path(self.directory.name)
        self.path = self.root / "deck.html"

    def validate(self, html, files=None):
        self.path.write_text(html)
        for name, content in (files or {}).items():
            target = self.root / name
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_text(content)
        output = io.StringIO()
        with contextlib.redirect_stdout(output):
            try:
                result = self.validator.validate(self.path, 1)
            except SystemExit:
                return False, output.getvalue()
        return True, result

    def test_inline_and_linked_equivalent_with_class_tokens_and_compact_css(self):
        for linked in (False, True):
            with self.subTest(linked=linked):
                ok, report = self.validate(deck(linked=linked), {"stage.css": CSS, "stage.js": JS})
                self.assertTrue(ok, report)
                self.assertEqual(report["slide_count"], 1)

    def test_local_css_import(self):
        ok, report = self.validate(deck(linked=True), {"stage.css": '@import "nested/runtime.css";', "nested/runtime.css": CSS, "stage.js": JS})
        self.assertTrue(ok, report)

    def test_inline_css_import_has_the_same_resource_contract(self):
        for statement in ('@import "stage.css";', '@import url(stage.css);', '@import url("stage.css");'):
            ok, report = self.validate(deck().replace(CSS, statement), {"stage.css": CSS})
            self.assertTrue(ok, report)

    def test_local_module_import_and_export_resources(self):
        for source in ('import "./runtime.js";', 'import { runtime } from "./runtime.js";', 'export { runtime } from "./runtime.js";'):
            ok, report = self.validate(deck(linked=True).replace('<script src=', '<script type="module" src='), {"stage.css": CSS, "stage.js": source, "runtime.js": JS})
            self.assertTrue(ok, report)

    def test_missing_module_dependency_rejected(self):
        ok, report = self.validate(deck(linked=True), {"stage.css": CSS, "stage.js": 'import "./missing.js";' + JS})
        self.assertFalse(ok)
        self.assertIn("missing local", report)

    def test_deliberate_audience_language_is_not_banned(self):
        words = "style option; option b; preview.md; template.json; generated from; file path; proof gate; proof limit; visual acceptance; rendered QA; local artifact; external send requires; content fidelity; metadata leak"
        self.assertTrue(self.validate(deck(words))[0])

    def test_comments_text_attributes_and_near_class_names_are_not_structure(self):
        fake = '<!-- <div class="deck-viewport"><div class="deck-stage"><section class="slide"> -->'
        for source in (
            deck().replace('class="extra deck-viewport"', 'class="deck-viewport-other"'),
            deck().replace('class = "theme deck-stage"', 'class="deck-stage-other"'),
            deck().replace('class="slide active"', 'class="slide-title"'),
            deck().replace('<section class="slide active">', '<section title="class=slide">'),
        ):
            with self.subTest(source=source):
                self.assertFalse(self.validate(source.replace("</body>", fake + "</body>"))[0])

    def test_slide_outside_stage_and_nested_slide_rejected(self):
        for source in (
            deck().replace('<main class = "theme deck-stage">', '<main class = "theme deck-stage"></main>'),
            deck().replace("<p>", '<div class="slide"><p>').replace("</p>", "</p></div>"),
        ):
            self.assertFalse(self.validate(source)[0])

    def test_inert_template_does_not_supply_structure(self):
        source = '<html><body data-web-slides-studio><template>' + deck() + '</template></body></html>'
        self.assertFalse(self.validate(source)[0])

    def test_linked_css_and_js_are_actually_checked(self):
        for files, expected in (
            ({"stage.css": ".other {width:1920px;height:1080px}", "stage.js": JS}, "fixed-stage"),
            ({"stage.css": CSS, "stage.js": "const irrelevant = 1"}, "runtime API"),
            ({"stage.css": CSS + ".slide{display:none}", "stage.js": JS}, "display:none"),
            ({"stage.css": CSS}, "missing local"),
        ):
            with self.subTest(expected=expected):
                with tempfile.TemporaryDirectory() as folder:
                    self.root = Path(folder); self.path = self.root / "deck.html"
                    ok, report = self.validate(deck(linked=True), files)
                    self.assertFalse(ok)
                    self.assertIn(expected, report)

    def test_remote_missing_and_escaped_linked_resources_rejected(self):
        for url in ("missing.css", "../outside.css", "https://example.com/style.css", "/stage.css"):
            ok, report = self.validate(deck(linked=True).replace("stage.css", url), {"stage.js": JS})
            self.assertFalse(ok, report)

    def test_private_paths_and_secret_tokens_rejected_in_html_and_local_code(self):
        for token in ("/Users/private/file", "file:///private/file", "OPENAI_API_KEY"):
            self.assertFalse(self.validate(deck(token))[0])
            self.assertFalse(self.validate(deck(linked=True), {"stage.css": CSS, "stage.js": JS + f"/*{token}*/"})[0])

    def test_stage_size_in_comment_or_unrelated_css_does_not_count(self):
        for css in (f"/* {CSS} */", ".other{width:1920px;height:1080px}", ".deck-stage .child{width:1920px;height:1080px}"):
            self.assertFalse(self.validate(deck(linked=True), {"stage.css": css, "stage.js": JS})[0])


class PythonCompatibilityTests(unittest.TestCase):
    def test_packager_imports_and_runs_help_with_python39_when_available(self):
        python = Path("/usr/bin/python3")
        if not python.exists():
            self.skipTest("system Python unavailable")
        result = subprocess.run([str(python), str(ROOT / "scripts/package_deck_release.py"), "--help"], capture_output=True, text=True)
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)


if __name__ == "__main__":
    unittest.main()
