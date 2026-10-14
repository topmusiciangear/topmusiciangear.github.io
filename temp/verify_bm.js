const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/guides/';
const h = fs.readFileSync(B + 'best-microphone.html', 'utf8');
const he = fs.readFileSync(B + 'best-microphone_es.html', 'utf8');
const checks = [
  ['11 columnas', (h.match(/Lewitt LCT 240 PRO/g) || []).length >= 3],
  ['240 PRO seccion EN', h.includes('Modern Clarity for $149')],
  ['440 seccion EN', h.includes('Giant-Killer')],
  ['Origin seccion EN', h.includes('Built-In Pop Filter')],
  ['TLM102 seccion EN', h.includes('Elite Neumann Sound for $699')],
  ['240 PRO seccion ES', he.includes('claridad moderna por $149')],
  ['Origin seccion ES', he.includes('acero británico con antipop')],
  ['TLM102 seccion ES', he.includes('élite por $699')],
  ['SM58 fuera EN', !h.includes('SM58')],
  ['MV7+ fuera EN', !h.includes('MV7+')],
  ['R-121 fuera EN', !h.includes('R-121')],
  ['USB-X fuera EN', !h.includes('AT2020USB-X')],
  ['SM58 fuera ES', !he.includes('SM58')],
  ['R-121 fuera ES', !he.includes('R-121')],
];
let ok = 0;
checks.forEach(([n, v]) => { if (v) ok++; console.log((v ? 'OK  ' : 'FALLO ') + n); });
console.log(ok + '/' + checks.length);