const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const q = g.find(x => x.id === 'beginner-bass-guitars');

q.verdictProsCons = [
  {
    name: 'Ibanez GSR200 GIO',
    name_es: 'Ibanez GSR200 GIO',
    pros: [
      'Legendary Soundgear comfort at entry price',
      'Ultra-narrow GSR4 neck reduces hand fatigue',
      'Versatile Dynamix P/J pickups + active Phat II EQ',
      'Lightweight poplar/okoume body',
      'Rock-solid Ibanez build quality'
    ],
    pros_es: [
      'Comodidad legendaria Soundgear a precio de entrada',
      'Mástil GSR4 ultra estrecho reduce fatiga',
      'Pastillas Dynamix P/J versátiles + Phat II EQ activo',
      'Cuerpo ligero de álamo/okume',
      'Calidad de construcción Ibanez probada'
    ],
    cons: [
      'Poplar/okoume body less resonant than premium woods',
      'Only 22 frets limits upper register access',
      'Basic hardware (tuners, bridge) functional but not premium',
      'Active EQ requires 9V battery'
    ],
    cons_es: [
      'Cuerpo de álamo/okume menos resonante que maderas premium',
      'Solo 22 trastes limita registro agudo',
      'Hardware básico (clavijas, puente) funcional pero sin lujos',
      'EQ activo requiere pila de 9V'
    ]
  },
  {
    name: 'Squier Affinity Series Precision Bass PJ',
    name_es: 'Squier Affinity Series Precision Bass PJ',
    pros: [
      'Best budget beginner bass, period',
      'P/J pickups deliver Precision thump and Jazz growl in one instrument',
      'Comfortable maple neck and lightweight poplar body',
      'P split-coil plus Jazz bridge cover vintage thump and modern growl'
    ],
    pros_es: [
      'El mejor bajo económico para principiantes, sin más',
      'Las pastillas PJ dan el golpe Precision y el growl Jazz en un solo instrumento',
      'Mástil de arce cómodo y cuerpo de álamo ligero',
      'Pastilla P split-coil más puente Jazz cubren thump vintage y growl moderno'
    ],
    cons: [
      'Entry-level pickups and hardware invite future upgrades',
      'Needs setup out of the box — neck relief, action, and intonation want attention before it plays its best',
      'No active electronics for tone shaping',
      'Accessories like gig bag not included'
    ],
    cons_es: [
      'Pastillas y hardware de nivel inicial invitan a futuras mejoras',
      'Necesita un ajuste al sacarlo de la caja — el mástil, la acción y la entonación quieren atención antes de que toque a su mejor nivel',
      'Sin electrónica activa para moldear el tono',
      'Los accesorios como la funda no están incluidos'
    ]
  },
  {
    name: 'Yamaha TRBX304',
    name_es: 'Yamaha TRBX304',
    pros: [
      '5-band active EQ lets beginners shape tone like a pro',
      'Mahogany body and 5-piece neck for pro-level resonance',
      '24 frets extend your register as you learn',
      'Yamaha factory setup means it arrives with neck relief, intonation, and pickup heights dialed in'
    ],
    pros_es: [
      'El EQ activo de 5 bandas permite a los principiantes moldear el tono como un pro',
      'Cuerpo de caoba y mástil de 5 piezas para resonancia de nivel pro',
      '24 trastes amplían tu registro mientras aprendes',
      'La puesta a punto de fábrica de Yamaha hace que llegue con el mástil, la entonación y las alturas de pastilla ajustados'
    ],
    cons: [
      'Costs more than the Squier Affinity PJ',
      'Active electronics need a 9V battery',
      'So many tonal options can overwhelm a total beginner',
      'Its modern, neutral tone lacks instant vintage vibe'
    ],
    cons_es: [
      'Cuesta más que el Squier Affinity PJ',
      'La electrónica activa necesita una pila de 9V',
      'Tantas opciones tonales pueden abrumar a un principiante total',
      'Su tono moderno y neutro carece de vibra vintage inmediata'
    ]
  },
  {
    name: 'Ibanez SR300E',
    name_es: 'Ibanez SR300E',
    pros: [
      'One of the slimmest, fastest necks in its class — SR4 profile fits small hands and fast runs',
      'Lightweight body reduces fatigue during long practice sessions',
      '3-band active EQ and Power Tap switch for versatile tones',
      'Ibanez reliability at a beginner-friendly price'
    ],
    pros_es: [
      'Uno de los mástiles más delgados y rápidos de su clase — el perfil SR4 se adapta a manos pequeñas y a pasajes rápidos',
      'El cuerpo ligero reduce la fatiga en prácticas largas',
      'EQ activo de 3 bandas e interruptor Power Tap para tonos versátiles',
      'Fiabilidad Ibanez a un precio amigable para principiantes'
    ],
    cons: [
      'Thin neck can feel cramped for larger hands',
      'Active circuit requires a battery',
      'Less warm and woody than a classic P-Bass',
      'Nyatoh body is not the most resonant'
    ],
    cons_es: [
      'El mástil delgado puede sentirse estrecho para manos grandes',
      'El circuito activo requiere una pila',
      'Es menos cálido y suave que un P-Bass clásico',
      'El cuerpo de nyatoh no es de los más resonantes'
    ]
  },
  {
    name: 'Sterling by Music Man StingRay Ray4',
    name_es: 'Sterling by Music Man StingRay Ray4',
    pros: [
      'Iconic StingRay tone at an affordable price',
      'Ceramic humbucker with 2-band active preamp',
      'Punchy tone that cuts the mix — forward mids sit naturally in funk and rock',
      'Simple single-pickup layout is easy for beginners'
    ],
    pros_es: [
      'Tono icónico StingRay a precio económico',
      'Humbucker cerámica con previo activo de 2 bandas',
      'Tono contundente que corta la mezcla — la voz de medios adelantados encaja naturalmente en funk y rock',
      'El esquema simple de una pastilla es fácil para principiantes'
    ],
    cons: [
      'Single pickup means fewer tonal options',
      'Basswood body is light but not very resonant',
      'Needs a 9V battery for the active preamp — a dead battery mutes the bass until replaced',
      'Aggressive tone is not ideal for mellow styles'
    ],
    cons_es: [
      'Una pastilla significa menos opciones tonales',
      'El cuerpo de tilo es ligero pero poco resonante',
      'Necesita una pila de 9V para el previo activo — una pila agotada enmudece el bajo hasta que la cambias',
      'Su tono agresivo no es ideal para estilos suaves'
    ]
  },
  {
    name: "Squier Classic Vibe '60s Jazz Bass",
    name_es: "Squier Classic Vibe '60s Jazz Bass",
    pros: [
      'Sounds like a bass costing three times as much',
      'Alnico pickups deliver genuine vintage J tone',
      'Comfortable C-shape neck and vintage-style hardware',
      'Vintage-style build holds up to years of practice and gigs'
    ],
    pros_es: [
      'Suena como un bajo que cuesta el triple',
      'Las pastillas alnico ofrecen tono J vintage genuino',
      'Mástil C-shape cómodo y hardware de estilo vintage',
      'Construcción de estilo vintage que aguanta años de práctica y conciertos'
    ],
    cons: [
      'Sits at the top of the beginner budget',
      'Passive electronics only — dual volumes and tone lack the EQ shaping of the TRBX304 5-band active EQ',
      'Single J voice is less versatile than a P/J setup',
      'Slightly heavier than modern ultra-light bodies'
    ],
    cons_es: [
      'Está en el tope del presupuesto de principiante',
      'Solo electrónica pasiva — los dos volúmenes y el tono no ofrecen modelado de EQ como el EQ activo de 5 bandas del TRBX304',
      'La única voz J es menos versátil que un esquema PJ',
      'Es algo más pesado que los cuerpos modernos ultraligeros'
    ]
  },
  {
    name: 'Sire Marcus Miller V5R',
    name_es: 'Sire Marcus Miller V5R',
    pros: [
      'Passive electronics — no battery needed',
      'Roasted hard maple neck with rolled fretboard edges (Edgeless)',
      'Marcus Vintage-J Revolution pickups with punchy 70s-style tone',
      'Ivory binding, block inlays, and chrome hardware'
    ],
    pros_es: [
      'Electrónica pasiva — sin necesidad de batería',
      'Mástil de arce duro tostado con bordes redondeados (Edgeless)',
      'Pastillas Marcus Vintage-J Revolution con tono contundente estilo 70s',
      'Binding de marfil, incrustaciones en bloque y hardware cromado'
    ],
    cons: [
      'No active preamp or EQ controls',
      'Single-coil pickups can pick up hum at high gain',
      'Passive tone requires amp EQ to shape sound',
      'Laurel fretboard needs oiling to avoid drying out'
    ],
    cons_es: [
      'Sin previo activo ni controles de EQ',
      'Las pastillas single coil pueden captar zumbido a alta ganancia',
      'El tono pasivo requerirá EQ del amplificador para moldear el sonido',
      'El diapasón de laurel necesita aceite para no resecarse'
    ]
  },
  {
    name: 'Squier Sonic Bronco Bass',
    name_es: 'Squier Sonic Bronco Bass',
    pros: [
      '30-inch short scale: easy reach for small hands and kids',
      'Maple C neck with 1.5" nut, lightweight poplar body',
      'One pickup, two knobs: zero learning curve',
      'Comfortable start for less than $259'
    ],
    pros_es: [
      'Escala corta de 30 pulgadas: alcance fácil para manos pequeñas y niños',
      'Mástil C de arce con cejuela de 1,5 pulgadas, cuerpo ligero de álamo',
      'Una pastilla, dos knobs: cero curva de aprendizaje',
      'Inicio cómodo más barato por ~$259'
    ],
    cons: [
      'Single center pickup: no J articulation or active bite',
      '19 frets limit high-register solos',
      'Basic hardware and electronics for the price',
      'Short scale loosens with heavy strings'
    ],
    cons_es: [
      'Una sola pastilla central: sin articulación J ni mordida activa',
      '19 trastes limitan solos en registro agudo',
      'Hardware y electrónica básicos según el precio',
      'La escala corta se afloja con cuerdas gruesas'
    ]
  },
  {
    name: 'Yamaha BB234',
    name_es: 'Yamaha BB234',
    pros: [
      'V3 ceramic P/J pickups with serious, clean output',
      'Slim maple neck, 21 frets, fatigue-free learning',
      'Vol/Vol/Tone passive: no batteries, no menus',
      'Alder and vintage tuners built for the road'
    ],
    pros_es: [
      'P/J cerámicas V3 con salida seria y limpia',
      'Mástil fino de arce, 21 trastes, aprendizaje sin fatiga',
      'Vol/Vol/Tono pasivos: sin baterías ni menús',
      'Aliso y clavijas abiertas hechas para la gira'
    ],
    cons: [
      '34-inch scale stretches small hands',
      'No active EQ for modern slap',
      'Sober finishes look plain',
      '~$359 costs more than short-scale rivals'
    ],
    cons_es: [
      'La escala de 34 estira manos pequeñas',
      'Sin EQ activa para slap moderno',
      'Los acabados sobrios aburren',
      '~$359 cuesta más que rivales cortos'
    ]
  },
  {
    name: 'Ibanez TMB30 Talman',
    name_es: 'Ibanez TMB30 Talman',
    pros: [
      '30-inch short scale: zero stretch, low tension',
      'Dynamix P/J from thump to snap',
      'Passive simplicity with photogenic offset style',
      'Absurd value for ~$249'
    ],
    pros_es: [
      'Escala corta de 30: cero estirón, baja tensión',
      'Dynamix P/J del thump al snap',
      'Simplicidad pasiva con estilo offset fotogénico',
      'Valor absurdo por ~$249'
    ],
    cons: [
      '20 frets and basic hardware limit finesse',
      'Short scale flubs with heavy strings',
      'One trick per pickup, no blend magic',
      'Light body neck-dives with cheap straps'
    ],
    cons_es: [
      '20 trastes y hardware básico limitan finura',
      'La escala corta flojea con cuerdas gruesas',
      'Un carácter por pastilla, sin magia de mezcla',
      'El cuerpo ligero cabecea con correas baratas'
    ]
  }
];

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
console.log('verdictProsCons fully rebuilt - no "Bajo" prefix, no old V5');