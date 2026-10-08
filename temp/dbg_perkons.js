const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-drum-machine.html', 'utf8');
console.log('1965:', h.includes('1965'), '| 1,965:', h.includes('1,965'));
const i = h.indexOf('1103693');
console.log(h.slice(Math.max(0, i - 200), i + 100).replace(/\n/g, ' '));
