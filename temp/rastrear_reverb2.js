const fs = require('fs');
const p = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', 'utf8'));
['atc-scm25a-mk2', 'genelec-8351b-pair-white', '87230252', '81615907'].forEach(k => {
  const hits = p.filter(x => JSON.stringify(x.stores || {}).includes(k));
  console.log(k + ': ' + (hits.length ? hits.map(x => x.id + ' ' + x.title).join(' | ') : 'ningun producto (esta en otro campo)'));
  hits.forEach(x => console.log('    reverb: ' + x.stores.reverb));
});
// ¿cuantos /item/ hay en total en stores.reverb?
const items = p.filter(x => x.stores && x.stores.reverb && /reverb\.com\/item\//.test(x.stores.reverb));
console.log('\ntotal /item/ en stores.reverb: ' + items.length);
items.forEach(x => console.log('  ' + x.id + '  ' + x.title.slice(0, 55)));
