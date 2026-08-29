const fs = require('fs');
const path = require('path');

const src = fs.readFileSync('build-guides.js', 'utf8');
const start = src.indexOf('const TEST_SHOP_BTN = {');
const startBrace = src.indexOf('{', src.indexOf('=' , start));
// find matching close brace
let depth = 0, endIdx = -1;
for (let i = startBrace; i < src.length; i++) {
  if (src[i] === '{') depth++;
  else if (src[i] === '}') { depth--; if (depth === 0) { endIdx = i; break; } }
}
const block = src.slice(startBrace, endIdx + 1);
// parse with eval by capturing the object literal as JS
const obj = eval('(' + block + ')');
const entries = Object.keys(obj).map(Number);

const products = Object.values(JSON.parse(fs.readFileSync('data/products.json', 'utf8')));
const productIds = new Set(products.map(p => p.id).filter(x=>x!==undefined));
const cat = {};
products.forEach(p => { if (p.id!==undefined) cat[p.id] = { name:p.title, category:p.category, stores:Object.keys(p.stores||{}) }; });

console.log('Products in catalog:', productIds.size);
let withEntry = 0, withoutEntry = 0;
const withoutList = [];
const missingPrices = [];
for (const id of productIds) {
  const cfg = obj[id];
  if (cfg) withEntry++;
  else { withoutEntry++; withoutList.push(id); }
  if (cfg && (!cfg.prices || Object.keys(cfg.prices).length === 0)) {
    missingPrices.push(id);
  }
}

console.log('With TEST_SHOP_BTN entry:', withEntry);
console.log('Without entry (no buttons data):', withoutEntry);
console.log('Ids without entry:', withoutList.join(','));
console.log('');
console.log('Entries with empty/missing prices:', missingPrices.length, missingPrices.join(','));

// Store arrays used
const storePrices = { amazon:0,zzounds:0,reverb:0,gear4music:0,andertons:0,musicstore:0,pluginboutique:0 };
let na = [], oos = [];
for (const id of Object.keys(obj)) {
  const cfg = obj[id];
  if (cfg.prices) for (const st of Object.keys(cfg.prices)) storePrices[st]++;
  if (cfg.na) na.push(...cfg.na.map(x=>x+':'+id));
  if (cfg.oos) oos.push(...cfg.oos.map(x=>x+':'+id));
}
console.log('Store price counts across entries (keys with a price):');
for (const st of Object.keys(storePrices)) console.log('  '+st+': '+storePrices[st]);
console.log('na count:', na.length);
console.log('oos count:', oos.length);
console.log('');
console.log('--- Ids without entry detail ---');
withoutList.forEach(id=>{ const c=cat[id]; console.log(id, '|', c?c.name:'?', '| cat:', c?c.category:'?', '| stores:', c?c.stores.join(','):'?'); });
