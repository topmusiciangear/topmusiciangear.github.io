const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
const P = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : P.products;

['beginner-guitar', 'best-digital-mixers'].forEach(id => {
  const g = guides.find(x => x.id === id);
  console.log('=== ' + id + ' : ' + g.title + ' ===');
  console.log('COLUMNAS (' + g.productTable.columns.length + '): ' + g.productTable.columns.map(c => c.title).join(' | '));
  console.log('FILAS:');
  g.productTable.rows.forEach((r, i) => {
    console.log('  ' + i + '. ' + r.label + ' / ' + r.label_es + ' [' + r.values.length + ']');
  });
  console.log('VEREDICTOS (' + g.verdictProsCons.length + '): ' + g.verdictProsCons.map(v => v.name).join(' | '));
  console.log('');
});

// Fichas de los 8 productos a anadir
const ids = { 'beginner-guitar': [459, 313, 295], 'best-digital-mixers': [410, 413, 486, 411, 482] };
Object.keys(ids).forEach(gid => {
  console.log('=== FICHAS para ' + gid + ' ===');
  ids[gid].forEach(pid => {
    const p = arr.find(x => x.id === pid);
    if (!p) { console.log(pid + ': NO EN CATALOGO'); return; }
    console.log(pid + ' | ' + p.title + ' | $' + p.price + ' | ' + (p.brand || ''));
    console.log('   desc: ' + (p.desc || '').slice(0, 200));
  });
  console.log('');
});