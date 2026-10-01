const fs = require('fs');
[['guides/mics-for-creators.html', 'Audio-Technica AT2040USB'], ['guides/usb-mics.html', 'Audio-Technica AT2040USB']].forEach(([f, t]) => {
  const h = fs.readFileSync(f, 'utf8');
  const i = h.indexOf('>' + t + '<');
  if (i < 0) { console.log(f + ': tarjeta NO encontrada'); return; }
  const seg = h.slice(Math.max(0, i - 6000), i + 2000);
  const prices = [...new Set([...seg.matchAll(/data-price='([^']+)'/g)].map(m => m[1]))];
  console.log(f + ': ' + prices.join(' '));
});
