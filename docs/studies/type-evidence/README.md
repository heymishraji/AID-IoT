# Type study evidence

Images rendered from the Google Fonts files (Latin subset, default instance) on 2026-10-30 to compare digits,
especially the 4, across 36 sans families. Scripts that made them are kept here so the check can be repeated:
- `probe2.py`: tabular figures (equal digit widths or a `tnum` feature), rupee sign, x-height, per family.
- `render.py`: digit strips (`digit-strips-a.png`, `digit-strips-b.png`).
- `fours.py`: a large 4 and 0 per family (`fours-and-zeros-36-fonts.png`).
Run with: `uv run --no-project --with fonttools --with brotli --with pillow python -I <script> ...` (see each file's argv).
Finding: Archivo has no alternative 4 (glyphs: four, four.tf, four.dnom, four.numr only).
