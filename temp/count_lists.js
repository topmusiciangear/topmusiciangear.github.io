const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
[['EN', 'guides/bridge-cast-x-vs-rodecaster-pro2.html'], ['ES', 'guides/bridge-cast-x-vs-rodecaster-pro2_es.html']].forEach(function (p) {
  const h = fs.readFileSync(BASE + p[1], 'utf8');
  const lists = h.match(/<ul[^>]*class="[^"]*(?:pros|cons)[^"]*"[\s\S]*?<\/ul>/g) || [];
  console.log('=== ' + p[0] + ' ===  listas pros/cons: ' + lists.length);
  lists.forEach(function (ul, i) {
    const cls = (ul.match(/class="([^"]*)"/) || [])[1] || '';
    const items = (ul.match(/<li>/g) || []).length;
    // nombre del producto al que pertenece esta lista
    const before = h.substring(0, h.indexOf(ul));
    const lastName = (before.match(/verdict-product-name[^>]*>([^<]*)</g) || []).pop();
    console.log('   ' + items + ' items   [' + cls + ']   ' + (lastName || '').replace(/.*>/, ''));
  });
  console.log('');
});