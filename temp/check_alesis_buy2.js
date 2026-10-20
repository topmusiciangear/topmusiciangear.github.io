const fs = require('fs');
for (const f of ['guides/best-home-studio-speakers_es.html', 'guides/best-home-studio-speakers.html']) {
  const h = fs.readFileSync(f, 'utf8');
  const start = h.indexOf('id="sec-9"');
  const end = h.indexOf('id="sec-10"') > 0 ? h.indexOf('id="sec-10"') : h.indexOf('guide-faq', start);
  const seg = h.slice(start, end);
  console.log('=== ' + f + ' (section len ' + seg.length + ') ===');
  const stores = seg.match(/data-store="[a-z0-9]+"/g) || [];
  console.log('store anchors:', stores.join(', '));
  const prices = seg.match(/(?:\$|£|€)[\d,.]+/g) || [];
  console.log('prices in section:', prices.join(' | '));
  console.log('mentions compare:', /Comparar|Compare/.test(seg));
  const more = seg.match(/Comparar[^<]{0,40}|Compare[^<]{0,40}/g) || [];
  console.log('button labels:', more.join(' / '));
  // find TEST_SHOP_BTN embedded entry
  const emb = h.indexOf('1052:');
  console.log('embedded 1052 entry at', emb, emb > 0 ? h.slice(emb, emb + 160).replace(/\n/g, ' ') : '');
  console.log('');
}
