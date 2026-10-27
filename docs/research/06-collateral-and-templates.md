# 06 · Brand application layer: collateral, templates and AI generation

Scope: AID IoT and AID Defense. Date: 27 Oct 2026. British English.

**Evidence note.** Web search was shallow this session (only three queries returned usable material). Items marked **[V]** were confirmed against a fetched/search source listed in section 9. Items marked **[K]** are established industry practice from prior knowledge and should be re-verified with the printer, platform or vendor before the spec is frozen. Social sizes in particular change often and sources disagree.

---

## 1. Production fundamentals (apply to all print)

| Parameter | Rule for AID | Notes |
|---|---|---|
| Bleed | 3 mm (5 mm for large format, banners, standees) | [K] standard UK/EU print |
| Safe zone | 5 mm inside trim (10 mm for roll-ups/large format; bottom 150 mm of roll-ups kept clear of text because of the base hardware) | [K] |
| Colour mode | CMYK for offset/digital; RGB for screen; Pantone (spot) only for logo and one hero colour where budget allows | Each brand colour needs HEX, RGB, CMYK, Pantone, and ideally RAL/NCS for hardware |
| Resolution | 300 dpi at 100% for A-sizes; 150 dpi for large format at viewing distance; 72/96 ppi for screen | [K] |
| Total ink | 280–300% max coated, 240% uncoated | [K] |
| PDF standard | PDF/X-4 (preferred, supports transparency, ICC) or PDF/X-1a:2001 where the printer is legacy | [K] |
| Fonts | Embed or outline all; supply open-licence or properly licensed web/desktop fonts. Define fallback stack for Office documents | [K] |
| Rich black | Text under 12 pt in 100K only; large areas in a defined rich black (e.g. C60 M40 Y40 K100) | [K] |
| Profile | FOGRA39/FOGRA51 (Europe, coated), GRACoL (US); confirm with Indian printer (often FOGRA or SWOP) | [K] |
| Accessibility | Tagged PDF (PDF/UA) for datasheets, whitepapers, RFP responses; alt text; AA contrast | Government procurement increasingly asks |

---

## 2. Touchpoint specifications

### 2.1 Print documents

| Collateral | Format | Production notes | Content structure |
|---|---|---|---|
| Flyer / pamphlet | A5 (148×210), A4, DL (99×210) | 3 mm bleed; 150–170 gsm silk | Hook headline, one proof, one CTA + QR |
| Brochure | A4 portrait or A4 landscape; 4/8/12 pp saddle-stitch; 297×210 folded | Multiples of 4 pp; spine allowance for perfect-bound | Cover, problem/outcome, portfolio map, 2–3 case snippets, specs summary, contact |
| Datasheet / spec sheet (hardware) | A4 portrait, 1–2 pp, PDF first | PDF/X-4 only if printed; web PDF otherwise | Product name + one-line outcome; hero image; key features (5–7); block/architecture diagram; specification table (grouped: RF, power, environmental, mechanical, interfaces, software); certifications and compliance strip (CE, FCC, BIS/WPC, RoHS, IP rating, MIL-STD-810 where true); ordering info (part numbers/SKUs, variants, accessories); revision, date, legal disclaimer |
| Case study | A4, 2 pp | | Customer, challenge, solution, measured outcome (numbers), quote, products used, CTA |
| Whitepaper | A4, 8–24 pp | Tagged PDF | Cover, exec summary, body with figure/callout styles, references, about AID |
| Proposal / RFP response | A4, structured to buyer's format | Must follow buyer numbering | Cover, compliance matrix, technical volume, commercial volume, annexures; defence adds export-control and classification markings |
| Business cards | 85×55 mm (UK/IN), 90×50 (EU alt) | 3 mm bleed; 350 gsm | Name, role, brand (IoT or Defense), phone, email, URL; optional QR |
| Stationery | A4 letterhead, DL/C4 envelopes, compliment slip 210×99 | | Footer carries registered address, CIN/GST, Defense-specific licences |
| Packaging / labels | Per product; see section 6 | | |

