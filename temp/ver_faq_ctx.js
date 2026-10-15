const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const s = fs.readFileSync(BASE + 'build-guides.js', 'utf8');
const lineas = s.split('\n');

// que bloque es el de la linea 6268
for (let i = 6255; i < 6275; i++) {
  const l = (lineas[i] || '').trim();
  console.log((i + 1) + ': ' + l.slice(0, 150));
}
