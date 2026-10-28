# AGENTS.md · Inordinate Industrial Innovation Pvt Ltd (legal parent, DRAFT)

Use this identity **only** for legal and corporate documents: letterhead, contracts, invoices, purchase orders,
NDAs, statutory notices. For anything a customer sees as marketing or product, use the product brand instead.

## Read first
1. `DESIGN.md`: minimal visual rules (generated YAML + prose).
2. `VOICE.md`: formal legal English.
3. `skills/inordinate-legal-docs/SKILL.md`.

## Rules
- Near-monochrome; no imagery, no accent colours, no product names.
- Tokens only: `dist/inordinate/css/tokens.css` with `data-brand="inordinate" data-mode="light"`.
- Never hard-code colours; never override protected namespaces (`status`, `focus`).
- Change the identity in `tokens/` only, then `npm run build` and `npm run check`.
