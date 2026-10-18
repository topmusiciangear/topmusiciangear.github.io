const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const rg = B + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(rg, 'utf8'));
const g = guides.find(x => x.id === 'best-home-studio-speakers');

function arreglar(cont) {
  // quitar todo <p> y </p>, dividir por párrafos reales, re-envolver
  const txt = cont.replace(/<p>/g, '').replace(/<\/p>/g, '');
  const partes = txt.split('<strong>').map(x => x.trim()).filter(Boolean);
  return partes.map(p => '<p><strong>' + p + '</p>').join('');
}

g.sections[7].content = arreglar(g.sections[7].content);
g.sections[7].content_es = arreglar(g.sections[7].content_es);

fs.writeFileSync(rg, JSON.stringify(guides, null, 2), 'utf8');

console.log('EN p: ' + (g.sections[7].content.match(/<p>/g)||[]).length + ' /p: ' + (g.sections[7].content.match(/<\/p>/g)||[]).length);
console.log('ES p: ' + (g.sections[7].content_es.match(/<p>/g)||[]).length + ' /p: ' + (g.sections[7].content_es.match(/<\/p>/g)||[]).length);
console.log('');
console.log('EN: ' + g.sections[7].content);
console.log('ES: ' + g.sections[7].content_es);