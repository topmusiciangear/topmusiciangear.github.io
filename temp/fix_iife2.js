const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/js/app.min.js';
let s = fs.readFileSync(F, 'utf8');

const A = '},250)}}),var tmgPSF=';
const B = 'tmgSyncSearchClear(),document.querySelectorAll(".nav-link[data-nav]")';
if (!s.includes(A) || !s.includes(B)) { console.log('ANCLAS NO ENCONTRADAS'); process.exit(1); }

s = s.replace(A, '},250)}),(function(){var tmgPSF=');
s = s.replace(B, 'tmgSyncSearchClear();})(),document.querySelectorAll(".nav-link[data-nav]")');
fs.writeFileSync(F, s, 'utf8');

try { new Function(s); console.log('sintaxis app.min.js: OK'); }
catch (e) { console.log('SINTAXIS ROTA: ' + e.message); }
const i = s.indexOf('tmgPSF=');
console.log('inicio: ' + s.slice(i - 30, i + 60).replace(/\s+/g, ' '));
const j = s.indexOf('})(),document.querySelectorAll');
console.log('cierre: ' + s.slice(j - 60, j + 50).replace(/\s+/g, ' '));
