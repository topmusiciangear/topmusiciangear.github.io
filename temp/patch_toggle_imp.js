const fs = require('fs');
let s = fs.readFileSync('build-guides.js', 'utf8');
const old = ".top-search-toggle{background:none;border:none;color:#fff;cursor:pointer;padding:4px 6px;font-size:22px;line-height:1}";
const neu = ".top-search-toggle{background:none!important;border:none!important;color:#fff!important;cursor:pointer;padding:4px 6px;font-size:22px;line-height:1}";
if (!s.includes(old)) { console.log('NOT FOUND'); process.exit(1); }
s = s.replace(old, neu);
fs.writeFileSync('build-guides.js', s);
console.log('done');