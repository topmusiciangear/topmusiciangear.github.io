// ¿Donde aparece el 675 y con que imagen?
const fs = require('fs');
const path = require('path');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

const raiz = BASE + 'guides';
const archivos = fs.readdirSync(raiz).filter(f => f.endsWith('.html'));
let conImgVieja = 0, conImgNueva = 0;
const gemas = [];

archivos.forEach(f => {
  const d = fs.readFileSync(path.join(raiz, f), 'utf8');
  // tarjetas del 675
  const cards = [...d.matchAll(/<div class="guide-product-card">([\s\S]{0,4000}?)<\/div>\s*<\/div>/g)];
  cards.forEach(c => {
    if (!/openReviewModal\(675\)/.test(c[1])) return;
    const img = (c[1].match(/<img[^>]*src="([^"]+)"/) || [])[1];
    gemas.push({ f, img });
    if (/seelectronics\.com/.test(img || '')) conImgVieja++;
    if (/260432/.test(img || '')) conImgNueva++;
  });
});

console.log('=== TARJETAS DEL 675 EN LAS GUIAS ===');
gemas.forEach(g => {
  const bien = /r2\.gear4music\.com/.test(g.img || '');
  console.log('  [' + (bien ? 'OK  ' : 'MAL ') + '] ' + g.f);
  console.log('        ' + g.img);
});
console.log('\n  con la imagen nueva: ' + conImgNueva);
console.log('  con la imagen vieja: ' + conImgVieja);

// JSON-LD
console.log('\n=== JSON-LD ===');
['index.html', 'guides/best-microphones-under-200.html'].forEach(() => {});
const conLd = [];
archivos.forEach(f => {
  const d = fs.readFileSync(path.join(raiz, f), 'utf8');
  if (/"X1 R"/.test(d)) {
    const i = d.indexOf('"X1 R"');
    const seg = d.slice(i, i + 400);
    const img = (seg.match(/"image":\s*"([^"]+)"/) || [])[1];
    if (img) conLd.push({ f, img });
  }
});
console.log('  entradas JSON-LD con el 675: ' + conLd.length);
const unicos = [...new Set(conLd.map(x => x.img))];
unicos.forEach(u => console.log('    ' + u));
