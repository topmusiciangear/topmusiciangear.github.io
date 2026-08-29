const fs = require('fs');
const file = 'data/guides.json';
const raw = fs.readFileSync(file, 'utf8').replace(/^\ufeff/, '');
const guides = JSON.parse(raw);
const g = guides.find(x => x.id === 'budget-headphones');
if (!g) throw new Error('guide not found');

// ---------- SECTIONS ----------
const sections = [
  {
    heading: "What a Budget Headphone Can Give Up (and Keep Sounding Good)",
    heading_es: "Qué puede sacrificar un auricular económico (y seguir sonando bien)",
    content: "<p><strong>A budget studio headphone should not force you into bad mixing decisions — it just skips the extras.</strong> You can still get a neutral response and a comfortable fit if you choose by the right criteria.</p><p><strong>Spend on the driver and tuning, not the brand.</strong> The frequency response is the whole game for studio use. Look for models whose response is close to flat, and read reviews that mention how honestly they report low end and treble.</p><p><strong>Detachable cable is the budget feature that saves money.</strong> A removable cable means you can replace it instead of buying a whole new headphone when the wire frays. That single feature extends a budget headphone's life dramatically.</p><p><strong>Comfort hardware is where cheap models cut corners.</strong> Thin pads and a heavy headband become unbearable in hour three. Check the fit or read about pad depth and clamp force — a headphone that hurts is a headphone that ends up in a drawer.</p><p><strong>Ignore bundled cases and flashy specs.</strong> A folding case and impressive-looking numbers on the box add nothing to how you mix. Put your budget into driver quality and replaceable parts, and the pair will last twice as long.</p>",
    content_es: "<p><strong>Un auricular de estudio económico no debería obligarte a malas decisiones de mezcla — solo te limita a omitir los extras.</strong> Aun así puedes conseguir una respuesta neutra y un ajuste cómodo si eliges según los criterios correctos.</p><p><strong>Gasta en el driver y la afinación, no en la marca.</strong> La respuesta de frecuencia es todo el juego para uso de estudio. Busca modelos cuya respuesta esté cerca de ser plana, y lee reseñas que mencionen cuán honestamente reportan los graves y los agudos.</p><p><strong>El cable desmontable es la característica económica que ahorra dinero.</strong> Un cable extraíble significa que puedes reemplazarlo en lugar de comprar unos auriculares enteros nuevos cuando el cable se deshilacha. Esa única característica alarga la vida de un auricular económico de forma notable.</p><p><strong>La comodidad es donde los modelos baratos recortan.</strong> Almohadillas delgadas y una diadema pesada se vuelven insoportables en la tercera hora. Prueba el ajuste o lee sobre la profundidad de la almohadilla y la fuerza de sujeción — unos auriculares que duelen acaban guardados en un cajón.</p><p><strong>Ignora las fundas incluidas y las especificaciones llamativas.</strong> Una funda plegable y números impresionantes en la caja no añaden nada a cómo mezclas. Pon tu presupuesto en la calidad del driver y en piezas reemplazables, y durarán el doble.</p>",
    products: []
  },
  {
    heading: "Is the Sennheiser HD 560S the Best Budget Open-Back for Mixing?",
    heading_es: "¿Son los Sennheiser HD 560S los mejores auriculares abiertos económicos para mezclar?",
    content: "<p><strong>The HD 560S is the open-back option that keeps showing up when budget meets accuracy.</strong> Its open-back design delivers a wide, natural soundstage, and the angled drivers recreate a proper listening position without needing room treatment. That is a real advantage for mixing: imaging and depth read clearly, so pan and level decisions translate well.</p><p>The tuning is honest and linear, with smooth, controlled bass extension down to 20 Hz and below. It does not hype the low end or smear the detail, which is exactly what you want when you are judging a mix rather than enjoying playback. The 120-ohm impedance is easy to drive from an interface or a good laptop jack, so you do not need a headphone amp.</p><p>The trade-off is the design itself: being open-back, it leaks sound in both directions, so it is not a tracking headphone for a live mic. And while the velour pads stay comfortable for hours, the mostly plastic build means you are spending on the driver and tuning rather than the shell. For an under-$150 mixing reference it is hard to beat.</p>",
    content_es: "<p><strong>Los HD 560S son la opción abierta que vuelve a aparecer cuando el presupuesto se encuentra con la precisión.</strong> Su diseño abierto entrega un escenario sonoro amplio y natural, y los drivers inclinados recrean una posición de escucha real sin necesidad de tratar la sala. Es una ventaja real para mezclar: la imagen y la profundidad se leen con claridad, así que las decisiones de paneo y nivel se traducen bien.</p><p>La afinación es honesta y lineal, con una extensión de graves suave y controlada hasta 20 Hz y más abajo. No potencia los graves ni difumina el detalle, que es justo lo que quieres al juzgar una mezcla en lugar de disfrutar de la reproducción. La impedancia de 120 ohmios se maneja fácilmente desde una interfaz o un buen conector de laptop, así que no necesitas un amplificador de auriculares.</p><p>La compensación es el propio diseño: al ser abiertos, dejan escapar el sonido en ambas direcciones, así que no son un auricular de grabación frente a un micrófono en vivo. Y aunque las almohadillas de terciopelo son cómodas durante horas, la construcción mayormente de plástico significa que gastas en el driver y la afinación más que en el chasis. Por menos de $150, como referencia para mezclar, es difícil de superar.</p>",
    products: [426]
  },
  {
    heading: "Is the Sony MDR-7506 Still the Best Budget Closed-Back?",
    heading_es: "¿Siguen siendo las Sony MDR-7506 las mejores cerradas económicas?",
    content: "<p><strong>The Sony MDR-7506 has been the broadcast standard since 1991 — more than thirty years of showing up on film sets, in radio stations, in broadcast trucks, and in countless home studios.</strong> The mids are forward and incredibly revealing: you will hear mouth noises, edit clicks, sibilance problems, and low-level distortion that other headphones mask completely. That honesty is a double-edged sword — you will notice flaws you might want to fix, but you will not be surprised when the mix shows up on other systems.</p><p>The build is simple but durable, and the fold-flat frame makes them easy to travel with. The closed-back design means you can also track vocals and instruments on them, which makes the 7506 genuinely multi-purpose — a rare thing at this price.</p><p>What holds them back is the fixed, non-detachable coiled cable: when it frays, you replace the whole pair rather than the wire. The 63-ohm impedance also wants a stronger headphone out than a phone usually offers. Those are the trade-offs you accept for a legend that keeps working.</p>",
    content_es: "<p><strong>Las Sony MDR-7506 llevan siendo el estándar de transmisión desde 1991 — más de treinta años apareciendo en sets de filmación, estaciones de radio, camiones de transmisión e innumerables estudios caseros.</strong> Los medios son directos e increíblemente reveladores: escucharás ruidos de boca, clics de edición, problemas de sibilancia y distorsión de bajo nivel que otros auriculares enmascaran por completo. Esa honestidad es un arma de doble filo — notarás fallos que quizá quieras corregir, pero no te sorprenderás cuando la mezcla aparezca en otros sistemas.</p><p>La construcción es simple pero duradera, y el chasis plegable las hace fáciles de transportar. El diseño cerrado significa que también puedes grabar voces e instrumentos con ellas, lo que convierte a las 7506 en las dos de verdad polivalentes — algo raro a este precio.</p><p>Lo que frena son el cable fijo no desmontable, enrollado: cuando se deshilacha, reemplazas el par entero en lugar del cable. La impedancia de 63 ohmios también pide una salida de auriculares más potente que la de un móvil. Esos son los sacrificios que aceptas por una leyenda que sigue funcionando.</p>",
    products: [26]
  },
  {
    heading: "Is the Audio-Technica ATH-M40x the Flattest Budget Option?",
    heading_es: "¿Son los Audio-Technica ATH-M40x la opción económica más plana?",
    content: "<p><strong>the ATH-M40x delivers nearly all of its famous sibling's driver tech for less — and it is the flat-tuned value pick of the M-Series.</strong> The 40mm drivers with rare-earth magnets and CCAW voice coils are tuned flat, which makes the M40x the more honest mixing tool: it does not flatter your mix, it reveals it. The circumaural earcups seal well for solid isolation, and the pro-grade inverted pads stay comfortable through long sessions.</p><p>The collapsible frame with 90-degree swiveling earcups is ideal for travel and one-ear monitoring, and the detachable cable system means a cable failure will not kill the whole headphone. Two cables (coiled and straight), a carrying pouch, and a 1/4-inch adapter are all in the box.</p><p>The weakest point is the clamp: the M40x grips firmly, and some listeners find the fit tight at first until the frame breaks in. It costs a little more than the 7506, but you pay for detachable cables, better pads, and flatter tuning.</p>",
    content_es: "<p><strong>Los ATH-M40x ofrecen casi toda la tecnología de drivers de su famoso hermano mayor por menos — y son la opción de valor con respuesta plana de la serie M.</strong> Los drivers de 40mm con imanes de tierras raras y bobinas CCAW están sintonizados de forma plana, lo que convierte a los M40x en la herramienta de mezcla más honesta: no halaga la mezcla, la revela. Las copas circumaurales sellan bien para un aislamiento sólido, y las almohadillas invertidas de grado profesional siguen cómodas durante sesiones largas.</p><p>El chasis plegable con copas giratorias de 90 grados es ideal para viajar y para monitoreo de un solo oído, y el sistema de cable desmontable significa que la caída de un cable no acabará con los auriculares. Dos cables (en espiral y liso), bolsa de transporte y adaptador de 1/4 pulgada van incluidos.</p><p>El punto más débil es la sujeción: los M40x agarran con firmeza, y algunos oyentes notan el ajuste apretado al principio hasta que el chasis se ablanda. Cuestan un poco más que las 7506, pero pagas por cables desmontables, mejores almohadillas y una afinación más plana.</p>",
    products: [198]
  },
  {
    heading: "Is the Audio-Technica ATH-R30x the Budget Open-Back Gateway?",
    heading_es: "¿Son los Audio-Technica ATH-R30x la puerta de entrada abierta económica?",
    content: "<p><strong>The ATH-R30x is the entry point to Audio-Technica's R-Series reference line, and at 210 g it is the lightest pair in this roundup.</strong> The open-back design lets the 40mm drivers move freely, with little tuning or damping in the way, which gives a wide, realistic soundstage and a natural signature with well-defined lows, transparent mids, and smooth, extended highs. For mixing and everyday critical listening it is a very neutral performer.</p><p>The velour earpads and adjustable headband sit light on the head for long sessions, and the 36-ohm impedance drives easily from an interface, laptop, or even a phone. The included 6.3mm adapter means it works straight out of the box with studio gear.</p><p>The compromises are similar to any budget open-back: the cable is fixed rather than detachable, so a broken wire means a new pair, and being open-back it leaks sound, so it is not a tracking headphone. It also has the lowest sensitivity of the group at 92 dB, so it needs a bit more volume than average.</p>",
    content_es: "<p><strong>Los ATH-R30x son la puerta de entrada a la serie de referencia R de Audio-Technica, y con 210 g son el par más ligero de esta selección.</strong> El diseño abierto deja mover libremente a los drivers de 40mm, con poca afinación o amortiguación interpuesta, lo que ofrece un escenario sonoro amplio y realista y una firma natural con graves definidos, medios transparentes y agudos suaves y extendidos. Para mezclar y para escucha crítica diaria es un intérprete muy neutro.</p><p>Las almohadillas de terciopelo y la diadema ajustable pesan poco sobre la cabeza para sesiones largas, y la impedancia de 36 ohmios se maneja fácilmente desde una interfaz, una laptop o incluso un teléfono. El adaptador de 6.3mm incluido hace que funcionen directamente con equipo de estudio.</p><p>Los sacrificios son parecidos a los de cualquier abierto económico: el cable es fijo y no desmontable, así que un cable roto significa auriculares nuevos, y al ser abiertos dejan escapar el sonido, así que no son para grabar. También tienen la sensibilidad más baja del grupo, 92 dB, por lo que piden un poco más de volumen del promedio.</p>",
    products: [427]
  },
  {
    heading: "Is the Shure SRH440A a Better Buy Than the MDR-7506?",
    heading_es: "¿Son los Shure SRH440A una mejor compra que las MDR-7506?",
    content: "<p><strong>The Shure SRH440A is the modern take on the classic closed-back budget monitor, and it modernizes the formula.</strong> The 40mm neodymium drivers are tuned for a transparent, natural signature with low distortion, and the closed, circumaural design gives real isolation so you can record vocals without bleeding into the mic. It is a solid pick for podcasting and home recording as well as mixing.</p><p>The big upgrade over the 7506 is the detachable, straight 3m cable — when it fails you replace just the cable — plus removable earpads that extend the life of the pair. The 40-ohm impedance and 500mW power handling make it easy to drive from most pro and consumer devices, and the collapsible frame folds flat for travel.</p><p>The trade-off is that it does not quite have the 7506's mid-forward punch; the SRH440A is a touch more neutral and laid-back in the upper mids. Still, for a closed-back that also tracks well and is built to be serviceable, it is a very close call at nearly the same price.</p>",
    content_es: "<p><strong>Los Shure SRH440A son la versión moderna del clásico monitor cerrado económico, y modernizan la fórmula.</strong> Los drivers de neodimio de 40mm están afinados para una firma transparente y natural con baja distorsión, y el diseño cerrado y circumaural ofrece aislamiento real para poder grabar voces sin que el micrófono capte el sonido. Son una opción sólida para podcasting y grabación en casa, además de para mezclar.</p><p>La gran mejora frente a las 7506 es el cable recto desmontable de 3m — cuando falla, reemplazas solo el cable —, más las almohadillas removibles que alargan la vida del par. La impedancia de 40 ohmios y la potencia de manejo de 500mW los hacen fáciles de manejar desde la mayoría de dispositivos pro y de consumo, y el chasis plegable se dobla plano para viajar.</p><p>La compensación es que no tienen la pegada en medios tan adelante como las 7506; los SRH440A son un poco más neutros y relajados en los medios altos. Aun así, para un cerrado que también sirve para grabar y está pensado para ser reparable, es una decisión muy reñida a casi el mismo precio.</p>",
    products: [420]
  },
  {
    heading: "Is the Samson SR850 the Best Value on a Tiny Budget?",
    heading_es: "¿Son los Samson SR850 la mejor relación calidad-precio con muy poco presupuesto?",
    content: "<p><strong>The Samson SR850 is the budget surprise of this list — under $50 for a semi-open studio design with 50mm drivers.</strong> The large drivers with neodymium magnets deliver a transparent response with solid bass, clear mids, and airy highs, and the semi-open back keeps the low end honest while opening up the soundstage for better stereo imaging. For a first serious pair on a tight budget it is genuinely hard to beat.</p><p>The self-adjusting headband and velour earcups stay comfortable through long sessions, and the 32-ohm impedance drives from anything, including a phone. The included 1/4-inch adapter covers studio use.</p><p>You give up a few things at this price: the build is mostly plastic and feels cheaper than the others here, the cable is fixed rather than detachable, and there is some brightness in the highs that not everyone loves. But as a cheap and accurate entry point that reveals detail and stays honest, the SR850 earns its place.</p>",
    content_es: "<p><strong>Los Samson SR850 son la sorpresa económica de esta lista — menos de $50 por un diseño semiabierto de estudio con drivers de 50mm.</strong> Los grandes drivers con imanes de neodimio entregan una respuesta transparente con graves sólidos, medios claros y agudos aéreos, y el respaldo semiabierto mantiene honestos los graves mientras abre el escenario sonoro para mejor imagen estéreo. Para el primer par serio con un presupuesto ajustado es genuinamente difícil de superar.</p><p>La diadema autoajustable y las almohadillas de terciopelo se mantienen cómodas durante sesiones largas, y la impedancia de 32 ohmios se maneja desde cualquier fuente, incluso un teléfono. El adaptador de 1/4 pulgada incluido cubre el uso de estudio.</p><p>Renuncias a algunas cosas a este precio: la construcción es mayormente de plástico y se siente más barata que las demás de aquí, el cable es fijo y no desmontable, y hay algo de brillo en los agudos que no todos aprecian. Pero como punto de entrada barato y preciso que revela el detalle y se mantiene honesto, los SR850 merecen su lugar.</p>",
    products: [428]
  }
];

