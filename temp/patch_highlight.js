const fs = require('fs');
let s = fs.readFileSync('build-guides.js', 'utf8');
const r1 = (a,b) => { if(!s.includes(a)){console.log('MISSING:',a.slice(0,60)); process.exit(1);} s=s.replace(a,b); };
r1("\n.guide-search-hit{background:rgba(59,130,246,0.45);color:var(--white);border-radius:2px;padding:0 2px}\n",
   "\n.guide-search-hit{background:var(--accent);color:#fff;border-radius:2px;padding:0 2px}\n");
r1("\n.guide-search-hit--active{background:rgba(59,130,246,0.85);outline:2px solid #3b82f6}\n",
   "\n.guide-search-hit--active{background:var(--accent);outline:2px solid #fff}\n");
fs.writeFileSync('build-guides.js', s);
console.log('done');