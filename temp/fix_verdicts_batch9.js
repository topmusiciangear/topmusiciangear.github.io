const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));

const fixes = {
  'stage-mics': {
    verdict: "The Shure SM58 handles all-round live vocals. Step to the Shure Beta 58A for louder stages. The Sennheiser e935 is the feedback-resistant pick. The Sennheiser EW-D Dual Wireless System is the wireless pick. The Telefunken M80 is the premium pick. The Audix OM7 is the high-SPL pick. The Electro-Voice ND86 is the value pick.",
    verdict_es: "El Shure SM58 maneja voces en directo todoterreno. El Shure Beta 58A es para escenarios más ruidosos. El Sennheiser e935 es la opción resistente a realimentación. El Sennheiser EW-D Dual Wireless System es la opción inalámbrica. El Telefunken M80 es la opción premium. El Audix OM7 es la opción de alto SPL. El Electro-Voice ND86 es la opción de valor.",
    conclusion: "The SM58 handles all-round live vocals. The Beta 58A is for louder stages. The e935 is the feedback-resistant pick. The EW-D Dual Wireless System is the wireless pick. The M80 is the premium pick. The OM7 is the high-SPL pick. The ND86 is the value pick. All are reliable enough for professional use.",
    conclusion_es: "El SM58 maneja voces en directo todoterreno. El Beta 58A es para escenarios más ruidosos. El e935 es la opción resistente a realimentación. El EW-D Dual Wireless System es la opción inalámbrica. El M80 es la opción premium. El OM7 es la opción de alto SPL. El ND86 es la opción de valor. Todos son fiables para uso profesional."
  },
  'stage-wedges': {
    verdict: "The Electro-Voice PXM-12MP is the most practical for most working bands. The RCF NX 912-SMA is for maximum power on loud stages. The Yamaha DHR12M is the balanced value pick. The Turbosound Flashline TFX122M-AN is the premium pick. The LD Systems MON 12 A G3 is the budget pick.",
    verdict_es: "El Electro-Voice PXM-12MP es el más práctico para la mayoría de bandas. El RCF NX 912-SMA es para máxima potencia en escenarios ruidosos. El Yamaha DHR12M es la opción de valor equilibrado. El Turbosound Flashline TFX122M-AN es la opción premium. El LD Systems MON 12 A G3 es la opción económica.",
    conclusion: "The PXM-12MP is the most practical for most working bands. The NX 912-SMA is for maximum power. The DHR12M is the balanced value pick. The TFX122M-AN is the premium pick. The MON 12 A G3 is the budget pick. All are reliable enough for professional use.",
    conclusion_es: "El PXM-12MP es el más práctico para la mayoría de bandas. El NX 912-SMA es para máxima potencia. El DHR12M es la opción de valor equilibrado. El TFX122M-AN es la opción premium. El MON 12 A G3 es la opción económica. Todos son fiables para uso profesional."
  },
  'stage-wireless': {
    verdict: "The Shure BLX288 is the smart pick for local gigs. Move up to the Sennheiser EW 100 G4 when touring. The Shure BLX24R/SM58 is the budget vocal pick. The Sennheiser EW-D 835-S is the digital upgrade.",
    verdict_es: "El Shure BLX288 es la opción inteligente para locales. El Sennheiser EW 100 G4 es para giras. El Shure BLX24R/SM58 es la opción de voz económica. El Sennheiser EW-D 835-S es la actualización digital.",
    conclusion: "The BLX288 is the smart pick for local gigs. The EW 100 G4 is for touring. The BLX24R/SM58 is the budget vocal pick. The EW-D 835-S is the digital upgrade. All are reliable enough for professional use.",
    conclusion_es: "El BLX288 es la opción inteligente para locales. El EW 100 G4 es para giras. El BLX24R/SM58 es la opción de voz económica. El EW-D 835-S es la actualización digital. Todos son fiables para uso profesional."
  },
  'live-sound-pa': {
    verdict: "The JBL EON712 is for powered speakers. The Behringer XR18 is for budget digital mixing. The Yamaha TF1 is for professional live sound. The EV ZLX-12P-G2 is the budget pick. The QSC K12.2 is the pro pick. The Yamaha DXR12mkII is the scalable pick. The Yamaha Stagepas 1K MKII is the portable pick. The JBL PRX ONE is the column pick. The Alto Professional TS412 is the value pick. The Electro-Voice EVERSE 12 is the battery pick.",
    verdict_es: "El JBL EON712 es para altavoces activos. El Behringer XR18 es para mezcla digital económica. El Yamaha TF1 es para sonido directo profesional. El EV ZLX-12P-G2 es la opción económica. El QSC K12.2 es la opción pro. El Yamaha DXR12mkII es la opción escalable. El Yamaha Stagepas 1K MKII es la opción portátil. El JBL PRX ONE es la opción de columna. El Alto Professional TS412 es la opción de valor. El Electro-Voice EVERSE 12 es la opción de batería.",
    conclusion: "The EON712 is for powered speakers. The XR18 is for budget digital mixing. The TF1 is for professional live sound. The ZLX-12P-G2 is the budget pick. The K12.2 is the pro pick. The DXR12mkII is the scalable pick. The Stagepas 1K MKII is the portable pick. The PRX ONE is the column pick. The TS412 is the value pick. The EVERSE 12 is the battery pick. All are reliable enough for professional use.",
    conclusion_es: "El EON712 es para altavoces activos. El XR18 es para mezcla digital económica. El TF1 es para sonido directo profesional. El ZLX-12P-G2 es la opción económica. El K12.2 es la opción pro. El DXR12mkII es la opción escalable. El Stagepas 1K MKII es la opción portátil. El PRX ONE es la opción de columna. El TS412 es la opción de valor. El EVERSE 12 es la opción de batería. Todos son fiables para uso profesional."
  },
  'starter-studio': {
    verdict: "This is the best overall starter studio: a reliable interface, a real dynamic mic, decent headphones, and monitoring that doesn't lie. The Focusrite Scarlett 2i2 4th Gen is the interface pick. The Shure SM7B is the mic pick. The Rode NT1 5th Generation is the condenser pick. The SSL 2+ MKII is the analog character pick. The KRK Rokit 7 G5 is the monitor pick. The Yamaha HS8 is the reference monitor pick. The Universal Audio Apollo Twin X Gen 2 is the premium interface pick. The Neumann TLM 102 is the premium mic pick. The Rode NT1 Signature Series is the project studio pick. The Audio-Technica ATH-M50x is the headphone pick.",
    verdict_es: "Este es el mejor estudio de inicio: una interfaz fiable, un dinámico real, auriculares decentes y monitores que no mienten. La Focusrite Scarlett 2i2 4th Gen es la opción de interfaz. El Shure SM7B es la opción de micrófono. El Rode NT1 5th Generation es la opción de condensador. El SSL 2+ MKII es la opción de carácter analógico. El KRK Rokit 7 G5 es la opción de monitor. El Yamaha HS8 es el monitor de referencia. El Universal Audio Apollo Twin X Gen 2 es la opción de interfaz premium. El Neumann TLM 102 es la opción de micrófono premium. El Rode NT1 Signature Series es la opción de proyecto de estudio. El Audio-Technica ATH-M50x es la opción de auriculares.",
    conclusion: "The Scarlett 2i2 is the interface pick. The SM7B is the mic pick. The NT1 5th Generation is the condenser pick. The SSL 2+ MKII is the analog character pick. The Rokit 7 G5 is the monitor pick. The Yamaha HS8 is the reference monitor pick. The Apollo Twin X Gen 2 is the premium interface pick. The Neumann TLM 102 is the premium mic pick. The NT1 Signature Series is the project studio pick. The ATH-M50x is the headphone pick. All are reliable enough for professional use.",
    conclusion_es: "La Scarlett 2i2 es la opción de interfaz. El SM7B es la opción de micrófono. El NT1 5th Generation es la opción de condensador. El SSL 2+ MKII es la opción de carácter analógico. El Rokit 7 G5 es la opción de monitor. El Yamaha HS8 es el monitor de referencia. El Apollo Twin X Gen 2 es la opción de interfaz premium. El Neumann TLM 102 es la opción de micrófono premium. El NT1 Signature Series es la opción de proyecto de estudio. El ATH-M50x es la opción de auriculares. Todos son fiables para uso profesional."
  },
  'stream-controllers': {
    verdict: "The Elgato Stream Deck+ is the total control pick. The Rode Streamer X is the audio interface pick. The Elgato Wave XLR MK.2 is the budget audio pick. The RØDE RØDECaster Pro II is the podcast mixer pick. The Roland Bridge Cast X is the gaming pick. The Mackie DLZ Creator is the compact mixer pick. The Tascam Mixcast 4 is the podcast pick.",
    verdict_es: "El Elgato Stream Deck+ es la opción de control total. El Rode Streamer X es la opción de interfaz de audio. El Elgato Wave XLR MK.2 es la opción de audio económica. El RØDE RØDECaster Pro II es la opción de mezclador de podcast. El Roland Bridge Cast X es la opción gaming. El Mackie DLZ Creator es la opción de mezclador compacto. El Tascam Mixcast 4 es la opción de podcast.",
    conclusion: "The Stream Deck+ is the total control pick. The Streamer X is the audio interface pick. The Wave XLR MK.2 is the budget audio pick. The RØDECaster Pro II is the podcast mixer pick. The Bridge Cast X is the gaming pick. The DLZ Creator is the compact mixer pick. The Mixcast 4 is the podcast pick. All are reliable enough for professional streaming.",
    conclusion_es: "El Stream Deck+ es la opción de control total. El Streamer X es la opción de interfaz de audio. El Wave XLR MK.2 es la opción de audio económica. El RØDECaster Pro II es la opción de mezclador de podcast. El Bridge Cast X es la opción gaming. El DLZ Creator es la opción de mezclador compacto. El Mixcast 4 es la opción de podcast. Todos son fiables para streaming profesional."
  },
  'studio-furniture': {
    verdict: "Before another microphone or plugin, build your foundation: proper desk, stands, and cable management. The K&M 26722 Monitor Stands are the monitor stand pick. The K&M 210/2 Mic Stand is the mic stand pick. The Mogami Gold Studio XLR Cable is the cable pick. The SSL UF8 DAW Controller is the controller pick.",
    verdict_es: "Antes de otro micrófono o plugin, construye tu base: escritorio adecuado, soportes y gestión de cables. Los K&M 26722 Monitor Stands son la opción de soporte de monitor. El K&M 210/2 Mic Stand es la opción de soporte de micrófono. El Mogami Gold Studio XLR Cable es la opción de cable. El SSL UF8 DAW Controller es la opción de controlador.",
    conclusion: "The K&M 26722 Monitor Stands are the monitor stand pick. The K&M 210/2 Mic Stand is the mic stand pick. The Mogami Gold Studio XLR Cable is the cable pick. The SSL UF8 DAW Controller is the controller pick. All are reliable enough for professional studio setup.",
    conclusion_es: "Los K&M 26722 Monitor Stands son la opción de soporte de monitor. El K&M 210/2 Mic Stand es la opción de soporte de micrófono. El Mogami Gold Studio XLR Cable es la opción de cable. El SSL UF8 DAW Controller es la opción de controlador. Todos son fiables para configuración de estudio profesional."
  },
  'monitor-setup': {
    verdict: "Start with the Yamaha HS8 on K&M 26722 Monitor Stands: honest 38 Hz–30 kHz translation plus tweeters at ear height beats any speaker swap. The IsoAcoustics ISO-200 (Pair) are the isolation pick. The Ultimate Support MS-100 (Pair) are the budget stand pick.",
    verdict_es: "Empieza con el Yamaha HS8 en K&M 26722 Monitor Stands: traducción honesta de 38 Hz–30 kHz más tweeters a la altura de los oídos. Los IsoAcoustics ISO-200 (Pair) son la opción de aislamiento. Los Ultimate Support MS-100 (Pair) son la opción de soporte económico.",
    conclusion: "The Yamaha HS8 on K&M 26722 Monitor Stands is the foundation. The IsoAcoustics ISO-200 (Pair) are the isolation pick. The Ultimate Support MS-100 (Pair) are the budget stand pick. All are reliable enough for professional mixing.",
    conclusion_es: "El Yamaha HS8 en K&M 26722 Monitor Stands es la base. Los IsoAcoustics ISO-200 (Pair) son la opción de aislamiento. Los Ultimate Support MS-100 (Pair) son la opción de soporte económico. Todos son fiables para mezcla profesional."
  },
  'mixing-plugins': {
    verdict: "The FabFilter Total Bundle is the precision toolset for surgical mixing and mastering. Add the iZotope Ozone 12 Advanced for mastering. The Universal Audio 1176 Classic Limiter Collection is the analog character pick. The Baby Audio Smooth Operator Pro is the resonance pick. The FabFilter Pro-Q 4 is the EQ pick.",
    verdict_es: "El FabFilter Total Bundle es el conjunto de herramientas de precisión para mezcla y masterización quirúrgica. Añade el iZotope Ozone 12 Advanced para masterización. El Universal Audio 1176 Classic Limiter Collection es la opción de carácter analógico. El Baby Audio Smooth Operator Pro es la opción de resonancia. El FabFilter Pro-Q 4 es la opción de EQ.",
    conclusion: "The FabFilter Total Bundle is the precision toolset. The Ozone 12 Advanced is the mastering pick. The 1176 Classic Limiter Collection is the analog character pick. The Smooth Operator Pro is the resonance pick. The Pro-Q 4 is the EQ pick. All are reliable enough for professional use.",
    conclusion_es: "El FabFilter Total Bundle es el conjunto de herramientas de precisión. El Ozone 12 Advanced es la opción de masterización. El 1176 Classic Limiter Collection es la opción de carácter analógico. El Smooth Operator Pro es la opción de resonancia. El Pro-Q 4 es la opción de EQ. Todos son fiables para uso profesional."
  },
  'mics-for-creators': {
    verdict: "The Samson Q2U at $70 is the one to beat for beginners: USB and XLR in the same body. The Rode PodMic USB is the podcast pick. The Audio-Technica AT2040USB is the budget condenser pick.",
    verdict_es: "El Samson Q2U a $70 es el que hay que vencer para principiantes: USB y XLR en el mismo cuerpo. El Rode PodMic USB es la opción de podcast. El Audio-Technica AT2040USB es la opción de condensador económica.",
    conclusion: "The Q2U is the one to beat for beginners. The PodMic USB is the podcast pick. The AT2040USB is the budget condenser pick. All are reliable enough for professional use.",
    conclusion_es: "El Q2U es el que hay que vencer para principiantes. El PodMic USB es la opción de podcast. El AT2040USB es la opción de condensador económica. Todos son fiables para uso profesional."
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
