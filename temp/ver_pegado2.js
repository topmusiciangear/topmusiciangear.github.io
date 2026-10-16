const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const d = fs.readFileSync(B + 'guides/starter-studio_es.html', 'utf8');
const i = d.indexOf('el suelo de ruido es la especificación que sigue pagando.');
console.log('tras la frase: ' + d.slice(i + 60, i + 200).replace(/\s+/g, ' '));
// ningun boton en parrafo propio en las 10 secciones
const g = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'starter-studio');
let sueltos = 0;
s.sections.forEach((sec, idx) => {
  ['content', 'content_es'].forEach(k => {
    if (/<p><a href="\/guides\/[^"]+" class="guide-link-btn">/.test(sec[k])) { sueltos++; console.log('  suelto en sec[' + idx + '].' + k); }
  });
});
console.log('botones en parrafo propio: ' + sueltos + ' (debe ser 0 en los 10 nuevos)');
console.log('mojibake: ' + (d.match(/â‚¬|Â£|Â°/g) || []).length);
