const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const f = B + 'build-guides.js';
let s = fs.readFileSync(f, 'utf8');

// Quitar el boton share del productCard
const shareBtn = '<button type="button" class="guide-product-card-share" aria-label="Share" title="Share" onclick="event.stopPropagation();shareProduct(this)"><svg data-fa="share-nodes" class="icon fa-solid fa-share-nodes" viewBox="0 0 448 512" width="45%" height="45%" fill="currentColor"><path d="M352 224c53 0 96-43 96-96s-43-96-96-96s-96 43-96 96c0 4 .2 8 .7 11.9l-94.1 47C145.4 170.2 121.9 160 96 160c-53 0-96 43-96 96s43 96 96 96c25.9 0 49.4-10.2 66.6-26.9l94.1 47c-.5 3.9-.7 7.8-.7 11.9c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-25.9 0-49.4 10.2-66.6 26.9l-94.1-47c.5-3.9 .7-7.8 .7-11.9s-.2-8-.7-11.9l94.1-47C302.6 213.8 326.1 224 352 224z"/></svg></button>';

if (s.indexOf(shareBtn) >= 0) {
  s = s.replace(shareBtn, '');
  console.log('Share button eliminado de productCard');
} else {
  console.log('ERROR: share button no encontrado');
  process.exit(1);
}

fs.writeFileSync(f, s, 'utf8');
console.log('build-guides.js actualizado: sin share button en cards');