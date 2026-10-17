const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/starter-studio.html', 'utf8');
const i = h.indexOf('guide-product-card-title-row');
console.log('estructura de la card:\n' + h.slice(i - 60, i + 620).replace(/\s+/g, ' ') + '\n');
// comprobar que el rating-row ya NO esta fuera del title-row
const bodyIdx = h.indexOf('guide-product-card-body');
const seg = h.slice(bodyIdx, bodyIdx + 2000);
const rowStart = seg.indexOf('guide-product-card-title-row');
const rowEnd = seg.indexOf('</div>', seg.indexOf('guide-product-card-rating-row'));
console.log('rating-row DENTRO del title-row: ' + (rowStart < seg.indexOf('guide-product-card-rating-row') && rowStart > -1));
const rev = h.indexOf('shop-btn-review');
console.log('\nreview centered: ' + (h.slice(rev, rev + 300).includes('justify-content:center') ? 'SI' : 'NO'));
console.log('botones en cabecera: ' + (h.match(/guide-review-write-btn/g) || []).length);