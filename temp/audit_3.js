const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const g = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8')).find(x => x.id === 'usb-mics');
const cols = g.productTable.columns.map(c => c.title);
const wRow = g.productTable.rows.find(r => r.label === 'Weight');

console.log('=== PESOS ordenados (mas pesado -> mas ligero) ===');
const parsed = cols.map((n, i) => ({ n: n, raw: wRow.values[i].value }))
  .map(o => {
    const m = o.raw.match(/([\d.]+)\s*(kg|g)\b/);
    let g2 = null;
    if (m) { g2 = parseFloat(m[1]) * (m[2] === 'kg' ? 1000 : 1); }
    return { n: o.n, raw: o.raw, g: g2 };
  });
const known = parsed.filter(x => x.g).sort((a, b) => b.g - a.g);
known.forEach((x, i) => console.log('  ' + (i + 1) + '. ' + x.g + ' g   ' + x.n + '   (' + x.raw + ')'));
parsed.filter(x => !x.g).forEach(x => console.log('  ?. ' + x.raw + '   ' + x.n));

console.log('\n=== VPC: frases rotas ===');
let broken = 0;
g.verdictProsCons.forEach((v, i) => {
  [['pros', v.pros], ['cons', v.cons], ['pros_es', v.pros_es || []], ['cons_es', v.cons_es || []]].forEach(([f, arr]) => {
    arr.forEach((t, j) => {
      if (/^\s*([-—–])/.test(t) || /^\s+(it|At)\b/.test(t) || /^\s{2,}/.test(t)) {
        console.log('  [ROTO] VPC' + i + ' ' + v.name + ' ' + f + '[' + j + ']: ' + JSON.stringify(t));
        broken++;
      }
    });
  });
});
console.log('  total rotas: ' + broken);

console.log('\n=== VPC: referencias a productos fuera de la guia ===');
const OUTSIDE = ['Yeti', 'Blue', 'HyperX', 'Fifine', 'Maono', 'AT2020USB-XP', 'G-Track', 'Razer', 'AKG', 'Logitech', 'Elgato Wave:X'];
const found = {};
g.verdictProsCons.forEach((v, i) => {
  [['pros', v.pros], ['cons', v.cons], ['pros_es', v.pros_es || []], ['cons_es', v.cons_es || []]].forEach(([f, arr]) => {
    arr.forEach((t, j) => {
      OUTSIDE.forEach(n => { if (new RegExp(n, 'i').test(t)) { const k = 'VPC' + i + ' ' + v.name + ' ' + f + '[' + j + '] (' + n + ')'; found[k] = t.slice(0, 130); } });
    });
  });
});
Object.keys(found).forEach(k => console.log('  ' + k + ': ' + found[k]));

console.log('\n=== NEOM: desc vs tabla ===');
const byId = {}; JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8')).forEach(p => byId[p.id] = p);
console.log('  desc EN: ' + byId[670].desc);
console.log('  tabla Capsule: ' + g.productTable.rows.find(r => r.label === 'Capsule / Diaphragm').values[6].value);
console.log('  VPC pro[1]: ' + g.verdictProsCons[6].pros[1]);
console.log('  VPC con[4]: ' + g.verdictProsCons[6].cons[4]);

console.log('\n=== FILAS TABLA ===');
console.log('  ' + g.productTable.rows.map(r => r.label).join('\n  '));
console.log('\n  Fila bit depth / sample rate presente? ' + g.productTable.rows.some(r => /bit depth|sample rate|conversion|recording/i.test(r.label)));

console.log('\n=== PRECIOS citados en VPC ===');
const hits = {};
g.verdictProsCons.forEach((v, i) => {
  [].concat(v.pros, v.cons, v.pros_es || [], v.cons_es || []).forEach(t => {
    const m = t.match(/(\$|£|€)\s?[\d,]+(?:\.\d{2})?/g);
    if (m) { (hits[v.name] = hits[v.name] || new Set()); m.forEach(x => hits[v.name].add(x)); }
  });
});
Object.keys(hits).forEach(k => console.log('  ' + k + ': ' + Array.from(hits[k]).join(' , ')));

console.log('\n=== VERDICT / INTRO ===');
console.log('VERDICT EN: ' + g.verdict);
console.log('\nVERDICT ES: ' + g.verdict_es);
console.log('\nINTRO EN: ' + g.intro);
console.log('\nINTRO ES: ' + g.intro_es);
console.log('\nDESCRIPTION: ' + g.description);
console.log('\nDESCRIPTION_ES: ' + g.description_es);
console.log('\nTITLE: ' + g.title);
console.log('TITLE_ES: ' + g.title_es);
console.log('TAG: ' + g.titleTag);
console.log('TAG_ES: ' + g.titleTag_es);