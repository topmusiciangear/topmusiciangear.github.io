const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = require(DIR + 'data/guides.json');
const g = G.find(x => x.id === 'best-beginner-electric-guitar');
g.sections.push({
  heading: 'Enya Nova Go Sonic: A Closer Look',
  heading_es: 'Enya Nova Go Sonic: análisis detallado',
  content: '<strong>The beginner guitar that refuses to need anything else.</strong> A carbon-fiber body immune to dry bedrooms and damp basements, with a built-in 10W speaker running four DSP presets from clean to lead. Bluetooth backing tracks, headphone practice and USB-C phone recording mean the first year of learning never waits on extra gear.</p><p>Against the Pacifica and Affinity it trades traditional tonewoods and upgrade paths for zero-friction practice: no amp to buy, no cables to trip on, ten-hour battery included. Beginners who practice daily on the couch will progress faster here than on a conventional guitar waiting for its amplifier.',
  content_es: '<strong>La guitarra de inicio que se niega a necesitar nada más.</strong> Cuerpo de fibra de carbono inmune a dormitorios secos y sótanos húmedos, con altavoz integrado de 10W y cuatro presets DSP de limpio a lead. Pistas por Bluetooth, práctica con auriculares y grabación USB-C al teléfono para que el primer año no espere equipo extra.</p><p>Frente a Pacifica y Affinity cambia maderas tradicionales y ruta de mejoras por práctica sin fricción: sin ampli que comprar, sin cables con que tropezar, diez horas de batería incluidas. Quien practica a diario en el sofá avanzará más rápido aquí que con una guitarra convencional esperando su amplificador.',
  products: [295]
});
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(G, null, 2));
console.log('added');