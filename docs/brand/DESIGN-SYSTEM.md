# AID-IoT design system — structure, stack, vocabulary
_v0.2 · 2026-09-16 · replaces the hand-rolled CSS of prototypes/a,b,c_

## Why the prototypes looked wrong (diagnosis, so it does not recur)
1. No system: per-page CSS, arbitrary sizes, four different card styles, spacing by eye.
2. Every "AI tell" the frontend-design skill lists: tracked ALL-CAPS eyebrows, "A · B · C" meta strings, monospace for small labels, "→" on links, a single accent word in headlines, 01/02/03 markers on non-sequences, fade-up entrance on every section, hover on every card, identical rounded cards.
3. Copy assembled from feature keywords, no narrative — fixed in docs/copy/.
4. Imagery of mixed provenance at mixed quality with no crop/treatment rule.

## The structure (five layers; nothing skips a layer)
```
Tokens        → colour, type scale, space, radius, elevation, motion (CSS variables; three theme files A/B/C)
Primitives    → Button, Link, Input, Badge, Card, Dialog, Tabs, Accordion, Tooltip, Nav   (shadcn/ui, Tailwind v4)
Sections      → Hero, ProofBar, Scenes, Outcomes, Mechanism, Steps, Results, PlatformPanel, FAQ, CTA, Footer
Templates     → Home, Solution, Product, Software, Service, Hub, CaseStudy, Company/Contact/Legal
Content model → typed data per template (CMS or MDX); a page is data + template, never hand-built
```
The **same sections and templates serve all three visual directions**. A direction = a token file + a hero signature component + an imagery treatment. Choosing A/B/C never changes structure.

## Stack (decided from the component-library research)
| Layer | Choice | Why (evidence) |
|---|---|---|
| Framework | Next.js 15 App Router, TypeScript | Already the stack; SSR keeps copy crawlable; used by Figure, Formlabs, Rivian, Linear, Stripe |
| Styling + tokens | Tailwind v4 (CSS-first `@theme`), tokens as CSS variables | Tokens live in one file; three theme files swap the world |
| Primitives | **shadcn/ui** (Radix) | Ecosystem standard, official agent skill + MCP, copy-paste so we own the code |
| Marketing sections | **Tailark** (free tier, shadcn registry) + **ShadcnBlocks** if we need volume | "Best marketing block collection built on shadcn" (Untitled UI review); composition over improvisation |
| Motion components | **Motion Primitives** (TextEffect, InView, AnimatedNumber, ScrollProgress, Tilt) + **Magic UI** (Marquee, NumberTicker, AnimatedBeam, BorderBeam) | Both shadcn-compatible; Magic UI ships an MCP + AGENTS.md |
| Scroll-driven showcase | **Aceternity UI** free components (Container Scroll, Sticky Scroll Reveal, Tracing Beam, Macbook Scroll) as reference patterns; GSAP ScrollTrigger for choreography; Lenis for smooth scroll | The exact patterns judges reward on Awwwards; GSAP is free incl. ScrollTrigger |
| 3D | React Three Fiber + drei; glTF via gltf-transform (Draco + KTX2) | Winning pattern; adaptive quality via drei PerformanceMonitor |
| UI animation | **Motion** (motion.dev) | What Motion Primitives and Magic UI are built on |
| Icons | Lucide | Already used by AID-IoT; one stroke weight |
| Type | Fontshare (Indian Type Foundry) families per direction; Martian Mono only for tabular data | Distinctive, free, Indian-foundry story |
| Content | MDX collections now → headless CMS (Sanity/Payload) at Phase 3 | Templates enforced by schema |
| QA | Lighthouse CI ≥ 90 mobile · axe 0 serious · Playwright 390/1440 shots · heuristic review with apple-design + ui-ux-pro-max checklist after every screen | Keeps the audit scores from regressing |

Skills installed on the build machine (`~/.claude/skills`): frontend-design (Anthropic), copywriting · copy-editing · product-marketing · site-architecture · cro (Corey Haines marketingskills), ui-ux-pro-max (checklist/GSAP presets only), apple-design (HIG review). Install list is in `docs/SKILLS.md`.

## Tokens (shared shape; values per direction in `site/src/styles/theme-{a,b,c}.css`)
- **Colour roles:** `--bg`, `--bg-2`, `--fg`, `--fg-2`, `--muted`, `--line`, `--primary`, `--on-primary`, `--accent`, `--on-accent`, `--panel`, `--on-panel`, `--ok`, `--warn`. Every text/ground pair ≥ 4.5:1. One accent per direction; semantic ok/warn are not accents.
- **Type scale (Elements of Typographic Style, ratio 1.25 from 17px):** 17 · 21 · 27 · 34 · 42 · 53 · 66 · 82. Body 17/1.55, max 72ch. Display leading 0.98–1.05, tracking −0.02 to −0.03em. One or two families; if two, clearly distinct roles.
- **Space:** 4-base scale 4·8·12·16·24·32·48·64·96·128. Section rhythm 96 desktop / 64 mobile; more space above a heading than below.
- **Radius:** 0 / 4 / 8 / 12 (direction-specific; B uses 0 everywhere). One radius per role, not one radius on everything.
- **Elevation:** none by default; one shadow role for floating panels only.
- **Motion:** durations 150 / 250 / 400 / 700ms; easing `cubic-bezier(.2,.7,.2,1)`; one orchestrated moment per page (the hero signature); reveals only where they show what changed; `prefers-reduced-motion` renders final states.

## Section vocabulary (maps 1:1 to the story in docs/copy/01-homepage.md)
| Section | Job in the story | Built from |
|---|---|---|
| `Hero` | Discomfort → vision → path; hosts the direction's signature (A: ExplodedDevice, B: LiveDiagram, C: LedgerCrossfade) | custom + Motion Primitives TextEffect |
| `ProofBar` | Names that make the claim believable | Magic UI Marquee or static row |
| `Scenes` | "Three ways you find out today" — the reader's discomfort in three vignettes | Tailark feature/content block, photo + short text |
| `Outcomes` | "What changes" — four outcomes with one product each | Tailark features grid; no numbered markers (not a sequence) |
| `Mechanism` | "One team, sensor to screen" — the vendor-gap story + the layer stack | custom diagram (SVG/R3F), Sticky Scroll Reveal pattern |
| `Steps` | "How it starts" — this IS a sequence, so it may be numbered | Tailark steps block |
| `Results` | Numbers + quote | Magic UI NumberTicker, Tailark stats + testimonial |
| `PlatformPanel` | Signal, shown as real UI | custom panel; recorded UI later |
| `Catalogue` | Products grouped by job (evaluators' path) | Tailark features list / cards |
| `FAQ` | The seven executive questions | shadcn Accordion |
| `CTA` | The ask + form | shadcn Form + Tailark CTA block |
| `Footer` | Mirrors the five-branch nav | Tailark footer |

## Rules (from frontend-design, apple-design HIG, ui-ux-pro-max)
- Structure is information: borders, numbering, labels encode meaning or are removed.
- No tracked-caps eyebrows; sentence-case section labels only when they add information.
- No "→" on links; no middle-dot meta strings; monospace only for genuinely tabular data.
- Headlines are whole thoughts; no single accented word.
- Cards only for things a reader chooses between; sections are not cards.
- One memorable element per page; everything else quiet.
- 44px targets; visible focus; labels above inputs; errors beside fields; reserved image space (CLS < 0.1); WebP/AVIF; no emoji as icons.
- After every screen: heuristic pass (Nielsen 10) + HIG review via apple-design; record the score in docs/QA.md.
