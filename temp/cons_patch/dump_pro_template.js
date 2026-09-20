const fs = require('fs');
const R = 'C:/Users/Daniel/projects/topmusiciangear';
const G = JSON.parse(fs.readFileSync(R + '/data/guides.json', 'utf8'));
const GS = Array.isArray(G) ? G : (G.guides || []);
const g = GS.find(x => x && x.id === 'pro-interfaces');
if (!g) { console.log('pro-interfaces NOT FOUND'); process.exit(0); }
console.log('keys: ' + Object.keys(g).join(', '));
console.log('\n=== featuredProducts (raw) ==='); console.log(JSON.stringify(g.featuredProducts, null, 1));
console.log('\n=== verdict (raw) ==='); console.log(JSON.stringify(g.verdict, null, 1));
console.log('\n=== verdict_es (raw) ==='); console.log(JSON.stringify(g.verdict_es, null, 1));
console.log('\n=== sections (full, first 1) ===');
const s0 = g.sections && g.sections[0];
console.log(JSON.stringify(s0, null, 1));
console.log('\n=== sections[1] (products referenced) ===');
console.log(JSON.stringify(g.sections && g.sections[1] && { id: g.sections[1].id, key: g.sections[1].key, h: g.sections[1].h, products: g.sections[1].products }, null, 1));
console.log('\n=== productTable type ===');
const pt = g.productTable;
console.log('type=' + (pt === null ? 'null' : Array.isArray(pt) ? 'array' : typeof pt));
if (Array.isArray(pt)) console.log(JSON.stringify(pt.slice(0,2), null, 1));
else if (pt && typeof pt === 'object') console.log(JSON.stringify(pt, null, 1).slice(0, 1200));
console.log('\n=== verdictProsCons ==='); console.log(JSON.stringify(g.verdictProsCons, null, 1));
console.log('\n=== first 90 chunks of intro (structure hint) ===');
console.log(JSON.stringify(g.intro && g.intro.slice(0, 1), null, 1));
console.log('\n=== conclusion (raw) ==='); console.log(JSON.stringify(g.conclusion, null, 1).slice(0, 800));
console.log('\n=== faq (raw first 2) ==='); console.log(JSON.stringify(g.faq && g.faq.slice(0, 2), null, 1));
console.log('\n=== SEO-ish fields ===');
for (const k of ['description','description_es','featuredSnippet','titleTag','titleTag_es','relatedGuides','author','datePublished','aboutName','faqTitle','faqTitle_es']) {
  const v = g[k];
  const s = typeof v === 'string' ? v.slice(0, 160) : JSON.stringify(v);
  console.log('  ' + k + ' = ' + s);
}
