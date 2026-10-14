const fs = require('fs');
const f = 'C:/Users/Daniel/projects/topmusiciangear/temp/gl_step2.js';
let s = fs.readFileSync(f, 'utf8');
s = s.split('\u5b9e\u9a8c\u4e2d').join('experimentar');
fs.writeFileSync(f, s, 'utf8');
const left = s.match(/[^\x00-\x7F\u00A0-\u024F\u2010-\u203A\u00B0\u00B5\u2032\u2033\u00D7\u2013\u2014\u2019\u201C\u201D]/g);
console.log('no latinos: ' + JSON.stringify([...new Set(left || [])]));