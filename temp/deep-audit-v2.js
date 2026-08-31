const fs = require('fs');
const https = require('https');

const src = fs.readFileSync('build-guides.js', 'utf8');
const prods = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));

// Extract TEST_SHOP_BTN with balanced braces
const btnStart = src.indexOf('const TEST_SHOP_BTN = {');
let depth = 0, btnEnd = -1;
for (let i = src.indexOf('{', btnStart); i < src.length; i++) {
  if (src[i] === '{') depth++;
  if (src[i] === '}') depth--;
  if (depth === 0) { btnEnd = i + 1; break; }
}
const evalStr = src.substring(btnStart, btnEnd).replace('const TEST_SHOP_BTN', 'window.X');
window = {};
eval(evalStr);
const BTN = window.X;

const guideProductIds = new Set();
guides.forEach(g => (g.sections || []).forEach(s => (s.products || []).forEach(id => guideProductIds.add(id))));

const stores = ['zzounds', 'reverb', 'gear4music', 'andertons', 'musicstore'];
const issues = [];

function checkUrl(url, timeout = 6000) {
  return new Promise(resolve => {
    const req = https.get(url, {
      timeout, method: 'HEAD',
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0' }
    }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        resolve({ status: res.statusCode, redir: res.headers.location.substring(0, 150) });
      } else {
        resolve({ status: res.statusCode });
      }
    });
    req.on('error', e => resolve({ status: 'ERR', msg: e.message.substring(0, 60) }));
    req.on('timeout', () => { req.destroy(); resolve({ status: 'TIMEOUT' }); });
  });
}

function isGenericUrl(url, store) {
  if (!url) return false;
  if (url.includes('/search?') || url.includes('/s?') || url.includes('keyword=')) return true;
  if (store === 'musicstore' && !url.includes('art-') && !url.includes('prd-info')) return true;
  return false;
}

async function main() {
  const productsToCheck = prods.filter(p => guideProductIds.has(p.id));
  let count = 0;
  const results = [];

  for (const prod of productsToCheck) {
    const btn = BTN[prod.id] || {};
    for (const store of stores) {
      let url = (btn.urls && btn.urls[store]) || (prod.stores && prod.stores[store]);
      if (!url || !url.startsWith('http')) continue;
      
      // Unwrap Awin tracking URLs to get the real destination
      let realUrl = url;
      if (url.includes('awin1.com/cread.php')) {
        const ued = url.match(/ued=([^&]+)/);
        if (ued) realUrl = decodeURIComponent(ued[1]);
      }

      count++;
      const r = await checkUrl(realUrl);
      const hasPrice = btn.prices && btn.prices[store];
      const isOos = btn.oos && btn.oos.includes(store);
      const isNa = btn.na && btn.na.includes(store);
      const generic = isGenericUrl(realUrl, store);

      let issue = null;
      if (r.status === 404) issue = '404';
      else if (r.status === 'ERR' || r.status === 'TIMEOUT') issue = r.status;
      else if (r.status >= 400 && r.status !== 403) issue = 'HTTP_' + r.status;
      else if (generic) issue = 'GENERIC';
      else if (isOos && r.status === 200) issue = 'OOS_WRONG';
      else if (isNa && r.status === 200) issue = 'NA_WRONG';

      if (issue || r.status === 403) {
        results.push({
          id: prod.id, title: prod.title, store,
          status: r.status, issue: issue || 'BLOCKED_403',
          hasPrice, isOos, isNa,
          url: realUrl.substring(0, 150)
        });
      }
    }
    if (count % 50 === 0) process.stdout.write('\r  ' + count + ' URLs...');
  }
  
  console.log('\r  ' + count + ' URLs checked.           ');
  
  // Group by issue type
  const grouped = {};
  results.forEach(r => {
    if (!grouped[r.issue]) grouped[r.issue] = [];
    grouped[r.issue].push(r);
  });
  
  for (const [issue, items] of Object.entries(grouped).sort((a, b) => b[1].length - a[1].length)) {
    console.log('\n=== ' + issue + ' (' + items.length + ') ===');
    items.forEach(i => {
      const flags = [];
      if (i.hasPrice) flags.push('HAS_PRICE');
      if (i.isOos) flags.push('OOS');
      if (i.isNa) flags.push('NA');
      console.log(`  ${i.id} "${i.title}" [${i.store}] status=${i.status} ${flags.join(' ')} ${i.url}`);
    });
  }
  
  // Also list products with OOS/NA flags for web verification
  console.log('\n=== PRODUCTS FLAGGED OOS/NA (verify on web) ===');
  const oosNaProducts = [];
  productsToCheck.forEach(prod => {
    const btn = BTN[prod.id] || {};
    if (btn.oos) btn.oos.forEach(s => oosNaProducts.push({ id: prod.id, title: prod.title, store: s, flag: 'OOS' }));
    if (btn.na) btn.na.forEach(s => oosNaProducts.push({ id: prod.id, title: prod.title, store: s, flag: 'NA' }));
  });
  oosNaProducts.forEach(p => console.log(`  ${p.id} "${p.title}" [${p.store}] ${p.flag}`));
  console.log('Total OOS/NA flags:', oosNaProducts.length);
  
  fs.writeFileSync('temp/deep-audit-results.json', JSON.stringify({ results, oosNaProducts, count }, null, 2));
  console.log('\nSaved to temp/deep-audit-results.json');
}

main().catch(console.error);
