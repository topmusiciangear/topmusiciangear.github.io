const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
let bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
let n = 0;
// 120 (formato multilinea)
const old120m = '      musicstore: "€83.20",\n      andertons: "£79.00"';
if (bg.includes(old120m)) { bg = bg.split(old120m).join('      musicstore: "€99.00",\n      andertons: "£74.00"'); n++; }
else console.log('120 MULTILINEA NO ENCONTRADA');
// 1032 (formato una linea)
const old1032 = '1032: {prices:{pluginboutique:"€99.83",zzounds:"$99.00",gear4music:"£74.99",amazon:"$119.00",musicstore:"€83.20",andertons:"£79.00"}';
const new1032 = '1032: {prices:{pluginboutique:"€99.83",zzounds:"$99.00",gear4music:"£74.99",amazon:"$119.00",musicstore:"€99.00",andertons:"£74.00"}';
if (bg.includes(old1032)) { bg = bg.split(old1032).join(new1032); n++; }
else console.log('1032 NO ENCONTRADA');
fs.writeFileSync(B + 'build-guides.js', bg, 'utf8');
try { new Function(bg); console.log('entradas actualizadas: ' + n + ', SYNTAX OK'); }
catch (e) { console.log('SYNTAX ERROR: ' + e.message); process.exit(1); }
// prosa con precios viejos?
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
['83.20', '83,20'].forEach(k => {
  guides.forEach(g => { if (JSON.stringify(g).includes(k)) console.log('prosa con ' + k + ' en: ' + g.id); });
});
console.log('chequeo prosa listo');
