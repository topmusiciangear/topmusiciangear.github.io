const fs = require('fs');
const path = require('path');
const files = [];
(function walk(d) { for (const e of fs.readdirSync(d)) { const p = path.join(d, e); if (fs.statSync(p).isDirectory()) walk(p); else files.push(p); } })('guides');
const seen = new Map();
for (const file of files) {
  const h = fs.readFileSync(file, 'utf8');
  const re = /<a[^>]*?href="">([\s\S]{0,120}?)<\/a>/g;
  let m;
  while ((m = re.exec(h))) {
    const inner = m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 90);
    const key = inner;
    if (!seen.has(key)) seen.set(key, []);
    seen.get(key).push(path.basename(file));
  }
}
console.log('empty-href <a> variants:', seen.size);
for (const [inner, filesAt] of seen) {
  console.log(`\n>> "${inner}" (${filesAt.length} pages) e.g. ${[...new Set(filesAt)].slice(0, 8).join(', ')}`);
  const snippet = filesAt[0];
}