const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

const id = process.argv[2] || 'best-home-studio-speakers';
const g = guides.find(x => x.id === id);
if (!g) { console.log('Guia no encontrada: ' + id); process.exit(1); }

console.log('GUIA: ' + g.id);
console.log('Titulo: ' + g.title);
console.log('');

if (g.verdict) console.log('VEREDICTO: ' + g.verdict);
if (g.conclusion) console.log('\nCONCLUSION (extracto): ' + g.conclusion.slice(0, 1200));
if (g.verdictProsCons && g.verdictProsCons.length) {
  console.log('\nVEREDICTOS INDIVIDUALES:');
  g.verdictProsCons.forEach((v, i) => console.log('  ' + (i + 1) + '. ' + v.name));
}
if (g.productTable && g.productTable.columns) {
  console.log('\nPRODUCTOS EN TABLA:');
  g.productTable.columns.forEach((c, i) => {
    const p = products.find(x => x.title === c.title || x.title_es === c.title || x.title === c.title_es);
    console.log('  ' + (i + 1) + '. [' + (p ? p.score : 'N/A') + '] ' + (c.title_es || c.title));
  });
}
