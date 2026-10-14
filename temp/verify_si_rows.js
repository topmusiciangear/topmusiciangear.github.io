const fs = require('fs');
const h = fs.readFileSync('guides/streaming-interfaces.html', 'utf8');
const he = fs.readFileSync('guides/streaming-interfaces_es.html', 'utf8');
const checks = [
  ['Loopback EN', h.includes('Loopback')],
  ['Canales USB ES', he.includes('Canales USB virtuales')],
  ['USB dual ES', he.includes('USB dual')],
  ['Multi-Stream x3', h.includes('Multi-Stream ×3')],
  ['Volt sin loopback', h.includes('>No<')],
  ['Bridge USB I+II', h.includes('USB I + II')],
  ['Duo 7 asignables', h.includes('7 assignable')]
];
let ok = 0;
checks.forEach(([n, v]) => { if (v) ok++; console.log((v ? 'OK  ' : 'FALLO ') + n); });
console.log(ok + '/' + checks.length);
