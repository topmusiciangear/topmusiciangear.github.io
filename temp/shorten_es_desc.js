const fs = require('fs');
const f = 'data/guides.json';
const gs = JSON.parse(fs.readFileSync(f, 'utf8'));
const g = gs.find(x => x.id === 'best-studio-monitors-under-150');
g.description_es = 'Monitores de estudio compactos para home studio por menos de $150: Mackie, PreSonus, M-Audio, Behringer y Alesis, con graves medidos y compras honestas.';
fs.writeFileSync(f, JSON.stringify(gs, null, 2));
console.log('ES desc:', g.description_es.length);
