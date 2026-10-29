---
name: aid-iot-brand
description: Apply the AID IoT brand (DRAFT) to any output - web or product UI, collateral, slides, social posts or copy. Use when a task mentions AID IoT or its IoT products (GPS tracker, Cortex, IIoT Bridge, AID Fresh, VMS-O, VFMS-O, OBD, AID ERP) or asks for on-brand IoT work.
license: Proprietary. Internal use only.
metadata:
  status: draft
  library-version: "0.0.1"
---

# AID IoT brand (stub)

STUB. The identity is not designed yet; follow the structure, treat every value as a placeholder.

## Steps
1. Read `../../DESIGN.md` (visual rules) and `../../VOICE.md` (writing rules).
2. Identify the output type. If a template exists in `../../templates/<type>/`, follow its `recipe.md`.
3. Style only with semantic tokens from `dist/aid-iot/css/tokens.css` (or `tailwind/theme.css`). No hex values.
4. Write outcome first, plain British English, engineering detail one level down.
5. Run `npm run check` in the library before handing back.

## Never
- Mix in another brand's assets or voice.
- Restyle protected namespaces (`status`, `focus`).
