const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-piano-keyboard-vsts.html', 'utf8');
const titles = [...h.matchAll(/guide-product-card-title">([^<]+)</g)].map(m => m[1]);
console.log('cards: ' + JSON.stringify(titles));
const i = h.indexOf('guide-product-card-title">MeldaProduction');
if (i < 0) { console.log('card MeldwayGrand NO encontrada'); }
else {
  console.log('\n--- card MeldwayGrand ---');
  console.log(h.slice(i - 200, i + 2400).replace(/\s+/g, ' ').slice(0, 2200));
}