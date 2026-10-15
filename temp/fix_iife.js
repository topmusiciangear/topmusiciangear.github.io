const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/js/app.min.js';
let s = fs.readFileSync(F, 'utf8');

const MALO = '},250)}),var tmgPSF=';
if (!s.includes(MALO)) { console.log('BLOQUE NO ENCONTRADO'); process.exit(1); }
// del "var" hasta ",document.querySelectorAll(\".nav-link" -> envolver en IIFE
const FIN = ',document.querySelectorAll(".nav-link[data-nav]")';
const i0 = s.indexOf(MALO) + '},250)}),'.length;
const i1 = s.indexOf(FIN, i0);
const cuerpo = s.slice(i0, i1);
const iife = '(function(){' + cuerpo + '})(),';
s = s.slice(0, i0) + iife + s.slice(i1 + 1);
fs.writeFileSync(F, s, 'utf8');
console.log('envuelto en IIFE');

try { new Function(s); console.log('sintaxis app.min.js: OK'); }
catch (e) { console.log('SINTAXIS ROTA: ' + e.message); }
console.log('fragmento: ' + s.slice(i0 - 20, i0 + 120).replace(/\s+/g, ' '));
