# Next steps

1. **Owner review of round 1 (end to end, ready now).** Figma: https://www.figma.com/design/IxAZrYXdTZpYgPzZD8mWSV
   (start at Cover, then 00 · Read me). UI previews + lessons: https://claude.ai/artifact/6JCbNb5c7mEqH1a7g4dTWB.
   Logo showcase: https://claude.ai/artifact/JK6tg57QvjLkfzA12ndfvq. Picks needed: modernised mark (Beacon + Facet
   or Refined), one colour route per brand, imagery to keep.
   Why: every token value, template and DESIGN.md rule waits on these choices.
2. **Set the picks into the brand library**: brand palettes and roles (`packages/brand-library/brands/<id>/tokens/`),
   the mark SVGs into `brands/<id>/assets/logo/`, regenerate the logo files with `node docs/studies/logo-modernisation/build.mjs`,
   rebuild and run the checks (contrast included).
   Why: one change propagates to every output, and the checks prove the real values pass AA.
3. **Close the three library gaps the previews exposed**: night versions of status/symbology/classification, a brand
   neutral role if a tinted route wins, and calmer status colours.
   Why: night mode is a Lighthouse requirement, and the bright placeholders clash with every route.
Also: doodle test and covered-logo test with five people; trademark search (classes 9, 38, 42, 13); a type designer
checks the AID / IoT wordmark spacing; regenerate the two touchpoint scenes with Indian flags in the background
(carton, exhibition stand); split PRODUCT-FACTS per brand.
