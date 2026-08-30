var h = require('fs').readFileSync('index.html', 'utf8');
// Extract all inline script contents
var scripts = [];
var re = /<script(?:\s[^>]*)?>([^<]*)<\/script>/g;
var m;
while ((m = re.exec(h)) !== null) {
  if (m[1].trim().length > 0) {
    scripts.push({ pos: m.index, len: m[0].length, preview: m[1].substring(0, 200) });
  }
}
console.log('Inline scripts with content:');
scripts.forEach(function(s, i) {
  console.log('\n--- Script', i, 'at pos', s.pos, '---');
  console.log(s.preview);
});

// Check for data scripts that might define guides
var dataIdx = h.indexOf('window.');
if (dataIdx !== -1) {
  console.log('\n\nFirst window. at:', dataIdx);
  console.log(h.substring(dataIdx, dataIdx + 300));
}
