const fs = require('fs');
const s = fs.readFileSync('js/app.js', 'utf8');
for (const w of ['productSearchInput', 'searchInput', 'searchQuery', 'renderGuideGrid']) {
  console.log('=====', w);
  let i = -1, n = 0;
  while ((i = s.indexOf(w, i + 1)) > -1 && n < 8) {
    console.log(s.slice(Math.max(0, i - 180), i + 180).replace(/\s+/g, ' '));
    n++;
  }
}
