// Enrich thin generated sections: pull Best For + specs from ANY guide's table
// where the product has a column; fallback = fuller verdict (3 pros + 2 cons).
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const clean = s => (s || '').trim().replace(/\s+/g, ' ').replace(/\.+$/, '');
const lower1 = s => s ? s.charAt(0).toLowerCase() + s.slice(1) : s;
const SKIP_LABELS = /^(best for|type|price|category|form factor|format)$/i;

function tableData(title) {
  for (const o of G) {
    if (!o.productTable) continue;
    const ci = o.productTable.columns.findIndex(c => c.title === title);
    if (ci < 0) continue;
    const bfRow = o.productTable.rows.find(r => /best for/i.test(r.label || ''));
    const specRows = o.productTable.rows.filter(r => !SKIP_LABELS.test(r.label || '') && r.values[ci] && r.values[ci].value).slice(0, 2);
    if (specRows.length === 2) {
      return {
        bf: bfRow && bfRow.values[ci],
        specs: specRows.map(r => ({ label: r.label, en: r.values[ci].value, es: r.values[ci].value_es || r.values[ci].value }))
      };
    }
  }
  return null;
}

let fixed = 0;
G.forEach(g => {
  (g.sections || []).forEach(s => {
    if (!/A Closer Look/.test(s.heading || '') || /Standout specs/.test(s.content || '')) return;
    const title = s.heading.replace(': A Closer Look', '');
    const v = (g.verdictProsCons || []).find(x => x.name === title);
    if (!v) return;
    const td = tableData(title);
    let content, content_es;
    if (td) {
      const specEn = ' Standout specs — ' + td.specs.map(x => x.label + ': ' + clean(x.en)).join('; ') + '.';
      const specEs = ' Specs clave — ' + td.specs.map(x => x.label + ': ' + clean(x.es)).join('; ') + '.';
      const pros = v.pros.slice(0, 2).map(clean).join('; ');
      const cons = v.cons.slice(0, 1).map(clean).join('; ');
      const prosEs = (v.pros_es || []).slice(0, 2).map(clean).join('; ');
      const consEs = (v.cons_es || []).slice(0, 1).map(clean).join('; ');
      content = '<strong>' + title + (td.bf ? ' is ' + lower1(clean(td.bf.value)) : '') + '.</strong>' + specEn +
        (pros ? ' On the plus side: ' + pros + '.' : '') + (cons ? ' Watch out: ' + cons + '.' : '');
      content_es = '<strong>' + title + (td.bf ? ': ' + clean(td.bf.value_es || td.bf.value) : '') + '.</strong>' + specEs +
        (prosEs ? ' En el lado positivo: ' + prosEs + '.' : '') + (consEs ? ' Ojo: ' + consEs + '.' : '');
    } else {
      const pros = v.pros.slice(0, 3).map(clean).join('; ');
      const cons = v.cons.slice(0, 2).map(clean).join('; ');
      const prosEs = (v.pros_es || []).slice(0, 3).map(clean).join('; ');
      const consEs = (v.cons_es || []).slice(0, 2).map(clean).join('; ');
      content = '<strong>' + title + '.</strong> ' + pros + '.' + (cons ? ' Watch out: ' + cons + '.' : '');
      content_es = '<strong>' + title + '.</strong> ' + prosEs + '.' + (consEs ? ' Ojo: ' + consEs + '.' : '');
    }
    s.content = content; s.content_es = content_es;
    fixed++;
  });
});
fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
console.log('enriched: ' + fixed);
