const fs = require('fs');

// ---------- products.json ----------
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const P = id => products.find(p => p.id === id);

// 340 NTG5: peso real 76 g, RF-bias (no "circumaural"), 10 dBA
Object.assign(P(340), {
  desc: "Featherweight (76 g) aluminum shotgun with RF-bias architecture and class-leading 10 dBA self-noise, plus a genuinely complete kit: WS10 windshield, cable, mount and case.",
  desc_es: "Shotgun de aluminio ultraligero (76 g) con arquitectura RF-bias y auto-ruido líder de clase de 10 dBA, más un kit realmente completo: antiviento WS10, cable, soporte y estuche."
});

// 343 AT897: longitud real 279 mm (no 6.9 in / 17,5 cm)
Object.assign(P(343), {
  desc: "An 11-inch (279 mm) line-plus-gradient shotgun tuned for field production. Runs up to 1,200 hours on one AA or 11-52V phantom and mounts easily on boom poles and cameras.",
  desc_es: "Shotgun line-plus-gradient de 279 mm afinado para producción de campo. Funciona hasta 1.200 horas con una pila AA o con fantasma de 11-52V y se monta fácilmente en pértinas y cámaras."
});

// 344 S-Mic 3: cuerpo de aluminio (no cobre), weather-resistant (no IP53), 12 dBA
Object.assign(P(344), {
  desc: "Deity's flagship all-aluminum weather-resistant shotgun with a measured 12 dBA self-noise and a neutral, honest tone that punches far above its price bracket.",
  desc_es: "Shotgun insignia de Deity totalmente de aluminio y resistente al clima, con auto-ruido medido de 12 dBA y un tono neutro y honesto que rinde muy por encima de su precio."
});

// 346 MKE 400: 2 pilas AAA, 100+ horas (no 200 h con una AAA)
Object.assign(P(346), {
  desc: "Pocket-sized supercardioid with 3-stage gain, integrated windscreen, headphone output and 100+ hours from two AAA batteries - the easiest upgrade from any camera's built-in mic.",
  desc_es: "Supercardioide tamaño bolsillo con ganancia de 3 etapas, antiviento integrado, salida de auriculares y más de 100 horas con dos pilas AAA: la mejora más sencilla al micrófono integrado de cualquier cámara."
});

// Gear4music links (verificados)
const g4m = {
  339: 'https://www.gear4music.com/us/en/PA-DJ-and-Lighting/Sennheiser-MKH-416-P48U-Super-Cardioid-Shotgun-Microphone/144R',
  340: 'https://www.gear4music.com/us/en/PA-DJ-and-Lighting/Rode-NTG5-Shotgun-Microphone/3696',
  341: 'https://www.gear4music.com/us/en/PA-DJ-and-Lighting/Rode-NTG3-Condenser-Shotgun-Microphone-Black/SBB',
  342: 'https://www.gear4music.com/us/en/PA-DJ-and-Lighting/Sennheiser-MKE-600-Shotgun-Microphone/2R19',
  345: 'https://www.gear4music.com/us/en/PA-DJ-and-Lighting/Rode-VideoMic-NTG/37N6',
  346: 'https://www.gear4music.com/us/en/PA-DJ-and-Lighting/Sennheiser-MKE-400-Camera-Microphone/3RIB'
};
Object.entries(g4m).forEach(([id, url]) => {
  const p = P(+id);
  p.stores = Object.assign({ gear4music: url }, p.stores);
});

fs.writeFileSync('data/products.json', JSON.stringify(products, null, 1));

// ---------- guides.json ----------
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const x = guides.find(g => g.id === 'best-shotgun-mics');

x.intro_es = "Un gran micrófono shotgun es la diferencia entre un siseo amateur y diálogo listo para transmisión. Después de años en set y en postproducción, estos son los ocho shotguns de pértina y cámara que consistentemente valen lo que cuestan, desde el modelo de entrada de $200 hasta el estándar de la industria MKH 416.";

x.conclusion_es = "Para pértina dedicada el Sennheiser MKH 416 ($849) sigue siendo la opción predeterminada profesional, con el Rode NTG5 ($569) como su rival moderno y ligero y el NTG3 ($699) dividiendo la diferencia. Los presupuestos indie deberían comprar el MKE 600 ($330) sin dudarlo. Para zapata de cámara, el VideoMic NTG ($259) no tiene rival y el MKE 400 ($199) es la primera mejora más fácil.";

