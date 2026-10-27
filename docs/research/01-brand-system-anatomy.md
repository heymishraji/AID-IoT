# 01 · Brand system anatomy, discovery inputs and multi-brand architecture

**For:** AID (AID IoT + AID Defense) · **Date:** 27 Oct 2026 · **Status:** research input, not a decision
**Purpose:** define what a complete brand system for AID must contain, what we must gather before building it, how to structure a parent + two sub-brands + products + solutions, and how to make it rebrand-proof and readable by AI models.

> Evidence key: **[S]** = sourced (URL inline) · **[K]** = established industry knowledge, not re-verified in this session; verify before quoting externally.

---

## 0. Executive summary

1. A complete brand system has **four layers**: *Strategy* (why/who/what we say), *Identity* (how we look and sound), *Application* (how it is used on real artefacts) and *Governance* (who owns it, how it changes). Most failed brand books are an identity layer with no strategy above it and no governance below it.
2. For AID, the right architecture is a **branded house with endorsed sub-brands**: one "AID" masterbrand (the triangle mark), two descriptor sub-brands (*AID IoT*, *AID Defense*) that share the mark, type and grid but differ in colour emphasis, imagery and tone. Products (NAVIC) and solutions (Lighthouse) are **descriptive or coined product names endorsed by the sub-brand**, never given their own logos. Closest precedents: GE after the split, Airbus (commercial vs Defence and Space), Siemens/Healthineers, Arm's 2025 product-family naming.
3. **"NAVIC" is a serious naming risk.** NavIC is the operational name of ISRO's Indian Regional Navigation Satellite System — used in phones, chipsets and government procurement. A defence navigation product called NAVIC will be confused with it at best and challenged at worst. Trademark clearance (IP India class 9/12/13/38/42) and a rename or qualification are needed before the brand system locks it in.
4. **Rebrand-proofing = brand-as-code.** One source of truth for every decision (tokens in the W3C DTCG 2025.10 format, master templates, a DAM, a written rule set in Markdown/JSON), with semantic names ("brand.accent.primary") rather than literal names ("orange"). GE's 2022–24 split shows the payoff: three companies kept the monogram and changed colour/names on a shared architecture.
5. **Defence branding is about restraint and proof.** Credibility comes from evidence (programmes, certifications, deployments), controlled imagery (export-control review of every photo, render and spec), and a calmer tone than IoT. New-wave defence tech (Anduril, Helsing, Shield AI) uses near-monochrome palettes, confident plain language and cinematic but sanitised imagery; legacy primes use blue, flags and platforms.
6. Publish the system **as an online portal backed by a Git repo** (Markdown + tokens + assets), not a PDF. The same files feed the website, the design system, and an LLM "digital library".

---

## 1. Anatomy of a complete brand system — definitive checklist

Tick each item as *exists / draft / missing*. Items marked ★ are the minimum viable brand system (MVBS) for AID's first release.

### 1.1 Strategy layer (the "why" and "what we say")

| # | Element | What it contains | Notes for AID |
|---|---|---|---|
| S1 ★ | Purpose | Why the company exists beyond profit; one sentence | Shared by both sub-brands |
| S2 ★ | Mission | What we do, for whom, how, now | Can differ per sub-brand |
| S3 | Vision | The world in 5–10 years if we succeed | Parent-level only |
| S4 ★ | Values | 3–5 behaviours, each with "we do / we don't" | Must be credible to defence buyers (integrity, discretion) |
| S5 ★ | Positioning statement | For [audience] who [need], AID is the [frame of reference] that [benefit] because [reason to believe] | One per sub-brand + one for the parent |
| S6 ★ | Brand promise | The single thing every touchpoint must deliver | e.g. "it works in the field, first time" |
| S7 ★ | Audiences / personas | Buyer, user, influencer, approver per segment | IoT: plant heads, CIOs, OEMs. Defence: services HQ, DRDO labs, DPSUs, integrators, MoD procurement |
| S8 ★ | Messaging house | Umbrella message → 3–4 pillars → proof points per pillar | Pillars shared; proof points per sub-brand |
| S9 ★ | Tone of voice | Personality traits, tone sliders (formal↔casual etc.), do/don't word lists, sample rewrites | IoT and Defense get different slider settings on one voice |
| S10 | Brand personality / archetype | 3–4 traits, optional archetype (Sage, Ruler, Creator…) | Useful for prompt engineering of AI copy |
| S11 ★ | Naming architecture | Rules for company, sub-brand, product, solution, feature, version names; trademark process | Critical given NAVIC (§3.6) |
| S12 | Brand story / narrative | Origin, tension, turning point, proof | Feeds About page, decks |
| S13 | Elevator pitches | 10s / 30s / 2-min versions | Per sub-brand |
| S14 | Boilerplate | 50/100/150-word "About AID" | Press releases, tenders |
| S15 | Competitive frame | Who we're compared with and how we differ | From the competitor audit |
| S16 | Editorial style guide | Spelling (British English vs Indian English conventions), numbers, units, acronyms, capitalisation, inclusive language | Mailchimp's content style guide is the model: https://styleguide.mailchimp.com |

### 1.2 Identity layer (how we look and sound)

