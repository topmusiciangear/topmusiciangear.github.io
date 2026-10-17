const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const eur = 89.00;
const us = (eur / 1.0084).toFixed(2);
const uk = ((eur / 1.0084) * 0.7959).toFixed(2);
console.log('EUR ' + eur.toFixed(2) + ' -> US $' + us + ' | UK \u00A3' + uk);

let bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
const oldLine = '\n1013: {prices:{pluginboutique:"\u20AC301.51"},pbCur:{us:"$299.00",uk:"\u00A3237.97"}},';
const newLine = '\n1013: {prices:{pluginboutique:"\u20AC' + eur.toFixed(2) + '"},pbCur:{us:"$' + us + '",uk:"\u00A3' + uk + '"}},';
if (!bg.includes(oldLine)) { console.log('linea 1013 NO encontrada'); process.exit(1); }
if (bg.indexOf(oldLine) !== bg.lastIndexOf(oldLine)) { console.log('AMBIGUA'); process.exit(1); }
bg = bg.replace(oldLine, newLine);
fs.writeFileSync(B + 'build-guides.js', bg, 'utf8');
console.log('OK -> ' + newLine.trim());