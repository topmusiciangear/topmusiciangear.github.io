// Cirugía principal de best-monitors-for-small-rooms en data/guides.json
// 1) Rewrites: conclusion/verdict (EN/ES), description, featuredSnippet (ganador: Neumann KH 80 DSP / valor: iLoud Micro Pro)
// 2) Nombres rotos: " LP-6 V2" → "Kali Audio LP-6 V2", " LP-UNF" → "Kali Audio LP-UNF"
// 3) Fixes de texto: heading JBL roto, marca Adam→ADAM, typos y placeholders en secciones
// 4) Reordenar sections / verdictProsCons / productTable al orden de featuredProducts (por score)
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
let raw = fs.readFileSync(B + 'data/guides.json', 'utf8');
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

// ── límites del bloque de la guía ──────────────────────────────────────────
const a1 = raw.indexOf('"id": "best-monitors-for-small-rooms"');
const a2 = raw.indexOf('"id": "best-multi-effects-pedals"');
if (a1 === -1 || a2 === -1 || a2 < a1) throw new Error('límites de la guía no encontrados');
const blockStart = raw.lastIndexOf('\n', a1) + 1;
const blockEnd = raw.lastIndexOf('\n', a2) + 1;
let block = raw.slice(blockStart, blockEnd);

// ── extractArray: elementos con posiciones exactas (soporta duplicados) ──
function extractArray(blk, anchor) {
  const idx = blk.indexOf(anchor);
  if (idx === -1) throw new Error('array no encontrado: ' + anchor);
  if (blk.indexOf(anchor, idx + 1) !== -1) throw new Error('array duplicado: ' + anchor);
  const arrStart = idx + anchor.length;
  let i = arrStart, depth = 1, inStr = false, esc = false;
  for (; i < blk.length; i++) {
    const ch = blk[i];
    if (inStr) { if (esc) esc = false; else if (ch === '\\') esc = true; else if (ch === '"') inStr = false; }
    else if (ch === '"') inStr = true;
    else if (ch === '[') depth++;
    else if (ch === ']') { depth--; if (depth === 0) break; }
  }
  const inner = blk.slice(arrStart, i);
  const elems = [];
  let d = 0, s = false, e2 = false, start = -1;
  for (let j = 0; j < inner.length; j++) {
    const ch = inner[j];
    if (s) { if (e2) e2 = false; else if (ch === '\\') e2 = true; else if (ch === '"') s = false; }
    else if (ch === '"') s = true;
    else if (ch === '{') { if (d === 0) start = j; d++; }
    else if (ch === '}') { d--; if (d === 0 && start !== -1) { elems.push({ text: inner.slice(start, j + 1), start, end: j + 1 }); start = -1; } }
  }
  return { arrStart, arrEnd: i, inner, elems };
}
function reorderArray(blk, anchor, orderedElems) {
  const { arrStart, arrEnd, inner, elems } = extractArray(blk, anchor);
  if (elems.length === 0) throw new Error('reorderArray: extractArray devolvió 0 elementos para ' + anchor);
  if (orderedElems.length !== elems.length) throw new Error('recuento distinto en ' + anchor + ': ' + elems.length + ' vs ' + orderedElems.length);
  const used = new Array(elems.length).fill(false);
  const orderedTexts = [];
  for (const e of orderedElems) {
    let found = -1;
    for (let k = 0; k < elems.length; k++) {
      if (!used[k] && elems[k].text === e) { found = k; break; }
    }
    if (found === -1) throw new Error('elemento no encontrado en array para reordenar: ' + anchor + ' → ' + e.slice(0, 50));
    used[found] = true;
    orderedTexts.push(elems[found]);
  }
  const gaps = [];
  for (let k = 0; k < elems.length - 1; k++) {
    gaps.push(inner.slice(elems[k].end, elems[k + 1].start));
  }
  const prefix = inner.slice(0, elems[0].start);
  const suffix = inner.slice(elems[elems.length - 1].end);
  const newInner = prefix + orderedTexts.map((e, k) => e.text + (k < orderedTexts.length - 1 ? gaps[k] : '')).join('') + suffix;
  return blk.slice(0, arrStart) + newInner + blk.slice(arrEnd);
}
function resolveProductId(name) {
  const n = (name || '').trim();
  const hits = products.filter(p => p.title === n || p.title_es === n);
  if (hits.length === 0) {
    const norm = s => (s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const nn = norm(n);
    const h2 = products.filter(p => norm(p.title) === nn || norm(p.title_es || '') === nn);
    if (h2.length === 0) {
      const h3 = products.filter(p => norm(p.title).includes(nn) || norm(p.title_es || '').includes(nn));
      if (h3.length === 0) throw new Error('no se resuelve producto: ' + n);
      return h3[0].id;
    }
    return h2[0].id;
  }
  if (hits.length > 1) throw new Error('producto ambiguo: ' + n);
  return hits[0].id;
}

// ── 1) rewrites de líneas (anclas exactas, una sola ocurrencia) ────────────
function replaceLine(blk, anchor, newValue, label) {
  const idx = blk.indexOf(anchor);
  if (idx === -1) throw new Error('anchor NO encontrado [' + label + ']: ' + anchor.slice(0, 50));
  if (blk.indexOf(anchor, idx + 1) !== -1) throw new Error('anchor duplicado [' + label + ']');
  const ls = blk.lastIndexOf('\n', idx) + 1;
  let le = blk.indexOf('\n', idx); if (le === -1) le = blk.length;
  const line = blk.slice(ls, le);
  const crlf = line.endsWith('\r');
  const content = crlf ? line.slice(0, -1) : line;
  const indent = content.match(/^\s*/)[0];
  const field = content.trim().split(':')[0];
  if (!content.trim().endsWith(',')) throw new Error('línea sin coma final [' + label + ']');
  return blk.slice(0, ls) + indent + field + ': ' + JSON.stringify(newValue) + ',' + (crlf ? '\r' : '') + blk.slice(le);
}

const verdictEN = '<p><strong>The peak of this selection is <span class="product-name">Neumann KH 80 DSP</span>.</strong> A 4-inch nearfield with the MMD waveguide from Neumann\'s 800-series monitors and DSP that auto-corrects the response to your room with the MA 1 mic — the most accurate monitor here for a small desk.</p>' +
  '<p><strong>Best value for untreated rooms: <span class="product-name">IK Multimedia iLoud Micro Monitor Pro</span>.</strong> ARC 4 room correction tunes the pair to your space from your phone, in the smallest cabinet of the guide.</p>' +
  '<p><strong><span class="product-name">Kali Audio LP-6 V2</span></strong> — The best 6.5-inch value here, with Boundary EQ switches that let it sit close to the wall without false bass.</p>' +
  '<p><strong><span class="product-name">Genelec 8010A</span></strong> — Proof that reference monitoring doesn\'t need a big box: a 3-inch monitor built in Finland with Genelec\'s die-cast aluminium enclosure.</p>' +
  '<p><strong><span class="product-name">IK Multimedia iLoud MTM MKII</span></strong> — A compact D\'Appolito reference monitor with dual 3.5-inch woofers and serious output for its size.</p>' +
  '<p><strong><span class="product-name">KRK Rokit 5 G5</span></strong> — Budget DSP room tuning with a 5-inch Kevlar woofer and a front-firing port.</p>' +
  '<p><strong><span class="product-name">Genelec 8030C</span></strong> — The professional reference for small studios: 104 dB SPL with ±2 dB accuracy in Genelec\'s MDE aluminium enclosure.</p>' +
  '<p><strong><span class="product-name">ADAM Audio D3V</span></strong> — A desktop system with ADAM\'s D-ART ribbon tweeter and dual passive radiators that fits next to a laptop.</p>' +
  '<p><strong><span class="product-name">Kali Audio LP-UNF</span></strong> — A compact nearfield built to sit close to walls and screens, with a 4.5-inch woofer and a front-ported cabinet.</p>' +
  '<p><strong><span class="product-name">PreSonus Eris Studio 5</span></strong> — A narrow vertical waveguide that keeps the desk out of the high end.</p>' +
  '<p><strong><span class="product-name">JBL 305P MkII</span></strong> — The legendary budget monitor with the Image Control Waveguide for a huge sweet spot.</p>' +
  '<p><strong><span class="product-name">ADAM Audio T5V</span></strong> — The cheapest way into ADAM\'s U-ART ribbon tweeter.</p>' +
  '<p><strong><span class="product-name">Yamaha HS5</span></strong> — The industry-standard 5-inch reference monitor with a brutally honest midrange.</p>';

const verdictES = '<p><strong>La cima de esta selección es <span class="product-name">Neumann KH 80 DSP</span>.</strong> Un nearfield de 4 pulgadas con la guía de ondas MMD de la serie 800 de Neumann y un DSP que corrige la respuesta de tu sala con el micrófono MA 1 — el monitor más preciso de la guía para un escritorio pequeño.</p>' +
  '<p><strong>Mejor relación calidad-precio para salas sin tratar: <span class="product-name">IK Multimedia iLoud Micro Monitor Pro</span>.</strong> La corrección de sala ARC 4 calibra el par desde tu teléfono, en la caja más pequeña de la guía.</p>' +
  '<p><strong><span class="product-name">Kali Audio LP-6 V2</span></strong> — El mejor monitor de 6,5 pulgadas en relación calidad-precio, con interruptores Boundary EQ para pegarlo a la pared sin falsos graves.</p>' +
  '<p><strong><span class="product-name">Genelec 8010A</span></strong> — La prueba de que la referencia no necesita una caja grande: un monitor de 3 pulgadas fabricado en Finlandia con la caja de aluminio fundido de Genelec.</p>' +
  '<p><strong><span class="product-name">IK Multimedia iLoud MTM MKII</span></strong> — Un monitor de referencia compacto en disposición D\'Appolito con dos woofers de 3,5 pulgadas y una salida seria para su tamaño.</p>' +
  '<p><strong><span class="product-name">KRK Rokit 5 G5</span></strong> — Ajuste de sala por DSP a precio ajustado, con woofer de Kevlar de 5 pulgadas y puerto frontal.</p>' +
  '<p><strong><span class="product-name">Genelec 8030C</span></strong> — La referencia profesional para estudios pequeños: 104 dB SPL con precisión de ±2 dB en la caja de aluminio MDE de Genelec.</p>' +
  '<p><strong><span class="product-name">ADAM Audio D3V</span></strong> — Un sistema de escritorio con el tweeter de cinta D-ART de ADAM y doble radiador pasivo que cabe junto al portátil.</p>' +
  '<p><strong><span class="product-name">Kali Audio LP-UNF</span></strong> — Un nearfield compacto diseñado para colocarse cerca de paredes y pantallas, con woofer de 4,5 pulgadas y puerto frontal.</p>' +
  '<p><strong><span class="product-name">PreSonus Eris Studio 5</span></strong> — Una guía de ondas de dispersión vertical estrecha que evita que el escritorio coloree la parte alta.</p>' +
  '<p><strong><span class="product-name">JBL 305P MkII</span></strong> — El legendario monitor económico con la guía de ondas Image Control para una zona de escucha enorme.</p>' +
  '<p><strong><span class="product-name">ADAM Audio T5V</span></strong> — La forma más barata de tener el tweeter de cinta U-ART de ADAM.</p>' +
  '<p><strong><span class="product-name">Yamaha HS5</span></strong> — El monitor de referencia de 5 pulgadas estándar de la industria, con un rango medio brutalmente honesto.</p>';

const fsTextEN = 'Mixing in a small untreated room is one of the biggest challenges for home studio producers. The wrong monitors will give you false information — making your bass sound full when it is actually thin, or making your mix sound balanced when it is actually a mess. After testing dozens of monitors in small rooms, the picks that really work are the Neumann KH 80 DSP and the iLoud Micro Monitor Pro, which tame room problems with MA 1 and ARC 4 auto-calibration, the Kali LP-6 V2 for 6.5-inch low end near a wall, and honest compact options like the Yamaha HS5, the ADAM D3V and the Kali LP-UNF.';
const fsTextES = 'Mezclar en una habitación pequeña sin tratar es uno de los mayores desafíos para productores de home studio. Los monitores incorrectos te darán información falsa. Después de probar docenas de monitores en habitaciones pequeñas, los que realmente funcionan son el Neumann KH 80 DSP y el iLoud Micro Monitor Pro, que doman los problemas de la sala con la calibración automática MA 1 y ARC 4, el Kali LP-6 V2 para graves de 6,5 pulgadas cerca de la pared, y opciones compactas honestas como el Yamaha HS5, el ADAM D3V y el Kali LP-UNF.';

block = replaceLine(block, '"conclusion": "<p>For me, the choice is clear:', '<p>For me, the choice is clear: <span class="product-name">Neumann KH 80 DSP</span>. The 4-inch nearfield uses the same MMD waveguide as Neumann\'s 800-series monitors and auto-calibrates itself to your room with the MA 1 mic — the most accurate and most adjustable way to mix honestly on a small desk.</p>', 'conclusion');
block = replaceLine(block, '"conclusion_es": "<p>Para mí, la elección está clara:', '<p>Para mí, la elección está clara: <span class="product-name">Neumann KH 80 DSP</span>. El nearfield de 4 pulgadas usa la misma guía de ondas MMD que los monitores de la serie 800 de Neumann y se calibra solo en tu sala con el micrófono MA 1 — la forma más precisa y ajustable de mezclar en un escritorio pequeño.</p>', 'conclusion_es');
block = replaceLine(block, '"verdict": "<p><strong>The peak of this selection is', verdictEN, 'verdict');
block = replaceLine(block, '"verdict_es": "<p><strong>La cima de esta selección es', verdictES, 'verdict_es');
block = replaceLine(block, '"description": "Genelec 8030C is my top pick.', 'Neumann KH 80 DSP is my top pick. Mixing in a small untreated room is one of the biggest challenges for home studio producers.', 'description');
block = replaceLine(block, '"description_es": "Mi elección: Genelec 8030C.', 'Mi elección: Neumann KH 80 DSP. Mezclar en una habitación pequeña sin tratar es uno de los mayores desafíos para los productores de home studio.', 'description_es');
block = replaceLine(block, '"title_en": "Best Studio Monitors for Small Rooms (2026 Picks)"', 'Best Studio Monitors for Small Rooms', 'fs.title_en');
block = replaceLine(block, '"text_en": "Mixing in a small untreated room is one of the biggest', fsTextEN, 'fs.text_en');
block = replaceLine(block, '"title_es": "Mejores monitores de estudio para salas Pequeñas', 'Mejores monitores de estudio para salas pequeñas', 'fs.title_es');
block = replaceLine(block, '"text_es": "Mezclar en una habitación pequeña sin tratar es uno', fsTextES, 'fs.text_es');
console.log('rewrites de líneas: OK');

// ── 2) nombres rotos ───────────────────────────────────────────────────────
['" LP-6 V2"', '" LP-UNF"'].forEach(name => {
  const fixed = name === '" LP-6 V2"' ? '"Kali Audio LP-6 V2"' : '"Kali Audio LP-UNF"';
  const c = block.split(name).length - 1;
  if (c !== 4) throw new Error('nombre roto ' + name + ' aparece ' + c + ' veces (esperaba 4)');
  block = block.split(name).join(fixed);
  console.log('nombres fijados:', name, '→', fixed, '(x' + c + ')');
});

// ── 3) fixes de texto ──────────────────────────────────────────────────────
function replaceOnce(blk, needle, replacement, label) {
  const c = blk.split(needle).length - 1;
  if (c !== 1) throw new Error('[' + label + '] aparece ' + c + ' veces (esperaba 1): ' + needle.slice(0, 60));
  return blk.replace(needle, replacement);
}
const fixes = [
  ['"heading": "JBL 305P MkII: Best Budget Monitor a Pair"', '"heading": "JBL 305P MkII: The Best Budget Pair"', 'heading JBL EN'],
  ['"heading_es": "JBL 305P MkII: el mejor monitor económico por el par"', '"heading_es": "JBL 305P MkII: el mejor par económico"', 'heading JBL ES'],
  ['"Adam Audio T5V: el monitor de tweeter de cinta más asequible"', '"ADAM Audio T5V: el monitor de tweeter de cinta más asequible"', 'heading T5V ES marca'],
  ['is the top pick of this guide for small rooms and apartments', 'is the best budget pick of this guide for small rooms and apartments', 'sec2 EN top pick'],
  ['make it the most accurate monitor per pair, and the best value in studio monitoring', 'make it the most capable budget pair in this guide', 'sec2 EN best value'],
  ['This critical in small rooms', 'This is critical in small rooms', 'sec2 EN This critical'],
  ['Pair with a subwoofer ( ) if you need', 'Pair with a subwoofer if you need', 'sec2 EN subwoofer ( )'],
  ['the 305P MkII is hard to beat the price', 'the 305P MkII is hard to beat at the price', 'sec2 EN hard to beat'],
  ['son nuestra principal recomendación de esta guía', 'son la mejor opción económica de esta guía', 'sec2 ES recomendación'],
  ['los monitores más precisos de su precio, con la mejor relación calidad-precio de los monitores de estudio', 'el par económico más capaz de esta guía', 'sec2 ES calidad-precio'],
  ['Combínalos con un subwoofer ( ) si necesitas', 'Combínalos con un subwoofer si necesitas', 'sec2 ES subwoofer ( )'],
  ['</strong>con sus 5 pulgadas, el woofer es pequeño', '</strong>Con sus 5 pulgadas, el woofer es pequeño', 'sec2 ES mayúscula'],
  ['before consider a subwoofer', 'before considering a subwoofer', 'sec3 EN before consider'],
  ['excites more room modes tha 5-inch', 'excites more room modes than a 5-inch', 'sec3 EN tha 5-inch']
];
fixes.forEach(([needle, rep, label]) => { block = replaceOnce(block, needle, rep, label); });
console.log('fixes de texto: OK (' + fixes.length + ')');

// ── 4) reordenar al orden de featuredProducts (por score) ──────────────────
const T = [305, 302, 117, 303, 308, 633, 372, 306, 307, 684, 116, 371, 632];

// 4a. sections: [info0] + 13 producto en orden T + [infoLast]
let columnsById;
{
  const { elems } = extractArray(block, '"sections": [');
  const parsed = elems.map(e => JSON.parse(e.text));
  if (parsed.length !== 15) throw new Error('secciones: ' + parsed.length + ' (esperaba 15)');
  const byId = {};
  parsed.slice(1, 14).forEach((s, k) => {
    const id = (s.products || [])[0];
    if (byId[id]) throw new Error('sección de producto duplicada: ' + id);
    byId[id] = elems[k + 1].text;
  });
  const missing = T.filter(id => !byId[id]);
  if (missing.length) throw new Error('secciones sin producto del target: ' + missing.join(','));
  block = reorderArray(block, '"sections": [', [elems[0].text].concat(T.map(id => byId[id])).concat([elems[14].text]));
  console.log('secciones reordenadas:', T.map(id => JSON.parse(byId[id]).products[0]).join(','));
}
// 4b. verdictProsCons en orden T
{
  const { elems } = extractArray(block, '"verdictProsCons": [');
  const ids = elems.map(e => resolveProductId(JSON.parse(e.text).name));
  const byId = {};
  ids.forEach((id, i) => { if (byId[id]) throw new Error('VPC duplicado: ' + id); byId[id] = elems[i].text; });
  const missing = T.filter(id => !byId[id]);
  if (missing.length) throw new Error('VPC sin producto del target: ' + missing.join(','));
  block = reorderArray(block, '"verdictProsCons": [', T.map(id => byId[id]));
  console.log('verdictProsCons reordenado:', T.join(','));
}
// 4c. productTable: columnas + valores de filas en orden T
{
  const { elems } = extractArray(block, '"columns": [');
  const ids = elems.map(e => resolveProductId(JSON.parse(e.text).title));
  const byId = {};
  ids.forEach((id, i) => { if (byId[id]) throw new Error('columna duplicada: ' + id); byId[id] = elems[i].text; });
  const missing = T.filter(id => !byId[id]);
  if (missing.length) throw new Error('columnas sin producto del target: ' + missing.join(','));
  block = reorderArray(block, '"columns": [', T.map(id => byId[id]));
  columnsById = byId;
  const perm = T.map(id => ids.indexOf(id));
  // valores de cada fila de productTable (9 filas): reordenar cada array "values" según perm
  const vAnchor = '"values": [';
  let vPos = 0, nRows = 0;
  for (;;) {
    const vi = block.indexOf(vAnchor, vPos);
    if (vi === -1) break;
    const arrStart = vi + vAnchor.length;
    let i = arrStart, depth = 1, inStr = false, esc = false;
    for (; i < block.length; i++) {
      const ch = block[i];
      if (inStr) { if (esc) esc = false; else if (ch === '\\') esc = true; else if (ch === '"') inStr = false; }
      else if (ch === '"') inStr = true;
      else if (ch === '[') depth++;
      else if (ch === ']') { depth--; if (depth === 0) break; }
    }
    const inner = block.slice(arrStart, i);
    const velems = [];
    let d = 0, s = false, e2 = false, start = -1;
    for (let j = 0; j < inner.length; j++) {
      const ch = inner[j];
      if (s) { if (e2) e2 = false; else if (ch === '\\') e2 = true; else if (ch === '"') s = false; }
      else if (ch === '"') s = true;
      else if (ch === '{') { if (d === 0) start = j; d++; }
      else if (ch === '}') { d--; if (d === 0 && start !== -1) { velems.push({ text: inner.slice(start, j + 1), start, end: j + 1 }); start = -1; } }
    }
    if (velems.length !== 13) throw new Error('fila con ' + velems.length + ' valores (esperaba 13) en posición ' + vi);
    const used = new Array(velems.length).fill(false);
    const ordered = [];
    for (const oldIdx of perm) {
      if (used[oldIdx]) throw new Error('perm duplicado');
      used[oldIdx] = true;
      ordered.push(velems[oldIdx].text);
    }
    const gaps = [];
    for (let k = 0; k < velems.length - 1; k++) gaps.push(inner.slice(velems[k].end, velems[k + 1].start));
    const prefix = inner.slice(0, velems[0].start);
    const suffix = inner.slice(velems[velems.length - 1].end);
    const newInner = prefix + ordered.map((t, k) => t + (k < ordered.length - 1 ? gaps[k] : '')).join('') + suffix;
    block = block.slice(0, arrStart) + newInner + block.slice(i);
    vPos = arrStart + newInner.length;
    nRows++;
  }
  if (nRows !== 9) throw new Error('filas de valores reordenadas: ' + nRows + ' (esperaba 9)');
  console.log('valores de filas reordenados:', nRows, 'filas');
}

// ── 5) validar y escribir ──────────────────────────────────────────────────
raw = raw.slice(0, blockStart) + block + raw.slice(blockEnd);
const parsed = JSON.parse(raw);
fs.writeFileSync(B + 'data/guides.json', raw);

const gu = parsed.find(x => x.id === 'best-monitors-for-small-rooms');
const sectionProdIds = gu.sections.map(s => (s.products || [])[0]).filter((id, i, arr) => i === 0 || i === arr.length - 1 ? false : id !== undefined);
console.log('VERIFICACIÓN sección order:', sectionProdIds.join(','));
console.log('VERIFICACIÓN columns:', gu.productTable.columns.map(c => c.title).join(' | '));
console.log('VERIFICACIÓN vpc:', gu.verdictProsCons.map(v => v.name).join(' | '));
const wooferRow = gu.productTable.rows.find(r => r.label === 'Woofer');
console.log('VERIFICACIÓN fila Woofer[0..3]:', wooferRow.values.slice(0, 4).map(v => v.value).join(' | '));
console.log('VERIFICACIÓN description:', gu.description.slice(0, 70));
console.log('VERIFICACIÓN conclusion:', gu.conclusion.slice(0, 80));
if (sectionProdIds.join(',') !== T.join(',')) throw new Error('orden de secciones incorrecto');
if (gu.productTable.columns.map(c => resolveProductId(c.title)).join(',') !== T.join(',')) throw new Error('orden de columnas incorrecto');
if (gu.verdictProsCons.map(v => resolveProductId(v.name)).join(',') !== T.join(',')) throw new Error('orden de VPC incorrecto');
console.log('TODO OK: guides.json actualizado y verificado');
