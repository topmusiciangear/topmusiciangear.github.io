var fs = require('fs');
var m = JSON.parse(fs.readFileSync('data/manual-deals.json', 'utf8'));
var before = m.length;
m = m.filter(function (x) {
  return !((x.title === 'Fender Player II Stratocaster HSS' || x.title === 'Yamaha P-225') && x.source === 'manual');
});
fs.writeFileSync('data/manual-deals.json', JSON.stringify(m, null, 2) + '\n');
console.log('manual: ' + before + ' -> ' + m.length + ' | variant deals removed');
