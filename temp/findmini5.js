const fs = require('fs');
const h = fs.readFileSync('guides/best-bass-practice-amps.html', 'utf8');
const i = h.indexOf('guide-section-mediabuy', h.indexOf('Spark MINI the Best'));
console.log('mediabuy idx:', i);
if (i > -1) {
  const seg = h.slice(i, i + 12000);
  const re = /data-store="([a-z]+)"[^>]*href="([^"]{0,140})/g;
  let m;
  while ((m = re.exec(seg)) !== null) console.log(m[1], '->', m[2]);
}