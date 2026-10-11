var fs = require('fs');
var es = fs.readFileSync('deals_es.html', 'utf8');
console.log('ParaDI: ' + (es.indexOf('Para Acoustic DI') >= 0) + ' | badge: ' + (es.indexOf('Ahorra $20') >= 0));
console.log('MS M-badge: ' + (es.indexOf('>M</span>') >= 0));
console.log('variants left: ' + (es.indexOf('Transparent Mocha') >= 0) + ' (must be false)');
