const fs = require('fs');
for (const f of ['guides/best-studio-monitors-under-150.html', 'guides/best-studio-monitors-under-150_es.html']) {
  const h = fs.readFileSync(f, 'utf8');
  const alt = (h.match(/<link rel="alternate"[^>]*>/g) || []).filter(x => /hreflang/.test(x));
  console.log(f);
  alt.forEach(a => console.log('  ' + a));
  const og = (h.match(/property="og:url" content="([^"]+)"/) || [])[1];
  console.log('  og:url:', og);
  const ld = h.match(/"@type":"Article"/) ? 'Article JSON-LD ok' : 'no Article JSON-LD';
  console.log('  ' + ld);
}
