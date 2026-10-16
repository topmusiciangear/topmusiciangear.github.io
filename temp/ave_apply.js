const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const p = products.find(x => x.id === 1004);
const banner = 'https://banners.pluginboutique.com/ap79glkmzpg1fsfxjzf8jl0bx2f4';
p.image = banner;
p.img = banner;
fs.writeFileSync(B + 'data/products.json', JSON.stringify(products, null, 2), 'utf8');
const us = (226 / 1.0084).toFixed(2);
const uk = (us * 0.7959).toFixed(2);
let bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
const oldE = '1004: {prices:{pluginboutique:"€251.09"},pbCur:{us:"$249.00",uk:"£198.18"}},\n';
const newE = '1004: {prices:{pluginboutique:"€226.00"},pbCur:{us:"$' + us + '",uk:"£' + uk + '"}},\n';
if (!bg.includes(oldE)) { console.log('ENTRADA 1004 NO ENCONTRADA'); process.exit(1); }
bg = bg.split(oldE).join(newE);
fs.writeFileSync(B + 'build-guides.js', bg, 'utf8');
new Function(bg);
console.log('1004 OK: foto + PB 226 geo ' + us + '/' + uk);
