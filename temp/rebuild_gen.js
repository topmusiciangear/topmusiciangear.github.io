// Rebuild ALL generated deep-dive sections with grammatical template:
// bold Title + BestFor apposition (no forced verb) + specs + pros/cons.
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const clean = s => (s || '').trim().replace(/\s+/g, ' ').replace(/\.+$/, '');
const SKIP_LABELS = /^(best for|type|price|category|form factor|format)$/i;

function colData(title) {
  // own guide first is handled by caller; this searches all guides
  for (const o of G) {
    if (!o.productTable) continue;
    const ci = o.productTable.columns.findIndex(c => c.title === title);
    if (ci < 0) continue;
    const bfRow = o.productTable.rows.find(r => /best for/i.test(r.label || ''));
    const specRows = o.productTable.rows.filter(r => !SKIP_LABELS.test(r.label || '') && r.values[ci] && r.values[ci].value).slice(0, 2);
    return { bf: bfRow && bfRow.values[ci], specs: specRows.map(r => ({ label: r.label, en: r.values[ci].value, es: r.values[ci].value_es || r.values[ci].value })), hasSpecs: specRows.length === 2 };
  }
  return null;
}

let n = 0;
G.forEach(g => {
  (g.sections || []).forEach(s => {
    const m = (s.heading || '').match(/^(.*): A Closer Look$/);
    if (!m) return;
    const title = m[1];
    const v = (g.verdictProsCons || []).find(x => x.name === title);
    if (!v) return;
    const td = colData(title);
    const bf = td && td.bf;
    let specEn = '', specEs = '';
    if (td && td.hasSpecs) {
      specEn = ' Standout specs — ' + td.specs.map(x => x.label + ': ' + clean(x.en)).join('; ') + '.';
      specEs = ' Specs clave — ' + td.specs.map(x => x.label + ': ' + clean(x.es)).join('; ') + '.';
    }
    const nPros = (td && td.hasSpecs) ? 2 : 3;
    const nCons = (td && td.hasSpecs) ? 1 : 2;
    const pros = v.pros.slice(0, nPros).map(clean).join('; ');
    const cons = v.cons.slice(0, nCons).map(clean).join('; ');
    const prosEs = (v.pros_es || []).slice(0, nPros).map(clean).join('; ');
    const consEs = (v.cons_es || []).slice(0, nCons).map(clean).join('; ');
    s.content = '<strong>' + title + '</strong>' + (bf ? ' — ' + clean(bf.value) + '.' : '.') + specEn +
      (pros ? ' On the plus side: ' + pros + '.' : '') + (cons ? ' Watch out: ' + cons + '.' : '');
    s.content_es = '<strong>' + title + '</strong>' + (bf ? ' — ' + clean(bf.value_es || bf.value) + '.' : '.') + specEs +
      (prosEs ? ' En el lado positivo: ' + prosEs + '.' : '') + (consEs ? ' Ojo: ' + consEs + '.' : '');
    s.heading_es = title + ': análisis detallado';
    n++;
  });
});
fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
console.log('rebuilt: ' + n);
