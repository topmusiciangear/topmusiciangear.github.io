const fs = require('fs');
const f = 'C:/Users/Daniel/projects/topmusiciangear/temp/vp_a.js';
let s = fs.readFileSync(f, 'utf8');
s = s.split('\u7684').join('de ');
fs.writeFileSync(f, s, 'utf8');
const left = s.match(/[^\x00-\x7F\u00A0-\u024F\u00B0\u00A8\u2010-\u203A\u2013\u2014\u2019\u201C\u201D\u00D7]/g);
console.log('no latinos: ' + JSON.stringify([...new Set(left || [])]));
const i = s.indexOf('tres vías');
console.log('...context: ' + s.slice(i - 60, i + 40));