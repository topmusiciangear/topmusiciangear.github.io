const { execFileSync } = require('child_process');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
const H = ['-A', UA, '-H', 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  '-H', 'Accept-Language: en-GB,en;q=0.9', '--compressed',
  '-H', 'Upgrade-Insecure-Requests: 1'];
const h = execFileSync('curl.exe', ['-s', '-L', '--max-time', '50', '-w', '\n__C__%{http_code}'].concat(H, ['https://www.gear4music.de/en/Recording-and-Computers/G4M-Acoustics-Squarewave-4-Pack/5KYU']), { windowsHide: true, maxBuffer: 1 << 27 }).toString();

const code = (h.match(/__C__(\d+)/) || [])[1] || '?';
const titRaw = (h.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '';
const tit = titRaw.replace(/\s+/g, ' ').trim().slice(0, 90);
console.log('http: ' + code + '  bytes: ' + h.length);
console.log('titulo: ' + tit);
const vis = [...new Set([...h.matchAll(/€\s?[0-9][0-9.,]*/g)].map(m => m[0]))].slice(0, 10);
console.log('euros: ' + (vis.length ? vis.join(' | ') : '(ninguno)'));
const ld = [...new Set([...h.matchAll(/"price"\s*:\s*"?([0-9.]+)"?/g)].map(m => m[1]))];
console.log('precios JSON-LD: ' + (ld.length ? ld.slice(0, 6).join(' | ') : '(ninguno)'));
