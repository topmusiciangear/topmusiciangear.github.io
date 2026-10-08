const g = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const d = g.find(x => x.id === 'best-live-subwoofers');
console.log('TITLE:', d.title);
console.log('feat:', JSON.stringify(d.featuredProducts));
console.log('table cols:', d.productTable.columns.map(c => c.title));
console.log('vpc:', d.verdictProsCons.map(v => v.name));
console.log('sections:', d.sections.map(s => s.heading + ' | ' + JSON.stringify(s.products)));
const p = require('C:/Users/Daniel/projects/topmusiciangear/data/products.json');
['PRX ONE', 'PRX918XLF', 'TS18S', 'EON718S', 'EON715', 'KS118', 'ELX200'].forEach(n => {
  const f = p.filter(y => y.title.includes(n));
  console.log(n, '->', f.length ? f.map(x => x.id + ':' + x.title + ' [$' + x.price + ']').join(' | ') : 'NOT IN DB');
});
const prx = p.find(y => y.title.includes('PRX ONE'));
console.log('PRX ONE desc:', prx.desc);
console.log('PRX ONE desc_es:', prx.desc_es);
