const fs = require('fs');
const h = fs.readFileSync('guides/premium-interfaces.html', 'utf8');
const checks = [
  ['img G4M 501201', h.includes('50/501201')],
  ['img oficial fuera', !h.includes('Orion_Studio_SC_Front')],
  ['G4M 33P8', h.includes('33P8')],
  ['zz ANEORNSTDSYNCORE', h.includes('ANEORNSTDSYNCORE')],
  ['Andertons orion', h.includes('antelope-audio-orion-studio-synergy-core')],
  ['MS PCM0015924', h.includes('PCM0015924')]
];
let ok = 0;
checks.forEach(([n, v]) => { if (v) ok++; console.log((v ? 'OK  ' : 'FALLO ') + n); });
console.log(ok + '/' + checks.length);
