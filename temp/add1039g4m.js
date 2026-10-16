const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const p = products.find(x => x.id === 1039);
console.log('1039 stores antes: ' + JSON.stringify(p.stores));
p.stores.gear4music = 'https://www.gear4music.com/Recording-and-Computers/Synchro-Arts-RePitch-2-Standard-VocAlign-Pro-Bundle/7MWH';
fs.writeFileSync(B + 'data/products.json', JSON.stringify(products, null, 2), 'utf8');

let bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
const oldE = '1039: {prices:{pluginboutique:"€251.09"},pbCur:{us:"$249.00",uk:"£198.18"}},\n';
const newE = '1039: {prices:{pluginboutique:"€251.09",gear4music:"£215.00"},pbCur:{us:"$249.00",uk:"£198.18"}},\n';
if (!bg.includes(oldE)) { console.log('ENTRADA 1039 NO ENCONTRADA, busco variante'); process.exit(1); }
bg = bg.split(oldE).join(newE);
fs.writeFileSync(B + 'build-guides.js', bg, 'utf8');
try { new Function(bg); console.log('1039 G4M £215 OK'); }
catch (e) { console.log('SYNTAX ERROR: ' + e.message); process.exit(1); }
