const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const f = B + 'build-guides.js';
let s = fs.readFileSync(f, 'utf8');

// Cambiar color de "Nota"/"Score" de #AACDFA a #fff
s = s.replace(
  "color:#AACDFA;font-weight:800;font-size:calc(var(--badge-size)*0.11)",
  "color:#fff;font-weight:800;font-size:calc(var(--badge-size)*0.11)"
);

fs.writeFileSync(f, s, 'utf8');
console.log('Color de Nota/Score cambiado a blanco (#fff)');