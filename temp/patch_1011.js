const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';

const PB_EUR = 69.00;
const us = (PB_EUR / 1.0084).toFixed(2);
const uk = ((PB_EUR / 1.0084) * 0.7959).toFixed(2);
console.log('PB EUR ' + PB_EUR.toFixed(2) + ' -> US $' + us + ' | UK \u00A3' + uk);

const IMG = 'https://r2.gear4music.com/media/145/1452002/1200/preview.jpg';

// ---- 1. producto 1011: foto + Gear4music ----
const pp = B + 'data/products.json';
const products = JSON.parse(fs.readFileSync(pp, 'utf8'));
const p = products.find(x => x.id === 1011);
if (!p) { console.log('1011 no existe'); process.exit(1); }
p.img = IMG;
p.image = IMG;
p.stores.gear4music = 'https://www.gear4music.com/Recording-and-Computers/Audiomodern-Riffer-4/43YY';
fs.writeFileSync(pp, JSON.stringify(products, null, 2), 'utf8');
console.log('1011 img=' + p.img);
console.log('1011 stores=' + Object.keys(p.stores).join(', '));

// ---- 2. TEST_SHOP_BTN: precio G4M + PB real ----
let bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
const oldLine = '\n1011: {prices:{pluginboutique:"\u20AC79.66"},pbCur:{us:"$79.00",uk:"\u00A362.88"}},';
const newLine = '\n1011: {prices:{pluginboutique:"\u20AC' + PB_EUR.toFixed(2) +
  '",gear4music:"\u00A339.00"},pbCur:{us:"$' + us + '",uk:"\u00A3' + uk + '"}},';
if (!bg.includes(oldLine)) { console.log('linea 1011 NO encontrada'); process.exit(1); }
if (bg.indexOf(oldLine) !== bg.lastIndexOf(oldLine)) { console.log('AMBIGUA'); process.exit(1); }
bg = bg.replace(oldLine, newLine);
fs.writeFileSync(B + 'build-guides.js', bg, 'utf8');
console.log('TEST_SHOP_BTN 1011 -> ' + newLine.trim());

// ---- 3. portada de la guia ----
const gp = B + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gp, 'utf8'));
const g = guides.find(x => x.id === 'best-midi-theory-plugins');
if (!g) { console.log('guia no encontrada'); process.exit(1); }
g.image = IMG;
fs.writeFileSync(gp, JSON.stringify(guides, null, 2), 'utf8');
console.log('portada best-midi-theory-plugins -> ' + g.image);