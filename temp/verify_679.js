const fs = require('fs');
const h = fs.readFileSync('guides/best-interface.html', 'utf8');
const checks = [
  ['G4M 2SMV', h.includes('2SMV')],
  ['zz IKMAXEIO', h.includes('IKMAXEIO')],
  ['Andertons axe', h.includes('axe-i-o-usb-audio-interface')],
  ['MS PCM0016881', h.includes('PCM0016881-000')]
];
let ok = 0;
checks.forEach(([n, v]) => { if (v) ok++; console.log((v ? 'OK  ' : 'FALLO ') + n); });
console.log(ok + '/' + checks.length);
