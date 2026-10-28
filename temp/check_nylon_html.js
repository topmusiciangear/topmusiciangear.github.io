const fs = require('fs');
for (const f of ['guides/best-nylon-guitars-for-beginners.html', 'guides/best-nylon-guitars-for-beginners_es.html']) {
  const h = fs.readFileSync(f, 'utf8');
  console.log('===', f, '===');
  console.log('guide-section-buy blocks:', (h.match(/store-buttons guide-section-buy/g) || []).length);
  for (const needle of ['449.99', '284.00', '769.00', '379.99', 'item--CODC5', 'Ortega-R121-NT', 'Taylor-Academy-12e-N', 'item--IBAGA35TCE', 'admira-alba-full-size', 'art-GIT0012345', 'art-GIT0098765', 'XXXXXX']) {
    console.log(' ', needle, '->', (h.split(needle).length - 1));
  }
  console.log(' TEST_SHOP_BTN present:', h.includes('TEST_SHOP_BTN'));
}
