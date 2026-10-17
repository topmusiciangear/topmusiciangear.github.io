const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';

const PB_EUR = 150.00;
const us = (PB_EUR / 1.0084).toFixed(2);
const uk = ((PB_EUR / 1.0084) * 0.7959).toFixed(2);
console.log('PB EUR ' + PB_EUR.toFixed(2) + ' -> US $' + us + ' | UK \u00A3' + uk);

// ---- products.json ----
const pp = B + 'data/products.json';
const products = JSON.parse(fs.readFileSync(pp, 'utf8'));
const p = products.find(x => x.id === 1018);
if (!p) { console.log('1018 no existe'); process.exit(1); }
p.img = 'https://r2.gear4music.com/media/91/914093/1200/preview.jpg';
p.image = p.img;
p.stores.gear4music = 'https://www.gear4music.com/Recording-and-Computers/Arturia-Augmented-Grand-Piano/5GDL';
p.stores.andertons = 'https://www.andertons.co.uk/arturia-augmented-grand-piano/';
p.stores.zzounds = 'https://www.zzounds.com/item--ARAAUGGRANDPIANO';
fs.writeFileSync(pp, JSON.stringify(products, null, 2), 'utf8');
console.log('1018 img=' + p.img);
console.log('1018 stores=' + Object.keys(p.stores).join(', '));

// ---- build-guides.js ----
let bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
const oldLine = '\n1018: {prices:{pluginboutique:"\u20AC99.83"},pbCur:{us:"$99.00",uk:"\u00A378.79"}},';
const newLine = '\n1018: {prices:{pluginboutique:"\u20AC' + PB_EUR.toFixed(2) +
  '",gear4music:"\u00A3104.00",andertons:"\u00A3104.00",zzounds:"$149.00"},pbCur:{us:"$' + us + '",uk:"\u00A3' + uk + '"}},';
if (!bg.includes(oldLine)) { console.log('linea 1018 NO encontrada'); process.exit(1); }
if (bg.indexOf(oldLine) !== bg.lastIndexOf(oldLine)) { console.log('AMBIGUA'); process.exit(1); }
bg = bg.replace(oldLine, newLine);
fs.writeFileSync(B + 'build-guides.js', bg, 'utf8');
console.log('TEST_SHOP_BTN 1018 -> ' + newLine.trim());