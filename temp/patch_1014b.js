const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';

// ---- products.json: Music Store para Kontakt 8 (1014) ----
const pp = B + 'data/products.json';
const products = JSON.parse(fs.readFileSync(pp, 'utf8'));
const p = products.find(x => x.id === 1014);
if (!p) { console.log('1014 no existe'); process.exit(1); }
p.stores.musicstore = 'https://www.musicstore.com/en_OE/EUR/Native-Instruments-Kontakt-8/art-PCM0018134-000';
fs.writeFileSync(pp, JSON.stringify(products, null, 2), 'utf8');
console.log('1014 stores=' + Object.keys(p.stores).join(', '));
console.log('  MS: ' + p.stores.musicstore);

// ---- build-guides.js: precio Music Store EUR con IVA ----
let bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
const oldLine = '\n1014: {prices:{pluginboutique:"\u20AC301.51",gear4music:"\u00A3269.50"},pbCur:{us:"$299.00",uk:"\u00A3237.97"}},';
const newLine = '\n1014: {prices:{pluginboutique:"\u20AC301.51",gear4music:"\u00A3269.50",musicstore:"\u20AC295.00"},pbCur:{us:"$299.00",uk:"\u00A3237.97"}},';
if (!bg.includes(oldLine)) { console.log('linea 1014 NO encontrada'); process.exit(1); }
if (bg.indexOf(oldLine) !== bg.lastIndexOf(oldLine)) { console.log('AMBIGUA'); process.exit(1); }
bg = bg.replace(oldLine, newLine);
fs.writeFileSync(B + 'build-guides.js', bg, 'utf8');
console.log('TEST_SHOP_BTN 1014 -> ' + newLine.trim());