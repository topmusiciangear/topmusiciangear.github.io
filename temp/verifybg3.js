const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/beginner-guitar.html', 'utf8');
function sectionHtml(heading) {
  const i = h.indexOf(heading);
  const j = h.indexOf('guide-section-heading', i + heading.length);
  return h.slice(i, j === -1 ? i + 20000 : j);
}
const s1 = sectionHtml('Fender CN-60S Nylon: A Closer Look');
console.log('CN rows:', [...s1.matchAll(/data-store="([a-z]+)"/g)].map(m => m[1]).join(','));
console.log('CN 189:', s1.includes('£189'));
const s2 = sectionHtml('Takamine GC1 Classical: A Closer Look');
console.log('GC1 rows:', [...s2.matchAll(/data-store="([a-z]+)"/g)].map(m => m[1]).join(','));
console.log('GC1 349:', s2.includes('$349'), '| GC1 209:', s2.includes('£209'));