### 2.2 Large format and events

| Item | Size | Notes |
|---|---|---|
| Roll-up banner | 850×2000 mm (visible), supply 850×2200 mm with bleed/overlap [K] | Keep text above 150 mm from base and below 200 mm from top; 1 headline, 1 image, QR |
| Standee / X-banner | 600×1600 mm | |
| Backdrop / pop-up wall | 3×2.25 m, 3×3 m (straight/curved) | Print at 50–100 dpi at full size; logo at eye height 1.4–1.8 m |
| Booth fascia / shell scheme | Per organiser (Aero India, DefExpo issue exhibitor manuals) | Obtain each show's manual: height limits, fascia name board dimensions, co-exhibitor and Make-in-India/Atmanirbhar rules |
| Feather flag, table cover | 2.3 m flag; 1.8 m table | |
| Web banner (IAB) | 300×250, 728×90, 160×600, 300×600, 970×250, 320×50 | [K] max 150 KB initial for display networks |

Brand guidance must specify: scale ladder (logo size as % of width), viewing-distance type sizes (headline x-height ≈ 1 cm per metre of distance as a rule of thumb), and a booth kit-of-parts (modular panel grid).

### 2.3 Digital and social (verify before freezing)

| Platform | Asset | Size (px) |
|---|---|---|
| LinkedIn **[V-partial]** | Feed image | 1200×627 (landscape); 1080×1350 portrait now supported [K]; company cover 4200×700 (Sprout) vs 1128×191 historical; sources disagree |
| Instagram **[V]** | Feed | 1080×1080, 1080×1350 (4:5); allowed 1.91:1 to 4:5; Stories/Reels 1080×1920 |
| X **[V]** | Post image | 1600×900; header 1500×500 |
| Facebook **[V]** | Post | 1080×1350; cover 851×315 |
| YouTube **[V]** | Thumbnail 1280×720; banner 2560×1440 (safe area 1546×423) |
| Open Graph | 1200×630 | Most-used asset for web |
| Slides | 16:9, 1920×1080 (13.333×7.5 in) | Plus a 4:3 fallback only if the buyer demands |
| Email newsletter | 600–640 px wide container, table-based, ≤102 KB HTML to avoid Gmail clipping | [K]; images 2× |
| Email signature | ≤ 600 px wide, logo ≤ 200 px wide (2× asset), no more than 6 lines, links in text, no image-only content | [K] |
| Video | 1920×1080 (16:9), 1080×1920 (9:16), 1080×1080; 25 or 30 fps; H.264 MP4; lower-thirds with alpha (ProRes 4444/WebM) | Safe zones: 5% action-safe, 10% title-safe; 9:16 keep out of bottom 20% / top 14% |

### 2.4 Documentation and manuals

A4 or A5, DITA/Markdown source, single-sourced to web docs and PDF. Structure: safety information, what is in the box, quick start, installation, configuration, troubleshooting, specifications, regulatory notices, warranty, revision history. Defence manuals follow the customer's standard (e.g. ASD S1000D for technical publications, MIL-STD-38784 style; confirm which the Indian MoD/DRDO customers require) [K].

### 2.5 What the brand guideline must specify per touchpoint

1. Grid (columns, gutters, margins, baseline) per format family, expressed as tokens.
2. Type scale per medium (print pt, screen rem, large-format mm).
3. Logo lockups: IoT, Defense, co-brand, endorsement ("an AID company"); clear space; minimum size print (e.g. 20 mm) and digital (e.g. 24 px); placement per format (top-left default, bottom-right for sign-off).
4. Colour ratios and permitted backgrounds; one accent rule (matches existing site decision).
5. Imagery rules (section 5).
6. Co-branding: partner logo parity, ratio (partner ≤ AID size unless customer-mandated), separation divider, and customer-mandated overrides for defence primes/PSUs.
7. Legal blocks: disclaimer, export-control marking, trademarks, regulatory text, document control (number, revision, date).
8. Tone: copy rules from CLAUDE.md (outcome first; British English).

