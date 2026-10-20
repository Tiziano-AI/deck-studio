#!/usr/bin/env python3
"""Read-only structural validation of inline or local-linked Deck Studio HTML.

Static checks establish document and resource structure. Computed layout,
runtime behavior and visual quality are checked by rendered QA and review.
"""
from __future__ import annotations

import argparse
import json
import re
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

VOID_TAGS = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"}
SECRET_WORDS = ("DECKS_SITE_PASSWORD", "DECKS_SESSION_SECRET", "RAILWAY_TOKEN", "DATABASE_URL", "OPENAI_API_KEY", "ANTHROPIC_API_KEY", "XAI_API_KEY")


class DeckParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.stack = []
        self.errors = []
        self.viewports = 0
        self.stages = 0
        self.slides = 0
        self.marker = False
        self.css = []
        self.js = []
        self.resources = []
        self.text = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        classes = set((attrs.get("class") or "").split())
        ancestors = [row[1] for row in self.stack]
        inert = any(row[0] in {"template", "noscript"} for row in self.stack)
        if not inert:
            if tag == "body" and "data-web-slides-studio" in attrs:
                self.marker = True
            if "deck-viewport" in classes:
                self.viewports += 1
            if "deck-stage" in classes:
                self.stages += 1
                if not any("deck-viewport" in row for row in ancestors):
                    self.errors.append(".deck-stage must be inside .deck-viewport")
            if "slide" in classes:
                self.slides += 1
                if not any("deck-stage" in row for row in ancestors):
                    self.errors.append("every .slide must be inside .deck-stage")
                if any("slide" in row for row in ancestors):
                    self.errors.append(".slide elements must not be nested")
            if tag == "link" and "stylesheet" in (attrs.get("rel") or "").lower().split():
                self.resources.append(("css", attrs.get("href") or ""))
            if tag == "script" and "src" in attrs:
                self.resources.append(("js", attrs.get("src") or ""))
        if tag not in VOID_TAGS:
            self.stack.append((tag, classes))

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID_TAGS:
            self.handle_endtag(tag)

    def handle_endtag(self, tag):
        for index in range(len(self.stack) - 1, -1, -1):
            if self.stack[index][0] == tag:
                del self.stack[index:]
                break

    def handle_data(self, data):
        tags = {row[0] for row in self.stack}
        if tags & {"template", "noscript"}:
            return
        if "style" in tags:
            self.css.append(data)
        elif "script" in tags:
            self.js.append(data)
        elif "body" in tags:
            self.text.append(data)


def fail(message: str) -> None:
    print(json.dumps({"ok": False, "error": message}, indent=2))
    raise SystemExit(1)


def clean_text(text: str, label: str, errors: list[str]) -> None:
    lowered = text.lower()
    if "/users/" in lowered or "file://" in lowered:
        errors.append(f"{label} contains a private filesystem path or file URL")
    for token in SECRET_WORDS:
        if token.lower() in lowered:
            errors.append(f"{label} contains secret-like token {token}")


def local_code(root: Path, base: Path, url: str, errors: list[str]) -> tuple[Path, str] | None:
    parts = urlsplit(url)
    decoded = unquote(parts.path)
    target = (base / decoded).resolve()
    if not decoded or parts.scheme or parts.netloc or decoded.startswith("/") or "\\" in decoded or not target.is_relative_to(root):
        errors.append(f"stylesheet/script must be a local resource inside the deck folder: {url}")
        return None
    if not target.is_file():
        errors.append(f"missing local stylesheet/script: {url}")
        return None
    try:
        code = target.read_text(encoding="utf-8")
    except (OSError, UnicodeError):
        errors.append(f"unreadable local stylesheet/script: {url}")
        return None
    clean_text(code, url, errors)
    return target, code


def css_imports(code: str) -> list[str]:
    code = re.sub(r"/\*.*?\*/", "", code, flags=re.DOTALL)
    pattern = r'''@import\s+(?:url\(\s*(?:["']([^"']+)["']|([^\s)]+))\s*\)|["']([^"']+)["'])'''
    return [next(value for value in match.groups() if value is not None) for match in re.finditer(pattern, code, re.IGNORECASE)]


