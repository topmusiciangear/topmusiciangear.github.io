const fs = require('fs');
const s = fs.readFileSync(process.argv[2], 'utf8');
const m = s.match(/class="[^"]*guide-product[^"]*"/g) || [];
console.log([...new Set(m)].slice(0, 12).join('\n'));
