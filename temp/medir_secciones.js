const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'starter-studio');

const txt = h => (h || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const palabras = h => txt(h).split(' ').filter(w => /[a-zA-ZáéíóúñÁÉÍÓÚÑ]/.test(w)).length;

const filas = s.sections.map((sec, i) => ({
  i,
  heading: sec.heading_es.slice(0, 54),
  en: palabras(sec.content),
  es: palabras(sec.content_es),
  parrafos: (sec.content.match(/<p>/g) || []).length
})).sort((a, b) => a.es - b.es);

console.log('=== LONGITUD DE CADA SECCION (palabras, español) ===\n');
filas.forEach(f => console.log('  [' + String(f.i).padStart(2) + '] ' + String(f.es).padStart(4) + ' es / ' + String(f.en).padStart(4) + ' en  ' + f.parrafos + 'p  ' + f.heading));

const medias = filas.map(f => f.es);
const prom = Math.round(medias.reduce((a, b) => a + b, 0) / medias.length);
console.log('\n  promedio : ' + prom + ' palabras');
console.log('  mediana  : ' + [...medias].sort((a, b) => a - b)[Math.floor(medias.length / 2)]);
console.log('  minimo   : ' + Math.min(...medias) + '  -> seccion [' + filas[0].i + '] "' + filas[0].heading + '"');
console.log('  maximo   : ' + Math.max(...medias) + '  -> seccion [' + filas[filas.length - 1].i + ']');
console.log('\n  las 4 mas cortas:');
filas.slice(0, 4).forEach(f => console.log('    [' + f.i + '] ' + String(f.es).padStart(4) + '  ' + f.heading));
