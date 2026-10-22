const fs = require('fs');
const h = fs.readFileSync('index.html', 'utf8');
console.log('searchInput occurrences:', (h.match(/searchInput/g) || []).length);
let i = h.indexOf('id="guides"');
console.log(h.slice(i - 400, i + 4500));
