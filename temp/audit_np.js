const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));

let totalCeldas = 0;
let notPublished = 0;
let porGuia = {};

guides.forEach(g => {
  if (!g.productTable || !g.productTable.rows) return;
  let celdasGuia = 0;
  let npGuia = 0;
  g.productTable.rows.forEach(r => {
    if (!r.values) return;
    r.values.forEach(v => {
      if (v.value_es) {
        celdasGuia++;
        if (v.value_es.toLowerCase().includes('not published') || v.value_es.toLowerCase().includes('no publicado')) {
          npGuia++;
        }
      }
    });
  });
  if (npGuia > 0) {
    porGuia[g.id] = { celdas: celdasGuia, notPublished: npGuia, pct: Math.round(npGuia / celdasGuia * 100) };
  }
  totalCeldas += celdasGuia;
  notPublished += npGuia;
});

console.log('Total celdas en tablas:', totalCeldas);
console.log('"Not published" total:', notPublished, '(' + Math.round(notPublished / totalCeldas * 100) + '%)');
console.log('\nGuias con mayor % de Not published:');
Object.entries(porGuia).sort((a, b) => b[1].pct - a[1].pct).slice(0, 15).forEach(([id, d]) => {
  console.log('  ' + id + ': ' + d.notPublished + '/' + d.celdas + ' (' + d.pct + '%)');
});