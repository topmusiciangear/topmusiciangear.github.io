const fs = require('fs');

const src = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');
const start = src.indexOf('const TEST_SHOP_BTN = {');
const startBrace = src.indexOf('{', src.indexOf('=', start));
let depth = 0, endIdx = -1;
for (let i = startBrace; i < src.length; i++) {
  if (src[i] === '{') depth++;
  else if (src[i] === '}') { depth--; if (depth === 0) { endIdx = i; break; } }
}
const tbt = eval('(' + src.slice(startBrace, endIdx + 1) + ')');

const products = Object.values(JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', 'utf8')));
const byId = {};
products.forEach(p => { if (p.id !== undefined) byId[p.id] = p; });

const STORES = ['zzounds', 'reverb', 'gear4music', 'andertons', 'musicstore', 'amazon'];
const out = {};
STORES.forEach(s => out[s] = []);

for (const id of Object.keys(byId).map(Number)) {
  const p = byId[id];
  if (!p || p.category === 'plugins') continue;
  const cfg = tbt[id] || {};
  const prices = cfg.prices || {};
  const stores = p.stores || {};
  const urls = cfg.urls || {};

  for (const s of STORES) {
    const storeUrl = (urls[s] || stores[s]);
    const needs = (s === 'amazon') ?
      (!!storeUrl && !prices.amazon && p.category !== 'daw') :
      (!prices[s] && !!(urls[s] || stores[s] || s === 'reverb'));
    if (!needs) continue;
    out[s].push({
      id,
      name: p.title,
      url: s === 'reverb' ? (storeUrl || '') : storeUrl,
      cat: p.category
    });
  }
}

const dir = 'C:/Users/Daniel/projects/topmusiciangear/temp/verify/';
fs.mkdirSync(dir, { recursive: true });
STORES.forEach(s => {
  fs.writeFileSync(dir + s + '.json', JSON.stringify(out[s], null, 1));
  console.log(s + ': ' + out[s].length + ' products to verify');
});
