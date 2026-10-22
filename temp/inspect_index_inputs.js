const fs = require('fs');
const h = fs.readFileSync('index.html', 'utf8');
const re = /<input[^>]*>/g;
let m, n = 0;
while ((m = re.exec(h))) {
  n++;
  console.log('--- input', n, 'at', m.index);
  console.log(m[0].slice(0, 500));
}
console.log('--- all search-related ids');
for (const w of ['searchInput', 'guideSearch', 'search-guides', 'guide-search', 'searchQuery']) {
  console.log(w, (h.match(new RegExp(w, 'g')) || []).length);
}
