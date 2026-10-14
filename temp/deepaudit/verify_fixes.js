var fs = require('fs');
var path = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
var raw = fs.readFileSync(path, 'utf8');
var g = JSON.parse(raw);
console.log('guides: ' + g.length + ' | JSON parse OK');

function byId(id) { return g.find(function (x) { return x.id === id; }); }
function get(oid, f) { var o = typeof oid === 'string' ? byId(oid) : oid; return f.split(/[.\[\]]+/).filter(Boolean).reduce(function (a, k) { return a == null ? a : a[k]; }, o); }

var checks = [
  ['ableton-vs-logic', 'conclusion_es'],
  ['budget-usb-mics', 'conclusion'],
  ['budget-usb-mics', 'sections[1].content'],
  ['budget-usb-mics', 'featuredSnippet.faq_a4_en'],
  ['budget-monitors', 'sections[1].content'],
  ['budget-monitors', 'verdictProsCons[1].pros[0]'],
  ['budget-monitors', 'verdictProsCons[2].cons[1]'],
  ['budget-monitors', 'verdictProsCons[3].cons_es[0]'],
  ['j48-vs-rndi', 'verdictProsCons[0].cons[3]'],
  ['budget-interfaces', 'conclusion'],
  ['best-monitors', 'sections[6].content'],
  ['best-monitors', 'featuredSnippet.faq_a6_en'],
  ['best-monitors-for-small-rooms', 'conclusion'],
  ['stage-wireless', 'faq_a1_en'],
  ['stage-wireless', 'faq_a2_en'],
  ['pro-microphones', 'faq[2].a'],
  ['pro-plugins', 'faq[2].a'],
  ['pro-daw', 'featuredSnippet.text_es'],
  ['best-practice-amps', 'verdictProsCons[0].pros[3]'],
  ['best-practice-amps', 'verdictProsCons[0].cons[3]'],
  ['portable-interfaces', 'verdictProsCons[1].cons[2]'],
  ['best-pa-speakers', 'sections[2].content'],
  ['m50x-vs-mdr7506', 'sections[3].content'],
  ['beginner-bass-guitars', 'faq_a2_en'],
  ['budget-bass-like-expensive', 'intro_es'],
  ['best-live-sound-mixers', 'verdict'],
  ['starter-studio', 'verdictProsCons[3].pros_es[3]'],
  ['xr18-vs-m32r', 'featuredSnippet.price1'],
  ['dt770-vs-dt990', 'verdict_es'],
  ['best-microphone', 'description_es'],
  ['best-monitors', 'featuredSnippet.title_es']
];
checks.forEach(function (c) {
  var v = get(c[0], c[1]);
  console.log('\n== [' + c[0] + '].' + c[1] + ' ==\n' + String(v).slice(0, 420));
});