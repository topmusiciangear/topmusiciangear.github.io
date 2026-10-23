const fs = require('fs');
let s = fs.readFileSync('build-guides.js', 'utf8');
const old = ".header-right{position:relative!important}";
const neu = ".header-right{position:relative!important}\n.top-search-actions{display:flex;gap:6px;margin-top:6px;justify-content:flex-end}\n.top-search-btn{background:none;border:1px solid var(--border);color:var(--text-muted);cursor:pointer;padding:4px 8px;font-size:14px;border-radius:4px;line-height:1}\n.top-search-btn:hover{color:var(--accent);border-color:var(--accent)}";
if (!s.includes(old)) { console.log('NOT FOUND'); process.exit(1); }
s = s.replace(old, neu);
fs.writeFileSync('build-guides.js', s);
console.log('done');