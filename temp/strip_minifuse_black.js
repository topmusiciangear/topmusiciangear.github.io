const fs = require('fs');
// Guide: strip color from MiniFuse 2 naming (EN + ES)
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
let s = JSON.stringify(G.find(x => x.id === 'budget-interfaces'));
s = s.split('Arturia MiniFuse 2, Black').join('Arturia MiniFuse 2');
s = s.split('Arturia MiniFuse 2, Negro').join('Arturia MiniFuse 2');
G[G.findIndex(x => x.id === 'budget-interfaces')] = JSON.parse(s);
fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
// Catalog title 551 (EN + ES)
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const p = P.find(x => x.id === 551);
p.title = 'Arturia MiniFuse 2';
p.title_es = 'Arturia MiniFuse 2';
fs.writeFileSync('data/products.json', JSON.stringify(P, null, 2));
// Verify
const s2 = JSON.stringify(G.find(x => x.id === 'budget-interfaces'));
console.log('Black left:', (s2.match(/MiniFuse 2, Black/g) || []).length, '| Negro left:', (s2.match(/MiniFuse 2, Negro/g) || []).length);