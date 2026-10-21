#!/usr/bin/env python3
"""Validate the Decks product source, skills, releases, and publisher contract.

Input: current repository checkout.
Output: JSON summary on stdout; non-zero exit on validation failure.
Side effects: none.
"""

from __future__ import annotations

import argparse
import json
import re
import subprocess
import sys
from pathlib import Path
from urllib.parse import unquote, urlsplit


REPO_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REPO_ROOT / "skills/deck-studio/scripts"))
from proof_identity import load_object
from release_admission import AdmissionError, admit_release, validate_manifest
SKILL_NAMES = ("deck-studio",)
PUBLIC_REPOSITORY = "https://github.com/Tiziano-AI/deck-studio"


def label(path: Path) -> str:
    return str(path.relative_to(REPO_ROOT)) if path.is_relative_to(REPO_ROOT) else str(path)


def fail(message: str) -> None:
    print(json.dumps({"ok": False, "error": message}, indent=2))
    raise SystemExit(1)


def load_json(path: Path) -> dict[str, object]:
    try:
        return load_object(path)
    except ValueError as exc:
        fail(str(exc))


def run(command: list[str]) -> dict[str, object]:
    result = subprocess.run(command, cwd=REPO_ROOT, text=True, capture_output=True)
    if result.returncode != 0:
        fail(f"command failed: {' '.join(command)}\n{result.stdout}\n{result.stderr}")
    try:
        data = json.loads(result.stdout)
    except json.JSONDecodeError:
        return {"stdout": result.stdout.strip()}
    if isinstance(data, dict):
        return data
    return {"stdout": result.stdout.strip()}


def parse_frontmatter(path: Path) -> dict[str, str]:
    lines = path.read_text().splitlines()
    if not lines or lines[0] != "---":
        fail(f"{label(path)} missing frontmatter")
    fields: dict[str, str] = {}
    for line in lines[1:]:
        if line == "---":
            break
        match = re.fullmatch(r"([a-z_]+):\s*(.+)", line)
        if not match:
            fail(f"{label(path)} invalid frontmatter line: {line}")
        value = match.group(2)
        if value.startswith('"') and value.endswith('"'):
            value = value[1:-1]
        fields[match.group(1)] = value
    return fields


def validate_skill(name: str) -> dict[str, object]:
    root = REPO_ROOT / "skills" / name
    if not root.is_dir():
        fail(f"missing skill {name}")
    skill = root / "SKILL.md"
    metadata = root / "agents" / "openai.yaml"
    if not skill.is_file():
        fail(f"{name} missing SKILL.md")
    if not metadata.is_file():
        fail(f"{name} missing agents/openai.yaml")
    frontmatter = parse_frontmatter(skill)
    if frontmatter.get("name") != name:
        fail(f"{name} frontmatter name mismatch")
    description = frontmatter.get("description", "")
    if not 1 <= len(description) <= 1024:
        fail(f"{name} description must contain 1–1024 characters")
    metadata_text = metadata.read_text()
    if not re.search(r'^\s*allow_implicit_invocation:\s*true\s*$', metadata_text, re.MULTILINE):
        fail(f"{name} must permit implicit invocation")
    if "$deck-studio" not in metadata_text:
        fail(f"{name} default prompt must name its public entrypoint")
    if "DECKS.md" not in skill.read_text():
        fail("deck-studio must make the communication doctrine reachable")
    doctrine_copy = root / "DECKS.md"
    if not doctrine_copy.is_file() or doctrine_copy.read_bytes() != (REPO_ROOT / "DECKS.md").read_bytes():
        fail("deck-studio DECKS.md copy must match repo-root bytes")
    return {"skill": name, "description_chars": len(description)}


def validate_catalog(library_root: Path) -> dict[str, object]:
    catalog_path = library_root / "catalog.json"
    catalog = load_json(catalog_path)
    decks = catalog.get("decks")
    if not isinstance(decks, list):
        fail("catalog.decks must be a list")
    seen: set[str] = set()
    for row in decks:
        if not isinstance(row, dict):
            fail("catalog row must be an object")
        deck_id = str(row.get("deck_id", ""))
        release = str(row.get("current_release", ""))
        key = f"{deck_id}/{release}"
        if key in seen:
            fail(f"duplicate catalog release {key}")
        seen.add(key)
        if not all(re.fullmatch(r"[A-Za-z0-9][A-Za-z0-9_-]{0,127}", value) for value in (deck_id, release)):
            fail("catalog release identity must be a safe path component")
        release_dir = library_root / "decks" / deck_id / release
        manifest_path = release_dir / "deck-manifest.json"
        manifest = load_json(manifest_path)
        if manifest.get("deck_id") != deck_id or manifest.get("release_id") != release:
            fail(f"{key} manifest identity mismatch")
        try:
            validate_manifest(release_dir, manifest, allow_historical=True)
        except (OSError, UnicodeError, ValueError) as exc:
            fail(str(exc))
    return {"deck_count": len(decks)}


