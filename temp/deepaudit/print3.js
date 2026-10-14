var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
function byId(id) { return g.find(function (x) { return x.id === id; }); }
function getPath(gd, p) {
  return p.split(/\.|\[|\]/g).filter(Boolean).map(function (k) { return /^\d+$/.test(k) ? +k : k; })
    .reduce(function (a, k) { return a == null ? a : a[k]; }, gd);
}
function show(id, paths) {
  var gd = byId(id);
  if (!gd) { console.log('!! not found: ' + id); return; }
  paths.forEach(function (p) {
    var v = getPath(gd, p);
    console.log('\n### ' + id + ' -> ' + p);
    console.log(JSON.stringify(v));
  });
}
show('pro-daw', ['verdictProsCons[1].cons[0]', 'verdictProsCons[1].cons_es[0]', 'comparison.rows[9]', 'sections[0].content']);
show('j48-vs-rndi', ['verdictProsCons[0].name', 'verdictProsCons[0].cons', 'verdictProsCons[0].cons_es', 'verdictProsCons[1].name', 'verdictProsCons[1].cons_es']);
show('budget-interfaces', ['conclusion', 'featuredSnippet.faq_a1_en', 'featuredSnippet.faq_a4_en']);
show('best-monitors', ['sections[1].content', 'sections[2].content', 'sections[7].content', 'intro_es', 'featuredSnippet.title_es']);
show('beginner-bass-guitars', ['faq_a1', 'faq_a2', 'faq_a3', 'faq_a4', 'faq_a5', 'faq_a1_es', 'faq_a2_es', 'faq_a3_es', 'faq_a4_es', 'faq_a5_es']);
show('budget-usb-mics', ['sections[0].content', 'sections[1].content', 'sections[2].content', 'sections[3].content', 'sections[4].content', 'sections[5].content', 'sections[6].content', 'sections[8].content', 'sections[11].content', 'sections[13].content', 'featuredSnippet.text_en']);