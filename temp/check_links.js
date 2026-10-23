const fs = require('fs');
const path = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const c = fs.readFileSync(path, 'utf8');
const obj = JSON.parse(c);
const g = obj.find(x => x.id === 'best-monitors');

console.log('=== BUSCANDO ENLACES EN INGLÉS EN CONTENIDO ES ===');
for(let i=1; i<=11; i++) {
  const es = g.sections[i].content_es;
  const en = g.sections[i].content;
  // Buscar URLs en contenido ES
  const urlRegex = /https?:\/\/[^\s"<>]+/g;
  const urls = es.match(urlRegex);
  if (urls && urls.length > 0) {
    console.log('Sección ' + i + ' ES URLs:', urls);
  }
  // Buscar 'Buy at', 'Buy', 'Shop', 'Compare' en ES
  const linkTextRegex = /Buy at|Buy|Shop|Compare|Shop at/i;
  if (es.match(linkTextRegex)) {
    console.log('Sección ' + i + ' TIENE TEXTO DE ENLACE EN INGLÉS EN ES');
  }
}