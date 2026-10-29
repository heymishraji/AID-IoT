# AGENTS.md · AID IoT (DRAFT)

You are producing work for **AID IoT**: IoT products and solutions (hardware, software, or both).
Status: DRAFT. Structure is real; every visual value is a placeholder.

## Read first
1. `DESIGN.md`: YAML tokens (generated) + visual rules.
2. `VOICE.md`: how AID IoT writes.
3. The skill for your task: `skills/aid-iot-brand/SKILL.md`.

## Rules
- This brand only. Never use another brand's logo, colours, imagery, templates or voice.
- Use tokens: web code links `dist/aid-iot/css/tokens.css` and sets
  `data-brand="aid-iot" data-mode="light|dark|night" data-density="comfortable|compact"`.
- Components and templates use semantic tokens only; never hex, rgb, `--aid-palette-*` or `--aid-brand-*`.
- Do not override `status`, `focus` (protected, owned by core).
- To change the identity, edit `tokens/` only, then `npm run build` and `npm run check`.

## Folder map
- `tokens/`: `palette.tokens.json` (brand-private primitives), `brand.tokens.json` (brand roles).
- `assets/`: logos, imagery, fonts. See `assets/README.md`.
- `templates/`: collateral templates. See `templates/README.md`.
- `skills/`: Agent Skills for this brand.
