const fs = require('fs');
const t = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-reverb-delay.html', 'utf8');
const i = t.indexOf('Twelve Machines, Endless Echoes');
const seg = t.slice(i, i + 25000);
const re = /data-store="gear4music"[^>]*>/g;
let m;
while ((m = re.exec(seg))) {
  console.log(JSON.stringify(m[0].slice(0, 400)));
  if (String(m[0]).includes('TimeLine')) break;
  break;
}
const i2 = seg.indexOf('data-store="gear4music"');
console.log('---FULL ROW---');
console.log(JSON.stringify(seg.slice(i2, i2 + 900)));
