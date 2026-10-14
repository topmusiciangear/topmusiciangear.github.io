const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/guides/';
[['beginner-guitar.html', 'Head-to-Head'], ['beginner-guitar_es.html', 'Head-to-Head']].forEach(([f, mark]) => {
  const h = fs.readFileSync(B + f, 'utf8');
  const i = h.indexOf(mark);
  const chunk = h.slice(i, i + 6000);
  const blocks = (chunk.match(/guide-section-prod"/g) || []).length;
  const buys = (chunk.match(/guide-section-buy/g) || []).length;
  const cn = chunk.includes('719445');
  const gc = chunk.includes('527882');
  console.log(f + ': bloques=' + blocks + ' buys=' + buys + ' CN60S=' + cn + ' GC1=' + gc);
});
// Las dedicadas conservan sus fotos
const h = fs.readFileSync(B + 'beginner-guitar.html', 'utf8');
[['CN-60S (Nylon): A Closer Look', '719445'], ['Takamine GC1', '527882']].forEach(([t, img]) => {
  const i = h.indexOf(t);
  const chunk = h.slice(i, i + 4000);
  console.log('dedicada ' + t.slice(0, 20) + ': foto=' + chunk.includes(img) + ' buy=' + chunk.includes('guide-section-buy'));
});