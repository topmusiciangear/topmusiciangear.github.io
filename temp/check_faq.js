const fs = require('fs');
['guides/usb-mics.html', 'guides/usb-mics_es.html'].forEach(function (p) {
  const h = fs.readFileSync(p, 'utf8');
  const qs = [];
  const re = /guide-faq-question[^>]*>([\s\S]{0,160}?)<span class="guide-faq-icon">/g;
  let m;
  while ((m = re.exec(h)) !== null) qs.push(m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());
  console.log('=== ' + p);
  qs.forEach(function (q, i) { console.log('  ' + (i + 1) + '. ' + q); });
});