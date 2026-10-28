const fs = require('fs');
const h = fs.readFileSync('guides/best-nylon-guitars-for-beginners.html', 'utf8');
// find the dropdown of the first section block
const i = h.indexOf('store-buttons guide-section-buy');
const end = h.indexOf('</div></div></div>', i);
const block = h.slice(i, i + 30000);
const rows = block.match(/data-store="[a-z0-9]+"[\s\S]{0,700}?<\/a>/g) || [];
console.log('rows found (first 8):');
rows.slice(0, 10).forEach((r, k) => {
  const store = (r.match(/data-store="([a-z0-9]+)"/) || [])[1];
  const price = (r.match(/- [^<]{0,24}?<\/(?:span|div)>/) || [])[0] || '';
  const txt = r.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 90);
  console.log(k, store, '|', txt);
});
