const fs = require('fs');
const path = 'data/guides.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));
const guide = data.find(g => g.id === 'channel-strip-plugins');
if (!guide) { console.error('Guide not found'); process.exit(1); }

const products = [1069, 379, 1066, 1068, 1071, 1070];
const productMap = {};
const prodData = JSON.parse(fs.readFileSync('data/products.json','utf8'));
products.forEach(id => { productMap[id] = prodData.find(p=>p.id===id); });

const sections = guide.sections.slice(0,1); // keep intro

const sectionDefs = [
  {
    id: 1069,
    heading: 'Waves Scheps Omni Channel 2: The Hybrid Channel Strip With Interchangeable Modules',
    heading_es: 'Waves Scheps Omni Channel 2: el channel strip híbrido con módulos intercambiables',
    content: `<p><strong>Waves Scheps Omni Channel 2 packs an EQ, compressor, gate, and the signature Thump saturation into one modular window.</strong> Designed with Andrew Scheps, you can swap modules, choose between three compressors, and dial low-end weight with the Thump control. It stays light on CPU while giving you console-style workflow and modern flexibility.</p><p><strong>Best for mixers who want speed and character.</strong> The interchangeable modules let you build the perfect chain for each source without leaving the strip. Great for vocals, drums, and bass where instant tone matters.</p>`,
    content_es: `<p><strong>Waves Scheps Omni Channel 2 reúne EQ, compresor, gate y la saturación Thump en una ventana modular.</strong> Diseñado con Andrew Scheps, puedes intercambiar módulos, elegir entre tres compresores y añadir peso en graves con el control Thump. Mantiene un consumo ligero de CPU y ofrece flujo de consola con flexibilidad moderna.</p><p><strong>Ideal para mezclas rápidas con carácter.</strong> Los módulos intercambiables permiten armar la cadena perfecta para cada fuente sin salir del strip. Excelente para voces, batería y bajo donde el tono inmediato importa.</p>`
  },
  {
    id: 379,
    heading: 'Brainworx bx_console SSL 4000 E: Official SSL 4000 E Channel Strip With TMT',
    heading_es: 'Brainworx bx_console SSL 4000 E: channel strip oficial de SSL 4000 E con TMT',
    content: `<p><strong>The bx_console SSL 4000 E is officially licensed by Solid State Logic and recreates the 72-channel E Series desk.</strong> Tolerance Modeling Technology gives each instance subtle channel-to-channel variation like real hardware. You get the classic SSL EQ, dynamics, and filters in one window.</p><p><strong>Best for purists chasing the real SSL punch.</strong> The aggressive midrange, tight low end, and that famous SSL glue work wonders on drums, vocals, and mix bus. If you want the sound of a real SSL desk without UAD hardware, this is the closest.</p>`,
    content_es: `<p><strong>El bx_console SSL 4000 E está oficialmente licenciado por Solid State Logic y recrea la mesa E Series de 72 canales.</strong> La tecnología Tolerance Modeling Technology da a cada instancia variaciones sutiles entre canales como el hardware real. Obtienes el EQ, dinámica y filtros clásicos de SSL en una ventana.</p><p><strong>Ideal para puristas que buscan la pegada real de SSL.</strong> El midrange agresivo, el bajo ajustado y el pegamento SSL funcionan de maravilla en batería, voces y bus de mezcla. Si quieres el sonido de una consola SSL real sin hardware UAD, este es el más cercano.</p>`
  },
  {
    id: 1066,
    heading: 'Solid State Logic SSL Native Channel Strip 2: The Official Modern SSL Channel',
    heading_es: 'Solid State Logic SSL Native Channel Strip 2: el canal SSL moderno oficial',
    content: `<p><strong>SSL Native Channel Strip 2 is the company’s modern digital channel strip, built on current factory DSP.</strong> It offers anti-cramping EQ, an Over-Easy compressor, and a clean, clinical sound ideal for pop and EDM.</p><p><strong>Best for clean separation and modern mixes.</strong> The transparent top end and precise dynamics keep tracks tidy without vintage mud. Great for drums, synths, and buses that need control without color.</p>`,
    content_es: `<p><strong>SSL Native Channel Strip 2 es el channel strip digital moderno de la compañía, construido sobre DSP actual.</strong> Ofrece EQ anti-cramping, compresor Over-Easy y un sonido limpio e ideal para pop y EDM.</p><p><strong>Ideal para separación limpia y mezclas modernas.</strong> El brillo transparente y la dinámica precisa mantienen las pistas ordenadas sin barro vintage. Excelente para batería, sintetizadores y buses que necesitan control sin color.</p>`
  },
  {
    id: 1068,
    heading: 'Universal Audio UAD API Vision Channel Strip: API 2500-Style Punch and Speed',
    heading_es: 'Universal Audio UAD API Vision Channel Strip: golpe y velocidad estilo API 2500',
    content: `<p><strong>UAD API Vision Channel Strip models the API 2500 bus compressor character with Proportional Q EQ and fast VCA dynamics.</strong> Unison preamp technology lets you track through the emulation with real input impedance.</p><p><strong>Best for drums and guitars that need forward punch.</strong> The aggressive American midrange and transient speed make drums snap and guitars cut through dense mixes. Perfect for rock, pop, and aggressive productions.</p>`,
    content_es: `<p><strong>El UAD API Vision Channel Strip modela el carácter del compresor API 2500 con EQ Proportional Q y dinámica VCA rápida.</strong> La tecnología Unison permite grabar a través de la emulación con impedancia de entrada real.</p><p><strong>Ideal para baterías y guitarras que necesitan pegada frontal.</strong> El midrange americano agresivo y la velocidad de transitorios hacen que la batería corte y las guitarras perforen mezclas densas. Perfecto para rock, pop y producciones agresivas.</p>`
  },
  {
    id: 1071,
    heading: 'Waves Scheps 73: Neve 1073 Character With Scheps’ Air Band',
    heading_es: 'Waves Scheps 73: carácter Neve 1073 con banda Air de Scheps',
    content: `<p><strong>Waves Scheps 73 captures the transformer behavior of the legendary Neve 1073 with Andrew Scheps’ tweaks.</strong> You get the familiar Neve color plus a 12 kHz Air band and Mid-Side processing for three-dimensional mixes.</p><p><strong>Best for vocals and instruments that need warmth with clarity.</strong> The harmonic saturation adds body, while the Air band opens the top end without harshness. Great for tracking and mixing with an analog soul.</p>`,
    content_es: `<p><strong>Waves Scheps 73 captura el comportamiento del transformador del legendario Neve 1073 con ajustes de Andrew Scheps.</strong> Obtienes el color Neve familiar más una banda Air de 12 kHz y procesamiento Mid-Side para mezclas tridimensionales.</p><p><strong>Ideal para voces e instrumentos que necesitan calidez con claridad.</strong> La saturación armónica añade cuerpo, mientras la banda Air abre el extremo superior sin dureza. Excelente para grabación y mezcla con alma analógica.</p>`
  },
  {
    id: 1070,
    heading: 'Waves Magma Tube Channel Strip: Golden-Era Tube Saturation in Three Knobs',
    heading_es: 'Waves Magma Tube Channel Strip: saturación de tubo de era dorada en tres perillas',
    content: `<p><strong>Waves Magma Tube Channel Strip condenses vintage tube character into an intuitive three-knob workflow.</strong> Asymmetric drive and optical compression give you thick harmonic saturation and smooth leveling.</p><p><strong>Best for adding warmth to sterile digital recordings.</strong> Use it on vocals, bass, and drums to inject analog life quickly. The simple interface makes it easy to find sweet spots under pressure.</p>`,
    content_es: `<p><strong>Waves Magma Tube Channel Strip condensa el carácter de tubo vintage en un flujo intuitivo de tres perillas.</strong> El drive asimétrico y la compresión óptica ofrecen saturación armónica gruesa y nivelación suave.</p><p><strong>Ideal para añadir calidez a grabaciones digitales estériles.</strong> Úsalo en voces, bajo y batería para inyectar vida analógica rápidamente. La interfaz simple facilita encontrar puntos dulces bajo presión.</p>`
  }
];

