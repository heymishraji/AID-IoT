# Skills used on this project (install on any machine before working)

```bash
mkdir -p ~/.claude/skills && cd /tmp
git clone --depth 1 https://github.com/anthropics/skills.git && cp -R skills/skills/frontend-design ~/.claude/skills/
git clone --depth 1 https://github.com/coreyhaines31/marketingskills.git && for k in copywriting copy-editing product-marketing site-architecture cro; do cp -R marketingskills/skills/$k ~/.claude/skills/; done
git clone --depth 1 https://github.com/nextlevelbuilder/ui-ux-pro-max-skill.git && cp -R ui-ux-pro-max-skill/.claude/skills/ui-ux-pro-max ~/.claude/skills/
```
apple-design is already present on the primary machine (HIG-based UI/UX review).

| Skill | Use it for | Do not use it for |
|---|---|---|
| frontend-design | Design plan → review against brief → build → self-critique; the anti-"AI tell" rules | — |
| copywriting / copy-editing | All page copy (reads `.claude/product-marketing.md` first); editing passes | Ad copy |
| product-marketing | Keeping `.claude/product-marketing.md` current | — |
| site-architecture | IA changes, URL plans | XML sitemaps |
| cro | Reviewing a page that is not converting | — |
| ui-ux-pro-max | 119-rule UX checklist, GSAP presets, stack guidance | Aesthetic direction (its default answer is glassmorphism + Roboto) |
| apple-design | HIG review of every screen after it is built; accessibility | — |
| impeccable (cloned, run by hand) | Critique/audit playbooks and heuristic scoring | — |
