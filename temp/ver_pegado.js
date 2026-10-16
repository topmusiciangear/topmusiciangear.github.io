const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const css = fs.readFileSync(B + 'css/style.css', 'utf8');
const min = fs.readFileSync(B + 'css/style.min.css', 'utf8');
console.log('style.css bytes: ' + css.length + '   style.min.css bytes: ' + min.length);
console.log('min corrupto (sin llaves): ' + (!/[{}]/.test(min) ? 'SI' : 'no'));
console.log('regla movil en min: ' + (min.includes('guide-link-btn{display:block') ? 'SI' : 'NO'));
console.log('regla movil en css: ' + (css.includes('width: fit-content') ? 'SI' : 'NO'));

// verificar el ejemplo del usuario: seccion 12 ES termina con el boton pegado
const g = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const s12 = g.find(x => x.id === 'starter-studio').sections[12].content_es;
const fin = s12.slice(-320).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
console.log('\nfinal sec[12] ES: ...' + fin.slice(-220));
console.log('boton en parrafo propio: ' + (/<p><a href="\/guides\/best-microphone_es\.html"/.test(s12) ? 'SI (mal)' : 'no (bien, va pegado)'));

// HTML generado
const d = fs.readFileSync(B + 'guides/starter-studio_es.html', 'utf8');
const i = d.indexOf('el suelo de ruido es la especificación que sigue pagando.');
console.log('\nHTML tras esa frase: ' + d.slice(i + 60, i + 220).replace(/\s+/g, ' ').slice(0, 160));
