const fs = require('fs');
// 1. 489 card must link the real G4M product page, not home
const h = fs.readFileSync('guides/best-bass-practice-amps.html', 'utf8');
console.log('695I in page:', h.indexOf('695I') > -1);
console.log('bare gear4music.com home link:', /href="https:\/\/www\.gear4music\.com\/"(?!.)/.test(h));
// 2. runtime template carries the fix
const js = fs.readFileSync('js/shop-buttons.js', 'utf8');
console.log('fix in shop-buttons.js:', js.indexOf("(k === 'reverb' ? revUrl : stores[k]) || ((oosList.indexOf(k) > -1") > -1);
// 3. another OOS product still renders (spot check id 170 G4M OOS -> real /5KYU url)
const h2 = fs.readFileSync('guides/studio-furniture.html', 'utf8');
console.log('170 5KYU link:', h2.indexOf('5KYU') > -1);