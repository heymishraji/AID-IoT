# 02 · Open-source design systems: survey, scoring and what "end-to-end" means

**For:** AID (two brands: **AID IoT** and **AID Defense**: NAVIC products, the Lighthouse solution)
**Question:** Which free/open-source design system(s) should AID adopt and adapt as the base for one multi-brand, rebrand-proof system covering marketing sites, product web apps (IoT dashboards, device management, mission consoles), mobile, embedded/HMI and print?
**Date of research:** 27 Oct 2026. Facts were checked against live sources where possible. Where a claim comes from memory and was not re-verified this session, it is marked *(unverified)*.

---

## 0. Summary

1. **No single open-source system covers all of AID's needs.** The marketing-led systems (shadcn/ui, Radix, Untitled UI) have no mission-console or industrial patterns. The industrial and defence systems (Siemens iX, Astro UXDS) have no marketing layer and impose a strong visual identity of their own. The enterprise systems (Carbon, Fluent, Material) are the most complete, but they are tied to their owner's brand and are harder to re-skin into two distinct brands.
2. **Recommendation: a composition, with AID owning the token layer and the component code.**
   - **Tokens:** AID's own DTCG 2025.10 token set (brand × mode × density), built to CSS, Tailwind v4, Figma variables and native targets.
   - **Primitives:** Base UI (MIT, v1 stable). React Aria is the alternative where accessibility depth matters more than ecosystem.
   - **Distribution:** the shadcn/ui *pattern*. AID publishes its own component registry, so code is owned (not a dependency), installable by agents over MCP, and re-skinnable per brand.
   - **Borrowed patterns:** Astro UXDS for mission consoles (status system, classification banners, clock, timeline, monitoring icons, alert management); Carbon for data visualisation and the productive/expressive split; Siemens iX for industrial and IoT device patterns plus AG Grid and ECharts theming; Material 3 for colour science and token naming; GOV.UK/USWDS for content design and accessibility method.
3. **Licence traps to avoid:** Atlassian (design assets limited to Atlassian add-ons), Shopify Polaris (limited to Shopify-integrated apps), Nord (limited to Nordhealth work), Elastic EUI (SSPL/ELv2, not OSI open source), Tailwind Plus/Catalyst (paid), GOV.UK/MOD brand assets (reserved for government).
4. **Maintenance traps:** Astro UXDS's US Space Force contract ended in October 2025 and the code is "not currently being actively maintained", so borrow its patterns and do not depend on its package. Google's `@material/web` is in maintenance mode. The MOD.UK Frontend is in maintenance mode.

---

## 1. Candidate survey

Legend: **WC** = Web Components. **DTCG** = W3C Design Tokens Community Group format. **≈** = approximate count from documentation navigation, not an audited number.

### 1.1 Enterprise "big-company" systems

