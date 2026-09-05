const fs = require('fs');
const src = fs.readFileSync('build-guides.js', 'utf8');

const m = src.match(/const TEST_SHOP_BTN\s*=\s*\{([\s\S]*?)\n  \};/);
const btnSrc = 'var TEST_SHOP_BTN = {' + m[1] + '\n};';
eval(btnSrc);

const prodSrc = fs.readFileSync('data/products.json', 'utf8');
const prods = JSON.parse(prodSrc);
const byId = {};
prods.forEach(p => { byId[p.id] = p; });

const storeSym = {
  zzounds: '$', amazon: '$', reverb: '$', pluginboutique: '$',
  andertons: '£', gear4music: '£', musicstore: '€', official: ''
};
const norm = {
  '£': 1.27, '€': 1.08, '$': 1.0
};
const num = (s) => parseFloat(String(s).replace(/[$,£€\s]/g, ''));

const issues = [];
const w = (id, shop, msg) => issues.push(`[${id}.${shop}] ${msg}`);

const ids = Object.keys(TEST_SHOP_BTN).map(Number);
console.log('TEST_SHOP_BTN entries:', ids.length);

for (const id of ids) {
  const cfg = TEST_SHOP_BTN[id];
  const prod = byId[id];
  if (!prod) { w(id, '*', 'ID NOT in products.json (orphan)'); continue; }
  const prices = cfg.prices || {};
  for (const [shop, priceRaw] of Object.entries(prices)) {
    const pStr = String(priceRaw);
    const expectedSym = storeSym[shop];
    if (expectedSym && !pStr.startsWith(expectedSym)) w(id, shop, `currency ${JSON.stringify(pStr[0])} != expected ${expectedSym} -> ${pStr}`);
    const body = pStr.replace(/^[$£€]/, '');
    if (/[\d]/g.test(body.replace(/[.,\d]/g, ''))) w(id, shop, `non-numeric chars -> ${pStr}`);
    const digits = body.replace(/[.,]/g, '');
    if (/^\d{4,}$/.test(digits)) w(id, shop, `MISSING thousands comma -> ${pStr}`);
    const cents = /\.(\d+)/.exec(body);
    if (cents && cents[1].length !== 2) w(id, shop, `unusual decimals -> ${pStr}`);
    if (/NaN|undefined|Infinity/i.test(pStr)) w(id, shop, `NaN/undefined -> ${pStr}`);
    // coherence: normalized USD
    const sym = pStr[0];
    const conv = norm[sym] || 1;
    const usd = num(pStr) * conv;
    const others = [];
    for (const [s2, pr2] of Object.entries(prices)) {
      if (s2 === shop) continue;
      const sv = storeSym[s2];
      if (!sv || sv === '') continue;
      others.push(num(String(pr2)) * (norm[sv] || 1));
    }
    if (others.length) {
      others.sort((a, b) => a - b);
      const med = others[Math.floor(others.length / 2)];
      if (med > 0 && (usd / med < 0.4 || usd / med > 1.7)) w(id, shop, `INCOHERENT price ${pStr} (USD ${usd.toFixed(0)}) vs median of others (USD ${med.toFixed(0)}, ratio ${(usd / med).toFixed(2)})`);
    }
  }
  // prices set for a shop the product has no URL for
  const st = prod.stores || {};
  for (const shop of Object.keys(cfg.prices || {})) {
    if (!st[shop]) w(id, shop, `price set but NO store URL in products.json (keep in sync)`);
  }
  // oos referencing a store missing URL
  if (Array.isArray(cfg.oos)) {
    for (const o of cfg.oos) if (!st[o]) w(id, o, `oos but NO store URL -> synthesized search link`);
  }
}

// products with store URLs but no TEST_SHOP_BTN price for that shop
let missingCount = 0;
const missingList = [];
for (const p of prods) {
  const cfg = TEST_SHOP_BTN[p.id] || {};
  const prices = cfg.prices || {};
  for (const shop of Object.keys(p.stores || {})) {
    if (!Object.keys(prices).includes(shop)) {
      missingCount++; missingList.push(`${p.id}.${shop}`);
    }
  }
}
console.log('storeURL-without-TEST_SHOP_BTN-price pairs:', missingCount);

const grouped = {};
for (const i of issues) {
  const k = /currency|NaN|unusual decimals/.test(i) ? 'FORMAT' : /INCOHERENT/.test(i) ? 'INCOHERENT' : /MISSING thousands/.test(i) ? 'THOUSANDS' : /NO store URL|oos but|keep in sync/.test(i) ? 'SYNC' : /orphan/.test(i) ? 'ORPHAN' : 'OTHER';
  (grouped[k] = grouped[k] || []).push(i);
}
for (const [k, v] of Object.entries(grouped)) {
  console.log(`\n===== ${k} (${v.length}) =====`);
  for (const l of v.slice(0, 80)) console.log('  ' + l);
  if (v.length > 80) console.log(`  ... +${v.length - 80} more`);
  console.log(`---- sample distinct shops for ${k}:`);
  const shops = new Set(v.map(l => l.split('.')[1]));
  console.log('    shops:', [...shops].join(','));
}