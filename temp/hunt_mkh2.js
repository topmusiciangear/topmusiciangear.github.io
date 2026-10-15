const { execFileSync } = require('child_process');
const fs = require('fs');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
const OUT = 'C:/Users/Daniel/AppData/Local/Temp/opencode/';

function curl(a) {
  return execFileSync('curl.exe', ['-s', '-L', '--max-time', '40', '-A', UA].concat(a), { windowsHide: true, maxBuffer: 1 << 26 }).toString();
}
function dims(buf) {
  let i = 2;
  while (i < buf.length - 9) {
    if (buf[i] !== 0xFF) { i++; continue; }
    const m = buf[i + 1];
    if (m >= 0xC0 && m <= 0xCF && m !== 0xC4 && m !== 0xC8 && m !== 0xCC)
      return { h: buf.readUInt16BE(i + 5), w: buf.readUInt16BE(i + 7) };
    i += 2 + buf.readUInt16BE(i + 2);
  }
  return null;
}

// La pagina de producto de Sennheiser
console.log('=== sennheiser.com · MKH 50-P48 ===');
try {
  const h = curl(['-w', '\n__CODE__%{http_code}', 'https://www.sennheiser.com/en-US/p/mkh-50-p48/']);
  console.log('  http ' + (h.match(/__CODE__(\d+)/) || [])[1] + '  (' + h.length + ' bytes)');
  const imgs = [...new Set([...h.matchAll(/https:\/\/[^"'\\ ]*assets\.sennheiser\.com\/[^"'\\ ]*?\.(?:jpg|jpeg|png|webp)/gi)].map(m => m[0]))];
  console.log('  imagenes de assets.sennheiser.com: ' + imgs.length);
  imgs.slice(0, 12).forEach(u => {
    const r = curl(['-o', 'NUL', '-w', '%{http_code}|%{content_type}|%{size_download}', u]);
    const [c, t, s] = r.split('|');
    const bien = String(c).startsWith('2') && /^image\//i.test(t);
    console.log('    ' + (bien ? 'OK  ' : 'MAL ') + (c + ' ' + t + ' ' + s + 'b').padEnd(28) + u.replace('https://', ''));
    if (bien && Number(s) > 20000) {
      const n = 'mkh_senn_' + imgs.indexOf(u) + '.jpg';
      execFileSync('curl.exe', ['-s', '-L', '-A', UA, '-o', OUT + n, u], { windowsHide: true });
      const d = dims(fs.readFileSync(OUT + n));
      console.log('         -> ' + n + '  ' + (d ? d.w + 'x' + d.h : '?'));
    }
  });
} catch (e) { console.log('  error: ' + e.message); }
