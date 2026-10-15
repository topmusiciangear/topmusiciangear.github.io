const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gf = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gf, 'utf8'));
const g = guides.find(x => x.id === 'starter-studio');

// descripcion EN actual
console.log('desc EN (' + g.description.length + 'c): ' + g.description);
console.log('desc ES (' + g.description_es.length + 'c): ' + g.description_es);
console.log('titleTag EN (' + g.titleTag.length + 'c): ' + g.titleTag);

// nuevos: <=155 chars, <=920px, sin conteo de productos, sin year
g.description = 'Three complete home studio builds under $1,000, priced from our catalogue. What $426, $816 and $905 actually buy, and why room treatment is not optional.';
g.description_es = 'Tres montajes de estudio doméstico por menos de $1.000, con precios de nuestro catálogo. Qué compran $426, $816 y $905, y por qué trata la sala.';
// title EN mas util: mantiene la promesa del presupuesto sin contar productos
g.titleTag = 'Home Studio on a $1,000 Budget';

console.log('\n--- nuevos ---');
console.log('desc EN (' + g.description.length + 'c): ' + g.description);
console.log('desc ES (' + g.description_es.length + 'c): ' + g.description_es);
console.log('titleTag EN (' + g.titleTag.length + 'c): ' + g.titleTag);

fs.writeFileSync(gf, JSON.stringify(guides, null, 2), 'utf8');
console.log('\nguides.json escrito');