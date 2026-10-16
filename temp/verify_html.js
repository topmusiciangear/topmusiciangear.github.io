const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
[['guides/mixing-plugins.html', 'SSL Mastering Bundle', 'ISL 2st'],
 ['guides/mixing-plugins_es.html', 'SSL Mastering Bundle', 'ISL 2st'],
 ['guides/vocal-plugins.html', 'RePitch 2', 'VocAlign'],
 ['guides/vocal-plugins_es.html', 'RePitch 2', 'VocAlign']].forEach(([f, t1, t2]) => {
  const h = fs.readFileSync(B + f, 'utf8');
  const cards = (h.match(/guide-product-card-title/g) || []).length;
  console.log(f + ': ' + t1 + '=' + h.includes(t1) + ' ' + t2 + '=' + h.includes(t2) + ' cards=' + cards);
});