x.verdict_es = "El MKH 416 gana en confiabilidad probada y valor de reventa; el NTG5 gana en peso y nivel de ruido propio; el MKE 600 gana para todos los demás.";

// S2 NTG5
x.sections[2].content = "<strong>The NTG5 brings shotgun design into the 2020s.</strong> At just 76 grams it is the lightest full-size boom in this guide and disappears on a pole during long takes, while its RF-bias circuit measures a class-leading 10 dBA of self-noise - quieter than mics costing twice as much. It powers from P48/P24 phantom or straight off a USB-C power bank, and the kit ships genuinely complete: WS10 windshield, high-grade cable, mount and hard case. Tonally it reads slightly warmer than the 416 rather than brighter, which flatters naturalistic documentary dialogue. The trade-offs: a 120 dB SPL ceiling gives less headroom for shouting actors, and the 3.5mm jack feels less road-proof than a locking XLR.";
x.sections[2].content_es = "<strong>El NTG5 trae el diseño shotgun a los años 2020.</strong> Con solo 76 gramos es la pértina de tamaño completo más ligera de esta guía y desaparece en la pértina durante tomas largas, mientras su circuito RF-bias mide un auto-ruido líder de clase de 10 dBA, más silencioso que micrófonos del doble de precio. Se alimenta con fantasma P48/P24 o directamente de un power bank USB-C, y el kit llega realmente completo: antiviento WS10, cable de alta calidad, soporte y estuche rígido. En tono resulta algo más cálido que el 416 en lugar de más brillante, lo que favorece el diálogo documental naturalista. Las contras: un techo de 120 dB SPL da menos margen para actores gritando, y el jack de 3,5 mm se siente menos robusto que un XLR con bloqueo.";

// S3 NTG3
x.sections[3].content = "<strong>The NTG3 is Rode's answer to the 416</strong>: a brass-bodied RF-bias shotgun rated for the same humidity-proof abuse, with a slightly extended low end that adds weight to male dialogue. Its 13 dBA self-noise matches the 416, the machined brass shell shrugs off rental-house treatment, and the included aluminum flight case signals who it is for. At 163 grams it carries noticeably lighter on a pole than its spec-sheet ancestors suggest. If you love the NTG5's noise floor but need more reach, a locking XLR and a tougher shell, the NTG3 splits the difference at $699.";
x.sections[3].content_es = "<strong>El NTG3 es la respuesta de Rode al 416</strong>: un shotgun RF-bias con cuerpo de latón calificado para el mismo abuso resistente a la humedad, con graves levemente extendidos que dan peso al diálogo masculino. Su auto-ruido de 13 dBA iguala al 416, el caparazón de latón mecanizado aguanta el trato de las casas de renta y el estuche de vuelo de aluminio incluido indica para quién está hecho. Con 163 gramos se siente notablemente más ligero en la pértina de lo que sugieren sus ancestros de ficha técnica. Si te gusta el nivel de ruido del NTG5 pero necesitas más alcance, XLR con bloqueo y un cuerpo más duro, el NTG3 divide la diferencia por $699.";

// S5 AT897
x.sections[5].content = "<strong>At 279 mm the AT897 is longer than it looks online but still slots where full broadcast shotguns cannot</strong> - cramped interiors, handheld rigs, travel kits. Despite the slim tube it keeps a disciplined line-plus-gradient pattern and runs on a single AA for up to 1,200 hours or 11-52V phantom, so dead-battery panics basically do not exist. It is noticeably less refined at the extreme top end than the pricier options here, and its 17 dBA self-noise asks for decent preamps. But as a second mic for B-roll and interviews - or the only mic for a lean travel doc - it earns its $249 many times over.";
x.sections[5].content_es = "<strong>Con 279 mm el AT897 es más largo de lo que parece en internet, pero aun así cabe donde los shotguns de broadcast no pueden</strong>: interiores reducidos, rigs handheld, kits de viaje. A pesar del tubo delgado mantiene un patrón line-plus-gradient disciplinado y funciona con una pila AA hasta 1.200 horas o con fantasma de 11-52V, así que los sustos de batería agotada prácticamente no existen. Es notablemente menos refinado en el extremo alto que las opciones más caras de esta guía y su auto-ruido de 17 dBA pide buenos previos. Pero como segundo micrófono para B-roll y entrevistas, o como único mic de un documental de viaje ligero, amortiza sus $249 muchas veces.";

