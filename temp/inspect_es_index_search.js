const fs = require('fs');
for (const f of ['index.html', 'es/index.html']) {
  const h = fs.readFileSync(f, 'utf8');
  console.log('=====', f, 'len', h.length);
  for (const w of ['productSearchInput', 'magnifying-glass', 'product-search-wrap']) {
    console.log(w, (h.match(new RegExp(w, 'g')) || []).length);
  }
  const i = h.indexOf('productSearchInput');
  if (i > -1) console.log(h.slice(Math.max(0, i - 900), i + 700));
}
