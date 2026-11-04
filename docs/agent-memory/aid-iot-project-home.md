---
name: aid-iot-project-home
description: "Where the AID brand system + design system project lives (repo path, remote, docs to read first, archive tag)"
metadata:
  node_type: memory
  type: project
  originSessionId: d89e30f3-003a-4eee-a268-a1e13390fdac
  modified: 2026-10-27T13:20:04.984Z
---

Since 2026-10-27 the repo at `/Users/amishra12/AI Experiments/AID-IOT Project` (remote
`git@github.com:heymishraji/AID-IoT.git` since 2026-10-29; the old aid-iot-website repo no longer exists) is a fresh start: a brand system + end-to-end design
system for parent AID and two brands, AID IoT and AID Defense (products e.g. NAVIC; solution Lighthouse
under NAVIC), built as an LLM-readable library. The earlier website rebuild was deleted at the user's
request and is recoverable from git tag `archive/website-v3`. Only the logo (`assets/brand/aid-iot-mark.*`)
was kept. aid-iot.com is a domain reference only, not a design/positioning reference.

Layout since 2026-10-29: self-contained shareable packages under `packages/` (first: `packages/brand-library/`),
future apps under `packages/` or `apps/`; the root (`docs/`, `assets/`, `scripts/`) is the internal workspace.
The user wants every system plug-and-play for other teams' LLMs, so a package never points outside its folder.

Figma work goes in team Mishraji's Workspace (the user's only Pro plan, team::1380963047843410530). Identity
round 1 file: https://www.figma.com/design/IxAZrYXdTZpYgPzZD8mWSV

**Why:** the user wants one robust, rebrand-proof system that any AI agent can use to produce on-brand
websites, product UI and collateral.

**How to apply:** read `CLAUDE.md` → `docs/CONTEXT.md` → `docs/NEXT.md` → last 10 lines of
`docs/DECISIONS.md`; never auto-load `docs/research/`. Old artifact links (audit, blueprint, direction
boards) belong to the archived website work. Related: [[aid-iot-working-style]].
