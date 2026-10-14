const fs = require('fs');
const P = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
console.log('total productos: ' + arr.length + ' | max id: ' + Math.max(...arr.map(x => x.id)));
['BB434', 'L-2000', 'Tribute'].forEach(w => {
  const m = arr.filter(p => (p.title + ' ' + (p.desc || '')).includes(w));
  console.log('\n"' + w + '": ' + m.length + ' -> ' + m.map(p => p.id + ' ' + p.title).join(' | '));
});
const bass = arr.filter(p => p.category === 'bass');
console.log('\n--- todos los bajos del catalogo (' + bass.length + ') ---');
bass.forEach(p => console.log('  ' + p.id + ' | $' + p.price + ' | ' + p.title));
const guides = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
console.log('\n--- guias de bajos ---');
guides.filter(g => /bass/i.test(g.id)).forEach(g => console.log('  ' + g.id + ' | ' + JSON.stringify(g.featuredProducts)));