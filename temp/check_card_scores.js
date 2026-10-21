const fs = require('fs');
const s = fs.readFileSync('guides/monitor-setup_es.html', 'utf8');
const cards = s.split('<div class="guide-product-card">').slice(1);
for (const c of cards) {
  const name = (c.match(/guide-product-card-title">([^<]+)</) || [])[1];
  const score = (c.match(/font-weight:800;font-size:calc\(var\(--badge-size\)\*0\.34\)[^>]*>([\d.]+)</) || [])[1];
  console.log((name || '?').padEnd(56), score);
}
