const fs = require('fs');
const files = {
  gtcore: 'tool_116a745ca001hDSwjLSychBJe4'
};
const d = 'C:/Users/Daniel/.local/share/opencode/tool-output/';
for (const [k, f] of Object.entries(files)) {
  const s = fs.readFileSync(d + f, 'utf8');
  const r2 = [...new Set(s.match(/https:\/\/r2\.gear4music\.com[^)\s"']*/g) || [])];
  const main = r2.filter(u => /1200\/preview/.test(u));
  console.log('=== ' + k + ' len=' + s.length);
  main.slice(0, 8).forEach(u => {
    const i = s.indexOf(u);
    console.log('  ' + u.slice(0, 110));
    console.log('    ctx: ' + JSON.stringify(s.slice(Math.max(0, i - 150), i).replace(/\n/g, ' ')).slice(-160));
  });
  const gbp = [...new Set(s.match(/£[0-9,]+\.\d\d/g) || [])];
  console.log('  gbp sample: ' + gbp.slice(0, 8).join(' | '));
}
