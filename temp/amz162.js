const https = require('https');
const url = 'https://www.amazon.com/dp/B0CT44NB9F?language=en_US';
const opts = { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36', 'Accept-Language': 'en-US,en;q=0.9' } };
https.get(url, opts, res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    const t = d;
    console.log('status', res.statusCode, 'len', t.length);
    const title = (t.match(/<span[^>]*id="productTitle"[^>]*>([\s\S]{0,300}?)<\/span>/) || [])[1];
    console.log('TITULO:', title ? title.replace(/\s+/g, ' ').trim() : '(no)');
    const pats = [
      /a-offscreen">\s*\$\s?([\d,]+(?:\.\d{2})?)/g,
      /"priceAmount"\s*:\s*([\d.]+)/g,
      /priceToPay[^"]*"displayValue"\s*:\s*"\$([\d.,]+)/g,
      /<span class="a-price"[^>]*>[\s\S]{0,200}?([\d,]+(?:\.\d{2})?)<\/span>/g
    ];
    for (const p of pats) { const m = [...t.matchAll(p)].slice(0, 5).map(x => x[1]); if (m.length) console.log('precio patron', p.source.slice(0, 26), '->', m.join(' | ')); }
    const r = (t.match(/([\d.]+) out of 5 stars/) || [])[1];
    const rc = (t.match(/([\d,]+)\s*(?:global\s*)?(?:ratings|reviews)/) || [])[1];
    const ab = (t.match(/aria-label="([\d,]+) global ratings?"/) || [])[1];
    console.log('rating:', r, '| reviews:', rc, '| aria global ratings:', ab);
    const avail = (t.match(/id="availability"[\s\S]{0,300}?>([\s\S]{0,120}?)</) || [])[1];
    console.log('availability:', avail ? avail.replace(/\s+/g, ' ').trim() : '(no)');
  });
}).on('error', e => console.log('ERROR', e.message));
