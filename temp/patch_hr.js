const fs = require('fs');
let s = fs.readFileSync('build-guides.js', 'utf8');
const old = "guide-search-hit--active{background:var(--accent);outline:2px solid #fff}\n";
const neu = "guide-search-hit--active{background:var(--accent);outline:2px solid #fff}\n.header-right{position:relative!important}\n";
if (!s.includes(old)) { console.log('NOT FOUND'); process.exit(1); }
s = s.replace(old, neu);
fs.writeFileSync('build-guides.js', s);
console.log('done');