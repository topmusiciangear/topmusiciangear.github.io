const b = require('fs').readFileSync('./build-guides.js', 'utf8');
let i = b.indexOf('function step(){if(done)return');
console.log('=== restore loop at', i, '===');
console.log(b.slice(i - 900, i + 1600));
