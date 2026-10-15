// beat-making: Akai MPC Live III (188) y Akai MPC Sample (257) tienen tarjeta y
// veredicto pero ni columna en la tabla ni review propia. Se les da lo mismo que
// al resto, y se reescribe el veredicto del Live III, que comparaba con el Digitakt II
// (producto que no esta en esta guia) en lugar de con el MPC One G2 que si lo esta.
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gf = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gf, 'utf8'));
const g = guides.find(x => x.id === 'beat-making');
const P = JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
const arr = Array.isArray(P)?P:P.products;

// ---------- 1. tabla: 2 columnas nuevas al final ----------
const t = g.productTable;
const VALS = {
  'Best For': [
    ['All-in-one production and live performance', 'Produccion y directo todo en uno'],
    ['Portable sampling away from the desk', 'Muestreo portatil lejos del escritorio'],
  ],
  'Type': [
    ['Standalone MPC workstation', 'Estacion MPC autonoma'],
    ['Portable sampler / MPC', 'Sampler portatil / MPC'],
  ],
  'Connectivity': [
    ['USB-C, MIDI, built-in mic and speakers', 'USB-C, MIDI, microfono y altavoces integrados'],
    ['USB-C sampling, built-in mic and speaker', 'Muestreo por USB-C, microfono y altavoz integrados'],
  ],
};
const FILAS = Object.keys(VALS);
t.columns.push({ title: 'Akai MPC Live III', title_es: 'Akai MPC Live III' });
t.columns.push({ title: 'Akai MPC Sample', title_es: 'Akai MPC Sample' });
FILAS.forEach(lbl => {
  const r = t.rows.find(x => x.label === lbl);
  if (!r) { console.log('!! no existe la fila "' + lbl + '"'); return; }
  const v = VALS[lbl];
  r.values.push({ value: v[0][0], value_es: v[0][1] });
  r.values.push({ value: v[1][0], value_es: v[1][1] });
});
console.log('tabla: ' + t.columns.length + ' columnas | filas alineadas: ' + t.rows.every(r=>r.values.length===t.columns.length));

// ---------- 2. quitar 188 y 257 de la seccion 0 ----------
g.sections[0].products = (g.sections[0].products||[]).filter(p => p !== 188 && p !== 257);
console.log('seccion 0 products ahora: ' + JSON.stringify(g.sections[0].products));

// ---------- 3. reviews propias ----------
const NUEVAS = [
  {
    heading: 'Akai MPC Live III: The Flagship That Also Performs',
    heading_es: 'Akai MPC Live III: el insignia que además toca en directo',
    products: [188],
    content: 'The MPC Live III is the top of the Akai range and the only one here built for standing up and playing. Eight cores and 8 GB of RAM leave headroom for the heaviest project you will ever open, and the new MPCe pads read three dimensions of pressure, so you can get velocity, aftertouch and pressure from the same hit. Clip launching turns it into a grid for arranging live, and Pro Stems Separation pulls apart a finished mix when you want to sample your own bounce. There is a rechargeable battery inside and it ships with speakers and a microphone, so the only thing it still needs from you is a power outlet eventually. If your beats have to survive a stage, this is the machine that does both jobs in one box.',
    content_es: 'El MPC Live III es la cima de la gama Akai y el único de aquí pensado para tocarse de pie. Ocho núcleos y 8 GB de RAM dejan margen para el proyecto más pesado que vas a abrir nunca, y los nuevos pads MPCe leen tres dimensiones de presión, así que sacas velocidad, aftertouch y presión del mismo golpe. El clip launching lo convierte en una rejilla para ordenar en directo, y Pro Stems Separation separa un mix terminado cuando quieras samplear tu propio bounce. Lleva batería recargable dentro y sale con altavoces y micrófono, así que lo único que aún te pediría es un enchufe. Si tus beats tienen que sobrevivir a un escenario, esta es la máquina que hace los dos trabajos en la misma caja.'
  },
  {
    heading: 'Akai MPC Sample: The Beat Machine That Fits in a Bag',
    heading_es: 'Akai MPC Sample: la máquina de beats que cabe en un bolso',
    products: [257],
    content: 'The MPC Sample strips the Akai workflow down to what survives on a bus, a park bench or a plane. You get the classic MPC60-style layout on sixteen pads, a 2.4-inch colour screen, a built-in microphone and speaker, and sixty effect types spread across four FX processors. The rechargeable battery gives roughly five hours, which is enough for a long session away from a socket. What makes it genuinely useful rather than a toy is the USB-C sampling: point it at a phone or tablet and it records straight in, so an idea captured on the street is the same project by the time you sit down. Over 100 factory kits cover the common ground before you build anything of your own.',
    content_es: 'El MPC Sample recorta el flujo de Akai a lo que cabe en un bus, un banco de un parque o un avión. Tienes la distribución clásica estilo MPC60 en dieciséis pads, pantalla a color de 2,4 pulgadas, micrófono y altavoz integrados, y sesenta tipos de efecto repartidos en cuatro procesadores FX. La batería recargable da unas cinco horas, suficiente para una sesión larga lejos de un enchufe. Lo que lo hace útil de verdad y no un juguete es el muestreo por USB-C: apúntalo a un móvil o una tablet y graba directo, así que una idea capturada en la calle es el mismo proyecto cuando te sientes. Más de 100 kits de fábrica cubren lo habitual antes de que construyas nada tuyo.'
  },
];
// insertar despues de la seccion del MPC One G2 (indice 0)
g.sections.splice(1, 0, NUEVAS[0], NUEVAS[1]);
console.log('reviews anadidas: 2 | secciones ahora: ' + g.sections.length);

