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

// === 1. ADD MISSING PRICES for stores we unflagged from oos ===
const addPrices = {
  23: { zzounds: '$199.99' },      // Beyerdynamic DT 770 Pro
  57: { zzounds: '$185.00' },      // AKG K371
  118: { gear4music: '£79.00' },   // Waves Mercury Bundle
  139: { musicstore: '€2,512.60' },// Allen & Heath SQ-5
  148: { musicstore: '€1,763.90' },// Midas M32R LIVE
  149: { musicstore: '€503.40' },  // Yamaha MG16XU
  150: { musicstore: '€199.00' },  // Behringer Xenyx X1222USB
  154: { musicstore: '€436.10' },  // Yamaha DBR12
  158: { musicstore: '€259.00' },  // Squier Affinity Precision Bass PJ
};

for (const [idStr, prices] of Object.entries(addPrices)) {
  const id = parseInt(idStr);
  if (!BTN[id]) { console.log('SKIP: id ' + id + ' not found'); continue; }
  if (!BTN[id].prices) BTN[id].prices = {};
  for (const [store, price] of Object.entries(prices)) {
    if (!BTN[id].prices[store]) {
      BTN[id].prices[store] = price;
      fixes++;
      console.log('PRICE: ' + id + ' added ' + store + ' = ' + price);
    } else {
      console.log('SKIP: ' + id + ' ' + store + ' already has price: ' + BTN[id].prices[store]);
    }
  }
}

// === 2. FIX WRONG CURRENCY - ID 413 musicstore $ → € ===
if (BTN[413] && BTN[413].prices && BTN[413].prices.musicstore) {
  const old = BTN[413].prices.musicstore;
  BTN[413].prices.musicstore = '€1,699.00';
  fixes++;
  console.log('CURRENCY: 413 musicstore ' + old + ' → €1,699.00');
}

// === 3. REMOVE OOS flags for verified in-stock products ===
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
console.log('build-guides.js updated');
