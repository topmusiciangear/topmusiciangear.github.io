const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-drum-machine.html', 'utf8');
console.log('ELKSYNTAKT present:', h.includes('ELKSYNTAKT'));
console.log('1149 present:', h.includes('1149'));
console.log('1,149 present:', h.includes('1,149'));
const i = h.indexOf('ELKSYNTAKT');
console.log(h.slice(Math.max(0, i - 300), i + 100).replace(/\n/g, ' '));