---

## 3. How strong brands systemise collateral

| Brand | What is public | Lessons |
|---|---|---|
| IBM | Design Language + Carbon design system; Plex typeface; 2x Grid; brand "Content Design" and templates through internal brand centre | Single token system spans product and marketing; a grid unit (8px mini-unit, 2x grid) drives every format |
| Atlassian | Atlassian Design System, brand guidelines at atlassian.design with illustration and photography principles, slide templates | Separates "brand expression" from "product UI" but shares tokens |
| Siemens | Siemens brand portal ("Siemens Brand Guidelines"/ "Brand Hub"), Siemens Sans, 12-column and fixed ratio layouts, templated PPT and print | Strictly modular grids; logo positions fixed per format; clear dos and don'ts |
| Bosch | Public "Bosch Brand" site describing the "Invented for life" design, the Bosch Brand Design Hub with templates per medium | Layout is defined by proportion rules (a "Bosch Grid"), plus a red-line "brand bar" device |
| Spotify | Spotify for Brands; Design site (design.spotify.com) with motion and layout principles; templated social "Wrapped" generation | Programmatic personalisation at scale from one system |
| Mailchimp | Public brand guidelines with illustration and voice | Voice and illustration as differentiators; useful for tone documentation |
| Uber | Uber Brand Guidelines (brand.uber.com) with logo, motion, photography, layout "Base" | Motion is a first-class chapter with tokens |
| Lockheed Martin / BAE Systems | Brand centres are mostly gated; public footprints are logos and press kits only | **Not available publicly**: conclusions are inference. Defence primes keep tight control; AID Defense should mirror structure of Siemens/Bosch (industrial, modular) rather than consumer systems |

Common structure of a "brand toolkit": (1) Foundations (logo, colour, type, grid, imagery, motion, voice) → (2) Components (cards, tables, callouts, icons, charts) → (3) Templates by medium (locked and "fill-in" regions) → (4) Asset library (DAM) → (5) Governance (approval flow, request form, who to ask) → (6) Tools (plugins, generators). Best practice: templates lock brand-critical regions (logo, footer, legal) and leave only content slots editable. A DAM (Brandfolder, Frontify, Bynder, or open: Directus/Immich plus Git) holds approved masters with metadata (brand, product, rights, export-control class).

---

## 4. Generating collateral programmatically and with AI

### 4.1 Tool landscape

