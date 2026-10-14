var fs = require('fs');
var P = 'C:/Users/Daniel/projects/topmusiciangear/data/products.json';
var A = JSON.parse(fs.readFileSync(P, 'utf8'));
var IMG = {
  'neumann mt 48': 'https://r2.gear4music.com/media/91/914604/1200/preview.jpg',
  'apollo x8p': 'https://r2.gear4music.com/media/113/1138813/1200/preview.jpg',
  'apogee symphony': 'https://cdn11.bigcommerce.com/s-4hc0jwsnnq/images/stencil/original/products/2550/9078/102768-APOGEE-SYMPHONY-IO-MkII-FRONT-VIEW__05827.1714742907.jpg?c=1',
  'audient oria': 'https://r2.gear4music.com/media/103/1036441/1200/preview.jpg'
};
var norm = function (s) { return String(s == null ? '' : s).toLowerCase().replace(/\s+/g, ' ').trim(); };
var L = [], applied = 0;
var list = Array.isArray(A) ? A : (A.products || []);
list.forEach(function (p, i) {
  var nm = norm(p.name || p.title || '');
  for (var k in IMG) {
    if (nm.indexOf(k) >= 0) {
      L.push('[' + i + '] id=' + p.id + ' ' + JSON.stringify(p.name) + ' | ' + (p.image || '(no image)').slice(0, 70) + ' -> ' + IMG[k].slice(0, 70));
      p.image = IMG[k];
      if (p.image_es !== undefined) p.image_es = IMG[k];
      applied++;
      break;
    }
  }
});
fs.writeFileSync(P, JSON.stringify(A, null, 2), 'utf8');
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/cons_patch/products_img_report.txt', L.join('\n') + '\n\napplied=' + applied, 'utf8');
console.log('done applied=' + applied);
