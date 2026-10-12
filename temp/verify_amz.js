var fs = require('fs');
var es = fs.readFileSync('deals_es.html', 'utf8');
['MDR-7506', 'DT 990 Pro', 'HD 600'].forEach(function (t) {
  console.log(t + ': ' + (es.indexOf(t) >= 0));
});
