const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/stream-controllers.html', 'utf8');
const parts = h.split('<h2 class="guide-section-heading"');
parts.forEach((p, i) => {
  if (i === 0) return;
  const hm = p.match(/>([^<]{5,100})</);
  const head = hm ? hm[1] : '?';
  const imgs = [];
  const re = /<img src="([^"]+)"[^>]*class="guide-section-img/g;
  let m;
  while ((m = re.exec(p)) !== null) imgs.push(m[1].split('/').pop().slice(0, 40));
  console.log('S' + i + ' ' + head.slice(0, 50) + ' | ' + JSON.stringify(imgs));
});