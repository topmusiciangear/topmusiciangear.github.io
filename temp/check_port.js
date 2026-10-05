const fs = require('fs');
const P = require('C:/Users/Daniel/projects/topmusiciangear/data/products.json');
const id2img = {};
P.forEach(p => { if (p.img) id2img[p.id] = p.img.split('/').pop().slice(0, 30); });
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/portable-interfaces.html', 'utf8');
const parts = h.split('<h2 class="guide-section-heading"');
parts.forEach((p, i) => {
  if (i === 0) return;
  const hm = p.match(/>([^<]{5,100})</);
  const imgs = [];
  const re = /<img src="([^"]+)"[^>]*class="guide-section-img/g;
  let m;
  while ((m = re.exec(p)) !== null) imgs.push(m[1].split('/').pop().slice(0, 30));
  console.log('S' + i + ' ' + (hm ? hm[1].slice(0, 45) : '?') + ' | ' + JSON.stringify(imgs));
});
console.log('---ES---');
const he = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/portable-interfaces_es.html', 'utf8');
const pe = he.split('<h2 class="guide-section-heading"');
pe.forEach((p, i) => {
  if (i === 0) return;
  const hm = p.match(/>([^<]{5,100})</);
  const imgs = [];
  const re = /<img src="([^"]+)"[^>]*class="guide-section-img/g;
  let m;
  while ((m = re.exec(p)) !== null) imgs.push(m[1].split('/').pop().slice(0, 30));
  console.log('S' + i + ' ' + (hm ? hm[1].slice(0, 45) : '?') + ' | ' + JSON.stringify(imgs));
});