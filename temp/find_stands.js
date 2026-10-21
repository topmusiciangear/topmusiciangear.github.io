const fs = require('fs');

for (const f of ['data/products.json', 'data/guides.json', 'build-guides.js']) {
  const s = fs.readFileSync(f, 'utf8');
  const re = /.{0,140}(?:ISO-200|ISO 200|MS-100|MS 100).{0,140}/g;
  const seen = new Set();
  let m;
  console.log('\n########## ' + f);
  while ((m = re.exec(s))) {
    const t = m[0].replace(/\s+/g, ' ').trim();
    if (seen.has(t)) continue;
    seen.add(t);
    console.log('--- ' + t);
  }
}
