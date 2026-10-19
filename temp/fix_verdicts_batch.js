const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));

const fixes = {
  'budget-interfaces': {
    verdict: "The Scarlett 2i2 is the beginner's friend — clean preamps, easy software. The Audient iD14 MkII brings console-grade Class-A preamps. The SSL 2+ MKII adds the legendary 4K analog strip. The MOTU M2 offers the best metering with its full-color LCD. The UA Volt 2 adds analog character with its vintage mode, and the Volt 276 adds a real 76 compressor. The Behringer UMC1820 is the expandability pick with 8 inputs, and the Audient EVO 4 is the budget pick with Smartgain.",
    verdict_es: "La Scarlett 2i2 es la amiga de los principiantes — previos limpios, software fácil. La Audient iD14 MkII trae previos Clase A de consola. La SSL 2+ MKII añade la legendaria tira analógica 4K. La MOTU M2 ofrece la mejor medición con su LCD a todo color. La UA Volt 2 añade carácter analógico con su modo vintage, y la Volt 276 añade un compresor 76 real. La Behringer UMC1820 es la opción de expandibilidad con 8 entradas, y la Audient EVO 4 es la opción económica con Smartgain.",
    conclusion: "The Scarlett 2i2 is the safest bet for beginners. The Audient iD14 MkII is the best for preamp quality. The SSL 2+ MKII is the best for analog character. The MOTU M2 offers the best metering. The UA Volt 2 has the most character, and the Volt 276 adds a real compressor. The Behringer UMC1820 is the expandability pick, and the Audient EVO 4 is the budget pick. All are bus-powered, compact, and reliable enough for professional work.",
    conclusion_es: "La Scarlett 2i2 es la opción más segura para principiantes. La Audient iD14 MkII es la mejor para calidad de previos. La SSL 2+ MKII es la mejor para carácter analógico. La MOTU M2 ofrece la mejor medición. La UA Volt 2 tiene más carácter, y la Volt 276 añade un compresor real. La Behringer UMC1820 es la opción de expandibilidad, y la Audient EVO 4 es la opción económica. Todas son alimentadas por bus, compactas y fiables para trabajo profesional."
  },
  'open-headphones': {
    verdict: "The Audeze LCD-X is the reference flagship — planar magnetic detail and speed. The Sennheiser HD 490 Pro Plus is the modern reference king. The Beyerdynamic DT 1990 Pro MKII is the analytical pick. The Sennheiser HD 600 remains the timeless choice. The Audio-Technica ATH-R70xa and Neumann NDH 30 bring professional accuracy at different prices. The Beyerdynamic DT 990 Pro is the fun, detailed pick, and the DT 900 Pro X is the versatile all-rounder.",
    verdict_es: "La Audeze LCD-X es el flagship de referencia — detalle y velocidad magnética plana. La Sennheiser HD 490 Pro Plus es el rey de la referencia moderna. La Beyerdynamic DT 1990 Pro MKII es la opción analítica. La Sennheiser HD 600 sigue siendo la elección atemporal. La Audio-Technica ATH-R70xa y la Neumann NDH 30 aportan precisión profesional a distintos precios. La Beyerdynamic DT 990 Pro es la opción divertida y detallada, y la DT 900 Pro X es la todoterreno versátil.",
    conclusion: "The open-back headphone landscape in 2026 offers remarkable depth at every price point. The Audeze LCD-X is the reference flagship for planar magnetic detail. The HD 490 Pro Plus remains the modern reference king. The DT 1990 Pro MKII is the analytical pick for critical listening. The HD 600 remains the timeless choice. The ATH-R70xa and NDH 30 bring professional accuracy at different prices. The DT 990 Pro is the fun, detailed pick, and the DT 900 Pro X is the versatile all-rounder.",
    conclusion_es: "El panorama de auriculares abiertos en 2026 ofrece una profundidad notable en cada punto de precio. La Audeze LCD-X es el flagship de referencia para detalle magnético plano. La HD 490 Pro Plus sigue siendo el rey de la referencia moderna. La DT 1990 Pro MKII es la opción analítica para escucha crítica. La HD 600 sigue siendo la elección atemporal. La ATH-R70xa y la NDH 30 aportan precisión profesional a distintos precios. La DT 990 Pro es la opción divertida y detallada, y la DT 900 Pro X es la todoterreno versátil."
  },
  'best-interface': {
    verdict: "Focusrite Scarlett 2i2 for beginners, Audient iD14 MkII for better preamps, SSL 2+ MKII for analog character, RME Babyface Pro FS for uncompromising portable quality, MOTU M2 for the best metering, and Universal Audio Volt 2 for portability.",
    verdict_es: "Focusrite Scarlett 2i2 para principiantes, Audient iD14 MkII para mejores previos, SSL 2+ MKII para carácter analógico, RME Babyface Pro FS para calidad portátil sin concesiones, MOTU M2 para la mejor medición, y Universal Audio Volt 2 para portabilidad.",
    conclusion: "The Focusrite Scarlett 2i2 is the safest bet for beginners. The Audient iD14 MkII is the best for preamp quality. The SSL 2+ MKII is the best for analog character. The RME Babyface Pro FS is the best portable interface money can buy. The MOTU M2 offers the best metering. The Universal Audio Volt 2 is the best for vintage warmth. All are bus-powered, compact, and reliable enough for professional work.",
    conclusion_es: "La Focusrite Scarlett 2i2 es la opción más segura para principiantes. La Audient iD14 MkII es la mejor para calidad de previos. La SSL 2+ MKII es la mejor para carácter analógico. La RME Babyface Pro FS es la mejor interfaz portátil que puedes comprar. La MOTU M2 ofrece la mejor medición. La Universal Audio Volt 2 es la mejor para calidez vintage. Todas son alimentadas por bus, compactas y fiables para trabajo profesional."
  },
  'premium-interfaces': {
    verdict: "Need UAD colour while tracking? Apollo x8p Gen 2. Need a desk controller that also does network audio? Neumann MT 48. Need Atmos without a separate monitor controller? Audient ORIA. Need rock-solid reliability with massive I/O? RME Fireface UFX III. Need FPGA-powered conversion? Antelope Orion Studio Synergy Core.",
    verdict_es: "¿Necesitas color UAD mientras grabas? Apollo x8p Gen 2. ¿Necesitas un controlador de consola que también haga audio por red? Neumann MT 48. ¿Necesitas Atmos sin un controlador de monitores separado? Audient ORIA. ¿Necesitas fiabilidad sólida con E/S masiva? RME Fireface UFX III. ¿Necesitas conversión FPGA? Antelope Orion Studio Synergy Core.",
    conclusion: "The six here all belong in a permanent rack — the question is which job you buy them for. The Apollo x8p Gen 2 wins the UAD DSP workflow. The Neumann MT 48 (U) wins the network audio desk controller. The Audient ORIA wins immersive monitoring. The RME Fireface UFX III wins rock-solid reliability with massive I/O. The Antelope Orion Studio Synergy Core wins FPGA-powered conversion.",
    conclusion_es: "Los seis pertenecen a un rack permanente — la cuestión es para qué trabajo los compras. La Apollo x8p Gen 2 gana el flujo de trabajo UAD DSP. La Neumann MT 48 (U) gana el controlador de consola con audio por red. La Audient ORIA gana la monitorización inmersiva. La RME Fireface UFX III gana la fiabilidad sólida con E/S masiva. La Antelope Orion Studio Synergy Core gana la conversión FPGA."
  }
};

let count = 0;
for (const [id, fix] of Object.entries(fixes)) {
  const guide = g.find(x => x.id === id);
  if (guide) {
    Object.assign(guide, fix);
    count++;
    console.log(`✅ ${id}`);
  } else {
    console.log(`❌ ${id} NOT FOUND`);
  }
}

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2));
console.log(`\nTotal: ${count} guías corregidas`);
