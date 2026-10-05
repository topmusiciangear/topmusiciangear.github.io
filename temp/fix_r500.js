const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const G = require(F);
const g = G.find(x => x.id === 'guitar-bass-amps');
const v = g.verdictProsCons.find(v => v.name === 'Fender Rumble 500 V3');
v.cons[4] = 'For 5-string players, dual 10" compresses the low B — the Rumble 200 V3 (15") handles it cleanly';
fs.writeFileSync(F, JSON.stringify(G, null, 2));
console.log('fixed: ' + v.cons[4]);