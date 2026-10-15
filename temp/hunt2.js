const { execFileSync } = require('child_process');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
function curl(args) {
  return execFileSync('curl.exe', ['-s', '-L', '--max-time', '45', '-A', UA].concat(args), { windowsHide: true, maxBuffer: 1 << 26 }).toString();
}
function og(html) {
  const a = [...html.matchAll(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/g)].map(m => m[1]);
  const b = [...html.matchAll(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/g)].map(m => m[1]);
  return [...new Set(a.concat(b))];
}
function probarImg(u) {
  const r = curl(['-o', 'NUL', '-w', '%{http_code}|%{content_type}|%{size_download}', u]);
  const [c, t, s] = r.split('|');
  return '  ' + (String(c).startsWith('2') && /^image\//i.test(t) ? 'OK  ' : 'MAL ') + ' ' + (c + ' ' + t + ' ' + s + 'b').padEnd(30) + u;
}

console.log('=== verificar la del MV6 ===');
console.log(probarImg('https://r2.gear4music.com/media/112/1126877/1200/preview.jpg'));

console.log('\n=== Keeley Caverns V2 · zZounds ===');
try {
  const h = curl(['-w', '\n__CODE__%{http_code}', 'https://www.zzounds.com/item--KEECAVERNSV2']);
  console.log('  http ' + (h.match(/__CODE__(\d+)/) || [])[1]);
  og(h).forEach(u => console.log(probarImg(u)));
} catch (e) { console.log('  error: ' + e.message); }

console.log('\n=== Keeley Caverns V2 · Andertons ===');
try {
  const h = curl(['-w', '\n__CODE__%{http_code}', 'https://www.andertons.co.uk/keeley-caverns-delay-reverb-v2/']);
  console.log('  http ' + (h.match(/__CODE__(\d+)/) || [])[1]);
  og(h).forEach(u => console.log(probarImg(u)));
} catch (e) { console.log('  error: ' + e.message); }

console.log('\n=== Sennheiser MKH 50-P48 · Gear4Music ===');
try {
  const h = curl(['-w', '\n__CODE__%{http_code}', 'https://www.gear4music.de/en/search.html?searchQuery=Sennheiser+MKH+50-P48']);
  console.log('  http ' + (h.match(/__CODE__(\d+)/) || [])[1]);
  const links = [...new Set([...h.matchAll(/href="(\/en\/[^"]*MKH[^"]*)"/gi)].map(m => m[1]))].slice(0, 6);
  console.log('  enlaces: ' + (links.length ? links.join('\n            ') : '(ninguno)'));
  og(h).slice(0, 2).forEach(u => console.log(probarImg(u)));
} catch (e) { console.log('  error: ' + e.message); }
