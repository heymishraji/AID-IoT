# INDEX · need X → read Y

Single entry point for people and agents. Paths are relative to this package folder. Status: skeleton, placeholder values.

## Understand the library
| Need | Read |
|---|---|
| What this library is and the rules | `AGENTS.md` |
| How it is organised, how to add/export a brand, how a rebrand flows, releases | `docs/LIBRARY.md` |
| Project state, decisions, research, product facts | Not shipped here: the AID workspace repo (its root `AGENTS.md`) |

## Work on a brand
| Need | Read |
|---|---|
| AID IoT visual rules | `brands/aid-iot/DESIGN.md` |
| AID IoT voice | `brands/aid-iot/VOICE.md` |
| AID Defence visual rules | `brands/aid-defence/DESIGN.md` |
| AID Defence voice (discretion rules) | `brands/aid-defence/VOICE.md` |
| Legal documents (letterhead, contracts) | `brands/inordinate/DESIGN.md` |
| Logos, imagery, fonts for a brand | `brands/<id>/assets/README.md` |
| A collateral template (deck, datasheet, social…) | `brands/<id>/templates/README.md` |
| A task skill for an agent | `brands/<id>/skills/*/SKILL.md` |

## Use tokens
| Need | Read / use |
|---|---|
| CSS variables for a brand (all modes + densities) | `dist/<id>/css/tokens.css` (run `npm run build` first) |
| Tailwind v4 theme | `dist/<id>/tailwind/theme.css` |
| Flat JSON per mode | `dist/<id>/json/<mode>.json` |
| Figma variables (collections, modes, aliases) | `dist/<id>/figma/variables.json` |
| Token sources: shared core | `core/tokens/` (primitives, semantic, modes, density, protected) |
| Token sources: one brand | `brands/<id>/tokens/` (palette + brand roles) |
| Which token to use for what | `$description` fields in the token JSON; `docs/LIBRARY.md` § Tokens |
| Reference component CSS | `core/components/components.css` |
| Fonts: which face for what, loading, matching sizes in Figma/Slides/Canva | `core/fonts/README.md` |
| See every token rendered, switch brand/mode/density | `examples/token-preview.html` |

## Change things
| Need | Do |
|---|---|
| Rebrand / change a colour | Edit `brands/<id>/tokens/*.tokens.json`, `npm run build`, `npm run check` |
| Add a brand | `docs/LIBRARY.md` § Add a brand |
| Ship one brand to its own repo | `npm run export -- --brand <id> --out <dir>` |
| Release a version | `docs/LIBRARY.md` § Releases; update `VERSION`, `package.json`, `CHANGELOG.md` |
