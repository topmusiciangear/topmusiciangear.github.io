const fs = require('fs');
const sb = fs.readFileSync('js/shop-buttons.js', 'utf8');
console.log('shop-buttons new style:', (sb.match(/margin-left:auto;font-weight:700;color:#fff/g) || []).length);
console.log('shop-buttons old grey style:', (sb.match(/color:#a8a8a8;font-style:italic/g) || []).length);

const h = fs.readFileSync('guides/best-studio-monitors-under-150.html', 'utf8');
const i = h.indexOf('Mackie CR4.5');
const seg = h.slice(i, i + 6000);
const rows = seg.split('<a data-store=').slice(1);
rows.forEach(r => {
  const store = (r.match(/^"([^"]+)"/) || [])[1];
  const txt = r.slice(0, r.indexOf('</a>')).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if (store) console.log(store + ': ' + txt.slice(0, 120));
});
