const fs = require('fs');
for (const f of ['guides/wireless-intercom-systems.html', 'guides/wireless-intercom-systems_es.html']) {
  const h = fs.readFileSync(f, 'utf8');
  const t = h.match(/<title>([^<]+)<\/title>/);
  const og = h.match(/property="og:title" content="([^"]+)"/);
  const h1 = h.match(/<h1 class="guide-detail-title">([^<]+)<\/h1>/);
  const intro = h.match(/<div class="guide-detail-intro"><p>([\s\S]*?)<\/p>/);
  console.log('=== ' + f);
  console.log('title:', t ? t[1] : 'NF');
  console.log('og:title:', og ? og[1] : 'NF');
  console.log('h1:', h1 ? h1[1] : 'NF');
  console.log('intro[0:120]:', intro ? intro[1].slice(0, 120) : 'NF');
  console.log('still has "Film" title?', /for Film/.test(h), '| "Cine" in titleTag?', /para Cine/.test(h));
}