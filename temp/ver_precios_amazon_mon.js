const { execFileSync } = require('child_process');
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const p = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';

function get(u) {
  return execFileSync('curl.exe', ['-s', '-L', '--max-time', '60', '-A', UA,
    '-H', 'Accept-Language: en-GB,en;q=0.9', '--compressed', u],
    { windowsHide: true, maxBuffer: 1 << 27 }).toString();
}

[684, 633, 20, 19].forEach(id => {
  const x = p.find(y => y.id === id);
  const url = (x.stores || {}).amazon;
  console.log('\n================  id ' + id + '  ' + x.title + '  ================');
  if (!url) { console.log('  sin URL de Amazon'); return; }
  console.log('  ' + url);
  try {
    const h = get(url);
    const titulo = ((h.match(/<span[^>]+id="productTitle"[^>]*>([\s\S]*?)<\/span>/) || [])[1] || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    const precio = (h.match(/<span[^>]+class="a-price[^"]*"[^>]*>[\s\S]{0,400}?<span[^>]+class="a-offscreen">([^<]+)<\/span>/) || [])[1];
    console.log('  titulo  : ' + titulo.slice(0, 120));
    console.log('  precio  : ' + (precio || '(n/d)'));

    // ¿que viene en la caja? -> unidad o par
    const bullets = [...h.matchAll(/<span[^>]+class="a-list-item"[^>]*>([\s\S]{0,300}?)<\/span>/g)]
      .map(m => m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()).filter(Boolean);
    const caja = bullets.filter(b => /^(?:1|2|two|one|includes|package|what'?s|this product|number of|item|quantity|speaker|monitor)/i.test(b) ||
      /\b(?:1|2)\s+(?:x\s+)?(?:monitor|speaker|woofer|piece|unit|pair)\b/i.test(b) ||
      /\bpair\b/i.test(b)).slice(0, 6);
    console.log('  "que incluye":');
    if (caja.length) caja.forEach(b => console.log('      - ' + b.slice(0, 130)));
    else bullets.slice(0, 5).forEach(b => console.log('      - ' + b.slice(0, 130)));

    // cantidad / variaciones
    const varPat = [...new Set([...h.matchAll(/\b(?:(One|Two|1|2)\s+)?(?:Monitor|Monitors|Speaker|Speakers)\b/gi)].map(m => m[0].trim()))].slice(0, 6);
    console.log('  menciones monitor(es): ' + varPat.join(' | '));
  } catch (e) { console.log('  ERROR: ' + e.message.slice(0, 80)); }
});
