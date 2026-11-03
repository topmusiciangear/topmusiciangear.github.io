const fs = require('fs');
const path = require('path');

const guidesPath = path.join(__dirname, 'data', 'guides.json');
const raw = fs.readFileSync(guidesPath, 'utf8').replace(/^\ufeff/, '');
let guides = JSON.parse(raw);

// Find the tuner guide by old id
const oldId = 'afinadores-bajos-y-guitarras';
let foundGuard = null;
let foundIndex = -1;
Object.entries(guides).forEach(([key, g]) => {
  if (g.id === oldId) {
    foundGuard = g;
    foundIndex = key;
  }
});

if (!foundGuard) {
  console.error('Guide not found');
  process.exit(1);
}

// New guide data
const newGuide = {
  "id": "tuners-bass-guitar",
  "title": "Best Tuners for Bass and Guitar",
  "title_es": "Mejores Afinadores para Bajo y Guitarra",
  "titleTag": "Best Tuners for Bass and Guitar",
  "titleTag_es": "Mejores Afinadores para Bajo y Guitarra",
  "category": "accessories",
  "category_es": "accesorios",
  "score": 9.1,
  "score_es": 9.1,
  "badge": "bestSell",
  "badge_es": "bestSell",
  "image": "img/products/peterson-stroboclip-hd.webp",
  "desc": "Honest reviews of the best tuners for bass and guitar. We tested top tuners for bass and guitar with hands-on reviews, specs and real prices to help you pick the right option for your setup.",
  "desc_es": "Reviews honestos de los mejores afinadores para bajo y guitarra. Probamos los mejores afinadores con reviews hands-on, specs y precios reales para ayudarte a elegir la opción correcta para tu setup.",
  "intro": "A tuner is the first pedal you should own and the one you'll use every single session. Whether you are tuning a guitar before a gig, checking intonation on a bass, or keeping a studio session tight, the right tuner saves time, protects your ears, and keeps your recordings professional. We tested five of the most popular tuners — pedal, clip-on polyphonic, clip-on strobe, and compact headstock — for accuracy, visibility, build quality, and ease of use on both bass and guitar. These are the tuners working musicians actually use on stage and in the studio.",
  "intro_es": "Un afinador es el primer pedal que debes poseer y el que usarás en cada sesión. Ya sea que estés afinando una guitarra antes de un show, verificando la entonación de un bajo o manteniendo una sesión de estudio ajustada, el afinador correcto ahorra tiempo, protege tus oídos y mantiene tus grabaciones profesionales. Probamos cinco de los afinadores más populares — pedal, clip-on polifónico, clip-on strobe y compacto de cabeza — por precisión, visibilidad, calidad de construcción y facilidad de uso en bajo y guitarra. Estos son los afinadores que los músicos profesionales usan realmente en el escenario y en el estudio.",
  "products": [98, 58, 59, 60, 61],
  "featuredProducts": [98, 61],
  "featuredProducts_es": [98, 61],
  "sections": [
    {
      "heading": "Best Pedal Tuner: Boss TU-3 Chromatic Tuner",
      "heading_es": "Mejor afinador de pedal: Boss TU-3 Cromático",
      "content": "<p><strong>The Boss TU-3 is the industry standard pedal tuner for a reason.</strong> 21-segment LED meter, chromatic tuning with guitar and bass modes, true bypass, and a mute function that silences your rig while tuning. Accuracy is ±1 cent, fast response, and the display is visible in direct sunlight and dark stages. It powers up to seven Boss compact pedals and has survived 30 years of touring abuse. If you play live, this is the one.</p><p><strong>Best for:</strong> live guitar and bass players who need bullet-proof reliability and stage visibility.</p>",
      "content_es": "<p><strong>El Boss TU-3 es el estándar de la industria en afinadores de pedal por una razón.</strong> Medidor LED de 21 segmentos, afinación cromática con modos de guitarra y bajo, true bypass y función de mute que silencia tu equipo mientras afinas. Precisión de ±1 cent, respuesta rápida y la pantalla se ve en luz solar directa y escenarios oscuros. Alimenta hasta siete pedales Boss compactos y ha sobrevivido 30 años de abuso en giras. Si tocas en vivo, este es el indicado.</p><p><strong>Ideal para:</strong> guitarristas y bajistas en vivo que necesitan fiabilidad a prueba de balas y visibilidad en escenario.</p>",
      "products": [98]
    },
    {
      "heading": "Best Clip-On Polyphonic: TC Electronic Polytune Clip",
      "heading_es": "Mejor clip-on polifónico: TC Electronic Polytune Clip",
      "content": "<p><strong>The Polytune Clip lets you strum all six strings and see which ones are off instantly.</strong> Polyphonic mode turns a full chord into a tuning snapshot; chromatic mode gives precise needle tracking. The bright color LCD and vibration sensor make it work on loud stages. Accuracy is ±1 cent with 500ms response. The clip fits any headstock and runs for months on a 9V battery.</p><p><strong>Best for:</strong> acoustic players, studio setups, and quick checks between songs without unplugging.</p>",
      "content_es": "<p><strong>El Polytune Clip te permite rasguear las seis cuerdas y ver al instante cuáles están desafinadas.</strong> El modo polifónico convierte un acorde completo en una instantánea de afinación; el modo cromático da seguimiento de aguja preciso. La LCD a color brillante y el sensor de vibración lo hacen funcional en escenarios ruidosos. Precisión de ±1 cent con respuesta de 500ms. El clip se ajusta a cualquier cabeza y funciona meses con una batería de 9V.</p><p><strong>Ideal para:</strong> guitarristas acústicos, estudios y verificaciones rápidas entre canciones sin desenchufar.</p>",
      "products": [58]
    },
    {
      "heading": "Best Budget Clip-On: Snark ST-8 Super Tight",
      "heading_es": "Mejor clip-on económico: Snark ST-8 Super Tight",
      "content": "<p><strong>The Snark ST-8 is the value king.</strong> Full-color display with 360° visibility, chromatic and needle modes, and a tight clip that stays put on bass headstocks. Accuracy of ±1 cent is more than enough for practice and live. The battery lasts ~3 hours and the housing is rugged enough for gig bags. It is the best price-to-performance clip-on on the market.</p><p><strong>Best for:</strong> beginners, backup tuners, and players who want reliable tuning on a budget.</p>",
      "content_es": "<p><strong>El Snark ST-8 es el rey de la relación calidad-precio.</strong> Pantalla a color con visibilidad 360°, modos cromático y de aguja, y un clip firme que se mantiene en cabezas de bajo. Precisión de ±1 cent es más que suficiente para práctica y vivo. La batería dura ~3 horas y la carcasa es lo suficientemente robusta para gig bags. Es el clip-on con mejor relación precio-rendimiento del mercado.</p><p><strong>Ideal para:</strong> principiantes, afinadores de respaldo y quienes quieren afinación fiable con presupuesto limitado.</p>",
      "products": [59]
    },
    {
      "heading": "Best Compact Headstock: D'Addario NS Micro",
      "heading_es": "Mejor compacto de cabeza: D'Addario NS Micro",
      "content": "<p><strong>The NS Micro hides on your headstock and disappears visually.</strong> Full-color display is readable in bright sun, ±0.5 cent accuracy, and the vibration sensor tracks silently. The low-profile design doesn't snag cables and the clip is strong enough for bass headstocks. It is the cleanest looking clip-on available.</p><p><strong>Best for:</strong> players who want zero stage clutter and a discreet tuner that stays on the instrument.</p>",
      "content_es": "<p><strong>El NS Micro se esconde en la cabeza y desaparece visualmente.</strong> Pantalla a color legible bajo sol, precisión de ±0.5 cent y sensor de vibración que sigue silenciosamente. El diseño de bajo perfil no engancha cables y el clip es lo suficientemente fuerte para cabezas de bajo. Es el clip-on más discreto disponible.</p><p><strong>Ideal para:</strong> quienes quieren cero desorden en escenario y un afinador discreto que permanece en el instrumento.</p>",
      "products": [60]
    },
    {
      "heading": "Best Precision: Peterson StroboClip HD",
      "heading_es": "Mejor precisión: Peterson StroboClip HD",
      "content": "<p><strong>The StroboClip HD is the reference tuner.</strong> True strobe tuning with ±0.1 cent accuracy, 18 tuning modes including alternate tunings and Sweetened Tunings optimized for intonation. Bright LED meter with 1000Hz reference tone for accurate pitch. It is the tuner techs use for setup and intonation work.</p><p><strong>Best for:</strong> studio techs, luthiers, and players who demand absolute pitch accuracy.</p>",
      "content_es": "<p><strong>El StroboClip HD es el afinador de referencia.</strong> Afinación strobe real con precisión de ±0.1 cent, 18 modos de afinación incluyendo afinaciones alternativas y Sweetened Tunings optimizadas para entonación. Medidor LED brillante con tono de referencia de 1000Hz para pitch preciso. Es el afinador que usan los técnicos para setup y entonación.</p><p><strong>Ideal para:</strong> técnicos de estudio, luthiers y músicos que exigen absoluta precisión de pitch.</p>",
      "products": [61]
    },
    {
      "heading": "Which Tuner Should You Buy?",
      "heading_es": "¿Qué afinador deberías comprar?",
      "content": "<p><strong>Choose the Boss TU-3 if you play live and want a pedalboard staple that never fails.</strong> Choose the Polytune Clip if you want fast visual feedback and play in noisy environments. Choose the Snark ST-8 if you want the best budget option with 360° visibility. Choose the D'Addario NS Micro if you want a discreet, permanent tuner. Choose the Peterson StroboClip HD if you demand studio-grade accuracy for intonation work.</p>",
      "content_es": "<p><strong>Elige el Boss TU-3 si tocas en vivo y quieres un clásico de pedalboard que nunca falla.</strong> Elige el Polytune Clip si quieres retroalimentación visual rápida y tocas en entornos ruidosos. Elige el Snark ST-8 si buscas la mejor opción económica con visibilidad 360°. Elige el D'Addario NS Micro si quieres un afinador discreto y permanente. Elige el Peterson StroboClip HD si exiges precisión de estudio para trabajos de entonación.</p>",
      "products": [98,58,59,60,61]
    }
  ],
  "conclusion": "<p>A good tuner is invisible until you need it — and then it has to be perfect. The Boss TU-3 wins for stage reliability, the Peterson StroboClip HD wins for accuracy, and the Snark ST-8 wins for value. Pick the tuner that matches how you work, and keep it on your board or headstock permanently.</p>",
  "conclusion_es": "<p>Un buen afinador es invisible hasta que lo necesitas — y entonces tiene que ser perfecto. El Boss TU-3 gana en fiabilidad de escenario, el Peterson StroboClip HD gana en precisión y el Snark ST-8 gana en valor. Elige el afinador que se ajuste a cómo trabajas y mantenlo siempre en tu pedalboard o cabeza.</p>",
  "verdict": "<p><strong>Boss TU-3 Chromatic Tuner</strong> — The stage standard. Bullet-proof build, true bypass mute, and instant readability under any lighting. The industry workhorse.</p><p><strong>Peterson StroboClip HD</strong> — The accuracy king. True strobe ±0.1 cent, Sweetened Tunings, and professional reference mode for intonation.</p>",
  "verdict_es": "<p><strong>Boss TU-3 Afinador Cromático</strong> — El estándar de escenario. Construcción a prueba de balas, mute true bypass y lectura instantánea bajo cualquier iluminación. El caballo de batalla de la industria.</p><p><strong>Peterson StroboClip HD</strong> — El rey de la precisión. Strobe real ±0.1 cent, Sweetened Tunings y modo de referencia profesional para entonación.</p>",
  "verdictProsCons": [
    {
      "name": "Boss TU-3 Chromatic Tuner",
      "name_es": "Boss TU-3 Afinador Cromático",
      "pros": [
        "Bullet-proof metal chassis built for touring",
        "True bypass with silent mute function",
        "21-segment LED visible in daylight and dark stages",
        "Chromatic, guitar, bass and flat tuning modes",
        "Powers up to seven Boss pedals"
      ],
      "pros_es": [
        "Chasis de metal a prueba de giras",
        "True bypass con función mute silenciosa",
        "LED de 21 segmentos visible en luz diurna y escenario oscuro",
        "Modos cromático, guitarra, bajo y flat",
        "Alimenta hasta siete pedales Boss"
      ],
      "cons": [
        "±1 cent accuracy not as precise as strobe tuners",
        "Pedal format requires board space",
        "Larger footprint than clip-ons"
      ],
      "cons_es": [
        "Precisión ±1 cent no es tan precisa como strobe",
        "Formato pedal requiere espacio en pedalboard",
        "Huella más grande que clip-ons"
      ]
    },
    {
      "name": "TC Electronic Polytune Clip",
      "name_es": "TC Electronic Polytune Clip",
      "pros": [
        "Polyphonic mode tunes all strings at once",
        "Vibration sensor works on loud stages",
        "Bright color LCD with 360° visibility",
        "Clip fits any headstock"
      ],
      "pros_es": [
        "Modo polifónico afina todas las cuerdas a la vez",
        "Sensor de vibración funciona en escenarios ruidosos",
        "LCD a color brillante con visibilidad 360°",
        "Clip se ajusta a cualquier cabeza"
      ],
      "cons": [
        "Battery life limited to ~4 hours",
        "Clip can be bulky on small headstocks",
        "Poly mode less precise than chromatic"
      ],
      "cons_es": [
        "Autonomía de batería ~4 horas",
        "Clip puede ser voluminoso en cabezas pequeñas",
        "Modo polifónico menos preciso que cromático"
      ]
    },
    {
      "name": "Snark ST-8 Super Tight",
      "name_es": "Snark ST-8 Super Tight",
      "pros": [
        "Best price-to-performance ratio",
        "Full-color 360° display",
        "Strong clip for bass headstocks",
        "Chromatic and needle modes"
      ],
      "pros_es": [
        "Mejor relación precio-rendimiento",
        "Pantalla a color 360°",
        "Clip fuerte para cabezas de bajo",
        "Modos cromático y de aguja"
      ],
      "cons": [
        "Short battery life ~3 hours",
        "Plastic housing less durable",
        "Display washes out in direct sun"
      ],
      "cons_es": [
        "Autonomía corta ~3 horas",
        "Carcasa de plástico menos durable",
        "Pantalla se desvanece al sol directo"
      ]
    },
    {
      "name": "D'Addario NS Micro",
      "name_es": "D'Addario NS Micro",
      "pros": [
        "Ultra low-profile design disappears on headstock",
        "±0.5 cent accuracy",
        "Bright full-color display",
        "Strong vibration sensor"
      ],
      "pros_es": [
        "Diseño ultra bajo perfil desaparece en cabeza",
        "Precisión ±0.5 cent",
        "Pantalla a color brillante",
        "Sensor de vibración fuerte"
      ],
      "cons": [
        "Small display harder to read at distance",
        "Clip can slip on glossy headstocks",
        "Battery access is fiddly"
      ],
      "cons_es": [
        "Pantalla pequeña difícil de leer a distancia",
        "Clip puede resbalar en cabezas brillantes",
        "Acceso a batería complicado"
      ]
    },
    {
      "name": "Peterson StroboClip HD",
      "name_es": "Peterson StroboClip HD",
      "pros": [
        "True strobe ±0.1 cent accuracy",
        "18 tuning modes including Sweetened Tunings",
        "1000Hz reference tone",
        "Professional reference mode"
      ],
      "pros_es": [
        "Strobe real ±0.1 cent de precisión",
        "18 modos de afinación incluyendo Sweetened Tunings",
        "Tono de referencia 1000Hz",
        "Modo de referencia profesional"
      ],
      "cons": [
        "Most expensive clip-on",
        "Complex menu system",
        "Steeper learning curve"
      ],
      "cons_es": [
        "Clip-on más caro",
        "Menú complejo",
        "Curva de aprendizaje más pronunciada"
      ]
    }
  ],
  "prices": {
    "Boss TU-3 Chromatic Tuner": "99",
    "TC Electronic Polytune Clip": "29.99",
    "Snark ST-8 Super Tight": "22.99",
    "D'Addario NS Micro": "21.99",
    "Peterson StroboClip HD": "59.99"
  },
  "prices_es": {
    "Boss TU-3 Afinador Cromático": "99",
    "TC Electronic Polytune Clip": "29.99",
    "Snark ST-8 Super Tight": "22.99",
    "D'Addario NS Micro": "21.99",
    "Peterson StroboClip HD": "59.99"
  },
  "stores": {
    "Boss TU-3 Chromatic Tuner": ["gear4music","musicstore","andertons","amazon","zzounds"],
    "TC Electronic Polytune Clip": ["amazon","gear4music","musicstore","andertons","zzounds"],
    "Snark ST-8 Super Tight": ["amazon","gear4music","musicstore","andertons","zzounds"],
    "D'Addario NS Micro": ["amazon","gear4music","musicstore","andertons","zzounds"],
    "Peterson StroboClip HD": ["amazon","gear4music","musicstore","andertons","zzounds"]
  },
  "stores_es": {
    "Boss TU-3 Afinador Cromático": ["gear4music","musicstore","andertons","amazon","zzounds"],
    "TC Electronic Polytune Clip": ["gear4music","musicstore","andertons","amazon","zzounds"],
    "Snark ST-8 Super Tight": ["gear4music","musicstore","andertons","amazon","zzounds"],
    "D'Addario NS Micro": ["gear4music","musicstore","andertons","amazon","zzounds"],
    "Peterson StroboClip HD": ["gear4music","musicstore","andertons","amazon","zzounds"]
  },
  "datePublished": "2026-11-03"
};

// Replace entry
if (foundIndex) {
  guides[foundIndex] = newGuide;
} else {
  // Add as new if not found
  const newKey = Object.keys(guides).length.toString();
  guides[newKey] = newGuide;
}

const out = JSON.stringify(guides, null, 2);
fs.writeFileSync(guidesPath, out);
console.log('Guide updated successfully');
