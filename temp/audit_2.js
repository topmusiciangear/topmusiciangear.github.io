const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const prods = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const g = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8')).find(x => x.id === 'usb-mics');
const byId = {}; prods.forEach(p => byId[p.id] = p);

const IDS = [194, 195, 286, 299, 3, 666, 670, 252, 291, 276];
const priceRow = g.productTable.rows.find(r => r.label === 'Estimated Price');
const cols = g.productTable.columns.map(c => c.title);

console.log('=== PRECIO TABLA vs CATALOGO ===');
IDS.forEach((id, i) => {
  const p = byId[id];
  console.log('  col' + i + ' ' + cols[i]);
  console.log('       tabla   : ' + priceRow.values[i].value);
  console.log('       catalogo: $' + p.price + '   (' + p.title + ')');
});

console.log('\n=== PESOS (para verificar "mas ligero" / "mas pesado") ===');
const wRow = g.productTable.rows.find(r => r.label === 'Weight');
const weights = IDS.map((id, i) => ({ name: cols[i], w: wRow.values[i].value }));
weights.forEach(w => console.log('  ' + w.w.padEnd(40) + ' ' + w.name));
const parsed = weights.filter(w => /^\s*(\d+(?:\.\d+)?)\s*g/.test(w.w))
  .map(w => ({ name: w.name, g: parseFloat(w.w.w.match(/(\d+(?:\.\d+)?)\s*g/)[1]) }))
  .sort((a, b) => b.g - a.g);
console.log('  ORDENados por peso (mas pesado -> mas ligero):');
parsed.forEach((w, i) => console.log('    ' + (i + 1) + '. ' + w.g + ' g  ' + w.name));

console.log('\n=== VPC: frases rotas (empiezan con — o espacio) ===');
g.verdictProsCons.forEach((v, i) => {
  v.pros.forEach((t, j) => { if (/^\s*([-—–]|it |At |\()/.test(t) || /^ —/.test(t)) console.log('  VPC' + i + ' ' + v.name + ' pros[' + j + ']: ' + JSON.stringify(t)); });
  v.cons.forEach((t, j) => { if (/^\s*([-—–]|it |At |\()/.test(t) || /^ —/.test(t)) console.log('  VPC' + i + ' ' + v.name + ' cons[' + j + ']: ' + JSON.stringify(t)); });
  (v.cons_es || []).forEach((t, j) => { if (/^\s*([-—–]|it |At |\()/.test(t) || /^ —/.test(t)) console.log('  VPC' + i + ' ' + v.name + ' cons_es[' + j + ']: ' + JSON.stringify(t)); });
  (v.pros_es || []).forEach((t, j) => { if (/^\s*([-—–]|it |At |\()/.test(t) || /^ —/.test(t)) console.log('  VPC' + i + ' ' + v.name + ' pros_es[' + j + ']: ' + JSON.stringify(t)); });
});

console.log('\n=== VPC: referencias a productos que NO estan en la guia ===');
const inGuide = cols.join(' | ');
['Yeti', 'Blue', 'Logitech', 'AKG Lyra', 'AT2020USB-XP', 'HyperX', 'Fifine', 'Maono', 'Samson G-Track', 'Toni', 'Razer'].forEach(n => {
  g.verdictProsCons.forEach((v, i) => {
    const scan = (arr, f) => (arr || []).forEach((t, j) => { if (new RegExp(n, 'i').test(t)) console.log('  VPC' + i + ' ' + v.name + ' ' + f + '[' + j + ']: ' + t.slice(0, 120)); });
    scan(v.pros, 'pros'); scan(v.cons, 'cons'); scan(v.pros_es, 'pros_es'); scan(v.cons_es, 'cons_es');
  });
});

console.log('\n=== NEOM desc vs tabla ===');
console.log('  desc EN: ' + byId[670].desc);
console.log('  tabla capsule: ' + g.productTable.rows.find(r => r.label === 'Capsule / Diaphragm').values[6].value);
console.log('  VPC pro[1] EN: ' + g.verdictProsCons[6].pros[1]);

console.log('\n=== FILAS DE LA TABLA ===');
console.log('  ' + g.productTable.rows.map(r => r.label).join('\n  '));
console.log('\n  Hay fila de Bit Depth / Sample Rate? ' + g.productTable.rows.some(r => /bit depth|sample rate|conversion|recording/i.test(r.label)));

console.log('\n=== PRECIOS VPC vs precios reales ===');
['~$169', '~$139', '$199', '$119', '$70'].forEach(x => {
  const hits = [];
  g.verdictProsCons.forEach((v, i) => {
    v.pros.concat(v.cons, v.pros_es || [], v.cons_es || []).forEach(t => { if (t.includes(x)) hits.push(v.name + ': ' + t.slice(0, 110)); });
  });
  if (hits.length) { console.log('  "' + x + '":'); hits.forEach(h => console.log('      ' + h)); }
});

console.log('\n=== VERDICT + INTRO ===');
console.log('VERDICT EN: ' + g.verdict);
console.log('VERDICT ES: ' + g.verdict_es);
console.log('\nINTRO EN: ' + g.intro);
console.log('\nINTRO ES: ' + g.intro_es);