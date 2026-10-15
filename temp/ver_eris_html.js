const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
['best-monitors-for-small-rooms.html', 'best-monitors-for-small-rooms_es.html'].forEach(f => {
  const d = fs.readFileSync(BASE + 'guides/' + f, 'utf8');
  console.log('\n' + '='.repeat(70));
  console.log('  ' + f);
  console.log('='.repeat(70));
  console.log('  tarjetas: ' + (d.match(/guide-product-card-title/g) || []).length);
  console.log('  "Eris Studio 5": ' + (d.match(/Eris Studio 5/g) || []).length + ' menciones');
  console.log('  veredictos: ' + (d.match(/verdict-product-name/g) || []).length);
  console.log('  "[1." marcadores de cita: ' + (d.match(/\[\d+\.\d+\]/g) || []).length);
  console.log('  mojibake: ' + (d.match(/â‚¬|Â£|Â°/g) || []).length);

  // precios del nuevo producto
  const i = d.indexOf('Eris Studio 5');
  if (i > -1) {
    const fin = d.indexOf('</a>', d.indexOf('shop-more-list', i));
    const lista = d.slice(d.indexOf('<div class="shop-more-list"', i), fin);
    console.log('\n  desplegable:');
    [...lista.matchAll(/<a [^>]*data-store="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)].forEach(m => {
      const txt = m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      console.log('    ' + m[1].padEnd(12) + (/data-price=|data-pb-/.test(m[0]) ? '[precio] ' : '[      ] ') + txt.slice(0, 48));
    });
  }

  // la columna nueva de la tabla
  const tbl = d.match(/<table[\s\S]*?<\/table>/);
  if (tbl) {
    const ths = [...tbl[0].matchAll(/<th[^>]*>([\s\S]*?)<\/th>/g)].map(m => m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());
    const idx = ths.findIndex(x => /Eris Studio 5/.test(x));
    console.log('\n  tabla: ' + ths.length + ' columnas, la del Eris es la [' + idx + ']');
    if (idx > -1) {
      [...tbl[0].matchAll(/<tr>([\s\S]*?)<\/tr>/g)].forEach(r => {
        const c = [...r[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map(m => m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());
        if (c.length) console.log('    ' + c[0].padEnd(24) + '-> ' + c[idx]);
      });
    }
  }
});
