# Decisions

Source for the decision tracker page (`npm run decisions` → docs/decisions.html).

## Open
<!-- One line each: area · question · recommendation · waiting on · evidence. Move to the log when decided. -->
- Naming · Rename the NAVIC line or keep it after legal clearance? · Rename the line; say "NavIC-enabled" as a feature · Leadership (Q9.1) · research/05, research/01 §3.6
- Naming · Rename Cortex, which clashes with Arm's Cortex trademark? · Rename during the portfolio naming pass · Leadership (Q9.2) · research/09
- Naming · Give Lighthouse a descriptor to avoid Google Lighthouse and the DG of Lighthouses? · Keep Lighthouse, add a descriptor such as "Lighthouse Command" · Brand owner · research/08, research/09
- Identity · Modernised mark: Beacon (AID IoT) + Facet (AID Defence), or the runner-up Refined? · Beacon + Facet (27/28 each on the research checklist) · Brand owner · Figma page 02 and 05, docs/studies/logo-modernisation/ (RESEARCH.md, README.md)
- Identity · Do AID IoT and AID Defence share one mark in two treatments or have two marks? · One mark, two treatments (open and soft for IoT, closed and sharp for Defence) · Leadership (Q8.4) · research/10
- Identity · AID IoT colour route: Copper, Indigo or Jamun? · Copper (conductor story; keep status chips off copper fills) · Brand owner · Figma identity round 1 page 03, docs/studies/identity-round-1/colour-routes.json
- Identity · AID Defence colour route: Slate & Brass, Graphite & Glacier or Basalt & Bone? · Slate & Brass (calm authority, escapes the grey sameness) · Brand owner · Figma identity round 1 page 03
- Identity · Imagery direction: which of the 12 AI images set each brand's direction? · Keep all but regenerate iot-3 with the sensor in front · Brand owner · Figma identity round 1 page 04, assets/imagery/generated/
- Library · Night versions of the protected status, symbology and classification colours (they stay at daytime brightness in night mode) · Add night values in core/tokens/protected · Brand owner · UI previews, Lighthouse console in night mode
- Library · Brand-tinted neutrals: colour routes tint the neutral scale per brand, but neutrals are core-owned today · Add a brand neutral role if a tinted route wins · Brand owner · docs/studies/identity-round-1/ui-previews/README.md
- Library · Status colours are bright placeholders (Astro defaults) that clash with the calm brand look · Tune them in their own pass, keeping meaning and contrast · Brand owner · UI previews
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
2026-10-29 · Repo is heymishraji/AID-IoT, split into self-contained packages (packages/brand-library first) and an internal workspace (docs, assets, scripts); a check fails if a package points outside its folder · the user wants each system shareable so another team's LLM can plug it in · keeping the library at the repo root rejected because future projects would tangle with it
2026-10-29 · Devanagari support is not a criterion for the brand font; Devanagari gets its own font later · the owner said Hindi is not needed now · weighting the choice toward Anek, Mukta or Noto for script coverage rejected
2026-10-29 · Helper agents default to Sonnet; Opus is passed explicitly when an agent's output decides or changes the result · research and analysis are cheap to run on Sonnet, crucial reasoning needs the stronger model · Opus for every agent rejected (18% of usage)
2026-10-29 · scripts/setup.sh runs automatically at session start (SessionStart hook), locally and in cloud sessions · a cloud session must work from a GitHub clone with no manual step · manual setup only rejected
2026-10-29 · Type round 2: 18 Google Fonts in six styles, checked from the font files (tabular digits, ₹, italics, widths), with a weighted scorecard · the owner wanted more variety and a way to judge beyond looks · deciding from round 1's four candidates rejected
2026-10-30 · Type: Archivo is the shared text face; Atkinson Hyperlegible Next is the shared data face for values a reader compares, checks or copies · the owner likes Archivo's headlines, body and small print but its 4 is unclear in data; Atkinson has the clearest digits; both are Google Fonts so every tool works · Archivo alone, Atkinson digits spliced into Archivo (breaks Google Slides, needs a custom font file) and single fonts (Chivo, Public Sans, Schibsted Grotesk) rejected
2026-10-30 · Supersedes 2026-10-27 "one font family": two shared faces, still identical for every brand · data needs its own face · per-brand faces still rejected
2026-10-30 · Data face is matched to the text face by measurement: font-size-adjust cap-height 0.698 (×1.045 in tools), weights 310/380/460/560/680 for 300–700; verified in Chrome (equal digit height and stroke, unchanged line height) · the owner required the two to look consistent on one line · matching by eye rejected
2026-10-30 · Identity round 1 built in Figma (reference boards from 45 live captures, three logo routes per brand, three colour routes per brand with AA contrast, 12 AI mood images with prompts) · the type is decided, so the identity needs evidence and options to choose from · deciding logo, colour and imagery from prose alone rejected
2026-10-30 · Keep the current AID mark and modernise it; routes B (one continuous line) and C (wordmark-led A) dropped · the owner judged B and C "not at all good" and wants continuity with brand recall · replacing the mark rejected
2026-10-30 · Logo work starts from research: RESEARCH.md checklist (14 criteria) and production limits for 16 touchpoints; eight variations scored; real vector mark placed on ten touchpoint mockups in Figma · the owner asked for research first and for scalability to be shown in real use · designing variations by taste alone rejected
2026-10-30 · Colour routes are judged on UI previews built with the brand library (each route = brand-role and neutral overrides), in light, dark and night, with lessons from the 51 references shown on the screens · swatches alone could not show long-term fit · static colour boards alone rejected
2026-10-30 · Figma file has a cover page (mark lattice pattern, title, one-line goal, status); set as thumbnail by being the first frame of the first page · the owner wanted the file's purpose and progress visible at a glance · API thumbnail setting unavailable
