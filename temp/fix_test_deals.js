var fs = require('fs');
var m = JSON.parse(fs.readFileSync('data/manual-deals.json', 'utf8'));
var before = m.length;
m = m.filter(function (x) { return x.title !== 'Fender Squier Stratocaster Bundle with Amp'; });
m.forEach(function (x) {
  if (x.title === 'QSC K10.2 Powered Loudspeaker') x.store_url = 'https://www.zzounds.com/item--QSCK102?siid=195217';
});
fs.writeFileSync('data/manual-deals.json', JSON.stringify(m, null, 2) + '\n');
console.log('manual: ' + before + ' -> ' + m.length + ' | K10.2 url updated, Squier removed');
