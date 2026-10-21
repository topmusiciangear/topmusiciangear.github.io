const fs = require('fs');
const files = [
  'guides/monitor-setup.html', 'guides/monitor-setup_es.html',
  'guides/starter-studio.html', 'guides/starter-studio_es.html',
  'guides/best-monitors.html', 'guides/best-monitors_es.html'
];
for (const f of files) {
  if (!fs.existsSync(f)) continue;
  const s = fs.readFileSync(f, 'utf8');
  const t = [...s.matchAll(/guide-product-card-title">([^<]+)</g)].map(m => m[1]);
  console.log('\n' + f);
  t.forEach(x => console.log('  ' + x));
}
