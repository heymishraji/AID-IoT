---
name: aid-defence-brand
description: Apply the AID Defence brand (DRAFT) to any output - briefing decks, datasheets, one-pagers, Lighthouse operator UI, classification banners or copy. Use when a task mentions AID Defence, NAVIC CMS, Lighthouse, ADS (anti-drone system) or other defence work.
license: Proprietary. Internal use only.
metadata:
  status: draft
  library-version: "0.0.1"
---

# AID Defence brand (stub)

STUB. The identity is not designed yet; follow the structure, treat every value as a placeholder.

## Steps
1. Read `../../DESIGN.md` (visual rules, modes) and `../../VOICE.md` (discretion rules).
2. Identify the output type. If a template exists in `../../templates/<type>/`, follow its `recipe.md`.
3. Style only with semantic tokens from `dist/aid-defence/css/tokens.css`. Operator UI: night or dark mode,
   compact density. No hex values.
4. Write problem → approach → invitation to a private conversation. Plain British English.
5. Run `npm run check` in the library before handing back.

## Never
- Include real sites, kit, units, customers or locations unless explicitly cleared.
- Restyle `status`, `focus`, `symbology` or `classification` (protected).
- Mix in another brand's assets or voice.
