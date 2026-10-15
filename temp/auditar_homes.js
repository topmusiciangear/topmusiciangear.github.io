const fs = require('fs'), path = require('path');
const B = 'C:/Users/Daniel/projects/topmusiciangear/guides/';
const files = fs.readdirSync(B).filter(f => f.endsWith('.html'));

const HOME = {
  zzounds: /^https?:\/\/(www\.)?zzounds\.com\/?(\?.*)?$/,
  gear4music: /^https?:\/\/(www\.)?gear4music\.com\/?(\?.*)?$/,
  andertons: /^https?:\/\/(www\.)?andertons\.co\.uk\/?(\?.*)?$/,
  musicstore: /^https?:\/\/(www\.)?musicstore\.com\/?(\?.*)?$/,
  amazon: /^https?:\/\/(www\.)?amazon\.com\/?(\?.*)?$/
};
const hits = {};
files.forEach(f => {
  const d = fs.readFileSync(path.join(B, f), 'utf8');
  [...d.matchAll(/<a [^>]*data-store="([^"]+)"[^>]*href="([^"]+)"[^>]*>/g)].forEach(m => {
    const store = m[1];
    if (!HOME[store]) return;
    let u;
    try { u = decodeURIComponent(m[2].replace(/&amp;/g, '&')); } catch (e) { u = m[2]; }
    // para awin/anrdoezrs/pxf, mirar el destino, no el redirector
    const ued = (u.match(/[?&]ued=([^&]+)/) || [])[1];
    const dest = ued ? decodeURIComponent(ued) : (u.match(/[?&](url|u)=([^&]+)/) ? decodeURIComponent((u.match(/[?&](url|u)=([^&]+)/))[2]) : u);
    if (HOME[store].test(dest)) {
      const k = store;
      hits[k] = hits[k] || { n: 0, ej: new Set() };
      hits[k].n++;
      // contexto: producto
      const idx = d.indexOf(m[0]);
      const seg = d.slice(Math.max(0, idx - 15000), idx);
      const ids = [...seg.matchAll(/openReviewModal\((\d+)\)/g)].map(x => x[1]);
      if (ids.length) hits[k].ej.add(ids[ids.length - 1]);
    }
  });
});
console.log('=== LINKS QUE CAEN EN LA HOME DE LA TIENDA ===');
Object.entries(hits).forEach(([k, v]) => {
  console.log('\n' + k + ': ' + v.n + ' links  productos: ' + [...v.ej].join(', '));
});
console.log('\n(fin)');
