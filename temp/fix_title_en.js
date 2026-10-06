const fs = require('fs');
const gFile = 'data/guides.json';
const G = JSON.parse(fs.readFileSync(gFile, 'utf8'));
const gd = G.find(x => x.id === 'best-digital-pianos');
if (gd.titleTag !== 'Best Digital Pianos for Every Budget') throw new Error('unexpected titleTag: ' + gd.titleTag);
gd.titleTag = 'Best Digital Pianos for Home & Studio';
fs.writeFileSync(gFile, JSON.stringify(G, null, 2) + '\n');
console.log('titleTag EN updated');
