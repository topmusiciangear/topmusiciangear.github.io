const { execFileSync } = require('child_process');
const fs = require('fs');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
const OUT = 'C:/Users/Daniel/AppData/Local/Temp/opencode/';
const HASH = 'at875r_1_sq-d131afcabb5d59bd3eae9b9d21f98b75.jpg';

function curl(a) {
  return execFileSync('curl.exe', ['-s', '-L', '--max-time', '45', '-A', UA].concat(a), { windowsHide: true, maxBuffer: 1 << 26 }).toString();
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
function probar(u, etiqueta) {
  const f = OUT + 'at_' + etiqueta + '.jpg';
  try {
    execFileSync('curl.exe', ['-s', '-L', '--max-time', '40', '-A', UA, '-o', f, u], { windowsHide: true });
    const b = fs.readFileSync(f);
    const d = dims(b);
    if (b[0] !== 0xFF) { console.log('  ' + etiqueta.padEnd(16) + 'no es jpeg'); return; }
    // cuanto se conserva al recortar a 4:3
    let recorte = 'n/d';
    if (d) {
      const visH = d.w / (4 / 3);
      recorte = d.h > visH ? Math.round(visH / d.h * 100) + '% alto (' + Math.round((d.h - visH) / 2) + 'px arriba y abajo)' : '100% (no se recorta)';
    }
    console.log('  ' + etiqueta.padEnd(16) + (d ? (d.w + 'x' + d.h).padEnd(11) : '?'.padEnd(11)) + recorte.padEnd(34) + (b.length / 1024).toFixed(0) + 'KB');
  } catch (e) { console.log('  ' + etiqueta + ' error'); }
}

console.log('=== zZounds: el mismo hash con otras cajas ===');
['2018by3200', '1200by1200', '1000by1000', 'fit,1200by1200', 'fit,1400by1400'].forEach((v, i) => {
  const u = 'https://cf1.zzounds.com/media/productmedia/' + v.replace(',', '%2C') + '/quality%2C85/' + HASH;
  probar(u, 'zz_' + i);
});

console.log('\n=== Gear4Music: tiene el AT875R? ===');
try {
  const h = curl(['-w', '\n__CODE__%{http_code}', 'https://www.gear4music.de/en/search.html?searchQuery=AT875R']);
  console.log('  http ' + (h.match(/__CODE__(\d+)/) || [])[1]);
  const links = [...new Set([...h.matchAll(/href="(\/en\/[^"]*AT875R[^"]*)"/gi)].map(m => m[1]))];
  console.log('  enlaces: ' + (links.length ? '\n            ' + links.slice(0, 5).join('\n            ') : '(ninguno)'));
  links.slice(0, 3).forEach((l, i) => {
    const pg = curl(['-w', '\n__CODE__%{http_code}', 'https://www.gear4music.de' + l]);
    const og = [...new Set([...pg.matchAll(/property=["']og:image["'][^>]+content=["']([^"']+)["']/g)].map(m => m[1]))];
    console.log('    ' + l);
    og.filter(u => /r2\.gear4music\.com/.test(u)).forEach(u => { console.log('      -> ' + u); probar(u, 'g4m_' + i); });
  });
} catch (e) { console.log('  error: ' + e.message); }
