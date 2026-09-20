const fs = require('fs');
const R = 'C:/Users/Daniel/projects/topmusiciangear';
const jg = JSON.parse(fs.readFileSync(R + '/data/guides.json', 'utf8'));
const GS = Array.isArray(jg) ? jg : jg.guides;
const g = GS.find(x => x && x.id === 'portable-interfaces');
if (!g) throw new Error('portable-interfaces not found');

const REMOVE = new Set([16, 182]);
const newCols = require(R + '/temp/cons_patch/pt5_data.js');
const newVerdicts = require(R + '/temp/cons_patch/pt_verdict.js');

function mapId(id) {
  const m = { 17: 'RME Babyface Pro FS', 15: 'Focusrite Scarlett 2i2 4th Gen', 328: 'Arturia MiniFuse 2 OTG', 18: 'SSL 2+ MKII', 55: 'Universal Audio Volt 2', 262: 'Audient EVO 4', 263: 'Universal Audio Volt 276', 54: 'MOTU M2', 53: 'Audient iD14 MKII' };
  return m[id];
}

const order = [17, 15, 328, 18, 55, 262, 263, 54, 53];

function cleanSectionsProducts(arr) {
  return (arr || []).filter(id => !REMOVE.has(id) && mapId(id));
}

(g.sections || []).forEach(s => {
  if (Array.isArray(s.products)) s.products = cleanSectionsProducts(s.products);
});
if (Array.isArray(g.featuredProducts)) g.featuredProducts = cleanSectionsProducts(g.featuredProducts);

let changed = 0;

function ensureRow(pt, label) {
  let r = pt.rows.find(x => x && x.label === label);
  if (!r) { r = { label: label, label_es: label, values: [] }; pt.rows.push(r); }
  while (r.values.length < 9) r.values.push({});
  return r;
}

function ensureColumn(pt, title, title_es) {
  let c = pt.columns.find(x => x && (x.title === title || x.title_es === title || x.title_es === title_es));
  if (!c) { c = { title: title, title_es: title_es }; pt.columns.push(c); changed++; }
  return c;
}

const rowMap = [
  ['Best For', 'bestFor'], ['Type', 'type'], ['Inputs / Outputs', 'io'], ['Preamps', 'pre'],
  ['Sample Rate', 'srate'], ['Bit Depth', 'bit'], ['Connectivity', 'conn'], ['Special Features', 'feat']
];

const pt = g.productTable;
if (!Array.isArray(pt.columns)) pt.columns = [];

const existingTotal = pt.rows.reduce((n, r) => n + (r.values || []).length, 0);
const keepRows = pt.rows.filter(r => r && r.label);

const newRowCols = pt.rows.length === 0 ? [] : new Array(pt.rows[0].values.length).fill(null);

function cloneVal(v) {
  return v && typeof v === 'object' ? { value: v.value, value_es: v.value_es } : { value: v };
}

try {
  const oldCols = pt.columns.map(c => ({ title: c.title, title_es: c.title_es }));

  const rows = rowMap.map(([label, k]) => {
    const oldRow = pt.rows.find(r => r && r.label === label);
    const values = order.map((id, ci) => {
      if (ci < 4 && oldRow && oldRow.values[ci]) return cloneVal(oldRow.values[ci]);
      if (ci >= 4) {
        const key = k; const key_es = k + '_es';
        return { value: newCols[key][ci - 4], value_es: newCols[key_es][ci - 4] };
      }
      return {};
    });
    return { label: label, label_es: label, values: values };
  });

  const columns = order.map((id, ci) => {
    if (ci < 4) return oldCols[ci];
    const vc = newCols.names[ci - 4];
    return { title: vc, title_es: vc };
  });

  pt.columns = columns;
  pt.rows = rows;

  const newVNames = new Set(['Universal Audio Volt 2', 'Audient EVO 4', 'Universal Audio Volt 276', 'MOTU M2', 'Audient iD14 MKII']);
  const oldKeep = (g.verdictProsCons || []).filter(v => v && !newVNames.has(v.name));
  const merged = oldKeep.concat(newVerdicts.map(v => ({
    name: v.name, name_es: v.name_es,
    pros: v.pros, pros_es: v.pros_es,
    cons: v.cons, cons_es: v.cons_es
  })));
  g.verdictProsCons = merged;

  // remove old verdict rows whose product was removed (Apollo)
  g.verdictProsCons = g.verdictProsCons.filter(v => mapIdFromName(v.name));

  function mapIdFromName(n) {
    return order.some(id => mapId(id) === n);
  }

  // remove Apollo verdict entries by name
  const apolloNames = ['Universal Audio Apollo Twin X Gen 2', 'Universal Audio Apollo x16 Gen 2'];
  g.verdictProsCons = g.verdictProsCons.filter(v => !apolloNames.includes(v.name));

  fs.writeFileSync(R + '/data/guides.json', JSON.stringify(jg, null, 2));
  console.log('DONE. cols=' + pt.columns.length + ' rows=' + pt.rows.length +
    ' verdicts=' + g.verdictProsCons.length +
    ' sectionProds=' + JSON.stringify((g.sections || []).map(s => s.products)) +
    ' featured=' + JSON.stringify(g.featuredProducts));
} catch (e) {
  console.error('ERR ' + e.message);
}
