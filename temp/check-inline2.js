var h = require('fs').readFileSync('C:\\Users\\Daniel\\projects\\topmusiciangear\\guides\\best-microphone.html', 'utf8');
// Find the first inline button (around pos 66000)
var btnIdx = h.indexOf('class="shop-btn-primary"');
var dataStoreIdx = h.lastIndexOf('data-store', btnIdx);
console.log('Button at:', btnIdx);
console.log('data-store at:', dataStoreIdx);
console.log('Distance:', btnIdx - dataStoreIdx);
console.log('Context:', h.substring(dataStoreIdx - 10, btnIdx + 50));
