const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

// Limites de Google (aprox. por caracteres; en pixeles: titulo ~580px, desc ~920px)
const T_MAX = 60;   // titulo: seguro que no se corte
const T_WARN = 58;
const D_MAX = 155;  // meta description: seguro
const D_WARN = 150;

const files = fs.readdirSync(BASE + 'guides').filter(f => f.endsWith('.html'));
const rows = [];

files.forEach(function (f) {
  const h = fs.readFileSync(BASE + 'guides/' + f, 'utf8');
  const isEs = /_es\.html$/.test(f);
  const size = h.length;
  if (size < 20000) return; // stubs de redireccion, no cuentan

  const title = (h.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '';
  const ogTitle = (h.match(/property="og:title" content="([^"]*)"/) || [])[1] || '';
  const desc = (h.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  const twTitle = (h.match(/name="twitter:title" content="([^"]*)"/) || [])[1] || '';
  const h1 = (h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '';
  const clean = s => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

  rows.push({
    f: f, isEs: isEs,
    title: title, tLen: title.length,
    ogTitle: ogTitle, otLen: ogTitle.length,
    twTitle: twTitle, twLen: twTitle.length,
    desc: desc, dLen: desc.length,
    h1: clean(h1), h1Len: clean(h1).length
  });
});

const en = rows.filter(r => !r.isEs);
const es = rows.filter(r => r.isEs);
console.log('paginas analizadas: ' + rows.length + '  (EN ' + en.length + ' / ES ' + es.length + ')');

function report(list, lang, tmax, dmax, tlabel, dlabel) {
  console.log('\n############ ' + lang + ' ############');
  const longT = list.filter(r => r.tLen > tmax).sort((a, b) => b.tLen - a.tLen);
  const longD = list.filter(r => r.dLen > dmax).sort((a, b) => b.dLen - a.dLen);

  console.log('\n--- ' + tlabel + ' > ' + tmax + ' chars: ' + longT.length + '/' + list.length + ' ---');
  longT.forEach(r => console.log('  ' + String(r.tLen).padStart(4) + '  ' + r.f.replace('.html', '').padEnd(34) + ' ' + JSON.stringify(r.title)));

  console.log('\n--- ' + dlabel + ' > ' + dmax + ' chars: ' + longD.length + '/' + list.length + ' ---');
  longD.forEach(r => console.log('  ' + String(r.dLen).padStart(4) + '  ' + r.f.replace('.html', '').padEnd(34) + ' ' + JSON.stringify(r.desc.slice(0, 110)) + '...'));

  return { longT, longD };
}

const rEn = report(en, 'EN', T_MAX, D_MAX, 'TITULOS', 'META DESCRIPTIONS');
const rEs = report(es, 'ES', T_MAX, D_MAX, 'TITULOS', 'META DESCRIPTIONS');

console.log('\n############ OTROS ############');
console.log('\n--- titulos con el año 2026 (el sitio ya los habia quitado) ---');
const withYear = rows.filter(r => /202[0-9]/.test(r.title));
withYear.forEach(r => console.log('  ' + r.f.replace('.html', '').padEnd(34) + ' ' + r.title));
console.log('  total: ' + withYear.length);

console.log('\n--- og:title mas largo que el limite ---');
rows.filter(r => r.otLen > 70).forEach(r => console.log('  ' + r.otLen + '  ' + r.f.padEnd(40) + ' ' + JSON.stringify(r.ogTitle)));

console.log('\n--- paginas SIN meta description ---');
rows.filter(r => !r.desc).forEach(r => console.log('  ' + r.f));
console.log('  total: ' + rows.filter(r => !r.desc).length);

console.log('\n--- paginas sin <h1> o h1 vacio ---');
rows.filter(r => !r.h1).forEach(r => console.log('  ' + r.f));
console.log('  total: ' + rows.filter(r => !r.h1).length);

console.log('\n=== RESUMEN ===');
console.log('  EN titulos largos : ' + rEn.longT.length + '/' + en.length);
console.log('  EN descripciones largas: ' + rEn.longD.length + '/' + en.length);
console.log('  ES titulos largos : ' + rEs.longT.length + '/' + es.length);
console.log('  ES descripciones largas: ' + rEs.longD.length + '/' + es.length);
console.log('  TOTAL a arreglar  : ' + (rEn.longT.length + rEn.longD.length + rEs.longT.length + rEs.longD.length));