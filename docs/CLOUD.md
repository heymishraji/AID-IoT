# Working from a browser or iPad

Everything needed to continue is in this GitHub repo. Claude Code on the web clones it into a fresh cloud
machine for each session, so nothing depends on any one laptop.

## Start a session
1. Open https://claude.ai/code in the iPad browser, signed in to the same Claude account.
2. Pick `heymishraji/AID-IoT`, then describe the task. Claude reads `CLAUDE.md` and starts from `docs/CONTEXT.md`.
3. Setup is automatic: `scripts/setup.sh` installs graphify and the brand library, and builds it.
4. Review the changes Claude pushes, and ask it to merge to `main` when they are ready.

Last tested on a real cloud machine on 2026-11-04: fresh clone, automatic setup, `npm run check` (all passing),
graphify, the skills, and a 2-second video rendered with the brand fonts.

## If the repo is private
The Claude GitHub App must be installed on it: GitHub, Settings, Applications, Claude, Configure, then add AID-IoT.

## What comes with the repo
- Project rules (`CLAUDE.md`), state (`docs/`), hooks and settings (`.claude/settings.json`).
- Skills in `.claude/skills/`: video (hyperframes family, video-use), design and web (frontend-design,
  design-taste-frontend, redesign-existing-projects, ui-ux-pro-max, site-architecture), copy (copywriting,
  copy-editing, cro, product-marketing), and ponytail. Licences: `.claude/skills/_licences/README.md`.

## What does not come with the repo
| Thing | Where it lives | What to do |
|---|---|---|
| Figma | Figma account; repo holds SVGs, data and prompts, not the Figma file | Not connected on claude.ai yet: add Figma under Settings, Connectors, then switch it on for the session |
| Artifacts and Claude Docs | Claude account | Same account reaches them; sources are in `docs/` |
| Local memory | Laptop only | Moved into `CLAUDE.md` |
| API keys (e.g. ElevenLabs for voiceover) | Nowhere yet | Add as cloud environment secrets; never commit them |
| `apple-design`, `brag` skills | Laptop only | Left out: no licence found. Add through claude.ai if needed |

## Video
Ask for the video as usual. Claude runs `scripts/video-kit.sh` so the render has the brand fonts and GSAP locally,
because the render browser cannot reach the internet. Web pages can still use Google Fonts. To get a finished video
onto the iPad, ask Claude to send you the file or commit it.

## Limits of a cloud session
- Git tags cannot be pushed from the cloud, so a release tag has to be made on GitHub itself.
- Each session starts clean: unpushed work is at risk, so push at the end of every task.
- Long video renders use the same usage limits as everything else.