// S6 S-Mic 3
x.sections[6].content = "<strong>Deity built the S-Mic 3 to embarrass mics twice its price.</strong> An all-aluminum weather-resistant body (tested to 95% humidity), just 80 grams and a measured 12 dBA self-noise - quieter than the 416 on paper - make it sound far more expensive than $399. The tonal balance is neutral and honest, sitting dialogue forward without coloration. Timecode-synced filmmakers already trust Deity wireless; this boom completes the ecosystem. The trade-offs are practical, not sonic: availability outside direct channels is spottier than Sennheiser or Rode, the company's track record is shorter, and there is no battery option - it needs P24 or P48 phantom.";
x.sections[6].content_es = "<strong>Deity construyó el S-Mic 3 para avergonzar a micrófonos del doble de su precio.</strong> Un cuerpo totalmente de aluminio resistente al clima (probado al 95% de humedad), solo 80 gramos y un auto-ruido medido de 12 dBA, más silencioso que el 416 sobre el papel, lo hacen sonar mucho más caro que $399. Su balance tonal es neutro y honesto, colocando el diálogo al frente sin coloración. Los cineastas con timecode ya confían en el wireless de Deity; esta pértina completa el ecosistema. Las contras son prácticas, no sonoras: la disponibilidad fuera de canales directos es más irregular que la de Sennheiser o Rode, el historial de la marca es más corto y no hay opción de pila: necesita fantasma P24 o P48.";

// S8 MKE 400
x.sections[8].content = "<strong>The MKE 400 is the painless first step beyond your camera's built-in mic.</strong> Three gain stages tame loud or quiet sources, the integrated windscreen tames light breeze, and 100+ hours from two AAA batteries mean you forget about it until wrap. A headphone output lets you monitor what you actually recorded, and TRS/TRRS auto-sensing mounts it on mirrorless bodies and phones alike. Reach is modest and self-noise is audible in silent rooms, so it will not replace a boom for narrative work. But at $199 it makes every run-and-gun video instantly more professional.";
x.sections[8].content_es = "<strong>El MKE 400 es el primer paso sin dolor más allá del micrófono integrado de tu cámara.</strong> Tres etapas de ganancia doman fuentes fuertes o suaves, el antiviento integrado calma la brisa ligera y más de 100 horas con dos pilas AAA hacen que lo olvides hasta el corte. Una salida de auriculares te permite monitorear lo que realmente grabaste, y la detección automática TRS/TRRS lo monta en cámaras mirrorless y teléfonos por igual. El alcance es modesto y el auto-ruido se escucha en salas silenciosas, así que no reemplazará a una pértina en trabajo narrativo. Pero por $199 hace que cada video run-and-gun se vea instantáneamente más profesional.";

// FAQs originales y variadas
const fsn = x.featuredSnippet;
fsn.faq_q1_en = "Why does my shotgun mic pick up room echo indoors even when I aim it at the actor?";
fsn.faq_a1_en = "Shotguns do not zoom - they cancel sound from the sides while keeping a rear lobe. Indoors, reflections bounce off hard walls into that rear lobe, so you hear the room. Outdoors there are no walls, so the same mic sounds tight. Indoors, hang blankets, rug the floor, or get the mic within 30-60 cm instead of buying a longer shotgun.";
fsn.faq_q1_es = "¿Por qué mi shotgun capta eco de la sala en interiores aunque lo apunte al actor?";
fsn.faq_a1_es = "Los shotguns no hacen zoom: cancelan el sonido lateral pero conservan un lóbulo trasero. En interiores, las reflexiones rebotan en las paredes duras y entran por ese lóbulo, así que escuchas la sala. En exteriores no hay paredes y el mismo mic suena cerrado. Adentro: cuelga mantas, alfombra el piso o acerca el mic a 30-60 cm en vez de comprar un shotgun más largo.";

fsn.faq_q2_en = "Can I plug an MKH 416 or MKE 600 straight into my mirrorless camera?";
fsn.faq_a2_en = "Not directly - both need 48V phantom power and a full-size XLR input that cameras lack. Put a small XLR mixer or recorder (like a Zoom F3) between mic and camera, then sync in post if it is not timecode-linked. The MKE 600 can also run on one AA battery, but it still requires a real XLR input.";
fsn.faq_q2_es = "¿Puedo conectar un MKH 416 o MKE 600 directo a mi cámara mirrorless?";
fsn.faq_a2_es = "No directamente: ambos necesitan 48V fantasma y una entrada XLR de tamaño completo que las cámaras no tienen. Coloca un mezclador o grabador XLR pequeño (como un Zoom F3) entre el mic y la cámara, y sincroniza en post si no hay timecode. El MKE 600 también funciona con una pila AA, pero sigue necesitando entrada XLR real.";

