const fs = require('fs');
['guides/best-5-string-basses.html', 'guides/best-5-string-basses_es.html'].forEach(f => {
  const ex = fs.existsSync(f);
  if (!ex) { console.log(f + ': MISSING'); return; }
  const b = fs.readFileSync(f, 'utf8');
  const cards = (b.match(/class="guide-product-card"/g) || []).length;
  const tm = b.match(/<title>([^<]+)/);
  const names = ['GSR205B', 'Ray5', 'TRBX305', 'Affinity', 'V7', 'BB435', 'SR505E', 'Classic Vibe', 'Professional II', 'StingRay Special 5', 'EHB1005MS', 'Combustion'];
  console.log(f + ': cards=' + cards + ' | title=' + (tm ? tm[1] : '?'));
  console.log('  ' + names.map(n => n + ':' + (b.includes(n) ? 'Y' : 'N')).join(' '));
});
