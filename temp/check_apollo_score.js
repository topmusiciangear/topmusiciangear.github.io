const fs = require('fs');
for (const f of ['guides/apollo-vs-babyface.html', 'guides/apollo-vs-babyface_es.html']) {
  const h = fs.readFileSync(f, 'utf8');
  console.log('---', f);
  const re = /nota: ([0-9.]+) sobre 10/g;
  let m;
  while ((m = re.exec(h))) console.log('aria-badge:', m[1]);
  const re2 = />([0-9]\.[0-9])<\/div><div style="color:#fff;font-weight:800;font-size:calc\(var\(--badge-size\)\*0\.11\)/g;
  while ((m = re2.exec(h))) console.log('badge-text:', m[1]);
}
