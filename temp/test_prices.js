const fs = require('fs');
const src = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');
const ini = src.indexOf('const TEST_SHOP_BTN');
[163, 164, 165, 441, 442, 162, 157, 161, 159, 160].forEach(id => {
  const re = new RegExp('\\n  ' + id + ': \\{[\\s\\S]{0,700}?\\n  \\},');
  const m = re.exec(src.slice(ini));
  console.log('--- ' + id + ' ---');
  console.log(m ? m[0].replace(/\s+/g, ' ') : 'sin bloque');
});