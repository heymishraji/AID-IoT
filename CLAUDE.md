# AID brand system + design system — working rules

Project: building, from scratch, one brand system and one end-to-end design system for AID, shared by
two brands — **AID IoT** (IoT hardware, software and combined solutions) and **AID Defense** (specialised
defence products such as NAVIC and the Lighthouse solution built on it). The output is a versioned
"digital library" that people and LLM agents read to produce on-brand work: websites, product UI,
banners, brochures, pamphlets, datasheets, presentations, social, print.
Owner: Product/design lead at AID (the user). Approver: CEO (technical, non-designer).

The previous website rebuild was removed on 2026-10-27; it is recoverable from git tag `archive/website-v3`.
aid-iot.com is a domain reference only — not a design or positioning reference.

## Read this first, in this order
1. `docs/CONTEXT.md` — current state (rewritten every session; ≤150 lines).
2. `docs/NEXT.md` — the next 1–3 steps and why.
3. `docs/DECISIONS.md` — append-only decision log; scan the last 10 entries only.
Do NOT load `docs/research/*` unless a task needs the evidence; they are large reports.

## Non-negotiables for the system
- One source of truth: brand changes (logo, colour, type) are made in one place and propagate everywhere.
- Multi-brand by design: parent + AID IoT + AID Defense are themes of one system, not forks.
- LLM-readable: every rule is written as text an agent can follow, with rationale and do/don't examples.
- Keep the current logo (`assets/brand/aid-iot-mark.*`) until the team decides otherwise.

## Documentation discipline
- End of every working session: rewrite `docs/CONTEXT.md`, rewrite `docs/NEXT.md`,
  append to `docs/DECISIONS.md` (one line: date · decision · why · alternatives rejected).
- Never paste research into CONTEXT; link to `docs/research/` instead.
- Every deliverable ends with "Next steps" and the reason each step is next.

## Conventions
- British English. Plain language first, engineering detail one level down.
- Accessibility: WCAG 2.2 AA minimum, 44px targets, reduced-motion states designed.
- Commit small and often; commit messages say what and why.
