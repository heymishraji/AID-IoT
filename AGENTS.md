# AGENTS.md · AID workspace

This repo holds self-contained **packages** plus the **workspace** that produced them. Pick the package your
task is about and read its own `AGENTS.md`; it is written to work without anything else in this repo.

## Packages
- `packages/brand-library/`: brand + design system (foundations, AID IoT, AID Defence, parent). Use it for any
  on-brand output: websites, product UI, decks, datasheets, social, print.

## Workspace (internal, not shipped with packages)
- `docs/CONTEXT.md` (current state) → `docs/NEXT.md` → last 10 entries of `docs/DECISIONS.md`.
- `docs/PRODUCT-FACTS.md`: confirmed product names and what they are. Overrides the research.
- `docs/research/`: large evidence reports; load only the one a task needs.
- `docs/brand/`: discovery answers, parent-company rules, strategy contrast.

## Rules
- Never let a package depend on a workspace file; inline the rule or cite it as "AID workspace".
- New project = new folder under `packages/` or `apps/`, with its own `AGENTS.md`, `README.md`, `package.json`.
- Never mix AID IoT and AID Defence in one output. Spell it "AID Defence". British English.
- Before handing back library work: `npm run check` (runs the brand library's checks).

## Commands (from the repo root)
- `npm run build` / `npm run check` / `npm run export -- --brand <id> --out <dir>`: brand library.
- `npm run decisions`: regenerate `docs/decisions.html` from `docs/DECISIONS.md`.
- `bash scripts/setup.sh`: first run on a new machine (graphify CLI + each package's dependencies).
