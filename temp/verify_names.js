const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
['best-synth-vsts', 'best-guitar-plugins', 'vocalign-vs-revoice-pro', 'mixing-plugins'].forEach(id => {
  const h = fs.readFileSync(B + 'guides/' + id + '.html', 'utf8');
  const names = [...h.matchAll(/verdict-product-name">([^<]+)</g)].map(m => m[1]);
  console.log(id + ': ' + JSON.stringify(names));
});
