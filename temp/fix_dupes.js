const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
let bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
let n38 = 0, idx = -1;
while ((idx = bg.indexOf('1038:', idx + 1)) > -1) n38++;
let n39 = 0; idx = -1;
while ((idx = bg.indexOf('1039:', idx + 1)) > -1) n39++;
console.log('1038: x' + n38 + ' | 1039: x' + n39);
const oldBlock = '1037: {prices:{pluginboutique:"$209.99"}},\n  1038: {prices:{pluginboutique:"$149.00"}},\n  1039: {prices:{pluginboutique:"$249.00"}},\n};';
if (!bg.includes(oldBlock)) { console.log('BLOQUE NO ENCONTRADO (revisar saltos de linea)'); process.exit(1); }
bg = bg.split(oldBlock).join('};');
fs.writeFileSync(B + 'build-guides.js', bg, 'utf8');
console.log('DUPES ELIMINADOS');
try { new Function(bg); console.log('SYNTAX OK'); }
catch (e) { console.log('SYNTAX ERROR: ' + e.message); }
