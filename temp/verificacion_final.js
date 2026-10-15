const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

['best-monitors-for-small-rooms.html', 'best-monitors-for-small-rooms_es.html'].forEach(f => {
  const d = fs.readFileSync(BASE + 'guides/' + f, 'utf8');
  const es = f.endsWith('_es.html');
  console.log('\n=== ' + f + ' ===');
  console.log('  tarjetas de producto : ' + (d.match(/guide-product-card-title/g) || []).length);
  console.log('  veredictos           : ' + (d.match(/<div class="verdict-product-name">/g) || []).length);
  console.log('  menciones Eris Studio: ' + (d.match(/Eris Studio 5/g) || []).length);
  console.log('  mojibake             : ' + (d.match(/â‚¬|Â£|Â°/g) || []).length);
  console.log('  marcadores de cita   : ' + (d.match(/\[\d+\.\d+\]/g) || []).length);

  // tabla
  const tbl = d.match(/<table[\s\S]*?<\/table>/);
  if (tbl) {
    const ths = [...tbl[0].matchAll(/<th[^>]*>([\s\S]*?)<\/th>/g)].map(m => m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());
    console.log('  tabla: ' + ths.length + ' columnas, ' + ([...tbl[0].matchAll(/<tr>/g)]).length + ' filas');
    const celdasVacias = [...tbl[0].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)]
      .map(m => m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim())
      .filter(t => t === '' || t === '-').length;
    console.log('  celdas vacias en la tabla: ' + celdasVacias);
  }

  // veredictos 4+4
  const bloques = d.split('<div class="verdict-product-name">').slice(1);
  const malos = bloques.filter(b => {
    const trasPros = b.split('class="pros"')[1] || '';
    const trasCons = b.split('class="cons"')[1] || '';
    const pros = (trasPros.match(/<li>/g) || []).length;
    const cons = (trasCons.match(/<li>/g) || []).length;
    return pros < 4 || cons < 4;
  });
  console.log('  veredictos con menos de 4+4: ' + malos.length);

  // botones del Eris
  const m = d.indexOf('openReviewModal(684)');
  const seg = d.slice(m, m + 20000);
  const filas = [...seg.matchAll(/<a [^>]*data-store="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)];
  console.log('  filas de tienda del Eris: ' + filas.length);
  filas.forEach(x => {
    const t = x[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const gris = /background:#262626/.test(x[0]);
    console.log('    ' + x[1].padEnd(11) + (gris ? '[gris  ]' : '[precio]') + ' ' + t.slice(0, 44));
  });
});
