const fs = require('fs');
['guides/best-bass-home-office.html', 'guides/best-bass-home-office_es.html'].forEach(f => {
  const b = fs.readFileSync(f, 'utf8');
  const cards = (b.match(/class="guide-product-card"/g) || []).length;
  const tm = b.match(/<title>([^<]+)/);
  const names = ['EHB1000', 'M6 Headless', 'Ultra-Light', 'TB-4P', 'U-Bass', 'Mustang', 'G2220', 'Minion'].map(n => n + ':' + (b.includes(n) ? 'Y' : 'N')).join(' ');
  console.log(f + ': cards=' + cards + ' | title=' + (tm ? tm[1] : '?'));
  console.log('  products: ' + names);
});
