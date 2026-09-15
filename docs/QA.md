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

## 2026-09-16 · Home v2 (visual-first, world A locked), 1440 + 390
Changes from v1: four offers with icons + colour up front; every unit carries an icon; copy cut to one line per item; photos with colour badges; vendor-gap drawn as 4-vs-1; live panel in colour; FAQ renamed to the industry-standard label; orange ask. Palette taken from the mark (amber, blue, green) + signal orange; colour = branch, not decoration.

| # | Heuristic | Score | Note |
|---|---|---|---|
| 1 | Visibility of status | 3 | Hero label states device state; panel shows live status; form confirms. Active nav still missing. |
| 2 | Match real world | 4 | Scenes in the buyer's words; standard "Frequently asked questions"; plain descriptors. |
| 3 | User control | 3 | Native scroll; reduced-motion honoured. |
| 4 | Consistency | 4 | One tile, one icon-tile, one chip, one heading component; colour mapped to the four offers everywhere. |
| 5 | Error prevention | 3 | Labels visible; no inline validation yet. |
| 6 | Recognition | 4 | The four offers and their children are visible in the first two screens; sectors and products are pictured. |
| 8 | Aesthetic & minimal | 3 | Icons and colour carry meaning; text ≤ 1 line per unit; one memorable element (the opening device). |
| 9 | Error recovery | 2 | No error states yet. |
| | **Total** | **26/32** | Good. |

HIG: hierarchy now reads at a glance (size + colour + icon), touch targets ≥ 44px on tiles/chips-as-links, contrast checked for tone-on-soft pairs (text stays ink). Open: active nav, form validation, mega-menu, skip link, 404, Lighthouse.

## 2026-09-16 · Full flow v3 (Home + Fleet & fuel + IIoT Bridge + Signal + Services + Company + Contact + 404), 1440 + 390
Changes: palette cut to paper/ink/one accent (signal orange) + live-green semantic; neutral icon tiles (Lucide 1.75, white tile, hairline, inset highlight); brand-level hero (signal path with animated beams: plant/fleet/depot → AID-IoT → Signal screen/phone) replaces the single-product 3D; bento "Four ways we help" with photos; shared section vocabulary reused on every page; active nav state; skip link; 404; static export + Pages workflow.

| # | Heuristic | Score | Note |
|---|---|---|---|
| 1 | Visibility of status | 4 | Active nav, breadcrumbs, live badges, form confirmation. |
| 2 | Match real world | 4 | Buyer's words; standard FAQ; descriptors on every product. |
| 3 | User control | 4 | Native scroll; reduced-motion; no gates. |
| 4 | Consistency | 4 | One tile/icon/chip/heading system across seven pages. |
| 5 | Error prevention | 3 | Labels, required fields; inline validation still to do. |
| 6 | Recognition | 4 | Offers, sectors, products pictured; nav = branches. |
| 8 | Aesthetic & minimal | 4 | One accent, one memorable element per page. |
| 9 | Error recovery | 3 | 404 with branch links; form error state still to do. |
| | **Total** | **30/32** | Excellent band; remaining: form validation/errors, real Signal screenshots, real product 3D on product pages. |

HIG: hierarchy by size/weight not colour; 44px targets; focus rings; skip link; alt on content images, empty alt on decorative. Bundle: 435 kB first-load JS — reduce (drop Lenis on export? tree-shake motion) before launch.