| Output | Tool | Strengths | Weaknesses | Fit |
|---|---|---|---|---|
| Print PDF (datasheet, brochure, whitepaper) | **Prince** (commercial) | Best CSS Paged Media support; PDF/X and PDF/A options; CMYK via `-prince-` extensions [K]; made by CSS Paged Media spec authors **[V]** | Licence cost (~USD 495+ server) | Best quality when print-ready CMYK is required |
| | **Paged.js** | Free polyfill; runs in Chromium, so same HTML as the web; good typography **[V]** | Output is RGB from Chromium; PDF/X and CMYK need post-processing (Ghostscript, Acrobat preflight) | Best open default for LLM-authored HTML |
| | **WeasyPrint** | Python, simple, PDF/A and PDF/UA **[V]**; subset of paged-media features **[V]** | No flexbox/grid edge cases, no PDF/X | Good for datasheets that will be screen-only |
| | **Typst** | Fast, strongly typed templates, data-driven (JSON/CSV), PDF/A, tagged PDF progressing | Own markup, not CSS; weaker for reusing website components | Good for tables-heavy datasheets and RFP volumes |
| | **Vivliostyle** | CSS typesetting, Markdown friendly | Smaller community | Alternative to Paged.js |
| | **react-pdf (@react-pdf/renderer)** | JS, React components, same tokens | Limited layout engine; no CMYK | Invoice/quote-style documents |
| | InDesign (Data Merge, UXP scripts, InDesign Server) | Industry print gold standard; PDF/X, spot colours | Licence, desktop, harder for LLMs | Only for agency-grade brochures |
| Social images | **Satori / @vercel/og**, Takumi, or Playwright screenshot of HTML | Fast, JSON → PNG, tokens as JS; Satori supports a CSS subset (flex only) | No grid, limited filters | Best for Open Graph and social cards |
| | Bannerbear / Placid / Canva Autofill | Hosted template APIs | Cost, vendor lock-in, templates built in their editors | Use only if marketing team insists on visual editor |
| Decks | **PptxGenJS** or python-pptx with a master | Real .pptx in master layouts, editable by sales | Layout maths by hand; python-pptx can fill placeholders in an existing branded template (recommended) | Primary for editable decks |
| | **Marp / Slidev / reveal.js** | Markdown → HTML/PDF; Slidev has Vue components; very LLM friendly | Not editable PowerPoint (Marp can export PPTX as images; limited) | Technical talks, keynote-style PDFs |
| | Figma Slides / Google Slides API | Collaboration; Figma MCP available in this environment | Template fill via API is limited | Design review, not automation |
| | Gamma / Pitch | Fast, but brand control is limited | Off-brand risk | Not recommended for final output |
| Canva | Brand Kit + Connect API Autofill **[V]** | Non-designers can edit; autofill jobs from JSON | Autofill needs an Enterprise org **[V]**; templates must be tagged manually in Canva | Optional editor-friendly channel for sales/events |
| Video | **Remotion** (React) or **HyperFrames** (HTML, deterministic, in this workspace) | Parametric intros, lower-thirds, data-driven reels; same tokens | Render time; Remotion licence terms for companies above 3 staff [K] | Use HyperFrames since the project already has the skills |
| Email | MJML (compiles to responsive HTML) / React Email | Reliable cross-client | | Newsletter and signatures |
| Web | Next.js site and tokens | Already built | | |

### 4.2 What gives the best brand consistency for LLM output

Principle: **the LLM should never design; it fills a typed schema.** Consistency comes from (a) locked templates, (b) a single token source, (c) a validator.

Ranking by consistency for LLM-generated output:
1. HTML/CSS templates (Paged.js/Prince, Satori, HyperFrames) bound to shared CSS variables: LLMs write HTML/JSON well, output deterministic, trivially linted.
2. python-pptx or PptxGenJS filling a real branded master (placeholders only).
3. Canva/Figma template fill (good for humans; weaker for agents, plan limits).
4. Free-form generation in Gamma/Canva "Magic" (lowest).

### 4.3 Recommended AID stack

One repository `brand/` with:

```
brand/
  tokens/tokens.json            # DTCG format: colour, type, space, radius, motion; per brand (iot, defense)
  tokens/build.js               # Style Dictionary -> CSS vars, TS, Typst, PPTX theme, Figma variables
  schemas/*.schema.json         # one JSON Schema per collateral type
  templates/
    print/datasheet/            # HTML+CSS (Paged.js) + content.schema.json + example.json
    print/brochure/ whitepaper/ case-study/ rfp/
    social/og, linkedin-post, instagram-4x5, story/   # Satori JSX
    deck/master-iot.pptx, master-defense.pptx         # python-pptx fills
    email/*.mjml, signature.html
    video/intro, lower-third  # HyperFrames compositions
    large-format/rollup, backdrop, standee  # HTML at mm scale
  assets/ (logos, icons, approved photos, metadata sidecars)
  validators/  # contrast, font embed, bleed, forbidden words, export-control flags, logo clear-space
  llm/ BRAND.md, TEMPLATES.md (catalogue), prompts/, examples/
  cli/ `aid-make <type> content.json --brand iot --out dist/`
```

Flow: LLM reads `llm/BRAND.md` + the template's schema → emits `content.json` → CLI validates against schema (character limits per field to prevent overflow) → renders → preflight (pdffonts, pdfinfo, Ghostscript for CMYK/PDF/X-4 conversion with ICC; veraPDF for PDF/A) → returns file plus a lint report. Expose via MCP server (`list_templates`, `get_schema`, `render`) so any agent can call it. Brand switch is a single parameter (`--brand iot|defense`) selecting a token set and logo lockup. Humans can still edit: decks as real PPTX, and optional Canva/Figma mirror of key templates built from the same tokens.

