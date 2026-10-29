# AID brand system + design system — working rules

Project: building, from scratch, one brand system and one end-to-end design system for AID, shared by
two separate brands of Inordinate Industrial Innovation Pvt Ltd — **AID IoT** (IoT hardware, software and combined solutions) and **AID Defence** (specialised
defence products such as NAVIC and the Lighthouse solution built on it). The output is a versioned
"digital library" that people and LLM agents read to produce on-brand work: websites, product UI,
banners, brochures, pamphlets, datasheets, presentations, social, print.
Owner: product/design lead (the user), sole owner of brand releases and versioning. Approver: CEO (technical, non-designer).

The previous website rebuild was removed on 2026-10-27; it is recoverable from git tag `archive/website-v3`.
aid-iot.com is a domain reference only — not a design or positioning reference.

## Read this first, in this order
1. `docs/CONTEXT.md` — current state (rewritten every session; ≤150 lines).
2. `docs/NEXT.md` — the next 1–3 steps and why.
3. `docs/DECISIONS.md` — append-only decision log; scan the last 10 entries only.
Do NOT load `docs/research/*` unless a task needs the evidence; they are large reports.

## Non-negotiables for the system
- One source of truth: brand changes (logo, colour, type) are made in one place and propagate everywhere.
- One engine, separate identities: AID IoT and AID Defence have their own visuals, imagery and voice on a shared core (type family, structure, components); each brand exports as a self-contained package for its own repo.
- Spell it "AID Defence" (Indian usage).
- LLM-readable: every rule is written as text an agent can follow, with rationale and do/don't examples.
- Keep the current logo (`assets/brand/aid-iot-mark.*`) until the team decides otherwise.

## Repo layout: packages vs workspace
- `packages/<name>/` (and later `apps/<name>/`): self-contained, shareable systems. Each has its own `AGENTS.md`,
  `README.md`, `package.json`, `VERSION`, `CHANGELOG.md`, and never points at a file outside its folder
  (the brand library's `npm run check` enforces it). Today: `packages/brand-library/`.
- Root (`docs/`, `assets/`, `scripts/`, `graphify-out/`): the workspace. Research, decisions, state; never shipped.
- New project = new folder that follows the same contract. Contract and sharing steps: `README.md`.

## Documentation discipline
- End of every working session: rewrite `docs/CONTEXT.md`, rewrite `docs/NEXT.md`, and update
  `docs/DECISIONS.md` (open items under "Open"; decided items appended to "Log").
- After any change to DECISIONS.md: run `npm run decisions` and republish `docs/decisions.html` to the
  decision tracker artifact (https://claude.ai/artifact/XJfR1n8t9czc79kuS1ARhA).
- Never paste research into CONTEXT; link to `docs/research/` instead.
- Every deliverable ends with "Next steps" and the reason each step is next.

## New machine or cloud session
- Run `bash scripts/setup.sh` once (installs the graphify CLI and npm dependencies).
- After changing docs or code, run `graphify update .` and commit `graphify-out/`.

## Conventions
- British English. Plain language first, engineering detail one level down.
- Accessibility: WCAG 2.2 AA minimum, 44px targets, reduced-motion states designed.
- Commit small and often; commit messages say what and why. Push to GitHub when each piece of work is done.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- When graphify-out/graph.json exists, run `graphify query "<question>"` before your first grep, search or source-file read for a codebase question, and put this rule in every subagent prompt that explores code. Read raw files only for lines the graph or an earlier read already located. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
- A committed graphify-out/graph.json is rewritten whole on every build, so a large diff to it in a pull request is expected. Do not flag it as churn or suggest skipping the graph rebuild or its hooks.
