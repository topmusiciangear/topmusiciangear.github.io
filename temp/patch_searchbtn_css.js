const fs = require('fs');
let s = fs.readFileSync('build-guides.js', 'utf8');
const old1 = "\n.guide-search-wrap{flex:0 1 320px;min-width:180px;margin-left:auto}\n";
const neu1 = "\n.guide-search-wrap{flex:0 1 320px;min-width:180px;margin-left:auto;position:relative}\n";
if (!s.includes(old1)) { console.log('old1 NOT FOUND'); process.exit(1); }
s = s.replace(old1, neu1);
const old2 = "\n.guide-search-input:focus{border-color:var(--accent)}\n";
const neu2 = "\n.guide-search-input:focus{border-color:var(--accent)}\n.guide-search-input{padding-right:34px}\n.guide-search-btn{position:absolute;right:6px;top:50%;transform:translateY(-50%);background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:13px;padding:2px 4px;line-height:1}\n.guide-search-btn:hover{color:var(--accent)}\n";
if (!s.includes(old2)) { console.log('old2 NOT FOUND'); process.exit(1); }
s = s.replace(old2, neu2);
fs.writeFileSync('build-guides.js', s);
console.log('done');