| System | Licence (commercial use?) | Stack | Tokens & theming | Dark / density | Components | Data-heavy | A11y | Figma (free?) | Health (2026) | LLM-friendliness |
|---|---|---|---|---|---|---|---|---|---|---|
| **IBM Carbon** v11 (v12 announced) | Apache-2.0 code; IBM Plex is OFL. ✅ | React, WC (`@carbon/web-components`) | Sass + CSS custom properties; 4 themes (White, G10, G90, G100); "zoning" mixes themes within a page | ✅ dark; 3 size scales (sm/md/lg) for tables and inputs | ≈55 core, plus IBM Products (≈40 more) | **Best in class**: DataTable, Carbon Charts (≈25 chart types, Apache-2.0), data-viz guidelines, status indicators | WCAG 2.1 AA, IBM Equal Access checker | ✅ free official kits (Figma, Sketch) | Very active; v12 "reimagined visual expression" in progress | **Carbon MCP** in public preview (IBMers direct; others request access); AI-ready components and "Carbon for AI" guidance |
| **Google Material 3 / M3 Expressive** | Apache-2.0 ✅ | Native: Compose, Flutter. Web: `@material/web` (Lit WC) | `sys/ref/comp` token tiers; dynamic colour (HCT); Theme Builder exports | ✅ dark; density only on some components | Web ≈25 | Weak on web; no data table in `@material/web` | Good | ✅ free official M3 kit, updated for Expressive (motion physics tokens, 35 shapes) | **Web is in maintenance mode** ("no work planned for new features"). Expressive on web exists only in a community fork | Moderate: good docs, no official MCP found |
| **Microsoft Fluent 2** | MIT ✅ | React v9 (`@fluentui/react-components`), WC (`@fluentui/web-components`), iOS, Android | Tokens (alias/global); "brand ramp" of 16 shades generates a theme | ✅ light, dark and high contrast; compact/medium | ≈60 (React v9) | DataGrid, Table; charting separate (`@fluentui/react-charting`) | Strong (Microsoft a11y programme) | ✅ free official Fluent 2 Web/iOS/Android kits | Active; React v9 is the stable target | Community MCP servers only (none verified as official) |
| **Atlassian Design System** | ⚠️ npm code mostly Apache-2.0, but the **ADS licence limits design assets/guidelines to building Atlassian add-ons** ❌ | React | Excellent token system (`color.background.accent…`) | ✅ | ≈60 | Dynamic table, lozenges | Strong | Free kit, same licence restriction | Active | Rovo MCP covers Jira/Confluence, not ADS |
| **GitHub Primer** | MIT ✅ (Octicons MIT) | React (`@primer/react`), Rails ViewComponents, CSS | `@primer/primitives` JSON tokens built with Style Dictionary; DESIGN_TOKENS_SPEC | ✅ 9 themes incl. dark dimmed and colour-blind variants | ≈60 | DataTable, Timeline, StateLabel, TreeView | Very strong (GitHub a11y team) | ✅ free Primer Web kit | Active (primitives 11.10, Apr 2026) | **Official `@primer/mcp`** (token lookup by intent, CSS lint, component/pattern/icon tools) |
| **Shopify Polaris** | ❌ MIT-style but **"may only be exercised to develop and distribute applications that integrate or interoperate with Shopify"** | Now `s-*` WC loaded from Shopify CDN (API 2025-10); Polaris React locked to React 18 | Tokens | Partial | ≈50 WC (gaps reported vs React) | IndexTable (React), weaker `s-table` | Good | Free kit | React effectively legacy | Shopify dev MCP (Shopify-specific) |
| **Adobe Spectrum 2 / React Spectrum S2 / React Aria** | Apache-2.0 ✅ | React; **React Aria** = unstyled hooks and components; S2 = styled | Spectrum tokens (JSON); S2 uses a build-time style macro | ✅ light/dark; medium/large scale (touch) | Aria ≈50; S2 ≈60 (v1.2, Mar 2026) | TableView, ListView, Tree; separate React Spectrum Charts (with MCP) | **Best in class**: internationalisation (30+ locales, RTL, calendars, number systems), screen-reader tested | ✅ free Spectrum 2 community kit *(unverified current version)* | Active | **Excellent:** `@react-spectrum/mcp` (S2 and React Aria), `llms.txt`, Markdown docs, installable agent skills |
| **Salesforce Lightning (SLDS 2 / Cosmos)** | Code BSD-3; icons/assets CC BY-ND *(unverified)*. In practice tied to the Salesforce platform ⚠️ | CSS blueprints + LWC | **Styling hooks** (CSS custom properties) replace old tokens | ✅ dark mode in SLDS 2 | ≈80 blueprints | Data table, charts on the platform | Good | Free kit | Active (Spring '25 onward) | SLDS Linter/Validator; agent tooling Salesforce-centric |
| **SAP Fiori / UI5 Web Components** | Apache-2.0 (UI5 WC) ✅; Fiori guidelines are documentation | WC (`@ui5/webcomponents`), React wrapper, OpenUI5 | Theming parameters; Horizon, Quartz and high-contrast themes | ✅ dark and HCB/HCW; **cozy/compact density** | ≈100+ | Strong: tables, analytical cards, object pages, timelines, process flow | Strong (enterprise) | ✅ free Fiori kits | Active | Moderate *(no official MCP verified)* |

### 1.2 Industrial, IoT and defence systems (most relevant to AID's products)

| System | Licence | Stack | Tokens & theming | Dark / density | Components | Data-heavy | Figma | Health | LLM |
|---|---|---|---|---|---|---|---|---|---|
| **Siemens iX** (Industrial Experience) | **MIT** ✅ (`@siemens/ix` 5.3.0) | Stencil WC + React, Angular, Vue wrappers; `ix-aggrid` and `ix-echarts` theme packages | CSS custom-property themes (Classic light/dark; Siemens Brand theme is restricted to Siemens) | ✅ dark-first industrial look | ≈80 | AG Grid theme, ECharts theme, KPI, event list, application frame/menu, workflow steps, device/tree patterns, 500+ icons | Free community Figma library *(unverified scope)* | Very active | **iX MCP server** (local RAG over docs and API; test version; needs a my.siemens.com token); repo ships `AGENTS.md` and skills |
| **Astro UXDS** (Rocket Communications for US Space Force / SSC) | **MIT** ✅ (`@astrouxds/astro-web-components` 8.0.0) | Stencil WC + React and Angular wrappers | Design tokens (Style Dictionary); dark (default) and light themes | ✅ **dark-first**, compact | ≈50 | **Unique:** six-level **status system** (off, standby, normal, caution, serious, critical), **classification banners and markings**, global status bar, clock, monitoring icon, notification banner, timeline, log, alert management patterns, ground-station reference apps | Free Figma and Sketch kits *(historically; check after wind-down)* | ⚠️ Contract **ended Oct 2025**; README: "Documentation and code is not currently being actively maintained and may be outdated." A "modernised replacement" is mentioned, with support via Rocket | Low (no MCP); docs are clear and pattern-rich |
| **Bosch Frontend Kit** | ⚠️ Licence not verified; designed for the Bosch brand | HTML/CSS/JS, Angular | Bosch tokens | — | — | — | Bosch-internal | — | — |
| **UK MOD.UK Design System** | MIT code (GOV.UK-derived); brand reserved for MOD | Nunjucks/HTML (GOV.UK Frontend) | GOV.UK-style | ❌ no dark | ≈35 | Minimal | Free Figma Design Library | ⚠️ **Maintenance mode** during "Design System Toolkit" discovery | Low |
| **Grafana Saga** (`@grafana/ui`) | **Apache-2.0** ✅ (the Grafana app itself is AGPL) | React + Emotion | Theme v2 object (light/dark) | ✅ dark-first, dense | ≈100 | Panels, time-range picker, query editors, viz legends | Limited public kit | Very active | Low |
| **Elastic EUI** | ❌ **SSPL v1 / Elastic License 2.0 dual** (not OSI open source) | React + Emotion | Theme tokens (Borealis) | ✅ dark; compressed density | ≈100+ | DataGrid, charts (also ELv2/SSPL) | Free kit | Active (v123) | Moderate |
| **PatternFly** (Red Hat) | **MIT** ✅ | React + CSS; v6 | CSS-variable tokens; dark theme in v6 | ✅ dark; compact | ≈100 | Tables, **topology views**, charts (Victory-based), dashboards, log viewer, wizards | ✅ free Figma kit | Active | Moderate (AI patterns/chatbot extension) |
| **Backstage UI** (`@backstage/ui`) | Apache-2.0 ✅ | React (BUI is replacing MUI) | CSS variables | ✅ | Early (v0.19) | Developer-portal tables | — | Young | — |

### 1.3 Public-sector systems (best for content design and accessibility method)

| System | Licence | Notes for AID |
|---|---|---|
| **USWDS** (US Web Design System) | Public domain (CC0) for code; US government brand marks excluded ✅ | Excellent accessibility method, utility tokens, plain-language content guidance. No dark mode, no data-heavy UI. Borrow method, not looks. |
| **GOV.UK Design System** | MIT code; content under OGL; **GOV.UK brand, crown and font (GDS Transport) are reserved** | The gold standard for **patterns** (forms, error messages, "question pages", confirmation pages) and **content design** discipline. AID should copy its pattern documentation template. |

### 1.4 Headless primitives and "own-the-code" kits (best for multi-brand)

| System | Licence | Stack | Theming | Components | Data | Figma | Health | LLM |
|---|---|---|---|---|---|---|---|---|
| **Radix Primitives / Radix Themes** | MIT ✅ | React | Themes: accent/gray/radius/scaling props, Radix Colors (12-step scales, P3) | Primitives ≈30; Themes ≈40 | — | Free Themes kit | Maintained by WorkOS; concern about staffing after original maintainers left | Fine; shadcn still supports it |
| **Base UI** (MUI) | MIT ✅ | React, unstyled | Bring your own | ≈35 at v1 (rename to `@base-ui/react`), growing | Combobox, Menubar, Toolbar etc. | — | **v1 stable late 2025**; v1.x through 2026. MUI's long-term unstyled foundation | Good docs; **shadcn default since Jul 2026** |
| **shadcn/ui** | MIT ✅ | React + Tailwind v4; Radix *or* Base UI underneath | CSS variables (`--background`, `--primary`…); presets/styles (`shadcn create`, Luma, Sera, Rhea); OKLCH | ≈60 + Blocks + Charts (Recharts) + Data Table (TanStack) | Charts, data table recipes, AI Elements | Several free community kits; official kit status *(unverified)* | Extremely active | **Best in class:** official MCP server (Apr/Aug 2025), CLI v4 (Mar 2026), registry protocol (any GitHub repo, private repos Aug 2026), `llms.txt`, v0 integration |
| **Ark UI / Park UI** (Chakra team) | MIT ✅ | Ark: headless on Zag.js state machines, **React, Vue, Solid, Svelte**; Park: styled with Panda CSS | Panda tokens and semantic tokens, recipes | Ark ≈45 | Date picker, tree view, etc. | Park Figma kit (free tier) | Active | Moderate |
| **Chakra UI v3** | MIT ✅ | React; built on Ark + Panda-style tokens | Strong token/recipe system, multi-theme | ≈80 | Table, charts (Recharts wrapper) | Figma kit (paid Pro) | Active | MCP server and llms.txt *(unverified)* |
| **Mantine** v8 | MIT ✅ | React | Theme object + CSS variables; per-component Styles API | ≈120 + 70 hooks | Strong: dates, charts (Recharts), spotlight, notifications; DataTable via community | Community kit only | Very active | `llms.txt` *(unverified)* |
| **Ant Design** v5/v6 | MIT ✅ | React (CSS-in-JS) | **Algorithmic token theming** (seed → map → alias), compact and dark algorithms | ≈70 + Pro components and AntV charts | Excellent tables, forms, trees, transfer | ✅ free kit | Very active | `llms.txt` and MCP *(unverified)* |
| **Untitled UI** | Figma: free tier + paid PRO; **React: MIT for the open-source set**, PRO separate | React Aria + Tailwind v4 | Tailwind CSS variables | Hundreds (free) | Dashboard examples (mostly PRO) | Free tier + paid | Active | Good (Tailwind/React Aria conventions) |
| **Tailwind Plus / Catalyst** | ❌ **Paid** licence | React + Tailwind (Headless UI) | Tailwind | — | — | — | — | — |
| **Open Props** | MIT ✅ | CSS custom properties only | Token library (sizes, easings, gradients) | 0 | — | — | Steady | — |
| **Nord** (Nordhealth) | ❌ "solely for the purpose of performing your duties for and on behalf of Nordhealth" | Lit WC | Excellent tokens | ≈50 | — | — | Active | **Has `llms.txt`, `llms-full.txt` and a published SKILL.md**, a good model for AID's own docs |
| **Twilio Paste** | MIT ✅ | React | Tokens with themes | ≈80 | Data grid, charts guidance | Free kit | Active | Moderate |
| **Workday Canvas** | Apache-2.0 ✅ | React + Canvas Kit CSS | Tokens (v3 in DTCG style) | ≈60 | Table | Free kit | Active | Moderate |

**Token standard context:** the DTCG format reached its **first stable version, 2025.10 (28 Oct 2025)**. It adds theming and multi-brand support, Display P3/OKLCH colour and aliases. Style Dictionary, Tokens Studio and Terrazzo implement it, and Figma variables import/export use it. **AID should author tokens in DTCG 2025.10 regardless of which component base it picks.**

---

## 2. Scoring matrix

**Criteria and weights** (set by AID's product mix; defence and IoT consoles carry the most revenue risk):

| | Criterion | Weight |
|---|---|---|
| a | Marketing site fit (expressive, art-directable, light-weight) | 10% |
| b | IoT dashboards and device management (tables, charts, tree/asset hierarchies, forms, status) | 20% |
| c | Defence mission consoles (dark-first, high density, alert/status/classification, time-centric) | 20% |
| d | Multi-brand theming and rebrand-proofing | 15% |
| e | LLM/agent friendliness (MCP, llms.txt, registry, code ownership) | 15% |
| f | Licence safety (permissive, no field-of-use restriction, no CDN lock-in) | 10% |
| g | Figma availability (free, maintained kit) | 10% |

Scores run 1–5 (5 = excellent). They are analyst judgement grounded in the evidence in §1.

| Rank | System | a | b | c | d | e | f | g | **Weighted /5** |
|---|---|---|---|---|---|---|---|---|---|
| 1 | **shadcn/ui pattern on Base UI (or Radix)** | 5 | 3 | 2 | 5 | 5 | 5 | 4 | **3.90** |
| 2 | **Siemens iX** | 1 | 5 | 4 | 3 | 4 | 5 | 4 | **3.85** |
| 3= | **IBM Carbon** | 3 | 4 | 3 | 3 | 4 | 5 | 5 | **3.75** |
| 3= | **Ant Design** | 2 | 5 | 3 | 4 | 3 | 5 | 4 | **3.75** |
| 5 | **Mantine** | 4 | 4 | 3 | 4 | 4 | 5 | 2 | **3.70** |
| 6 | PatternFly | 2 | 4 | 3 | 3 | 3 | 5 | 4 | 3.40 |
| 6 | Chakra v3 | 4 | 3 | 2 | 4 | 4 | 5 | 3 | 3.40 |
| 8 | React Spectrum S2 / React Aria | 2 | 3 | 2 | 3 | 5 | 5 | 4 | 3.30 |
| 8 | SAP UI5 Web Components / Fiori | 1 | 4 | 3 | 3 | 3 | 5 | 4 | 3.30 |
| 8 | Primer | 2 | 3 | 2 | 3 | 5 | 5 | 4 | 3.30 |
| 8 | Ark UI / Park UI | 4 | 3 | 2 | 5 | 3 | 5 | 2 | 3.30 |
| 8 | Untitled UI (free set) | 5 | 3 | 1 | 4 | 4 | 4 | 4 | 3.30 |
| 13 | Fluent 2 | 2 | 3 | 2 | 4 | 3 | 5 | 5 | 3.25 |
| 14 | **Astro UXDS** | 1 | 3 | **5** | 2 | 2 | 5 | 4 | 3.20 |
| 14 | Radix Themes | 4 | 3 | 2 | 3 | 3 | 5 | 4 | 3.20 |
| 16 | Twilio Paste | 2 | 3 | 2 | 3 | 3 | 5 | 4 | 3.05 |
| 17 | Material 3 (web) | 4 | 2 | 1 | 4 | 2 | 5 | 5 | 2.90 |
| 17 | Elastic EUI | 1 | 4 | 3 | 3 | 3 | 2 | 3 | 2.90 |
| 19 | Grafana Saga | 1 | 4 | 3 | 2 | 2 | 5 | 2 | 2.80 |
| 20 | Workday Canvas | 2 | 3 | 2 | 3 | 2 | 5 | 3 | 2.75 |
| 21 | USWDS | 3 | 1 | 1 | 2 | 2 | 5 | 3 | 2.10 |
| 22 | GOV.UK / MOD.UK | 3 | 1 | 1 | 1 | 2 | 4 | 3 | 1.85 |
| — | Atlassian, Polaris, Nord, Tailwind Plus, Bosch | — | — | — | — | — | **1 or fail** | — | **Excluded on licence** |

**How to read it**
- The top three are close, and each wins on a different axis: shadcn/Base UI on brand control and agents, Siemens iX on industrial depth, Carbon on data visualisation and documentation maturity. That points to a **composition**, not a single winner.
- **Astro UXDS** scores lowest on maintenance and multi-brand, but it is the **only** system rated 5 on mission consoles. Its value is as a *pattern source*, not as a dependency.
- **Ant Design** scores well on raw capability. The cost is a very recognisable visual style, runtime CSS-in-JS and weaker marketing fit. It is a good fallback if AID needs maximum IoT-admin breadth fast.

---

## 3. What an "end-to-end design system" means: full taxonomy checklist

An end-to-end design system is **the single source of truth for how every AID experience looks, behaves, reads and is built, from brand promise down to a pixel on an embedded display, plus the operating model that keeps it true.** Components are about a fifth of it.

### 3.1 Strategy and principles
- [ ] Purpose, scope and audience of the system (who it serves: marketing, product, partners, agents)
- [ ] Design principles (for example "outcome first", "calm under load", "trust is visible"), each with do/don't examples
- [ ] Brand architecture: master brand **AID** → sub-brands **AID IoT** and **AID Defense** → product marks (NAVIC, Lighthouse, Signal)
- [ ] Experience tiers: **expressive** (marketing, events), **productive** (apps), **operational** (consoles, HMI). Carbon's expressive/productive split is the model.

### 3.2 Foundations
- [ ] **Colour:** palettes (OKLCH), semantic roles, data-viz palettes (categorical, sequential, diverging), **status colours** (separate from brand), contrast rules, dark/light/high-contrast/night-vision (red or dim) modes
- [ ] **Typography:** families (Latin plus **Devanagari** and other Indic scripts), scales per tier, tabular/monospace numerals for telemetry, line-height rules for Indic conjuncts and matras
- [ ] **Space and sizing:** base unit, spacing scale, **density modes** (comfortable, compact, ultra-compact for consoles), touch-target minimums (44px; larger for gloved/HMI use)
- [ ] **Layout and grid:** breakpoints, columns, app shells, multi-monitor/video-wall layouts
- [ ] **Elevation, depth and layering:** z-index scale, overlays and scrims
- [ ] **Shape:** radii, borders, stroke weights
- [ ] **Motion:** duration and easing tokens, choreography, **reduced-motion** equivalents, "motion explains a mechanism" rule
- [ ] **Iconography:** system icons, product/device icons, status glyphs (shape *and* colour), MIL-STD-2525/APP-6 symbology policy for maps (Defense)
- [ ] **Illustration, imagery and photography:** art direction, generated-image policy (prompts recorded), device renders
- [ ] **Sound and haptics:** alert tones by severity (consoles), HMI haptics, earcons, mute and escalation rules
- [ ] **Brand expression:** logo use, lockups, co-branding, partner marks, the "signal" motif

### 3.3 Design tokens
- [ ] Format: **DTCG 2025.10** JSON in source control
- [ ] Tiers: reference/primitive → semantic/system → component (Material `ref/sys/comp`)
- [ ] Theme axes: **brand** (IoT, Defense, white-label customer) × **mode** (light, dark, HC, night) × **density** × **platform**
- [ ] Pipeline: Style Dictionary or Terrazzo → CSS variables, Tailwind v4 `@theme`, Figma variables, Swift/Kotlin/Flutter, **C headers for LVGL/embedded** and Qt/QML
- [ ] Versioning, deprecation aliases, visual-regression of token changes

### 3.4 Components
- [ ] Primitives (button, input, select, combobox, checkbox, radio, switch, slider, tabs, menu, dialog, popover, tooltip, toast)
- [ ] Data display (table/data grid with virtualisation, sorting, column pinning, bulk actions; list, tree, description list, badge/tag, KPI tile, sparkline)
- [ ] Status and alerting (status symbol, status bar, alert/notification centre, acknowledgement, **classification banner/marking**)
- [ ] Time (clock with UTC/local, time-range picker, timeline/Gantt, playback scrubber)
- [ ] Spatial (map container, layer control, track/asset markers, geofence editor)
- [ ] Device-specific (device card, connectivity/battery/signal indicators, firmware/OTA progress, provisioning stepper, log viewer, terminal)
- [ ] Marketing (hero, feature, proof/logo strip, spec sheet, comparison, case-study, CTA bands, forms)
- [ ] Each component has anatomy, variants, states (default/hover/focus/active/disabled/loading/error/read-only), a11y notes, content guidance, code and Figma parity (Code Connect)

### 3.5 Patterns
- [ ] Forms and validation (inline, summary, GOV.UK error pattern)
- [ ] Navigation (global, local, breadcrumbs, command palette, multi-tenant/org switcher)
- [ ] **Empty, loading, error, offline and degraded-connectivity states** (critical for IoT and the field)
- [ ] Onboarding, first-run, device provisioning and pairing
- [ ] Notifications and alarms: severity model, escalation, acknowledgement, shelving, audit trail (ISA-18.2 alarm-management concepts for industrial use)
- [ ] Search, filtering, faceting, saved views
- [ ] Tables at scale (bulk actions, export, column chooser)
- [ ] Dashboards (layout, widget library, drill-down, time sync across widgets)
- [ ] Fleet and device management (inventory, grouping, OTA rollout, health)
- [ ] **Mission/situational awareness** (common operating picture, master-detail, track correlation, timeline + map + log coordination)
- [ ] Authentication, roles/permissions, **classification-aware UI** (marking propagation, need-to-know masking)
- [ ] Destructive and high-consequence actions (two-person confirmation, undo windows)
- [ ] AI/agent patterns (assistant panel, provenance, confidence, human-in-the-loop)

### 3.6 Templates and page layouts
- [ ] Marketing: home, product, solution, industry, case study, careers, contact, legal
- [ ] App: list/detail, dashboard, settings, device detail, alarm console, map console
- [ ] Collateral: datasheet, brochure, slide master, trade-show panels, email, social

### 3.7 Content design
- [ ] Voice and tone per brand and tier (British English; outcome first for executives; precise and terse for operators)
- [ ] Terminology/glossary (device vs node vs asset; alert vs alarm vs event)
- [ ] Microcopy patterns (errors, empty states, confirmations), number/date/unit formatting, abbreviation policy (military brevity where appropriate)

### 3.8 Data visualisation
- [ ] Chart selection guidance, palettes (CVD-safe), axes/labels/legends, real-time/streaming behaviour, thresholds and bands, annotation, accessibility (tables as alternatives, sonification optional)
- [ ] Library choice and theming (ECharts/Apache-2.0, Visx, Recharts; MapLibre GL for maps)

### 3.9 Accessibility
- [ ] WCAG 2.2 AA minimum; AAA contrast for console critical text; keyboard-first operation; screen-reader support; colour-independent status; focus management; reduced motion; accessibility statement and testing protocol

### 3.10 Internationalisation and localisation
- [ ] Unicode/ICU message formatting, plural rules, **Indic scripts (Devanagari for Hindi, also Tamil, Telugu, Bengali etc.)**: font fallback (Noto Sans Devanagari or a licensed brand-matched Indic face), shaping (HarfBuzz on embedded), taller line-height, no letter-spacing on Devanagari, text expansion budgets
- [ ] Indian number grouping (lakh/crore), date/time zones (IST and UTC), RTL readiness (for export markets)

### 3.11 Platforms
- [ ] Web (responsive), native mobile (iOS/Android or Flutter), desktop/console (Electron/Tauri, multi-monitor)
- [ ] **HMI/embedded** (fixed resolutions, low-DPI, sunlight/night modes, gloves, limited fonts and GPU; LVGL/Qt token export)
- [ ] Kiosk/wall displays, print (CMYK/Pantone token equivalents), video/motion templates

### 3.12 Tooling, documentation and AI
- [ ] Figma libraries (variables bound to tokens, Code Connect), Storybook, a docs site with live examples
- [ ] **LLM layer:** `llms.txt` + `llms-full.txt`, Markdown versions of every page, an MCP server/registry, agent skills (Nord, Primer and React Spectrum are good models)
- [ ] Lint rules (token-only CSS, a11y), visual-regression tests, bundle budgets

### 3.13 Operating model
- [ ] Ownership (core team, RACI), **contribution model** (proposal → review → incubation → stable)
- [ ] Governance (design council, decision log, deprecation policy, brand guardianship per sub-brand)
- [ ] Versioning (semver for code and tokens; changelog; migration guides; codemods)
- [ ] Support (office hours, channels, issue templates)
- [ ] **Metrics:** adoption (% of screens on the system, detached Figma instances), component coverage, a11y defects, time-to-ship, token drift, NPS of consumers

---

## 4. Recommendation

### 4.1 Primary base: "own the system, borrow the patterns"

```
┌──────────────────────────────────────────────────────────────┐
│ AID Tokens (DTCG 2025.10)  brand × mode × density × platform │  ← AID owns
├──────────────────────────────────────────────────────────────┤
│ AID Registry (shadcn-format) — components, blocks, patterns  │  ← AID owns, MCP-installable
│   built on Base UI primitives (React Aria where needed)      │  ← MIT/Apache deps
├───────────────┬───────────────────┬──────────────────────────┤
│ Marketing     │ IoT apps          │ Defense consoles         │
│ (Next.js,     │ TanStack Table /  │ Astro-derived status,    │
│  motion)      │ AG Grid Community,│ classification, clock,   │
│               │ ECharts, MapLibre │ timeline; MapLibre;      │
│               │                   │ dark-first, compact      │
└───────────────┴───────────────────┴──────────────────────────┘
```

**Why this shape**
1. **Rebrand-proof by construction.** Every visual decision is a token. A rebrand changes token values, and a new sub-brand adds a token set. Nothing in component code names a colour. No external system's brand identity is baked in, which is the problem with adopting Carbon, Fluent, iX or Astro wholesale.
2. **Code ownership.** In the shadcn model, components are copied into AID's registry, not imported from someone else's package. AID can harden them for Defense (air-gapped builds, no CDN, SBOM, security review) without forking a big upstream. Avoid Polaris-style CDN delivery.
3. **Agent-native.** shadcn's MCP server and registry protocol already let Claude, Cursor and v0 browse and install from a private GitHub registry (supported since Aug 2026). AID gets "agents build with our system" almost for free, matching the LLM-friendliness requirement.
4. **Base UI over Radix for new work.** Base UI is v1 stable, backed by MUI's funded team and now shadcn's default. Radix maintenance is credible under WorkOS but thinner. Keep Radix compatibility where blocks still need it. Use **React Aria** for the hardest a11y/i18n components (date/time pickers, calendars in Indian locales, tables with keyboard grid navigation), because its internationalisation is the deepest available.
5. **Licences are all permissive** (MIT/Apache/BSD), with no field-of-use clauses. That is safe for defence export and for white-labelling to customers.

**Trade-offs (honest)**
- AID builds and maintains more itself: data grid integration, console patterns, the docs site. Budget a 2–3 person core team.
- shadcn's default aesthetic is everywhere. AID must design its own (CLAUDE.md already forbids category defaults). Tokens make this cheap, but the art direction must actually be done.
- React-centric. If AID Defense customers need Angular or framework-agnostic delivery (common in defence primes), add a **Web Components output** for the console subset (Lit or Stencil), or adopt Siemens iX for that product line under AID tokens.

### 4.2 Alternative bases (if the constraint changes)
- **Need console breadth now, little design capacity:** **Siemens iX** (MIT, WC + React/Angular/Vue, dark industrial, AG Grid/ECharts themes, MCP) re-themed with AID tokens. Keep the shadcn stack for marketing. Risk: iX's identity shows through, and the iX MCP needs a Siemens account token.
- **Need maximum maturity and documentation:** **Carbon** (Apache-2.0, superb data viz, free Figma, MCP in preview). Risk: it looks like IBM; v12 is mid-redesign.
- **Need breadth of admin widgets fast:** **Ant Design** (MIT, algorithmic theming). Risk: recognisable look, CSS-in-JS runtime, weaker marketing fit.

### 4.3 What to borrow from each, conceptually

| From | Borrow | For |
|---|---|---|
| **Astro UXDS** | Six-level status taxonomy (off/standby/normal/caution/serious/critical) with **shape + colour** symbols; classification banners/tags and marking propagation; global status bar; dual UTC/local clock; monitoring icons; timeline; log; notification banner; alert acknowledgement flow; dark-first palette discipline; the **reference ground-station apps** as pattern exemplars | Lighthouse and NAVIC consoles |
| **Carbon** | Data-viz guidelines and palettes; expressive vs productive type sets; 2x grid; theme **zoning** (dark console area inside a light app); size scales for tables; "Carbon for AI" provenance/explainability patterns | Charts everywhere; IoT dashboards |
| **Siemens iX** | Industrial application frame; event list; KPI tiles; device/asset tree; workflow steps; AG Grid and ECharts theme packages as the template for AID's own; iX MCP + `AGENTS.md` approach | Device management, fleet |
| **Material 3** | **HCT/dynamic-colour** tonal palettes for generating brand ramps; `ref/sys/comp` token naming; shape and motion-physics tokens (Expressive) | Token architecture; marketing motion |
| **Fluent 2** | 16-step brand ramp → theme generation; high-contrast mode handling | Customer white-label themes |
| **SAP Fiori** | Cozy/compact density; object page and analytical card patterns; process flow | Enterprise IoT admin |
| **PatternFly** | Topology view; empty-state and wizard patterns; log viewer | Network/device topology |
| **Grafana Saga** | Time-range picker, panel chrome, synchronised cursors | Telemetry dashboards |
| **Primer / Nord / React Spectrum** | `@primer/mcp` token-by-intent tool; Nord's `llms.txt` + `SKILL.md`; React Spectrum's MCP + Markdown docs | AID's LLM layer |
| **GOV.UK / USWDS / MOD.UK** | Pattern-page documentation template ("when to use / when not to / how it works / research"); error-message and form patterns; plain-language rules | Content design; docs site |
| **Radix Colors / Open Props** | 12-step functional colour scales; easing and size token sets | Token primitives |
| **Ant Design** | Seed → map → alias algorithmic theming; table/filter/transfer patterns | Theming engine; admin |

---

## 5. Implications for AID

1. **Make tokens the first deliverable, not components.** A DTCG 2025.10 token repo with axes for `brand: iot | defense`, `mode: light | dark | hc | night`, `density: comfortable | compact | console`. Wire it to Figma variables and CSS before building any more of the website, so the marketing site becomes the system's first consumer, not a one-off.
2. **The current marketing site (Next.js) is already compatible** with the recommended stack (React, Tailwind-style CSS variables). Re-pointing its colours, type and spacing to tokens is a contained refactor.
3. **Separate the status palette from brand colour.** Defense consoles need Astro-style status colours that never change across rebrands or sub-brands. Brand accents must never be red, amber or green-adjacent in ways that collide with status.
4. **Defense needs a hardened distribution.** Self-hosted fonts and icons, no runtime CDN, pinned dependencies, SBOM, and offline docs (`llms-full.txt` works offline too). This excludes Polaris-style CDN components and argues for owning the code.
5. **Indic support is a product requirement, not a nice-to-have.** NAVIC (India's regional navigation system) implies Indian government and defence users. Pick brand typefaces with matching Devanagari, or pair with Noto Sans Devanagari, and test conjunct rendering on embedded targets early.
6. **Plan an HMI token export** (C/LVGL or Qt/QML) from day one. Retrofitting embedded screens is where multi-platform systems usually fail.
7. **Agent-friendliness is cheap if designed in:** a private shadcn-format registry + MCP + `llms.txt` means AID engineers and agents produce on-system UI by default.
8. **Licence hygiene:** record every upstream's licence in `docs/brand/` or a `THIRD-PARTY.md`. Never copy Atlassian/Polaris/Nord/EUI code or assets. Do not use GOV.UK/MOD visual identity. Astro patterns are MIT code, but the US Space Force context means copying *concepts*, not branding.
9. **Team:** the composition approach needs a small permanent core (design-system designer, front-end engineer, content designer part-time) and a governance rhythm. Without it, the system will drift back into per-project styling.

## 6. Open questions

1. **Framework commitment for products:** are AID's IoT platform ("Signal") and Lighthouse built in React today? Any Angular/Qt/Flutter codebases? This decides React-only vs adding a Web Components layer (or Siemens iX).
2. **Defense deployment constraints:** air-gapped networks? Indian MoD security certification? Are classification markings Indian (Restricted/Confidential/Secret/Top Secret) rather than US? Astro's marking components would need re-specifying.
3. **Embedded/HMI targets:** which displays, resolutions, GUI toolkits (LVGL, Qt, TouchGFX, web-in-kiosk)? Glove, sunlight and night-vision requirements?
4. **How far apart should the two brands look?** Shared skeleton with different skins (one token set per brand), or deliberately distinct systems sharing only primitives? Export-control or customer-perception reasons may favour clearer separation for AID Defense.
5. **White-labelling:** will IoT customers re-skin AID dashboards with their own brand? If yes, a third brand axis ("customer") is needed now.
6. **Mapping and symbology:** is MIL-STD-2525/APP-6 or an Indian equivalent required for Lighthouse? Offline map tiles (MapLibre + self-hosted tiles) vs commercial providers?
7. **Figma licensing and ownership:** which Figma plan (variables, Code Connect and branching need Organisation/Enterprise)? Who owns the library?
8. **Astro's successor:** Rocket Communications mentions a "modernised replacement". Is it open source and licensable? Worth a direct enquiry before finalising console patterns.
9. **Grid and chart libraries:** is AG Grid Community (MIT) enough, or are Enterprise features (pivoting, server-side row model) needed (paid)? ECharts vs Visx for real-time telemetry performance?

---

## Next steps (and why each is next)

1. **Decide the theme axes and brand relationship (Open questions 4 and 5) with the product lead.** Every token, Figma and code decision depends on how many brands and modes exist.
2. **Prototype the token pipeline:** a DTCG file → Style Dictionary/Terrazzo → CSS variables + Figma variables, applied to the existing marketing site. This proves the rebrand-proof claim on a real consumer at low cost.
3. **Spike one Defense console screen** (status bar, classification banner, alarm list, map and timeline) on Base UI + AID tokens in dark/compact. This is the riskiest surface and the one no open-source base fully provides, so it validates the composition before more investment.

---

## Sources

- Siemens iX: https://github.com/siemens/ix · https://ix.siemens.io · npm `@siemens/ix` 5.3.0 (MIT): https://registry.npmjs.org/@siemens/ix/latest · iX MCP: https://developer.siemens.com/mcps/ix-mcp/overview.html · https://ix.siemens.io/blog/mcp · https://licenses.dev/npm/%40siemens%2Fix/5.2.0
- Astro UXDS: https://www.astrouxds.com/getting-started/ · https://github.com/RocketCommunicationsInc/astro · npm `@astrouxds/astro-web-components` 8.0.0 (MIT): https://www.jsdelivr.com/package/npm/@astrouxds/astro-web-components · Rocket profile: https://www.builtincolorado.com/company/rocket-communications
- Carbon: https://carbondesignsystem.com/developing/carbon-mcp/overview/ · https://carbondesignsystem.com/migrating/guide/overview/ · https://github.com/carbon-design-system/carbon/wiki/Roadmap
- Material: https://github.com/material-components/material-web/discussions/5642 · https://cdn.jsdelivr.net/gh/material-esm/material@3.0.6/README.md · https://m3.material.io/blog/material-theme-builder · https://developer.android.com/design/ui/wear/guides/get-started/apply
- Fluent 2: https://fluent2.microsoft.design/get-started/develop · https://github.com/microsoft/fluentui/discussions/29609
- Atlassian licence: https://atlassian.design/license · https://community.developer.atlassian.com/t/can-i-use-atlassian-design-system-in-my-own-projects/63242
- Primer: https://primer.style/product/getting-started/foundations/mcp · https://cdn.jsdelivr.net/npm/@primer/mcp@0.3.4/README.md · https://app.unpkg.com/@primer/primitives@11.10.0/files/DESIGN_TOKENS_SPEC.md
- Polaris: https://unpkg.com/@shopify/polaris/LICENSE.md · https://infoq.com/news/2026/10/shopify-web-components · https://community.shopify.dev/t/polaris-react-migration-to-web-components/25672
- React Spectrum / React Aria: https://react-spectrum.adobe.com/mcp · https://react-spectrum.adobe.com/ai · https://react-aria.adobe.com/ai · https://react-spectrum.adobe.com/releases.xml · https://opensource.adobe.com/react-spectrum-charts/docs/docs/developers/McpServer/
- SLDS 2: https://developer.salesforce.com/docs/platform/lwc/guide/create-components-css-slds1-slds2.html · https://trailhead.salesforce.com/content/learn/modules/salesforce-lightning-design-system-2-for-admins/discover-salesforce-lightning-design-system-2-admin
- MOD.UK: https://design-system.service.mod.gov.uk/ · https://defencedigital.blog.gov.uk/2023/02/17/introducing-mod-uk-frontend-and-the-design-library/ · https://design-system.navy.digital.mod.uk/resources
- Nord: https://nordhealth.design/llms.txt · https://nordhealth.design/.well-known/skills/nord/SKILL.md · licence: https://unpkg.com/@nordhealth/components@5.4.4/LICENSE.md
- Elastic EUI licence: https://unpkg.com/@elastic/eui@123.3.0/LICENSE.txt · https://www.elastic.co/blog/elastic-license-update
- Grafana UI (Apache-2.0): https://registry.npmjs.org/@grafana/ui/latest · Backstage UI: https://registry.npmjs.org/@backstage/ui/latest
- Radix: https://softwareengineeringdaily.com/wp-content/uploads/2025/11/SED1871-Radix-UI.txt · https://dev.to/mashuktamim/is-your-shadcn-ui-project-at-risk-a-deep-dive-into-radixs-future-45ei
- Base UI: https://mui.com/blog/2026-and-beyond/ · https://infoq.com/news/2026/02/baseui-v1-accessible/ · https://blog.openreplay.com/shadcn-ui-radix-base-ui-switch/
- shadcn/ui: https://ui.shadcn.com/docs/changelog · https://ui.shadcn.com/docs/mcp · https://237.v0.build/docs/design-systems
- Untitled UI: https://www.untitledui.com/react/docs/introduction · https://github.com/untitleduico/react
- DTCG: https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/ · https://www.w3.org/community/reports/design-tokens/CG-FINAL-format-20251028/ · https://www.designtokens.org/faq/
- Items marked *(unverified)* (component counts, Chakra/Mantine/Ant MCP and llms.txt, SLDS asset licence, Bosch licence, Spectrum 2 Figma currency, Astro Figma post-wind-down) come from prior knowledge and should be checked before any procurement decision.
