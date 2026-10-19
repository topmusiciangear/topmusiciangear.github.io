const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));

const fixes = {
  'acoustic-guitars-guide': {
    verdict: "The Martin D-28 is the time-tested standard. The Taylor 914ce Builder's Edition is the modern luxury pick. The Martin OM-42 is the fingerstyle pick. The Gibson SJ-200 is the legacy pick. The Gibson Custom Shop 1942 Banner J-45 is the collector's pick.",
    verdict_es: "El Martin D-28 es el estándar probado por el tiempo. La Taylor 914ce Builder's Edition es la opción de lujo moderna. El Martin OM-42 es la opción para fingerstyle. El Gibson SJ-200 es la opción de legado. El Gibson Custom Shop 1942 Banner J-45 es la opción de coleccionista.",
    conclusion: "The Martin D-28 is the safest pro choice. The Taylor 914ce Builder's Edition is the modern luxury pick. The Martin OM-42 is the balanced studio weapon. The Gibson SJ-200 is the legacy pick. The Gibson Custom Shop 1942 Banner J-45 is the collector's pick. All are reliable enough for professional recording.",
    conclusion_es: "El Martin D-28 es la opción pro más segura. La Taylor 914ce Builder's Edition es la opción de lujo moderna. El Martin OM-42 es el arma de estudio equilibrada. El Gibson SJ-200 es la opción de legado. El Gibson Custom Shop 1942 Banner J-45 es la opción de coleccionista. Todos son fiables para grabación profesional."
  },
  'best-5-string-basses': {
    verdict: "Starting on five strings? Ibanez GSR205B, Sterling by Music Man SUB Ray5, Yamaha TRBX305 or Squier Affinity Jazz Bass V. Gigging weekly? Schecter Stiletto Stealth-5, Yamaha BB435, Ibanez SR505A or Squier Classic Vibe 70s Jazz Bass V. Studio? Fender American Professional II Jazz Bass V, Fender American Ultra II Jazz Bass V or Ibanez EHB1005MS Headless Bass.",
    verdict_es: "¿Empezando con cinco cuerdas? Ibanez GSR205B, Sterling by Music Man SUB Ray5, Yamaha TRBX305 o Squier Affinity Jazz Bass V. ¿Directos semanales? Schecter Stiletto Stealth-5, Yamaha BB435, Ibanez SR505A o Squier Classic Vibe 70s Jazz Bass V. ¿Estudio? Fender American Professional II Jazz Bass V, Fender American Ultra II Jazz Bass V o Ibanez EHB1005MS Headless Bass.",
    conclusion: "The GSR205B, Ray5, TRBX305 and Affinity Jazz V are the best starters. The Schecter Stiletto Stealth-5, BB435, SR505A and Classic Vibe 70s Jazz V are the best for gigging. The Fender American Professional II Jazz V, American Ultra II Jazz V and Ibanez EHB1005MS are the best for studio. All are reliable enough for professional use.",
    conclusion_es: "El GSR205B, Ray5, TRBX305 y Affinity Jazz V son los mejores para empezar. El Schecter Stiletto Stealth-5, BB435, SR505A y Classic Vibe 70s Jazz V son los mejores para directos. El Fender American Professional II Jazz V, American Ultra II Jazz V e Ibanez EHB1005MS son los mejores para estudio. Todos son fiables para uso profesional."
  },
  'best-digital-pianos': {
    verdict: "The Roland FP-30X is the best-feel pick for most home players. The Yamaha P-225 is the home piano sweet spot. The Yamaha Arius YDP-146 is the most affordable console. The Roland RP107 is the best-feel value pick. The Yamaha Arius YDP-166 is the step-up console. The Casio Privia PX-S1100 is the portable pick. The Roland FP-10 is the budget pick. The Yamaha Clavinova CLP-835 is the premium console.",
    verdict_es: "El Roland FP-30X es la mejor opción de tacto para la mayoría de jugadores domésticos. El Yamaha P-225 es el punto ideal para piano en casa. El Yamaha Arius YDP-146 es la consola más asequible. El Roland RP107 es la mejor opción de tacto por valor. El Yamaha Arius YDP-166 es la consola escalón. El Casio Privia PX-S1100 es la opción portátil. El Roland FP-10 es la opción económica. El Yamaha Clavinova CLP-835 es la consola premium.",
    conclusion: "The FP-30X is the best-feel pick. The P-225 is the home piano sweet spot. The YDP-146 is the most affordable console. The RP107 is the best-feel value pick. The YDP-166 is the step-up console. The PX-S1100 is the portable pick. The FP-10 is the budget pick. The CLP-835 is the premium console. All are reliable enough for professional use.",
    conclusion_es: "El FP-30X es la mejor opción de tacto. El P-225 es el punto ideal para piano en casa. El YDP-146 es la consola más asequible. El RP107 es la mejor opción de tacto por valor. El YDP-166 es la consola escalón. El PX-S1100 es la opción portátil. El FP-10 es la opción económica. El CLP-835 es la consola premium. Todos son fiables para uso profesional."
  },
  'best-synthesizers': {
    verdict: "The Korg Minilogue XD is the affordable analog gateway. The Moog Subsequent 37 is the king of bass and lead. The Yamaha Montage M8x is the workstation flagship. The Moog Muse is the modern design pick. The Arturia MicroFreak is the experimental pick. The Behringer DeepMind 12 is the budget poly pick. The ASM Hydrasynth is the digital powerhouse. The Sequential Take 5 is the analog poly pick. The Sequential OB-6 Keyboard is the classic poly pick.",
    verdict_es: "El Korg Minilogue XD es la puerta de entrada analógica asequible. El Moog Subsequent 37 es el rey de bajos y leads. El Yamaha Montage M8x es el flagship estación de trabajo. El Moog Muse es la opción de diseño moderna. El Arturia MicroFreak es la opción experimental. El Behringer DeepMind 12 es la opción polifónica económica. El ASM Hydrasynth es la opción digital potente. El Sequential Take 5 es la opción polifónica analógica. El Sequential OB-6 Keyboard es el polifónico clásico.",
    conclusion: "The Minilogue XD is the affordable analog gateway. The Subsequent 37 is the king of bass and lead. The Montage M8x is the workstation flagship. The Muse is the modern design pick. The MicroFreak is the experimental pick. The DeepMind 12 is the budget poly pick. The Hydrasynth is the digital powerhouse. The Take 5 is the analog poly pick. The OB-6 is the classic poly pick. All are reliable enough for professional use.",
    conclusion_es: "El Minilogue XD es la puerta de entrada analógica asequible. El Subsequent 37 es el rey de bajos y leads. El Montage M8x es el flagship estación de trabajo. El Muse es la opción de diseño moderna. El MicroFreak es la opción experimental. El DeepMind 12 es la opción polifónica económica. El Hydrasynth es la opción digital potente. El Take 5 es la opción polifónica analógica. El OB-6 es el polifónico clásico. Todos son fiables para uso profesional."
  },
  'best-stage-keyboards': {
    verdict: "Nord Stage 4 88 is the reference. Roland RD-2000 EX for piano realism. Yamaha Montage M8x and Roland Fantom 8 EX for workstation firepower. Yamaha YC88 and Nord Electro 7 61 for organ stages. Korg Grandstage X for stage value. Arturia AstroLab 61 for compactness. Yamaha CK88 for the best of both worlds.",
    verdict_es: "Nord Stage 4 88 es la referencia. Roland RD-2000 EX para realismo de piano. Yamaha Montage M8x y Roland Fantom 8 EX para potencia de estación de trabajo. Yamaha YC88 y Nord Electro 7 61 para escenarios de órgano. Korg Grandstage X para valor en escenario. Arturia AstroLab 61 para compacidad. Yamaha CK88 para lo mejor de ambos mundos.",
    conclusion: "The Nord Stage 4 88 is the reference. The RD-2000 EX is for piano realism. The Montage M8x and Fantom 8 EX are for workstation firepower. The YC88 and Electro 7 are for organ stages. The Grandstage X is for stage value. The AstroLab 61 is for compactness. The CK88 is the best of both worlds. All are reliable enough for professional use.",
    conclusion_es: "El Nord Stage 4 88 es la referencia. El RD-2000 EX es para realismo de piano. El Montage M8x y Fantom 8 EX son para potencia de estación de trabajo. El YC88 y Electro 7 son para escenarios de órgano. El Grandstage X es para valor en escenario. El AstroLab 61 es para compacidad. El CK88 es lo mejor de ambos mundos. Todos son fiables para uso profesional."
  },
  'studio-subwoofers': {
    verdict: "Buy the KRK S10.4 for the best overall combination of performance and price. The Yamaha HS8S is the compact pick. The Adam T10S is the detail pick. The Kali Audio WS-6.2 is the value pick. The IK Multimedia iLoud Sub is the desktop pick.",
    verdict_es: "Compra el KRK S10.4 para la mejor combinación de rendimiento y precio. El Yamaha HS8S es la opción compacta. El Adam T10S es la opción de detalle. El Kali Audio WS-6.2 es la opción de valor. El IK Multimedia iLoud Sub es la opción de escritorio.",
    conclusion: "The KRK S10.4 is the best do-it-all studio subwoofer. The Yamaha HS8S is the compact pick. The Adam T10S is the detail pick. The Kali Audio WS-6.2 is the value pick. The IK Multimedia iLoud Sub is the desktop pick. All are reliable enough for professional use.",
    conclusion_es: "El KRK S10.4 es el mejor subwoofer de estudio todoterreno. El Yamaha HS8S es la opción compacta. El Adam T10S es la opción de detalle. El Kali Audio WS-6.2 es la opción de valor. El IK Multimedia iLoud Sub es la opción de escritorio. Todos son fiables para uso profesional."
  },
  'best-drum-machine': {
    verdict: "Travel light with the Roland AIRA Compact T-8 or Novation Circuit Tracks. Own the stage with Arturia DrumBrute, Roland TR-8S or Akai MPC One G2. Rule the studio with Elektron Digitakt II or Elektron Syntakt.",
    verdict_es: "Viaja ligero con el Roland AIRA Compact T-8 o Novation Circuit Tracks. Domina el escenario con Arturia DrumBrute, Roland TR-8S o Akai MPC One G2. Domina el estudio con Elektron Digitakt II o Elektron Syntakt.",
    conclusion: "The Roland T-8 and Novation Circuit Tracks are the travel picks. The Arturia DrumBrute, Roland TR-8S and Akai MPC One G2 are the stage picks. The Elektron Digitakt II and Elektron Syntakt are the studio picks. All are reliable enough for professional use.",
    conclusion_es: "El Roland T-8 y Novation Circuit Tracks son las opciones de viaje. El Arturia DrumBrute, Roland TR-8S y Akai MPC One G2 son las opciones de escenario. El Elektron Digitakt II y Elektron Syntakt son las opciones de estudio. Todos son fiables para uso profesional."
  },
  'beginner-bass-guitars': {
    verdict: "Yamaha BB234 for the best overall beginner bass. Squier Affinity PJ for the best value P/J. Yamaha TRBX304 for modern playability. Ibanez SR300E for the modern Sterling by Music Man StingRay Ray4 for the best-feeling passive build. Squier Classic Vibe '60s Jazz Bass for the vintage-spec Jazz pick.",
    verdict_es: "Yamaha BB234 para el mejor bajo para principiantes. Squier Affinity PJ para el mejor valor P/J. Yamaha TRBX304 para jugabilidad moderna. Ibanez SR300E para el moderno. Sterling by Music Man StingRay Ray4 para la construcción pasiva de mejor tacto. Squier Classic Vibe '60s Jazz Bass para el Jazz de especificaciones vintage.",
    conclusion: "The Yamaha BB234 is the best overall beginner bass. The Squier Affinity PJ is the best value P/J. The Yamaha TRBX304 is for modern playability. The Ibanez SR300E is the modern pick. The Sterling by Music Man StingRay Ray4 is the best-feeling passive build. The Squier Classic Vibe '60s Jazz Bass is the vintage-spec Jazz pick. All are reliable enough for professional use.",
    conclusion_es: "El Yamaha BB234 es el mejor bajo para principiantes. El Squier Affinity PJ es el mejor valor P/J. El Yamaha TRBX304 es para jugabilidad moderna. El Ibanez SR300E es la opción moderna. El Sterling by Music Man StingRay Ray4 es la construcción pasiva de mejor tacto. El Squier Classic Vibe '60s Jazz Bass es el Jazz de especificaciones vintage. Todos son fiables para uso profesional."
  }
};

let count = 0;
for (const [id, fix] of Object.entries(fixes)) {
  const guide = g.find(x => x.id === id);
  if (guide) {
    Object.assign(guide, fix);
    count++;
    console.log('OK', id);
  } else {
    console.log('NOT FOUND', id);
  }
}

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2));
console.log('Total:', count, 'guias corregidas');
