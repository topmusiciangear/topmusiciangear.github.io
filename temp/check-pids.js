var h = require('fs').readFileSync('guides/best-shotgun-mics.html', 'utf8');
var matches = h.match(/data-pid/g);
console.log('total data-pid count:', matches ? matches.length : 0);

var m3 = h.match(/pid[^"]*358/g);
console.log('pid...358:', m3 ? m3.length : 0, m3);

// Check all data-pid values
var pids = h.match(/data-pid="(\d+)"/g);
if (pids) {
  pids.forEach(function(p) { console.log(p); });
} else {
  console.log('No data-pid attributes found at all');
}

// Check for AT875R image in the product card section (after line 700 or so)
var section = h.substring(70000);
var imgMatches = section.match(/<img[^>]*AT875R[^>]*>/g);
console.log('\nAT875R img tags:', imgMatches ? imgMatches.length : 0);
if (imgMatches) imgMatches.forEach(function(m) { console.log(m.substring(0, 200)); });

// Check for pid=358 anywhere
var pid358 = h.indexOf('pid');
console.log('\nFirst pid occurrence:', pid358);
if (pid358 !== -1) console.log(h.substring(pid358 - 10, pid358 + 50));
