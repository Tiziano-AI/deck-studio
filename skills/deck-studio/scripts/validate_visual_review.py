#!/usr/bin/env python3
"""Read-only CLI for the canonical visual-review admission functions."""
from __future__ import annotations

import argparse
import json
from pathlib import Path

from release_admission import validate_visual_review


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("visual_review", type=Path)
    parser.add_argument("--report", type=Path)
    parser.add_argument("--expect-slides", type=int)
    parser.add_argument("--deck", type=Path, required=True)
    args = parser.parse_args()
    try:
        result = validate_visual_review(args.visual_review, args.report, args.expect_slides, args.deck)
    except (OSError, UnicodeError, ValueError) as exc:
        print(json.dumps({"ok": False, "error": str(exc)}))
        return 1
    print(json.dumps(result, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
