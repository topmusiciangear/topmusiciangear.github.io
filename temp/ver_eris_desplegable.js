const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

['best-monitors-for-small-rooms.html', 'best-monitors-for-small-rooms_es.html'].forEach(f => {
  const d = fs.readFileSync(BASE + 'guides/' + f, 'utf8');
  const m = d.indexOf('openReviewModal(684)');
  const seg = d.slice(m, Math.min(d.length, m + 20000));

  console.log('\n=== ' + f + ' (desde la tarjeta del Eris) ===');
  console.log('  shop-more-list: ' + (seg.match(/shop-more-list/g) || []).length);
  console.log('  shop-btn-more : ' + (seg.match(/shop-btn-more/g) || []).length);

  const st = [...new Set(seg.match(/data-store="[^"]+"/g) || [])];
  console.log('  tiendas: ' + st.join(', '));

  const filas = [...seg.matchAll(/<a [^>]*data-store="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)];
  console.log('  filas (' + filas.length + '):');
  filas.forEach(x => {
    const t = x[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    console.log('    ' + x[1].padEnd(12) + (/data-price=|data-pb-/.test(x[0]) ? '[precio] ' : '[      ] ') + t.slice(0, 44));
  });
});
