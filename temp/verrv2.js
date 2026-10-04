const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/beginner-guitar.html', 'utf8');
const i = h.indexOf('Fender CN-60S (Nylon): A Closer Look');
const j = h.indexOf('guide-section-heading', i + 50);
const seg = h.slice(i, j);
const ri = seg.indexOf('data-store="reverb"');
if (ri < 0) { console.log('SIN FILA REVERB'); }
else {
  const aStart = seg.lastIndexOf('<a ', ri);
  console.log(seg.slice(aStart, seg.indexOf('>', aStart)));
}