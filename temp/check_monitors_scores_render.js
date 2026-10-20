const fs = require('fs');
for (const f of ['guides/best-studio-monitors-under-150.html', 'guides/best-studio-monitors-under-150_es.html']) {
  const h = fs.readFileSync(f, 'utf8');
  console.log('=== ' + f);
  const grid = h.slice(h.indexOf('guide-verdict-grid'));
  const seg = grid.slice(0, 9000);
  const items = seg.split('verdict-product-card').slice(1);
  items.forEach((it, i) => {
    const name = (it.match(/verdict-product-name">([^<]+)</) || [])[1];
    const score = (it.match(/([0-9]\.[0-9])\s*<\/(?:span|div)>/) || [])[1];
    if (name) console.log('  ' + (i + 1) + '. ' + name + ' -> ' + score);
  });
  const table = h.slice(h.indexOf('comparison-table') === -1 ? h.indexOf('<table') : h.indexOf('comparison-table'));
  const ths = (table.slice(0, 4000).match(/<th[\s\S]*?<\/th>/g) || []).map(x => x.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
  console.log('  table headers:', ths.slice(0, 8).join(' | '));
  const badges = (h.match(/score-badge[^>]*>([\s\S]{0,30}?)</g) || []).slice(0, 12);
  console.log('  score badges sample:', badges.map(b => b.replace(/<[^>]*>/g, '').trim()).join(', '));
}
