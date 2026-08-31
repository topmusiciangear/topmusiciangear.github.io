var fs = require('fs');
var m = fs.readFileSync('js/app.min.js', 'utf8');

// Check for remaining old search patterns
var patterns = [
  '.toLowerCase(),i=(t.title_es||"").toLowerCase(),n=(t.brand||"").toLowerCase()',
  'p.title.toLowerCase(),o=(p.title_es||"").toLowerCase(),n=(p.brand||"").toLowerCase()',
  'a.title.toLowerCase(),o=(a.title_es||"").toLowerCase()'
];

patterns.forEach(function(p) {
  var i = m.indexOf(p);
  if (i > -1) {
    console.log('FOUND old pattern at', i, ':', m.substring(i-50, i+80));
  }
});

// Verify new pattern exists
var newCheck = m.indexOf('_n=s=>s.normalize');
console.log('New pattern exists:', newCheck > -1);

// Also check for the translatePage search handler (second one)
var idx2 = m.indexOf('scored.reduce(function');
console.log('Second handler (scored.reduce):', idx2);

var idx3 = m.indexOf('function(a,p){var t=p.title.toLowerCase()');
console.log('Alt second handler:', idx3);
