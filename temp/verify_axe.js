const fs = require('fs');
const h = fs.readFileSync('guides/best-interface.html', 'utf8');
const he = fs.readFileSync('guides/best-interface_es.html', 'utf8');
const checks = [
  ['col AXE EN', h.includes('IK Multimedia AXE I/O')],
  ['review AXE EN', h.includes('Tuner Onboard')],
  ['review AXE ES', he.includes('afinador a bordo')],
  ['tabla ~$399', h.includes('~$399')],
  ['veredicto Z-TONE', h.includes('Z-TONE impedance')],
  ['img G4M 448466', h.includes('44/448466')],
  ['boton Amazon', h.includes('B07MWZ9FMR')],
  ['conclusion guitarra EN', h.includes('If you record guitar or bass')],
  ['conclusion guitarra ES', he.includes('Si grabas guitarra o bajo')]
];
let ok = 0;
checks.forEach(([n, v]) => { if (v) ok++; console.log((v ? 'OK  ' : 'FALLO ') + n); });
console.log(ok + '/' + checks.length);
