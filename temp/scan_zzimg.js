const fs = require('fs');
const d = 'C:/Users/Daniel/.local/share/opencode/tool-output/';
for (const f of ['tool_1169f47d7001ncO1gP7o6vwcN6', 'tool_1169fde25001xRRr5PBLev06LU']) {
  try {
    const s = fs.readFileSync(d + f, 'utf8');
    const imgs = [...new Set(s.match(/https?:\/\/[^)"'\s]*\.(jpg|jpeg|png|webp)(\?[^)"'\s]*)?/gi) || [])];
    const prod = imgs.filter(u => !/logo|icon|sprite|flag|payment|social|banner|trustpilot|loader|spinner/i.test(u));
    console.log('=== ' + f);
    prod.slice(0, 10).forEach(u => console.log('  ' + u.slice(0, 160)));
  } catch (e) { console.log(f + ' ERR ' + e.message); }
}
