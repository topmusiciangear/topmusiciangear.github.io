const fs = require('fs');
const RE = /<\/span><\/span> - ([^<]*)</g;
const grab = (c) => { const o = []; let m; RE.lastIndex = 0; while ((m = RE.exec(c))) o.push(m[1].trim()); return o; };
const pairs = [
  ['guides/adam-vs-genelec.html', 'guides/adam-vs-genelec_es.html'],
  ['guides/studio-furniture.html', 'guides/studio-furniture_es.html'],
  ['guides/best-condenser-mics.html', 'guides/best-condenser-mics_es.html']
];
let enLeak = 0, esLeak = 0;
for (const [e, s] of pairs) {
  if (!fs.existsSync(e)) { console.log('skip (missing): ' + e); continue; }
  const ec = fs.readFileSync(e, 'utf8');
  const sc = fs.readFileSync(s, 'utf8');
  const ev = grab(ec).filter(v => /[$£€]/.test(v));
  const sv = grab(sc).filter(v => /[$£€]/.test(v));
  if (ev.some(v => v.startsWith('Aprox.'))) enLeak++;
  if (sv.some(v => v.startsWith('Approx.'))) esLeak++;
  console.log('=== ' + e);
  console.log('  EN: ' + ev.slice(0, 5).join(' | '));
  console.log('  ES: ' + sv.slice(0, 5).join(' | '));
}
console.log('\nEN pages wrongly using Aprox.: ' + enLeak);
console.log('ES pages wrongly using Approx.: ' + esLeak);
console.log(!enLeak && !esLeak ? '=== LANGUAGE OK ===' : '=== LANGUAGE PROBLEM ===');
