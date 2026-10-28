const fs = require('fs');
const h = fs.readFileSync('guides/best-nylon-guitars-for-beginners.html', 'utf8');
const i = h.indexOf('store-buttons guide-section-buy');
const zone = h.slice(i, i + 60000);
const rows = zone.split('<a data-store="').slice(1).map(r => 'data-store="' + r);
rows.forEach((r, k) => {
  const store = (r.match(/^data-store="([a-z0-9]+)"/) || [])[1];
  const chunk = r.slice(0, r.indexOf('</a>') + 4);
  const txt = chunk.replace(/<svg[\s\S]*?<\/svg>/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  console.log(k, store, '::', txt);
});
