const fs = require('fs');
const t = fs.readFileSync('C:/Users/Daniel/.local/share/opencode/tool-output/tool_10bf9f88f0018kwfx7CujU4Ily', 'utf8');
const a = t.indexOf('[{');
const e0end = t.indexOf('},{"g":', a);
const e0 = t.slice(a, e0end + 1);
const ctrls = [];
for (let i = 0; i < e0.length; i++) {
  const c = e0.charCodeAt(i);
  if (c < 32 && c !== 10 && c !== 13) ctrls.push(i + ':U+' + c.toString(16) + ' ctx:' + JSON.stringify(e0.slice(Math.max(0, i - 30), i + 20)));
}
console.log('control chars (excl \\n\\r):', JSON.stringify(ctrls.slice(0, 5)));
console.log('has tab:', e0.includes('\t'));