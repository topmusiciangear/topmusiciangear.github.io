const fs = require('fs');
for (const f of ['guides/best-home-studio-speakers_es.html', 'guides/best-home-studio-speakers.html']) {
  const h = fs.readFileSync(f, 'utf8');
  const c = h.indexOf('guide-conclusion');
  const faq = h.indexOf('guide-faq');
  console.log('=== ' + f + ' ===');
  console.log('conclusion block:', c > 0);
  console.log('faq block:', faq > 0);
  console.log('faq mentions bookshelf:', /bookshelf|estanter/i.test(h.slice(faq, faq + 6000)));
  const v = h.indexOf('guide-verdict');
  const vt = h.slice(v, v + 200);
  console.log('verdict label snippet:', vt.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').slice(0, 120));
  const names = (h.slice(v, h.indexOf('guide-comp-title', v)).match(/verdict-product-name">([^<]+)/g) || []).map(x => x.split('>')[1]);
  console.log('verdict grid order:', names.join(' | '));
  console.log('');
}
