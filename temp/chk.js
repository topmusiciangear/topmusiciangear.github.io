const fs = require('fs');
['midi-controllers', 'best-keyboard', 'wireless-intercom-systems', 'j48-vs-rndi', 'budget-bass-like-expensive', 'best-hardware-samplers'].forEach(id => {
  const h = fs.readFileSync('guides/' + id + '.html', 'utf8');
  const n = (h.match(/guide-faq-item/g) || []).length;
  console.log(id, 'faq-items=' + n);
});