const fs = require('fs');
const ROOT = 'C:/Users/Daniel/projects/topmusiciangear';
const G = JSON.parse(fs.readFileSync(ROOT + '/data/guides.json', 'utf8'));
const GS = Array.isArray(G) ? G : (G.guides || []);
const P = JSON.parse(fs.readFileSync(ROOT + '/data/products.json', 'utf8'));
const PS = Array.isArray(P) ? P : (P.products || []);

const nameOf = id => { const p = PS.find(x => String(x.id) === String(id)); return p ? (p.title || '?') : ('@' + String(id)); };

function dumpGuideShort(g, label) {
  console.log('\n===== ' + label + ' | id=' + g.id + ' =====');
  console.log('  category=' + JSON.stringify(g.category) + ' | title=' + JSON.stringify(g.title) + ' | title_es=' + JSON.stringify(g.title_es));
  // featuredProducts / snippets of products
  const fp = g.featuredProducts;
  console.log('  featuredProducts(' + (fp ? fp.length : 0) + '):');
  if (fp) fp.forEach((f, i) => console.log('    [' + i + '] ' + JSON.stringify(f).slice(0, 260)));
  // productTable
  const pt = g.productTable;
  if (pt) {
    const rows = Array.isArray(pt) ? pt : (pt.rows || []);
    const cols = Array.isArray(pt) ? null : (pt.columns || Object.keys(pt).filter(k => k !== 'rows'));
    console.log('  productTable: rows=' + rows.length + (cols ? ' | cols=' + cols.join(',') : ''));
    rows.forEach((r, i) => console.log('    [' + i + '] ' + JSON.stringify(r).slice(0, 300)));
  }
  // verdictProsCons
  if (g.verdictProsCons) console.log('  verdictProsCons: ' + JSON.stringify(g.verdictProsCons.map(v => (v && (v.name || v.title || v)) || v)).slice(0, 400));
  // any sections with .products referencing ids
  if (Array.isArray(g.sections)) {
    g.sections.forEach((s, i) => {
      if (s && s.products && s.products.length) {
        const names = (Array.isArray(s.products) ? s.products : []).map(id => typeof id === 'object' ? (id.id || id.name) : nameOf(id));
        console.log('  sections[' + i + '] h=' + JSON.stringify(s.h || s.title) + ' products=' + JSON.stringify(names));
      }
    });
  }
  console.log('  OTHER keys: ' + Object.keys(g).join(', '));
}

const pi = GS.find(x => x && x.id === 'portable-interfaces');
const pro = GS.find(x => x && x.id === 'pro-interfaces');
const other = GS.filter(x => x && /interface/i.test(x.category || '') && (x.id === 'premium-interfaces' || /premium/i.test(x.id || '')));

if (pi) dumpGuideShort(pi, 'PORTABLE-INTERFACES (local guides.json)');
if (pro) dumpGuideShort(pro, 'PRO-INTERFACES (local guides.json)');
console.log('\n===== any existing guide whose id matches premium-interfaces? =====');
console.log(other.length ? other.map(o => o.id).join(', ') : '  (none)');

console.log('\n===== WHERE does Apollo x16 Gen 2 (182) + Twin X Gen 2 (16) appear in guides.json? (every guide + path) =====');
for (const wantId of [182, 16]) {
  console.log('-- want id=' + wantId + ' "' + nameOf(wantId) + '" --');
  for (const gx of GS) {
    if (!gx || !gx.id) continue;
    const hits = [];
    const walk = (o, path) => {
      if (!o || typeof o !== 'object') return;
      if (Array.isArray(o)) { if (o.some(v => v === wantId || (v && (String(v.id) === String(wantId) || String(v) === String(wantId))))) hits.push(path); o.forEach((v, i) => walk(v, path + '[' + i + ']')); return; }
      for (const k of Object.keys(o)) {
        const v = o[k];
        if (v === wantId || v === String(wantId)) hits.push(path + '.' + k);
        else if (v && typeof v === 'object' && (v.id !== undefined)) { if (String(v.id) === String(wantId)) hits.push(path + '.' + k + '(.id=' + wantId + ')'); }
        walk(v, path + '.' + k);
      }
    };
    walk(gx, '');
    if (hits.length) console.log('  guide ' + gx.id + ' :: ' + hits.join(' ; '));
  }
}

console.log('\n===== LIVE build files: grep the 2 Apollo inside built HTML (guides/*.html) for portable & pro =====');
for (const f of ['guides/portable-interfaces.html', 'guides/portable-interfaces_es.html', 'guides/pro-interfaces.html', 'guides/pro-interfaces_es.html']) {
  const p = ROOT + '/' + f;
  if (!fs.existsSync(p)) { console.log('  ' + f + '  (missing)'); continue; }
  const t = fs.readFileSync(p, 'utf8');
  const hasTwin = t.indexOf('Apollo Twin X') >= 0;
  const hasX16 = t.indexOf('Apollo x16') >= 0;
  console.log('  ' + f.padEnd(40) + ' TwinX=' + String(hasTwin).padEnd(5) + ' x16=' + String(hasX16));
}
