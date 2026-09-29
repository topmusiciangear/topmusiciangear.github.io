const fs = require('fs');
const f = process.argv[2] || 'guides/studio-furniture.html';
const c = fs.readFileSync(f, 'utf8');
const i = c.indexOf('class="shop-btn-primary"');
const seg = c.slice(i, i + 1500)
  .replace(/<svg[\s\S]*?<\/svg>/g, '[svg]')
  .replace(/style="[^"]*"/g, '');
console.log('=== ' + f);
console.log(seg);
