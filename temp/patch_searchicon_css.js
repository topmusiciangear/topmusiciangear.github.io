const fs = require('fs');
let s = fs.readFileSync('build-guides.js', 'utf8');
const r1 = (a,b) => { if(!s.includes(a)){console.log('MISSING:',a.slice(0,50)); process.exit(1);} s=s.replace(a,b); };
r1("\n.guide-search-wrap{flex:0 0 auto;min-width:120px;max-width:200px;margin-left:auto;display:flex;align-items:center;gap:6px}\n",
   "\n.guide-search-wrap{flex:0 0 auto;min-width:120px;max-width:200px;margin-left:auto;position:relative}\n");
r1("\n.guide-search-input{flex:1;padding:6px 10px;font-size:13px;color:var(--text);background:var(--bg-card);border:1px solid var(--border);border-radius:20px;outline:none;font-family:inherit;box-sizing:border-box}\n",
   "\n.guide-search-input{width:100%;padding:6px 10px 6px 28px;font-size:13px;color:var(--text);background:var(--bg-card);border:1px solid var(--border);border-radius:20px;outline:none;font-family:inherit;box-sizing:border-box}\n");
r1("\n.guide-search-btn{background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:12px;padding:2px 4px;line-height:1;flex-shrink:0}\n.guide-search-btn:hover{color:var(--accent)}\n",
   "\n.guide-search-icon{position:absolute;left:8px;top:50%;transform:translateY(-50%);color:var(--text-muted);pointer-events:none}\n");
fs.writeFileSync('build-guides.js', s);
console.log('done');