const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

['best-monitors-for-small-rooms.html', 'best-monitors-for-small-rooms_es.html'].forEach(f => {
  const d = fs.readFileSync(BASE + 'guides/' + f, 'utf8');
  const marca = d.indexOf('openReviewModal(684)');
  const ini = d.lastIndexOf('<div class="guide-product-card">', marca);
  const fin = d.indexOf('<div class="guide-product-card">', marca);
  const card = d.slice(ini, fin > -1 ? fin : ini + 12000);

  console.log('\n=== ' + f + ' ===');
  console.log('  tarjeta: ' + (card.match(/guide-product-card-title[^>]*>([^<]+)/) || [])[1]);
  console.log('  longitud: ' + card.length);

  const pri = (card.match(/<a[^>]*class="shop-btn-primary"[^>]*>[\s\S]*?<\/a>/) || [])[0];
  console.log('  primaria: ' + (/data-price=|data-pb-/.test(pri) ? '[PRECIO] ' : '[      ] ') +
    pri.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 60));
  console.log('  href     : ' + ((pri.match(/href="([^"]+)"/) || [])[1] || '').slice(0, 80));

  const filas = [...card.matchAll(/<div class="shop-more-list"[\s\S]*?<\/div>/g)];
  console.log('  desplegables: ' + filas.length);
  filas.forEach(l => {
    [...l[0].matchAll(/<a [^>]*data-store="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)].forEach(x => {
      const txt = x[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      console.log('    ' + x[1].padEnd(12) + (/data-price=|data-pb-/.test(x[0]) ? '[precio] ' : '[      ] ') + txt.slice(0, 46));
    });
  });
  const btnMore = (card.match(/shop-btn-more[\s\S]{0,400}?<span[^>]*>([^<]+)</) || [])[1];
  console.log('  boton mas: "' + (btnMore || '').trim() + '"');
});
