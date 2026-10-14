const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/guides/';
[['beginner-guitar.html', 'Head-to-Head'], ['beginner-guitar_es.html', 'Cara a cara']].forEach(([f, mark]) => {
  const h = fs.readFileSync(B + f, 'utf8');
  const i = h.indexOf(mark);
  // hasta la siguiente seccion
  const next = h.indexOf('<div class="guide-section">', i + 100);
  const chunk = h.slice(i, next > -1 ? next : i + 30000);
  const blocks = (chunk.match(/guide-section-prod"/g) || []).length;
  const buys = (chunk.match(/guide-section-buy/g) || []).length;
  console.log(f + ' [h2h completa]: bloques=' + blocks + ' buys=' + buys + ' CN60S=' + chunk.includes('719445') + ' GC1=' + chunk.includes('527882'));
});
const h = fs.readFileSync(B + 'beginner-guitar.html', 'utf8');
[['CN-60S (Nylon): A Closer Look', '719445'], ['Takamine GC1: The Tank', '527882']].forEach(([t, img]) => {
  const i = h.indexOf(t);
  const next = h.indexOf('<div class="guide-section">', i + 100);
  const chunk = h.slice(i, next > -1 ? next : i + 20000);
  console.log('dedicada ' + t.slice(0, 22) + ': foto=' + chunk.includes(img) + ' buy=' + chunk.includes('guide-section-buy'));
});