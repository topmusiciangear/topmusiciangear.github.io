const dir = 'C:/Users/Daniel/projects/topmusiciangear';
const g = require(dir + '/data/guides.json');
const G = Array.isArray(g) ? g : (g.guides || []);
const p = require(dir + '/data/products.json');
const P = Array.isArray(p) ? p : (p.products || []);

function hasUA(x) {
  const b = JSON.stringify(x || {}).toLowerCase();
  return b.indexOf('apollo twin x') >= 0 || b.indexOf('apollo x16') >= 0;
}

console.log('=== 1) ALL guides whose blob mentions "apollo twin x" OR "apollo x16" ===');
for (const x of G) {
  if (!x || !x.id) continue;
  if (!hasUA(x)) continue;
  const t = (x.title || '').slice(0, 100);
  const tEs = (x.title_es || '').slice(0, 100);
  console.log('\n--- guide id=' + x.id + ' | cat=' + x.category + ' | title="' + t + '" | title_es="' + tEs + '"');
  // find which specific sub-field carries the UA reference
  for (const key of ['featuredProducts', 'productTable', 'verdictProsCons', 'productSections', 'sections', 'faq', 'verdict', 'comparison']) {
    const v = x[key];
    if (!v) continue;
    const hit = JSON.stringify(v).toLowerCase().indexOf('apollo') >= 0;
    if (hit) console.log('   >>> mentions apollo inside [' + key + ']');
  }
}

console.log('\n\n=== 2) verify portable-interfaces: what does productTable embed? ===');
const piIdx = G.findIndex(x => x && x.id === 'portable-interfaces');
const pi = G[piIdx];
console.log('portable-interfaces found at index', piIdx);
if (pi) {
  console.log('  title="' + pi.title + '"');
  console.log('  category=' + pi.category + ' | intro=' + (pi.intro || '').slice(0, 180));
  const tab = pi['productTable'];
  if (tab) {
    console.log('  productTable: has columns=' + (tab.columns ? tab.columns.length : 'no') + ' rows=' + (tab.rows ? tab.rows.length : 'no'));
    for (const c of (tab.columns || [])) {
      console.log('    col: EN="' + (c.title || c.title_en || '') + '" ES="' + (c.title_es || '') + '"');
    }
  }
  const fp = pi['featuredProducts'];
  console.log('  featuredProducts=' + JSON.stringify(fp));
}

console.log('\n\n=== 3) THE UA products: how are they referenced? search products.json by TITLE ===');
for (const q of ['Apollo Twin X', 'Apollo x16', 'Apollo x8p', 'Neumann MT 48', 'Neumann MT48', 'RME Babyface Pro FS', 'RME Fireface UFX III', 'Apogee Symphony I/O', 'Audient ORIA', 'Lynx Aurora']) {
  const hits = P.filter(x => x && x.title && x.title.toLowerCase().indexOf(q.toLowerCase()) >= 0);
  if (hits.length) {
    for (const h of hits) {
      console.log('  TITLE "' + h.title + '" | id=' + h.id + ' | cat=' + h.category +
        ' | img=' + JSON.stringify(h.img) +
        ' | stores=' + JSON.stringify(h.stores) +
        ' | prices=' + JSON.stringify(h.prices) +
        ' | guideId/' + JSON.stringify(h.guideId || h.guide || h.guides || ''));
    }
  } else {
    console.log('  [no title hit for "' + q + '"]');
  }
}

console.log('\n\n=== 4) does any product carry "guideId" / "guide" linking it to a guide? schema scan ===');
const keysAll = new Set();
for (const x of P) for (const k of Object.keys(x || {})) keysAll.add(k);
console.log('distinct product keys:', [...keysAll].join(', '));
const withG = P.filter(x => x && (x.guideId !== undefined || x.guide !== undefined || x.guides !== undefined));
console.log('products carrying a guide-link field:', withG.length);
