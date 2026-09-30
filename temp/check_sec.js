const fs = require('fs');
const file = process.argv[2] || 'guides/best-monitors.html';
const h = fs.readFileSync(file, 'utf8');
const i = h.indexOf('Is the JBL 305P MkII the Best Studio Monitor');
console.log('=== 500 antes + 3000 despues del heading JBL ===');
console.log(h.slice(Math.max(0, i - 500), i + 3000));
