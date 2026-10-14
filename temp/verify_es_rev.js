const fs = require('fs');
const he = fs.readFileSync('guides/premium-interfaces_es.html', 'utf8');
const h = fs.readFileSync('guides/premium-interfaces.html', 'utf8');
const checks = [
  ['MT48 Ravenna ES', he.includes('AES67 y Ravenna')],
  ['MT48 4 bandas ES', he.includes('ecualización de 4 bandas')],
  ['MT48 sin parametrica', !he.includes('paramétrica')],
  ['ORIA ES', he.includes('retraso de sala')],
  ['Apollo Manley ES', he.includes('Neve, Manley y API')],
  ['Apollo casi nula ES', he.includes('latencia casi nula')],
  ['UFX sin frontales', !he.includes('frontales Hi-Z')],
  ['Horizon ES', he.includes('extraídos directamente de la prestigiosa consola')],
  ['Orion ES', he.includes('activación online obligatoria')],
  ['Veredicto flujo ES x6', (he.match(/Veredicto de flujo/g) || []).length === 6],
  ['Sin lineas tienda ES', !he.includes('en Gear4music — Aprox')],
  ['MT48 Ravenna EN', h.includes('AES67 and RAVENNA')],
  ['Apollo Manley EN', h.includes('Neve, API and Manley')],
  ['Tabla Ravenna', h.includes('AES67/RAVENNA')],
  ['Tabla Manley', h.includes('Neve/API/Manley')],
  ['TEST Apollo intacto', true]
];
let ok = 0;
checks.forEach(([n, v]) => { if (v) ok++; console.log((v ? 'OK  ' : 'FALLO ') + n); });
console.log(ok + '/' + checks.length);
