// 1) best-guitar-home-office: el titulo ES pasa a ser identico al EN (peticion del usuario).
// 2) El Donner HUSH-I EVO2 sube a la maxima nota: el veredicto abre con el
//    ("the smartest buy") y la conclusion ES lo llama "la opción premium".
//    Antes lo puntue por debajo del Taylor, contradiciendo el texto.
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

fs.writeFileSync(B + 'temp/guides.before_titulo.json', JSON.stringify(guides, null, 2), 'utf8');

const g = guides.find(x => x.id === 'best-guitar-home-office');

console.log('TITULO');
console.log('  EN antes: ' + g.title);
console.log('  ES antes: ' + g.title_es);
g.title_es = g.title;
console.log('  ES ahora: ' + g.title_es);
console.log('  iguales:  ' + (g.title === g.title_es));

fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('\nBackup: temp/guides.before_titulo.json');
console.log('data/guides.json escrito.');
