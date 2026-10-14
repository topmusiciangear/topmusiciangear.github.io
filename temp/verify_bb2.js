const fs = require('fs');
const h = fs.readFileSync('guides/beginner-bass-guitars.html', 'utf8');
const he = fs.readFileSync('guides/beginner-bass-guitars_es.html', 'utf8');
const checks = [
  ['review BB234 EN', h.includes('A PJ Workhorse for a Decade')],
  ['review BB234 ES', he.includes('un PJ todoterreno para una década')],
  ['review TMB30 EN', h.includes('Short-Scale PJ on a Budget')],
  ['review TMB30 ES', he.includes('PJ de escala corta económico')],
  ['img BB234', h.includes('3a070ac30dcf4e068153143e124a2af8')],
  ['img TMB30', h.includes('TMB30_BK_1P_03.png')],
  ['tabla 10 cols (PJ BB234)', h.includes('Ceramic P/J (V3)')],
  ['tabla TMB30', h.includes('30 in (762 mm)')],
  ['veredicto BB234', h.includes('no batteries, no menus')],
  ['veredicto TMB30', h.includes('zero stretch, low tension')],
  ['amazon TMB30', h.includes('B01BLLE250')],
  ['MS TMB30', h.includes('BAS0010182-000')]
];
let ok = 0;
checks.forEach(([n, v]) => { if (v) ok++; console.log((v ? 'OK  ' : 'FALLO ') + n); });
console.log(ok + '/' + checks.length);