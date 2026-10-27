# 04 · LLM-friendly design systems, machine-readable formats and agent skills

Research date: 27 October 2026. The field changes month to month, so every claim below carries a source and a confidence marker:
**[V]** = verified on the vendor's own page or repository during this research; **[S]** = from secondary coverage only (blogs, directories, mirrors), so check before you depend on it.

Companion reports (not repeated here): token tiers, DTCG pipeline and multi-brand theming → `03-token-architecture-multibrand.md`; collateral specs, print and AI image-generation rules → `06-collateral-and-templates.md`; AID naming and landscape → `05-domain-and-landscape.md`. Confirmed product facts → `../PRODUCT-FACTS.md`.

---

## 0. The short version

1. **There is no single standard. There is a well-understood stack**, and every serious player now lines up behind it:
   - **Tokens** as W3C DTCG JSON (stable 2025.10) → the exact values.
   - **`DESIGN.md`** (Google Labs, open-sourced April 2026) → tokens in YAML front matter plus prose explaining *why*. It has a linter and exports to Tailwind and DTCG. This is the closest thing to a portable "brand file for agents".
   - **`AGENTS.md` / `CLAUDE.md` / `.cursor/rules` / `.github/copilot-instructions.md`** → always-on repo instructions that point agents at the brand.
   - **Agent Skills (`SKILL.md`)** → loaded on demand, with progressive disclosure. It is now an open standard (agentskills.io) used by Claude, Codex, Cursor, Copilot, Gemini CLI and others. This is how you package "make an AID brochure" as a repeatable capability.
   - **MCP servers** → live, queryable access to components, tokens and docs (Primer, Carbon, Storybook, Figma, zeroheight, Supernova, Knapsack, Frontify, Canva, shadcn).
   - **`llms.txt` / `llms-full.txt`** → a crawlable index of the hosted docs for tools that browse rather than mount a repo.
2. **Generation tools increasingly accept a design system as an input.** Claude Design (GitHub repo, files or uploads), v0 (a saved "skill" pointing at your system), Lovable (repo, npm or `system.md`), Figma Make (`guidelines/Guidelines.md`), Stitch (`DESIGN.md`), Canva (Brand Kit via MCP), Gamma (theme from `.pptx`) and Firefly (custom style models). **No tool takes the same file**, so AID needs **one source and generated adapters**.
3. **Enforcement is moving inside the tools.** Lovable scans every generation for raw colour literals and re-implemented components. Claude Design "checks its output against the design system". Primer's MCP ships `lint_css`, and zeroheight's MCP has a hard-coded-value lint tool. AID should copy this: deterministic lint first, an LLM judge for voice and composition second.
4. **For AID specifically**, the recommendation is: **one git repo (`aid-brand`) as the source of truth → build step emits DESIGN.md per brand, DTCG JSON, CSS/Tailwind, shadcn registry, llms.txt, and a packaged skill → a thin MCP server later**. See §8.

---

## 1. Formats and conventions for AI-readable design systems

### 1.1 `DESIGN.md` (Google Labs / Stitch) [V]

