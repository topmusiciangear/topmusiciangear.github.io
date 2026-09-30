// ES batch 1: naturalness fixes. Each entry: [scope, fieldPath, old, new].
// scope = guide id or 'P<productId>'. asserts exactly >=1 replacement.
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const FX = [
['best-interface','intro_es','escucharlo por auriculares o parlantes','escucharlo por auriculares o altavoces'],
['guitar-bass-amps','intro_es','Cabeza + Parlante','Cabeza + Gabinete'],
['guitar-bass-amps','sections[1].content_es','La amplificación de bajo se trata de mover aire y manejar bajas frecuencias.','La amplificación de bajo va de mover aire y manejar bajas frecuencias.'],
['live-sound-pa','intro_es','desde parlantes activos hasta','desde altavoces activos hasta'],
['live-sound-pa','sections[0].content_es','recomendaciones de parlantes, consulta','recomendaciones de altavoces, consulta'],
['live-sound-pa','sections[0].content_es','Mejores parlantes PA','Mejores altavoces PA'],
['live-sound-pa','conclusion_es','mejores bafles PA','mejores altavoces PA'],
['best-guitar-home-office','intro_es','con parlantes y efectos integrados','con altavoces y efectos integrados'],
['best-guitar-home-office','intro_es','ya sea que conectes auriculares, uses el parlante integrado, o disfrutes','conectes auriculares, uses el altavoz integrado o disfrutes'],
['best-headphones-for-mixing','intro_es','cuando las escuches en parlantes.','cuando las escuches en altavoces.'],
['best-32-channel-digital-mixers','sections[1].content_es','Integración Acústica con parlantes Turbosound iQ mediante conexión Cat5','Integración Acústica con altavoces Turbosound iQ por conexión Cat5'],
['best-32-channel-digital-mixers','sections[1].content_es','salidas adicionales mediante stage boxes digitales','salidas adicionales con stage boxes digitales'],
['best-32-channel-digital-mixers','sections[2].content_es','audio bidireccional de 32 canales mediante USB 2.0','audio bidireccional de 32 canales por USB 2.0'],
['best-32-channel-digital-mixers','sections[9].content_es','switches SW5E AVB mediante Ethernet estándar','switches SW5E AVB por Ethernet estándar'],
['di-box','intro_es','captures la salida del parlante de un amplificador','captures la salida del altavoz de un amplificador'],
['di-box','intro_es','Ya sea que envíes un bajo directo a la PA, dividas un teclado a dos destinos o captures','Envíes un bajo directo a la PA, dividas un teclado a dos destinos o captures'],
['di-box','sections[1].content_es','señales de parlante de hasta +41 dBu','señales de altavoz de hasta +41 dBu'],
['di-box','sections[1].content_es','puedes pasar la salida de parlante de un amplificador de guitarra','puedes pasar la salida del altavoz de un amplificador de guitarra'],
['di-box','sections[1].content_es','modo instrumento/parlante cambia','modo instrumento/altavoz cambia'],
['di-box','sections[1].content_es','capacidad de nivel de parlante.','capacidad de nivel de altavoz.'],
['di-box','sections[2].content_es','te da ese sonido de parlante en una habitación','te da ese sonido de altavoz en una habitación'],
['di-box','productTable.rows[1].values[1].value_es','Oídos exigentes que quieren carácter de transformador y entrada de nivel parlante','Oídos exigentes que quieren carácter de transformador y entrada de nivel de altavoz'],
['di-box','productTable.rows[3].values[1].value_es','Extensión plana para nivel instrumento y parlante','Extensión plana para nivel de instrumento y altavoz'],
['di-box','productTable.rows[4].values[1].value_es','+20.5dBu instrumento / +41dBu parlante','+20.5dBu instrumento / +41dBu altavoz'],
['di-box','verdictPros_es[1]','entrada de nivel parlante','entrada de nivel de altavoz'],
['di-box','verdictCons_es[0]','señales de nivel parlante','señales de nivel de altavoz'],
['di-box','verdictProsCons[0].cons_es[1]','No está hecha para nivel de parlante como la RNDI','No está hecha para nivel de altavoz como la RNDI'],
['di-box','verdictProsCons[1].pros_es[1]','parlantes de hasta +41 dBu (amplificador de 1000W)','altavoces de hasta +41 dBu (amplificador de 1000W)'],
['di-box','faq[2].a_es','tiene un modo de entrada de nivel de parlante que maneja','tiene un modo de entrada de nivel de altavoz que maneja'],
['di-box','faq[2].a_es','conectarla a la salida de parlante de tu ampli','conectarla a la salida del altavoz de tu ampli'],
['di-box','faq[2].a_es','te da un tono tipo parlante sin micrófono','te da un tono tipo altavoz sin micrófono'],
['j48-vs-rndi','sections[2].content_es','señales de nivel de parlante de hasta +41 dBu','señales de nivel de altavoz de hasta +41 dBu'],
['j48-vs-rndi','verdictProsCons[1].pros_es[1]','señales de parlante de hasta +41 dBu','señales de altavoz de hasta +41 dBu'],
['P446','desc_es','señales de parlante de hasta +41 dBu','señales de altavoz de hasta +41 dBu'],
['ie900-vs-se846','sections[1].content_es','es el audífono de un solo driver','es el auricular de un solo driver'],
['ie900-vs-se846','sections[2].content_es','permite reajustar el audífono en segundos','permite reajustar el auricular en segundos'],
['ie900-vs-se846','sections[3].content_es','es el mejor audífono de su clase','es el mejor auricular de su clase'],
['ie900-vs-se846','featuredSnippet.text_es','es un audífono dinámico','es un auricular dinámico'],
['best-in-ear-monitors','verdictProsCons[2].pros_es[0]','con audífonos IE 4','con auriculares IE 4'],
['best-in-ear-monitors','verdictProsCons[5].pros_es[3]','Incluye audífonos IE 4 listos','Incluye auriculares IE 4 listos'],
['best-in-ear-monitors','verdictProsCons[7].pros_es[3]','Incluye audífonos IE 4 y kit','Incluye auriculares IE 4 y kit'],
['best-in-ear-monitors','sections[3].content_es','el Sennheiser XSW IEM brinda rendimiento UHF fiable','el Sennheiser XSW IEM da rendimiento UHF fiable'],
['best-in-ear-monitors','featuredSnippet.answer_es','brindan libertad en el escenario','dan libertad en el escenario'],
['P266','desc_es','dos pares de audífonos IE 4','dos pares de auriculares IE 4'],
['P267','desc_es','y audífonos SE215','y auriculares SE215'],
['P268','desc_es','es un audífono audiófilo','es un auricular audiófilo'],
['P269','desc_es','Los audífonos aislantes','Los auriculares aislantes'],
['budget-mics','verdictProsCons[1].pros_es[1]','brinda excelente aislamiento','da excelente aislamiento'],
['stage-wireless','sections[5].content_es','te brinda el icónico sonido SM58','te da el icónico sonido SM58'],
['pro-microphones','conclusion_es','que te brinda tanto la calidez','que te da tanto la calidez'],
['pro-microphones','sections[2].content_es','seleccionables mediante control remoto','seleccionables con control remoto'],
['pro-microphones','verdictProsCons[1].pros_es[3]','seleccionables mediante control remoto','seleccionables con control remoto'],
['pro-interfaces','sections[0].content_es','graba independientemente a USB mediante DURec','graba independientemente a USB con DURec'],
['apollo-vs-babyface','sections[1].content_es','no se trata de emulación — se trata de perfección en ingeniería','no va de emulación — va de perfección en ingeniería'],
['blues-junior-vs-ac30','intro_es','El Blues Junior se trata de calidez','El Blues Junior va de calidez'],
['blues-junior-vs-ac30','intro_es','El AC30 se trata de brillo','El AC30 va de brillo'],
['blues-junior-vs-ac30','sections[2].content_es','El Blues Junior se trata de calidez','El Blues Junior va de calidez'],
['blues-junior-vs-ac30','sections[2].content_es','El AC30 se trata de brillo','El AC30 va de brillo'],
['fender-bass-guide','sections[0].content_es','Elegir un bajo se trata de encontrar','Elegir un bajo es encontrar'],
['fender-bass-guide','conclusion_es','Ya seas principiante o profesional de gira','Seas principiante o profesional de gira'],
['fender-guide','sections[4].content_es','ya sea que estés rasgueando canciones folklóricas latinas o aprendiendo','rasguees canciones folklóricas latinas o aprendas'],
['beginner-guitar','intro_es','Ya sea que quieras acústica o eléctrica, composición o tocar en grupo','Quieras acústica o eléctrica, composición o tocar en grupo'],
['m50x-vs-dt770','sections[3].content_es','Ya sea que produzcas en movimiento o grabes en el escritorio','Produzcas en movimiento o grabes en el escritorio'],
['mics-for-creators','intro_es','Ya sea que hagas streaming, grabes voiceovers o hagas videos de YouTube','Hagas streaming, grabes voiceovers o hagas videos de YouTube'],
['beatmaker-plugins','intro_es','Ya sea que estés cortando samples, programando baterías o construyendo loops','Cortes samples, programes baterías o construyas loops'],
['best-keyboard','intro_es','Ya seas un pianista que toca en vivo, un productor casero haciendo beats,','Seas pianista en vivo, productor casero haciendo beats,'],
['best-live-sound-mixers','intro_es','Ya seas un pianista que toca en vivo, un productor casero haciendo beats,','Seas pianista en vivo, productor casero haciendo beats,'],
['rme-vs-motu','intro_es','suprime el jitter sin importar la fuente de reloj','suprime el jitter sea cual sea la fuente de reloj'],
['rme-vs-motu','verdictProsCons[0].pros_es[1]','suprime el jitter sin importar la fuente de reloj','suprime el jitter sea cual sea la fuente de reloj'],
['blx288-vs-ewd','sections[1].text_es','nunca necesitas ajustar la sensibilidad, sin importar si la fuente es un susurro o un grito','nunca necesitas ajustar la sensibilidad, da igual si la fuente es un susurro o un grito'],
['wireless-lapel-mics','featuredSnippet.faq_a2_es','captura audio consistente sin importar dónde te muevas','captura audio consistente te muevas donde te muevas'],
['ew-iem-g4-twin-vs-psm300','intro_es','se mantiene clara sin importar dónde te muevas en el escenario','se mantiene clara te muevas donde te muevas en el escenario'],
['atc-vs-genelec','sections[1].content_es','permanece fija sin importar dónde muevas la cabeza','permanece fija muevas la cabeza donde la muevas'],
['mixing-plugins','featuredSnippet.faq_a1_es','ajustar cada módulo manualmente, lo que lo convierte en la suite de masterización más fácil y a la vez una de las más potentes.','ajustar cada módulo manualmente: la suite de masterización más fácil y a la vez una de las más potentes.'],
['studio-subwoofers','sections[4].content_es','Es el sub más musical de este precio, lo que lo convierte en la opción adecuada si mezclas','Es el sub más musical de este precio y la opción adecuada si mezclas'],
['daw-guide','featuredSnippet.faq_a6_es','conectas módulos con cables virtuales, lo que lo convierte en el DAW más visual y modular del mercado.','conectas módulos con cables virtuales: el DAW más visual y modular del mercado.'],
['zlx-vs-k12','verdictProsCons[0].pros_es[0]','menos que el QSC K12.2, lo que la convierte en el punto de entrada para sistemas en vivo económicos','menos que el QSC K12.2: el punto de entrada para sistemas en vivo económicos'],
['best-grooveboxes','featuredSnippet.faq_a1_es','en cualquier sitio sin ordenador, lo que la convierte en el mejor punto de entrada portátil.','en cualquier sitio sin ordenador: el mejor punto de entrada portátil.'],
['wireless-lapel-mics','sections[1].content_es','hasta cuatro transmisores y ocho receptores, lo que lo convierte en el único kit de aquí capaz','hasta cuatro transmisores y ocho receptores — el único kit de aquí capaz'],
['rode-wireless-pro-vs-dji-mic-2','featuredSnippet.text_es','conectores con bloqueo, lo que lo convierte en la opción segura para entrevistas','conectores con bloqueo: la opción segura para entrevistas'],
['ai-tools-plugins','sections[3].content_es','la mezcla y el master completo, lo que lo convierte en una herramienta versátil para cualquier etapa','la mezcla y el master completo; una herramienta versátil para cualquier etapa'],
['P250','desc_es','el kit completo graba 40 horas, lo que lo convierte en la opción preferida para quien graba entrevistas','el kit completo graba 40 horas: la opción preferida para quien graba entrevistas'],
['P297','desc_es','4 dBA de ruido propio, lo que la convierte en uno de los condensadores de diafragma grande más silenciosos que puedes comprar','4 dBA de ruido propio — uno de los condensadores de diafragma grande más silenciosos que puedes comprar'],
['P459','desc_es','que las de acero, lo que la convierte en la forma más suave posible de empezar a tocar','que las de acero: la forma más suave posible de empezar a tocar'],
['P483','desc_es','un dispositivo multimedia, lo que lo convierte en la herramienta de práctica más versátil que ha lanzado Positive Grid.','un dispositivo multimedia; la herramienta de práctica más versátil que ha lanzado Positive Grid.'],
['zlx-vs-k12','sections[0].content_es','ofrece un valor excepcional con su conjunto de características.','ofrece un valor excepcional con sus funciones.'],
['player-strat-vs-pacifica','verdictProsCons[0].cons_es[0]','por un conjunto de características equivalente','por unas funciones equivalentes'],
['budget-pa-systems','sections[1].content_es','Lo que distingue al Thump215XT es su conjunto de características a este precio:','Lo que distingue al Thump215XT son sus funciones a este precio:'],
['budget-pa-systems','sections[3].content_es','Lo que distingue al TS412 es su conjunto de características:','Lo que distingue al TS412 son sus funciones:'],
['best-digital-mixers','intro_es','hasta 96 canales mediante stage boxes','hasta 96 canales con stage boxes'],
['best-digital-mixers','verdictProsCons[5].pros_es[3]','hasta 96 canales mediante stage boxes','hasta 96 canales con stage boxes'],
['best-looper-pedals','verdictProsCons[0].pros_es[2]','sincroniza con cajas de ritmos, DAWs y pedaleras mediante reloj MIDI','sincroniza con cajas de ritmos, DAWs y pedaleras por reloj MIDI'],
['best-instrument-mics','verdictProsCons[6].pros_es[2]','Control inalámbrico mediante la app PolarPilot','Control inalámbrico desde la app PolarPilot'],
['stream-controllers','featuredSnippet.faq_a4_es','alimentando OBS mediante su Mezcla de Audiencia','enviando a OBS su Mezcla de Audiencia'],
['stream-controllers','featuredSnippet.faq_a4_es','ambos alimentan OBS mediante los canales virtuales de la app','ambos envían a OBS por los canales virtuales de la app'],
['stream-controllers','featuredSnippet.faq_a5_es','canales ilimitados mediante paginado de perillas','canales ilimitados con paginado de perillas'],
['stream-controllers','verdictProsCons[2].pros_es[2]','Canales ilimitados mediante paginado de perillas','Canales ilimitados con paginado de perillas'],
['kh750-vs-7050c','featuredSnippet.faq_a2_es','control por red mediante la app Neumann.Control','control por red desde la app Neumann.Control'],
['P153','desc_es','control mediante app.','control con la app.'],
['P209','desc_es','control inalámbrico mediante la app PolarPilot','control inalámbrico desde la app PolarPilot'],
['P236','desc_es','control total por Bluetooth mediante la app JBL Pro Connect','control total por Bluetooth desde la app JBL Pro Connect'],
['P326','desc_es','tono jazz bass contundente mediante controles simples de volumen y tono','tono jazz bass contundente con controles simples de volumen y tono'],
];
function nav(root, path) {
  const parts = path.split('.');
  let o = root;
  for (const p of parts) {
    const m = p.match(/^(\w+)\[(\d+)\]$/);
    o = m ? o[m[1]][+m[2]] : o[p];
    if (o === undefined) return undefined;
  }
  return o;
}
let ok = 0; const fail = [];
FX.forEach(([scope, path, oldS, newS]) => {
  let root, key;
  if (scope[0] === 'P') {
    root = P.find(p => p.id === +scope.slice(1));
  } else {
    root = G.find(g => g.id === scope);
  }
  if (!root) { fail.push('scope? ' + scope); return; }
  const parts = path.split('.');
  key = parts.pop();
  let o = root;
  for (const p of parts) {
    const m = p.match(/^(\w+)\[(\d+)\]$/);
    o = m ? o[m[1]][+m[2]] : o[p];
    if (o === undefined) break;
  }
  if (!o || typeof o[key] !== 'string' || !o[key].includes(oldS)) { fail.push(scope + ' :: ' + path + ' :: NO-ENCONTRADO: ' + oldS.slice(0, 60)); return; }
  o[key] = o[key].split(oldS).join(newS);
  ok++;
});
fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
fs.writeFileSync('data/products.json', JSON.stringify(P, null, 2) + '\n');
console.log('aplicados: ' + ok + ' | fallos: ' + fail.length);
fail.forEach(f => console.log(' ! ' + f));
