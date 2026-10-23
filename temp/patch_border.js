const fs = require('fs');
let s = fs.readFileSync('build-guides.js', 'utf8');
const r = (a,b) => { if(!s.includes(a)){console.log('MISSING:',a.slice(0,50)); process.exit(1);} s=s.replace(a,b); };
r(".top-search-drop{position:fixed;top:70px;right:16px;margin-top:0;background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:8px;min-width:260px;box-shadow:0 8px 24px rgba(0,0,0,.4);z-index:9999}",
  ".top-search-drop{position:fixed;top:70px;right:16px;margin-top:0;background:var(--bg-card);border:1px solid var(--accent);border-radius:8px;padding:8px;min-width:260px;box-shadow:0 8px 24px rgba(0,0,0,.4);z-index:9999}");
r(".top-search-btn{background:none;border:1px solid var(--border);color:var(--text-muted);cursor:pointer;padding:4px 8px;font-size:14px;border-radius:4px;line-height:1}",
  ".top-search-btn{background:none;border:1px solid var(--border);color:#fff;cursor:pointer;padding:4px 8px;font-size:14px;border-radius:4px;line-height:1}");
r(".top-search-input{width:100%;padding:8px 12px;font-size:13px;color:var(--text);background:var(--bg-secondary);border:1px solid var(--border);border-radius:6px;outline:none;box-sizing:border-box}",
  ".top-search-input{width:100%;padding:8px 12px;font-size:13px;color:var(--text);background:var(--bg-secondary);border:1px solid var(--border);border-radius:6px;outline:none;box-sizing:border-box}.top-search-input::placeholder{color:#fff;opacity:.7}");
fs.writeFileSync('build-guides.js', s);
console.log('done');