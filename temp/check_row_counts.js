const fs = require('fs');
for (const f of ['guides/best-nylon-guitars-for-beginners.html', 'guides/best-nylon-guitars-for-beginners_es.html', 'guides/best-plugins.html', 'guides/best-plugins_es.html']) {
  const s = fs.readFileSync(f, 'utf8');
  const labels = [...s.matchAll(/Comparar en (\d+) tiendas más|Compare (\d+) more stores/g)].map(m => m[1] || m[2]);
  const tally = {};
  labels.forEach(n => tally[n] = (tally[n] || 0) + 1);
  const rows = {};
  for (const m of s.matchAll(/data-store="([a-z0-9]+)" href="([^"]*)"/g)) {
    rows[m[1]] = (rows[m[1]] || 0) + 1;
  }
  console.log(f.split('/').pop().padEnd(45), 'labels', JSON.stringify(tally), 'rows', JSON.stringify(rows));
}
