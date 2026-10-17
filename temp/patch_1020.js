const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const EUR = 131.00;
const us = (EUR / 1.0084).toFixed(2);
const uk = ((EUR / 1.0084) * 0.7959).toFixed(2);
const FOTO = 'https://banners.pluginboutique.com/5g25exhl6gnvjuf00ezqtz9zgjca';

const pp = B + 'data/products.json';
const products = JSON.parse(fs.readFileSync(pp, 'utf8'));
const p = products.find(x => x.id === 1020);
if (!p) { console.log('1020 no existe'); process.exit(1); }
p.img = FOTO; p.image = FOTO;
fs.writeFileSync(pp, JSON.stringify(products, null, 2), 'utf8');
console.log('1020 img=' + p.img);

let bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
const viejo = '\n1020: {prices:{pluginboutique:"\u20AC200.67"},pbCur:{us:"$199.00",uk:"\u00A3158.38"}},';
const nuevo = '\n1020: {prices:{pluginboutique:"\u20AC' + EUR.toFixed(2) + '"},pbCur:{us:"$' + us + '",uk:"\u00A3' + uk + '"}},';
if (!bg.includes(viejo)) { console.log('linea 1020 NO encontrada'); process.exit(1); }
if (bg.indexOf(viejo) !== bg.lastIndexOf(viejo)) { console.log('AMBIGUA'); process.exit(1); }
bg = bg.replace(viejo, nuevo);
fs.writeFileSync(B + 'build-guides.js', bg, 'utf8');
console.log('TEST_SHOP_BTN 1020 -> ' + nuevo.trim());
console.log('PB geo: EU \u20AC' + EUR.toFixed(2) + ' | US $' + us + ' | UK \u00A3' + uk);