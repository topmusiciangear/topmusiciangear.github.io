const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const h = fs.readFileSync(B + 'guides/mixing-plugins.html', 'utf8');
// extraer bloques JSON-LD
const blocks = [...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => m[1]);
console.log('bloques JSON-LD: ' + blocks.length);
blocks.forEach((b, i) => {
  let j;
  try { j = JSON.parse(b); } catch (e) { console.log(i + ': parse error'); return; }
  const graph = j['@graph'] || [j];
  graph.forEach(n => {
    if (n['@type'] === 'Product') {
      const hasOffers = !!n.offers && (Array.isArray(n.offers) ? n.offers.length : 1);
      console.log(i + ': Product "' + n.name + '" offers=' + (n.offers ? (n.offers.length || 1) : 'AUSENTE') + ' review=' + (n.review ? 'SI' : 'no') + ' agg=' + (n.aggregateRating ? 'SI' : 'no'));
    } else {
      console.log(i + ': @type=' + n['@type']);
    }
  });
});
