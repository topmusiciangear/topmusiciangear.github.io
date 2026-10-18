const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const ruta = B + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(ruta, 'utf8'));
const g = guides.find(x => x.id === 'best-home-studio-speakers');

const descEN = 'Budget home studio speakers under $150 in 2026: PreSonus, Mackie, M-Audio and Edifier compared with measured bass. Best pick: Eris E4.5.';
const descES = 'Monitores de estudio doméstico económicos por menos de $150: PreSonus, Mackie, M-Audio y Edifier con graves medidos. Mejor compra: Eris E4.5.';
const introEN = 'Under $150 for the pair, every budget monitor here is telling you something slightly different about your mix. We measured what actually changes at this price and what does not, including the speakers people buy thinking they are monitors.';
const introES = 'Por debajo de $150 el par, cada monitor económico de esta lista te está diciendo algo ligeramente distinto sobre tu mezcla. Medimos lo que de verdad cambia a este precio y lo que no, incluidos los altavoces que la gente compra pensando que son monitores.';

g.description = descEN;
g.description_es = descES;
g.intro = introEN;
g.intro_es = introES;

fs.writeFileSync(ruta, JSON.stringify(guides, null, 2), 'utf8');

console.log('=== METAS ACTUALIZADAS (con "budget") ===');
console.log('EN (' + descEN.length + '): ' + descEN);
console.log('ES (' + descES.length + '): ' + descES);
console.log('EN <=160: ' + (descEN.length <= 160 ? 'OK' : 'FALLA'));
console.log('ES <=155: ' + (descES.length <= 155 ? 'OK' : 'FALLA'));
console.log('\nTITLE SIN CAMBIOS:');
console.log('EN (' + g.title.length + '): ' + g.title);
console.log('ES (' + g.title_es.length + '): ' + g.title_es);
console.log('\nINTRO EN (' + introEN.length + ') y ES (' + introES.length + ')');
