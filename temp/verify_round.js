var fs = require('fs');
var es = fs.readFileSync('deals_es.html', 'utf8');
['1176 Classic', 'Player II Stratocaster HSS', 'P-225', 'Yamaha HS8'].forEach(function (t) {
  console.log(t + ': ' + (es.indexOf(t) >= 0));
});
console.log('badges: ' + (es.indexOf('Ahorra $170') >= 0) + ' ' + (es.indexOf('Ahorra €220') >= 0) + ' ' + (es.indexOf('Ahorra €377') >= 0) + ' ' + (es.indexOf('Ahorra €37.3') >= 0));
