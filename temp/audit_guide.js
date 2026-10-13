const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const g = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8')).find(x => x.id === 'usb-mics');
const prods = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const byId = {}; prods.forEach(p => byId[p.id] = p);

const out = [];
const P = (...a) => out.push(a.join(' '));

// ---------- 1. THE 10 PRODUCTS ----------
const cols = g.productTable.columns.map(c => c.title);
P('========== 1. ESTRUCTURA ==========');
P('COLUMNAS (' + cols.length + '):');
cols.forEach((c, i) => P('  ' + i + '  ' + c + '  ||ES: ' + g.productTable.columns[i].title_es));

P('');
P('SECCIONES (' + g.sections.length + '):');
g.sections.forEach((s, i) => P('  ' + i + '  ' + s.heading + '\n       products=[' + s.products + ']  -> ' + s.products.map(id => byId[id] ? byId[id].title : 'ID ' + id + ' NO EXISTE').join()));

P('');
P('FEATUREDPRODUCTS (' + g.featuredProducts.length + '): ' + g.featuredProducts.map(id => byId[id] ? byId[id].title : 'ID ' + id + ' NO EXISTE').join(' | '));

P('');
P('VPC (' + g.verdictProsCons.length + '):');
g.verdictProsCons.forEach((v, i) => {
  P('  ' + i + '  ' + v.name);
  P('       pros EN=' + v.pros.length + ' ES=' + (v.pros_es || []).length + ' | cons EN=' + v.cons.length + ' ES=' + (v.cons_es || []).length + (v.pros.length >= 4 && v.cons.length >= 4 ? '  [OK >=4/4]' : '  [!!! REGLA 4/4]'));
  if ((v.pros_es || []).length !== v.pros.length) P('       [!!!] pros EN/ES desalineados');
  if ((v.cons_es || []).length !== v.cons.length) P('       [!!!] cons EN/ES desalineados');
  v.pros.forEach((p, j) => P('       + ' + p));
  v.cons.forEach((c, j) => P('       - ' + c));
});

// ---------- 2. TABLE vs VPC vs SECTIONS alignment ----------
P('');
P('========== 2. ALINEACION TABLA / VPC / SECCIONES ==========');
const colNames = cols;
const vpcNames = g.verdictProsCons.map(v => v.name);
const secIds = g.sections.map(s => s.products[0]);
const featIds = g.featuredProducts;
const secIdsStr = secIds.join(',');
P('Tabla==featuredProducts ? ' + (secIdsStr === featIds.join(',')));
P('featured == secciones ? ' + (featIds.join(',') === secIdsStr));
colNames.forEach((c, i) => {
  const sec = g.sections[i] ? g.sections[i].products[0] : null;
  const vpc = vpcNames[i];
  const feat = featIds[i];
  const colId = null;
  P('  col[' + i + '] ' + c + '  sec=' + sec + ' feat=' + feat + ' vpc="' + vpc + '"  ' +
    (sec === feat ? '' : '[!!! sec!=feat]') + ' ' +
    (sec && byId[sec] && byId[sec].title.toLowerCase().includes(vpc.toLowerCase().split(' ')[0]) ? '' : '[!!! nombre VPC no coincide con producto]'));
});

// ---------- 3. FULL TABLE DUMP ----------
P('');
P('========== 3. TABLA COMPLETA ==========');
g.productTable.rows.forEach(r => {
  P('--- ' + r.label + ' / ' + (r.label_es || '') + ' ---');
  r.values.forEach((v, i) => {
    if (!v) { P('  col' + i + ' [' + colNames[i] + '] = [FALTA VALOR]'); return; }
    P('  col' + i + ' [' + colNames[i] + '] = ' + v.value + (v.value_es ? '   ||ES: ' + v.value_es : '   [!!! SIN ES]'));
  });
});

fs.writeFileSync(BASE + 'temp/audit_1.txt', out.join('\n'));
console.log(out.join('\n'));
console.log('\n[written temp/audit_1.txt]');