| # | Element | What it contains | Notes for AID |
|---|---|---|---|
| I1 ★ | Logo system | Symbol, wordmark, lockups (horizontal, stacked, symbol-only), sub-brand lockups, co-branding lockups | Triangle symbol + "AID" wordmark + descriptor ("IoT" / "Defense") |
| I2 ★ | Clear space & minimum size | Defined from a unit of the mark (e.g. the dot diameter); print mm and screen px minima | Triangle's corner dots make a natural unit |
| I3 ★ | Logo misuse | 8–12 illustrated don'ts | Recolouring strokes, rotating, outlining, effects |
| I4 ★ | Colour system | Core palette, sub-brand accents, neutrals, functional (success/warn/error), data-viz palette; HEX/RGB/CMYK/Pantone/OKLCH; contrast pairs that pass WCAG AA | Four-colour mark is a challenge: decide whether the multi-colour mark is the *only* place all four meet |
| I5 ★ | Typography | Primary/secondary families, weights, scale, line-height, Indic script support (Devanagari at minimum), licensing, fallbacks | Licensing for web, app, desktop and embedding in PDFs |
| I6 | Iconography | Grid, stroke, corner radius, metaphors, library | Rounded strokes echo the pill-shaped logo |
| I7 | Illustration / diagrams | System diagrams, architecture drawings, isometric or flat rules | IoT is diagram-heavy (device → edge → cloud) |
| I8 ★ | Photography / imagery | Subjects, lighting, crop, colour grade, people, product, environment; per sub-brand | Defence needs a clearance workflow (§6) |
| I9 | 3D / renders | Material, lighting, camera angles for product renders | Renders are safer than photos for defence |
| I10 | Data visualisation | Chart colours, chart types, annotation style | IoT dashboards and the Signal platform |
| I11 | Motion | Principles, easing curves, durations, logo animation, transitions | Project rule: "motion explains a mechanism" |
| I12 | Sonic | Audio logo, UI sounds, voice-over guidance | Optional, later |
| I13 ★ | Layout & grid | Grid per format (web, A4, 16:9, social), margins, hierarchy | Shared across sub-brands |
| I14 | Graphic devices | Signature shapes/patterns derived from the mark | e.g. pill strokes, triangulation lines — this is what makes the brand recognisable without the logo |
| I15 | Accessibility | Contrast, min type sizes, alt-text rules, reduced motion | AA required by project rules |

### 1.3 Application layer (real artefacts)

| # | Artefact group | Items |
|---|---|---|
| A1 ★ | Digital | Website patterns, product UI (Signal), email signatures, HTML email, favicon/app icons, Open Graph images |
| A2 ★ | Presentations | Master 16:9 deck (both sub-brands), tender/RFP response template, investor deck |
| A3 ★ | Collateral | Product datasheet, solution brief, case study, brochure, pamphlet/flyer, white paper |
| A4 | Social | Profile/cover images, post templates (LinkedIn first), video intros/outros, captions |
| A5 | Stationery | Letterhead, business cards, envelopes, invoices, certificates, NDAs |
| A6 | Events | Booth/stand (DefExpo, Aero India, IoT shows), roll-ups, badges, lanyards, backdrops |
| A7 | Signage & environments | Office, factory, labs, wayfinding |
| A8 | Product & packaging | Device enclosures (logo placement, colour), nameplates, labels, regulatory marks (CE/BIS/FCC), serial/QR, packaging, manuals, quick-start guides |
| A9 | Defence-specific | Classification/marking banners, export-control notices, tender formats, ruggedised product marking (paint specs, MIL-STD colours, IR-low-signature logos) |
| A10 | People & culture | Recruitment ads, careers page, uniform/merchandise |
| A11 | Co-branding | Partner, OEM, government programme (Make in India, iDEX) lockups |

### 1.4 Governance layer (how it stays right)

| # | Element | What it contains |
|---|---|---|
| G1 ★ | Ownership | Named brand owner (accountable), brand council (decides), contributors |
| G2 ★ | Approval workflow | What needs approval, by whom, SLA; self-serve vs reviewed |
| G3 ★ | Single source of truth | Tokens + master files + DAM + rules in one versioned repo (§5) |
| G4 ★ | Versioning & changelog | SemVer for the brand (v1.0, v1.1…), dated changelog, deprecation notes |
| G5 | Asset management (DAM) | Naming conventions, metadata, rights/expiry for photos, export-control status per asset |
| G6 | Training & onboarding | 30-minute brand induction, agency briefing pack |
| G7 | Compliance audit | Quarterly sample audit of output |
| G8 | Legal | Trademark register, domain portfolio, usage licences for partners |
| G9 ★ | AI usage rules | Which models may generate what; mandatory human review for defence content; prompt library; machine-readable rule files |

---

## 2. Discovery inputs — the AID brand questionnaire

Agencies typically run: (1) desk research and audit of existing materials, (2) stakeholder interviews, (3) customer/partner interviews, (4) competitor audit, (5) positioning workshop, (6) synthesis into a strategy brief. [K] Below is a questionnaire tailored to AID. Owner = who should answer.

### 2.1 Business and ambition (CEO, founders)
1. In one sentence, why does AID exist? What would the world miss if AID disappeared?
2. Revenue split today and in 3 years: IoT hardware / IoT software (Signal) / IoT solutions / Defence products / Defence solutions.
3. Is AID Defense a division, a separate legal entity, or planned to become one? Any plans for separate funding, JV, listing or sale? (This decides architecture — see §3.)
4. What must the brand make possible in 24 months? (e.g. win a defence tender, raise a round, enter export markets, hire 100 engineers).
5. What is AID *not*? Markets, customers or work you will refuse.
6. Where does manufacturing happen, and is "made in India" central to the story?

