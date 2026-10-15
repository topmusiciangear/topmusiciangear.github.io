const { execFileSync } = require('child_process');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
function get(u) { return execFileSync('curl.exe', ['-s', '-L', '--max-time', '50', '-A', UA, '-H', 'Accept-Language: en-GB,en;q=0.9', u], { windowsHide: true, maxBuffer: 1 << 27 }).toString(); }

const u = 'https://www.gear4music.de/en/Recording-and-Computers/G4M-Acoustics-Squarewave-4-Pack/5KYU';
const h = get(u);
console.log('=== G4M Squarewave 4-Pack ===');
console.log('  bytes: ' + h.length);
const desc = [...new Set([...h.matchAll(/<meta[^>]+(?:name|property)="(?:description|og:description)"[^>]+content="([^"]+)"/gi)].map(m => m[1]))];
desc.forEach(d => console.log('  desc: ' + d.replace(/&amp;/g, '&').slice(0, 400)));
const specs = [...new Set([...h.matchAll(/[^<>{}"]{0,60}(?:\d+\s*(?:cm|mm|inch|inches|"|\x27))\s?[^<>{}"]{0,60}/gi)]
  .map(m => m[0].replace(/\s+/g, ' ').trim()))].filter(s => /\b(?:size|thick|depth|dimension|cm|mm|inch)\b/i.test(s));
console.log('\n  medidas halladas:');
[...new Set(specs)].slice(0, 20).forEach(x => console.log('    ' + x));
const full = h.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
['Dimensions', 'Size', 'Thickness', 'Depth', 'cm'].forEach(k => {
  const i = full.indexOf(k);
  if (i > -1) console.log('\n  ctx "' + k + '": ...' + full.slice(Math.max(0, i - 80), i + 160) + '...');
});
