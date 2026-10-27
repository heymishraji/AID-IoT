# 03 · Design-token architecture, tooling and rebrand-proof multi-brand theming

Research for AID (parent brand; sub-brands AID IoT and AID Defense; products such as NAVIC; solutions such as Lighthouse). Written 27 October 2026. British English.

**Evidence labelling.** Items marked **[verified]** were confirmed by a web source during this session (linked). Items marked **[prior knowledge]** come from the author's training and established practice and should be re-checked before they are relied on in a contract or a build. Search depth was limited (about five queries), so section 4 case studies and parts of section 5 and 6 are mostly **[prior knowledge]**.

---

## 1. W3C Design Tokens Community Group (DTCG) format

### Status
- **First stable version, 2025.10, was announced on 28 October 2025** and is published at designtokens.org. It comprises Format, Color and Resolver modules. [verified] [designtokens.org](https://designtokens.org/), [2025.10 reports](https://www.designtokens.org/tr/2025.10/)
- The Resolver Module is a **Final Community Group Report** dated 2025-10-28 and states "This specification is considered stable". [verified] [W3C CG-FINAL resolver](https://www.w3.org/community/reports/design-tokens/CG-FINAL-resolver-20251028/). A stale designtokens.org draft page still carries a "preview, do not implement" banner; ignore it and cite the final report.
- Caveat: this is a **Community Group** report, not a W3C Recommendation. It is not on the W3C standards track, but it is the de facto interchange format. Licensing commitments for the Resolver were still being collected in December 2025. [verified] [W3C list](https://lists.w3.org/Archives/Public/public-design-tokens/2025Dec/0003.html)
- Adopters named by the DTCG include Style Dictionary, Tokens Studio, Figma, Terrazzo and others; zeroheight reports Figma, Tokens Studio and the Style Dictionary CLI read 2025.10 directly. [verified, secondary] [zeroheight](https://help.zeroheight.com/hc/en-us/articles/48049028236187), [DTCG FAQ](https://www.designtokens.org/faq/)

### File format essentials
- JSON (`.tokens.json` / `.tokens`; media type `application/design-tokens+json`). [prior knowledge]
- A **token** is an object with `$value`. Optional `$type`, `$description`, `$extensions`, `$deprecated`. A **group** is an object without `$value`; groups can set a `$type` inherited by children.
- **Aliases** use curly braces: `"{color.brand.primary}"`. JSON-pointer `$ref` is also in the format for referencing properties inside tokens.
- **Types**: `color`, `dimension`, `fontFamily`, `fontWeight`, `duration`, `cubicBezier`, `number`; composites `typography`, `shadow`, `border`, `transition`, `gradient`, `strokeStyle`.
- **2025.10 change that matters:** `color` values are now **objects with an explicit colour space** (`srgb`, `display-p3`, `oklch`, `oklab`, `hsl`, `lab`, `lch`, etc.), with `components`, optional `alpha`, and optional `hex` fallback. This lets OKLCH be the source of truth. `dimension` is `{ "value": 16, "unit": "px" }`. [prior knowledge; check the Color module]
- Mode/theme handling was deliberately **left out of the Format** and put in the **Resolver Module**: a `.resolver.json` with `sets` (token sources), `modifiers` (contexts such as `theme: light|dark`, `brand: aid-iot|aid-defense`) and a `resolutionOrder` that composes them. A tool takes an "input" (e.g. `{theme:"dark", brand:"aid-defense"}`) and produces one flat resolved token set. [verified at summary level] [DTCG glossary](https://www.designtokens.org/glossary/)

### Example: tokens (2025.10 style)
```json
{
  "color": {
    "$type": "color",
    "orange": {
      "500": {
        "$value": { "colorSpace": "oklch", "components": [0.70, 0.17, 55], "hex": "#F26B1D" },
        "$description": "Primitive. Logo orange, as sampled from the mark."
      }
    },
    "text": {
      "accent": {
        "$value": "{color.orange.700}",
        "$description": "Semantic. Accent text on surface.default; AA at 16px."
      }
    }
  },
  "space": { "$type": "dimension", "4": { "$value": { "value": 16, "unit": "px" } } },
  "type": {
    "body": {
      "$type": "typography",
      "$value": {
        "fontFamily": "{font.family.sans}", "fontSize": "{font.size.300}",
        "fontWeight": 400, "lineHeight": 1.5, "letterSpacing": { "value": 0, "unit": "px" }
      }
    }
  },
  "color.legacy.blue": { "$value": "#0057B8", "$deprecated": "Use {color.blue.600}. Removed in 4.0." }
}
```
(The last entry is illustrative; real files nest groups rather than using dotted keys.)

### Example: resolver (brands × modes)
```json
{
  "version": "2025.10",
  "name": "AID",
  "sets": {
    "primitives": { "sources": [{ "$ref": "tokens/primitive/core.tokens.json" }] },
    "semantic":   { "sources": [{ "$ref": "tokens/semantic/base.tokens.json" }] }
  },
  "modifiers": {
    "brand": {
      "default": "aid-iot",
      "contexts": {
        "aid-iot":     [{ "$ref": "tokens/brand/aid-iot.tokens.json" }],
        "aid-defense": [{ "$ref": "tokens/brand/aid-defense.tokens.json" }]
      }
    },
    "mode": {
      "default": "light",
      "contexts": {
        "light":  [{ "$ref": "tokens/mode/light.tokens.json" }],
        "dark":   [{ "$ref": "tokens/mode/dark.tokens.json" }],
        "night":  [{ "$ref": "tokens/mode/night.tokens.json" }]
      }
    },
    "density": {
      "default": "comfortable",
      "contexts": {
        "comfortable": [{ "$ref": "tokens/density/comfortable.tokens.json" }],
        "compact":     [{ "$ref": "tokens/density/compact.tokens.json" }]
      }
    }
  },
  "resolutionOrder": [
    { "$ref": "#/sets/primitives" }, { "$ref": "#/modifiers/brand" },
    { "$ref": "#/sets/semantic" },   { "$ref": "#/modifiers/mode" },
    { "$ref": "#/modifiers/density" }
  ]
}
```
Exact key names should be copied from the final Resolver report before implementation; the shape above is indicative. [prior knowledge]

---

## 2. Tooling

| Tool | Role | State (late 2026) | Fit for AID |
|---|---|---|---|
| **Style Dictionary v5** (Amazon, now with community stewardship) | Build engine: parse DTCG, transform, format per platform | v4 (2024) made DTCG first-class and ESM/async; v5 adopted the 2025.10 spec as its base format [verified, secondary: [zeroheight](https://help.zeroheight.com/hc/en-us/articles/48049028236187)]. Official docs: [styledictionary.com](https://styledictionary.com). Resolver-module support: **check**; multiple StyleDictionary runs per brand×mode is the proven pattern. | Primary candidate for the build. Custom formats are easy (Office theme XML, ASE swatches, JSON for LLMs). |
| **Terrazzo** (ex-Cobalt UI) | DTCG-native parser + plugins | Plugins for CSS, Sass, JS/TS, Swift `.xcassets`, **Tailwind v4 theme** (`@terrazzo/plugin-tailwind`, MIT). Has "Resolvers" docs. [verified] [Terrazzo Tailwind](https://terrazzo.app/docs/integrations/tailwind/). Note: Tailwind plugin collapses double dashes, so `--text-xs--line-height` needs a `variableName` override. | Strong alternative; most DTCG-2025.10-native, good colour-space handling. Smaller ecosystem than Style Dictionary. |
| **Tokens Studio** (Figma plugin + `sd-transforms`) | Authoring in Figma, Git sync, Style Dictionary bridge | Mature; token sets, themes, GitHub/GitLab sync; `@tokens-studio/sd-transforms` bridges to Style Dictionary. Moving toward DTCG format. [prior knowledge] | Best for token-first authoring by designers with Git as source. Paid tiers for themes/multi-file sync. |
| **Figma Variables** | Native tokens in Figma: collections, modes, aliases, scopes | Native DTCG export/import announced at Config/Schema 2025 and still rolling out late 2025. Reports: export omits descriptions; modes export as separate files; re-import failures reported (one April 2026 forum post). [verified, mixed quality] [Figma forum](https://forum.figma.com/ask-the-community-7/native-variable-export-feature-47831), [Atomize (vendor)](https://atomize.tools/blog/figma-variables-export-json/). **Variables REST API is Enterprise-plan only** [prior knowledge]. Mode limits depend on plan (Professional ~4, Organisation/Enterprise more) [prior knowledge, verify]. | Figma is a *consumer* of the tokens, not the source of truth. Push from Git via plugin or Enterprise REST API. |
| **Tailwind CSS v4** | `@theme` directive declares tokens as CSS variables and generates utilities | CSS-first config, OKLCH default palette. `@theme inline` and `--color-*: initial` to reset namespaces. [prior knowledge] | The web output target. Generate a `theme.css` from tokens. |
| **CSS custom properties** | Runtime theming | Universal; brand/mode swap via `[data-brand]`, `[data-mode]`, `@layer`, `light-dark()` and `color-mix()` | The runtime mechanism for everything on web and email web-views. |
| **Open Props** | Ready-made CSS variable set | Useful reference, not a brand system | Not needed. |
| **Panda CSS / vanilla-extract** | Token-aware CSS-in-JS with zero runtime | Panda has semantic tokens and conditions; vanilla-extract has `createThemeContract` (strong typed contract per brand). [prior knowledge] | Only if the team rejects Tailwind; the CSS-variable contract idea from vanilla-extract is worth copying. |
| **Specify / Supernova / Knapsack / zeroheight** | Platforms: token management, docs, pipelines | Specify announced wind-down / acquisition by Figma-era changes: **verify before choosing**. Supernova: token pipelines + docs + code export. zeroheight: docs hub with token import (reads 2025.10). Knapsack: docs + governance. [prior knowledge] | Optional layer for docs. Avoid making a SaaS the source of truth; keep Git canonical. |

### Output matrix: token source → platform

| Target | Output | How |
|---|---|---|
| Web (React/Tailwind) | `tokens.css` (custom properties per brand/mode), `theme.css` (`@theme`), TS types, JS object | Style Dictionary or Terrazzo CSS/Tailwind plugin |
| Figma | Variables (collections = primitive / semantic / brand; modes = light/dark/…) and Text/Effect styles | Tokens Studio sync, or REST API (Enterprise), or native DTCG import |
| iOS / Android / Compose | Swift asset catalogue / `Color` extension; Android `colors.xml`, Compose `Color` | Style Dictionary built-in iOS/Android formats; Terrazzo Swift plugin |
| Embedded HMI | C header `#define`/`const` RGB565/RGB888, LVGL style tables, QML `.qml` singleton | Custom Style Dictionary formats. Pre-resolve OKLCH to sRGB in the build. |
| PowerPoint / Keynote / Google Slides | `theme1.xml` (`<a:clrScheme>`, `<a:fontScheme>`) injected into a `.potx`; Keynote and Slides have no theme-file import, so ship `.potx` plus a generated Slides template via Apps Script / API | Custom format → `.potx` generation with `python-pptx` or `docx`-style zip templating. 12 colour slots only, so map the semantic layer to the 12 slots. [prior knowledge] |
| Print (InDesign/Illustrator) | `.ase` swatch file (Adobe Swatch Exchange) with CMYK/Pantone spot entries | Custom format; the `.ase` binary format is documented and has npm writers [prior knowledge] |
| Email | Inlined hex (sRGB), web-safe font stack fallbacks, MJML variables | Custom format → MJML `mj-attributes` or Handlebars partial. Email clients don't support OKLCH or custom properties reliably. |
| LLM / docs | `tokens.json` flat, `llms.txt`-style markdown listing names, values, descriptions and usage rules | Custom Style Dictionary format |

**Pantone/CMYK warning.** CMYK and Pantone cannot be *derived* from OKLCH by formula and still be on-brand; gamut differs. Keep a **hand-approved print table** (`brand.print.json`: token → Pantone Coated/Uncoated reference, CMYK, and approximate sRGB) as a separate source reviewed by a print vendor, and have the build check that sRGB values stay within ΔE (e.g. ΔE2000 ≤ 3–5) of the Pantone's published sRGB approximation. Pantone licensing applies to embedding their library values in distributed files [prior knowledge].

---

## 3. Tier architecture

### Common models
| System | Tiers | Notes |
|---|---|---|
| Salesforce Lightning | Global → Alias → Component (originated "design tokens", Jina Anne) | [prior knowledge] |
| Adobe Spectrum | Global (primitives, e.g. `gray-100`) → Alias (semantic, e.g. `neutral-background-color-default`) → Component | Spectrum 2 uses a DTCG-compatible token repo; strongly systematic naming. |
| Material 3 | `ref` (palette) → `sys` (roles: `md.sys.color.primary`) → `comp` (component, e.g. `md.comp.filled-button.container.color`) | Colours from HCT tonal palettes. |
| Atlassian | Raw palette → semantic `color.text.accent.blue` → components consume semantics; themes (light/dark/spacing/typography) shipped as independent CSS-variable layers | [prior knowledge] |
| GitHub Primer | base → functional (`fgColor-default`, `bgColor-muted`) → component; "primitives" repo; light/dark/colour-blind/high-contrast themes | [prior knowledge] |
| Nathan Curtis, "Naming Tokens in Design Systems" (EightShapes/Medium) | Name = *category–property–variant–state–scale* with a consistent order; argues names should say **what it is for**, not what it looks like, at semantic level | [prior knowledge] |

### How many tiers? Recommendation: **three, with a fourth optional**
1. **Primitive (reference)**: raw values with no meaning: `color.orange.500`, `space.16`, `font.size.300`. Brand-specific ramps live here.
2. **Semantic (system)**: roles: `color.text.primary`, `color.surface.raised`, `color.status.critical.fg`, `space.inset.md`. The only layer designers and product code normally touch.
3. **Component**: `button.primary.bg`. Create **only where a component needs variation** that semantics cannot express (button, input, table row, HMI gauge). Do not generate one per component up front; it triples file counts with little benefit.
4. *(Optional)* **Brand-expression tier** for marketing-only values (hero gradient, display font). Keep it outside the product semantic set so product UI cannot lean on it.

### Where brand switching happens
Swap **primitives into semantics**, never component into primitives. Concretely:
- Brand file maps *brand roles* to primitives: `color.brand.primary → {color.orange.500}` for AID IoT, `→ {color.blue.700}` for AID Defense.
- Semantic tokens reference **brand roles**, not primitives, wherever brand matters (`color.action.primary.bg → {color.brand.primary}`), and reference neutral/status primitives directly where it must not change across brands (status colours, text neutral).
- A rebrand then edits the brand file (and ramp generation seeds); semantics and components remain untouched. This is the single most important design decision for the "change in one place" goal.

### Naming convention (proposed)
`{category}.{property}.{role/variant}.{state}` all lower-case, kebab inside segments, dot separated in source; CSS output `--aid-color-text-primary`.
- Prefix every public CSS variable with `--aid-` (parent) to prevent collisions with Tailwind/vendor CSS.
- Semantic names describe **purpose** (`text.muted`, `surface.sunken`), never hue (`text.blue`). Hue-named accents (`accent.orange`) only in a clearly marked "data/brand-illustration" set.
- Scale numbers are fixed-step (50–950 for hue ramps; 1–12 if adopting Radix-style steps, see section 5).

---

## 4. Multi-brand, multi-mode case studies

All **[prior knowledge]**; sources not fetched in this session. Treat as pointers for follow-up.

| Organisation | What they publicly describe | Lesson for AID |
|---|---|---|
| **Atlassian** | Single token set ("ADS tokens") with independently loaded theme layers (colour light/dark/high-contrast, spacing, typography); tokens have metadata (description, state, replacement) | Treat axes as *independent theme layers* loaded by attribute, not a Cartesian product of files. |
| **GitHub Primer** | Light, dark, dimmed, colour-blind, high-contrast variants from one semantic set, generated by a primitives repo | Accessibility variants are just more modes. |
| **Material 3 / Google** | Dynamic colour from one seed via HCT | Generating all ramps from a seed makes rebrand cheap. |
| **Siemens iX** | Themes (`classic-light/dark`, `brand-light/dark`) on one component library, aimed at industrial HMI/dashboards | Closest sector analogue; study its dark-first industrial theme and density approach. |
| **Booking.com, Adevinta, eBay, Telstra, ING, Danske Bank, Vodafone, Philips, Volvo/Polestar** | Multi-brand or white-label design systems with shared components and brand-swappable tokens; Adevinta (Spark) famously ran many marketplace brands from one library; Volvo/Polestar split into per-brand token themes | Common pattern: shared semantic contract, per-brand primitive and font swap, brand-specific component overrides only by exception. Verify each claim before quoting externally. |
| **GE rebrand** | Visual identity change flowed through Predix design system | Evidence that industrial companies need enterprise-UI tokens separate from marketing identity. |
| **US Space Force / Astro UXDS** | Open-source design system for space ops consoles with dark default and standard status set | Directly relevant for AID Defense (section 5). |

### Managing the matrix without explosion
Axes: brand (2) × mode (light, dark, night/low-light = 3) × density (2) × platform (≈6) = 72 builds *if* fully crossed. Avoid by:
1. **Orthogonal layers.** Brand affects colour/type primitives; mode affects colour semantics only; density affects spacing/size/line-height only; platform only affects *serialisation*. Colour never depends on density; density never depends on brand. Therefore files = brand(2) + mode(3) + density(2), not 12 crossed.
2. **Build combinations only where shipped.** CSS ships all brand × mode as attribute selectors (`[data-brand="aid-defense"][data-mode="night"]`) because that is cheap (a few KB each); native/print/Office builds only emit the combinations that exist (e.g. print = light only; PowerPoint = 2 brands × light/dark).
3. **Brand-specific mode overrides** only as exceptions, in `brand/<name>/mode-overrides.tokens.json`.
4. **Test by contrast matrix script** in CI (section 7).

---

## 5. Colour science for scalable palettes

### Generation approaches
| Approach | Idea | Use |
|---|---|---|
| **OKLCH** | Perceptually uniform lightness/chroma/hue; CSS-native (`oklch()`); Tailwind v4's default palette is OKLCH | Authoring space and CSS output; enables consistent ramps and hue-stable tints. [prior knowledge] |
| **Radix Colors** | 12-step scales with defined jobs (1–2 backgrounds, 3–5 component states, 6–8 borders, 9–10 solid, 11–12 text) and automatic dark counterparts | Excellent *role-based* ramp model. Adopt the step-job idea. [prior knowledge] |
| **Material HCT** | Hue/Chroma/Tone; tone 0–100 equals CIELAB L*; contrast guaranteed by tone differences (tone diff ≥ 40 ≈ 3:1, ≥ 50 ≈ 4.5:1) | Good: contrast becomes arithmetic. Library `@material/material-color-utilities`. [prior knowledge] |
| **Adobe Leonardo** | Generate ramps *from target contrast ratios* against a background; outputs per theme; supports WCAG 2 and APCA | Best fit for "accessible by construction" and for generating light/dark/night from the same seed. [prior knowledge] |

### Contrast: WCAG 2.x vs APCA
- WCAG 2.x ratio is the legal/contractual baseline (AA 4.5:1 text, 3:1 large and UI components). It mis-predicts dark-mode legibility and is lenient on some mid-tone pairs.
- APCA (WCAG 3 candidate) uses Lc values (≈ Lc 75 body text, Lc 60 large/secondary, Lc 45 minimum for large headlines); more perceptually accurate, polarity-aware, but **not yet normative**. [prior knowledge]
- **Recommendation:** gate on WCAG 2.x AA (and AAA for HMI critical text), *report* APCA alongside, and use APCA as a tie-breaker for dark/night themes.

### Seed colours: orange, green, blue (logo)
- Define each seed as an OKLCH value sampled from the master logo file (not a screenshot), then generate 11-step ramps with Leonardo or a custom OKLCH script holding hue fixed and varying L with chroma clamped to sRGB gamut (and Display-P3 as an enhancement).
- Assign **roles**, not hues, per brand. A suggestion to test (not a decision): AID IoT leads with one hue and AID Defense with another, while the third becomes a data/status-adjacent accent. Orange is dangerous near "warning/caution" semantics in defence UIs; green collides with "normal/go"; blue collides with "standby/friendly" (see below). Therefore **product UI status colours must be decoupled from brand colours**: status ramps are a fixed shared set that no brand file can edit.
- Neutrals: generate from a tinted grey (chroma ≈ 0.005–0.02 toward the brand hue) per brand.

### Dark and mission-console (night) palettes
- Dark: lower surface chroma, raise text lightness, desaturate accents; elevation by lighter surfaces, not shadows.
- **Night / low-light (NVG-friendly, red-adapted):** a third mode with max luminance cap, red/amber-biased accent and no pure white; important so dark-adapted eyes are preserved. Militarily common as "night mode"/"red mode"; AID Defense should treat it as a first-class mode, not a skin. [prior knowledge]
- Optional **high-contrast** and **colour-blind-safe** variants as further modes (Primer precedent).

### Status colours
- **Astro UXDS** (Space Force) status system uses a colour-temperature scale: off (grey) → standby → normal → caution → serious → critical (red), each with a **shape** pairing for colour-blind users. Dark-theme values include critical `#FF3838`, serious `#FFB302`, caution `#FCE83A`, normal `#56F000`, standby `#2DCCFF`, off `#A4ABB6`. [verified] [Astro status system](https://astrouxds.com/patterns/status-system/), [Astro status symbol](https://astrouxds.com/components/status-symbol). Source pages show differing border values; check the current repo before copying.
- **MIL-STD-2525 (NATO APP-6)** symbology: affiliation is colour-coded (friend blue, hostile red, neutral green, unknown yellow in the standard's conventions) with redundant frame shape so it still works on monochrome displays. [verified in part: redundancy of shape and colour] [Wikipedia](https://en.wikipedia.org/wiki/NATO_Joint_Military_Symbology). Exact RGB table not retrieved this session.
- **MIL-STD-1472 (human engineering)** has colour-coding and alarm-colour guidance (red = danger/warning, amber = caution, green = normal, etc.) **[not verified here; search returned nothing; read the current revision (1472H) before citing]**.
- **Implication for AID:** if AID Defense ever shows tactical symbology, the affiliation colours (blue/green) are *reserved by standard* and clash with the brand blue/green. Reserve a `color.symbology.*` namespace that brand files cannot override. Use ISA-101 / EEMUA 191 alarm-management style conventions for IoT industrial consoles if relevant [prior knowledge].
- Rules: never colour alone; status tokens carry paired `icon` and `shape` tokens; test in greyscale and under deuteranopia/protanopia/tritanopia simulation in CI.

---

## 6. Typography tokens

### Scale
- Define a modular **fluid** scale using `clamp()` between a min viewport (e.g. 360px) and max (e.g. 1440px): `font-size: clamp(1rem, 0.9rem + 0.5vw, 1.25rem)`. Generate the clamp strings in the build (tools: Utopia.fyi calculator logic) from two tokens (`size.300.min`, `size.300.max`). Product UI and HMI should use **fixed** scales (fluid type in dense dashboards causes layout churn).
- Composite DTCG `typography` tokens for roles (`display`, `h1…h6`, `body`, `label`, `code`, `data-numeric`).
- Variable fonts: use `font-variation-settings`/`font-weight` ranges (100–900), `font-optical-sizing: auto` where an `opsz` axis exists; enable tabular numerals (`font-variant-numeric: tabular-nums`) for telemetry.

### Candidate open-licence families
All are SIL Open Font License 1.1 unless noted **[prior knowledge: confirm licence on each foundry page before commitment]**.

| Family | Latin quality | Devanagari | Variable | Notes |
|---|---|---|---|---|
| **Inter** | Excellent UI sans, tabular numerals, `opsz` axis | No (pair with Noto Sans Devanagari) | Yes | Safe default for dense UI. |
| **IBM Plex Sans / Mono** | Engineered, "industrial" tone, Mono for code | **Plex Sans Devanagari** exists | Static (variable added later) | Strong fit for IoT/defence; one family covers sans, mono, and Devanagari. |
| **Geist (Sans/Mono)** | Modern, clean | No | Yes | Vercel-origin; new Devanagari status unknown. |
| **Space Grotesk** | Distinctive, technical | No | Yes | Display only; weaker for body. |
| **Manrope** | Friendly geometric | No | Yes | Marketing. |
| **Noto Sans + Noto Sans Devanagari** | Neutral | **Yes**, Google, wide coverage | Yes | Fallback guarantee for all scripts. |
| **Mukta, Hind** (Ek Type) | Latin companions | **Yes**, designed for Devanagari + Latin harmony | Static | Good Devanagari-first choices. |
| **JetBrains Mono** | Code/telemetry | No | Yes | Monospace for logs/values. |

- Indic note: Devanagari needs larger line-height (≈ 1.5–1.7) and an optically matched size (Devanagari glyphs sit visually smaller than Latin at equal font-size; commonly +5–10%). Model as `font.family.sans: [Inter, "Noto Sans Devanagari"]` plus a `lang`-scoped `font-size-adjust`/line-height token set. [prior knowledge]
- **Print/Office fonts:** PowerPoint/Keynote need the font installed on the user's machine; open fonts help here (installable freely). Embed fallbacks (Calibri/Arial) in the theme fontScheme.
- **Rebrand safety:** reference fonts only via `font.family.brand.display|text|mono` role tokens; never hardcode family names in components. Note that the brand font may become a licensed commercial family later, so licence-tracking metadata belongs in the token `$extensions`.

---

## 7. Rebrand propagation pipeline

### Principles
- **Git is the source of truth** (monorepo `aid-design-tokens`). Figma, docs and templates are *generated or synchronised from it*, with one controlled write-back path (Figma → PR via Tokens Studio) if designers author there.
- Everything downstream is a build artefact; no hand edits.

### Pipeline (text diagram)
```
 brand assets (logo SVG master, seed colours, fonts, print table)
        │
        ▼
 tokens/ (DTCG JSON)  ──PR──►  CI (GitHub Actions)
   primitive/                    1 lint: schema, naming, alias cycles, deprecated use
   semantic/                     2 generate ramps from seeds (OKLCH/Leonardo)
   brand/{aid-iot,aid-defense}   3 contrast matrix test: brand × mode × pairs (WCAG + APCA)
   mode/{light,dark,night}       4 gamut + print ΔE check vs brand.print.json
   density/                      5 build: Style Dictionary / Terrazzo → platform outputs
   platform-overrides/           6 visual regression (Storybook/Chromatic or Playwright)
        │                        7 semver bump from conventional commits (changesets)
        ▼
 artefacts ─┬─► npm @aid/tokens (css, tailwind theme.css, ts, json)  ─► web apps, CDN (unpkg-like private)
            ├─► @aid/tokens-native (swift, kotlin, xml, C headers)    ─► mobile / embedded HMI
            ├─► Figma sync (Tokens Studio PR / REST API variables)    ─► Figma libraries
            ├─► office/ (.potx per brand, theme XML; Slides template) ─► Sales/PowerPoint
            ├─► print/ (.ase swatches + Pantone/CMYK sheet PDF)       ─► agency/printer
            ├─► email/ (MJML vars + inlined hex)                      ─► ESP
            └─► docs site (generated token tables, usage, changelog) + llms.txt/tokens.json
```

### Versioning and deprecation
- **Semver on the token package:** MAJOR = token removed/renamed or semantics changed; MINOR = new token; PATCH = value tweak within the same intent. A *rebrand* value change is formally a MAJOR visual release even when names are untouched; communicate it with a release note and a time-boxed staging flag (`data-brand-version="2"`).
- Use **Changesets** for release notes. Mark tokens `"$deprecated": "Use {new.token}"`; the build emits warnings, then fails after the sunset release. Keep an alias from old to new name for at least one MINOR cycle. [prior knowledge]
- Add a codemod (jscodeshift/ast-grep) for renames.
- **Rebrand dry-run test:** keep a "fake brand" (`brand/test-rebrand`) with different seeds and a different font in CI to prove no component hardcodes values; if visual regression for the fake brand shows hardcoded orange/blue, the build fails. This is the cheapest guarantee of "change in one place".

### Where the logo fits
Logos are not tokens, but treat the SVG master files as brand assets in the same repo: `assets/logo/{aid, aid-iot, aid-defense}/{full,mark,mono,reversed}.svg`, a manifest with clear-space rules as tokens (`logo.clearspace = 0.5x`), and generated PNG/ICO/favicons/Office-embedded variants. Rebrand = replace the masters, rerun.

---

## 8. Proposed token architecture for AID

### Folder structure
```
aid-design-tokens/
  brand-assets/
    logo/{aid,aid-iot,aid-defense}/…svg
    fonts/            (OFL files + LICENSES.md)
    print.brand.json  (token → Pantone ref, CMYK, sRGB approx, approval date)
  tokens/
    primitive/
      color.seeds.tokens.json        # OKLCH seeds, one per brand colour
      color.ramps.tokens.json        # GENERATED (committed) from seeds
      color.neutral.tokens.json      # per-brand tinted neutrals
      color.status.tokens.json       # FIXED, shared, brand-immune
      color.symbology.tokens.json    # FIXED, standards-reserved (2525 etc.)
      space / size / radius / motion / elevation / type-scale
    brand/
      aid.tokens.json                # parent defaults (neutrals, shared fonts)
      aid-iot.tokens.json            # maps brand roles → primitives
      aid-defense.tokens.json
    semantic/
      color.tokens.json  (text, surface, border, action, feedback, data-vis)
      type.tokens.json   (roles)  space.tokens.json  motion.tokens.json
    mode/{light,dark,night,high-contrast}.tokens.json
    density/{comfortable,compact}.tokens.json
    component/                       # only where needed
      button, input, table, hmi-gauge, …
    platform/{web,ios,android,hmi,office,print,email}.overrides.json
    aid.resolver.json                # DTCG resolver: brand × mode × density
  build/
    sd.config.mjs | terrazzo.config.mjs
    formats/   (office-theme-xml, ase, c-header, qml, llms-md, mjml)
    scripts/   (ramp-gen, contrast-matrix, print-delta-e, deprecations)
  dist/  (gitignored; published)
  docs/  (generated)  CHANGELOG.md  .changeset/
```

### Tiers, naming, axes
- **Tiers:** primitive → (brand mapping) → semantic → component(optional). Brand switch at the brand-mapping step; mode and density as orthogonal overrides on semantic.
- **Naming example:** primitive `color.orange.500`; brand role `color.brand.primary`, `color.brand.secondary`, `color.brand.tertiary`; semantic `color.action.primary.bg.hover`; status `color.status.caution.fg` (immune); CSS `--aid-color-action-primary-bg-hover`.
- **Brand axis:** `aid` (parent defaults) → `aid-iot` / `aid-defense` (inherit and override). Product names (NAVIC) and solution names (Lighthouse) are **not token namespaces**; they inherit a sub-brand. Add a product-level override file only if a product demands its own accent.
- **Mode axis:** light, dark, **night** (low-light/NVG), high-contrast. **Density axis:** comfortable, compact (HMI/operations consoles default to compact).
- **Platform axis:** serialisation only.
- **Immune namespaces:** `status`, `symbology`, `focus-ring` (accessibility) cannot be overridden by brand files; enforced by lint.

### Runtime on web
```css
:root, [data-brand="aid-iot"][data-mode="light"] { --aid-color-brand-primary: oklch(0.70 0.17 55); … }
[data-brand="aid-defense"] { --aid-color-brand-primary: oklch(0.45 0.15 255); }
[data-mode="dark"]  { … }   [data-mode="night"] { … }   [data-density="compact"] { … }
@theme inline { --color-primary: var(--aid-color-action-primary-bg); }
```
Sub-brand sites set attributes on `<html>`; components never change.

### Build choice
Start with **Style Dictionary v5** (most flexible custom formats for Office/ASE/C-header/LLM output) driven by a DTCG resolver, with **Terrazzo** as a candidate if its Tailwind/CSS output and colour-space handling prove cleaner in a spike. Keep tokens in DTCG so the choice stays reversible.

---

## Next steps (and why each is next)
1. **Sample seed colours and logo from the vector masters; record in `color.seeds`.** Why: every ramp, contrast check and print entry hangs off the seeds; they must come from the source art, not the website.
2. **Two-day spike: seeds → OKLCH ramps (Leonardo/script) → light/dark/night semantic → CSS + Tailwind v4 theme for the existing `site/`.** Why: proves the three-tier model on the real site with the lowest cost, and replaces any hard-coded colours.
3. **Run the "fake rebrand" test on that spike.** Why: it is the evidence for the CEO's "change in one place" requirement.
4. **Decide print and Office outputs with a vendor/brand owner** (Pantone references, `.potx` scope). Why: these need human-approved sources and cannot be derived.
5. **Figma strategy decision (Tokens Studio vs native variables vs REST API).** Why: depends on the Figma plan; confirm plan and mode limits first.

## Open questions
1. Which Figma plan does AID hold (REST Variables API needs Enterprise; mode count limits)?
2. Are the three logo colours (orange, green, blue) one master palette shared by both sub-brands, or does each sub-brand have a distinct lead colour?
3. Does AID Defense show tactical symbology (MIL-STD-2525/APP-6) or alarm displays, and are there customer-mandated standards (MIL-STD-1472H, ISA-101, customer NVG rules)?
4. Embedded HMI toolkit (LVGL, Qt/QML, Android, other) and colour depth (RGB565 vs 24-bit)? This sets the native output format and whether OKLCH needs gamut-mapping.
5. Is the print table already defined (Pantone Coated/Uncoated numbers)? Who approves?
6. Keynote and Google Slides: acceptable to ship template files built from the same source rather than true theme syncing?
7. Any requirement for Hindi/Devanagari beyond the website (collateral, HMI)? Which scripts beyond Devanagari?
8. Is a licensed brand typeface planned (which changes the open-font assumption and licence tracking)?
9. Ownership: who merges token PRs and approves a MAJOR (rebrand) release?
10. Items to re-verify before commitment: Style Dictionary v5 resolver support, Terrazzo 2025.10 colour support, Figma native import reliability, current mode limits, MIL-STD-1472H colour clauses, each font's licence.

## Sources
- DTCG stable release: https://designtokens.org/ · https://www.designtokens.org/tr/2025.10/ · https://www.w3.org/community/reports/design-tokens/CG-FINAL-resolver-20251028/ · https://www.designtokens.org/glossary/ · https://www.designtokens.org/faq/ · https://lists.w3.org/Archives/Public/public-design-tokens/2025Dec/0003.html
- Style Dictionary v5 / zeroheight: https://help.zeroheight.com/hc/en-us/articles/48049028236187 · https://styledictionary.com
- Terrazzo: https://terrazzo.app/docs/integrations/tailwind/
- Figma variables export: https://forum.figma.com/ask-the-community-7/native-variable-export-feature-47831 · https://atomize.tools/blog/figma-variables-export-json/ (vendor)
- Astro UXDS: https://astrouxds.com/patterns/status-system/ · https://astrouxds.com/components/status-symbol
- Military symbology: https://en.wikipedia.org/wiki/NATO_Joint_Military_Symbology
