const fs = require('fs');
for (const f of ['guides/best-digital-pianos.html', 'guides/best-digital-pianos_es.html']) {
  const h = fs.readFileSync(f, 'utf8');
  const i = h.indexOf('guide-section-split">');
  const b = h.indexOf('guide-section-prods-below">', i);
  console.log(f);
  console.log('  side names:', [...h.slice(i, b).matchAll(/guide-section-prod-name">([^<]+)</g)].map(m => m[1]).join(' / '));
  const seg = h.slice(b, b + 6000);
  console.log('  below names:', [...seg.matchAll(/guide-section-prod-name">([^<]+)</g)].map(m => m[1]).join(' / '));
}
