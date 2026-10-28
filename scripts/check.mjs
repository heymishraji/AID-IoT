// npm run check — guards the rules that keep the library rebrand-proof and portable.
// Adapts to where it runs: inside a single-brand export, fixture and export tests are skipped.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import {
  ROOT, MODES, DENSITIES, PROTECTED, OPTIONAL_MODULES, BRAND_NAMESPACES,
  listBrands, listFiles, readJson, tokenFiles, walkTokens, brandHexes, coreHexes,
} from './lib.mjs';
import { build } from './build.mjs';

const results = [];
async function test(name, fn) {
  try {
    const out = await fn();
    if (out?.skip) results.push(['SKIP', name, out.skip]);
    else if (out?.problems?.length) results.push(['FAIL', name, out.problems]);
    else results.push(['PASS', name, out?.detail ?? '']);
  } catch (e) {
    results.push(['FAIL', name, [e.message.split('\n').map((l) => l.trim()).filter(Boolean)[0] ?? String(e)]]);
  }
}
const rel = (f) => path.relative(ROOT, f);
const brands = listBrands();
const fixtures = brands.filter((b) => b.role === 'fixture');
const real = brands.filter((b) => b.role !== 'fixture');

// Hard-coded colour detector (exported for the self-test below).
const COLOUR_LITERAL = /(?<![&\w-])#(?:[0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{3,4})\b|\b(?:rgba?|hsla?|hwb|oklch|oklab|lab|lch)\(/gi;

await test('VERSION matches package.json', () => {
  const v = fs.readFileSync(path.join(ROOT, 'VERSION'), 'utf8').trim();
  const p = readJson(path.join(ROOT, 'package.json')).version;
  return { problems: v === p ? [] : [`VERSION ${v} ≠ package.json ${p}`], detail: v };
});

await test('brand manifests are valid', () => {
  const problems = [];
  for (const b of brands) {
    if (b.id !== path.basename(b.dir)) problems.push(`${b.id}: id must equal folder name`);
    if (!['brand', 'legal-parent', 'fixture'].includes(b.role)) problems.push(`${b.id}: unknown role "${b.role}"`);
    for (const m of b.modules ?? []) if (!OPTIONAL_MODULES.includes(m)) problems.push(`${b.id}: unknown module "${m}"`);
  }
  return { problems, detail: brands.map((b) => b.id).join(', ') };
});

await test('no brand overrides a protected namespace', () => {
  const problems = [];
  for (const b of brands)
    for (const f of tokenFiles(path.join(b.dir, 'tokens')))
      for (const key of Object.keys(readJson(f)).filter((k) => !k.startsWith('$'))) {
        if (PROTECTED.includes(key)) problems.push(`${rel(f)}: defines protected namespace "${key}"`);
        else if (!BRAND_NAMESPACES.includes(key)) problems.push(`${rel(f)}: "${key}" is outside brand namespaces (${BRAND_NAMESPACES.join(', ')})`);
      }
  return { problems, detail: `protected: ${PROTECTED.join(', ')}` };
});

await test('every brand defines every brand role core uses', () => {
  const needed = new Set();
  for (const f of listFiles(path.join(ROOT, 'core/tokens')))
    for (const m of fs.readFileSync(f, 'utf8').matchAll(/\{(brand\.[^}]+)\}/g)) needed.add(m[1]);
  const problems = [];
  for (const b of brands) {
    const have = new Set(tokenFiles(path.join(b.dir, 'tokens')).flatMap((f) => [...walkTokens(readJson(f))].map(([p]) => p)));
    for (const n of needed) if (!have.has(n)) problems.push(`${b.id}: missing ${n}`);
  }
  return { problems, detail: `${needed.size} roles` };
});

