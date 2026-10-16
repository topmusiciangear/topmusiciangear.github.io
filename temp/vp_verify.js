const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
['guides/vocal-plugins.html', 'guides/vocal-plugins_es.html'].forEach(f => {
  const h = fs.readFileSync(B + f, 'utf8');
  const names = [...h.matchAll(/verdict-product-name">([^<]+)</g)].map(m => m[1]);
  const bad = ['Ozone', 'G-Master', 'RX 12'].filter(k => h.includes('>' + k) || h.includes(k + '<'));
  const nectar = h.includes('11118-Nectar-4-Advanced') ? 'nectar-OK' : 'nectar-FALTA';
  const smooth = h.includes('Smooth Operator Pro') ? 'smooth-OK' : 'smooth-FALTA';
  const gift = h.includes('articles/2073') ? 'gift-OK' : 'gift-FALTA';
  console.log(f + ': ' + names.length + ' verdictos | restos=' + (bad.length ? bad.join(',') : 'ninguno') + ' ' + nectar + ' ' + smooth + ' ' + gift);
});