For CMYK: keep brand CMYK values in tokens; for print-critical output pass through Ghostscript with FOGRA ICC profile, or use Prince with `color` mappings. Decide with the Indian printer before building [open question].

---

## 5. Imagery and AI image-generation guidelines

**How brands write them:** photography (subject, lighting, lens, colour grade, crop rules, what not to show), illustration (line weight, palette, geometry), 3D/render (material, background, camera angle, shadow style), data viz (palette, labelling). Each has a "do / don't" gallery, plus a prompt library.

**Tooling for consistency:**
| Tool | Mechanism | Use |
|---|---|---|
| Midjourney | `--sref` style reference, `--cref`/omni reference, personalisation codes | Moodboards, concept art |
| Adobe Firefly | Custom Models (train on your own approved images), Style Reference; commercial-safe training data | Best for IP-safe marketing imagery |
| FLUX (Black Forest Labs) | LoRA fine-tune on 20–50 approved images; self-hostable | Consistent product-world imagery; keep in-house for sensitive work |
| Ideogram | Strong typography in image, style codes | Posters with text (verify text) |
| Gemini / Imagen, GPT-image | Reference images and edit prompts; good for text and compositing | General use |

Prompt template to store per image type: `[subject] + [environment] + [camera/lens] + [lighting] + [palette tokens in words and hex] + [style ref ID] + [negative: no logos, no text, no people's faces, no readable labels]`. Always save prompt, model, seed and date in a sidecar `.md` (already a project convention). Generated product shots must not invent product features: composite real renders or photographs for hardware; use AI only for environment and background.

**Defence-specific rules** (inference from export-control and ethics practice; **confirm with AID legal/compliance**):
- Never depict real classified, restricted or customer-owned equipment, deployments or locations; use AID's own products, generic or abstracted platforms.
- Do not show performance specs, ranges, signatures or vulnerabilities not already cleared for public release; each defence asset carries a "cleared for public release" approval and date.
- Respect export-control regimes (India SCOMET, ITAR/EAR if US content, Wassenaar); tag assets with control classification in the DAM; block auto-publishing of tagged items.
- Avoid glorifying violence: no gore, no targeting crosshairs on people, no weapon-firing hero shots; emphasise protection, awareness, decision support and mission outcomes. Humans shown in operational roles, not casualties.
- No identifiable military personnel or insignia of real units without permission; avoid real-world conflict imagery.
- Mark AI-generated imagery internally; consider C2PA content credentials.
- Photography of real trials (Aero India, DefExpo): permission and security review before release.

---

## 6. Hardware brand expression

| Area | Guidance | Examples |
|---|---|---|
| CMF (colour, material, finish) | Define 2–3 hero colours (with Pantone/RAL/Munsell + a physical master chip), material list (aluminium anodised, PC/ABS, glass-filled nylon), textures (SPI/VDI grades), finish standards and tolerance (Delta E ≤ 1.5–2 vs master) [K]; separate palettes for IoT (approachable, tech) and Defense (matte, low-reflectance, camouflage-neutral: black, OD, sand, grey) | Particle (bright, small, consistent colour per product line), Ubiquiti (white/silver clean industrial look, product as brand), Teenage Engineering (strong colour, grid, exposed typography), Samsara (white/black rugged enclosures with simple mark), Garmin (rugged outdoor palette, front-face logo) |
| Logo on device | Fixed position (centre or corner), min size, method (laser etch, pad print, moulded, embossed), contrast rules, one logo only; Defense products may carry minimal or no marketing logo, per customer | |
| Nameplate / rating label | Typically laser-engraved metal or polyester label: model, part number, serial/QR (Data Matrix), power rating, manufacturer + address, date code, country of origin ("Made in India"), regulatory marks | |
| Regulatory marks | CE (min 5 mm high, proportions fixed), UKCA, FCC ID/statement (US), BIS/ISI and WPC ETA (India), RoHS, WEEE bin, IP rating, Wi-Fi/Bluetooth logos (licensed), E-waste symbol (India) [K] | |
| MIL-STD markings | MIL-STD-130 (item identification marking, UID/Data Matrix), MIL-STD-129 (shipping/packaging marking), MIL-STD-810 (environmental test, referenced in datasheets, claim only if tested), MIL-STD-461 (EMI), MIL-STD-1275 (power); Indian equivalents: DEF STAN / JSS 55555 environmental, NATO stock number (NSN) / NCAGE code where relevant [K] | |
| Packaging | Master carton marking, product box (system with colour-coded stripe per line), insert card, quick-start guide, anti-static; defence: rugged case (Pelican type), foam cut-out, desiccant, shipping marks per MIL-STD-129 | |
| Co-existence | IoT: "Signal" platform name appears on box and device UI; Defense: product names NAVIC and Lighthouse use a product word-mark under an AID Defense endorsement | |

