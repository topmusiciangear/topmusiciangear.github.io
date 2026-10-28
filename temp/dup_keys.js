const fs = require('fs');
const src = fs.readFileSync('build-guides.js', 'utf8');
const start = src.indexOf('const TEST_SHOP_BTN = {');
// recorre llaves para hallar el cierre del objeto
let i = src.indexOf('{', start), depth = 0, end = -1;
for (let p = i; p < src.length; p++) {
  const c = src[p];
  if (c === '{') depth++;
  else if (c === '}') { depth--; if (depth === 0) { end = p; break; } }
}
const body = src.slice(i + 1, end);
// claves de primer nivel
const keys = [];
let d = 0;
for (let p = 0; p < body.length; p++) {
  const c = body[p];
  if (c === '{' || c === '[') d++;
  else if (c === '}' || c === ']') d--;
  else if (d === 0) {
    const m = /^\s*(\d+)\s*:/.exec(body.slice(p, p + 20));
    if (m && (p === 0 || body[p - 1] === '\n' || body[p - 1] === ',' || /[\s]/.test(body[p - 1]))) {
      keys.push({ key: m[1], at: p });
      p += m[0].length - 1;
    }
  }
}
const counts = {};
keys.forEach(k => { counts[k.key] = (counts[k.key] || 0) + 1; });
const dups = Object.entries(counts).filter(([, v]) => v > 1);
console.log('claves totales:', keys.length, '| duplicadas:', dups.length);
console.log(dups.map(([k, v]) => k + ' x' + v).join(', '));

const want = ['459', '1058', '1059', '1061', '1063'];
for (const w of want) {
  const hits = keys.filter(k => k.key === w);
  hangs: {
    console.log('\n=== ' + w + ' (' + hits.length + ') ===');
    hits.forEach((h, n) => {
      const next = body.indexOf('\n', body.indexOf('\n', h.at + 1) + 1);
      const chunk = body.slice(h.at, Math.min(h.at + 700, hits[n + 1] ? hits[n + 1].at : h.at + 700));
      console.log('  [' + n + '] ' + chunk.replace(/\s+/g, ' ').slice(0, 420));
    });
  }
}
