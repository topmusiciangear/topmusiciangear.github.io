const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
let bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
const oldEntry = '1031: {prices:{pluginboutique:"€462.86"},pbCur:{us:"$459.00",uk:"£365.32"}},\n';
const newEntry = '1040: {prices:{pluginboutique:"€150.25"},pbCur:{us:"$149.00",uk:"£118.59"}},\n';
if (!bg.includes(oldEntry)) { console.log('ENTRADA 1031 NO ENCONTRADA'); process.exit(1); }
bg = bg.split(oldEntry).join(newEntry);
fs.writeFileSync(B + 'build-guides.js', bg, 'utf8');
try { new Function(bg); console.log('1031->1040 OK, SYNTAX OK'); }
catch (e) { console.log('SYNTAX ERROR: ' + e.message); process.exit(1); }
