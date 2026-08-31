const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

// 1. Extract TEST_SHOP_BTN from build-guides.js
const buildSrc = fs.readFileSync(path.join(root, 'build-guides.js'), 'utf8');
const btnMatch = buildSrc.match(/const TEST_SHOP_BTN = \{([\s\S]*?)\n\};/);
if (!btnMatch) { console.error('Could not find TEST_SHOP_BTN'); process.exit(1); }
// Parse it by wrapping in an object
const TEST_SHOP_BTN = new Function('return {' + btnMatch[1] + '}')();

// 2. Read products.json
const products = JSON.parse(fs.readFileSync(path.join(root, 'data', 'products.json'), 'utf8'));

// 3. Read guides.json and collect all product IDs referenced in sections.products
const guides = JSON.parse(fs.readFileSync(path.join(root, 'data', 'guides.json'), 'utf8'));
const guideProductIds = new Set();
const productGuideMap = {}; // id -> [guide titles]
for (const g of guides) {
  if (!g.sections) continue;
  for (const s of g.sections) {
    if (!s.products) continue;
    for (const pid of s.products) {
      guideProductIds.add(pid);
      if (!productGuideMap[pid]) productGuideMap[pid] = [];
      productGuideMap[pid].push(g.title);
    }
  }
}

// Build lookup
const productById = {};
for (const p of products) productById[p.id] = p;

// URL pattern checks
function checkUrlPatterns(store, url) {
  const issues = [];
  const decoded = url.includes('%3A') || url.includes('%2F') ? decodeURIComponent(url) : url;
  switch (store) {
    case 'gear4music':
      if (!decoded.match(/\/Recording-and-Computers\/|\/PA-DJ-and-Lighting\/|\/Guitar-and-Bass\/|\/Keyboards-and-Pianos\/|\/Pro-Audio\/|\/Studio-Monitors\/|\/G4M-/i) || !decoded.match(/[A-Z0-9]{3,}$/)) {
        if (!decoded.includes('gear4music.com/')) issues.push('not a gear4music product page');
      }
      break;
    case 'musicstore':
      if (!decoded.includes('/art-') && !decoded.includes('/prd-info/')) {
        issues.push('no /art- or /prd-info/ pattern');
      }
      break;
    case 'zzounds':
      if (!decoded.includes('/item--')) {
        issues.push('no /item-- pattern');
      }
      break;
    case 'andertons':
      if (decoded.includes('/search') || decoded.includes('/catalog') || decoded.includes('?q=')) {
        issues.push('looks like a search/catalog page');
      }
      break;
    case 'reverb':
      if (!decoded.includes('/product') && !decoded.includes('/marketplace') && !decoded.includes('query=')) {
        issues.push('unusual reverb URL');
      }
      break;
  }
  return issues;
}

