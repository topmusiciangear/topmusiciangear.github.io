var fs = require('fs');
var P = 'C:/Users/Daniel/projects/topmusiciangear/';
var guides = JSON.parse(fs.readFileSync(P + 'data/guides.json', 'utf8'));
function bySlug(s) { return guides.filter(function (x) { return (x.slug || x.id) === s; })[0]; }
function setPath(obj, path, val) {
  var parts = path.replace(/\[(\d+)\]/g, '.$1').split('.');
  var o = obj;
  for (var i = 0; i < parts.length - 1; i++) o = o[parts[i]];
  o[parts[parts.length - 1]] = val;
}
var n = 0;
function fix(slug, path, fn) {
  var g = bySlug(slug);
  var parts = path.replace(/\[(\d+)\]/g, '.$1').split('.');
  var o = g;
  for (var i = 0; i < parts.length - 1; i++) o = o[parts[i]];
  var k = parts[parts.length - 1];
  var before = o[k];
  o[k] = fn(before);
  if (o[k] !== before) n++;
  else console.log('NOCHANGE: ' + slug + ' ' + path);
}
// double spaces -> single (string values only, parsed object)
[['best-monitors', 'sections[2].content_es'], ['apollo-vs-babyface', 'sections[0].content_es'],
 ['audient-vs-motu', 'sections[0].content_es'], ['best-monitors-for-small-rooms', 'conclusion'],
 ['best-shotgun-mics', 'sections[0].content_es'], ['best-shotgun-mics', 'sections[2].content_es'],
 ['best-shotgun-mics', 'sections[8].content_es'], ['best-shotgun-mics', 'sections[9].content_es']
].forEach(function (p) { fix(p[0], p[1], function (t) { return t.replace(/ {2,}/g, ' '); }); });
// year leftovers
[['best-digital-pianos', 'productTable.title'], ['best-digital-pianos', 'productTable.title_es'],
 ['premium-interfaces', 'title'], ['premium-interfaces', 'title_es'],
 ['premium-interfaces', 'titleTag'], ['premium-interfaces', 'titleTag_es'],
 ['best-bass-home-office', 'titleTag'], ['best-bass-home-office', 'titleTag_es'],
 ['best-5-string-basses', 'titleTag'], ['best-5-string-basses', 'titleTag_es'],
 ['best-5-string-basses', 'description'], ['best-5-string-basses', 'description_es']
].forEach(function (p) { fix(p[0], p[1], function (t) { return t.replace(/ \(2026\)/g, ''); }); });
// em-dash period
fix('budget-pa-systems', 'sections[0].content', function (t) { return t.replace('on stage \u2014 . Whether', 'on stage. Whether'); });
fs.writeFileSync(P + 'data/guides.json', JSON.stringify(guides, null, 2));
console.log('applied:' + n);
