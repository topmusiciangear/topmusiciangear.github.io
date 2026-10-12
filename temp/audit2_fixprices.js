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
function getPath(obj, path) {
  var parts = path.replace(/\[(\d+)\]/g, '.$1').split('.');
  var o = obj;
  for (var i = 0; i < parts.length; i++) o = o[parts[i]];
  return o;
}
var n = 0;
function fix(slug, path, a, b, expect) {
  var g = bySlug(slug);
  var t = getPath(g, path);
  var c = t.split(a).length - 1;
  if (c !== expect) { console.log('COUNT ' + c + '!=' + expect + ': ' + slug + ' ' + path + ' :: ' + a); process.exit(1); }
  setPath(g, path, t.split(a).join(b));
  n++;
}
fix('portable-interfaces', 'sections[1].content_es', 'Volt 2 ($220)', 'Volt 2 ($189)', 1);
fix('portable-interfaces', 'sections[1].content_es', 'Scarlett 2i2 ($170)', 'Scarlett 2i2 ($199)', 1);
fix('best-electric-guitar', 'sections[0].content', 'Pacifica 112V ($220)', 'Pacifica 112V ($349)', 1);
fix('best-electric-guitar', 'sections[0].content', "Classic Vibe '60stratocaster ($430)", "Classic Vibe '50s Stratocaster ($500)", 1);
fix('best-electric-guitar', 'sections[0].content_es', 'Pacifica 112V ($220)', 'Pacifica 112V ($349)', 1);
fix('best-electric-guitar', 'sections[0].content_es', "Classic Vibe '60s Stratocaster ($430)", "Classic Vibe '50s Stratocaster ($500)", 1);
fs.writeFileSync(P + 'data/guides.json', JSON.stringify(guides, null, 2));
console.log('price fixes applied:' + n);
