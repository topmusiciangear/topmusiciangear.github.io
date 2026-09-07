const fs = require('fs');
const files = ['index.html', 'es/index.html', 'guides/best-bass-amps.html', 'guides/best-bass-amps_es.html'];
const pats = [/â€¦/g, /â€™/g, /â€œ/g, /â€[^\x00-\x7F]/g, /Ã[^\x00-\x7F]/g, /Â[^\x00-\x7F]/g, /\uFFFD/g];
for (const f of files) {
  const s = fs.readFileSync(f, 'utf8');
  console.log('===', f, 'bytes:', Buffer.byteLength(s, 'utf8'));
  for (const p of pats) {
    const m = s.match(p);
    if (m) console.log('  ', p.source, '->', m.length, 'matches. samples:', m.slice(0, 5).join(' | '));
  }
}