var fs = require('fs');
var d = JSON.parse(fs.readFileSync('data/deals.json', 'utf8'));
var arr = Array.isArray(d) ? d : d.deals;
console.log('total: ' + arr.length + ' | ART710 left: ' + arr.filter(function (x) { return /ART 710/i.test(x.title || ''); }).length);
var es = fs.readFileSync('deals_es.html', 'utf8');
console.log('es ART710 cards: ' + (es.split('ART 710-A MK5').length - 1));
