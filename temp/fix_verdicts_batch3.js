const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));

const fixes = {
  'best-instrument-mics': {
    verdict: "Buy the Shure SM57 and the Electro-Voice RE20 first — together they cover guitar cabs, drums, bass and brass. Then add the Sennheiser e 906 for guitar, the Beyerdynamic M 201 TG for snare, the Audix D6 for kick, the Neumann KM 184 for acoustic, the Austrian Audio OC818 for versatility, the Royer R-121 for ribbon warmth, the Sennheiser MD 421 Kompakt for toms, the Coles 4038 for overheads, the DPA 4099 CORE for live, the Shure Beta 52A for kick, the Sennheiser e 604 for snare, and the Shure Beta 58A for vocals.",
    verdict_es: "Compra primero el Shure SM57 y el Electro-Voice RE20 — juntos cubren cajas de guitarra, batería, bajo y metales. Luego añade el Sennheiser e 906 para guitarra, el Beyerdynamic M 201 TG para caja, el Audix D6 para bombo, el Neumann KM 184 para acústica, el Austrian Audio OC818 para versatilidad, el Royer R-121 para calidez de ribbon, el Sennheiser MD 421 Kompakt para toms, el Coles 4038 para overheads, el DPA 4099 CORE para directo, el Shure Beta 52A para bombo, el Sennheiser e 604 para caja, y el Shure Beta 58A para voces.",
    conclusion: "The SM57 and RE20 are the foundation. The e 906 is the easiest to place on guitar. The M 201 TG adds weight to snare. The D6 is the kick drum specialist. The KM 184 is the acoustic guitar reference. The OC818 is the versatile condenser. The R-121 adds ribbon warmth. The MD 421 Kompakt brings weight to toms. The Coles 4038 is the overhead classic. The DPA 4099 CORE is the live pick. The Beta 52A is the kick alternative. The e 604 is the snare alternative. The Beta 58A is the vocal pick.",
    conclusion_es: "El SM57 y el RE20 son la base. El e 906 es el más fácil de colocar en guitarra. El M 201 TG añade peso a la caja. El D6 es el especialista en bombo. El KM 184 es la referencia para guitarra acústica. El OC818 es el condensador versátil. El R-121 añade calidez de ribbon. El MD 421 Kompakt aporta peso a los toms. El Coles 4038 es el clásico para overheads. El DPA 4099 CORE es la opción para directo. El Beta 52A es la alternativa para bombo. El e 604 es la alternativa para caja. El Beta 58A es la opción para voces."
  },
  'best-mic-for-podcasting': {
    verdict: "Shure SM7B for premium podcasting, Audio-Technica AT2005USB for budget, Rode NT1 for treated studios, Rode PodMic for multi-host shows, Hollyland MELO P1 for wireless, Shure SM58 for live, Rode Procaster for broadcast, Shure MV7+ for hybrid USB/XLR.",
    verdict_es: "Shure SM7B para podcasting premium, Audio-Technica AT2005USB para presupuesto, Rode NT1 para estudios tratados, Rode PodMic para multi-presentador, Hollyland MELO P1 para inalámbrico, Shure SM58 para directo, Rode Procaster para broadcast, Shure MV7+ para híbrido USB/XLR.",
    conclusion: "The Shure SM7B is the premium podcasting standard. The AT2005USB is the budget pick. The Rode NT1 is for treated studios. The PodMic is for multi-host shows. The MELO P1 is the wireless pick. The SM58 is the live pick. The Procaster is the broadcast pick. The MV7+ is the hybrid USB/XLR pick. All are reliable enough for professional podcasting.",
    conclusion_es: "El Shure SM7B es el estándar de podcasting premium. La AT2005USB es la opción económica. La Rode NT1 es para estudios tratados. El PodMic es para multi-presentador. El MELO P1 es la opción inalámbrica. El SM58 es la opción para directo. El Procaster es la opción de broadcast. El MV7+ es la opción híbrida USB/XLR. Todos son fiables para podcasting profesional."
  },
  'best-mic-for-guitar-amps': {
    verdict: "The Shure SM57 is the default. The Sennheiser e 906 is the easiest to place. The Shure i5 is the loud-value pick. The Shure Beta 57A is the hiss fix for weak preamps. The Beyerdynamic M 201 TG adds weight. The Shure SM7B is the broadcast pick. The Sennheiser MD 421 Kompakt brings weight to toms.",
    verdict_es: "El Shure SM57 es el estándar. El Sennheiser e 906 es el más fácil de colocar. El Shure i5 es la opción de valor para volumen alto. El Shure Beta 57A es la solución para ruido en previos débiles. El Beyerdynamic M 201 TG añade peso. El Shure SM7B es la opción de broadcast. El Sennheiser MD 421 Kompakt aporta peso a los toms.",
    conclusion: "The SM57 is the default guitar amp mic. The e 906 is the easiest to place. The i5 is the loud-value pick. The Beta 57A is the hiss fix for weak preamps. The M 201 TG adds weight. The SM7B is the broadcast pick. The MD 421 Kompakt brings weight to toms. All are reliable enough for professional recording.",
    conclusion_es: "El SM57 es el micrófono estándar para cajas de guitarra. El e 906 es el más fácil de colocar. El i5 es la opción de valor para volumen alto. El Beta 57A es la solución para ruido en previos débiles. El M 201 TG añade peso. El SM7B es la opción de broadcast. El MD 421 Kompakt aporta peso a los toms. Todos son fiables para grabación profesional."
  },
  'best-looper-pedals': {
    verdict: "The Boss RC-5 is the pick if you want rhythms, memory slots and serious looping control. The TC Electronic Ditto Looper wins for pure simplicity. The Boss RC-500 is the advanced workstation. The Ditto X4 adds stereo. The Electro-Harmonix 720 Stereo Looper is the budget stereo pick. The Electro-Harmonix 1440 Stereo Looper adds more time. The Boss RC-600 is the flagship workstation.",
    verdict_es: "El Boss RC-5 es la opción si quieres ritmos, slots de memoria y control serio de looping. El TC Electronic Ditto Looper gana por simplicidad pura. El Boss RC-500 es la estación de trabajo avanzada. El Ditto X4 añade estéreo. El Electro-Harmonix 720 Stereo Looper es la opción estéreo económica. El Electro-Harmonix 1440 Stereo Looper añade más tiempo. El Boss RC-600 es el flagship de estación de trabajo.",
    conclusion: "The RC-5 is the pick for rhythms and memory slots. The Ditto wins for pure simplicity. The RC-500 is the advanced workstation. The Ditto X4 adds stereo. The 720 is the budget stereo pick. The 1440 adds more time. The RC-600 is the flagship workstation. All are reliable enough for professional looping.",
    conclusion_es: "El RC-5 es la opción para ritmos y slots de memoria. El Ditto gana por simplicidad pura. El RC-500 es la estación de trabajo avanzada. El Ditto X4 añade estéreo. El 720 es la opción estéreo económica. El 1440 añade más tiempo. El RC-600 es el flagship de estación de trabajo. Todos son fiables para looping profesional."
  },
  'best-overdrive-distortion': {
    verdict: "The Boss BD-2 is the responsive, amp-like overdrive. The Ibanez TS9 is the mid-boost classic. The ProCo RAT 2 is the distortion pick. The MXR Phase 95 is the phase classic. The Fulltone OCD v2 is the transparent pick. The Wampler Tumnus Deluxe is the Klon-style pick. The JHS Morning Glory V4 is the blues pick. The Boss BD-2W Blues Driver Waza Craft is the premium version.",
    verdict_es: "El Boss BD-2 es el overdrive responsivo y tipo amplificador. El Ibanez TS9 es el clásico de medio empuje. El ProCo RAT 2 es la opción de distorsión. El MXR Phase 95 es el clásico de phase. El Fulltone OCD v2 es la opción transparente. El Wampler Tumnus Deluxe es la opción estilo Klon. El JHS Morning Glory V4 es la opción de blues. El Boss BD-2W Blues Driver Waza Craft es la versión premium.",
    conclusion: "The BD-2 is the responsive, amp-like overdrive. The TS9 is the mid-boost classic. The RAT 2 is the distortion pick. The Phase 95 is the phase classic. The OCD v2 is the transparent pick. The Tumnus Deluxe is the Klon-style pick. The Morning Glory V4 is the blues pick. The BD-2W is the premium version. All are reliable enough for professional use.",
    conclusion_es: "El BD-2 es el overdrive responsivo y tipo amplificador. El TS9 es el clásico de medio empuje. El RAT 2 es la opción de distorsión. El Phase 95 es el clásico de phase. El OCD v2 es la opción transparente. El Tumnus Deluxe es la opción estilo Klon. El Morning Glory V4 es la opción de blues. El BD-2W es la versión premium. Todos son fiables para uso profesional."
  },
  'best-reverb-delay': {
    verdict: "The Boss DD-8 is the versatile delay. The TC Electronic Hall of Fame 2 is the value reverb. The Strymon BigSky MX is the premium reverb. The Boss RC-5 Loop Station is the looper. The Strymon TimeLine is the premium delay. The Meris LVX is the modern pick. The Eventide TimeFactor is the classic. The Source Audio Nemesis is the versatile pick. The Keeley Caverns V2 is the budget pick. The Universal Audio Del-Verb is the UAD pick. The Universal Audio Golden Reverberator is the vintage pick. The Boss RV-200 is the compact pick.",
    verdict_es: "El Boss DD-8 es el delay versátil. El TC Electronic Hall of Fame 2 es el reverb de valor. El Strymon BigSky MX es el reverb premium. El Boss RC-5 Loop Station es el looper. El Strymon TimeLine es el delay premium. El Meris LVX es la opción moderna. El Eventide TimeFactor es el clásico. El Source Audio Nemesis es la opción versátil. El Keeley Caverns V2 es la opción económica. El Universal Audio Del-Verb es la opción UAD. El Universal Audio Golden Reverberator es la opción vintage. El Boss RV-200 es la opción compacta.",
    conclusion: "The DD-8 is the versatile delay. The Hall of Fame 2 is the value reverb. The BigSky MX is the premium reverb. The RC-5 is the looper. The TimeLine is the premium delay. The LVX is the modern pick. The TimeFactor is the classic. The Nemesis is the versatile pick. The Caverns V2 is the budget pick. The Del-Verb is the UAD pick. The Golden Reverberator is the vintage pick. The RV-200 is the compact pick. All are reliable enough for professional use.",
    conclusion_es: "El DD-8 es el delay versátil. El Hall of Fame 2 es el reverb de valor. El BigSky MX es el reverb premium. El RC-5 es el looper. El TimeLine es el delay premium. El LVX es la opción moderna. El TimeFactor es el clásico. El Nemesis es la opción versátil. El Caverns V2 es la opción económica. El Del-Verb es la opción UAD. El Golden Reverberator es la opción vintage. El RV-200 es la opción compacta. Todos son fiables para uso profesional."
  },
  'best-practice-amps': {
    verdict: "The Boss Katana 50 Gen 3 is the versatility winner. The Fender Champion II 25 is the straightforward beginner amp. The Orange Crush 35RT is the value pick. The Yamaha THR10II is the desktop pick. The Positive Grid Spark 2 is the smart pick. The Boss Waza-Air is the wireless pick.",
    verdict_es: "El Boss Katana 50 Gen 3 es el ganador en versatilidad. El Fender Champion II 25 es el amplificador sencillo para principiantes. El Orange Crush 35RT es la opción de valor. El Yamaha THR10II es la opción de escritorio. El Positive Grid Spark 2 es la opción inteligente. El Boss Waza-Air es la opción inalámbrica.",
    conclusion: "The Katana 50 is the versatility winner with effects, presets and headphone practice. The Champion II 25 is a straightforward beginner amp. The Crush 35RT is the value pick. The THR10II is the desktop pick. The Spark 2 is the smart pick. The Waza-Air is the wireless pick. All are reliable enough for professional practice.",
    conclusion_es: "El Katana 50 es el ganador en versatilidad con efectos, presets y práctica con auriculares. El Champion II 25 es un amplificador sencillo para principiantes. El Crush 35RT es la opción de valor. El THR10II es la opción de escritorio. El Spark 2 es la opción inteligente. El Waza-Air es la opción inalámbrica. Todos son fiables para práctica profesional."
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
