const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));

const fixes = {
  'best-bass-amps': {
    verdict: "The Fender Rumble 500 V3 is the portability pick with lightweight power for gigging bassists. The Ampeg Rocket Bass RB-210 is classic Ampeg tone in a complete combo. The Boss Katana-110 Bass is the modeling pick. The Fender Rumble 40 V3 is the practice pick. The Markbass is the pro pick.",
    verdict_es: "El Fender Rumble 500 V3 es la opción de portabilidad con potencia ligera para bajistas de directo. El Ampeg Rocket Bass RB-210 es el tono clásico Ampeg en combo completo. El Boss Katana-110 Bass es la opción de modelado. El Fender Rumble 40 V3 es la opción de práctica. El Markbass es la opción pro.",
    conclusion: "The Rumble 500 V3 is the portability pick. The RB-210 is classic Ampeg tone. The Katana-110 Bass is the modeling pick. The Rumble 40 V3 is the practice pick. The Markbass is the pro pick. All are reliable enough for professional use.",
    conclusion_es: "El Rumble 500 V3 es la opción de portabilidad. El RB-210 es el tono clásico Ampeg. El Katana-110 Bass es la opción de modelado. El Rumble 40 V3 es la opción de práctica. El Markbass es la opción pro. Todos son fiables para uso profesional."
  },
  'best-bass-practice-amps': {
    verdict: "The Fender Rumble 40 V3 is the best all-round pick. The Positive Grid Spark MINI is the smart pick. The Yamaha THR30II Wireless Desktop Amp is the desktop pick. The Orange Crush Bass 25 is the value pick. The Boss WAZA-AIR Bass is the wireless pick. The Darkglass DG210A Microtubes 500 2x10 Bass Combo is the pro pick.",
    verdict_es: "El Fender Rumble 40 V3 es la mejor opción todoterreno. El Positive Grid Spark MINI es la opción inteligente. El Yamaha THR30II Wireless Desktop Amp es la opción de escritorio. El Orange Crush Bass 25 es la opción de valor. El Boss WAZA-AIR Bass es la opción inalámbrica. El Darkglass DG210A Microtubes 500 2x10 Bass Combo es la opción pro.",
    conclusion: "The Rumble 40 V3 is the best all-round pick. The Spark MINI is the smart pick. The THR30II is the desktop pick. The Crush Bass 25 is the value pick. The WAZA-AIR Bass is the wireless pick. The DG210A is the pro pick. All are reliable enough for professional practice.",
    conclusion_es: "El Rumble 40 V3 es la mejor opción todoterreno. El Spark MINI es la opción inteligente. El THR30II es la opción de escritorio. El Crush Bass 25 es la opción de valor. El WAZA-AIR Bass es la opción inalámbrica. El DG210A es la opción pro. Todos son fiables para práctica profesional."
  },
  'best-multi-effects-pedals': {
    verdict: "The Line 6 Helix HX Stomp is the pro modeling pick that replaces a whole board. The Boss GX-1 is the value pick. The Boss ME-90 is the hands-on Boss pick. The HeadRush Flex Prime is the touchscreen amp-modeling choice. The Zoom G11 is the budget pick. The Boss GT-1000CORE is the flagship pick. The Neural DSP Quad Cortex is the modern flagship. The Mooer GE300 is the compact value pick.",
    verdict_es: "El Line 6 Helix HX Stomp es la opción de modelado pro que reemplaza todo un pedalboard. El Boss GX-1 es la opción de valor. El Boss ME-90 es la opción manual de Boss. El HeadRush Flex Prime es la opción de modelado con pantalla táctil. El Zoom G11 es la opción económica. El Boss GT-1000CORE es la opción flagship. El Neural DSP Quad Cortex es el flagship moderno. El Mooer GE300 es la opción compacta de valor.",
    conclusion: "The HX Stomp is the pro modeling pick. The GX-1 is the value pick. The ME-90 is the hands-on Boss pick. The Flex Prime is the touchscreen choice. The G11 is the budget pick. The GT-1000CORE is the flagship pick. The Quad Cortex is the modern flagship. The GE300 is the compact value pick. All are reliable enough for professional use.",
    conclusion_es: "El HX Stomp es la opción de modelado pro. El GX-1 es la opción de valor. El ME-90 es la opción manual de Boss. El Flex Prime es la opción con pantalla táctil. El G11 es la opción económica. El GT-1000CORE es la opción flagship. El Quad Cortex es el flagship moderno. El GE300 es la opción compacta de valor. Todos son fiables para uso profesional."
  },
  'best-pa-speakers': {
    verdict: "The QSC K12.2 is the pro standard. The EV ZLX-12P-G2 is the budget pick. The Yamaha DXR12mkII is the scalable pick. The Mackie Thump215XT is the value pick. The EV ELX200-15P is the step-up pick. The JBL PRX915 is the premium pick.",
    verdict_es: "El QSC K12.2 es el estándar pro. El EV ZLX-12P-G2 es la opción económica. El Yamaha DXR12mkII es la opción escalable. El Mackie Thump215XT es la opción de valor. El EV ELX200-15P es la opción escalón. El JBL PRX915 es la opción premium.",
    conclusion: "The K12.2 is the pro standard. The ZLX-12P-G2 is the budget pick. The DXR12mkII is the scalable pick. The Thump215XT is the value pick. The ELX200-15P is the step-up pick. The PRX915 is the premium pick. All are reliable enough for professional use.",
    conclusion_es: "El K12.2 es el estándar pro. El ZLX-12P-G2 es la opción económica. El DXR12mkII es la opción escalable. El Thump215XT es la opción de valor. El ELX200-15P es la opción escalón. El PRX915 es la opción premium. Todos son fiables para uso profesional."
  },
  'best-shotgun-mics': {
    verdict: "The Sennheiser MKH 416 wins on proven reliability. The Rode NTG5 wins on weight and noise floor. The Sennheiser MKE 600 wins for everyone else. The Audio-Technica AT875R is the compact pick. The Deity S-Mic 3 is the value pick. The Rode VideoMic NTG is the on-camera pick. The Sennheiser MKE 400 is the budget pick. The Sennheiser MKH 50-P48 is the supercardioid pick. The Rode NTG3 is the compact pro pick. The Audio-Technica AT897 is the budget on-camera pick.",
    verdict_es: "El Sennheiser MKH 416 gana en fiabilidad probada. El Rode NTG5 gana en peso y piso de ruido. El Sennheiser MKE 600 gana para todos los demás. El Audio-Technica AT875R es la opción compacta. El Deity S-Mic 3 es la opción de valor. El Rode VideoMic NTG es la opción para cámara. El Sennheiser MKE 400 es la opción económica. El Sennheiser MKH 50-P48 es la opción supercardioide. El Rode NTG3 es la opción pro compacta. El Audio-Technica AT897 es la opción económica para cámara.",
    conclusion: "The MKH 416 wins on proven reliability. The NTG5 wins on weight and noise floor. The MKE 600 wins for everyone else. The AT875R is the compact pick. The S-Mic 3 is the value pick. The VideoMic NTG is the on-camera pick. The MKE 400 is the budget pick. The MKH 50-P48 is the supercardioid pick. The NTG3 is the compact pro pick. The AT897 is the budget on-camera pick. All are reliable enough for professional use.",
    conclusion_es: "El MKH 416 gana en fiabilidad probada. El NTG5 gana en peso y piso de ruido. El MKE 600 gana para todos los demás. El AT875R es la opción compacta. El S-Mic 3 es la opción de valor. El VideoMic NTG es la opción para cámara. El MKE 400 es la opción económica. El MKH 50-P48 es la opción supercardioide. El NTG3 es la opción pro compacta. El AT897 es la opción económica para cámara. Todos son fiables para uso profesional."
  },
  'best-plugins': {
    verdict: "FabFilter Pro-Q for EQ. Valhalla VintageVerb for reverb. TDR Nova for free dynamic EQ. Universal Audio 1176 for analog character. FabFilter Total Bundle for precision. FabFilter Pro-C 3 for compression. iZotope Ozone 12 Advanced for mastering. Soundtoys 5.5 Bundle for creative effects. Native Instruments Komplete 26 Ultimate for production variety.",
    verdict_es: "FabFilter Pro-Q para EQ. Valhalla VintageVerb para reverb. TDR Nova para EQ dinámico gratuito. Universal Audio 1176 para carácter analógico. FabFilter Total Bundle para precisión. FabFilter Pro-C 3 para compresión. iZotope Ozone 12 Advanced para masterización. Soundtoys 5.5 Bundle para efectos creativos. Native Instruments Komplete 26 Ultimate para variedad de producción.",
    conclusion: "FabFilter Pro-Q is the EQ pick. Valhalla VintageVerb is the reverb pick. TDR Nova is the free dynamic EQ pick. The 1176 is the analog character pick. FabFilter Total Bundle is the precision pick. Pro-C 3 is the compression pick. Ozone 12 Advanced is the mastering pick. Soundtoys 5.5 Bundle is the creative effects pick. Komplete 26 Ultimate is the production variety pick. All are reliable enough for professional use.",
    conclusion_es: "FabFilter Pro-Q es la opción de EQ. Valhalla VintageVerb es la opción de reverb. TDR Nova es la opción de EQ dinámico gratuito. El 1176 es la opción de carácter analógico. FabFilter Total Bundle es la opción de precisión. Pro-C 3 es la opción de compresión. Ozone 12 Advanced es la opción de masterización. Soundtoys 5.5 Bundle es la opción de efectos creativos. Komplete 26 Ultimate es la opción de variedad de producción. Todos son fiables para uso profesional."
  },
  'di-box': {
    verdict: "The Radial J48 MK2 is the best all-around active DI. The Rupert Neve Designs RNDI is the premium color pick. The Tech 21 SansAmp Bass Driver DI v2 is the bass pick. The Radial ProD2 is the passive stereo pick. The LR Baggs Para Acoustic DI is the acoustic pick.",
    verdict_es: "El Radial J48 MK2 es la mejor DI activa todoterreno. El Rupert Neve Designs RNDI es la opción de color premium. El Tech 21 SansAmp Bass Driver DI v2 es la opción para bajo. El Radial ProD2 es la opción pasiva estéreo. El LR Baggs Para Acoustic DI es la opción para acústica.",
    conclusion: "The Radial J48 MK2 is the best all-around active DI. The RNDI is the premium color pick. The SansAmp Bass Driver DI v2 is the bass pick. The ProD2 is the passive stereo pick. The Para Acoustic DI is the acoustic pick. All are reliable enough for professional use.",
    conclusion_es: "El Radial J48 MK2 es la mejor DI activa todoterreno. El RNDI es la opción de color premium. El SansAmp Bass Driver DI v2 es la opción para bajo. El ProD2 es la opción pasiva estéreo. El Para Acoustic DI es la opción para acústica. Todos son fiables para uso profesional."
  },
  'best-hardware-samplers': {
    verdict: "The Roland SP-404MKII is the classic sound with hands-on sampling. The Akai MPC Sample is the best value and portability. The Akai MPC One G2 is the full standalone. The Elektron Digitakt II is the deep sampler. The Teenage Engineering EP-133 K.O. II is the pocket pick. The Akai MPC Live III is the flagship. The Polyend Tracker Mini is the tracker pick.",
    verdict_es: "El Roland SP-404MKII es el sonido clásico con muestreo manual. El Akai MPC Sample es el mejor valor y portabilidad. El Akai MPC One G2 es el autónomo completo. El Elektron Digitakt II es el muestreador profundo. El Teenage Engineering EP-133 K.O. II es la opción de bolsillo. El Akai MPC Live III es el flagship. El Polyend Tracker Mini es la opción tracker.",
    conclusion: "The SP-404MKII is the classic sound with hands-on sampling. The MPC Sample is the best value. The MPC One G2 is the full standalone. The Digitakt II is the deep sampler. The EP-133 K.O. II is the pocket pick. The MPC Live III is the flagship. The Polyend Tracker Mini is the tracker pick. All are reliable enough for professional use.",
    conclusion_es: "El SP-404MKII es el sonido clásico con muestreo manual. El MPC Sample es el mejor valor. El MPC One G2 es el autónomo completo. El Digitakt II es el muestreador profundo. El EP-133 K.O. II es la opción de bolsillo. El MPC Live III es el flagship. El Polyend Tracker Mini es la opción tracker. Todos son fiables para uso profesional."
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