// Generic/search URL patterns
function isGenericUrl(store, url) {
  const decoded = url.includes('%3A') || url.includes('%2F') ? decodeURIComponent(url) : url;
  if (decoded.includes('/search') || decoded.includes('?q=') || decoded.includes('/catalog')) return true;
  if (store === 'gear4music' && !decoded.match(/\/[A-Za-z0-9_-]+\/[A-Za-z0-9_-]+-[A-Za-z0-9_-]+\//)) return true;
  if (store === 'zzounds' && !decoded.includes('/item--')) return true;
  if (store === 'musicstore' && !decoded.includes('/art-') && !decoded.includes('/prd-info/')) return true;
  if (store === 'andertons' && decoded.includes('/search')) return true;
  return false;
}

// Synthesize search URL (what the code does when no store URL)
function synthesizedSearchUrl(store, productTitle) {
  switch (store) {
    case 'zzounds': return 'https://www.zzounds.com/search?query=' + encodeURIComponent(productTitle);
    case 'reverb': return 'https://reverb.com/marketplace?query=' + encodeURIComponent(productTitle);
    case 'gear4music': return 'https://www.gear4music.com/search?q=' + encodeURIComponent(productTitle);
    case 'andertons': return 'https://www.andertons.co.uk/search?q=' + encodeURIComponent(productTitle);
    case 'musicstore': return 'https://www.musicstore.com/en_OE/search?q=' + encodeURIComponent(productTitle);
    default: return null;
  }
}

// Stats
const results = {
  totalInGuides: guideProductIds.size,
  withBtn: 0,
  missingBtn: 0,
  missingBtnIds: [],
  withOos: 0,
  withNa: 0,
  oosNaIds: [],
  hasStoreUrlButNoBtn: 0,
  hasStoreUrlButNoBtnIds: [],
  genericUrls: 0,
  genericUrlIds: [],
  brokenPatternIssues: 0,
  brokenPatternIds: [],
  pricesButNoUrlOverride: 0,
  pricesButNoUrlOverrideIds: [],
  missingStoreUrls: 0,
  missingStoreUrlsIds: [],
  summary: {}
};

const allIssues = []; // detailed per-product issues

for (const pid of guideProductIds) {
  const product = productById[pid];
  if (!product) {
    allIssues.push({ id: pid, title: '(NOT in products.json)', issues: ['Product ID in guides but not in products.json'] });
    results.missingBtn++;
    results.missingBtnIds.push(pid);
    continue;
  }

  const btn = TEST_SHOP_BTN[pid];
  const stores = product.stores || {};
  const oos = product.oos || [];
  const oosFromBtn = btn ? (btn.oos || []) : [];
  const naFromBtn = btn ? (btn.na || []) : [];
  const prices = btn ? (btn.prices || {}) : {};
  const urls = btn ? (btn.urls || {}) : {};
  const productIssues = [];
  const storesWithUrls = Object.keys(stores).filter(k => stores[k]);

  // Check: has store URL in products.json but NO TEST_SHOP_BTN entry
  if (!btn && storesWithUrls.length > 0) {
    results.hasStoreUrlButNoBtn++;
    results.hasStoreUrlButNoBtnIds.push(pid);
    productIssues.push(`Has store URLs in products.json (${storesWithUrls.join(', ')}) but NO TEST_SHOP_BTN entry — buttons may show "Agotado"`);
  }

  if (btn) {
    results.withBtn++;

    // Check for generic/search URLs in TEST_SHOP_BTN.urls overrides
    for (const [store, url] of Object.entries(urls)) {
      if (isGenericUrl(store, url)) {
        results.genericUrls++;
        results.genericUrlIds.push(pid);
        productIssues.push(`TEST_SHOP_BTN.urls.${store} is a generic/search URL: ${url}`);
      }
      const patternIssues = checkUrlPatterns(store, url);
      if (patternIssues.length > 0) {
        results.brokenPatternIssues++;
        results.brokenPatternIds.push(pid);
        productIssues.push(`TEST_SHOP_BTN.urls.${store} pattern issues: ${patternIssues.join('; ')}`);
      }
    }

    // Check: oos/na flags
    if (oosFromBtn.length > 0 || oos.length > 0) {
      results.withOos++;
      results.oosNaIds.push(pid);
    }
    if (naFromBtn.length > 0) {
      results.withNa++;
      results.oosNaIds.push(pid);
    }

    // Check: has prices but store URL is synthesized (no override in urls)
    const mainStores = ['zzounds', 'reverb', 'gear4music', 'andertons', 'musicstore'];
    for (const s of mainStores) {
      if (prices[s] && prices[s] !== 'na' && prices[s] !== 'OOS') {
        if (!urls[s] && s !== 'reverb') {
          // No URL override — using stores from products.json
          const storeUrl = stores[s];
          if (!storeUrl) {
            // No store URL at all — will use synthesized search URL
            results.pricesButNoUrlOverride++;
            results.pricesButNoUrlOverrideIds.push(pid);
            productIssues.push(`Has price for ${s} (${prices[s]}) but no URL override and no store URL in products.json — will use synthesized search URL`);
          }
        }
      }
    }

    // Check store URLs from products.json for broken patterns (for stores NOT in TEST_SHOP_BTN.urls)
    for (const s of mainStores) {
      if (!urls[s] && stores[s]) {
        const patternIssues = checkUrlPatterns(s, stores[s]);
        if (patternIssues.length > 0) {
          results.brokenPatternIssues++;
          results.brokenPatternIds.push(pid);
          productIssues.push(`products.json stores.${s} pattern issues: ${patternIssues.join('; ')}`);
        }
        if (isGenericUrl(s, stores[s])) {
          results.genericUrls++;
          results.genericUrlIds.push(pid);
          productIssues.push(`products.json stores.${s} is a generic/search URL`);
        }
      }
    }
  } else {
    results.missingBtn++;
    results.missingBtnIds.push(pid);
  }

  // Check for products with no store URLs at all
  if (storesWithUrls.length === 0) {
    results.missingStoreUrls++;
    results.missingStoreUrlsIds.push(pid);
    if (productIssues.length === 0) {
      productIssues.push('No store URLs in products.json at all');
    }
  }

  if (productIssues.length > 0) {
    allIssues.push({ id: pid, title: product.title, issues: productIssues });
  }
}

// Deduplicate oosNaIds
results.oosNaIds = [...new Set(results.oosNaIds)];
results.genericUrlIds = [...new Set(results.genericUrlIds)];
results.brokenPatternIds = [...new Set(results.brokenPatternIds)];
results.pricesButNoUrlOverrideIds = [...new Set(results.pricesButNoUrlOverrideIds)];
results.hasStoreUrlButNoBtnIds = [...new Set(results.hasStoreUrlButNoBtnIds)];
results.missingBtnIds = [...new Set(results.missingBtnIds)];

// Output
console.log('═══════════════════════════════════════════════════════════');
console.log('  AUDIT: ALL BUY BUTTONS (TEST_SHOP_BTN vs products.json)');
console.log('═══════════════════════════════════════════════════════════\n');

console.log(`Total product IDs in guides:          ${results.totalInGuides}`);
console.log(`Products WITH TEST_SHOP_BTN entry:    ${results.withBtn}`);
console.log(`Products MISSING TEST_SHOP_BTN entry: ${results.missingBtn}`);
console.log(`Products with oos/na flags:           ${results.withOos} (oos) + ${results.withNa} (na)`);
console.log(`Products with store URL but no btn:   ${results.hasStoreUrlButNoBtn}`);
console.log(`Products with generic/search URLs:    ${results.genericUrls}`);
console.log(`Products with broken URL patterns:    ${results.brokenPatternIssues}`);
console.log(`Products with price but synth URL:    ${results.pricesButNoUrlOverride}`);
console.log(`Products with NO store URLs at all:   ${results.missingStoreUrls}`);
console.log(`Total products with issues:           ${allIssues.length}\n`);

if (allIssues.length > 0) {
  console.log('───────────────────────────────────────────────────────────');
  console.log('  DETAILED ISSUES');
  console.log('───────────────────────────────────────────────────────────\n');

  for (const issue of allIssues) {
    console.log(`  [ID ${issue.id}] ${issue.title}`);
    for (const i of issue.issues) {
      console.log(`    - ${i}`);
    }
    console.log('');
  }
}

// Missing btn IDs
if (results.missingBtnIds.length > 0) {
  console.log('───────────────────────────────────────────────────────────');
  console.log('  PRODUCTS MISSING TEST_SHOP_BTN (will show "Agotado")');
  console.log('───────────────────────────────────────────────────────────');
  console.log('  IDs:', results.missingBtnIds.join(', '));
  console.log('');
}

// OOS/NA details
if (results.oosNaIds.length > 0) {
  console.log('───────────────────────────────────────────────────────────');
  console.log('  PRODUCTS WITH OOS/NA FLAGS');
  console.log('───────────────────────────────────────────────────────────');
  for (const pid of results.oosNaIds) {
    const p = productById[pid];
    const btn = TEST_SHOP_BTN[pid] || {};
    const oosStores = (btn.oos || []).join(', ');
    const naStores = (btn.na || []).join(', ');
    const jsonOos = p ? (p.oos || []).join(', ') : '';
    let line = `  [${pid}] ${p ? p.title : '?'}`;
    if (oosStores) line += ` | btn.oos: ${oosStores}`;
    if (naStores) line += ` | btn.na: ${naStores}`;
    if (jsonOos) line += ` | json.oos: ${jsonOos}`;
    console.log(line);
  }
  console.log('');
}

// Generic URLs
if (results.genericUrlIds.length > 0) {
  console.log('───────────────────────────────────────────────────────────');
  console.log('  PRODUCTS WITH GENERIC/SEARCH URLs');
  console.log('───────────────────────────────────────────────────────────');
  for (const pid of results.genericUrlIds) {
    const p = productById[pid];
    const btn = TEST_SHOP_BTN[pid] || {};
    const urls = btn.urls || {};
    const mainStores = ['zzounds', 'reverb', 'gear4music', 'andertons', 'musicstore'];
    const generics = [];
    for (const s of mainStores) {
      if (urls[s] && isGenericUrl(s, urls[s])) generics.push(`${s}: ${urls[s]}`);
      else if (!urls[s] && p && p.stores && p.stores[s] && isGenericUrl(s, p.stores[s])) generics.push(`${s}(json): ${p.stores[s]}`);
    }
    console.log(`  [${pid}] ${p ? p.title : '?'} — ${generics.join(' | ')}`);
  }
  console.log('');
}

// Prices with no URL override
if (results.pricesButNoUrlOverrideIds.length > 0) {
  console.log('───────────────────────────────────────────────────────────');
  console.log('  PRODUCTS WITH PRICE BUT SYNTHESIZED SEARCH URL');
  console.log('───────────────────────────────────────────────────────────');
  for (const pid of results.pricesButNoUrlOverrideIds) {
    const p = productById[pid];
    const btn = TEST_SHOP_BTN[pid] || {};
    const prices = btn.prices || {};
    const urls = btn.urls || {};
    const mainStores = ['zzounds', 'reverb', 'gear4music', 'andertons', 'musicstore'];
    const synthed = mainStores.filter(s => prices[s] && !urls[s] && s !== 'reverb' && (!p.stores || !p.stores[s]));
    console.log(`  [${pid}] ${p ? p.title : '?'} — synthesized for: ${synthed.join(', ')}`);
  }
  console.log('');
}

console.log('═══════════════════════════════════════════════════════════');
console.log('  AUDIT COMPLETE');
console.log('═══════════════════════════════════════════════════════════');
