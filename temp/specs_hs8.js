const { execFileSync } = require('child_process');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
function get(u) {
  return execFileSync('curl.exe', ['-s', '-L', '--max-time', '60', '-A', UA,
    '-H', 'Accept-Language: en-GB,en;q=0.9', '--compressed', u], { windowsHide: true, maxBuffer: 1 << 27 }).toString();
}

console.log('=== AMAZON · Yamaha HS8 (id 19) ===');
try {
  const h = get('https://www.amazon.com/dp/B00DCYMVB2');
  const bullets = [...h.matchAll(/<span[^>]+class="a-list-item"[^>]*>([\s\S]{0,400}?)<\/span>/g)]
    .map(m => m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()).filter(Boolean);
  bullets.slice(0, 10).forEach(b => console.log('  - ' + b.slice(0, 220)));
} catch (e) { console.log('  error ' + e.message.slice(0, 60)); }

console.log('\n=== YAMAHA (fabricante) ===');
for (const u of ['https://usa.yamaha.com/products/audio_visual/monitors/hs_series/hs8.html',
                 'https://eu.yamaha.com/en_US/products/proaudio/hs8']) {
  try {
    const h = get(u);
    console.log('\n--- ' + u.slice(8, 45) + ' (' + h.length + 'b) ---');
    const specs = [...new Set([...h.matchAll(/[^<>]{0,70}(?:\d+\s*Hz[^<>]{0,30}|\d+\s*W\b[^<>]{0,25}|\d+\s*dB[^<>]{0,25}|8"?\s*(?:cone|woofer)[^<>]{0,30})/gi)]
      .map(m => m[0].replace(/\s+/g, ' ').trim()))].filter(s => /\d/.test(s));
    specs.slice(0, 18).forEach(s => console.log('    ' + s));
  } catch (e) { console.log('  ' + u.slice(8, 45) + ' -> error'); }
}
