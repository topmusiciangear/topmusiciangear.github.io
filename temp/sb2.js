const fs = require('fs');
const lines = fs.readFileSync('js/shop-buttons.js', 'utf8').split('\n');
console.log(lines.slice(5688, 5706).join('\n'));