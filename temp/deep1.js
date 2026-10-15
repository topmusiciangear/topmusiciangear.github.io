const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const d = fs.readFileSync(BASE + 'guides/beginner-bass-guitars.html', 'utf8');
const i = d.indexOf('openReviewModal(536)');
const card = d.slice(i, i + 20000);
console.log('=== Bronco: ¿aparece gear4music en la tarjeta? ===');
console.log('  ocurrencias de "gear4music": ' + (card.match(/gear4music/g) || []).length);
console.log('  ocurrencias de "Gear4music": ' + (card.match(/Gear4music/g) || []).length);
console.log('  ocurrencias de "5E5O" (codigo G4M nuevo): ' + (card.match(/5E5O/g) || []).length);
console.log('  ocurrencias de "£170": ' + (card.match(/£170/g) || []).length);
const g4m = card.match(/data-store="gear4music"[\s\S]{0,400}/);
console.log('  fila gear4music:\n' + (g4m ? g4m[0].replace(/\s+/g, ' ').slice(0, 300) : '  NO ESTA'));

console.log('\n\n=== Montage: fila Music Store tal cual se renderiza ===');
const d2 = fs.readFileSync(BASE + 'guides/best-synthesizers.html', 'utf8');
const j = d2.indexOf('openReviewModal(639)');
const card2 = d2.slice(j, j + 20000);
const ms = card2.match(/data-store="musicstore"[\s\S]{0,2000}/);
console.log(ms ? ms[0].replace(/\s+/g, ' ').slice(0, 1500) : 'no esta');

// como shopButtonsTest decide "No disponible"
console.log('\n\n=== como se implementa "na" en build-guides.js ===');
const b = fs.readFileSync(BASE + 'build-guides.js', 'utf8');
const idx = b.indexOf('No disponible');
console.log(b.slice(Math.max(0, idx - 900), idx + 260));