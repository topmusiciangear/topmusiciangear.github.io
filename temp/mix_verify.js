const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
['guides/mixing-plugins.html', 'guides/mixing-plugins_es.html'].forEach(f => {
  const h = fs.readFileSync(B + f, 'utf8');
  const names = [...h.matchAll(/verdict-product-name">([^<]+)</g)].map(m => m[1]);
  console.log(f + ': ' + names.length + ' verdictos | Pro-Q4: ' + (names.includes('FabFilter Pro-Q 4') ? 'OK' : 'FALTA'));
});
