const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
console.log('guides ok', g.length);
const i = g.findIndex(x => x.id === 'best-digital-pianos');
const gd = g[i];
console.log('idx', i, gd.title);
console.log('sections', gd.sections.length);
for (const s of gd.sections) {
  console.log(' -', (s.titleEn || s.title || s.title_es || '').slice(0, 60), 'products:', JSON.stringify(s.products), 'skipMedia:', !!s.skipMedia, 'split:', !!s.splitProducts);
}
console.log('featured', JSON.stringify(gd.featuredProducts));
console.log('table', gd.productTable.rows.length, 'rows x', gd.productTable.columns.length, 'cols');
console.log('table col ids:', JSON.stringify(gd.productTable.columns.map(c => c.id || c.label || c)));
console.log('verdict ids', JSON.stringify(Object.keys(gd.verdictProsCons)));
for (const [k, v] of Object.entries(gd.verdictProsCons)) {
  const pro = v.pros && v.pros.en ? v.pros.en.length : (Array.isArray(v.pros) ? v.pros.length : '?');
  const con = v.cons && v.cons.en ? v.cons.en.length : (Array.isArray(v.cons) ? v.cons.length : '?');
  const proEs = v.pros && v.pros.es ? v.pros.es.length : 'n/a';
  const conEs = v.cons && v.cons.es ? v.cons.es.length : 'n/a';
  console.log('  ', k, 'pros', pro, 'cons', con, 'pros_es', proEs, 'cons_es', conEs);
}
console.log('related', JSON.stringify(gd.relatedGuides));
console.log('faq count', gd.featuredSnippet && gd.featuredSnippet.faq_q1_en ? Object.keys(gd.featuredSnippet).filter(k => k.startsWith('faq_q')).length : 'check');
const p = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
console.log('products ok', p.length);
const ids = new Set(p.map(x => x.id));
const all = [...gd.featuredProducts];
for (const s of gd.sections) all.push(...(s.products || []));
console.log('missing ids:', all.filter(x => !ids.has(x)));
const nord = JSON.stringify(gd).includes('Nord Stage');
console.log('Nord refs in guide:', nord);
console.log('undefined refs:', JSON.stringify(gd).includes('undefined'));
