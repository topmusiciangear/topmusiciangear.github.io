const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const P = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
const byId = {}; arr.forEach(p => byId[p.id] = p);

const TPL_EN = ['A Closer Look', 'In Depth', 'Deep Dive'];
const TPL_ES = ['análisis detallado', 'análisis a fondo', 'más de cerca'];

const out = {
  tpl: [], noReview: [], noVPC: [], noTitleEs: [], dupHead: [], noHeadEs: [],
  lowFaq: [], multiProd: [], noImg: [], noStores: [], noTable: [], dupVp: []
};

guides.forEach(g => {
  const secs = g.sections || [];
  const heads = secs.map(s => s.heading || s.h || '').filter(Boolean);

  // 1. headings plantilla
  secs.forEach(s => {
    const h = s.heading || s.h || '';
    const he = s.heading_es || '';
    if (TPL_EN.some(t => h.toLowerCase().includes(t.toLowerCase())) || TPL_ES.some(t => (he || '').toLowerCase().includes(t))) {
      out.tpl.push(g.id + ' :: "' + h + '"');
    }
  });

  // 2. featured sin review propia
  const solo = secs.filter(s => (s.products || []).length === 1).map(s => s.products[0]);
  const miss = [].concat(g.featuredProducts || []).filter(id => !solo.includes(id));
  if (miss.length) out.noReview.push(g.id + ' -> ' + miss.join(', '));

  // 3. featured sin veredicto pros/cons
  const vp = (g.verdictProsCons || []).map(v => v.name);
  if ((g.featuredProducts || []).length && vp.length !== g.featuredProducts.length) {
    out.noVPC.push(g.id + ' (prod ' + g.featuredProducts.length + ' / verd ' + vp.length + ')');
  }

  // 4. tabla sin title_es
  if (g.productTable) {
    const missEs = g.productTable.columns.filter(c => !c.title_es).length;
    if (missEs) out.noTitleEs.push(g.id + ' (' + missEs + '/' + g.productTable.columns.length + ' sin title_es)');
  } else out.noTable.push(g.id);

  // 5. headings duplicados
  const hs = heads.filter(Boolean);
  const dups = hs.filter((h, i) => hs.indexOf(h) !== i);
  if (dups.length) out.dupHead.push(g.id + ' -> ' + [...new Set(dups)].join(' | '));

  // 6. heading sin heading_es
  const noEs = secs.filter(s => s.heading && !s.heading_es).length;
  if (noEs) out.noHeadEs.push(g.id + ' (' + noEs + ')');

  // 7. FAQs < 4
  const f = g.featuredSnippet || {};
  const nFaq = [1, 2, 3, 4, 5, 6, 7, 8].filter(i => f['faq_q' + i + '_en']).length;
  if (nFaq && nFaq < 4) out.lowFaq.push(g.id + ' (' + nFaq + ')');

  // 8. reviews con varios productos
  const multi = secs.filter(s => (s.products || []).length > 1 && s.content && !s.intro).length;
  if (multi) out.multiProd.push(g.id);

  // 9/10. productos sin foto o sin tienda
  const ids = [].concat(g.featuredProducts || []);
  const noImg = ids.filter(id => byId[id] && !byId[id].img).length;
  if (noImg) out.noImg.push(g.id + ' (' + noImg + ')');
  const noSt = ids.filter(id => byId[id] && (!byId[id].stores || Object.keys(byId[id].stores).length === 0));
  if (noSt.length) out.noStores.push(g.id + ' -> ' + noSt.map(id => id + ' ' + byId[id].title).join(' | '));

  // 11. veredictos duplicados
  const vd = vp.filter((n, i) => vp.indexOf(n) !== i);
  if (vd.length) out.dupVp.push(g.id + ' -> ' + [...new Set(vd)].join(' | '));
});

const sec = (t, list, note) => {
  console.log('\n===== ' + t + ' (' + list.length + ') ' + (note || '') + ' =====');
  list.slice(0, 60).forEach(x => console.log('  - ' + x));
  if (list.length > 60) console.log('  ... y ' + (list.length - 60) + ' mas');
};
console.log('GUIAS TOTALES: ' + guides.length);
sec('1. Encabezados de plantilla (A Closer Look / analisis detallado)', out.tpl);
sec('2. Productos destacados SIN review propia', out.noReview);
sec('3. Numero de productos != numero de veredictos', out.noVPC);
sec('4. Tabla sin productTable', out.noTable);
sec('5. Columnas de tabla sin title_es', out.noTitleEs);
sec('6. Encabezados duplicados dentro de la guia', out.dupHead);
sec('7. heading sin heading_es', out.noHeadEs);
sec('8. FAQs con menos de 4', out.lowFaq);
sec('9. Veredictos duplicados', out.dupVp);
sec('10. Productos destacados SIN foto', out.noImg);
sec('11. Productos destacados SIN tienda', out.noStores);
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/backlog.txt',
  Object.entries(out).map(([k, v]) => k + ' (' + v.length + ')\n' + v.join('\n')).join('\n\n'));