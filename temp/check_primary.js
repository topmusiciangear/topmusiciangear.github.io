const fs = require('fs');
[['guides/mics-for-creators.html'], ['guides/usb-mics.html']].forEach(([f]) => {
  const h = fs.readFileSync(f, 'utf8');
  const t = '<h3 class="guide-product-card-title">Audio-Technica AT2040USB</h3>';
  const i = h.indexOf(t);
  const cardStart = h.lastIndexOf('<div class="guide-product-card"', i);
  const seg = h.slice(cardStart, i);
  const m = seg.match(/shop-price[^>]*>([\s\S]{0,200})/);
  console.log(f + ' primario: ' + (m ? m[1].replace(/<[^>]+>/g, '').trim().slice(0, 60) : 'NO-ENCONTRADO'));
});
