const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

['best-monitors-for-small-rooms.html', 'best-monitors-for-small-rooms_es.html'].forEach(f => {
  const d = fs.readFileSync(BASE + 'guides/' + f, 'utf8');
  // localizar la TARJETA por su openReviewModal(684)
  const m = /<div class="guide-product-card">\s*<div class="guide-product-card-img">[^]*?openReviewModal\(684\)/.exec(d);
  const ini = m ? d.lastIndexOf('<div class="guide-product-card">', m.index) : -1;
  const fin = ini > -1 ? d.indexOf('<div class="guide-product-card">', ini + 40) : -1;
  const card = d.slice(ini, fin > -1 ? fin : ini + 9000);

  console.log('\n=== ' + f + ' · tarjeta del Eris ===');
  console.log('  longitud del bloque: ' + card.length);
  console.log('  titulo  : ' + (card.match(/guide-product-card-title[^>]*>([^<]+)/) || [])[1]);
  console.log('  primaria: ' + (card.match(/shop-btn-primary/g) || []).length);
  console.log('  desplegable: ' + (card.match(/shop-more-list/g) || []).length);

  const pri = (card.match(/<a[^>]*class="shop-btn-primary"[^>]*>[\s\S]*?<\/a>/) || [])[0];
  if (pri) {
    console.log('    boton: ' + (/data-price=|data-pb-/.test(pri) ? '[PRECIO] ' : '[      ] ') +
      pri.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 60));
  }

  const p = card.indexOf('shop-more-list');
  if (p > -1) {
    const seg = card.slice(p - 300, p + 4000);
    const filas = [...seg.matchAll(/<a [^>]*data-store="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)];
    console.log('    filas: ' + filas.length);
    filas.forEach(x => {
      const txt = x[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      console.log('      ' + x[1].padEnd(12) + (/data-price=|data-pb-/.test(x[0]) ? '[precio] ' : '[      ] ') + txt.slice(0, 44));
    });
  } else console.log('    (sin desplegable)');
});
