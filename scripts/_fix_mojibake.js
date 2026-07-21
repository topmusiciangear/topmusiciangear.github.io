var fs = require('fs');
var data = fs.readFileSync('data/guides.json', 'utf8');

var fixes = {
  '\u00c3\u00b1': '\u00f1',
  '\u00c3\u00b3': '\u00f3',
  '\u00c3\u00a9': '\u00e9',
  '\u00c3\u00a1': '\u00e1',
  '\u00c3\u00ba': '\u00fa',
  '\u00c3\u00bc': '\u00fc',
  '\u00c3\u00ad': '\u00ed',
};

var result = data;
Object.keys(fixes).forEach(function(k) {
  var re = new RegExp(k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
  result = result.replace(re, fixes[k]);
});

fs.writeFileSync('data/guides.json', result, 'utf8');
console.log('Done. Checking remaining...');
var check = fs.readFileSync('data/guides.json', 'utf8');
var remaining = check.match(/\u00c3[^\u0080-\u00bf]/g);
console.log('Remaining corrupted chars: ' + (remaining ? remaining.length : 0));
