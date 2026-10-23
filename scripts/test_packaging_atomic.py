"""Atomic filesystem/retry contracts using complete synthetic admission fixtures.

These bundles exercise mechanics only: their synthetic review and raster/PDF
identities do not establish real visual acceptance or actual renderer output.
"""
from __future__ import annotations

import importlib.util
import hashlib
import json
import multiprocessing
import os
import shutil
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
sys.path.insert(0, str(ROOT / "skills/deck-studio/scripts"))
import release_admission as admission
import release_store as store
from test_release_admission import make_release, write_json
from native_pptx_test_fixture import add_native_pptx


def load_packager():
    spec = importlib.util.spec_from_file_location("atomic_packager", ROOT / "scripts/package_deck_release.py")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def concurrent_promote(stage, library, barrier, output):
    try:
        barrier.wait(timeout=30)
        result = store.promote_release(Path(stage), Path(library))
        output.put({"ok": True, "status": result["status"]})
    except Exception as error:
        output.put({"ok": False, "code": getattr(error, "code", "unexpected"), "error": str(error)})


def interrupted_promote(stage, library, after_rename):
    rename = store.os.rename
    def interrupt(source, destination):
        if after_rename:
            rename(source, destination)
        os._exit(73)
    with patch.object(store.os, "rename", side_effect=interrupt):
        store.promote_release(Path(stage), Path(library))


class AtomicPackagingTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory(prefix="decks-atomic-")
        self.addCleanup(self.tmp.cleanup)
        self.root = Path(self.tmp.name)
        self.library = self.root / "library"
        self.library.mkdir()
        self.policy = self.root / "policy.sqlite"
        self.policy.write_bytes(b"unrelated policy remains unchanged")
        self.addCleanup(lambda: self.assertEqual(self.policy.read_bytes(), b"unrelated policy remains unchanged"))
        self.packager = load_packager()
        self.select_library(self.library)
        self.source = self.root / "source"
        make_release(self.source)

    def select_library(self, path):
        self.packager.PUBLIC_ROOT = path
        self.packager.RELEASE_ROOT = path / "decks"

    def stage(self, name="candidate", *, native=True, **changes):
        path = self.root / name
        manifest = make_release(path, native=native)
        manifest.update(changes)
        manifest["source"]["brief_sha256"] = hashlib.sha256(
            f"{manifest['title']}\n{manifest['audience']}\n{manifest['desired_action']}\n".encode("utf-8")
        ).hexdigest()
        write_json(path / "deck-manifest.json", manifest)
        return path, manifest

    def package(self, **options):
        return self.packager.package_release(self.source, "fixture", None, "test", "test", 1, "r1", **options)

    def catalog_keys(self):
        data = json.loads((self.library / "catalog.json").read_text())
        return {(m["deck_id"], m["current_release"]) for m in data["decks"]}

    def test_prepared_bundle_is_admitted_and_promoted_from_sibling_staging(self):
        stage, manifest = self.stage()
        result = store.promote_release(stage, self.library, deck_id="fixture", release_id="r1")
        self.assertEqual(result["status"], "promoted")
        self.assertFalse(stage.exists())
        self.assertTrue(admission.admit_release(self.library / "decks/fixture/r1")["ok"])
        self.assertEqual(self.catalog_keys(), {("fixture", "r1")})
        self.assertTrue((self.library / ".package.lock").is_file())

    def test_destination_cli_works_without_checkout_browser_git_or_producer(self):
        runtime = self.root / "runtime"
        runtime.mkdir()
        for name in ("release_store.py", "release_admission.py", "proof_identity.py", "pptx_inspection.py", "validate_deck.py", "delivery_profile.mjs"):
            shutil.copy2(ROOT / "skills/deck-studio/scripts" / name, runtime / name)
        candidate, manifest = self.stage()
        add_native_pptx(candidate, manifest)
        result = subprocess.run([sys.executable, "-B", str(runtime / "release_store.py"), "promote", str(candidate),
                                 "--library-root", str(self.library), "--deck-id", "fixture", "--release-id", "r1"],
                                cwd="/", env={"PATH": os.environ["PATH"]}, capture_output=True, text=True)
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        self.assertEqual(json.loads(result.stdout)["status"], "promoted")
        self.assertEqual(result.stderr, "")

    def test_required_native_pptx_is_packaged_with_exact_proof_and_no_author_source(self):
        add_native_pptx(self.source)
        (self.source / "author.mjs").write_text("private authoring module, never release material")
        first = self.package()
        release = self.library / "decks/fixture/r1"
        self.assertTrue(admission.admit_release(release)["ok"])
        manifest = json.loads((release / "deck-manifest.json").read_text())
        self.assertEqual(manifest["pptx"], admission.NATIVE_PPTX)
        for name in ("deck.pptx", "proof/pptx-report.json", "proof/pptx-visual-review.json", "proof/pptx/slide-01.png"):
            self.assertEqual((release / name).read_bytes(), (self.source / name).read_bytes())
        self.assertFalse((release / "author.mjs").exists())
        before = {p.relative_to(release): (p.read_bytes(), p.stat().st_ino) for p in release.rglob("*") if p.is_file()}
        self.assertEqual(self.package(), first)
        self.assertEqual(before, {p.relative_to(release): (p.read_bytes(), p.stat().st_ino) for p in release.rglob("*") if p.is_file()})

    def test_missing_native_output_refuses_packaging_before_any_promotion(self):
        self.source = self.root / "html-pdf-only-source"
        make_release(self.source, native=False)
        with self.assertRaisesRegex(SystemExit, "requires deck.pptx"):
            self.package()
        self.assertFalse((self.library / "decks").exists())

    def test_catalog_preservation_and_consistency_reads_keep_html_pdf_history(self):
        historical, _ = self.stage("historical", native=False, release_id="old")
        destination = self.library / "decks/fixture/old"
        destination.parent.mkdir(parents=True)
        os.rename(historical, destination)
        self.assertTrue(admission.admit_release(destination, target="local")["ok"])
        self.package()
        self.assertEqual(self.catalog_keys(), {("fixture", "old"), ("fixture", "r1")})
        self.assertFalse((destination / "deck.pptx").exists())
        spec = importlib.util.spec_from_file_location("catalog_validator", ROOT / "scripts/validate_product.py")
        validator = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(validator)
        self.assertEqual(validator.validate_catalog(self.library)["deck_count"], 2)

    def test_native_proof_failure_never_promotes_partial_release(self):
        add_native_pptx(self.source)
        (self.source / "proof/pptx/slide-01.png").write_bytes(b"changed")
        with self.assertRaises(SystemExit):
            self.package()
        self.assertFalse((self.library / "decks/fixture/r1").exists())

    def test_identical_semantic_retry_does_not_rewrite_immutable_bytes(self):
        first, manifest = self.stage("first")
        store.promote_release(first, self.library)
        release = self.library / "decks/fixture/r1"
        before = {p.relative_to(release): (p.read_bytes(), p.stat().st_ino, p.stat().st_mtime_ns) for p in release.rglob("*") if p.is_file()}
        again, _ = self.stage("again")
        # Ordering/indentation are irrelevant, but every field remains equal.
        manifest["artifacts"].reverse()
        (again / "deck-manifest.json").write_text(json.dumps(manifest, sort_keys=True))
        result = store.promote_release(again, self.library)
        self.assertEqual(result["status"], "already_present")
        self.assertTrue(again.is_dir())
        self.assertEqual(before, {p.relative_to(release): (p.read_bytes(), p.stat().st_ino, p.stat().st_mtime_ns) for p in release.rglob("*") if p.is_file()})

    def test_changed_metadata_or_lineage_conflicts_even_with_identical_html(self):
        first, _ = self.stage("first")
        store.promote_release(first, self.library)
        for name, changes in (("audience", {"audience": "another audience"}),
                              ("lineage", {"source": {"generator": "deck-studio", "decks_commit": "1" * 40}})):
            candidate, _ = self.stage(name, **changes)
            with self.subTest(name=name), self.assertRaises(store.ReleaseStoreError) as raised:
                store.promote_release(candidate, self.library)
            self.assertEqual(raised.exception.code, "immutable_conflict")
            self.assertTrue(candidate.exists())

    def test_automatic_id_is_bundle_identity_not_attempt_or_artifact_order(self):
        _, manifest = self.stage()
        expected = store.automatic_release_id(manifest)
        manifest["release_id"] = "ignored-explicit-id"
        manifest["artifacts"].reverse()
        self.assertEqual(store.automatic_release_id(manifest), expected)
        for key, value in (("audience", "changed"), ("source", {"decks_commit": "2" * 40}), ("extra_metadata", {"important": True})):
            changed = {**manifest, key: value}
            self.assertNotEqual(store.automatic_release_id(changed), expected)
        changed = json.loads(json.dumps(manifest))
        changed["artifacts"][0]["sha256"] = "f" * 64
        self.assertNotEqual(store.automatic_release_id(changed), expected)

    def test_packager_automatic_retry_reuses_exact_bundle(self):
        completed = []
        arguments = (self.source, "fixture", None, "test", "test", 1, None)
        first = self.packager.package_release(*arguments, completed=completed)
        second = self.packager.package_release(*arguments, completed=completed)
        self.assertTrue(first["release_id"].startswith("bundle-"))
        self.assertEqual(first, second)
        self.assertEqual([row["status"] for row in completed], ["promoted", "already_present"])

    def test_every_copy_failure_leaves_no_final_directory_and_cleans_only_own_staging(self):
        with patch.object(self.packager, "copy_file", wraps=self.packager.copy_file) as counter:
            self.package()
        for failure in range(1, counter.call_count + 1):
            library = self.root / f"copy-failure-{failure}"
            self.select_library(library)
            foreign = library / ".staging/another-writer"
            foreign.mkdir(parents=True)
            (foreign / "work").write_text("do not remove")
            original, calls = self.packager.copy_file, []
            def interrupted(source, target):
                calls.append(target)
                if len(calls) == failure:
                    raise OSError("injected interrupted copy")
                return original(source, target)
            with self.subTest(copy=failure), patch.object(self.packager, "copy_file", side_effect=interrupted):
                with self.assertRaisesRegex(SystemExit, "interrupted copy"):
                    self.package()
            self.assertFalse((library / "decks").exists())
            self.assertEqual(list((library / ".staging").iterdir()), [foreign])
            self.assertEqual((foreign / "work").read_text(), "do not remove")

    def test_failed_copied_bundle_admission_leaves_no_release(self):
        with patch.object(admission, "admit_release", side_effect=admission.AdmissionError("injected admission rejection")):
            with self.assertRaisesRegex(SystemExit, "admission rejection"):
                self.package()
        self.assertFalse((self.library / "decks").exists())
        self.assertEqual(list((self.library / ".staging").iterdir()), [])

    def test_promotion_failure_preserves_staging_without_partial_release(self):
        candidate, _ = self.stage()
        with patch.object(store.os, "rename", side_effect=OSError("injected rename failure")):
            with self.assertRaisesRegex(OSError, "rename failure"):
                store.promote_release(candidate, self.library)
        self.assertTrue(admission.admit_release(candidate)["ok"])
        self.assertFalse((self.library / "decks/fixture/r1").exists())

    def test_process_exit_at_commit_boundary_preserves_atomic_visibility_and_releases_lock(self):
        for after in (False, True):
            library = self.root / f"hard-exit-{after}"
            store.write_catalog(library, [])
            previous = (library / "catalog.json").read_bytes()
            lock_inode = (library / ".package.lock").stat().st_ino
            candidate, _ = self.stage(f"hard-stage-{after}")
            context = multiprocessing.get_context("spawn")
            process = context.Process(target=interrupted_promote, args=(str(candidate), str(library), after))
            process.start()
            process.join(timeout=45)
            try:
                self.assertEqual(process.exitcode, 73)
            finally:
                if process.is_alive():
                    process.terminate()
                    process.join()
            self.assertEqual((library / "catalog.json").read_bytes(), previous)
            release = library / "decks/fixture/r1"
            self.assertEqual(release.exists(), after)
            if after:
                self.assertTrue(admission.admit_release(release)["ok"])
                retry, _ = self.stage("hard-retry")
            else:
                self.assertTrue(candidate.exists())
                retry = candidate
            result = store.promote_release(retry, library)
            self.assertEqual(result["status"], "already_present" if after else "promoted")
            self.assertEqual((library / ".package.lock").stat().st_ino, lock_inode)

    def test_catalog_failure_reports_completed_bundle_and_retry_repairs_index(self):
        store.write_catalog(self.library, [])
        previous = (self.library / "catalog.json").read_bytes()
        completed = []
        with patch.object(store.os, "replace", side_effect=OSError("injected catalog failure")):
            with self.assertRaisesRegex(SystemExit, "complete release is present"):
                self.package(completed=completed)
        self.assertEqual(completed[0]["status"], "promoted")
        self.assertFalse(completed[0]["catalog_updated"])
        self.assertEqual((self.library / "catalog.json").read_bytes(), previous)
        self.assertTrue(admission.admit_release(self.library / "decks/fixture/r1")["ok"])
        self.package(completed=completed)
        self.assertEqual(completed[-1]["status"], "already_present")
        self.assertTrue(completed[-1]["catalog_updated"])
        self.assertEqual(self.catalog_keys(), {("fixture", "r1")})

    def test_projection_fault_after_promotion_still_reports_completed_effect(self):
        candidate, _ = self.stage()
        with patch.object(store, "_catalog", side_effect=KeyError("title")):
            with self.assertRaises(store.ReleaseStoreError) as raised:
                store.promote_release(candidate, self.library)
        self.assertEqual(raised.exception.code, "catalog_write_failed")
        self.assertEqual(raised.exception.result["status"], "promoted")
        self.assertFalse(raised.exception.result["catalog_updated"])
        self.assertTrue(admission.admit_release(self.library / "decks/fixture/r1")["ok"])

    def test_catalog_callers_choose_identity_not_overwrite_stored_metadata(self):
        candidate, manifest = self.stage()
        store.promote_release(candidate, self.library)
        store.write_catalog(self.library, [{"deck_id": "fixture", "release_id": "r1", "title": "forged caller title"}])
        catalog = json.loads((self.library / "catalog.json").read_text())
        self.assertEqual(catalog["decks"][0]["title"], manifest["title"])
        again, _ = self.stage("again", release_id="r2")
        for membership in ([{}], {}, [{"deck_id": "absent", "release_id": "r1"}]):
            with self.subTest(membership=membership), self.assertRaises(store.ReleaseStoreError):
                store.promote_release(again, self.library, catalog_manifests=membership)
            self.assertFalse((self.library / "decks/fixture/r2").exists())

    def test_partial_catalog_serialization_cannot_truncate_previous_catalog(self):
        store.write_catalog(self.library, [])
        previous = (self.library / "catalog.json").read_bytes()
        def fail_write(value, handle, **options):
            handle.write('{"partial":')
            raise OSError("injected partial catalog write")
        with patch.object(store.json, "dump", side_effect=fail_write):
            with self.assertRaises(OSError):
                store.write_catalog(self.library, [])
        self.assertEqual((self.library / "catalog.json").read_bytes(), previous)
        self.assertEqual(list(self.library.glob(".catalog-*")), [])

    def test_existing_empty_malformed_and_symlink_destinations_are_never_replaced(self):
        destination = self.library / "decks/fixture/r1"
        destination.parent.mkdir(parents=True)
        outside = self.root / "outside"
        outside.mkdir()
        (outside / "keep").write_text("keep")
        for kind in ("empty", "malformed", "symlink"):
            if kind == "symlink":
                destination.symlink_to(outside, target_is_directory=True)
            else:
                destination.mkdir()
                if kind == "malformed":
                    (destination / "deck-manifest.json").write_text("{broken")
            candidate, _ = self.stage(kind)
            inode = destination.lstat().st_ino
            with self.subTest(kind=kind), self.assertRaises((store.ReleaseStoreError, admission.AdmissionError)):
                store.promote_release(candidate, self.library)
            self.assertEqual(destination.lstat().st_ino, inode)
            self.assertTrue(candidate.exists())
            if destination.is_symlink():
                destination.unlink()
            else:
                shutil.rmtree(destination)
        self.assertEqual((outside / "keep").read_text(), "keep")

    def test_discovery_preserves_valid_candidates_beside_explicit_issues(self):
        candidate, _ = self.stage()
        store.promote_release(candidate, self.library)
        (self.library / "decks/fixture/incomplete").mkdir()
        broken = self.library / "decks/fixture/broken"
        broken.mkdir()
        (broken / "deck-manifest.json").write_text("{broken")
        (self.library / "decks/fixture/linked").symlink_to(broken, target_is_directory=True)
        found = store.discover_releases(self.library)
        self.assertTrue(found["complete"])
        self.assertEqual([(m["deck_id"], m["release_id"]) for m in found["releases"]], [("fixture", "r1")])
        self.assertEqual({row["code"] for row in found["issues"]}, {"incomplete_release", "invalid_manifest", "unsafe_directory"})
        issues = store.write_catalog(self.library, [], preserve_existing=True)
        self.assertEqual(len(issues), 3)
        self.assertEqual(self.catalog_keys(), {("fixture", "r1")})

    def test_discovery_uses_canonical_metadata_rules_without_rewriting_historical_lineage(self):
        candidate, _ = self.stage()
        store.promote_release(candidate, self.library)
        changes = ({"title": []}, {"slide_count": True}, {"visibility": "public"},
                   {"source": {}}, {"proof": []})
        for index, fields in enumerate(changes):
            name = f"invalid-{index}"
            candidate, manifest = self.stage(name, release_id=name, native=False)
            manifest.update(fields)
            write_json(candidate / "deck-manifest.json", manifest)
            os.rename(candidate, self.library / "decks/fixture" / name)
        for schema in (1, 2):
            name = f"historical-{schema}"
            candidate, manifest = self.stage(name, release_id=name, native=False)
            manifest.update(schema_version=schema, visibility="public", source={"original_lineage": True})
            write_json(candidate / "deck-manifest.json", manifest)
            os.rename(candidate, self.library / "decks/fixture" / name)
        found = store.discover_releases(self.library)
        self.assertTrue(found["complete"])
        self.assertEqual({m["release_id"] for m in found["releases"]}, {"r1", "historical-1", "historical-2"})
        self.assertEqual({row["release_id"] for row in found["issues"]}, {f"invalid-{i}" for i in range(len(changes))})
        store.write_catalog(self.library, [], preserve_existing=True)
        self.assertEqual(self.catalog_keys(), {("fixture", "r1"), ("fixture", "historical-1"), ("fixture", "historical-2")})

    def test_unreadable_subtree_is_not_reported_as_complete_or_silently_indexed(self):
        candidate, _ = self.stage()
        store.promote_release(candidate, self.library)
        blocked = self.library / "decks/blocked"
        blocked.mkdir()
        original = Path.iterdir
        def unreadable(path):
            if path.resolve() == blocked.resolve():
                raise PermissionError("injected unreadable subtree")
            return original(path)
        previous = (self.library / "catalog.json").read_bytes()
        with patch.object(Path, "iterdir", unreadable):
            found = store.discover_releases(self.library)
            self.assertFalse(found["complete"])
            self.assertEqual(len(found["releases"]), 1)
            self.assertEqual(found["issues"][0]["code"], "unreadable_deck")
            with self.assertRaises(store.ReleaseStoreError) as raised:
                store.write_catalog(self.library, [], preserve_existing=True)
        self.assertEqual(raised.exception.code, "incomplete_scan")
        self.assertEqual((self.library / "catalog.json").read_bytes(), previous)

    def test_selected_only_catalog_and_promotion_do_not_scan_unrelated_subtrees(self):
        candidate, first = self.stage()
        store.promote_release(candidate, self.library)
        blocked = self.library / "decks/blocked"
        blocked.mkdir()
        candidate, second = self.stage("another", deck_id="another")
        original = Path.iterdir
        def unreadable(path):
            if path.resolve() == blocked.resolve():
                raise PermissionError("injected unrelated unreadable subtree")
            return original(path)
        with patch.object(Path, "iterdir", unreadable):
            result = store.promote_release(candidate, self.library, catalog_manifests=[first], preserve_existing_catalog=False)
            self.assertEqual(result["status"], "promoted")
            self.assertTrue(result["catalog_updated"])
            self.assertEqual(self.catalog_keys(), {("fixture", "r1"), ("another", "r1")})
            store.write_catalog(self.library, [second], preserve_existing=False)
            self.assertEqual(self.catalog_keys(), {("another", "r1")})
            previous = (self.library / "catalog.json").read_bytes()
            with self.assertRaises(store.ReleaseStoreError) as raised:
                store.write_catalog(self.library, [], preserve_existing=True)
        self.assertEqual(raised.exception.code, "incomplete_scan")
        self.assertEqual((self.library / "catalog.json").read_bytes(), previous)

    def test_preserve_catalog_flag_keeps_its_deliberate_membership_semantics(self):
        first, _ = self.stage("first")
        store.promote_release(first, self.library)
        second, manifest = self.stage("second", deck_id="another")
        store.promote_release(second, self.library, preserve_existing_catalog=False)
        self.assertEqual(self.catalog_keys(), {("another", "r1")})
        store.write_catalog(self.library, [], preserve_existing=True)
        self.assertEqual(self.catalog_keys(), {("fixture", "r1"), ("another", "r1")})

    def test_stage_tampering_while_waiting_for_lock_is_rejected(self):
        candidate, _ = self.stage()
        original_lock = store.library_write_lock
        from contextlib import contextmanager
        @contextmanager
        def mutate_then_lock(root):
            (candidate / "deck.html").write_text("changed while waiting")
            with original_lock(root) as locked:
                yield locked
        with patch.object(store, "library_write_lock", mutate_then_lock):
            with self.assertRaisesRegex(ValueError, "stale proof identity"):
                store.promote_release(candidate, self.library)
        self.assertFalse((self.library / "decks").exists())

    def test_profile_change_after_admission_is_rejected_before_promotion(self):
        candidate, _ = self.stage()
        original = admission.library_delivery_profile
        original_lock = store.library_write_lock
        state = {"changed": False}
        def changed():
            value = original()
            return {**value, "sha256": "0" * 64} if state["changed"] else value
        from contextlib import contextmanager
        @contextmanager
        def change_then_lock(root):
            state["changed"] = True
            with original_lock(root) as locked:
                yield locked
        with patch.object(admission, "library_delivery_profile", side_effect=changed), patch.object(store, "library_write_lock", change_then_lock):
            with self.assertRaises(store.ReleaseStoreError) as raised:
                store.promote_release(candidate, self.library)
        self.assertEqual(raised.exception.code, "profile_changed")
        self.assertFalse((self.library / "decks").exists())

    def test_cross_filesystem_stage_is_rejected_without_copy_fallback(self):
        candidate, _ = self.stage()
        original_stat = Path.stat
        def different_device(path, *args, **options):
            result = original_stat(path, *args, **options)
            if path == candidate:
                values = list(result)
                values[2] = result.st_dev + 1
                return os.stat_result(values)
            return result
        with patch.object(Path, "stat", different_device), patch.object(store.os, "rename") as rename:
            with self.assertRaises(store.ReleaseStoreError) as raised:
                store.promote_release(candidate, self.library)
        self.assertEqual(raised.exception.code, "cross_filesystem")
        rename.assert_not_called()

    def test_same_and_different_concurrent_candidates_have_one_commit_point(self):
        for variant in ("same", "different"):
            library = self.root / f"concurrent-{variant}"
            stages = [self.stage(f"{variant}-{i}", audience="changed" if variant == "different" and i else "test")[0] for i in range(2)]
            context = multiprocessing.get_context("spawn")
            barrier, output = context.Barrier(2), context.Queue()
            processes = [context.Process(target=concurrent_promote, args=(str(stage), str(library), barrier, output)) for stage in stages]
            for process in processes:
                process.start()
            try:
                results = [output.get(timeout=45) for _ in processes]
                for process in processes:
                    process.join(timeout=45)
                    self.assertEqual(process.exitcode, 0)
            finally:
                for process in processes:
                    if process.is_alive():
                        process.terminate()
                        process.join()
                output.close()
            with self.subTest(variant=variant):
                if variant == "same":
                    self.assertEqual({row.get("status") for row in results}, {"promoted", "already_present"}, results)
                else:
                    self.assertEqual(sum(row["ok"] for row in results), 1, results)
                    self.assertEqual(next(row["code"] for row in results if not row["ok"]), "immutable_conflict")
                self.assertTrue(admission.admit_release(library / "decks/fixture/r1")["ok"])

    def test_multi_spec_failure_reports_exact_completed_prefix_and_keeps_it(self):
        spec = self.root / "spec.json"
        spec.write_text(json.dumps([
            {"source_dir": str(self.source), "deck_id": "fixture", "audience": "test", "desired_action": "test", "expected_slides": 1, "release_id": "r1"},
            {"source_dir": str(self.root / "missing"), "deck_id": "missing", "audience": "test", "desired_action": "test", "expected_slides": 1},
        ]))
        from io import StringIO
        output = StringIO()
        argv = ["package_deck_release.py", "--spec", str(spec), "--library-root", str(self.library)]
        with patch.object(sys, "argv", argv), patch("sys.stdout", output):
            with self.assertRaises(SystemExit) as raised:
                self.packager.main()
        self.assertEqual(raised.exception.code, 1)
        result = json.loads(output.getvalue())
        self.assertFalse(result["ok"])
        self.assertEqual(result["failed_spec_index"], 1)
        self.assertEqual([(row["manifest"]["deck_id"], row["status"]) for row in result["completed"]], [("fixture", "promoted")])
        self.assertEqual(self.catalog_keys(), {("fixture", "r1")})
        self.assertTrue(admission.admit_release(self.library / "decks/fixture/r1")["ok"])


if __name__ == "__main__":
    unittest.main()
