# QA log — heuristic + HIG review after every screen

## 2026-09-16 · Home (site/), worlds A/B/C, 1440 + 390
Method: Nielsen 10 (0–4, Persuade mode, 7 & 10 n/a → /32) + Apple HIG lenses (clarity · deference · depth; accessibility; consistency) + ui-ux-pro-max pre-delivery checklist.

| # | Heuristic | Score | Note |
|---|---|---|---|
| 1 | Visibility of status | 3 | Header solidifies on scroll; hero label states device state in A; form confirms "Sent". Missing: active nav state. |
| 2 | Match real world | 4 | Copy is in the buyer's words (phone call / register / silence); products carry descriptors. |
| 3 | User control | 3 | No scroll-jacking (A pins but native scroll drives it); reduced-motion honoured; world switch is review-only chrome. |
| 4 | Consistency | 4 | One type scale, one heading component, one button system, shadcn primitives; same structure in all three worlds. |
| 5 | Error prevention | 3 | Form has visible labels and required fields; no inline validation messages yet. |
| 6 | Recognition | 3 | Sections are self-explaining; FAQ answers the seven objections. Nav is anchors only (no mega-menu yet). |
| 8 | Aesthetic & minimal | 3 | One memorable element per page (hero signature); no eyebrows/dots/arrows/numbered non-sequences. Result tiles are the only cards. |
| 9 | Error recovery | 2 | No error states designed yet (form failure, image failure). |
| | **Total** | **25/32** | Good (was 13/32 on the live site). |

HIG: clarity — type ≥ 17px body, contrast ≥ 4.5:1 in all worlds (checked tokens); deference — imagery and content lead, chrome is quiet; depth — the A hero uses real depth (3D), B/C use layering not shadows. Accessibility: 44px targets on buttons/nav, focus ring on all interactives, `aria-label` on menu button, `aria-pressed` on world switch, alt text on photos (illustrative panels marked as such). Reduced-motion: Lenis off, R3F ends in open state — **verify on device**.

Fix list (open): active nav state; form validation + error state; mega-menu with descriptors; 404; skip link; image `sizes` audit; Lighthouse run.
