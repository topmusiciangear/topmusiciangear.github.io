const fs = require('fs');
const src = fs.readFileSync('build-guides.js', 'utf8');

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

let fixes = 0;

// === 1. ADD MISSING PRICES ===
const addPrices = {
  141: { zzounds: '$699.99' },      // Roland FP-30X
  144: { zzounds: '$299.00' },      // Elektron Model:Cycles
};

for (const [idStr, prices] of Object.entries(addPrices)) {
  const id = parseInt(idStr);
  if (!BTN[id]) continue;
  if (!BTN[id].prices) BTN[id].prices = {};
  for (const [store, price] of Object.entries(prices)) {
    if (!BTN[id].prices[store]) {
      BTN[id].prices[store] = price;
      fixes++;
      console.log('PRICE: ' + id + ' added ' + store + ' = ' + price);
    }
  }
}

// === 2. FIX WRONG CURRENCY ===
// ID 386 pluginboutique € → $
if (BTN[386] && BTN[386].prices && BTN[386].prices.pluginboutique === '€113.99') {
  BTN[386].prices.pluginboutique = '$199.00';
  fixes++;
  console.log('CURRENCY: 386 pluginboutique €113.99 → $199.00');
}
// ID 390 pluginboutique € → $
if (BTN[390] && BTN[390].prices && BTN[390].prices.pluginboutique === '€101.48') {
  BTN[390].prices.pluginboutique = '$199.00';
  fixes++;
  console.log('CURRENCY: 390 pluginboutique €101.48 → $199.00');
}
// ID 392 musicstore £ → remove (plugin, not sold on musicstore)
if (BTN[392] && BTN[392].prices && BTN[392].prices.musicstore) {
  delete BTN[392].prices.musicstore;
  fixes++;
  console.log('CURRENCY: 392 removed musicstore £78.00 (plugin not sold there)');
}

// === 3. REMOVE invalid "na"/"OOS" strings from prices ===
for (const [idStr, btn] of Object.entries(BTN)) {
  if (!btn.prices) continue;
  for (const [store, val] of Object.entries(btn.prices)) {
    if (val === 'na' || val === 'OOS' || val === 'N/A' || val === 'n/a') {
      delete btn.prices[store];
      fixes++;
      console.log('CLEAN: ' + idStr + ' removed invalid price "' + val + '" from ' + store);
    }
  }
}

// === 4. REMOVE OOS flags for verified in-stock products ===
const removeOos = {
  23: ['zzounds'],
  57: ['zzounds'],
  141: ['zzounds'],
  144: ['zzounds'],
  66: ['musicstore'],
  67: ['musicstore'],
  139: ['musicstore'],
  148: ['musicstore'],
  149: ['musicstore'],
  150: ['musicstore'],
  154: ['musicstore'],
  158: ['musicstore'],
  118: ['gear4music'],
};

for (const [idStr, stores] of Object.entries(removeOos)) {
  const id = parseInt(idStr);
  if (!BTN[id]) continue;
  const btn = BTN[id];
  if (!btn.oos) continue;
  
  for (const store of stores) {
    const idx = btn.oos.indexOf(store);
    if (idx !== -1) {
      btn.oos.splice(idx, 1);
      fixes++;
      console.log('OOS: ' + id + ' removed ' + store + ' from oos');
    }
  }
  
  if (btn.oos && btn.oos.length === 0) {
    delete btn.oos;
  }
}

// === Serialize ===
function serializeBtn(btn) {
  const parts = [];
  if (btn.prices) {
    const priceParts = Object.entries(btn.prices).map(([k, v]) => k + ':"' + v + '"');
    parts.push('prices:{' + priceParts.join(',') + '}');
  }
  if (btn.urls) {
    const urlParts = Object.entries(btn.urls).map(([k, v]) => k + ':"' + v + '"');
    parts.push('urls:{' + urlParts.join(',') + '}');
  }
  if (btn.oos && btn.oos.length > 0) {
    parts.push('oos:[' + btn.oos.map(s => '"' + s + '"').join(',') + ']');
  }
  if (btn.na && btn.na.length > 0) {
    parts.push('na:[' + btn.na.map(s => '"' + s + '"').join(',') + ']');
  }
  return '{' + parts.join(',') + '}';
}

let newBlock = 'const TEST_SHOP_BTN = {\n';
const ids = Object.keys(BTN).map(Number).sort((a, b) => a - b);
for (let i = 0; i < ids.length; i++) {
  const id = ids[i];
  const comma = i < ids.length - 1 ? ',' : '';
  newBlock += '  ' + id + ': ' + serializeBtn(BTN[id]) + comma + '\n';
}
newBlock += '};';

const newSrc = src.substring(0, btnStart) + newBlock + src.substring(btnEnd);
fs.writeFileSync('build-guides.js', newSrc);
console.log('\nTotal fixes: ' + fixes);
