// Build the logo-modernisation study from logo-kit.js (the single source of truth).
// Usage (from the repo root):  node docs/studies/logo-modernisation/build.mjs
// Writes: current-mark.svg, svg/**, showcase.html (with logo-kit.js inlined so the page is self-contained).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const kitSrc = fs.readFileSync(path.join(here, 'logo-kit.js'), 'utf8');
const win = {};
new Function('window', kitSrc)(win);
const K = win.AIDLogo;
const data = JSON.parse(fs.readFileSync(path.join(here, 'showcase-data.json'), 'utf8'));

/* ------------------------------------------------------------------ files */
const out = (rel, txt) => {
  const p = path.join(here, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, txt + '\n');
};
const fileSvg = (svg) => '<?xml version="1.0" encoding="UTF-8"?>\n' + svg;

const IOT = data.routes.iot, DEF = data.routes.defence;
const copper = IOT[0], brass = DEF[0];

// Baseline
out('current-mark.svg', fileSvg(K.mark('current', { size: 120, original: true, master: 'large', title: 'AID mark (current, redrawn)' })));
out('svg/variants/current-mono.svg', fileSvg(K.mark('current', { size: 120, flat: true, master: 'large' })));
// Variants: one colour (flat, currentColor), colour (copper accent), small master
for (const v of K.variants) {
  out(`svg/variants/${v.id}.svg`, fileSvg(K.mark(v.id, { size: 120, flat: true, master: 'large' })));
  out(`svg/variants/${v.id}-16.svg`, fileSvg(K.mark(v.id, { size: 16, flat: true, master: 'small' })));
  if (v.accent) {
    const c = v.id === 'facet' ? { ink: brass.ink, accent: brass.accent } : { ink: copper.ink, accent: copper.accent };
    out(`svg/variants/${v.id}-colour.svg`, fileSvg(K.mark(v.id, { size: 120, flat: true, master: 'large', colors: v.id === 'tile' ? { ink: copper.ink, tile: copper.ink, accent: copper.accent } : c })));
  }
}
// Recommended: clean single-path symbol files and outlined lockups (no <text>), ready for Figma
const rec = K.recommended;
const recFiles = [
  ['aid-iot-symbol', rec.iot, {}],
  ['aid-iot-symbol-copper', rec.iot, { colors: { ink: copper.ink, accent: copper.accent } }],
  ['aid-iot-symbol-reversed', rec.iot, { colors: { ink: '#FFFFFF', accent: '#FDAF8B' } }],
  ['aid-defence-symbol', rec.defence, {}],
  ['aid-defence-symbol-brass', rec.defence, { colors: { ink: brass.ink, accent: brass.accent } }],
  ['aid-defence-symbol-tone-on-tone', rec.defence, { colors: { ink: '#343F47', accent: '#343F47' } }],
];
for (const [name, id, o] of recFiles) {
  out(`svg/recommended/${name}.svg`, fileSvg(K.mark(id, Object.assign({ size: 120, flat: true, master: 'large' }, o))));
  out(`svg/recommended/${name}-16.svg`, fileSvg(K.mark(id, Object.assign({ size: 16, flat: true, master: 'small' }, o))));
}
out('svg/recommended/aid-iot-app-icon.svg', fileSvg(K.mark('tile', { size: 120, master: 'large', colors: { ink: copper.ink, tile: copper.ink, accent: copper.accent } })));
out('svg/recommended/aid-iot-favicon.svg', fileSvg(K.mark('tile', { size: 16, master: 'small', colors: { ink: copper.ink, tile: copper.ink, accent: '#FDAF8B' } })));
for (const brand of ['aid-iot', 'aid-defence']) {
  const id = brand === 'aid-iot' ? rec.iot : rec.defence;
  const col = brand === 'aid-iot' ? { ink: copper.ink, accent: copper.accent } : { ink: brass.ink, accent: brass.accent };
  for (const layout of ['horizontal', 'stacked']) {
    out(`svg/lockups/${brand}-${layout}.svg`, fileSvg(K.lockup(brand, id, { layout, height: layout === 'stacked' ? 160 : 80, flat: true })));
    out(`svg/lockups/${brand}-${layout}-colour.svg`, fileSvg(K.lockup(brand, id, { layout, height: layout === 'stacked' ? 160 : 80, flat: true, colors: col })));
  }
}
// Elements
for (const p of K.patterns) out(`svg/elements/pattern-${p}.svg`, fileSvg(K.patternSvg(p, { color: '#24211D', opacity: 0.18 })));
out('svg/elements/supergraphic-aid-iot.svg', fileSvg(K.supergraphic('aid-iot', { colors: { ink: copper.ink, accent: copper.accent } }).replace('<svg ', '<svg width="600" height="560" ')));
out('svg/elements/supergraphic-aid-defence.svg', fileSvg(K.supergraphic('aid-defence', { colors: { ink: brass.ink, accent: brass.accent } }).replace('<svg ', '<svg width="600" height="560" ').replace(/stroke="currentColor"/g, `stroke="${brass.ink}"`)));
out('svg/elements/network.svg', fileSvg(K.network({ width: 640, height: 320 }).replace(/currentColor/g, '#24211D').replace('var(--aid-mark-accent,#24211D)', copper.accent)));
for (const s of K.states) out(`svg/elements/state-${s}.svg`, fileSvg(K.stateGlyph(s, { size: 24 })));

/* --------------------------------------------------------------- showcase */
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const sizes = [120, 64, 32, 24, 16];
const LIGHT = { ground: '#FBF8F3', ink: '#1B1A18', accent: '#B1582B' };
const DARK = { ground: '#0F1012', ink: '#ECEAE6', accent: '#E9C67D' };

