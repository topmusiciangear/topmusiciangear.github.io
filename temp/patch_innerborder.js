const fs = require('fs');
let s = fs.readFileSync('build-guides.js', 'utf8');
const old = ".top-search-input{width:100%;padding:8px 12px;font-size:13px;color:var(--text);background:var(--bg-secondary);border:1px solid var(--border);border-radius:6px;outline:none;box-sizing:border-box}";
const neu = ".top-search-input{width:100%;padding:8px 12px;font-size:13px;color:var(--text);background:var(--bg-secondary);border:none;border-radius:6px;outline:none;box-sizing:border-box}";
if (!s.includes(old)) { console.log('NOT FOUND'); process.exit(1); }
s = s.replace(old, neu);
fs.writeFileSync('build-guides.js', s);
console.log('done');