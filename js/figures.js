// Simple SVG diagrams used by the papers. Each function returns an SVG string.
(function (P3) {
  'use strict';
  var F = P3.fig;
  var INK = '#1f2937';
  var FONT = 'font-family="Nunito, Arial, sans-serif"';

  function svg(w, h, body, label) {
    return '<svg class="figure-svg" viewBox="0 0 ' + w + ' ' + h + '" width="' + w + '" role="img" aria-label="' +
      P3.esc(label || 'Diagram') + '" xmlns="http://www.w3.org/2000/svg">' + body + '</svg>';
  }
  function text(x, y, t, opts) {
    opts = opts || {};
    return '<text x="' + x + '" y="' + y + '" ' + FONT + ' font-size="' + (opts.size || 13) + '" fill="' + (opts.fill || INK) +
      '" text-anchor="' + (opts.anchor || 'middle') + '"' + (opts.bold ? ' font-weight="700"' : '') +
      (opts.italic ? ' font-style="italic"' : '') + '>' + t + '</text>';
  }
  function line(x1, y1, x2, y2, stroke, width, extra) {
    return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + (stroke || INK) +
      '" stroke-width="' + (width || 2) + '"' + (extra || '') + '/>';
  }

  // ---------------------------------------------------------------- Maths

  F.barGraph = function (o) {
    var W = 380, H = 280, left = 56, right = 360, top = 36, bottom = 224;
    var unit = (bottom - top) / o.max;
    var s = text(W / 2, 20, o.title, { bold: true, size: 14 });
    for (var v = 0; v <= o.max; v += o.step) {
      var y = bottom - v * unit;
      s += line(left, y, right, y, '#cbd5e1', 1);
      s += text(left - 8, y + 4, v, { anchor: 'end', size: 12 });
    }
    var slot = (right - left) / o.labels.length;
    o.labels.forEach(function (lab, i) {
      var cx = left + slot * (i + 0.5), h = o.values[i] * unit;
      s += '<rect x="' + (cx - 20) + '" y="' + (bottom - h) + '" width="40" height="' + h + '" fill="#60a5fa" stroke="#1d4ed8"/>';
      s += text(cx, bottom + 18, lab, { size: 13 });
    });
    s += line(left, top - 6, left, bottom) + line(left, bottom, right, bottom);
    s += '<text ' + FONT + ' font-size="12" fill="' + INK + '" transform="translate(16 ' + ((top + bottom) / 2) +
      ') rotate(-90)" text-anchor="middle">' + o.yLabel + '</text>';
    s += text((left + right) / 2, bottom + 40, o.xLabel, { size: 12 });
    return svg(W, H, s, o.title);
  };

  F.angle = function (deg) {
    var vx = 62, vy = 72, len = 58, r = 16, rad = deg * Math.PI / 180;
    var ex = vx + len * Math.cos(rad), ey = vy - len * Math.sin(rad);
    var ax = vx + r * Math.cos(rad), ay = vy - r * Math.sin(rad);
    var s = line(vx, vy, vx + len, vy, INK, 2.5) + line(vx, vy, ex.toFixed(1), ey.toFixed(1), INK, 2.5);
    s += '<path d="M' + (vx + r) + ' ' + vy + ' A' + r + ' ' + r + ' 0 0 0 ' + ax.toFixed(1) + ' ' + ay.toFixed(1) +
      '" fill="none" stroke="#dc2626" stroke-width="2"/>';
    return svg(130, 86, s, 'An angle');
  };

  // cells: array of [row, col] shaded squares on a 1 cm grid
  F.gridShape = function (rows, cols, cells) {
    var c = 30, pad = 10, s = '';
    for (var r = 0; r <= rows; r++) s += line(pad, pad + r * c, pad + cols * c, pad + r * c, '#cbd5e1', 1);
    for (var k = 0; k <= cols; k++) s += line(pad + k * c, pad, pad + k * c, pad + rows * c, '#cbd5e1', 1);
    cells.forEach(function (rc) {
      s += '<rect x="' + (pad + rc[1] * c) + '" y="' + (pad + rc[0] * c) + '" width="' + c + '" height="' + c +
        '" fill="#fde68a" stroke="#b45309" stroke-width="1.5"/>';
    });
    return svg(cols * c + pad * 2, rows * c + pad * 2, s, 'Shape made of 1 cm squares');
  };

  // o.labels: the four corner letters (top-left, top-right, bottom-right, bottom-left); o.marks: false hides the right-angle marks
  F.trapezium = function (o) {
    o = o || {};
    var L = o.labels || ['A', 'B', 'C', 'D'];
    var s = '<polygon points="50,30 170,30 240,140 50,140" fill="#ecfeff" stroke="' + INK + '" stroke-width="2.5"/>';
    if (o.marks !== false) {
      s += '<polyline points="50,44 64,44 64,30" fill="none" stroke="' + INK + '" stroke-width="1.5"/>';
      s += '<polyline points="50,126 64,126 64,140" fill="none" stroke="' + INK + '" stroke-width="1.5"/>';
    }
    s += text(40, 28, L[0], { bold: true }) + text(178, 28, L[1], { bold: true }) +
      text(250, 152, L[2], { bold: true }) + text(40, 154, L[3], { bold: true });
    return svg(280, 170, s, 'Figure ' + L.join(''));
  };

  // A rectangle cut into equal parts; `shaded` lists the shaded part indexes.
  F.fractionBar = function (parts, shaded) {
    var w = 300 / parts, s = '';
    for (var i = 0; i < parts; i++) {
      s += '<rect x="' + (10 + i * w) + '" y="10" width="' + w + '" height="60" fill="' + (shaded.indexOf(i) >= 0 ? '#93c5fd' : '#fff') +
        '" stroke="' + INK + '" stroke-width="2"/>';
    }
    return svg(320, 80, s, 'A rectangle cut into ' + parts + ' equal parts with ' + shaded.length + ' shaded');
  };

  F.shape = function (points) {
    return svg(100, 90, '<polygon points="' + points.map(function (p) { return p.join(','); }).join(' ') +
      '" fill="#fef3c7" stroke="' + INK + '" stroke-width="2.5"/>', 'A shape');
  };

  // Part-whole model: big has `times` units, small has 1, both together make `total`.
  F.totalModel = function (o) {
    var u = 50, x0 = 80, s = '';
    s += text(40, 42, o.big, { anchor: 'end' }) + text(40, 92, o.small, { anchor: 'end' });
    for (var i = 0; i < o.times; i++) s += '<rect x="' + (x0 + i * u) + '" y="25" width="' + u + '" height="26" fill="#fecaca" stroke="#b91c1c"/>';
    s += '<rect x="' + x0 + '" y="75" width="' + u + '" height="26" fill="#bfdbfe" stroke="#1d4ed8"/>';
    var bx = x0 + o.times * u + 14;
    s += '<path d="M' + bx + ' 25 q10 0 10 12 l0 20 l8 6 l-8 6 l0 20 q0 12 -10 12" fill="none" stroke="' + INK + '" stroke-width="1.5"/>';
    s += text(bx + 22, 68, o.total, { anchor: 'start', bold: true });
    s += text(x0 + u / 2, 122, '?', { bold: true });
    return svg(x0 + o.times * u + 90, 132, s, 'Bar model: ' + o.big + ' is ' + o.times + ' units, ' + o.small + ' is 1 unit, total ' + o.total);
  };

  F.barModel = function () {
    var u = 60, x0 = 80, s = '';
    s += text(40, 42, 'Red', { anchor: 'end' }) + text(40, 102, 'Blue', { anchor: 'end' });
    for (var i = 0; i < 3; i++) s += '<rect x="' + (x0 + i * u) + '" y="25" width="' + u + '" height="26" fill="#fecaca" stroke="#b91c1c"/>';
    s += '<rect x="' + x0 + '" y="85" width="' + u + '" height="26" fill="#bfdbfe" stroke="#1d4ed8"/>';
    s += '<path d="M' + (x0 + u) + ' 60 q60 14 120 0" fill="none" stroke="' + INK + '" stroke-dasharray="4 3"/>';
    s += text(x0 + 2 * u, 82, '248', { bold: true });
    s += text(x0 + u / 2, 132, '?', { bold: true });
    return svg(300, 140, s, 'Bar model: red is 3 units, blue is 1 unit, difference is 248');
  };

  // ---------------------------------------------------------------- Science

  F.plant = function () {
    var s = '<rect x="0" y="170" width="320" height="90" fill="#d6b88c"/>';
    s += line(0, 170, 320, 170, '#92400e', 2);
    // roots
    s += '<path d="M160 170 L160 225 M160 185 L135 215 M160 190 L188 222 M160 205 L142 240 M160 210 L176 246" stroke="#78350f" stroke-width="3" fill="none" stroke-linecap="round"/>';
    // stem
    s += line(160, 170, 160, 70, '#15803d', 6);
    // leaves
    s += '<path d="M160 140 q-45 -25 -70 0 q35 18 70 0z" fill="#22c55e" stroke="#15803d" stroke-width="2"/>';
    s += '<path d="M160 115 q45 -25 70 0 q-35 18 -70 0z" fill="#22c55e" stroke="#15803d" stroke-width="2"/>';
    // flower
    for (var i = 0; i < 6; i++) {
      var a = i * Math.PI / 3;
      s += '<circle cx="' + (160 + 16 * Math.cos(a)).toFixed(1) + '" cy="' + (55 + 16 * Math.sin(a)).toFixed(1) + '" r="12" fill="#f472b6" stroke="#be185d"/>';
    }
    s += '<circle cx="160" cy="55" r="10" fill="#facc15" stroke="#a16207"/>';
    // labels
    s += line(182, 45, 250, 30, INK, 1.2) + text(262, 34, 'A', { bold: true, size: 16 });
    s += line(90, 140, 40, 120, INK, 1.2) + text(30, 124, 'B', { bold: true, size: 16 });
    s += line(163, 160, 250, 160, INK, 1.2) + text(262, 164, 'C', { bold: true, size: 16 });
    s += line(140, 230, 70, 240, INK, 1.2) + text(58, 244, 'D', { bold: true, size: 16 });
    return svg(320, 260, s, 'A plant with parts labelled A, B, C and D');
  };

  F.butterflyCycle = function () {
    var s = '<defs><marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">' +
      '<path d="M0 0 L10 5 L0 10z" fill="' + INK + '"/></marker></defs>';
    // arrows (clockwise)
    s += '<path d="M205 52 Q265 70 268 118" fill="none" stroke="' + INK + '" stroke-width="2" marker-end="url(#arr)"/>';
    s += '<path d="M262 196 Q245 238 200 246" fill="none" stroke="' + INK + '" stroke-width="2" marker-end="url(#arr)"/>';
    s += '<path d="M118 246 Q72 236 58 196" fill="none" stroke="' + INK + '" stroke-width="2" marker-end="url(#arr)"/>';
    s += '<path d="M56 118 Q62 68 118 50" fill="none" stroke="' + INK + '" stroke-width="2" marker-end="url(#arr)"/>';
    // A: eggs on a leaf (top)
    s += '<path d="M125 45 q35 -30 70 0 q-35 22 -70 0z" fill="#86efac" stroke="#15803d"/>';
    [[148, 42], [160, 38], [172, 42]].forEach(function (p) { s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="4.5" fill="#fef9c3" stroke="#a16207"/>'; });
    s += text(160, 80, 'A', { bold: true, size: 16 });
    // B: caterpillar (right)
    for (var i = 0; i < 6; i++) s += '<circle cx="' + (238 + i * 11) + '" cy="160" r="7" fill="#4ade80" stroke="#166534"/>';
    s += '<circle cx="302" cy="156" r="8" fill="#22c55e" stroke="#166534"/>';
    s += text(268, 190, 'B', { bold: true, size: 16 });
    // C: pupa (bottom)
    s += line(160, 222, 160, 232, '#78350f', 2);
    s += '<path d="M160 232 q14 10 8 30 q-8 12 -16 0 q-6 -20 8 -30z" fill="#a3a36b" stroke="#57534e"/>';
    s += text(160, 284, 'C', { bold: true, size: 16 });
    // D: butterfly (left)
    s += '<ellipse cx="40" cy="150" rx="3" ry="16" fill="' + INK + '"/>';
    s += '<path d="M38 145 q-28 -28 -30 0 q4 12 30 4z M42 145 q28 -28 30 0 q-4 12 -30 4z" fill="#fb923c" stroke="#9a3412"/>';
    s += '<path d="M38 152 q-22 22 -18 4z M42 152 q22 22 18 4z" fill="#fdba74" stroke="#9a3412"/>';
    s += text(40, 190, 'D', { bold: true, size: 16 });
    return svg(320, 296, s, 'Life cycle of a butterfly with stages A, B, C and D');
  };

  F.magnets = function () {
    var s = '';
    s += '<rect x="20" y="40" width="70" height="36" fill="#93c5fd" stroke="' + INK + '"/>' + text(55, 64, 'S', { bold: true, size: 16 });
    s += '<rect x="90" y="40" width="70" height="36" fill="#fca5a5" stroke="' + INK + '"/>' + text(125, 64, 'N', { bold: true, size: 16 });
    s += '<rect x="200" y="40" width="70" height="36" fill="#e5e7eb" stroke="' + INK + '"/>' + text(235, 64, 'X', { bold: true, size: 16 });
    s += '<rect x="270" y="40" width="70" height="36" fill="#e5e7eb" stroke="' + INK + '"/>' + text(305, 64, 'Y', { bold: true, size: 16 });
    s += text(90, 28, 'Magnet P') + text(270, 28, 'Magnet Q');
    s += '<path d="M168 92 l-14 0 m0 0 l6 -5 m-6 5 l6 5 M192 92 l14 0 m0 0 l-6 -5 m6 5 l-6 5" stroke="#dc2626" stroke-width="2" fill="none"/>';
    s += text(180, 112, 'The magnets push away', { size: 12, fill: '#dc2626' });
    return svg(360, 122, s, 'Two bar magnets P and Q pushing each other away');
  };

  // ---------------------------------------------------------------- Composition pictures

  // A simple cartoon person standing with feet at (x, y).
  F.person = function (o) {
    var s = '';
    var skin = o.skin || '#f3c9a0', shirt = o.shirt || '#3b82f6', legs = o.legs || '#1e3a8a', hair = o.hair || '#2b2118';
    var arms = { down: [-18, -38], out: [-36, -60], up: [-22, -98], forward: [-30, -48], hold: [-26, -46] };
    var aL = arms[o.armL || 'down'], aR = arms[o.armR || 'down'];
    if (o.skirt) {
      s += line(-6, -30, -7, 0, skin, 5) + line(6, -30, 7, 0, skin, 5);
      s += '<path d="M-11 -40 L11 -40 L16 -22 L-16 -22z" fill="' + legs + '"/>';
    } else {
      s += line(-6, -36, -8, 0, legs, 7) + line(6, -36, 8, 0, legs, 7);
    }
    s += '<ellipse cx="-9" cy="1" rx="7" ry="3" fill="#111"/><ellipse cx="9" cy="1" rx="7" ry="3" fill="#111"/>';
    s += line(-10, -64, aL[0], aL[1], skin, 5) + line(10, -64, -aR[0], aR[1], skin, 5);
    s += '<rect x="-12" y="-70" width="24" height="34" rx="6" fill="' + shirt + '"/>';
    s += '<circle cx="0" cy="-84" r="13" fill="' + skin + '"/>';
    if (o.hairStyle === 'long') {
      s += '<path d="M-14 -84 q0 -18 14 -18 q14 0 14 18 l0 16 l-6 0 l0 -18 q-8 -6 -16 0 l0 18 l-6 0z" fill="' + hair + '"/>';
    } else if (o.hairStyle === 'bun') {
      s += '<circle cx="0" cy="-101" r="7" fill="' + hair + '"/><path d="M-13 -86 q0 -15 13 -15 q13 0 13 15 q-13 -8 -26 0z" fill="' + hair + '"/>';
    } else {
      s += '<path d="M-13 -86 q0 -16 13 -16 q13 0 13 16 q-13 -7 -26 0z" fill="' + hair + '"/>';
    }
    if (o.cap) s += '<path d="M-14 -92 q14 -16 28 0z" fill="' + o.cap + '"/><rect x="-14" y="-93" width="34" height="4" rx="2" fill="' + o.cap + '"/>';
    if (o.tears) s += '<path d="M-7 -81 q-2 5 0 7 q2 -2 0 -7z M7 -81 q-2 5 0 7 q2 -2 0 -7z" fill="#38bdf8"/>';
    if (o.glasses) s += '<circle cx="-5" cy="-85" r="4" fill="none" stroke="#111"/><circle cx="5" cy="-85" r="4" fill="none" stroke="#111"/>' + line(-1, -85, 1, -85, '#111', 1);
    s += '<circle cx="-4.5" cy="-85" r="1.6" fill="#111"/><circle cx="4.5" cy="-85" r="1.6" fill="#111"/>';
    var face = o.face || 'smile';
    if (face === 'smile') s += '<path d="M-5 -78 q5 5 10 0" fill="none" stroke="#7c2d12" stroke-width="1.6"/>';
    else if (face === 'surprised') s += '<ellipse cx="0" cy="-77" rx="2.5" ry="3.2" fill="#7c2d12"/>';
    else if (face === 'sad') s += '<path d="M-5 -75 q5 -5 10 0" fill="none" stroke="#7c2d12" stroke-width="1.6"/>';
    else s += line(-4, -77, 4, -77, '#7c2d12', 1.6);
    var tr = 'translate(' + o.x + ' ' + o.y + ') scale(' + (o.flip ? -(o.s || 1) : (o.s || 1)) + ' ' + (o.s || 1) + ')';
    return '<g transform="' + tr + '">' + s + '</g>';
  };

  F.bubble = function (x, y, w, t, tailX) {
    return '<g><rect x="' + x + '" y="' + y + '" width="' + w + '" height="30" rx="12" fill="#fff" stroke="' + INK + '" stroke-width="1.5"/>' +
      '<path d="M' + (tailX - 6) + ' ' + (y + 29) + ' l6 14 l6 -14z" fill="#fff" stroke="' + INK + '" stroke-width="1.5"/>' +
      '<rect x="' + (tailX - 5) + '" y="' + (y + 26) + '" width="10" height="5" fill="#fff"/>' +
      text(x + w / 2, y + 20, t, { size: 13, bold: true }) + '</g>';
  };

  var panelCount = 0;
  F.panel = function (n, body, label) {
    var clip = 'panelclip' + (++panelCount);
    var s = '<rect x="1" y="1" width="298" height="218" rx="10" fill="#fff" stroke="' + INK + '" stroke-width="2"/>';
    s += '<clipPath id="' + clip + '"><rect x="2" y="2" width="296" height="216" rx="9"/></clipPath>';
    s += '<g clip-path="url(#' + clip + ')">' + body + '</g>';
    s += '<circle cx="24" cy="24" r="14" fill="' + INK + '"/>' + text(24, 29, n, { size: 15, bold: true, fill: '#fff' });
    return svg(300, 220, s, label + ', picture ' + n);
  };

  function park() {
    return '<rect width="300" height="220" fill="#e0f2fe"/><rect y="150" width="300" height="70" fill="#86efac"/>' +
      '<circle cx="250" cy="40" r="18" fill="#fde047"/>' +
      '<rect x="40" y="70" width="14" height="85" fill="#92400e"/><circle cx="47" cy="62" r="34" fill="#16a34a"/><circle cx="25" cy="80" r="20" fill="#22c55e"/><circle cx="70" cy="80" r="22" fill="#22c55e"/>';
  }
  function bench() {
    return '<rect x="150" y="128" width="110" height="8" rx="2" fill="#a16207"/><rect x="150" y="112" width="110" height="7" rx="2" fill="#a16207"/>' +
      '<rect x="156" y="136" width="6" height="26" fill="#57534e"/><rect x="248" y="136" width="6" height="26" fill="#57534e"/>';
  }
  function wallet(x, y) {
    return '<rect x="' + x + '" y="' + y + '" width="22" height="14" rx="2" fill="#7c2d12"/><rect x="' + (x + 12) + '" y="' + (y + 4) + '" width="10" height="6" rx="1" fill="#b45309"/>';
  }

  F.walletPanels = function () {
    var L = 'The lost wallet';
    var p1 = park() + bench() + wallet(220, 120) +
      F.person({ x: 120, y: 196, shirt: '#ffffff', legs: '#1e3a8a', armR: 'forward', face: 'surprised' }) +
      text(150, 70, '!', { size: 34, bold: true, fill: '#dc2626' });
    var p2 = '<rect width="300" height="220" fill="#fef3c7"/><rect y="180" width="300" height="40" fill="#d6d3d1"/>' +
      '<rect x="150" y="22" width="140" height="28" rx="4" fill="#1e3a8a"/>' + text(220, 41, 'POLICE POST', { size: 13, bold: true, fill: '#fff' }) +
      F.person({ x: 220, y: 150, shirt: '#1e40af', legs: '#1e3a8a', cap: '#172554', armR: 'forward', flip: true }) +
      '<rect x="160" y="128" width="130" height="60" fill="#78716c"/><rect x="155" y="122" width="140" height="10" fill="#a8a29e"/>' +
      F.person({ x: 110, y: 200, shirt: '#ffffff', legs: '#1e3a8a', armR: 'forward' }) + wallet(138, 140);
    var p3 = '<rect width="300" height="220" fill="#fef3c7"/><rect y="180" width="300" height="40" fill="#d6d3d1"/>' +
      F.person({ x: 95, y: 200, shirt: '#ffffff', legs: '#1e3a8a', armR: 'forward' }) +
      F.person({ x: 185, y: 200, s: 1.15, shirt: '#16a34a', legs: '#374151', armL: 'forward', glasses: true, flip: true }) +
      wallet(214, 140) +
      F.bubble(150, 30, 140, 'Thank you so much!', 196) +
      '<path d="M140 70 c-4 -8 -14 -4 -10 4 l10 10 l10 -10 c4 -8 -6 -12 -10 -4z" fill="#f43f5e"/>';
    return [F.panel(1, p1, L), F.panel(2, p2, L), F.panel(3, p3, L)];
  };

  function market() {
    var s = '<rect width="300" height="220" fill="#fff7ed"/><rect y="175" width="300" height="45" fill="#d4d4d8"/>';
    for (var i = 0; i < 6; i++) s += '<rect x="' + (170 + i * 20) + '" y="30" width="20" height="24" fill="' + (i % 2 ? '#fff' : '#ef4444') + '"/>';
    s += '<rect x="174" y="54" width="6" height="121" fill="#78716c"/><rect x="280" y="54" width="6" height="121" fill="#78716c"/>';
    s += '<rect x="170" y="118" width="120" height="40" fill="#a16207"/>';
    for (var j = 0; j < 5; j++) s += '<circle cx="' + (186 + j * 20) + '" cy="112" r="8" fill="#fb923c" stroke="#c2410c"/>';
    return s;
  }
  function orange(x, y) { return '<circle cx="' + x + '" cy="' + y + '" r="7" fill="#fb923c" stroke="#c2410c"/>'; }

  F.oranges = function () {
    var L = 'Helping at the market';
    var granny = { skin: '#eac39a', shirt: '#a855f7', legs: '#6b21a8', hair: '#d4d4d8', hairStyle: 'bun', skirt: true, glasses: true };
    function g(extra) { var o = {}; for (var k in granny) o[k] = granny[k]; for (var e in extra) o[e] = extra[e]; return F.person(o); }
    var girl = { shirt: '#ffffff', legs: '#0e7490', hairStyle: 'long', skirt: true };
    function k(extra) { var o = {}; for (var a in girl) o[a] = girl[a]; for (var e in extra) o[e] = extra[e]; return F.person(o); }
    var p1 = market() + g({ x: 110, y: 190, face: 'surprised', armL: 'out', armR: 'out' }) +
      '<path d="M60 150 l18 0 l-3 26 l-12 0z" fill="#facc15" stroke="#a16207"/>' +
      orange(70, 196) + orange(92, 204) + orange(140, 200) + orange(158, 192) + orange(40, 200) +
      text(200, 22, 'Oh no!', { size: 15, bold: true, fill: '#dc2626' });
    var p2 = market() + g({ x: 70, y: 190, armR: 'forward' }) +
      '<path d="M98 140 l20 0 l-3 26 l-14 0z" fill="#facc15" stroke="#a16207"/>' +
      k({ x: 150, y: 196, s: 0.9, armL: 'hold', armR: 'down', flip: true }) +
      orange(120, 155) + orange(190, 200) + orange(212, 196);
    var p3 = market() + g({ x: 95, y: 190, armR: 'forward' }) +
      '<path d="M120 146 l20 0 l-3 26 l-14 0z" fill="#facc15" stroke="#a16207"/>' + orange(126, 142) + orange(134, 140) +
      k({ x: 175, y: 196, s: 0.9, flip: true }) +
      F.bubble(16, 26, 128, 'Thank you, dear!', 90);
    return [F.panel(1, p1, L), F.panel(2, p2, L), F.panel(3, p3, L)];
  };

  function room() {
    return '<rect width="300" height="220" fill="#fef9c3"/><rect y="168" width="300" height="52" fill="#e7d3b0"/>' +
      '<rect x="30" y="40" width="70" height="50" fill="#bae6fd" stroke="#92400e" stroke-width="4"/>' + line(65, 40, 65, 90, '#92400e', 3);
  }
  function table() {
    return '<rect x="190" y="120" width="90" height="8" fill="#92400e"/><rect x="196" y="128" width="6" height="44" fill="#78350f"/><rect x="268" y="128" width="6" height="44" fill="#78350f"/>';
  }
  function ball(x, y) {
    return '<circle cx="' + x + '" cy="' + y + '" r="10" fill="#fff" stroke="#111" stroke-width="1.5"/><path d="M' + (x - 4) + ' ' + (y - 3) + ' l4 -3 l4 3 l-1.5 5 l-5 0z" fill="#111"/>';
  }
  var boy = { shirt: '#f59e0b', legs: '#1e3a8a' };
  var mum = { shirt: '#ec4899', legs: '#831843', hairStyle: 'long', skirt: true, s: 1.15 };
  function who(base, extra) { var o = {}, k; for (k in base) o[k] = base[k]; for (k in extra) o[k] = extra[k]; return F.person(o); }

  F.vasePanels = function () {
    var L = 'The broken vase';
    var vase = '<path d="M228 120 q-12 -10 -6 -28 l-4 -8 l20 0 l-4 8 q6 18 -6 28z" fill="#3b82f6" stroke="#1e3a8a"/>' +
      '<circle cx="224" cy="78" r="5" fill="#f43f5e"/><circle cx="234" cy="76" r="5" fill="#facc15"/>';
    var p1 = room() + table() + vase + who(boy, { x: 90, y: 196, armL: 'out', armR: 'up' }) + ball(150, 150) +
      '<path d="M120 190 q14 -20 22 -34" fill="none" stroke="#64748b" stroke-dasharray="4 4"/>';
    var p2 = room() + table() + ball(250, 160) +
      '<path d="M200 186 l12 -8 l6 10z M226 190 l10 -12 l8 12z M248 184 l8 -6 l4 9z" fill="#3b82f6" stroke="#1e3a8a"/>' +
      '<circle cx="214" cy="194" r="5" fill="#f43f5e"/><circle cx="240" cy="196" r="5" fill="#facc15"/>' +
      who(boy, { x: 100, y: 196, armL: 'up', armR: 'up', face: 'surprised' }) +
      text(200, 60, 'CRASH!', { size: 24, bold: true, fill: '#dc2626' });
    var p3 = room() + who(boy, { x: 110, y: 196, face: 'sad' }) + who(mum, { x: 190, y: 196, armL: 'forward', flip: true }) +
      F.bubble(30, 30, 140, "I'm sorry, Mum.", 104);
    return [F.panel(1, p1, L), F.panel(2, p2, L), F.panel(3, p3, L)];
  };

  function kite(x, y, s) {
    s = s || 1;
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><path d="M0 -18 L14 0 L0 22 L-14 0z" fill="#ef4444" stroke="#7f1d1d"/>' +
      line(0, -18, 0, 22, '#7f1d1d', 1) + line(-14, 0, 14, 0, '#7f1d1d', 1) +
      '<path d="M0 22 q8 10 -2 18 q-8 8 2 16" fill="none" stroke="#7f1d1d" stroke-width="1.5"/></g>';
  }
  function bigTree() {
    return '<rect x="200" y="80" width="18" height="100" fill="#92400e"/><circle cx="209" cy="66" r="44" fill="#16a34a"/>' +
      '<circle cx="178" cy="88" r="26" fill="#22c55e"/><circle cx="242" cy="88" r="28" fill="#22c55e"/>';
  }
  var girl = { shirt: '#fda4af', legs: '#be123c', hairStyle: 'long', skirt: true, s: 0.9 };
  var kid = { shirt: '#60a5fa', legs: '#1e3a8a', s: 0.95 };

  F.kitePanels = function () {
    var L = '放风筝';
    var sky = '<rect width="300" height="220" fill="#e0f2fe"/><rect y="170" width="300" height="50" fill="#86efac"/>';
    var p1 = sky + bigTree() + kite(220, 50) + who(girl, { x: 90, y: 196, face: 'sad', tears: true, armR: 'up' }) +
      line(108, 108, 214, 74, '#475569', 1);
    var p2 = sky + bigTree() + kite(220, 50) + who(girl, { x: 70, y: 196, face: 'sad', tears: true }) +
      who(kid, { x: 130, y: 196, armL: 'forward', flip: true }) + F.bubble(80, 26, 120, '别哭，我来帮你！', 130);
    var p3 = sky + bigTree() + kite(220, 50) +
      who({ shirt: '#15803d', legs: '#14532d', cap: '#166534' }, { x: 150, y: 196, armR: 'up' }) +
      line(166, 102, 216, 40, '#a16207', 4) +
      who(kid, { x: 80, y: 196, armR: 'up' }) + who(girl, { x: 40, y: 196 });
    var p4 = sky + bigTree() + who(girl, { x: 100, y: 196, armR: 'up' }) + kite(130, 70, 0.8) + line(124, 106, 128, 86, '#475569', 1) +
      who(kid, { x: 160, y: 196, flip: true }) + F.bubble(30, 22, 100, '谢谢你！', 96);
    return [F.panel(1, p1, L), F.panel(2, p2, L), F.panel(3, p3, L), F.panel(4, p4, L)];
  };
})(window.P3);
