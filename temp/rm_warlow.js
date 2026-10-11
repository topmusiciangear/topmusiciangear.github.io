var fs = require('fs');
var m = JSON.parse(fs.readFileSync('data/manual-deals.json', 'utf8'));
var before = m.length;
m = m.filter(function (x) { return x.title !== 'JPTR FX Warlow Fuzz'; });
fs.writeFileSync('data/manual-deals.json', JSON.stringify(m, null, 2) + '\n');
console.log('manual: ' + before + ' -> ' + m.length + ' | Warlow removed');
