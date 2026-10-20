const fs = require('fs');
const dir = 'guides';
let pages = 0, refs = 0, clsPages = 0;
for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith('.html')) continue;
  pages++;
  const s = fs.readFileSync(dir + '/' + f, 'utf8');
  const r = (s.match(/src="[^"]*img\/cut\//g) || []).length;
  refs += r;
  if (/class="[^"]*--cutout/.test(s)) clsPages++;
}
console.log('paginas', pages, '| src a img/cut:', refs, '| paginas con clase --cutout:', clsPages);
