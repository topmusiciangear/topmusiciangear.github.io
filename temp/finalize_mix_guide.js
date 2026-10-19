const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'best-headphones-for-mixing');

const orden = ['Audeze MM-500', 'Sennheiser HD 490 Pro Plus', 'Neumann NDH 30',
  'Sennheiser HD 600', 'Beyerdynamic DT 990 Pro', 'Beyerdynamic DT 770 Pro',
  'Audio-Technica ATH-M50x', 'Sony MDR-7506'];

// --- 1) Columnas ---
g.productTable.columns = orden.map(n => ({ title: n, title_es: n }));

// --- 2) Filas: valores verificados para los 8 ---
const datos = {
  'Best For': [
    'Flagship reference mixing', 'Modern reference mixing', 'Neutral studio mixing',
    'Sweet-spot flat mixing reference', 'Open-back budget mixing',
    'Closed-back mixing & tracking', 'Portable all-purpose mixing', 'Broadcast editing & tracking'],
  'Type': ['Open-back', 'Open-back', 'Open-back', 'Open-back', 'Open-back', 'Closed-back', 'Closed-back', 'Closed-back'],
  'Driver Size': ['90 mm planar', '38 mm', '38 mm', '42 mm', '45 mm', '45 mm', '45 mm', '40 mm'],
  'Impedance': ['18 Ω', '130 Ω', '100 Ω', '300 Ω', '250 Ω', '80 Ω', '38 Ω', '63 Ω'],
  'Sensitivity': ['100 dB', '105 dB', '114 dB', '97 dB', '96 dB', '96 dB', '99 dB', '106 dB'],
  'Frequency Response': ['5 Hz – 50 kHz', '5 Hz – 36 kHz', '5 Hz – 30 kHz', '12 Hz – 40 kHz',
    '5 Hz – 35 kHz', '5 Hz – 35 kHz', '15 Hz – 28 kHz', '10 Hz – 20 kHz'],
  'Cable': ['Dual mini-XLR to 6.35 mm', 'Detachable (2 included)', 'Single-sided, 3 m',
    'Detachable (single-sided)', '3 m coiled, fixed', '3 m straight, fixed', 'Detachable (3 included)', '3 m coiled, fixed'],
  'Weight': ['495 g', '260 g', '354 g', '260 g', '250 g', '270 g', '285 g', '230 g'],
};

const etiquetas = {
  'Best For': 'Ideal para',
  'Type': 'Tipo',
  'Driver Size': 'Tamaño del Driver',
  'Impedance': 'Impedancia',
  'Sensitivity': 'Sensibilidad',
  'Frequency Response': 'Respuesta de frecuencia',
  'Cable': 'Cable',
  'Weight': 'Peso',
};

g.productTable.rows = Object.entries(datos).map(([label, vals]) => ({
  label,
  label_es: etiquetas[label] || label,
  values: vals.map(v => ({ value: v, value_es: v })),
}));

// --- 3) Veredictos individuales ---
function vpc(name, pros, prosEs, cons, consEs) {
  return { name, name_es: name, pros, pros_es: prosEs, cons, cons_es: consEs };
}

g.verdictProsCons = [
  vpc('Audeze MM-500',
    ['Planar magnetic drivers co-designed with Grammy-winning mix engineer Manny Marroquin',
     'Reference-class clarity used on Kendrick Lamar\u2019s #1 album at Larrabee Studios',
     'Wide, accurate soundstage with precise instrument placement for panning',
     'Machined aluminium and spring steel chassis, lighter than the LCD-X'],
    ['Drivers planares magnéticos diseñados con el ingeniero de mezcla Manny Marroquin',
     'Claridad de referencia usada en el álbum #1 de Kendrick Lamar en Larrabee Studios',
     'Escenario sonoro amplio y preciso, ideal para decidir paneos',
     'Chasis de aluminio mecanizado y acero, más ligero que el LCD-X'],
    ['At $1,699 it is the most expensive pair in this guide',
     'Open-back leaks sound, so it is not usable for tracking',
     'Bulky at 495 g for very long sessions',
     'Legacy product: Audeze lists it as no longer available new'],
    ['A $1.699 es el más caro de la guía',
     'Al ser abierto fuga sonido: no sirve para grabar',
     'Voluminoso, 495 g, para sesiones muy largas',
     'Producto legacy: Audeze ya no lo vende nuevo']),
  vpc('Neumann NDH 30',
    ['The headphone equivalent of Neumann\u2019s studio monitors, with TEC Award 2023',
     'Outstanding detail resolution and high-precision stereo imaging',
     'Moderate impedance drives far more easily than classic high-impedance pairs',
     'Razor-sharp localization for surgical panning decisions'],
    ['El equivalente en auriculares de los monitores Neumann, ganador del TEC Award 2023',
     'Resolución de detalles excepcional e imagen estéreo de alta precisión',
     'Impedancia moderada: se alimenta fácilmente desde una interfaz',
     'Localización afilada para decisiones de paneo quirúrgicas'],
    ['A serious investment at $699',
     'Open-back leaks sound, so it is not for tracking with a live mic',
     'Requires quality amplification to fully resolve its detail',
     'Bulky earcups trap heat in warm rooms'],
    ['Una inversión seria, $699',
     'El diseño abierto fuga sonido: no sirve para grabar',
     'Pide amplificación de calidad para resolver todo su detalle',
     'Copas voluminosas que dan calor en salas calurosas']),
  // mantener los existentes
  ...g.verdictProsCons.filter(v => !/MM-500|NDH 30/i.test(v.name)),
];

console.log('Veredictos: ' + g.verdictProsCons.length + ' entradas');

