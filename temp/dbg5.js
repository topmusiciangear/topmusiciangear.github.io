const fs = require('fs');
const t = fs.readFileSync('C:/Users/Daniel/.local/share/opencode/tool-output/tool_10bf9f88f0018kwfx7CujU4Ily', 'utf8');
const a = t.indexOf('[{');
const e = t.slice(a, a + 2100);
let esc = 0, bare = 0;
for (let i = 0; i < e.length; i++) {
  if (e[i] !== '"') continue;
  if (e[i - 1] === '\\') esc++; else bare++;
}
console.log('escaped:', esc, 'bare:', bare);
// show bare ones with context
for (let i = 0; i < e.length; i++) {
  if (e[i] === '"' && e[i - 1] !== '\\') console.log(i + ': [' + e.slice(Math.max(0, i - 40), i + 40).replace(/\n/g, ' ') + ']');
}