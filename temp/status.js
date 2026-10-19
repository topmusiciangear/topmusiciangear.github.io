const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const g = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8')).find(x => x.id === 'best-headphones-for-mixing');

console.log('=== scores actuales en el badge (guide-scores) ===');
const gs = fs.readFileSync(B + 'js/guide-scores.js', 'utf8');
const i = gs.indexOf('"best-headphones-for-mixing"');
const j = gs.indexOf('\n },', i);
(gs.substring(i, j + 4).match(/"([^"]+)":\s*([0-9.]+)/g) || []).forEach(m => {
  const k = m.replace(/":.*$/, '').replace(/^"/, '').replace(/ \(.*\)$/, '');
  console.log('  ' + m.match(/([0-9.]+)$/)[1] + '  ' + k);
});

console.log('\n=== Neumann NDH 30 ===');
const n = products.find(p => p.id === 424);
console.log('  score=' + n.score + '  price=' + n.price + '  img=' + n.img);
console.log('  stores: ' + Object.keys(n.stores || {}).join(', '));
