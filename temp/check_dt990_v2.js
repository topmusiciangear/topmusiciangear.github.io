const fs = require('fs');
const s = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/js/guide-scores.js', 'utf8');
const idx = s.indexOf('"open-headphones"');
const end = s.indexOf('"best-', idx + 1);
const block = s.substring(idx, end > idx ? end : idx + 2000);
const dtIdx = block.indexOf('DT 990 Pro');
if (dtIdx !== -1) {
  console.log('DT 990 Pro en open-headphones:');
  console.log(block.substring(dtIdx, dtIdx + 60));
} else {
  console.log('DT 990 Pro no encontrado en bloque open-headphones');
  console.log(block);
}
