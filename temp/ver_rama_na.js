const fs = require('fs');
const s = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8').split('\n');
for (let i = 6182; i <= 6190; i++) {
  console.log('L' + (i + 1) + ': ' + (s[i] || '').trim().slice(0, 320));
}
