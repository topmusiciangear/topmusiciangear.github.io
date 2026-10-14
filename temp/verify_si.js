const fs = require('fs');
const h = fs.readFileSync('guides/streaming-interfaces.html', 'utf8');
const he = fs.readFileSync('guides/streaming-interfaces_es.html', 'utf8');
const checks = [
  ['col URX44V EN', h.includes('Yamaha URX44V')],
  ['seccion URX44V EN', h.includes('Best Streaming Hub With HDMI?')],
  ['seccion URX44V ES', he.includes('mejor hub de streaming con HDMI?')],
  ['tabla ~$699', h.includes('~$699')],
  ['tabla HDMI 4K/60', h.includes('HDMI 4K/60')],
  ['veredicto 78dB', h.includes('78dB — drives SM7B')],
  ['img G4M 1326215', h.includes('132/1326215')],
  ['boton MS', h.includes('PCM0018734-000')],
  ['Vocaster fuera EN', !h.includes('Vocaster')],
  ['Vocaster fuera ES', !he.includes('Vocaster')],
  ['FAQ A1 sin Vocaster', !h.includes('Vocaster One (on sale)')],
  ['conclusion URX44V', h.includes('streaming-hub pick')]
];
let ok = 0;
checks.forEach(([n, v]) => { if (v) ok++; console.log((v ? 'OK  ' : 'FALLO ') + n); });
console.log(ok + '/' + checks.length);
