const fs = require('fs');
const f = 'C:/Users/Daniel/.local/share/opencode/tool-output/tool_116a8bc30001kRjenrbVafCGjV';
const s = fs.readFileSync(f, 'utf8');
for (const p of ['£1,129.00', '£1,377.00', '£1,349.00']) {
  let i = -1;
  console.log('=== ' + p);
  while ((i = s.indexOf(p, i + 1)) !== -1) {
    console.log('  ctx: ' + JSON.stringify(s.slice(Math.max(0, i - 220), i + 20).replace(/\n/g, ' ')).slice(-260));
  }
}
