# core/ · the shared engine

Everything every brand shares: one type family, spacing, grid, radius, motion, component structure, status
semantics and governance. Core never names a brand (`npm run check` enforces this) so it can ship inside any
single-brand export.

| Folder | Tier | What lives here | Who edits |
|---|---|---|---|
| `tokens/primitives/` | 1 · primitive | Raw values with no meaning: neutral greys, feedback hues, night ramp, 4px space scale, radii, type scale, motion | Brand owner, rarely |
| `tokens/semantic/` | 2 · semantic | Mode-independent roles: type roles (`type.body.*`), shape (`radius.control`), layout grid, target size | Brand owner |
| `tokens/modes/` | 2 · semantic colour | `light`, `dark`, `night`: the same colour role names with per-mode values. Night is brand-immune | Brand owner |
| `tokens/density/` | 2 · semantic | `comfortable` (default) and `compact` (pointer-only consoles): insets, stacks, control height | Brand owner |
| `tokens/protected/` | protected | `status`, `focus` (always on); `symbology`, `classification` (opt-in modules via `brand.json`) | Core only; no brand may override |
| `components/` | consumer | Reference component CSS using semantic tokens only | Anyone, through `npm run check` |

Rules
- Semantic tokens reference core primitives or `brand.*` roles, never `palette.*` (that is brand-private).
- Every mode file and every density file defines exactly the same token names.
- All values are PLACEHOLDERS until the type, colour and logo studies conclude.
