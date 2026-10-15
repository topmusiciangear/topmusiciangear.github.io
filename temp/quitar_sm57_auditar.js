// Inventario completo de lo que toca al quitar el SM57 (id 5) de starter-studio
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const g = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
const guia = g.find(x => x.id === 'starter-studio');

const arr = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const list = Array.isArray(arr) ? arr : arr.products;
const byId = {}; list.forEach(p => byId[p.id] = p);

const SM57 = 5;
// id del Rode NT1 Signature
const nt1sig = list.filter(p => /NT1 Signature/i.test(p.title));
console.log('=== IDS ===');
console.log('  SM57 id 5           : ' + byId[5].title + '  ($' + byId[5].price + ')');
nt1sig.forEach(p => console.log('  NT1 Signature id ' + p.id + '   : ' + p.title + '  ($' + p.price + ')'));

// ── 1) todas las referencias ──
console.log('\n\n=== 1) REFERENCIAS AL SM57 / id 5 ===\n');
const regs = [];
if ((guia.featuredProducts || []).includes(SM57)) regs.push('featuredProducts: ' + JSON.stringify(guia.featuredProducts));
guia.sections.forEach((s, i) => {
  if ((s.products || []).includes(SM57)) regs.push('sections[' + i + '].products  heading="' + (s.heading_es || s.heading) + '"');
});
guia.verdictProsCons.forEach((v, i) => {
  if (v.productId === SM57) regs.push('verdictProsCons[' + i + ']  ' + v.name);
});

// prosa
function buscar(etiqueta, txt) {
  if (typeof txt !== 'string') return;
  const re = /SM57|SM-57/gi;
  let m;
  while ((m = re.exec(txt)) !== null) {
    regs.push({ etiq: etiqueta, ctx: txt.slice(Math.max(0, m.index - 110), m.index + 130).replace(/\s+/g, ' ') });
  }
}
buscar('intro_es', guia.intro_es);
buscar('conclusion_es', guia.conclusion_es);
buscar('verdict_es', guia.verdict_es);
buscar('featuredSnippet', guia.featuredSnippet);
guia.sections.forEach((s, i) => { buscar('sections[' + i + '].content_es', s.content_es); });
guia.productTable && guia.productTable.rows && guia.productTable.rows.forEach((r, i) => {
  JSON.stringify(r).replace(/\s+/g, ' ').includes('SM57') && regs.push({ etiq: 'productTable.rows[' + i + '] "SM57"', ctx: JSON.stringify(r).replace(/\s+/g, ' ').slice(0, 200) });
});
// FAQ
JSON.stringify(guia).match(/faq[\s\S]{0,4000}?SM57/gi) && regs.push('FAQ: contiene SM57');

regs.forEach(r => {
  if (typeof r === 'string') console.log('  * ' + r);
  else console.log('\n  [' + r.etiq + ']\n      ...' + r.ctx + '...');
});

// ── 2) la tabla ──
console.log('\n\n=== 2) TABLA COMPARATIVA ===\n');
console.log('columnas: ' + JSON.stringify(guia.productTable.columns));
console.log('\nfilas:');
guia.productTable.rows.forEach((r, i) => {
  const txt = JSON.stringify(r);
  if (/SM57|Micrófono/i.test(txt) || i === 0) console.log('  [' + i + '] ' + txt.replace(/\s+/g, ' ').slice(0, 260));
});

// ── 3) precios y total ──
console.log('\n\n=== 3) PRECIOS MENCIONADOS (hay que recalcular) ===\n');
const precios = new Set();
const json = JSON.stringify(guia);
[...json.matchAll(/\$[0-9][0-9,\.]*/g)].forEach(m => precios.add(m[0]));
console.log('  importes que aparecen: ' + [...precios].join('  '));
console.log('\n  menciones de totales:');
[...json.matchAll(/[^\n]{0,120}\$[0-9][0-9,\.]*[^\n]{0,120}/g)].forEach(m => {
  if (/\b485\b|\b816\b|\b905\b|total|Total/i.test(m[0])) console.log('    ...' + m[0].replace(/\s+/g, ' ') + '...');
});
