// Estado de las fotos en data/deals.json y data/manual-deals.json
const fs = require('fs');

for (const file of ['data/deals.json', 'data/manual-deals.json']) {
  if (!fs.existsSync(file)) { console.log(file + ': no existe'); continue; }
  const raw = JSON.parse(fs.readFileSync(file, 'utf8'));
  const list = Array.isArray(raw) ? raw : (raw.deals || []);
  const ext = new Map();
  let local = 0, none = 0;
  for (const d of list) {
    const u = d.img || d.image || '';
    if (!u) { none++; continue; }
    if (/^https?:/.test(u)) {
      let host = '';
      try { host = new URL(u).host; } catch (e) { host = '?'; }
      ext.set(host, (ext.get(host) || 0) + 1);
    } else local++;
  }
  console.log(file + ': ' + list.length + ' ofertas | locales ' + local + ' | externas ' + [...ext.values()].reduce((a, b) => a + b, 0) + ' | sin foto ' + none);
  for (const [h, n] of ext) console.log('   ' + h + ': ' + n);
}
