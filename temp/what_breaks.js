const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
const P = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
const byId = {}; arr.forEach(p => byId[p.id] = p);

// 3 casos concretos
const casos = [
  ['budget-mics', 668, 'Audio-Technica AT2020USB-XP'],
  ['best-beginner-electric-guitar', 309, 'Squier Debut Series Stratocaster'],
  ['best-pa-speakers', 106, 'QSC K12.2 Powered Speaker']
];
casos.forEach(([gid, pid, nombre]) => {
  const g = guides.find(x => x.id === gid);
  const html = fs.readFileSync(BASE + 'guides/' + gid + '.html', 'utf8');
  const enSecciones = (g.sections || []).filter(s => Array.isArray(s.products) && s.products.indexOf(pid) > -1)
    .map(s => (s.heading || s.h || '?') + ' [' + s.products.length + ' prod]');
  const cards = (html.match(/class="guide-product-card"/g) || []).length;
  const tieneReview = g.sections.some(s => (s.products || []).length === 1 && s.products[0] === pid);
  const enTabla = g.productTable && g.productTable.columns.some(c => c.title === nombre);
  const enVerdicto = (g.verdictProsCons || []).some(v => v.name === nombre);
  const imgTag = html.includes(byId[pid].img.split('?')[0].slice(-30));
  const botonZ = html.includes('item--') || html.includes('awin1.com') || html.includes('anrdoezrs');
  console.log('\n### ' + gid + '  ->  ' + nombre);
  console.log('  en la tabla comparativa:        ' + enTabla);
  console.log('  con veredicto 4+4:              ' + enVerdicto);
  console.log('  con review propia (ficha):      ' + tieneReview);
  console.log('  aparece en alguna seccion:      ' + (enSecciones.length ? enSecciones.join(' / ') : 'NINGUNA'));
  console.log('  --- lo que ve el lector ---');
  console.log('  tarjetas de producto en pagina: ' + cards);
  console.log('  su foto aparece:                ' + imgTag);
});