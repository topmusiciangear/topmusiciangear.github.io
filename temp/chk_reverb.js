const fs = require('fs');
for (const f of ['guides/best-reverb-delay.html', 'guides/best-reverb-delay_es.html']) {
  const h = fs.readFileSync(f, 'utf8');
  const key = 'Estimated Price';
  const i = h.indexOf(key);
  const seg = h.slice(i, i + 900).replace(/<[^>]+>/g, '|').replace(/\|+/g, '|');
  console.log('=== ' + f);
  console.log(seg.slice(0, 400));
  console.log('descatalogado/discontinued:', /descatalogado|discontinued/i.test(h) ? 'OK' : 'FALTA');
}
