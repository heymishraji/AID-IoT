# Next steps (rewritten every session)

1. **Open the three prototypes and pick a direction** — `cd prototypes && npm run dev`, then http://localhost:4173 on desktop and on a phone (same Wi-Fi, use your machine's IP). Why first: every asset, token and technical decision downstream depends on the world; the prototypes exist so this choice is made on feel, not description.
2. **Create the GitHub repo and push** — github.com → New repository `aid-iot-website` (private, empty), then `git push -u origin main` in the project folder. Why: the prototypes are now real code; they should be versioned and portable before we iterate on them.
3. **After the pick: harden the chosen prototype's signature interaction into a reusable component** (A: ExplodedDevice with a real/reference glTF; B: Diagram component fed by data; C: Chapter + Ledger components), then design the Product template in the chosen world. Why: the product page exercises every primitive; if it works there, the other seven templates follow the same system.
4. **Write docs/brand/DESIGN.md from the chosen prototype** (palette, type, spacing, motion rules) — it becomes the contract for the Next.js build.
