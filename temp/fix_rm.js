const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'rme-vs-motu');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('Sabemos que estas interfaces juegan en ligas de precio totalmente distintas', 'Está claro que estas interfaces juegan en ligas de precio totalmente distintas');
swap('ofrece una estabilidad de reloj que rivaliza con los master clocks externos de alta gama, haciendo que las grabaciones suenen más limpias',
  'ofrece una estabilidad de reloj que rivaliza con los master clocks externos de alta gama y hace que las grabaciones suenen más limpias');
swap('Los 2 x 12 canales analógicos y la expansión ADAT (expandible a 20 canales)', 'Los 12 x 12 canales totales y la expansión ADAT (expandible a 20 canales)');
swap('ofrece 120dB de rango dinámico', 'ofrece 120 dB de rango dinámico');
swap('La función de loopback por hardware enruta el audio de la computadora', 'La función de loopback por hardware encamina el audio del ordenador');
swap('para streaming, podcasting y enseñanza online sin enrutamiento de software complejo',
  'para streaming, podcasting y enseñanza online sin encaminamiento por software complejo');
swap('La M2 ofrece el 90% de lo que puede hacer una interfaz, convirtiéndola', 'La M2 ofrece el 90% de lo que puede hacer una interfaz premium, convirtiéndola');
swap('la FireFace 800 de 2004 todavía funciona en Windows 11', 'la Fireface 800 de 2004 todavía funciona en Windows 11');
swap('pero no igualan el RTL de menos de 3ms de RME en tamaños de buffer de 48kHz',
  'pero no igualan el RTL de menos de 3 ms de RME a 48 kHz');
swap('En Mac, la MOTU M2 es casi perfecta: es class-compliant en Mac (conectas y grabas), pero en Windows los drivers propios de RME son necesarios para rendimiento de baja latencia completo.',
  'En Mac, la MOTU M2 es casi perfecta: es class-compliant (conectas y grabas). La Babyface, en cambio, usa drivers propios de RME en ambos sistemas para un rendimiento completo de baja latencia.');
swap('y soluciónarlo exige ajustar búferes, puertos USB', 'y solucionarlo exige ajustar búferes, puertos USB');
swap('Mide ambas contra el mercado de interfaces más amplio en nuestra guía de la mejor interfaz de audio',
  'Compara ambas con el mercado de interfaces más amplio en nuestra guía de la mejor interfaz de audio');
swap('>guía de la mejor interfaz de audio</a>', '>Mejor interfaz de audio: guía completa para grabación casera</a>');
swap('>Mejor Interfaz de Audio para Grabación Casera</a>', '>Mejor interfaz de audio: guía completa para grabación casera</a>');
swap('>Apollo x16 vs Fireface UFX III</a>', '>Apollo X16 vs RME Fireface UFX III: DSP vs encaminamiento</a>');
swap('>Apollo Twin X Gen 2 vs Babyface Pro FS</a>', '>Apollo Twin X vs Babyface Pro FS: duelo de interfaces</a>');
g[g.indexOf(gg)] = JSON.parse(S);
// Titulo destino pro-interfaces: ruteo -> encaminamiento
const pi = g.find(x => x.id === 'pro-interfaces');
if (pi.title_es.includes('ruteo')) {
  pi.title_es = pi.title_es.split('ruteo').join('encaminamiento');
  console.log('titulo pro-interfaces actualizado: ' + pi.title_es);
}
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
