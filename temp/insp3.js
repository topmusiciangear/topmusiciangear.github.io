const fs = require('fs');
const f = 'C:/Users/Daniel/.local/share/opencode/tool-output/tool_10bf9f88f0018kwfx7CujU4Ily';
const t = fs.readFileSync(f, 'utf8');
const a = t.indexOf('[{');
const b = t.lastIndexOf('}]');
const s = t.slice(a, b + 2).replace(/[\u0000-\u001F]/g, ' ');
// find quotes that look non-structural: letter before AND letter/space after (not , : } ])
const re = /[a-zA-Záéíóúñ]\"[a-zA-Záéíóúñ ]/g;
let m; let n = 0;
while ((m = re.exec(s)) !== null && n < 15) {
  console.log(m.index + ': ...' + s.slice(Math.max(0, m.index - 60), m.index + 20));
  n++;
}
console.log('total suspicious: check done');