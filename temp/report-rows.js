const fs = require('fs');

const src = fs.readFileSync('build-guides.js', 'utf8');
const start = src.indexOf('const TEST_SHOP_BTN = {');
const startBrace = src.indexOf('{', src.indexOf('=', start));
let depth = 0, endIdx = -1;
for (let i = startBrace; i < src.length; i++) {
  if (src[i] === '{') depth++;
  else if (src[i] === '}') { depth--; if (depth === 0) { endIdx = i; break; } }
}
const block = src.slice(startBrace, endIdx + 1);
const tbt = eval('(' + block + ')');

const products = Object.values(JSON.parse(fs.readFileSync('data/products.json', 'utf8')));
const byId = {};
products.forEach(p => { if (p.id !== undefined) byId[p.id] = p; });

const ORDER = ['zzounds', 'reverb', 'gear4music', 'andertons', 'musicstore'];

// For each product: compute per dropdown store the status
const report = [];
for (const id of Object.keys(byId).map(Number).sort((a,b)=>a-b)) {
  const p = byId[id];
  const cfg = tbt[id] || {};
  const prices = cfg.prices || {};
  const naList = cfg.na || [];
  const oosList = cfg.oos || [];
  const stores = p.stores || {};
  const urls = cfg.urls || {};
  const hasAmazon = !!(stores.amazon && (p.excludeStores||[]).indexOf('amazon') === -1);
  const primaryStore = (p.category==='plugins') ? 'pluginboutique' : (p.category==='daw') ? 'daw' : (hasAmazon ? 'amazon' : Object.keys(prices)[0]);
  // determine dropdown order (DAW/plugins special)
  let order = (p.category==='daw') ? (hasAmazon ? ORDER : ['zzounds','reverb','andertons','musicstore']) : (p.category==='plugins') ? [] : ORDER;
  if (p.category === 'plugins') continue; // dropdown not applicable the same way

  const rowInfo = [];
  for (const k of order) {
    const hasUrl = !!(urls[k] || (k==='reverb' && true) || stores[k]);
    const isNa = naList.indexOf(k) > -1 || (!(urls[k] || k==='reverb') && !stores[k]);
    const isOos = oosList.indexOf(k) > -1 || (k !== 'reverb' && !prices[k] && stores[k]);
    let state;
    if (isNa) state = 'NA';
    else if (isOos) state = 'OOS';
    else state = prices[k] ? 'PRICE:' + prices[k] : 'BLANK';
    rowInfo.push(k + '=' + state + (hasUrl ? '(link)' : '(nolink)'));
  }
  report.push({ id, name: p.title, category: p.category, primaryStore, rows: rowInfo });
}

// Filters
const withIncorrectOos = report.filter(r => r.rows.some(x => x.includes('=OOS') && x.includes('(link)')));
const withBlank = report.filter(r => r.rows.some(x => x.includes('=BLANK')));
const withNA = report.filter(r => r.rows.some(x => x.includes('=NA')));

console.log('=== TOTAL products with dropdown rows:', report.length, '===');
console.log('');
console.log('=== OOS but HAS LINK (in stock, missing price) : ' + withIncorrectOos.length + ' ===');
withIncorrectOos.forEach(r => console.log('  ' + r.id + ' | ' + r.category + ' | ' + r.name + ' :: ' + r.rows.filter(x=>x.includes('=OOS')).join('  ')));
console.log('');
console.log('=== BLANK rows (link, no price, no oos/na): ' + withBlank.length + ' ===');
withBlank.forEach(r => console.log('  ' + r.id + ' | ' + r.category + ' | ' + r.name + ' :: ' + r.rows.filter(x=>x.includes('=BLANK')).join('  ')));
console.log('');
console.log('=== NA rows (no link, not available): ' + withNA.length + ' ===');
withNA.forEach(r => console.log('  ' + r.id + ' | ' + r.category + ' | ' + r.name + ' :: ' + r.rows.filter(x=>x.includes('=NA')).join('  ')));
