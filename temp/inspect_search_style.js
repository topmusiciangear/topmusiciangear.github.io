const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
for (const w of ['id="searchInput"', 'productSearchInput', 'magnifying-glass']) {
  let i = -1, n = 0;
  while ((i = html.indexOf(w, i + 1)) > -1 && n < 3) {
    console.log('===== index.html', w, i);
    console.log(html.slice(Math.max(0, i - 500), i + 900));
    n++;
  }
}
const css = fs.readFileSync('css/style.css', 'utf8');
console.log('===== CSS matches');
for (const w of ['searchInput', 'search-input', 'product-search-wrap', 'placeholder']) {
  let i = -1, n = 0;
  while ((i = css.indexOf(w, i + 1)) > -1 && n < 8) {
    console.log(`[${w}]`, css.slice(Math.max(0, i - 120), i + 160).replace(/\s+/g, ' '));
    n++;
  }
}
