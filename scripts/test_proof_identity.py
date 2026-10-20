"""Isolated actual-renderer/exporter and release-admission regressions.

The visual review is an explicitly synthetic contract fixture, not a human
visual-quality verdict. No existing release or hosted service is mutated.
"""
from __future__ import annotations

import hashlib
import importlib.util
import json
import os
import shutil
import subprocess
import sys
import tempfile
import unittest
from unittest.mock import patch
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "skills/deck-studio/scripts"))
from proof_identity import verify_pdf

# The same suite can exercise an explicitly selected installed producer while
# source admission remains the consumer. Default is the source package.
SKILL_ROOT = Path(os.environ.get("DECKS_TEST_SKILL_ROOT", ROOT / "skills/deck-studio"))
SCRIPTS = SKILL_ROOT / "scripts"


def run(*args: object) -> subprocess.CompletedProcess:
    environment = {**os.environ, "PLAYWRIGHT_BROWSERS_PATH": str(Path(tempfile.gettempdir()) / "decks-no-shared-browser-cache")}
    return subprocess.run([str(a) for a in args], cwd=tempfile.gettempdir(), env=environment, text=True, capture_output=True, timeout=90)


def load_packager():
    spec = importlib.util.spec_from_file_location("packager", ROOT / "scripts/package_deck_release.py")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


class ProofIdentityTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.workspace = tempfile.TemporaryDirectory(prefix="decks-proof-identity-test-")
        cls.addClassCleanup(cls.workspace.cleanup)
        cls.releases = tempfile.TemporaryDirectory(prefix=".proof-release-test-", dir=ROOT)
        cls.addClassCleanup(cls.releases.cleanup)
        cls.base = Path(cls.workspace.name) / "baseline"
        cls.base.mkdir()
        runtime = SKILL_ROOT / "runtime"
        shutil.copy2(runtime / "deck-stage.css", cls.base / "theme-a.css")
        shutil.copy2(cls.base / "theme-a.css", cls.base / "stage.css")
        shutil.copy2(runtime / "deck-stage.js", cls.base / "stage.js")
        (cls.base / "deck.html").write_text('''<!doctype html><html><head><meta charset="utf-8">
<title>Identity regression fixture</title><link rel="stylesheet" href="stage.css">
<style>.slide{background:linear-gradient(135deg,#123456,#542376);color:white;padding:140px;font:48px system-ui}h1{font-size:100px}</style>
</head><body data-web-slides-studio><div class="deck-viewport"><main class="deck-stage">
<section class="slide active"><h1>Exact bytes</h1><p>Training topic: visual acceptance and content fidelity.</p></section>
</main></div><script src="stage.js"></script></body></html>  \n''')
        for command in [
            ["node", SCRIPTS / "render_qa.mjs", cls.base / "deck.html", "--out", cls.base / "proof", "--delivery", "library"],
            ["node", SCRIPTS / "export_pdf.mjs", cls.base / "deck.html", cls.base / "deck.pdf", "--proof", cls.base / "proof/pdf-report.json", "--delivery", "library"],
        ]:
            result = run(*command)
            print(result.stdout, end="", flush=True)
            if result.returncode:
                raise AssertionError(result.stdout + result.stderr)
        report = cls.base / "proof/report.json"
        review = {
            "schema_version": 2, "render_report_sha256": hashlib.sha256(report.read_bytes()).hexdigest(),
            "artifact": "deck.html", "status": "pass", "inspected_by": "agent",
            "slides_inspected": "all", "inspected_viewports": ["desktop", "phone"],
            "evidence": ["proof/screenshots/desktop-slide-01.png"], "failures": [],
        }
        for key in ["content_fidelity", "render_mechanics", "de_visu_inspection", "taste_judgment", "metadata_leak"]:
            review[key] = "pass"
        for key in ["visual_thesis", "template_fit", "density_fit", "weakness", "residual_risk"]:
            review[key] = "Synthetic contract fixture; no real visual acceptance is claimed."
        (cls.base / "proof/visual-review.json").write_text(json.dumps(review, indent=2) + "\n")
        result = run(sys.executable, SCRIPTS / "validate_visual_review.py", cls.base / "proof/visual-review.json", "--report", report, "--deck", cls.base / "deck.html", "--expect-slides", 1)
        print(result.stdout, end="", flush=True)
        if result.returncode:
            raise AssertionError(result.stdout + result.stderr)

    def setUp(self):
        self.case = Path(self.workspace.name) / self._testMethodName
        self.source = self.case / "source"
        shutil.copytree(self.base, self.source, symlinks=True)
        self.packager = load_packager()
        self.packager.PUBLIC_ROOT = Path(self.releases.name) / self._testMethodName
        self.packager.RELEASE_ROOT = self.packager.PUBLIC_ROOT / "decks"

    def package(self):
        return self.packager.package_release(self.source, "fixture", None, "test", "test", 1, "test")

    def test_git_free_source_fails_before_creating_a_partial_release(self):
        with patch.object(self.packager, "REPO_ROOT", self.case):
            with self.assertRaisesRegex(SystemExit, "Git source checkout with a committed HEAD"):
                self.package()
        self.assertFalse(self.packager.RELEASE_ROOT.exists())

    def test_actual_producers_unchanged_release_admitted_byte_exact(self):
        pdf_report = json.loads((self.source / "proof/pdf-report.json").read_text())
        self.assertEqual(pdf_report["pdf"], "deck.pdf")
        self.assertEqual(pdf_report["artifact"]["path"], "deck.pdf")
        verify_pdf(self.source, pdf_report, self.source / "deck.pdf", 1)
        manifest = self.package()
        release = self.packager.RELEASE_ROOT / "fixture/test"
        self.assertEqual(manifest["schema_version"], 3)
        self.assertEqual(manifest["visibility"], "unassigned")
        cover_bytes = (self.source / "proof/screenshots/desktop-slide-01.png").read_bytes()
        self.assertEqual((release / "cover.png").read_bytes(), cover_bytes)
        cover_row = next(row for row in manifest["artifacts"] if row["path"] == "cover.png")
        self.assertEqual(cover_row["sha256"], hashlib.sha256(cover_bytes).hexdigest())
        self.assertEqual(cover_row["bytes"], len(cover_bytes))
        for name in ["deck.html", "deck.pdf", "stage.css", "stage.js", "proof/report.json", "proof/visual-review.json", "proof/pdf-report.json"]:
            self.assertEqual((self.source / name).read_bytes(), (release / name).read_bytes(), name)
        report = json.loads((release / "proof/report.json").read_text())
        self.assertEqual({row["path"] for row in report["source"]["files"]}, {"deck.html", "stage.css", "stage.js"})
        result = run(sys.executable, ROOT / "scripts/validate_product.py", "--release", release)
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        with tempfile.TemporaryDirectory(prefix="decks-external-bundle-") as outside:
            bundle = Path(outside) / "release"
            shutil.copytree(release, bundle)
            result = run(sys.executable, ROOT / "scripts/validate_product.py", "--release", bundle)
            self.assertEqual(result.returncode, 0, result.stdout + result.stderr)

    def test_actual_custom_pdf_filename_is_bound_but_not_a_canonical_release(self):
        custom = self.source / "scambio-libri.pdf"
        proof = self.source / "proof/pdf-report.json"
        result = run("node", SCRIPTS / "export_pdf.mjs", self.source / "deck.html", custom, "--proof", proof, "--delivery", "library")
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        report = json.loads(proof.read_text())
        self.assertEqual(report["pdf"], custom.name)
        self.assertEqual(report["artifact"]["path"], custom.name)
        self.assertEqual(report["artifact"]["sha256"], hashlib.sha256(custom.read_bytes()).hexdigest())
        self.assertEqual(report["artifact"]["bytes"], custom.stat().st_size)
        verify_pdf(self.source, report, custom, 1)
        (self.source / "deck.pdf").unlink()
        with self.assertRaisesRegex(SystemExit, "release packaging requires deck.pdf"):
            self.package()
        self.assertFalse(self.packager.RELEASE_ROOT.exists())
        # The installed-consumer workaround renamed bytes; a truthful named
        # proof now rejects that workaround instead of silently laundering it.
        custom.rename(self.source / "deck.pdf")
        with self.assertRaisesRegex(ValueError, "filename identity"):
            verify_pdf(self.source, report, self.source / "deck.pdf", 1)

    def test_pdf_report_and_artifact_names_must_both_match(self):
        report = json.loads((self.source / "proof/pdf-report.json").read_text())
        for field in ("pdf", "artifact"):
            changed = json.loads(json.dumps(report))
            if field == "pdf":
                changed["pdf"] = "incorrect.pdf"
            else:
                changed["artifact"]["path"] = "incorrect.pdf"
            with self.assertRaisesRegex(ValueError, "filename identity"):
                verify_pdf(self.source, changed, self.source / "deck.pdf", 1)

    def test_extra_local_review_evidence_is_preserved_and_manifest_bound(self):
        image = self.source / "proof/laptop/slide-01.png"
        image.parent.mkdir()
        shutil.copy2(self.source / "proof/screenshots/desktop-slide-01.png", image)
        navigation = self.source / "proof/navigation.json"
        navigation.write_text('{"keyboard": "pass", "fixture": true}\n')
        review_path = self.source / "proof/visual-review.json"
        review = json.loads(review_path.read_text())
        review["evidence"].extend(["proof/laptop/slide-01.png", "./proof/navigation.json", "Browser inspection of all slides", "https://example.com/review"])
        review_path.write_text(json.dumps(review) + "\n")
        report_before = (self.source / "proof/report.json").read_bytes()
        manifest = self.package()
        release = self.packager.RELEASE_ROOT / "fixture/test"
        rows = {row["path"]: row for row in manifest["artifacts"]}
        for name in ("proof/laptop/slide-01.png", "proof/navigation.json", "proof/visual-review.json"):
            source_bytes = (self.source / name).read_bytes()
            self.assertEqual(source_bytes, (release / name).read_bytes())
            self.assertEqual(rows[name]["sha256"], hashlib.sha256(source_bytes).hexdigest())
            self.assertEqual(rows[name]["bytes"], len(source_bytes))
        self.assertEqual(report_before, (release / "proof/report.json").read_bytes())
        result = run(sys.executable, ROOT / "scripts/validate_product.py", "--release", release)
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)

    def test_missing_or_escaped_review_evidence_rejected_before_bundle_creation(self):
        (self.source / "private.png").write_bytes(b"outside proof folder")
        (self.source / "proof/escaped.png").symlink_to("../private.png")
        review_path = self.source / "proof/visual-review.json"
        original = json.loads(review_path.read_text())
        for evidence in ("proof/missing.png", "proof/../private.png", "proof/escaped.png"):
            with self.subTest(evidence=evidence):
                review = dict(original)
                review["evidence"] = [*original["evidence"], evidence]
                review_path.write_text(json.dumps(review))
                with self.assertRaisesRegex(SystemExit, "local visual-review evidence"):
                    self.package()
                self.assertFalse(self.packager.RELEASE_ROOT.exists())

    def test_supported_supplemental_text_and_uppercase_png_are_preserved(self):
        names = ["proof/navigation.LOG", "proof/navigation.CSV", "proof/navigation.JsonL", "proof/navigation.tsv", "proof/navigation.HTML"]
        for name in names:
            (self.source / name).write_text('Reviewed navigation: pass\n')
        image = "proof/laptop.PNG"
        shutil.copy2(self.source / "proof/screenshots/desktop-slide-01.png", self.source / image)
        names.append(image)
        review_path = self.source / "proof/visual-review.json"
        review = json.loads(review_path.read_text())
        review["evidence"].extend(names)
        review_path.write_text(json.dumps(review))
        self.package()
        release = self.packager.RELEASE_ROOT / "fixture/test"
        for name in names:
            self.assertEqual((self.source / name).read_bytes(), (release / name).read_bytes())
        result = run(sys.executable, ROOT / "scripts/validate_product.py", "--release", release)
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)

    def test_supplemental_text_private_paths_fail_before_packaging(self):
        review_path = self.source / "proof/visual-review.json"
        original = json.loads(review_path.read_text())
        for suffix in (".log", ".CSV", ".JsonL", ".tsv"):
            with self.subTest(suffix=suffix):
                name = "proof/navigation" + suffix
                (self.source / name).write_text("Observed /Users/private/navigation\n")
                review = dict(original)
                review["evidence"] = [*original["evidence"], name]
                review_path.write_text(json.dumps(review))
                with self.assertRaisesRegex(SystemExit, "local proof evidence .* contains /Users/"):
                    self.package()
                self.assertFalse(self.packager.RELEASE_ROOT.exists())

    def test_opaque_or_disguised_supplemental_evidence_fails_before_packaging(self):
        review_path = self.source / "proof/visual-review.json"
        original = json.loads(review_path.read_text())
        for name, data in (("proof/navigation.bin", b"opaque"), ("proof/navigation.LOG", b"\x00opaque"), ("proof/navigation.PNG", b"not a PNG")):
            with self.subTest(name=name):
                (self.source / name).write_bytes(data)
                review = dict(original)
                review["evidence"] = [*original["evidence"], name]
                review_path.write_text(json.dumps(review))
                with self.assertRaisesRegex(SystemExit, "local proof"):
                    self.package()
                self.assertFalse(self.packager.RELEASE_ROOT.exists())

    def test_release_admission_rejects_rehashed_private_log_and_opaque_evidence(self):
        manifest = self.package()
        release = self.packager.RELEASE_ROOT / "fixture/test"
        review_path = release / "proof/visual-review.json"
        original_review = json.loads(review_path.read_text())
        original_artifacts = manifest["artifacts"]
        for name, content, expected in (("proof/navigation.LOG", b"Observed /Users/private/navigation\n", "contains /Users/"), ("proof/navigation.bin", b"opaque", "unsupported local proof evidence type")):
            with self.subTest(name=name):
                path = release / name
                path.write_bytes(content)
                review = dict(original_review)
                review["evidence"] = [*original_review["evidence"], name]
                review_path.write_text(json.dumps(review))
                manifest["artifacts"] = [row for row in original_artifacts if row["path"] != "proof/visual-review.json"]
                manifest["artifacts"].extend([self.packager.artifact_row(release, "proof/visual-review.json"), self.packager.artifact_row(release, name)])
                (release / "deck-manifest.json").write_text(json.dumps(manifest))
                result = run(sys.executable, ROOT / "scripts/validate_product.py", "--release", release)
                self.assertNotEqual(result.returncode, 0)
                self.assertIn(expected, result.stdout + result.stderr)
                path.unlink()

    def test_same_slide_count_html_change_rejected(self):
        path = self.source / "deck.html"
        path.write_text(path.read_text().replace("Exact bytes", "Changed after review"))
        with self.assertRaisesRegex(SystemExit, "stale proof identity: deck.html"):
            self.package()

    def rebind_source_for_structural_test(self):
        """Synthetic rehash reaches structural checks; not renewed acceptance."""
        report_path = self.source / "proof/report.json"
        for name in ("proof/report.json", "proof/pdf-report.json"):
            path = self.source / name
            report = json.loads(path.read_text())
            report["source"]["files"] = [self.packager.artifact_row(self.source, row["path"]) for row in report["source"]["files"]]
            path.write_text(json.dumps(report))
        review_path = self.source / "proof/visual-review.json"
        review = json.loads(review_path.read_text())
        review["render_report_sha256"] = hashlib.sha256(report_path.read_bytes()).hexdigest()
        review_path.write_text(json.dumps(review))

    def test_packager_runs_canonical_structural_validator_before_claiming_pass(self):
        path = self.source / "deck.html"
        path.write_text(path.read_text().replace('class="deck-viewport"', 'class="not-a-viewport"'))
        self.rebind_source_for_structural_test()
        with self.assertRaisesRegex(SystemExit, "expected exactly one .deck-viewport"):
            self.package()
        self.assertFalse(self.packager.RELEASE_ROOT.exists())

    def test_packager_checks_linked_runtime_code_before_claiming_pass(self):
        (self.source / "stage.js").write_text("/* Runtime was removed. */")
        self.rebind_source_for_structural_test()
        with self.assertRaisesRegex(SystemExit, "missing WebSlidesStudio runtime API"):
            self.package()
        self.assertFalse(self.packager.RELEASE_ROOT.exists())

    def test_pdf_change_rejected(self):
        with (self.source / "deck.pdf").open("ab") as stream:
            stream.write(b"changed PDF")
        with self.assertRaisesRegex(SystemExit, "stale PDF export identity"):
            self.package()

    def test_local_asset_change_rejected(self):
        with (self.source / "stage.css").open("a") as stream:
            stream.write("\n.slide{color:red}")
        with self.assertRaisesRegex(SystemExit, "stale proof identity: stage.css"):
            self.package()

    def test_symlink_retarget_after_actual_render_rejected(self):
        (self.source / "theme-b.css").write_text((self.source / "theme-a.css").read_text() + "\n.slide{color:red}")
        (self.source / "stage.css").unlink()
        (self.source / "stage.css").symlink_to("theme-b.css")
        with self.assertRaisesRegex(SystemExit, "stale proof identity: stage.css"):
            self.package()

    def test_actual_renderer_accepts_source_directory_alias(self):
        alias = self.case / "source-alias"
        alias.symlink_to(self.source, target_is_directory=True)
        proof = self.case / "alias-proof"
        result = run("node", SCRIPTS / "render_qa.mjs", alias / "deck.html", "--out", proof)
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        report = json.loads((proof / "report.json").read_text())
        self.assertEqual({row["path"] for row in report["source"]["files"]}, {"deck.html", "stage.css", "stage.js"})

    def test_render_report_change_invalidates_review(self):
        with (self.source / "proof/report.json").open("a") as stream:
            stream.write("\n")
        with self.assertRaisesRegex(SystemExit, "stale or unbound visual review"):
            self.package()

    def test_screenshot_change_rejected(self):
        path = self.source / "proof/screenshots/desktop-slide-01.png"
        path.write_bytes(b"changed screenshot")
        with self.assertRaisesRegex(SystemExit, "stale proof identity: screenshots"):
            self.package()

    def test_unbound_old_proof_rejected(self):
        path = self.source / "proof/visual-review.json"
        review = json.loads(path.read_text()); review["schema_version"] = 1
        path.write_text(json.dumps(review))
        with self.assertRaisesRegex(SystemExit, "visual review is unbound"):
            self.package()

    def test_old_schema_cannot_enter_publication(self):
        self.package()
        release = self.packager.RELEASE_ROOT / "fixture/test"
        path = release / "deck-manifest.json"
        row = json.loads(path.read_text()); row["schema_version"] = 2
        path.write_text(json.dumps(row))
        result = run(sys.executable, ROOT / "scripts/validate_product.py", "--release", release)
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("historical v1/v2 validation is not admission", result.stdout)

    def test_manifest_rehash_cannot_launder_stale_html(self):
        manifest = self.package()
        release = self.packager.RELEASE_ROOT / "fixture/test"
        path = release / "deck.html"
        path.write_text(path.read_text().replace("Exact bytes", "Unreviewed bytes"))
        for row in manifest["artifacts"]:
            if row["path"] == "deck.html":
                row.update(sha256=hashlib.sha256(path.read_bytes()).hexdigest(), bytes=path.stat().st_size)
        (release / "deck-manifest.json").write_text(json.dumps(manifest))
        result = run(sys.executable, ROOT / "scripts/validate_product.py", "--release", release)
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("stale proof identity: deck.html", result.stdout)

    def test_manifest_rehash_cannot_launder_stale_pdf(self):
        manifest = self.package()
        release = self.packager.RELEASE_ROOT / "fixture/test"
        path = release / "deck.pdf"
        path.write_bytes(path.read_bytes() + b"changed PDF")
        for row in manifest["artifacts"]:
            if row["path"] == "deck.pdf":
                row.update(sha256=hashlib.sha256(path.read_bytes()).hexdigest(), bytes=path.stat().st_size)
        (release / "deck-manifest.json").write_text(json.dumps(manifest))
        result = run(sys.executable, ROOT / "scripts/validate_product.py", "--release", release)
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("stale PDF export identity", result.stdout)


if __name__ == "__main__":
    unittest.main(verbosity=2)
