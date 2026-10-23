const fs = require('fs');
const h = fs.readFileSync('guides/open-headphones.html', 'utf8');
const t = h.indexOf('guide-product-card-title">Sennheiser HD 490 Pro Plus');
const s = h.indexOf('guide-product-card-stores', t);
const e = h.indexOf('Write a review', s);
const b = h.slice(s, e);
const re = /data-store="([^"]+)"/g;
let m;
while ((m = re.exec(b)) !== null) {
  const seg = b.slice(m.index, m.index + 2600);
  const price = (seg.match(/shop-price[^>]*>[\s\S]{0,200}?<\/span>\s*<\/span>/) || [''])[0];
  console.log(m[1], '|', price.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 80));
}