// ---------- CONCLUSION ----------
const conclusion = "Pick the closed-backs when you track or work in a noisy room — the MDR-7506 is the proven classic, the SRH440A adds detachable cables and pads, and both cost around $100. If you want an honest mixing reference and do not need isolation, the HD 560S is the open-back winner: its linear tuning and angled drivers make it the most accurate of the six. The ATH-M40x is the flat and versatile middle ground, and the ATH-R30x is the lightest open-back gateway. On a very tight budget, the Samson SR850 delivers more accuracy per dollar than anything else. Spend on the driver and tuning, not the extras, and any of these will teach you what a good mix sounds like.";

const conclusion_es = "Elige los cerrados cuando grabes o trabajes en una habitación ruidosa — las MDR-7506 son el clásico probado, los SRH440A aportan cables y almohadillas desmontables, y ambos cuestan alrededor de $100. Si quieres una referencia honesta para mezclar y no necesitas aislamiento, los HD 560S son los ganadores abiertos: su afinación lineal y sus drivers inclinados los convierten en el más preciso de los seis. Los ATH-M40x son el punto medio plano y versátil, y los ATH-R30x son la puerta de entrada abierta más ligera. Con un presupuesto muy ajustado, los Samson SR850 ofrecen más precisión por dólar que cualquier otra. Gasta en el driver y la afinación, no en los extras, y cualquiera de estos te enseñará cómo suena una buena mezcla.";

