const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const G = id => guides.find(g => g.id === id);
function swap(guide, pairs) {
  let s = JSON.stringify(guide);
  pairs.forEach(([a, b]) => { s = s.split(a).join(b); });
  const g2 = JSON.parse(s);
  Object.keys(guide).forEach(k => delete guide[k]);
  Object.assign(guide, g2);
}

// ==================== PIANO ====================
(function () {
  const gd = G('best-piano-keyboard-vsts');
  gd.sections[0] = {
    heading: 'MeldaProduction MeldwayGrand: A Steinway D for Less Than a Pedal',
    heading_es: 'MeldaProduction MeldwayGrand: Un Steinway D por Menos Que un Pedal',
    products: [1013],
    content: '<p><strong>MeldwayGrand captures a nine-foot Steinway Model D concert grand with the depth a demanding piano part needs.</strong> The tone is full and even from the lowest octave to the top register, with dynamic response that follows your playing instead of flattening it. It loads inside MeldaProduction\'s free engine, so the price of entry stays low for what you get.</p><p>For classical, film and singer-songwriter work where the piano carries the track, a real concert grand sample set matters. MeldwayGrand delivers that flagship sound without the flagship price, and it has become a quiet favorite among composers who auditioned everything else first.</p>',
    content_es: '<p><strong>MeldwayGrand captura un piano de cola Steinway Model D de nueve pies con la profundidad que una parte exigente necesita.</strong> El tono es pleno y parejo desde la octava más grave hasta el registro agudo, con respuesta dinámica que sigue tu interpretación en lugar de aplanarla. Carga dentro del motor gratuito de MeldaProduction, así el precio de entrada se mantiene bajo para lo que obtienes.</p><p>Para trabajo clásico, de cine y cantautor donde el piano lleva el tema, un set real de gran cola importa. MeldwayGrand ofrece ese sonido insignia sin el precio insignia, y se ha convertido en un favorito silencioso entre compositores que audicionaron todo lo demás primero.</p>',
    pros: ['True nine-foot Steinway Model D concert grand', 'Even tone and dynamic response across the keyboard', 'Flagship piano sound at a mid-range price', 'Runs in MeldaProduction free engine'],
    pros_es: ['Verdadero piano de cola Steinway Model D de nueve pies', 'Tono parejo y respuesta dinámica en todo el teclado', 'Sonido de piano insignia a precio medio', 'Funciona en el motor gratuito de MeldaProduction'],
    cons: ['Single instrument, no uprights or electrics included', 'Large download for one piano', 'Fewer sound-shaping extras than hybrid rivals', 'Interface prioritizes function over inspiration'],
    cons_es: ['Un solo instrumento, sin verticales ni eléctricos incluidos', 'Descarga grande para un solo piano', 'Menos extras de modelado que rivales híbridos', 'La interfaz prioriza función sobre inspiración']
  };
  gd.sections[4] = {
    heading: 'Native Instruments Noire: Felt Piano Intimacy for Film and Ambient',
    heading_es: 'Native Instruments Noire: Intimidad de Piano de Fieltro para Cine y Ambient',
    products: [1017],
    content: '<p><strong>Noire pairs a felted upright character with a pure concert grand, plus a particles engine that turns single notes into evolving beds.</strong> The felt side is soft, close and imperfect in the best way, ideal for underscore and intimate passages. Flip to the grand when the cue opens up and needs weight.</p><p>Because it runs in Kontakt, it inherits first-class scripting, effects and performance tools. For composers who live in cinematic quiet-loud dynamics, Noire covers both ends without loading a second library.</p>',
    content_es: '<p><strong>Noire combina un carácter de fieltro íntimo con un gran cola puro, más un motor de partículas que convierte notas individuales en bases en evolución.</strong> El lado de fieltro es suave, cercano e imperfecto de la mejor manera, ideal para underscore y pasajes íntimos. Cambia al gran cola cuando la pieza se abre y necesita peso.</p><p>Como funciona en Kontakt, hereda scripting, efectos y herramientas de interpretación de primera clase. Para compositores que viven en dinámicas cinematográficas de calma y clímax, Noire cubre ambos extremos sin cargar una segunda biblioteca.</p>',
    pros: ['Felt piano intimacy plus a pure concert grand', 'Particles engine builds evolving beds from single notes', 'Runs in Kontakt with pro scripting and effects', 'Made for cinematic quiet-loud dynamics'],
    pros_es: ['Intimidad de piano de fieltro más un gran cola puro', 'El motor de partículas construye bases en evolución desde notas simples', 'Funciona en Kontakt con scripting y efectos pro', 'Hecho para dinámicas cinematográficas de calma y clímax'],
    cons: ['Requires Kontakt to run', 'Felt focus means less brilliance for pop', 'Particles engine takes time to master', 'Not a substitute for a bright studio grand'],
    cons_es: ['Requiere Kontakt para funcionar', 'El enfoque en fieltro significa menos brillo para pop', 'El motor de partículas toma tiempo dominar', 'No sustituye un gran cola brillante de estudio']
  };
  gd.sections[5] = {
    heading: 'Arturia Augmented GRAND PIANO: Where a Concert Grand Meets the Synth',
    heading_es: 'Arturia Augmented GRAND PIANO: Donde un Gran Cola Se Encuentra Con el Sinte',
    products: [1018],
    content: '<p><strong>Augmented GRAND PIANO layers a real concert grand with synth engines you morph between in real time.</strong> Start from an acoustic piano and bend it toward pads, pulses and textures with a single Morph control, then shape the result with Arturia\'s effects and modulation. It is a piano first, but one that refuses to stay ordinary.</p><p>For hybrid scoring and electronic productions that need piano-like attack with unreal sustain and movement, this is the shortcut. Traditionalists get their grand, experimentalists get a sound-design playground, and both fit in one track.</p>',
    content_es: '<p><strong>Augmented GRAND PIANO combina un gran cola real con motores de sinte entre los que mutas en tiempo real.</strong> Comienza desde un piano acústico y dóblalo hacia pads, pulsos y texturas con un solo control Morph, luego moldea el resultado con los efectos y la modulación de Arturia. Es un piano primero, pero uno que se niega a quedarse ordinario.</p><p>Para música híbrida y producciones electrónicas que necesitan ataque tipo piano con sustain y movimiento irreales, este es el atajo. Los tradicionalistas obtienen su gran cola, los experimentales un patio de diseño de sonido, y ambos caben en una pista.</p>',
    pros: ['Real concert grand fused with synth layers', 'Morph control bends piano into pads and pulses', 'Arturia effects and modulation built in', 'One track covers traditional and experimental needs'],
    pros_es: ['Gran cola real fusionado con capas de sinte', 'El control Morph dobla el piano hacia pads y pulsos', 'Efectos y modulación de Arturia integrados', 'Una pista cubre necesidades tradicionales y experimentales'],
    cons: ['Not a purist acoustic piano library', 'Morph results vary by preset', 'Heavier on CPU than a straight sampled grand', 'Less velocity detail than dedicated grand libraries'],
    cons_es: ['No es una biblioteca purista de piano acústico', 'Los resultados del Morph varían por preset', 'Más pesado en CPU que un gran cola muestreado directo', 'Menos detalle de velocidad que bibliotecas dedicadas']
  };
  gd.verdictProsCons[0] = { name: 'MeldwayGrand', name_es: 'MeldwayGrand',
    pros: ['Real Steinway D concert grand', 'Even, dynamic tone', 'Flagship sound, mid-range price', 'Free Melda engine'],
    pros_es: ['Steinway D de concierto real', 'Tono parejo y dinámico', 'Sonido insignia, precio medio', 'Motor gratuito de Melda'],
    cons: ['Single piano only', 'Large download', 'Few hybrid extras', 'Functional interface'],
    cons_es: ['Solo un piano', 'Descarga grande', 'Pocos extras híbridos', 'Interfaz funcional'] };
  gd.verdictProsCons[4] = { name: 'Noire', name_es: 'Noire',
    pros: ['Felt intimacy + pure grand', 'Particles engine', 'Kontakt scripting and FX', 'Cinematic dynamics covered'],
    pros_es: ['Intimidad de fieltro + gran cola puro', 'Motor de partículas', 'Scripting y FX de Kontakt', 'Dinámicas cinematográficas cubiertas'],
    cons: ['Needs Kontakt', 'Less pop brilliance', 'Particles learning curve', 'No bright studio grand'],
    cons_es: ['Necesita Kontakt', 'Menos brillo pop', 'Curva del motor de partículas', 'Sin gran cola brillante de estudio'] };
  gd.verdictProsCons[5] = { name: 'Augmented GRAND PIANO', name_es: 'Augmented GRAND PIANO',
    pros: ['Grand fused with synthesis', 'Real-time Morph control', 'Built-in Arturia FX', 'Traditional + experimental in one'],
    pros_es: ['Gran cola fusionado con síntesis', 'Control Morph en tiempo real', 'FX de Arturia integrados', 'Tradicional + experimental en uno'],
    cons: ['Not a purist library', 'Morph varies by preset', 'Heavier on CPU', 'Less velocity detail'],
    cons_es: ['No es biblioteca purista', 'El Morph varía por preset', 'Más pesado en CPU', 'Menos detalle de velocidad'] };
  gd.faq[0] = { q: 'What is the best sampled grand piano VST for composers in 2026?',
    q_es: '¿Cuál es el mejor VST de gran cola muestreado para compositores en 2026?',
    q_a: 'MeldaProduction MeldwayGrand is the best value in sampled concert grands: a real nine-foot Steinway Model D with even tone and dynamic response, at a mid-range price. If you need variety across keyboards rather than one flagship grand, Arturia V Collection 11 Pro covers decades of instruments in a single suite.',
    q_a_es: 'MeldaProduction MeldwayGrand es el mejor valor en pianos de cola de concierto muestreados: un Steinway Model D real de nueve pies con tono parejo y respuesta dinámica, a precio medio. Si necesitas variedad entre teclados en lugar de un solo gran cola insignia, Arturia V Collection 11 Pro cubre décadas de instrumentos en un solo suite.' };
  gd.faq[1] = { q: 'Is Noire worth it if I already own a piano library?',
    q_es: '¿Merece la pena Noire si ya tengo una biblioteca de piano?',
    q_a: 'Yes, if you write cinematic or ambient music. Noire is not another bright studio grand: its felt piano delivers intimacy that standard libraries cannot, and the particles engine turns single notes into evolving beds. It runs in Kontakt, so check that you have the player or full version first.',
    q_a_es: 'Sí, si escribes música cinematográfica o ambiental. Noire no es otro gran cola brillante de estudio: su piano de fieltro ofrece intimidad que las bibliotecas estándar no pueden, y el motor de partículas convierte notas simples en bases en evolución. Funciona en Kontakt, así que verifica tener el reproductor o la versión completa primero.' };
  gd.faq[2] = { q: 'Do I need Kontakt 8 for Noire?',
    q_es: '¿Necesito Kontakt 8 para Noire?',
    q_a: 'Noire runs in Kontakt, so you need the free Kontakt Player at minimum. Kontakt 8 adds the latest time-stretching, a modernized interface and improved effects that benefit every library you load, including Noire. If you plan to collect more Kontakt libraries, buying Kontakt 8 itself pays off quickly.',
    q_a_es: 'Noire funciona en Kontakt, así que necesitas el Kontakt Player gratuito como mínimo. Kontakt 8 añade el time-stretching más reciente, una interfaz modernizada y efectos mejorados que benefician cada biblioteca que cargues, incluida Noire. Si planeas coleccionar más bibliotecas Kontakt, comprar el propio Kontakt 8 se amortiza rápido.' };
  swap(gd, [
    ['Spectrasonics Keyscape for the ultimate keyboard collection', 'MeldaProduction MeldwayGrand for a true concert grand'],
    ['Spectrasonics Keyscape para la colección de teclados definitiva', 'MeldaProduction MeldwayGrand para un verdadero gran cola de concierto'],
    ['Modartt Pianoteq 9 Pro for physically modeled realism', 'Native Instruments Noire for intimate felt piano'],
    ['Modartt Pianoteq 9 Pro para realismo modelado físicamente', 'Native Instruments Noire para piano de fieltro íntimo'],
    ['UVI Augmented Piano for cinematic hybrid sounds.', 'Arturia Augmented GRAND PIANO for cinematic hybrid sounds.'],
    ['UVI Augmented Piano para sonidos híbridos cinematográficos.', 'Arturia Augmented GRAND PIANO para sonidos híbridos cinematográficos.'],
    ['Keyscape offers unmatched variety and authenticity.', 'MeldwayGrand delivers true concert-grand realism.'],
    ['Keyscape ofrece variedad y autenticidad inigualables.', 'MeldwayGrand ofrece realismo verdadero de gran cola de concierto.'],
    ['Pianoteq 9 Pro provides physical modeling realism and efficiency.', 'Noire captures intimate felt piano for film and ambient.'],
    ['Pianoteq 9 Pro proporciona realismo modelado físicamente y eficiencia.', 'Noire captura piano de fieltro íntimo para cine y ambient.'],
    ['Augmented Piano blends real samples with abstract synthesis for cinematic work.', 'Augmented GRAND PIANO morphs acoustic piano into synthesis for cinematic work.'],
    ['Augmented Piano combina muestras reales con síntesis abstracta para trabajo cinematográfico.', 'Augmented GRAND PIANO muta el piano acústico en síntesis para trabajo cinematográfico.'],
    ['Less detailed than Keyscape or Kontakt libraries', 'Less detailed than MeldwayGrand or Kontakt libraries'],
    ['Menos detallado que Keyscape o bibliotecas Kontakt', 'Menos detallado que MeldwayGrand o bibliotecas Kontakt'],
    ['Keyscape, Kontakt 8, V Collection 11, Addictive Keys, Pianoteq 9 and Augmented Piano', 'MeldwayGrand, Kontakt 8, V Collection 11, Addictive Keys, Noire and Augmented Grand Piano'],
    ['Keyscape, Kontakt 8, V Collection 11, Addictive Keys, Pianoteq 9 y Augmented Piano', 'MeldwayGrand, Kontakt 8, V Collection 11, Addictive Keys, Noire y Augmented Grand Piano'],
    ['Spectrasonics Keyscape', 'MeldaProduction MeldwayGrand'],
    ['Modartt Pianoteq 9 Pro', 'Native Instruments Noire'],
    ['Modartt', 'Native Instruments'],
    ['Pianoteq 9 Pro', 'Noire'],
    ['Pianoteq', 'Noire'],
    ['UVI Augmented Piano', 'Arturia Augmented GRAND PIANO'],
    ['Augmented Piano', 'Augmented GRAND PIANO']
  ]);
  console.log('piano done');
})();

