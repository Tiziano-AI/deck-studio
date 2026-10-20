#!/usr/bin/env python3
"""Export tool source, never this private repository's library or Git history."""
from __future__ import annotations

import argparse
import json
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ROOT_FILES = (
    "README.md", "ARCH.md", "VISION.md", "DECKS.md", "LICENSE", ".gitignore",
    "package.json", "package-lock.json", "plugin.json", ".claude-plugin/plugin.json",
    "publisher/static-server/package.json",
    "publisher/static-server/Dockerfile", "publisher/static-server/.dockerignore",
    "docs/HOSTED_DEPLOYMENT.md", "docs/DISTRIBUTION.md",
)
SOURCE_TREES = ("skills/deck-studio", "scripts", "publisher/static-server/src", "publisher/static-server/test", "publisher/static-server/ui")
EXCLUDED_PARTS = {"node_modules", "__pycache__", ".pytest_cache", ".ruff_cache", ".DS_Store"}


def source_files(root: Path) -> list[Path]:
    result = [root / name for name in ROOT_FILES]
    for name in SOURCE_TREES:
        tree = root / name
        if not tree.is_dir() or tree.is_symlink():
            raise ValueError(f"Missing or linked source tree: {name}")
        for path in sorted(tree.rglob("*")):
            relative = path.relative_to(tree)
            if any(part in EXCLUDED_PARTS for part in relative.parts):
                continue
            if path.is_symlink():
                raise ValueError(f"Linked source entry cannot enter the export: {path.relative_to(root)}")
            if path.is_file() and path.suffix not in {".pyc", ".pyo"}:
                result.append(path)
    for path in result:
        if not path.is_file() or path.is_symlink():
            raise ValueError(f"Missing or linked export input: {path.relative_to(root)}")
    return sorted(set(result))


def export_source(root: Path, output: Path) -> dict[str, object]:
    output = output.expanduser().absolute()
    if output.exists() or output.is_symlink():
        raise ValueError("Output must be a new directory; an existing tree is never replaced.")
    if output.resolve().is_relative_to(root.resolve()):
        raise ValueError("Export outside the development checkout, not inside its private tree.")
    # Select and validate the complete input set before creating anything.
    files = source_files(root)
    output.mkdir(parents=True)
    for source in files:
        target = output / source.relative_to(root)
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, target)
    return {"ok": True, "output": str(output), "files": len(files),
            "scope": "tool source only; no Git history, private library, installation notes or dependencies",
            "next": "Review this exact tree before publishing. Run its source validator and publisher tests."}


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--out", required=True, type=Path)
    args = parser.parse_args()
    try:
        print(json.dumps(export_source(ROOT, args.out), indent=2))
    except (ValueError, OSError) as error:
        parser.exit(1, f"export_public_source: {error}\n")


if __name__ == "__main__":
    main()
