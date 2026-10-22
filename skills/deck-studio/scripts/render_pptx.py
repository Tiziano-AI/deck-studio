#!/usr/bin/env python3
"""Render native PPTX into byte-bound PNG evidence; never self-accept appearance."""
from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import shutil
import struct
import subprocess
import tempfile
from pathlib import Path
from xml.sax.saxutils import escape

from pptx_inspection import inspect_pptx


def identity(path: Path, root: Path) -> dict:
    data = path.read_bytes()
    return {"path": path.resolve().relative_to(root.resolve()).as_posix(),
            "sha256": hashlib.sha256(data).hexdigest(), "bytes": len(data)}


def executable(name: str, variable: str, candidates: tuple[str, ...] = ()) -> str:
    explicit = os.environ.get(variable)
    choices = (explicit,) if explicit else (shutil.which(name), *candidates)
    for candidate in choices:
        if candidate and Path(candidate).is_file() and os.access(candidate, os.X_OK):
            return str(Path(candidate).resolve())
    raise ValueError(f"{name} is required for native render QA; set {variable} to an executable")


def runtime() -> dict:
    return {
        "soffice": executable("soffice", "DECK_STUDIO_SOFFICE", ("/Applications/LibreOffice.app/Contents/MacOS/soffice",)),
        "pdftoppm": executable("pdftoppm", "DECK_STUDIO_PDFTOPPM"),
        "pdffonts": executable("pdffonts", "DECK_STUDIO_PDFFONTS"),
    }


def run(command: list[str], *, environment: dict | None = None) -> str:
    result = subprocess.run(command, env=environment, stdin=subprocess.DEVNULL,
                            capture_output=True, text=True, check=False, timeout=180)
    if result.returncode:
        raise ValueError(f"{Path(command[0]).name} failed ({result.returncode}): {result.stderr.strip()[:800]}")
    return result.stdout


def png_size(path: Path) -> tuple[int, int]:
    with path.open("rb") as stream:
        header = stream.read(24)
    if len(header) != 24 or header[:8] != b"\x89PNG\r\n\x1a\n" or header[12:16] != b"IHDR":
        raise ValueError("native renderer did not produce a PNG screenshot")
    return struct.unpack(">II", header[16:24])


def prepare_output(path: Path, root: Path, *, directory: bool = False) -> None:
    """Refuse proof destinations that redirect writes outside their deck owner."""
    if not path.resolve().is_relative_to(root.resolve()) or path.is_symlink():
        raise ValueError("native proof output must not be a symlink or escape the deck folder")
    if path.exists() and not (path.is_dir() if directory else path.is_file()):
        raise ValueError("native proof output has an incompatible existing file type")


def replace_output(path: Path, data: bytes, root: Path) -> None:
    prepare_output(path, root)
    # A unique temporary sibling avoids following an existing file symlink or
    # sharing a fixed scratch name with a concurrent capture.
    candidate = None
    try:
        with tempfile.NamedTemporaryFile(prefix=".pptx-capture-", dir=path.parent, delete=False) as stream:
            candidate = Path(stream.name)
            stream.write(data)
        prepare_output(path, root)
        candidate.replace(path)
    finally:
        if candidate is not None:
            candidate.unlink(missing_ok=True)


def font_environment(work: Path) -> dict:
    """Give this headless process a font inventory without changing the Mac.

    A fresh LibreOffice profile can otherwise miss macOS's user fonts. An
    explicitly supplied FONTCONFIG_FILE remains the caller's choice.
    """
    environment = dict(os.environ)
    environment["SAL_USE_VCLPLUGIN"] = "svp"
    if not environment.get("FONTCONFIG_FILE"):
        directories = [Path.home() / "Library/Fonts", Path("/System/Library/Fonts"),
                       Path("/Library/Fonts"), Path("/Applications/LibreOffice.app/Contents/Resources/fonts/truetype"),
                       Path("/usr/share/fonts"), Path("/usr/local/share/fonts"),
                       Path.home() / ".local/share/fonts", Path.home() / ".fonts"]
        fontconfig = work / "fontconfig.xml"
        fontconfig.write_text('<?xml version="1.0"?>\n<fontconfig>\n'
            + "".join(f"<dir>{escape(str(directory))}</dir>\n" for directory in directories if directory.is_dir())
            + f"<cachedir>{escape(str(work / 'fontcache'))}</cachedir>\n</fontconfig>\n", encoding="utf-8")
        environment["FONTCONFIG_FILE"] = str(fontconfig)
    return environment


