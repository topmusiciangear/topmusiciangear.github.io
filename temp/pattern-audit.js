const fs = require('fs');
const src = fs.readFileSync('build-guides.js', 'utf8');
const prods = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));

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

// Pattern checks
function analyzeUrl(url, store) {
  if (!url) return { ok: true, issue: null };
  
  // Awin wrapped - extract real URL
  let real = url;
  if (url.includes('awin1.com/cread.php')) {
    const m = url.match(/ued=([^&]+)/);
    if (m) real = decodeURIComponent(m[1]);
  }
  
  // Check for generic/search patterns
  if (real.includes('/search?') || real.includes('/s?') || real.includes('keyword=') || real.includes('/catalogsearch'))
    return { ok: false, issue: 'SEARCH_URL', real };
    
  // Store-specific patterns
  if (store === 'zzounds' && !real.includes('/item--'))
    return { ok: false, issue: 'BAD_ZZOUNDS', real };
  if (store === 'musicstore' && !real.includes('art-') && !real.includes('prd-info'))
    return { ok: false, issue: 'BAD_MUSICSTORE', real };
  if (store === 'gear4music' && !real.includes('gear4music.com/') || (store === 'gear4music' && real.split('/').length < 5))
    return { ok: false, issue: 'BAD_G4M', real };
  if (store === 'andertons' && real.includes('/search'))
    return { ok: false, issue: 'BAD_ANDERTONS', real };
    
  return { ok: true, issue: null, real };
}

console.log('=== PATTERN AUDIT (no network) ===\n');

const productsToCheck = prods.filter(p => guideProductIds.has(p.id));
const issues = [];
const oosNaList = [];

productsToCheck.forEach(prod => {
  const btn = BTN[prod.id] || {};
  for (const store of stores) {
    let url = (btn.urls && btn.urls[store]) || (prod.stores && prod.stores[store]);
    const hasPrice = btn.prices && btn.prices[store];
    const isOos = btn.oos && btn.oos.includes(store);
    const isNa = btn.na && btn.na.includes(store);
    
    if (!url) {
      // No URL at all - will show as "Agotado"
      if (hasPrice && !isOos && !isNa) {
        // Has price but no URL - buttons will use synthesized search URL
      }
      continue;
    }
    
    const analysis = analyzeUrl(url, store);
    if (!analysis.ok) {
      issues.push({ id: prod.id, title: prod.title, store, issue: analysis.issue, hasPrice, isOos, isNa, url: (analysis.real || url).substring(0, 120) });
    }
    
    if (isOos || isNa) {
      oosNaList.push({ id: prod.id, title: prod.title, store, flag: isOos ? 'OOS' : 'NA', hasPrice, url: (analysis.real || url || '').substring(0, 120) });
    }
  }
});

// Products missing from TEST_SHOP_BTN entirely
const missingBtn = productsToCheck.filter(p => !BTN[p.id]);

console.log('=== URL PATTERN ISSUES ===');
issues.forEach(i => {
  const flags = [];
  if (i.hasPrice) flags.push('HAS_PRICE');
  if (i.isOos) flags.push('OOS');
  if (i.isNa) flags.push('NA');
  console.log(`  ${i.id} "${i.title}" [${i.store}] ${i.issue} ${flags.join(' ')} ${i.url}`);
});
console.log('Total issues:', issues.length);

console.log('\n=== PRODUCTS WITHOUT TEST_SHOP_BTN ENTRY ===');
missingBtn.forEach(p => {
  const storesWithUrl = Object.keys(p.stores || {}).filter(s => p.stores[s]);
  console.log(`  ${p.id} "${p.title}" stores: ${storesWithUrl.join(', ')}`);
});
console.log('Total missing:', missingBtn.length);

console.log('\n=== OOS/NA FLAGS ===');
oosNaList.forEach(p => console.log(`  ${p.id} "${p.title}" [${p.store}] ${p.flag} hasPrice=${p.hasPrice} ${p.url}`));
console.log('Total OOS/NA:', oosNaList.length);

// Products with prices but no URL (will use synthesized search)
console.log('\n=== PRODUCTS WITH PRICES BUT NO URL OVERRIDE ===');
productsToCheck.forEach(prod => {
  const btn = BTN[prod.id] || {};
  if (!btn.prices) return;
  stores.forEach(store => {
    if (!btn.prices[store]) return;
    const url = (btn.urls && btn.urls[store]) || (prod.stores && prod.stores[store]);
    if (!url) {
      console.log(`  ${prod.id} "${prod.title}" [${store}] price=${btn.prices[store]} NO_URL`);
    }
  });
});

fs.writeFileSync('temp/pattern-audit.json', JSON.stringify({ issues, missingBtn: missingBtn.map(p => p.id), oosNaList }, null, 2));
console.log('\nSaved to temp/pattern-audit.json');
