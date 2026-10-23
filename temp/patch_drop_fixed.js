const fs = require('fs');
let s = fs.readFileSync('build-guides.js', 'utf8');
const old = ".top-search-drop{position:absolute;top:100%;right:0;margin-top:8px;";
const neu = ".top-search-drop{position:fixed;top:70px;right:16px;margin-top:0;";
if (!s.includes(old)) { console.log('NOT FOUND'); process.exit(1); }
s = s.replace(old, neu);
fs.writeFileSync('build-guides.js', s);
console.log('done');