const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const G = require(F);
G.find(x => x.id === 'best-headphones').sections[4].products = [26];
const fg = G.find(x => x.id === 'fender-guide').sections[1];
fg.products = [...new Set(fg.products)];
G.find(x => x.id === 'active-vs-passive-pa').sections[5].products = [154];
fs.writeFileSync(F, JSON.stringify(G, null, 2));
console.log('done');