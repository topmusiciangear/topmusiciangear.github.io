const H = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
  'Accept-Language': 'en-US,en;q=0.9'
};
const esperar = ms => new Promise(r => setTimeout(r, ms));

async function dump(termino, n) {
  const url = 'https://www.amazon.com/s?k=' + encodeURIComponent(termino).replace(/%20/g, '+');
  const html = await (await fetch(url, { headers: H })).text();
  console.log('\n### ' + termino + '  (bytes ' + html.length + ')');
  const bloques = html.split('data-asin="').slice(1);
  const vistos = new Set();
  let c = 0;
  for (const b of bloques) {
    const asin = b.slice(0, 10);
    if (!/^B0[A-Z0-9]{8}$/.test(asin) || vistos.has(asin)) continue;
    vistos.add(asin);
    const t = ((b.slice(0, 7000).match(/a-text-normal[^>]*>\s*([\s\S]{0,160}?)</) || [])[1] || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    const p = (b.slice(0, 7000).match(/a-offscreen">\s*\$\s?([\d,]+\.?\d{0,2})/) || [])[1] || '';
    if (!t) continue;
    console.log('  ' + ('$' + p).padEnd(10) + asin + ' | ' + t.slice(0, 88));
    if (++c >= n) break;
  }
}

(async () => {
  for (const q of ['Mackie CR3.5BT', 'JBL 104-BT', 'Behringer Media 40USB']) {
    await dump(q, 6);
    await esperar(3000);
  }
})();
