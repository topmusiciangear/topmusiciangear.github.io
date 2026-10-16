const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
const a = bg.indexOf('const TEST_SHOP_BTN = {');
const seg = bg.slice(a, a + 140000);
[30, 29, 60, 472, 473, 474, 1038, 62].forEach(id => {
  const i = seg.indexOf('\n  ' + id + ': {');
  const j = seg.indexOf(',\n  ', i);
  console.log(id + ': ' + seg.slice(i + 1, Math.min(j, i + 220)).replace(/\n\s*/g, ' '));
});
