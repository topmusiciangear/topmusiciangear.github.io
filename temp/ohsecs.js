const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/open-headphones.html', 'utf8');
const parts = h.split('guide-section-heading" id="sec-');
parts.slice(1).forEach((part, k) => {
  const tm = part.match(/^\d+">([^<]+)</);
  const title = tm ? tm[1] : '?';
  const imgs = [...part.matchAll(/<img[^>]*alt="([^"]+)"/g)].map(m => m[1]).filter(a => /490|HD 600|NDH|Sundara|560S/i.test(a));
  console.log('sec' + (k + 1) + (part.includes('guide-section-imgs"><img') ? ' FOTO' : ' SIN') + ' - ' + title.slice(0, 50) + (imgs.length ? ' | ' + imgs.join('/') : ''));
});