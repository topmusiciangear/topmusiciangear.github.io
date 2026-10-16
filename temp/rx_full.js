const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const p = products.find(x => x.id === 1025);
const clean = 'https://r2.gear4music.com/media/137/1374743/1200/preview.jpg';
p.image = clean;
p.img = clean;
p.stores.gear4music = 'https://www.gear4music.com/Recording-and-Computers/iZotope-RX-12-Standard/82LG';
fs.writeFileSync(B + 'data/products.json', JSON.stringify(products, null, 2), 'utf8');
const us = (442 / 1.0084).toFixed(2);
const uk = (us * 0.7959).toFixed(2);
let bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
const oldE = '1025: {prices:{pluginboutique:"€402.35",andertons:"£389.00"},pbCur:{us:"$399.00",uk:"£317.56"}},\n';
const newE = '1025: {prices:{pluginboutique:"€442.00",gear4music:"£389.00",andertons:"£389.00"},pbCur:{us:"$' + us + '",uk:"£' + uk + '"}},\n';
if (!bg.includes(oldE)) { console.log('ENTRADA 1025 NO ENCONTRADA'); process.exit(1); }
bg = bg.split(oldE).join(newE);
fs.writeFileSync(B + 'build-guides.js', bg, 'utf8');
new Function(bg);
console.log('1025 OK: PB 442 geo ' + us + '/' + uk + ' + G4M 389');
