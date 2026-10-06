const fs = require('fs');
const cp = require('child_process');
function load(s) {
  const head = 'const TEST_SHOP_BTN = ';
  const h = s.indexOf(head);
  const open = h + head.length;
  let d = 0, q = null, i = open;
  for (; i < s.length; i++) {
    const c = s[i];
    if (q) { if (c === '\\') i++; else if (c === q) q = null; continue; }
    if (c === '"' || c === "'" || c === '`') { q = c; continue; }
    if (c === '{') d++;
    else if (c === '}') { d--; if (d === 0) break; }
  }
  return eval('(' + s.slice(open, i + 1) + ')');
}
const base = cp.execSync('git show d556fa5ed5:build-guides.js', { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
const A = load(base);
const B = load(fs.readFileSync('build-guides.js', 'utf8'));
['410', '184', '320'].forEach(k => {
  console.log(k, 'old:', JSON.stringify(A[k]));
  console.log(k, 'new:', JSON.stringify(B[k]));
});

// page check: GBP prices present in EN page?
const h = fs.readFileSync('guides/best-digital-pianos.html', 'utf8');
console.log('pound signs:', (h.match(/£/g) || []).length);
console.log('799.00:', (h.split('799.00').length - 1), '| 1,175.00:', (h.split('1,175.00').length - 1), '| 505.00:', (h.split('505.00').length - 1));
console.log('data-store rows sample:', (h.match(/data-store="[a-z]+"/g) || []).slice(0, 12).join(' '));
console.log('fmtPrice 1,749:', (h.split('1,749.99').length - 1));
const es = fs.readFileSync('guides/best-digital-pianos_es.html', 'utf8');
console.log('ES undefined:', (es.split('undefined').length - 1), '| ES 3,299.99:', (es.split('3,299.99').length - 1), '| ES 1,499:', (es.split('1,499.00').length - 1));
