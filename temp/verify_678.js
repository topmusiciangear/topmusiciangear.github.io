const fs = require('fs');
const h = fs.readFileSync('guides/streaming-interfaces.html', 'utf8');
const checks = [
  ['G4M 7QPI', h.includes('7QPI')],
  ['zz YAMURX44V', h.includes('YAMURX44V')],
  ['Andertons urx44v', h.includes('yamaha-urx44v-b-premium-audio-interface')],
  ['MS PCM0018734', h.includes('PCM0018734-000')]
];
let ok = 0;
checks.forEach(([n, v]) => { if (v) ok++; console.log((v ? 'OK  ' : 'FALLO ') + n); });
console.log(ok + '/' + checks.length);
