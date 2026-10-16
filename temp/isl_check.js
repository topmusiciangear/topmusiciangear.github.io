const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
['guides/mixing-plugins.html', 'guides/mixing-plugins_es.html'].forEach(f => {
  const h = fs.readFileSync(B + f, 'utf8');
  const ok = ['1787-ISL-2st', '882775', '146', '149', '194'].map(k => k + ':' + (h.includes(k) ? 'OK' : 'FALTA'));
  console.log(f + ' -> ' + ok.join(' '));
});
