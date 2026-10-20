"""The export boundary must not turn a private checkout into a public archive."""
import importlib.util
from pathlib import Path
import tempfile
import unittest

SPEC = importlib.util.spec_from_file_location("exporter", Path(__file__).with_name("export_public_source.py"))
exporter = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(exporter)


class ExportTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name) / "source"
        self.root.mkdir()
        for name in exporter.ROOT_FILES:
            path = self.root / name
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text("source")
        for name in exporter.SOURCE_TREES:
            path = self.root / name
            path.mkdir(parents=True, exist_ok=True)
            (path / "example.txt").write_text("authored source")
        for name in (".git/private", "publisher/static-server/public/decks/private/deck.pdf",
                     "PLAN.md", "AGENTS.md", "docs/maintenance/private.md",
                     "railway.json", "publisher/static-server/railway.json",
                     "skills/deck-studio/node_modules/private.txt"):
            path = self.root / name
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text("private")
        self.out = Path(self.temp.name) / "export"

    def test_export_excludes_private_owners_and_preserves_source(self):
        exporter.export_source(self.root, self.out)
        self.assertEqual((self.out / "skills/deck-studio/example.txt").read_text(), "authored source")
        for name in (".git", "publisher/static-server/public", "PLAN.md", "AGENTS.md", "docs/maintenance",
                     "railway.json", "publisher/static-server/railway.json",
                     "skills/deck-studio/node_modules"):
            self.assertFalse((self.out / name).exists(), name)
        for name in ("publisher/static-server/Dockerfile", "publisher/static-server/.dockerignore",
                     "docs/HOSTED_DEPLOYMENT.md", "docs/DISTRIBUTION.md"):
            self.assertEqual((self.out / name).read_text(), "source")

    def test_existing_output_is_untouched(self):
        self.out.mkdir()
        (self.out / "keep").write_text("other work")
        with self.assertRaises(ValueError):
            exporter.export_source(self.root, self.out)
        self.assertEqual((self.out / "keep").read_text(), "other work")

    def test_source_symlink_refused_before_output_creation(self):
        (self.root / "scripts/secret").symlink_to(self.root / ".git/private")
        with self.assertRaises(ValueError):
            exporter.export_source(self.root, self.out)
        self.assertFalse(self.out.exists())

    def test_export_inside_checkout_refused(self):
        with self.assertRaises(ValueError):
            exporter.export_source(self.root, self.root / "output")


if __name__ == "__main__":
    unittest.main()
