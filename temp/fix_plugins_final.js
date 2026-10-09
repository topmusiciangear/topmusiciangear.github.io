const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const guide = g.find(x => x.id === 'best-plugins');

const newSections = [
  {
    heading: "FabFilter Pro-Q 4: El ecualizador definitivo",
    heading_es: "FabFilter Pro-Q 4: El ecualizador definitivo",
    content: "<p><strong>El ecualizador más avanzado del mundo.</strong> El nuevo procesamiento de dinámica espectral convierte resonancias problemáticas en oportunidades musicales. EQ Sketch para dibujo intuitivo de curvas, modos de saturación vintage y soporte Dolby Atmos hasta 9.1.6.</p><p>Pro-Q 4 es la herramienta de EQ de referencia para ingenieros de mezcla y masterización que exigen precisión quirúrgica y fluidez de workflow.</p>",
    content_es: "<p><strong>El ecualizador más avanzado del mundo.</strong> El nuevo procesamiento de dinámica espectral convierte resonancias problemáticas en oportunidades musicales. EQ Sketch para dibujo intuitivo de curvas, modos de saturación vintage y soporte Dolby Atmos hasta 9.1.6.</p><p>Pro-Q 4 es la herramienta de EQ de referencia para ingenieros de mezcla y masterización que exigen precisión quirúrgica y fluidez de workflow.</p>",
    products: [62]
  },
  {
    heading: "FabFilter Pro-C 3: El compresor definitivo",
    heading_es: "FabFilter Pro-C 3: El compresor definitivo",
    content: "<p><strong>14 estilos de compresión desde control transparente de masterización hasta pumping agresivo.</strong> Modos Character con saturación analógica, soporte Dolby Atmos y EQ de side-chain avanzado. Todo lo que necesitas en un elegante compresor.</p>",
    content_es: "<p><strong>14 estilos de compresión desde control transparente de masterización hasta pumping agresivo.</strong> Modos Character con saturación analógica, soporte Dolby Atmos y EQ de side-chain avanzado. Todo lo que necesitas en un elegante compresor.</p>",
    products: [63]
  },
  {
    heading: "Soundtoys 5.5 Bundle: 23 efectos icónicos",
    heading_es: "Soundtoys 5.5 Bundle: 23 efectos icónicos",
    content: "<p><strong>23 efectos icónicos incluyendo Decapitator, EchoBoy, Little AlterBoy, SuperPlate, SpaceBlender y Effect Rack.</strong> Las herramientas imprescindibles del productor creativo.</p><p>Soundtoys es la suite de efectos más vendida para productores que buscan carácter analógico y creatividad en cada proceso.</p>",
    content_es: "<p><strong>23 efectos icónicos incluyendo Decapitator, EchoBoy, Little AlterBoy, SuperPlate, SpaceBlender y Effect Rack.</strong> Las herramientas imprescindibles del productor creativo.</p><p>Soundtoys es la suite de efectos más vendida para productores que buscan carácter analógico y creatividad en cada proceso.</p>",
    products: [32]
  },
  {
    heading: "UAD Ultimate 14: Más de 100 emulaciones de hardware",
    heading_es: "UAD Ultimate 14: Más de 100 emulaciones de hardware",
    content: "<p><strong>La colección completa de plugins UAD.</strong> Más de 100 emulaciones auténticas de hardware analógico vintage — Neve, API, SSL, Manley, Ampex, Studer — que se ejecutan en el DSP UAD con latencia casi nula. El sonido de los discos clásicos, dentro de tu DAW.</p>",
    content_es: "<p><strong>La colección completa de plugins UAD.</strong> Más de 100 emulaciones auténticas de hardware analógico vintage — Neve, API, SSL, Manley, Ampex, Studer — que se ejecutan en el DSP UAD con latencia casi nula. El sonido de los discos clásicos, dentro de tu DAW.</p>",
    products: [121]
  }
];

const existingHeadings = guide.sections.map(s => s.heading);
newSections.forEach(ns => {
  if (!existingHeadings.includes(ns.heading)) {
    guide.sections.push(ns);
    console.log('Added section:', ns.heading);
  }
});

guide.featuredProducts = [29, 62, 63, 30, 32, 120, 123, 61, 121];

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2) + '\n');
console.log('Done. Sections:', guide.sections.length, 'FP:', guide.featuredProducts.length);
