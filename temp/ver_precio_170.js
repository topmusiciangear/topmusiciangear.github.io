const { execFileSync } = require('child_process');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
function get(u) { return execFileSync('curl.exe', ['-s', '-L', '--max-time', '50', '-A', UA, u], { windowsHide: true, maxBuffer: 1 << 27 }).toString(); }

const h = get('https://www.gear4music.de/en/Recording-and-Computers/G4M-Acoustics-Squarewave-4-Pack/5KYU');
console.log('bytes: ' + h.length);
const ld = [...h.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)].map(m => m[1]);
console.log('bloques JSON-LD: ' + ld.length);
ld.forEach(b => {
  const prices = [...new Set([...b.matchAll(/"price"\s*:\s*"?([0-9.]+)"?/g)].map(m => m[1]))];
  const cur = [...new Set([...b.matchAll(/"priceCurrency"\s*:\s*"([A-Z]{3})"/g)].map(m => m[1]))];
  const avail = [...new Set([...b.matchAll(/"availability"\s*:\s*"([^"]+)"/g)].map(m => m[1]))];
  const name = ((b.match(/"name"\s*:\s*"([^"]{0,60})/) || [])[1] || '');
  if (prices.length) console.log('  ' + name + ' -> ' + prices.join(',') + ' ' + cur.join('/') + '  ' + avail.join(','));
});
// precio visible
const vis = [...new Set([...h.matchAll(/€\s?[0-9][0-9.,]*/g)].map(m => m[0]))].slice(0, 10);
console.log('euros visibles: ' + vis.join(' | '));
const gbp = [...new Set([...h.matchAll(/£\s?[0-9][0-9.,]*/g)].map(m => m[0]))].slice(0, 10);
console.log('libras visibles: ' + gbp.join(' | '));
