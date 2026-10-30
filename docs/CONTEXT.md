# Context — AID brand system + design system

_Last rewritten: 2026-10-30 (type decided and built in; identity round 1 in Figma)_

## State
- Fresh start on 2026-10-27; the old website work is in git tag `archive/website-v3`.
- Research is done (reports 01–10). Brand strategy v0 is drafted. The library skeleton is built and its
  checks pass, with placeholder values only: no real colours, fonts or logo decisions yet.
- Waiting on leadership answers to the questionnaire (Claude Docs, shared by the user):
  https://claude.ai/artifact/HH6YJ7DN16ZXoF9GUJSr7w

## Confirmed (docs/brand/DISCOVERY.md, docs/DECISIONS.md)
- House of brands: legal parent Inordinate Industrial Innovation Pvt Ltd; AID IoT and AID Defence are
  separate identities (visuals, imagery, voice) on one shared core; each brand exports to its own repo.
- "Defence" spelling. One Google Fonts sans family for all brands. Logo open to evolve or be replaced.
- Tools: Google Slides, Figma (paid, MCP), Canva, Claude, ChatGPT, Codex, Claude Code. Internal library;
  the user owns releases. AI imagery by default. Lighthouse needs symbology, classification banners, night mode.

## Tooling
- graphify knowledge graph in `graphify-out/` (507 nodes, 23 groups). Query it before reading research:
  `graphify query "<question>"`. Setup on a new machine: `bash scripts/setup.sh`.
- Studies (pages the owner decides from): `docs/studies/`. Type study → artifact above.
- Decision tracker: `npm run decisions` → docs/decisions.html → https://claude.ai/artifact/XJfR1n8t9czc79kuS1ARhA
- `npm run check` now includes WCAG AA contrast for every brand × mode (180 pairs, all passing).

## Where things live
- GitHub: https://github.com/heymishraji/AID-IoT (main + tag `archive/website-v3`). Push after every task.
- Repo = **packages** (self-contained, shareable) + **workspace** (this `docs/`, `assets/`, `scripts/`).
  Contract and sharing steps: `README.md`. Agent router: `AGENTS.md`.
- `packages/brand-library/`: the brand + design system. Inside it: `AGENTS.md`, `INDEX.md`, `docs/LIBRARY.md`,
  `core/` (shared foundations: DTCG tokens, modes, density, protected namespaces, components.css),
  `brands/<aid-iot|aid-defence|inordinate|_fixture-brand>/` (tokens, DESIGN.md draft, VOICE.md, STRATEGY.md,
  assets, templates, skills). It has its own package.json and node_modules.
- `docs/brand/`: DISCOVERY, PARENT (parent rules), STRATEGY-CONTRAST. `docs/PRODUCT-FACTS.md`: product truth.
- Commands from the root (Node at ~/.nvm/versions/node/v24.20.0/bin): `npm run build`, `npm run check`,
  `npm run export -- --brand <id> --out <dir>`, `npm run decisions`.
- Checks: protected namespaces, no hard-coded values, fixture rebrand proof, self-contained package (nothing
  points outside it), export isolation (no brand folder names the other brand), WCAG AA contrast.

## Research (do not auto-load): docs/research/
01 brand anatomy · 02 open-source DS · 03 tokens · 04 LLM library + skills · 05 domain · 06 collateral ·
07 IoT competitors · 08 defence competitors · 09 multi-product/multi-brand · 10 modern brands, rebrands, fonts.
Synthesis page (reports 01–06 only; written before the house-of-brands decision, so sections 02 and 11
are out of date): https://claude.ai/artifact/HG3jJSpQnwoMZ4YnwW4zUM

## Type (decided 2026-10-30)
- Archivo = text face; Atkinson Hyperlegible Next = data face ("if a reader compares, checks or copies it").
  Matched by tokens `font.match.*`, applied by `.aid-data`; rules in `packages/brand-library/core/fonts/README.md`.
  Study + evidence: https://claude.ai/artifact/3MBCvgv2VPYcQ5LaVxHWy1, `docs/studies/type-evidence/`. Devanagari: own font later.

## Working recommendations (not yet approved)
- Strategy v0: AID IoT "Understood first. Built to fit."; CTA "Tell us the problem". AID Defence "established
  challenger", three-tier disclosure (public / on request / briefing only); CTA "Request a private briefing".
- AID IoT portfolio as one platform + five families; AID Defence as two missions commanded through Lighthouse.
- Logo: evolve the mark (one line, three nodes, triangulation story), test against a new wordmark.
- Identity round 1 in Figma (Mishraji's Workspace): https://www.figma.com/design/IxAZrYXdTZpYgPzZD8mWSV
  Reference boards (45 live captures), logo routes A/B/C × both brands, colour routes (3 per brand, AA-checked),
  12 AI mood images. Repo copies: docs/studies/identity-round-1/, assets/imagery/generated/. Awaiting the owner's picks. Avoid Inter, Geist, Space Grotesk, Manrope, Poppins, Roboto.
- Naming risks: NAVIC (ISRO), Cortex (Arm), Lighthouse (Google, DGLL).

## Pending with the user
- Identity round 1 picks: logo route, colour route per brand, imagery (see NEXT).

## Agents and setup (since 2026-10-29)
- Helper agents default to Sonnet (env in `.claude/settings.json` and the user's settings); pass Opus for crucial work.
- SessionStart hook runs `scripts/setup.sh`; graphify hooks no-op if the CLI is missing.
