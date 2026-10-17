const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const EUR = 120.00;
const us = (EUR / 1.0084).toFixed(2);
const uk = ((EUR / 1.0084) * 0.7959).toFixed(2);

let bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
const viejo = '\n1008: {prices:{pluginboutique:"\u20AC129.08"},pbCur:{us:"$128.00",uk:"\u00A3101.88"}},';
const nuevo = '\n1008: {prices:{pluginboutique:"\u20AC' + EUR.toFixed(2) + '"},pbCur:{us:"$' + us + '",uk:"\u00A3' + uk + '"}},';
if (!bg.includes(viejo)) { console.log('linea 1008 NO encontrada'); process.exit(1); }
if (bg.indexOf(viejo) !== bg.lastIndexOf(viejo)) { console.log('AMBIGUA'); process.exit(1); }
bg = bg.replace(viejo, nuevo);
fs.writeFileSync(B + 'build-guides.js', bg, 'utf8');
console.log('TEST_SHOP_BTN 1008 -> ' + nuevo.trim());

// catalogo: el price canonico lo ajusta el usuario? solo informativo
const pp = B + 'data/products.json';
const products = JSON.parse(fs.readFileSync(pp, 'utf8'));
const p = products.find(x => x.id === 1008);
console.log('\nproducts.json 1008 price (lista oficial, NO se toca): ' + p.price);
console.log('PB real ahora: \u20AC' + EUR.toFixed(2) + ' | US $' + us + ' | UK \u00A3' + uk);