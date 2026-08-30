var h = require('fs').readFileSync('index.html', 'utf8');
var m = h.match(/CRAWLABLE_GUIDE_LINKS/g);
console.log('marker count:', m ? m.length : 0);
var links = h.match(/href="\/guides\//g);
console.log('total guide links:', links ? links.length : 0);

// Check for duplicate consecutive links
var section = h.substring(h.indexOf('CRAWLABLE_GUIDE_LINKS'));
var lines = section.split('\n');
var seen = {};
var dupes = 0;
lines.forEach(function(l) {
  var match = l.match(/href="(\/guides\/[^"]+)"/);
  if (match) {
    var key = match[1];
    if (seen[key]) { dupes++; }
    seen[key] = true;
  }
});
console.log('Duplicate links:', dupes);
console.log('Unique links:', Object.keys(seen).length);
