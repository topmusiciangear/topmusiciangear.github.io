const fs = require('fs');
const h = fs.readFileSync('guides/best-studio-monitors-under-150.html', 'utf8');
const i = h.indexOf('Mackie CR4.5', h.indexOf('verdict'));
const j = h.indexOf('guide-verdict-grid');
console.log('grid idx', j);
console.log(h.slice(j, j + 1800));
