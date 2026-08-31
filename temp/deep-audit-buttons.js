const fs = require('fs');
const https = require('https');
const http = require('http');

const src = fs.readFileSync('build-guides.js', 'utf8');
const prods = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));

// Extract TEST_SHOP_BTN
const btnStart = src.indexOf('const TEST_SHOP_BTN = {');
const btnEnd = src.indexOf('\n};', btnStart);
const evalStr = src.substring(btnStart, btnEnd + 2).replace('const TEST_SHOP_BTN', 'window.TEST_SHOP_BTN');
window = {};
eval(evalStr);
const SHOP_BTN = window.TEST_SHOP_BTN;

// Get all product IDs that appear in guides
const guideProductIds = new Set();
guides.forEach(g => {
  (g.sections || []).forEach(s => {
    (s.products || []).forEach(id => guideProductIds.add(id));
  });
});

const stores = ['zzounds', 'reverb', 'gear4music', 'andertons', 'musicstore', 'amazon'];
const issues = [];
const checked = [];

function fetchUrl(url, timeout = 10000) {
  return new Promise((resolve) => {
    const proto = url.startsWith('https') ? https : http;
    const req = proto.get(url, { 
      timeout, 
      headers: { 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-US,en;q=0.9'
      },
      method: 'HEAD'
    }, (res) => {
      // Follow redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        resolve({ status: res.statusCode, redirect: res.headers.location });
      } else {
        resolve({ status: res.statusCode, finalUrl: res.url || url });
      }
    });
    req.on('error', (e) => resolve({ status: 'ERROR', error: e.message }));
    req.on('timeout', () => { req.destroy(); resolve({ status: 'TIMEOUT' }); });
  });
}

async function checkStoreUrl(prod, store) {
  // Get URL: TEST_SHOP_BTN.urls override, or products.json stores
  let url = null;
  const btn = SHOP_BTN[prod.id];
  if (btn && btn.urls && btn.urls[store]) {
    url = btn.urls[store];
  } else if (prod.stores && prod.stores[store]) {
    url = prod.stores[store];
  }
  
  if (!url) return null;
  
  // Skip non-http URLs
  if (!url.startsWith('http')) return null;
  
  // Check for known generic/search patterns
  const isGeneric = (
    url.includes('/search?') ||
    url.includes('/s?') ||
    url.includes('keyword=') ||
    url.includes('/catalogsearch') ||
    (url.includes('musicstore.com') && !url.includes('art-') && !url.includes('prd-info'))
  );
  
  const result = await fetchUrl(url);
  
  return {
    id: prod.id,
    title: prod.title,
    store,
    url: url.substring(0, 120),
    status: result.status,
    redirect: result.redirect ? result.redirect.substring(0, 120) : null,
    isGeneric,
    hasPrice: btn && btn.prices && btn.prices[store],
    isOos: btn && btn.oos && btn.oos.includes(store),
    isNa: btn && btn.na && btn.na.includes(store)
  };
}

