const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = require(DIR + 'data/guides.json');
const P = require(DIR + 'data/products.json');
const g = G.find(x => x.id === 'best-digital-pianos');
console.log('sections:', g.sections.map(s => (s.products || []).join('+')).join(' | '));
console.log('featuredProducts:', JSON.stringify(g.featuredProducts));
const t = g.productTable || g.table || g.comparisonTable;
if (t) {
  console.log('table type:', Array.isArray(t) ? 'array len ' + t.length : typeof t);
  const cols = t.columns || t.cols || (t[0] && (t[0].columns || t[0].cols));
  console.log('table cols:', cols ? cols.length : 'n/a', cols ? JSON.stringify(cols.map(c => (c.product || c.id || c.name || JSON.stringify(c)).toString().slice(0, 40))) : '');
} else console.log('NO productTable');
const v = g.verdictProsCons || g.verdicts || {};
console.log('verdict keys:', Object.keys(v).join(', '));
for (const k of Object.keys(v)) {
  const e = v[k];
  const pros = (e.pros || e.ventajas || []).length;
  const cons = (e.cons || e.desventajas || e.contras || []).length;
  console.log(' verdict', k, 'pros:', pros, 'cons:', cons);
}
console.log('faq count:', (g.faq || []).length);
console.log('conclusion EN len:', (g.conclusion || '').length, '| ES len:', (g.conclusion_es || g.conclusionEs || '').length);
console.log('all 8:', [571, 572, 141, 140, 565, 568, 567, 570].map(id => { const p = P.find(x => x.id === id); return id + '=' + (p ? p.title.slice(0, 28) : 'MISSING'); }).join(' | '));
