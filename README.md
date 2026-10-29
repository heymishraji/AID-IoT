# AID workspace

Working repository for AID IoT and AID Defence (brands of Inordinate Industrial Innovation Private Limited).
It holds **packages** (self-contained systems you can hand to anyone) and the **workspace** (research,
decisions and project state that produced them).

## What is here

| Folder | What it is | Share it? |
|---|---|---|
| `packages/brand-library/` | Brand + design system: shared foundations (tokens, type, spacing, components) and the AID IoT, AID Defence and parent brands. v0.0.1 skeleton, placeholder values. | Yes, as is, or one brand at a time (below) |
| `docs/` | Workspace: `CONTEXT.md` (state), `NEXT.md`, `DECISIONS.md` + `decisions.html`, `research/`, `brand/` discovery notes | Internal |
| `assets/` | Source files (original logo, reference and generated imagery) before they go into a package | Internal |
| `scripts/` | Workspace tools: `setup.sh` (new machine), `decisions-page.mjs` | Internal |
| `graphify-out/` | Knowledge graph of the whole repo, for agents (`graphify query "…"`) | Internal |

Future work (the AID IoT website, Lighthouse UI, …) goes in its own folder under `packages/` or `apps/`,
following the same contract.

## The plug-and-play contract (every package)
1. **One folder, nothing outside it.** No links or paths that leave the folder. Workspace files may be cited
   as provenance only when the text says they live in the AID workspace. `npm run check` enforces this.
2. **Agents can start cold.** `AGENTS.md` (≤ 40 lines: what it is, rules, commands) and `README.md` at the
   folder root; `INDEX.md` ("need X → read Y") when the package has more than a few files.
3. **Runs on its own.** Its own `package.json`, `VERSION` and `CHANGELOG.md`; `npm install && npm run build
   && npm run check` works in a copy of the folder.
4. **Consumes, never copies.** An app uses the brand library through its generated output or an export,
   never by pasting token values.

## Share something
- **Whole brand library** (foundations + every brand): copy `packages/brand-library/`, or hand someone that
  folder's link on GitHub. In the copy: `npm install && npm run build`.
- **One brand only**, with nothing from the other brand: `npm run export -- --brand aid-iot --out ../aid-iot-brand`
  (or `aid-defence`). The export fails if any other brand's name or colour leaks into it.
- Their LLM starts at the package's `AGENTS.md`; Claude Code, Codex, ChatGPT and Cursor all read that file.

## Start here
- People: `docs/CONTEXT.md`, then `docs/NEXT.md`. Decisions: `docs/decisions.html`.
- Agents: `AGENTS.md`. Claude Code also loads `CLAUDE.md`.
- New machine or cloud session: `bash scripts/setup.sh`.
- Previous website work: git tag `archive/website-v3`.
