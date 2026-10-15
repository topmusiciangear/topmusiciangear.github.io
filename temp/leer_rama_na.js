const fs = require('fs');
const s = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8').split('\n');
// rama na completa
for (let i = 6178; i <= 6187; i++) {
  const l = s[i] || '';
  console.log('\n--- L' + (i + 1) + ' ---');
  console.log(l);
}
