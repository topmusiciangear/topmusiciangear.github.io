// FINAL PB data collection: corrected URLs -> EUR price (live, EU session) + USD (stored) + derived GBP.
const fs = require('fs');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
const AID = '6a01e859cbe1a';
const GBP_PER_USD = 0.7959; // PB's own published pair: "£19.50 / $24.50" on their homepage
const FIXED_URLS = {
  374: 'https://www.pluginboutique.com/product/2-Effects/53-Multi-Effect-/9819-ShaperBox-3-Bundle',
  375: 'https://www.pluginboutique.com/product/2-Effects/44-Saturation/3016-RC-20-Retro-Color',
  376: 'https://www.pluginboutique.com/product/2-Effects/53-Multi-Effect-/3952-HalfTime',
  377: 'https://www.pluginboutique.com/product/2-Effects/53-Multi-Effect-/13431-Transit-2',
  382: 'https://www.pluginboutique.com/product/3-Studio-Tools/93-Music-Theory-Tools/14563-Scaler-3',
  384: 'https://www.pluginboutique.com/product/2-Effects/9-Limiter/8476-smart-limit',
  386: 'https://www.pluginboutique.com/product/2-Effects/30-Distortion/11987-Trash',
  387: 'https://www.pluginboutique.com/product/2-Effects/53-Multi-Effect-/8036-Lifeline-Expanse',
};
const decode = (s) => s.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&#39;/g, "'");
const src = fs.readFileSync('build-guides.js', 'utf8');
const bs = src.indexOf('const TEST_SHOP_BTN = {');
const be = src.indexOf('\n};', bs);
const MAP = eval('(' + src.slice(bs + 'const TEST_SHOP_BTN ='.length, be + 2) + ')');
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const byId = {};
(Array.isArray(products) ? products : products.products || []).forEach(p => { byId[p.id] = p; });

function layerPrice(html, pbId) {
  for (const m of html.matchAll(/data-(?:event|layer)="([^"]*)"/g)) {
    const raw = decode(m[1]);
    if (!raw.includes('"price"')) continue;
    let j; try { j = JSON.parse(raw); } catch { continue; }
    for (const it of ((j.ecommerce && j.ecommerce.items) || j.items || [])) {
      if (String(it.item_id) === String(pbId) && it.currency === 'EUR') return { price: it.price, name: it.item_name, discount: it.discount };
    }
  }
  const i = html.indexOf('data-product-purchase-options-target="otpPrice"');
  if (i >= 0) {
    const m = html.slice(i, i + 1200).match(/text-gray-800 text-xl font-semibold leading-6">\s*([€£$][^<]{1,20})</);
    if (m) { const n = parseFloat(m[1].replace(/[^0-9.]/g, '')); return { price: n, name: null, discount: null }; }
  }
  return null;
}
const pbId = (u) => { const m = [...u.matchAll(/\/(\d+)-[A-Za-z0-9]/g)]; return m.length ? m[m.length - 1][1] : ''; };

(async () => {
  const ids = Object.keys(MAP).filter(id => MAP[id].prices && MAP[id].prices.pluginboutique).map(Number).sort((a, b) => a - b);
  const out = {};
  for (const id of ids) {
    const raw = FIXED_URLS[id] || (MAP[id].urls && MAP[id].urls.pluginboutique) || (byId[id].stores && (byId[id].stores.pluginboutique || byId[id].stores.pluginboutique_us));
    const url = raw.includes('a_aid=') ? raw : raw + (raw.includes('?') ? '&' : '?') + 'a_aid=' + AID;
    let got = null, st = 0;
    for (let a = 0; a < 3 && !got; a++) {
      try {
        const r = await fetch(url, { headers: { 'User-Agent': UA, 'Accept-Language': 'en-GB,en;q=0.9' }, redirect: 'follow' });
        st = r.status; const h = await r.text();
        if (r.url.includes('pluginboutique.com/product') || r.url.includes('pluginboutique.com/products')) got = layerPrice(h, pbId(url));
      } catch (e) { st = e.message; }
      if (!got) await new Promise(z => setTimeout(z, 2000));
    }
    const us = parseFloat(String(MAP[id].prices.pluginboutique).replace(/[^0-9.]/g, ''));
    out[id] = {
      title: byId[id] ? byId[id].title : '',
      url,
      usd: MAP[id].prices.pluginboutique,
      eur: got ? got.price : null,
      sale: got && got.discount ? got.discount : 0,
      pbName: got ? got.name : null,
    };
    const ratio = got && us ? (got.price / us) : null;
    console.log(String(id).padEnd(4), (byId[id] ? byId[id].title : '').slice(0, 30).padEnd(31), 'us=' + String(us).padEnd(8), 'eu=' + String(got ? got.price : 'MISS').padEnd(9), 'ratio=' + (ratio ? ratio.toFixed(3) : '-').padEnd(6), got && got.discount ? 'SALE(' + got.discount + ')' : '');
    await new Promise(z => setTimeout(z, 800));
  }
  fs.writeFileSync('temp/pb_final.json', JSON.stringify(out, null, 2));
  const ratios = Object.entries(out).filter(([, v]) => v.eur && v.usd && !v.sale).map(([k, v]) => v.eur / parseFloat(v.usd.replace(/[^0-9.]/g, ''))).sort((a, b) => a - b);
  console.log('\nnon-sale eu/us ratios:', ratios.map(r => r.toFixed(3)).join(' '));
  console.log('median ratio:', ratios.length ? ratios[Math.floor(ratios.length / 2)].toFixed(4) : 'n/a', '| n =', ratios.length);
  const miss = Object.entries(out).filter(([, v]) => !v.eur).map(([k]) => k);
  console.log('missing EUR:', miss.join(', ') || 'none');
})();
