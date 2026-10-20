const fs = require('fs');
const f = 'data/guides.json';
const gs = JSON.parse(fs.readFileSync(f, 'utf8'));
const g = gs.find(x => x.id === 'best-studio-monitors-under-150');
g.titleTag_es = 'Mejores monitores de estudio por menos de $150';
fs.writeFileSync(f, JSON.stringify(gs, null, 2));
console.log('titleTag_es:', g.titleTag_es, '(' + g.titleTag_es.length + ')');
