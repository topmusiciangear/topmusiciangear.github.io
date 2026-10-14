var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
var want = {};
[
  '[113].sections[3].content',
  '[113].conclusion',
  '[113].conclusion_es',
  '[113].featuredSnippet.text_es',
  '[113].featuredSnippet.price1',
  '[113].featuredSnippet.price2',
  '[113].sections[0].heading_es',
  '[113].sections[4].heading_es',
  '[100].verdictProsCons[0].pros[0]',
  '[100].verdictProsCons[0].pros_es[0]',
  '[100].featuredSnippet.price1',
  '[100].featuredSnippet.price2',
  '[100].conclusion',
  '[120].sections[1].content',
  '[120].sections[2].content',
  '[120].sections[7].content',
  '[120].featuredSnippet.title_en',
  '[120].featuredSnippet.title_es'
].forEach(function (p) {
  var parts = p.replace(/^\[/, '').split(/[\].[]/).filter(Boolean).map(function (k) {
    return /^\d+$/.test(k) ? +k : k;
  });
  var v = parts.reduce(function (a, k) { return a == null ? a : a[k]; }, g);
  console.log('###' + p);
  console.log(JSON.stringify(v));
});