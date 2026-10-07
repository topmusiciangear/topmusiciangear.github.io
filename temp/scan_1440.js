const fs = require('fs');
const d = 'C:/Users/Daniel/.local/share/opencode/tool-output/';
const files = fs.readdirSync(d).map(f => ({ f, t: fs.statSync(d + f).mtimeMs })).sort((a, b) => b.t - a.t);
for (const { f } of files.slice(0, 6)) {
  const s = fs.readFileSync(d + f, 'utf8');
  if (/1440|5XK9/i.test(s.slice(0, 3000))) {
    const r2 = [...new Set(s.match(/https:\/\/r2\.gear4music\.com[^)\s"']*/g) || [])];
    console.log('=== ' + f + ' len=' + s.length);
    r2.filter(u => /1200\/preview/.test(u)).slice(0, 6).forEach(u => {
      const i = s.indexOf(u);
      console.log('  ' + u.slice(0, 100) + ' || ' + JSON.stringify(s.slice(Math.max(0, i - 120), i).replace(/\n/g, ' ')).slice(-140));
    });
  }
}
