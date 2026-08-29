const fs = require('fs');

const src = fs.readFileSync('build-guides.js', 'utf8');
const start = src.indexOf('const TEST_SHOP_BTN = {');
const startBrace = src.indexOf('{', src.indexOf('=', start));
let depth = 0, endIdx = -1;
for (let i = startBrace; i < src.length; i++) {
  if (src[i] === '{') depth++;
  else if (src[i] === '}') { depth--; if (depth === 0) { endIdx = i; break; } }
}
const tbt = eval('(' + src.slice(startBrace, endIdx + 1) + ')');
const ph = require('C:/Users/Daniel/projects/topmusiciangear/data/price-history.json');

const products = Object.values(JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', 'utf8')));
const byId = {};
products.forEach(p => { if (p.id !== undefined) byId[p.id] = p; });

const ORDER = ['zzounds', 'reverb', 'gear4music', 'andertons', 'musicstore'];

// Worklist: for each store, list products that have a link but no price, grouped
const storeWork = {};
ORDER.forEach(s => storeWork[s] = []);
const amazonWork = [];
const pbWork = [];

for (const id of Object.keys(byId).map(Number).sort((a,b)=>a-b)) {
  const p = byId[id];
  if (p.category === 'daw') continue;
  const cfg = tbt[id] || {};
  const prices = cfg.prices || {};
  const oosList = cfg.oos || [];
  const naList = cfg.na || [];
  const stores = p.stores || {};
  const urls = cfg.urls || {};

  // Plugin Boutique primary button for plugin-category products
  if (p.category === 'plugins') {
    const hasPBLink = !!(stores.pluginboutique);
    if (hasPBLink && !prices.pluginboutique) pbWork.push({ id, name: p.title, issue: 'NO-PRICE' });
    continue; // plugins handled by pbWork separately
  }

  // Dropdown stores: which have link but no price?
  for (const k of ORDER) {
    const hasLink = !!(urls[k] || stores[k] || k === 'reverb');
    if (naList.indexOf(k) > -1) continue; // genuinely NA (no store)
    if (!hasLink) continue;
    const inOos = oosList.indexOf(k) > -1;
    const hasPrice = !!prices[k];
    if (inOos && hasPrice) continue; // real OOS with price, fine
    if (hasPrice) continue;
    // Needs a price. Determine source.
    let source = 'UNKNOWN';
    if (k === 'andertons' && ph[id] && ph[id].lastPrice != null) source = 'ANDERTONS_HIST:' + ph[id].lastPrice;
    storeWork[k].push({ id, name: p.title, oosFlag: inOos, source });
  }

  // Primary Amazon button: has amazon link, non-daw/plugin, no amazon price
  const hasAmazonLink = !!(stores.amazon && (p.excludeStores||[]).indexOf('amazon') === -1);
  if (hasAmazonLink && !prices.amazon) {
    amazonWork.push({ id, name: p.title });
  }
}

const fmt = (arr, store) => {
  console.log('### ' + store + ' — ' + arr.length + ' products missing price ###');
  arr.forEach(x => console.log('  ' + x.id + '\t' + x.name + (x.oosFlag ? ' [oos-flag]' : '') + (x.source ? ' || ' + x.source : ' || NEEDS-WEB-VERIFY')));
  console.log('');
};

ORDER.forEach(s => fmt(storeWork[s], s));
console.log('### amazon primary — ' + amazonWork.length + ' products missing amazon price ###');
amazonWork.forEach(x => console.log('  ' + x.id + '\t' + x.name));
console.log('');
console.log('### pluginboutique — ' + pbWork.length + ' products missing PB price ###');
pbWork.forEach(x => console.log('  ' + x.id + '\t' + x.name));
