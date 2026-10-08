const p = require('C:/Users/Daniel/projects/topmusiciangear/data/products.json');
const g = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
p.filter(y => /icoa/i.test(y.title)).forEach(x => console.log(x.id, '|', x.title, '| img:', x.img));
const d = g.find(x => x.title === 'Best PA Systems for Live Sound');
console.log('GUIDE:', d ? d.id : 'NOT FOUND');
if (d) {
  console.log('feat:', JSON.stringify(d.featuredProducts));
  console.log('table cols:', d.productTable.columns.map(c => c.title));
  console.log('vpc:', d.verdictProsCons.map(v => v.name));
  console.log('sections:', d.sections.map(s => s.heading));
}
['QSC K12', 'TS412', 'EVERSE', 'DXR12'].forEach(n => {
  const f = p.filter(y => y.title.includes(n));
  console.log(n, '->', f.length ? f.map(x => x.id + ':' + x.title).join(' | ') : 'NOT IN DB');
});
