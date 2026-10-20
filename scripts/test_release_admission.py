"""Offline synthetic admission contracts, never visual-quality acceptance."""
from __future__ import annotations

import hashlib
import json
import os
import shutil
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]
SCRIPTS = ROOT / "skills/deck-studio/scripts"
sys.path.insert(0, str(SCRIPTS))
import release_admission as admission


def write_json(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, indent=2) + "\n", encoding="utf-8")


def row(root, name):
    path = root / name
    return {"path": name, "sha256": hashlib.sha256(path.read_bytes()).hexdigest(), "bytes": path.stat().st_size}


def make_release(root: Path, *, profile: bool = True) -> dict:
    """Complete but synthetic bundle for testing mechanics, not acceptance."""
    root.mkdir(parents=True, exist_ok=True)
    (root / "deck.html").write_text('''<!doctype html><html><head><meta charset="utf-8"><title>Synthetic admission</title>
<style>.deck-stage{width:1920px;height:1080px}</style></head>
<body data-web-slides-studio><div class="deck-viewport"><main class="deck-stage">
<section class="slide active"><h1>Synthetic contract fixture</h1></section></main></div>
<script>window.WebSlidesStudio = {};</script></body></html>''', encoding="utf-8")
    (root / "deck.pdf").write_bytes(b"%PDF-1.7\n% synthetic identity fixture, not renderer output\n%%EOF\n")
    proof = root / "proof"
    (proof / "screenshots").mkdir(parents=True)
    (proof / "screenshots/desktop-slide-01.png").write_bytes(b"\x89PNG\r\n\x1a\nsynthetic image identity")
    (proof / "contact-sheet.html").write_text("<html><body>Synthetic screenshot fixture</body></html>\n")
    source = {"files": [row(root, "deck.html")], "external_resources": []}
    report = {"schema_version": 3, "ok": True, "errors": [], "deck": "deck.html", "source": source,
              "proof_files": [row(proof, name) for name in ("screenshots/desktop-slide-01.png", "contact-sheet.html")],
              "viewports": [{"name": "desktop", "slideCount": 1, "slides": [
                  {"index": 1, "ok": True, "screenshot": "screenshots/desktop-slide-01.png"}]}]}
    pdf = {"schema_version": 2, "ok": True, "errors": [], "pdf": "deck.pdf", "source": source,
           "slideCount": 1, "pageCount": 1, "artifact": row(root, "deck.pdf")}
    if profile:
        report["delivery_profile"] = admission.library_delivery_profile()
        pdf["delivery_profile"] = admission.library_delivery_profile()
    write_json(proof / "report.json", report)
    write_json(proof / "pdf-report.json", pdf)
    review = {"schema_version": 2, "render_report_sha256": admission.digest(proof / "report.json"),
              "artifact": "deck.html", "status": "pass", "inspected_by": "agent", "slides_inspected": "all",
              "inspected_viewports": ["desktop"], "evidence": ["proof/screenshots/desktop-slide-01.png"], "failures": []}
    review.update({key: "pass" for key in admission.PASS_FIELDS})
    review.update({key: "Synthetic mechanics fixture; no visual acceptance claimed." for key in admission.REQUIRED_TEXT_FIELDS})
    write_json(proof / "visual-review.json", review)
    manifest = {"schema_version": 3, "deck_id": "fixture", "release_id": "r1", "slide_count": 1,
                "title": "Synthetic admission", "audience": "test", "desired_action": "test", "visibility": "unassigned",
                "source": {"generator": "deck-studio", "decks_commit": "0" * 40},
                "proof": {key: "pass" for key in ("validate_deck", "rendered_qa", "path_leak_scan", "visual_acceptance", "content_fidelity", "pdf_export")}}
    manifest["source"]["brief_sha256"] = hashlib.sha256(b"Synthetic admission\ntest\ntest\n").hexdigest()
    manifest["artifacts"] = [row(root, path.relative_to(root).as_posix()) for path in sorted(root.rglob("*")) if path.is_file()]
    write_json(root / "deck-manifest.json", manifest)
    return manifest


class ReleaseAdmissionTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory(prefix="decks-admission-")
        self.addCleanup(self.tmp.cleanup)
        self.root = Path(self.tmp.name) / "release"
        self.manifest = make_release(self.root)

    def rewrite_manifest(self):
        write_json(self.root / "deck-manifest.json", self.manifest)

    def rehash(self, name):
        self.manifest["artifacts"] = [item for item in self.manifest["artifacts"] if item["path"] != name]
        self.manifest["artifacts"].append(row(self.root, name))
        self.rewrite_manifest()

    def modify_json(self, name, change):
        path = self.root / name
        value = json.loads(path.read_text())
        change(value)
        write_json(path, value)
        self.rehash(name)
        if name == "proof/report.json":
            review = json.loads((self.root / "proof/visual-review.json").read_text())
            review["render_report_sha256"] = admission.digest(path)
            write_json(self.root / "proof/visual-review.json", review)
            self.rehash("proof/visual-review.json")

    def test_complete_bundle_admitted_without_browser_or_git(self):
        result = admission.admit_release(self.root, deck_id="fixture", release_id="r1")
        self.assertEqual(result["manifest_sha256"], admission.digest(self.root / "deck-manifest.json"))
        self.assertEqual(result["delivery_profile"], admission.library_delivery_profile())

    def test_required_catalog_metadata_missing_empty_or_wrong_type_fails(self):
        for field in ("title", "audience", "desired_action", "visibility"):
            original = self.manifest[field]
            for value in (None, "", " \t\n", 1, [], {}):
                if value is None:
                    self.manifest.pop(field, None)
                else:
                    self.manifest[field] = value
                self.rewrite_manifest()
                with self.subTest(field=field, value=value), self.assertRaisesRegex(admission.AdmissionError, f"manifest {field} must be a non-empty string"):
                    admission.admit_release(self.root)
            self.manifest[field] = original

    def test_v3_source_lineage_fields_required_and_byte_bound(self):
        original = dict(self.manifest["source"])
        for source in (None, "", [], {},
                       {key: value for key, value in original.items() if key != "generator"},
                       {key: value for key, value in original.items() if key != "decks_commit"},
                       {key: value for key, value in original.items() if key != "brief_sha256"},
                       {**original, "generator": "another-producer"},
                       {**original, "decks_commit": "not-a-commit"},
                       {**original, "decks_commit": True},
                       {**original, "brief_sha256": "0" * 64},
                       {**original, "brief_sha256": True}):
            if source is None:
                self.manifest.pop("source", None)
            else:
                self.manifest["source"] = source
            self.rewrite_manifest()
            with self.subTest(source=source), self.assertRaisesRegex(admission.AdmissionError, "manifest source"):
                admission.admit_release(self.root)
        self.manifest["source"] = original
        for field in ("title", "audience", "desired_action"):
            previous = self.manifest[field]
            self.manifest[field] = "changed"
            self.rewrite_manifest()
            with self.subTest(field=field), self.assertRaisesRegex(admission.AdmissionError, "source.brief_sha256"):
                admission.admit_release(self.root)
            self.manifest[field] = previous

    def test_v3_visibility_cannot_claim_policy_access(self):
        self.manifest["visibility"] = "public"
        self.rewrite_manifest()
        with self.assertRaisesRegex(admission.AdmissionError, "audience access belongs to policy"):
            admission.admit_release(self.root)

    def test_metadata_preserves_additional_lineage_and_does_not_require_timestamp(self):
        self.manifest["source"].update(decks_commit="1" * 64, additional_lineage="retained")
        self.rewrite_manifest()
        self.assertTrue(admission.admit_release(self.root)["ok"])

    def test_standalone_import_closure_copied_outside_repository(self):
        package = Path(self.tmp.name) / "isolated"
        package.mkdir()
        for name in ("release_admission.py", "proof_identity.py", "validate_deck.py", "delivery_profile.mjs"):
            shutil.copy2(SCRIPTS / name, package / name)
        result = subprocess.run([sys.executable, str(package / "release_admission.py"), str(self.root), "--target", "library",
                                 "--deck-id", "fixture", "--release-id", "r1"], cwd="/", env={"PATH": os.environ["PATH"]},
                                capture_output=True, text=True)
        self.assertEqual(result.returncode, 0, result.stderr + result.stdout)
        self.assertTrue(json.loads(result.stdout)["ok"])
        self.assertEqual(result.stderr, "")

    def test_missing_canonical_dependency_fails_json_closed(self):
        package = Path(self.tmp.name) / "incomplete-package"
        package.mkdir()
        shutil.copy2(SCRIPTS / "release_admission.py", package / "release_admission.py")
        result = subprocess.run([sys.executable, str(package / "release_admission.py"), str(self.root)],
                                cwd="/", env={"PATH": os.environ["PATH"]}, capture_output=True, text=True)
        self.assertNotEqual(result.returncode, 0)
        self.assertEqual(json.loads(result.stdout)["code"], "validator_unavailable")
        self.assertEqual(result.stderr, "")

    def test_local_proof_not_library_proof(self):
        for name in ("proof/report.json", "proof/pdf-report.json"):
            self.modify_json(name, lambda value: value.pop("delivery_profile"))
        self.assertTrue(admission.admit_release(self.root, target="local")["ok"])
        with self.assertRaisesRegex(admission.AdmissionError, "current library delivery profile"):
            admission.admit_release(self.root)

    def test_both_profiles_are_required_and_exact(self):
        for name in ("proof/report.json", "proof/pdf-report.json"):
            original = (self.root / name).read_bytes()
            for change in (lambda value: value.pop("delivery_profile"), lambda value: value["delivery_profile"].update(sha256="0" * 64)):
                self.modify_json(name, change)
                with self.assertRaises(admission.AdmissionError) as raised:
                    admission.admit_release(self.root)
                self.assertEqual(raised.exception.code, "delivery_profile_mismatch")
                (self.root / name).write_bytes(original)
                self.rehash(name)

    def test_duplicate_artifact_and_noncanonical_paths_fail(self):
        original = list(self.manifest["artifacts"])
        for name in ("deck.html", "./deck.html", "folder/../deck.html", "/deck.html", "folder\\deck.html", ""):
            self.manifest["artifacts"] = original + [{**original[0], "path": name}]
            self.rewrite_manifest()
            with self.subTest(name=name), self.assertRaises(admission.AdmissionError):
                admission.admit_release(self.root)

    def test_size_bool_does_not_count_as_integer(self):
        self.manifest["artifacts"][0]["bytes"] = True
        self.rewrite_manifest()
        with self.assertRaises(admission.AdmissionError):
            admission.admit_release(self.root)

    def test_symlink_file_directory_and_root_fail(self):
        for target in (self.root / "deck.html", self.root / "proof"):
            saved = target.with_name(target.name + "-saved")
            target.rename(saved)
            target.symlink_to(saved.name, target_is_directory=saved.is_dir())
            with self.assertRaises(admission.AdmissionError):
                admission.admit_release(self.root)
            target.unlink()
            saved.rename(target)
        alias = self.root.with_name("alias")
        alias.symlink_to(self.root, target_is_directory=True)
        with self.assertRaises(admission.AdmissionError):
            admission.admit_release(alias)

    def test_missing_proof_flags_required_artifacts_and_identity_fail(self):
        for field in self.manifest["proof"]:
            with patch.dict(self.manifest["proof"], {field: "fail"}):
                self.rewrite_manifest()
                with self.subTest(field=field), self.assertRaises(admission.AdmissionError):
                    admission.admit_release(self.root)
        self.rewrite_manifest()
        with self.assertRaisesRegex(admission.AdmissionError, "identity mismatch"):
            admission.admit_release(self.root, deck_id="another")

    def test_required_artifacts_missing_and_false_structural_pass_fail(self):
        original = list(self.manifest["artifacts"])
        for name in ("deck.html", "deck.pdf", "proof/report.json", "proof/visual-review.json", "proof/pdf-report.json"):
            self.manifest["artifacts"] = [item for item in original if item["path"] != name]
            self.rewrite_manifest()
            with self.subTest(name=name), self.assertRaises(admission.AdmissionError):
                admission.admit_release(self.root)
        self.manifest["artifacts"] = original
        self.rewrite_manifest()
        path = self.root / "deck.html"
        path.write_text(path.read_text().replace('class="deck-viewport"', 'class="not-stage"'))
        self.rehash("deck.html")
        for report in ("proof/report.json", "proof/pdf-report.json"):
            self.modify_json(report, lambda value: value["source"].update(files=[row(self.root, "deck.html")]))
        with self.assertRaisesRegex(admission.AdmissionError, "expected exactly one .deck-viewport"):
            admission.admit_release(self.root)

    def test_missing_escaped_or_unsupported_local_review_citations_fail(self):
        for name in ("proof/missing.png", "proof/../deck.html", "proof/opaque.bin"):
            if name.endswith("opaque.bin"):
                (self.root / name).write_bytes(b"opaque")
                self.rehash(name)
            self.modify_json("proof/visual-review.json", lambda value: value.update(evidence=["Browser inspection", name]))
            with self.subTest(name=name), self.assertRaises(admission.AdmissionError):
                admission.admit_release(self.root)

    def test_asset_closure_and_root_relative_urls_fail(self):
        path = self.root / "deck.html"
        path.write_text(path.read_text().replace("</section>", '<img src="/root.png"></section>'))
        self.rehash("deck.html")
        for report in ("proof/report.json", "proof/pdf-report.json"):
            self.modify_json(report, lambda value: value["source"].update(files=[row(self.root, "deck.html")]))
        with self.assertRaisesRegex(admission.AdmissionError, "root-relative"):
            admission.admit_release(self.root)

    def test_invalid_pdf_counts_and_profile_race_are_controlled(self):
        self.modify_json("proof/pdf-report.json", lambda value: value.update(pageCount=True))
        with self.assertRaisesRegex(admission.AdmissionError, "page/slide count mismatch"):
            admission.admit_release(self.root)
        self.modify_json("proof/pdf-report.json", lambda value: value.update(pageCount=1))
        profile = admission.library_delivery_profile()
        with patch.object(admission, "library_delivery_profile", side_effect=[profile, profile, {**profile, "sha256": "0" * 64}]):
            with self.assertRaisesRegex(admission.AdmissionError, "changed during admission"):
                admission.admit_release(self.root)

    def test_rehashed_stale_source_pdf_screenshot_fail(self):
        for name in ("deck.html", "deck.pdf", "proof/screenshots/desktop-slide-01.png"):
            path = self.root / name
            original = path.read_bytes()
            path.write_bytes(original + b"changed")
            self.rehash(name)
            with self.subTest(name=name), self.assertRaises(admission.AdmissionError):
                admission.admit_release(self.root)
            path.write_bytes(original)
            self.rehash(name)

    def test_semantic_failed_report_cannot_be_laundered_by_rehash(self):
        for name, change in (
            ("proof/report.json", lambda r: r.update(errors=["csp_violation"])),
            ("proof/report.json", lambda r: r["viewports"][0].update(slides=[])),
            ("proof/report.json", lambda r: r["viewports"][0]["slides"][0].update(ok=False)),
            ("proof/report.json", lambda r: r["viewports"][0]["slides"][0].update(screenshot={})),
            ("proof/pdf-report.json", lambda r: r.update(errors=["request_failed"])),
            ("proof/pdf-report.json", lambda r: r.update(pageCount=2)),
            ("proof/visual-review.json", lambda r: r.update(content_fidelity="fail")),
            ("proof/visual-review.json", lambda r: r.update(inspected_viewports=["desktop", "unrendered"])),
        ):
            with self.subTest(name=name, change=change):
                original = {p: p.read_bytes() for p in self.root.rglob("*") if p.is_file()}
                self.modify_json(name, change)
                with self.assertRaises(admission.AdmissionError):
                    admission.admit_release(self.root)
                for path, data in original.items():
                    path.write_bytes(data)
                self.manifest = json.loads((self.root / "deck-manifest.json").read_text())

    def test_local_evidence_and_unmanifested_residue_fail(self):
        extra = self.root / "proof/navigation.log"
        extra.write_text("Browser inspection passed\n")
        with self.assertRaisesRegex(admission.AdmissionError, "unmanifested"):
            admission.admit_release(self.root)
        self.rehash("proof/navigation.log")
        extra.write_text("Observed /Users/private/path\n")
        self.rehash("proof/navigation.log")
        with self.assertRaisesRegex(admission.AdmissionError, "contains /Users/"):
            admission.admit_release(self.root)

    def test_historical_is_consistency_only(self):
        self.manifest["schema_version"] = 1
        self.manifest.pop("source")
        self.manifest["visibility"] = "historical"
        self.rewrite_manifest()
        admission.validate_manifest(self.root, self.manifest, allow_historical=True)
        self.assertIs(admission.validate_manifest_metadata(self.manifest, allow_historical=True), self.manifest)
        with self.assertRaisesRegex(admission.AdmissionError, "historical v1/v2 validation is not admission"):
            admission.admit_release(self.root)

    def test_json_errors_and_bad_cli_arguments_are_structured(self):
        cli = [sys.executable, str(SCRIPTS / "release_admission.py")]
        for arguments in ([], [str(self.root), "--target", "other"]):
            result = subprocess.run(cli + arguments, capture_output=True, text=True)
            self.assertNotEqual(result.returncode, 0)
            self.assertEqual(json.loads(result.stdout)["code"], "invalid_arguments")
            self.assertEqual(result.stderr, "")
        for content in ('{"schema_version":3,"schema_version":3}', '{"schema_version":NaN}', '[]', '{'):
            (self.root / "deck-manifest.json").write_text(content)
            result = subprocess.run(cli + [str(self.root)], capture_output=True, text=True)
            self.assertNotEqual(result.returncode, 0)
            self.assertFalse(json.loads(result.stdout)["ok"])
            self.assertNotIn("Traceback", result.stderr)


if __name__ == "__main__":
    unittest.main()
