const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const g = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'))
  .find(x => x.id === 'best-home-studio-speakers');
const s = g.sections[7];
const st = x => String(x).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
console.log('EN partes: ' + s.content.split('</p>').length + ' | </p> totales: ' + (s.content.match(/<\/p>/g) || []).length + ' | <p>: ' + (s.content.match(/<p>/g) || []).length);
console.log('ES partes: ' + s.content_es.split('</p>').length + ' | </p>: ' + (s.content_es.match(/<\/p>/g) || []).length + ' | <p>: ' + (s.content_es.match(/<p>/g) || []).length);
console.log('');
console.log('EN cruda (ultimos 700):\n' + s.content.slice(-700));
console.log('');
console.log('ES cruda (ultimos 700):\n' + s.content_es.slice(-700));