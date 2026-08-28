const fs = require('fs');
let code = fs.readFileSync('build-guides.js', 'utf8');

const tf3Line = '    418: {amazon:\'$2,999\',reverb:\'Check price\'},';
const marker417 = '    417: {amazon:';
const idx417 = code.indexOf(marker417);
if (idx417 > -1) {
  const endLine = code.indexOf('\n', idx417);
  code = code.substring(0, endLine + 1) + tf3Line + '\n' + code.substring(endLine + 1);
  fs.writeFileSync('build-guides.js', code, 'utf8');
  console.log('Added TF3 price to TEST_SHOP_BTN');
} else {
  console.log('Could not find 417 price entry');
}
