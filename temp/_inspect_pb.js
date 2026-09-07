const fs = require('fs');
const c = fs.readFileSync('js/shop-buttons.js', 'utf8');
const i = c.indexOf('function shopButtonsTest');
if (i < 0) { console.log('shopButtonsTest not found'); process.exit(0); }
let slice = c.substring(i, i + 12000);
['wrapAffiliate(', 'affWrap(', 'ensurePbAff(', 'stores.'].forEach(h => {
  const re = new RegExp(h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
  let m, n = 0;
  console.log('==== ' + h + ' ====');
  while ((m = re.exec(slice)) && n < 6) {
    console.log('  @' + (m.index + i) + ': ' + slice.substring(Math.max(0, m.index - 70), m.index + 70).split('\n').join(' '));
    n++;
  }
});