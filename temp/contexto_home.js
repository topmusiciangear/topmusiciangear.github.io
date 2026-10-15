const fs = require('fs');
const d = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-electric-guitar.html', 'utf8');
const re = /data-aff="https:\/\/www\.awin1\.com\/cread\.php\?awinmid=1117&awinaffid=2891111&ued=https:\/\/www\.gear4music\.com\/"/g;
let m;
while ((m = re.exec(d))) {
  const seg = d.slice(Math.max(0, m.index - 12000), m.index);
  const ids = [...seg.matchAll(/openReviewModal\((\d+)\)/g)].map(x => x[1]);
  const tit = [...seg.matchAll(/guide-product-card-title[^>]*>([^<]+)</g)].map(x => x[1].trim());
  const h2 = [...seg.matchAll(/<h2[^>]*>([\s\S]{0,120}?)<\/h2>/g)].map(x => x[1].replace(/<[^>]+>/g, '').trim());
  console.log('---');
  console.log('  ultimo producto: ' + (ids.length ? ids[ids.length - 1] : '?') + ' / titulo tarjeta: ' + (tit.length ? tit[tit.length - 1] : '?'));
  console.log('  ultima seccion h2: ' + (h2.length ? h2[h2.length - 1].slice(0, 80) : '?'));
}