// ---------- VERDICT ----------
const verdict = "The Sennheiser HD 560S is the most accurate of the six for mixing, but it is open-back, so it needs a quiet room and a closed pair for tracking. Keep the MDR-7506 as the all-around budget closed-back classic, or the SRH440A if you want detachable parts. The ATH-M40x is the flat, versatile middle ground, the ATH-R30x the lightest open gateway, and the Samson SR850 the best value for almost no money.";

const verdict_es = "Los Sennheiser HD 560S son el más preciso de los seis para mezclar, pero son abiertos, así que necesitan una sala silenciosa y un par cerrado para grabar. Quédate con las MDR-7506 como el clásico cerrado económico de uso general, o los SRH440A si quieres piezas desmontables. Los ATH-M40x son el punto medio plano y versátil, los ATH-R30x la puerta abierta más ligera, y los Samson SR850 la mejor relación calidad-precio por casi nada.";

// ---------- PRODUCT TABLE ----------
const productTable = {
  title: "Best Budget Studio Headphones Compared (2026)",
  title_es: "Comparativa de los mejores auriculares de estudio económicos (2026)",
  columns: [
    { title: "Sennheiser HD 560S", title_es: "Sennheiser HD 560S" },
    { title: "Sony MDR-7506", title_es: "Sony MDR-7506" },
    { title: "Audio-Technica ATH-M40x", title_es: "Audio-Technica ATH-M40x" },
    { title: "Audio-Technica ATH-R30x", title_es: "Audio-Technica ATH-R30x" },
    { title: "Shure SRH440A", title_es: "Shure SRH440A" },
    { title: "Samson SR850", title_es: "Samson SR850" }
  ],
  rows: [
    {
      label: "Price", label_es: "Precio",
      values: [
        { value: "$149", value_es: "$149" },
        { value: "$99", value_es: "$99" },
        { value: "$109", value_es: "$109" },
        { value: "$99", value_es: "$99" },
        { value: "$99", value_es: "$99" },
        { value: "$40", value_es: "$40" }
      ]
    },
    {
      label: "Best For", label_es: "Ideal Para",
      values: [
        { value: "Open-back mixing reference", value_es: "Referencia abierta para mezclar" },
        { value: "Classic budget tracking", value_es: "Grabación económica clásica" },
        { value: "Flat, versatile closed-back", value_es: "Cerrado plano y versátil" },
        { value: "Light open-back critical listening", value_es: "Abierto ligero para escucha crítica" },
        { value: "Podcast & home recording", value_es: "Podcast y grabación casera" },
        { value: "Budget semi-open accuracy", value_es: "Semiabierto preciso económico" }
      ]
    },
    {
      label: "Type", label_es: "Tipo",
      values: [
        { value: "Open-back", value_es: "Abiertos" },
        { value: "Closed-back", value_es: "Cerrados" },
        { value: "Closed-back", value_es: "Cerrados" },
        { value: "Open-back", value_es: "Abiertos" },
        { value: "Closed-back", value_es: "Cerrados" },
        { value: "Semi-open", value_es: "Semiabiertos" }
      ]
    },
    {
      label: "Driver Size", label_es: "Tamaño del Driver",
      values: [
        { value: "38mm", value_es: "38mm" },
        { value: "40mm", value_es: "40mm" },
        { value: "40mm", value_es: "40mm" },
        { value: "40mm", value_es: "40mm" },
        { value: "40mm", value_es: "40mm" },
        { value: "50mm", value_es: "50mm" }
      ]
    },
    {
      label: "Impedance", label_es: "Impedancia",
      values: [
        { value: "120 Ω", value_es: "120 Ω" },
        { value: "63 Ω", value_es: "63 Ω" },
        { value: "35 Ω", value_es: "35 Ω" },
        { value: "36 Ω", value_es: "36 Ω" },
        { value: "40 Ω", value_es: "40 Ω" },
        { value: "32 Ω", value_es: "32 Ω" }
      ]
    },
    {
      label: "Sensitivity", label_es: "Sensibilidad",
      values: [
        { value: "110 dB", value_es: "110 dB" },
        { value: "106 dB", value_es: "106 dB" },
        { value: "98 dB", value_es: "98 dB" },
        { value: "92 dB", value_es: "92 dB" },
        { value: "97 dB", value_es: "97 dB" },
        { value: "98 dB", value_es: "98 dB" }
      ]
    },
    {
      label: "Frequency Response", label_es: "Respuesta de Frecuencia",
      values: [
        { value: "6 Hz – 38 kHz", value_es: "6 Hz – 38 kHz" },
        { value: "10 Hz – 20 kHz", value_es: "10 Hz – 20 kHz" },
        { value: "15 Hz – 24 kHz", value_es: "15 Hz – 24 kHz" },
        { value: "15 Hz – 25 kHz", value_es: "15 Hz – 25 kHz" },
        { value: "10 Hz – 22 kHz", value_es: "10 Hz – 22 kHz" },
        { value: "10 Hz – 30 kHz", value_es: "10 Hz – 30 kHz" }
      ]
    },
    {
      label: "Cable", label_es: "Cable",
      values: [
        { value: "Detachable 1.8 m", value_es: "Desmontable 1.8 m" },
        { value: "3 m coiled, fixed", value_es: "3 m enrollado, fijo" },
        { value: "Detachable (2 included)", value_es: "Desmontable (2 incluidos)" },
        { value: "3 m fixed", value_es: "3 m fijo" },
        { value: "3 m detachable", value_es: "3 m desmontable" },
        { value: "2.5 m fixed", value_es: "2.5 m fijo" }
      ]
    },
    {
      label: "Ear Pads", label_es: "Almohadillas",
      values: [
        { value: "Velour, replaceable", value_es: "Velour, reemplazables" },
        { value: "PLEATHER, non-detachable", value_es: "PLEATHER, fijas" },
        { value: "Inverted, pro-grade", value_es: "Invertidas, grado pro" },
        { value: "Velour, replaceable", value_es: "Velour, reemplazables" },
        { value: "Removable", value_es: "Removibles" },
        { value: "Velour", value_es: "Velour" }
      ]
    },
    {
      label: "Weight", label_es: "Peso",
      values: [
        { value: "240 g", value_es: "240 g" },
        { value: "230 g", value_es: "230 g" },
        { value: "240 g", value_es: "240 g" },
        { value: "210 g", value_es: "210 g" },
        { value: "268 g", value_es: "268 g" },
        { value: "276 g", value_es: "276 g" }
      ]
    }
  ]
};

