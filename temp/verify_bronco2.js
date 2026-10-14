const fs = require('fs');
const h = fs.readFileSync('guides/beginner-bass-guitars.html', 'utf8');
const he = fs.readFileSync('guides/beginner-bass-guitars_es.html', 'utf8');
const sb = fs.readFileSync('js/shop-buttons.js', 'utf8');
const i = sb.indexOf('\n  680: {');
const blk = sb.slice(i, i + 1400);
const checks = [
  ['img G4M EN', h.includes('911020/1200/preview.jpg')],
  ['img G4M ES', he.includes('911020/1200/preview.jpg')],
  ['sin img temporal', !h.includes('bigcommerce')],
  ['btn G4M precio', blk.includes('\u00a3170.00')],
  ['btn zzounds precio', blk.includes('$259.00')],
  ['btn andertons precio', blk.includes('\u00a3159.00')],
  ['btn MS precio', blk.includes('\u20ac199.00')],
  ['btn G4M url Awin', blk.includes('awinmid=1117')],
  ['schema offers=4', /"offerCount": 4/.test(h) || h.includes('"@type": "Offer"')]
];
let ok = 0;
checks.forEach(([n, v]) => { if (v) ok++; console.log((v ? 'OK  ' : 'FALLO ') + n); });
console.log(ok + '/' + checks.length);