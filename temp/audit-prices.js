// Check TEST_SHOP_BTN prices for anomalies
// Read build-guides.js and extract TEST_SHOP_BTN block
const fs = require('fs');
const path = require('path');
const code = fs.readFileSync(path.join(__dirname, '..', 'build-guides.js'), 'utf8');

// Extract the TEST_SHOP_BTN section
const match = code.match(/const TEST_SHOP_BTN\s*=\s*\{([\s\S]*?)\};/);
if (!match) { console.log('Could not find TEST_SHOP_BTN'); process.exit(1); }

const btnCode = match[1];
// Parse each ID entry
const idEntries = btnCode.split(/\n\s*(\d+):\s*\{/);
const prices = {};

for (let i = 1; i < idEntries.length; i += 2) {
  const id = parseInt(idEntries[i]);
  const block = '{' + idEntries[i+1] + '}';
  // Extract prices
  const priceMatches = [...block.matchAll(/prices:\s*\{([^}]*)\}/g)];
  const oosMatch = block.match(/oos:\s*\[([^\]]*)\]/);
  const oos = oosMatch ? oosMatch[1].replace(/['"]/g, '').split(',').map(s=>s.trim()).filter(Boolean) : [];
  const naMatch = block.match(/na:\s*\[([^\]]*)\]/);
  const na = naMatch ? naMatch[1].replace(/['"]/g, '').split(',').map(s=>s.trim()).filter(Boolean) : [];

  for (const pm of priceMatches) {
    const storePrices = {};
    const priceStr = pm[1];
    const pairs = [...priceStr.matchAll(/(\w+):\s*['"]([^'"]+)['"]/g)];
    for (const p of pairs) {
      const store = p[1];
      const price = p[2];
      const num = parseFloat(price.replace(/[^0-9.]/g, ''));
      storePrices[store] = { price, num, oos: oos.includes(store) || na.includes(store) };
    }
    prices[id] = storePrices;
  }
}

// Now check for anomalies
console.log('=== PRICE ANOMALIES ===\n');

// Load products.json for product info
const products = require('../data/products.json');

// Check 1: Products with very high prices
console.log('--- VERY HIGH PRICES (>$2000) ---');
for (const [id, storePrices] of Object.entries(prices)) {
  for (const [store, info] of Object.entries(storePrices)) {
    if (info.num > 2000 && !info.oos) {
      const prod = products[id];
      console.log(`ID ${id} | ${prod?.title} | ${store}: ${info.price}`);
    }
  }
}

// Check 2: Price differences between stores > 50%
console.log('\n--- HUGE PRICE DIFFERENCES BETWEEN STORES (>50%) ---');
for (const [id, storePrices] of Object.entries(prices)) {
  const activePrices = Object.entries(storePrices).filter(([s,i]) => !i.oos && i.num > 0);
  if (activePrices.length >= 2) {
    const nums = activePrices.map(([s,i]) => i.num);
    const min = Math.min(...nums);
    const max = Math.max(...nums);
    const diff = ((max - min) / min * 100).toFixed(0);
    if (diff > 50) {
      const prod = products[id];
      console.log(`ID ${id} | ${prod?.title} | Diff: ${diff}%`);
      for (const [s, i] of activePrices) {
        console.log(`  ${s}: ${i.price}`);
      }
    }
  }
}

// Check 3: Products where one store is OOS but others have prices
console.log('\n--- PRODUCTS WITH MIXED OOS + PRICES ---');
for (const [id, storePrices] of Object.entries(prices)) {
  const oosStores = Object.entries(storePrices).filter(([s,i]) => i.oos);
  const activeStores = Object.entries(storePrices).filter(([s,i]) => !i.oos && i.num > 0);
  if (oosStores.length > 0 && activeStores.length > 0) {
    const prod = products[id];
    console.log(`ID ${id} | ${prod?.title}`);
    for (const [s, i] of oosStores) {
      console.log(`  OOS: ${s}`);
    }
    for (const [s, i] of activeStores) {
      console.log(`  ${s}: ${i.price}`);
    }
  }
}

// Check 4: Very low prices (might be wrong)
console.log('\n--- VERY LOW PRICES (<$5) ---');
for (const [id, storePrices] of Object.entries(prices)) {
  for (const [store, info] of Object.entries(storePrices)) {
    if (info.num > 0 && info.num < 5 && !info.oos) {
      const prod = products[id];
      console.log(`ID ${id} | ${prod?.title} | ${store}: ${info.price}`);
    }
  }
}

// Check 5: Prices that look like they might be wrong (e.g., £1.00)
console.log('\n--- SUSPICIOUS ROUND/LOW PRICES ---');
for (const [id, storePrices] of Object.entries(prices)) {
  for (const [store, info] of Object.entries(storePrices)) {
    if (info.num > 0 && info.num <= 2 && !info.oos) {
      const prod = products[id];
      console.log(`ID ${id} | ${prod?.title} | ${store}: ${info.price}`);
    }
  }
}

// Check 6: Missing prices for stores that have URLs
console.log('\n--- STORES WITH URL BUT NO PRICE ---');
const productsData = require('../data/products.json');
for (const [id, prod] of Object.entries(productsData)) {
  const stores = prod.stores || {};
  const oos = prod.oos || [];
  const storePrices = prices[id] || {};
  for (const [store, url] of Object.entries(stores)) {
    if (url && !oos.includes(store) && !storePrices[store]) {
      console.log(`ID ${id} | ${prod.title} | ${store}: has URL but no price`);
    }
  }
}
