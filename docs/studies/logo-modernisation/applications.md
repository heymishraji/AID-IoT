# Touchpoint mockups to make in Figma (logo modernisation, round 1)

_For the main session. Each mockup: generate a blank scene with an empty surface (prompt below), then place
the real vector file from `svg/` on the surface in Figma (perspective/warp to the surface; never redraw).
Colour routes are not chosen yet: Copper (AID IoT) and Slate & Brass (AID Defence) are used as stand-ins; swap
by re-placing the matching file after the route decision._

Rules for every scene: no visible text or logos in the generated image; no people's faces needed; no weapons,
uniforms, camouflage or combat in Defence scenes; Indian settings where a place is visible (but no
identifiable real sites for Defence).

| # | Touchpoint | Scene prompt (blank surface) | File to place | Colour | Production note |
|---|---|---|---|---|---|
| 1 | **IoT sensor enclosure** | Close-up product photo of a small matte warm-grey plastic IoT sensor enclosure, 80 × 60 mm, mounted on a cold-room wall, soft daylight, shallow depth of field, blank top face | `svg/recommended/aid-iot-symbol.svg` (symbol only, 10 mm) | One colour: debossed tone-on-tone (no ink) | Moulded deboss ≥ 12 mm for crisp gaps; at 10 mm use pad print in neutral 700 instead — show the pad-print version |
| 2 | **PCB** | Macro photo of a green-free, matte black IoT circuit board with components, studio light, an empty area of solder mask near one corner | `svg/recommended/aid-iot-symbol-16.svg` (small master), 5 mm | One colour: white silkscreen | Small master only; gaps ≥ 0.2 mm at 5 mm (pass) |
| 3 | **Delivery van livery** | Side view of a plain white light commercial van parked in an Indian industrial estate at morning, clean empty side panel | `svg/lockups/aid-iot-horizontal-colour.svg`, symbol height ≈ 350 mm, plus `svg/elements/pattern-lattice.svg` as a low-contrast band along the lower panel | Colour (Copper accent, ink near-black) | Cut vinyl: each node and link a separate piece, all ≥ 25 mm; pattern as printed wrap film |
| 4 | **Billboard / hoarding** | Roadside hoarding on a bright Indian city arterial road at dusk, blank warm-white face, 12 × 4 m | `svg/elements/supergraphic-aid-iot.svg` on the right; `svg/lockups/aid-iot-horizontal-colour.svg` bottom left; headline set in Archivo ("Tell us the problem.") | Colour on warm white (neutral 100) | Symbol ≥ 250 mm per 30 m viewing distance (pass at any hoarding size); use master, not small master |
| 5 | **Business card and letterhead** | Top-down photo of a blank warm-white business card and an A4 letterhead on a light oak desk, soft window light | Card front: `svg/lockups/aid-iot-stacked-colour.svg` (20 mm); card back: `svg/elements/pattern-lattice.svg` in Copper 700 at 20% | Colour front; one-colour pattern back | Stacked lockup ≥ 14 mm; optional blind emboss of the symbol on the back (gaps ≥ 0.5 mm at 20 mm: pass) |
| 6 | **Phone home screen + browser tab** | A smartphone lying on a desk showing a blank home screen grid, and a laptop with a browser window, both screens empty | `svg/recommended/aid-iot-app-icon.svg` among neutral icons; `svg/recommended/aid-iot-favicon.svg` in the tab at true 16 px | Colour tile (ink tile, Copper node) | Check the 16 px favicon on light and dark tab strips; icon keeps 17% margin for circular masks |
| 7 | **Embroidered cap / polo** | Close-up of a plain dark charcoal cotton cap (or polo chest) on a neutral background, empty front panel | `svg/recommended/aid-iot-symbol-16.svg` geometry scaled to 22 mm | One colour: warm off-white thread; optional Copper thread for the apex node | Embroidery ≥ 16 mm; small-master geometry so links ≥ 1.3 mm and gaps ≥ 1 mm |
| 8 | **AID Defence rugged equipment** | Studio product render of a dark slate-grey rugged electronics case (ruggedised receiver unit) on a neutral grey ground, no markings, no weapons, low-key lighting | `svg/recommended/aid-defence-symbol-tone-on-tone.svg`, 15 mm, symbol only (no "DEFENCE" text) | Tone-on-tone (Slate 500 on Slate 700) | Laser etch or deboss; no white, no optically brightened ink (night-vision visibility); ≥ 6 mm etched, ≥ 14 mm moulded |
| 9 | **AID Defence briefing slide** | A large wall-mounted screen in a calm, dim, neutral meeting room (no flags, no uniforms), screen blank | Slide: `svg/elements/supergraphic-aid-defence.svg` on Slate 900 at right; `svg/lockups/aid-defence-horizontal-colour.svg` top left; title "Any requirement, answered clearly." in Archivo | Colour on dark (Brass node) | Projection: use the master; check the bearing hairlines stay visible but quiet at 1080p |
| 10 | **Trade-show booth** | An empty modular trade-show booth (3 × 3 m) with a blank back wall and a blank counter front, neutral hall lighting | Back wall: `svg/elements/supergraphic-aid-iot.svg` at full height; counter: `svg/lockups/aid-iot-horizontal-colour.svg`; side panel: `svg/elements/network.svg` at 15% | Colour on warm white | Large format print; never use the small master at this scale; keep 2N clear space around the counter lockup |

## Optional (if time allows)
- **Video end card** — record `AIDLogo.reveal()` from `showcase.html` (Logo reveal → Replay) at 1920 × 1080
  on warm white and on Slate 900; end on the static lockup for 2 s.
- **Social avatar** — the app icon in a circular crop on LinkedIn at 400 px and 32 px.

## Next steps
1. **Generate scenes 1, 3, 6 and 8 first** — they cover the four hardest cases (tiny product mark, distance
   viewing, 16 px digital, discreet Defence) and will expose any weakness fastest.
2. **Place only the exported SVG files** — never trace or retype the logo, so the mockups test the real
   artwork.
3. **Re-place files after the colour-route decision** — the files regenerate from `build.mjs`; the scenes do
   not need to be regenerated.
