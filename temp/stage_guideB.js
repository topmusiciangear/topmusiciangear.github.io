var fs=require('fs');
var p='data/guides.json';
var d=JSON.parse(fs.readFileSync(p,'utf8'));
var g=d.find(function(x){return x.id==='best-stage-keyboards'});
var fails=[];
function assert(c,m){ if(!c) fails.push(m); }
assert(g && g.sections.length===0,'guide missing or sections not empty');

g.sections.push(
{heading:'The Red Standard: Is the Nord Stage 4 Still the One Keyboard to Rule Them All?',
 heading_es:'El estándar rojo: ¿sigue el Nord Stage 4 siendo el teclado total?',
 products:[11],
 content:'<p><strong>The Nord Stage 4 is the keyboard you see on world tours because it behaves like three instruments with one panel: piano, organ and Wave 2 synth sections, each with dedicated effects, physical drawbars and a layout you can read in the dark.</strong> The 88-note triple-sensor hammer action has aftertouch, splits run up to 4 zones, 512 programs plus 8 Live slots recall full rigs instantly, and 4 assignable outputs feed the house desk. The honest limits: 19.6 kg needs a real stand and a case, there are no XLR outs so big stages want a DI box, and nothing here is cheap. If one board must cover the whole night, this is still the reference.</p>',
 content_es:'<p><strong>El Nord Stage 4 es el teclado de las giras mundiales porque funciona como tres instrumentos en un panel: secciones de piano, órgano y sinte Wave 2, cada una con efectos dedicados, drawbars físicos y un diseño que se lee a oscuras.</strong> Las 88 teclas de martillo triple sensor con aftertouch, divisiones de hasta 4 zonas, 512 programas más 8 Live que recuperan rigs enteros al instante y 4 salidas asignables alimentan la mesa de sala. Los límites honestos: 19,6 kg piden soporte serio y funda, no hay XLR así que en escenarios grandes conviene una DI, y nada aquí es barato. Si un teclado debe cubrir toda la noche, sigue siendo la referencia.</p>'},
{heading:'Wood, Ivory Feel and XLR: Is the RD-2000 EX the Pianist\u2019s Stage Piano?',
 heading_es:'Madera, tacto marfil y XLR: ¿es el RD-2000 EX el piano de escenario del pianista?',
 products:[637],
 content:'<p><strong>The Roland RD-2000 EX is built for players who judge everything by the piano: a PHA-50 hybrid wood-and-plastic hammer action with escapement and ivory feel, driven by independent V-Piano and SuperNATURAL engines.</strong> Eight assignable zones run internal sounds plus laptop instruments at once, 400 scenes recall full setups, and balanced XLR mains go straight to front of house with no DI box. The honest limits: 21.7 kg is a two-person load, there are no onboard speakers for rehearsal, and the synth side is thinner than a workstation. If piano tone and touch decide your gig, this is the purist\u2019s pick.</p>',
 content_es:'<p><strong>El Roland RD-2000 EX está hecho para quien lo juzga todo por el piano: acción de martillo híbrida madera-plástico PHA-50 con escape y tacto marfil, movida por motores independientes V-Piano y SuperNATURAL.</strong> Ocho zonas asignables mezclan sonidos internos e instrumentos del portátil a la vez, 400 escenas recuperan configuraciones enteras, y las salidas XLR balanceadas van directas a sala sin DI. Los límites honestos: 21,7 kg se cargan entre dos, no hay altavoces para ensayar, y la parte de sinte es más fina que en una workstation. Si el tono y el tacto de piano deciden tu bolo, es la elección del purista.</p>'},
{heading:'Drawbars and Attitude: Is the YC88 the Rock Organ Machine?',
 heading_es:'Drawbars y actitud: ¿es el YC88 la máquina de órgano rock?',
 products:[638],
 content:'<p><strong>The Yamaha YC88 pairs classic rock organ aggression with a real concert grand: 9 physical drawbars with LED indicators driving the VCM organ engine, plus the CFX grand, wrapped in 88 natural-wood graded hammer keys with triple sensors.</strong> Splits and layers, Live Sets, AWM2 and FM voices and balanced XLR outs make it a complete loud-stage rig at 18.6 kg. The honest limits: it is an organ-first instrument, so synth programmers get less than on a workstation, and the price sits firmly in flagship territory. If your set lives on Hammond grit and piano power, this is the machine.</p>',
 content_es:'<p><strong>El Yamaha YC88 une la agresividad del órgano rock clásico con un gran cola de verdad: 9 drawbars físicos con LED moviendo el motor VCM, más el gran cola CFX, envueltos en 88 teclas de madera graduadas con triple sensor.</strong> Divisiones y capas, Live Sets, voces AWM2 y FM y salidas XLR balanceadas lo convierten en un rig completo para escenarios ruidosos con 18,6 kg. Los límites honestos: es un instrumento de órgano primero, así que los programadores de sintes reciben menos que en una workstation, y el precio está en territorio insignia. Si tu repertorio vive del Hammond con garra y el piano potente, esta es la máquina.</p>'},
{heading:'28 Kilos of Everything: Is the Montage M8x Too Much Keyboard?',
 heading_es:'28 kilos de todo: ¿es el Montage M8x demasiado teclado?',
 products:[639],
 content:'<p><strong>The Yamaha Montage M8x is for bands running complex backing tracks, massive electronic textures and cinematic layers: a triple AN-X, AWM2 and FM-X engine behind 88 GEX weighted keys with polyphonic aftertouch.</strong> The Super Knob morphs entire textures with one hand, balanced TRS outputs plus assignable pairs feed any console, and the keybed is among the finest here. The honest limits: 28.1 kg demands a flight case, a stand rated for it and load-in help, and casual players will never touch half its depth. If your show is an orchestration, nothing smaller does the job.</p>',
 content_es:'<p><strong>El Yamaha Montage M8x es para bandas con pistas complejas, texturas electrónicas enormes y capas de cine: triple motor AN-X, AWM2 y FM-X tras 88 teclas GEX contrapesadas con aftertouch polifónico.</strong> El Super Knob transforma texturas enteras con una mano, las salidas TRS balanceadas más pares asignables alimentan cualquier mesa, y el teclado está entre los mejores de aquí. Los límites honestos: 28,1 kg piden flight case, soporte a la altura y ayuda en la carga, y el aficionado jamás tocará la mitad de su fondo. Si tu show es una orquestación, nada más pequeño sirve.</p>'},
{heading:'Clips, Pads and Touchscreen: Is the Fantom 8 EX a DAW You Can Lift?',
 heading_es:'Clips, pads y táctil: ¿es el Fantom 8 EX un DAW que se puede levantar?',
 products:[640],
 content:'<p><strong>The Roland Fantom 8 EX is the workstation for players who launch as much as they play: a 7-inch touchscreen, 16 RGB pads firing sounds, samples and clips, and a clip-based sequencer with TR-REC and piano roll.</strong> ZEN-Core, V-Piano and SuperNATURAL engines cover over 7,000 sounds across 88 PHA-50 hybrid keys, with XLR mains, sub outs and even CV/Gate for modular rigs. The honest limits: 27.7 kg is a crew lift, the depth rewards study time, and the price matches the ambition. If your set runs on sequences and scenes, this is the most fluid board here.</p>',
 content_es:'<p><strong>El Roland Fantom 8 EX es la workstation para quien dispara tanto como toca: pantalla táctil de 7 pulgadas, 16 pads RGB que lanzan sonidos, samples y clips, y secuenciador por clips con TR-REC y piano roll.</strong> Los motores ZEN-Core, V-Piano y SuperNATURAL cubren más de 7.000 sonidos en 88 teclas híbridas PHA-50, con XLR principales, subs e incluso CV/Gate para rigs modulares. Los límites honestos: 27,7 kg se cargan en equipo, su fondo pide horas de estudio, y el precio acompaña la ambición. Si tu set vive de secuencias y escenas, es el teclado más fluido de aquí.</p>'},
{heading:'8.3 Kilos of Vintage: Is the Electro 7 the Funk Player\u2019s Fly Rig?',
 heading_es:'8,3 kilos de vintage: ¿es el Electro 7 el equipo de vuelo del funk?',
 products:[641],
 content:'<p><strong>The Nord Electro 7 61 is the fly-date answer for funk, blues and rock: 8.3 kg with 61 semi-weighted waterfall keys made for smears and glissandos, physical LED drawbars and the new Organ 3 engine with rotary emulation.</strong> Piano library compatibility, a brand-new analog/FM sample synth section, seamless transitions and splits with crossfades cover a whole gig book. The honest limits: only two unbalanced outputs, so big rooms want a DI box, and the 61 has no pitch stick. If it must fit in an overhead bin philosophy and still sound vintage, this is it.</p>',
 content_es:'<p><strong>El Nord Electro 7 61 es la respuesta para fechas con vuelo en funk, blues y rock: 8,3 kg con 61 teclas waterfall semipesadas para smears y glissandos, drawbars físicos con LED y el nuevo motor Organ 3 con emulación rotatoria.</strong> Compatibilidad con la librería de pianos, sección de sinte analógico/FM nueva, transiciones sin cortes y divisiones con crossfades cubren un repertorio entero. Los límites honestos: solo dos salidas no balanceadas, así que en salas grandes conviene DI, y el 61 no trae pitch stick. Si debe viajar ligero y sonar vintage, es este.</p>'},
{heading:'Seven Engines, One RH3: Is the Grandstage X the Sound Buffet?',
 heading_es:'Siete motores, un RH3: ¿es el Grandstage X el bufé de sonido?',
 products:[642],
 content:'<p><strong>The Korg Grandstage X is for players who want every core sound without menu archaeology: seven engines from SGX-2 grands to CX-3 and VOX organs across a Japanese-crafted RH3 hammer action.</strong> One hundred favorites, 3-part splits and layers, Nutube warmth and balanced XLR outs with ground lift make changeovers painless. The honest limits: 25 kg is no fly rig, there is no aftertouch, and seamless patch-change claims belong to its predecessor, not this spec sheet. If the setlist jumps genres every song, this buffet never runs out.</p>',
 content_es:'<p><strong>El Korg Grandstage X es para quien quiere cada sonido esencial sin arqueología de menús: siete motores de los grandes SGX-2 a los órganos CX-3 y VOX sobre acción de martillo RH3 de factura japonesa.</strong> Cien favoritos, divisiones en 3 partes, calidez Nutube y XLR balanceadas con ground lift hacen los cambios indoloros. Los límites honestos: 25 kg no es equipo de vuelo, no hay aftertouch, y las transiciones fluidas documentadas son de su antecesor, no de esta ficha. Si el repertorio salta de género en cada tema, este bufé no se acaba.</p>'},
{heading:'Leave the Laptop: Does the AstroLab Really Replace Your Plugins on Stage?',
 heading_es:'Deja el portátil: ¿sustituye el AstroLab tus plugins en directo?',
 products:[643],
 content:'<p><strong>The Arturia AstroLab 61 moves the plugin rig into hardware: 61 semi-weighted keys with aftertouch playing 40-plus built-in engines and over 1,800 presets from Analog Lab, with playlists, splits, USB-C and no computer at the gig.</strong> Macros, arps, chord and scale modes plus MIDI DIN I/O integrate pedals and extra gear at 9.9 kg. The honest limits: the full V Collection lives on your computer, not inside (Analog Lab presets plus expansions); there are no XLR outs; and deep editors stay in software. If your sounds already live in Arturia plugins, this is the stage door.</p>',
 content_es:'<p><strong>El Arturia AstroLab 61 pasa el rig de plugins a hardware: 61 teclas semipesadas con aftertouch con más de 40 motores internos y más de 1.800 presets de Analog Lab, con listas, divisiones, USB-C y sin ordenador en el bolo.</strong> Macros, arpegios, modos de acordes y escalas más MIDI DIN integran pedales y equipo extra con 9,9 kg. Los límites honestos: la V Collection completa vive en tu ordenador, no dentro (presets de Analog Lab más expansiones); no hay XLR; y los editores profundos quedan en software. Si tus sonidos ya viven en plugins Arturia, esta es la puerta al escenario.</p>'},
{heading:'Batteries Included: Is the CK88 the Smartest Cheap Seat on Stage?',
 heading_es:'Con pilas incluidas: ¿es el CK88 el asiento barato más listo del escenario?',
 products:[644],
 content:'<p><strong>The Yamaha CK88 is the mid-budget gig bargain: 88 graded-hammer GHS keys, CFX and S700 grands plus a 9-drawbar organ section, 3-zone splits and Live Sets — running on eight AA batteries with built-in speakers.</strong> Rehearse anywhere, busk, then plug the unbalanced outs into the house PA at night. The honest limits: the action and engines sit a class below the flagships, there are no XLR outs, and 13.1 kg is light for what it does but no feather. If the budget is mortal and the calendar is full, this is the smart money.</p>',
 content_es:'<p><strong>El Yamaha CK88 es la ganga para bolos de presupuesto medio: 88 teclas GHS graduadas, grandes CFX y S700 más sección de órgano de 9 drawbars, divisiones en 3 zonas y Live Sets, funcionando con ocho pilas AA y altavoces integrados.</strong> Ensaya donde sea, toca en la calle y por la noche conecta las salidas a la PA de sala. Los límites honestos: acción y motores están un peldaño bajo los insignia, no hay XLR, y 13,1 kg es ligero para lo que hace pero no una pluma. Si el presupuesto es mortal y el calendario va lleno, este es el dinero listo.</p>'},
{heading:'The Two-Tier Rig Rule: Why Pros Play Two Keyboards',
 heading_es:'La regla del rig de doble piso: por qué los profesionales tocan con dos teclados',
 content:'<p><strong>On real stages, professionals rarely play one keyboard: the winning rig is two tiers.</strong> Put a weighted 88 — a Nord Stage 4 or Roland RD-2000 EX — on the lower tier for piano parts, and a light 61 — a Nord Electro 7 or a synth like the Juno class — up top for organ smears, solos and quick patch changes. Heavy action where your left hand comps, light action where your right hand flies, and if one board fails mid-set the show still has keys.</p><p><strong>Build it in order:</strong> buy the 88 that matches your piano touch first, add the 61 when the calendar fills, and run both into a small submixer or straight to the snake — stereo where it counts, mono where it does not. Two boards, zero menu diving, no single point of silence.</p>',
 content_es:'<p><strong>En los escenarios de verdad, los profesionales rara vez tocan con un teclado: el rig ganador tiene dos pisos.</strong> Un 88 contrapesado —Nord Stage 4 o Roland RD-2000 EX— abajo para los pianos, y un 61 ligero —Nord Electro 7 o un sinte— arriba para órgano, solos y cambios rápidos. Acción pesada donde acompaña la izquierda, acción ligera donde vuela la derecha, y si un teclado falla a mitad del set el show sigue teniendo teclas.</p><p><strong>Móntalo en orden:</strong> compra primero el 88 que encaje con tu tacto de piano, suma el 61 cuando se llene el calendario, y lleva ambos a un submezclador o directo a la manguera —estéreo donde cuenta, mono donde no. Dos teclados, cero menús, ningún punto único de silencio.</p>'}
);

