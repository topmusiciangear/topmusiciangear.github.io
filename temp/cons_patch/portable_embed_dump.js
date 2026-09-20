const g = require('../../data/guides.json');
const G = Array.isArray(g) ? g : (g.guides || []);
const pi = G.find(x => x && x.id === 'portable-interfaces');
if (!pi) { console.log('NO portable-interfaces'); process.exit(0); }

console.log('=== portable-interfaces | keys = ' + Object.keys(pi).join(', '));

console.log('\n=== A) featuredProducts entries — full dump (look for the 2 UA Apollo) ===');
const fp = pi.featuredProducts || [];
console.log('featuredProducts count = ' + fp.length);
for (const f of fp) {
  console.log('--- ' + JSON.stringify(f).slice(0, 600));
}

console.log('\n=== B) productTable/verdictProsCons — names only ===');
for (const k of ['productTable', 'verdictProductsCons', 'verdictProsCons', 'featuredProducts']) {
  const v = pi[k];
  if (Array.isArray(v)) {
    console.log('[' + k + '] n=' + v.length + ' | names=' + v.map(r => (r && (r.name || r.title || r.Name)) || '?').join(' | '));
  } else if (v && Array.isArray(v.rows)) {
    console.log('[' + k + '.rows] n=' + v.rows.length + ' | names=' + v.rows.map(r => (r && (r.name || r.title || r.Name)) || '?').join(' | '));
  }
}

console.log('\n=== C) where is "interfaz de élite 10x6 Thunderbolt 3" / "16x20 Thunderbolt 3" STRING? (search whole guide blob) ===');
const blob = JSON.stringify(pi);
for (const probe of ['interfaz de élite', 'elite 10x6', '16x20 thunderbolt', 'globo', 'Apollo Twin X', 'Apollo x16']) {
  const i = blob.indexOf(probe);
  console.log('  ["' + probe + '"] -> ' + (i >= 0 ? 'FOUND @' + i : 'absent'));
}
console.log('\nfirst 2400 chars of blob:');
console.log(JSON.stringify(pi).slice(0, 2400));
