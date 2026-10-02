const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = G.find(x => x.id === 'best-instrument-mics');
const ci = g.productTable.columns.findIndex(c => c.title === 'Royer R-121');
const r = g.productTable.rows.find(r => /best for/i.test(r.label || ''));
r.values[ci] = { value: 'Big, wide ribbon tone for electric guitar and brass', value_es: 'Tono ribbon grande y amplio para guitarra eléctrica y metales' };
fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
console.log('fixed');
