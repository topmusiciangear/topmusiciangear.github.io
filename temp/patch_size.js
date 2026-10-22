const fs = require('fs');
let s = fs.readFileSync('build-guides.js', 'utf8');
const old = "\n.guide-search-wrap{flex:0 1 320px;min-width:180px;margin-left:auto;display:flex;align-items:center;gap:6px}\n";
const neu = "\n.guide-search-wrap{flex:0 0 auto;min-width:120px;max-width:200px;margin-left:auto;display:flex;align-items:center;gap:6px}\n";
if (!s.includes(old)) { console.log('NOT FOUND'); process.exit(1); }
s = s.replace(old, neu);
fs.writeFileSync('build-guides.js', s);
console.log('done');