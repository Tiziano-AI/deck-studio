"""Release metadata must not send native consumers to a different product/version."""
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


if __name__ == "__main__":
    unittest.main()
