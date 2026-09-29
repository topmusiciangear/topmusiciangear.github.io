var fs = require('fs');
var src = fs.readFileSync('js/shop-buttons.js', 'utf8');
var lines = src.split(/\r?\n/);
lines.forEach(function (L, i) {
  if (/^(function |const |let |var |window\.|\(function)/.test(L) || /^\}\);?$/.test(L.trim()) === false && /^\}\);/.test(L.trim())) {
    console.log((i + 1) + ': ' + L.slice(0, 120));
  }
});
console.log('---- last 12 lines ----');
for (var i = lines.length - 12; i < lines.length; i++) console.log((i + 1) + ': ' + lines[i].slice(0, 120));
