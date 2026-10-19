const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));

const fixes = {
  'best-amp-modelers': {
    verdict: "The Line 6 Helix HX Stomp is the best overall. The Boss GX-1 is the best value. The HeadRush Flex Prime adds touchscreen editing. The Line 6 POD Go is the budget pick. The IK Multimedia TONEX ONE+ is the AI modeling pick.",
    verdict_es: "El Line 6 Helix HX Stomp es el mejor todoterreno. El Boss GX-1 es el mejor valor. El HeadRush Flex Prime añade edición táctil. El Line 6 POD Go es la opción económica. El IK Multimedia TONEX ONE+ es la opción de modelado con IA.",
    conclusion: "The HX Stomp is the best overall. The GX-1 is the best value. The Flex Prime adds touchscreen editing. The POD Go is the budget pick. The TONEX ONE+ is the AI modeling pick. All are reliable enough for professional use.",
    conclusion_es: "El HX Stomp es el mejor todoterreno. El GX-1 es el mejor valor. El Flex Prime añade edición táctil. El POD Go es la opción económica. El TONEX ONE+ es la opción de modelado con IA. Todos son fiables para uso profesional."
  },
  'best-bass-under-700': {
    verdict: "The Schecter Stiletto is the metal pick. The ESP LTD B-204SM wins on looks. The Hofner Ignition is the most unique sound. The Yamaha TRBX304 is the modern pick. The Sterling by Music Man StingRay Ray4 is the StingRay pick.",
    verdict_es: "El Schecter Stiletto es la opción metal. El ESP LTD B-204SM gana en aspecto. El Hofner Ignition es el sonido más único. El Yamaha TRBX304 es la opción moderna. El Sterling by Music Man StingRay Ray4 es la opción StingRay.",
    conclusion: "The Schecter Stiletto is the metal pick. The ESP LTD B-204SM wins on looks. The Hofner Ignition is the most unique sound. The Yamaha TRBX304 is the modern pick. The Sterling by Music Man StingRay Ray4 is the StingRay pick. All are reliable enough for professional use.",
    conclusion_es: "El Schecter Stilletto es la opción metal. El ESP LTD B-204SM gana en aspecto. El Hofner Ignition es el sonido más único. El Yamaha TRBX304 es la opción moderna. El Sterling by Music Man StingRay Ray4 es la opción StingRay. Todos son fiables para uso profesional."
  },
  'best-parlor-guitars': {
    verdict: "The Yamaha CSF1M is the overall winner for solid-top tone with electronics. The Gretsch G9500 Jim Dandy owns the budget blues crown. The PRS SE P20e Tonare Parlor is the premium pick. The Epiphone L-00 Studio Parlor is the vintage pick. The Fender CP-60S Parlor is the budget pick. The Fender Highway Series Parlor is the modern pick. The Gretsch G5021E Rancher Penguin Parlor is the unique pick.",
    verdict_es: "La Yamaha CSF1M es la ganadora general por su tono de tapa maciza con electrónica. El Gretsch G9500 Jim Dandy es el rey del blues económico. El PRS SE P20e Tonare Parlor es la opción premium. El Epiphone L-00 Studio Parlor es la opción vintage. El Fender CP-60S Parlor es la opción económica. El Fender Highway Series Parlor es la opción moderna. El Gretsch G5021E Rancher Penguin Parlor es la opción única.",
    conclusion: "The CSF1M is the overall winner. The Jim Dandy owns the budget blues crown. The PRS SE P20e Tonare Parlor is the premium pick. The Epiphone L-00 Studio Parlor is the vintage pick. The Fender CP-60S Parlor is the budget pick. The Fender Highway Series Parlor is the modern pick. The Gretsch G5021E Rancher Penguin Parlor is the unique pick. All are reliable enough for professional use.",
    conclusion_es: "El CSF1M es la ganadora general. El Jim Dandy es el rey del blues económico. El PRS SE P20e Tonare Parlor es la opción premium. El Epiphone L-00 Studio Parlor es la opción vintage. El Fender CP-60S Parlor es la opción económica. El Fender Highway Series Parlor es la opción moderna. El Gretsch G5021E Rancher Penguin Parlor es la opción única. Todos son fiables para uso profesional."
  },
  'best-synth-vsts': {
    verdict: "The Spectrasonics Omnisphere 2 is the flagship. The Arturia Pigments 7 is the modern pick. The u-he Diva is the analog pick. The Native Instruments Massive X is the EDM pick. The Xfer Serum is the wavetable pick.",
    verdict_es: "El Spectrasonics Omnisphere 2 es el flagship. El Arturia Pigments 7 es la opción moderna. El u-he Diva es la opción analógica. El Native Instruments Massive X es la opción EDM. El Xfer Serum es la opción wavetable.",
    conclusion: "Omnisphere 2 is the flagship. Pigments 7 is the modern pick. Diva is the analog pick. Massive X is the EDM pick. Serum is the wavetable pick. All are reliable enough for professional use.",
    conclusion_es: "Omnisphere 2 es el flagship. Pigments 7 es la opción moderna. Diva es la opción analógica. Massive X es la opción EDM. Serum es la opción wavetable. Todos son fiables para uso profesional."
  },
  'best-wireless-iems': {
    verdict: "The Shure PSM 300 is the overall winner for reliability per dollar. The Xvive U4 owns the budget space. The Sennheiser EW IEM G4 owns the stage. The Sennheiser IE 900 is the audiophile pick. The Shure SE846 Gen 2 is the wired reference.",
    verdict_es: "El Shure PSM 300 es el ganador general por fiabilidad por dólar. El Xvive U4 es el espacio económico. El Sennheiser EW IEM G4 es el escenario. El Sennheiser IE 900 es la opción audiófila. El Shure SE846 Gen 2 es la referencia cableada.",
    conclusion: "The PSM 300 is the overall winner. The Xvive U4 owns the budget space. The Sennheiser EW IEM G4 owns the stage. The Sennheiser IE 900 is the audiophile pick. The Shure SE846 Gen 2 is the wired reference. All are reliable enough for professional use.",
    conclusion_es: "El PSM 300 es el ganador general. El Xvive U4 es el espacio económico. El Sennheiser EW IEM G4 es el escenario. El Sennheiser IE 900 es la opción audiófila. El Shure SE846 Gen 2 es la referencia cableada. Todos son fiables para uso profesional."
  },
  'budget-pa-systems': {
    verdict: "The EV ZLX-12P-G2 is the budget pick. The JBL EON712 is the mid-range pick. The Mackie Thump215XT is the value pick. The Alto Professional TS412 is the compact pick. The Yamaha DBR12 is the proven pick.",
    verdict_es: "El EV ZLX-12P-G2 es la opción económica. El JBL EON712 es la opción de gama media. El Mackie Thump215XT es la opción de valor. El Alto Professional TS412 es la opción compacta. El Yamaha DBR12 es la opción probada.",
    conclusion: "The ZLX-12P-G2 is the budget pick. The JBL EON712 is the mid-range pick. The Mackie Thump215XT is the value pick. The Alto Professional TS412 is the compact pick. The Yamaha DBR12 is the proven pick. All are reliable enough for professional use.",
    conclusion_es: "El ZLX-12P-G2 es la opción económica. El JBL EON712 es la opción de gama media. El Mackie Thump215XT es la opción de valor. El Alto Professional TS412 es la opción compacta. El Yamaha DBR12 es la opción probada. Todos son fiables para uso profesional."
  },
  'budget-usb-mics': {
    verdict: "The Samson Q2U is the best budget USB mic overall. The FIFINE AmpliGame AM8 is the smartest value pick. The HyperX SoloCast 2 is the gaming pick.",
    verdict_es: "El Samson Q2U es el mejor micrófono USB económico. El FIFINE AmpliGame AM8 es la opción de valor más inteligente. El HyperX SoloCast 2 es la opción gaming.",
    conclusion: "The Q2U is the best budget USB mic. The FIFINE AM8 is the smartest value pick. The HyperX SoloCast 2 is the gaming pick. All are reliable enough for professional streaming.",
    conclusion_es: "El Q2U es el mejor micrófono USB económico. El FIFINE AM8 es la opción de valor más inteligente. El HyperX SoloCast 2 es la opción gaming. Todos son fiables para streaming profesional."
  },
  'fx-plugins': {
    verdict: "The Soundtoys 5.5 Bundle is the bundle that matters — every plugin in it is a classic. The Eventide Blackhole is the ambient pick. The Cableguys ShaperBox 3 is the modulation pick. The XLN Audio RC-20 Retro Color is the vintage pick.",
    verdict_es: "El Soundtoys 5.5 Bundle es el bundle que importa — cada plugin en él es un clásico. El Eventide Blackhole es la opción ambiental. El Cableguys ShaperBox 3 es la opción de modulación. El XLN Audio RC-20 Retro Color es la opción vintage.",
    conclusion: "Start with the Soundtoys 5.5 Bundle. Add Blackhole for ambient. ShaperBox 3 for modulation. RC-20 Retro Color for vintage. All are reliable enough for professional use.",
    conclusion_es: "Empieza con el Soundtoys 5.5 Bundle. Añade Blackhole para ambiental. ShaperBox 3 para modulación. RC-20 Retro Color para vintage. Todos son fiables para uso profesional."
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