var V4=[
{name:'Nord Stage 4 88',name_es:'Nord Stage 4 88',
 pros:['Three independent engines: piano, organ and Wave 2 synth','Hands-on panel with physical drawbars — no menu diving','Seamless transitions plus 512 programs and 8 Live slots','Triple-sensor hammer action with aftertouch'],
 pros_es:['Tres motores independientes: piano, órgano y sinte Wave 2','Panel directo con drawbars físicos, sin menús','Transiciones sin cortes más 512 programas y 8 Live','Acción de martillo triple sensor con aftertouch'],
 cons:['19.6 kg needs a real stand, case and load-in help','No XLR outputs — big stages want a DI box','Flagship price around $6,000','Depth rewards players who program their own rigs'],
 cons_es:['19,6 kg piden soporte serio, funda y ayuda en la carga','Sin salidas XLR: en escenarios grandes conviene DI','Precio insignia de unos $6.000','Su fondo premia a quien programa su propio rig']},
{name:'Roland RD-2000 EX',name_es:'Roland RD-2000 EX',
 pros:['PHA-50 hybrid wood action with escapement and ivory feel','Independent V-Piano and SuperNATURAL engines','Eight zones run internal sounds plus laptop rigs','Balanced XLR mains straight to front of house'],
 pros_es:['Acción híbrida madera PHA-50 con escape y tacto marfil','Motores independientes V-Piano y SuperNATURAL','Ocho zonas mezclan sonidos internos y portátil','XLR balanceadas directas a sala'],
 cons:['21.7 kg is a two-person load with case','No onboard speakers for rehearsal','Thinner synth side than a workstation','Flagship price near $2,900'],
 cons_es:['21,7 kg se cargan entre dos con funda','Sin altavoces para ensayar','Lado de sinte más fino que una workstation','Precio insignia cerca de $2.900']},
{name:'Yamaha YC88',name_es:'Yamaha YC88',
 pros:['9 physical drawbars with LED indicators','Natural-wood graded hammer keys with triple sensors','VCM organ plus CFX concert grand','Balanced XLR outputs in an 18.6 kg cabinet'],
 pros_es:['9 drawbars físicos con indicadores LED','Teclas de madera graduadas con triple sensor','Órgano VCM más gran cola CFX','Salidas XLR balanceadas en 18,6 kg'],
 cons:['Organ-first design limits synth programmers','Flagship price around $3,200','18.6 kg still needs a sturdy stand','No onboard speakers'],
 cons_es:['Diseño de órgano primero que limita a programadores','Precio insignia de unos $3.200','18,6 kg aún piden soporte firme','Sin altavoces integrados']},
{name:'Yamaha Montage M8x',name_es:'Yamaha Montage M8x',
 pros:['Triple AN-X, AWM2 and FM-X engine for huge layers','88 GEX weighted keys with polyphonic aftertouch','Super Knob morphs full textures one-handed','Balanced outputs plus assignable pairs'],
 pros_es:['Triple motor AN-X, AWM2 y FM-X para capas enormes','88 teclas GEX contrapesadas con aftertouch polifónico','El Super Knob transforma texturas con una mano','Salidas balanceadas más pares asignables'],
 cons:['28.1 kg demands flight case and crew','Overkill depth for casual players','Flagship price around $4,700','Needs a stand rated for heavy boards'],
 cons_es:['28,1 kg piden flight case y equipo','Fondo excesivo para aficionados','Precio insignia de unos $4.700','Necesita un soporte para teclados pesados']},
{name:'Roland Fantom 8 EX',name_es:'Roland Fantom 8 EX',
 pros:['7-inch touchscreen plus 16 RGB clip-launch pads','ZEN-Core, V-Piano and SuperNATURAL engines, 7,000+ sounds','Clip sequencer with TR-REC and piano roll','XLR mains, subs and CV/Gate for modular rigs'],
 pros_es:['Táctil de 7 pulgadas más 16 pads RGB de clips','Motores ZEN-Core, V-Piano y SuperNATURAL, más de 7.000 sonidos','Secuenciador por clips con TR-REC y piano roll','XLR principales, subs y CV/Gate para modulares'],
 cons:['27.7 kg is a crew lift with case','Study time required to master the depth','Flagship price around $4,600','Touchscreen washes out under harsh sun'],
 cons_es:['27,7 kg se cargan en equipo con funda','Su fondo pide horas de estudio','Precio insignia de unos $4.600','La táctil se lava con sol fuerte']},
{name:'Nord Electro 7 61',name_es:'Nord Electro 7 61',
 pros:['Only 8.3 kg with waterfall keys for smears and glissandos','Physical LED drawbars plus new Organ 3 engine','Brand-new analog/FM synth section with seamless transitions','Splits with crossfades plus 500 programs and 5 Live slots'],
 pros_es:['Solo 8,3 kg con teclas waterfall para smears y glissandos','Drawbars físicos con LED más motor Organ 3 nuevo','Sección de sinte analógico/FM nueva con transiciones fluidas','Divisiones con crossfades más 500 programas y 5 Live'],
 cons:['Only two unbalanced outputs — big rooms want a DI','61-key model has no pitch stick','No XLR outputs','Flagship 61 price around $3,300'],
 cons_es:['Solo dos salidas no balanceadas: en salas grandes conviene DI','El modelo de 61 no trae pitch stick','Sin salidas XLR','Precio insignia de 61 de unos $3.300']},
{name:'Korg Grandstage X',name_es:'Korg Grandstage X',
 pros:['Seven engines from grands to CX-3 and VOX organs','Japanese-crafted RH3 hammer action','100 favorites plus 3-part splits and layers','Balanced XLR outs with ground lift'],
 pros_es:['Siete motores de grandes a órganos CX-3 y VOX','Acción de martillo RH3 de factura japonesa','Cien favoritos más divisiones en 3 partes','XLR balanceadas con ground lift'],
 cons:['25 kg is no fly rig','No aftertouch on the keybed','Seamless switching is documented on its predecessor, not here','Around $2,000 puts it above mid-budget'],
 cons_es:['25 kg no es equipo de vuelo','Sin aftertouch en el teclado','Las transiciones fluidas están documentadas en su antecesor, no aquí','Unos $2.000 lo ponen sobre el presupuesto medio']},
{name:'Arturia AstroLab 61',name_es:'Arturia AstroLab 61',
 pros:['40-plus engines and 1,800-plus presets with no computer on stage','61 semi-weighted keys with aftertouch at 9.9 kg','Playlists, splits, USB-C and MIDI DIN I/O','Macros, arp and chord modes for live shaping'],
 pros_es:['Más de 40 motores y más de 1.800 presets sin ordenador en escena','61 teclas semipesadas con aftertouch en 9,9 kg','Listas, divisiones, USB-C y MIDI DIN','Macros, arpegios y acordes para dar forma en directo'],
 cons:['Full V Collection lives on your computer, not inside','No XLR outputs for the house console','Deep editing stays in software','Around $1,600 is serious money for a preset player'],
 cons_es:['La V Collection completa vive en tu ordenador, no dentro','Sin salidas XLR para la mesa de sala','La edición profunda queda en software','Unos $1.600 es dinero serio para un reproductor de presets']},
{name:'Yamaha CK88',name_es:'Yamaha CK88',
 pros:['Runs on eight AA batteries with built-in speakers','88 graded-hammer GHS keys plus 9-drawbar organ','3-zone splits and Live Sets for full sets','CFX and S700 grands at a mid-budget price'],
 pros_es:['Funciona con ocho pilas AA y altavoces integrados','88 teclas GHS graduadas más órgano de 9 drawbars','Divisiones en 3 zonas y Live Sets para sets enteros','Grandes CFX y S700 a precio medio'],
 cons:['Action and engines a class below the flagships','No XLR outputs','13.1 kg is light for the feature set but no feather','Unbalanced outs want short cable runs'],
 cons_es:['Acción y motores un peldaño bajo los insignia','Sin salidas XLR','13,1 kg es ligero para lo que hace pero no una pluma','Las salidas no balanceadas piden tiradas cortas']}
];
V4.forEach(function(v){
  assert(v.pros.length>=4&&v.cons.length>=4&&v.pros_es.length>=4&&v.cons_es.length>=4,'verdict short '+v.name);
  g.verdictProsCons.push(v);
});

if(fails.length){ console.log('FAIL:\n'+fails.join('\n')); process.exit(1); }
fs.writeFileSync(p,JSON.stringify(d,null,2));
console.log('STAGE GUIDE B OK | sections: '+g.sections.length+' verdicts: '+g.verdictProsCons.length);
