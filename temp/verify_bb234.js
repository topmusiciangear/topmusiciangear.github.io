const fs = require('fs');
const h = fs.readFileSync('guides/beginner-bass-guitars.html', 'utf8');
const he = fs.readFileSync('guides/beginner-bass-guitars_es.html', 'utf8');
const sb = fs.readFileSync('js/shop-buttons.js', 'utf8');
const i = sb.indexOf('\n  681: {');
const blk = sb.slice(i, i + 1500);
const checks = [
  ['img G4M EN', h.includes('272785/1200/preview.jpg')],
  ['img G4M ES', he.includes('272785/1200/preview.jpg')],
  ['ya no img yamaha shop', !h.includes('3a070ac30dcf4e068153143e124a2af8')],
  ['btn G4M 369', blk.includes('\u00a3369.00')],
  ['btn Andertons 379', blk.includes('\u00a3379.00')],
  ['btn MS 399', blk.includes('\u20ac399.00')],
  ['zzounds sin precio en bloque', !blk.includes('zzounds: "$')],
  ['btn G4M url Awin', blk.includes('awinmid=1117')],
  ['btn zzounds url', blk.includes('YAMBB234')],
  ['review BB234 sigue', h.includes('A PJ Workhorse for a Decade') && he.includes('un PJ todoterreno para una década')]
];
let ok = 0;
checks.forEach(([n, v]) => { if (v) ok++; console.log((v ? 'OK  ' : 'FALLO ') + n); });
console.log(ok + '/' + checks.length);