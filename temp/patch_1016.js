const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';

// ---- products.json: foto G4M + Gear4music (con precio) + Music Store (sin precio) ----
const pp = B + 'data/products.json';
const products = JSON.parse(fs.readFileSync(pp, 'utf8'));
const p = products.find(x => x.id === 1016);
if (!p) { console.log('1016 no existe'); process.exit(1); }
p.img = 'https://r2.gear4music.com/media/68/687753/1200/preview.jpg';
p.image = p.img;
p.stores.gear4music = 'https://www.gear4music.com/Recording-and-Computers/XLN-Audio-Addictive-Keys-Studio-Grand/3YJM';
p.stores.musicstore = 'https://www.musicstore.com/en_OE/EUR/XLN-Audio-Addictive-Keys-Studio-Grand/art-PCM0013375-000';
fs.writeFileSync(pp, JSON.stringify(products, null, 2), 'utf8');
console.log('1016 img=' + p.img);
console.log('1016 stores=' + Object.keys(p.stores).join(', '));

// ---- build-guides.js: precio Gear4Music ----
let bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
const oldLine = '\n1016: {prices:{pluginboutique:"\u20AC99.83"},pbCur:{us:"$99.00",uk:"\u00A378.79"}},';
const newLine = '\n1016: {prices:{pluginboutique:"\u20AC99.83",gear4music:"\u00A388.00"},pbCur:{us:"$99.00",uk:"\u00A378.79"}},';
if (!bg.includes(oldLine)) { console.log('linea 1016 NO encontrada'); process.exit(1); }
if (bg.indexOf(oldLine) !== bg.lastIndexOf(oldLine)) { console.log('AMBIGUA'); process.exit(1); }
bg = bg.replace(oldLine, newLine);
fs.writeFileSync(B + 'build-guides.js', bg, 'utf8');
console.log('TEST_SHOP_BTN 1016 -> ' + newLine.trim());