const ramp = (id, g, mono) => `<div class="ramp" style="background:${g.ground};color:${g.ink};--aid-mark-accent:${mono ? g.ink : g.accent}${mono && id === 'tile' ? ';--aid-mark-tile-accent:transparent' : ''}">` +
  sizes.map((s) => `<figure>${K.mark(id, { size: s, original: id === 'current' && !mono })}<figcaption>${s}</figcaption></figure>`).join('') + '</div>';
const chips = (id) => {
  const spec = K._geometry.specs[id];
  const hasAccent = !!spec.accent || id === 'current';
  const chip = (r, dark) => {
    const ink = hasAccent ? r.ink : r.mono;
    const extra = id === 'tile' ? `--aid-mark-accent:${r.accent};` : `--aid-mark-accent:${r.accent};`;
    return `<figure class="chip" style="background:${r.ground};color:${ink};${extra}">${K.mark(id, { size: 56, master: 'large' })}<figcaption style="color:${dark ? '#B9BDC2' : '#5E5B56'}">${esc(r.name)}</figcaption></figure>`;
  };
  return `<div class="chips">${IOT.map((r) => chip(r, false)).join('')}${DEF.map((r) => chip(r, true)).join('')}</div>`;
};

const variantCard = (v, d) => `
<article class="card" id="v-${v.id}">
  <header class="card-h"><h3>${esc(v.name)} <code>${v.id}</code></h3><span class="score" title="Checklist score out of 28">${d.score}</span></header>
  <p class="lede">${esc(v.summary)}</p>
  <div class="grounds">${ramp(v.id, LIGHT, true)}${ramp(v.id, DARK, true)}</div>
  ${v.accent ? `<p class="label">With accent</p><div class="grounds">${ramp(v.id, LIGHT, false)}${ramp(v.id, DARK, false)}</div>` : ''}
  <p class="label">In the colour routes (AID IoT on warm light; AID Defence on dark)</p>
  ${chips(v.id)}
  <dl class="why">${d.rationale.map(([k, t]) => `<dt>${esc(k)}</dt><dd>${esc(t)}</dd>`).join('')}</dl>
</article>`;

// Construction drawing of the master skeleton
function construction() {
  const g = K._geometry, sk = g.skeleton, sp = g.specs.beacon.large;
  const tri = `M${sk.L.join(' ')}L${sk.R.join(' ')}L${sk.A.join(' ')}Z`;
  let s = `<svg viewBox="0 0 120 120" class="construct" role="img" aria-label="Construction of the Beacon mark on the 120 grid">`;
  for (let i = 0; i <= 120; i += 10) s += `<path d="M${i} 0V120M0 ${i}H120" class="grid"/>`;
  s += `<path d="${tri}" class="skel"/>`;
  s += `<circle cx="${sk.C[0]}" cy="${sk.C[1].toFixed(2)}" r="1.4" class="mk"/>`;
  s += `<g class="ghost">${K.mark('beacon', { size: 120, master: 'large' }).replace(/^<svg[^>]*>/, '').replace('</svg>', '')}</g>`;
  // gap callout at the left base
  const r = sp.r;
  s += `<circle cx="${sk.L[0]}" cy="${sk.L[1].toFixed(2)}" r="${r + sp.gap}" class="gapc"/>`;
  return s + '</svg>';
}

// Clear-space drawing (2N on every side)
function clearSpace(brand, id) {
  const html = K.lockup(brand, id, { height: 72 });
  return `<div class="clear"><div class="clear-box">${html}</div></div>`;
}

// Don't examples, drawn from the real geometry so the misuse is exact
function dontSvg(kind) {
  const inner = (o) => K.mark('beacon', Object.assign({ size: 72, master: 'large' }, o)).replace(/^<svg[^>]*>/, '').replace('</svg>', '');
  const wrap = (body, extra = '') => `<svg viewBox="0 0 120 120" width="72" height="72" aria-hidden="true"${extra}>${body}</svg>`;
  const sk = K._geometry.skeleton;
  if (kind === 'colours') return K.mark('current', { size: 72, original: true, master: 'large' });
  if (kind === 'joined') return wrap(`<path d="M${sk.L.join(' ')}L${sk.R.join(' ')}L${sk.A.join(' ')}Z" fill="none" stroke="currentColor" stroke-width="10" stroke-linejoin="round"/>` + ['L', 'R', 'A'].map((k) => `<circle cx="${sk[k][0]}" cy="${sk[k][1]}" r="11" fill="currentColor"/>`).join(''));
  if (kind === 'rotate') return wrap(`<g transform="rotate(180 60 60)">${inner({})}</g>`);
  if (kind === 'effects') return wrap(`<defs><linearGradient id="dg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#A2B4FF"/><stop offset="1" stop-color="#B1582B"/></linearGradient><filter id="df"><feGaussianBlur stdDeviation="3"/></filter></defs><g filter="url(#df)" opacity=".6" style="color:#A2B4FF">${inner({})}</g><g style="color:url(#dg)" fill="url(#dg)">${inner({ colors: { ink: 'url(#dg)', accent: 'url(#dg)' } })}</g>`);
  if (kind === 'stretch') return wrap(`<g transform="translate(-24 18) scale(1.4 0.7)">${inner({})}</g>`);
  if (kind === 'status') return wrap(inner({ colors: { ink: 'currentColor', node: 'currentColor', accent: '#16A34A' } }));
  return '';
}

const scoreRows = data.scorecard.rows.map((r) => `<tr${r[0].startsWith('Total') ? ' class="total"' : ''}><th scope="row">${esc(r[0])}</th>${r.slice(1).map((c, i) => `<td class="${i === 2 || i === 7 ? 'rec' : ''}">${esc(c)}</td>`).join('')}</tr>`).join('');

