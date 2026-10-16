const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const p30 = products.find(x => x.id === 30);
const p = products.find(x => x.id === 1033);
p.img = p30.img;
p.image = p30.img;
p.stores.gear4music = p30.stores.gear4music;
p.stores.andertons = p30.stores.andertons;
p.stores.musicstore = p30.stores.musicstore;
fs.writeFileSync(B + 'data/products.json', JSON.stringify(products, null, 2), 'utf8');
let bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
const oldE = '1033: {prices:{pluginboutique:"€503.19"},pbCur:{us:"$499.00",uk:"£397.15"}},\n';
const newE = '1033: {prices:{pluginboutique:"€553.58",andertons:"£479.00",gear4music:"£479.00",musicstore:"€452.90"},pbCur:{us:"$499.00",uk:"£397.15"}},\n';
if (!bg.includes(oldE)) { console.log('ENTRADA 1033 NO ENCONTRADA'); process.exit(1); }
bg = bg.split(oldE).join(newE);
fs.writeFileSync(B + 'build-guides.js', bg, 'utf8');
new Function(bg);
console.log('1033 hereda 30 OK');