await test('core is brand-agnostic (no palette refs, no brand names, no literal semantic colours)', () => {
  const terms = brands.flatMap((b) => (b.role === 'legal-parent' ? [b.id] : [b.id, b.name]));
  const problems = [];
  for (const f of [...listFiles(path.join(ROOT, 'core')), ...listFiles(path.join(ROOT, 'scripts')), ...listFiles(path.join(ROOT, 'examples'))]) {
    const text = fs.readFileSync(f, 'utf8');
    if (f.includes(`${path.sep}core${path.sep}tokens${path.sep}`) && text.includes('{palette.')) problems.push(`${rel(f)}: references a brand palette directly`);
    for (const t of terms) if (text.includes(t)) problems.push(`${rel(f)}: names "${t}"`);
  }
  // Tier 2 (semantic, modes, density) colours must be aliases: a literal here would bypass brand roles.
  for (const dir of ['semantic', 'modes', 'density'])
    for (const f of tokenFiles(path.join(ROOT, 'core/tokens', dir)))
      for (const [p, t] of walkTokens(readJson(f)))
        if (t.$value?.colorSpace || /^#[0-9a-f]{3,8}$/i.test(t.$value)) problems.push(`${rel(f)}: ${p} is a literal colour; reference a primitive or brand role`);
  return { problems };
});

await test('modes and densities define the same tokens', () => {
  const problems = [];
  for (const [dir, names] of [['modes', MODES], ['density', DENSITIES]]) {
    const sets = names.map((n) => [n, new Set([...walkTokens(readJson(path.join(ROOT, 'core/tokens', dir, `${n}.tokens.json`)))].map(([p]) => p))]);
    const [first, base] = sets[0];
    for (const [n, s] of sets.slice(1))
      for (const p of new Set([...base, ...s])) if (base.has(p) !== s.has(p)) problems.push(`${dir}: ${p} only in ${base.has(p) ? first : n}`);
  }
  return { problems, detail: `${MODES.join('/')} · ${DENSITIES.join('/')}` };
});

await test('no hard-coded colours or primitives in components, templates, examples', () => {
  if (!'color: #ff0000; fill: rgb(0 0 0)'.match(COLOUR_LITERAL) || '&#123; href="#main"'.match(COLOUR_LITERAL))
    return { problems: ['colour detector self-test failed'] };
  // Primitive and brand-layer variables are for the token layer only.
  const primitive = new Set();
  for (const f of [...tokenFiles(path.join(ROOT, 'core/tokens/primitives')), ...brands.flatMap((b) => tokenFiles(path.join(b.dir, 'tokens')))])
    for (const [p] of walkTokens(readJson(f))) primitive.add(`--aid-${p.replaceAll('.', '-')}`);
  const scanned = [
    ...listFiles(path.join(ROOT, 'core/components')),
    ...brands.flatMap((b) => listFiles(path.join(b.dir, 'templates'))),
    ...listFiles(path.join(ROOT, 'examples')),
  ].filter((f) => /\.(css|html|js|mjs|jsx|tsx|svg|json)$/.test(f));
  const problems = [];
  for (const f of scanned) {
    const text = fs.readFileSync(f, 'utf8').replace(/<!--[\s\S]*?-->|\/\*[\s\S]*?\*\//g, '');
    for (const m of text.match(COLOUR_LITERAL) ?? []) problems.push(`${rel(f)}: literal colour "${m}"`);
    if (f.includes(`${path.sep}examples${path.sep}`)) continue; // the preview may show primitives; components/templates may not
    for (const m of text.matchAll(/var\((--aid-[a-z0-9-]+)/g)) if (primitive.has(m[1])) problems.push(`${rel(f)}: uses primitive/brand variable ${m[1]}`);
  }
  return { problems, detail: `${scanned.length} files scanned` };
});

await test('agent files: AGENTS.md ≤ 40 lines, skills valid, DESIGN.md has front matter', () => {
  const problems = [];
  for (const f of [path.join(ROOT, 'AGENTS.md'), ...brands.map((b) => path.join(b.dir, 'AGENTS.md'))].filter(fs.existsSync)) {
    const n = fs.readFileSync(f, 'utf8').trimEnd().split('\n').length;
    if (n > 40) problems.push(`${rel(f)}: ${n} lines (max 40)`);
  }
  for (const f of brands.flatMap((b) => listFiles(path.join(b.dir, 'skills'))).filter((f) => path.basename(f) === 'SKILL.md')) {
    const fm = fs.readFileSync(f, 'utf8').match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
    const name = fm.match(/^name:\s*(.+)$/m)?.[1].trim();
    const desc = fm.match(/^description:\s*(.+)$/m)?.[1].trim() ?? '';
    if (name !== path.basename(path.dirname(f))) problems.push(`${rel(f)}: name "${name}" must match folder`);
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name ?? '') || name.length > 64) problems.push(`${rel(f)}: name must be kebab-case ≤ 64`);
    if (!desc || desc.length > 1024) problems.push(`${rel(f)}: description missing or > 1024 chars`);
  }
  for (const b of brands) {
    const f = path.join(b.dir, 'DESIGN.md');
    if (!fs.existsSync(f) || !/^---\n[\s\S]*?\nname: /.test(fs.readFileSync(f, 'utf8'))) problems.push(`${b.id}: DESIGN.md missing or without front matter`);
  }
  return { problems };
});

await test(`build: every brand × ${MODES.length} modes × ${DENSITIES.length} densities`, async () => {
  await build();
  const expected = [...MODES.map((m) => `css/${m}.css`), ...MODES.map((m) => `json/${m}.json`), 'css/density-compact.css', 'css/tokens.css', 'tailwind/theme.css', 'figma/variables.json'];
  const problems = brands.flatMap((b) => expected.filter((f) => !fs.existsSync(path.join(ROOT, 'dist', b.id, f))).map((f) => `${b.id}: missing dist/${b.id}/${f}`));
  return { problems, detail: `${brands.length} brands built` };
});

await test('fixture brand proves rebrand propagation', () => {
  if (!fixtures.length) return { skip: 'no fixture brand here (single-brand export)' };
  const problems = [];
  let changed = 0;
  const vars = (id) => readJson(path.join(ROOT, 'dist', id, 'figma/variables.json')).collections.flatMap((c) => c.variables);
  for (const fx of fixtures) {
    // 1. No real brand's colour may appear anywhere in the fixture's outputs.
    const foreign = new Set(real.flatMap((b) => [...brandHexes(b)]));
    for (const h of coreHexes()) foreign.delete(h);
    for (const f of listFiles(path.join(ROOT, 'dist', fx.id))) {
      const text = fs.readFileSync(f, 'utf8').toLowerCase();
      for (const h of foreign) if (text.includes(h)) problems.push(`dist/${fx.id}/${path.relative(path.join(ROOT, 'dist', fx.id), f)}: contains real-brand colour ${h}`);
    }
    // 2. Every semantic token that routes through brand.* must change value when the brand changes.
    // (Roles that map to shared neutrals, e.g. white "on" colours, may legitimately match.)
    const own = brandHexes(fx);
    const fromBrand = (e) => e.alias?.startsWith('brand/') && (own.has(String(e.value).toLowerCase()) || typeof e.value !== 'string' || !e.value.startsWith('#'));
    const dependent = vars(fx.id).filter((v) => !v.name.startsWith('brand/') && Object.values(v.valuesByMode).some(fromBrand));
    for (const b of real.filter((b) => b.role === 'brand')) {
      const theirs = Object.fromEntries(vars(b.id).map((v) => [v.name, v]));
      for (const v of dependent)
        for (const [mode, e] of Object.entries(v.valuesByMode))
          if (fromBrand(e) && JSON.stringify(theirs[v.name]?.valuesByMode[mode]?.value) === JSON.stringify(e.value))
            problems.push(`${v.name} (${mode}) did not change between ${fx.id} and ${b.id}: hard-coded?`);
    }
    changed += dependent.length;
  }
  return { problems, detail: `${changed} brand-dependent semantic tokens all change with the brand; no real-brand colour leaked` };
});

await test('export isolation + standalone build for each brand', async () => {
  if (!fs.existsSync(path.join(ROOT, 'scripts/export.mjs'))) return { skip: 'not the library root' };
  const { exportBrand } = await import('./export.mjs');
  const problems = [];
  const details = [];
  for (const b of real) {
    const out = fs.mkdtempSync(path.join(os.tmpdir(), `aid-export-${b.id}-`));
    try {
      const { files, problems: p } = await exportBrand(b.id, out, { quiet: true });
      problems.push(...p.map((x) => `${b.id}: ${x}`));
      for (const m of OPTIONAL_MODULES.filter((m) => !(b.modules ?? []).includes(m)))
        if (fs.readFileSync(path.join(out, 'dist', b.id, 'css/tokens.css'), 'utf8').includes(`--aid-${m}-`)) problems.push(`${b.id}: leaks module ${m}`);
      // Prove it builds on its own: same outputs from the exported sources.
      fs.symlinkSync(path.join(ROOT, 'node_modules'), path.join(out, 'node_modules'), 'dir');
      execFileSync(process.execPath, ['scripts/build.mjs'], { cwd: out, stdio: 'pipe' });
      const same = fs.readFileSync(path.join(out, 'dist', b.id, 'css/tokens.css'), 'utf8') === fs.readFileSync(path.join(ROOT, 'dist', b.id, 'css/tokens.css'), 'utf8');
      if (!same) problems.push(`${b.id}: standalone build differs from library build`);
      details.push(`${b.id} ${files.length} files`);
    } finally {
      fs.rmSync(out, { recursive: true, force: true });
    }
  }
  return { problems, detail: details.join(' · ') };
});

// WCAG 2.x contrast for the semantic pairs people actually read. Text needs 4.5:1, non-text UI 3:1.
const CONTRAST_PAIRS = [
  ...['primary', 'secondary', 'muted'].flatMap((t) => ['canvas', 'default', 'sunken'].map((s) => [`text-${t}`, `surface-${s}`, 4.5])),
  ['text-link', 'surface-default', 4.5],
  ['text-inverse', 'surface-inverse', 4.5],
  ['action-primary-fg', 'action-primary-bg', 4.5],
  ['action-primary-fg', 'action-primary-bg-hover', 4.5],
  ['action-secondary-fg', 'action-secondary-bg', 4.5],
  ['action-accent-fg', 'action-accent-bg', 4.5],
  ...['info', 'success', 'warning', 'danger'].map((f) => [`feedback-${f}-fg`, `feedback-${f}-bg`, 4.5]),
  ['border-strong', 'surface-default', 3],
];
const luminance = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => { const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x); return (hi + 0.05) / (lo + 0.05); };

