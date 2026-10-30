# AID mark — logo modernisation study, round 1

_Status: study for owner review, 2026-10-30. Not yet a decision. Open `showcase.html` in a browser (light/dark
toggle top right; follows the OS by default)._

**In one line:** keep the current mark and give it its true story (triangulation). For **AID IoT** use
**Beacon**: the same drawing, corrected, in one colour, with the apex node lit. For **AID Defence** use
**Facet**: the same skeleton, closed and sharp. Both scored 27/28 against the checklist in `RESEARCH.md`.

---

## 1. The story (one sentence)

> **Three references, one fix.** A position fix needs at least three references — that is how NavIC works for
> NAVIC and Lighthouse — and three nodes joined by three links is what AID builds: a device that senses, a
> link that connects, a platform that decides.

The story is a reason for the drawing, told in the guidelines. The mark does not illustrate it (Rand: "a logo
doesn't sell, it identifies"). Reading order, used by every animation: **L (sense) → R (connect) → A (decide)**.

## 2. What is in this folder

| File | What it is |
|---|---|
| `RESEARCH.md` | What makes a long-lived logo (Rand, C&G&H/Haviv, Bierut, Pentagram, Apple HIG, trademark law), the 14-point pass/fail checklist, and production constraints for every touchpoint. Written before drawing. |
| `current-mark.svg` | Faithful vector redraw of the current mark on a 120 grid (original colours #FF9A04, #37A955, #4586F3 sampled from the PNG). |
| `svg/variants/<id>.svg` | Each variation, one colour (`currentColor`), outlined to filled paths. `-colour.svg` where colour matters; `-16.svg` is the 16 px small master. |
| `svg/recommended/` | Clean files for Figma: symbol as one `fill-rule="evenodd"` path (plus one path for the accent node), no `<text>`. Mono, colour, reversed, tone-on-tone, 16 px, app icon, favicon. |
| `svg/lockups/` | Horizontal and stacked lockups for AID IoT and AID DEFENCE; wordmarks are Archivo outlines (no font dependency). Mono and colour. |
| `svg/elements/` | Pattern tiles, supergraphics, network motif, state glyphs. |
| `logo-kit.js` | **The single source of truth.** Plain JS (`window.AIDLogo`): geometry, variants, lockups, patterns, loader, states. Every file above is generated from it. |
| `build.mjs`, `showcase-data.json` | Regenerate everything: `node docs/studies/logo-modernisation/build.mjs`. Text for the showcase lives in the JSON. |
| `showcase.html` | The review page (self-contained; the kit is inlined). |
| `applications.md` | Touchpoint mockups for the main session to make in Figma. |

## 3. Construction (all variants)

- **Grid:** 120 × 120. **Skeleton:** equilateral triangle, side 88, apex at (60, 21) — 0.9 units above
  geometric centre, because a triangle's mass sits low. Centroid (the "fix") at (60, 71.8).
- **Parts:** N = node diameter, W = link width, G = gap between node and link. **The gap rule:** links
  never touch nodes, and G is constant.
- **Optical corrections:** the horizontal base link is 6% thinner than the diagonals (9.4 vs 10), because
  horizontals look heavier; nodes are 1.8 × W so they read as things, not as line ends.
- **Small master:** below 25 px (and on any physical mark under 8 mm) the kit switches to a separate drawing
  on the 16 px grid: side 12, base on y = 13 so the base link is pixel-crisp at 2 px, nodes 3.6 px, gaps ≈ 1 px.
  Network switches below 40 px, because its rings fill in.

## 4. The variations

| id | Name | What changed | Keeps | 16 px | Motion | Score |
|---|---|---|---|---|---|---|
| `current` | Current (redrawn) | Nothing — the baseline | — | Pills blur | — | 15 |
| `refined` | Refined | Lighter even links (10 vs 14.4), larger nodes, one gap, optical corrections | All structure | Small master; reads | Nodes light, links draw | 25 |
| `beacon` | **Beacon** | Refined in one colour + the apex node as the single accent | Drawing and the orange apex dot, now in the brand hue | Accent dot survives when links blur | Lit node travels sense → connect → decide | **27** |
| `relay` | Relay | Links leave one node and stop short of the next: the mark turns | Nodes, links, caps | Asymmetry collapses | The most natural motion; used as the loader idea | 23 |
| `network` | Network | Ring nodes, monoline links: a diagram | Skeleton | Rings fill in; swaps below 40 px | Rings fill for state | 19 |
| `socket` | Socket | Heavy frame; each link end is an arc concentric with its node (round sockets) | Nodes, gap rule | Best of the set | Filled links can only fade | 22 |
| `fix` | Fix | Refined + the fix at the centroid | Whole Refined drawing | Fix dot dropped | Ideal end state ("fix acquired") | 23 |
| `facet` | **Facet** | Same skeleton and nodes; links cut square to each corner's bisector; firmer, tighter | Nodes, positions, gap rule | Small master holds | Step-wise, like a briefing | **27** |
| `tile` | Tile | Application of Beacon: knocked out of a soft square, 17% safe margin | — | Small master at 80% | — | app |

How each avoids the generic triangle (Delta, Adidas, Google Drive, Arduino, recycling sign): the triangle is
never drawn as a solid or an outline — it is implied by six separated parts with a constant gap, and (Beacon,
Facet) one lit node. Weak on this test: Network (reads as a generic graph icon), Socket (heavy frame reads
as a solid triangle from a distance), Relay (rotation recalls the recycling and refresh icons), Fix (triangle
plus centre dot recalls the trig-point and "eye in a triangle").

Full rationale per variant (what changed, why modern, what it keeps, 16 px, motion, not-a-generic-triangle) is
on each card in `showcase.html` and in `showcase-data.json`.

## 5. Scorecard (checklist from `RESEARCH.md` §2; 2 pass, 1 partial, 0 fail)

| Criterion | Current | Refined | Beacon | Relay | Network | Socket | Fix | Facet |
|---|---|---|---|---|---|---|---|---|
| C1 Simple | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 |
| C2 Memorable (doodle test, predicted) | 1 | 2 | 2 | 1 | 2 | 2 | 2 | 2 |
| C3 Distinctive, not a generic triangle | 1 | 1 | 2 | 1 | 1 | 1 | 1 | 2 |
| C4 Appropriate (story, both stances) | 1 | 2 | 2 | 2 | 1 | 2 | 1 | 2 |
| C5 Scales to 16 px | 1 | 2 | 2 | 1 | 1 | 2 | 1 | 2 |
| C6 One colour and reversed | 1 | 2 | 2 | 2 | 2 | 2 | 2 | 2 |
| C7 Production-safe | 1 | 2 | 2 | 1 | 1 | 1 | 2 | 2 |
| C8 Timeless | 1 | 2 | 2 | 2 | 1 | 2 | 2 | 2 |
| C9 Construction and balance | 1 | 2 | 2 | 2 | 2 | 2 | 2 | 2 |
| C10 System potential | 1 | 2 | 2 | 2 | 2 | 1 | 2 | 2 |
| C11 Motion and behaviour | 1 | 2 | 2 | 2 | 2 | 1 | 2 | 2 |
| C12 Ownable | 1 | 1 | 1 | 2 | 0 | 2 | 1 | 2 |
| C13 Continuity with current mark | 2 | 2 | 2 | 2 | 1 | 1 | 2 | 1 |
| C14 Two-brand fit | 0 | 1 | 2 | 1 | 1 | 1 | 1 | 2 |
| **Total (of 28)** | **15** | **25** | **27** | **23** | **19** | **22** | **23** | **27** |

Rule: a recommendation must reach 24 and must not fail C3, C5, C6 or C13. C2 is a prediction until the doodle
test is run with people.

## 6. Recommendation

**Top choice: Beacon (AID IoT) + Facet (AID Defence), as one system.** Same skeleton, same three nodes, same
gap rule; two treatments.

- **Beacon, 27/28.** Keeps the current mark almost exactly (C13), fixes the "too many colours" problem by
  moving to one ink plus one accent node, keeps green and red free for status, and the lit apex is a
  signature that survives at 16 px. Its partial score is ownability: in one colour it is Refined.
- **Facet, 27/28.** Closed, sharper and quieter, as the Defence strategy asks, with no military cliché. Its
  partial score is continuity — correct for a brand that must look different from AID IoT
  (covered-logo test).

**Runner-up: Refined (25/28)**, for both brands in one colour, if the owner wants no accent at all. It loses
distinctiveness (C3) and two-brand fit (C14).

**Kept as behaviours, not masters:** Relay (the loader's idea of a signal travelling), Fix ("fix acquired"
success state), Network (state glyphs).

`AIDLogo.recommended = { iot: 'beacon', defence: 'facet' }`.

## 7. Usage rules

**Clear space:** 2N on every side (N = node diameter ≈ 19% of symbol height, so 2N ≈ 38%). Applies to the
symbol and both lockups.

**Lockups:** horizontal — wordmark cap height 40% of the symbol, baseline on the base nodes' lower edge, gap
1.5N. Stacked — cap height 26% of the symbol, gap 1.1N, centred. AID IoT: **AID** Archivo Bold + IoT Archivo
Regular. AID DEFENCE: **AID** Archivo Bold + DEFENCE Archivo SemiBold at 56% size, tracked +10%. Always use the
outlined files or `AIDLogo.lockup()`; never retype.

**Minimum sizes** (derived from the smallest gap; see `RESEARCH.md` §3–4):

| Use | Beacon | Facet |
|---|---|---|
| Screen, master | ≥ 25 px | ≥ 25 px |
| Screen, small master | 16–24 px; never below 16 px | same |
| Lockup, horizontal / stacked | ≥ 24 px / ≥ 56 px tall | same |
| Print | symbol ≥ 6 mm; stacked lockup ≥ 14 mm; under 8 mm use small master | same |
| PCB silkscreen | ≥ 4 mm, small master, one colour | ≥ 4 mm |
| Laser etch | ≥ 5 mm | ≥ 6 mm |
| Moulded emboss / deboss | ≥ 12 mm | ≥ 14 mm |
| Embroidery | ≥ 16 mm, small-master geometry, gaps ≥ 1 mm | ≥ 20 mm |
| Cut vinyl | ≥ 25 mm (each part weeds separately) | ≥ 25 mm |
| Signage | 25 mm of symbol per 3 m of viewing distance | same |

**Do**
- Use one colour first; the accent goes only on the apex node, one hue per brand.
- Use the small master at 24 px and below and under 8 mm (the kit switches automatically).
- For AID Defence equipment, use the tone-on-tone file (`aid-defence-symbol-tone-on-tone.svg`): one subdued
  colour, no white, no optically brightened inks, symbol only.
- Let parts recur (bullets, dividers, patterns), always from the kit so proportions stay true.

**Don't**
- Bring back three colours, or colour links and nodes differently.
- Join links to nodes, or draw the triangle as an outline.
- Rotate or flip (the apex points up), stretch, or change the gap.
- Add gradients, glow, glass, shadows or outlines.
- Use status green, amber or red as the accent.

## 8. How each UI element derives from the mark

| Element | Derived from | Kit call |
|---|---|---|
| Pattern tiles (lattice, marks, nodes) | The 60° lattice the skeleton sits on; nodes and gapped links at mark proportions | `AIDLogo.pattern(id, {color, opacity})` |
| Supergraphic | The mark at architectural scale, cropped; Defence adds bearing lines from each node through the fix (navigation, no reticle) | `AIDLogo.supergraphic(brand)` |
| Divider | The base of the mark stretched: node · link · node, with the accent node mid-run | `AIDLogo.divider({brand})` |
| Bullet, process steps | A node; steps are nodes joined by vertical links, last node lit | `AIDLogo.bullet({accent})` |
| Network motif | Jittered lattice; links obey the gap rule; a few accent nodes | `AIDLogo.network({width, height})` |
| Icon frame | A frame line that breaks around an apex node (the gap rule); circle for IoT, square for Defence | `AIDLogo.iconFrame(svg, {brand})` |
| State glyphs | The three nodes: idle (rings), sensing (one node + pulse), connected (full mark), alert (a broken link + lost node), fix (full mark + centroid) | `AIDLogo.stateGlyph(state)` |
| Loader | Nodes light and links draw in travel order; Defence switches parts on whole, then the fix | `AIDLogo.loader({size, brand})` |
| Fix acquired | Nodes in, links converge, the fix lands with a closing ring | `AIDLogo.success({brand})` |
| Logo reveal | Nodes in order, links draw, wordmark follows | `AIDLogo.reveal(brand, id)` |

All motion has a designed static state under `prefers-reduced-motion` (loader: all nodes on, links at 30%;
success and reveal: final frame; sensing pulse: a still ring).

## 9. Using the kit in another page

From `docs/studies/identity-round-1/ui-previews/`:

```html
<script src="../../logo-modernisation/logo-kit.js"></script>
<script>
  AIDLogo.injectCss();                                   // once: loader, states, reveal, divider styles
  document.querySelector('#logo').innerHTML =
    AIDLogo.lockup('aid-iot', AIDLogo.recommended.iot, { height: 32 });
  document.querySelector('#spinner').innerHTML = AIDLogo.loader({ size: 40 });
  document.body.style.backgroundImage = AIDLogo.pattern('lattice', { color: '#8D3700', opacity: 0.12 });
</script>
<!-- theme the accent node from CSS: -->
<style>[data-brand="aid-iot"]{ --aid-mark-accent: var(--route-600); }</style>
```

`AIDLogo.mark(id, {size, title})` returns inline SVG using `currentColor` for the structure,
`--aid-mark-node` for nodes and `--aid-mark-accent` for the accent node.

## 10. Known weaknesses

- **Wordmark kerning** is hand-set (only "To" is kerned); a type designer should check AID/IoT spacing at
  display size before release.
- **Beacon in one colour** is Refined: its ownable signature needs the accent. Trademark filing should cover
  the mark in one colour and in colour.
- **Facet's small master** at 16 px softens its chamfers into near-round gaps; it reads as the same family but
  loses some of its sharpness.
- **Production minimums** are vendor guidance, not tests on AID's materials.
- **C2 (memorable)** is predicted, not measured.
- Archivo outlines are embedded (SIL Open Font Licence permits this); rebuild if the type decision changes.

## Next steps

1. **Owner chooses: Beacon + Facet, or the runner-up** — tokens, UI previews and Figma mockups all need one
   skeleton fixed first.
2. **Run the doodle test and the covered-logo test with five people** — C2 is the one criterion rendering
   cannot check, and the covered-logo test is how STRATEGY-CONTRAST judges brand difference.
3. **Pick one colour route per brand** — the accent node needs its final hue; every file regenerates from
   `build.mjs` in one step.
4. **Make the touchpoint mockups in Figma from `applications.md`** — the CEO will judge the mark on a device,
   a van and a slide, not on a grid.
5. **Order supplier test panels and start trademark clearance (Classes 9, 38, 42, 13)** — production
   minimums must be confirmed on real materials, and simple geometric marks need early clearance.
