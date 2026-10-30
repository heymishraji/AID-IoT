# Fonts

Two faces, shared by every brand. Both are on Google Fonts under the SIL Open Font License (free for commercial
use, embedding and self-hosting).

| Role | Face | Use for |
|---|---|---|
| Text | Archivo | Headlines, body, labels, captions, legal small print, numbers inside sentences and headlines |
| Data | Atkinson Hyperlegible Next | Anything a reader compares, checks or copies: table values, device IDs, registration numbers, coordinates, times, specifications, prices |

## Making them sit together
The data face is matched to the text face by measurement (tokens `font.match.*`):
- **Size.** Web: `font-size-adjust: cap-height 0.698` (the `.aid-data` class does it). Tools without it (Figma,
  Google Slides, Canva): set data text at 1.045 × the text size beside it.

  | Text size | 12 | 14 | 16 | 18 | 20 | 24 | 30 | 38 | 48 |
  |---|---|---|---|---|---|---|---|---|---|
  | Data size | 12.5 | 14.6 | 16.7 | 18.8 | 20.9 | 25.1 | 31.4 | 39.7 | 50.2 |
- **Weight.** Text 300 / 400 / 500 / 600 / 700 ↔ data 310 / 380 / 460 / 560 / 680. In tools with named weights
  only (Google Slides, Canva), use the same named weight; the difference is small.
- **Line height** does not change when data text is mixed into a line (verified in Chrome).

## Loading
- Web: link `core/fonts/fonts.css` (Google Fonts), or self-host.
- Self-host (offline, air-gapped, Lighthouse): download both families from fonts.google.com, keep the variable
  `.woff2` files with the app, and declare them with `@font-face` under the same family names.
- Figma, Google Slides, Canva: both families are available by name (check Canva's list for your plan).
