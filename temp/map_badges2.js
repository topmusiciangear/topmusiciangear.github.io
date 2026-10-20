const fs = require('fs');
const h = fs.readFileSync('guides/best-studio-monitors-under-150.html', 'utf8');
const marker = 'letter-spacing:-.01em;">';
let idx = 0;
const out = [];
while ((idx = h.indexOf(marker, idx)) !== -1) {
  const val = h.slice(idx + marker.length, idx + marker.length + 3);
  if (!/^9\.\d/.test(val)) { idx += 1; continue; }
  const before = h.slice(Math.max(0, idx - 4000), idx);
  const pn = [...before.matchAll(/class="[^"]*product[^"]*name[^"]*"[^>]*>([^<]+)</g)].map(m => m[1]);
  const h3 = [...before.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/g)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  out.push({ score: val, name: pn[pn.length - 1] || '(none)', h3: h3[h3.length - 1] || '(none)' });
  idx += 1;
}
out.forEach(o => console.log(o.score + ' | ' + o.name + ' | h3: ' + o.h3));

console.log('\n--- verdict paragraph order ---');
const v = h.slice(h.indexOf('verdict-text'), h.indexOf('guide-verdict-grid'));
(v.match(/<p>[\s\S]*?<\/p>/g) || []).forEach((p, i) => console.log((i + 1) + '. ' + p.replace(/<[^>]+>/g, '').slice(0, 90)));