fsn.faq_q3_en = "How far can a shotgun sit from the actor before dialogue sounds distant?";
fsn.faq_a3_en = "Outdoors, a quality supercardioid shotgun stays clean at roughly 2-3 meters; past that, ambience and wind eat dialogue faster than spec sheets suggest. Every doubling of distance costs about 6 dB of direct sound, so moving from 2 m to 1 m buys more quality than upgrading the microphone itself.";
fsn.faq_q3_es = "¿A qué distancia puede estar un shotgun del actor antes de que el diálogo suene lejano?";
fsn.faq_a3_es = "En exteriores, un shotgun supercardioide de calidad se mantiene limpio a unos 2-3 metros; más allá, el ambiente y el viento comen el diálogo más rápido de lo que sugieren las fichas técnicas. Cada duplicación de distancia cuesta unos 6 dB de sonido directo: pasar de 2 m a 1 m mejora más que cambiar de micrófono.";

fsn.faq_q4_en = "Are shotgun mics good for podcasting or voice-over in a home studio?";
fsn.faq_a4_en = "Usually no. In an untreated room a shotgun punishes you with the same side-cancellation and rear-lobe pickup that make indoor echo worse. A dynamic cardioid or a large-diaphragm condenser worked close to the mouth is far more forgiving until you treat the room. Save the shotgun for location sound.";
fsn.faq_q4_es = "¿Sirven los shotguns para podcast o voz en off en un home studio?";
fsn.faq_a4_es = "Normalmente no. En una sala sin tratar, un shotgun te castiga con la misma cancelación lateral y el lóbulo trasero que empeoran el eco en interiores. Un cardioide dinámico o un condensador de diafragma grande usado cerca de la boca perdona mucho más hasta que trates la sala. Guarda el shotgun para sonido de locación.";

fsn.faq_q5_en = "If the Deity S-Mic 3 measures quieter than the MKH 416, why do film sets still rent the 416?";
fsn.faq_a5_en = "Spec sheets are not the whole story. The 416's reputation comes from 40+ years of surviving rain, sand and rental-house abuse with predictable sound, plus instant availability in rental inventories worldwide. The S-Mic 3 is a genuine bargain to own, but productions pay for consistency they already trust.";
fsn.faq_q5_es = "Si el Deity S-Mic 3 mide más silencioso que el MKH 416, ¿por qué los sets aún rentan el 416?";
fsn.faq_a5_es = "Las fichas técnicas no lo son todo. La reputación del 416 viene de más de 40 años sobreviviendo a lluvia, arena y abuso de renta con un sonido predecible, además de disponibilidad inmediata en casas de renta de todo el mundo. El S-Mic 3 es una verdadera ganga para tenerlo, pero las producciones pagan por la consistencia en la que ya confían.";

// Tabla comparativa: 8 productos × specs técnicas
const col = t => ({ title: t, title_es: t });
const row = (l, le, vals) => ({ label: l, label_es: le, values: vals.map(v => Array.isArray(v) ? { value: v[0], value_es: v[1] } : { value: v, value_es: v }) });

x.productTable = {
  title: "Best Shotgun Mics Compared",
  title_es: "Comparativa de los Mejores Shotguns",
  columns: ["MKH 416","NTG5","NTG3","MKE 600","AT897","S-Mic 3","VideoMic NTG","MKE 400"].map(col),
  rows: [
    row("Type","Tipo",[["Boom, RF-condenser","Pértina, RF"],["Boom, RF-bias","Pértina, RF-bias"],["Boom, RF-bias","Pértina, RF-bias"],["Boom, condenser","Pértina, condensador"],["Boom, line+gradient","Pértina, line+gradient"],["Boom, condenser","Pértina, condensador"],["On-camera shotgun","Shotgun on-camera"],["On-camera shotgun","Shotgun on-camera"]]),
    row("Self-noise","Auto-ruido",["13 dBA","10 dBA","13 dBA","15 dBA","17 dBA","12 dBA","15 dBA","20 dBA"]),
    row("Max SPL","SPL máx",["130 dB","120 dB","130 dB","132 dB","129 dB","130 dB","120 dB","132 dB"]),
    row("Power","Alimentación",[["48V phantom","48V fantasma"],["USB-C · P48/P24","USB-C · P48/P24"],["48V phantom","48V fantasma"],["AA · 48V","AA · 48V"],["AA · 11-52V","AA · 11-52V"],["P24/P48","P24/P48"],["Li-ion USB-C","Li-ion USB-C"],["2×AAA","2×AAA"]]),
    row("Output","Salida",["XLR","3.5 mm TRS","XLR","XLR","XLR","XLR","3.5 mm + USB-C","3.5 mm TRS/TRRS"]),
    row("Weight","Peso",["165 g","76 g","163 g","128 g","145 g","80 g","94 g","93.5 g"]),
    row("Best For","Ideal Para",[["Broadcast & film sets","Broadcast y sets de cine"],["Documentary & solo shooters","Documental y solistas"],["Rental & harsh climates","Renta y climas duros"],["Indie filmmaking","Cine independiente"],["Compact rigs & travel","Rigs compactos y viaje"],["Pro indie budgets","Presupuesto indie pro"],["Run-and-gun video","Video run-and-gun"],["First camera upgrade","Primera mejora de cámara"]]),
    row("Price","Precio",["$849","$569","$699","$330","$249","$399","$259","$199"])
  ]
};

