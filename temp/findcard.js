const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-5-string-basses.html', 'utf8');
const needle = 'Ultra II Jazz Bass V';
let idx = 0, n = 0;
const spots = [];
while ((idx = h.indexOf(needle, idx)) > -1) { n++; spots.push(idx); idx += needle.length; if (n > 30) break; }
console.log('occurrences:', n);
// find the card title occurrence: look for guide-product-card-title near each spot
spots.forEach(s => {
  const ctx = h.slice(Math.max(0, s - 300), s);
  if (ctx.includes('guide-product-card-title') || ctx.includes('guide-section-prod-name')) {
    console.log('CARD at', s);
  }
});