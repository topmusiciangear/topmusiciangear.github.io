const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
[337, 399, 414, 570, 162].forEach(id => {
  const p = products.find(x => x.id === id);
  console.log('=== ' + id + ' ' + p.title);
  Object.keys(p.stores || {}).forEach(k => {
    const u = p.stores[k];
    if (/search|marketplace|prodsearch|\/s\?k=/.test(u)) {
      console.log('   ' + k + ': ' + u);
      // el valor de la query debe ser el nombre exacto
      const d = decodeURIComponent(u);
      const q = (d.match(/[?&](q|query|SearchText|search_query|k)=([^&]+)/) || [])[2] || '';
      const esperado = p.title.replace(/\s*\((each|pair|set|2 headsets?)\)\s*$/i, '').trim();
      console.log('      query="' + q.replace(/\+/g, ' ') + '" | coincide: ' + (q.replace(/\+/g, ' ') === esperado));
      console.log('      comillas crudas en la URL: ' + /"/.test(u));
    }
  });
});