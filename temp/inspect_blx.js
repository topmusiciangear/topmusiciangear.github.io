const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'blx288-vs-ewd');
console.log('featured: ' + JSON.stringify(g.featuredProducts));
console.log('secciones:');
(g.sections || []).forEach((s, i) => console.log('  [' + i + '] ' + (s.heading || s.h) + ' | ' + JSON.stringify(s.products)));
console.log('tabla: ' + (g.productTable ? g.productTable.columns.map(c => c.title).join(' | ') : 'SIN TABLA'));
console.log('verdicts: ' + g.verdictProsCons.map(v => v.name).join(' | '));