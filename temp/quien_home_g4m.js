const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const d = fs.readFileSync(B + 'guides/best-electric-guitar.html', 'utf8');
[...d.matchAll(/<a [^>]*data-store="gear4music"[^>]*data-aff="([^"]+)"[^>]*>/g)].forEach(m => {
  let u; try { u = decodeURIComponent(m[1]); } catch (e) { u = m[1]; }
  if (/gear4music\.com\/\?|gear4music\.com\/$/.test(u.replace(/&amp;/g, '&'))) {
    const idx = d.indexOf(m[0]);
    const seg = d.slice(Math.max(0, idx - 6000), idx);
    const id = (seg.match(/openReviewModal\((\d+)\)/g) || []).pop();
    console.log('link a home en tarjeta/seccion de: ' + id);
    console.log('  aff: ' + u.slice(0, 130));
  }
});
const p = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
console.log('\n=== productos con stores.gear4music = home ===');
p.filter(x => x.stores && x.stores.gear4music && /^https?:\/\/(www\.)?gear4music\.com\/?(\?.*)?$/.test(x.stores.gear4music))
  .forEach(x => console.log('  ' + x.id + '  ' + x.title + '\n      ' + x.stores.gear4music));
