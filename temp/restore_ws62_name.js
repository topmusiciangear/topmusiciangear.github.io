// Restaura el nombre "Kali Audio WS-6.2" borrado por el replace global del commit 2891c57eff
// en la guia studio-subwoofers (las otras guías lo perdieron intencionalmente).
// Usa los strings EXACTOS del commit padre 5f7dd3bff4 (ver temp/ws62_original.txt).
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
let raw = fs.readFileSync(B + 'data/guides.json', 'utf8');

const a1 = raw.indexOf('"id": "studio-subwoofers"');
const a2 = raw.indexOf('"id": "studio-subwoofers-setup"');
if (a1 === -1 || a2 === -1 || a2 < a1) throw new Error('limites de la guia no encontrados');
const blockStart = raw.lastIndexOf('\n', a1) + 1;
const blockEnd = raw.lastIndexOf('\n', a2) + 1;
let block = raw.slice(blockStart, blockEnd);
const origLen = block.length;

// ── extractArray (probado) ─────────────────────────────────────────────────
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
function replaceOnce(blk, needle, rep, label) {
  const c = blk.split(needle).length - 1;
  if (c !== 1) throw new Error('[' + label + '] aparece ' + c + ' veces (esperaba 1)');
  return blk.replace(needle, rep);
}

// ── 1) reemplazos de texto (10 campos) ─────────────────────────────────────
block = replaceOnce(block, '" : Best for Canceling Cabinet Vibrations"', '"Kali Audio WS-6.2: Best for Canceling Cabinet Vibrations"', 'heading');
block = replaceOnce(block, '" : mejor para cancelar vibraciones de la caja"', '"Kali Audio WS-6.2: mejor para cancelar vibraciones de la caja"', 'heading_es');
block = replaceOnce(block, '<p><strong>The is the compact sub', '<p><strong>The Kali Audio WS-6.2 is the compact sub', 'content');
block = replaceOnce(block, '<p><strong>El es el sub compacto', '<p><strong>El Kali Audio WS-6.2 es el sub compacto', 'content_es');
block = replaceOnce(block, '<span class=\\"product-name\\"> </span></strong> — A compact studio subweofer', '<span class=\\"product-name\\">Kali Audio WS-6.2</span></strong> — A compact studio subweofer', 'verdict');
block = replaceOnce(block, '<span class=\\"product-name\\"> </span></strong> — Un subweofer de estudio compacto', '<span class=\\"product-name\\">Kali Audio WS-6.2</span></strong> — Un subweofer de estudio compacto', 'verdict_es');
block = replaceOnce(block, 'The is the budget pick with the most output per dollar', 'The Kali Audio WS-6.2 is the budget pick with the most output per dollar', 'text_en');
block = replaceOnce(block, 'El es la opción económica con la mayor salida por tu dinero', 'El Kali Audio WS-6.2 es la opción económica con la mayor salida por tu dinero', 'text_es');
block = replaceOnce(block, 'The It is the best budget studio subweofer', 'The Kali Audio WS-6.2 It is the best budget studio subweofer', 'faq_a5_en');
block = replaceOnce(block, 'El es el mejor subweofer de estudio económico', 'El Kali Audio WS-6.2 es el mejor subweofer de estudio económico', 'faq_a5_es');
console.log('reemplazos de texto: OK (10)');

// ── 2) columns[3].title / title_es ─────────────────────────────────────────
{
  const { arrStart, elems } = extractArray(block, '"columns": [');
  if (elems.length !== 5) throw new Error('columns: ' + elems.length + ' (esperaba 5)');
  const col = elems[3].text;
  if (!/"title": " "/.test(col) || !/"title_es": " "/.test(col)) throw new Error('columns[3] no tiene titulos vacios: ' + col);
  const fixed = col.replace('"title": " "', '"title": "Kali Audio WS-6.2"').replace('"title_es": " "', '"title_es": "Kali Audio WS-6.2"');
  block = block.slice(0, arrStart) + inner_replace(block.slice(arrStart), col, fixed);
  console.log('columns[3] restaurado');
}
// ── 3) verdictProsCons[3].name / name_es ───────────────────────────────────
{
  const { elems } = extractArray(block, '"verdictProsCons": [');
  if (elems.length !== 5) throw new Error('vpc: ' + elems.length + ' (esperaba 5)');
  const v = elems[3].text;
  if (!/"name": " "/.test(v) || !/"name_es": " "/.test(v)) throw new Error('vpc[3] no tiene nombres vacios: ' + v.slice(0, 120));
  const fixed = v.replace('"name": " "', '"name": "Kali Audio WS-6.2"').replace('"name_es": " "', '"name_es": "Kali Audio WS-6.2"');
  const idx = block.indexOf(v);
  if (idx === -1) throw new Error('elemento vpc[3] no encontrado en block');
  block = block.slice(0, idx) + fixed + block.slice(idx + v.length);
  console.log('verdictProsCons[3] restaurado');
}
function inner_replace(innerFull, oldEl, newEl) {
  const i = innerFull.indexOf(oldEl);
  if (i === -1) throw new Error('elemento columns[3] no encontrado');
  return newEl + innerFull.slice(i + oldEl.length);
}

// ── 4) validar y escribir ──────────────────────────────────────────────────
raw = raw.slice(0, blockStart) + block + raw.slice(blockEnd);
const parsed = JSON.parse(raw);
const sub = parsed.find(x => x.id === 'studio-subwoofers');
fs.writeFileSync(B + 'data/guides.json', raw);

// verificacion
const checks = [
  ['heading', sub.sections[4].heading],
  ['heading_es', sub.sections[4].heading_es],
  ['vpc name', sub.verdictProsCons[3].name],
  ['vpc name_es', sub.verdictProsCons[3].name_es],
  ['columns title', sub.productTable.columns[3].title],
  ['columns title_es', sub.productTable.columns[3].title_es]
];
let ok = true;
checks.forEach(([k, v]) => { const good = v === 'Kali Audio WS-6.2'; if (!good) ok = false; console.log((good ? 'OK  ' : 'FAIL') + ' ' + k + ': ' + JSON.stringify(v)); });
[['content', sub.sections[4].content], ['content_es', sub.sections[4].content_es], ['verdict', sub.verdict], ['verdict_es', sub.verdict_es], ['text_en', sub.featuredSnippet.text_en], ['text_es', sub.featuredSnippet.text_es], ['faq_a5_en', sub.featuredSnippet.faq_a5_en], ['faq_a5_es', sub.featuredSnippet.faq_a5_es]].forEach(([k, v]) => {
  const good = v.includes('Kali Audio WS-6.2'); if (!good) ok = false; console.log((good ? 'OK  ' : 'FAIL') + ' ' + k + ' contiene el nombre');
});
if (!ok) throw new Error('verificacion fallo');
console.log('TODO OK: nombre Kali Audio WS-6.2 restaurado en studio-subwoofers');
