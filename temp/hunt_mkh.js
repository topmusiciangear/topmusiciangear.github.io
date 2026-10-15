const { execFileSync } = require('child_process');
const fs = require('fs');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
const OUT = 'C:/Users/Daniel/AppData/Local/Temp/opencode/';

function curl(a) {
  return execFileSync('curl.exe', ['-s', '-L', '--max-time', '45', '-A', UA].concat(a), { windowsHide: true, maxBuffer: 1 << 26 }).toString();
}
function og(html) {
  const a = [...html.matchAll(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/g)].map(m => m[1]);
  const b = [...html.matchAll(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/g)].map(m => m[1]);
  return [...new Set(a.concat(b))];
}

const cands = [
  ['zzounds', 'https://www.zzounds.com/item--SENMKH50P48'],
  ['musicstore', 'https://www.musicstore.com/en_OE/EUR/Sennheiser-MKH-50-P48/art-REC0014199-000']
];

cands.forEach(([nom, url]) => {
  console.log('\n=== ' + nom + ' ===');
  try {
    const h = curl(['-w', '\n__CODE__%{http_code}', url]);
    console.log('  http ' + (h.match(/__CODE__(\d+)/) || [])[1]);
    const imgs = og(h);
    console.log('  og:image -> ' + imgs.length);
    imgs.forEach(u => {
      const r = curl(['-o', 'NUL', '-w', '%{http_code}|%{content_type}|%{size_download}', u]);
      const [c, t, s] = r.split('|');
      console.log('    ' + (String(c).startsWith('2') && /^image\//i.test(t) ? 'OK  ' : 'MAL ') + (c + ' ' + t + ' ' + s + 'b').padEnd(26) + u);
      // descargar las buenas
      if (String(c).startsWith('2') && /^image\//i.test(t)) {
        const n = 'mkh_' + nom + '_' + (s || 0) + '.jpg';
        execFileSync('curl.exe', ['-s', '-L', '-A', UA, '-o', OUT + n, u], { windowsHide: true });
        console.log('         -> ' + n);
      }
    });
  } catch (e) { console.log('  error: ' + e.message); }
});
