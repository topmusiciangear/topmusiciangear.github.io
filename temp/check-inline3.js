var h = require('fs').readFileSync('C:\\Users\\Daniel\\projects\\topmusiciangear\\guides\\best-microphone.html', 'utf8');
// Find the first inline section
var inlineStart = h.indexOf('guide-section-buy');
console.log('Inline section class at:', inlineStart);
// Show the HTML structure around first inline button
console.log('\n=== First inline container ===');
console.log(h.substring(inlineStart - 20, inlineStart + 800));
