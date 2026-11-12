const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const t = fs.readFileSync(B + 'data/guides.json', 'utf8');
const re = /"heading"\s*:\s*"(Best Microphone for Podcasting \(2025\)|Fix Clipping on the Focusrite Scarlett 2i2 \(Step-by-Step Guide\))"/;
let m;
while ((m = re.exec(t)) !== null) {
  const i = m.index;
  console.log('=== ' + m[1] + ' @' + i + ' ===');
  console.log(t.slice(i - 10, i + 320));
  console.log('');
}
