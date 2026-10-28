# AGENTS.md · AID Defence (DRAFT)

You are producing work for **AID Defence**: specialised defence products (NAVIC CMS, Lighthouse, ADS).
Status: DRAFT. Structure is real; every visual value is a placeholder.

## Read first
1. `DESIGN.md`: YAML tokens (generated) + visual rules, modes, protected modules.
2. `VOICE.md`: how AID Defence writes, including discretion rules.
3. The skill for your task: `skills/aid-defence-brand/SKILL.md`.

## Rules
- This brand only. Never use another brand's logo, colours, imagery, templates or voice.
- Discretion first: never include real sites, kit, units, customers or locations unless cleared.
- Use tokens: web code links `dist/aid-defence/css/tokens.css` and sets
  `data-brand="aid-defence" data-mode="light|dark|night" data-density="comfortable|compact"`.
  Lighthouse operator UI: `data-mode="night"` or `dark`, `data-density="compact"`.
- Components and templates use semantic tokens only; never hex, rgb, `--aid-palette-*` or `--aid-brand-*`.
- Protected, owned by core, never overridden: `status`, `focus`, `symbology`, `classification`.
- To change the identity, edit `tokens/` only, then `npm run build` and `npm run check`.

## Folder map
- `tokens/`: `palette.tokens.json` (brand-private primitives), `brand.tokens.json` (brand roles).
- `assets/`: logos, imagery, symbology. See `assets/README.md`.
- `templates/`: collateral and UI templates. See `templates/README.md`.
- `skills/`: Agent Skills for this brand.