// Pros/contras de los 8 productos
x.verdictProsCons = [
  { name:"Sennheiser MKH 416", name_es:"Sennheiser MKH 416",
    pros:["RF-condenser design is virtually immune to humidity and temperature changes","Industry-standard supercardioid reach that flatters dialogue with minimal EQ","Legendary durability - decades of rental-house abuse are normal for this mic","Holds resale value better than almost any microphone"],
    pros_es:["El diseño condensador RF es prácticamente inmune a humedad y cambios de temperatura","Alcance supercardioide de estándar de industria que embellece el diálogo con mínimo EQ","Durabilidad legendaria: décadas de abuso en casas de renta son normales","Conserva el valor de reventa mejor que casi cualquier micrófono"],
    cons:["Requires 48V phantom power - no battery option","At $849 it is the most expensive pick in this guide","Metal body is heavier than modern lightweight shotguns","Included clip is basic; you will want a quality suspension"],
    cons_es:["Requiere alimentación fantasma de 48V: sin opción de pila","A $849 es la opción más cara de esta guía","El cuerpo metálico pesa más que los shotguns ligeros modernos","La pinza incluida es básica; querrás una suspensión de calidad"] },
  { name:"Rode NTG5", name_es:"Rode NTG5",
    pros:["Quietest mic here at 10 dBA - dialogue stays clean in quiet scenes","At 76 g, long boom takes are effortless","RF-bias circuit shrugs off humidity like the 416","Complete kit: WS10 windshield, cable, mount and hard case"],
    pros_es:["El más silencioso aquí con 10 dBA: el diálogo queda limpio en escenas calladas","Con 76 g, las tomas largas de pértina son sin esfuerzo","El circuito RF-bias resiste la humedad como el 416","Kit completo: antiviento WS10, cable, soporte y estuche rígido"],
    cons:["120 dB SPL ceiling limits headroom on loud sets","3.5mm output is less road-proof than locking XLR","Costs about $240 more than the MKE 600 for similar reach","Needs phantom or USB-C power - no battery option"],
    cons_es:["Techo de 120 dB SPL limita el margen en sets ruidosos","La salida de 3,5 mm es menos robusta que un XLR con bloqueo","Cuesta unos $240 más que el MKE 600 para alcance similar","Necesita fantasma o USB-C: sin opción de pila"] },
  { name:"Rode NTG3", name_es:"Rode NTG3",
    pros:["Brass RF-bias body built for rental-house abuse","13 dBA self-noise matches the 416","Slightly warm low end adds weight to male dialogue","Aluminum flight case included"],
    pros_es:["Cuerpo de latón RF-bias construido para el abuso de casas de renta","Auto-ruido de 13 dBA iguala al 416","Graves levemente cálidos que dan peso al diálogo masculino","Estuche de vuelo de aluminio incluido"],
    cons:["$699 sits awkwardly between the NTG5 and the 416","48V phantom only - no battery fallback","Full-length tube offers no compact variant for camera rigs"],
    cons_es:["$699 queda incómodo entre el NTG5 y el 416","Solo 48V fantasma: sin respaldo de pila","Tubo de longitud completa sin variante compacta para rigs de cámara"] },
  { name:"Sennheiser MKE 600", name_es:"Sennheiser MKE 600",
    pros:["Supercardioid reach and switchable low-cut at a third of the 416's price","Runs on one AA or 48V phantom - fits any rig","132 dB SPL handles loud scenes without a pad","Real metal body and XLR connection"],
    pros_es:["Alcance supercardioide y corte de graves conmutable a un tercio del precio del 416","Funciona con una pila AA o 48V fantasma: sirve en cualquier rig","132 dB SPL maneja escenas fuertes sin pad","Cuerpo metálico real y conexión XLR"],
    cons:["15 dBA self-noise is audible in very quiet rooms","Battery/phantom switch is easy to leave in the wrong position","No worthwhile suspension or windshield included","Rear lobe picks up more room than RF designs"],
    cons_es:["Auto-ruido de 15 dBA se escucha en salas muy silenciosas","El interruptor pila/fantasma se queda fácil en la posición equivocada","No incluye suspensión ni antiviento dignos","El lóbulo trasero capta más sala que los diseños RF"] },
  { name:"Audio-Technica AT897", name_es:"Audio-Technica AT897",
    pros:["Up to 1,200 hours on one AA, or 11-52V phantom","279 mm slots into tight handheld rigs and travel kits","Disciplined line-plus-gradient side rejection","Affordable entry to real boom work"],
    pros_es:["Hasta 1.200 horas con una pila AA, o fantasma de 11-52V","279 mm caben en rigs handheld apretados y kits de viaje","Rechazo lateral disciplinado line-plus-gradient","Entrada asequible al trabajo real de pértina"],
    cons:["17 dBA self-noise asks for clean preamps","Extreme top end less refined than pricier picks","Wind-sensitive without a proper blimp"],
    cons_es:["Auto-ruido de 17 dBA pide previos limpios","Extremo alto menos refinado que opciones más caras","Sensible al viento sin un blimp adecuado"] },
  { name:"Deity S-Mic 3", name_es:"Deity S-Mic 3",
    pros:["Measured 12 dBA self-noise undercuts the 416 on paper","80 g - the lightest full-size boom here","Weather-resistant aluminum body tested to 95% humidity","Neutral tone that sits dialogue forward without coloration"],
    pros_es:["Auto-ruido medido de 12 dBA que supera al 416 sobre el papel","80 g: la pértina de tamaño completo más ligera aquí","Cuerpo de aluminio resistente al clima probado al 95% de humedad","Tono neutro que coloca el diálogo al frente sin coloración"],
    cons:["Sold mainly direct - store availability is spotty","Shorter brand track record than Sennheiser or Rode","P24/P48 only - no battery option"],
    cons_es:["Se vende sobre todo por canal directo: disponibilidad irregular","Historial de marca más corto que Sennheiser o Rode","Solo P24/P48: sin opción de pila"] },
  { name:"Rode VideoMic NTG", name_es:"Rode VideoMic NTG",
    pros:["Studio-grade NTG-series sound on the hot shoe","Doubles as a USB-C audio interface for voiceovers","Auto power-on with the camera and 30+ hour rechargeable battery","Infinitely variable gain, pad, safety channel and filters"],
    pros_es:["Sonido de serie NTG calidad estudio en la zapata","Funciona como interfaz de audio USB-C para voz en off","Encendido automático con la cámara y batería recargable de 30+ horas","Ganancia infinitamente variable, pad, canal de seguridad y filtros"],
    cons:["120 dB SPL ceiling like its boom siblings","Reach cannot replace a real boom","Analog output limited to 3.5mm"],
    cons_es:["Techo de 120 dB SPL como sus hermanos de pértina","Su alcance no reemplaza una pértina real","Salida analógica limitada a 3,5 mm"] },
  { name:"Sennheiser MKE 400", name_es:"Sennheiser MKE 400",
    pros:["Easiest upgrade from any built-in camera mic","100+ hours from two AAA batteries","Headphone output for monitoring what you record","TRS/TRRS auto-sensing works on cameras and phones"],
    pros_es:["La mejora más fácil desde cualquier micrófono integrado de cámara","Más de 100 horas con dos pilas AAA","Salida de auriculares para monitorear lo que grabas","Detección automática TRS/TRRS funciona en cámaras y teléfonos"],
    cons:["20 dB self-noise is audible in silent rooms","Plastic build next to metal-body rivals","Modest reach limits framing choices"],
    cons_es:["Auto-ruido de 20 dB se escucha en salas silenciosas","Construcción plástica junto a rivales de cuerpo metálico","Alcance modesto que limita opciones de encuadre"] }
];

fs.writeFileSync('data/guides.json', JSON.stringify(guides, null, 1));
console.log('OK: products.json + guides.json actualizados');
