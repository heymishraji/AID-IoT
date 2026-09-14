# AID-IoT website rebuild — working rules

Project: rebuilding https://www.aid-iot.com from scratch as a modern, motion-led site that sells
AID-IoT as an end-to-end IoT company (hardware + firmware + software platform "Signal" + cloud + manufacturing).
Owner: Product/design lead at AID-IoT (the user). Approver: CEO (technical, non-designer) — sees the
finished build, not intermediate questions.

## Read this first, in this order (≈150 lines total)
1. `docs/CONTEXT.md` — current state of the project (rewritten every session; never grows).
2. `docs/NEXT.md` — the next 1–3 steps and why they are the right steps.
3. `docs/DECISIONS.md` — append-only decision log; scan the last 10 entries only.
Do NOT load `docs/research/*` unless a task needs the evidence; they are large reports.

## Documentation discipline (keeps context small)
- End of every working session: rewrite `docs/CONTEXT.md` (≤ 150 lines), rewrite `docs/NEXT.md`,
  append to `docs/DECISIONS.md` (one line per decision: date · decision · why · alternatives rejected).
- Never paste research into CONTEXT; link to the file in `docs/research/` instead.
- Brand/visual rules live in `docs/brand/DESIGN.md` once a direction is chosen; product truth in `docs/brand/PRODUCT.md`.
- Every deliverable ends with "Next steps" and the reason each step is next.

## Repo layout
- `docs/` — CONTEXT, NEXT, DECISIONS, brand/, research/ (audit, blueprint, crawl + benchmark JSON)
- `design/canvases/<nn-name>/` — design-canvas working files (`*.dc.html`, `canvas.json`, `build.js`);
  re-seedable with the Claude Design skill from any machine.
- `assets/` — brand mark, reference photos, generated imagery (with the prompt used, in a sidecar `.md`)
- `site/` — the Next.js application (created in Phase 3)

## Conventions
- Copy: outcome first, plain language for non-IT executives; engineering detail one level down. British English.
- Design: no category defaults (navy + orange glow + device on a sweep + bento). Motion explains a mechanism.
- Accessibility: AA contrast, 44px targets, reduced-motion states designed, HTML crawlable.
- Commit small and often; commit messages say what and why.
