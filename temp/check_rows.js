var fs = require('fs');
var s = fs.readFileSync('guides/best-plugins.html', 'utf8');
var i = s.indexOf('shop-more-list');
var seg = s.slice(i, i + 2500);
console.log('row has white wordmark: ' + (seg.indexOf('color:#fff') >= 0));
console.log('row has amber: ' + (seg.indexOf('color:#FFC107') >= 0) + ' (must be false)');