const icons = {
  signal: '<svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="14" r="2" fill="currentColor" stroke="none"/><path d="M8 10a5.6 5.6 0 0 1 8 0M5 7a10 10 0 0 1 14 0"/></svg>',
  pin: '<svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 21s-6-5.3-6-11a6 6 0 0 1 12 0c0 5.7-6 11-6 11z"/><circle cx="12" cy="10" r="2.2"/></svg>',
  chart: '<svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 19V11M12 19V5M19 19v-6"/></svg>',
};

const page = `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>AID Mark Modernisation</title>
<meta name="description" content="Round 1 study: the current AID mark redrawn, eight modern variations scored against a logo checklist, lockups, brand elements and motion.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=Atkinson+Hyperlegible+Next:wght@400;500;700&display=swap" rel="stylesheet">
<style>
:root{
  --bg:#F4F2EE; --surface:#FFFFFF; --ink:#1B1A18; --muted:#5E5B56; --line:#E2DED7; --soft:#ECE9E3;
  --focus:#525DBD; --pill:#ECE9E3; --aid-mark-accent:#B1582B;
  color-scheme: light;
}
@media (prefers-color-scheme: dark){
  :root:not([data-theme="light"]){
    --bg:#111214; --surface:#191A1D; --ink:#ECEAE6; --muted:#A6A39D; --line:#2D2F33; --soft:#222327;
    --focus:#A2B4FF; --pill:#26282C; --aid-mark-accent:#E9C67D; color-scheme: dark;
  }
}
:root[data-theme="dark"]{
  --bg:#111214; --surface:#191A1D; --ink:#ECEAE6; --muted:#A6A39D; --line:#2D2F33; --soft:#222327;
  --focus:#A2B4FF; --pill:#26282C; --aid-mark-accent:#E9C67D; color-scheme: dark;
}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--ink);font:400 16px/1.55 "Archivo",system-ui,sans-serif;overflow-x:hidden}
.wrap{max-width:1180px;margin:0 auto;padding:0 32px}
@media (max-width:640px){.wrap{padding:0 16px}}
a{color:inherit}
:focus-visible{outline:2px solid var(--focus);outline-offset:2px}
.top{position:sticky;top:0;z-index:5;background:color-mix(in srgb,var(--bg) 88%,transparent);backdrop-filter:blur(8px);border-bottom:1px solid var(--line)}
.top .wrap{display:flex;align-items:center;gap:16px;min-height:60px}
.top .brand{display:flex;align-items:center;gap:10px;font-weight:600;font-size:15px}
.top nav{display:flex;gap:4px;flex-wrap:wrap;margin-left:auto}
.top nav a{font-size:13px;text-decoration:none;color:var(--muted);padding:12px 8px;min-height:44px;display:inline-flex;align-items:center}
.top nav a:hover{color:var(--ink)}
@media (max-width:900px){.top nav{display:none}}
.theme{margin-left:auto;display:inline-flex;border:1px solid var(--line);border-radius:999px;padding:3px;background:var(--surface)}
@media (min-width:901px){.theme{margin-left:12px}}
.theme button{font:500 13px "Archivo",sans-serif;border:0;background:none;color:var(--muted);min-height:38px;min-width:44px;padding:0 12px;border-radius:999px;cursor:pointer}
.theme button[aria-pressed="true"]{background:var(--ink);color:var(--bg)}
h1{font:700 clamp(32px,5vw,52px)/1.05 "Archivo",sans-serif;letter-spacing:-.02em;margin:0 0 16px}
h2{font:700 clamp(24px,3vw,32px)/1.15 "Archivo",sans-serif;letter-spacing:-.01em;margin:0 0 8px}
h3{font:600 20px/1.25 "Archivo",sans-serif;margin:0}
h4{font:600 16px/1.3 "Archivo",sans-serif;margin:0 0 8px}
p{margin:0 0 12px;max-width:68ch}
code,.num{font-family:"Atkinson Hyperlegible Next",system-ui,sans-serif;font-variant-numeric:tabular-nums}
code{font-size:.8em;background:var(--pill);padding:2px 6px;border-radius:6px;font-weight:500}
section{padding:56px 0;border-bottom:1px solid var(--line)}
.eyebrow{font:600 12px/1 "Atkinson Hyperlegible Next",sans-serif;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin:0 0 12px}
.muted{color:var(--muted)}
.hero{padding:56px 0 40px}
.hero-grid{display:grid;grid-template-columns:1.2fr 1fr;gap:40px;align-items:center}
@media (max-width:820px){.hero-grid{grid-template-columns:1fr}}
.story{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:20px}
@media (max-width:560px){.story{grid-template-columns:1fr}}
.story div{background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:14px}
.story b{display:block;font-size:15px}
.story span{font-size:14px;color:var(--muted)}
.baseline{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.baseline figure{margin:0;background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:16px;display:grid;place-items:center;gap:8px}
.baseline figcaption{font-size:13px;color:var(--muted);text-align:center}
.construct{width:100%;max-width:360px;height:auto}
.construct .grid{stroke:var(--line);stroke-width:.3;fill:none}
.construct .skel{stroke:var(--muted);stroke-width:.4;stroke-dasharray:1.5 1.5;fill:none}
.construct .ghost{color:var(--ink);opacity:.85}
.construct .gapc{fill:none;stroke:var(--aid-mark-accent);stroke-width:.5;stroke-dasharray:1 1}
.construct .mk{fill:var(--aid-mark-accent)}
.construct .t{font:500 5px "Atkinson Hyperlegible Next",sans-serif;fill:var(--muted)}
.cards{display:grid;gap:24px;margin-top:28px}
.card{background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:24px}
@media (max-width:640px){.card{padding:16px}}
.card-h{display:flex;align-items:baseline;justify-content:space-between;gap:12px;flex-wrap:wrap}
.score{font:700 14px "Atkinson Hyperlegible Next",sans-serif;background:var(--pill);border-radius:999px;padding:4px 10px}
.lede{color:var(--muted);margin:6px 0 16px}
.label{font:600 12px/1 "Atkinson Hyperlegible Next",sans-serif;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);margin:18px 0 8px}
.grounds{display:grid;grid-template-columns:1fr 1fr;gap:10px}
@media (max-width:760px){.grounds{grid-template-columns:1fr}}
.ramp{display:flex;align-items:flex-end;gap:14px;padding:16px;border-radius:12px;flex-wrap:wrap;border:1px solid rgba(128,128,128,.18)}
.ramp figure{margin:0;display:flex;flex-direction:column;align-items:center;gap:4px}
.ramp figcaption{font:500 11px "Atkinson Hyperlegible Next",sans-serif;opacity:.6}
@media (max-width:420px){.ramp figure:first-child svg{width:96px;height:96px}}
.chips{display:grid;grid-template-columns:repeat(6,1fr);gap:8px}
@media (max-width:760px){.chips{grid-template-columns:repeat(3,1fr)}}
.chip{margin:0;border-radius:10px;padding:12px 6px 8px;display:flex;flex-direction:column;align-items:center;gap:6px;border:1px solid rgba(128,128,128,.18)}
.chip figcaption{font:500 11px/1.2 "Atkinson Hyperlegible Next",sans-serif;text-align:center}
.why{display:grid;grid-template-columns:150px 1fr;gap:6px 16px;margin:18px 0 0;font-size:15px}
.why dt{font-weight:600}
.why dd{margin:0;color:var(--muted)}
@media (max-width:640px){.why{grid-template-columns:1fr}.why dd{margin-bottom:8px}}
.tablewrap{overflow-x:auto;border:1px solid var(--line);border-radius:12px;background:var(--surface);margin-top:20px}
table{border-collapse:collapse;width:100%;font-size:14px}
th,td{padding:9px 10px;border-bottom:1px solid var(--line);text-align:center;white-space:nowrap}
th[scope="row"],thead th:first-child{text-align:left;white-space:normal;min-width:180px}
thead th{font:600 12px "Atkinson Hyperlegible Next",sans-serif;color:var(--muted);vertical-align:bottom}
td{font-family:"Atkinson Hyperlegible Next",sans-serif;font-variant-numeric:tabular-nums}
tr.total td{font-weight:700}
td.rec{background:color-mix(in srgb,var(--aid-mark-accent) 10%,transparent)}
tr.total th{font-weight:700}
.duo{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:24px}
@media (max-width:820px){.duo{grid-template-columns:1fr}}
.panel{border-radius:16px;padding:28px;display:flex;flex-direction:column;gap:20px;min-height:340px;position:relative;overflow:hidden}
.panel h3{font-size:18px}
.panel p{font-size:15px;opacity:.85;margin:0}
.panel .big{display:flex;align-items:center;gap:24px;flex-wrap:wrap}
.iot{background:#FDF9F4;color:#181612;--aid-mark-accent:#B1582B}
.def{background:#071117;color:#D9E7F1;--aid-mark-accent:#E9C67D}
.lockgrid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:20px}
@media (max-width:820px){.lockgrid{grid-template-columns:1fr}}
.lockcell{border-radius:14px;padding:28px 24px;display:flex;flex-direction:column;gap:22px;align-items:flex-start;border:1px solid rgba(128,128,128,.18)}
.lockcell svg{max-width:100%;height:auto}
.lockcell .row{display:flex;gap:28px;align-items:flex-end;flex-wrap:wrap}
.clear{display:inline-block;padding:0}
.clear-box{outline:1px dashed var(--aid-mark-accent);outline-offset:0;padding:calc(72px * 0.38);background:repeating-linear-gradient(45deg,transparent 0 6px,rgba(177,88,43,.07) 6px 7px)}
.clear-box svg{display:block;background:var(--surface)}
.rules{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:16px}
@media (max-width:820px){.rules{grid-template-columns:1fr}}
.rules div{background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:16px;font-size:15px}
.rules b{display:block;margin-bottom:4px}
.kit{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-top:24px}
@media (max-width:820px){.kit{grid-template-columns:1fr}}
.tilebox{height:180px;border-radius:12px;border:1px solid rgba(128,128,128,.18)}
.patterns{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
@media (max-width:640px){.patterns{grid-template-columns:1fr}}
.patterns figure{margin:0}.patterns figcaption{font-size:13px;color:var(--muted);margin-top:6px}
.superpanel{position:relative;border-radius:16px;overflow:hidden;min-height:340px;padding:28px;display:flex;flex-direction:column;justify-content:flex-end}
.superpanel .aid-super{position:absolute;top:0;right:0;width:56%;height:100%}
.superpanel .copy{position:relative;max-width:46%}
@media (max-width:560px){.superpanel{padding:220px 20px 20px}.superpanel .aid-super{width:100%;height:210px}.superpanel .copy{max-width:none}}
.superpanel h3{font:700 clamp(24px,3vw,34px)/1.1 "Archivo",sans-serif;margin:6px 0 10px}
.superpanel .cta{display:inline-flex;align-items:center;min-height:44px;padding:0 18px;border-radius:999px;font-weight:600;font-size:15px;margin-top:8px;text-decoration:none}
.superpanel.def .cta{border-radius:4px;letter-spacing:.02em}
.list{list-style:none;padding:0;margin:12px 0 0}
.list li{display:flex;gap:10px;align-items:baseline;margin:0 0 8px}
.list li svg{flex:none;transform:translateY(1px)}
.steps{list-style:none;margin:16px 0 0;padding:0}
.steps li{display:grid;grid-template-columns:20px 1fr;gap:12px;align-items:start;position:relative;padding-bottom:18px}
.steps li::before{content:"";width:12px;height:12px;border-radius:50%;background:currentColor;margin:5px 0 0 4px}
.steps li:last-child::before{background:var(--aid-mark-accent)}
.steps li:not(:last-child)::after{content:"";position:absolute;left:9px;top:24px;bottom:4px;width:2px;border-radius:2px;background:currentColor;opacity:.45}
.datacard{position:relative;border-radius:16px;overflow:hidden;min-height:260px;padding:24px;display:flex;align-items:flex-end}
.datacard .aid-network{position:absolute;inset:0;width:100%;height:100%}
.datacard .stat{position:relative;background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:16px 18px;min-width:220px;color:var(--ink)}
.datacard .stat b{font:700 34px/1 "Atkinson Hyperlegible Next",sans-serif;font-variant-numeric:tabular-nums;display:block;margin:4px 0}
.frames{display:flex;gap:18px;flex-wrap:wrap;align-items:center}
.states{display:grid;grid-template-columns:repeat(5,1fr);gap:8px}
@media (max-width:640px){.states{grid-template-columns:repeat(3,1fr)}}
.states figure{margin:0;border-radius:10px;padding:14px 6px 10px;display:flex;flex-direction:column;align-items:center;gap:8px;border:1px solid rgba(128,128,128,.18)}
.states figcaption{font:500 12px "Atkinson Hyperlegible Next",sans-serif}
.states .pair{display:flex;gap:10px;align-items:center}
.motion{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:24px}
@media (max-width:900px){.motion{grid-template-columns:1fr}}
.stage{border-radius:14px;min-height:170px;display:flex;align-items:center;justify-content:center;gap:28px;padding:20px;flex-wrap:wrap;border:1px solid rgba(128,128,128,.18)}
.mcard{background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:16px;display:flex;flex-direction:column;gap:12px}
.mcard p{font-size:14px;color:var(--muted);margin:0}
.btn{font:600 14px "Archivo",sans-serif;min-height:44px;padding:0 16px;border-radius:999px;border:1px solid var(--line);background:var(--surface);color:var(--ink);cursor:pointer;align-self:flex-start}
.toggle{display:inline-flex;gap:10px;align-items:center;font-size:14px;min-height:44px;cursor:pointer}
.toggle input{width:20px;height:20px}
.dont{display:grid;grid-template-columns:repeat(6,1fr);gap:10px;margin-top:16px}
@media (max-width:820px){.dont{grid-template-columns:repeat(3,1fr)}}
.dont figure{margin:0;background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:12px;display:flex;flex-direction:column;align-items:center;gap:8px;color:var(--ink)}
.dont figcaption{font-size:12.5px;line-height:1.35;text-align:center;color:var(--muted)}
.dont figcaption b{display:block;color:var(--ink)}
.next ol{padding-left:20px;max-width:72ch}.next li{margin-bottom:10px}
footer{padding:32px 0 56px;color:var(--muted);font-size:14px}
/* reduced-motion preview (mirrors the kit's @media rules) */
.force-rm .aid-loader .aid-n,.force-rm .aid-loader .aid-k,.force-rm .aid-loader .aid-fix{animation:none!important}
.force-rm .aid-loader .aid-n{opacity:1;transform:none}
.force-rm .aid-loader .aid-k{stroke-dashoffset:0;opacity:.3}
.force-rm .aid-loader--def .aid-fix{opacity:1}
.force-rm .aid-success *,.force-rm .aid-reveal *{animation:none!important}
.force-rm .aid-success .aid-ring{opacity:0}
.force-rm .aid-state .aid-pulse{animation:none;opacity:.5;transform:scale(1.9)}
</style>
<style id="aid-logo-kit-css">${K.css}</style>
</head>
<body>
<header class="top"><div class="wrap">
  <span class="brand">${K.mark('beacon', { size: 28 })} AID mark · round 1</span>
  <nav aria-label="Sections"><a href="#story">Story</a><a href="#variations">Variations</a><a href="#score">Scorecard</a><a href="#brands">Two brands</a><a href="#lockups">Lockups</a><a href="#kit">Elements</a><a href="#motion">Motion</a><a href="#usage">Usage</a></nav>
  <div class="theme" role="group" aria-label="Colour theme">
    <button type="button" data-set="auto" aria-pressed="true">Auto</button><button type="button" data-set="light" aria-pressed="false">Light</button><button type="button" data-set="dark" aria-pressed="false">Dark</button>
  </div>
</div></header>

<main>
<div class="wrap">
<section class="hero" id="story">
  <div class="hero-grid">
    <div>
      <p class="eyebrow">Logo modernisation · study round 1 · 30 October 2026</p>
      <h1>Same mark. One story. Built to work everywhere.</h1>
      <p>We keep the current AID mark — three nodes, three links, a crossbar-less A — and give it the story it was missing: <b>triangulation</b>. A position fix needs at least three references; that is how NavIC works, and three nodes joined by three links is also what AID builds: a device, a connection, a platform.</p>
      <p class="muted">Every variation below was drawn after a research pass (<code>RESEARCH.md</code>) and scored against a 14-point checklist. The recommendation comes from the score.</p>
      <div class="story">
        <div><b>Sense</b><span>Bottom-left node: the device in the field.</span></div>
        <div><b>Connect</b><span>Bottom-right node: the link that carries the signal.</span></div>
        <div><b>Decide</b><span>The apex: the platform, and the fix. The one node that may carry colour.</span></div>
      </div>
    </div>
    <div class="baseline">
      <figure>${K.mark('current', { size: 140, original: true, master: 'large', title: 'Current AID mark, redrawn' })}<figcaption>Current mark, redrawn on a 120 grid (<code>current-mark.svg</code>). Three colours, close to a well-known tech palette; no stated story.</figcaption></figure>
      <figure>${construction()}<figcaption>Beacon on the 120 grid: equilateral skeleton (side 88, dashed), node N 18, link W 10, one gap G 6 (dotted ring), centroid = the fix. Base link 6% thinner so it looks equal.</figcaption></figure>
    </div>
  </div>
</section>

<section id="variations">
  <p class="eyebrow">Eight variations of the current mark</p>
  <h2>What changed, what stayed, how each one behaves</h2>
  <p>Each card shows the mark in one colour on light and dark grounds at 120, 64, 32, 24 and 16 px (24 px and below use the small master drawn on a 16 px grid), then in the six candidate colour routes. Scores are out of 28 against the checklist in <code>RESEARCH.md</code>.</p>
  <div class="cards">
    ${K.variants.map((v) => variantCard(v, data.variants[v.id])).join('')}
  </div>
</section>

<section id="score">
  <p class="eyebrow">Scorecard</p>
  <h2>Scored against the checklist, not taste</h2>
  <p>2 = pass, 1 = partial, 0 = fail. A recommendation must reach 24 and must not fail C3 (distinctive), C5 (16 px), C6 (one colour) or C13 (continuity).</p>
  <div class="tablewrap"><table>
    <thead><tr>${data.scorecard.head.map((h) => `<th scope="col">${esc(h)}</th>`).join('')}</tr></thead>
    <tbody>${scoreRows}</tbody>
  </table></div>
</section>

<section id="brands">
  <p class="eyebrow">Recommendation · one skeleton, two treatments</p>
  <h2>AID IoT: Beacon. AID Defence: Facet.</h2>
  <p>${esc(data.recommendation)}</p>
  <div class="duo">
    <div class="panel iot">
      <p class="eyebrow" style="color:#5E5B56">AID IoT · open, rounded, warm</p>
      <div class="big">${K.mark('beacon', { size: 132, master: 'large', title: 'AID IoT symbol, Beacon' })}${K.lockup('aid-iot', 'beacon', { height: 56 })}</div>
      <p>Round caps, open gaps, one warm accent on the apex node (Copper shown). Motion flows: a signal travels sense → connect → decide.</p>
    </div>
    <div class="panel def">
      <p class="eyebrow" style="color:#7C8891">AID Defence · closed, sharp, dark</p>
      <div class="big">${K.mark('facet', { size: 132, master: 'large', title: 'AID Defence symbol, Facet' })}${K.lockup('aid-defence', 'facet', { height: 56 })}</div>
      <p>Same nodes on the same skeleton; links cut square to each corner, gaps tighter, one restrained accent (Brass shown). Motion is step-wise, like a briefing.</p>
    </div>
  </div>
</section>

<section id="lockups">
  <p class="eyebrow">Lockups · Archivo, outlined</p>
  <h2>Horizontal, stacked and symbol only</h2>
  <p>Wordmarks are set in Archivo and converted to outlines inside the kit, so files never depend on an installed font. AID IoT: <b>AID</b> Bold + IoT Regular. AID Defence: <b>AID</b> Bold + DEFENCE SemiBold at 56% size, tracked +10%.</p>
  <div class="lockgrid">
    <div class="lockcell" style="background:#FDF9F4;color:#181612;--aid-mark-accent:#B1582B">
      ${K.lockup('aid-iot', 'beacon', { height: 64 })}
      <div class="row">${K.lockup('aid-iot', 'beacon', { height: 132, layout: 'stacked' })}${K.mark('beacon', { size: 72, master: 'large', title: 'AID IoT symbol' })}${K.mark('tile', { size: 72, master: 'large', title: 'AID IoT app icon', colors: { ink: '#181612', tile: '#181612', accent: '#E48A61' } })}</div>
    </div>
    <div class="lockcell" style="background:#181612;color:#EBE7E2;--aid-mark-accent:#FDAF8B">
      ${K.lockup('aid-iot', 'beacon', { height: 64 })}
      <div class="row">${K.lockup('aid-iot', 'beacon', { height: 132, layout: 'stacked' })}${K.mark('beacon', { size: 72, master: 'large' })}${K.mark('tile', { size: 72, master: 'large', colors: { ink: '#FDF9F4', tile: '#FDF9F4', accent: '#B1582B' } })}</div>
    </div>
    <div class="lockcell" style="background:#ECE9E3;color:#172128;--aid-mark-accent:#8C6C1F">
      ${K.lockup('aid-defence', 'facet', { height: 64 })}
      <div class="row">${K.lockup('aid-defence', 'facet', { height: 132, layout: 'stacked' })}${K.mark('facet', { size: 72, master: 'large' })}</div>
    </div>
    <div class="lockcell" style="background:#071117;color:#D9E7F1;--aid-mark-accent:#E9C67D">
      ${K.lockup('aid-defence', 'facet', { height: 64 })}
      <div class="row">${K.lockup('aid-defence', 'facet', { height: 132, layout: 'stacked' })}${K.mark('facet', { size: 72, master: 'large' })}${K.mark('facet', { size: 72, master: 'large', colors: { ink: '#343F47', accent: '#343F47' } })}</div>
    </div>
  </div>
  <h3 style="margin-top:36px">Clear space and minimum sizes</h3>
  <p>Clear space on every side = <b>2N</b> (two node diameters, about 38% of the symbol height), shown hatched. Nothing — text, edges, other logos — enters it.</p>
  <div style="display:flex;gap:16px;flex-wrap:wrap;margin-top:12px;--aid-mark-accent:#B1582B">${clearSpace('aid-iot', 'beacon')}<span style="--aid-mark-accent:#8C6C1F">${clearSpace('aid-defence', 'facet')}</span></div>
  <div class="rules">${data.minSizes.map(([t, d]) => `<div><b>${esc(t)}</b>${esc(d)}</div>`).join('')}</div>
</section>

<section id="kit">
  <p class="eyebrow">Brand elements derived from the mark</p>
  <h2>Parts of the mark, everywhere</h2>
  <p>Every element below is made only of the mark's own parts — the node, the link, the gap and the 60° lattice the skeleton sits on — so a glimpse of any one of them recalls the whole.</p>
  <div class="kit">
    <div class="mcard"><h4>Pattern tiles (seamless)</h4><p>All three sit on the 60° lattice. <code>AIDLogo.pattern('lattice' | 'marks' | 'nodes', {color, opacity})</code></p>
      <div class="patterns">
        <figure><div class="tilebox" style="background:#FDF9F4 ${K.pattern('lattice', { color: '#8D3700', opacity: 0.22 })}"></div><figcaption>Lattice: a field of nodes, a few joined</figcaption></figure>
        <figure><div class="tilebox" style="background:#071117 ${K.pattern('marks', { color: '#E9C67D', opacity: 0.16 })}"></div><figcaption>Marks: the symbol tessellated</figcaption></figure>
        <figure><div class="tilebox" style="background:#FDF9F4 ${K.pattern('nodes', { color: '#181612', opacity: 0.16 })}"></div><figcaption>Nodes: quiet texture for print grounds</figcaption></figure>
      </div>
    </div>
    <div class="mcard"><h4>Divider, bullets and steps</h4><p>The divider is the base of the mark stretched: node, link, node. Bullets are nodes; a process list is nodes joined by links, the last node lit.</p>
      <div style="--aid-mark-accent:#B1582B">${K.divider()}</div>
      <ul class="list"><li>${K.bullet()}<span>Understood first: we listen before we specify.</span></li><li>${K.bullet()}<span>Built to fit: device, link and platform in-house.</span></li><li>${K.bullet({ accent: true })}<span>The accent node marks the one thing to act on.</span></li></ul>
      <ol class="steps"><li><span><b>Sense</b> · sensors installed on 40 cold rooms</span></li><li><span><b>Connect</b> · LoRaWAN gateway, 3 sites</span></li><li><span><b>Decide</b> · alerts to the duty manager</span></li></ol>
      <div style="margin-top:6px">${K.divider({ brand: 'aid-defence' })}</div>
    </div>
    <div class="mcard" style="grid-column:1/-1"><h4>Supergraphic (hero)</h4><p>The mark at architectural scale, cropped off the edge. Defence adds bearing lines converging on the fix — navigation, not targeting: no crosshair, no centre reticle.</p>
      <div class="duo" style="margin-top:0">
        <div class="superpanel iot">${K.supergraphic('aid-iot')}<div class="copy"><p class="eyebrow" style="color:#5E5B56">AID IoT</p><h3>Tell us the problem.</h3><p style="margin:0">We build the device, the link and the platform to fit it.</p><a class="cta" href="#kit" style="background:#181612;color:#FDF9F4">Tell us the problem</a></div></div>
        <div class="superpanel def" style="color:#D9E7F1">${K.supergraphic('aid-defence')}<div class="copy"><p class="eyebrow" style="color:#7C8891">AID DEFENCE</p><h3>Any requirement, answered clearly.</h3><p style="margin:0">Indigenous navigation and systems, discussed in private.</p><a class="cta" href="#kit" style="background:#E9C67D;color:#071117">Request a private briefing</a></div></div>
      </div>
    </div>
    <div class="mcard"><h4>Network motif behind data</h4><p>Jittered 60° lattice; links obey the gap rule, a few nodes lit. Low contrast so numbers stay first. <code>AIDLogo.network()</code></p>
      <div class="datacard iot">${K.network({ width: 640, height: 300, opacity: 0.22 })}<div class="stat"><span class="eyebrow" style="margin:0">Cold-chain fleet · live</span><b>128</b><span class="num" style="font-size:14px">sensors online · 2 need attention</span></div></div>
    </div>
    <div class="mcard"><h4>Icon frames</h4><p>The frame line breaks around a node at the apex — the gap rule again. IoT: circle. Defence: square.</p>
      <div class="frames" style="color:var(--ink)">${['signal', 'pin', 'chart'].map((k) => K.iconFrame(icons[k], { size: 64 })).join('')}<span style="width:12px"></span>${['signal', 'pin', 'chart'].map((k) => K.iconFrame(icons[k], { size: 64, brand: 'aid-defence' })).join('')}</div>
      <h4 style="margin-top:16px">Data-state glyphs</h4><p>Built from the three nodes. Meaning is in the shape (rings, links, a break), so they work in one colour; status colour is optional via <code>--aid-state-*</code>.</p>
      <div class="states">${K.states.map((s) => `<figure style="background:#FBF8F3;color:#1B1A18;--aid-state-alert:#C2410C;--aid-state-connected:#B1582B"><div class="pair">${K.stateGlyph(s, { size: 32 })}${K.stateGlyph(s, { size: 16 })}</div><figcaption>${s}</figcaption></figure>`).join('')}</div>
      <div class="states" style="margin-top:8px">${K.states.map((s) => `<figure style="background:#0F1012;color:#ECEAE6;--aid-state-alert:#F97316;--aid-state-connected:#E9C67D;--aid-state-alert-on:#0F1012"><div class="pair">${K.stateGlyph(s, { size: 32 })}${K.stateGlyph(s, { size: 16 })}</div><figcaption>${s}</figcaption></figure>`).join('')}</div>
    </div>
  </div>
</section>

<section id="motion">
  <p class="eyebrow">Motion</p>
  <h2>The mark switches its own parts on</h2>
  <p>No morphing: nodes light and links draw in the story's order, sense → connect → decide. AID IoT flows; AID Defence steps. With reduced motion, each piece shows a designed static state.</p>
  <label class="toggle"><input type="checkbox" id="rm"> Preview the reduced-motion states</label>
  <div class="motion" id="motionStages">
    <div class="mcard"><h4>Loader</h4>
      <div class="stage" style="background:#FDF9F4;color:#181612;--aid-mark-accent:#B1582B">${K.loader({ size: 64 })}${K.loader({ size: 32, label: false })}</div>
      <div class="stage" style="background:#071117;color:#D9E7F1;--aid-mark-accent:#E9C67D">${K.loader({ size: 64, brand: 'aid-defence' })}${K.loader({ size: 32, brand: 'aid-defence', label: false })}</div>
      <p>IoT: 2.4 s loop; each node lights, then the link to the next draws. Defence: 3.2 s, parts switch on whole, then the fix. Static state: all nodes on, links at 30%.</p>
    </div>
    <div class="mcard"><h4>Fix acquired</h4>
      <div class="stage replay" data-kind="success" style="background:#FDF9F4;color:#181612;--aid-mark-accent:#B1582B">${K.success({ size: 96 })}</div>
      <div class="stage replay" data-kind="success-def" style="background:#071117;color:#D9E7F1;--aid-mark-accent:#E9C67D">${K.success({ size: 96, brand: 'aid-defence' })}</div>
      <button class="btn" type="button" data-replay="success">Replay</button>
      <p>Nodes in, links converge, the fix lands at the centre with a closing ring (1.4 s, plays once). Use for "connected", "position fixed", "saved".</p>
    </div>
    <div class="mcard"><h4>Logo reveal</h4>
      <div class="stage replay" style="background:#FDF9F4;color:#181612;--aid-mark-accent:#B1582B">${K.reveal('aid-iot', 'beacon', { height: 56 })}</div>
      <div class="stage replay" style="background:#071117;color:#D9E7F1;--aid-mark-accent:#E9C67D">${K.reveal('aid-defence', 'facet', { height: 48 })}</div>
      <button class="btn" type="button" data-replay="reveal">Replay</button>
      <p>Video end cards and app launch: nodes appear in travel order, links draw node to node, the wordmark follows (1.7 s).</p>
    </div>
  </div>
</section>

<section id="usage">
  <p class="eyebrow">Usage</p>
  <h2>Do and don't</h2>
  <div class="rules">${data.dos.map(([t, d]) => `<div><b>${esc(t)}</b>${esc(d)}</div>`).join('')}</div>
  <div class="dont">${data.donts.map((d) => `<figure>${dontSvg(d.kind)}<figcaption><b>Don't</b>${esc(d.text)}</figcaption></figure>`).join('')}</div>