### 2.2 Offer and proof (product, engineering, sales)
7. Full list of products, platforms, solutions and services, with current names and owners.
8. For each: what problem, for whom, what outcome, what proof (deployments, numbers, certifications, awards)?
9. Which certifications/approvals do we hold? (ISO 9001, AS9100, ISO 27001, CE, BIS, DGQA/CEMILAC, DRDO ToT, iDEX awards, MIL-STD testing.)
10. Which customer names may we say publicly? Which can be referenced only as "a tri-service customer"?
11. What is technically unique (the "only we" claims) and can we prove each one?

### 2.3 Audiences (sales, BD, customers)
12. Who buys, who uses, who influences, who signs — for IoT and for Defence separately?
13. What do they worry about when choosing a supplier? (risk, lifecycle support, indigenisation, security, price.)
14. How do they find suppliers? (tenders/GeM, trade shows, referrals, integrators, search.)
15. What do customers say about us unprompted? (Collect 5–10 quotes per sub-brand.)
16. Why have we lost deals?

### 2.4 Competition and category (BD, marketing)
17. Top 5 competitors per sub-brand (Indian and global). Which do we most want to be compared with, and least?
18. Category conventions we must keep (to be trusted) and which we can break (to be noticed).

### 2.5 Personality and voice (leadership workshop)
19. If AID IoT and AID Defense were people at the same family dinner, how would they differ?
20. Place each sub-brand on sliders: formal↔conversational, technical↔plain, reserved↔bold, serious↔warm, established↔challenger.
21. Three brands you admire (any sector) and why; three you'd hate to resemble.
22. Words we always/never use (e.g. "solutions", "cutting-edge", "weaponised").

### 2.6 Identity assets (design)
23. Original logo files (vector), the story/meaning of the triangle and its four colours, and whether the CEO is attached to each element.
24. Existing fonts, colours, templates, photo library — with licences.
25. Which assets have equity with customers and must survive any redesign?
26. Physical product: enclosure colours, logo placement, labelling constraints.

### 2.7 Legal, naming and compliance (legal, export control)
27. Registered trademarks and applications (classes), domains, social handles for AID, AID IoT, AID Defense, NAVIC, Lighthouse, Signal.
28. Is "AID" itself cleared in all target classes and markets? ("AID" is a common word — very weak as a standalone mark.) [K]
29. Export-control classification of each defence product (Indian SCOMET category; any US-origin content triggering ITAR/EAR; foreign partner restrictions).
30. Who signs off public release of defence imagery and specifications today?

### 2.8 Operations and governance
31. Who will own the brand day to day? Who arbitrates between IoT and Defense?
32. What tools do teams use to make collateral (PowerPoint, Canva, Figma, Google Workspace)? This decides the template formats.
33. Which external agencies/partners produce material for us?
34. Appetite for AI-generated content, and limits (defence content, people imagery).

### 2.9 Research activities to run alongside
- **Audit**: collect every live artefact (site, decks, brochures, booths, product labels) into one wall; score consistency.
- **Stakeholder interviews**: 8–12 × 45 min (CEO, sub-brand heads, sales, engineering, manufacturing, a defence liaison).
- **Customer interviews**: 5 per sub-brand, including one lost deal.
- **Competitor audit**: 10–15 brands; capture logo, palette, type, imagery, headline claims, proof style.
- **Positioning workshop**: half day; output = positioning statements, messaging house, voice sliders.

---

## 3. Brand architecture for a parent + two sub-brands + products + solutions

### 3.1 The four models (Aaker & Joachimsthaler's brand relationship spectrum) [K]

| Model | Definition | Strength | Weakness | Example |
|---|---|---|---|---|
| **Branded house** (monolithic) | One master brand, descriptors only | Every win builds one brand; cheapest | Risk contagion; one tone for all | Siemens, Samsung, Microsoft, GE (pre-split), Airbus |
| **Endorsed** | Distinct sub-brands with visible parent endorsement | Room for different personalities while borrowing trust | Two brands to fund | Siemens Healthineers, Tata Advanced Systems, Courtyard by Marriott |
| **Sub-brand / hybrid** | Mix: masterbrand + some strong sub-brands | Flexible | Can become incoherent | Microsoft (Microsoft + Xbox + LinkedIn), Bosch (Bosch + BSH/Rexroth) |
| **House of brands** | Independent brands, parent invisible | Risk isolation, targeted positioning | Expensive; no halo | Alphabet (Google, Waymo, Verily), P&G |

### 3.2 Case studies

