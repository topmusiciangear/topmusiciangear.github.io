const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/beginner-guitar.html', 'utf8');
function sectionHtml(heading) {
  const i = h.indexOf(heading);
  const j = h.indexOf('guide-section-heading', i + heading.length);
  return h.slice(i, j === -1 ? i + 20000 : j);
}
['Fender CN-60S (Nylon): A Closer Look', 'Takamine GC1 (Nylon): A Closer Look'].forEach(hd => {
  const seg = sectionHtml(hd);
  console.log('=== ' + hd.slice(0, 25));
  ['amazon', 'reverb'].forEach(st => {
    const i = seg.indexOf('data-store="' + st + '"');
    if (i < 0) { console.log(' ' + st + ': SIN FILA'); return; }
    const aStart = seg.lastIndexOf('<a ', i);
    const tag = seg.slice(aStart, seg.indexOf('>', aStart));
    const href = (tag.match(/href="([^"]+)"/) || [])[1] || '';
    const aff = (tag.match(/data-aff="([^"]+)"/) || [])[1] || '';
    console.log(' ' + st + ' href=' + href.slice(0, 90));
    console.log(' ' + st + ' aff=' + (aff ? aff.slice(0, 90) : '(sin data-aff)'));
  });
});