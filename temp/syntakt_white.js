const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/build-guides.js';
let s = fs.readFileSync(F, 'utf8');
const start = s.indexOf('612: {');
let d = 0, i = s.indexOf('{', start);
for (; i < s.length; i++) {
  if (s[i] === '{') d++;
  else if (s[i] === '}') { d--; if (d === 0) break; }
}
let block = s.slice(start, i + 1);
if (!block.includes('"andertons"')) throw new Error('oos anchor missing');
block = block.replace(/,\s*oos:\s*\[\s*"andertons"\s*\]/, '');
s = s.slice(0, start) + block + s.slice(i + 1);
fs.writeFileSync(F, s);
const m = s.match(/const TEST_SHOP_BTN\s*=\s*\{([\s\S]*?)\n *\};/);
console.log('612:', JSON.stringify(Function('return {' + m[1] + '\n}')()[612]));