// ---------- 4. reescribir el veredicto del MPC Live III ----------
const v = g.verdictProsCons.find(x => /MPC Live III/i.test(x.name||x.title));
if (v) {
  v.pros = [
    'Standalone all-in-one: it records, mixes and performs with no computer in the room',
    'Eight cores and 8 GB of RAM leave real headroom for dense projects',
    'MPCe pads read pressure as well as velocity, so one hit carries more expression',
    'Rechargeable battery plus built-in speakers and microphone make it genuinely portable',
    'Clip launching and Pro Stems Separation cover both performing and sampling your own work'
  ];
  v.cons = [
    'Costs far more than the MPC One G2, and the One already covers most home beat-making',
    'Large and heavy for a bag, unlike the MPC Sample',
    'MPC3 OS takes longer to learn than a plain sampler or a groovebox',
    'The touchscreen is fiddly for fast live triggering compared with pads alone',
    'Battery is fine for a set but not a marathon session away from power'
  ];
  v.pros_es = [
    'Todo en uno y autónomo: graba, mezcla y toca sin ordenador en la sala',
    'Ocho núcleos y 8 GB de RAM dejan margen real para proyectos densos',
    'Los pads MPCe leen presión además de velocidad, así que un golpe lleva más expresión',
    'Batería recargable más altavoces y micrófono integrados lo hacen realmente portátil',
    'El clip launching y Pro Stems Separation cubren tanto tocar como samplear tu propio trabajo'
  ];
  v.cons_es = [
    'Cuesta mucho más que el MPC One G2, y el One ya cubre casi todo el beat-making doméstico',
    'Grande y pesado para un bolso, al contrario que el MPC Sample',
    'MPC3 OS tarda más en aprenderse que un sampler simple o una groovebox',
    'La pantalla táctil es incómoda para disparar rápido en directo frente a los pads solos',
    'La batería sobra para una tanda, pero no para una marathon sin corriente'
  ];
  console.log('veredicto del MPC Live III reescrito: ya no menciona el Digitakt II ni Elektron');
}

fs.writeFileSync(gf, JSON.stringify(guides, null, 2), 'utf8');

// ---------- verificacion ----------
console.log('\n--- verificacion ---');
console.log('columnas: ' + t.columns.length + ' -> ' + t.columns.map(c=>c.title).join(' | '));
console.log('filas: ' + t.rows.length + ' | todas alineadas: ' + t.rows.every(r=>r.values.length===t.columns.length));
const ids = new Set();
(g.featuredProducts||[]).forEach(i=>ids.add(i));
g.sections.forEach(s=>(s.products||[]).forEach(i=>ids.add(i)));
console.log('productos en la guia: ' + ids.size + ' | veredictos: ' + g.verdictProsCons.length + ' | reviews: ' + g.sections.filter(s=>(s.products||[]).length).length);
console.log('Digitakt/Elektron en el texto de la guia: ' + ((JSON.stringify(g).match(/Digitakt|Elektron/gi)||[]).length));
const cjk = (JSON.stringify(g).match(/[\u4e00-\u9fff]/g)||[]);
console.log('CJK: ' + (cjk.length ? [...new Set(cjk)].join('') : 'ninguno'));