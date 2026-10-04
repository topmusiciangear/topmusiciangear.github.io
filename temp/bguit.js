const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const G = require(F);
const g = G.find(x => x.id === 'beginner-guitar');
// 1. sections: 2 closer-looks + head-to-head
g.sections.push(
  {
    heading: 'Fender CN-60S Nylon: A Closer Look',
    heading_es: 'Fender CN-60S Nylon: análisis detallado',
    content: '<strong>Fender CN-60S Nylon</strong> — The hybrid for total comfort. Standout specs — Body Wood: Solid spruce top / mahogany back and sides; Neck: Narrow 43mm, rolled edges. On the plus side: Soft nylon strings with a narrow steel-string-style neck solve the wide-neck struggle for small hands and electric converts; Solid spruce top projects brightness and volume no laminate at this price can match. Watch out: Hybrid feel is neither traditional classical nor steel-string acoustic — purists should look elsewhere.',
    content_es: '<strong>Fender CN-60S Nylon</strong> — La híbrida para una comodidad total. Datos clave — Tapa: abeto sólido / fondo y aros de caoba; Mástil: estrecho de 43 mm, bordes redondeados. En el lado positivo: Cuerdas de nylon suaves con mástil estrecho estilo acústica que resuelve la lucha con el mástil ancho para manos pequeñas y quienes vienen de la eléctrica; La tapa sólida de abeto proyecta un brillo y volumen que ningún laminado de este precio iguala. Ojo: Su tacto híbrido no es ni clásica tradicional ni acústica de metal — los puristas mejor en otro lado.',
    products: [553]
  },
  {
    heading: 'Takamine GC1 Classical: A Closer Look',
    heading_es: 'Takamine GC1 Clásica: análisis detallado',
    content: '<strong>Takamine GC1 Classical</strong> — The indestructible workhorse. Standout specs — Body Wood: Spruce top / mahogany back and sides; Neck: Mahogany, adjustable truss rod. On the plus side: Tank-like build holds tuning through temperature and humidity swings — ideal for careless students; Dual-action truss rod keeps action low and comfortable where cheap classicals offer no adjustment at all. Watch out: Traditional wide nut feels roomy after the Fender; gloss finish shows fingerprints.',
    content_es: '<strong>Takamine GC1 Clásica</strong> — El tanque de batalla indestructible. Datos clave — Tapa: abeto / fondo y aros de caoba; Mástil: caoba, alma ajustable. En el lado positivo: Construcción de tanque que mantiene la afinación ante cambios de temperatura y humedad — ideal para estudiantes descuidados; El alma de doble acción mantiene la acción baja y cómoda donde las clásicas baratas no se pueden ajustar. Ojo: La cejuela tradicional ancha se siente amplia tras la Fender; el acabado brillante marca las huellas.',
    products: [554]
  },
  {
    heading: 'Head-to-Head: Fender CN-60S vs. Takamine GC1',
    heading_es: 'Cara a cara: Fender CN-60S vs. Takamine GC1',
    skipMedia: true,
    content: '<strong>Two nylon answers for beginners.</strong> Choose the Fender CN-60S if: you have small hands or come from electric guitar and want the most comfortable narrow neck with a premium solid wood top. Choose the Takamine GC1 if: you want a traditional, robust classical built like a tank that holds tuning and features an adjustable neck for long-term durability.',
    content_es: '<strong>Dos respuestas de nylon para empezar.</strong> Elige la Fender CN-60S si: tienes manos pequeñas o vienes de la eléctrica y quieres el mástil estrecho más cómodo con tapa de madera sólida premium. Elige la Takamine GC1 si: quieres una clásica tradicional y robusta construida como un tanque, que mantiene la afinación y trae mástil ajustable para durar años.',
    products: [553, 554]
  }
);
// 2. verdicts
g.verdictProsCons.push(
  {
    name: 'Fender CN-60S Nylon', name_es: 'Fender CN-60S Nylon',
    pros: ['Narrow 43mm neck removes the classical stretch for small hands', 'Soft nylon strings are gentle on beginner fingertips', 'Solid spruce top out-projects every laminate at the price', 'Rolled edges and walnut board feel broken-in from day one'],
    pros_es: ['El mástil estrecho de 43 mm elimina la apertura clásica para manos pequeñas', 'Las cuerdas de nylon suaves cuidan los dedos principiantes', 'La tapa sólida de abeto proyecta más que ningún laminado de su precio', 'Bordes redondeados y diapasón de nogal con tacto rodado desde el primer día'],
    cons: ['Hybrid voice suits neither purists nor steel-string strummers', 'No electronics for plugging in later', 'Laminate back and sides cap low-end depth', 'Gloss neck can get sticky in humid rooms'],
    cons_es: ['Su voz híbrida no es ni para puristas ni para rasgueo de metal', 'Sin electrónica para enchufarla después', 'El fondo y aros laminados limitan la profundidad de graves', 'El mástil brillante se pega en ambientes húmedos']
  },
  {
    name: 'Takamine GC1 Classical', name_es: 'Takamine GC1 Clásica',
    pros: ['Tank build holds tuning through heat and humidity swings', 'Adjustable truss rod keeps action low for years', 'Fan-braced spruce top with full, balanced voice', 'Dovetail joint and gloss finish punch above the price'],
    pros_es: ['Construcción de tanque que mantiene la afinación con calor y humedad', 'El alma ajustable mantiene la acción baja durante años', 'Tapa de abeto con varetaje de abanico y voz plena y equilibrada', 'El encastre de cola de milano y el acabado brillante rinden por encima de su precio'],
    cons: ['Traditional wide nut challenges small hands', 'No pickup for amplified playing', 'Gloss body shows every fingerprint', 'Heavier than ultra-light starter guitars'],
    cons_es: ['La cejuela tradicional ancha reta a las manos pequeñas', 'Sin pastilla para tocar amplificado', 'El cuerpo brillante marca cada huella', 'Más pesada que las guitarras iniciales ultraligeras']
  }
);
// 3. table: 2 columns + extend 9 rows
g.productTable.columns.push(
  { title: 'Fender CN-60S Nylon', title_es: 'Fender CN-60S Nylon' },
  { title: 'Takamine GC1 Classical', title_es: 'Takamine GC1 Clásica' }
);
const V = (en, es) => ({ value: en, value_es: es });
const newCells = {
  'Best For': [V('Nylon comfort for small hands', 'Comodidad de nylon para manos pequeñas'), V('Durable classical for students', 'Clásica duradera para estudiantes')],
  'Estimated Price': [V('~$230', '~$230'), V('~$349', '~$349')],
  'Body Wood': [V('Solid spruce top, mahogany back/sides', 'Tapa sólida de abeto, fondo y aros de caoba'), V('Spruce top, mahogany back/sides', 'Tapa de abeto, fondo y aros de caoba')],
  'Neck': [V('Narrow 43mm mahogany, rolled edges', 'Caoba estrecho de 43 mm, bordes redondeados'), V('Mahogany, adjustable truss rod', 'Caoba, alma ajustable')],
  'Frets & Fretboard': [V('18, walnut', '18, nogal'), V('19, laurel', '19, laurel')],
  'Pickups': [V('None (acoustic)', 'Ninguna (acústica)'), V('None (acoustic)', 'Ninguna (acústica)')],
  'Scale Length': [V('25.3 in (643 mm)', '25,3" (643 mm)'), V('25.6 in (650 mm)', '25,6" (650 mm)')],
  'Tuners': [V('Classical chrome', 'Clavijero clásico cromado'), V('Chrome classical + pearl', 'Clavijero clásico cromado + perla')],
  'Weight': [V('—', '—'), V('—', '—')]
};
g.productTable.rows.forEach(r => {
  const cells = newCells[r.label];
  if (cells) r.values.push(...cells);
  else console.log('ROW SIN CELDAS: ' + r.label);
});
// fix LP Special-I BestFor (col 4)
const bf = g.productTable.rows.find(r => r.label === 'Best For');
bf.values[4] = V('Humbucker rock for beginners', 'Rock con humbuckers para empezar');
// 4. FAQ Q6
const fsn = g.featuredSnippet;
fsn.faq_q6_en = 'Nylon or steel strings for a total beginner?';
fsn.faq_a6_en = 'Nylon if fingertips hurt or hands are small — the CN-60S even keeps a narrow neck. Steel if strumming songs with friends is the goal — louder and brighter from day one.';
fsn.faq_q6_es = '¿Cuerdas de nylon o de metal para empezar de cero?';
fsn.faq_a6_es = 'Nylon si duelen las yemas o las manos son pequeñas — la CN-60S encima mantiene el mástil estrecho. Metal si el plan es rasguear canciones con amigos — más volumen y brillo desde el primer día.';
fs.writeFileSync(F, JSON.stringify(G, null, 2));
console.log('beginner-guitar ampliada');