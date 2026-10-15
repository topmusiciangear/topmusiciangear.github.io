const fs = require('fs');
const f = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const guides = JSON.parse(fs.readFileSync(f, 'utf8'));
const Viejo = 'Lewitt LCT 1040 Ultimate Microphone System';
const Nuevo = 'Lewitt LCT1040 Ultimate Microphone System';
let n = 0;
guides.forEach(g => {
  if (g.productTable) g.productTable.columns.forEach(c => {
    if (c.title === Viejo) { c.title = Nuevo; n++; }
    if (c.title_es === Viejo) { c.title_es = Nuevo; n++; }
  });
  (g.verdictProsCons || []).forEach(v => {
    if ((v.name || v.title) === Viejo) { v.name = Nuevo; if (v.title !== undefined) v.title = Nuevo; n++; }
    if (v.name_es === Viejo) { v.name_es = Nuevo; n++; }
  });
});
console.log('renombrado en ' + n + ' sitios: "' + Viejo + '" -> "' + Nuevo + '"');
fs.writeFileSync(f, JSON.stringify(guides, null, 2), 'utf8');
console.log('guides.json escrito');