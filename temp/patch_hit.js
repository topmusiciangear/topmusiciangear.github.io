const fs = require('fs');
let s = fs.readFileSync('build-guides.js', 'utf8');
const old = ".guide-search-hit{background:var(--accent);color:#fff;border-radius:2px;padding:0 2px}";
const neu = ".guide-search-hit{background:var(--accent);color:#fff;border-radius:2px;padding:0 2px;outline:2px solid #fff}";
const old2 = ".guide-search-hit--active{background:var(--accent);outline:2px solid #fff}";
const neu2 = ".guide-search-hit--active{background:var(--accent);outline:2px solid #fff}";
if (!s.includes(old)) { console.log('NOT FOUND'); process.exit(1); }
s = s.replace(old, neu).replace(old2, neu2);
fs.writeFileSync('build-guides.js', s);
console.log('done');