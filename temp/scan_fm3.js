const fs = require('fs');
const d = 'C:/Users/Daniel/.local/share/opencode/tool-output/';
const files = fs.readdirSync(d);
let hits = 0;
for (const f of files) {
  let s = '';
  try { s = fs.readFileSync(d + f, 'utf8'); } catch (e) { continue; }
  if (/fractal/i.test(s.slice(0, 2000))) {
    const imgs = [...new Set(s.match(/https?:\/\/[^)"'\s]*\.(jpg|jpeg|png|webp)[^)"'\s]*/gi) || [])];
    const fm3 = imgs.filter(u => /fm3/i.test(u));
    console.log('=== ' + f + ' len=' + s.length);
    console.log('fm3 imgs: ' + (fm3.slice(0, 6).join(' | ') || 'NONE'));
    console.log('all imgs: ' + (imgs.slice(0, 6).join(' | ') || 'NONE'));
    if (++hits >= 4) break;
  }
}
if (!hits) console.log('no fractal files found');
