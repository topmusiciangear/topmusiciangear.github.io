var fs = require('fs');
var p = 'data/guides.json';
var d = JSON.parse(fs.readFileSync(p, 'utf8'));
var g = d.find(function (x) { return x.id === 'best-keyboard'; });
console.log('BEFORE: ' + g.image);
if (g.image !== 'https://r2.gear4music.com/media/90/909350/1200/preview.jpg') {
  console.log('UNEXPECTED CURRENT IMAGE - abort'); process.exit(1);
}
g.image = 'https://r2.gear4music.com/media/94/944268/1200/preview.jpg';
fs.writeFileSync(p, JSON.stringify(d, null, 2));
console.log('AFTER: ' + g.image);
