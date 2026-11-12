const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const p = B + 'data/guides.json';
let t = fs.readFileSync(p, 'utf8');
const old = '"title_es": "Mejores micrófonos XLR económicos para estudio en casa"';
const neu = '"title_es": "Mejores micrófonos XLR económicos para estudio en casa por menos de $200"';
if (t.includes(old)) {
  t = t.split(old).join(neu);
  fs.writeFileSync(p, t, 'utf8');
  console.log('Title ES actualizado');
} else {
  console.log('NOT FOUND');
}
// También actualizar titleTag_es
const old2 = '"titleTag_es": "Mejores micrófonos XLR económicos para estudio en casa"';
const neu2 = '"titleTag_es": "Mejores micrófonos XLR económicos para estudio en casa por menos de $200"';
if (t.includes(old2)) {
  t = t.split(old2).join(neu2);
  fs.writeFileSync(p, t, 'utf8');
  console.log('TitleTag ES actualizado');
} else {
  console.log('TitleTag ES NOT FOUND');
}
