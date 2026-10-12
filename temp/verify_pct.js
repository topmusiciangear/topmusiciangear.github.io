var fs = require('fs');
var es = fs.readFileSync('deals_es.html', 'utf8');
var en = fs.readFileSync('deals.html', 'utf8');
console.log('es 18%: ' + (es.indexOf('18%</span>') >= 0) + ' | es dto-word: ' + (es.indexOf('dto.</span>') >= 0) + ' (must be false)');
console.log('en off-word: ' + (en.indexOf('off</span>') >= 0) + ' (must be false)');