- Repo: https://github.com/google-labs-code/design.md · status `alpha`, open-sourced 21 April 2026 ([coverage](https://pasqualepillitteri.it/en/news/1251/google-stitch-design-md-open-source-spec-2026) [S]).
- **Two layers.** The YAML tokens (front matter, or ```yaml blocks per section) are the normative values. The Markdown prose explains how to apply them. In the spec's words: "Tokens give agents exact values. Prose tells them *why* those values exist."
- **Top-level token keys:** `version, name, description, omitted, colors, typography, rounded, spacing, components`. References use `{colors.primary}`. Colours accept any CSS colour, including `oklch()`.
- **Canonical section order** (all optional, but present sections must follow this order, and duplicate headings are an error): Overview (alias *Brand & Style*) → Colors → Typography → Layout → Elevation & Depth → Shapes → Components → Do's and Don'ts. Unknown headings are kept, so AID can add *Voice*, *Imagery* and *Motion*.
- **CLI** (`npx @google/design.md …`):
  - `lint`: broken references and WCAG AA 4.5:1 contrast; exits with code 1 on errors, so it can run in CI.
  - `diff before after`: token-level regressions, which is useful for rebrand PRs.
  - `export --format json-tailwind | css-tailwind | dtcg`.
  - `spec --rules`.

```markdown
---
name: AID IoT
colors:
  ink: "#0E1116"
  signal: "oklch(68% 0.16 160)"
typography:
  display-lg: { fontFamily: "…", fontSize: 4rem, letterSpacing: -0.02em }
components:
  button-primary: { backgroundColor: "{colors.signal}", textColor: "{colors.ink}", rounded: 8px }
---
## Overview
Engineering-led, calm, evidence first…
## Do's and Don'ts
- Don't: navy + orange glow, device on a sweep, bento grids.
```

- **Ecosystem:** [VoltAgent/awesome-design-md](https://github.com/voltagent/awesome-design-md) (MIT) collects about 70 DESIGN.md files reverse-engineered from real sites (Stripe, Linear, Claude and others), each with `preview.html` and `preview-dark.html`, browsable at getdesign.md [S on counts]. These are useful as **format exemplars**, not as AID inspiration. Stitch's MCP server and its Bolt hand-off carry DESIGN.md along ([Bolt blog](https://bolt.new/blog/bolt-stitch-integration) [S]).
- **Verdict for AID:** adopt DESIGN.md as the **agent-facing brand summary**, with one per brand (`aid`, `aid-iot`, `aid-defense`). **Generate its YAML from DTCG** rather than hand-editing it, so it never drifts.

### 1.2 Design Tokens (W3C DTCG 2025.10) [V]

- First stable version published 28 October 2025: https://www.designtokens.org/tr/2025.10/ ([announcement](https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/)). It covers theming and multi-brand support, Display P3 and OKLCH, and aliases. A separate **resolver** module (`.resolver.json`) composes sets and modifiers, which is where brand and mode switching lives.
- Style Dictionary v5 and Tokens Studio read 2025.10. Resolver support is still incomplete in some tools ([zeroheight guide](https://help.zeroheight.com/hc/en-us/articles/48049028236187) [S]). Detail is in report 03.
- **Why it matters for LLMs:** DTCG `$description` fields are the cheapest place to put intent ("use only for live-signal states"). Agents read them via Figma variables, the Primer-style `find_tokens` tool, or straight from JSON.

### 1.3 Always-on instruction files [V/S]

| File | Read by | Scope / notes |
|---|---|---|
| `AGENTS.md` | Codex, Cursor, Copilot, Amp, Jules, Zed, Aider and ~20 others ([comparison](https://blog.buildbetter.ai/agents-md-vs-cursorrules-vs-claude-skills-2026-comparison/) [S]) | Cross-tool default. Keep it short and use it as a router. |
| `CLAUDE.md` | Claude Code | Can `@import` other files. AID already uses this pattern. |
| `.cursor/rules/*.mdc` | Cursor | Glob-scoped rules. Cursor also loads `.claude/skills` and `.codex/skills` ([Cursor docs](https://cursor.com/docs/skills) [V]). |
| `.github/copilot-instructions.md` + `.github/instructions/*.instructions.md` (`applyTo:` glob) + `.github/skills/<name>/SKILL.md` | GitHub Copilot ([docs](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions) [V]) | Path-scoped instructions are the right home for "in `*.tsx` use tokens only". |
| `guidelines/Guidelines.md` | Figma Make ([Figma dev docs](https://developers.figma.com/docs/code/write-design-system-guidelines/) [V]) | Make reads it first. Sub-files per component or token set. |
| `system.md` | Lovable design systems ([docs](https://docs.lovable.dev/features/design-systems.md) [V]) | Hand-written philosophy, usage rules and install quirks. |
| "Knowledge" / project instructions | v0, Bolt, Lovable, Claude Projects | Pasted text, applied to every prompt. |

**Pattern:** keep the *content* in one place (`brand/…`) and make every one of these files a **≤ 40-line router** that says "read `brand/<x>/DESIGN.md` first, then the skill for the task".

### 1.4 Agent Skills (`SKILL.md`), now an open standard [V]

- Spec: https://agentskills.io/specification (also mirrored in `anthropics/skills/spec`).
- **Layout:** a folder containing `SKILL.md` plus optional `scripts/`, `references/` and `assets/`.
- **Frontmatter:**
  - `name`: ≤ 64 characters, kebab-case, and must match the folder name.
  - `description`: ≤ 1024 characters. Say *what* and *when*, with trigger keywords.
  - Optional: `license`, `compatibility`, `metadata`, and experimental `allowed-tools`.
- **Progressive disclosure:**
  - About 100 tokens of metadata are always loaded.
  - The body (< 5,000 tokens, < 500 lines) loads only when the skill activates.
  - Resources load on demand, with references kept one level deep.
- Validation: `skills-ref validate ./skill`.
- **Adopted by:**
  - Claude Code, claude.ai and the API.
  - OpenAI Codex ([docs](https://developers.openai.com/codex/skills) [V]). It reads name and description up front, uses optional `agents/openai.yaml`, and supports symlinked skill folders.
  - Cursor [V], GitHub Copilot (`.github/skills`) [V], and Gemini CLI.
  - v0's "Design Systems 2.0", which stores a *skill* pointing at your design system ([v0 docs](https://v0.app/docs/design-systems) [S]: the page returned 403, so this is a secondary summary).
- **Distribution:**
  - Vercel's `npx skills add owner/repo --skill name` installs into 18+ agents, with project scope by default and `-g` for global ([Vercel docs](https://vercel.com/docs/agent-resources/skills) [V]). Directory and leaderboard at https://skills.sh.
  - Claude Code plugin marketplaces: `/plugin marketplace add anthropics/skills`.

### 1.5 MCP servers for design systems: who ships one (October 2026)

| System | Server | Status | What it exposes |
|---|---|---|---|
| **GitHub Primer** | `@primer/mcp` (stdio) | Official [V] | 19 tools, including `list_components`, `get_component_usage_guidelines`, `get_component_accessibility_guidelines`, `find_tokens`, `get_token_usage_patterns`, **`lint_css`**, `get_color_usage`, `get_typography_usage`, `list_icons`, **`review_alt_text`**, `primer_coding_guidelines` ([primer.style](https://primer.style/product/getting-started/foundations/mcp)). **The best public template for AID's own MCP.** |
| **IBM Carbon** | Carbon MCP | Official, public preview; non-IBMers request access [V] | `docs_search` and `code_search` across React and Web Components, icons and pictograms ([carbondesignsystem.com](https://carbondesignsystem.com/developing/carbon-mcp/overview/)). Carbon also publishes "Carbon for AI" UI guidelines. |
| **Storybook** | `@storybook/addon-mcp` → `localhost:6006/mcp` | Official, preview [V] | Toolsets: development (`stories-preview`, `stories-find-by-component`…), docs (`docs-list`, `docs-show`…; needs a **components manifest**), and testing (`test-run`). The manifest lives at `/manifests/components.json`; it covers React, Angular-Vite and Vue3-Vite ([docs](https://storybook.js.org/docs/ai/mcp/overview), [manifests](https://storybook.js.org/docs/ai/manifests)). |
| **Figma** | Remote `https://mcp.figma.com/mcp` and the desktop server | Official [V/S] | Tools include `get_design_context`, `get_variable_defs`, `search_design_system`, `create_design_system_rules`, `use_figma` (write to canvas), and the Code Connect map tools ([tools list](https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts)). Ships with agent skills via the Claude plugin `figma@claude-plugins-official`. **Figma Specs** (Config India, 15 October 2026) adds a Markdown "design language" document that agents consult ([figma.com/specs](https://www.figma.com/specs/), [TechCrunch](https://techcrunch.com/?p=3177541) [S]). Code Connect needs an Organisation or Enterprise plan [S]. |
| **shadcn/ui** | `npx shadcn@latest mcp` | Official [V] | Browse, search and install from any registry declared in `components.json` → `registries: {"@aid": "https://…/r/{name}.json"}`. Private registries are supported via headers ([docs](https://ui.shadcn.com/docs/mcp)). |
| **zeroheight** | Remote `mcp.zeroheight.com/mcp` and local `@zeroheight/mcp-server` | Official, premium tiers [V] | Search and read styleguide pages, tokens, and a lint tool for hard-coded values. Only published content is served ([help](https://help.zeroheight.com/hc/en-us/articles/43780251357979-Using-the-remote-zeroheight-MCP-server)). |
| **Supernova** | MCP | Official [S] | Read/write tokens, component code, docs and releases ([blog](https://www.supernova.io/blog/design-system-mcp-servers)). |
| **Knapsack** | MCP | Official [S] | Query and generate from system sources ([blog](https://www.knapsack.cloud/blog/knapsacks-mcp-server-turns-design-systems-into-production-engines)). |
| **Frontify** | Frontify MCP | Official, beta, 52 tools [V/S] | Brand guidelines, assets and templates under user permissions ([help](https://help.frontify.com/en/articles/14787214-frontify-mcp-beta)). |
| **Canva** | Canva MCP / AI Connector | Official [V/S] | Create and edit designs with Brand Kit logos, colours and fonts; export ([canva.dev](https://canva.dev/docs/mcp/)). |
| **Salesforce SLDS** | Inside Salesforce DX MCP | Official [S] | SLDS review tools for LWC ([blog](https://developer.salesforce.com/blogs/2025/10/vibe-code-lightning-web-components-with-salesforce-dx-mcp)). |
| **Microsoft Fluent** | None found | Community only (`its-just-ui` Fluent v9 MCP) [S] | No official server found. |
| **Material 3** | None found | Community Cloudflare worker (`list_pages`/`get_page`) [S] | No official server found. |
| **Atlassian DS** | No DS MCP (Rovo MCP is for Jira and Confluence) [S] | — | Atlassian's lever is the **ESLint plugin** instead (see §5). |

**Who publishes `llms.txt`** [V via search results]:
- Nord (`/llms.txt` index and `/llms-full.txt`): https://nordhealth.design/ai/llms-txt
- AWS Cloudscape (Markdown pages discovered via llms.txt): https://cloudscape.design/gen-ai/ai-tools/llms-txt-files/
- Ant Design (`llms.txt`, `llms-full.txt`, plus `.md` per page): https://ant.design/docs/react/llms.md
- US CMS Design System: https://design.cms.gov/using-ai/llms-txt/
- Earth (Anywhere): https://earth.anywhere.co/content/using-llms-txt
- Serendie (Mitsubishi Electric), which also has an MCP: https://serendie.design/en/ai/mcp-server
- agentskills.io itself.

The common pattern is that **every docs page also has a `.md` twin**, so agents fetch clean Markdown rather than HTML.

### 1.6 Component manifests and registries

- **Storybook components manifest** (JSON, preview): `id, name, path, import, description, jsDocTags, stories[{id,name,snippet}], reactDocgen props`. Curate it with the `!manifest` tag. **JSDoc on components and props becomes agent context**, so write it like documentation.
- **shadcn registry** (`registry.json` with `$schema: https://ui.shadcn.com/schema/registry.json`):
  - Items have `type` values such as `registry:block`, `registry:ui`, `registry:component` and (per shadcn docs) `registry:theme` / `registry:style` with `cssVars`.
  - Also `registryDependencies`, `dependencies` and `files`.
  - `shadcn build` emits `/r/{name}.json`, and a public GitHub repo can act as a registry ([docs](https://ui.shadcn.com/docs/registry/registry-json) [V]).
  - **"Open in v0"** buttons send `/r/{name}.json` to v0, and protected registries take a token ([shadcn](https://ui.shadcn.com/docs/registry/open-in-v0), [Vercel starter](https://vercel.com/templates/next.js/shadcn-ui-registry-starter) [S]).
  - Verdict: this is the **lowest-friction way to make AID components installable by any agent**: `npx shadcn add @aid/signal-hero`.
- **Figma Code Connect** maps Figma components to code snippets (`*.figma.tsx`). Figma MCP then returns *your* component import rather than generic JSX.

### 1.7 "Design system as context" guidance from vendors

- **Figma:**
  - "[The Figma canvas is now open to agents](https://www.figma.com/blog/the-figma-canvas-is-now-open-to-agents/)". Generic AI output stems from missing design-system context. Component descriptions are passed to agents, and naming mismatches break mapping ([uxdesign.cc guide](https://uxdesign.cc/agentic-ai-design-systems-figma-a-practical-guide-6ab0b681718d) [S]).
  - [Write design system guidelines for Make](https://developers.figma.com/docs/code/write-design-system-guidelines/): concise, one entry file that routes to sub-files. Figma also warns that **token-format quirks (for example unitless numbers) silently break styles, so spell them out**.
- **Storybook:** "[Supercharge your design system with LLMs and Storybook MCP](https://tympanus.net/codrops/2025/12/09/supercharge-your-design-system-with-llms-and-storybook-mcp/)" argues that manifests beat raw source parsing on token cost [S]. See also their best-practices page: https://storybook.js.org/docs/ai/best-practices
- **Supernova:** [design-system MCP servers compared](https://www.supernova.io/blog/design-system-mcp-servers) (vendor view).
- **Carbon:** prompts guide at https://carbondesignsystem.com/developing/carbon-mcp/prompts/, a ready-made prompt-recipe pattern to copy.

---

## 2. Agent Skills relevant to brand and design systems

### 2.1 Anthropic official (`anthropics/skills`, Apache-2.0 except document skills) [V]

The repo has 19 folders: `academy-guide, algorithmic-art, brand-guidelines, canvas-design, claude-api, discernment-nudge, doc-coauthoring, docx, frontend-design, internal-comms, mcp-builder, pdf, pptx, skill-creator, slack-gif-creator, theme-factory, web-artifacts-builder, webapp-testing, xlsx`.

Install with `/plugin marketplace add anthropics/skills`, then `/plugin install example-skills@anthropic-agent-skills` or `document-skills@…`.

| Skill | What it is | Use for AID |
|---|---|---|
| **brand-guidelines** | Anthropic's own palette (hex values with roles) and fonts with fallbacks, applied via python-pptx `RGBColor`. A model, not a template. | **Fork it as `aid-brand`**: same shape, AID values, plus links into the library. |
| **theme-factory** | 10 preset themes (`themes/*.md`: palette, font pairing, identity) plus `theme-showcase.pdf`. Flow: show → choose → read theme file → apply → check contrast. Can create new themes. | **Replace the presets with AID IoT, AID Defense and AID master themes.** This turns it into the cross-format "apply AID to any artefact" skill. |
| **frontend-design** | Anti-generic UI direction. | Keep as the taste layer, subordinate to AID's DESIGN.md. |
| **canvas-design** | Posters and static art as PNG or PDF. | Banners, social cards, one-pagers (with AID constraints). |
| **pptx / docx / pdf / xlsx** | File production (source-available licence). | Decks, brochures, data sheets. Pair with AID master templates in `assets/`. |
| **web-artifacts-builder** | React and Tailwind multi-file artifacts. | Interactive one-pagers and demos. |
| **skill-creator** | Authoring, testing and iterating skills, including evals. | **Use it to build every AID skill.** |
| **doc-coauthoring, internal-comms** | Writing workflows. | Voice and tone for press, case studies and newsletters. |
| **mcp-builder** | Guide to building MCP servers. | Phase-2 AID MCP. |
| **webapp-testing** | Playwright testing. | Visual QA of the site and components. |

Also from Anthropic: **knowledge-work-plugins**, an open-source set of about 11 plugins. Its *marketing* plugin includes brand-voice enforcement and a brand-review command; its *design* plugin covers critique, design-system management, UX writing, accessibility audits and handoff ([listing](https://vibeindex.ai/skills/anthropics/knowledge-work-plugins/design-system) [S]). These are the closest official precedent for an AID "brand review" command.

### 2.2 Community skills (popular; quality varies, so read before installing)

| Skill | Source | Notes | AID relevance |
|---|---|---|---|
| **impeccable** (Paul Bakaus) | `npx impeccable install` | 17–23 commands (`/audit`, `/polish`, `/typeset`, `/harden`…). `/impeccable init` captures audience, jobs and brand vibe. **A 61-rule deterministic detector, `npx impeccable detect`**, runs with no LLM ([docs](https://www.mintlify.com/pbakaus/impeccable/introduction) [S]). Already used on this repo (commit f0f3d66). | High: UI QA and anti-slop gate |
| **ui-ux-pro-max** | [nextlevelbuilder/ui-ux-pro-max-skill](https://docsearch.algolia.com/mcp/docs/repo/nextlevelbuilder/ui-ux-pro-max-skill) (MIT) | Searchable data: styles, palettes, font pairings, UX rules; a design-system generator and a pre-delivery checklist. Installed locally. | Medium: exploration and checklists. Its generic palettes must not override AID tokens. |
| **design-taste-frontend** (taste-skill) | [leonxlnx/taste-skill](https://github.com/leonxlnx/taste-skill) | Dials for variance, motion and density; anti-slop bans. Prompt-only. Installed locally. | Medium: taste guard for web |
| **awesome-design-md** | VoltAgent | DESIGN.md exemplars | Reference for format |
| **Figma plugin skills** | `figma@claude-plugins-official` | `figma-generate-library`, `figma-code-connect`, `figma-create-design-system-rules`, `figma-generate-design`, `figma-use`. Installed locally. | High: push the AID system into Figma and wire Code Connect |
| **Vercel agent-skills** | `npx skills add vercel-labs/agent-skills` | React and Next best practices, web-design guidelines | Medium: site engineering |
| **Rampstack claude-skills** | `/plugin marketplace add rampstackco/claude-skills` | 103 brand, design, content and SEO skills [S] | Low–medium: mine for structure only |
| **ComposioHQ awesome-claude-skills** | Curated list, including a brand-guidelines variant [S] | Discovery | — |
| **kostja94 marketing-skills / branding** | Positioning, archetypes, voice rules [S] | Brand *strategy* prompts | Low |
| **Hyperframes / motion-graphics** (installed locally) | Video and motion | Brand sting, launch films | Medium: needs AID motion tokens |

**OpenAI / Codex:** Codex uses the same `SKILL.md` format, plus optional `agents/openai.yaml` for UI metadata and invocation policy. OpenAI ships a `skill-creator` sample ([docs](https://developers.openai.com/codex/skills)). **Cursor** natively reads `.cursor/skills` and the Claude and Codex directories, so **one skill folder serves all three**. **Copilot** uses `.github/skills`.

### 2.3 Mapping skills to AID's jobs

| Job | Install / adapt | Build (AID-owned) |
|---|---|---|
| Build the brand system | skill-creator, frontend-design (taste), ui-ux-pro-max (exploration only) | `aid-brand` (core rules and router) |
| Build the design system | Figma plugin skills, shadcn MCP, Storybook MCP, impeccable | `aid-ui` (components, tokens, registry usage) |
| On-brand collateral | theme-factory (forked), pptx/docx/pdf, canvas-design, web-artifacts-builder, Hyperframes | `aid-collateral` (one recipe per format: deck, brochure, data sheet, banner, social, email signature) |
| Image generation | — | `aid-imagery` (prompt grammar, banned tropes, reference board) |
| Writing | copywriting and copy-editing (installed), knowledge-work marketing | `aid-voice` (voice per sub-brand, terminology, British English) |
| Audit and compliance | impeccable `detect`/`audit`, webapp-testing, DESIGN.md `lint`, ux-heuristic-evaluator | `aid-brand-review` (rubric plus deterministic checks; see §5) |

---

## 3. Patterns for a "brand library for LLMs"

### 3.1 Principles (distilled from Primer, Carbon, Figma Make, Lovable, the Agent Skills spec and DESIGN.md)

1. **One source of truth, many generated views.** Agents don't share an input format, so **author once (DTCG and Markdown), compile per consumer** (DESIGN.md, CSS, Tailwind, Figma variables, the theme-factory theme file, the PPTX theme XML, Canva Brand Kit values, llms.txt).
2. **Values and reasons together.** Exact values in machine form; rationale in short prose next to them. Agents that know *why* generalise to new formats (DESIGN.md's core idea).
3. **Progressive disclosure: three tiers.**
   - *Router* (≤ 40 lines): AGENTS.md / CLAUDE.md / Guidelines.md.
   - *Brand core* (≤ 300 lines): DESIGN.md per brand.
   - *Depth on demand*: component docs, recipes, examples.
   - Never one huge PDF. Agents load what the task needs.
4. **Do and don't with pictures.** Every rule that can be shown should have a `do.png` / `dont.png` pair with a one-line caption. Vision-capable agents and LLM judges both use them. Use **golden examples** (approved finished artefacts) per collateral type.
5. **Recipes, not just rules.** For each output type, provide a *recipe*: inputs needed, the template file, the step list, the tokens and components to use, and the QA checklist. This is how theme-factory and the pptx skill work.
6. **Machine-checkable where possible.** Any rule that can be linted should be linted (contrast, raw colours, font families, logo clear-space in SVG, banned words). Leave only judgement calls to an LLM judge.
7. **Name everything stably.** Token and component names are API, and Figma, Code Connect and agents all key on names (Figma's own warning).
8. **Decision log.** Agents asked to "extend the brand" need to know what was rejected and why. AID already keeps `docs/DECISIONS.md`; mirror brand-relevant lines into `brand/DECISIONS.md`.
9. **Published content only.** Following zeroheight's model, drafts live on branches. Agents read `main` / tagged releases.

### 3.2 Keeping context small

- About 100 tokens per skill description at rest. SKILL.md bodies under 500 lines. References one hop away.
- `brand/INDEX.md`, a table of "if you need X, read Y", is the single entry point every router file points to.
- Per-format recipes reference tokens **by name**, never by copied hex values, so a rebrand touches one file.
- Provide `llms.txt` (index) and `llms-full.txt` (everything) for web-browsing tools. Repo-mounted agents use INDEX.md instead.
- MCP tools return **slices** (Primer's `find_tokens`, `get_component_usage_guidelines`) so agents never need the whole corpus.

### 3.3 Non-code outputs

- **Slides:** a master `.pptx` and `.potx` (theme XML colours and fonts, layouts named by intent such as "Title-Hero" or "Proof-3up"), plus `deck.recipe.md` and golden decks. The pptx skill and Claude Design can export PPTX. Gamma imports a theme **from a `.pptx`** ([Gamma](https://gamma.app/explore/content/guides/how-to-keep-your-brand-consistent-across-every-presentation) [S]), so the master deck doubles as the Gamma theme source.
- **Print (brochure, data sheet, pamphlet):** InDesign/Affinity or HTML-to-PDF templates with bleed, CMYK swatches derived from tokens, and a recipe. Details in report 06.
- **Social and banners:** size presets and safe zones as JSON (`formats.json`), SVG/HTML templates, and a Canva Brand Kit mirror.
- **Imagery:** a prompt grammar (subject, setting, light, lens, palette words, *negative* list), a reference board, Firefly *style* custom models for an approved look ([Adobe](https://developer.adobe.com/firefly-services/docs/firefly-api/guides/concepts/custom-models)), and a sidecar `.md` for every generated asset (AID already does this).
- **Motion and video:** motion tokens (durations, easings, the "motion explains a mechanism" rule) and a Hyperframes `design.md`.

### 3.4 Versioning and exposure

| Layer | Mechanism | Who consumes |
|---|---|---|
| Source | Git repo, semver tags, CHANGELOG, PR review by the brand owner | Everyone |
| Packages | `@aid/tokens` (npm: CSS, TS, Tailwind), shadcn registry `@aid`, `aid-skills` plugin marketplace | Code agents, the site |
| Agent files | DESIGN.md per brand, AGENTS.md/CLAUDE.md routers, `.cursor/rules`, `.github/instructions` | Claude Code, Codex, Cursor, Copilot, Stitch |
| Skills | `skills/aid-*` installable via `npx skills add aid/brand` and `/plugin marketplace add` | All SKILL.md-compatible agents |
| Hosted docs | Static site with a `.md` twin per page, `/llms.txt`, `/llms-full.txt` | Browsing tools, ChatGPT, v0, Lovable |
| MCP (phase 2) | `aid-brand-mcp` modelled on Primer: `find_tokens`, `get_component`, `get_recipe`, `get_asset`, `lint_css`, `review_copy`, `check_contrast` | Any MCP client, Claude Design, Figma Make (via connector) |
| Tool mirrors | Claude Design design system (imported from repo), Figma library and variables, Canva Brand Kit, Gamma theme, Firefly style model | Non-technical users |

---

## 4. Tools that generate or consume brand systems with AI

| Tool | Accepts an importable system? | Input format | Enforces? | Source |
|---|---|---|---|---|
| **Claude Design** (Anthropic Labs; beta on paid plans; update 17 June 2026) | **Yes, multiple systems** | GitHub repo, design files, uploads, local codebase, DOCX/PPTX/XLSX. Admins can lock a team to one system. `/design-sync` and `/design` in Claude Code. Exports PPTX, PDF and HTML, and sends to Canva, Gamma, Lovable and others. | **Yes**: checks output against the system and corrects it | [claude.com/design](https://claude.com/design) [V], [TechRepublic](https://techrepublic.com/article/news-anthropic-claude-design-overhaul-enterprise-teams) [S] |
| **Google Stitch** | Yes | **DESIGN.md**. Stitch MCP to coding agents; hand-off to Bolt | Lint via CLI | §1.1 |
| **Figma Make** | Yes | Attached library, `guidelines/Guidelines.md`, zeroheight connector. Forum reports of partial library recognition (2025–26) | Partial | [Figma docs](https://developers.figma.com/docs/code/write-design-system-guidelines/) [V] |
| **Figma Specs** (October 2026) | Yes | Markdown design-language documents linked to the canvas and libraries | Agents consult them | [figma.com/specs](https://www.figma.com/specs/) [S] |
| **v0** | Yes | Design Systems 2.0: a saved *skill* pointing at your system. Legacy route: shadcn registry with "Open in v0" | Via skill | [v0 docs](https://v0.app/docs/design-systems) [S] |
| **Lovable** | **Yes** (paid; npm wrapping on Enterprise) | Public git repo, npm package, uploads; tokens from CSS vars or `tailwind.config`; `system.md` | **Yes**: scans every generation for raw colours, one-off values and re-implemented components, and retries | [docs](https://docs.lovable.dev/features/design-systems.md) [V] |
| **Bolt** | Partial | "Knowledge" field and Tailwind config; DESIGN.md arrives via Stitch hand-off | No | [S] |
| **Relume** | Own Style Guide builder; exports to Figma, Webflow and **Claude Design** | Proprietary | — | [relume.io](https://www.relume.io/claude-design-export) [S] |
| **Canva** | Yes | Brand Kit (logos, colours, fonts, templates, voice); **MCP / AI Connector** for Claude, ChatGPT, Copilot and Gemini | Brand-kit-bound generation | [canva.dev/docs/mcp](https://canva.dev/docs/mcp/) [V] |
| **Adobe** | Firefly custom models (subject or style) trained on brand assets; Express brand kits | Images | Style adherence | [Adobe](https://business.adobe.com/products/firefly-business/custom-models) [V] |
| **Frontify** | Is the brand portal, with MCP (beta) | Guidelines, assets, templates | Permissions-aware | [help](https://help.frontify.com/en/articles/14787214-frontify-mcp-beta) [V] |
| **Brandfetch** | Serves *public* brand data (logos, colours, fonts) by domain; API and MCP | — | — | [Composio](https://composio.dev/toolkits/brandfetch) [S]. AID should **claim and curate its own Brandfetch entry**, because agents increasingly pull logos from it. |
| **Gamma** | Theme from `.pptx` / Google Slides; workspace themes | PPTX | Workspace default | [S] |
| **Pitch, Beautiful.ai** | Brand kits / templates (manual) | No AI-import evidence found | — | Not verified |
| **Uizard, Khroma, Looka/Brandmark** | Generators (palettes, logos, mock-ups); **no import of an existing system** | — | — | Low relevance once AID's identity exists |

**Takeaway:** the importable formats that matter are **(a) a public or connected git repo with tokens in CSS/Tailwind and components (Claude Design, Lovable, v0), (b) DESIGN.md (Stitch, and readable by any agent), (c) a master `.pptx` (Gamma, Claude Design, pptx skill), and (d) Canva Brand Kit / Figma library, managed manually or via MCP.**

---

## 5. Quality control and brand compliance

Use three layers, cheapest first.

**Layer 1: deterministic lint (CI and pre-commit; the agent can run it too)**
- `npx @google/design.md lint` (references, AA contrast) and `diff` on every brand PR.
- Token build validation (Style Dictionary / Terrazzo DTCG schema). Contrast matrix for every foreground/background token pair, per brand and mode.
- **Stylelint**:
  - Mozilla's `use-design-tokens` family (flags hex, rgba and oklch literals; allows `var(--…)`) ([docs](https://firefox-source-docs.mozilla.org/code-quality/lint/linters/stylelint-plugin-mozilla/rules/use-design-tokens/color.html)) as a model.
  - `stylelint-declaration-strict-value` for colour, font-family, spacing and radius.
- **ESLint**: Atlassian's `ensure-design-token-usage` pattern for CSS-in-JS ([atlassian.design](https://atlassian.design/components/eslint-plugin-design-system/ensure-design-token-usage)). Tailwind: restrict the theme to tokens only (no arbitrary values), or lint `[#hex]` arbitrary classes.
- `npx impeccable detect` (61 anti-pattern rules, no LLM) [S].
- **Copy lint**: Vale with an AID style (British spelling, banned words, product-name casing such as "AID Defense", "NAVIC", "Lighthouse"; trademark rules).
- **Assets**: logo SVG checks (approved files only, by hash), minimum size and clear-space checks on templates.
- Accessibility: axe / Lighthouse (already in use), and `review_alt_text`-style checks.

**Layer 2: visual regression**
- Playwright `toHaveScreenshot` for templates and components in Docker (stable baselines), with dynamic regions masked. Chromatic if Storybook is adopted (hosted review, AI diff triage) [S].
- Render every collateral template (deck master, data sheet, social sizes) to PNG in CI and diff against golden images.

**Layer 3: LLM-as-judge brand review (`aid-brand-review` skill)**
- Hybrid: rule checks first, then the judge on soft qualities. This is the pattern in [arXiv 2506.17863](https://arxiv.org/pdf/2506.17863) and [Adaline](https://www.adaline.ai/docs/evaluate/llm-as-a-judge). Keep to **4–6 dimensions**, each with defined score levels and anchored examples.
- Proposed AID rubric (scored 0–2, with an example image or text per level from `examples/`):
  1. Token fidelity: colours and type only from the system.
  2. Sub-brand correctness: IoT vs Defense palette, mark and voice; no cross-contamination.
  3. Composition: hierarchy, grid, "motion explains a mechanism"; none of the category defaults.
  4. Voice: outcome first, plain English for executives, British English.
  5. Claims hygiene: only facts in PRODUCT-FACTS; no invented specs or certifications. **Critical for AID Defense.**
  6. Accessibility: contrast, target size, alt text.
- Guard against judge bias: use a different model or fresh context from the generator, put the rubric before the artefact, and require cited evidence for each score.
- Figma-side checks: Figma's built-in "check designs" / linter plugins (for example Design Lint) for detached styles; `search_design_system` before creating new variables.

---

## 6. What this means for the current AID repo

- The repo already follows the "router + small context + decision log" pattern (CLAUDE.md → CONTEXT / NEXT / DECISIONS). The brand library should **extend that convention**, not invent a second one.
- `docs/brand/DESIGN.md` is already named in CLAUDE.md. Align it with the **Google DESIGN.md spec** (YAML front matter plus canonical sections) so the Stitch CLI can lint and export it for free.
- The site (Next.js) can become the **hosted docs and llms.txt** surface, and the source of the **shadcn registry** at `/r/*.json`.

---

## 7. Proposed structure for AID's LLM-ready brand and design library

### 7.1 Repo tree (`aid-brand`, its own repo; consumed by `aid-iot` site and others)

```
aid-brand/
├── AGENTS.md                  # ≤40-line router: what this repo is, read INDEX.md, never hard-code values
├── CLAUDE.md                  # @AGENTS.md + Claude-specific notes
├── .cursor/rules/brand.mdc    # glob-scoped: tokens only in *.css/*.tsx
├── .github/copilot-instructions.md + instructions/*.instructions.md
├── INDEX.md                   # "If you need X → read Y" table (the single entry point)
├── CHANGELOG.md  VERSION      # semver; MAJOR = rebrand, MINOR = new token/component, PATCH = fix
├── brand/
│   ├── master/                # AID parent: story, architecture, naming rules
│   │   ├── DESIGN.md          # generated YAML + hand-written prose (Google spec)
│   │   ├── VOICE.md           # tone, vocabulary, banned phrases, British English
│   │   └── ARCHITECTURE.md    # parent ↔ AID IoT ↔ AID Defense ↔ NAVIC/Lighthouse lock-ups & endorsement rules
│   ├── aid-iot/  DESIGN.md  VOICE.md
│   ├── aid-defense/  DESIGN.md  VOICE.md   # stricter claims & export-control language
│   ├── PRODUCTS.md            # product truth (from docs/PRODUCT-FACTS.md)
│   └── DECISIONS.md           # brand-only decision log with rejected alternatives
├── tokens/                    # SOURCE OF TRUTH (DTCG 2025.10) — see report 03
│   ├── primitives/*.tokens.json
│   ├── semantic/*.tokens.json
│   ├── brands/{master,iot,defense}.tokens.json
│   └── aid.resolver.json
├── assets/
│   ├── logos/{master,iot,defense,navic,lighthouse}/*.svg  + LOGO.md (clear-space, min size, misuse)
│   ├── fonts/  icons/  imagery/reference/  imagery/generated/<asset>.md (prompt sidecar)
├── components/                # React source + *.stories.tsx + JSDoc (feeds Storybook manifest)
├── registry.json              # shadcn registry → /r/@aid/*.json
├── templates/                 # one folder per collateral type
│   ├── deck/        master.potx  deck.recipe.md  golden/*.pdf
│   ├── datasheet/   datasheet.html|.indd  recipe.md  golden/
│   ├── brochure/    …           social/ formats.json + *.svg     banner/  email-signature/  video/design.md
├── examples/
│   ├── do/*.png  dont/*.png  (each with a one-line caption in examples/INDEX.md)
│   └── golden/<type>/*        # approved finished artefacts
├── prompts/                   # recipes: image-gen grammar, copy briefs, "make a NAVIC one-pager"
├── qa/
│   ├── rubric.md              # LLM-judge rubric (§5)
│   ├── vale/  stylelint.config.js  eslint.config.js
│   └── visual/ (Playwright golden renders)
├── skills/                    # Agent Skills (open standard) — installable
│   ├── aid-brand/SKILL.md            # router skill: identify sub-brand, load DESIGN.md + VOICE.md
│   ├── aid-ui/SKILL.md               # build UI with @aid tokens/components/registry
│   ├── aid-collateral/SKILL.md       # per-format recipes → templates/
│   ├── aid-imagery/SKILL.md          # image prompts + negative list + sidecar
│   ├── aid-voice/SKILL.md
│   └── aid-brand-review/SKILL.md + scripts/check.mjs   # lint + rubric
├── .claude-plugin/marketplace.json   # `/plugin marketplace add aid/aid-brand`
├── build/                     # Style Dictionary/Terrazzo config → dist/
└── dist/ (generated, published)
    ├── css/ tailwind/ ts/ figma-variables.json  pptx-theme.xml  canva-brandkit.json
    ├── design-md/ (exported DESIGN.md YAML blocks)
    └── docs-site/ (+ llms.txt, llms-full.txt, *.md twins)
```

### 7.2 What each agent reads first

| Agent / tool | Entry point | Then |
|---|---|---|
| Claude Code | `CLAUDE.md` → `INDEX.md` | Skill `aid-brand` (auto-triggers on brand, collateral or UI work) → the relevant `DESIGN.md` |
| Codex / Cursor / Copilot | `AGENTS.md` / `.cursor/rules` / `copilot-instructions.md` → `INDEX.md` | Same skills (shared SKILL.md folders, symlinked into `.agents/skills`, `.github/skills`) |
| Stitch / any "paste a file" tool | `brand/<brand>/DESIGN.md` | — |
| Claude Design | Import the repo as a design system; lock the team to it | Hand off to Claude Code with `/design-sync` |
| v0 / Lovable | Repo URL or registry (`@aid`); Lovable `system.md` = brand/…/DESIGN.md prose | Lovable's adherence scan does enforcement |
| Figma Make / Specs | `guidelines/Guidelines.md` generated from INDEX.md and DESIGN.md | Figma library with variables from `dist/figma-variables.json` |
| ChatGPT / web tools | `https://brand.aid-iot.com/llms.txt` | `.md` twins |
| Canva / Gamma / Adobe | Brand Kit / theme / Firefly style model, synced from `dist/` | — |

### 7.3 How a skill and an MCP wrap it

- **Phase 1 (now):**
  - Skills only. Each `SKILL.md` is under 150 lines and **points into the repo** (`../../brand/aid-iot/DESIGN.md`, `../../templates/deck/deck.recipe.md`) instead of duplicating content.
  - `aid-brand-review/scripts/check.mjs` runs `design.md lint`, Stylelint and Vale, plus a contrast matrix.
  - Distributed via a Claude plugin marketplace and `npx skills add`.
- **Phase 2 (when more than one team or external agency uses it):**
  - `aid-brand-mcp` (built with `mcp-builder`), modelled on `@primer/mcp`. Proposed tools:
    - `get_brand(brand)`, `find_tokens(intent|value, brand)`
    - `get_component(name)`, `get_recipe(format)`, `get_asset(logo, variant, format)`
    - `lint_css(code)`, `review_copy(text, brand)`, `check_contrast(fg, bg)`, `review_artifact(image|pdf)` (rubric)
  - Serve it remotely (Cloudflare Worker or similar) from the *published* `dist/`.

### 7.4 How a rebrand flows through

1. Edit **tokens** (`brands/*.tokens.json`) and DESIGN.md prose in a PR. Add a line to `brand/DECISIONS.md`.
2. CI runs:
   - Token build, then `design.md lint` and `diff` (shows every changed token and any new contrast failure).
   - Regenerate the DESIGN.md YAML, CSS, Tailwind, Figma variables, PPTX theme XML, Canva kit JSON and llms.txt.
   - Visual regression renders of components *and* collateral templates; changed goldens are attached to the PR for review.
3. The brand owner approves. Tag `vX.0.0` with a changelog.
4. Consumers pick it up:
   - Site bumps `@aid/tokens`.
   - Skills and the MCP read the new tag automatically.
   - Claude Design re-imports from the repo.
   - Figma library publishes the variables.
   - Canva, Gamma and Firefly mirrors are updated from the `dist/` checklist (a manual step, with a script where an API exists).
5. Old golden examples move to `examples/archive/vN/` so agents never learn from superseded work.

Because recipes, skills and router files refer to **token names and file paths, not values**, a rebrand changes `tokens/`, `assets/logos/`, `templates/*` masters and goldens, and nothing else.

---

## 8. Ranked list: skills to install or adapt

| # | Skill | Action | Why this rank |
|---|---|---|---|
| 1 | **skill-creator** (Anthropic) | Install | Every AID skill is built and evaluated with it; it unblocks everything else. |
| 2 | **brand-guidelines** (Anthropic) → **`aid-brand`** | Fork and rewrite | The core router skill. Every other output depends on it. |
| 3 | **theme-factory** (Anthropic) → **`aid-themes`** | Fork; replace the 10 presets with AID master, IoT and Defense (light and dark) | Fastest route to on-brand slides, docs and HTML across formats. |
| 4 | **pptx / docx / pdf** (Anthropic) | Install; pair with AID masters | Decks, brochures and data sheets are the CEO's most visible collateral. |
| 5 | **Figma plugin skills** (`generate-library`, `code-connect`, `create-design-system-rules`) | Install (already present) | Puts the system into Figma and wires Code Connect, so design and code agents share names. |
| 6 | **impeccable** | Keep; add `detect` to CI | Deterministic anti-slop gate; already proven on this repo. |
| 7 | **`aid-brand-review`** (new; pattern from knowledge-work marketing "brand review") | Build | Compliance loop; needed before non-designers generate collateral. |
| 8 | **canvas-design** + **web-artifacts-builder** | Install; constrain via aid-brand | Banners, social and interactive one-pagers. |
| 9 | **frontend-design / design-taste-frontend** | Keep as taste layer below DESIGN.md | Prevents generic output, but must yield to AID tokens. |
| 10 | **mcp-builder** | Install at Phase 2 | For the AID MCP server. |
| 11 | **ui-ux-pro-max** | Optional; exploration and checklists only | Broad but generic; risk of off-brand palettes. |
| 12 | **copywriting / copy-editing** + `aid-voice` | Adapt with VOICE.md | Voice consistency across sub-brands. |

---

## Next steps (and why each is next)

1. **Decide the library's home and shape**: a separate `aid-brand` repo vs `brand/` inside this repo. *Why first:* every path in skills, routers and the MCP depends on it, and moving later breaks links.
2. **Convert `docs/brand/DESIGN.md` to the Google DESIGN.md spec, one per brand, with YAML generated from DTCG tokens (report 03), and run `design.md lint` in CI.** *Why next:* it is the single most portable artefact (Stitch, Claude Code, Cursor, Codex, Lovable `system.md`). It gives contrast checks for free and is the input to every skill.
3. **Fork `brand-guidelines` → `aid-brand` and `theme-factory` → `aid-themes` using skill-creator, then test them on three real outputs (a NAVIC one-pager, an AID IoT deck title slide, a LinkedIn banner) scored against the §5 rubric.** *Why next:* it proves the library works for non-code collateral, which is where off-brand drift happens first, before investing in an MCP.
4. **Import the repo into Claude Design and lock the team to it.** *Why:* the cheapest enforcement layer available today for non-technical colleagues.
5. **Phase 2: shadcn `@aid` registry and `aid-brand-mcp`**, once components stabilise. *Why later:* both wrap components and tokens that are still moving. Building them now would mean rebuilding them.

## Open questions

1. Will AID IoT and AID Defense share one component library with themed tokens, or will Defense need distinct components (for example dense, ruggedised operator UIs for Lighthouse)? This decides whether there is one registry or two.
2. Which tools will non-technical staff actually use: Canva, Gamma, PowerPoint, Claude Design? Only those get mirrored. Each mirror is a manual sync cost.
3. Is Figma the design source (so Code Connect and Specs are worth paying for at Organisation tier), or is code the source (Storybook and registry)?
4. Confidentiality: can the brand library (or parts of it, such as AID Defense) be public? Public enables `npx skills add`, v0, Lovable public import and llms.txt. Private needs tokens and authentication on the registry and MCP.
5. Who approves brand changes, and is the CEO an approver for every MAJOR version?
6. NAVIC naming (clash with ISRO's NavIC, report 05) must be settled before logos and lock-ups are encoded as tokens and assets.
7. Should AID claim and curate its **Brandfetch** profile, so external agents pulling "AID logo" get the right files?

## Sources (primary)

- DESIGN.md spec: https://github.com/google-labs-code/design.md
- awesome-design-md: https://github.com/voltagent/awesome-design-md
- DTCG 2025.10: https://www.designtokens.org/tr/2025.10/
- Agent Skills spec: https://agentskills.io/specification
- Anthropic skills: https://github.com/anthropics/skills
- Codex skills: https://developers.openai.com/codex/skills
- Cursor skills: https://cursor.com/docs/skills
- Copilot instructions: https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions
- Vercel skills CLI and skills.sh: https://vercel.com/docs/agent-resources/skills
- Storybook AI: https://storybook.js.org/docs/ai/manifests and https://storybook.js.org/docs/ai/mcp/overview
- Primer MCP: https://primer.style/product/getting-started/foundations/mcp
- Carbon MCP: https://carbondesignsystem.com/developing/carbon-mcp/overview/
- Figma MCP tools: https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts
- Figma Make guidelines: https://developers.figma.com/docs/code/write-design-system-guidelines/
- Figma Specs: https://www.figma.com/specs/
- shadcn: https://ui.shadcn.com/docs/mcp and https://ui.shadcn.com/docs/registry/registry-json
- zeroheight MCP: https://help.zeroheight.com/hc/en-us/articles/43780251357979-Using-the-remote-zeroheight-MCP-server
- Supernova: https://www.supernova.io/blog/design-system-mcp-servers
- Knapsack: https://www.knapsack.cloud/blog/knapsacks-mcp-server-turns-design-systems-into-production-engines
- Frontify MCP: https://help.frontify.com/en/articles/14787214-frontify-mcp-beta
- Canva MCP: https://canva.dev/docs/mcp/
- Claude Design: https://claude.com/design and https://www.anthropic.com/news/claude-design-anthropic-labs
- Lovable design systems: https://docs.lovable.dev/features/design-systems.md
- v0 design systems: https://v0.app/docs/design-systems
- llms.txt examples: https://nordhealth.design/ai/llms-txt, https://cloudscape.design/gen-ai/ai-tools/llms-txt-files/, https://ant.design/docs/react/llms.md, https://design.cms.gov/using-ai/llms-txt/
- Lint: https://atlassian.design/components/eslint-plugin-design-system/ensure-design-token-usage and https://firefox-source-docs.mozilla.org/code-quality/lint/linters/stylelint-plugin-mozilla/rules/use-design-tokens/color.html
- LLM judge: https://arxiv.org/pdf/2506.17863 and https://www.adaline.ai/docs/evaluate/llm-as-a-judge
- Firefly custom models: https://developer.adobe.com/firefly-services/docs/firefly-api/guides/concepts/custom-models
- Impeccable: https://www.mintlify.com/pbakaus/impeccable/introduction
- taste-skill: https://github.com/leonxlnx/taste-skill
- ui-ux-pro-max: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
