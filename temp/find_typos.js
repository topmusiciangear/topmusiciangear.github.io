// Busca encabezados y typos concretos en el bloque de la guía
const fs = require('fs');
const raw = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8');
const lines = raw.split('\n');
const gStart = lines.findIndex(l => l.includes('"id": "best-monitors-for-small-rooms"'));
const gEnd = lines.findIndex(l => l.includes('"id": "best-multi-effects-pedals"'));

['Best Budget Monitor a Pair', 'before consider a subwoofer', 'room modes tha 5-inch', 'Best Budget'].forEach(term => {
  for (let i = gStart; i < gEnd; i++) {
    if (lines[i].includes(term)) {
      console.log('L' + (i + 1) + ' [' + term + ']:', lines[i].trim().slice(0, 220));
      console.log('');
    }
  }
});

// headings de todas las secciones con su heading_es (para revisión)
console.log('== headings EN/ES ==');
for (let i = gStart; i < gEnd; i++) {
  const l = lines[i].trim();
  if (l.startsWith('"heading":')) console.log('L' + (i + 1), l.slice(0, 110));
  if (l.startsWith('"heading_es":')) console.log('L' + (i + 1), l.slice(0, 110));
}
