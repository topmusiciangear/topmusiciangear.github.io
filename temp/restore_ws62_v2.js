// restore_ws62_v2.js — Restaura el nombre "Kali Audio WS-6.2" en studio-subwoofers (data/guides.json)
// v1 fallaba por typo "subweofer" en 4 needles (verdict, verdict_es, faq_a5_en, faq_a5_es)
// y tenia un bug de prefijo en inner_replace que habria borrado las columnas 0-2 de la tabla.
// v2: reemplazos directos con validacion de cuenta exacta (falla seguro ANTES de escribir).
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
let raw = fs.readFileSync(B + 'data/guides.json', 'utf8');

// ── localizar el bloque de la guia ──
const a1 = raw.indexOf('"id": "studio-subwoofers"');
const a2 = raw.indexOf('"id": "studio-subwoofers-setup"');
if (a1 === -1 || a2 === -1 || a2 < a1) throw new Error('limites de la guia no encontrados');
const blockStart = raw.lastIndexOf('\n', a1) + 1;
const blockEnd = raw.lastIndexOf('\n', a2) + 1;
let block = raw.slice(blockStart, blockEnd);

function replaceOnce(blk, needle, rep, label) {
  const c = blk.split(needle).length - 1;
  if (c !== 1) throw new Error('[' + label + '] aparece ' + c + ' veces (esperaba 1)');
  return blk.replace(needle, rep);
}

// ── 1) textos (11 reemplazos) ──
block = replaceOnce(block,
  '" : Best for Canceling Cabinet Vibrations"',
  '"Kali Audio WS-6.2: Best for Canceling Cabinet Vibrations"', 'heading');
block = replaceOnce(block,
  '" : mejor para cancelar vibraciones de la caja"',
  '"Kali Audio WS-6.2: mejor para cancelar vibraciones de la caja"', 'heading_es');
block = replaceOnce(block,
  '<p><strong>The is the compact sub',
  '<p><strong>The Kali Audio WS-6.2 is the compact sub', 'content');
block = replaceOnce(block,
  '<p><strong>El es el sub compacto',
  '<p><strong>El Kali Audio WS-6.2 es el sub compacto', 'content_es');
block = replaceOnce(block,
  '<span class=\\"product-name\\"> </span></strong> — A compact studio subwoofer',
  '<span class=\\"product-name\\">Kali Audio WS-6.2</span></strong> — A compact studio subwoofer', 'verdict');
block = replaceOnce(block,
  '<span class=\\"product-name\\"> </span></strong> — Un subwoofer de estudio compacto',
  '<span class=\\"product-name\\">Kali Audio WS-6.2</span></strong> — Un subwoofer de estudio compacto', 'verdict_es');
block = replaceOnce(block,
  'The is the budget pick with the most output per dollar',
  'The Kali Audio WS-6.2 is the budget pick with the most output per dollar', 'text_en');
block = replaceOnce(block,
  'El es la opción económica con la mayor salida por tu dinero',
  'El Kali Audio WS-6.2 es la opción económica con la mayor salida por tu dinero', 'text_es');
block = replaceOnce(block,
  'The It is the best budget studio subwoofer',
  'The Kali Audio WS-6.2 is the best budget studio subwoofer', 'faq_a5_en');
block = replaceOnce(block,
  'the Adam T10S It is the more compact choice',
  'the Adam T10S is the more compact choice', 'faq_a5_en_t10s');
block = replaceOnce(block,
  'El es el mejor subwoofer de estudio económico',
  'El Kali Audio WS-6.2 es el mejor subwoofer de estudio económico', 'faq_a5_es');

// ── 2) campos estructurales (columna de tabla + veredicto pros/cons) ──
block = replaceOnce(block, '"title": " "', '"title": "Kali Audio WS-6.2"', 'columns[3].title');
block = replaceOnce(block, '"title_es": " "', '"title_es": "Kali Audio WS-6.2"', 'columns[3].title_es');
block = replaceOnce(block, '"name": " "', '"name": "Kali Audio WS-6.2"', 'vpc[3].name');
block = replaceOnce(block, '"name_es": " "', '"name_es": "Kali Audio WS-6.2"', 'vpc[3].name_es');

// ── 3) sanity: no quedan patrones dañados en el bloque ──
if (/<span class=\\"product-name\\"> <\/span>/.test(block)) throw new Error('queda un span vacio');
if (/\bThe is\b/.test(block)) throw new Error('queda "The is" dañado');
if (/El es el (sub|mejor|opci)/.test(block)) throw new Error('queda "El es ..." dañado');

// ── 4) validar JSON, escribir y verificar ──
raw = raw.slice(0, blockStart) + block + raw.slice(blockEnd);
const parsed = JSON.parse(raw); // valida TODO el archivo antes de escribir
const sub = parsed.find(x => x.id === 'studio-subwoofers');
fs.writeFileSync(B + 'data/guides.json', raw);

const checks = [
  ['sections[4].heading', sub.sections[4].heading],
  ['sections[4].heading_es', sub.sections[4].heading_es],
  ['productTable.columns[3].title', sub.productTable.columns[3].title],
  ['productTable.columns[3].title_es', sub.productTable.columns[3].title_es],
  ['verdictProsCons[3].name', sub.verdictProsCons[3].name],
  ['verdictProsCons[3].name_es', sub.verdictProsCons[3].name_es]
];
let ok = true;
checks.forEach(([k, v]) => {
  const good = v === 'Kali Audio WS-6.2';
  if (!good) ok = false;
  console.log((good ? 'OK   ' : 'FAIL ') + k + ': ' + JSON.stringify(v));
});
[['sections[4].content', sub.sections[4].content],
 ['sections[4].content_es', sub.sections[4].content_es],
 ['verdict', sub.verdict],
 ['verdict_es', sub.verdict_es],
 ['featuredSnippet.text_en', sub.featuredSnippet.text_en],
 ['featuredSnippet.text_es', sub.featuredSnippet.text_es],
 ['featuredSnippet.faq_a5_en', sub.featuredSnippet.faq_a5_en],
 ['featuredSnippet.faq_a5_es', sub.featuredSnippet.faq_a5_es]].forEach(([k, v]) => {
  const good = typeof v === 'string' && v.includes('Kali Audio WS-6.2');
  if (!good) ok = false;
  console.log((good ? 'OK   ' : 'FAIL ') + k + ' contiene el nombre');
});
if (!ok) throw new Error('verificacion fallo');
console.log('LISTO: 15 reemplazos aplicados — nombre Kali Audio WS-6.2 restaurado en studio-subwoofers');
