const fs = require('fs');
[['guides/mics-for-creators.html'], ['guides/usb-mics.html']].forEach(([f]) => {
  const h = fs.readFileSync(f, 'utf8');
  const t = '<h3 class="guide-product-card-title">Audio-Technica AT2040USB</h3>';
  const i = h.indexOf(t);
  if (i < 0) { console.log(f + ': SIN TARJETA'); return; }
  const seg = h.slice(i, i + 9000);
  const prices = [...new Set([...seg.matchAll(/data-price=(["'])(.*?)\1/g)].map(m => m[2]))];
  const stores = [...new Set([...seg.matchAll(/data-store=(["'])(.*?)\1/g)].map(m => m[2]))];
  console.log(f + ' stores=' + stores.join(',') + ' prices=' + prices.join(' '));
});
