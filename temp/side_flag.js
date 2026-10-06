const fs = require('fs');
const gFile = 'data/guides.json';
const G = JSON.parse(fs.readFileSync(gFile, 'utf8'));
const gd = G.find(x => x.id === 'best-digital-pianos');
const s = gd.sections.find(x => (x.products || []).includes(565));
if (!s) throw new Error('console section not found');
s.sideProducts = true;
fs.writeFileSync(gFile, JSON.stringify(G, null, 2) + '\n');
console.log('sideProducts flag set');
