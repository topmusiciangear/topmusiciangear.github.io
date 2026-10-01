// merge 517 cont.: guides 517->286 + borrar BTN 517 (EOL flexible).
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = G.find(x => x.id === 'mics-for-creators');
if (!g.sections[0].products.includes(286)) {
  g.sections[0].products = g.sections[0].products.map(id => (id === 517 ? 286 : id));
  console.log('creators: 517 -> 286');
} else console.log('creators ya usa 286');
fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
let s = fs.readFileSync('build-guides.js', 'utf8');
const re = /  517: \{\r?\n    prices: \{\r?\n(?:.*\r?\n)*?    \},\r?\n    urls: \{\r?\n(?:.*\r?\n)*?    \}\r?\n  \},\r?\n/;
const m = s.match(re);
if (!m) throw new Error('bloque 517 no localizado ni flexible');
s = s.replace(re, '');
fs.writeFileSync('build-guides.js', s);
// verificacion
const P3 = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const G3 = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const b3 = fs.readFileSync('build-guides.js', 'utf8');
console.log('517 en catalogo: ' + P3.some(p => p.id === 517));
console.log('286 img G4M: ' + P3.find(p => p.id === 286).img.includes('r2.gear4music'));
console.log('286 exclude: ' + JSON.stringify(P3.find(p => p.id === 286).excludeStores));
console.log('creators usa 286: ' + G3.find(x => x.id === 'mics-for-creators').sections[0].products.includes(286));
console.log('BTN 517 existe: ' + /^\s*517:\s*\{/m.test(b3));
