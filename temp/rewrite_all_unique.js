const fs = require('fs');
const path = require('path');

const guides = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/guides.json'), 'utf8'));
const products = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf8'));

const productMap = new Map();
for (const p of products) {
  productMap.set(p.id, p);
}

// Unique traits per product ID based on actual product knowledge
const uniqueTraits = {
  // Audio interfaces
  1: { en: 'rock-solid drivers and near-zero latency', es: 'drivers sólidos y latencia casi nula' },
  2: { en: 'clean conversion with a musical, open sound', es: 'conversión limpia con sonido musical y abierto' },
  3: { en: 'the benchmark for pristine conversion and build quality', es: 'el referente de conversión prístina y calidad de construcción' },
  4: { en: 'analog warmth with real hardware compression', es: 'calidez analógica con compresión hardware real' },
  5: { en: 'vintage character with a built-in compressor', es: 'carácter vintage con compresor integrado' },
  6: { en: 'excellent metering and transparent conversion', es: 'excelente medición y conversión transparente' },
  7: { en: 'great value with solid preamps and drivers', es: 'gran valor con previos y drivers sólidos' },
  8: { en: 'simple, effective, and affordable', es: 'simple, efectivo y asequible' },
  9: { en: 'console-grade preamps in a portable format', es: 'previos de consola en formato portátil' },
  10: { en: 'clean, honest sound that works everywhere', es: 'sonido limpio y honesto que funciona en todas partes' },
  11: { en: 'studio-grade conversion with professional I/O', es: 'conversión de grado estudio con E/S profesional' },
  12: { en: 'immersive audio with room correction', es: 'audio inmersivo con corrección de sala' },
  13: { en: 'network audio and conversion in one unit', es: 'audio por red y conversión en una unidad' },
  14: { en: 'FPGA-powered conversion for zero compromise', es: 'conversión FPGA sin compromisos' },

  // Microphones
  100: { en: 'the industry standard for a reason — warm, controlled, and always reliable', es: 'el estándar de la industria por algo — cálido, controlado y siempre fiable' },
  101: { en: 'smooth broadcast tone that works on everything', es: 'tono broadcast suave que funciona en todo' },
  102: { en: 'studio warmth with a modern, detailed top end', es: 'calidez de estudio con un agudo moderno y detallado' },
  103: { en: 'crisp, articulate sound that sits perfectly in a mix', es: 'sonido nítido y articulado que encaja perfectamente en la mezcla' },
  104: { en: 'aggressive midrange cut that punches through', es: 'corte agresivo de medios que se abre paso' },
  105: { en: 'warm, flattering tone that makes vocals shine', es: 'tono cálido y favorecedor que hace brillar las voces' },
  106: { en: 'natural, transparent capture with zero harshness', es: 'captura natural y transparencia sin aspereza' },
  107: { en: 'broadcast authority with deep lows and smooth highs', es: 'autoridad broadcast con graves profundos y agudos suaves' },
  108: { en: 'detailed, honest reproduction that reveals everything', es: 'reproducción detallada y honesta que revela todo' },
  109: { en: 'a legend for guitar cabs and drums', es: 'una leyenda para cajas de guitarra y batería' },
  110: { en: 'incredible value — sounds way more expensive than it is', es: 'valor increíble — suena mucho más caro de lo que es' },
  111: { en: 'USB and XLR flexibility for creators on a budget', es: 'flexibilidad USB y XLR para creadores con presupuesto ajustado' },
  112: { en: 'ribbon warmth with modern output and build', es: 'calidez de ribbon con salida y construcción modernas' },
  113: { en: 'the classic ribbon sound that defined countless records', es: 'el sonido ribbon clásico que definió innumerables discos' },
  114: { en: 'figure-8 pattern that captures room like no other', es: 'patrón figure-8 que captura la sala como ningún otro' },
  115: { en: 'supercardioid focus with smooth, flattering tone', es: 'enfoque supercardioide con tono suave y favorecedor' },

  // Headphones
  200: { en: 'the king of comfort and isolation for tracking', es: 'el rey del confort y aislamiento para grabación' },
  201: { en: 'audiophile detail with planar magnetic precision', es: 'detalle audiófilo con precisión magnética plana' },
  202: { en: 'the open-back reference for honest, natural sound', es: 'la referencia open-back para sonido honesto y natural' },
  203: { en: 'comfortable, precise, and revealing for long mixing sessions', es: 'cómodo, preciso y revelador para largas sesiones de mezcla' },
  204: { en: 'the industry standard for broadcast and production', es: 'el estándar de la industria para broadcast y producción' },
  205: { en: 'detailed, comfortable, and reliable — a studio staple', es: 'detallado, cómodo y fiable — un básico de estudio' },
  206: { en: 'honest, neutral reference that reveals mix problems', es: 'referencia honesta y neutral que revela problemas de mezcla' },
  207: { en: 'closed-back isolation with studio-grade detail', es: 'aislamiento closed-back con detalle de grado estudio' },
  208: { en: 'open-back airiness with planar speed and detail', es: 'aire open-back con velocidad y detalle planar' },
  209: { en: 'neutral, accurate, and built like a tank', es: 'neutral, preciso y construido como un tanque' },
  210: { en: 'comfortable reference for tracking and mixing', es: 'referencia cómoda para grabación y mezcla' },
  211: { en: 'affordable, comfortable, and surprisingly detailed', es: 'asequible, cómodo y sorprendentemente detallado' },
  212: { en: 'the classic that defined studio monitoring', es: 'el clásico que definió la monitorización de estudio' },

  // Electric guitars
  300: { en: 'the definitive Strat — everything you love about Fender in one package', es: 'la Strat definitiva — todo lo que amas de Fender en un paquete' },
  301: { en: 'premium materials, flawless playability, and iconic tone', es: 'materiales premium, jugabilidad impecable y tono icónico' },
  302: { en: 'Player series quality with modern features and vintage soul', es: 'calidad serie Player con características modernas y alma vintage' },
  303: { en: 'the Les Paul Standard — timeless tone and legendary build', es: 'la Les Paul Standard — tono intemporal y construcción legendaria' },
  304: { en: 'the best value in electrics — versatile, well-built, and fun to play', es: 'el mejor valor en eléctricas — versátil, bien construida y divertida de tocar' },
  305: { en: 'American Professional quality with refined playability and tone', es: 'calidad American Professional con jugabilidad y tono refinados' },
  306: { en: 'Japanese precision and modern versatility', es: 'precisión japonesa y versatilidad moderna' },
  307: { en: 'Korean craftsmanship with modern features at a mid-range price', es: 'artesanía coreana con características modernas a precio medio' },
  308: { en: 'entry-level quality that punches way above its price', es: 'calidad de entrada que supera con creces su precio' },
  309: { en: 'modern metal machine with premium hardware', es: 'máquina metal moderna con hardware premium' },
  310: { en: 'offset cool with Fender quality and vibe', es: 'offset con calidad y vibra Fender' },
  311: { en: 'affordable, comfortable, and perfect for learning', es: 'asequible, cómoda y perfecta para aprender' },

  // Basses
  400: { en: 'the P-Bass — the sound of recorded bass for decades', es: 'la P-Bass — el sonido del bajo grabado durante décadas' },
  401: { en: 'modern punch with active electronics and aggressive tone', es: 'punch moderno con electrónica activa y tono agresivo' },
  402: { en: 'Player series quality with classic P-Bass tone', es: 'calidad serie Player con tono P-Bass clásico' },
  403: { en: 'the J-Bass — versatile, expressive, and endlessly usable', es: 'la J-Bass — versátil, expresiva y siempre útil' },
  404: { en: 'modern versatility with active tone shaping', es: 'versatilidad moderna con modelado de tono activo' },
  405: { en: 'StingRay punch and presence that cuts through any mix', es: 'punch y presencia StingRay que corta cualquier mezcla' },
  406: { en: 'premium quality with refined electronics and tone', es: 'calidad premium con electrónica y tono refinados' },
  407: { en: 'affordable, well-built, and perfect for starting out', es: 'asequible, bien construida y perfecta para empezar' },
  408: { en: 'headless design with modern ergonomics and tone', es: 'diseño headless con ergonomía y tono modernos' },

  // Plugins
  500: { en: 'surgical precision for mixing — the EQ standard', es: 'precisión quirúrgica para mezcla — el estándar de EQ' },
  501: { en: 'all-in-one mastering with AI assistance and genre targets', es: 'masterización todo en uno con asistencia IA y objetivos de género' },
  502: { en: 'creative effects that inspire and transform', es: 'efectos creativos que inspiran y transforman' },
  503: { en: 'the complete mixing and mastering bundle', es: 'el bundle completo de mezcla y masterización' },
  504: { en: 'transparent compression that glues mixes together', es: 'compresión transparente que pega las mezclas' },
  505: { en: 'the ultimate analog emulation collection', es: 'la colección definitiva de emulación analógica' },
  506: { en: 'pitch correction that sounds natural and invisible', es: 'corrección de pitch que suena natural e invisible' },
  507: { en: 'the production suite that covers every genre', es: 'la suite de producción que cubre cada género' },
  508: { en: 'transparent, professional limiting for masters', es: 'limitación transparente y profesional para masters' },
  509: { en: 'rhythmic modulation that brings mixes to life', es: 'modulación rítmica que da vida a las mezclas' },

  // DAWs
  600: { en: 'the studio standard for recording and mixing', es: 'el estándar de estudio para grabación y mezcla' },
  601: { en: 'the creative powerhouse for electronic music and live performance', es: 'el poderoso creativo para música electrónica y live performance' },
  602: { en: 'the Mac production standard with everything included', es: 'el estándar de producción Mac con todo incluido' },
  603: { en: 'the beatmaker favorite with lifetime free updates', es: 'la favorita para beatmakers con actualizaciones gratis de por vida' },
  604: { en: 'deep composition tools for serious producers', es: 'herramientas de composición profundas para productores serios' },
  605: { en: 'the creative rack for experimental production', es: 'el rack creativo para producción experimental' },

  // Synthesizers
  700: { en: '8 voices of analog depth with a built-in sequencer', es: '8 voces de profundidad analógica con secuenciador integrado' },
  701: { en: 'the classic analog polyphony you have heard on countless records', es: 'la polifónica analógica clásica que has escuchado en innumerables discos' },
  702: { en: 'workstation power with deep synthesis and modern features', es: 'potencia workstation con síntesis profunda y características modernas' },
  703: { en: 'subsequent 37 warmth and character in a compact format', es: 'calidez y carácter Subsequent 37 en formato compacto' },
  704: { en: 'analog polyphony with modern digital control', es: 'polifónica analógica con control digital moderno' },
  705: { en: 'the Minilogue XD — analog heart with digital flexibility', es: 'la Minilogue XD — corazón analógico con flexibilidad digital' },
  706: { en: 'OB-6 — the classic Prophet and Oberheim collaboration', es: 'OB-6 — la clásica colaboración Prophet y Oberheim' },
  707: { en: 'MicroFreak — experimental digital synthesis at an unbeatable price', es: 'MicroFreak — síntesis digital experimental a un precio imbatible' },

  // Drum machines / samplers
  800: { en: 'deep sampling and complex sequencing that rewards patience', es: 'muestreo profundo y secuenciación compleja que recompensa la paciencia' },
  801: { en: 'standalone production hub — sampling, sequencing, and arranging', es: 'centro de producción autónomo — muestreo, secuenciación y arreglo' },
  802: { en: 'the SP-404 — lo-fi texture and instant inspiration', es: 'la SP-404 — textura lo-fi e inspiración instantánea' },
  803: { en: 'classic Roland drum sounds with modern sampling', es: 'sonidos de batería clásicos Roland con muestreo moderno' },
  804: { en: 'the MPC XL — the beatmaking standard evolved', es: 'la MPC XL — el estándar de beatmaking evolucionado' },
  805: { en: 'compact sampling with instant results', es: 'muestreo compacto con resultados instantáneos' },
  806: { en: 'affordable sampling with surprising depth', es: 'muestreo asequible con profundidad sorprendente' },
  807: { en: 'the K.O. II — instant sampling gratification', es: 'la K.O. II — gratificación de muestreo instantánea' },

  // Mixers
  900: { en: 'the digital mixer standard with total control', es: 'el estándar de mezclador digital con control total' },
  901: { en: 'compact, affordable, and perfect for small venues', es: 'compacto, asequible y perfecto para espacios pequeños' },
  902: { en: 'professional features with an intuitive workflow', es: 'características profesionales con flujo de trabajo intuitivo' },
  903: { en: 'the live mixer standard with proven reliability', es: 'el estándar de mezclador en directo con fiabilidad probada' },
  904: { en: 'compact digital mixing with app control', es: 'mezcla digital compacta con control por app' },
  905: { en: 'affordable digital mixing that covers the basics', es: 'mezcla digital asequible que cubre lo básico' },
  906: { en: 'the M32 — compact power with professional sound', es: 'la M32 — potencia compacta con sonido profesional' },
  907: { en: 'SQ-5 — Allen & Heath quality in a compact format', es: 'SQ-5 — calidad Allen & Heath en formato compacto' },
};

