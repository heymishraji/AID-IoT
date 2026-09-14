# Next steps (rewritten every session)

1. **Review the real build and pick a world** — `cd site && npm run dev` → http://localhost:3311; use the A/B/C control bottom-left. Same structure, same story, three worlds. Why now: the structure and copy are no longer in question; only the world is, and it gates the design-system token freeze.
2. **Create the GitHub repo and push** (`aid-iot-website`, private, empty; then `git push -u origin main`). Why: the site is now real code with dependencies; it must be versioned before more pages are built.
3. **Freeze tokens for the chosen world, delete the other two, and build the Product template (IIoT Bridge)** with the same section vocabulary + Tailark blocks. Why: the product page exercises every primitive; if the system holds there, Solution/Software/Service/Company templates follow by data, not design.
4. **Run the copy-editing skill over docs/copy/01-homepage.md and write the Product page copy** with the copywriting skill (context in .claude/product-marketing.md). Why: copy is an input to the template, not a fill-in afterwards.
5. **Close the QA fix list in docs/QA.md** (active nav, form validation/error states, mega-menu, skip link, 404, Lighthouse ≥ 90 mobile). Why: these are the difference between a demo and a site the CEO can be shown.
