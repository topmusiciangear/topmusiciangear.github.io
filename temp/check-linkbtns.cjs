const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
function find(o, pfx) {
  if (o == null) return;
  if (typeof o === 'string') {
    const re = /<a class="guide-link-btn" href="[^"]+">[^<]*<\/a>/g;
    const m = o.match(re);
    if (m) {
      console.log('FIELD:', pfx);
      m.forEach(x => console.log('   ', x));
    }
    return;
  }
  if (Array.isArray(o)) o.forEach((v, i) => find(v, pfx + '[' + i + ']'));
  else Object.keys(o).forEach(k => find(o[k], pfx + '.' + k));
}
for (const id of ['guitar-pedals', 'best-mic-for-podcasting', 'best-interface']) {
  const gr = g.find(x => x.id === id);
  console.log('=== ' + id);
  find(gr, '');
}