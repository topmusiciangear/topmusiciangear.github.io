const fs = require('fs');
const path = require('path');
const roots = ['js', 'data', 'css', '.'];
const pats = [/â€¦/g, /â€[™“”¢–—]/g, /Ã\S/g, /Â\S/g, /ðŸ/g, /â€/g, /\uFFFD/g];
const skip = ['.git', 'node_modules', 'temp'];
const found = [];
function walk(d) {
  let es;
  try { es = fs.readdirSync(d, { withFileTypes: true }); } catch (e) { return; }
  for (const e of es) {
    const fp = path.join(d, e.name);
    if (e.isDirectory()) {
      if (skip.includes(e.name)) continue;
      walk(fp);
    } else if (/\.(js|json|html)$/i.test(e.name)) {
      const buf = fs.readFileSync(fp);
      // detect if file contains sequences that decode to mojibake when served
      const s = buf.toString('utf8');
      let c = 0;
      const samples = [];
      for (const p of pats) {
        const m = s.match(p);
        if (m) { c += m.length; if (samples.length < 3) samples.push(p.source + ':' + m.length); }
      }
      // Also flag raw bytes that are 0xE2 0x80 0xA6 (…), 0xE2 0x80 0x94 (–/—) fine; mojibake = literal "â€" ascii
      if (c) found.push({ fp: fp.replace(/\\/g, '/'), count: c, samples });
    }
  }
}
walk('js'); walk('data'); walk('index.html'); walk('es');
if (!found.length) console.log('NO MOJIBAKE FOUND in js/data/index/es');
for (const f of found) console.log(f.fp, 'count=' + f.count, f.samples.join(' '));