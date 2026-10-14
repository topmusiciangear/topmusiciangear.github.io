const fs = require('fs');
const h = fs.readFileSync('guides/beginner-bass-guitars.html', 'utf8');
const he = fs.readFileSync('guides/beginner-bass-guitars_es.html', 'utf8');
const checks = [
  ['Player II fuera EN', !h.includes('Player II')],
  ['AmPro fuera EN', !h.includes('AmPro')],
  ['Ultra II fuera EN', !h.includes('Ultra II')],
  ['B-204SM fuera EN', !h.includes('B-204SM')],
  ['Player II fuera ES', !he.includes('Player II')],
  ['B-204SM fuera ES', !he.includes('B-204SM')],
  ['veredicto TRBX304', h.includes('Yamaha TRBX304 for the best')],
  ['veredicto Affinity', h.includes('Squier Affinity PJ for classic')],
  ['conclusion TRBX304', h.includes('Yamaha TRBX304 or Squier Affinity PJ')],
  ['7 cards', (h.match(/Squier Affinity Series Precision Bass PJ|Sire Marcus Miller V5 /g) || []).length >= 2]
];
let ok = 0;
checks.forEach(([n, v]) => { if (v) ok++; console.log((v ? 'OK  ' : 'FALLO ') + n); });
console.log(ok + '/' + checks.length);
