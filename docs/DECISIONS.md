# Decisions

Source for the decision tracker page (`npm run decisions` → docs/decisions.html).

## Open
<!-- One line each: area · question · recommendation · waiting on · evidence. Move to the log when decided. -->
- Naming · Rename the NAVIC line or keep it after legal clearance? · Rename the line; say "NavIC-enabled" as a feature · Leadership (Q9.1) · research/05, research/01 §3.6
- Naming · Rename Cortex, which clashes with Arm's Cortex trademark? · Rename during the portfolio naming pass · Leadership (Q9.2) · research/09
- Naming · Give Lighthouse a descriptor to avoid Google Lighthouse and the DG of Lighthouses? · Keep Lighthouse, add a descriptor such as "Lighthouse Command" · Brand owner · research/08, research/09
- Identity · Logo route: keep and explain, evolve, or replace? · Evolve: one line, three nodes, triangulation story; test against a new wordmark · Brand owner, after the visual round · research/10
- Identity · Do AID IoT and AID Defence share one mark in two treatments or have two marks? · One mark, two treatments (open and soft for IoT, closed and sharp for Defence) · Leadership (Q8.4) · research/10
- Type · Which Google Fonts family for all brands? · Test Geologica, Atkinson Hyperlegible Next and Anek; IBM Plex as fallback; avoid Inter, Geist, Space Grotesk, Manrope · Brand owner, after the type study · research/10, research/03 §6
- Strategy · AID IoT positioning? · Lead with "problem-first partner", backed by "one team, every layer"; promise "Understood first. Built to fit." · Brand owner · brands/aid-iot/STRATEGY.md
- Strategy · AID Defence positioning? · Lead with "established challenger", sound like "clear enough to decide"; CTA "Request a private briefing" · Brand owner · brands/aid-defence/STRATEGY.md
- Structure · Any visible link between the two brands? · None by default; "a brand of Inordinate Industrial Innovation" only in legal footers · Leadership (Q2.2) · docs/brand/PARENT.md
- Portfolio · How to group AID IoT products? · One platform plus five families (Fleet & Mobility, Cold Chain, Industrial Connectivity, Connected Machines, Business Software) · Leadership (Q3) · research/09
- Portfolio · Where do the store, courses, PCB milling and vending sit? · Outside both brands, or a separate "Build with AID" services line · Leadership (Q1.6) · research/05, research/09
- Proof · Which defence claims can be published? · Publish only what is evidenced; hold "seven systems fielded" until confirmed · Leadership (Q4.3) · research/05, research/08

## Log
<!-- Append-only. date · decision · why · alternatives rejected -->
2026-10-27 · Removed the website rebuild and all prior docs; kept only the logo · user asked for a fresh start toward a brand + design system · alternative (keep site as reference) rejected by user; history kept in tag archive/website-v3
2026-10-27 · Scope is a multi-brand system (AID, AID IoT, AID Defense) published as an LLM-readable library · user goal: any agent produces consistent output across products and collateral · single-brand or website-only scope rejected
2026-10-27 · Research run as six parallel agents (Opus for brand, DS survey, LLM library; Sonnet for tokens, domain, collateral) · breadth with depth per topic · single combined report rejected as too shallow
2026-10-27 · Lighthouse = software side of the NAVIC convoy management system · confirmed by user · overrides research inference
2026-10-27 · Brand structure is a house of brands: legal parent Inordinate Industrial Innovation Pvt Ltd, with separate AID IoT and AID Defence identities (visuals, imagery, language) · audiences barely overlap · branded house and endorsed-brand options from research rejected by user
2026-10-27 · Spelling is "AID Defence" · Indian usage (also British usage, so consistent with house style) · "Defense" rejected
2026-10-27 · One font family across parent and both brands, from Google Fonts, sans serif; optional per-brand accent face · consistency and performance · per-brand type families rejected
2026-10-27 · Library must export each brand as a self-contained package for its own repo · brands may live in separate repos · monolith-only rejected
2026-10-27 · Library is internal; the user is the sole owner of releases and versioning · user decision
2026-10-27 · Logo kept for now, but open to evolution or full replacement with a story · it currently has no meaning or customer recognition · locking the current mark rejected
2026-10-27 · AI imagery is the default (ChatGPT image gen, Figma); mood boards in Figma · real sites and kit cannot be shown · photo shoots deferred
2026-10-28 · Library lives in this repo (core/ + brands/), each brand exportable as a self-contained package checked for isolation · user requirement for separate brand repos · a separate aid-brand repo rejected for now (export covers it)
2026-10-28 · Full VOICE.md and STRATEGY.md live in brands/<brand>/ so they travel with the export; cross-brand rules stay in docs/brand/ · export must carry them · keeping them under docs/brand rejected
2026-10-28 · Brand folders never name the other brand ("the parent company's other brand") · enforced by the isolation check · allowing names rejected because exports would leak
2026-10-28 · graphify installed as a project skill with a committed knowledge graph (graphify-out/) · agents query the graph instead of re-reading large reports, cutting tokens · user-level-only install rejected because cloud sessions must work from a GitHub clone
2026-10-28 · Decision tracker page generated from DECISIONS.md (npm run decisions) and published as an artifact · the brand owner reads and decides from a page, while the Markdown stays the source · a hand-maintained HTML page rejected because it would drift
2026-10-28 · Contrast (WCAG AA) is part of npm run check; night palette brightened and light strong border darkened so all 180 pairs pass · real colours must be checked automatically · manual contrast review rejected
