const g = require('../data/guides.json');
const ids = [66, 67, 101, 125];
const prod = require('../data/products.json');
const byId = {};
prod.forEach(function (p) { byId[p.id] = p; });

const hits = [];

const wantNames = ['Fender Player Precision Bass', 'Fender Player Jazz Bass', 'Electro-Harmonix Small Stone', 'Fender Player Telecaster'];

g.forEach(function (gi) {
  const name = gi.id || gi.slug || '(anon)';
  ids.forEach(function (id) {
    if (gi.featuredProducts && gi.featuredProducts.indexOf(id) > -1) {
      hits.push('featured ' + name + '  id=' + id);
    }
  });
  // Does this guide's productTable/verdictProsCons mention the wanted names, and if so via what id?
  const blob = JSON.stringify(gi);
  wantNames.forEach(function (n) {
    if (blob.indexOf(n) > -1) {
      const fp = gi.featuredProducts || [];
      hits.push(name + '  mentions "' + n + '"  featuredIds=[' + fp.join(',') + ']');
    }
  });
});
console.log('GUIDE HITS:\n' + (hits.length ? hits.join('\n') : 'none'));

const stale = [];
g.forEach(function (gi) {
  const name = gi.id || gi.slug || '(anon)';
  (gi.featuredProducts || []).forEach(function (pid) {
    if (!byId[pid]) stale.push(name + ' featured -> missing id ' + pid);
  });
});
console.log('STALE featured refs:\n' + (stale.length ? stale.join('\n') : 'none'));

// Which product ids in products.json carry those wanted names now?
wantNames.forEach(function (n) {
  const matches = prod.filter(function (p) { return p.title === n || (p.title_es || '') === n || (p.title || '').indexOf(n) > -1; })
    .map(function (p) { return p.id + ':' + p.title + (p.title_es ? ' / ' + p.title_es : ''); });
  console.log('CURRENT products matching "' + n + '": ' + (matches.length ? matches.join(' | ') : 'NONE'));
});