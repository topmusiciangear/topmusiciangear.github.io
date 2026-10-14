const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const P = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
const byId = {}; arr.forEach(p => byId[p.id] = p);
['pro-plugins', 'pro-monitors', 'pro-microphones', 'fix-clipping-scarlett', 'mics-for-creators', 'best-instrument-mics', 'best-digital-mixers'].forEach(id => {
  const g = guides.find(x => x.id === id);
  console.log('\n########## ' + id + ' | ' + g.title);
  console.log('featured (' + g.featuredProducts.length + '): ' + g.featuredProducts.map(i => (byId[i] ? byId[i].title : i + '?')).join(' | '));
  console.log('tabla: ' + (g.productTable ? g.productTable.columns.map(c => c.title).join(' | ') : 'SIN TABLA'));
  console.log('verdicts (' + g.verdictProsCons.length + '): ' + g.verdictProsCons.map(v => v.name).join(' | '));
  const solo = (g.sections || []).filter(s => (s.products || []).length === 1).map(s => s.products[0]);
  console.log('reviews de 1 producto: ' + JSON.stringify(solo));
  console.log('sin review: ' + JSON.stringify(g.featuredProducts.filter(i => !solo.includes(i))));
  console.log('secciones:');
  (g.sections || []).forEach((s, i) => console.log('  [' + i + '] ' + (s.heading || s.h || '?') + ' | ' + JSON.stringify(s.products) + ' | campos=' + Object.keys(s).join(',')));
});