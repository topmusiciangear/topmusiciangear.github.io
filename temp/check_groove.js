const p = require('C:/Users/Daniel/projects/topmusiciangear/data/products.json');
const g = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
[129, 144, 33].forEach(id => {
  const x = p.find(y => y.id === id);
  console.log(id, '|', x ? x.title : 'NOT FOUND');
  const inGuides = g.filter(gd => {
    const s = JSON.stringify(gd);
    return (gd.featuredProducts || []).includes(id) || s.includes('products":[' + id) || s.includes('products": [' + id);
  }).map(gd => gd.title);
  console.log('  guides:', JSON.stringify(inGuides));
});
// full guide dump
const d = g.find(x => x.title === 'Best Grooveboxes & Compact Drum Machines');
console.log('KEYS:', Object.keys(d));
console.log('TABLE cols:', (d.productTable ? d.productTable.columns.map(c => c.title) : 'none'));
console.log('VPC:', (d.verdictProsCons || []).map(v => v.name));
console.log('CONCLUSION:', (d.conclusion || '').slice(0, 200));
