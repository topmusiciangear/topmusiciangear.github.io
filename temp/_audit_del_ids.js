const g = require('../data/guides.json');
const ids = [66, 67, 101, 125];
g.forEach(function (gi) {
  if (gi.featuredProducts) {
    ids.forEach(function (id) {
      if (gi.featuredProducts.indexOf(id) > -1) console.log('featured', gi.slug, id);
    });
  }
  if (gi.productTable) {
    const s = JSON.stringify(gi.productTable);
    ids.forEach(function (id) {
      if (s.indexOf('"' + id + '"') > -1) console.log('productTable', gi.slug, id);
    });
  }
  if (gi.verdictProsCons) {
    const s = JSON.stringify(gi.verdictProsCons);
    ids.forEach(function (id) {
      if (s.indexOf('"' + id + '"') > -1) console.log('verdict', gi.slug, id);
    });
  }
});
console.log('---done');