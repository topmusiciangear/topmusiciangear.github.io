var h = require('fs').readFileSync('C:\\Users\\Daniel\\projects\\topmusiciangear\\guides\\best-microphone.html', 'utf8');
var idx = h.indexOf('class="shop-btn-primary"');
// Find the closing </a> of this button
var closeIdx = h.indexOf('</a>', idx);
console.log('=== ORIGINAL AMAZON PRIMARY BUTTON ===');
console.log(h.substring(idx, closeIdx + 4));
