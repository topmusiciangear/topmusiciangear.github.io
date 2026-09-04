const fs = require('fs');

const urls = {
  103: 'https://www.gear4music.com/Guitar-and-Bass/Yamaha-Pacifica-112-V-Black/842',
  310: 'https://www.gear4music.com/Guitar-and-Bass/Squier-Affinity-Stratocaster-MN-Black/3SZM',
  462: 'https://www.gear4music.com/Guitar-and-Bass/Squier-Sonic-Stratocaster-HT-Arctic-White/5E35',
  463: 'https://www.gear4music.com/Guitar-and-Bass/Ibanez-GRG121DX-GIO-Black-Flat/295D',
  313: 'https://www.gear4music.com/Guitar-and-Bass/Squier-Sonic-Mustang-MN-2-Color-Sunburst/5E3I',
  464: 'https://www.gear4music.com/Guitar-and-Bass/Yamaha-Revstar-Element-RSE20-Vintage-White/4PBT',
};

const headers = {
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36',
  'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'accept-language': 'en-GB,en;q=0.9',
  'upgrade-insecure-requests': '1',
};

const RE_PRICE = /(\u00a3|\u20ac|\$)\s?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?|\d+\.\d{2}|\d+)/g;

async function fetchOne(id, url) {
  try {
    const r = await fetch(url, { headers });
    const t = await r.text();
    const out = { id, status: r.status, url, len: t.length, prices: [], hints: [] };

    const ms = t.match(/"price"\s*:\s*"[^"]*"/g) || [];
    const ml = t.match(/"NETPRICE"\s*:\s*"[^"]*"/gi) || [];
    const mn = t.match(/"netPrice"\s*:\s*"[^"]*"/gi) || [];
    const mo = t.match(/"offerPrice"\s*:\s*"[^"]*"/gi) || [];
    const mj = [...new Set([...ms, ...ml, ...mn, ...mo])].slice(0, 12);
    out.jsonPrices = mj;

    const visible = t.match(/<span[^>]*class="[^"]*price[^"]*"[^>]*>([\s\S]{0,120}?)<\/span>/gi) || [];
    out.visiblePriceSpans = [...new Set(visible)].slice(0, 8);

    const all = t.match(RE_PRICE) || [];
    out.allPrices = [...new Set(all)].slice(0, 40);

    if (r.status === 200) {
      fs.writeFileSync('temp/_g4m_' + id + '.html', t);
      out.savedHtml = 'temp/_g4m_' + id + '.html';
    }
    return out;
  } catch (e) {
    return { id, error: e.message, url };
  }
}

(async () => {
  const results = [];
  for (const id of Object.keys(urls)) {
    const res = await fetchOne(id, urls[id]);
    results.push(res);
    console.log(JSON.stringify(res, null, 1));
    console.log('---');
  }
  fs.writeFileSync('temp/_g4m_prices_out.json', JSON.stringify(results, null, 2));
})();