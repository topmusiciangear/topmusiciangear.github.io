const fs = require('fs');
const t = fs.readFileSync('guides/fix-clipping-scarlett_es.html', 'utf8');
const cards = t.match(/guide-product-card[^>]*>[\s\S]*?<\/div>\s*<\/div>/g) || [];
cards.forEach((c, i) => {
  const pid = c.match(/data-pid="(\d+)"/);
  const title = c.match(/alt="([^"]+)"/);
  console.log('Card ' + (i+1) + ' pid=' + (pid ? pid[1] : 'none') + ' title=' + (title ? title[1] : 'none'));
});