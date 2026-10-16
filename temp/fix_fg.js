const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'fender-guide');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('la American Ultra II Stratocaster con sus pastillas Noiseless es lo que elegiría para sesiones latinas profesionales, sin zumbido, sin ruido, solo un tono puro',
  'la American Ultra II Stratocaster con sus pastillas Noiseless es lo que elijo para sesiones latinas profesionales, sin zumbido, solo un tono puro');
swap('dos pastillas, tres perillas, un interruptor', 'dos pastillas, tres ruedas, un interruptor');
swap('ofrecen un sonido golpeado y presente que corta cualquier mezcla', 'ofrecen un sonido contundente y presente que corta cualquier mezcla');
swap('La CD-60S se adapta muy bien al sonido amplificado — genial para composición y fogatas',
  'La CD-60S es ligera y cómoda — genial para composición y fogatas');
swap('El contrapeso es peso y acceso: el cuerpo grueso cansa', 'La contrapartida es peso y acceso: el cuerpo grueso cansa');
swap('frente a las dobles recortadas con contornos vecinos', 'frente a las dobles cutaway con contornos vecinos');
swap('Y con 1.799 $ es un instrumento profesional;', 'Y con $1.799 es un instrumento profesional;');
swap('cubren a la mayoría de quien toca en el cuarto o el fin de semana', 'cubren a la mayoría de quienes tocan en el cuarto o el fin de semana');
swap('que deja que un bajista y un guitarrista rítmico entren en el mismo bolsillo', 'que deja que un bajista y un guitarrista rítmico encajen en la misma mezcla');
swap('no hay sensación usada, ni puente flojo, ni transistor de salida envejecido', 'no hay sensación usada ni puente flojo');
swap('Con 2.299 $ pagas unos 500 $ más que la American Professional II', 'Con $2.299 pagas unos $500 más que la American Professional II');
swap('una Pro II de 1.799 $ suena y toca igual de bien', 'una Pro II de $1.799 suena y toca igual de bien');
swap('mientras que las dos simples Alnico V dejan todo lo demás exactamente donde un Estrada de Strat lo espera',
  'mientras que las dos simples Alnico V dejan todo lo demás exactamente donde un purista de la Strat lo espera');
swap('Mástil Modern C de maple, radio de 9,5 pulgadas', 'Mástil Modern C de arce, radio de 9,5 pulgadas');
swap('Con 849 $ tiene precio de guitarra de escenario', 'Con $849 tiene precio de guitarra de escenario');
swap('Mástil Modern C de maple con bordes redondeados', 'Mástil Modern C de arce con bordes redondeados');
swap('El puente de tres sillines con de acero aguanta', 'El puente de tres sillines con sillines de acero aguanta');
swap('Aun así, con 849 $, la comparación no es con una Tele de 2.000 $:', 'Aun así, con $849, la comparación no es con una Tele de $2.000:');
swap('>guía de la mejor guitarra eléctrica</a>', '>Mejor guitarra eléctrica para cada guitarrista</a>');
swap('>guía de guitarra para principiantes</a>', '>Mejores guitarras para principiantes: guía para empezar</a>');
swap('>Mejores Guitarras Acústicas</a>', '>Mejores guitarras acústicas: Martin, Taylor y Gibson</a>');
swap('>Mejores Guitarras para Principiantes y Composición</a>', '>Mejores guitarras para principiantes: guía para empezar</a>');
swap('>Mejor Guitarra Eléctrica para Principiantes</a>', '>Mejores guitarras eléctricas para principiantes: qué comprar</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
