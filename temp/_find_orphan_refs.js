const fs = require('fs');
function walk(d, out) {
  for (const e of fs.readdirSync(d)) {
    const p = d + '/' + e;
    const st = fs.statSync(p);
    if (st.isDirectory()) { walk(p, out); }
    else if (/\.(html|xml)$/.test(e)) {
      const h = fs.readFileSync(p, 'utf8');
      if (h.indexOf('ew100-vs-ulxd') >= 0) { out.push(p + ' :: ' + (h.split('ew100-vs-ulxd').length - 1) + 'x'); }
    }
  }
}
const o = [];
walk('guides', o);
console.log(o.slice(0, 40).join('\n') || 'none in guides');
const o2 = [];
for (const f of ['index.html', 'sitemap.xml', 'sitemap-images.xml']) {
  try {
    const h = fs.readFileSync(f, 'utf8');
    if (h.indexOf('ew100-vs-ulxd') >= 0) { o2.push(f + ' :: ' + (h.split('ew100-vs-ulxd').length - 1) + 'x'); }
  } catch (e) {}
}
console.log(o2.join('\n') || 'none in root');