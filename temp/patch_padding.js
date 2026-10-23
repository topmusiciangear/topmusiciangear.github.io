const fs = require('fs');
let s = fs.readFileSync('build-guides.js', 'utf8');
const r = (a,b) => { if(!s.includes(a)){console.log('MISSING:',a.slice(0,60)); process.exit(1);} s=s.replace(a,b); };
r(".top-search-drop{position:fixed;top:70px;right:16px;margin-top:0;background:var(--bg-card);border:1px solid var(--accent);border-radius:8px;padding:8px;min-width:260px;box-shadow:0 8px 24px rgba(0,0,0,.4);z-index:9999}",
  ".top-search-drop{position:fixed;top:70px;right:16px;margin-top:0;background:var(--bg-card);border:1px solid var(--accent);border-radius:8px;padding:8px 8px 4px;min-width:260px;box-shadow:0 8px 24px rgba(0,0,0,.4);z-index:9999}");
r(".top-search-results{max-height:300px;overflow-y:auto;margin-top:6px}",
  ".top-search-results{max-height:300px;overflow-y:auto;margin-top:4px}");
fs.writeFileSync('build-guides.js', s);
console.log('done');
"