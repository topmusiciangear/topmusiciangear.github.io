const fs = require('fs');
const h = fs.readFileSync('guides/budget-bass-like-expensive.html', 'utf8');
const he = fs.readFileSync('guides/budget-bass-like-expensive_es.html', 'utf8');
const sb = fs.readFileSync('js/shop-buttons.js', 'utf8');
const i = sb.indexOf('\n  683: {');
const blk = sb.slice(i, i + 900);
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
const p = arr.find(x => x.id === 683);
const checks = [
  ['foto G4M EN', h.includes('media/26/260332/1200/preview.jpg')],
  ['foto G4M ES', he.includes('media/26/260332/1200/preview.jpg')],
  ['ya no la temporal', !h.includes('musicshop360')],
  ['nota cierre EN', h.includes('closed at the end of September 2025')],
  ['nota cierre ES', he.includes('cerr\u00f3 a finales de septiembre de 2025')],
  ['MIRC EN', h.includes('MIRC in Tennessee')],
  ['MIRC ES', he.includes('MIRC, en Tennessee')],
  ['alternativa Ray4 EN', h.includes('StingRay Ray4</strong> and the <strong>Sire Marcus Miller V5')],
  ['alternativa Ray4 ES', he.includes('StingRay Ray4</strong> y el <strong>Sire Marcus Miller V5')],
  ['precio 899 mencionado EN', h.includes('$899')],
  ['btn G4M', blk.includes('awinmid=1117')],
  ['btn zzounds', blk.includes('GLGTL2000')],
  ['btn MS', blk.includes('awinmid=63816')],
  ['andertons OOS', blk.includes('andertons')],
  ['sin precio inventado', !blk.includes('"$') && !blk.includes('\u00a3')],
  ['tabla sin precio', h.includes('No publicado')],
  ['catalog discontinued', p.discontinued === true],
  ['sin mojibake', !/[\u4e00-\u9fff]/.test(h + he)]
];
let ok = 0;
checks.forEach(([n, v]) => { if (v) ok++; console.log((v ? 'OK  ' : 'FALLO ') + n); });
console.log(ok + '/' + checks.length);