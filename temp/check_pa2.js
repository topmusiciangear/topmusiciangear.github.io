const g = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const d = g.find(x => x.id === 'live-sound-pa');
console.log('feat:', JSON.stringify(d.featuredProducts));
console.log('table cols:', d.productTable.columns.map(c => c.title));
console.log('vpc:', d.verdictProsCons.map(v => v.name));
console.log('sections:', d.sections.map(s => s.heading));
console.log('conclusion:', (d.conclusion || '').slice(0, 200));