// ---------- VERDICT PROS CONS ----------
const verdictProsCons = [
  {
    name: "Sennheiser HD 560S", name_es: "Sennheiser HD 560S",
    pros: [
      "Linear, honest tuning — the most accurate for mixing of the six",
      "Open-back soundstage with angled drivers for clear imaging",
      "120-ohm impedance easy to drive from an interface",
      "Comfortable velour pads for long sessions"
    ],
    cons: [
      "Open-back leaks sound both ways — not for tracking",
      "120-ohm wants a decent headphone out, not a phone",
      "Mostly plastic build; you pay for the driver and tuning",
      "Costs more than the closed-backs here"
    ],
    pros_es: [
      "Afinación lineal y honesta — el más preciso para mezclar de los seis",
      "Escenario abierto con drivers inclinados para una imagen clara",
      "Impedancia de 120 ohmios fácil de manejar desde una interfaz",
      "Almohadillas de terciopelo cómodas para sesiones largas"
    ],
    cons_es: [
      "Los abiertos dejan escapar el sonido en ambas direcciones — no sirven para grabar",
      "Los 120 ohmios piden una buena salida de auriculares, no un móvil",
      "Construcción mayormente de plástico; pagas por el driver y la afinación",
      "Cuestan más que los cerrados de esta lista"
    ]
  },
  {
    name: "Sony MDR-7506", name_es: "Sony MDR-7506",
    pros: [
      "Proven broadcast standard since 1991",
      "Forward, revealing mids",
      "Closed-back, so it also tracks vocals and instruments",
      "Folds flat and survives drops"
    ],
    cons: [
      "Fixed non-detachable cable — a frayed wire means a new pair",
      "63-ohm impedance wants a stronger headphone out than a phone",
      "Simpler earpads are less comfortable than the M40x in long sessions",
      "The coiled 3m cable adds weight and tangles on a small desk"
    ],
    pros_es: [
      "Estándar de transmisión probado desde 1991",
      "Medios directos y reveladores",
      "Cerrados, así que también sirven para grabar voces e instrumentos",
      "Se pliegan planos y sobreviven caídas"
    ],
    cons_es: [
      "Cable fijo no desmontable — un cable desgastado significa un par nuevo",
      "La impedancia de 63 ohmios pide una salida más potente que la de un móvil",
      "Las almohadillas simples son menos cómodas que las del M40x en sesiones largas",
      "El cable enrollado de 3m añade peso y se enreda en un escritorio pequeño"
    ]
  },
  {
    name: "Audio-Technica ATH-M40x", name_es: "Audio-Technica ATH-M40x",
    pros: [
      "40mm drivers with rare-earth magnets and CCAW coils, tuned flat",
      "Closed-back with good isolation for tracking",
      "Detachable cables, collapsible frame, pouch, and 1/4-inch adapter included",
      "Pro-grade pads stay comfortable in long sessions"
    ],
    cons: [
      "Firm clamp can feel tight until the frame breaks in",
      "Costs a little more than the MDR-7506",
      "Flat tuning lacks the bass punch for casual listening",
      "Locking detachable cable needs the exact connector for replacements"
    ],
    pros_es: [
      "Drivers de 40mm con imanes de tierras raras y bobinas CCAW, afinados planos",
      "Cerrados con buen aislamiento para grabar",
      "Cables desmontables, chasis plegable, bolsa y adaptador de 1/4 incluidos",
      "Las almohadillas de grado pro se mantienen cómodas en sesiones largas"
    ],
    cons_es: [
      "La sujeción firme puede sentirse apretada hasta que el chasis se ablanda",
      "Cuestan un poco más que las MDR-7506",
      "La afinación plana carece de la pegada de graves para escucha casual",
      "El cable desmontable con cierre pide el conector exacto para reemplazos"
    ]
  },
  {
    name: "Audio-Technica ATH-R30x", name_es: "Audio-Technica ATH-R30x",
    pros: [
      "Lightest of the six at 210 g",
      "Open-back, natural soundstage",
      "36-ohm impedance drives easily from almost anything",
      "Comfortable velour pads; includes 6.3mm adapter"
    ],
    cons: [
      "Fixed cable — a broken wire means a new pair",
      "Open-back leaks sound — not for tracking",
      "Lowest sensitivity at 92 dB, needs more volume",
      "Prices verified at Amazon and Gear4music only"
    ],
    pros_es: [
      "El más ligero de los seis con 210 g",
      "Abiertos, con escenario sonoro natural",
      "La impedancia de 36 ohmios se maneja fácilmente desde casi cualquier fuente",
      "Almohadillas de terciopelo cómodas; incluye adaptador de 6.3mm"
    ],
    cons_es: [
      "Cable fijo — un cable roto significa un par nuevo",
      "Abiertos, dejan escapar el sonido — no sirven para grabar",
      "La sensibilidad más baja, 92 dB, pide más volumen",
      "Precios verificados solo en Amazon y Gear4music"
    ]
  },
  {
    name: "Shure SRH440A", name_es: "Shure SRH440A",
    pros: [
      "Detachable 3m cable and removable earpads for easy servicing",
      "Closed-back isolation for tracking and podcasting",
      "Easy 40-ohm impedance; collapsible frame",
      "Transparent 40mm neodymium drivers with low distortion"
    ],
    cons: [
      "Lacks the mid-forward punch of the MDR-7506",
      "Slightly heavier at 268 g",
      "A touch more neutral and laid-back in the upper mids",
      "Build feels modern but less iconic than the 7506 legacy"
    ],
    pros_es: [
      "Cable desmontable de 3m y almohadillas removibles para fácil mantenimiento",
      "Aislamiento cerrado para grabar y podcasting",
      "Impedancia fácil de 40 ohmios; chasis plegable",
      "Drivers de neodimio de 40mm transparentes con baja distorsión"
    ],
    cons_es: [
      "Les falta la pegada en medios de las MDR-7506",
      "Algo más pesados, 268 g",
      "Un poco más neutros y relajados en los medios altos",
      "La construcción se siente moderna pero menos icónica que el legado de las 7506"
    ]
  },
  {
    name: "Samson SR850", name_es: "Samson SR850",
    pros: [
      "Best value by far — under $50",
      "Large 50mm drivers with full, detailed response",
      "Semi-open soundstage for better imaging",
      "Comfortable velour pads and self-adjusting headband"
    ],
    cons: [
      "Mostly plastic build feels cheap",
      "Fixed non-detachable cable",
      "Some brightness in the highs not everyone likes",
      "Not as refined as the pricier options here"
    ],
    pros_es: [
      "La mejor relación calidad-precio por mucho — menos de $50",
      "Grandes drivers de 50mm con respuesta llena y detallada",
      "Escenario semiabierto para mejor imagen",
      "Almohadillas de terciopelo cómodas y diadema autoajustable"
    ],
    cons_es: [
      "La construcción mayormente de plástico se siente barata",
      "Cable fijo no desmontable",
      "Algo de brillo en los agudos que no todos aprecian",
      "No es tan refinado como las opciones más caras de aquí"
    ]
  }
];

