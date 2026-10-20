const fs = require('fs');
for (const f of ['guides/best-studio-monitors-under-150.html', 'guides/best-studio-monitors-under-150_es.html']) {
  const h = fs.readFileSync(f, 'utf8');
  console.log('=== ' + f);
  const re = /(9\.[0-9])/g;
  const counts = {};
  let m;
  while ((m = re.exec(h))) counts[m[1]] = (counts[m[1]] || 0) + 1;
  console.log('score occurrences:', JSON.stringify(counts));
  for (const s of ['9.8', '9.6', '9.5', '9.4', '9.3']) {
    const idx = h.indexOf(s);
    if (idx > -1) console.log('  first ' + s + ' ctx: ' + h.slice(Math.max(0, idx - 130), idx + 20).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
  }
}
