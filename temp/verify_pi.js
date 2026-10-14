const fs = require('fs');
const h = fs.readFileSync('guides/premium-interfaces.html', 'utf8');
const he = fs.readFileSync('guides/premium-interfaces_es.html', 'utf8');
const checks = [
  ['Horizon review EN', h.includes('Analogue Character, Native Speed')],
  ['Orion review EN', h.includes('The 1U Hybrid Hub')],
  ['Horizon FAQ EN', h.includes('Best Console Front-End for Tracking?')],
  ['Orion FAQ EN', h.includes('Best DSP Hub for Hybrid Studios?')],
  ['Horizon FAQ ES', he.includes('mejor frontal de consola')],
  ['Orion FAQ ES', he.includes('mejor hub DSP')],
  ['Apogee fuera EN', !h.includes('Apogee')],
  ['Lynx fuera EN', !h.includes('Lynx')],
  ['Galaxy fuera EN', !h.includes('Galaxy')],
  ['Apogee fuera ES', !he.includes('Apogee')],
  ['Template fuera', !h.includes('A Closer Look')],
  ['Tabla 133dB', h.includes('133dB')],
  ['Tabla 50 FX', h.includes('50 FX')],
  ['Tabla £2,115', h.includes('2,115')],
  ['Tabla ~£2,039', h.includes('2,039')],
  ['img Horizon', h.includes('horizon8p-angled')],
  ['img Orion', h.includes('Orion_Studio_SC_Front')]
];
let ok = 0;
checks.forEach(([n, v]) => { if (v) ok++; console.log((v ? 'OK  ' : 'FALLO ') + n); });
console.log(ok + '/' + checks.length);
