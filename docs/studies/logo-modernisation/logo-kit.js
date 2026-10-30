/*
 * AID logo kit · logo modernisation study, round 1 (2026-10-30)
 * -----------------------------------------------------------------------------
 * One source of truth for the modernised AID mark: every SVG file, the showcase
 * page and the UI previews are generated from the geometry in this file.
 *
 * Plain JavaScript, no build step. Load it with a <script> tag; it attaches
 * window.AIDLogo. (Also runs in Node via `new Function` — see build.mjs.)
 *
 * Construction (120 x 120 grid):
 *   - Skeleton: an equilateral triangle, side 88, apex at (60, 21). The three
 *     vertices are the three NODES; the three edges carry the three LINKS.
 *   - Links never touch nodes: a constant GAP separates them (the "gap rule").
 *   - Order of travel (story and motion): L (sense) -> R (connect) -> A (decide),
 *     i.e. along the base, up the right edge, then back down the left edge.
 *
 * Colour hooks (inline SVG only):
 *   links  -> currentColor
 *   nodes  -> var(--aid-mark-node, currentColor)
 *   accent -> var(--aid-mark-accent, var(--aid-mark-node, currentColor))
 *   Pass opts.colors = {ink, node, accent} to bake explicit colours instead.
 */
(function (root, factory) {
  var kit = factory();
  if (root) root.AIDLogo = kit;
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';

  var R3 = Math.sqrt(3);
  var uid = 0;
  function nextId(p) { uid += 1; return 'aid' + p + uid; }
  function f(v) { return String(Math.round(v * 100) / 100); }
  function P(p) { return f(p[0]) + ' ' + f(p[1]); }
  function add(a, b) { return [a[0] + b[0], a[1] + b[1]]; }
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1]]; }
  function mul(a, k) { return [a[0] * k, a[1] * k]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1]; }
  function unit(a) { var l = Math.hypot(a[0], a[1]); return [a[0] / l, a[1] / l]; }
  function perp(a) { return [-a[1], a[0]]; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }

  /* ---------------------------------------------------------------- skeleton */
  function skeleton(side, cx, apexY) {
    var h = side * R3 / 2;
    return { A: [cx, apexY], L: [cx - side / 2, apexY + h], R: [cx + side / 2, apexY + h],
      C: [cx, apexY + 2 * h / 3], side: side, h: h };
  }
  var EDGES = [['L', 'R'], ['R', 'A'], ['A', 'L']];           // travel order
  var SK = skeleton(88, 60, 21);                              // master skeleton
  var SK16 = skeleton(12, 8, 13 - 6 * R3);  // small master: side 12 on the 16 px grid; base on y 13 so the base link is pixel-crisp

  function bisector(sk, k) { return unit(sub(sk.C, sk[k])); }

  /* ---------------------------------------------------------- link builders */
  // Round link: a stroked line, ends inset d0 from P and d1 from Q (centreline).
  function roundLink(p, q, d0, d1) {
    var u = unit(sub(q, p));
    return { a: add(p, mul(u, d0)), b: sub(q, mul(u, d1)) };
  }
  // Socket link: a band of width w whose ends are concave arcs of radius c centred on the nodes.
  function arcSweep(s, m, e) {
    var cr = (m[0] - s[0]) * (e[1] - m[1]) - (m[1] - s[1]) * (e[0] - m[0]);
    return cr > 0 ? 1 : 0;
  }
  function socketLink(p, q, w, c) {
    var u = unit(sub(q, p)), n = perp(u), h = w / 2, t = Math.sqrt(c * c - h * h);
    var p1 = add(add(p, mul(u, t)), mul(n, h)), p2 = add(sub(q, mul(u, t)), mul(n, h));
    var p3 = sub(sub(q, mul(u, t)), mul(n, h)), p4 = sub(add(p, mul(u, t)), mul(n, h));
    var sQ = arcSweep(p2, sub(q, mul(u, c)), p3), sP = arcSweep(p4, add(p, mul(u, c)), p1);
    return 'M' + P(p1) + 'L' + P(p2) + 'A' + f(c) + ' ' + f(c) + ' 0 0 ' + sQ + ' ' + P(p3) +
      'L' + P(p4) + 'A' + f(c) + ' ' + f(c) + ' 0 0 ' + sP + ' ' + P(p1) + 'Z';
  }
  // Facet link: a band of width w whose ends are straight cuts perpendicular to the corner bisector,
  // at distance c from each vertex. Gives a sharp, closed, engineered triangle.
  function facetLink(sk, pk, qk, w, c) {
    var p = sk[pk], q = sk[qk], u = unit(sub(q, p)), n = perp(u);
    var bp = bisector(sk, pk), bq = bisector(sk, qk), pts = [];
    [w / 2, -w / 2].forEach(function (s) {
      var tp = (c - s * dot(n, bp)) / dot(u, bp);
      var tq = (c - dot(sub(p, q), bq) - s * dot(n, bq)) / dot(u, bq);
      pts.push([add(add(p, mul(n, s)), mul(u, tp)), add(add(p, mul(n, s)), mul(u, tq))]);
    });
    return 'M' + P(pts[0][0]) + 'L' + P(pts[0][1]) + 'L' + P(pts[1][1]) + 'L' + P(pts[1][0]) + 'Z';
  }

  /* ------------------------------------------------------------- variants */
  // Each spec says how to draw nodes and links on a skeleton. `small` is the 16 px master.
  var SPECS = {
    current: { name: 'Current (redrawn)', baseline: true,
      large: { type: 'round', r: 8.6, w: 14.4, d: 21.2 },
      small: { type: 'round', r: 1.8, w: 2, wBase: 2, gap: 0.95 } },
    refined: { name: 'Refined',
      large: { type: 'round', r: 9, w: 10, wBase: 9.4, gap: 6 },
      small: { type: 'round', r: 1.8, w: 1.7, wBase: 2, gap: 0.95 } },
    beacon: { name: 'Beacon', accent: 'A',
      large: { type: 'round', r: 9, w: 10, wBase: 9.4, gap: 6 },
      small: { type: 'round', r: 1.8, w: 1.7, wBase: 2, gap: 0.95 } },
    relay: { name: 'Relay', accent: 'A',
      large: { type: 'relay', r: 9, w: 10, wBase: 9.4, g0: 3.5, g1: 14 },
      small: { type: 'relay', r: 1.8, w: 1.65, g0: 0.75, g1: 2.1 } },
    network: { name: 'Network',
      large: { type: 'round', ring: 4.2, r: 10, w: 4.2, gap: 6 },
      small: { type: 'round', r: 1.8, w: 1.45, gap: 1.05 }, smallBelow: 40 },
    socket: { name: 'Socket',
      large: { type: 'socket', r: 11, w: 17, gap: 4.2 },
      small: { type: 'socket', r: 1.9, w: 2.9, gap: 0.85 } },
    fix: { name: 'Fix', accent: 'C',
      large: { type: 'round', r: 9, w: 10, wBase: 9.4, gap: 6, fix: 6 },
      small: { type: 'round', r: 1.8, w: 1.7, wBase: 2, gap: 0.95 } },
    facet: { name: 'Facet', accent: 'A',
      large: { type: 'facet', r: 8.5, w: 11, gap: 5.5, lgap: 5 },
      small: { type: 'facet', r: 1.75, w: 1.8, gap: 0.9, lgap: 0.95 } },
    tile: { name: 'Tile', accent: 'A', tile: true, inner: 'beacon' }
  };
  var ORDER = ['refined', 'beacon', 'relay', 'network', 'socket', 'fix', 'facet', 'tile'];

  var SUMMARY = {
    current: 'The mark as it is today, redrawn on a clean 120 grid as the baseline.',
    refined: 'Same parts, corrected: lighter even links, larger nodes, one constant gap.',
    beacon: 'Refined, in one colour, with the apex node lit as the single accent: the decision point.',
    relay: 'Links leave one node and stop short of the next, so the mark turns: built to animate.',
    network: 'Hollow nodes and monoline links: the mark as a diagram, for product and data use.',
    socket: 'A heavy frame with three round sockets cut for the nodes: negative space does the work.',
    fix: 'Refined plus the position fix at the centre: three references, one fix.',
    facet: 'The same skeleton, closed and sharp: straight cuts square to each corner. Defence treatment.',
    tile: 'App icon and avatar: Beacon reversed out of a soft square, on the 16 px small master.'
  };

  // Build the parts list for a variant: {nodes:[{k,c,r,ring,accent}], links:[{k,kind,d|a,b,w}], fix}
  function parts(id, small) {
    var spec = SPECS[id];
    if (!spec) throw new Error('AIDLogo: unknown variant ' + id);
    if (spec.tile) return parts(spec.inner, small);
    var g = small ? spec.small : spec.large, sk = small ? SK16 : SK;
    var out = { nodes: [], links: [], fix: null, small: !!small, id: id };
    ['L', 'R', 'A'].forEach(function (k) {
      out.nodes.push({ k: k, c: sk[k], r: g.r, ring: small ? 0 : (g.ring || 0), accent: spec.accent === k });
    });
    EDGES.forEach(function (e, i) {
      var p = sk[e[0]], q = sk[e[1]], key = e[0] + e[1], w = (e[0] === 'L' && g.wBase) ? g.wBase : g.w;
      if (g.type === 'round') {
        var d = g.d != null ? g.d : g.r + g.gap + g.w / 2;
        var s = roundLink(p, q, d, d);
        out.links.push({ k: key, kind: 'stroke', a: s.a, b: s.b, w: w });
      } else if (g.type === 'relay') {
        var s2 = roundLink(p, q, g.r + g.g0 + g.w / 2, g.r + g.g1 + g.w / 2);
        out.links.push({ k: key, kind: 'stroke', a: s2.a, b: s2.b, w: w });
      } else if (g.type === 'socket') {
        out.links.push({ k: key, kind: 'fill', d: socketLink(p, q, g.w, g.r + g.gap) });
      } else if (g.type === 'facet') {
        var c = Math.max(g.w + g.lgap * R3 / 2, g.r + g.gap);
        out.links.push({ k: key, kind: 'fill', d: facetLink(sk, e[0], e[1], g.w, c) });
      }
    });
    if (g.fix) out.fix = { c: sk.C, r: g.fix };
    if (spec.accent === 'C' && small) out.fix = null;
    return out;
  }

  /* ------------------------------------------------------------ painting */
  function paint(role, colors, prop) {
    prop = prop || 'fill';
    if (colors) {
      var v = role === 'ink' ? colors.ink : role === 'node' ? (colors.node || colors.ink)
        : (colors.accent || colors.node || colors.ink);
      return prop + '="' + (v || 'currentColor') + '"';
    }
    if (role === 'ink') return prop + '="currentColor"';
    if (role === 'node') return 'style="' + prop + ':var(--aid-mark-node,currentColor)"';
    return 'style="' + prop + ':var(--aid-mark-accent,var(--aid-mark-node,currentColor))"';
  }

  // Inner SVG markup for a parts list. cls=true adds classes for animation.
  function drawParts(pt, colors, cls) {
    var s = '', c = function (x) { return cls ? ' class="' + x + '"' : ''; };
    pt.links.forEach(function (l) {
      if (l.kind === 'stroke') {
        s += '<path' + c('aid-k aid-k-' + l.k) + ' d="M' + P(l.a) + 'L' + P(l.b) + '" ' + paint('ink', colors, 'stroke') +
          ' stroke-width="' + f(l.w) + '" stroke-linecap="round" fill="none"' + (cls ? ' pathLength="1"' : '') + '/>';
      } else {
        s += '<path' + c('aid-k aid-k-' + l.k) + ' d="' + l.d + '" ' + paint('ink', colors) + '/>';
      }
    });
    pt.nodes.forEach(function (n) {
      var role = n.accent ? 'accent' : 'node';
      if (n.ring) {
        s += '<circle' + c('aid-n aid-n-' + n.k) + ' cx="' + f(n.c[0]) + '" cy="' + f(n.c[1]) + '" r="' + f(n.r - n.ring / 2) +
          '" fill="none" ' + paint(role, colors, 'stroke') + ' stroke-width="' + f(n.ring) + '"/>';
      } else {
        s += '<circle' + c('aid-n aid-n-' + n.k) + ' cx="' + f(n.c[0]) + '" cy="' + f(n.c[1]) + '" r="' + f(n.r) + '" ' + paint(role, colors) + '/>';
      }
    });
    if (pt.fix) s += '<circle' + c('aid-fix') + ' cx="' + f(pt.fix.c[0]) + '" cy="' + f(pt.fix.c[1]) + '" r="' + f(pt.fix.r) + '" ' + paint('accent', colors) + '/>';
    return s;
  }

  // Flat export: the whole mark as filled outlines (one path for the ink, one for the accent).
  // Safe to use fill-rule evenodd because the gap rule guarantees no parts overlap.
  function circlePath(c, r) {
    return 'M' + P([c[0] - r, c[1]]) + 'A' + f(r) + ' ' + f(r) + ' 0 1 0 ' + P([c[0] + r, c[1]]) +
      'A' + f(r) + ' ' + f(r) + ' 0 1 0 ' + P([c[0] - r, c[1]]) + 'Z';
  }
  function stadiumPath(a, b, w) {
    var u = unit(sub(b, a)), n = mul(perp(u), w / 2), h = w / 2;
    var p1 = add(a, n), p2 = add(b, n), p3 = sub(b, n), p4 = sub(a, n);
    var s1 = arcSweep(p2, add(b, mul(u, h)), p3), s2 = arcSweep(p4, sub(a, mul(u, h)), p1);
    return 'M' + P(p1) + 'L' + P(p2) + 'A' + f(h) + ' ' + f(h) + ' 0 0 ' + s1 + ' ' + P(p3) +
      'L' + P(p4) + 'A' + f(h) + ' ' + f(h) + ' 0 0 ' + s2 + ' ' + P(p1) + 'Z';
  }
  function flatInner(id, small, colors) {
    var ol = outline(id, small), cc = colors || {};
    return '<path fill-rule="evenodd" fill="' + (cc.ink || 'currentColor') + '" d="' + ol.ink + '"/>' +
      (ol.accent ? '<path fill-rule="evenodd" fill="' + (cc.accent || cc.ink || 'currentColor') + '" d="' + ol.accent + '"/>' : '');
  }
  function outline(id, small) {
    var pt = parts(SPECS[id].tile ? SPECS[id].inner : id, small), ink = '', acc = '';
    pt.links.forEach(function (l) { ink += l.kind === 'stroke' ? stadiumPath(l.a, l.b, l.w) : l.d; });
    pt.nodes.forEach(function (n) {
      var d = circlePath(n.c, n.r) + (n.ring ? circlePath(n.c, n.r - n.ring) : '');
      if (n.accent) acc += d; else ink += d;
    });
    if (pt.fix) acc += circlePath(pt.fix.c, pt.fix.r);
    return { ink: ink, accent: acc };
  }

  var ORIGINAL = { A: '#FF9A04', L: '#4586F3', R: '#37A955', LR: '#FF9A04', RA: '#4586F3', AL: '#37A955' };

  function svgOpen(vb, size, title, extra) {
    var a = title ? ' role="img" aria-label="' + esc(title) + '"' : ' aria-hidden="true" focusable="false"';
    var wh = size ? ' width="' + size + '" height="' + size + '"' : '';
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="' + vb + '"' + wh + a + (extra || '') + '>' +
      (title ? '<title>' + esc(title) + '</title>' : '');
  }

  // Public: mark(id, {size, title, colors, master:'auto'|'large'|'small', original:true, animate:false})
  function mark(id, o) {
    o = o || {};
    var spec = SPECS[id];
    if (!spec) throw new Error('AIDLogo: unknown variant ' + id);
    var size = o.size || 48;
    var small = o.master === 'small' || (o.master !== 'large' && size <= (spec.smallBelow || 24));
    if (spec.tile) return tile(spec, size, o, small);
    var pt = parts(id, small), vb = small ? '0 0 16 16' : '0 0 120 120', inner;
    if (id === 'current' && o.original) {
      inner = '';
      pt.links.forEach(function (l) {
        inner += '<path d="M' + P(l.a) + 'L' + P(l.b) + '" stroke="' + ORIGINAL[l.k] + '" stroke-width="' + f(l.w) + '" stroke-linecap="round"/>';
      });
      pt.nodes.forEach(function (n) { inner += '<circle cx="' + f(n.c[0]) + '" cy="' + f(n.c[1]) + '" r="' + f(n.r) + '" fill="' + ORIGINAL[n.k] + '"/>'; });
    } else if (o.flat) {
      inner = flatInner(id, small, o.colors);
    } else {
      inner = drawParts(pt, o.colors, o.animate);
    }
    return svgOpen(vb, size, o.title, o.className ? ' class="' + esc(o.className) + '"' : '') + inner + '</svg>';
  }

  // Tile: rounded square in the ink colour with the mark knocked out (true transparency via mask).
  function tile(spec, size, o, small) {
    var colors = o.colors, mid = nextId('m'), vb = small ? '0 0 16 16' : '0 0 120 120';
    var pt = parts(spec.inner, small), rad = small ? 3.5 : 27;
    // scale the mark inside the tile so it keeps a 17% safe margin (for circular avatar crops)
    var inner = drawParts(pt, { ink: '#000', node: '#000', accent: '#000' }, false);
    var k = small ? 0.8 : 0.66, cx = small ? 8 : 60, cy = small ? 8.2 : 61.5;
    var tf = 'translate(' + f(cx * (1 - k)) + ' ' + f(cy * (1 - k) + (small ? 0 : 0)) + ') scale(' + k + ')';
    var bg = colors ? (colors.tile || colors.ink) : null;
    var acc = colors ? (colors.accent || '#fff') : null;
    // accent node shown in accent colour on top of the knock-out
    var accNode = pt.nodes.filter(function (n) { return n.accent; })[0];
    var accMarkup = accNode ? '<g transform="' + tf + '"><circle cx="' + f(accNode.c[0]) + '" cy="' + f(accNode.c[1]) + '" r="' + f(accNode.r) + '" ' +
      (acc ? 'fill="' + acc + '"' : 'style="fill:var(--aid-mark-tile-accent,var(--aid-mark-accent,transparent))"') + '/></g>' : '';
    return svgOpen(vb, size, o.title) +
      '<defs><mask id="' + mid + '" maskUnits="userSpaceOnUse"><rect width="120" height="120" fill="#fff"/>' +
      '<g transform="' + tf + '">' + inner.replace(/#000/g, '#000') + '</g></mask></defs>' +
      '<rect width="' + (small ? 16 : 120) + '" height="' + (small ? 16 : 120) + '" rx="' + rad + '" ' + (bg ? 'fill="' + bg + '"' : 'fill="currentColor"') + ' mask="url(#' + mid + ')"/>' +
      accMarkup + '</svg>';
  }

  /* ------------------------------------------------------------ wordmark */
  var GLYPHS = /* Archivo (SIL OFL) outlines: weight -> {cap, g: {char: [advance, path]}}, 1000 upm */
  {"400":{"cap":686,"g":{"A":[682,"M7 0 278 -686H403L675 0H572L505 -170H171L105 0ZM202 -251H473L390 -466Q387 -475 381 -491Q375 -507 368 -526.5Q361 -546 354 -566.5Q347 -587 341 -604H335Q328 -584 319 -558Q310 -532 301 -507.5Q292 -483 286 -466Z"],"I":[267,"M86 0V-686H181V0Z"],"D":[734,"M86 0V-686H342Q450 -686 526 -650Q602 -614 642.5 -538.5Q683 -463 683 -343Q683 -225 642.5 -149Q602 -73 526 -36.5Q450 0 342 0ZM181 -82H340Q397 -82 442 -96.5Q487 -111 519 -141Q551 -171 567.5 -218.5Q584 -266 584 -332V-352Q584 -420 567.5 -467.5Q551 -515 519.5 -545Q488 -575 443 -589.5Q398 -604 340 -604H181Z"],"o":[570,"M285 12Q205 12 150.5 -17.5Q96 -47 67.5 -108Q39 -169 39 -263Q39 -358 67.5 -418.5Q96 -479 150.5 -508.5Q205 -538 285 -538Q365 -538 419.5 -508.5Q474 -479 502 -418.5Q530 -358 530 -263Q530 -169 502 -108Q474 -47 419.5 -17.5Q365 12 285 12ZM285 -62Q336 -62 370 -82Q404 -102 421.5 -144.5Q439 -187 439 -252V-274Q439 -340 421.5 -382Q404 -424 370 -444Q336 -464 285 -464Q234 -464 199.5 -444Q165 -424 148 -382Q131 -340 131 -274V-252Q131 -187 148 -144.5Q165 -102 199.5 -82Q234 -62 285 -62Z"],"T":[606,"M254 0V-603H19V-686H586V-603H349V0Z"],"E":[677,"M86 0V-686H614V-604H181V-392H570V-310H181V-82H620V0Z"],"F":[612,"M86 0V-686H572V-604H181V-384H537V-303H181V0Z"],"N":[736,"M86 0V-686H178L511 -234Q516 -228 524 -216Q532 -204 540 -192.5Q548 -181 553 -172H557Q557 -188 557 -203.5Q557 -219 557 -234V-686H650V0H563L226 -460Q219 -471 205.5 -491Q192 -511 183 -523H178Q178 -507 178 -491.5Q178 -476 178 -460V0Z"],"C":[728,"M379 12Q274 12 201 -26.5Q128 -65 89.5 -143.5Q51 -222 51 -343Q51 -522 138 -610Q225 -698 380 -698Q468 -698 536 -669.5Q604 -641 642.5 -583.5Q681 -526 681 -439H585Q585 -499 559.5 -538Q534 -577 488 -596.5Q442 -616 380 -616Q308 -616 256 -588Q204 -560 177 -501.5Q150 -443 150 -351V-330Q150 -239 177 -181.5Q204 -124 255.5 -97Q307 -70 380 -70Q444 -70 490.5 -89Q537 -108 562.5 -147.5Q588 -187 588 -247H681Q681 -158 641.5 -101Q602 -44 534 -16Q466 12 379 12Z"],"e":[548,"M279 12Q201 12 147.5 -17.5Q94 -47 66.5 -108Q39 -169 39 -263Q39 -358 66.5 -418.5Q94 -479 148 -508.5Q202 -538 283 -538Q357 -538 407 -509.5Q457 -481 482.5 -424.5Q508 -368 508 -283V-241H130Q132 -178 148.5 -137.5Q165 -97 198 -78.5Q231 -60 281 -60Q315 -60 340.5 -68.5Q366 -77 383.5 -93Q401 -109 410 -131Q419 -153 420 -179H506Q505 -137 490 -101.5Q475 -66 446 -41Q417 -16 375 -2Q333 12 279 12ZM132 -307H417Q417 -351 407 -381Q397 -411 378.5 -430Q360 -449 335.5 -457.5Q311 -466 280 -466Q234 -466 202 -449Q170 -432 153 -397Q136 -362 132 -307Z"]}},"600":{"cap":686,"g":{"A":[709,"M5 0 272 -686H436L704 0H563L508 -146H194L139 0ZM235 -256H466L397 -442Q393 -452 387.5 -467.5Q382 -483 376 -501.5Q370 -520 364 -539Q358 -558 353 -573H348Q342 -553 333.5 -527Q325 -501 317 -478Q309 -455 304 -442Z"],"I":[282,"M76 0V-686H206V0Z"],"D":[728,"M76 0V-686H351Q455 -686 529 -649Q603 -612 643 -536.5Q683 -461 683 -343Q683 -226 643 -150Q603 -74 529 -37Q455 0 351 0ZM206 -111H351Q399 -111 436 -125Q473 -139 498 -166.5Q523 -194 536 -235.5Q549 -277 549 -332V-353Q549 -409 536 -450.5Q523 -492 498 -519.5Q473 -547 436 -561Q399 -575 351 -575H206Z"],"o":[598,"M299 12Q213 12 155 -17.5Q97 -47 68 -108Q39 -169 39 -263Q39 -358 68 -418.5Q97 -479 155 -508.5Q213 -538 299 -538Q386 -538 443.5 -508.5Q501 -479 530 -418.5Q559 -358 559 -263Q559 -169 530 -108Q501 -47 443.5 -17.5Q386 12 299 12ZM299 -88Q347 -88 376.5 -106.5Q406 -125 419.5 -162.5Q433 -200 433 -256V-270Q433 -326 419.5 -363.5Q406 -401 376.5 -419.5Q347 -438 299 -438Q251 -438 221.5 -419.5Q192 -401 178.5 -363.5Q165 -326 165 -270V-256Q165 -200 178.5 -162.5Q192 -125 221.5 -106.5Q251 -88 299 -88Z"],"T":[619,"M244 0V-574H25V-686H594V-574H374V0Z"],"E":[672,"M76 0V-686H611V-575H206V-406H567V-295H206V-111H617V0Z"],"F":[609,"M76 0V-686H569V-575H206V-391H533V-280H206V0Z"],"N":[732,"M76 0V-686H200L493 -281Q498 -275 505 -264.5Q512 -254 518 -244Q524 -234 526 -228H531Q531 -242 531 -255Q531 -268 531 -281V-686H656V0H533L239 -408Q231 -420 220.5 -437.5Q210 -455 206 -462H201Q201 -449 201 -435.5Q201 -422 201 -408V0Z"],"C":[721,"M378 12Q273 12 198.5 -25Q124 -62 84.5 -140.5Q45 -219 45 -343Q45 -524 133 -611Q221 -698 378 -698Q463 -698 531.5 -669Q600 -640 640.5 -581.5Q681 -523 681 -433H548Q548 -483 526.5 -517.5Q505 -552 467 -570Q429 -588 380 -588Q312 -588 267 -561.5Q222 -535 200.5 -483Q179 -431 179 -354V-332Q179 -254 200.5 -202Q222 -150 266.5 -124Q311 -98 380 -98Q432 -98 471 -115.5Q510 -133 531.5 -167.5Q553 -202 553 -252H681Q681 -162 641 -103.5Q601 -45 532.5 -16.5Q464 12 378 12Z"],"e":[561,"M291 12Q207 12 151 -17.5Q95 -47 67 -108Q39 -169 39 -263Q39 -358 67 -418.5Q95 -479 151 -508.5Q207 -538 291 -538Q367 -538 418.5 -509.5Q470 -481 496 -422Q522 -363 522 -269V-233H164Q166 -184 179 -150.5Q192 -117 219.5 -100.5Q247 -84 292 -84Q315 -84 335 -90Q355 -96 370 -108.5Q385 -121 393.5 -140Q402 -159 402 -184H522Q522 -134 504.5 -97Q487 -60 455.5 -36Q424 -12 382 0Q340 12 291 12ZM166 -319H395Q395 -352 387.5 -375Q380 -398 366.5 -413Q353 -428 334 -434.5Q315 -441 291 -441Q252 -441 225.5 -428Q199 -415 185 -388Q171 -361 166 -319Z"]}},"700":{"cap":686,"g":{"A":[724,"M6 0 270 -686H454L718 0H557L508 -135H209L160 0ZM252 -255H465L404 -424Q400 -435 394.5 -450.5Q389 -466 383 -485Q377 -504 371.5 -522.5Q366 -541 361 -556H355Q350 -537 342 -511.5Q334 -486 326 -462.5Q318 -439 313 -424Z"],"I":[301,"M76 0V-686H225V0Z"],"D":[739,"M76 0V-686H356Q463 -686 538 -649Q613 -612 653.5 -536.5Q694 -461 694 -343Q694 -226 653.5 -150Q613 -74 538 -37Q463 0 356 0ZM225 -123H355Q400 -123 435 -136Q470 -149 493 -174.5Q516 -200 528 -238.5Q540 -277 540 -328V-358Q540 -409 528 -447.5Q516 -486 493 -511.5Q470 -537 435 -550.5Q400 -564 355 -564H225Z"],"o":[613,"M306 12Q220 12 160 -17.5Q100 -47 69 -108.5Q38 -170 38 -263Q38 -358 69 -418.5Q100 -479 160 -508.5Q220 -538 306 -538Q394 -538 453.5 -508.5Q513 -479 544 -418.5Q575 -358 575 -263Q575 -170 544 -108.5Q513 -47 453.5 -17.5Q394 12 306 12ZM306 -96Q352 -96 379.5 -113Q407 -130 420 -165Q433 -200 433 -251V-275Q433 -326 420 -361Q407 -396 379.5 -413.5Q352 -431 306 -431Q261 -431 233.5 -413.5Q206 -396 193 -361Q180 -326 180 -275V-251Q180 -200 193 -165Q206 -130 233.5 -113Q261 -96 306 -96Z"],"T":[641,"M245 0V-561H25V-686H616V-561H395V0Z"],"E":[683,"M76 0V-686H624V-564H226V-411H578V-290H226V-123H630V0Z"],"F":[622,"M76 0V-686H582V-564H225V-394H544V-273H225V0Z"],"N":[754,"M76 0V-686H213L489 -316Q495 -309 504 -296.5Q513 -284 521 -272Q529 -260 532 -253H537Q537 -270 537 -286.5Q537 -303 537 -316V-686H678V0H541L259 -379Q249 -393 238 -410Q227 -427 222 -436H217Q217 -421 217 -406.5Q217 -392 217 -379V0Z"],"C":[733,"M383 12Q276 12 200 -25.5Q124 -63 84.5 -142Q45 -221 45 -343Q45 -523 133.5 -610.5Q222 -698 383 -698Q471 -698 541 -668Q611 -638 651.5 -578Q692 -518 692 -427H542Q542 -475 522.5 -508Q503 -541 467.5 -558.5Q432 -576 385 -576Q321 -576 279.5 -551Q238 -526 218.5 -477.5Q199 -429 199 -359V-328Q199 -256 219 -207.5Q239 -159 279.5 -134.5Q320 -110 384 -110Q434 -110 471 -127Q508 -144 528 -177Q548 -210 548 -258H692Q692 -167 652.5 -107Q613 -47 543 -17.5Q473 12 383 12Z"],"e":[584,"M303 12Q216 12 157 -17.5Q98 -47 68 -108Q38 -169 38 -263Q38 -358 68 -418.5Q98 -479 156.5 -508.5Q215 -538 300 -538Q380 -538 435 -509.5Q490 -481 518 -421.5Q546 -362 546 -268V-232H179Q181 -186 193.5 -154Q206 -122 232.5 -106.5Q259 -91 303 -91Q327 -91 346.5 -97Q366 -103 380 -115Q394 -127 402 -145Q410 -163 410 -186H546Q546 -136 528 -99Q510 -62 478 -37.5Q446 -13 401.5 -0.5Q357 12 303 12ZM181 -320H403Q403 -350 395.5 -372Q388 -394 375 -408Q362 -422 343.5 -428.5Q325 -435 302 -435Q264 -435 238.5 -422.5Q213 -410 199.5 -384.5Q186 -359 181 -320Z"]}}};

  // Bake scale + offset into absolute path data so the wordmark is plain paths (imports cleanly into Figma).
  function movePath(d, s, dx, dy) {
    var out = '', cmd = '', i = 0, tokens = d.match(/[A-Za-z]|-?\d*\.?\d+(?:e-?\d+)?/g);
    tokens.forEach(function (t) {
      if (/[A-Za-z]/.test(t)) { cmd = t; i = 0; out += t; return; }
      var v = parseFloat(t), r;
      if (cmd === 'H') r = v * s + dx;
      else if (cmd === 'V') r = v * s + dy;
      else r = (i % 2 === 0) ? v * s + dx : v * s + dy;
      i += 1;
      out += (/[A-Za-z]$/.test(out) ? '' : ' ') + f(r);
    });
    return out;
  }
  // Set a string in one weight. Returns {d, width} in units where cap height = capH.
  var KERN = { 'To': -55, 'AI': 0, 'ID': 0 };
  function setText(str, wt, capH, x0, baseline, track) {
    var gl = GLYPHS[wt], s = capH / gl.cap, x = x0, d = '', prev = '';
    for (var i = 0; i < str.length; i++) {
      var ch = str[i];
      if (ch === ' ') { x += 250 * s; prev = ''; continue; }
      var g = gl.g[ch];
      if (prev && KERN[prev + ch]) x += KERN[prev + ch] * s;
      d += movePath(g[1], s, x, baseline);
      x += g[0] * s + (i < str.length - 1 ? (track || 0) * s : 0);
      prev = ch;
    }
    return { d: d, width: x - x0 };
  }
  // Wordmark geometry for a brand, cap height capH, starting at x0 on baseline.
  function wordmarkPaths(brand, capH, x0, baseline) {
    if (brand === 'aid-defence') {
      var a = setText('AID', '700', capH, x0, baseline, 10);
      var dc = capH * 0.56;
      var b = setText('DEFENCE', '600', dc, x0 + a.width + capH * 0.30, baseline, 100);
      return { parts: [a.d, b.d], width: a.width + capH * 0.30 + b.width };
    }
    var a2 = setText('AID', '700', capH, x0, baseline, 10);
    var b2 = setText('IoT', '400', capH, x0 + a2.width + capH * 0.27, baseline, 0);
    return { parts: [a2.d, b2.d], width: a2.width + capH * 0.27 + b2.width };
  }

  /* --------------------------------------------------------------- lockups */
  // Visual bounds of the master symbol (node edge to node edge), in 120-grid units.
  function symbolBounds(id) {
    var pt = parts(SPECS[id].tile ? SPECS[id].inner : id, false), r = pt.nodes[0].r;
    return { x0: SK.L[0] - r, x1: SK.R[0] + r, y0: SK.A[1] - r, y1: SK.L[1] + r };
  }
  // lockup(brand, id, {height, layout:'horizontal'|'stacked', colors, title, animate})
  // Horizontal: wordmark cap height = 40% of symbol height; baseline sits on the base-node centre line.
  // Gap symbol->wordmark = 1.5 node diameters. Stacked: cap height = 26% of symbol, gap = 1 node diameter.
  function lockup(brand, id, o) {
    o = o || {};
    id = id || (brand === 'aid-defence' ? REC.defence : REC.iot);
    var layout = o.layout || 'horizontal', b = symbolBounds(id), sh = b.y1 - b.y0, sw = b.x1 - b.x0;
    var spec = SPECS[id], N = 2 * ((spec.large || SPECS[spec.inner].large).r);
    var symbolPt = parts(spec.tile ? spec.inner : id, false);
    var inner = o.flat ? flatInner(spec.tile ? spec.inner : id, false, o.colors) : drawParts(symbolPt, o.colors, o.animate);
    var wm, vbw, vbh, sx, sy, svgInner;
    var ink = o.colors ? 'fill="' + o.colors.ink + '"' : 'fill="currentColor"';
    if (layout === 'stacked') {
      var capS = sh * 0.26, gapS = N * 1.1;
      wm = wordmarkPaths(brand, capS, 0, 0);
      vbw = Math.max(sw, wm.width); vbh = sh + gapS + capS;
      sx = (vbw - sw) / 2 - b.x0; sy = -b.y0;
      var wx = (vbw - wm.width) / 2, wy = sh + gapS + capS;
      wm = wordmarkPaths(brand, capS, wx, wy);
    } else {
      // cap height 40% of the symbol; baseline on the bottom edge of the base nodes (the mark's floor)
      var cap = sh * 0.40, gap = N * 1.5;
      wm = wordmarkPaths(brand, cap, sw + gap, sh);
      vbw = sw + gap + wm.width; vbh = sh;
      sx = -b.x0; sy = -b.y0;
    }
    // breathing room for glyph overshoot (round letters dip below the baseline)
    var pad = sh * 0.03; vbw += 2 * pad; vbh += 2 * pad; sx += pad; sy += pad;
    var h = o.height || 48, w = h * vbw / vbh;
    var a = o.title ? ' role="img" aria-label="' + esc(o.title) + '"' : ' role="img" aria-label="' + (brand === 'aid-defence' ? 'AID Defence' : 'AID IoT') + '"';
    svgInner = '<g transform="translate(' + f(sx) + ' ' + f(sy) + ')">' + inner + '</g>' +
      (o.flat ? '<path ' + ink + ' d="' + movePath(wm.parts[0] + wm.parts[1], 1, pad, pad) + '"/>' :
      '<g transform="translate(' + f(pad) + ' ' + f(pad) + ')"><path class="aid-wm aid-wm-1" ' + ink + ' d="' + wm.parts[0] + '"/>' +
      '<path class="aid-wm aid-wm-2" ' + ink + ' d="' + wm.parts[1] + '"/></g>');
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + f(vbw) + ' ' + f(vbh) + '" width="' + f(w) + '" height="' + f(h) + '"' + a +
      (o.animate ? ' class="aid-reveal"' : '') + '>' + (o.flat ? '' : '<title>' + (brand === 'aid-defence' ? 'AID Defence' : 'AID IoT') + '</title>') + svgInner + '</svg>';
  }

  /* -------------------------------------------------------------- patterns */
  // All patterns sit on the 60° lattice that the mark is drawn on. Return a CSS background-image value.
  function latticeTile(kind, col, op) {
    var a = 40, hh = a * R3 / 2, W = 3 * a, H = 2 * hh, s = '';
    var r = 2.6, w = 2.2, gap = 3.6, d = r + gap + w / 2;
    function node(x, y, big) { s += '<circle cx="' + f(x) + '" cy="' + f(y) + '" r="' + (big ? 3.4 : r) + '"/>'; }
    function link(p, q) {
      var l = roundLink(p, q, d, d);
      s += '<path d="M' + P(l.a) + 'L' + P(l.b) + '" stroke-width="' + w + '" stroke-linecap="round" fill="none" stroke="' + col + '"/>';
    }
    // lattice points over an extended range so the tile wraps seamlessly
    var pts = [];
    for (var row = -1; row <= 3; row++) for (var c = -2; c <= 4; c++) pts.push([c * a + (row % 2 ? a / 2 : 0), row * hh]);
    if (kind === 'nodes') {
      pts.forEach(function (p) { node(p[0], p[1]); });
    } else if (kind === 'marks') {
      // every upward triangle carries the mark: a tessellation of the symbol
      pts.forEach(function (p) {
        var Lp = [p[0] - a / 2, p[1] + hh], Rp = [p[0] + a / 2, p[1] + hh];
        link(Lp, Rp); link(Rp, p); link(p, Lp);
      });
      pts.forEach(function (p) { node(p[0], p[1]); });
    } else {
      // 'lattice': a field of nodes; two marks per tile are joined (sparse, calm)
      var joined = [[a, 0], [a * 2.5, hh]];
      joined.forEach(function (p) {
        [[0, 0], [W, 0], [-W, 0], [0, H], [0, -H], [W, H], [-W, -H], [W, -H], [-W, H]].forEach(function (o) {
          var q = [p[0] + o[0], p[1] + o[1]], Lp = [q[0] - a / 2, q[1] + hh], Rp = [q[0] + a / 2, q[1] + hh];
          link(Lp, Rp); link(Rp, q); link(q, Lp);
        });
      });
      pts.forEach(function (p) { node(p[0], p[1]); });
    }
    return { svg: '<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + f(H) + '" viewBox="0 0 ' + W + ' ' + f(H) + '">' +
      '<g fill="' + col + '" opacity="' + op + '">' + s + '</g></svg>', w: W, h: H };
  }
  // pattern(id, {color, opacity}) -> 'url("data:image/svg+xml,...")'
  function pattern(id, o) {
    o = o || {};
    var t = latticeTile(id || 'lattice', o.color || '#24211D', o.opacity != null ? o.opacity : 0.14);
    // single quotes inside url() so the value can sit inside a double-quoted style attribute
    return "url('data:image/svg+xml," + encodeURIComponent(t.svg).replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29') + "')";
  }
  function patternSvg(id, o) { o = o || {}; return latticeTile(id || 'lattice', o.color || '#24211D', o.opacity != null ? o.opacity : 0.14).svg; }

  /* ------------------------------------------------------- state glyphs */
  // Built from the three nodes on the small-master skeleton (24 px grid = 16 grid x 1.5).
  // Meaning is carried by SHAPE (rings, links, breaks); colour is optional (--aid-state-*).
  function stateGlyph(state, o) {
    o = o || {};
    var size = o.size || 24, sk = SK16, r = 1.8, w = 1.5, s = "";
    var title = o.title || { idle: 'Idle', sensing: 'Sensing', connected: 'Connected', alert: 'Alert', fix: 'Fix acquired' }[state];
    function ring(k) { s += '<circle cx="' + f(sk[k][0]) + '" cy="' + f(sk[k][1]) + '" r="' + f(r - 0.6) + '" fill="none" stroke="currentColor" stroke-width="1.2"/>'; }
    function dotN(k, style) { s += '<circle cx="' + f(sk[k][0]) + '" cy="' + f(sk[k][1]) + '" r="' + r + '"' + (style ? ' style="' + style + '"' : ' fill="currentColor"') + '/>'; }
    function link(pk, qk, d0, d1) { var l = roundLink(sk[pk], sk[qk], d0 || 3.6, d1 || 3.6); s += '<path d="M' + P(l.a) + 'L' + P(l.b) + '" stroke="currentColor" stroke-width="' + w + '" stroke-linecap="round"/>'; }
    if (state === 'idle') { ring('L'); ring('R'); ring('A'); }
    else if (state === 'sensing') {
      s += '<circle class="aid-pulse" cx="' + f(sk.L[0]) + '" cy="' + f(sk.L[1]) + '" r="' + r + '" fill="none" stroke="currentColor" stroke-width="0.8" style="color:var(--aid-state-sensing,currentColor)"/>';
      dotN('L', 'fill:var(--aid-state-sensing,currentColor)'); ring('R'); ring('A');
    } else if (state === 'connected') {
      link('L', 'R'); link('R', 'A'); link('A', 'L'); dotN('L'); dotN('R'); dotN('A', 'fill:var(--aid-state-connected,currentColor)');
    } else if (state === 'fix') {
      link('L', 'R'); link('R', 'A'); link('A', 'L'); dotN('L'); dotN('R'); dotN('A');
      s += '<circle cx="' + f(sk.C[0]) + '" cy="' + f(sk.C[1]) + '" r="1.5" style="fill:var(--aid-state-connected,currentColor)"/>';
    } else if (state === 'alert') {
      // the base link is broken: two stubs, wider gap; the right node is hollow (lost)
      link('R', 'A'); link('A', 'L');
      var l1 = roundLink(sk.L, sk.R, 3.6, 7.2), l2 = roundLink(sk.R, sk.L, 3.6 + 2.6, 7.2 + 2.6);
      s += '<path d="M' + P(l1.a) + 'L' + P(l1.b) + '" stroke="currentColor" stroke-width="' + w + '" stroke-linecap="round"/>';
      dotN('L'); dotN('A');
      s += '<circle cx="' + f(sk.R[0]) + '" cy="' + f(sk.R[1]) + '" r="' + f(r + 0.4) + '" style="fill:var(--aid-state-alert,currentColor)"/>' +
        '<circle cx="' + f(sk.R[0]) + '" cy="' + f(sk.R[1]) + '" r="0.9" style="fill:var(--aid-state-alert-on,#fff)"/>';
      void l2;
    } else throw new Error('AIDLogo: unknown state ' + state);
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="' + size + '" height="' + size + '" role="img" aria-label="' + esc(title) + '" class="aid-state aid-state-' + state + '"><title>' + esc(title) + '</title>' + s + '</svg>';
  }

  /* ------------------------------------------------- dividers, bullets, frames */
  // Divider: the base of the mark, stretched. node · gap · link · gap · node (and a centre node for long runs).
  function divider(o) {
    o = o || {};
    return '<div class="aid-divider' + (o.brand === 'aid-defence' ? ' aid-divider--sharp' : '') + '" role="separator"><i></i><b></b><i class="aid-divider-mid"></i><b></b><i></i></div>';
  }
  function bullet(o) {
    o = o || {};
    return '<svg class="aid-bullet" viewBox="0 0 16 16" width="' + (o.size || 12) + '" height="' + (o.size || 12) + '" aria-hidden="true"><circle cx="8" cy="8" r="4.2" ' + paint(o.accent ? 'accent' : 'node') + '/></svg>';
  }
  // Icon frame: a frame line that breaks around a node at its apex (the gap rule).
  function iconFrame(innerSvg, o) {
    o = o || {};
    var size = o.size || 48, sharp = o.brand === 'aid-defence', s;
    if (sharp) {
      // square, stud at top centre, frame line breaks either side
      s = '<path d="M17 4H5.5Q4 4 4 5.5V42.5Q4 44 5.5 44H42.5Q44 44 44 42.5V5.5Q44 4 42.5 4H31" fill="none" stroke="currentColor" stroke-width="1.6"/>' +
        '<rect x="21" y="1" width="6" height="6" rx="0.6" ' + paint('accent') + '/>';
    } else {
      // circle r=20 centred (24,25), stud at the top; gap of 3 either side of the stud
      var cx = 24, cy = 25, R = 20, ang = 0.42; // radians each side of top
      var p1 = [cx + R * Math.sin(ang), cy - R * Math.cos(ang)], p2 = [cx - R * Math.sin(ang), cy - R * Math.cos(ang)];
      s = '<path d="M' + P(p1) + 'A' + R + ' ' + R + ' 0 1 1 ' + P(p2) + '" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>' +
        '<circle cx="24" cy="5" r="3.2" ' + paint('accent') + '/>';
    }
    return '<span class="aid-iconframe" style="display:inline-grid;place-items:center;position:relative;width:' + size + 'px;height:' + size + 'px">' +
      '<svg viewBox="0 0 48 48" width="' + size + '" height="' + size + '" aria-hidden="true" style="position:absolute;inset:0">' + s + '</svg>' +
      '<span style="position:relative;display:grid;place-items:center;width:50%;height:50%;margin-top:' + (sharp ? 2 : 4) + '%">' + (innerSvg || '') + '</span></span>';
  }

  /* ---------------------------------------------------------- network motif */
  // A calm triangulated network behind data: nodes on a jittered 60° lattice, links obey the gap rule.
  function network(o) {
    o = o || {};
    var W = o.width || 640, H = o.height || 320, a = o.spacing || 80, seed = o.seed || 7, s = '';
    function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
    var hh = a * R3 / 2, pts = [], idx = {};
    for (var row = 0; row * hh <= H + hh; row++) for (var c = -1; c * a <= W + a; c++) {
      var p = [c * a + (row % 2 ? a / 2 : 0) + (rnd() - 0.5) * a * 0.36, row * hh + (rnd() - 0.5) * a * 0.3];
      idx[row + ',' + c] = pts.length; pts.push({ p: p, on: rnd() < 0.78, hot: rnd() < 0.07 });
    }
    var r = 3, w = 1.4, gap = 4;
    function link(i, j) {
      if (i == null || j == null || !pts[i].on || !pts[j].on) return;
      var l = roundLink(pts[i].p, pts[j].p, r + gap + w / 2, r + gap + w / 2);
      s += '<path d="M' + P(l.a) + 'L' + P(l.b) + '"/>';
    }
    for (row = 0; row * hh <= H + hh; row++) for (c = -1; c * a <= W + a; c++) {
      var i = idx[row + ',' + c], odd = row % 2;
      link(i, idx[row + ',' + (c + 1)]);
      link(i, idx[(row + 1) + ',' + (odd ? c + 1 : c)]);
      if (rnd() < 0.55) link(i, idx[(row + 1) + ',' + (odd ? c : c - 1)]);
    }
    var nodes = '', hot = '';
    pts.forEach(function (q) {
      if (!q.on) return;
      if (q.hot) hot += '<circle cx="' + f(q.p[0]) + '" cy="' + f(q.p[1]) + '" r="' + (r + 1) + '"/>';
      else nodes += '<circle cx="' + f(q.p[0]) + '" cy="' + f(q.p[1]) + '" r="' + r + '"/>';
    });
    return '<svg class="aid-network" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
      '<g stroke="currentColor" stroke-width="' + w + '" stroke-linecap="round" fill="none" opacity="' + (o.opacity || 0.28) + '">' + s + '</g>' +
      '<g fill="currentColor" opacity="' + (o.opacity ? o.opacity * 1.6 : 0.45) + '">' + nodes + '</g>' +
      '<g style="fill:var(--aid-mark-accent,currentColor)">' + hot + '</g></svg>';
  }

  /* ------------------------------------------------------------ supergraphic */
  // Hero graphic: the mark at architectural scale, cropped off the right edge, on the lattice.
  // IoT: open, round (Beacon); Defence: closed, sharp (Facet) plus bearing lines converging on the fix.
  function supergraphic(brand, o) {
    o = o || {};
    // Portrait crop: the apex node high on the canvas, both links running down and off the edges.
    var W = o.width || 600, H = o.height || 560, def = brand === 'aid-defence';
    var id = def ? 'facet' : 'beacon', pt = parts(id, false), k = H / 120 * 1.3;
    var tx = W * 0.58 - SK.A[0] * k, ty = H * 0.16 - SK.A[1] * k;
    var s = '<svg class="aid-super" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="xMidYMid slice" aria-hidden="true">';
    var C = [tx + SK.C[0] * k, ty + SK.C[1] * k];
    if (def) {
      // bearing lines: hairlines from each node through the fix (navigation, not targeting: no reticle)
      ['L', 'R', 'A'].forEach(function (key) {
        var p = [tx + SK[key][0] * k, ty + SK[key][1] * k], u = unit(sub(C, p));
        s += '<path d="M' + P(sub(p, mul(u, 2000))) + 'L' + P(add(C, mul(u, 2000))) + '" stroke="currentColor" stroke-width="1" opacity="0.2" fill="none"/>';
      });
    }
    s += '<g transform="translate(' + f(tx) + ' ' + f(ty) + ') scale(' + f(k) + ')">' + drawParts(pt, o.colors) + '</g>';
    if (def) s += '<circle cx="' + f(C[0]) + '" cy="' + f(C[1]) + '" r="' + f(4.5 * k) + '" ' + paint('accent', o.colors) + '/>';
    return s + '</svg>';
  }

  /* ----------------------------------------------------------------- motion */
  var CSS = [
    '.aid-loader{display:inline-flex;flex-direction:column;align-items:center;gap:8px;color:inherit}',
    '.aid-loader svg{overflow:visible}',
    '.aid-loader .aid-n{transform-box:fill-box;transform-origin:center;opacity:.22}',
    '.aid-loader .aid-k{stroke-dasharray:1 1;stroke-dashoffset:1;opacity:1}',
    '.aid-loader--iot .aid-n-L{animation:aidN1 2.4s cubic-bezier(.3,.7,.2,1) infinite}',
    '.aid-loader--iot .aid-k-LR{animation:aidK1 2.4s cubic-bezier(.45,0,.25,1) infinite}',
    '.aid-loader--iot .aid-n-R{animation:aidN2 2.4s cubic-bezier(.3,.7,.2,1) infinite}',
    '.aid-loader--iot .aid-k-RA{animation:aidK2 2.4s cubic-bezier(.45,0,.25,1) infinite}',
    '.aid-loader--iot .aid-n-A{animation:aidN3 2.4s cubic-bezier(.3,.7,.2,1) infinite}',
    '.aid-loader--iot .aid-k-AL{animation:aidK3 2.4s cubic-bezier(.45,0,.25,1) infinite}',
    '@keyframes aidN1{0%{opacity:.22;transform:scale(.7)}8%{opacity:1;transform:scale(1.12)}14%,84%{opacity:1;transform:scale(1)}100%{opacity:.22;transform:scale(1)}}',
    '@keyframes aidN2{0%,26%{opacity:.22;transform:scale(.7)}34%{opacity:1;transform:scale(1.12)}40%,84%{opacity:1;transform:scale(1)}100%{opacity:.22;transform:scale(1)}}',
    '@keyframes aidN3{0%,52%{opacity:.22;transform:scale(.7)}60%{opacity:1;transform:scale(1.18)}66%,84%{opacity:1;transform:scale(1)}100%{opacity:.22;transform:scale(1)}}',
    '@keyframes aidK1{0%,6%{stroke-dashoffset:1;opacity:1}28%,84%{stroke-dashoffset:0;opacity:1}100%{stroke-dashoffset:0;opacity:0}}',
    '@keyframes aidK2{0%,32%{stroke-dashoffset:1;opacity:1}54%,84%{stroke-dashoffset:0;opacity:1}100%{stroke-dashoffset:0;opacity:0}}',
    '@keyframes aidK3{0%,58%{stroke-dashoffset:1;opacity:1}78%,84%{stroke-dashoffset:0;opacity:1}100%{stroke-dashoffset:0;opacity:0}}',
    /* Defence: step-wise, slower, like a briefing. Parts switch on whole, in sequence; then the fix. */
    '.aid-loader--def .aid-k{stroke-dasharray:none;stroke-dashoffset:0;opacity:.14}',
    '.aid-loader--def .aid-n{opacity:.18}',
    '.aid-loader--def .aid-fix{opacity:0}',
    '.aid-loader--def .aid-n-L{animation:aidD1 3.2s steps(1,end) infinite}',
    '.aid-loader--def .aid-n-R{animation:aidD2 3.2s steps(1,end) infinite}',
    '.aid-loader--def .aid-n-A{animation:aidD3 3.2s steps(1,end) infinite}',
    '.aid-loader--def .aid-k{animation:aidD4 3.2s steps(1,end) infinite}',
    '.aid-loader--def .aid-fix{animation:aidD5 3.2s steps(1,end) infinite}',
    '@keyframes aidD1{0%{opacity:.18}12%,88%{opacity:1}100%{opacity:.18}}',
    '@keyframes aidD2{0%,24%{opacity:.18}36%,88%{opacity:1}100%{opacity:.18}}',
    '@keyframes aidD3{0%,48%{opacity:.18}60%,88%{opacity:1}100%{opacity:.18}}',
    '@keyframes aidD4{0%,60%{opacity:.14}66%,88%{opacity:1}100%{opacity:.14}}',
    '@keyframes aidD5{0%,72%{opacity:0}76%,88%{opacity:1}100%{opacity:0}}',
    '.aid-loader-label{font:500 12px/1.2 "Atkinson Hyperlegible Next",system-ui,sans-serif;letter-spacing:.02em;opacity:.8}',
    /* Fix acquired: nodes, then links converge, then the fix lands with a closing ring */
    '.aid-success .aid-n{transform-box:fill-box;transform-origin:center;animation:aidSn .5s cubic-bezier(.3,.7,.2,1.3) both}',
    '.aid-success .aid-n-R{animation-delay:.1s}.aid-success .aid-n-A{animation-delay:.2s}',
    '.aid-success .aid-k{stroke-dasharray:1 1;animation:aidSk .55s cubic-bezier(.45,0,.25,1) .35s both}',
    '.aid-success .aid-fix{transform-box:fill-box;transform-origin:center;animation:aidSf .45s cubic-bezier(.3,.7,.2,1.4) .9s both}',
    '.aid-success .aid-ring{transform-box:fill-box;transform-origin:center;animation:aidSr .6s ease-out .78s both}',
    '@keyframes aidSn{from{opacity:0;transform:scale(.4)}to{opacity:1;transform:scale(1)}}',
    '@keyframes aidSk{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}',
    '@keyframes aidSf{from{opacity:0;transform:scale(0)}to{opacity:1;transform:scale(1)}}',
    '@keyframes aidSr{0%{opacity:0;transform:scale(3.2)}40%{opacity:.6}100%{opacity:0;transform:scale(1)}}',
    '.aid-success--def .aid-n,.aid-success--def .aid-k,.aid-success--def .aid-fix{animation-timing-function:steps(2,end)}',
    /* Logo reveal: nodes appear in travel order, links draw node to node, the wordmark follows */
    '.aid-reveal .aid-n{transform-box:fill-box;transform-origin:center;animation:aidSn .45s cubic-bezier(.3,.7,.2,1.3) both}',
    '.aid-reveal .aid-n-R{animation-delay:.12s}.aid-reveal .aid-n-A{animation-delay:.24s}',
    '.aid-reveal path.aid-k[pathLength]{stroke-dasharray:1 1;animation:aidSk .5s cubic-bezier(.45,0,.25,1) .4s both}',
    '.aid-reveal path.aid-k:not([pathLength]){animation:aidFade .4s ease .4s both}',
    '.aid-reveal .aid-k-RA{animation-delay:.55s!important}.aid-reveal .aid-k-AL{animation-delay:.7s!important}',
    '.aid-reveal .aid-wm{animation:aidWm .6s cubic-bezier(.2,.7,.2,1) 1s both}.aid-reveal .aid-wm-2{animation-delay:1.12s}',
    '@keyframes aidFade{from{opacity:0}to{opacity:1}}',
    '@keyframes aidWm{from{opacity:0;transform:translateX(-6px)}to{opacity:1;transform:none}}',
    /* sensing pulse on state glyph */
    '.aid-state .aid-pulse{transform-box:fill-box;transform-origin:center;animation:aidP 1.6s ease-out infinite}',
    '@keyframes aidP{0%{opacity:.8;transform:scale(1)}100%{opacity:0;transform:scale(2.6)}}',
    /* divider */
    '.aid-divider{display:flex;align-items:center;gap:6px;width:100%;color:inherit}',
    '.aid-divider i{flex:none;width:7px;height:7px;border-radius:50%;background:currentColor}',
    '.aid-divider b{flex:1;height:2px;border-radius:2px;background:currentColor;opacity:.55}',
    '.aid-divider .aid-divider-mid{background:var(--aid-mark-accent,currentColor)}',
    '.aid-divider--sharp i{border-radius:1px;transform:rotate(45deg);width:6px;height:6px}.aid-divider--sharp b{border-radius:0;height:1.5px}',
    /* reduced motion: designed static states */
    '@media (prefers-reduced-motion: reduce){',
    ' .aid-loader .aid-n,.aid-loader .aid-k,.aid-loader .aid-fix{animation:none!important}',
    ' .aid-loader .aid-n{opacity:1;transform:none}',
    ' .aid-loader .aid-k{stroke-dashoffset:0;opacity:.3}',
    ' .aid-loader--def .aid-fix{opacity:1}',
    ' .aid-success *,.aid-reveal *{animation:none!important}',
    ' .aid-success .aid-ring{opacity:0}',
    ' .aid-state .aid-pulse{animation:none;opacity:.5;transform:scale(1.9)}',
    '}'
  ].join('\n');

  function injectCss() {
    if (typeof document === 'undefined' || document.getElementById('aid-logo-kit-css')) return;
    var st = document.createElement('style'); st.id = 'aid-logo-kit-css'; st.textContent = CSS;
    document.head.appendChild(st);
  }

  // loader({size, brand, label}) -> HTML. Loops; static designed state under reduced motion.
  function loader(o) {
    o = o || {};
    var size = o.size || 48, def = o.brand === 'aid-defence';
    var pt = parts(def ? 'facet' : 'beacon', false);
    if (def) pt.fix = { c: SK.C, r: 5 };
    var label = o.label === false ? '' : '<span class="aid-loader-label">' + esc(o.label || 'Loading') + '</span>';
    return '<span class="aid-loader ' + (def ? 'aid-loader--def' : 'aid-loader--iot') + '" role="status" aria-live="polite">' +
      '<svg viewBox="0 0 120 120" width="' + size + '" height="' + size + '" aria-hidden="true">' + drawParts(pt, o.colors, true) + '</svg>' +
      (label || '<span style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">Loading</span>') + '</span>';
  }
  // success({size, brand}) -> HTML. Plays once on insertion ("fix acquired").
  function success(o) {
    o = o || {};
    var size = o.size || 64, def = o.brand === 'aid-defence';
    var pt = parts(def ? 'facet' : 'refined', false); pt.fix = { c: SK.C, r: 6 };
    var ring = '<circle class="aid-ring" cx="' + f(SK.C[0]) + '" cy="' + f(SK.C[1]) + '" r="9" fill="none" ' + paint('accent', o.colors, 'stroke') + ' stroke-width="2"/>';
    return '<span class="aid-success' + (def ? ' aid-success--def' : '') + '" role="status"><svg viewBox="0 0 120 120" width="' + size + '" height="' + size + '" aria-label="' + esc(o.label || 'Fix acquired') + '" role="img">' +
      drawParts(pt, o.colors, true) + ring + '</svg></span>';
  }
  function reveal(brand, id, o) { o = o || {}; o.animate = true; return lockup(brand, id, o); }

  var REC = { iot: 'beacon', defence: 'facet' };

  return {
    version: '0.1.0-study',
    variants: ORDER.map(function (id) { return { id: id, name: SPECS[id].name, accent: SPECS[id].accent || null, summary: SUMMARY[id] }; }),
    baseline: { id: 'current', name: SPECS.current.name, summary: SUMMARY.current },
    recommended: REC,
    patterns: ['lattice', 'marks', 'nodes'],
    states: ['idle', 'sensing', 'connected', 'alert', 'fix'],
    mark: mark,
    parts: parts,
    outline: outline,
    lockup: lockup,
    pattern: pattern,
    patternSvg: patternSvg,
    stateGlyph: stateGlyph,
    divider: divider,
    bullet: bullet,
    iconFrame: iconFrame,
    network: network,
    supergraphic: supergraphic,
    loader: loader,
    success: success,
    reveal: reveal,
    css: CSS,
    injectCss: injectCss,
    _geometry: { skeleton: SK, small: SK16, specs: SPECS }
  };
});