</section>

<section class="next">
  <p class="eyebrow">Next steps</p>
  <h2>What happens next, and why</h2>
  <ol>${data.next.map(([t, d]) => `<li><b>${esc(t)}</b> — ${esc(d)}</li>`).join('')}</ol>
</section>
</div>
</main>
<footer><div class="wrap">AID logo modernisation · study round 1 · generated from <code>logo-kit.js</code> by <code>build.mjs</code>. Wordmarks: Archivo (SIL Open Font Licence), outlined.</div></footer>

<script>
${kitSrc}
</script>
<script>
(function(){
  var root=document.documentElement, btns=document.querySelectorAll('.theme button');
  function set(m){ if(m==='auto') root.removeAttribute('data-theme'); else root.setAttribute('data-theme',m);
    btns.forEach(function(b){b.setAttribute('aria-pressed', String(b.dataset.set===m));});
    try{localStorage.setItem('aid-theme',m);}catch(e){} }
  var q=new URLSearchParams(location.search).get('theme'), saved=null;
  try{saved=localStorage.getItem('aid-theme');}catch(e){}
  set(q||saved||'auto');
  btns.forEach(function(b){b.addEventListener('click',function(){set(b.dataset.set);});});
  document.getElementById('rm').addEventListener('change',function(e){document.body.classList.toggle('force-rm',e.target.checked);});
  var y=new URLSearchParams(location.search).get('y'); if(y){document.querySelector('main').style.marginTop=(-y)+'px';}
  if(new URLSearchParams(location.search).get('rm')==='1'){document.getElementById('rm').checked=true;document.body.classList.add('force-rm');}
  document.querySelectorAll('[data-replay]').forEach(function(b){b.addEventListener('click',function(){
    b.parentNode.querySelectorAll('.stage.replay').forEach(function(s){var h=s.innerHTML;s.innerHTML='';void s.offsetWidth;s.innerHTML=h;});
  });});
})();
</script>
</body>
</html>
`;
fs.writeFileSync(path.join(here, 'showcase.html'), page);
console.log('built', fs.readdirSync(path.join(here, 'svg')).join(', '));
