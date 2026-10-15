// starter-studio: nuevo titulo
// EN: "Building Your Home Studio: 3 Tiers for Every Budget"
// ES: "Construyendo tu home studio: 3 niveles para cada presupuesto"
// (minuscula "home studio": es la convencion del propio sitio — 0 de 3 guias lo
//  capitalizan — y es lo que marca la RAE, al no ser un nombre propio)
const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const s = g.find(x => x.id === 'starter-studio');

const EN = 'Building Your Home Studio: 3 Tiers for Every Budget';
const ES = 'Construyendo tu home studio: 3 niveles para cada presupuesto';

console.log('=== ANTES ===');
console.log('  title        : ' + s.title + '   (' + s.title.length + ')');
console.log('  titleTag     : ' + s.titleTag + '   (' + s.titleTag.length + ')');
console.log('  title_es     : ' + s.title_es + '   (' + s.title_es.length + ')');
console.log('  titleTag_es  : ' + s.titleTag_es + '   (' + s.titleTag_es.length + ')');

s.title = EN;
s.titleTag = EN;
s.title_es = ES;
s.titleTag_es = ES;

console.log('\n=== DESPUES ===');
console.log('  title        : ' + s.title + '   (' + s.title.length + ' / 60)');
console.log('  titleTag     : ' + s.titleTag + '   (' + s.titleTag.length + ' / 60)');
console.log('  title_es     : ' + s.title_es + '   (' + s.title_es.length + ' / 60)');
console.log('  titleTag_es  : ' + s.titleTag_es + '   (' + s.titleTag_es.length + ' / 60)');
console.log('\n  H1 y titleTag ahora iguales: ' + (s.title === s.titleTag));
console.log('  ES H1 y titleTag iguales   : ' + (s.title_es === s.titleTag_es));

fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');

/* CONTROL */
const s2 = JSON.parse(fs.readFileSync(F, 'utf8')).find(x => x.id === 'starter-studio');
const raw = fs.readFileSync(F, 'utf8');
console.log('\n=== CONTROL ===');
console.log('  quedan titulos antiguos: ' + (raw.match(/Home Studio Blueprint|Home Studio on a Budget|Home studio por niveles/g) || []).length + ' (debe ser 0)');
console.log('  slug / id sin cambios  : ' + s2.id + '  -> la URL sigue siendo /guides/starter-studio.html');
console.log('  mojibake               : ' + (raw.match(/â‚¬|Â£|Â°/g) || []).length);
console.log('\n  descripcion EN : ' + s2.description);
console.log('  descripcion ES : ' + s2.description_es);
console.log('  longitud desc  : ' + s2.description.length + ' / ' + s2.description_es.length + '  (limite 155)');
