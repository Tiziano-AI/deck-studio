# Bundled brand fonts

These files are the font inventory used by the SmoothOperator template
compositions. The `SO Raleway` and `SO Victor Mono` names are CSS family aliases;
the fonts retain their own names, copyright and SIL Open Font License 1.1 terms.

- Raleway: `Raleway-OFL.txt` contains the Raleway Project Authors notice, including
  the Reserved Font Name Raleway.
- Victor Mono: `Victor-Mono-OFL.txt` contains the Victor Mono Project Authors
  notice matching the copyright embedded in these files.

The notices come from the corresponding [Raleway source](https://github.com/google/fonts/blob/main/ofl/raleway/OFL.txt)
and [Victor Mono source](https://github.com/google/fonts/blob/main/ofl/victormono/OFL.txt)
in Google Fonts. `font-manifest.json` records the files, styles, weights,
copyright and notice sources. It does not establish the original download
or transformation history of the bundled WOFF2 binaries.

When copying a font into a standalone deck, keep its family's full copyright
and license notice beside it. Preserve the notice with the font even when
the deck needs only one weight. Use the package-local token stylesheets as the
declaration owner; the manifest also lists assets those stylesheets do not load.
