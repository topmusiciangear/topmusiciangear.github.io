const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const arr = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const list = Array.isArray(arr) ? arr : arr.products;

console.log('=== ¿ESTA EL ERIS STUDIO 5 EN EL CATALOGO? ===\n');
const hits = list.filter(p => /eris/i.test(p.title));
console.log('  productos Eris: ' + hits.length);
hits.forEach(p => console.log('   id ' + String(p.id).padStart(3) + '  ' + p.title.padEnd(34) + '$' + p.price + '  (' + Object.keys(p.stores || {}).length + ' tiendas)'));

const presonus = list.filter(p => /presonus/i.test(p.title));
console.log('\n  productos PreSonus: ' + presonus.length);
presonus.forEach(p => console.log('   id ' + String(p.id).padStart(3) + '  ' + p.title.padEnd(34) + '$' + p.price));

console.log('\n\n=== LA GUIA best-monitors-for-small-rooms ===\n');
const g = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
const guia = g.find(x => x.id === 'best-monitors-for-small-rooms');
if (!guia) { console.log('GUIA NO ENCONTRADA'); process.exit(1); }

console.log('  titulo: ' + guia.title);
console.log('  productos: ' + JSON.stringify(guia.featuredProducts));
console.log('  veredictos: ' + guia.verdictProsCons.length);
console.log('  secciones: ' + guia.sections.length);

console.log('\n  --- columnas de la tabla ---');
guia.productTable.columns.forEach((c, i) => console.log('   [' + i + '] ' + c.title + '  (' + (c.title_es || '') + ')'));

console.log('\n  --- filas ---');
guia.productTable.rows.forEach((r, i) => {
  console.log('   [' + i + '] ' + (r.label_es || r.label).padEnd(26) +
    r.values.map(v => (v.value_es || v.value).slice(0, 24)).join(' | '));
});

console.log('\n  --- secciones ---');
guia.sections.forEach((s, i) => {
  console.log('   [' + String(i).padStart(2) + '] ' + (s.heading_es || s.heading));
  console.log('        productos: ' + (s.products || []).join(', '));
});

console.log('\n  --- veredictos ---');
guia.verdictProsCons.forEach((v, i) => console.log('   [' + String(i).padStart(2) + '] id ' + String(v.productId).padStart(3) + '  ' + v.name +
  '  (' + v.pros.length + '+' + v.cons.length + ')'));

console.log('\n  max id en el catalogo: ' + Math.max(...list.map(p => p.id)));
