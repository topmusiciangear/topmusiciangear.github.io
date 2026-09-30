const fs = require('fs');
const file = process.argv[2] || 'guides/best-monitors.html';
const h = fs.readFileSync(file, 'utf8');
const start = h.indexOf('What Products Are in This Guide?');
const seg = h.slice(start, start + 120000);
const marks = [];
let idx = 0;
while ((idx = seg.indexOf('<div class="guide-product-card"', idx)) >= 0) { marks.push(idx); idx += 10; }
console.log('cards=' + marks.length);
marks.forEach((m, i) => {
  const c = seg.slice(m, m + 2500);
  const t = (c.match(/<h3[^>]*>([\s\S]*?)<\/h3>/) || [])[1] || '';
  const idm = c.match(/data-product-id="(\d+)"|product-(\d+)|"id":(\d+)|products\/(\d+)|#product-(\d+)/) || [];
  const id = idm.slice(1).find(Boolean);
  console.log(i, id || '?', t.replace(/<[^>]+>/g, '').trim().slice(0, 160));
});
