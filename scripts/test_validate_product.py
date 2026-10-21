"""Validate native distribution identity and distributed instruction boundaries."""
import contextlib
import importlib.util
import io
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

SPEC = importlib.util.spec_from_file_location("product_validator", Path(__file__).with_name("validate_product.py"))
validator = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(validator)


class DistributionMetadataTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        source = Path(__file__).resolve().parents[1]
        for name in ("plugin.json", ".claude-plugin/plugin.json", "package.json", "package-lock.json",
                     "skills/deck-studio/package.json", "skills/deck-studio/package-lock.json",
                     "publisher/static-server/package.json"):
            target = self.root / name
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_bytes((source / name).read_bytes())
        self.patch = patch.object(validator, "REPO_ROOT", self.root)
        self.patch.start()
        self.addCleanup(self.patch.stop)

    def edit(self, name, change):
        path = self.root / name
        value = json.loads(path.read_text())
        change(value)
        path.write_text(json.dumps(value))

    def assert_rejected(self):
        with contextlib.redirect_stdout(io.StringIO()), self.assertRaises(SystemExit):
            validator.validate_distribution_metadata()

    def test_current_metadata_is_consistent(self):
        result = validator.validate_distribution_metadata()
        self.assertEqual(result["name"], "deck-studio")

    def test_private_predecessor_is_not_the_public_destination(self):
        self.edit(".claude-plugin/plugin.json", lambda value: value.update(repository="https://github.com/Tiziano-AI/decks"))
        self.assert_rejected()

    def test_mixed_native_versions_are_rejected(self):
        self.edit(".claude-plugin/plugin.json", lambda value: value.update(version="0.0.0"))
        self.assert_rejected()

    def test_skill_lock_version_is_checked(self):
        self.edit("skills/deck-studio/package-lock.json", lambda value: value["packages"][""].update(version="0.0.0"))
        self.assert_rejected()

    def test_root_cannot_own_producer_workspaces_or_dependencies(self):
        path = self.root / "package.json"
        original = path.read_bytes()
        for field, value in (("workspaces", ["skills/deck-studio"]),
                             ("dependencies", {"@tiziano-ai/deck-studio": "file:skills/deck-studio"})):
            with self.subTest(field=field):
                path.write_bytes(original)
                self.edit("package.json", lambda manifest: manifest.update({field: value}))
                self.assert_rejected()

    def test_root_lock_cannot_retain_workspace_metadata(self):
        self.edit("package-lock.json", lambda value: value["packages"][""].update(workspaces=["skills/deck-studio"]))
        self.assert_rejected()

    def test_root_lock_cannot_link_or_bundle_the_producer(self):
        producer = json.loads((self.root / "skills/deck-studio/package.json").read_text())
        self.edit("package-lock.json", lambda value: value["packages"].update({
            "node_modules/@tiziano-ai/deck-studio": {"resolved": "skills/deck-studio", "link": True},
            "skills/deck-studio": producer,
        }))
        self.assert_rejected()

    def test_preinstall_website_is_required(self):
        self.edit("plugin.json", lambda value: value["extensions"]["com.openai"]["interface"].pop("websiteURL"))
        self.assert_rejected()


class TemplateGuidanceTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        skill = self.root / "skills/deck-studio"
        skill.mkdir(parents=True)
        (skill / "SKILL.md").write_text("# Deck Studio\n")
        self.design = skill / "templates/house/example/design.md"
        self.design.parent.mkdir(parents=True)
        self.patch = patch.object(validator, "REPO_ROOT", self.root)
        self.patch.start()
        self.addCleanup(self.patch.stop)

    def test_generic_content_approval_routes_are_rejected(self):
        old_routes = (
            "Do not delete content for fit; return meaning changes to content approval.",
            "Recompose or split crowded material without dropping content; return meaning-changing edits to content approval.",
            "If adaptation would change audience-visible meaning, return to content approval outside the slide frame.",
        )
        for text in old_routes:
            with self.subTest(text=text):
                self.design.write_text("Respect explicitly user-locked meaning.\n" + text)
                output = io.StringIO()
                with contextlib.redirect_stdout(output), self.assertRaises(SystemExit):
                    validator.validate_package_resources()
                self.assertIn("obsolete content-approval route", output.getvalue())

    def test_semantic_revision_with_user_lock_boundary_is_allowed(self):
        self.design.write_text(
            "Keep visual variants identical in meaning; do not change claims or numbers for fit. "
            "If a semantic revision is needed, reopen the source within the mandate and carry "
            "the change through the artifact. Ask only before changing explicitly user-locked "
            "meaning or exceeding authority; keep that discussion outside the slide frame."
        )
        result = validator.validate_package_resources()
        self.assertEqual(result["public_skills"], ["deck-studio"])

    def test_content_approval_limited_to_explicit_user_lock_is_allowed(self):
        self.design.write_text(
            "If this changes explicitly user-locked meaning, return to content approval "
            "outside the slide frame."
        )
        result = validator.validate_package_resources()
        self.assertEqual(result["public_skills"], ["deck-studio"])


if __name__ == "__main__":
    unittest.main()
