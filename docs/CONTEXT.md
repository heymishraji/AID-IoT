# Context — AID brand system + design system

_Last rewritten: 2026-10-27_

## State
- Fresh start. The website rebuild (Next.js site, prototypes, canvases, old docs) was removed at the user's
  request; recoverable from git tag `archive/website-v3`. Only the logo was kept: `assets/brand/aid-iot-mark.svg|png`.
- Goal: one brand system + end-to-end design system for parent AID and two brands, AID IoT and AID Defense,
  packaged as an LLM-readable library (tokens, DESIGN.md, skills, templates) and rebrand-proof.
- Phase: research done; nothing designed or built yet.

## Product truth
See `docs/PRODUCT-FACTS.md`. NAVIC = NavIC-based tracking hardware (convoy management); Lighthouse = the
software side of the convoy management system.

## Research (do not auto-load)
- Synthesis artifact: https://claude.ai/artifact/HG3jJSpQnwoMZ4YnwW4zUM (source `docs/RESEARCH-SYNTHESIS.html`)
- `docs/research/01..06-*.md`: brand anatomy, open-source DS, tokens, LLM library + skills, domain, collateral.

## Working recommendations (not yet approved by the user)
- Architecture: branded house (AID → AID IoT / AID Defense), with written triggers for moving Defense to endorsed.
- Base: own the tokens (DTCG 2025.10) and components (Base UI + shadcn registry format); borrow patterns from
  Astro UXDS (consoles), Siemens iX + Carbon (IoT, data viz).
- Library: single repo; DESIGN.md + VOICE.md per brand; AGENTS.md/CLAUDE.md routers; AID skills; llms.txt; MCP later.
- Collateral: parametric templates (content JSON → branded file); P0 = datasheet, deck, social/OG, email signature, roll-up.

## Open decisions (user)
NAVIC naming vs ISRO NavIC · Defense vs Defence · separate repo or this one · team tools (PPT/Slides/Canva/Figma)
· Figma plan · Lighthouse symbology/night mode · embedded HMI toolkit · Devanagari now/later · public vs internal
· brand owner/approver · branded house vs endorsed.
