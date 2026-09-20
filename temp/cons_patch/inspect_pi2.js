const p = require('../../data/products.json');
const g = require('../../data/guides.json');
const arr = Array.isArray(p) ? p : (p.products || []);
const guides = Array.isArray(g) ? g : (g.guides || []);
const pi = guides.find(x => x && x.id === 'portable-interfaces');

console.log('--- productTable full ---');
console.log(JSON.stringify(pi.productTable, null, 1));
console.log('--- featuredProducts full ---');
console.log(JSON.stringify(pi.featuredProducts, null, 1));

console.log('--- products.json entries for Apollo twin/x16 within portable universe ---');
const names = (pi.productTable || []).map(r => (r.name || '')).concat((pi.verdictProsCons || []).map(v => v.name));
console.log('names referenced:', JSON.stringify(names));
for (const n of names) {
  const hits = arr.filter(x => x && x.name && x.name.toLowerCase() === n.toLowerCase());
  console.log('[' + n + '] -> ' + hits.length);
  for (const h of hits) {
    console.log('   id=' + h.id + ' cat=' + h.category + ' | prices=' + JSON.stringify(h.prices) +
      ' | image=' + JSON.stringify(h.image || h.img || null) + ' | hrefs=' + JSON.stringify(h.hrefs));
  }
}