def render_pptx(path: Path, out: Path | None = None, *, expected_slides: int | None = None, dpi: int = 144) -> dict:
    path = path.resolve()
    root = path.parent
    out = (out or root / "proof").resolve()
    if not out.is_relative_to(root) or out == root:
        raise ValueError("native proof must live in a directory inside the deck folder")
    if type(dpi) is not int or not 72 <= dpi <= 300:
        raise ValueError("native render DPI must be between 72 and 300")
    tools = runtime()
    native = inspect_pptx(path, expected_slides)
    artifact = identity(path, root)
    with tempfile.TemporaryDirectory(prefix="deck-studio-pptx-") as temporary:
        work = Path(temporary)
        environment = font_environment(work)
        local = work / "deck.pptx"
        shutil.copyfile(path, local)
        profile = (work / "lo-profile").as_uri()
        version = run([tools["soffice"], "--version"], environment=environment).strip()
        run([tools["soffice"], f"-env:UserInstallation={profile}", "--headless", "--nologo",
             "--nodefault", "--nolockcheck", "--norestore", "--convert-to", "pdf:impress_pdf_Export",
             "--outdir", str(work), str(local)], environment=environment)
        pdf = work / "deck.pdf"
        if not pdf.is_file() or not pdf.stat().st_size:
            raise ValueError("LibreOffice did not produce a PDF render")
        font_output = run([tools["pdffonts"], str(pdf)], environment=environment)
        # These are the actual PDF font names, not proof that every authored font
        # was available. The reviewer compares them with native.fonts.
        pdf_fonts = sorted({row.split()[0] for row in font_output.splitlines()[2:] if row.strip()})
        run([tools["pdftoppm"], "-png", "-r", str(dpi), str(pdf), str(work / "slide")], environment=environment)
        frames = sorted(work.glob("slide-*.png"), key=lambda item: int(re.search(r"-(\d+)\.png$", item.name).group(1)))
        if len(frames) != native["slideCount"]:
            raise ValueError("native PDF render page count differs from PPTX slide count")
        if identity(path, root) != artifact:
            raise ValueError("PPTX changed during native render; regenerate proof")
        frame_out = out / "pptx"
        prepare_output(frame_out, root, directory=True)
        frame_out.mkdir(parents=True, exist_ok=True)
        slides = []
        for number, frame in enumerate(frames, 1):
            width, height = png_size(frame)
            target = frame_out / f"slide-{number:02d}.png"
            replace_output(target, frame.read_bytes(), root)
            slides.append({"slide": number, "screenshot": identity(target, root), "width": width, "height": height})
        report = {
            "schema_version": 1, "kind": "native-pptx", "ok": True, "errors": [],
            "source": {"files": [artifact], "external_resources": []},
            "artifact": artifact, "slideCount": native["slideCount"], "native": native,
            "renderer": {"name": "LibreOffice", "version": version, "dpi": dpi, "pdfFonts": pdf_fonts},
            "slides": slides,
        }
        out.mkdir(parents=True, exist_ok=True)
        report_path = out / "pptx-report.json"
        replace_output(report_path, (json.dumps(report, indent=2) + "\n").encode("utf-8"), root)
        return report


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("pptx", nargs="?", type=Path)
    parser.add_argument("--out", type=Path)
    parser.add_argument("--expect-slides", type=int)
    parser.add_argument("--dpi", type=int, default=144)
    parser.add_argument("--check", action="store_true", help="check render executables without creating files or installing anything")
    args = parser.parse_args()
    try:
        if args.check:
            if args.pptx or args.out or args.expect_slides:
                parser.error("--check does not take a deck or output options")
            print(json.dumps({"ready": True, "tools": runtime()}, indent=2))
        else:
            if args.pptx is None:
                parser.error("provide a PPTX file or use --check")
            print(json.dumps(render_pptx(args.pptx, args.out, expected_slides=args.expect_slides, dpi=args.dpi), indent=2))
    except (OSError, ValueError, subprocess.TimeoutExpired) as exc:
        print(json.dumps({"ok": False, "error": str(exc)}))
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
