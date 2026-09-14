# Decision log (append-only; one line each: date · decision · why · alternatives rejected)

- 2026-09-12 · Audit the current site before designing · to ground the rebuild in evidence (heuristic 13/32, technical 7/20) · redesign-by-taste
- 2026-09-12 · Keep the existing tri-colour mark and orange; systematise rather than rebrand · government clients recognise it; lowest risk · refresh mark; full rebrand
- 2026-09-12 · Keep the current product-page narrative arc (challenge → how we help → specs → use cases) and add an outcome layer above it · it is the strongest content on the site · full rewrite
- 2026-09-14 · First mockups (design/canvases/01-redesign-v1) judged generic (category default) · they executed the navy/orange/device-on-sweep rut · treated as anti-reference, kept for record
- 2026-09-14 · Architecture: 5 branches (Solutions · Products · Software · Services · Company) + Store / Log in / Talk to an engineer; 3 levels; L3 never in header · matches how visitors 1–3 think; benchmarks (Samsara, Skydio, Anduril) · flat product list; "Industries" label
- 2026-09-14 · Story spine = Connect · Communicate · Automate · Scale (the CEO's vision, verbatim) · makes the vision navigable and provable · generic "end-to-end IoT"
- 2026-09-14 · Motion must explain a mechanism; no loaders, enter screens, audio gates or scroll-jacking · Awwwards data + B2B audience · agency-style theatrics
- 2026-09-15 · Platform name: **Signal** · physical word non-IT readers understand; names what customers care about; gives the site its visual spine · Loop, Grid
- 2026-09-15 · Show all three visual directions (A Open the device · B Panel room · C Field log) as boards before choosing · the user wants to see, not read, the options · pick A directly
- 2026-09-15 · CAD availability unconfirmed → use reference models/photos from the internet or self-made 3D for the build; swap for real CAD later · unblocks the end-to-end build · wait for CAD
- 2026-09-15 · Build the whole site end to end before CEO review · CEO is technical, time-poor and gives better feedback on a working thing · intermittent approvals
- 2026-09-15 · Documentation = CONTEXT (rewritten, ≤150 lines) + NEXT + DECISIONS (append-only) + research/ (never auto-loaded) · keeps a fresh chat's context small; portable via GitHub · single growing log
- 2026-09-15 · Project lives in a GitHub repo (heymishraji/aid-iot-website) with docs, design canvases, assets and later the Next.js site · work from any machine · local-only
- 2026-09-15 · Direction boards built as first viewport + 3 scroll stops of the signature interaction + 4 story beats, at 1440 and 390 · judge the idea/world/voice, not polish · full-page mockups per direction
- 2026-09-15 · Direction A uses layered isometric SVG as a stand-in for the 3D model; B is pure SVG; C uses a generated-gradient photo placeholder · no CAD/photos yet; keeps the choice about the idea · wait for assets
