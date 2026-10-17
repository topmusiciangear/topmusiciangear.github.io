const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const EUR = 64.00;
const us = (EUR / 1.0084).toFixed(2);
const uk = ((EUR / 1.0084) * 0.7959).toFixed(2);

let bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
const viejo = '\n1022: {prices:{pluginboutique:"\u20AC70.58"},pbCur:{us:"$69.99",uk:"\u00A355.71"}},';
const nuevo = '\n1022: {prices:{pluginboutique:"\u20AC' + EUR.toFixed(2) + '"},pbCur:{us:"$' + us + '",uk:"\u00A3' + uk + '"}},';
if (!bg.includes(viejo)) { console.log('linea 1022 NO encontrada'); process.exit(1); }
if (bg.indexOf(viejo) !== bg.lastIndexOf(viejo)) { console.log('AMBIGUA'); process.exit(1); }
bg = bg.replace(viejo, nuevo);
fs.writeFileSync(B + 'build-guides.js', bg, 'utf8');
console.log('TEST_SHOP_BTN 1022 -> ' + nuevo.trim());
console.log('PB geo: EU \u20AC' + EUR.toFixed(2) + ' | US $' + us + ' | UK \u00A3' + uk);