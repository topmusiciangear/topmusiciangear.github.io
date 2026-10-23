const fs = require('fs');
let s = fs.readFileSync('build-guides.js', 'utf8');
const old = ".top-search-toggle{background:none;border:none;color:var(--text-secondary);cursor:pointer;padding:4px 6px;font-size:16px;line-height:1}";
const neu = ".top-search-toggle{background:rgba(59,130,246,.15);border:1px solid var(--accent);color:var(--accent);cursor:pointer;padding:6px 8px;font-size:18px;line-height:1;border-radius:6px}";
if (!s.includes(old)) { console.log('NOT FOUND'); process.exit(1); }
s = s.replace(old, neu);
fs.writeFileSync('build-guides.js', s);
console.log('done');