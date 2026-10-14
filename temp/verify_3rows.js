const fs = require('fs');
const h = fs.readFileSync('guides/best-microphone.html', 'utf8');
const he = fs.readFileSync('guides/best-microphone_es.html', 'utf8');
const checks = [
  ['Max SPL EN', h.includes('Max SPL')],
  ['SPL máximo ES', he.includes('SPL máximo')],
  ['Ruido propio ES', he.includes('Ruido propio')],
  ['Sensibilidad ES', he.includes('Sensibilidad')],
  ['25 mV/Pa (NT1s)', h.includes('25 mV/Pa')],
  ['18 dB-A (Origin)', h.includes('18 dB-A')],
  ['No publicado ES', he.includes('No publicado')],
  ['N/A passive SM7B', h.includes('N/A (passive)')],
  ['SM7B precio intacto ~$439', h.includes('~$439')],
  ['Connection intacto', h.includes('XLR + USB-C')],
  ['zzounds SEEX1R', h.includes('SEEX1R')],
  ['SEEX1SSTUDBUN fuera', !h.includes('SEEX1SSTUDBUN')]
];
let ok = 0;
checks.forEach(([n, v]) => { if (v) ok++; console.log((v ? 'OK  ' : 'FALLO ') + n); });
console.log(ok + '/' + checks.length);
