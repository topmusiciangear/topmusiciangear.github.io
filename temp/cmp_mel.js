const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
['guides/repitch-vs-melodyne.html', 'guides/repitch-vs-melodyne_es.html'].forEach(f => {
  const h = fs.readFileSync(B + f, 'utf8');
  const names = [...h.matchAll(/verdict-product-name">([^<]+)</g)].map(m => m[1]);
  const table = (h.match(/Formantes|Formants/g) || []).length;
  const caveat = h.includes('monof') ? 'caveat-OK' : 'caveat-FALTA';
  console.log(f + ': verdictos=' + JSON.stringify(names) + ' formantes-tabla=' + table + ' ' + caveat);
});
