const u = process.argv[2] || 'https://www.andertons.co.uk/shure-sm7b-dynamic-vocal-mic';
const t0 = Date.now();
fetch(u, { headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } })
  .then(async r => {
    const txt = await r.text();
    console.log('STATUS', r.status, r.url, 'len', txt.length);
    console.log('hasProductLd', txt.includes('"@type":"Product"') || txt.includes('"@type": "Product"'));
    console.log('hasOffers', txt.includes('"offers"') || txt.includes('offers'));
    const m = txt.match(/offers[^<]{0,200}?"price":\s*"?([0-9.]+)/);
    console.log('price', m && m[1]);
    console.log('titleTag', (txt.match(/<title>([^<]*)<\/title>/) || [])[1] || '');
    console.log('ms', Date.now() - t0);
  })
  .catch(e => { console.log('ERR', e.message, 'ms', Date.now() - t0); });