function getTrait(p, lang) {
  const traits = uniqueTraits[p.id];
  if (traits) return traits[lang] || traits.en;
  // Fallback based on score
  const score = p.score || 0;
  if (score >= 9.5) return lang === 'es' ? 'calidad excepcional' : 'exceptional quality';
  if (score >= 9.0) return lang === 'es' ? 'muy completo y fiable' : 'very complete and reliable';
  if (score >= 8.5) return lang === 'es' ? 'gran relación calidad-precio' : 'great value for money';
  return lang === 'es' ? 'cumple sin problemas' : 'gets the job done';
}

function generateVerdict(guide, productList, lang, seed) {
  const isEs = lang === 'es';
  if (productList.length === 0) return '';
  const sorted = [...productList].sort((a, b) => (b.score || 0) - (a.score || 0));

  if (sorted.length === 1) {
    const p = sorted[0];
    const t = getTrait(p, lang);
    const phrases = isEs ? [
      `${p.title} es la opción que recomiendo — ${t}.`,
      `Si buscas lo mejor, ${p.title} es la respuesta — ${t}.`,
      `${p.title} destaca por encima del resto — ${t}.`,
    ] : [
      `${p.title} is the one I'd recommend — ${t}.`,
      `If you want the best, ${p.title} is the answer — ${t}.`,
      `${p.title} stands above the rest — ${t}.`,
    ];
    return phrases[seed % phrases.length];
  }

  if (sorted.length === 2) {
    const [first, second] = sorted;
    const t1 = getTrait(first, lang);
    const t2 = getTrait(second, lang);
    const templates = isEs ? [
      `${first.title} es mi favorita — ${t1}. ${second.title} es la alternativa — ${t2}.`,
      `Entre ${first.title} y ${second.title}, me quedo con la primera — ${t1}. La segunda también es buena — ${t2}.`,
      `${first.title} gana por poco — ${t1}. ${second.title} merece la pena — ${t2}.`,
    ] : [
      `${first.title} is my pick — ${t1}. ${second.title} is the alternative — ${t2}.`,
      `Between ${first.title} and ${second.title}, I'd go with the first — ${t1}. The second is good too — ${t2}.`,
      `${first.title} edges it — ${t1}. ${second.title} is worth considering — ${t2}.`,
    ];
    return templates[seed % templates.length];
  }

  const topPick = sorted[0];
  const second = sorted[1];
  const rest = sorted.slice(2);
  const t1 = getTrait(topPick, lang);
  const t2 = getTrait(second, lang);

  let verdict = '';

  const openers = isEs ? [
    `He probado todos estos y ${topPick.title} destaca — ${t1}.`,
    `Después de compararlos, ${topPick.title} es la que más me convence — ${t1}.`,
    `Si tuviera que quedarme con una, sería ${topPick.title} — ${t1}.`,
    `La clara ganadora aquí es ${topPick.title} — ${t1}.`,
  ] : [
    `I've tested all of these and ${topPick.title} stands out — ${t1}.`,
    `After comparing them all, ${topPick.title} is the one that wins me over — ${t1}.`,
    `If I had to pick one, it'd be ${topPick.title} — ${t1}.`,
    `The clear winner here is ${topPick.title} — ${t1}.`,
  ];
  verdict += openers[seed % openers.length] + ' ';

  if (second) {
    const secondPhrases = isEs ? [
      `${second.title} le sigue de cerca — ${t2}.`,
      `Justo detrás va ${second.title} — ${t2}.`,
      `${second.title} también merece mucho la pena — ${t2}.`,
    ] : [
      `${second.title} is right behind it — ${t2}.`,
      `Right behind is ${second.title} — ${t2}.`,
      `${second.title} is absolutely worth considering — ${t2}.`,
    ];
    verdict += secondPhrases[(seed + 1) % secondPhrases.length] + ' ';
  }

  if (rest.length > 0) {
    const restWithTraits = rest.map(p => `${p.title} — ${getTrait(p, lang)}`).join('; ');
    const restPhrases = isEs ? [
      `También son buenas opciones: ${restWithTraits}.`,
      `No olvidemos estos: ${restWithTraits}.`,
      `Completan la lista: ${restWithTraits}.`,
    ] : [
      `Also solid options: ${restWithTraits}.`,
      `Don't forget these: ${restWithTraits}.`,
      `Rounding out the list: ${restWithTraits}.`,
    ];
    verdict += restPhrases[(seed + 2) % restPhrases.length];
  }

  return verdict;
}

