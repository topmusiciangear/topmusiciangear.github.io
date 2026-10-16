const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
['guides/ozone-vs-fabfilter.html', 'guides/ozone-vs-fabfilter_es.html'].forEach(f => {
  const h = fs.readFileSync(B + f, 'utf8');
  const ok = ['106/1061367', '4WHM', 'FABMASTERINGBUN', '319', '379', '439', 'card-title">FabFilter Mastering Bundle<'].map(k => k + ':' + (h.includes(k) ? 'OK' : 'FALTA'));
  console.log(f + ' -> ' + ok.join(' '));
});
