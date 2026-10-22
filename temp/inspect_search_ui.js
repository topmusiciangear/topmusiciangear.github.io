const fs = require('fs');
const files = ['js/app.js', 'js/app.min.js', 'index.html', 'build-guides.js'];
for (const f of files) {
  const s = fs.readFileSync(f, 'utf8');
  console.log('=====', f);
  for (const w of ['search-input', 'searchInput', 'Buscar', 'buscar', 'magnifying', 'fa-search', 'search-wrap', 'search-guide']) {
    let i = -1, n = 0;
    while ((i = s.indexOf(w, i + 1)) > -1 && n < 4) {
      console.log(`[${w}]`, s.slice(Math.max(0, i - 140), i + 120).replace(/\s+/g, ' '));
      n++;
    }
  }
}
