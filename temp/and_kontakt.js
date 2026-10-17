const u = 'https://www.andertons.co.uk/kontakt-8-bundle--esd/';
fetch(u, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126.0.0.0 Safari/537.36', 'Accept-Language': 'en-GB,en;q=0.9' } })
  .then(async r => {
    const t = await r.text();
    const title = (t.match(/<title>([^<]{0,160})/) || [])[1];
    const og = (t.match(/property="og:title" content="([^"]+)/) || [])[1];
    const prices = [...new Set([...t.matchAll(/£\s?\d{1,4}(?:,\d{3})*(?:\.\d{2})?/g)].map(m => m[0]))].slice(0, 6);
    const jsonld = (t.match(/"name"\s*:\s*"([^"]{0,80})"/g) || []).slice(0, 4);
    console.log('status: ' + r.status);
    console.log('title: ' + title);
    console.log('og:title: ' + og);
    console.log('precios: ' + prices.join(' | '));
    console.log('nombres: ' + jsonld.join(' | '));
    const bundleHits = (t.match(/bundle/gi) || []).length;
    console.log('menciones de "bundle": ' + bundleHits);
  })
  .catch(e => console.log('ERROR ' + e.message));