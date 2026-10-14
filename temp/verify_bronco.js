const fs = require('fs');
const h = fs.readFileSync('guides/beginner-bass-guitars.html', 'utf8');
const he = fs.readFileSync('guides/beginner-bass-guitars_es.html', 'utf8');
const checks = [
  ['review Bronco EN', h.includes('Short-Scale Starter')],
  ['review Bronco ES', he.includes('escala corta para empezar')],
  ['hook bateria EN', h.includes('dies overnight')],
  ['hook bateria ES', he.includes('muere en una noche')],
  ['tabla 30in', h.includes('30 in (762 mm)')],
  ['veredicto Bronco', h.includes('zero learning curve')],
  ['img temporal', h.includes('bigcommerce')],
  ['boton Andertons', h.includes('sonic-bronco-bass-guitar-black')],
  ['boton MS', h.includes('BAS0012451-000')]
];
let ok = 0;
checks.forEach(([n, v]) => { if (v) ok++; console.log((v ? 'OK  ' : 'FALLO ') + n); });
console.log(ok + '/' + checks.length);
