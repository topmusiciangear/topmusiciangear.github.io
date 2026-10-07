const fs = require('fs');
const d = 'C:/Users/Daniel/.local/share/opencode/tool-output/';
for (const f of ['tool_1160d5fe1001Oj8R7rXLVQ2rhJ', 'tool_1160d6469001n5V3elhW9fSByA']) {
  try {
    const s = fs.readFileSync(d + f, 'utf8');
    const m = s.match(/https:\/\/r2\.gear4music\.com[^)\s"']*/g) || [];
    console.log(f, '->', [...new Set(m)].slice(0, 5).join(' | '));
  } catch (e) {
    console.log(f, 'ERR', e.message);
  }
}
