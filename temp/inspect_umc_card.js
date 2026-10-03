const fs = require('fs');
const h = fs.readFileSync('guides/budget-interfaces.html', 'utf8');
const i = h.indexOf('Full Band?');
console.log(h.slice(i, 4000).replace(/\s+/g, ' ').slice(0, 3000));