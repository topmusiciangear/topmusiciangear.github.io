var h = require('fs').readFileSync('C:\\Users\\Daniel\\projects\\topmusiciangear\\guides\\best-microphone.html', 'utf8');
var idx = h.indexOf('class="shop-btn-primary"');
console.log(h.substring(idx, idx + 1000));
