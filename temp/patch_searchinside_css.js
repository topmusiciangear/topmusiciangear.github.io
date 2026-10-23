const fs = require('fs');
let s = fs.readFileSync('build-guides.js', 'utf8');
const r = (a,b) => { if(!s.includes(a)){console.log('MISSING:',a.slice(0,60)); process.exit(1);} s=s.replace(a,b); };
r(".top-search-input{width:100%;padding:8px 12px;font-size:13px;color:var(--text);background:var(--bg-secondary);border:none!important;border-radius:6px;outline:none!important;box-shadow:none;box-sizing:border-box}",
  ".top-search-input-wrap{position:relative}.top-search-input{width:100%;padding:8px 12px 8px 34px;font-size:13px;color:var(--text);background:var(--bg-secondary);border:none!important;border-radius:6px;outline:none!important;box-shadow:none;box-sizing:border-box}.top-search-go{position:absolute;left:8px;top:50%;transform:translateY(-50%);background:none;border:none;color:#fff;cursor:pointer;padding:2px 4px;font-size:14px;line-height:1}.top-search-go:hover{color:var(--accent)}");
fs.writeFileSync('build-guides.js', s);
console.log('done');