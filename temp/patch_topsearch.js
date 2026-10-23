const fs = require('fs');
let s = fs.readFileSync('js/app.js', 'utf8');
const old = '}).then(function(d) { guides = d; }),';
const neu = '}).then(function(d) { guides = d; window.guides = guides; }),';
if (!s.includes(old)) { console.log('NOT FOUND'); process.exit(1); }
s = s.replace(old, neu);
// append top_search.js
const ts = fs.readFileSync('temp/top_search.js', 'utf8');
s = s + '\n' + ts;
fs.writeFileSync('js/app.js', s);
console.log('done');