const fs = require('fs');
const files = [
  'C:/Users/Daniel/.local/share/opencode/tool-output/tool_1160d5fe1001Oj8R7rXLVQ2rhJ',
  'C:/Users/Daniel/.local/share/opencode/tool-output/tool_1160d6469001n5V3elhW9fSByA'
];
for (const f of files) {
  if (!fs.existsSync(f)) { console.log('MISSING', f); continue; }
  const s = fs.readFileSync(f, 'utf8');
  console.log('==', f.slice(-12), 'len', s.length);
  const og = s.match(/https?:\/\/[^)"'\s]*r2\.gear4music\.com[^)"'\s]*/g) || [];
  console.log('imgs:', [...new Set(og)].slice(0, 8).join('\n        '));
  const pr = [...new Set((s.match(/£[0-9,]+\.\d\d/g) || []))].slice(0, 10);
  console.log('prices:', pr.join(' '));
  const ogm = s.match(/property="og:image" content="[^"]+"/g) || [];
  console.log('og:image tags:', ogm.slice(0, 4).join('\n'));
}
