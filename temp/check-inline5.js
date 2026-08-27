var h = require('fs').readFileSync('C:\\Users\\Daniel\\projects\\topmusiciangear\\guides\\best-microphone.html', 'utf8');
// Get the first full guide-section-buy div (up to next </div>)
var idx = h.indexOf('guide-section-buy');
var start = idx - 5;
// Find the closing tag - look for the pattern of the next section
var chunk = h.substring(start, start + 2000);
console.log(chunk);
