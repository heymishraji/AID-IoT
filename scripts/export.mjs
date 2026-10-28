// npm run export -- --brand <id> --out <dir>
// Copies core + ONE brand + its built dist into a self-contained folder that works as its own repo,
// then verifies that nothing from any other brand made it in.
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { parseArgs } from 'node:util';
import { pathToFileURL } from 'node:url';
import { ROOT, OPTIONAL_MODULES, listBrands, listFiles, readJson, writeFile, writeAggregates, scanIsolation } from './lib.mjs';
import { build } from './build.mjs';

const agentsMd = (b, v) => `# AGENTS.md · ${b.name} brand package (v${v})

Self-contained export of the AID brand library for **${b.name}** only. Status: DRAFT, placeholder values.

## Read first
1. \`brands/${b.id}/DESIGN.md\`: visual rules (YAML tokens + prose).
2. \`brands/${b.id}/VOICE.md\`: how this brand writes.
3. \`brands/${b.id}/skills/\`: task skills (Agent Skills format).

## Rules
- Use tokens, never literal values. Web: link \`dist/${b.id}/css/tokens.css\` and set
  \`data-brand="${b.id}" data-mode="light|dark|night" data-density="comfortable|compact"\` on <html>.
- Components and templates use semantic tokens only (\`--aid-color-text-primary\`), never
  primitives (\`--aid-color-neutral-*\`, \`--aid-palette-*\`) or hex/rgb values.
- Protected namespaces (\`status\`, \`focus\`, \`symbology\`, \`classification\`) are owned by core: never override.
- Do not edit \`dist/\` or the generated YAML block of DESIGN.md: edit \`brands/${b.id}/tokens/\` and run \`npm run build\`.
- Run \`npm run check\` before handing work back.

## Map
- \`core/\` shared engine: tokens (primitives, semantic, modes, density, protected), reference components.
- \`brands/${b.id}/\` identity: tokens, DESIGN.md, VOICE.md, assets, templates, skills.
- \`dist/${b.id}/\` built outputs: css, tailwind, json, figma.
- \`examples/token-preview.html\` renders every token from CSS variables.
`;

const readme = (b, v, commit, modules) => `# ${b.name} · brand package

Exported from the AID brand library v${v}${commit ? ` (commit ${commit})` : ''}. Status: **DRAFT**, all values are placeholders.
Contains the shared core and this brand only. Optional protected modules included: ${modules.length ? modules.join(', ') : 'none'}.

## Use
- Web: \`<link rel="stylesheet" href="dist/${b.id}/css/tokens.css">\` then
  \`<html data-brand="${b.id}" data-mode="light" data-density="comfortable">\`. Modes: light, dark, night.
- Tailwind v4: \`@import "./dist/${b.id}/tailwind/theme.css";\` after the tokens CSS.
- Figma: \`dist/${b.id}/figma/variables.json\` (collections, modes, aliases).
- Flat JSON: \`dist/${b.id}/json/<mode>.json\`.
- Preview: open \`examples/token-preview.html\`.

## Rebuild
\`npm install\` then \`npm run build\` (Style Dictionary v5) and \`npm run check\`.
Agents: start with \`AGENTS.md\`. Do not edit \`dist/\` by hand; it is regenerated.
`;

export async function exportBrand(id, outDir, { quiet = false } = {}) {
  const brands = listBrands();
  const brand = brands.find((b) => b.id === id);
  if (!brand) throw new Error(`Unknown brand "${id}". Known: ${brands.map((b) => b.id).join(', ')}`);
  if (fs.existsSync(outDir) && fs.readdirSync(outDir).length) throw new Error(`Output folder is not empty: ${outDir}`);
  if (!fs.existsSync(path.join(ROOT, 'dist', id, 'meta.json'))) await build();

  const modules = brand.modules ?? [];
  const skipModule = (src) => OPTIONAL_MODULES.some((m) => !modules.includes(m) && src.endsWith(`${m}.tokens.json`));
  const copy = (rel, filter) => fs.cpSync(path.join(ROOT, rel), path.join(outDir, rel), { recursive: true, filter });
  copy('core', (src) => !skipModule(src));
  copy(`brands/${id}`);
  copy(`dist/${id}`);
  copy('examples');
  for (const f of ['lib.mjs', 'build.mjs', 'check.mjs']) copy(`scripts/${f}`);
  copy('VERSION');
  writeAggregates(outDir);

  const version = fs.readFileSync(path.join(ROOT, 'VERSION'), 'utf8').trim();
  let commit = '';
  try { commit = execSync('git rev-parse --short HEAD', { cwd: ROOT, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim(); } catch {}
  const pkg = readJson(path.join(ROOT, 'package.json'));
  writeFile(path.join(outDir, 'package.json'), JSON.stringify({
    name: `@aid/${id}`, version, private: true, description: `${brand.name} brand package (exported from the AID brand library).`,
    type: 'module', license: 'UNLICENSED', engines: pkg.engines,
    scripts: { build: pkg.scripts.build, check: pkg.scripts.check }, devDependencies: pkg.devDependencies,
  }, null, 2) + '\n');
  writeFile(path.join(outDir, 'AGENTS.md'), agentsMd(brand, version));
  writeFile(path.join(outDir, 'README.md'), readme(brand, version, commit, modules));
  writeFile(path.join(outDir, '.gitignore'), 'node_modules/\n.DS_Store\n');

  const problems = scanIsolation(outDir, brand, brands);
  const files = listFiles(outDir);
  if (!quiet) {
    console.log(`✔ exported ${brand.name} (${id}) v${version} → ${outDir}`);
    console.log(`  ${files.length} files · modules: ${modules.join(', ') || 'none'}`);
    console.log(problems.length ? `✖ isolation: ${problems.length} problem(s)\n  ${problems.join('\n  ')}` : '✔ isolation: no files, names or colour values from any other brand');
  }
  return { files, problems };
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const { values } = parseArgs({ options: { brand: { type: 'string' }, out: { type: 'string' } } });
  if (!values.brand || !values.out) {
    console.error('Usage: npm run export -- --brand <id> --out <dir>');
    process.exit(1);
  }
  const out = path.resolve(process.env.INIT_CWD ?? process.cwd(), values.out);
  try {
    await build(); // always export fresh outputs
    const { problems } = await exportBrand(values.brand, out);
    process.exit(problems.length ? 1 : 0);
  } catch (e) {
    console.error(`✖ ${e.message}`);
    process.exit(1);
  }
}