// ==================== GUITAR (5 products) ====================
(function () {
  const gd = G('best-guitar-plugins');
  gd.sections[1] = {
    heading: 'Two Notes GENOME: Component-Level Amps With Studio-Grade Cabs',
    heading_es: 'Two Notes GENOME: Amplis a Nivel de Componente Con Gabinetes de Estudio',
    products: [1020],
    content: '<p><strong>GENOME combines component-level amp modeling with Two Notes famous DynIR virtual cabinets and a full effects suite.</strong> The amps respond like the real circuits, and the DynIR cabs capture real rooms, mics and placements instead of static impulses. You build complete rigs, from guitar input to mastered bus, inside one window.</p><p>For players who record at home and need release-ready guitar tones without a treated room, GENOME is the end-to-end answer. The presets are genuinely usable, the effects cover everything from drive to ambient, and the CPU load stays reasonable even in full-rig sessions.</p>',
    content_es: '<p><strong>GENOME combina modelado de amplificadores a nivel de componente con los famosos gabinetes virtuales DynIR de Two Notes y un suite completo de efectos.</strong> Los amplis responden como los circuitos reales, y los cabs DynIR capturan salas, micrófonos y posiciones reales en lugar de impulsos estáticos. Construyes rigs completos, desde la entrada de guitarra hasta el bus masterizado, dentro de una ventana.</p><p>Para guitarristas que graban en casa y necesitan tonos listos para publicar sin sala tratada, GENOME es la respuesta integral. Los presets son genuinamente utilizables, los efectos cubren desde drive hasta ambiental, y la carga de CPU se mantiene razonable incluso en sesiones de rig completo.</p>',
    pros: ['Component-level amp modeling that responds like hardware', 'DynIR cabinets capture real rooms and mic placements', 'Complete rigs with effects in one window', 'Release-ready presets with reasonable CPU load'],
    pros_es: ['Modelado a nivel de componente que responde como hardware', 'Gabinetes DynIR capturan salas y posiciones de micrófono reales', 'Rigs completos con efectos en una ventana', 'Presets listos para publicar con carga de CPU razonable'],
    cons: ['Single-vendor ecosystem, no third-party amp models', 'DynIR catalog depth costs extra beyond stock cabs', 'Interface packs a lot into one screen', 'Less community preset sharing than older rivals'],
    cons_es: ['Ecosistema de un solo fabricante, sin modelos de terceros', 'La profundidad del catálogo DynIR cuesta extra más allá de los cabs incluidos', 'La interfaz concentra mucho en una pantalla', 'Menos intercambio de presets de comunidad que rivales veteranos']
  };
  gd.sections[3] = {
    heading: 'Kiive Audio Lunchbox Amp Sim: One British Valve Amp, Done Right',
    heading_es: 'Kiive Audio Lunchbox Amp Sim: Un Ampli Británico de Válvulas, Bien Hecho',
    products: [1022],
    content: '<p><strong>Lunchbox Amp Sim recreates one classic British valve amp with three cabinets, overdrive, delay and room reverb.</strong> No endless menus, no option paralysis: gain, EQ, a handful of effects, and a sound that sits in a rock mix immediately. It is the plugin equivalent of a great small combo.</p><p>At its price it is almost impossible to argue against for home recordists who need convincing crunch and cleans without learning a workstation. Purists chasing exact replicas of five different amps should look at bigger suites, but for one great British voice, Lunchbox delivers.</p>',
    content_es: '<p><strong>Lunchbox Amp Sim recrea un clásico ampli británico de válvulas con tres gabinetes, overdrive, delay y reverb de sala.</strong> Sin menús infinitos ni parálisis por opciones: ganancia, EQ, un puñado de efectos y un sonido que se sitúa en una mezcla rock de inmediato. Es el equivalente en plugin de un gran combo pequeño.</p><p>A su precio es casi imposible argumentar en contra para quienes graban en casa y necesitan crunch y limpios convincentes sin aprender una estación de trabajo. Los puristas que persiguen réplicas exactas de cinco amplis distintos deberían mirar suites más grandes, pero para una gran voz británica, Lunchbox cumple.</p>',
    pros: ['Convincing British valve crunch and cleans', 'Three cabinets plus drive, delay and reverb included', 'Zero learning curve, mix-ready in minutes', 'Almost impulse-buy pricing for the quality'],
    pros_es: ['Crunch y limpios británicos de válvulas convincentes', 'Tres gabinetes más drive, delay y reverb incluidos', 'Cero curva de aprendizaje, listo para mezcla en minutos', 'Precio casi de compra impulsiva para la calidad'],
    cons: ['One amp only, no variety seekers need apply', 'No tone matching or cloud preset library', 'Effects section is basic next to full suites', 'No bass-specific models'],
    cons_es: ['Un solo ampli, los que buscan variedad absténganse', 'Sin coincidencia de tono ni nube de presets', 'La sección de efectos es básica junto a suites completas', 'Sin modelos específicos para bajo']
  };
  gd.sections[4] = {
    heading: 'Softube Amp Room Marshall Suite: Plexi Crunch Without the Hearing Damage',
    heading_es: 'Softube Amp Room Marshall Suite: Crunch Plexi Sin Daño Auditivo',
    products: [1023],
    content: '<p><strong>The Marshall Suite brings officially licensed Marshall amps, cabinets and pedals into Softube Amp Room, including the Amp Room platform itself.</strong> Plexi crunch, JCM drive and greenback cabs respond with the sag and bite of the real stacks, captured with Softube usual studio-grade care. Stompboxes and studio effects round out full signal chains.</p><p>If your productions live in classic rock, hard rock or indie, this is the most direct route to those tones in software. It does one brand, but it does it with the license, the measurements and the feel that generic emulations cannot copy.</p>',
    content_es: '<p><strong>La Marshall Suite trae amplificadores, gabinetes y pedales Marshall oficialmente licenciados dentro de Softube Amp Room, incluyendo la propia plataforma Amp Room.</strong> El crunch Plexi, el drive JCM y los cabs greenback responden con el sag y el mordisco de los stacks reales, capturados con el habitual cuidado de estudio de Softube. Stompboxes y efectos de estudio completan cadenas de señal enteras.</p><p>Si tus producciones viven en rock clásico, hard rock o indie, esta es la ruta más directa a esos tonos en software. Hace una marca, pero la hace con la licencia, las mediciones y la sensación que las emulaciones genéricas no pueden copiar.</p>',
    pros: ['Officially licensed Marshall amps, cabs and pedals', 'Plexi and JCM tones with real sag and bite', 'Amp Room platform and studio effects included', 'The direct route to classic rock tones'],
    pros_es: ['Amplis, cabs y pedales Marshall oficialmente licenciados', 'Tonos Plexi y JCM con sag y mordisco reales', 'Plataforma Amp Room y efectos de estudio incluidos', 'La ruta directa a tonos de rock clásico'],
    cons: ['One brand only, no Fender/Mesa/Vox variety', 'Marshall focus suits rock, less so metal or jazz', 'Suites for other brands sold separately', 'No tone matching or cloud community'],
    cons_es: ['Solo una marca, sin variedad Fender/Mesa/Vox', 'El enfoque Marshall sirve al rock, menos al metal o jazz', 'Las suites de otras marcas se venden por separado', 'Sin coincidencia de tono ni comunidad en la nube']
  };
  // remove rockrack section (verify first)
  const ri = gd.sections.findIndex(s => (s.heading || '').toLowerCase().includes('rockrack'));
  if (ri > -1) { gd.sections.splice(ri, 1); console.log('guitar: rockrack section removed'); }
  else console.log('guitar: rockrack section NOT FOUND');
  const rvi = gd.verdictProsCons.findIndex(v => (v.name || '').toLowerCase().includes('rockrack'));
  if (rvi > -1) { gd.verdictProsCons.splice(rvi, 1); console.log('guitar: rockrack verdict removed'); }
  gd.verdictProsCons.forEach(v => {
    if (/BIAS/i.test(v.name || '')) { v.name = 'GENOME'; v.name_es = 'GENOME'; }
    if (/TH-U/i.test(v.name || '')) { v.name = 'Lunchbox Amp Sim'; v.name_es = 'Lunchbox Amp Sim'; }
    if (/Amp Room/i.test(v.name || '')) { v.name = 'Amp Room: Marshall Suite'; v.name_es = 'Amp Room: Marshall Suite'; }
  });
  // rewrite the three verdict bodies to match new products
  const gv = i => gd.verdictProsCons[i];
  gv(1).pros = ['Component-level amps', 'DynIR real-room cabs', 'Full rigs with FX in one window', 'Release-ready presets'];
  gv(1).pros_es = ['Amplis a nivel de componente', 'Cabs DynIR de salas reales', 'Rigs completos con FX en una ventana', 'Presets listos para publicar'];
  gv(1).cons = ['Single-vendor ecosystem', 'Extra DynIR content costs more', 'Dense single-screen interface', 'Smaller preset community'];
  gv(1).cons_es = ['Ecosistema de un fabricante', 'Contenido DynIR extra cuesta más', 'Interfaz densa en una pantalla', 'Comunidad de presets más pequeña'];
  gv(3).pros = ['Convincing British valve tones', '3 cabs + drive, delay, reverb', 'Zero learning curve', 'Impulse-buy pricing'];
  gv(3).pros_es = ['Tonos británicos de válvulas convincentes', '3 cabs + drive, delay, reverb', 'Cero curva de aprendizaje', 'Precio de compra impulsiva'];
  gv(3).cons = ['One amp only', 'No tone matching or cloud', 'Basic FX section', 'No bass models'];
  gv(3).cons_es = ['Un solo ampli', 'Sin coincidencia de tono ni nube', 'Sección FX básica', 'Sin modelos para bajo'];
  gv(4).pros = ['Licensed Marshall gear', 'Real Plexi/JCM sag and bite', 'Amp Room platform included', 'Direct classic-rock route'];
  gv(4).pros_es = ['Equipo Marshall licenciado', 'Sag y mordisco Plexi/JCM reales', 'Plataforma Amp Room incluida', 'Ruta directa al rock clásico'];
  gv(4).cons = ['One brand only', 'Rock-focused, less metal/jazz', 'Other suites sold separately', 'No tone matching'];
  gv(4).cons_es = ['Solo una marca', 'Enfocado al rock, menos metal/jazz', 'Otras suites por separado', 'Sin coincidencia de tono'];
  gd.featuredProducts = [1019, 1020, 1021, 1022, 1023];
  gd.faq[0] = { q: 'What is the best guitar plugin for home recording in 2026?',
    q_es: '¿Cuál es el mejor plugin de guitarra para grabación casera en 2026?',
    q_a: 'IK Multimedia AmpliTube 5 is the best all-around choice for home recording, with hundreds of gear models and thousands of presets covering every genre. If you want component-level amps with real-room cabinets, Two Notes GENOME is the modern alternative. For classic British crunch on a budget, Kiive Audio Lunchbox Amp Sim is hard to beat.',
    q_a_es: 'IK Multimedia AmpliTube 5 es la mejor opción general para grabación casera, con cientos de modelos y miles de presets cubriendo cada género. Si quieres amplis a nivel de componente con gabinetes de salas reales, Two Notes GENOME es la alternativa moderna. Para crunch británico clásico con presupuesto, Kiive Audio Lunchbox Amp Sim es difícil de superar.' };
  gd.faq[1] = { q: 'Do I need UAD hardware to use Sound City Studios?',
    q_es: '¿Necesito hardware UAD para usar Sound City Studios?',
    q_a: 'No. The native UAD Sound City Studios plugin runs without Apollo hardware or a satellite, straight in your DAW. For non-UAD users who want similar rock tones, AmpliTube 5 or Two Notes GENOME cover classic crunch without any hardware requirement.',
    q_a_es: 'No. El plugin nativo UAD Sound City Studios funciona sin hardware Apollo ni satélite, directo en tu DAW. Para usuarios sin UAD que quieren tonos rock similares, AmpliTube 5 o Two Notes GENOME cubren el crunch clásico sin ningún requisito de hardware.' };
  gd.faq[2] = { q: 'Is Lunchbox Amp Sim good enough for finished records?',
    q_es: '¿Es Lunchbox Amp Sim suficiente para discos terminados?',
    q_a: 'Yes, for classic British crunch and cleans. Lunchbox recreates one valve amp with three cabinets plus drive, delay and reverb, and its tones sit in rock mixes with minimal work. If you need five amp brands or tone matching, step up to AmpliTube 5 or GENOME instead.',
    q_a_es: 'Sí, para crunch y limpios británicos clásicos. Lunchbox recrea un ampli de válvulas con tres gabinetes más drive, delay y reverb, y sus tonos se sitúan en mezclas rock con mínimo trabajo. Si necesitas cinco marcas de amplis o coincidencia de tono, sube a AmpliTube 5 o GENOME.' };
  gd.faq[3] = { q: 'What is the difference between GENOME and AmpliTube 5?',
    q_es: '¿Cuál es la diferencia entre GENOME y AmpliTube 5?',
    q_a: 'GENOME focuses on depth: component-level amps with DynIR cabinets that capture real rooms, plus a curated effects suite. AmpliTube 5 focuses on breadth: hundreds of gear models, thousands of presets and Tonex capture integration. GENOME is better for tone purists, AmpliTube for explorers who want endless options.',
    q_a_es: 'GENOME se enfoca en profundidad: amplis a nivel de componente con gabinetes DynIR que capturan salas reales, más un suite curado de efectos. AmpliTube 5 se enfoca en amplitud: cientos de modelos, miles de presets e integración de capturas Tonex. GENOME es mejor para puristas del tono, AmpliTube para exploradores que quieren opciones infinitas.' };
  swap(gd, [
    ['AmpliTube 5, BIAS FX 2, UAD Sound City, TH-U, Amp Room and bx_rockrack V3', 'AmpliTube 5, GENOME, UAD Sound City, Lunchbox Amp Sim and Amp Room Marshall Suite'],
    ['AmpliTube 5, BIAS FX 2, UAD Sound City, TH-U, Amp Room y bx_rockrack V3', 'AmpliTube 5, GENOME, UAD Sound City, Lunchbox Amp Sim y Amp Room Marshall Suite'],
    ['Positive Grid BIAS FX 2 for tone matching and community presets', 'Two Notes GENOME for component-level amps and DynIR cabs'],
    ['Positive Grid BIAS FX 2 por su coincidencia de tono y presets de la comunidad', 'Two Notes GENOME por amplis a nivel de componente y cabs DynIR'],
    ['Overloud TH-U Premium for speed and precision', 'Kiive Audio Lunchbox Amp Sim for British valve crunch'],
    ['Overloud TH-U Premium por velocidad y precisión', 'Kiive Audio Lunchbox Amp Sim para crunch británico de válvulas'],
    ['Softube Amp Room for Scandinavian clean and high-gain', 'Softube Amp Room Marshall Suite for official Plexi tones'],
    ['Softube Amp Room para limpio escandinavo y alta ganancia', 'Softube Amp Room Marshall Suite para tonos Plexi oficiales'],
    ['Brainworx bx_rockrack V3 for metal and rock tones.', 'Lunchbox Amp Sim covers classic crunch while GENOME handles modern high-gain.'],
    ['Brainworx bx_rockrack V3 para tonos de metal y rock.', 'Lunchbox Amp Sim cubre el crunch clásico mientras GENOME maneja la alta ganancia moderna.'],
    ['BIAS FX 2 provides tone matching and community-driven variety.', 'GENOME provides component-level amps with real-room DynIR cabinets.'],
    ['BIAS FX 2 proporciona coincidencia de tono y variedad impulsada por la comunidad.', 'GENOME proporciona amplis a nivel de componente con gabinetes DynIR de salas reales.'],
    ['TH-U Premium covers every genre with speed and precision.', 'Lunchbox Amp Sim nails classic British crunch on a budget.'],
    ['TH-U Premium cubre cada género con velocidad y precisión.', 'Lunchbox Amp Sim clava el crunch británico clásico con presupuesto.'],
    ['Softube Amp Room excels at clean and crunch tones.', 'The Amp Room Marshall Suite delivers licensed Plexi and JCM tones.'],
    ['Softube Amp Room destaca en tonos limpios y crunch.', 'La Amp Room Marshall Suite ofrece tonos Plexi y JCM licenciados.'],
    ['bx_rockrack V3 is the best value for rock and metal on sale.', 'GENOME is the modern pick for high-gain and full-rig recording.'],
    ['bx_rockrack V3 es la mejor relación calidad-precio para rock y metal en oferta.', 'GENOME es la elección moderna para alta ganancia y grabación de rig completo.'],
    ['Positive Grid BIAS FX 2', 'Two Notes GENOME'],
    ['Positive Grid', 'Two Notes'],
    ['BIAS FX 2', 'GENOME'],
    ['BIAS', 'GENOME'],
    ['Overloud TH-U Premium', 'Kiive Audio Lunchbox Amp Sim'],
    ['Overloud', 'Kiive Audio'],
    ['TH-U Premium', 'Lunchbox Amp Sim'],
    ['TH-U', 'Lunchbox'],
    ['Brainworx bx_rockrack V3', 'Two Notes GENOME'],
    ['bx_rockrack V3', 'GENOME'],
    ['bx_rockrack', 'GENOME'],
    ['Softube Amp Room', 'Softube Amp Room Marshall Suite']
  ]);
  // dedupe accidental doublings from sequential swaps
  let ds = JSON.stringify(gd);
  while (ds.includes('Marshall Suite Marshall Suite')) ds = ds.split('Marshall Suite Marshall Suite').join('Marshall Suite');
  while (ds.includes('GENOME GENOME')) ds = ds.split('GENOME GENOME').join('GENOME');
  while (ds.includes('Lunchbox Lunchbox')) ds = ds.split('Lunchbox Lunchbox').join('Lunchbox');
  const g3 = JSON.parse(ds);
  Object.keys(gd).forEach(k => delete gd[k]);
  Object.assign(gd, g3);
  console.log('guitar done, sections=' + gd.sections.length + ' verdicts=' + gd.verdictProsCons.length);
})();

fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('PART B1 saved');
