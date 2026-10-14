const fs = require('fs');
const h = fs.readFileSync('guides/premium-interfaces.html', 'utf8');
const he = fs.readFileSync('guides/premium-interfaces_es.html', 'utf8');
const checks = [
  ['blurb Horizon nuevo EN', h.includes('minus the console')],
  ['blurb Orion nuevo EN', h.includes('most I/O per pound')],
  ['blurb Horizon nuevo ES', he.includes('sin la consola')],
  ['blurb Orion nuevo ES', he.includes('mayor E/S por libra')],
  ['530 fuera EN', !h.includes('530')],
  ['530 fuera ES', !he.includes('530')],
  ['32 profiles EN', h.includes('32 profiles')],
  ['FAQ DSP EN', h.includes('Do I need onboard DSP')],
  ['FAQ DSP ES', he.includes('Necesito DSP a bordo')],
  ['mics FAQ fuera', !h.includes('How many mics can I plug')]
];
let ok = 0;
checks.forEach(([n, v]) => { if (v) ok++; console.log((v ? 'OK  ' : 'FALLO ') + n); });
console.log(ok + '/' + checks.length);
