const https = require('https');
const { URL } = require('url');
const agent = new https.Agent({ keepAlive: true });
let cookies = {};

function req(url, redirectsLeft = 6) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const headers = {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36',
      accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'accept-language': 'en-US,en;q=0.9'
    };
    if (Object.keys(cookies).length) headers.cookie = Object.entries(cookies).map(([k, v]) => k + '=' + v).join('; ');
    const handle = res => {
      const setc = res.headers['set-cookie'] || [];
      for (const c of setc) { const [pair] = c.split(';'); const eq = pair.indexOf('='); if (eq > 0) cookies[pair.slice(0, eq)] = pair.slice(eq + 1); }
      if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location && redirectsLeft > 0) {
        res.resume(); const next = new URL(res.headers.location, url).toString();
        req(next, redirectsLeft - 1).then(resolve).catch(reject); return;
      }
      const chunks = []; res.on('data', d => chunks.push(d));
      res.on('end', () => resolve({ status: res.statusCode, finalUrl: res.url || url, body: Buffer.concat(chunks).toString('utf8') }));
    };
    https.get({ hostname: u.hostname, path: u.pathname + u.search, headers, agent }, handle).on('error', reject);
  });
}

(async () => {
  await req('https://www.pluginboutique.com/?chosen_country=US');
  const p = await req('https://www.pluginboutique.com/product/2-Effects/11-Chorus/7702-Chorus-JUN-6');
  const b = p.body;
  console.log('HTTP', p.status, p.finalUrl, '| bytes', b.length);
  const usd = b.match(/\$[0-9][0-9.,]*/g);
  const eur = b.match(/€[0-9][0-9.,]*/g);
  const gbp = b.match(/£[0-9][0-9.,]*/g);
  if (usd) console.log('USD:', [...new Set(usd)].join(' | '));
  if (eur) console.log('EUR:', [...new Set(eur)].join(' | '));
  if (gbp) console.log('GBP:', [...new Set(gbp)].join(' | '));
  const m = b.match(/data-layer[^\n]{0,600}|view_item[^\n]{0,600}/i);
  if (m) console.log('data-layer:', m[0].slice(0, 500).replace(/\s+/g, ' '));
  const mm = b.match(/price-min-value[^\n]{0,200}|product-price[^\n]{0,200}|class="price"[^\n]{0,200}/i);
  if (mm) console.log('price el:', mm[0].slice(0, 200).replace(/\s+/g, ' '));
})().catch(e => { console.error('ERR', e.message); process.exit(1); });