const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const P = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
const byId = {}; arr.forEach(p => byId[p.id] = p);
const TPL = ['A Closer Look', 'In Depth', 'Deep Dive'];
const isTpl = (h, he) => TPL.some(t => (h || '').toLowerCase().includes(t.toLowerCase())) || ['análisis detallado', 'analisis detallado', 'más de cerca'].some(t => (he || '').toLowerCase().includes(t));

const rows = [];
guides.forEach(g => {
  (g.sections || []).forEach((s, i) => {
    const h = s.heading || s.h || '';
    if (!isTpl(h, s.heading_es)) return;
    const ids = s.products || [];
    const p = ids.length === 1 ? byId[ids[0]] : null;
    const txt = String(s.content || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    rows.push({
      g: g.id, gt: g.title, i, h, he: s.heading_es || '',
      prod: ids.length === 1 ? (p ? p.title : 'id' + ids[0]) : JSON.stringify(ids),
      body: txt
    });
  });
});
// agrupar por guia, ordenadas por nº de apariciones
const byGuide = {};
rows.forEach(r => (byGuide[r.g] = byGuide[r.g] || []).push(r));
const order = Object.keys(byGuide).sort((a, b) => byGuide[b].length - byGuide[a].length);
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/headings.json', JSON.stringify(rows, null, 1));
console.log('total secciones plantilla: ' + rows.length + ' en ' + order.length + ' guias');
order.forEach(k => console.log('  ' + byGuide[k].length + '  ' + k));
const txt = order.map(k => {
  const head = '\n\n########## ' + k + ' (' + byGuide[k].length + ') ' + byGuide[k][0].gt + '\n';
  const body = byGuide[k].map(r => '--- [' + r.i + '] ' + r.h + '\n    PROD: ' + r.prod + '\n    ' + r.body.slice(0, 520)).join('\n');
  return head + body;
}).join('');
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/headings_bodies.txt', txt);