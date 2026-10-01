const fs = require('fs');
[['guides/mics-for-creators.html'], ['guides/usb-mics.html']].forEach(([f]) => {
  const h = fs.readFileSync(f, 'utf8');
  const t = '<h3 class="guide-product-card-title">Audio-Technica AT2040USB</h3>';
  const i = h.indexOf(t);
  const cardStart = h.lastIndexOf('<div class="guide-product-card"', i);
  const nextCard = h.indexOf('<div class="guide-product-card"', i + 10);
  const seg = h.slice(cardStart, nextCard > 0 ? nextCard : i + 9000);
  const rows = [...seg.matchAll(/data-store=(["'])(.*?)\1[^>]*>([\s\S]{0,400}?)(?=data-store=|$)/g)];
  console.log('== ' + f);
  const stores = [...seg.matchAll(/data-store=(["'])(.*?)\1/g)].map(m => m[2]);
  console.log(' stores: ' + [...new Set(stores)].join(','));
  const pt = [...seg.matchAll(/shop-price[^>]*>([\s\S]{0,120}?)/g)].map(m => m[1].replace(/<[^>]+>/g, '').trim().slice(0, 40));
  console.log(' priceTexts: ' + [...new Set(pt)].join(' | ').slice(0, 400));
});
