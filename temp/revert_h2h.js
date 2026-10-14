const fs = require('fs');
// 1. Guia: quitar flags de la seccion Head-to-Head (vuelve a texto solo)
const gj = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === 'beginner-guitar');
const s = g.sections.find(x => x && x.heading && x.heading.includes('Head-to-Head'));
delete s.splitProducts;
delete s.comparePhotos;
fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
console.log('flags quitados:', s.splitProducts === undefined && s.comparePhotos === undefined ? 'OK' : 'FALLO');