const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = G.find(x => x.id === 'best-bass-home-office');
g.titleTag = '10 Ideal Basses for Home Office & Travel (2026)';
g.titleTag_es = '10 bajos ideales para home office y viajes (2026)';
fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
console.log('EN: ' + g.titleTag.length + 'ch | ES: ' + g.titleTag_es.length + 'ch');
