const fs = require('fs');
const f = 'C:/Users/Daniel/projects/topmusiciangear/temp/bbl_step4.js';
let s = fs.readFileSync(f, 'utf8');
s = s.split('\u89e6\u611f').join('el que mejor se toca');
fs.writeFileSync(f, s, 'utf8');
const left = s.match(/[^\x00-\x7F\u00A0-\u024F\u2010-\u203A]/g);
console.log('no latinos: ' + JSON.stringify([...new Set(left || [])]));
const i = s.indexOf('触感') >= 0 ? -1 : s.indexOf('mejor se toca');
console.log(s.slice(Math.max(0, i - 260), i + 60));