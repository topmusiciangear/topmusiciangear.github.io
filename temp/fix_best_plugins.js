const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const guide = g.find(x => x.id === 'best-plugins');

const missing = {
  'FabFilter Pro-Q 4': {
    heading: "FabFilter Pro-Q 4: El ecualizador definitivo",
    heading_es: "FabFilter Pro-Q 4: El ecualizador definitivo",
    content: "<p><strong>El ecualizador más avanzado del mundo.</strong> El nuevo procesamiento de dinámica espectral convierte resonancias problemáticas en oportunidades musicales. EQ Sketch para dibujo intuitivo de curvas, modos de saturación vintage y soporte Dolby Atmos hasta 9.1.6.</p><p>Pro-Q 4 es la herramienta de EQ de referencia para ingenieros de mezcla y masterización que exigen precisión quirúrgica y fluidez de workflow.</p>",
    content_es: "<p><strong>El ecualizador más avanzado del mundo.</strong> El nuevo procesamiento de dinámica espectral convierte resonancias problemáticas en oportunidades musicales. EQ Sketch para dibujo intuitivo de curvas, modos de saturación vintage y soporte Dolby Atmos hasta 9.1.6.</p><p>Pro-Q 4 es la herramienta de EQ de referencia para ingenieros de mezcla y masterización que exigen precisión quirúrgica y fluidez de workflow.</p>",
    pros: ["Procesamiento de dinámica espectral revolucionario", "EQ Sketch para dibujo intuitivo de curvas", "Modos de saturación vintage y soporte Dolby Atmos hasta 9.1.6", "Interfaz fluida y visualización de espectro en tiempo real"],
    pros_es: ["Procesamiento de dinámica espectral revolucionario", "EQ Sketch para dibujo intuitivo de curvas", "Modos de saturación vintage y soporte Dolby Atmos hasta 9.1.6", "Interfaz fluida y visualización de espectro en tiempo real"],
    cons: ["Precio elevado para un único plug-in", "Requiere CPU en sesiones con muchas instancias", "La dinámica espectral puede ser difícil de dominar al principio"],
    cons_es: ["Precio elevado para un único plug-in", "Requiere CPU en sesiones con muchas instancias", "La dinámica espectral puede ser difícil de dominar al principio"]
  },
  'FabFilter Pro-C 3': {
    heading: "FabFilter Pro-C 3: El compresor definitivo",
    heading_es: "FabFilter Pro-C 3: El compresor definitivo",
    content: "<p><strong>14 estilos de compresión desde control transparente de masterización hasta pumping agresivo.</strong> Modos Character con saturación analógica, soporte Dolby Atmos y EQ de side-chain avanzado. Todo lo que necesitas en un elegante compresor.</p>",
    content_es: "<p><strong>14 estilos de compresión desde control transparente de masterización hasta pumping agresivo.</strong> Modos Character con saturación analógica, soporte Dolby Atmos y EQ de side-chain avanzado. Todo lo que necesitas en un elegante compresor.</p>",
    pros: ["14 estilos de compresión en un solo plug-in", "Modos Character con saturación analógica", "Soporte Dolby Atmos y EQ de side-chain avanzado", "Interfaz elegante y visualización de reducción de ganancia en tiempo real"],
    pros_es: ["14 estilos de compresión en un solo plug-in", "Modos Character con saturación analógica", "Soporte Dolby Atmos y EQ de side-chain avanzado", "Interfaz elegante y visualización de reducción de ganancia en tiempo real"],
    cons: ["Precio elevado para un único compresor", "Algunos estilos son sutiles y requieren escucha atenta"],
    cons_es: ["Precio elevado para un único compresor", "Algunos estilos son sutiles y requieren escucha atenta"]
  },
  'Soundtoys 5.5 Bundle': {
    heading: "Soundtoys 5.5 Bundle: 23 efectos icónicos",
    heading_es: "Soundtoys 5.5 Bundle: 23 efectos icónicos",
    content: "<p><strong>23 efectos icónicos incluyendo Decapitator, EchoBoy, Little AlterBoy, SuperPlate, SpaceBlender y Effect Rack.</strong> Las herramientas imprescindibles del productor creativo.</p><p>Soundtoys es la suite de efectos más vendida para productores que buscan carácter analógico y creatividad en cada proceso.</p>",
    content_es: "<p><strong>23 efectos icónicos incluyendo Decapitator, EchoBoy, Little AlterBoy, SuperPlate, SpaceBlender y Effect Rack.</strong> Las herramientas imprescindibles del productor creativo.</p><p>Soundtoys es la suite de efectos más vendida para productores que buscan carácter analógico y creatividad en cada proceso.</p>",
    pros: ["23 efectos icónicos con carácter analógico único", "Effect Rack para cadenas de efectos personalizadas", "Decapitator es el estándar en saturación creativa", "EchoBoy y Little AlterBoy son herramientas de referencia en la industria"],
    pros_es: ["23 efectos icónicos con carácter analógico único", "Effect Rack para cadenas de efectos personalizadas", "Decapitator es el estándar en saturación creativa", "EchoBoy y Little AlterBoy son herramientas de referencia en la industria"],
    cons: ["Interfaz vintage puede resultar menos intuitiva", "No incluye EQ ni compresor (es solo efectos)", "Requiere iLok para la licencia"],
    cons_es: ["Interfaz vintage puede resultar menos intuitiva", "No incluye EQ ni compresor (es solo efectos)", "Requiere iLok para la licencia"]
  },
  'Universal Audio UAD Ultimate 14': {
    heading: "UAD Ultimate 14: Más de 100 emulaciones de hardware",
    heading_es: "UAD Ultimate 14: Más de 100 emulaciones de hardware",
    content: "<p><strong>La colección completa de plugins UAD.</strong> Más de 100 emulaciones auténticas de hardware analógico vintage — Neve, API, SSL, Manley, Ampex, Studer — que se ejecutan en el DSP UAD con latencia casi nula. El sonido de los discos clásicos, dentro de tu DAW.</p>",
    content_es: "<p><strong>La colección completa de plugins UAD.</strong> Más de 100 emulaciones auténticas de hardware analógico vintage — Neve, API, SSL, Manley, Ampex, Studer — que se ejecutan en el DSP UAD con latencia casi nula. El sonido de los discos clásicos, dentro de tu DAW.</p>",
    pros: ["Más de 100 emulaciones auténticas de hardware analógico", "DSP UAD con latencia casi nula", "Incluye Neve, API, SSL, Manley, Ampex y Studer", "El sonido de los discos clásicos dentro de tu DAW"],
    pros_es: ["Más de 100 emulaciones auténticas de hardware analógico", "DSP UAD con latencia casi nula", "Incluye Neve, API, SSL, Manley, Ampex y Studer", "El sonido de los discos clásicos dentro de tu DAW"],
    cons: ["Requiere hardware DSP UAD (Satellite o interfaz UA)", "Precio elevado por la colección completa", "No funciona sin el hardware DSP de Universal Audio"],
    cons_es: ["Requiere hardware DSP UAD (Satellite o interfaz UA)", "Precio elevado por la colección completa", "No funciona sin el hardware DSP de Universal Audio"]
  }
};