Brand guideline should list: physical master samples, supplier spec sheets, artwork templates (vector, dieline per label size, e.g. 40×20, 60×30, 100×50 mm), and a "regulatory marks pack".

---

## 7. Governance and LLM-readability

- `BRAND.md` (≤ 300 lines) in plain language with rules numbered (R-01…), each with a pass/fail check where possible.
- Machine-readable: tokens JSON, template catalogue YAML, forbidden terms list, claims register (every spec claim traceable to test report).
- Human review gate for defence assets (compliance check box in the schema: `cleared_for_release: true`).
- Version everything in Git; changelog; templates pinned by version so old documents are reproducible.

---

## 8. Touchpoint matrix for AID

Priority: P0 = needed for launch / first customer, P1 = within 3 months, P2 = later.

| Touchpoint | Format | Key spec | Template tech | Priority |
|---|---|---|---|---|
| Website / web components | Responsive | Tokens, AA, reduced motion | Next.js (exists) | P0 |
| Product UI (Signal) | Web app | Shared tokens | React + same token build | P1 |
| Datasheet (IoT and Defense) | A4 portrait, 1–2 pp | PDF/X-4 or tagged PDF, embedded fonts | Paged.js (+Prince later), JSON schema | P0 |
| Presentation / pitch deck | 16:9 PPTX | Real masters, 2 brands | python-pptx on branded master; Marp for technical | P0 |
| Case study | A4, 2 pp | Numbers-first | Paged.js | P1 |
| Brochure | A4, 8–12 pp | Bleed 3 mm, CMYK | Paged.js → Ghostscript CMYK | P1 |
| Whitepaper | A4, 8–24 pp | Tagged PDF | Paged.js or Typst | P1 |
| Proposal / RFP response | A4, buyer structure | Export-control markings | Typst or Paged.js + Word fallback | P1 |
| Social posts | 1200×627, 1080×1350, 1080×1920 | Safe zones, brand tokens | Satori JSX | P0 |
| Open Graph | 1200×630 | | Satori in Next.js | P0 |
| Web banners | IAB sizes | ≤150 KB | HTML5 + Playwright export | P2 |
| Email signature | HTML ≤600 px | Text-based | Handlebars/HTML | P0 |
| Newsletter | 600 px | ≤102 KB | MJML / React Email | P2 |
| Event: roll-up | 850×2000 mm | 5–10 mm bleed, CMYK, 150 dpi | HTML at mm scale → PDF | P0 (Aero India/DefExpo) |
| Event: backdrop, standee, fascia | Per show manual | | HTML at mm scale | P1 |
| Pamphlet / flyer | A5 / DL | 3 mm bleed | Paged.js | P1 |
| Business cards, stationery | 85×55 mm, A4 | 3 mm bleed | Paged.js with CSV data merge | P1 |
| Labels / nameplates | Per SKU | Regulatory marks, Data Matrix | SVG templates + data merge; vector dielines | P1 (before first shipment: P0) |
| Packaging | Box + carton | Dielines, MIL-STD-129 where defence | Illustrator/Figma dieline masters + parametric artwork | P2 |
| CMF guide | PDF + physical samples | Pantone/RAL, Delta E | Manual document | P1 |
| Video intro / lower-third | 1080p, 9:16, alpha | 25/30 fps, safe zones | HyperFrames (or Remotion) | P1 |
| Manuals | A4/A5 + web | Single-source | Markdown/DITA → Paged.js/Typst | P2 |
| Image generation | Library | Prompt library, LoRA/Firefly model | Prompt YAML + sidecar logs | P0 (guidelines) |