sectionDefs.forEach(def => {
  sections.push({
    heading: def.heading,
    heading_es: def.heading_es,
    content: def.content,
    content_es: def.content_es,
    products: [def.id],
    verdict: '',
    verdict_es: '',
    pros: [],
    pros_es: [],
    cons: [],
    cons_es: [],
    specs: {}
  });
});

guide.sections = sections;

// Update productTable rows
const pt = guide.productTable;
const bestFor = [
  {value:'Hybrid modular channel strip with Thump saturation', value_es:'Channel strip modular híbrido con saturación Thump'},
  {value:'Official SSL 4000 E console with TMT', value_es:'Consola SSL 4000 E oficial con TMT'},
  {value:'Modern SSL digital channel strip', value_es:'Channel strip digital moderno SSL'},
  {value:'API-style punch and Unison preamp', value_es:'Pegada estilo API y previo Unison'},
  {value:'Neve 1073 color with Air band and M/S', value_es:'Color Neve 1073 con banda Air y M/S'},
  {value:'Vintage tube saturation and optical compression', value_es:'Saturación de tubo vintage y compresión óptica'}
];
const typeVals = [
  {value:'Hybrid channel strip', value_es:'Channel strip híbrido'},
  {value:'Console emulation channel strip', value_es:'Emulación de consola channel strip'},
  {value:'Digital channel strip', value_es:'Channel strip digital'},
  {value:'Console emulation channel strip', value_es:'Emulación de consola channel strip'},
  {value:'Console emulation channel strip', value_es:'Emulación de consola channel strip'},
  {value:'Tube channel strip', value_es:'Channel strip de tubo'}
];
const standout = [
  {value:'Interchangeable modules + Thump saturation', value_es:'Módulos intercambiables + saturación Thump'},
  {value:'72 TMT channels, authentic SSL EQ/dynamics', value_es:'72 canales TMT, EQ/dinámica SSL auténtica'},
  {value:'Anti-cramping EQ, Over-Easy compressor', value_es:'EQ anti-cramping, compresor Over-Easy'},
  {value:'Proportional Q EQ, fast VCA, Unison preamp', value_es:'EQ Proportional Q, VCA rápido, previo Unison'},
  {value:'Neve transformer emulation + 12kHz Air band', value_es:'Emulación de transformador Neve + banda Air 12kHz'},
  {value:'Asymmetric tube drive, optical compressor', value_es:'Drive de tubo asimétrico, compresor óptico'}
];

