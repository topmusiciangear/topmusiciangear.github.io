const fs = require('fs');
const s = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/js/shop-buttons.js', 'utf8');
const i = s.indexOf('608: {');
console.log(s.slice(i, i + 500).split('\n').join(' | '));