await test('colour contrast (WCAG AA) for every brand × mode', () => {
  const problems = [];
  let pairs = 0;
  for (const b of real) for (const mode of MODES) {
    const file = path.join(ROOT, 'dist', b.id, 'json', `${mode}.json`);
    if (!fs.existsSync(file)) continue;
    const t = readJson(file);
    for (const [fg, bg, min] of CONTRAST_PAIRS) {
      const [f, k] = [t[`aid-color-${fg}`], t[`aid-color-${bg}`]];
      if (!/^#[0-9a-f]{6}/i.test(f ?? '') || !/^#[0-9a-f]{6}/i.test(k ?? '')) continue;
      pairs++;
      const r = ratio(f, k);
      if (r < min) problems.push(`${b.id}/${mode}: ${fg} on ${bg} = ${r.toFixed(2)}:1 (needs ${min}:1)`);
    }
  }
  return { problems, detail: `${pairs} pairs` };
});

let failed = 0;
for (const [status, name, info] of results) {
  if (status === 'FAIL') failed++;
  const extra = Array.isArray(info) ? `\n    - ${info.slice(0, 25).join('\n    - ')}${info.length > 25 ? `\n    … ${info.length - 25} more` : ''}` : info ? ` (${info})` : '';
  console.log(`${status === 'PASS' ? '✔' : status === 'SKIP' ? '○' : '✖'} ${status} ${name}${extra}`);
}
console.log(failed ? `\n${failed} check(s) failed.` : '\nAll checks passed.');
process.exit(failed ? 1 : 0);
