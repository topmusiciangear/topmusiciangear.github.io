var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
function byId(id) { return g.find(function (x) { return x.id === id; }); }

function show(id, paths) {
  var gd = byId(id);
  if (!gd) { console.log('!! not found: ' + id); return; }
  paths.forEach(function (p) {
    var parts = p.split('.').map(function (k) { return /^\d+$/.test(k) ? +k : k; });
    var v = parts.reduce(function (a, k) { return a == null ? a : a[k]; }, gd);
    console.log('\n### ' + id + ' -> ' + p);
    console.log(JSON.stringify(v));
  });
}

show('ableton-vs-logic', ['sections[3].content', 'conclusion', 'conclusion_es', 'featuredSnippet.text_es', 'sections[0].heading_es', 'sections[4].heading_es']);
show('budget-pa-systems', ['verdictProsCons[0].name', 'verdictProsCons[0].pros[0]', 'verdictProsCons[0].pros_es[0]', 'featuredSnippet.name1_en', 'featuredSnippet.best1_en', 'featuredSnippet.price1', 'featuredSnippet.price2', 'featuredSnippet.key1_details']);
show('budget-bass-like-expensive', ['intro', 'sections[3].content', 'sections[5].content', 'faq_a3', 'sections[4].content', 'sections[4].content_es', 'sections[5].content_es', 'verdict_es', 'productTable.rows']);
show('j48-vs-rndi', ['verdictProsCons[0].name', 'verdictProsCons[0].cons', 'verdictProsCons[0].cons_es', 'verdictProsCons[1].cons_es']);
show('budget-usb-mics', ['conclusion', 'featuredSnippet.text_en', 'featuredSnippet.faq_a4_en', 'sections[13].content']);
show('beginner-bass-guitars', ['faq', 'faq_a2', 'faq_a5', 'verdictProsCons[0].name']);
show('hs8-vs-rokit-7', ['intro', 'sections[2].content']);
show('kali', ['featuredSnippet.faq_a6_en']);