const fs = require('fs');
const h = fs.readFileSync('guides/best-digital-pianos.html', 'utf8');
let idx = 0, n = 0;
while ((idx = h.indexOf('data-store="gear4music"', idx + 1)) > -1) {
  const pre = h.slice(0, idx);
  const tt = [...pre.matchAll(/guide-product-card-title">([^<]+)</g)].pop();
  const post = h.slice(idx, idx + 260);
  const hrefM = post.match(/href="([^"]{0,150})/);
  const priceM = h.slice(idx, idx + 3000).match(/(£|\$|€)[0-9,]+/);
  console.log('#' + (++n), 'at', idx, '| card:', tt ? tt[1] : '(none)', '| href:', hrefM ? hrefM[1] : '?', '| price:', priceM ? priceM[0] : '?');
}
