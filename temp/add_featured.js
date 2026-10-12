var fs = require('fs');
var p = 'data/guides.json';
var d = JSON.parse(fs.readFileSync(p, 'utf8'));
var ps = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

var missingIds = ['best-interface', 'best-headphones', 'best-microphone', 'best-monitors', 'portable-interfaces', 'live-sound-pa', 'daw-guide', 'beginner-guitar', 'best-electric-guitar', 'best-keyboard', 'best-drum-machine', 'beginner-bass-guitars', 'best-32-channel-digital-mixers', 'di-box'];

missingIds.forEach(function(id) {
  var g = d.find(function(x) { return x.id === id; });
  if (!g) return;
  
  // Collect all unique product IDs from sections
  var allPids = [...new Set(g.sections.flatMap(function(s) { return s.products || []; }))];
  
  // Filter to only valid products that exist in products.json
  var validPids = allPids.filter(function(pid) {
    return ps.find(function(p) { return p.id === pid; });
  });
  
  if (validPids.length) {
    g.featuredProducts = validPids;
    console.log('Added featuredProducts to ' + id + ': ' + validPids.length + ' products');
  } else {
    console.log('No valid products for ' + id);
  }
});

fs.writeFileSync(p, JSON.stringify(d, null, 2));
console.log('Done');