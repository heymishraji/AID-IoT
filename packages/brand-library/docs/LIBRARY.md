# LIBRARY · how the AID brand + design-system library works

Status: v0.0.1 skeleton (2026-10-27). Structure, schema and pipeline are real; every visual value is a
labelled PLACEHOLDER. Evidence (AID workspace repo): `docs/research/03-token-architecture-multibrand.md` §3, §7, §8 and
`docs/research/04-llm-friendly-design-systems-and-skills.md` §1, §7.

## 1. Organisation
One shared **core** (the engine) and separate **brands** (identities). Brands never see each other.

```
AGENTS.md  INDEX.md  CHANGELOG.md  VERSION  package.json  docs/LIBRARY.md (this file)
core/
  tokens/primitives/   tier 1: neutrals, feedback hues, night ramp, space, radius, type scale, motion
  tokens/semantic/     tier 2: type roles, shape, layout (mode-independent)
  tokens/modes/        light | dark | night: same colour role names, per-mode values
  tokens/density/      comfortable | compact
  tokens/protected/    status, focus (always) · symbology, classification (opt-in modules)
  components/          reference CSS, semantic tokens only
brands/<id>/
  brand.json           id, display name, role (brand | legal-parent | fixture), modules
  tokens/              palette.tokens.json (brand-private primitives) + brand.tokens.json (brand roles)
  DESIGN.md  VOICE.md  AGENTS.md  assets/  templates/  skills/<skill-name>/SKILL.md
scripts/               lib.mjs, build.mjs, export.mjs, check.mjs
examples/token-preview.html
dist/                  generated, git-ignored
```
Brands: `aid-iot`, `aid-defence`, `inordinate` (legal parent, legal documents only), `_fixture-brand` (test only).

## 2. Tokens
- Format: W3C DTCG 2025.10. Colours are `{ colorSpace, components, hex }` objects; dimensions `{ value, unit }`.
- Tiers: **primitive → brand role → semantic**. Semantic tokens reference `brand.*` where identity matters
  (e.g. `color.action.primary.bg → {brand.color.primary.base}`) and core primitives where it must not
  (neutrals, feedback). Core never references `palette.*`.
- A brand file may only define `palette.*` and `brand.*`. Brand roles today: `brand.color.primary`,
  `primary-dark`, `accent`, `data-viz.1–6`, `brand.font.accent` (19 tokens).
- Protected namespaces, owned by core: `status` (Astro six levels: off, standby, normal, caution, serious,
  critical), `focus`, `symbology`, `classification`. The last two are opt-in via `brand.json` `modules`.
  They load last in the build, and `npm run check` fails if any brand file defines them.
- Night mode is brand-immune: low-luminance red-shifted values for Lighthouse and low-light use.
- Every token can carry a `$description`; it is the cheapest place to tell an agent when to use it.

## 3. Build (`npm run build`)
Style Dictionary 5.7 runs once per brand × mode (+ one compact run) and writes `dist/<id>/`:
- `css/<mode>.css` scoped `[data-brand="<id>"][data-mode="<mode>"]`; `css/density-<d>.css` scoped
  `[data-brand][data-density]`; `css/tokens.css` bundles all (density last). Prefix `--aid-`.
- `tailwind/theme.css`: Tailwind v4 `@theme inline` mapping to `--aid-*` variables (one file serves every
  mode; Tailwind's default palette is removed).
- `json/<mode>.json` flat; `figma/variables.json`: collections (Primitives, Brand, Color[light/dark/night],
  Density[comfortable/compact], Semantic, Protected) with aliases preserved.
- Regenerates the YAML front matter of each `brands/<id>/DESIGN.md`; the prose below it is hand-written.
Set the three attributes on the same element, usually `<html>`.

## 4. Add a brand
1. Copy `brands/_fixture-brand/` to `brands/<new-id>/` (kebab-case). Edit `brand.json` (id = folder name,
   role `brand`, `modules` if it needs symbology/classification).
2. Replace `tokens/palette.tokens.json` with the brand's ramps; map every role in `tokens/brand.tokens.json`.
3. Write `DESIGN.md` prose, `VOICE.md`, `AGENTS.md` (≤ 40 lines), a skill in `skills/<new-id>-brand/`.
4. `npm run build && npm run check`. The check lists any missing brand role or namespace breach.
5. Add a row to `INDEX.md`, a CHANGELOG entry (MINOR), and a line in the AID workspace decision log (`docs/DECISIONS.md` there).

## 5. Export a brand (`npm run export -- --brand <id> --out <dir>`)
Rebuilds, then copies `core/` (minus modules the brand does not use), `brands/<id>/`, `dist/<id>/`,
`examples/`, the build/check scripts and `VERSION` into an empty folder, and generates `package.json`,
`README.md`, `AGENTS.md`. It then scans every file: any other brand's id, display name or colour value fails
the export. The result is a standalone repo: `npm install && npm run build && npm run check`.
`npm run check` exports each real brand to a temp folder and rebuilds it there to prove this.

## 6. How a rebrand flows
1. Edit `brands/<id>/tokens/` (and swap `assets/logo/` masters). Nothing in core, components or templates.
2. `npm run build`: CSS, Tailwind, JSON, Figma variables and DESIGN.md YAML all regenerate.
3. `npm run check`: the fixture brand proves no component, template or semantic token hard-codes a value.
4. Brand owner reviews `examples/token-preview.html`, bumps the version, tags the release.
5. Consumers update: sites bump the package or re-export; Figma imports `figma/variables.json`; Slides and
   Canva kits are refreshed by hand from `dist/` until a script exists.

## 7. Releases (owner: the product/design lead, sole approver)
- SemVer in `VERSION`, `package.json` and `CHANGELOG.md` (must match; `npm run check` verifies).
- **MAJOR**: rebrand or identity change, token removed or renamed, protected value changed.
- **MINOR**: new token, brand, module, template, skill or output format.
- **PATCH**: value tweak within the same intent, docs, fixes.
- 0.x while placeholders remain; 1.0.0 when the first brand identity is approved.
- Deprecate before removing: `"$deprecated": "Use {new.token}"`, keep the alias for one MINOR.
- Release: `npm run check` green → update CHANGELOG → bump → commit → tag `vX.Y.Z`.

## 8. Known gaps
- No DTCG resolver document yet (build composes sources in `scripts/lib.mjs`).
- No contrast test, Google `design.md lint`, visual regression, Office/Slides/Canva outputs.
- Tokens Studio / Figma write-back path not set up. Devanagari later.

## Next steps
1. **Contrast matrix in `npm run check`** (brand × mode × text/surface pairs, WCAG 2.2 AA): placeholders
   will be replaced soon and every replacement must be tested automatically.
2. **Type and colour studies**: only real values make the library useful; the pipeline is ready for them.
3. **Figma variables import + Slides master from `dist/`**: the team works in Figma and Google Slides, so
   those are the first consumers to prove the round trip.
