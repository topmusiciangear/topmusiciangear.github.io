const fs = require('fs');
const h = fs.readFileSync('guides/fender-bass-guide.html', 'utf8');
const he = fs.readFileSync('guides/fender-bass-guide_es.html', 'utf8');
const checks = [
  ['Player II P rolled edges EN', h.includes('maple or rosewood, rolled edges')],
  ['Player II J rolled edges EN', h.includes('maple or rosewood, rolled edges')],
  ['Player II EN 2 veces', (h.match(/maple or rosewood, rolled edges/g) || []).length === 2],
  ['Player II ES 2 veces', (he.match(/arce o palisandro, bordes redondeados/g) || []).length === 2],
  ['Ultra II activo/pasivo EN', h.includes('Active/Passive (S-1 switch on volume)')],
  ['Ultra II activo/pasivo ES', he.includes('Activo/Pasivo (S-1 en el volumen)')],
  ['Ultra II medios 325/750', h.includes('325/750 Hz') && he.includes('325/750 Hz')],
  ['CV60s sigue en Poplar (NO cambiado)', h.includes('Poplar') && !/Nyatoh/i.test(h)],
  ['sin "Active (S-1)" viejo', !h.includes('Active (S-1)')],
  ['sin "20, arce" en Player II', (he.match(/20, arce(?![ o])/g) || []).length === 0]
];
let ok = 0;
checks.forEach(([n, v]) => { if (v) ok++; console.log((v ? 'OK  ' : 'FALLO ') + n); });
console.log(ok + '/' + checks.length);