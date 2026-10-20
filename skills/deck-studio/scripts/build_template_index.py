#!/usr/bin/env python3
"""Generate both selection indexes from per-system template.json owners."""

from __future__ import annotations

import argparse
import json
from pathlib import Path

FAMILIES = ("bold", "safe-presets", "house")
ARRAY_FIELDS = ("tone", "best_for", "avoid_for", "supported_layouts", "weak_cases")
TEXT_FIELDS = ("slug", "name", "family", "formality", "density", "scheme", "visual_signature", "language_posture", "maturity")


def read_templates(template_root: Path) -> list[dict]:
    """Validate authored records and references before deriving any output."""
    package = template_root.parent.resolve()
    rows, slugs = [], set()
    for source in sorted(template_root.glob("*/*/template.json")):
        row = json.loads(source.read_text(encoding="utf-8"))
        if not isinstance(row, dict):
            raise ValueError(f"{source}: metadata must be an object")
        slug = row.get("slug", "<unknown>")
        for key in TEXT_FIELDS:
            if not isinstance(row.get(key), str) or not row[key].strip():
                raise ValueError(f"{slug}: {key} must be a non-empty string")
        if slug in slugs or slug != source.parent.name:
            raise ValueError(f"{slug}: duplicate slug or metadata directory mismatch")
        slugs.add(slug)
        if row["family"] not in FAMILIES or row["family"] != source.parent.parent.name:
            raise ValueError(f"{slug}: invalid family or metadata directory mismatch")
        if row["maturity"] not in {"recipe", "preset", "starter", "developed"}:
            raise ValueError(f"{slug}: unsupported maturity")
        for key in ARRAY_FIELDS:
            values = row.get(key)
            if not isinstance(values, list) or not values or any(not isinstance(v, str) or not v.strip() for v in values):
                raise ValueError(f"{slug}: {key} must be a non-empty string array")
        paths = row.get("paths")
        if not isinstance(paths, dict) or not {"metadata", "design", "preview"} <= paths.keys():
            raise ValueError(f"{slug}: paths must include metadata, design and preview")
        for key, value in paths.items():
            if not isinstance(value, str) or Path(value).is_absolute() or ".." in Path(value).parts:
                raise ValueError(f"{slug}: invalid relative {key} path")
            resolved = (package / value).resolve()
            if package not in resolved.parents or not resolved.is_file():
                raise ValueError(f"{slug}: missing or escaping {key} path: {value}")
        if (package / paths["metadata"]).resolve() != source.resolve():
            raise ValueError(f"{slug}: metadata path must identify its own source")
        assets = row.get("assets")
        if not isinstance(assets, dict) or assets.get("font_delivery") not in {"external", "system", "bundled", "mixed"}:
            raise ValueError(f"{slug}: invalid font delivery posture")
        fonts = assets.get("fonts")
        if not isinstance(fonts, list) or not fonts or any(not isinstance(f, str) or not f.strip() for f in fonts):
            raise ValueError(f"{slug}: fonts must name intended typefaces")
        if not isinstance(assets.get("images"), str) or not assets["images"].strip():
            raise ValueError(f"{slug}: images must describe dependencies")
        if not isinstance(row.get("provenance"), dict) or row["provenance"].get("license") != "MIT":
            raise ValueError(f"{slug}: provenance must retain its MIT license")
        rows.append(row)
    if not rows:
        raise ValueError("no template.json sources found")
    return sorted(rows, key=lambda row: row["slug"])


def index_data(rows: list[dict]) -> dict:
    return {
        "schema_version": 2, "product": "decks", "skill": "deck-studio",
        "template_count": len(rows),
        "families": {family: sum(row["family"] == family for row in rows) for family in FAMILIES},
        "selection_contract": {
            "start": "Use templates/README.md to shortlist by tone, density and supported layouts; use this JSON for exact filtering.",
            "depth": "Read shortlisted previews when a visual choice is useful; read the selected full design recipe before building.",
            "family": "Family records provenance, not a safe/bold/wildcard selection quota.",
            "maturity": "Recipe means substantial guidance; preset means visual seed; starter means preliminary house scaffolding; developed means specific house guidance/assets. None is rendered acceptance.",
            "assets": "Localize external fonts used. System and bundled fonts still require checks with actual audience text.",
            "visible_slide_rule": "Keep template names, slugs, paths and option labels outside audience slide content.",
        },
        "templates": rows,
    }


def cell(value: object) -> str:
    return str(value).replace("|", "\\|").replace("\n", " ")


def readable_index(rows: list[dict]) -> str:
    lines = [
        "# Visual systems", "",
        "Generated from each system's `template.json`; do not edit this file or `index.json` directly.",
        "Regenerate with `python3 scripts/build_template_index.py`; add `--check` for a read-only freshness check (run from the skill directory, or pass its script path).", "",
        "Choose by communication tone, content density and structures the recipe describes. Read shortlisted metadata for audience fit, assets and language limits; then load the selected full recipe. Historical folders are provenance, not selection quotas.", "",
        "**Maturity:** recipe = substantial authored guidance; preset = visual seed; starter = preliminary house scaffolding; developed = specific house guidance/assets. Source depth is not rendered quality or language coverage. External fonts are not bundled: acquire/localize those used. Test actual text with bundled or system fonts too.", "",
        "## Shortlist", "",
        "| System / depth | Tone | Density | Supported structures | Signature / main limit |",
        "| --- | --- | --- | --- | --- |",
    ]
    for row in rows:
        metadata = row["paths"]["metadata"].removeprefix("templates/")
        preview = row["paths"]["preview"].removeprefix("templates/")
        lines.append("| " + " | ".join([
            f"[{cell(row['name'])}]({metadata}) · {row['maturity']} · {row['assets']['font_delivery']} fonts · [preview]({preview})",
            cell(", ".join(row["tone"])), cell(row["density"]),
            cell(", ".join(row["supported_layouts"])),
            cell(row["visual_signature"] + " Limit: " + row["weak_cases"][0]),
        ]) + " |")
    return "\n".join(lines) + "\n"


def generated_outputs(template_root: Path) -> dict[Path, str]:
    rows = read_templates(template_root)
    return {template_root / "index.json": json.dumps(index_data(rows), indent=2, ensure_ascii=False) + "\n", template_root / "README.md": readable_index(rows)}


def build(template_root: Path, check: bool = False) -> dict:
    outputs = generated_outputs(template_root)
    stale = [str(p) for p, text in outputs.items() if not p.is_file() or p.read_text(encoding="utf-8") != text]
    if check and stale:
        raise ValueError("generated template indexes are stale: " + ", ".join(stale))
    if not check:
        for path, text in outputs.items():
            path.write_text(text, encoding="utf-8")
    return {"ok": True, "mode": "check" if check else "build", "outputs": [str(p) for p in outputs]}


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("template_root", nargs="?", type=Path, default=Path(__file__).resolve().parent.parent / "templates")
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    try:
        result = build(args.template_root.resolve(), args.check)
    except (ValueError, OSError) as exc:
        print(json.dumps({"ok": False, "error": str(exc)}, indent=2))
        raise SystemExit(1)
    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
