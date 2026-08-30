var h = require('fs').readFileSync('index.html', 'utf8');

// Look for the inline guides data
var idx = h.indexOf('var guides');
if (idx === -1) {
  console.log('var guides NOT FOUND');
  // Check for other patterns
  idx = h.indexOf('const guides');
  if (idx !== -1) console.log('Found const guides at:', idx);
} else {
  console.log('var guides found at:', idx);
  console.log(h.substring(idx, idx + 200));
}

// Check for the inline guides array
idx = h.indexOf('"guides"');
if (idx !== -1) {
  console.log('\n"guides" string found at:', idx);
  console.log(h.substring(idx - 50, idx + 100));
}

// Check for any script that defines guides
var scripts = h.match(/<script[^>]*>/g);
console.log('\nScript tags:');
if (scripts) scripts.forEach(function(s, i) {
  console.log(i, s.substring(0, 100));
});

// Look for the SPA initialization section
idx = h.indexOf('guides =');
if (idx !== -1) {
  console.log('\nguides = found at:', idx);
  console.log(h.substring(idx, idx + 200));
}
