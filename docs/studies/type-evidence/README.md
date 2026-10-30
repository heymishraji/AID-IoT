# Type study evidence

Images rendered from the Google Fonts files (Latin subset, default instance) on 2026-10-30 to compare digits,
especially the 4, across 36 sans families. Scripts that made them are kept here so the check can be repeated:
- `probe2.py`: tabular figures (equal digit widths or a `tnum` feature), rupee sign, x-height, per family.
- `render.py`: digit strips (`digit-strips-a.png`, `digit-strips-b.png`).
- `fours.py`: a large 4 and 0 per family (`fours-and-zeros-36-fonts.png`).
Run with: `uv run --no-project --with fonttools --with brotli --with pillow python -I <script> ...` (see each file's argv).
Finding: Archivo has no alternative 4 (glyphs: four, four.tf, four.dnom, four.numr only).

## Text face + data face matching (2026-10-30)
Decision: Archivo (text) + Atkinson Hyperlegible Next (data). Matching values now live in the brand library
tokens `font.match.*`. How they were found and verified:
- `metrics.py`: figure, cap and x-heights from the font files (Archivo figures 0.698 em; Atkinson 0.668 em, equal
  to its caps) → size match `font-size-adjust: cap-height 0.698` (×1.045).
- `stems.py`: stroke width of H and n per weight, after scaling → weight pairs 300/400/500/600/700 ↔ 310/380/460/560/680.
- `consistency-test.html`: rendered in headless Chrome 156; `ink.py` measures the screenshot. At 200 px: digits
  140/140 px, caps 138/140, x-height 106/104, H stem 19/19; a 3-line paragraph is 72 px with and without data spans.
  `same-line-check-chrome.png` shows unmatched (middle) vs matched (right) at 12–48 px in three weights.
