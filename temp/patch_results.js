const fs = require('fs');
let s = fs.readFileSync('build-guides.js', 'utf8');
const old = ".top-search-results{max-height:300px;overflow-y:auto;margin-top:6px}";
const neu = ".top-search-results{max-height:300px;overflow-y:auto;margin-top:0}";
if (!s.includes(old)) { console.log('NOT FOUND'); process.exit(1); }
s = s.replace(old, neu);
fs.writeFileSync('build-guides.js', s);
console.log('done');