// --- 4) Secciones nuevas ---
const secMM = {
  heading: 'Is the Audeze MM-500 the Best Headphones for Mixing?',
  heading_es: '¿Son los Audeze MM-500 los mejores auriculares para mezclar?',
  content: '<p><strong>Audeze built the MM-500 with mix engineer Manny Marroquin, and it shows in the translation.</strong> The 90 mm Fluxor planar drivers keep the low end extended and the top end straight, so mixes made on these hold up on speakers far better than on the average headphone. The chassis is machined aluminium and spring steel, lighter than the LCD-X it resembles, and the open-back design breathes like a treated room.</p><p>The honest limit is the format: open-back leaks sound, so it will never track, and at $1,699 it is the most expensive pair here. Audeze lists the MM-500 as a legacy product, so availability can be patchy. For a mixer who wants one reference that behaves like a nearfield monitor, it is the top of this guide.</p>',
  content_es: '<p><strong>Audeze diseñó el MM-500 con el ingeniero de mezcla Manny Marroquin, y eso se nota en la traducción.</strong> Los drivers planares Fluxor de 90 mm mantienen los graves extendidos y los agudos rectos, así que las mezclas hechas aquí se sostienen en altavoces mucho mejor que en un auricular medio. El chasis de aluminio mecanizado y acero es más ligero que el LCD-X al que se parece, y el diseño abierto respira como una sala tratada.</p><p>El límite honesto es el formato: al ser abierto fuga sonido, así que nunca grabará, y a $1.699 es el más caro de la guía. Audeze lo lista como producto legacy, así que la disponibilidad puede ser irregular. Para un mezclador que quiere una referencia que se comporte como un monitor de campo cercano, es el tope de esta guía.</p>'
};

const secNDH = {
  heading: 'Is the Neumann NDH 30 the Portable Mastering Room?',
  heading_es: '¿Es el Neumann NDH 30 la sala de masterización portátil?',
  content: '<p><strong>Neumann put its monitor voicing into an open-back and called it a day.</strong> The NDH 30 resolves detail, imaging and depth the way KH-line speakers do, making it the portable mastering reference for engineers who already trust the brand. High-precision stereo placement survives translation to speakers.</p><p>Premium money buys premium demands: it wants a good amp and a quiet room, at 354 g it is no featherweight, and the silver finish shows studio wear. It will not track or commute. For mastering engineers who want their monitor wall in a headphone, it is the endgame open-back.</p>',
  content_es: '<p><strong>Neumann volcó su tono de monitor en un auricular abierto y listo.</strong> El NDH 30 resuelve detalle, imagen y profundidad como los altavoces de la línea KH, lo que lo convierte en la referencia portátil de masterización para ingenieros que ya confían en la marca. La colocación estéreo de alta precisión sobrevive a la traducción a altavoces.</p><p>El precio premium pide exigencias premium: quiere un buen amplificador y una sala tranquila, con 354 g no es un plumazo y el acabado plateado muestra el desgaste de estudio. No grabará ni servirá para moverse. Para ingenieros de masterización que quieren su pared de monitores en un auricular, es el abierto definitivo.</p>'
};

g.sections = [secMM, secNDH, ...g.sections];

// --- 5) Veredicto y conclusion ---
g.verdict = 'The Audeze MM-500 is the flagship reference for mixers who want nearfield-monitor behaviour in a headphone. The Neumann NDH 30 is the portable mastering room. The Sennheiser HD 490 Pro Plus is the modern reference pick, the Sennheiser HD 600 is the sweet-spot flat reference, the Beyerdynamic DT 990 Pro is the open-back budget champion, the DT 770 Pro is the closed-back workhorse, the Audio-Technica ATH-M50x is the all-purpose pick, and the Sony MDR-7506 is the broadcast editing standard.';
g.verdict_es = 'Los Audeze MM-500 son la referencia insignia para quien quiere el comportamiento de un monitor de campo cercano en un auricular. Los Neumann NDH 30 son la sala de masterización portátil. Los Sennheiser HD 490 Pro Plus son la referencia moderna, los Sennheiser HD 600 son la referencia plana de punto ideal, los Beyerdynamic DT 990 Pro son el campeón abierto de presupuesto, los DT 770 Pro son el caballo de batalla cerrado, los Audio-Technica ATH-M50x son la opción todoterreno y los Sony MDR-7506 son el estándar de edición broadcast.';

g.conclusion = '<p>The Audeze MM-500 is the top of this guide: a reference co-designed with Manny Marroquin whose planar drivers make mixes translate, and the Neumann NDH 30 is the mastering room you can pack. For a modern reference at a lower price, the Sennheiser HD 490 Pro Plus is the pick, while the Sennheiser HD 600 remains the sweet-spot flat reference. The Beyerdynamic DT 990 Pro is the open-back budget champion, the DT 770 Pro is the closed-back workhorse, the Audio-Technica ATH-M50x is the one pair for everything, and the Sony MDR-7506 is the broadcast editing standard.</p>';
g.conclusion_es = '<p>Los Audeze MM-500 son el tope de esta guía: una referencia diseñada con Manny Marroquin cuyos drivers planares hacen que las mezclas se traduzcan, y los Neumann NDH 30 son la sala de masterización que puedes llevarte. Para una referencia moderna a menor precio, los Sennheiser HD 490 Pro Plus son la elección, mientras que los Sennheiser HD 600 siguen siendo la referencia plana de punto ideal. Los Beyerdynamic DT 990 Pro son el campeón abierto de presupuesto, los DT 770 Pro el caballo de batalla cerrado, los Audio-Technica ATH-M50x la opción todoterreno y los Sony MDR-7506 el estándar de edición broadcast.</p>';

fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('Guia actualizada: ' + g.productTable.columns.length + ' productos, ' + g.sections.length + ' secciones');
console.log('Veredicto y conclusion actualizados.');
