const fs = require('fs');
const s = fs.readFileSync(process.argv[2], 'utf8');
const blocks = s.split('<div class="guide-product-card').slice(1);
for (const b of blocks) {
  const img = b.match(/<img[^>]*src="([^"]+)"/);
  const title = b.match(/guide-product-card-title[^>]*>\s*([^<]{2,80})/);
  console.log((img ? img[1] : '-').padEnd(40) + ' | ' + (title ? title[1].trim() : '-'));
}