// ---------- FEATURED SNIPPET ----------
g.featuredSnippet = {
  title_en: "Best Budget Studio Headphones Under $150 (2026)",
  text_en: "The Sennheiser HD 560S is the most accurate of the six for mixing, with linear tuning and angled drivers — but it is open-back, so pair it with a closed-back for tracking. The Sony MDR-7506 remains the proven closed-back classic since 1991, and the Shure SRH440A adds detachable cables and pads. The ATH-M40x is the flat, versatile middle ground, and the Samson SR850 is the best value under $50.",
  name1_en: "Sennheiser HD 560S",
  name2_en: "Sony MDR-7506",
  price1: "$149.00",
  price2: "$99.00",
  type1: "Open-back headphones",
  type2: "Closed-back headphones",
  key1_en: "",
  key2_en: "",
  best1_en: "",
  best2_en: "",
  brand1: "Sennheiser",
  brand2: "Sony",
  rating1: 4.6,
  rating2: 4.8,
  title_es: "Auriculares de estudio económicos por menos de $150 (2026)",
  text_es: "Los Sennheiser HD 560S son el más preciso de los seis para mezclar, con afinación lineal y drivers inclinados — pero son abiertos, así que acompáñalos con un par cerrado para grabar. Las Sony MDR-7506 siguen siendo el clásico cerrado probado desde 1991, y los Shure SRH440A aportan cables y almohadillas desmontables. Los ATH-M40x son el punto medio plano y versátil, y los Samson SR850 son la mejor relación calidad-precio por menos de $50.",
  name1_es: "Sennheiser HD 560S",
  name2_es: "Sony MDR-7506",
  best1_es: "",
  best2_es: "",
  key1_es: "",
  key2_es: "",
  faq_q1_en: "What is the best budget studio headphone under $150?",
  faq_a1_en: "For mixing, the Sennheiser HD 560S is the most accurate of the budget open-backs, with linear tuning and angled drivers that make imaging clear. For an all-around closed-back that also tracks, the Sony MDR-7506 is the proven classic, and the Shure SRH440A adds detachable cables and pads for nearly the same price. On a very tight budget, the Samson SR850 gives the most accuracy per dollar.",
  faq_q2_en: "Is the Sennheiser HD 560S good for mixing?",
  faq_a2_en: "Yes. The HD 560S is widely used as an affordable mixing reference because of its linear, honest tuning and open-back soundstage. Its angled drivers recreate a proper listening position for accurate imaging and depth. The 120-ohm impedance is easy to drive from an interface, though it does leak sound both ways because it is open-back, so keep a closed pair for tracking.",
  faq_q3_en: "Is the MDR-7506 better than the ATH-M40x?",
  faq_a3_en: "The MDR-7506 is the cheaper, proven broadcast classic with a slightly bright, revealing sound and a fixed cable. The ATH-M40x costs a little more but brings a flatter, more neutral tuning, detachable cables, and a collapsible frame. Pick the 7506 for the classic sound and price; pick the M40x if you value flat tuning and replaceable cables.",
  faq_q4_en: "Can you mix professionally on budget headphones?",
  faq_a4_en: "Yes, with careful reference checking. All six here — the HD 560S, MDR-7506, ATH-M40x, ATH-R30x, SRH440A, and SR850 — are tuned fairly neutral and translate well once you learn them. The habit that matters is checking against reference tracks you know well and comparing your mix to commercial releases on the same pair.",
  faq_q5_en: "Are open-back or closed-back budget headphones better?",
  faq_a5_en: "It depends on your room and use. Open-backs like the HD 560S and ATH-R30x give a wider, more natural soundstage and are ideal for mixing in a quiet room, but they leak sound both ways, so they are not for tracking. Closed-backs like the MDR-7506, ATH-M40x, and SRH440A isolate better and double as tracking headphones. For under $150, owning one of each is affordable and practical.",
  faq_q1_es: "¿Cuál es el mejor auricular de estudio económico por menos de $150?",
  faq_a1_es: "Para mezclar, los Sennheiser HD 560S son el más preciso de los abiertos económicos, con afinación lineal y drivers inclinados que hacen clara la imagen. Para un cerrado de uso general que también sirve para grabar, las Sony MDR-7506 son el clásico probado, y los Shure SRH440A aportan cables y almohadillas desmontables por casi el mismo precio. Con un presupuesto muy ajustado, los Samson SR850 dan más precisión por dólar.",
  faq_q2_es: "¿Son buenos los Sennheiser HD 560S para mezclar?",
  faq_a2_es: "Sí. Los HD 560S se usan mucho como referencia económica para mezclar gracias a su afinación lineal y honesta y su escenario abierto. Sus drivers inclinados recrean una posición de escucha real para imagen y profundidad precisas. La impedancia de 120 ohmios se maneja fácilmente desde una interfaz, aunque dejan escapar el sonido en ambas direcciones por ser abiertos, así que ten un par cerrado para grabar.",
  faq_q3_es: "¿Son mejores las MDR-7506 que los ATH-M40x?",
  faq_a3_es: "Las MDR-7506 son el clásico de transmisión más barato y probado, con un sonido algo brillante y revelador y cable fijo. Los ATH-M40x cuestan un poco más pero aportan afinación más plana y neutra, cables desmontables y chasis plegable. Elige las 7506 por el sonido clásico y el precio; elige los M40x si valoras la afinación plana y los cables reemplazables.",
  faq_q4_es: "¿Puedes mezclar profesionalmente con auriculares económicos?",
  faq_a4_es: "Sí, con verificación cuidadosa usando pistas de referencia. Todos los seis de aquí — los HD 560S, MDR-7506, ATH-M40x, ATH-R30x, SRH440A y SR850 — están afinados de forma bastante neutra y se traducen bien una vez que los conoces. El hábito que importa es verificar contra pistas de referencia que conozcas bien y comparar tu mezcla con lanzamientos comerciales en el mismo par.",
  faq_q5_es: "¿Son mejores los auriculares económicos abiertos o cerrados?",
  faq_a5_es: "Depende de tu sala y de su uso. Los abiertos como los HD 560S y los ATH-R30x dan un escenario más amplio y natural y son ideales para mezclar en una sala silenciosa, pero dejan escapar el sonido en ambas direcciones, así que no sirven para grabar. Los cerrados como las MDR-7506, los ATH-M40x y los SRH440A aíslan mejor y hacen también de auriculares de grabación. Por menos de $150, tener uno de cada tipo es asequible y práctico.",
  specs: []
};

// ---------- apply ----------
g.sections = sections;
g.conclusion = conclusion;
g.conclusion_es = conclusion_es;
g.verdict = verdict;
g.verdict_es = verdict_es;
g.productTable = productTable;
g.verdictProsCons = verdictProsCons;
g.featuredProducts = [426, 26, 198, 427, 420, 428];

// ---------- descriptions ----------
g.description = "BEST budget studio headphones under $150 (2026). Sennheiser HD 560S for mixing accuracy, MDR-7506 & SRH440A closed-backs, Samson SR850 value. See the winner, prices and full verdict before you buy.";
g.description_es = "MEJORES auriculares de estudio económicos por menos de $150 (2026). Sennheiser HD 560S para precisión en la mezcla, MDR-7506 y SRH440A cerrados, Samson SR850 por valor. Mira el ganador, precios y el veredicto completo antes de comprar.";

fs.writeFileSync(file, JSON.stringify(guides, null, 2), 'utf8');
console.log('budget-headphones restructured to 6 products. Total guides:', guides.length);
