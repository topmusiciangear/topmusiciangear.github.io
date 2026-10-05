const fs = require('fs');
const f = 'C:/Users/Daniel/.local/share/opencode/tool-output/tool_10bf9f88f0018kwfx7CujU4Ily';
const t = fs.readFileSync(f, 'utf8');
const a = t.indexOf('[{');
const s = t.slice(a, a + 2100).replace(/[\u0000-\u001F]/g, ' ');
for (let i = 1880; i < 1990; i++) {
  process.stdout.write('[' + i + ':' + JSON.stringify(s[i]) + ']');
}
console.log('');