const fs = require('fs');
let s = fs.readFileSync('build-guides.js', 'utf8');
const old = "html,body{touch-action:pan-y pinch-zoom!import";
const neu = "html,body{touch-action:manipulation!import";
if (!s.includes(old)) { console.log('NOT FOUND'); process.exit(1); }
s = s.replace(old, neu);
fs.writeFileSync('build-guides.js', s);
console.log('done');