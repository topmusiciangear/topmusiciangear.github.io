const fs = require('fs');
let s = fs.readFileSync('build-guides.js', 'utf8');
const old = ".header-right{position:relative!important}";
const neu = ".header-right{position:relative!important}\nheader{position:sticky!important;top:0!important;transform:none!important}";
if (!s.includes(old)) { console.log('NOT FOUND'); process.exit(1); }
s = s.replace(old, neu);
fs.writeFileSync('build-guides.js', s);
console.log('done');