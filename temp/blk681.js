const fs = require('fs');
const sb = fs.readFileSync('js/shop-buttons.js', 'utf8');
const i = sb.indexOf('\n  681: {');
console.log(sb.slice(i, i + 1400));