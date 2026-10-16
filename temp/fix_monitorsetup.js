const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'monitor-setup');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
// SEC0
swap('Una configuración correcta toma una tarde y da resultados en cada mezcla', 'Una configuración correcta lleva una tarde y da resultados en cada mezcla');
swap('Forma primero un triángulo equilátero. Tu cabeza y los dos monitores deben estar en los puntos de un triángulo de lados iguales',
  'Empieza formando un triángulo equilátero: tu cabeza y los dos monitores deben ocupar los vértices de un triángulo de lados iguales');
swap('Saca los monitores de la pared. Los altavoces con puerto trasero necesitan espacio para respirar detrás',
  'Separa los monitores de la pared: los altavoces con puerto trasero necesitan aire detrás');
swap('Si tu escritorio debe estar contra la pared, elige modelos con puerto frontal o adelanta los altavoces al borde del escritorio para reducir la acumulación de graves de la pared',
  'Si tu escritorio debe estar contra la pared, elige modelos con puerto frontal o acerca los altavoces al borde del escritorio para reducir la acumulación de graves que provoca la pared');
swap('Las almohadillas de aislamiento y las cuñas de espuma baratas hacen el trabajo y son la actualización más barata de tu monitoreo',
  'Las almohadillas de aislamiento y las cuñas de espuma baratas hacen el trabajo y son la actualización más barata de tu monitorización');
swap('y luego ejecuta cualquier DSP incorporado o corrección por software para dominar la sala',
  'y luego activa cualquier DSP incorporado o corrección por software para dominar la sala');
// SEC1
swap('Una configuración de monitoreo seria empieza con un altavoz que delata la sala antes de halagar la mezcla',
  'Una configuración de monitorización seria empieza con un altavoz que delata la sala antes de halagar la mezcla');
swap('Room Control recorta graves bajo 500 Hz (0, -2 o -4 dB) y High Trim ajusta agudos sobre 2 kHz (+2, 0 o -2 dB)',
  'Room Control recorta graves por debajo de 500 Hz (0, -2 o -4 dB) y High Trim ajusta agudos por encima de 2 kHz (+2, 0 o -2 dB)');
swap('déjalas a 30–50 cm de la pared, planifica soportes de verdad y añade tratamiento absorbente',
  'déjalas a 30–50 cm de la pared, planifica soportes en condiciones y añade tratamiento absorbente');
swap('el Yamaha HS8 sigue siendo la referencia para mezclar pensando en la traducción',
  'el Yamaha HS8 sigue siendo la referencia para mezclar con la traslación en mente');
// SEC2
swap('¿Escritorio pegado a la pared? Te presento el Focal Alpha 65 Evo', '¿Escritorio pegado a la pared? Este es el Focal Alpha 65 Evo');
swap('El Focal Alpha 65 Evo dispara su gran puerto laminar hacia delante', 'El Focal Alpha 65 Evo abre su gran puerto laminar hacia delante');
swap('El trato honesto. Un cono de 6,5 pulgadas mueve menos aire', 'Las pegas honestas: un cono de 6,5 pulgadas mueve menos aire');
swap('pero si tu sala obliga a pegar el escritorio a la pared, el Focal Alpha 65 Evo traduce mejor que cualquier rival con puerto trasero que pelee contra el límite',
  'pero si tu sala obliga a pegar el escritorio a la pared, el Focal Alpha 65 Evo se traslada mejor que cualquier rival con puerto trasero que luche contra sus límites');
// SEC3
swap('La mesa vibra y embarra los graves mientras sus reflexiones filtran los medios con efecto peine',
  'La mesa vibra y embarra los graves, mientras sus reflexiones aplican filtrado en peine a los medios');
swap('para tweeters exactos al nivel del oído', 'con los tweeters justo al nivel del oído');
swap('la capacidad de 35 kg traga cualquier nearfield', 'la capacidad de 35 kg aguanta cualquier nearfield');
swap('y la canalización interna ordena los cables', 'y el pasacables interno ordena los cables');
// SEC4
swap('y la huella de 200 × 255 mm llena escritorios pequeños', 'y la huella de 200 × 255 mm ocupa escritorios pequeños');
swap('Por unos $159–$195 el par, cuestan dinero de verdad, pero la mejora de imagen estéreo es inmediata',
  'Por unos $159–$195 el par no son baratos, pero la mejora de imagen estéreo es inmediata');
