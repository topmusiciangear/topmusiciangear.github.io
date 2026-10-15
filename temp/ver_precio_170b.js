const { execFileSync } = require('child_process');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
const H = ['-A', UA, '-H', 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  '-H', 'Accept-Language: en-GB,en;q=0.9', '--compressed',
  '-H', 'Upgrade-Insecure-Requests: 1'];
function get(u) { return execFileSync('curl.exe', ['-s', '-L', '--max-time', '50', '-w', '\n__C__%{http_code}', ...H, u], { windowsHide: true, maxBuffer: 1 << 27 }).toString(); }

const h = get('https://www.gear4music.de/en/Recording-and-Computers/G4M-Acoustics-Squarewave-4-Pack/5KYU');
console.log('http: ' + (h.match(/__C__(\d+)/) || [])[1] + '  bytes: ' + h.length);
console.log('titulo: ' + (((h.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '').replace(/\s+/g, ' ').trim().slice(0, 90));
const vis = [...new Set([...h.matchAll(/€\s?[0-9][0-9.,]*/g)].map(m => m[0]))].slice(0, 10);
console.log('euros: ' + (vis.length ? vis.join(' | ') : '(ninguno)'));
const ld = [...h.matchAll(/"price"\s*:\s*"?([0-9.]+)"?[^}]{0,80}"priceCurrency"\s*:\s*"([A-Z]{3})"/g)].map(m => m[1] + ' ' + m[2]);
console.log('JSON-LD: ' + (ld.length ? [...new Set(ld)].join(' | ') : '(ninguno)'));
