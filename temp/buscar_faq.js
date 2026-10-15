const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const g = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));

// que guia tiene esas FAQ
const AGUAS = ['¿Qué micrófono debería comprar primero', 'buenos auriculares para mezclar con presupuesto',
  'What microphone should I buy first', 'best entry audio interface for a starter home studio'];

AGUAS.forEach(a => {
  const hit = g.filter(x => JSON.stringify(x).indexOf(a) > -1);
  console.log('\n"' + a.slice(0, 52) + '" -> ' + hit.length + ' guia(s): ' + hit.map(x => x.id).join(', '));
});

// la guia starter-studio: donde salen sus FAQ
const s = g.find(x => x.id === 'starter-studio');
console.log('\n\nclaves de starter-studio: ' + Object.keys(s).join(', '));
console.log('\nsus FAQs propias?: ' + JSON.stringify(s).match(/"faq[^"]*"/g));

// buscar en build-guides.js
const b = fs.readFileSync(BASE + 'build-guides.js', 'utf8');
AGUAS.forEach(a => {
  const i = b.indexOf(a);
  console.log('\nbuild-guides.js "' + a.slice(0, 40) + '": ' + (i > -1 ? 'linea ' + (b.slice(0, i).split('\n').length) : 'no'));
});