// SEC5
swap('el software de calibración remata el trabajo', 'el software de calibración redondea el trabajo');
swap('Sonarworks SoundID Reference mide tu sala y aplana la respuesta a ±0,5 dB', 'Sonarworks SoundID Reference mide tu sala y deja plana la respuesta a ±0,5 dB');
swap('Funciona con cualquier monitor — sin ataduras de marca — aunque ningún software rellena nulos profundos de modos de sala',
  'Funciona con cualquier monitor, sin depender de ninguna marca, aunque ningún software compensa nulos profundos de modos de sala');
swap('El compañero de medición de $79', 'Su compañero de medición de $79');
swap('omnidireccional 20 Hz–20 kHz y ADC interno 24-bit/48 kHz, sin interfaz necesaria',
  'omnidireccional de 20 Hz–20 kHz y ADC interno de 24 bits/48 kHz, sin interfaz necesaria');
swap('la herramienta de medición más honesta y barata que verá tu sala', 'la herramienta de medición más honesta y barata que pisará tu sala');
// SEC6
swap('aunque la espuma cede con cajas pesadas', 'aunque la espuma se hunde con cajas pesadas');
swap('Y cuando los monitores son verdaderos monstruos midfield, el Ultimate Support MS-100 (Par) carga 34 kg por soporte',
  'Y cuando los monitores son auténticos midfield, el Ultimate Support MS-100 (Par) soporta 34 kg por soporte');
swap('¿Cargas con monitores de tres vías de 15 kg? MS-100', '¿Arrastras monitores de tres vías de 15 kg? MS-100');
swap('Todos los demás: soportes más medición superan cambiar de herraje siempre',
  'Todos los demás lo superan siempre: soportes más medición antes que cambiar de herrajes');
// SEC7
swap('Un micrófono de medición USB de 79 $ que se enchufa y funciona', 'Un micrófono de medición USB de $79 que se enchufa y funciona');
swap('La contrapartida. Es una herramienta de medición, no un micrófono de grabación: plano, omnidireccional y completamente antimusical',
  'La contrapartida: es una herramienta de medición, no un micrófono de grabación; plana, omnidireccional y completamente aséptica');
swap('La precisión de una medición también depende de cuántas veces muevas el micrófono y promedies, no del micrófono: tres barridos ganan siempre a uno',
  'La precisión de una medición también depende de cuántas veces muevas el micrófono y promedies, no del micrófono: tres barridos le ganan siempre a uno solo');
// CONCLUSION
swap('La traducción es una cadena: el Yamaha HS8 dice la verdad hasta 38 Hz si respetas su puerto trasero con 30–50 cm de aire, mientras el Focal Alpha 65 Evo sigue traduciendo cuando el escritorio va pegado a la pared gracias a su puerto frontal',
  'Que una mezcla se traslade es una cadena: el Yamaha HS8 dice la verdad hasta 38 Hz si le das a su puerto trasero 30–50 cm de aire, mientras el Focal Alpha 65 Evo sigue trasladando bien cuando el escritorio va pegado a la pared gracias a su puerto frontal');
swap('Levanta cualquiera en Soportes de Monitor K&M 26722 (Unidad) — unos €78 por unidad — o desacopla en la mesa con el IsoAcoustics ISO-200 (Par) .',
  'Súbelos a unos soportes de monitor K&M 26722 (unidad, unos €78) o desacopla en la mesa con el IsoAcoustics ISO-200 (par).');
swap('Después mide: Sonarworks SoundID Reference con su micrófono calibrado, o el MiniDSP UMIK-1 de $79 con REW, aplanan lo que colocación y tratamiento no pueden',
  'Después mide: Sonarworks SoundID Reference con su micrófono calibrado, o el MiniDSP UMIK-1 de $79 con REW, dejan plano lo que colocación y tratamiento no pueden');
swap('El Genelec GLM Kit se queda en territorio solo-SAM', 'El Genelec GLM Kit se limita a territorio SAM');
swap('y el Ultimate Support MS-100 (Par) carga el hierro pesado por $599,99', 'y el Ultimate Support MS-100 (par) carga con los pesos pesados por $599,99');
swap('>Mejores Monitores de estudio</a>', '>Mejores monitores de estudio: guía completa para cada sala</a>');
swap('>Mejores Monitores de estudio Económicos</a>', '>Mejores monitores de estudio por menos de $500</a>');
swap('>ADAM S3H vs Focal Trio11 Be</a>', '>ADAM S3H vs Focal Trio11 Be: monitores de tres vías</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
