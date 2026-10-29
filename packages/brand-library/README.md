# AID brand library

Brand + design system for AID IoT, AID Defence and their legal parent, Inordinate Industrial Innovation
Private Limited. One shared foundation (tokens for colour roles, type, spacing, shape, motion, status;
reference components) and one folder per brand (palette, logo, DESIGN.md, VOICE.md, templates, agent skills).

Status: v0.0.1 skeleton. The structure, build and checks are real; every visual value is a PLACEHOLDER until
the type, logo and colour rounds are decided.

## Use it
```bash
npm install
npm run build    # tokens → dist/<brand>/ : CSS variables, Tailwind v4 theme, JSON, Figma variables
npm run check    # rebrand-proof, self-contained, brand isolation, WCAG AA contrast
```
Then open `examples/token-preview.html` to see every token by brand, mode (light/dark/night) and density.

## Share one brand
`npm run export -- --brand <aid-iot|aid-defence|inordinate> --out <empty folder>` writes a standalone package
with only that brand. It fails if anything from another brand leaks in.

## For agents
Start at `AGENTS.md`, then `INDEX.md`. How it works: `docs/LIBRARY.md`. Changes: `CHANGELOG.md`.
