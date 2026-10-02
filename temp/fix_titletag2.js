const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = G.find(x => x.id === 'best-bass-home-office');
g.titleTag = '10 Basses for Home Office & Travel Compared (2026)';
fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
console.log(g.titleTag.length + 'ch');