def validate_server_source() -> dict[str, object]:
    # Source syntax is not authorization evidence. The publisher's HTTP suite
    # exercises policy, direct assets, session revocation and traversal.
    root = REPO_ROOT / "publisher" / "static-server"
    files = sorted((root / "src").glob("*.mjs"))
    for path in files:
        run(["node", "--check", str(path)])
    return {"syntax_checked": len(files), "behavior_check": "npm test --prefix publisher/static-server"}


def validate_package_resources() -> dict[str, object]:
    skills = REPO_ROOT / "skills"
    names = sorted(path.parent.name for path in skills.glob("*/SKILL.md"))
    if names != list(SKILL_NAMES):
        fail(f"public skill set differs from product contract: {names}")
    root = skills / "deck-studio"
    checked = 0
    # Check authored Markdown links, not incidental mentions or fenced examples.
    for path in sorted(root.rglob("*.md")):
        if "node_modules" in path.parts:
            continue
        text = re.sub(r"```.*?```", "", path.read_text(), flags=re.DOTALL)
        for raw in re.findall(r"\[[^\]]*\]\(([^\s)]+)\)", text):
            url = urlsplit(raw.strip("<>"))
            if url.scheme or url.netloc or not url.path:
                continue
            target = (path.parent / unquote(url.path)).resolve()
            if not target.is_relative_to(root) or not target.exists():
                fail(f"{label(path)} has unreachable package resource {raw}")
            checked += 1
    return {"public_skills": names, "checked_links": checked}


def validate_distribution_metadata() -> dict[str, object]:
    portable = load_json(REPO_ROOT / "plugin.json")
    claude = load_json(REPO_ROOT / ".claude-plugin/plugin.json")
    version = portable.get("version")
    if not isinstance(version, str) or not re.fullmatch(r"\d+\.\d+\.\d+", version):
        fail("plugin version must be a release semantic version")
    for name, manifest in (("portable", portable), ("Claude", claude)):
        if manifest.get("name") != "deck-studio" or manifest.get("version") != version:
            fail(f"{name} plugin identity/version mismatch")
        if manifest.get("repository") != PUBLIC_REPOSITORY or manifest.get("homepage") != PUBLIC_REPOSITORY:
            fail(f"{name} plugin must identify its public source and website")
        if manifest.get("author", {}).get("name") != "Tiziano AI" or manifest.get("license") != "MIT":
            fail(f"{name} plugin publisher/license mismatch")
    interface = portable.get("extensions", {}).get("com.openai", {}).get("interface", {})
    if (interface.get("displayName") != "Deck Studio"
            or interface.get("developerName") != "Tiziano AI"
            or interface.get("websiteURL") != PUBLIC_REPOSITORY):
        fail("OpenAI interface must identify Deck Studio, its publisher and website")
    if claude.get("displayName") != "Deck Studio":
        fail("Claude plugin displayName mismatch")
    package_paths = ("package.json", "skills/deck-studio/package.json", "publisher/static-server/package.json")
    packages = {name: load_json(REPO_ROOT / name) for name in package_paths}
    for name, package in packages.items():
        if package.get("version") != version or package.get("private") is not True:
            fail(f"{name} must share the plugin version and remain npm-private")
    dependency_fields = ("workspaces", "dependencies", "devDependencies", "optionalDependencies", "peerDependencies")
    if any(packages["package.json"].get(field) for field in dependency_fields):
        fail("plugin root must remain dependency-free; producer dependencies belong to skills/deck-studio")
    for name in ("package-lock.json", "skills/deck-studio/package-lock.json"):
        lock = load_json(REPO_ROOT / name)
        package = packages[name.replace("package-lock.json", "package.json")]
        if (lock.get("version") != version or lock.get("name") != package.get("name")
                or lock.get("packages", {}).get("", {}).get("version") != version):
            fail(f"{name} root metadata differs from its package")
        if name == "package-lock.json":
            entries = lock.get("packages", {})
            if set(entries) != {""} or any(entries[""].get(field) for field in dependency_fields):
                fail("root lockfile must remain dependency-free, without workspace links or bundled producer packages")
    return {"name": "deck-studio", "version": version, "repository": PUBLIC_REPOSITORY}


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--release", type=Path, help="Admit one byte-bound release for new publication; historical schemas are rejected")
    parser.add_argument("--library-root", type=Path, help="Additionally validate an explicit library catalog, including historical bundle consistency")
    args = parser.parse_args()
    if args.release:
        release = args.release.absolute()
        try:
            result = admit_release(release, target="library")
        except AdmissionError as exc:
            fail(str(exc))
        print(json.dumps(result, indent=2))
        return
    rows = {
        "skills": [validate_skill(name) for name in SKILL_NAMES],
        "template_index": run(
            [
                sys.executable,
                "skills/deck-studio/scripts/validate_template_index.py",
                "skills/deck-studio/templates/index.json",
            ]
        ),
        "server": validate_server_source(),
        "package": validate_package_resources(),
        "distribution": validate_distribution_metadata(),
    }
    if args.library_root:
        rows["catalog"] = validate_catalog(args.library_root.expanduser().resolve())
    print(json.dumps({"ok": True, **rows}, indent=2))


if __name__ == "__main__":
    main()
