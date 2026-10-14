const fs = require('fs');
const f = 'C:/Users/Daniel/projects/topmusiciangear/temp/four_reviews.js';
let s = fs.readFileSync(f, 'utf8');
const suspects = ['tocasUNCTIONES', '调节', '承受', '|', '宝玉', '下，', '一'];
suspects.forEach(w => {
  let k = -1, c = 0;
  while ((k = s.indexOf(w, k + 1)) > -1) { console.log('"' + w + '" :: ' + JSON.stringify(s.slice(Math.max(0, k - 70), k + 50))); c++; if (c > 2) break; }
});
console.log('--- fin barrido ---');