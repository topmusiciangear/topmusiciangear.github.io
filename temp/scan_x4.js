const fs = require('fs');
const s = fs.readFileSync('C:/Users/Daniel/.local/share/opencode/tool-output/tool_116e4ed63001ImiGL57cEOVOB8', 'utf8');
const r2 = [...new Set(s.match(/https:\/\/r2\.gear4music\.com[^)\s"']*/g) || [])];
r2.filter(u => /1200\/preview/.test(u)).slice(0, 8).forEach(u => {
  const i = s.indexOf(u);
  console.log('IMG: ' + u.slice(0, 110));
  console.log('  ctx: ' + JSON.stringify(s.slice(Math.max(0, i - 150), i).replace(/\n/g, ' ')).slice(-170));
});
