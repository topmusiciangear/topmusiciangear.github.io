// Fusion 517 -> 286 (duplicado AT2040USB). Se conserva 286.
const fs = require('fs');
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const a = P.find(p => p.id === 517);
const b = P.find(p => p.id === 286);
if (!a || !b) throw new Error('falta 286 o 517');
// 1. 286 hereda imagen G4M + descripciones nuevas, sin exclusiones
b.img = a.img;
b.desc = a.desc;
b.desc_es = a.desc_es;
delete b.excludeStores;
// 2. creators apunta a 286
const g = G.find(x => x.id === 'mics-for-creators');
g.sections[0].products = g.sections[0].products.map(id => (id === 517 ? 286 : id));
// 3. borrar 517 del catalogo
const P2 = P.filter(p => p.id !== 517);
fs.writeFileSync('data/products.json', JSON.stringify(P2, null, 2) + '\n');
// 4. borrar entrada BTN 517
let s = fs.readFileSync('build-guides.js', 'utf8');
const EOL = '\r\n';
const blk = '  517: {' + EOL + '    prices: {' + EOL + '      gear4music: "£135.50",' + EOL + '      amazon: "$159.00",' + EOL + '      musicstore: "€145.00",' + EOL + '      zzounds: "$159.00",' + EOL + '      andertons: "£129.00"' + EOL + '    },' + EOL + '    urls: {' + EOL + '      zzounds: "https://www.zzounds.com/item--AUDAT2040USB"' + EOL + '    }' + EOL + '  },' + EOL;
if (s.indexOf(blk) < 0) throw new Error('bloque BTN 517 no encontrado tal cual');
s = s.split(blk).join('');
fs.writeFileSync('build-guides.js', s);
fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
// verificacion
const P3 = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const G3 = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const b3 = fs.readFileSync('build-guides.js', 'utf8');
console.log('517 en catalogo: ' + P3.some(p => p.id === 517));
console.log('286 img G4M: ' + P3.find(p => p.id === 286).img.includes('r2.gear4music'));
console.log('286 exclude: ' + JSON.stringify(P3.find(p => p.id === 286).excludeStores));
console.log('creators usa 286: ' + G3.find(x => x.id === 'mics-for-creators').sections[0].products.includes(286));
console.log('BTN 517 existe: ' + /^\s*517:\s*\{/m.test(b3));
const i = b3.indexOf('\n  518: {');
console.log('contexto 518: ' + JSON.stringify(b3.slice(i - 60, i + 30)));
