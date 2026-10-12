var fs = require('fs');
var f = 'build-guides.js';
var s = fs.readFileSync(f, 'utf8');
// current broken: + ';color:#FFC107\'">'  -> correct: + ';color:#FFC107'">'
var a = ";color:#FFC107\\'\">'";
var b = ";color:#FFC107'\">'";
var n = s.split(a).length - 1;
console.log('broken spots: ' + n);
s = s.split(a).join(b);
fs.writeFileSync(f, s);
console.log('reverted to correct quoting');
