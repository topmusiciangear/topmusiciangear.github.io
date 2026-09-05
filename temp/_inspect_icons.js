const fs = require('fs');
const s = fs.readFileSync('js/shop-buttons.js', 'utf8');
const i = s.indexOf('SHOP_LOGO_REVERB');
console.log('SHOP_LOGO_REVERB at', i);
const r = s.match(/SHOP_LOGO_REVERB\s*=\s*([\s\S]{0,300})/);
console.log(r ? r[0].slice(0, 300) : 'none');
const j = s.indexOf('function tmgStoreButtons');
console.log('tmgStoreButtons func at', j);
const g = s.indexOf('globe');
console.log('globe at', g);
const hasG4Mflag = s.indexOf('SHOP_FLAG.GB') >= 0 || s.indexOf("flag('GB'") >= 0 || s.indexOf('flagGB') >= 0;
console.log('g4m flag refs found:', hasG4Mflag);
const flags = s.match(/(var|const|let)\s+\w*[Ff]lag\w*/g) || [];
console.log('flag vars:', flags.slice(0, 12).join(', '));
// check row icon usage
const k = s.indexOf('data-store');
console.log('data-store usage at', k);
// What does a row look like - find the row builder
const rowFn = s.match(/function storeRow[\s\S]{0,1200}/);
console.log('storeRow fn:', rowFn ? rowFn[0].slice(0, 1100) : 'no storeRow');