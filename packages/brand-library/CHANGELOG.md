# Changelog

All notable changes to the AID brand + design-system library. Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/);
versions follow [SemVer](https://semver.org/) as defined in `docs/LIBRARY.md` § Releases. The brand owner cuts every release.

## [Unreleased]
### Added
- Type: Archivo as the shared text face, Atkinson Hyperlegible Next as the shared data face (replaces the
  system-stack placeholder). `font.family.data`, `font.match.*` (measured size and weight match), semantic
  `type.data` and `type.data-strong`, `.aid-data` component class, `core/fonts/` (loading + README).

## [0.0.1] - 2026-10-27
### Added
- Library skeleton: shared `core/` (DTCG 2025.10 tokens: primitives, semantic, light/dark/night modes,
  comfortable/compact density, protected `status`/`focus`/`symbology`/`classification`), reference component CSS.
- Brand folders `aid-iot`, `aid-defence`, `inordinate` (legal parent) and `_fixture-brand` (test only), each with
  tokens, DRAFT DESIGN.md (Google DESIGN.md format), AGENTS.md, assets/templates READMEs and a stub skill.
- Style Dictionary v5 build → CSS variables, Tailwind v4 theme, flat JSON, Figma-variables JSON per brand.
- `npm run export` (single-brand self-contained package) and `npm run check` (governance + isolation tests).
- `examples/token-preview.html` brand/mode/density switcher.
### Notes
- Every colour, type and spacing value is a PLACEHOLDER. No visual decisions have been made.
