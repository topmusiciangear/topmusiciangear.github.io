const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/guides/';
for (const f of ['best-pa-speakers.html', 'beginner-bass-guitars.html', 'best-stage-keyboards.html']) {
  const d = fs.readFileSync(BASE + f, 'utf8');
  const pares = [...d.matchAll(/data-store="([a-z]+)"[\s\S]{0,2000}?data-price="([^"]*)"[\s\S]{0,400}?<\/span>/g)];
  console.log('\n### ' + f + '   filas con precio: ' + pares.length);
  const visto = new Set();
  pares.forEach(p => {
    const k = p[1] + '=' + p[2];
    if (visto.has(k)) return;
    visto.add(k);
    console.log('   ' + p[1].padEnd(11) + p[2]);
  });
  console.log('   "Check price": ' + ((d.match(/Check price/g) || []).length) +
              ' | "Verificar precio": ' + ((d.match(/Verificar precio/g) || []).length) +
              ' | "No disponible": ' + ((d.match(/No disponible/g) || []).length));
}
// el Montage debe salir "No disponible" en Music Store
console.log('\n\n### Montage M8x (id 639) — fila Music Store');
['best-synthesizers.html', 'best-stage-keyboards.html'].forEach(f => {
  const d = fs.readFileSync(BASE + f, 'utf8');
  const i = d.indexOf('openReviewModal(639)');
  if (i < 0) { console.log(f + ': no aparece'); return; }
  const card = d.slice(i, i + 12000);
  const ms = card.match(/data-store="musicstore"[\s\S]{0,1400}/);
  const na = /No disponible/.test(ms ? ms[0] : '');
  console.log('  ' + f + ': fila Music Store = ' + (ms ? 'si' : 'no') + ' | marca No disponible = ' + na);
});
// el Bronco con sus precios nuevos
console.log('\n### Bronco (id 536) — precios en las dos guias');
['beginner-bass-guitars.html', 'best-bass-home-office.html'].forEach(f => {
  const d = fs.readFileSync(BASE + f, 'utf8');
  const i = d.indexOf('openReviewModal(536)');
  if (i < 0) { console.log(f + ': no aparece'); return; }
  const card = d.slice(i, i + 12000);
  const p = [...card.matchAll(/data-store="([a-z]+)"[\s\S]{0,2000}?data-price="([^"]*)"/g)];
  const uniq = [...new Map(p.map(x => [x[1], x[2]])).entries()];
  console.log('  ' + f + ': ' + uniq.map(x => x[0] + ' ' + x[1]).join(' | '));
});