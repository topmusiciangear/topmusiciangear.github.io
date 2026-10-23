const fs = require('fs');
const path = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const c = fs.readFileSync(path, 'utf8');
const obj = JSON.parse(c);
const g = obj.find(x => x.id === 'best-monitors');

console.log('=== BUSCANDO ENLACES EN ESPAÑOL EN CONTENIDO EN ===');
for(let i=1; i<=11; i++) {
  const en = g.sections[i].content;
  // Buscar 'Comprar en', 'Comparar', 'Music Store', 'Aprox.' en EN
  const linkTextRegex = /Comprar en|Comparar|Music Store|Aprox\.|€/i;
  if (en.match(linkTextRegex)) {
    console.log('Sección ' + i + ' TIENE TEXTO DE ENLACE EN ESPAÑOL EN EN');
    console.log('  Muestra:', en.substring(0, 200));
    console.log('');
  }
}