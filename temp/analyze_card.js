const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/guides/';
function analyze(guia, id) {
  const d = fs.readFileSync(BASE + guia, 'utf8');
  const i = d.indexOf('openReviewModal(' + id + ')');
  if (i < 0) return console.log(guia + ': no aparece');
  // desde la tarjeta hasta el cierre del bloque de tiendas
  const card = d.slice(i, i + 20000);
  const fin = card.indexOf('guide-product-card-stores');
  const stores = card.slice(fin, fin + 16000);
  // partir por cada elemento de fila
  const partes = stores.split(/(?=<a data-store=)|(?=<div class="shop-na")|(?=<button)/).filter(p => /data-store=/.test(p));
  console.log('\n### ' + guia + '  (id ' + id + ')');
  partes.forEach(p => {
    const st = (p.match(/data-store="([a-z]+)"/) || [])[1];
    if (!st) return;
    const dp = (p.match(/data-price='([^']*)'/) || [])[1];
    const naTxt = /No disponible|Not Available/.test(p);
    const href = (p.match(/href="([^"]*)"/) || [])[1];
    console.log('   ' + st.padEnd(11) +
      ' | precio: ' + (dp || '-').padEnd(9) +
      ' | No disponible: ' + (naTxt ? 'SI' : 'no').padEnd(3) +
      ' | ' + (href ? href.slice(0, 62) : 'sin href'));
  });
}
console.log('=== Montage M8x (639) ===');
analyze('best-synthesizers.html', 639);
console.log('\n=== Bronco (536) ===');
analyze('beginner-bass-guitars.html', 536);
console.log('\n=== referencia: K12.2 (106) que si tiene todas las tiendas ===');
analyze('best-pa-speakers.html', 106);