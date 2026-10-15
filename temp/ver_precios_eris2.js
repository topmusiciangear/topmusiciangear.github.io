const { execFileSync } = require('child_process');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
function get(u) { return execFileSync('curl.exe', ['-s', '-L', '--max-time', '50', '-A', UA, u], { windowsHide: true, maxBuffer: 1 << 27 }).toString(); }

function structured(h, etiqueta) {
  console.log('\n--- ' + etiqueta + ' ---');
  // JSON-LD
  const ld = [...h.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)].map(m => m[1]);
  console.log('  bloques JSON-LD: ' + ld.length);
  ld.forEach(b => {
    const p = [...new Set([...b.matchAll(/"price"\s*:\s*"?([0-9.]+)"?/g)].map(m => m[1]))];
    const cur = [...new Set([...b.matchAll(/"priceCurrency"\s*:\s*"([A-Z]{3})"/g)].map(m => m[1]))];
    const nm = ((b.match(/"name"\s*:\s*"([^"]{0,60})/) || [])[1] || '');
    if (p.length) console.log('    ' + nm + ' -> ' + p.slice(0, 5).join(', ') + ' ' + cur.join('/'));
  });
  // microdata / data-attrs
  const md = [...new Set([...h.matchAll(/itemprop="price"[^>]*content="([0-9.]+)"|data-price="([0-9.]+)"|content="([0-9.]+)"[^>]*itemprop="price"/g)].map(m => m[1] || m[2] || m[3]))];
  if (md.length) console.log('  data/itemprop price: ' + md.slice(0, 8).join(', '));
  // cualquier £ o € cerca de la palabra precio
  const cerca = [...new Set([...h.matchAll(/[^"'\n]{0,60}(?:£|€)\s?[0-9][0-9.,]*[^"'\n]{0,20}/g)].map(m => m[0].trim()))].filter(s => !/shipping|delivery|save|off|p&p/i.test(s));
  console.log('  importes con símbolo en contexto: ' + (cerca.length ? cerca.slice(0, 8).join('\n                              ') : '(ninguno)'));
}

console.log('=== GEAR4MUSIC ===');
try {
  const g = get('https://www.gear4music.de/en/Recording-and-Computers/PreSonus-Eris-Studio-5/5S8A');
  structured(g, 'gear4music.de');
} catch (e) { console.log('  error: ' + e.message); }

console.log('\n=== MUSIC STORE ===');
try {
  const m = get('https://www.musicstore.com/en_OE/EUR/PreSonus-Eris-Studio-5/art-REC0016445-000');
  structured(m, 'musicstore');
} catch (e) { console.log('  error: ' + e.message); }

console.log('\n=== AMAZON ===');
try {
  const a = get('https://www.amazon.com/dp/B0C88X4VB4');
  structured(a, 'amazon');
} catch (e) { console.log('  error: ' + e.message); }
