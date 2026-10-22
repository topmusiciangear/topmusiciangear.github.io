const fs = require('fs');
let s = fs.readFileSync('build-guides.js', 'utf8');
const r1 = (a,b) => { if(!s.includes(a)){console.log('MISSING:',a.slice(0,40)); process.exit(1);} s=s.replace(a,b); };
r1("\n.guide-search-wrap{flex:0 1 320px;min-width:180px;margin-left:auto;position:relative}\n",
   "\n.guide-search-wrap{flex:0 1 320px;min-width:180px;margin-left:auto;display:flex;align-items:center;gap:6px}\n");
r1("\n.guide-search-input{width:100%;padding:8px 12px;font-size:13px;color:var(--text);background:var(--bg-card);border:1px solid var(--border);border-radius:20px;outline:none;font-family:inherit;box-sizing:border-box}\n",
   "\n.guide-search-input{flex:1;padding:6px 10px;font-size:13px;color:var(--text);background:var(--bg-card);border:1px solid var(--border);border-radius:20px;outline:none;font-family:inherit;box-sizing:border-box}\n");
r1("\n.guide-search-input{padding-right:34px}\n.guide-search-btn{position:absolute;right:6px;top:50%;transform:translateY(-50%);background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:13px;padding:2px 4px;line-height:1}\n.guide-search-btn:hover{color:var(--accent)}\n",
   "\n.guide-search-btn{background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:12px;padding:2px 4px;line-height:1;flex-shrink:0}\n.guide-search-btn:hover{color:var(--accent)}\n");
fs.writeFileSync('build-guides.js', s);
console.log('done');