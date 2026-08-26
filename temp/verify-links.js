const fs = require('fs');
const checks = [
  'guides/best-electric-guitar.html',
  'guides/best-interface.html',
  'guides/guitar-pedals.html',
  'guides/daw-guide.html',
  'guides/best-plugins.html',
  'guides/best-electric-guitar_es.html',
  'guides/guitar-pedals_es.html',
];
checks.forEach(f => {
  const h = fs.readFileSync(f, 'utf8');
  const links = (h.match(/guide-link-btn/g) || []).length;
  const hrefMatches = [...h.matchAll(/href="\/guides\/([^"]+)\.html"/g)];
  const unique = [...new Set(hrefMatches.map(m => m[1]))].slice(0, 10);
  console.log(f + ': ' + links + ' guide-link-btn links');
  console.log('  targets: ' + unique.join(', '));
});
