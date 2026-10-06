const fs = require('fs');
for (const f of ['guides/best-digital-pianos.html', 'guides/best-digital-pianos_es.html']) {
  const h = fs.readFileSync(f, 'utf8');
  let idx = 0, n = 0;
  while ((idx = h.indexOf('$800', idx + 1)) > -1 && n < 6) {
    n++;
    console.log('==', f, idx);
    console.log(h.slice(idx - 300, idx + 140).replace(/\s+/g, ' '));
    console.log('');
  }
}
