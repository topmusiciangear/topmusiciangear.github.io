const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const raw = fs.readFileSync(B + 'data/guides.json', 'utf8');
const guides = JSON.parse(raw);

// Busca referencias por id de producto
const hits = {};
const walk = (node, path) => {
  if (Array.isArray(node)) return node.forEach((v, i) => walk(v, path + '[' + i + ']'));
  if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) {
      if ((k === 'id' || k === 'productId') && (v === 241 || v === '241')) {
        hits[path + '.' + k] = (hits[path + '.' + k] || 0) + 1;
      }
      walk(v, path + '.' + k);
    }
  }
};
guides.forEach((g, i) => walk(g, 'guides[' + i + ']'));

console.log('Referencias por id 241: ' + Object.keys(hits).length);
Object.entries(hits).slice(0, 20).forEach(([k, v]) => console.log('  ' + k + ' x' + v));

// Guia best-home-studio-speakers: que id usa la tabla
const g = guides.find(x => x.id === 'best-home-studio-speakers');
console.log('\nEjemplo columnas de una guia (best-monitors):');
const bm = guides.find(x => x.id === 'best-monitors');
if (bm && bm.productTable) console.log(JSON.stringify(bm.productTable.columns[0], null, 1).slice(0, 400));
