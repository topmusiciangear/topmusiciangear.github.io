const fs = require('fs');

const f = 'data/guides.json';
const gs = JSON.parse(fs.readFileSync(f, 'utf8'));
const g = gs.find(x => x.id === 'best-studio-monitors-under-150');

/* 1. Nota de la seccion del Alesis (badge propia) */
const alesisSec = g.sections.find(s => (s.products || []).includes(1052));
if (alesisSec) {
  console.log('Alesis section score:', alesisSec.score, '-> 9.6');
  alesisSec.score = 9.6;
}

/* 2. Orden nuevo por nota: 9.8 CR4.5 | 9.6 Alesis | 9.5 BX4 | 9.5 Truth | 9.4 Eris | 9.3 CR3.5 */
const order = [
  'Mackie CR4.5',
  'Alesis ELEVATE 4',
  'M-Audio BX4',
  'Behringer Truth 3.5 BT',
  'PreSonus Eris 3.5 2nd Gen',
  'Mackie CR3.5'
];

/* 3. Reordenar verdictProsCons */
const byName = {};
g.verdictProsCons.forEach(v => { byName[v.name] = v; });
const missingVP = order.filter(n => !byName[n]);
if (missingVP.length) throw new Error('verdictProsCons missing: ' + missingVP.join(', '));
g.verdictProsCons = order.map(n => byName[n]);

/* 4. Reordenar parrafos del veredicto (EN + ES) */
function reorderParas(html) {
  const parts = html.match(/<p>[\s\S]*?<\/p>/g) || [];
  const map = {};
  const extras = [];
  parts.forEach(p => {
    const m = p.match(/<span class="product-name">([^<]+)<\/span>/);
    if (m && order.includes(m[1])) map[m[1]] = p;
    else extras.push(p);
  });
  const missing = order.filter(n => !map[n]);
  if (missing.length) throw new Error('verdict paragraphs missing: ' + missing.join(', '));
  return extras.concat(order.map(n => map[n])).join('');
}
g.verdict = reorderParas(g.verdict);
g.verdict_es = reorderParas(g.verdict_es);

/* 5. Reordenar columnas de la tabla y los valores de cada fila */
const cols = g.productTable.columns;
const oldIdx = {};
cols.forEach((c, i) => { oldIdx[c.title] = i; });
const missingCols = order.filter(n => oldIdx[n] === undefined);
if (missingCols.length) throw new Error('table columns missing: ' + missingCols.join(', '));
g.productTable.columns = order.map(n => cols[oldIdx[n]]);
g.productTable.rows = g.productTable.rows.map(r => ({
  ...r,
  values: order.map(n => r.values[oldIdx[n]])
}));

fs.writeFileSync(f, JSON.stringify(gs, null, 2));

console.log('verdictProsCons:', g.verdictProsCons.map(v => v.name).join(' | '));
console.log('table columns:', g.productTable.columns.map(c => c.title).join(' | '));
console.log('EN verdict:', (g.verdict.match(/product-name">([^<]+)</g) || []).map(x => x.split('>')[1]).join(' | '));
console.log('ES verdict:', (g.verdict_es.match(/product-name">([^<]+)</g) || []).map(x => x.split('>')[1]).join(' | '));
console.log('row 0 (Woofer):', g.productTable.rows[0].values.map((v, i) => g.productTable.columns[i].title + '=' + v.value).join(' | '));
