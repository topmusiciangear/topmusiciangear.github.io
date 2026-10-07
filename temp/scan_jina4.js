const fs = require('fs');
const f = 'C:/Users/Daniel/.local/share/opencode/tool-output/tool_116a8bc30001kRjenrbVafCGjV';
const s = fs.readFileSync(f, 'utf8');
console.log('len', s.length);
const r2 = [...new Set(s.match(/https:\/\/r2\.gear4music\.com[^)\s"']*/g) || [])];
r2.filter(u => /1200\/preview/.test(u)).slice(0, 8).forEach(u => {
  const i = s.indexOf(u);
  console.log('IMG: ' + u.slice(0, 110));
  console.log('  ctx: ' + JSON.stringify(s.slice(Math.max(0, i - 180), i).replace(/\n/g, ' ')).slice(-190));
});
const idx = s.search(/£[0-9,]{3,}\.\d\d/);
console.log('first big gbp at:', idx, idx >= 0 ? JSON.stringify(s.slice(Math.max(0, idx - 300), idx + 60).replace(/\n/g, ' ')) : 'NONE');
const gbp = [...new Set(s.match(/£1,[0-9]{3}\.\d\d/g) || [])];
console.log('1k+ gbp:', gbp.join(' | ') || 'NONE');
