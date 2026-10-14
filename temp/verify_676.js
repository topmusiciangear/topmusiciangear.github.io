const fs = require('fs');
const h = fs.readFileSync('guides/premium-interfaces.html', 'utf8');
const checks = [
  ['img G4M 1428719', h.includes('142/1428719')],
  ['img oficial fuera', !h.includes('horizon8p-angled')],
  ['G4M 8EJC', h.includes('8EJC')],
  ['zz ADIHORIZON8P', h.includes('ADIHORIZON8P')],
  ['Andertons horizon', h.includes('audient-horizon-8p-audio-interface')],
  ['MS PCM0019045', h.includes('PCM0019045')]
];
let ok = 0;
checks.forEach(([n, v]) => { if (v) ok++; console.log((v ? 'OK  ' : 'FALLO ') + n); });
console.log(ok + '/' + checks.length);
