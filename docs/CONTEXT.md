# Project context — AID-IoT website rebuild
_Last rewritten: 2026-09-15. Keep ≤ 150 lines. Rewrite, don't append._

## What we are building
A new aid-iot.com, from scratch, that sells AID-IoT as an end-to-end IoT company: devices +
firmware + the **Signal** software platform + cloud + manufacturing in India. Audience first:
non-IT executives (CEO/COO/plant & depot heads), operations owners, defence procurement; then
technical evaluators, builder clients, educators, store shoppers, existing customers, talent.
Goal for this phase: a complete, working, motion-led site built here, then shown to the CEO.

## Where we are (phase)
Phase 0→1. The real build has started in `site/` (Next.js 15 + Tailwind v4 + shadcn/ui + Motion + GSAP + Lenis + R3F)
World A locked. One component system; B/C tokens kept in theme.css for reference only.
Run: `cd site && npm run dev` → http://localhost:3311. Homepage complete with story-led copy (docs/copy/).
Full flow v3 built: Home, /solutions/fleet-and-fuel, /products/iiot-bridge, /software/signal, /services, /company, /contact, 404 — one section vocabulary, one accent, neutral icon tiles, signal-path hero. Static export (`npm run build` → site/out; `npm run preview` → :3311). GitHub Pages workflow ready (.github/workflows/pages.yml). prototypes/ and design/canvases/ are frozen anti-references.
GitHub repo still to be created by the user (remote set to git@github.com:heymishraji/aid-iot-website.git).

## Fixed decisions (see docs/DECISIONS.md for why)
- Architecture: L1 = Solutions · Products · Software · Services · Company + Store / Log in / Talk to an engineer.
  L2 in mega-menu + hubs; L3 (specs, modules, courses, case studies) never in the header.
- Story spine: Connect · Communicate · Automate · Scale. Platform: Signal.
- Brand: keep the tri-colour mark and orange; one accent; AA contrast; no category-default look.
- Motion: explains a mechanism; one signature moment per page; budgets: ≤1.5 MB/page + ≤2 MB per glTF;
  60 fps on iPhone 12-class; reduced-motion designed; no loaders/enter screens/scroll-jack.
- Copy: outcome → who it's for → how it works (plain) → specs (engineers). British English.
- Assets: no CAD confirmed → reference/self-made 3D and generated environments for now (prompts in blueprint §09).

## Key evidence (do not load unless needed)
- docs/research/01-audit.html — heuristic + technical audit of the current site (13/32, 7/20; 32 issues).
- docs/research/02-blueprint.html — benchmarks (27 sites), audiences, 3-level IA, 3 directions, motion
  primitives, template system, content prompts, stack, phases.
- docs/research/*.json — crawl of current site, axe/perf data, benchmark data.
- design/canvases/01-redesign-v1 — first mockups (anti-reference: the generic rut).

## Directions on the table (working prototypes in prototypes/)
- A "Open the device" (recommended): device opens on scroll into the six layers AID-IoT makes; signal trace spine; committed orange field on cool off-white; Cabinet Grotesk + Switzer + Martian Mono.
- B "Panel room": control-room mimic diagram, live values, hover nodes, pinned walk-the-line; paper + ink + one live green; Khand + Ranade + Martian Mono.
- C "Field log": documentary photography with parallax chapters; paper register → Signal ledger crossfade; Zodiak + Author + Martian Mono.
Typography rule: no AI-default faces (Inter, Geist, Manrope, Space Grotesk, Fraunces, Playfair, DM Sans, Plus Jakarta, Instrument Sans). Prefer Indian Type Foundry (Fontshare) families.

## Design system
See docs/brand/DESIGN-SYSTEM.md: tokens → primitives (shadcn) → sections → templates → content model. Rules: no caps eyebrows, no "·" strings, no "→", no single accented word, numbers only for real sequences, one motion moment per page. QA after every screen → docs/QA.md (Home: 25/32).

## Skills
docs/SKILLS.md — frontend-design, copywriting/copy-editing/product-marketing/site-architecture/cro, ui-ux-pro-max (checklist), apple-design (HIG). `.claude/product-marketing.md` is the shared context the copy skills read.

## Motion primitives (to build once; blueprint §07)
ExplodedDevice · SignalTrace · ScrollChapter · InstrumentPanel · FlowDiagram · Turntable · Reveal · PageTransition.

## Templates (blueprint §08)
Home · Solution (outcome/sector) · Product · Software · Service · Hub · Case study · Company/Contact/Legal.

## Stack (planned)
Next.js App Router + TS · React Three Fiber + drei (glTF Draco/KTX2) · GSAP ScrollTrigger · Lenis ·
Framer Motion · Rive · CSS-variable tokens → Tailwind · headless CMS (Sanity/Payload) · Vercel/Cloudflare ·
CI: Lighthouse ≥ 90 mobile, axe 0 serious, Playwright screenshots 390/1440.

## Open questions
- CAD files for the IIoT Bridge and other products (unconfirmed).
- Logo permissions (MoD, Indian Army, IIT Delhi/Jammu, BigBasket, KHub, JetOne, Precision).
- Three case studies with real numbers.

## Tooling notes
- Corporate proxy blocks some downloads (Playwright Chromium, impeccable binary); use `channel: 'chrome'` with Playwright.
- gh CLI cannot be downloaded through the proxy; SSH push to GitHub works as heymishraji (repo must be created in the GitHub UI).
- Design canvases: re-seed from `design/canvases/<name>/` with the Claude Design skill helper (`build.js` regenerates the artboards; `canvas.json` is the layout).
