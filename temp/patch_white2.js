const fs = require('fs');
let s = fs.readFileSync('build-guides.js', 'utf8');
const r = (a,b) => { if(!s.includes(a)){console.log('MISSING:',a.slice(0,60)); process.exit(1);} s=s.replace(a,b); };
r(".top-search-go{position:absolute;left:8px;top:50%;transform:translateY(-50%);background:none;border:none;color:#fff;cursor:pointer;padding:2px 4px;font-size:14px;line-height:1}",
  ".top-search-go{position:absolute;left:8px;top:50%;transform:translateY(-50%);background:none;border:none;color:#fff!important;cursor:pointer;padding:2px 4px;font-size:14px;line-height:1}");
r(".top-search-input::placeholder{color:#fff;opacity:.7}",
  ".top-search-input::placeholder{color:#fff;opacity:1}");
fs.writeFileSync('build-guides.js', s);
console.log('done');