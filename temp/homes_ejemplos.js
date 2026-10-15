const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/guides/';
const files = fs.readdirSync(B).filter(f => f.endsWith('.html'));
const HOME = {
  zzounds: /^https?:\/\/(www\.)?zzounds\.com\/?(\?.*)?$/,
  andertons: /^https?:\/\/(www\.)?andertons\.co\.uk\/?(\?.*)?$/,
  amazon: /^https?:\/\/(www\.)?amazon\.com\/?(\?.*)?$/
};
const seen = {};
files.forEach(f => {
  const d = fs.readFileSync(B + f, 'utf8');
  [...d.matchAll(/<a [^>]*data-store="([^"]+)"[^>]*href="([^"]+)"[^>]*>/g)].forEach(m => {
    const store = m[1];
    if (!HOME[store]) return;
    let u;
    try { u = decodeURIComponent(m[2].replace(/&amp;/g, '&')); } catch (e) { u = m[2]; }
    if (!HOME[store].test(u)) return;
    const key = store + '|' + u.slice(0, 80);
    if (seen[key]) return;
    seen[key] = 1;
    const idx = d.indexOf(m[0]);
    const seg = d.slice(Math.max(0, idx - 20000), idx);
    const ids = [...seg.matchAll(/openReviewModal\((\d+)\)/g)].map(x => x[1]);
    const h2 = [...seg.matchAll(/<h2[^>]*>([\s\S]{0,120}?)<\/h2>/g)].map(x => x[1].replace(/<[^>]+>/g, '').trim());
    console.log('[' + f + '][' + store + ']');
    console.log('  href: ' + u.slice(0, 110));
    console.log('  producto: ' + (ids.length ? ids[ids.length - 1] : '?') + '  h2: ' + (h2.length ? h2[h2.length - 1].slice(0, 70) : '?'));
  });
});