---

## 9. Sources

- Print CSS tool comparison: https://print-css.rocks/tools and https://docraptor.com/compare/weasyprint (WeasyPrint subset of paged media; Prince from CSS Paged Media authors) [V]
- Self-hosted PDF generation comparison: https://www.pistack.xyz/posts/2026-06-25-self-hosted-pdf-document-generation-weasyprint-wkhtmltopdf-typst-pagedjs/ [V, not read in full]
- Social sizes 2026: https://sproutsocial.com/insights/social-media-image-sizes/ , https://www.kontentino.com/blog/the-ultimate-social-media-image-sizes-cheat-sheet-infographic , https://socialbee.com/blog/social-media-image-sizes/ [V]
- Canva Connect autofill: https://www.canva.dev/docs/connect/autofill-guide , https://www.canva.dev/docs/connect/api-reference/brand-templates/ [V]
- Not fetched, cited from knowledge for follow-up: https://www.ibm.com/design/language/ , https://carbondesignsystem.com , https://atlassian.design , https://brand.uber.com , https://design.spotify.com , https://pagedjs.org , https://www.princexml.com , https://typst.app , https://github.com/vercel/satori , https://www.remotion.dev , https://gitbrent.github.io/PptxGenJS , https://marp.app , https://sli.dev , https://mjml.io , https://styledictionary.com , https://tr.designtokens.org (DTCG), https://helpx.adobe.com/firefly (custom models), https://docs.midjourney.com (sref).

---

## 10. Open questions

1. Which printers does AID use (India vs UK/EU), and do they require PDF/X-1a or accept X-4? Which ICC profile?
2. Is Prince licence acceptable, or do we stay on Paged.js plus Ghostscript post-processing?
3. Do sales/field teams need to edit decks and datasheets in PowerPoint/Word/Canva, or is agent-generated, locked output acceptable?
4. Are the two brands visually one family (shared tokens, different accent/logo) or two systems? Decides the token structure and co-branding rules.
5. What export-control classification process and sign-off exists for defence collateral? Who owns "cleared for public release"?
6. Which defence customers mandate their own templates or documentation standards (S1000D, MIL-STD, DRDO/MoD formats)?
7. Which regulatory approvals does each hardware product hold (BIS, WPC, CE, FCC), and is MIL-STD-810/461 testing actually done? Claims register needed.
8. Exhibitor manuals for Aero India and DefExpo: booth size, fascia rules, and sponsor/co-exhibitor requirements.
9. Which fonts are licensed for print, Office and web use, and is a Hindi/Devanagari companion font needed?
10. Do we have a DAM, or start with Git plus metadata sidecars?
11. Image-generation policy: may AI imagery be used publicly in defence materials? Is self-hosted FLUX preferred for sensitivity?
12. Verify all social/IAB sizes against platform help centres at build time, since sources disagree.

## Next steps (and why)

1. Freeze the token schema (DTCG) for two brands, because every template depends on it.
2. Build the datasheet template (Paged.js + JSON schema) first, because it is the highest-value, most reused hardware collateral and proves the pipeline end to end.
3. Build the Satori social/OG templates and the branded PPTX master, because they are the cheapest wins and cover the other P0 items.
4. Answer open questions 1, 5 and 7 with AID operations/legal, because they gate print spec and defence publishing rules.
