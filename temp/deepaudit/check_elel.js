var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
function get(p) {
  return p.split('.').reduce(function (a, k) {
    if (!a) return a;
    var m = k.match(/^\[(\d+)\]$/);
    if (m) return a[+m[1]];
    if (k.match(/^\[\d+\]\.[^.]+$/)) {
      var mm = k.match(/^\[(\d+)\]\.([^.]+)$/);
      return a[+mm[1]][mm[2]];
    }
    return a[k];
  }, g);
}
var paths = [
  '[3].sections[4].content_es', '[8].sections[8].heading_es', '[15].sections[5].heading_es',
  '[66].sections[4].content_es', '[113].featuredSnippet.text_es',
  '[122].sections[1].heading_es', '[122].sections[2].heading_es', '[122].sections[5].heading_es',
  '[129].sections[1].heading_es', '[142].sections[1].content_es', '[142].faq_a2_es',
  '[142].verdictProsCons[1].cons_es[1]'
];
paths.forEach(function (p) {
  var s = get(p);
  var idx = s.indexOf('el el');
  console.log(p, '=>', idx, idx >= 0 ? JSON.stringify(s.slice(Math.max(0, idx - 8), idx + 14)) : '');
});