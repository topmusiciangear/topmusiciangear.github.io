const g = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const d = g.find(x => /Amplifiers: Complete Guide/.test(x.title));
console.log('ID:', d.id);
console.log('TITLE:', d.title);
console.log('feat:', JSON.stringify(d.featuredProducts));
console.log('table cols:', d.productTable.columns.map(c => c.title));
console.log('vpc:', d.verdictProsCons.map(v => v.name));
console.log('sections:', d.sections.map(s => s.heading + ' | products:' + JSON.stringify(s.products)));
const p = require('C:/Users/Daniel/projects/topmusiciangear/data/products.json');
['Spark LIVE', 'Rumble', 'Rocket Bass', 'RB-210', 'RB-115', 'Mustang GTX', 'Markbass', 'Marcus Miller', 'Tone Master', 'Catalyst'].forEach(n => {
  const f = p.filter(y => y.title.toLowerCase().includes(n.toLowerCase()));
  console.log(n, '->', f.length ? f.map(x => x.id + ':' + x.title).join(' | ') : 'NOT IN DB');
});