async function main() {
  console.log('=== DEEP AUDIT: Checking every URL of every store for every product ===');
  console.log('Products in guides:', guideProductIds.size);
  console.log('Products in catalog:', prods.length);
  console.log('TEST_SHOP_BTN entries:', Object.keys(SHOP_BTN).length);
  console.log('');
  
  // Check all products that appear in guides
  const productsToCheck = prods.filter(p => guideProductIds.has(p.id));
  let checkedCount = 0;
  
  for (const prod of productsToCheck) {
    for (const store of stores) {
      const result = await checkStoreUrl(prod, store);
      if (result) {
        checkedCount++;
        checked.push(result);
        
        // Flag issues
        if (result.status === 'ERROR' || result.status === 'TIMEOUT') {
          issues.push({ ...result, issue: 'BROKEN_URL' });
        } else if (result.status === 403) {
          issues.push({ ...result, issue: 'BLOCKED_403' });
        } else if (result.status === 404) {
          issues.push({ ...result, issue: 'NOT_FOUND_404' });
        } else if (result.status >= 400) {
          issues.push({ ...result, issue: 'HTTP_ERROR_' + result.status });
        } else if (result.isGeneric) {
          issues.push({ ...result, issue: 'GENERIC_URL' });
        } else if (result.isOos && result.status === 200) {
          issues.push({ ...result, issue: 'OOS_BUT_AVAILABLE' });
        } else if (result.isNa && result.status === 200) {
          issues.push({ ...result, issue: 'NA_BUT_EXISTS' });
        }
      }
    }
    if (checkedCount % 20 === 0) {
      process.stdout.write('\r  Checked ' + checkedCount + ' URLs...');
    }
  }
  
  console.log('\r  Checked ' + checkedCount + ' URLs total.          ');
  console.log('');
  
  // Summary
  const broken = issues.filter(i => i.issue === 'BROKEN_URL');
  const blocked = issues.filter(i => i.issue === 'BLOCKED_403');
  const notFound = issues.filter(i => i.issue === 'NOT_FOUND_404');
  const httpErrors = issues.filter(i => i.issue.startsWith('HTTP_ERROR'));
  const generic = issues.filter(i => i.issue === 'GENERIC_URL');
  const oosButAvail = issues.filter(i => i.issue === 'OOS_BUT_AVAILABLE');
  const naButExists = issues.filter(i => i.issue === 'NA_BUT_EXISTS');
  
  console.log('=== SUMMARY ===');
  console.log('Total URLs checked:', checkedCount);
  console.log('Issues found:', issues.length);
  console.log('');
  console.log('Broken URLs (ERROR/TIMEOUT):', broken.length);
  console.log('Blocked (403):', blocked.length);
  console.log('Not Found (404):', notFound.length);
  console.log('HTTP Errors (4xx/5xx):', httpErrors.length);
  console.log('Generic/Search URLs:', generic.length);
  console.log('OOS but actually available:', oosButAvail.length);
  console.log('NA but actually exists:', naButExists.length);
  
  if (broken.length) {
    console.log('\n=== BROKEN URLs ===');
    broken.forEach(i => console.log(`  ID ${i.id} ${i.title} [${i.store}]: ${i.status} - ${i.url}`));
  }
  if (notFound.length) {
    console.log('\n=== 404 NOT FOUND ===');
    notFound.forEach(i => console.log(`  ID ${i.id} ${i.title} [${i.store}]: ${i.url}`));
  }
  if (httpErrors.length) {
    console.log('\n=== HTTP ERRORS ===');
    httpErrors.forEach(i => console.log(`  ID ${i.id} ${i.title} [${i.store}]: ${i.status} - ${i.url}`));
  }
  if (oosButAvail.length) {
    console.log('\n=== OOS BUT ACTUALLY AVAILABLE (fix!) ===');
    oosButAvail.forEach(i => console.log(`  ID ${i.id} ${i.title} [${i.store}]: status ${i.status}`));
  }
  if (naButExists.length) {
    console.log('\n=== NA BUT ACTUALLY EXISTS (fix!) ===');
    naButExists.forEach(i => console.log(`  ID ${i.id} ${i.title} [${i.store}]: status ${i.status}`));
  }
  if (blocked.length) {
    console.log('\n=== 403 BLOCKED (may need manual check) ===');
    blocked.forEach(i => console.log(`  ID ${i.id} ${i.title} [${i.store}]: ${i.url}`));
  }
  if (generic.length) {
    console.log('\n=== GENERIC/SEARCH URLs ===');
    generic.forEach(i => console.log(`  ID ${i.id} ${i.title} [${i.store}]: ${i.url}`));
  }
  
  // Save full results
  fs.writeFileSync('temp/audit-results.json', JSON.stringify({ checked, issues }, null, 2));
  console.log('\nFull results saved to temp/audit-results.json');
}

main().catch(console.error);
