const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const rg = B + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(rg, 'utf8'));
const g = guides.find(x => x.id === 'best-home-studio-speakers');
const s = g.sections[7];

s.content_es = s.content_es.replace(
  'pero simplemente no es un par por debajo de $150.',
  'pero simplemente no es un par por menos de $150.'
);

fs.writeFileSync(rg, JSON.stringify(guides, null, 2), 'utf8');
console.log('Corregido: "por debajo de" -> "por menos de"');
console.log('');
console.log('Nuevo texto:');
console.log(s.content_es.split('</p>').pop());