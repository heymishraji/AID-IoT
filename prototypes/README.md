# Direction prototypes (Phase 0)

Three working homepages — one per visual direction — with real motion, AID-IoT's own product imagery and realistic operational data. Built to decide a direction, not to ship.

## Run
```bash
cd prototypes
npm run dev          # → http://localhost:4173  (also reachable on your LAN IP for phone testing)
```
No build step. Fonts load from Fontshare (Indian Type Foundry) and Google Fonts; libraries are vendored in `vendor/` (three.js 0.170, GSAP 3.13 + ScrollTrigger, Lenis 1.3).

## What to judge (in this order)
1. **Idea** — does the signature interaction explain *what AID-IoT is* to a non-technical CEO in one scroll?
2. **World** — colour, type, imagery: would you be proud to put this in front of the Indian Army and BigBasket?
3. **Voice** — the copy is shared across all three; note anything that reads wrong.
4. **Phone** — open each on a phone; the signature moment has a designed mobile fallback.

## The three
| Dir | Folder | Signature interaction | Type (all free for commercial use) |
|---|---|---|---|
| A · Open the device | `a/` | Three.js device opens on scroll into the six layers AID-IoT makes; signal trace draws through the story | Cabinet Grotesk · Switzer · Martian Mono |
| B · Panel room | `b/` | Live mimic diagram (ticking values, hover nodes); pinned "walk the line" from sensor to decision | Khand · Ranade · Martian Mono |
| C · Field log | `c/` | Parallax photo chapters; pinned crossfade from the paper register to the Signal ledger | Zodiak · Author · Martian Mono |

## Known stand-ins
- The 3D device in A is a procedural model; the build uses the real product from CAD or photogrammetry.
- Photographs are AID-IoT's own product shots plus Pexels documentary photos (`assets/img/CREDITS.md`) — placeholders for a shoot.
- Numbers marked `[CLIENT TO CONFIRM]` are from the current site and need sign-off.
