const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-5-string-basses.html', 'utf8');
const needle = 'Ultra II Jazz Bass V';
let idx = 0; const spots = [];
while ((idx = h.indexOf(needle, idx)) > -1) { spots.push(idx); idx += needle.length; }
let cardAt = 0;
spots.forEach(s => {
  const ctx = h.slice(Math.max(0, s - 300), s);
  if (ctx.includes('guide-product-card-title')) cardAt = s;
});
const listAt = h.indexOf('shop-more-list', cardAt);
const seg = h.slice(listAt, listAt + 12000);
const mi = seg.indexOf('data-store="musicstore"');
const rowStart = seg.lastIndexOf('<a ', mi);
const rowEnd = seg.indexOf('</a>', mi);
const row = seg.slice(rowStart, rowEnd + 4);
console.log('fila flexible:', row.includes('height:auto;flex-wrap:wrap'));
console.log('nota sin recorte:', !row.includes('text-overflow:ellipsis'));
console.log('nota completa presente:', row.includes('(3-Year Warranty)'));
console.log('nombre intacto (nowrap):', row.includes('white-space:nowrap;flex-shrink:0;'));
console.log('precio:', row.includes('€2,479'));