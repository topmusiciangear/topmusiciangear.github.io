const fs = require('fs');
const src = fs.readFileSync('build-guides.js', 'utf8');
const m = src.match(/const TEST_SHOP_BTN\s*=\s*\{([\s\S]*?)\n  \};/);
eval('var TEST_SHOP_BTN = {' + m[1] + '\n};');
for (const k of Object.keys(TEST_SHOP_BTN)) {
  if (![352, 360, 370, 372, 483, 484, 485, 486, 490, 491, 492, 493, 494, 495, 496, 497].includes(+k) && +k >= 350 && +k < 380) {
    console.log('key', k, '=', JSON.stringify(TEST_SHOP_BTN[k]).slice(0, 150));
  }
}
console.log('total keys', Object.keys(TEST_SHOP_BTN).length);
console.log('keys 350-430:', Object.keys(TEST_SHOP_BTN).filter(x => +x >= 350 && +x < 430).join(','));
const p = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const ids = new Set(p.map(x => x.id));
const dead = Object.keys(TEST_SHOP_BTN).filter(k => !ids.has(+k));
console.log('DEAD TEST_SHOP_BTN ids (no product):', dead.join(','));
console.log('live range check: 351 in ids?', ids.has(351), '| 367?', ids.has(367), '| 368?', ids.has(368), '| 369?', ids.has(369));