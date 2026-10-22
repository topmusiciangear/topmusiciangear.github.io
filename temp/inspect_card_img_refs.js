const fs = require('fs');
for (const f of ['js/app.js', 'js/app.min.js', 'js/shop-buttons.js']) {
  const s = fs.readFileSync(f, 'utf8');
  console.log('=====', f, 'occurrences:', (s.match(/guide-product-card-img/g) || []).length);
  let i = -1, n = 0;
  while ((i = s.indexOf('guide-product-card-img', i + 1)) > -1 && n < 6) {
    console.log(s.slice(Math.max(0, i - 260), i + 260).replace(/\s+/g, ' '));
    n++;
  }
}
