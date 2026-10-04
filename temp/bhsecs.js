const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-headphones.html', 'utf8');
const parts = h.split('guide-section-heading" id="sec-');
parts.slice(1).forEach((part, k) => {
  const tm = part.match(/^\d+">([^<]+)</);
  const title = tm ? tm[1] : '?';
  const hasImg = part.includes('guide-section-imgs"><img') || part.includes('guide-section-prod-imgs"><img');
  console.log('sec' + (k + 1), hasImg ? 'FOTO' : 'SIN-FOTO', '-', title.slice(0, 55));
});