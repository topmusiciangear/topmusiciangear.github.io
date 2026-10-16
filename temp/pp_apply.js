const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const p = products.find(x => x.id === 1003);
const clean = 'https://r2.gear4music.com/media/83/839919/1200/preview.jpg';
p.image = clean;
p.img = clean;
p.stores.andertons = 'https://www.andertons.co.uk/kilohearts-phase-plant-modular-synth-esd/';
fs.writeFileSync(B + 'data/products.json', JSON.stringify(products, null, 2), 'utf8');
const us = (184 / 1.0084).toFixed(2);
const uk = (us * 0.7959).toFixed(2);
let bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
const oldE = '1003: {prices:{pluginboutique:"€200.67"},pbCur:{us:"$199.00",uk:"£158.38"}},\n';
const newE = '1003: {prices:{pluginboutique:"€184.00",andertons:"£199.00"},pbCur:{us:"$' + us + '",uk:"£' + uk + '"}},\n';
if (!bg.includes(oldE)) { console.log('ENTRADA 1003 NO ENCONTRADA'); process.exit(1); }
bg = bg.split(oldE).join(newE);
fs.writeFileSync(B + 'build-guides.js', bg, 'utf8');
new Function(bg);
console.log('1003 OK: foto + Andertons 199 + PB 184 geo ' + us + '/' + uk);