function updateRow(label, values) {
  let row = pt.rows.find(r=>r.label===label);
  if (!row) { row = {label, label_es:label, values:[]}; pt.rows.push(row); }
  row.values = values;
}
updateRow('Best For', bestFor.map(v=>({value:v.value, value_es:v.value_es})));
updateRow('Type', typeVals.map(v=>({value:v.value, value_es:v.value_es})));
updateRow('Standout Feature', standout.map(v=>({value:v.value, value_es:v.value_es})));

// Update verdictProsCons
guide.verdictProsCons = products.map(id => {
  const p = productMap[id];
  const names = {
    1069:{name:'Waves Scheps Omni Channel 2', name_es:'Waves Scheps Omni Channel 2'},
    379:{name:'Brainworx bx_console SSL 4000 E', name_es:'Brainworx bx_console SSL 4000 E'},
    1066:{name:'Solid State Logic SSL Native Channel Strip 2', name_es:'Solid State Logic SSL Native Channel Strip 2'},
    1068:{name:'Universal Audio UAD API Vision Channel Strip', name_es:'Universal Audio UAD API Vision Channel Strip'},
    1071:{name:'Waves Scheps 73', name_es:'Waves Scheps 73'},
    1070:{name:'Waves Magma Tube Channel Strip', name_es:'Waves Magma Tube Channel Strip'}
  }[id];
  const pros = [
    'Modular design offers fast workflow',
    'Authentic analog character',
    'Low CPU footprint',
    'Versatile EQ and dynamics',
    'Proven by industry pros'
  ];
  const pros_es = [
    'Diseño modular ofrece flujo rápido',
    'Carácter analógico auténtico',
    'Huella de CPU baja',
    'EQ y dinámica versátiles',
    'Probado por profesionales'
  ];
  const cons = [
    'Can be overwhelming for beginners',
    'Needs quality source to shine',
    'Character may not suit all genres',
    'Multiple options can slow decisions'
  ];
  const cons_es = [
    'Puede abrumar a principiantes',
    'Necesita fuente de calidad para brillar',
    'El carácter puede no encajar en todos los géneros',
    'Muchas opciones pueden ralentizar decisiones'
  ];
  return { name:names.name, name_es:names.name_es, pros, pros_es, cons:cons.slice(0,4), cons_es:cons_es.slice(0,4) };
});

// Update featuredSnippet FAQ
guide.featuredSnippet.faq_q1_en = 'Which channel strip plugin is best for hybrid mixing with modular EQ and compression?';
guide.featuredSnippet.faq_a1_en = 'Waves Scheps Omni Channel 2 is the best hybrid strip with interchangeable modules and Thump saturation for fast, characterful mixing.';
guide.featuredSnippet.faq_q1_es = '¿Qué plugin de channel strip es mejor para mezcla híbrida con EQ y compresión modular?';
guide.featuredSnippet.faq_a1_es = 'Waves Scheps Omni Channel 2 es el mejor strip híbrido con módulos intercambiables y saturación Thump para mezcla rápida con carácter.';
guide.featuredSnippet.faq_q2_en = 'Is the Brainworx bx_console SSL 4000 E a true SSL console emulation?';
guide.featuredSnippet.faq_a2_en = 'Yes. It is officially licensed by SSL and uses TMT to recreate channel-to-channel variation of the 4000 E desk.';
guide.featuredSnippet.faq_q2_es = '¿Es el Brainworx bx_console SSL 4000 E una verdadera emulación de consola SSL?';
guide.featuredSnippet.faq_a2_es = 'Sí. Está oficialmente licenciado por SSL y usa TMT para recrear la variación entre canales de la mesa 4000 E.';

fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log('Guide updated');