function generateConclusion(guide, productList, lang, seed) {
  const isEs = lang === 'es';
  if (productList.length === 0) return '';
  const sorted = [...productList].sort((a, b) => (b.score || 0) - (a.score || 0));

  const topPick = sorted[0];
  const t1 = getTrait(topPick, lang);
  const rest = sorted.slice(1);

  const concStarters = isEs ? [
    'En resumen:', 'Mi elección:', 'Si comprara hoy:', 'La versión corta:',
    'Lo que haría:', 'Mi recomendación:', 'El veredicto:', 'Respuesta simple:',
  ] : [
    'Bottom line:', 'My pick:', 'If I were buying today:', 'The short version:',
    'What I\'d do:', 'My recommendation:', 'The verdict:', 'Simple answer:',
  ];
  const starter = concStarters[seed % concStarters.length];

  if (sorted.length === 1) {
    return isEs ? `${starter} ${topPick.title} — ${t1}.` : `${starter} ${topPick.title} — ${t1}.`;
  }

  if (sorted.length === 2) {
    const [first, second] = sorted;
    const t1 = getTrait(first, lang);
    const t2 = getTrait(second, lang);
    return isEs
      ? `${starter} ${first.title} — ${t1}. Alternativa: ${second.title} — ${t2}.`
      : `${starter} ${first.title} — ${t1}. Alternative: ${second.title} — ${t2}.`;
  }

  const restWithTraits = rest.map(p => `${p.title} — ${getTrait(p, lang)}`).join('; ');

  if (isEs) {
    const templates = [
      `${starter} ${topPick.title} — ${t1}. También: ${restWithTraits}.`,
      `${starter} Ve a por ${topPick.title} — ${t1}. Alternativas: ${restWithTraits}.`,
      `${starter} ${topPick.title} gana — ${t1}. El resto: ${restWithTraits}.`,
    ];
    return templates[seed % templates.length];
  } else {
    const templates = [
      `${starter} ${topPick.title} — ${t1}. Also: ${restWithTraits}.`,
      `${starter} Go with ${topPick.title} — ${t1}. Alternatives: ${restWithTraits}.`,
      `${starter} ${topPick.title} wins — ${t1}. The rest: ${restWithTraits}.`,
    ];
    return templates[seed % templates.length];
  }
}

let count = 0;
for (let i = 0; i < guides.length; i++) {
  const guide = guides[i];
  const productIds = new Set();
  for (const section of guide.sections || []) {
    for (const pid of section.products || []) {
      productIds.add(pid);
    }
  }
  const productList = [];
  for (const pid of productIds) {
    const p = productMap.get(pid);
    if (p) productList.push(p);
  }
  if (productList.length === 0) continue;

  const seed = i * 17 + 5;

  guide.verdict = generateVerdict(guide, productList, 'en', seed);
  guide.verdict_es = generateVerdict(guide, productList, 'es', seed);
  guide.conclusion = generateConclusion(guide, productList, 'en', seed);
  guide.conclusion_es = generateConclusion(guide, productList, 'es', seed);
  count++;
}

fs.writeFileSync(path.join(__dirname, '../data/guides.json'), JSON.stringify(guides, null, 2));
console.log(`Total: ${count} guides con veredictos y conclusiones únicos y naturales.`);
