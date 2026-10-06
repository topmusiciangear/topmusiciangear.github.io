const fs = require('fs');
for (const f of ['guides/best-digital-pianos.html', 'guides/best-digital-pianos_es.html']) {
  const h = fs.readFileSync(f, 'utf8');
  console.log(f);
  console.log('  wide:', h.includes('guide-section guide-section-wide') ? 'OK' : 'FALTA');
  console.log('  split-gone:', !h.includes('guide-section-split">') ? 'OK' : 'TODAVIA');
  console.log('  below-gone:', !h.includes('guide-section-prods-below') ? 'OK' : 'TODAVIA');
  const i = h.indexOf('guide-section guide-section-wide');
  const seg = h.slice(i, i + 12000);
  console.log('  blocks:', [...seg.matchAll(/guide-section-prod-name">([^<]+)</g)].map(m => m[1]).join(' / '));
}
