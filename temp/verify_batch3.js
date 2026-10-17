const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
['best-midi-theory-plugins.html', 'best-midi-theory-plugins_es.html'].forEach(f => {
  const h = fs.readFileSync(B + 'guides/' + f, 'utf8');
  console.log('=== ' + f);
  [['Zynaptiq PitchMap', 'r2.gear4music.com/media/86/862628', '52GK'],
   ['Audiomodern Playbeat 4', 'r2.gear4music.com/media/119/1193109', '71UL'],
   ['W.A. Production Loop Engine 3', 'banners.pluginboutique.com/py7p3xx6rk4ry7i10ywnp66ayqnh', null]]
  .forEach(([name, img, code]) => {
    const i = h.indexOf('guide-product-card-title">' + name);
    if (i < 0) { console.log('  ' + name + ': card NO encontrada'); return; }
    const cardImg = (h.slice(i - 1400, i).match(/guide-product-card-img"><img src="([^"]+)"/) || [])[1] || 'sin img';
    console.log('  ' + name);
    console.log('    img: ' + cardImg + (cardImg.indexOf(img) > -1 ? ' OK' : ' FALTA'));
    if (code) console.log('    link G4M ' + code + ': ' + (h.indexOf(code) > -1 ? 'OK' : 'FALTA'));
  });
});
const sb = fs.readFileSync(B + 'js/shop-buttons.js', 'utf8');
['1009', '1010', '1012'].forEach(id => {
  const m = sb.match(new RegExp('\\n' + id + ': \\{prices:\\{[^\\n]*'));
  console.log('\nmapa ' + id + ': ' + (m ? m[0].trim() : 'NO'));
});