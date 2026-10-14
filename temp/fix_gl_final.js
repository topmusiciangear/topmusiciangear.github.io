const fs = require('fs');
const f = 'C:/Users/Daniel/projects/topmusiciangear/temp/gl_final.js';
let s = fs.readFileSync(f, 'utf8');
s = s.split('Fendergels\u00f3').join('Fender compr\u00f3');
s = s.split('la plantilla fueROIDa suspendida').join('la plantilla fue suspendida');
fs.writeFileSync(f, s, 'utf8');
const left = s.match(/[^\x00-\x7F\u00A0-\u024F\u00B0\u00A8\u2010-\u203A\u2013\u2014\u2019\u201C\u201D\u00D7\u00A9]/g);
console.log('fixes aplicados | no latinos: ' + JSON.stringify([...new Set(left || [])]));