const fs = require('fs');
const s = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/js/guide-scores.js', 'utf8');
const idx = s.indexOf('DT 990 Pro');
const block = s.substring(Math.max(0, idx - 100), idx + 200);
console.log('Bloque DT 990 Pro:');
console.log(block);
// Also check what gen_guide_scores.js produced for open-headphones
const idx2 = s.indexOf('open-headphones');
if (idx2 !== -1) {
  console.log('\nBloque open-headphones:');
  console.log(s.substring(idx2, idx2 + 500));
}
