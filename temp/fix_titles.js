const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = G.find(x => x.id === 'best-bass-home-office');
g.titleTag = '10 Home Office & Travel Basses Compared (2026)';
g.titleTag_es = '10 bajos home office y viaje: comparativa (2026)';
g.description = '10 desk-friendly basses for home offices: headless, travel and short-scale picks. (2026 comparison)';
g.description_es = '10 bajos de escritorio para home office: headless, viaje y escala corta. (comparativa 2026)';
fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
console.log('titleTag: ' + g.titleTag.length + 'ch | titleTag_es: ' + g.titleTag_es.length + 'ch | desc: ' + g.description.length + 'ch');
