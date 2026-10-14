const fs = require('fs');
const h = fs.readFileSync('guides/beginner-bass-guitars.html', 'utf8');
const he = fs.readFileSync('guides/beginner-bass-guitars_es.html', 'utf8');
const sb = fs.readFileSync('js/shop-buttons.js', 'utf8');
const i = sb.indexOf('\n  682: {');
const blk = sb.slice(i, i + 1300);
const checks = [
  ['img G4M EN', h.includes('702140/1200/preview.jpg')],
  ['img G4M ES', he.includes('702140/1200/preview.jpg')],
  ['fuera img ibanez antigua', !h.includes('TMB30_BK_1P_03.png')],
  ['btn G4M 219', blk.includes('\u00a3219.00')],
  ['btn zz 249', blk.includes('$249.00')],
  ['btn Andertons 229', blk.includes('\u00a3229.00')],
  ['btn MS 239', blk.includes('\u20ac239.00')],
  ['btn G4M Awin', blk.includes('awinmid=1117')],
  ['btn MS variante negra nueva', blk.includes('BAS0008306-000')],
  ['btn Amazon conservado', blk.includes('B01BLLE250')],
  ['review TMB30 sigue', h.includes('Short-Scale PJ on a Budget') && he.includes('PJ de escala corta económico')]
];
let ok = 0;
checks.forEach(([n, v]) => { if (v) ok++; console.log((v ? 'OK  ' : 'FALLO ') + n); });
console.log(ok + '/' + checks.length);