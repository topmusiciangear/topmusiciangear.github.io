var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
var guide = g.find(function(x) { return x.id === 'beat-making'; });
// Print raw first section
var s = guide.sections[0];
console.log('sections[0] raw:');
console.log(JSON.stringify(s, null, 2));
console.log('');
console.log('sections[0].heading type: ' + typeof s.heading);
console.log('sections[0].heading length: ' + (s.heading || '').length);
console.log('charCodeAt 0: ' + (s.heading ? s.heading.charCodeAt(0) : 'N/A'));
// Print bytes around heading
var buf = Buffer.from(JSON.stringify(guide.sections));
var idx = buf.indexOf('"heading"');
if (idx >= 0) {
  console.log('Found heading at byte offset ' + idx);
  console.log('Bytes: ' + buf.slice(idx, idx + 80).toString('hex'));
  console.log('Text: ' + buf.slice(idx, idx + 80).toString('utf8'));
}
