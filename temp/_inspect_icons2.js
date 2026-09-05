const fs = require('fs');
const s = fs.readFileSync('js/shop-buttons.js', 'utf8');
// what identifiers exist
const nums = {};
for (const pat of ['SHOP_LOGO_REVERB', 'REVERB', 'reverb', 'SHOP_LOGO', 'storeIcon', 'storeIcons', 'flagSVG', 'svgGlobe', 'globeSvg', 'tmgStoreButtons', 'shopButtonsTest', 'TEST_SHOP_BTN', 'data-store']) {
  let count = 0, first = -1, prev = 0;
  while ((first = s.indexOf(pat, prev)) >= 0) { if (count === 0) prev = first; count++; prev = first + 1; if (count > 3) break; }
  console.log(pat, '=> occurrences', count, 'first@', prev);
}
const idx = s.indexOf('function shopButtonsTest');
console.log('shopButtonsTest@', idx);
if (idx >= 0) console.log(s.slice(idx, idx + 400));
const t = s.match(/tmgStoreButtons\s*=\s*[\s\S]{0,500}/);
console.log('tmgStoreButtons assignment:', t ? t[0].slice(0, 500) : 'none');
// find where reverb icon is rendered in a row: search for 'reverb' near a quote in row area
const rw = s.indexOf("'reverb'");
console.log("'reverb' first@", rw, rw >= 0 ? s.slice(rw - 200, rw + 120) : '');