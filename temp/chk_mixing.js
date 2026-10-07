const fs = require('fs');
['guides/mixing-plugins.html', 'guides/mixing-plugins_es.html'].forEach(f => {
  const h = fs.readFileSync(f, 'utf8');
  console.log(f, '| Kontakt:', (h.match(/Kontakt/gi) || []).length,
    '| 30+:', h.includes('30+ plug') ? 'SI' : 'no',
    '| 14 plug:', h.includes('14 plug') ? 'OK' : 'FALTA',
    '| key:', (h.includes('License key') || h.includes('Clave de licencia')) ? 'OK' : 'FALTA',
    '| High/Alta lat:', (h.includes('>High<') || h.includes('>Alta<')) ? 'OK' : '?');
});
