const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/guides/';
// OJO: el HTML usa comillas SIMPLES en class='shop-price' data-price='...'
const RE = /data-store="([a-z]+)"[\s\S]{0,2500}?data-price='([^']*)'/g;

function ficha(guia, id) {
  const d = fs.readFileSync(BASE + guia, 'utf8');
  const i = d.indexOf('openReviewModal(' + id + ')');
  if (i < 0) return null;
  const card = d.slice(i, i + 14000);
  const precios = {};
  let m; RE.lastIndex = 0;
  while ((m = RE.exec(card))) precios[m[1]] = m[2];
  const na = /No disponible/.test(card);
  const img = (card.match(/<img src="([^"]+)"/) || [])[1];
  return { precios, na, img };
}

console.log('=== Yamaha Montage M8x (639) ===');
['best-synthesizers.html', 'best-stage-keyboards.html'].forEach(f => {
  const r = ficha(f, 639);
  if (!r) { console.log(f + ': no aparece'); return; }
  console.log('  ' + f);
  console.log('     precios: ' + JSON.stringify(r.precios));
  console.log('     "No disponible" en la tarjeta: ' + r.na);
});

console.log('\n=== Squier Sonic Bronco Bass (536) ===');
['beginner-bass-guitars.html', 'best-bass-home-office.html'].forEach(f => {
  const r = ficha(f, 536);
  if (!r) { console.log(f + ': no aparece'); return; }
  console.log('  ' + f);
  console.log('     precios: ' + JSON.stringify(r.precios));
  console.log('     foto: ' + r.img);
});

console.log('\n=== resumen del sitio (muestra de 12 guias) ===');
const fs2 = require('fs');
const files = fs2.readdirSync(BASE).filter(f => f.endsWith('.html') && !f.includes('_es')).slice(0, 40);
let filas = 0, na = 0, check = 0;
for (const f of files) {
  const d = fs2.readFileSync(BASE + f, 'utf8');
  filas += (d.match(/data-price='/g) || []).length;
  na += (d.match(/No disponible/g) || []).length;
  check += (d.match(/Check price/g) || []).length;
}
console.log('  40 paginas -> filas con precio: ' + filas + ' | "No disponible": ' + na + ' | "Check price": ' + check);