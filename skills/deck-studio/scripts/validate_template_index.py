#!/usr/bin/env python3
"""Read-only validation of metadata and both deterministic derived indexes."""

from __future__ import annotations

import json
import sys
from pathlib import Path

from build_template_index import build, index_data, read_templates


def validate(index_path: Path) -> dict:
    if index_path.name != "index.json":
        raise ValueError("expected templates/index.json")
    root = index_path.resolve().parent
    build(root, check=True)
    rows = read_templates(root)
    data = index_data(rows)
    return {"ok": True, "template_count": len(rows), "families": data["families"], "checked_paths": sum(len(row["paths"]) for row in rows), "generated_indexes": ["index.json", "README.md"]}


def main() -> None:
    try:
        if len(sys.argv) != 2:
            raise ValueError("usage: validate_template_index.py <templates/index.json>")
        result = validate(Path(sys.argv[1]))
    except (ValueError, OSError) as exc:
        print(json.dumps({"ok": False, "error": str(exc)}, indent=2))
        raise SystemExit(1)
    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
