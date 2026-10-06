const fs = require('fs');
for (const f of ['guides/best-digital-pianos.html', 'guides/best-digital-pianos_es.html']) {
  const h = fs.readFileSync(f, 'utf8');
  const key = 'guide-section-split">';
  const i = h.indexOf(key);
  console.log(f, 'split:', i > -1 ? 'OK' : 'FALTA');
  if (i > -1) {
    const seg = h.slice(i, i + 4000);
    const names = [...seg.matchAll(/guide-section-prod-name">([^<]+)</g)].map(m => m[1]);
    console.log(' blocks:', names.join(' / '));
    console.log(' has-text-div:', seg.includes('guide-section-split-text">') ? 'OK' : 'FALTA');
  }
}
