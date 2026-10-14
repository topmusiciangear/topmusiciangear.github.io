const fs = require('fs');
const src = fs.readFileSync('build-guides.js', 'utf8');
// ejemplo de bloque con gear4music
const m = /\n  \d+: \{[\s\S]{0,700}?gear4music[\s\S]{0,400}?\n  \},/.exec(src);
console.log('--- ejemplo TEST con g4m ---');
console.log(m ? m[0].slice(0, 900) : 'ninguno');
// catalogo ejemplo
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
const g = arr.find(x => x.stores && x.stores.gear4music);
console.log('--- ejemplo catalogo g4m ---');
console.log(JSON.stringify(g.stores, null, 1));