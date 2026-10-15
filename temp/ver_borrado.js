const fs = require('fs'), path = require('path');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const IDS = [220, 221, 223, 224, 327, 514, 516, 665, 667, 668, 669];

// 1) referencias por id en guias generadas
const files = fs.readdirSync(B + 'guides').filter(f => f.endsWith('.html'));
let malas = [];
files.forEach(f => {
  const d = fs.readFileSync(path.join(B + 'guides', f), 'utf8');
  IDS.forEach(id => {
    if (new RegExp('openReviewModal\\(' + id + '\\)').test(d)) malas.push(f + ' -> openReviewModal(' + id + ')');
  });
});
console.log('tarjetas de huerfanos en guias: ' + (malas.length ? '\n  ' + malas.join('\n  ') : 'ninguna'));

// 2) JSON-LD huerfano
let ld = [];
files.forEach(f => {
  const d = fs.readFileSync(path.join(B + 'guides', f), 'utf8');
  IDS.forEach(id => {
    if (d.includes('"product_id":' + id) || d.includes('products/' + id)) ld.push(f + ' -> ' + id);
  });
});
console.log('JSON-LD huerfano: ' + (ld.length ? ld.join(', ') : 'ninguno'));

// 3) deals generados
try {
  const dh = fs.readFileSync(B + 'deals.html', 'utf8');
  const hit = IDS.filter(id => dh.includes('product_id') && new RegExp('product_id[^0-9]*' + id).test(dh));
  console.log('deals.html menciona huerfanos: ' + (hit.length ? hit.join(', ') : 'no'));
} catch (e) { console.log('deals.html: ' + e.message); }

// 4) nombres en prosa (se quedan a proposito, solo informar)
const g = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
[['KH 120', ['adam-vs-genelec', 'kh750-vs-7050c']], ['MV6', ['usb-mics']]].forEach(([n, guias]) => {
  console.log('"' + n + '" sigue en prosa de: ' + guias.join(', ') + ' (comparativa editorial, sin tarjeta)');
});

// 5) recuento final
const p = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
console.log('\nproductos en catalogo: ' + p.length);
console.log('id maximo: ' + Math.max(...p.map(x => x.id)));
