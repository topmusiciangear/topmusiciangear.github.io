const fs = require('fs');
const d = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/starter-studio_es.html', 'utf8');
const idx = d.indexOf('data-aff="https://www.awin1.com');
console.log(idx > -1 ? d.slice(idx, idx + 100) : 'SIN data-aff awin');
console.log('data-aff totales: ' + (d.match(/data-aff=/g) || []).length);
const a = d.indexOf('data-aff="https://www.anrdoezrs.net');
console.log(a > -1 ? d.slice(a, a + 110) : 'SIN data-aff CJ');
