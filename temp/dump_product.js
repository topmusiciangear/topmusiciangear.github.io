const fs = require('fs');
const file = process.argv[2] || 'guides/best-monitors.html';
const h = fs.readFileSync(file, 'utf8');
const re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
let m;
while ((m = re.exec(h)) !== null) {
  let s;
  try { s = JSON.parse(m[1]); } catch (e) { continue; }
  const items = Array.isArray(s) ? s : (s['@graph'] || [s]);
  (Array.isArray(items) ? items : [items]).forEach(it => {
    if (it && it['@type'] === 'Product' && (it.review || []).length) {
      console.log(JSON.stringify(it, null, 1).slice(0, 2200));
      process.exit(0);
    }
  });
}
