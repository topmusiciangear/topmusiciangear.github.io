const fs = require('fs');
const h = fs.readFileSync('guides/premium-interfaces.html', 'utf8');
const he = fs.readFileSync('guides/premium-interfaces_es.html', 'utf8');
const checks = [
  ['MT48 fusion EN', h.includes('Monitor Mission scaling')],
  ['ORIA fusion EN', h.includes('60-day trial')],
  ['Apollo fusion EN', h.includes('budget both in')],
  ['UFX fusion EN', h.includes('DIGICheck metering, loopback')],
  ['Horizon ASP8024 EN', h.includes('ASP8024-HE')],
  ['Orion cues EN', h.includes('finished-sounding cues')],
  ['MT48 fusion ES', he.includes('128 fuentes AoIP')],
  ['ORIA fusion ES', he.includes('trial de 60 días')],
  ['Apollo fusion ES', he.includes('presupuesta ambos')],
  ['UFX fusion ES', he.includes('Medición DIGICheck')],
  ['Horizon ASP ES', he.includes('ASP8024-HE')],
  ['Orion cues ES', he.includes('cues casi mezcladas')],
  ['blurb Horizon fuera', !h.includes('minus the console')],
  ['blurb Orion fuera', !h.includes('most I/O per pound')],
  ['6 buy buttons', (h.match(/Compare 5 more stores/g) || []).length === 6]
];
let ok = 0;
checks.forEach(([n, v]) => { if (v) ok++; console.log((v ? 'OK  ' : 'FALLO ') + n); });
console.log(ok + '/' + checks.length);
