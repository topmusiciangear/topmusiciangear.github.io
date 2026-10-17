const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const gp = B + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gp, 'utf8'));
const G = id => guides.find(g => g.id === id);

// ---- titulos ES a sentence case ----
const TITULOS = {
  'best-audio-repair-plugins': ['Mejores Plugins de Reparación de Audio y Restauración de Ruido para Estudios Profesionales', 'Mejores plugins de reparación de audio y restauración de ruido para estudios profesionales'],
  'best-guitar-plugins': ['Mejores Plugins de Guitarra y Simuladores de Amplificador para Rock, Metal y Pop', 'Mejores plugins de guitarra y simuladores de amplificador para rock, metal y pop'],
  'best-midi-theory-plugins': ['Mejores Plugins de MIDI y Teoría Musical para Acelerar tu Flujo de Trabajo', 'Mejores plugins de MIDI y teoría musical para acelerar tu flujo de trabajo'],
  'best-multi-effects-pedals': ['Mejores pedales Multi-Efectos para guitarra', 'Mejores pedales multi-efectos para guitarra'],
  'best-piano-keyboard-vsts': ['Mejores VST de Piano y Teclado Virtual para Producción en Estudio', 'Mejores VST de piano y teclado virtual para producción en estudio'],
  'best-synth-vsts': ['Mejores VST de Sintetizador: Estándares para Productores Modernos', 'Mejores VST de sintetizador: estándares para productores modernos']
};
let n = 0;
Object.keys(TITULOS).forEach(id => {
  const g = G(id);
  const [viejo, nuevo] = TITULOS[id];
  if (!g) { console.log('guia no encontrada: ' + id); process.exit(1); }
  if (g.title_es !== viejo) { console.log('AVISO en ' + id + ': el titulo actual es "' + g.title_es + '" y no coincide con el esperado'); return; }
  g.title_es = nuevo;
  n++;
  console.log('titulo ' + id + ' (' + viejo.length + ' -> ' + nuevo.length + ' car.) -> ' + nuevo);
});

// ---- encabezados de seccion ES a sentence case ----
const SECCIONES = {
  'repitch-vs-melodyne': [
    ['Synchro Arts RePitch 2 Standard: Afinación Natural y Veloz Con Edición Multipista', 'Synchro Arts RePitch 2 Standard: afinación natural y veloz con edición multipista'],
    ['Melodyne: El Editor Quirúrgico Que Hace Que lo Perfecto Suene Natural', 'Melodyne: el editor quirúrgico que hace que lo perfecto suene natural']
  ],
  'best-audio-repair-plugins': [
    ['Baby Audio Smooth Operator Pro: Control de Resonancias Con Una Sola Perilla', 'Baby Audio Smooth Operator Pro: control de resonancias con una sola perilla'],
    ['Sonible smart:deess: El De-Esser con IA Que Escucha Antes de Actuar', 'Sonible smart:deess: el de-esser con IA que escucha antes de actuar'],
    ['Zynaptiq Unveil: El Procesador de De-Reverb Que Rescata Grabaciones en Vivo', 'Zynaptiq Unveil: el procesador de de-reverb que rescata grabaciones en vivo']
  ],
  'best-midi-theory-plugins': [
    ['Audiomodern Riffer 4: Melodías Generativas Que Se Mantienen en Tono', 'Audiomodern Riffer 4: melodías generativas que se mantienen en tono']
  ],
  'best-piano-keyboard-vsts': [
    ['MeldaProduction MeldwayGrand: Un Steinway D por Menos Que un Pedal', 'MeldaProduction MeldwayGrand: un Steinway D por menos que un pedal'],
    ['Arturia V Collection 11 Pro: 45 Teclados Vintage Desde Pianos Eléctricos Hasta Órganos Clásicos', 'Arturia V Collection 11 Pro: 45 teclados vintage desde pianos eléctricos hasta órganos clásicos'],
    ['XLN Audio Addictive Keys: El Piano de Cola de Estudio Que Cubre Pop, Lo-Fi y Cantautor', 'XLN Audio Addictive Keys: el piano de cola de estudio que cubre pop, lo-fi y cantautor'],
    ['Arturia Augmented GRAND PIANO: Donde un Gran Cola Se Encuentra Con el Sinte', 'Arturia Augmented GRAND PIANO: donde un gran cola se encuentra con el sinte']
  ],
  'best-synth-vsts': [
    ['Arturia Pigments 7: El Sintetizador Visual Que Reconfiguró Cómo Modelas el Sonido', 'Arturia Pigments 7: el sintetizador visual que reconfiguró cómo modelas el sonido'],
    ['Reveal Sound Spire: El Todoterreno del Trance Que Se Niega a Envejecer', 'Reveal Sound Spire: el todoterreno del trance que se niega a envejecer']
  ],
  'mixing-plugins': [
    ['Pro-Q 4: El EQ Quirúrgico Que Toda Mezcla Necesita', 'Pro-Q 4: el EQ quirúrgico que toda mezcla necesita']
  ],
  'vocal-plugins': [
    ['Smooth Operator Pro: Doma Voces Duras Con Una Perilla', 'Smooth Operator Pro: doma voces duras con una perilla']
  ],
  'vocalign-vs-revoice-pro': [
    ['Synchro Arts VocAlign 7 Pro: El Plugin Que Alinea Voces Dentro de tu DAW', 'Synchro Arts VocAlign 7 Pro: el plugin que alinea voces dentro de tu DAW']
  ]
};
let h = 0, fallos = [];
Object.keys(SECCIONES).forEach(id => {
  const g = G(id);
  if (!g) { fallos.push('guia no encontrada: ' + id); return; }
  SECCIONES[id].forEach(([viejo, nuevo]) => {
    const s = (g.sections || []).find(x => x.heading_es === viejo);
    if (!s) { fallos.push(id + ': encabezado no encontrado -> ' + viejo.slice(0, 50)); return; }
    s.heading_es = nuevo;
    h++;
  });
});
console.log('\nencabezados corregidos: ' + h);
if (fallos.length) { console.log('FALLOS:'); fallos.forEach(f => console.log('  ' + f)); console.log('\nNO se escribe el fichero (revisar fallos)'); process.exit(1); }
fs.writeFileSync(gp, JSON.stringify(guides, null, 2), 'utf8');
console.log('titulos corregidos: ' + n + ' | guides.json guardado');