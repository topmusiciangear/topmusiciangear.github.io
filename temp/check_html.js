const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/stream-controllers.html', 'utf8');
const parts = h.split('guide-section-heading');
parts.forEach((p, i) => {
  if (i === 0) return;
  const hm = p.match(/>([^<]{5,90})</);
  const head = hm ? hm[1] : '?';
  const imgs = [];
  const re = /guide-section-img"[^>]*src="([^"]+)"/g;
  let m;
  while ((m = re.exec(p)) !== null) imgs.push(m[1].slice(-50));
  console.log('S' + i + ' ' + head + ' | imgs: ' + JSON.stringify(imgs));
});