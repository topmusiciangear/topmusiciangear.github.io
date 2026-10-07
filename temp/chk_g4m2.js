const fs = require('fs');
const t = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-multi-effects-pedals.html', 'utf8');
const idx = t.indexOf('gear4music');
console.log('any gear4music:', idx >= 0);
const re = /href="([^"]*gear4music[^"]*)"/g;
let m, n = 0;
while ((m = re.exec(t)) && n < 12) { console.log(m[1].slice(0, 150)); n++; }