def js_imports(code: str) -> list[str]:
    # Resolve literal ES-module imports; executed/computed imports remain the
    # renderer's responsibility and are included in its served-byte capture.
    pattern = r'''(?:^|[;\n])\s*(?:import\s*(?:[^;"']*?\sfrom\s*)?|export\s+[^;"']*?\sfrom\s*)["']([^"']+)["']'''
    return [match.group(1) for match in re.finditer(pattern, code)]


def validate_document(path: Path, expect_slides: int | None = None) -> dict[str, object]:
    """Pure validation entry point shared by standalone release admission."""
    path = path.resolve()
    html = path.read_text(encoding="utf-8")
    parser = DeckParser()
    parser.feed(html)
    errors = parser.errors
    clean_text(html, "deck", errors)
    if parser.viewports != 1:
        errors.append("expected exactly one .deck-viewport")
    if parser.stages != 1:
        errors.append("expected exactly one .deck-stage")
    if not parser.marker:
        errors.append("missing data-web-slides-studio marker on body")
    if parser.slides == 0:
        errors.append("no .slide elements found")
    if expect_slides is not None and parser.slides != expect_slides:
        errors.append(f"slide count {parser.slides} does not match expected {expect_slides}")

    pending = [(kind, path.parent, url) for kind, url in parser.resources]
    pending.extend(("css", path.parent, url) for code in parser.css for url in css_imports(code))
    pending.extend(("js", path.parent, url) for code in parser.js for url in js_imports(code))
    seen = set()
    while pending:
        kind, base, url = pending.pop(0)
        resource = local_code(path.parent, base, url, errors)
        if resource is None:
            continue
        target, code = resource
        if (kind, target) in seen:
            continue
        seen.add((kind, target))
        (parser.css if kind == "css" else parser.js).append(code)
        if kind == "css":
            pending.extend(("css", target.parent, url) for url in css_imports(code))
        elif kind == "js":
            pending.extend(("js", target.parent, url) for url in js_imports(code))

    css = re.sub(r"/\*.*?\*/", "", "\n".join(parser.css), flags=re.DOTALL)
    fixed_stage = False
    for selectors, body in re.findall(r"([^{}]+)\{([^{}]*)\}", css):
        selectors = selectors.split(",")
        if any(re.search(r"\.deck-stage(?:\.[\w-]+|#[\w-]+)*$", selector.strip()) for selector in selectors):
            if re.search(r"\bwidth\s*:\s*1920px\b", body, re.IGNORECASE) and re.search(r"\bheight\s*:\s*1080px\b", body, re.IGNORECASE):
                fixed_stage = True
        if any(re.fullmatch(r"\.slide(?:\.[\w-]+|:[\w()-]+)*", selector.strip()) for selector in selectors) and re.search(r"\bdisplay\s*:\s*none\b", body, re.IGNORECASE):
            errors.append(".slide CSS uses display:none")
    if not fixed_stage:
        errors.append("missing 1920x1080 fixed-stage CSS rule")
    if not re.search(r"\bwindow\s*\.\s*WebSlidesStudio\s*=", "\n".join(parser.js)):
        errors.append("missing WebSlidesStudio runtime API assignment")
    if errors:
        raise ValueError("; ".join(errors))
    return {"ok": True, "path": str(path), "slide_count": parser.slides, "visible_text_chars": len(" ".join(" ".join(parser.text).split()))}


def validate(path: Path, expect_slides: int | None = None) -> dict[str, object]:
    try:
        return validate_document(path, expect_slides)
    except (OSError, UnicodeError, ValueError) as exc:
        fail(str(exc))


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("deck")
    parser.add_argument("--expect-slides", type=int)
    args = parser.parse_args()
    print(json.dumps(validate(Path(args.deck), args.expect_slides), indent=2))


if __name__ == "__main__":
    main()
