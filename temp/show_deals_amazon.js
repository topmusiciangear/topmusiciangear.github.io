const fs = require('fs');
for (const f of ['deals.html', 'deals_es.html']) {
  const s = fs.readFileSync(f, 'utf8');
  const m = Array.from(s.matchAll(/href="([^"]*amazon[^"]*)"/g)).map(x => x[1]);
  console.log('== ' + f + '  (' + m.length + ')');
  Array.from(new Set(m)).forEach(u => console.log('  ' + u.slice(0, 150)));
}
