const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/guides/';

['best-monitors-for-small-rooms.html', 'best-monitors-for-small-rooms_es.html'].forEach(f => {
  const d = fs.readFileSync(BASE + f, 'utf8');
  const es = f.endsWith('_es.html');
  console.log('\n=== ' + f + ' ===');
  const m = d.indexOf('openReviewModal(684)');
  const seg = d.slice(m, m + 20000);
  const filas = [...seg.matchAll(/<a [^>]*data-store="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)];
  console.log('  ' + filas.length + ' filas de tienda:');
  filas.forEach(x => {
    const t = x[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const gris = /background:#262626/.test(x[0]);
    const href = (x[0].match(/href="([^"]+)"/) || [])[1] || '';
    // el affiliate va en data-aff; el href va limpio
    const aff = (x[0].match(/data-aff="([^"]+)"/) || [])[1] || '';
    console.log('    ' + x[1].padEnd(11) + (gris ? '[gris  ] ' : '[precio] ') + t.slice(0, 42));
    console.log('        href: ' + decodeURIComponent(href).slice(0, 88));
    if (aff) console.log('        aff : ' + decodeURIComponent(aff).slice(0, 88));
  });
  console.log('  mojibake : ' + (d.match(/â‚¬|Â£|Â°/g) || []).length);
});
