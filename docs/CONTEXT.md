# Context — AID brand system + design system

_Last rewritten: 2026-10-27 (after discovery answers)_

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

## Confirmed by the user (see docs/brand/DISCOVERY.md)
- House of brands: legal parent Inordinate Industrial Innovation Pvt Ltd; AID IoT and AID Defence are separate
  identities (visuals, imagery, voice) on one shared core. Each brand exports as a self-contained package.
- "Defence" spelling. One Google Fonts sans family across all brands. Logo open to evolve or be replaced.
- Tools: Google Slides, Figma (paid, MCP connected), Canva, Claude, ChatGPT, Codex, Claude Code. Internal library;
  the user owns releases. AI imagery is the default. Lighthouse needs symbology, classification banners, night mode.

## Working recommendations (not yet approved by the user)
- Base: own the tokens (DTCG 2025.10) and components (Base UI + shadcn registry format); borrow patterns from
  Astro UXDS (consoles), Siemens iX + Carbon (IoT, data viz).
- Library: single repo; DESIGN.md + VOICE.md per brand; AGENTS.md/CLAUDE.md routers; AID skills; llms.txt; MCP later.
- Collateral: parametric templates (content JSON → branded file); P0 = datasheet, deck, social/OG, email signature, roll-up.

## Still open
Leadership: business/ambition (Q1–6), product problems and proof, certifications, customers, claims, audiences,
legal/trademarks (incl. NAVIC vs ISRO NavIC). User: which task to run next (see NEXT.md), embedded HMI toolkit.