| Company | Architecture | What happened / lesson for AID |
|---|---|---|
| **GE → GE Aerospace / GE Vernova / GE HealthCare** | Branded house that split into three companies sharing one monogram | Announced July 2022: all three keep the GE name and Monogram; GE HealthCare got "compassion purple" for warmth, GE Aerospace "atmosphere blue"; GE Aerospace owns the trademark and licenses it to the others. Interbrand designed the architecture. ([GE press release](https://www.ge.com/news/press-releases/ge-unveils-brand-names-for-three-planned-future-public-companies), [Interbrand](https://interbrand.com/?p=77993)) **Lesson:** a shared mark + "Parent + descriptor" naming + a distinct colour per business is the most scalable pattern, and it survives even a full legal separation. Decide now who owns the "AID" mark if Defense is ever spun out. [S] |
| **Airbus (EADS → Airbus, 2014)** | Branded house with divisions | EADS merged Airbus Military, Astrium and Cassidian into *Airbus Defence and Space*, scrapping lesser-known names because "Airbus" had far stronger awareness. ([Design Week](https://www.designweek.co.uk/issues/january-2014/eads-rebrands-as-airbus-group/), [Via Satellite](https://www.satellitetoday.com/regional/2014/01/03/eads-changes-name-to-airbus/)) **Lesson:** civil and defence can live under one masterbrand with a descriptor; consolidating names increases awareness. [S] |
| **Siemens / Siemens Healthineers** | Endorsed | 2016 rename of Siemens Healthcare to "Healthineers" when it became a separate legal entity, ahead of a 2018 listing; the CEO said units would remain "umbrellaed" under Siemens. ([AuntMinnie](https://www.auntminnie.com/industry-news/article/15614926/siemens-healthcare-now-known-as-siemens-healthineers), [Becker's](https://www.beckersspine.com/uncategorized/siemens-ceo-company-not-breaking-up-but-function-like-fleet-of-ships/)) **Lesson:** sub-brand distinctiveness tends to follow legal/financial separation. The coined name was widely mocked at launch — descriptive names are safer for B2B. [S] |
| **Bosch** | Branded house (+ some endorsed) | Moved from a 3,600-page PDF brand book to an online Frontify portal in 2019, later extended to subsidiaries and regional brands. ([Frontify case](https://www.frontify.com/en/cases/frontify-for-bosch/)) **Lesson:** a portal scales across sub-brands; PDFs do not. [S] |
| **Honeywell** | Branded house splitting | Spun off Advanced Materials as *Solstice Advanced Materials* (new name, no Honeywell) on 30 Oct 2025; Aerospace to separate in H2 2026 keeping "Honeywell Aerospace". ([Honeywell](https://www.honeywell.com/us/en/press/2025/10/honeywell-completes-spin-off-of-solstice-advanced-materials), [Military & Aerospace](https://militaryaerospace.com/commercial-aerospace/article/55325392/honeywell-outlines-new-business-structure-ahead-of-aerospace-and-materials-spin-offs)) **Lesson:** the business that keeps the parent name is the one closest to the heritage; others get new names. [S] |
| **Thales** | Branded house | Thomson-CSF renamed Thales (2000) to unify a fragmented group; civil and defence share one identity with sector descriptors. [K] |
| **Saab** | Branded house | Defence/aerospace keeps "Saab"; the car business left in 1990 and the shared heritage name caused decades of confusion. **Lesson:** name-sharing after separation needs explicit licence terms. [K] |
| **L3Harris** | Merger, combined name | Harris renamed L3Harris Technologies at close of merger, 29 Jun 2019. ([Flexera note](https://community.flexera.com/s/article/harris-has-been-renamed-to-l3harris-technologies)) Combined names are a political compromise, rarely a brand idea. [S] |
| **BAE Systems** | Branded house with geographic/sector descriptors | "BAE Systems Inc.", "BAE Systems Platforms & Services" etc. ([Wikipedia](https://en.wikipedia.org/wiki/BAE_Systems_Inc.)) **Lesson:** strict "Parent + descriptor" naming scales to hundreds of units. [S] |
| **Tata Advanced Systems** | Endorsed (group masterbrand) | 100% owned by Tata Sons; the "Tata" name lends trust; TASL uses the Tata wordmark/symbol with its own descriptor. ([Wikipedia](https://www.wikipedia.com/wiki/TASL)) [S/K] |
| **Mahindra Defence / Adani Defence & Aerospace** | Group masterbrand + descriptor | Both borrow conglomerate trust; visual identity is the group's with sector descriptor. [K] |
| **Bharat Electronics (BEL)** | Standalone PSU brand | Government-owned; credibility from state ownership, not design. Restraint and institutional tone. [K] |
| **Samsung** | Branded house | Samsung Electronics, Samsung Biologics, Samsung Heavy Industries share one wordmark; affiliates have separate governance. [K] |
| **Alphabet / Google** | House of brands (2015) | Alphabet created to separate Google from "Other Bets" (Waymo, Verily). Alphabet itself has almost no consumer brand. **Lesson:** only worth it when risk/investor separation is the goal. [K] |
| **Microsoft** | Branded house + selected sub-brands | 2012 four-square logo; "Microsoft + product" (Microsoft 365, Azure, Teams), with Xbox/LinkedIn/GitHub as endorsed or independent. [K] |
| **Arm (2025)** | Branded house, product families | In 2025 Arm dropped the 20-year-old "Cortex" naming for market-led families (e.g. Neoverse for infrastructure, Lumex for mobile, Zena for automotive). ([MONOist](https://monoist.itmedia.co.jp/mn/articles/2510/06/news030.html)) Its refresh by DEPT unified all lines of business in one design system with a "Horizon Arc" device. ([DEPT](https://www.deptagency.com/?p=4326494)) **Lesson:** product families named by *market*, one design system for all. [S; family names K] |

### 3.3 Recommendation for AID: branded house, two descriptor sub-brands

```
AID  (masterbrand: triangle mark + wordmark; corporate, investors, careers)
├── AID IoT        (descriptor sub-brand — commercial & industrial)
│   ├── Signal     (software platform)          → "Signal by AID IoT" / "AID Signal"
│   ├── <hardware> (device families)            → descriptive or family names
│   └── <solutions>(e.g. condition monitoring)  → descriptive names only
└── AID Defense    (descriptor sub-brand — defence & security)
    ├── NAVIC*     (product)                    → *rename/qualify, see §3.6
    └── Lighthouse (solution built on NAVIC)    → "Lighthouse, powered by NAVIC"
```

Why not endorsed/house of brands: AID is small; splitting budget across two identities weakens both. A branded house lets IoT deployments lend engineering credibility to Defense, and Defense lends rigour back. Keep the option to shift Defense to *endorsed* (its own name "… by AID") if it becomes a separate legal entity, takes foreign partners, or needs risk separation (e.g. some commercial customers or investors avoiding defence association; ESG screens). Document that trigger in the guidelines.

Note spelling: "Defense" (US) vs "Defence" (British/Indian usage). Indian MoD, DRDO and Indian press use "Defence". Using "AID Defense" in an Indian market with British-English house style is an inconsistency worth a deliberate decision. [K]

### 3.4 How AID IoT and AID Defense should differ while staying one family

| Dimension | Shared (the family) | AID IoT | AID Defense |
|---|---|---|---|
| Mark | Triangle symbol, wordmark, lockup geometry, clear space | Full four-colour mark | Option: monochrome/single-colour mark as default (full colour reserved for corporate). Restraint reads as seriousness |
| Colour | Neutrals, grid, functional colours, data-viz logic | Warmer, brighter; leads with the mark's orange/green | Darker ground (off-black/deep neutral), one accent (the mark's blue), minimal saturation |
| Type | Same families and scale | Lighter weights, more air | Tighter, heavier, more uppercase labels/codes, monospace for specs |
| Imagery | Same grading rules, real not stock | Plants, cities, assets, people using the product, dashboards | Products in context, terrain, operators from behind/obscured, renders > photos; cleared by export control |
| Graphic device | Pill strokes / triangulation | Signal-flow lines (device → cloud) | Coordinates, bearings, grids — navigation-led |
| Motion | Same easing family | Flowing, data moving | Precise, step-wise, slower |
| Voice | Plain, outcome-first, British English | Optimistic, practical, ROI language | Calm, exact, understated; no hype, no violence; claims always with evidence |
| Proof style | Numbers + named outcomes | Case studies, uptime, savings | Trials, certifications, programmes, indigenisation %, lifecycle support |

### 3.5 Product and solution naming rules (proposed)

1. **Levels:** Company (AID) → Sub-brand (descriptor) → Product family (coined or descriptive) → Product/model (alphanumeric) → Feature (descriptive only).
2. **Only the masterbrand has a logo.** Products and solutions are set in the brand typeface (a "typographic lockup"), optionally with a product icon in the shared icon style. This is what keeps the system scalable. [K, standard practice — Microsoft, Siemens, GE]
3. **Solutions are named for outcomes** and reference the product they are built on: "Lighthouse — [outcome descriptor], built on [product]".
4. **Coined names only where you will invest** in them and can trademark them; otherwise descriptive.
5. **Name clearance** (IP India + WIPO Madrid + key export markets; classes 9, 12, 13, 38, 42, 45 as relevant) before any name appears publicly.
6. **Codes:** a consistent model code scheme (e.g. AID-N200) separates the commercial name from the technical variant — useful for export variants with different capabilities.

### 3.6 Naming risk: NAVIC

- **NavIC** = "Navigation with Indian Constellation", the operational name of ISRO's IRNSS regional satellite navigation system, operational since 2018 and supported in Indian smartphones and chipsets. ([Wikipedia](https://en.wikipedia.org/wiki/Indian_Regional_Navigation_Satellite_System), [SBG Systems](https://www.sbg-systems.com/glossary/what-is-navic-navigation-with-indian-constellation/)) [S]
- **Risks:** (a) confusion — a defence *navigation* product named NAVIC will be read as "a NavIC receiver" or as ISRO-affiliated; (b) legal — emblem/name protections for government programmes and likely prior marks; descriptive/confusing-similarity refusals in class 9; (c) search — the product will never rank above ISRO; (d) credibility — evaluators may view it as borrowing government authority.
- I did **not** find a public record of the NAVIC trademark position in this session; IP India's public search (https://ipindia.gov.in) must be checked by counsel. [Gap]
- **Options:** (1) rename (preferred if the product is not yet widely known); (2) keep as a *descriptive capability* ("NavIC-enabled", if it actually uses NavIC signals — which is a positive selling point for indigenisation) and give the product a distinct name; (3) keep with a qualifier (e.g. "AID NAVIC-X") only after legal clearance — weakest option.

---

## 4. Best-in-class public brand guidelines to study

| Brand | URL | Why study it | Format |
|---|---|---|---|
| IBM Design Language | https://www.ibm.com/design/language/ | Brand + product design language unified; "8-bar" logo rules, photography, motion, data viz; feeds the Carbon design system | Own site |
| Atlassian | https://atlassian.design/foundations | Brand foundations (logos, colour, type, icons, illustration, tokens, content) in the same site as the product design system | Own site, tokens-first [S fetched] |
| Mailchimp (Intuit) | https://styleguide.mailchimp.com | The benchmark for voice & tone and editorial style | Own site |
| Uber | https://brand.uber.com → redirects to https://assets.uber.com | Clear modular "brand elements" structure | Own site [S redirect observed] |
| Shopify Polaris | https://polaris.shopify.com | Content guidelines + tokens + components | Own site |
| Spotify | https://developer.spotify.com/documentation/design | Partner-facing logo/attribution rules | Own site |
| Slack | https://slack.com/media-kit | Media kit / logo rules for partners | Own site |
| Google | https://about.google/brand-resource-center/ ; https://m3.material.io | Partner brand rules + Material 3 tokenised design | Own sites |
| Microsoft | https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks ; https://fluent2.microsoft.design | Trademark usage + Fluent design | Own sites |
| NASA Graphics Standards Manual (1975, "worm") | https://www.nasa.gov/nasa-brand-center/ ; reissue at https://standardsmanual.com | The canonical standards manual; government/space restraint | Book/PDF |
| GE | https://www.gebrandcentral.com (historic GE Brand Central) | Monogram system, sub-business colour logic | Portal [K – verify current] |
| Siemens | https://brandville.siemens.com (Siemens brand portal; access partly restricted) | Masterbrand rules, "Siemens + descriptor" | Portal [K – could not verify in this session] |
| Bosch | via Frontify (internal) | 3,600-page PDF → Frontify, multi-brand | Frontify [S] |
| Helsing | https://spin.co.uk/work/helsing (case study) | Defence AI identity avoiding deep-tech clichés; off-black/off-white palette, "H" as protective mark | Agency case [S] |
| Anduril | https://www.anduril.com | Product-as-hero, cinematic photography, near-monochrome, in-house design team | Website only [S job posts] |
| Shield AI | https://shield.ai ; rebrand by TinyWins ([Brand ID Weekly](https://brandid-weekly.beehiiv.com/p/brand-id-weekly-the-art-and-tech-of-war-5b1337095c287c7c)) | Explicit brand architecture to support new markets | Website [S] |
| Palantir | https://www.palantir.com | Black/white, typographic, ideological voice | Website |
| Samsara | https://www.samsara.com | IoT for physical operations; outcome-first copy for non-IT buyers — closest commercial analogue to AID IoT | Website |
| Particle | https://www.particle.io | Developer-facing IoT platform brand | Website |
| Arm | https://www.arm.com ; writing style guide at https://interactive.arm.com/story/arm-writing-style-guide/ | Product-family naming, one design system across markets, published voice | Own site [S] |

**What this tells us about publishing.**
- Tech companies with product UIs publish brand **and** design system on one public site, tokens-first (IBM, Atlassian, Shopify, Google). Industrial conglomerates use **gated DAM-backed portals** (Bosch/Frontify, Siemens). Defence companies publish almost nothing publicly — at most a press logo kit.
- Portal tools: Frontify, Brandpad, Standards (standards.site), Zeroheight (design-system docs linked to Figma), Corebook, Bynder (DAM-first). [K] Their shared lesson: guidelines and assets must live in the same place, and be living, not PDF. ([Bosch/Frontify](https://www.frontify.com/en/cases/frontify-for-bosch/), [Fabrik](https://fabrikbrands.com/branding-matters/brand-guidelines/online-brand-guidelines/))
- **For AID:** the source of truth should be a Git repo (Markdown rules + DTCG tokens + SVG assets + templates). Publish from it to (a) a public "press & partners" page (logos, boilerplate, colours), (b) an internal portal (full guidelines; could be a static site, or a Frontify/Zeroheight front-end later), (c) an `llms.txt`-style machine-readable bundle for AI tools. A SaaS portal can be added later without changing the source.

---

## 5. Rebrand-proofing: making a future change propagate

### 5.1 Principles
1. **Separate decisions from their values.** Name things by role, not appearance: `color.brand.accent`, not `orange`. Primitive tokens (raw values) → semantic tokens (roles) → component tokens. A rebrand edits primitives and a few semantic mappings; everything downstream updates. ([Back Market engineering](https://engineering.backmarket.com/discover-the-magic-working-behind-our-new-mobile-app-rebranding-c351a07d305a), [Clearleft multi-brand tokens](https://clearleft.com/posts/designing-with-tokens-for-a-flexible-multi-brand-design-system)) [S]
2. **Use the standard format.** The W3C Design Tokens Community Group published the first stable *Design Tokens Format Module 2025.10* on 28 Oct 2025 — JSON, with theming, aliases and modern colour spaces (OKLCH, Display P3). ([W3C announcement](https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/), [spec](https://www.w3.org/community/reports/design-tokens/CG-FINAL-format-20251028/)) Tools such as Style Dictionary and Tokens Studio transform these into CSS, iOS, Android, Figma variables. [S]
3. **Multi-brand = themes.** One token set with a `parent` theme and `iot` / `defense` themes that override only what differs (accent, ground, imagery tags). Adding a third sub-brand is a new theme file.
4. **Master templates, never copies.** Office/Google/Figma/Canva templates consume the tokens (theme colours, fonts) and are the only starting point; locked layers for logo/footer. Distribute through one library so updates replace old versions.
5. **DAM with metadata.** Every asset tagged with brand version, sub-brand, rights expiry, and (for Defense) export-control clearance status. Old-version assets get auto-flagged on rebrand.
6. **Logo by reference.** Websites and apps reference `/brand/logo/aid-iot-horizontal.svg` from the brand package, never an embedded copy.
7. **Rules as text.** Every rule (voice, logo misuse, imagery) written in Markdown with explicit do/don't examples — this is what LLMs read. Version it alongside the tokens.
8. **Changelog and semantic versioning** of the brand package so downstream teams know what changed.

### 5.2 Real lessons
- **GE (2022–24):** architecture designed before the split meant three new identities in under two years while keeping the shared monogram. ([GE](https://www.ge.com/news/reports/ge-unveils-new-brand-names-for-three-planned-future-public-companies)) [S]
- **Airbus (2014):** a group-wide rename staged over ~12 months, division by division. ([The Manufacturer](https://www.themanufacturer.com/articles/eads-rebrands-as-airbus-for-2014/)) [S]
- **Back Market:** even with Figma, they lacked a single source of truth until they introduced tokens; tokens hand-copied between Figma and code drifted. Automate the sync. [S]
- **Bosch:** a 3,600-page PDF could not be maintained; moving online made the multi-brand rollout possible. [S]
- **Gap (2010) / Tropicana (2009)** [K]: rebrands that discarded equity assets were reversed within days/weeks. Audit which AID assets have equity (the triangle?) before changing them.

### 5.3 Proposed AID "brand-as-code" repository shape
```
brand/
  README.md                 # how to use, versions, owners
  llms.txt                  # entry point for AI models
  strategy/  purpose.md positioning.md messaging-house.md voice.md naming.md
  identity/  logo.md colour.md typography.md imagery.md motion.md iconography.md data-viz.md
  tokens/    primitives.tokens.json  semantic.tokens.json  themes/{parent,iot,defense}.tokens.json
  assets/    logo/*.svg  icons/*.svg  patterns/*.svg  fonts/ (licensed)
  templates/ deck.potx  datasheet.indd|.figma  social/  email-signature.html
  applications/ website.md product-ui.md print.md events.md packaging.md
  governance/ approvals.md changelog.md defence-release-checklist.md ai-usage.md
```

---

## 6. Defence-sector brand specifics

### 6.1 Credibility signals that matter to defence buyers [K + S]
- **Programmes and users** (named only when cleared): services, DRDO labs, DPSUs, iDEX/ADITI wins.
- **Certifications:** AS9100, ISO 9001/27001, DGQA/CEMILAC, MIL-STD-810/461 test evidence.
- **Indigenisation:** % indigenous content, Positive Indigenisation Lists, Make in India, IP ownership — a central purchase criterion under India's DAP 2020 "Buy (Indian-IDDM)" categories. [K]
- **Lifecycle support:** MRO, spares, training, field support footprint.
- **Leadership credibility:** veterans and scientists on the team, advisory boards.
- **Security posture:** data sovereignty, on-premises options, secure supply chain.

### 6.2 Export-control and classification sensitivities in brand content
- Marketing content, photos, renders and videos **can disclose controlled technical data** even when text does not; range, payload, sensor and performance details need particular care. ([Everything-PR, ITAR-aware messaging](https://everything-pr.com/itar-aware-messaging)) [S]
- Images already on the internet are **not automatically public domain** under ITAR. ([Gibson Dunn on 2008 DDTC guidance](https://gibsondunn.com/?p=19144)) [S]
- India: SCOMET list (DGFT) governs export of dual-use and munitions items; MoD/services may restrict images of deployments, personnel, locations and installations. [K]
- **Implement a "defence release checklist"** in the governance layer: (1) export classification of the item; (2) does the image/text reveal performance, internals, interfaces, firmware, frequencies? (3) are units, faces, insignia, locations, vehicle numbers, terrain identifiable? (4) customer consent; (5) export-control officer sign-off; (6) DAM tag + expiry. Prefer studio renders and neutral backgrounds; blur or crop identifying detail; avoid EXIF location metadata.
- AI-generated imagery for Defense: forbid generating realistic depictions of real platforms, real units, or combat scenes; label any synthetic imagery internally.

### 6.3 Restraint
Defence buyers read hype as risk. Claims must be bounded and evidenced; avoid aggressive, violent or glamorised imagery; avoid stock "soldier silhouette at sunset". Restraint also protects the IoT business from reputational spillover. [K]

### 6.4 Legacy primes vs defence-tech challengers

| | Legacy primes (BAE, Thales, L3Harris, BEL, HAL) | New defence tech (Anduril, Helsing, Shield AI, Saronic, Skydio) | Indian challengers (ideaForge, Tonbo, Zen Technologies) |
|---|---|---|---|
| Palette | Corporate blue/red, flags | Near-monochrome off-black/off-white, single accent; Helsing explicitly off-black/off-white with selective spot colours ([Spin](https://spin.co.uk/work/helsing)) [S] | Mostly tech-blue/dark; less differentiated [K] |
| Type | Conservative sans | Tight grotesk/condensed, large headlines | Generic sans |
| Imagery | Platforms, ceremonies, handshakes | Cinematic product-as-hero, landscape scale, renders, minimal people | Product shots, deployment photos, trade-show imagery |
| Voice | Corporate, capability lists | Mission-led, plain, confident, sometimes ideological (Anduril, Palantir) | Capability + Make in India + customer names |
| Proof | Heritage, programmes | Speed of deployment, software-defined, funding | Market share (ideaForge ~50% of Indian UAS in FY22 per [Machine Maker](https://themachinemaker.com/news/indias-leading-drone-maker-ideaforge-files-for-ipo-poised-for-historic-listing-on-domestic-stock-exchanges/)), DRDO/IAF supply (Tonbo per [Inc42](https://inc42.com/buzz/defence-tech-startup-tonbo-imaging-bags-inr-175-cr)) [S] |
| Risk | Invisible / interchangeable | Converging into a new cliché — one commentator calls it "Defence Dun" ([Summary Judgement](https://summaryjudgement.substack.com/p/anduril-vs-helsing-marketing-head-to-head?open=false)) [S] | Under-designed; opportunity to lead |

**Implication:** AID Defense should borrow the challengers' restraint and product-as-hero imagery but avoid the monochrome "Defence Dun" sameness by using the AID mark's geometry (pill strokes, triangulation) and the blue accent as an ownable signature — and by leading with *navigation* as the visual idea (bearings, coordinates, light/beam for Lighthouse).

---

## 7. Implications for AID (recommendations)

1. **Adopt a branded-house architecture**: AID masterbrand; *AID IoT* and *AID Defense* as descriptor sub-brands sharing mark, type, grid and core neutrals; differentiated by colour emphasis, imagery, graphic device and voice sliders (§3.4). Write down the trigger for moving Defense to an endorsed model (legal separation, foreign JV, investor/ESG need).
2. **Products and solutions get typographic names, not logos.** Formalise the naming ladder in §3.5; Lighthouse = solution, "built on" its product.
3. **Resolve NAVIC before anything ships.** Commission a trademark search and legal opinion; strongly consider renaming the product; if it genuinely uses NavIC signals, turn that into a *feature claim* ("NavIC + GPS dual-constellation") instead of a product name.
4. **Decide "Defense" vs "Defence"** — given British English house style and Indian market usage, "AID Defence" is the more consistent choice; check existing registrations/domains first.
5. **Run discovery before design**: use the §2 questionnaire, 8–12 stakeholder interviews, 10 customer interviews, competitor audit, and a half-day positioning workshop. Output: a 2-page strategy brief that the CEO approves before identity work.
6. **Stress-test the four-colour mark.** Define a monochrome and single-colour version and rules for small sizes, dark grounds, product engraving and Defense contexts. Decide whether the full-colour mark is the only place all four hues meet (so UI/print palettes stay calm).
7. **Build the brand as code from day one**: Git repo with Markdown rules + DTCG 2025.10 tokens (primitives → semantic → `parent`/`iot`/`defense` themes) + SVG assets + master templates (§5.3). This repo is the "digital library" for AI tools; add `llms.txt` and per-domain rule files with do/don't examples.
8. **Ship an MVBS first** (★ items in §1): positioning, messaging house, voice, naming, logo system, colour, type, imagery, grid, deck + datasheet + social templates, governance and AI rules. Add illustration, motion, sonic, signage, packaging in v1.1+.
9. **Bake defence compliance into governance**: release checklist, export-control sign-off, DAM clearance tags, AI-generation restrictions (§6.2).
10. **Publish in tiers**: public press/partner kit; internal portal generated from the repo; machine-readable bundle. Consider Frontify/Zeroheight only when non-technical teams need self-serve editing.
11. **Measure**: quarterly consistency audit; track tender win-rate, inbound quality and recognition at trade shows as brand KPIs.

---

## 8. Open questions for the AID team

1. Is AID Defense (or will it become) a separate legal entity? Any planned external investors, JV partners or foreign OEM collaborations?
2. Who owns the brand day to day, and who arbitrates IoT vs Defense conflicts?
3. What is the meaning/history of the triangle and its four colours, and which elements is leadership unwilling to change?
4. Is the NAVIC product name already used in tenders, contracts, trials or publicity? Does the product use ISRO NavIC signals?
5. What exactly is Lighthouse — a product bundle, a service, a deployed system? Who are its buyers?
6. Are "AID", "AID IoT", "AID Defense/Defence", "Signal", "Lighthouse" registered or applied for, in which classes and countries? Which domains/handles do we hold?
7. "Defense" or "Defence"?
8. Which customers, programmes and deployments can be named publicly for each sub-brand?
9. What is the export-control classification of each defence product, and who is the designated export-control officer?
10. Which certifications do we hold today and which are in progress?
11. What tools do sales/marketing use to produce material (PowerPoint, Google Slides, Canva, Figma)? Which template formats must we ship?
12. Do we need Hindi (Devanagari) or other Indian-language support in the type system now?
13. What is the budget/timeline for licensed fonts, photography (incl. product shoots) and a portal tool?
14. What are the limits on AI-generated content, especially for Defense?
15. Which upcoming moments (DefExpo, Aero India, a tender, a funding round) should the first brand release be timed for?

---

### Next steps (and why each is next)
1. **Legal check on NAVIC, AID and "Defense/Defence"** — cheapest step with the biggest downside if skipped; names are hard-coded into every later asset.
2. **Run the discovery questionnaire + stakeholder interviews (§2)** — the strategy layer must exist before identity choices can be justified to the CEO.
3. **Set up the brand-as-code repo skeleton (§5.3)** with current logo SVGs and draft tokens — so every subsequent decision lands in the single source of truth immediately, and the website build can consume it.
