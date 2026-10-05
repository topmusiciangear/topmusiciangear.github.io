const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const G = require(F);
const v = G.find(x => x.id === 'best-beginner-electric-guitar').verdictProsCons.find(v => v.name === 'Squier Affinity Series Stratocaster');
const i = v.pros.findIndex(s => s.includes("world's most popular beginner guitar"));
v.pros[i] = 'Slim C-shaped maple neck with 9.5-inch radius for easy chording';
v.pros_es[i] = 'Mástil de arce en C con radio de 9,5 pulgadas para cejillas fáciles';
fs.writeFileSync(F, JSON.stringify(G, null, 2));
console.log('ok');