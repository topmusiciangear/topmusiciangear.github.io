var fs = require('fs');
var s = fs.readFileSync('deals_es.html', 'utf8');
console.log('M-badge tags: ' + (s.split('background:#555').length - 1));
