var fs = require('fs');
var path = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
var g = JSON.parse(fs.readFileSync(path, 'utf8'));
function byId(id) { return g.find(function (x) { return x.id === id; }); }
function set(id, f, s, to) {
  var x = byId(id);
  var parts = f.split(/[.\[\]]+/).filter(Boolean);
  var node = x;
  for (var i = 0; i < parts.length - 1; i++) node = node[parts[i]];
  var key = parts[parts.length - 1];
  if (typeof node[key] !== 'string') { console.log('NO-STRING ' + id + '.' + f); return; }
  var m = node[key].match(new RegExp(s, 'g'));
  if (!m) { console.log('NOT-FOUND ' + id + '.' + f + ' :: ' + JSON.stringify(s)); return; }
  node[key] = node[key].replace(new RegExp(s, 'g'), to);
  console.log('OK ' + id + '.' + f + ' x' + m.length);
}

// [13] budget-monitors
set('budget-monitors', 'sections[1].content', 'each \\( a pair\\), the JBL 305P MkII is', 'At around $298 a pair — $149 each — the JBL 305P MkII is');
set('budget-monitors', 'sections[1].content_es', 'El JBL 305P MkII \\(el par\\) es el monitor', 'El JBL 305P MkII (unos $298 el par) es el monitor');
set('budget-monitors', 'sections[2].content', 'Each \\( a pair\\), these are the monitors', 'At around $398 a pair, these are the monitors');
set('budget-monitors', 'featuredSnippet.text_en', 'each \\( a pair\\), the JBL 305P MkII is', 'At around $298 a pair, the JBL 305P MkII is');
set('budget-monitors', 'featuredSnippet.text_es', 'El JBL 305P MkII \\(el par\\) es el monitor', 'El JBL 305P MkII (unos $298 el par) es el monitor');
set('budget-monitors', 'featuredSnippet.faq_a3_es', 'El Rokit 7 G5 \\(el par\\) tiene', 'El Rokit 7 G5 (unos $538 el par) tiene');
set('budget-monitors', 'featuredSnippet.faq_a4_es', 'El HS8 \\(el par\\) hereda', 'El HS8 (unos $798 el par) hereda');

// [33] sm57-vs-sm58
set('sm57-vs-sm58', 'featuredSnippet.faq_a3_en', 'Both the SM57 and SM58 \\( each\\) are', 'Both the SM57 and SM58 (around $99 each) are');

// [71] best-monitors-for-small-rooms
set('best-monitors-for-small-rooms', 'sections[1].content', 'The KRK Rokit 7 G5 \\( each\\) is the pick', 'The KRK Rokit 7 G5 (around $269 each) is the pick');
set('best-monitors-for-small-rooms', 'sections[2].content', 'The JBL 305P MkII \\( each\\) is the top pick', 'The JBL 305P MkII (around $149 each) is the top pick');
set('best-monitors-for-small-rooms', 'sections[3].content', 'The Kali LP-6 V2 \\( each\\) is the best 6.5-inch', 'The Kali LP-6 V2 (around $199 each) is the best 6.5-inch');
set('best-monitors-for-small-rooms', 'conclusion', 'the JBL 305P MkII \\( each\\) is the best choice', 'the JBL 305P MkII (around $149 each) is the best choice');
set('best-monitors-for-small-rooms', 'verdict', 'The Kali LP-6 V2 \\( each\\) is the best 6.5-inch pick', 'The Kali LP-6 V2 (around $199 each) is the best 6.5-inch pick');

fs.writeFileSync(path, JSON.stringify(g, null, 2), 'utf8');
console.log('saved');

var corpus = JSON.stringify(g);
['( each)', '( a pair)', '(el par)', '( el par)'].forEach(function (pt) { if (corpus.indexOf(pt) >= 0) console.log('REMAIN ' + pt); });