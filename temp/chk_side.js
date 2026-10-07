const fs = require('fs');
for (const f of ['guides/sidechain-modulation-plugins.html', 'guides/sidechain-modulation-plugins_es.html']) {
  const h = fs.readFileSync(f, 'utf8');
  const key = '<table class="guide-comp-table"';
  const seg = h.slice(h.indexOf(key), h.indexOf(key) + 8000).replace(/<[^>]+>/g, '|').replace(/\|+/g, '|');
  console.log('=== ' + f);
  console.log(seg.slice(0, 2200));
}
