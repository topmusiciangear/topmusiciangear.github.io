const fs = require('fs');
const p = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const arr = Array.isArray(p) ? p : (p.products || []);
const unitRe = /(\d[\d.,]*)\s*(in|mm|cm|lb|lbs|kg|g|oz|")\b|(\d[\d.,]*)\s*"/i;
const counts = {};
const samples = {};
for (const x of arr) {
  for (const f of (x.facts || [])) {
    const v = String(f.value || '');
    const m = v.match(/^[~]?\d[\d.,]*\s*(mm|cm|in|"|lb|lbs|kg|g|oz)\b/i) || v.match(/(mm|cm|in|"|lb|lbs|kg|g|oz)$/i);
    if (!m) continue;
    const unit = m[1].toLowerCase().replace('"', 'in');
    const lbl = (f.label && f.label.en) || '?';
    const key = lbl + ' :: ' + unit;
    counts[key] = (counts[key] || 0) + 1;
    (samples[key] = samples[key] || []).push(x.id + '=' + v);
  }
}
console.log('UNIT USAGE BY FACT LABEL');
Object.entries(counts).sort((a, b) => b[1] - a[1]).forEach(([k, n]) => {
  console.log(String(n).padStart(4) + '  ' + k + '   e.g. ' + samples[k].slice(0, 3).join(', '));
});
