const g = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const d = g.find(x => x.id === 'guitar-bass-amps');
console.log('sections:', d.sections.map(s => s.heading));
console.log('feat:', JSON.stringify(d.featuredProducts));
console.log('cols:', d.productTable.columns.map(c => c.title));
console.log('vpc:', d.verdictProsCons.map(v => v.name));