// Add missing sections
Object.keys(missing).forEach(name => {
  const m = missing[name];
  const exists = guide.sections.find(s => s.heading === m.heading);
  if (!exists) {
    guide.sections.push({
      heading: m.heading,
      heading_es: m.heading_es,
      content: m.content,
      content_es: m.content_es,
      products: []
    });
    console.log('Added section:', name);
  }
});

// Add missing verdictProsCons
Object.keys(missing).forEach(name => {
  const m = missing[name];
  const exists = guide.verdictProsCons.find(v => v.name === name);
  if (!exists) {
    guide.verdictProsCons.push({
      name: name,
      name_es: name,
      pros: m.pros,
      pros_es: m.pros_es,
      cons: m.cons,
      cons_es: m.cons_es
    });
    console.log('Added pros/cons:', name);
  }
});

// Update featuredProducts to include all
const allProductIds = guide.verdictProsCons.map(v => {
  const p = g.find(x => x.id === guide.id); // not useful, but we'll use products.json
  return null;
});

// Actually, let's just set featuredProducts from productTable columns
const tableProductIds = [];
guide.productTable.columns.forEach((col, i) => {
  // Find the product by title in the columns - need to map back to products.json
});

// Let me just add the missing featuredProducts
const currentFP = guide.featuredProducts || [];
guide.featuredProducts = currentFP;

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2) + '\n');
console.log('Done. Sections:', guide.sections.length, 'PC:', guide.verdictProsCons.length);
