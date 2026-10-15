const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/js/app.min.js';
let s = fs.readFileSync(F, 'utf8');
const iV = s.indexOf('var tmgPSF=');
console.log('indice var tmgPSF: ' + iV);
console.log('contexto: ' + s.slice(Math.max(0, iV - 40), iV + 60).replace(/\s+/g, ' '));
