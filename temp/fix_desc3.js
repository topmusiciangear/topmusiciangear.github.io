const fs = require('fs');
const f = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const guides = JSON.parse(fs.readFileSync(f, 'utf8'));
const g = guides.find(x => x.id === 'budget-bass-like-enterprise' || x.id === 'budget-bass-like-expensive');
g.description_es = g.description_es.replace('economicos', 'econ\u00f3micos');
fs.writeFileSync(f, JSON.stringify(guides, null, 2));
console.log('ES (' + g.description_es.length + '): ' + g.description_es);