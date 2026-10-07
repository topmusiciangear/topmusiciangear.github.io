const fs = require('fs');
const h = fs.readFileSync('guides/best-reverb-delay_es.html', 'utf8');
const cols = h.match(/verdict-col">/g) || [];
console.log('verdict cols:', cols.length);
['Caverns V2', 'Del-Verb', 'Carbon Copy', 'Golden Reverberator', 'RV-200', 'descatalogado'].forEach(k => {
  console.log(k + ': ' + (h.includes(k) ? 'OK' : 'FALTA'));
});
