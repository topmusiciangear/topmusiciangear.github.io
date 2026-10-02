const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const v = G.find(x => x.id === 'best-bass-home-office').verdictProsCons.find(v => v.name === 'Kala U-Bass Solid Body');
v.cons[0] = 'Jet Black finish shows fingerprints';
v.cons_es[0] = 'El acabado Jet Black marca huellas';
fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
console.log('veredicto U-Bass actualizado');
