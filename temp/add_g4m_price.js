const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
// ejemplo: entrada con pluginboutique + otra tienda
const bg0 = fs.readFileSync(B + 'build-guides.js', 'utf8');
const m = bg0.match(/[0-9]+: \{prices:\{pluginboutique:"[^"]+",[a-z]+:"[^"]+"\}[^}]*pbCur[^}]*\}[^}]*\},/);
console.log('ejemplo PB+otra: ' + (m ? m[0].slice(0, 220) : 'ninguna'));
// 1. products.json: añadir gear4music a 1040
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const p = products.find(x => x.id === 1040);
p.stores.gear4music = 'https://www.gear4music.com/Recording-and-Computers/Synchro-Arts-RePitch-2-Standard/7MWD';
fs.writeFileSync(B + 'data/products.json', JSON.stringify(products, null, 2), 'utf8');
console.log('1040.stores: ' + JSON.stringify(p.stores));
// 2. TEST: añadir gear4music £125.00
let bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
const oldE = '1040: {prices:{pluginboutique:"€150.25"},pbCur:{us:"$149.00",uk:"£118.59"}},\n';
const newE = '1040: {prices:{pluginboutique:"€150.25",gear4music:"£125.00"},pbCur:{us:"$149.00",uk:"£118.59"}},\n';
if (!bg.includes(oldE)) { console.log('ENTRADA 1040 NO ENCONTRADA'); process.exit(1); }
bg = bg.split(oldE).join(newE);
fs.writeFileSync(B + 'build-guides.js', bg, 'utf8');
try { new Function(bg); console.log('G4M £125 añadido, SYNTAX OK'); }
catch (e) { console.log('SYNTAX ERROR: ' + e.message); process.exit(1); }
