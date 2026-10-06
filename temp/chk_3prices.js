const fs = require('fs');
const h = fs.readFileSync('guides/best-digital-pianos_es.html', 'utf8');
const checks = [
  ['P-225 g4m £489', /489/],
  ['YDP-166 ms 1.399', /1\.399/],
  ['CLP-835 ms 1.799', /1\.799/],
  ['YDP MS url', /Yamaha-YDP-166-BK/],
  ['CLP MS url', /Clavinova-CLP-835-B/]
];
checks.forEach(([n, re]) => console.log(n + ':', re.test(h) ? 'OK' : 'FALTA'));
