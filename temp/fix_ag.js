const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'adam-vs-genelec');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('son monitores de estudio de campo medio legendarios en los que los ingenieros profesionales confían para la mezcla crítica.',
  'son monitores de estudio de campo cercano legendarios en los que los ingenieros profesionales confían para la mezcla crítica.');
swap('El A7V introduce Voicings con tres perfiles de EQ distintos, permitiéndote cambiar entre el sonido clásico de Adam y respuestas más neutras',
  'El A7V introduce Voicings con tres perfiles de ecualización distintos, que permiten cambiar entre el sonido clásico de Adam y respuestas más neutras');
swap('ayudada por el puerto bass reflex frontal adecuado para colocaciones cercanas a la pared',
  'ayudada por el puerto frontal adecuado para colocaciones cercanas a la pared');
swap('Revisa el acondiciónamiento, la distancia de escucha', 'Revisa el acondicionamiento, la distancia de escucha');
swap('El tweeter de cinta del Adam A7V te da una imagen estéreo más tridimensional con aire y separación que hace que mezclar agudos sea cómodo. La guía de onda del Genelec 8040B ofrece una imagen central más localizada y precisa con recuperación de detalles implacable, más seca pero más precisa para la traducción.',
  'El tweeter de cinta del Adam A7V hace que mezclar agudos sea cómodo, con aire y separación. La guía de onda del Genelec 8040B ofrece una imagen central más localizada, más seca pero más precisa para la traducción.');
swap('muchos ingenieros reportan que los monitores Adam se sienten menos fatigantes', 'muchos ingenieros dicen que los monitores Adam se sienten menos fatigantes');
swap('sin el picor agresivo.', 'sin la aspereza agresiva.');
swap('Compara la A7V y la 8040B con otros favoritos', 'Compara el A7V y el 8040B con otros favoritos');
swap('>guía de los mejores monitores de estudio</a>', '>Mejores monitores de estudio: guía completa para cada sala</a>');
swap('>Mejores Monitores de estudio</a>', '>Mejores monitores de estudio: guía completa para cada sala</a>');
swap('>ADAM S3H vs Focal Trio11 Be</a>', '>ADAM S3H vs Focal Trio11 Be: monitores de tres vías</a>');
swap('>HS8 vs Rokit 7 G5</a>', '>HS8 vs Rokit 7 G5: ¿cuál es honesto para mezclar?</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
