const fs = require('fs');
const path = require('path');
const g = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/guides.json'), 'utf8'));
const p = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf8'));

const rewrites = {
  'ableton-vs-fl-studio': {
    verdict: "Ableton Live 12 Suite is the live-performance and sound-design powerhouse with the session view no other DAW matches. FL Studio Producer Edition is the beat-making favorite with lifetime free updates and a pattern-based workflow that keeps ideas flowing.",
    verdict_es: "Ableton Live 12 Suite es el poderoso para live-performance y diseño de sonido con la session view que ningún otro DAW iguala. FL Studio Producer Edition es la favorita para beat-making con actualizaciones gratuitas de por vida y un flujo de trabajo basado en patrones.",
    conclusion: "Choose Ableton Live 12 Suite for live performance and sound design. Choose FL Studio Producer Edition for beat-making with lifetime updates. Both are top-tier DAWs that excel in different areas.",
    conclusion_es: "Elige Ableton Live 12 Suite para live performance y diseño de sonido. Elige FL Studio Producer Edition para beat-making con actualizaciones de por vida. Ambos son DAW de primer nivel que sobresalen en áreas diferentes."
  },
  'ai-tools-plugins': {
    verdict: "Sonible smart:EQ 4 is the AI EQ that learns your mix. iZotope Neutron 5 is the mixing assistant that suggests settings. Mastering The Mix MIXVAULT is the reference library. Sonible smart:limit is the transparent limiter.",
    verdict_es: "Sonible smart:EQ 4 es el EQ con IA que aprende de tu mezcla. iZotope Neutron 5 es el asistente de mezcla que sugiere ajustes. Mastering The Mix MIXVAULT es la biblioteca de referencia. Sonible smart:limit es el limitador transparente.",
    conclusion: "Sonible smart:EQ 4 learns your mix. Neutron 5 suggests mixing settings. MIXVAULT provides reference tracks. smart:limit delivers transparent limiting. All are reliable enough for professional AI-assisted mixing.",
    conclusion_es: "Sonible smart:EQ 4 aprende de tu mezcla. Neutron 5 sugiere ajustes de mezcla. MIXVAULT proporciona pistas de referencia. smart:limit ofrece limitación transparente. Todos son fiables para mezcla profesional asistida por IA."
  },
  'apollo-vs-babyface': {
    verdict: "If you want to track through UAD's analog emulations with near-zero latency, the Apollo Twin X Gen 2 is the obvious choice. If you want the most stable drivers and lowest latency for pure recording, the Babyface Pro FS is the pick.",
    verdict_es: "Si quieres grabar a través de las emulaciones analógicas de UAD con latencia cercana a cero, el Apollo Twin X Gen 2 es la elección obvia. Si quieres los drivers más estables y la menor latencia para grabación pura, el Babyface Pro FS es la opción.",
    conclusion: "The Apollo Twin X Gen 2 wins for UAD DSP. The Babyface Pro FS wins for driver stability and pure recording. Both are excellent interfaces that serve different workflows.",
    conclusion_es: "El Apollo Twin X Gen 2 gana por UAD DSP. El Babyface Pro FS gana por estabilidad de drivers y grabación pura. Ambos son interfaces excelentes que sirven flujos de trabajo diferentes."
  },
  'beat-making': {
    verdict: "The Akai MPC One G2 is the standalone beat-making hub. Ableton Live 12 Suite is the DAW-based production powerhouse. The Roland TR-8S is the hands-on drum machine. The Arturia KeyLab Essential 61 MkIII is the MIDI controller. The Focusrite Scarlett 2i2 4th Gen is the audio interface. The Beyerdynamic DT 770 Pro is the headphone pick. The Shure SM7B is the mic pick.",
    verdict_es: "El Akai MPC One G2 es el centro de beat-making autónomo. Ableton Live 12 Suite es el poderoso de producción DAW. El Roland TR-8S es la caja de ritmos manual. El Arturia KeyLab Essential 61 MkIII es el controlador MIDI. La Focusrite Scarlett 2i2 4th Gen es la interfaz de audio. El Beyerdynamic DT 770 Pro es la opción de auriculares. El Shure SM7B es la opción de micrófono.",
    conclusion: "The MPC One G2 is the standalone hub. Ableton Live 12 Suite is the DAW powerhouse. The Roland TR-8S is the hands-on drum machine. The KeyLab Essential 61 is the MIDI controller. The Scarlett 2i2 is the interface. The DT 770 Pro is the headphone pick. The SM7B is the mic pick.",
    conclusion_es: "El MPC One G2 es el centro autónomo. Ableton Live 12 Suite es el poderoso DAW. El Roland TR-8S es la caja de ritmos manual. El KeyLab Essential 61 es el controlador MIDI. La Scarlett 2i2 es la interfaz. El DT 770 Pro es la opción de auriculares. El SM7B es la opción de micrófono."
  },
  'beatmaker-plugins': {
    verdict: "The best beatmaking plugins are the ones that instantly add character, vibe, and inspiration. XLN Audio RC-20 Retro Color adds vintage warmth. Baby Audio Transit 2 is the modulation powerhouse. Plugin Boutique Scaler 3 is the theory tool. Excite Audio Lifeline Expanse is the ambient pick.",
    verdict_es: "Los mejores plugins de beatmaking son los que instantáneamente añaden carácter, vibe e inspiración. XLN Audio RC-20 Retro Color añade calidez vintage. Baby Audio Transit 2 es el poderoso de modulación. Plugin Boutique Scaler 3 es la herramienta de teoría. Excite Audio Lifeline Expanse es la opción ambiental.",
    conclusion: "Start with RC-20 Retro Color for vintage warmth. Add Transit 2 for modulation. Scaler 3 for theory. Lifeline Expanse for ambient. All are reliable enough for professional beatmaking.",
    conclusion_es: "Empieza con RC-20 Retro Color para calidez vintage. Añade Transit 2 para modulación. Scaler 3 para teoría. Lifeline Expanse para ambiental. Todos son fiables para beatmaking profesional."
  },
  'best-5-string-basses': {
    verdict: "Starting on five strings? Ibanez GSR205B, Sterling by Music Man SUB Ray5, Yamaha TRBX305 or Squier Affinity Jazz Bass V. Gigging weekly? Schecter Stiletto Stealth-5, Yamaha BB435, Ibanez SR505A or Squier Classic Vibe 70s Jazz Bass V. Studio? Fender American Professional II Jazz Bass V, Fender American Ultra II Jazz Bass V or Ibanez EHB1005MS Headless Bass.",
    verdict_es: "¿Empezando con cinco cuerdas? Ibanez GSR205B, Sterling by Music Man SUB Ray5, Yamaha TRBX305 o Squier Affinity Jazz Bass V. ¿Directos semanales? Schecter Stiletto Stealth-5, Yamaha BB435, Ibanez SR505A o Squier Classic Vibe 70s Jazz Bass V. ¿Estudio? Fender American Professional II Jazz Bass V, Fender American Ultra II Jazz Bass V o Ibanez EHB1005MS Headless Bass.",
    conclusion: "The GSR205B, Ray5, TRBX305 and Affinity Jazz V are the best starters. The Schecter Stiletto Stealth-5, BB435, SR505A and Classic Vibe 70s Jazz V are for gigging. The Fender American Professional II Jazz V, American Ultra II Jazz V and Ibanez EHB1005MS are for studio.",
    conclusion_es: "El GSR205B, Ray5, TRBX305 y Affinity Jazz V son los mejores para empezar. El Schecter Stiletto Stealth-5, BB435, SR505A y Classic Vibe 70s Jazz V son para directos. El Fender American Professional II Jazz V, American Ultra II Jazz V e Ibanez EHB1005MS son para estudio."
  },
  'best-audio-repair-plugins': {
    verdict: "iZotope RX 12 Standard is the rescue toolkit for any unusable recording. Add Baby Audio Smooth Operator Pro for transparent limiting. The RX 12 is the spectral editing pick. The Smooth Operator Pro is the resonance pick.",
    verdict_es: "iZotope RX 12 Standard es el kit de rescate para cualquier grabación inutilizable. Añade Baby Audio Smooth Operator Pro para limitación transparente. El RX 12 es la opción de edición espectral. El Smooth Operator Pro es la opción de resonancia.",
    conclusion: "iZotope RX 12 Standard is the rescue toolkit. Baby Audio Smooth Operator Pro is the transparent limiter. Both are reliable enough for professional audio repair.",
    conclusion_es: "iZotope RX 12 Standard es el kit de rescate. Baby Audio Smooth Operator Pro es el limitador transparente. Ambos son fiables para reparación de audio profesional."
  },
  'best-bass-home-office': {
    verdict: "Need full-scale tone with zero headstock? Ibanez EHB1000. Need multiscale ergonomics? Sire M6 Headless. Need the lightest flyable bass? Traveler Ultra-Light Bass. Need Steinberger design? Steinberger Spirit XT-2. Need Fender quality? Fender Player II Mustang Bass PJ. Need compact? Jackson JS1X Concert Bass Minion. Need Mikro size? Ibanez GSRM20 Mikro Bass.",
    verdict_es: "¿Necesitas tono de escala completa sin headstock? Ibanez EHB1000. ¿Necesitas ergonómica multiescala? Sire M6 Headless. ¿Necesitas el bajo volador más ligero? Traveler Ultra-Light Bass. ¿Necesitas diseño Steinberger? Steinberger Spirit XT-2. ¿Necesitas calidad Fender? Fender Player II Mustang Bass PJ. ¿Necesitas compacto? Jackson JS1X Concert Bass Minion. ¿Necesitas tamaño Mikro? Ibanez GSRM20 Mikro Bass.",
    conclusion: "The EHB1000 has full-scale tone with zero headstock. The M6 Headless has multiscale ergonomics. The Traveler Ultra-Light is the lightest. The Spirit XT-2 has Steinberger design. The Player II Mustang has Fender quality. The JS1X is compact. The GSRM20 is Mikro size.",
    conclusion_es: "El EHB1000 tiene tono de escala completa sin headstock. El M6 Headless tiene ergonómica multiescala. El Traveler Ultra-Light es el más ligero. El Spirit XT-2 tiene diseño Steinberger. El Player II Mustang tiene calidad Fender. El JS1X es compacto. El GSRM20 es tamaño Mikro."
  },
  'best-beginner-electric-guitar': {
    verdict: "Start in the value tier: the Yamaha Pacifica 112V is the best all-round beginner electric, the Squier Affinity Stratocaster is the classic Strat pick, the Enya Nova Go Sonic is the smart pick.",
    verdict_es: "Empieza en el nivel de valor: la Yamaha Pacifica 112V es la mejor eléctrica para principiantes, la Squier Affinity Stratocaster es la opción Strat clásica, la Enya Nova Go Sonic es la opción inteligente.",
    conclusion: "The Yamaha Pacifica 112V is the best all-round beginner. The Squier Affinity Stratocaster is the classic Strat pick. The Enya Nova Go Sonic is the smart pick. All are reliable enough for professional use.",
    conclusion_es: "La Yamaha Pacifica 112V es la mejor para principiantes. La Squier Affinity Stratocaster es la opción Strat clásica. La Enya Nova Go Sonic es la opción inteligente. Todas son fiables para uso profesional."
  },
  'best-compact-mixers': {
    verdict: "Behringer X32 Rack for IEM rigs and community support. Soundcraft Ui24R for app-free browser mixing. Behringer WING Rack for 48-channel flagship power. Allen & Heath SQ-Rack for touring. Behringer X Air XR18 for budget. Midas M32C for premium. Allen & Heath CQ-20B for compact. PreSonus StudioLive SE 24R for value.",
    verdict_es: "Behringer X32 Rack para rigs de IEM. Soundcraft Ui24R para mezcla sin app. Behringer WING Rack para potencia flagship de 48 canales. Allen & Heath SQ-Rack para giras. Behringer X Air XR18 para presupuesto. Midas M32C para premium. Allen & Heath CQ-20B para compacto. PreSonus StudioLive SE 24R para valor.",
    conclusion: "The X32 Rack is for IEM rigs. The Ui24R is for app-free mixing. The WING Rack is for 48-channel power. The SQ-Rack is for touring. The XR18 is for budget. The M32C is for premium. The CQ-20B is for compact. The StudioLive SE 24R is for value.",
    conclusion_es: "El X32 Rack es para rigs de IEM. El Ui24R es para mezcla sin app. El WING Rack es para potencia de 48 canales. El SQ-Rack es para giras. El XR18 es para presupuesto. El M32C es para premium. El CQ-20B es para compacto. El StudioLive SE 24R es para valor."
  },
  'best-drum-machine': {
    verdict: "Travel light with the Roland AIRA Compact T-8 or Novation Circuit Tracks. Own the stage with Arturia DrumBrute, Roland TR-8S or Akai MPC One G2. Rule the studio with Elektron Digitakt II or Elektron Syntakt.",
    verdict_es: "Viaja ligero con el Roland AIRA Compact T-8 o Novation Circuit Tracks. Domina el escenario con Arturia DrumBrute, Roland TR-8S o Akai MPC One G2. Domina el estudio con Elektron Digitakt II o Elektron Syntakt.",
    conclusion: "The Roland T-8 and Novation Circuit Tracks are for travel. The Arturia DrumBrute, Roland TR-8S and Akai MPC One G2 are for stage. The Elektron Digitakt II and Elektron Syntakt are for studio.",
    conclusion_es: "El Roland T-8 y Novation Circuit Tracks son para viaje. El Arturia DrumBrute, Roland TR-8S y Akai MPC One G2 son para escenario. El Elektron Digitakt II y Elektron Syntakt son para estudio."
  },
  'best-electric-guitar': {
    verdict: "Beginner guitars from Yamaha and Squier for starting out, mid-range Fender Player and PRS SE for gigging, premium Gibson and PRS for professionals, and the Fender American Professional II and American Ultra II for the best of Fender.",
    verdict_es: "Guitarras de principiante de Yamaha y Squier para empezar, Fender Player y PRS SE de gama media para directo, Gibson y PRS premium para profesionales, y la Fender American Professional II y American Ultra II para lo mejor de Fender.",
    conclusion: "Yamaha and Squier are the best beginners. Fender Player and PRS SE are mid-range. Gibson and PRS are premium. The Fender American Professional II and American Ultra II are the best of Fender.",
    conclusion_es: "Yamaha y Squier son los mejores para principiantes. Fender Player y PRS SE son de gama media. Gibson y PRS son premium. La Fender American Professional II y American Ultra II son lo mejor de Fender."
  },
  'best-interface': {
    verdict: "Focusrite Scarlett 2i2 for beginners, Audient iD14 MkII for better preamps, SSL 2+ MKII for analog character, RME Babyface Pro FS for uncompromising portable quality, MOTU M2 for the best metering, and Universal Audio Volt 2 for portability.",
    verdict_es: "Focusrite Scarlett 2i2 para principiantes, Audient iD14 MkII para mejores previos, SSL 2+ MKII para carácter analógico, RME Babyface Pro FS para calidad portátil sin concesiones, MOTU M2 para la mejor medición, y Universal Audio Volt 2 para portabilidad.",
    conclusion: "The Scarlett 2i2 is for beginners. The iD14 MkII is for better preamps. The SSL 2+ MKII is for analog character. The RME Babyface Pro FS is for portable quality. The MOTU M2 is for metering. The Volt 2 is for portability.",
    conclusion_es: "La Scarlett 2i2 es para principiantes. La iD14 MkII es para mejores previos. La SSL 2+ MKII es para carácter analógico. La RME Babyface Pro FS es para calidad portátil. La MOTU M2 es para medición. La Volt 2 es para portabilidad."
  },
  'best-mic-for-podcasting': {
    verdict: "Shure SM7B for premium podcasting, Audio-Technica AT2005USB for budget, Rode NT1 for treated studios, Rode PodMic for multi-host shows, Hollyland MELO P1 for wireless, Shure SM58 for live, Rode Procaster for broadcast, Shure MV7+ for hybrid USB/XLR.",
    verdict_es: "Shure SM7B para podcasting premium, Audio-Technica AT2005USB para presupuesto, Rode NT1 para estudios tratados, Rode PodMic para multi-presentador, Hollyland MELO P1 para inalámbrico, Shure SM58 para directo, Rode Procaster para broadcast, Shure MV7+ para híbrido USB/XLR.",
    conclusion: "The SM7B is for premium podcasting. The AT2005USB is for budget. The NT1 is for treated studios. The PodMic is for multi-host. The MELO P1 is for wireless. The SM58 is for live. The Procaster is for broadcast. The MV7+ is for hybrid USB/XLR.",
    conclusion_es: "El SM7B es para podcasting premium. La AT2005USB es para presupuesto. La NT1 es para estudios tratados. El PodMic es para multi-presentador. El MELO P1 es para inalámbrico. El SM58 es para directo. El Procaster es para broadcast. El MV7+ es para híbrido USB/XLR."
  },
  'best-plugins': {
    verdict: "FabFilter Pro-Q for EQ, Valhalla VintageVerb for reverb, TDR Nova for free dynamic EQ, Universal Audio 1176 for analog character, FabFilter Total Bundle for precision, FabFilter Pro-C 3 for compression, iZotope Ozone 12 Advanced for mastering, Soundtoys 5.5 Bundle for creative effects, Native Instruments Komplete 26 Ultimate for production variety.",
    verdict_es: "FabFilter Pro-Q para EQ, Valhalla VintageVerb para reverb, TDR Nova para EQ dinámico gratuito, Universal Audio 1176 para carácter analógico, FabFilter Total Bundle para precisión, FabFilter Pro-C 3 para compresión, iZotope Ozone 12 Advanced para masterización, Soundtoys 5.5 Bundle para efectos creativos, Native Instruments Komplete 26 Ultimate para variedad de producción.",
    conclusion: "Pro-Q for EQ. VintageVerb for reverb. Nova for free dynamic EQ. 1176 for analog character. Total Bundle for precision. Pro-C 3 for compression. Ozone 12 for mastering. Soundtoys 5.5 for creative effects. Komplete 26 for production variety.",
    conclusion_es: "Pro-Q para EQ. VintageVerb para reverb. Nova para EQ dinámico gratuito. 1176 para carácter analógico. Total Bundle para precisión. Pro-C 3 para compresión. Ozone 12 para masterización. Soundtoys 5.5 para efectos creativos. Komplete 26 para variedad de producción."
  },
  'budget-bass-like-expensive': {
    verdict: "Squier Classic Vibe '60s Jazz Bass for the best vintage-spec Jazz at the price, Sire Marcus Miller V5 for the best-feeling passive build, Yamaha BB434 for modern versatility, Sterling by Music Man StingRay Ray4 for that StingRay punch.",
    verdict_es: "Squier Classic Vibe '60s Jazz Bass para el mejor Jazz de especificaciones vintage al precio, Sire Marcus Miller V5 para la construcción pasiva de mejor tacto, Yamaha BB434 para versatilidad moderna, Sterling by Music Man StingRay Ray4 para ese punch StingRay.",
    conclusion: "The Classic Vibe '60s Jazz is the best vintage-spec Jazz. The Sire V5 is the best-feeling passive. The BB434 is for modern versatility. The StingRay Ray4 is for that StingRay punch.",
    conclusion_es: "El Classic Vibe '60s Jazz es el mejor Jazz vintage. El Sire V5 es la construcción pasiva de mejor tacto. El BB434 es para versatilidad moderna. El StingRay Ray4 es para ese punch StingRay."
  },
  'daw-guide': {
    verdict: "FL Studio for beatmakers with lifetime updates, Logic Pro for all-round Mac production, Ableton Live for electronic music and live performance, Pro Tools Studio for studio compatibility, Cubase Pro for composition, Reason for creative rack-based production.",
    verdict_es: "FL Studio para beatmakers con actualizaciones de por vida, Logic Pro para producción Mac todoterreno, Ableton Live para música electrónica y live performance, Pro Tools Studio para compatibilidad de estudio, Cubase Pro para composición, Reason para producción creativa basada en rack.",
    conclusion: "FL Studio for beatmakers. Logic Pro for Mac production. Ableton Live for electronic music. Pro Tools Studio for studio compatibility. Cubase Pro for composition. Reason for rack-based production.",
    conclusion_es: "FL Studio para beatmakers. Logic Pro para producción Mac. Ableton Live para música electrónica. Pro Tools Studio para compatibilidad de estudio. Cubase Pro para composición. Reason para producción basada en rack."
  },
  'fabfilter-vs-ozone': {
    verdict: "FabFilter Total Bundle is surgical mixing transparency. iZotope Ozone 12 Advanced is the all-in-one mastering chain with AI assistance.",
    verdict_es: "FabFilter Total Bundle es transparencia de mezcla quirúrgica. iZotope Ozone 12 Advanced es la cadena de masterización todo en uno con asistencia IA.",
    conclusion: "FabFilter Total Bundle is for surgical mixing. iZotope Ozone 12 Advanced is for all-in-one mastering with AI. Both are reliable enough for professional use.",
    conclusion_es: "FabFilter Total Bundle es para mezcla quirúrgica. iZotope Ozone 12 Advanced es para masterización todo en uno con IA. Ambos son fiables para uso profesional."
  },
  'fender-bass-guide': {
    verdict: "Fender American Ultra II Precision Bass for pro session and touring, American Pro II Precision Bass for country/blues/classic rock, American Pro II Jazz Bass for versatility, Player II Precision Bass for value, Player II Jazz Bass for modern features.",
    verdict_es: "Fender American Ultra II Precision Bass para sesión pro y giras, American Pro II Precision Bass para country/blues/rock clásico, American Pro II Jazz Bass para versatilidad, Player II Precision Bass para valor, Player II Jazz Bass para características modernas.",
    conclusion: "The Ultra II Precision is for pro session. The Pro II Precision is for country/blues. The Pro II Jazz is for versatility. The Player II Precision is for value. The Player II Jazz is for modern features.",
    conclusion_es: "El Ultra II Precision es para sesión pro. El Pro II Precision es para country/blues. El Pro II Jazz es para versatilidad. El Player II Precision es para valor. El Player II Jazz es para características modernas."
  },
  'martin-d28-vs-taylor-314': {
    verdict: "The Martin D-28 is traditional dreadnought projection and legacy — the sound of country and folk history. The Taylor 314ce Next Generation is the modern engineering pick with balanced tone and playability.",
    verdict_es: "El Martin D-28 es proyección y legado de dreadnought tradicional — el sonido de la historia del country y folk. La Taylor 314ce Next Generation es la opción de ingeniería moderna con tono equilibrado y jugabilidad.",
    conclusion: "The Martin D-28 is traditional dreadnought projection. The Taylor 314ce Next Generation is modern engineering. Both are excellent acoustic guitars for professional recording.",
    conclusion_es: "El Martin D-28 es proyección de dreadnought tradicional. La Taylor 314ce Next Generation es ingeniería moderna. Ambas son excelentes guitarras acústicas para grabación profesional."
  },
  'nord-stage-4-vs-montage-m8x': {
    verdict: "The Nord Stage 4 is for authentic piano and organ that feel alive under your fingers. The Yamaha Montage M8x is for deep synthesis and workstation features.",
    verdict_es: "El Nord Stage 4 es para piano y órgano auténticos que se sienten vivos bajo los dedos. El Yamaha Montage M8x es para síntesis profunda y características de estación de trabajo.",
    conclusion: "The Nord Stage 4 is for authentic piano and organ. The Montage M8x is for deep synthesis. Both are excellent stage keyboards for professional use.",
    conclusion_es: "El Nord Stage 4 es para piano y órgano auténticos. El Montage M8x es para síntesis profunda. Ambos son excelentes teclados de escenario para uso profesional."
  },
  'ozone-vs-fabfilter': {
    verdict: "Buy iZotope Ozone 12 Advanced for an all-in-one mastering chain with AI assistance and genre targets. Buy the FabFilter Total Bundle for surgical mixing transparency.",
    verdict_es: "Compra iZotope Ozone 12 Advanced para una cadena de masterización todo en uno con asistencia IA y objetivos de género. Compra el FabFilter Total Bundle para transparencia de mezcla quirúrgica.",
    conclusion: "Ozone 12 Advanced is for all-in-one mastering with AI. FabFilter Total Bundle is for surgical mixing. Both are reliable enough for professional mastering.",
    conclusion_es: "Ozone 12 Advanced es para masterización todo en uno con IA. FabFilter Total Bundle es para mezcla quirúrgica. Ambos son fiables para masterización profesional."
  },
  'player-strat-vs-pacifica': {
    verdict: "The Player Strat is authentic Fender tone and legacy. The Yamaha Pacifica 112V offers exceptional value and versatility.",
    verdict_es: "El Player Strat es tono y legado Fender auténtico. La Yamaha Pacifica 112V ofrece valor y versatilidad excepcionales.",
    conclusion: "The Player Strat is authentic Fender tone. The Pacifica 112V is exceptional value. Both are excellent beginner guitars for professional use.",
    conclusion_es: "El Player Strat es tono Fender auténtico. La Pacifica 112V es valor excepcional. Ambas son excelentes guitarras para principiantes para uso profesional."
  },
  'portable-interfaces': {
    verdict: "RME Babyface Pro FS for uncompromising portable quality, Focusrite Scarlett 2i2 4th Gen for the best balance of features and value, Audient EVO 4 for budget travelers, Audient iD14 MkII for console-grade preamps, SSL 2+ MKII for analog character, UA Volt 276 for real compression, UA Volt 2 for vintage warmth, Arturia MiniFuse 2 OTG for mobile creators, MOTU M2 for the best metering.",
    verdict_es: "RME Babyface Pro FS para calidad portátil sin concesiones, Focusrite Scarlett 2i2 4th Gen para el mejor equilibrio entre funciones y precio, Audient EVO 4 para viajeros con presupuesto ajustado, Audient iD14 MkII para previos de consola, SSL 2+ MKII para carácter analógico, UA Volt 276 para compresión real, UA Volt 2 para calidez vintage, Arturia MiniFuse 2 OTG para creadores móviles, MOTU M2 para la mejor medición.",
    conclusion: "The RME Babyface Pro FS is the best portable audio interface. The Scarlett 2i2 4th Gen offers the best balance. The EVO 4 is the budget option. The iD14 MkII has console-grade preamps. The SSL 2+ MKII adds analog character. The Volt 276 has a real compressor. The Volt 2 has vintage warmth. The MiniFuse 2 OTG is for mobile creators. The MOTU M2 has the best metering.",
    conclusion_es: "El RME Babyface Pro FS es la mejor interfaz portátil. La Scarlett 2i2 4th Gen ofrece el mejor equilibrio. La EVO 4 es la opción económica. La iD14 MkII tiene previos de consola. La SSL 2+ MKII añade carácter analógico. La Volt 276 tiene un compresor real. La Volt 2 tiene calidez vintage. El MiniFuse 2 OTG es para creadores móviles. La MOTU M2 tiene la mejor medición."
  },
  'premium-interfaces': {
    verdict: "Need UAD colour while tracking? Apollo x8p Gen 2. Need a desk controller that also does network audio? Neumann MT 48. Need Atmos without a separate monitor controller? Audient ORIA. Need rock-solid reliability with massive I/O? RME Fireface UFX III. Need FPGA-powered conversion? Antelope Orion Studio Synergy Core.",
    verdict_es: "¿Necesitas color UAD mientras grabas? Apollo x8p Gen 2. ¿Necesitas un controlador de consola que también haga audio por red? Neumann MT 48. ¿Necesitas Atmos sin un controlador de monitores separado? Audient ORIA. ¿Necesitas fiabilidad sólida con E/S masiva? RME Fireface UFX III. ¿Necesitas conversión FPGA? Antelope Orion Studio Synergy Core.",
    conclusion: "The Apollo x8p Gen 2 is for UAD DSP. The Neumann MT 48 is for network audio. The Audient ORIA is for immersive monitoring. The RME Fireface UFX III is for rock-solid reliability. The Antelope Orion Studio Synergy Core is for FPGA conversion.",
    conclusion_es: "El Apollo x8p Gen 2 es para UAD DSP. El Neumann MT 48 es para audio por red. El Audient ORIA es para monitorización inmersiva. El RME Fireface UFX III es para fiabilidad sólida. El Antelope Orion Studio Synergy Core es para conversión FPGA."
  },
  'pro-basses': {
    verdict: "The Ultra II P-Bass delivers that classic thump every engineer knows. The StingRay Special is the modern punch — active, aggressive, and impossible to ignore.",
    verdict_es: "El Ultra II P-Bass entrega ese golpe clásico que todo ingeniero conoce. El StingRay Special es el punch moderno — activo, agresivo e imposible de ignorar.",
    conclusion: "The Ultra II P-Bass delivers classic thump. The StingRay Special is modern punch. Both are excellent basses for professional use.",
    conclusion_es: "El Ultra II P-Bass entrega golpe clásico. El StingRay Special es punch moderno. Ambos son excelentes bajos para uso profesional."
  },
  'pro-drum-machines': {
    verdict: "The Digitakt II is the deep sound-design machine for techno and experimental work. The MPC Live III is the standalone production hub — sampling, sequencing and arranging in one unit.",
    verdict_es: "El Digitakt II es la máquina de diseño sonoro profundo para techno y trabajo experimental. El MPC Live III es el centro de producción autónomo — muestreo, secuenciación y arreglo en una unidad.",
    conclusion: "The Digitakt II is for deep sound design. The MPC Live III is for standalone production. Both are excellent for professional beatmaking.",
    conclusion_es: "El Digitakt II es para diseño sonoro profundo. El MPC Live III es para producción autónoma. Ambos son excelentes para beatmaking profesional."
  },
  'pro-mixers': {
    verdict: "The CQ-18T is for automated, portable mixing — set it and let the assistant handle the room. The M32R LIVE is the professional choice when you need every feature and maximum control.",
    verdict_es: "El CQ-18T es para mezcla automatizada y portátil — configúralo y deja que el asistente maneje la sala. El M32R LIVE es la opción profesional cuando necesitas cada función y máximo control.",
    conclusion: "The CQ-18T is for automated mixing. The M32R LIVE is for professional maximum control. Both are excellent digital mixers for professional use.",
    conclusion_es: "El CQ-18T es para mezcla automatizada. El M32R LIVE es para control máximo profesional. Ambos son excelentes mezcladores digitales para uso profesional."
  },
  'pro-plugins': {
    verdict: "FabFilter is the precision choice for mixing — clean, transparent, surgical. Komplete 26 Ultimate is the production variety box with synths, sounds and effects for every genre.",
    verdict_es: "FabFilter es la opción de precisión para mezcla — limpia, transparente, quirúrgica. Komplete 26 Ultimate es la caja de variedad de producción con sintetizadores, sonidos y efectos para cada género.",
    conclusion: "FabFilter is for precision mixing. Komplete 26 Ultimate is for production variety. Both are reliable enough for professional use.",
    conclusion_es: "FabFilter es para mezcla de precisión. Komplete 26 Ultimate es para variedad de producción. Ambos son fiables para uso profesional."
  },
  'pro-synths': {
    verdict: "The Moog Muse is for modern sound design — 8 voices of analog depth with a built-in sequencer. The Sequential Prophet-10 is the classic analog polyphony you have heard on countless records.",
    verdict_es: "El Moog Muse es para diseño sonoro moderno — 8 voces de profundidad analógica con secuenciador integrado. El Sequential Prophet-10 es la polifónica analógica clásica que has escuchado en innumerables discos.",
    conclusion: "The Moog Muse is for modern sound design. The Prophet-10 is for classic analog polyphony. Both are excellent synthesizers for professional use.",
    conclusion_es: "El Moog Muse es para diseño sonoro moderno. El Prophet-10 es para polifónica analógica clásica. Ambos son excelentes sintetizadores para uso profesional."
  },
  'rode-wireless-pro-vs-dji-mic-2': {
    verdict: "The Rode Wireless PRO is for professional interviews and multi-cam shoots where internal recording and backup reliability are non-negotiable. The DJI Mic 3 is for creators who want the best balance of price, features and reliability.",
    verdict_es: "El Rode Wireless PRO es para entrevistas profesionales y rodajes multi-cámara donde la grabación interna y la fiabilidad de respaldo son innegociables. El DJI Mic 3 es para creadores que quieren el mejor equilibrio entre precio, funciones y fiabilidad.",
    conclusion: "The Rode Wireless PRO is for professional interviews. The DJI Mic 3 is for creators wanting the best balance. Both are excellent wireless lavalier systems.",
    conclusion_es: "El Rode Wireless PRO es para entrevistas profesionales. El DJI Mic 3 es para creadores que quieren el mejor equilibrio. Ambos son excelentes sistemas de solapa inalámbricos."
  },
  'tracking-headphones': {
    verdict: "The Beyerdynamic DT 770 Pro is the king of comfort and tracking isolation. The Sennheiser HD 280 PRO II wins on pure noise blocking. The Shure SRH440A adds detail. The Audio-Technica ATH-M50x is the producing favorite. The AKG K371 is the neutral reference.",
    verdict_es: "El Beyerdynamic DT 770 Pro es el rey del confort y aislamiento en grabación. La Sennheiser HD 280 PRO II gana en bloqueo puro de ruido. La Shure SRH440A añade detalle. La Audio-Technica ATH-M50x es la favorita para producción. La AKG K371 es la referencia neutral.",
    conclusion: "The DT 770 Pro is the king of comfort. The HD 280 PRO II wins on noise blocking. The SRH440A adds detail. The ATH-M50x is the producing favorite. The K371 is the neutral reference. All are reliable enough for professional tracking.",
    conclusion_es: "El DT 770 Pro es el rey del confort. La HD 280 PRO II gana en bloqueo de ruido. La SRH440A añade detalle. La ATH-M50x es la favorita para producción. La K371 es la referencia neutral. Todos son fiables para grabación profesional."
  }
};

let count = 0;
for (const [id, fix] of Object.entries(rewrites)) {
  const guide = g.find(x => x.id === id);
  if (guide) {
    Object.assign(guide, fix);
    count++;
    console.log('OK', id);
  } else {
    console.log('NOT FOUND', id);
  }
}

fs.writeFileSync(path.join(__dirname, '../data/guides.json'), JSON.stringify(g, null, 2));
console.log('Total:', count, 'guias reescritas');
