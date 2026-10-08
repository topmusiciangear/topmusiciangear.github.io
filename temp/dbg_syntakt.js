const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-drum-machine.html', 'utf8');
const i = h.indexOf('ELKSYNTAKT?siid');
console.log(i >= 0 ? h.slice(Math.max(0, i - 500), i + 200).replace(/\n/g, ' ') : 'LINK ABSENT');
