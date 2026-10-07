const fs = require('fs');
const t = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-multi-effects-pedals.html', 'utf8');
const re = /data-store="gear4music" href="([^"]+)"/g;
let m, n = 0;
while ((m = re.exec(t)) && n < 10) { console.log(m[1].slice(0, 140)); n++; }
