const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
['guides/ozone-vs-fabfilter.html', 'guides/ozone-vs-fabfilter_es.html'].forEach(f => {
  const h = fs.readFileSync(B + f, 'utf8');
  const m = h.match(/og:image" content="([^"]+)/);
  console.log(f + ' cover=' + (m ? m[1].slice(-30) : 'FALTA') + ' pb442=' + (h.includes('442') ? 'OK' : 'FALTA'));
});
