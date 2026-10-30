# AGENTS.md · AID brand + design-system library (v0.0.1, skeleton)

Internal library for Inordinate Industrial Innovation Pvt Ltd and its separate brands, **AID IoT** and
**AID Defence**, on one shared core. Status: SKELETON. Structure and pipeline are real; every visual value is a PLACEHOLDER.

## Read first
1. `INDEX.md`: "need X → read Y". Use it instead of browsing.
2. The brand you are working for: `brands/<id>/AGENTS.md`, then its `DESIGN.md` and `VOICE.md`.
3. `docs/LIBRARY.md` before changing structure, tokens or the build.

## Brands (ids)
`aid-iot` · `aid-defence` · `inordinate` (legal documents only) · `_fixture-brand` (test only, never ship).
Never mix brands in one output. Spell it "AID Defence". British English.

## Hard rules
- Tokens are the single source of truth (W3C DTCG 2025.10). Never write a hex/rgb value in a component,
  template or example: use semantic CSS variables (`--aid-color-text-primary`, `--aid-type-body-size`).
- Brands only define `palette.*` and `brand.*`. Core owns everything else.
- Protected namespaces, never overridden by a brand: `status`, `focus`, `symbology`, `classification`.
- Do not edit `dist/` or the generated YAML block at the top of any `DESIGN.md`: edit tokens, run `npm run build`.
- Type: Archivo for text; Atkinson Hyperlegible Next for data a reader compares, checks or copies, always
  via `.aid-data` (matched size and weight). Details: `core/fonts/README.md`.
- Before handing work back: `npm run check` must pass.

## Commands
- `npm run build`: tokens → `dist/<brand>/` (CSS, Tailwind v4, JSON, Figma variables) + DESIGN.md front matter.
- `npm run export -- --brand <id> --out <dir>`: self-contained package of core + one brand.
- `npm run check`: protected namespaces, no hard-coded values, fixture rebrand proof, export isolation.

## Do not touch
`dist/` (generated). This package is self-contained: it never links to files outside its own folder.
Research, decisions and project state live in the AID workspace repo that hosts it (its root `AGENTS.md`).
