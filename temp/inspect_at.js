const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const g = guides.find(x => x.id === 'autotune-vs-melodyne');
console.log('KEYS: ' + Object.keys(g).join(','));
console.log('TITLE: ' + g.title);
console.log('TITLE_ES: ' + g.title_es);
console.log('METADESC: ' + (g.metaDesc || g.meta_desc || '').slice(0, 200));
console.log('SECTIONS: ' + g.sections.length + ' | FAQ: ' + g.faq.length + ' | VPC: ' + g.verdictProsCons.length);
console.log('FEATURED: ' + JSON.stringify(g.featuredProducts));
console.log('TABLE cols: ' + (g.productTable ? g.productTable.columns.map(c => c.title).join(' | ') : 'none'));
// internal links to this guide
const linkers = [];
guides.forEach(x => {
  const s = JSON.stringify(x);
  if (x.id !== g.id && s.includes('autotune-vs-melodyne')) linkers.push(x.id);
});
console.log('LINKERS (' + linkers.length + '): ' + linkers.join(','));
// product 1031 usage
const users1031 = [];
guides.forEach(x => {
  const refs = [...(x.featuredProducts || [])];
  (x.sections || []).forEach(s => (s.products || []).forEach(id => refs.push(id)));
  if (refs.includes(1031)) users1031.push(x.id);
});
console.log('1031 usado en: ' + users1031.join(','));
console.log('1031: ' + JSON.stringify(products.find(p => p.id === 1031)));
console.log('max product id: ' + Math.max(...products.map(p => p.id)));
