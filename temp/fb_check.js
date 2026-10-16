const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
['guides/ozone-vs-fabfilter.html', 'guides/ozone-vs-fabfilter_es.html'].forEach(f => {
  const h = fs.readFileSync(B + f, 'utf8');
  const ok = ['127/1271983', '7IC5', 'izotope-ozone-12-advanced', 'art-PCM0018596', '479', '452'].map(k => k + ':' + (h.includes(k) ? 'OK' : 'FALTA'));
  console.log(f + ' -> ' + ok.join(' '));
});
