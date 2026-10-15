const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const P = JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
const arr = Array.isArray(P)?P:P.products;
const b = fs.readFileSync(BASE+'build-guides.js','utf8');
const byTitle = {}; arr.forEach(p=>byTitle[p.title]=p);

const IDS = [375,377,382,387,392,394, 383,381,385,384,386, 615,188,625];
console.log('id    PB        cat         catalogo  tienda');
IDS.forEach(id => {
  const p = arr.find(x=>x.id===id);
  if (!p) { console.log(id + '  NO EXISTE'); return; }
  const m = b.match(new RegExp('(^|\\n)\\s*' + id + ':\\s*\\{[\\s\\S]*?\\n\\s*\\},','m'));
  const bloque = m ? m[0] : '';
  const pb = (bloque.match(/pluginboutique:\s*"([^"]+)"/)||[])[1];
  const pbUs = (bloque.match(/pbCur:\s*\{[^}]*us:\s*"([^"]+)"/)||[])[1];
  const pbUk = (bloque.match(/pbCur:\s*\{[^}]*uk:\s*"([^"]+)"/)||[])[1];
  console.log(String(id).padEnd(6) + String(pb||'-').padEnd(10) + String(p.category).padEnd(12) + '$' + String(p.price).padEnd(10) +
    Object.keys(p.stores||{}).join(',') + (pbUs ? '   [US $' + pbUs + (pbUk ? ' / UK £' + pbUk : '') + ']' : ''));
});

console.log('\n=== descripciones (para redactar las celdas sin inventar) ===');
[377,381,615,188,625].forEach(id => {
  const p = arr.find(x=>x.id===id);
  console.log('\n' + p.title + ' (id ' + id + '):');
  console.log('  EN: ' + p.desc);
  console.log('  ES: ' + p.desc_es);
});

// Connectivity/Battery: ver que dicen las filas vecinas
const guides = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
const h = guides.find(x=>x.id==='best-hardware-samplers');
console.log('\n=== best-hardware-samplers: filas Connectivity y Battery ===');
['Connectivity','Battery'].forEach(lbl => {
  const r = h.productTable.rows.find(x=>x.label === lbl);
  console.log('\n' + lbl + ':');
  h.productTable.columns.forEach((c,j) => console.log('   ' + c.title.padEnd(32) + ' = ' + (r.values[j] ? r.values[j].value : '<<VACIA>>')));
});