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
console.log(seg.slice(rowStart, rowStart + 700));