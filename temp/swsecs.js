const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/stage-wireless.html', 'utf8');
const parts = h.split('guide-section-heading" id="sec-');
parts.slice(1).forEach((part, k) => {
  const tm = part.match(/^\d+">([^<]+)</);
  const title = tm ? tm[1] : '?';
  const im = part.match(/guide-section-imgs"><img[^>]*alt="([^"]+)"/);
  console.log('sec' + (k + 1) + (im ? ' FOTO(' + im[1].slice(0, 30) + ')' : ' SIN') + ' - ' + title.slice(0, 55));
});