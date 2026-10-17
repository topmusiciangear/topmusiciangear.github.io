const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
['best-midi-theory-plugins.html', 'best-midi-theory-plugins_es.html'].forEach(f => {
  const h = fs.readFileSync(B + 'guides/' + f, 'utf8');
  console.log('=== ' + f);
  [['SongWish reMIDI 4', 'efszazxwbxiip97tscava5iaz4lk'], ['Scaler 3', 'msjrldeol87ro2vg58we3uwyvitf']].forEach(([n, b]) => {
    const i = h.indexOf('guide-product-card-title">' + n);
    const img = (h.slice(i - 1400, i).match(/guide-product-card-img"><img src="([^"]+)"/) || [])[1] || 'sin img';
    console.log('  ' + n + ' -> ' + (img.indexOf(b) > -1 ? 'OK' : 'FALTA: ' + img));
  });
});