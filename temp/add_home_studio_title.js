const fs = require('fs');
const f = 'data/guides.json';
const gs = JSON.parse(fs.readFileSync(f, 'utf8'));
const g = gs.find(x => x.id === 'best-studio-monitors-under-150');

g.title = 'Best Compact Home Studio Monitors Under $150';
g.title_es = 'Mejores monitores de estudio para home studio hasta $150';
g.titleTag_es = 'Mejores monitores de estudio para home studio hasta $150';
g.description = 'Compact home studio monitors under $150 compared: Mackie, PreSonus, M-Audio, Behringer and Alesis, with measured bass and honest picks.';
g.description_es = 'Monitores de estudio compactos para home studio por menos de $150 comparados: Mackie, PreSonus, M-Audio, Behringer y Alesis, con graves medidos y compras honestas.';

fs.writeFileSync(f, JSON.stringify(gs, null, 2));
console.log('EN title:', g.title, '(' + g.title.length + ')');
console.log('ES title:', g.title_es, '(' + g.title_es.length + ')');
console.log('EN desc:', g.description.length, '| ES desc:', g.description_es.length);
