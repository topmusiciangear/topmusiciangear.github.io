const fs = require('fs');
const fp = 'data/guides.json';
const g = JSON.parse(fs.readFileSync(fp, 'utf8'));
const arr = Array.isArray(g) ? g : g.guides;
const h = arr.find(x => x.id === 'best-acoustic-guitars-for-beginners');
if (!h) { console.log('GUIDE NOT FOUND'); process.exit(1); }

// ---------- featuredProducts ----------
h.featuredProducts = [68, 102, 315, 314, 316, 352, 460, 461, 356, 361];

// ---------- intro ----------
h.intro = "The best acoustic guitar for a beginner is one that's comfortable to hold and easy to play, so you pick it up every day. After testing the most popular beginner acoustics on the market, here are the eight worth your money in 2026 — from the ultra-budget Epiphone DR-100 up to the travel-ready Martin LX1.";
h.intro_es = "La mejor guitarra acústica para un principiante es una que sea cómoda de sostener y fácil de tocar — para que la recojas todos los días. Tras probar las acústicas para principiantes más populares del mercado, estas son las ocho que valen tu dinero en 2026 — desde la económica Epiphone DR-100 hasta la Martin LX1 pensada para viajar.";

// ---------- sections ----------
const sections = [
  {
    heading: "Fender CD-60S: The Best Budget Acoustic Guitar for Beginners",
    heading_es: "Fender CD-60S: la mejor guitarra acústica económica para principiantes",
    content: "<p><strong>The Fender CD-60S is the classic budget beginner acoustic.</strong> A solid spruce top (rare at this price) gives it a lively, balanced tone, and the mahogany back and sides add warmth. The comfortable neck profile and smaller dreadnought body make it easy for beginners to reach the frets. It stays in tune, holds up to daily practice, and sounds far better than its price suggests.",
    content_es: "<p><strong>La Fender CD-60S es la acústica económica clásica para principiantes.</strong> Una tapa sólida de abeto (rara a este precio) le da un tono vivo y equilibrado, y el fondo y los aros de caoba añaden calidez. El perfil de mástil cómodo y el cuerpo dreadnought más pequeño facilitan que los principiantes alcancen los trastes. Mantiene la afinación, aguanta la práctica diaria y suena mucho mejor de lo que sugiere su precio.",
    products: [68]
  },
  {
    heading: "Yamaha FG800: The Best Value Beginner Acoustic Guitar",
    heading_es: "Yamaha FG800: la mejor guitarra acústica en relación calidad-precio",
    content: "<p><strong>The Yamaha FG800 is widely considered the best-value acoustic guitar on the market.</strong> A solid spruce top with a scalloped bracing pattern delivers a rich, resonant tone that rivals guitars costing twice as much. The rosewood back and sides add depth and warmth. It's one of the most reliable, well-made guitars at any price — a favorite of teachers, studios, and beginners who want to grow for years without upgrading.",
    content_es: "<p><strong>La Yamaha FG800 está considerada la acústica con mejor relación calidad-precio del mercado.</strong> Una tapa sólida de abeto con refuerzos festoneados ofrece un tono rico y resonante que rivaliza con guitarras del doble de precio. El fondo y los aros de palo rosa añaden profundidad y calidez. Es una de las guitarras más fiables y bien hechas a cualquier precio — favorita de profesores, estudios y principiantes que quieren crecer durante años sin cambiar de guitarra.",
    products: [102]
  },
  {
    heading: "Yamaha FS800: The Best Beginner Acoustic for Smaller Hands",
    heading_es: "Yamaha FS800: la mejor acústica para principiantes con manos pequeñas",
    content: "<p><strong>The Yamaha FS800 gives you the same solid spruce top and scalloped bracing as the FG800 in a more compact concert body with a shorter 25-inch scale.</strong> It delivers the famous Yamaha clarity and projection with a warm, balanced voice, and it's noticeably easier to reach around — ideal for younger players, smaller hands, and fingerstyle. It's the best-value acoustic for anyone who finds a full-size dreadnought too big.",
    content_es: "<p><strong>La Yamaha FS800 te da la misma tapa sólida de abeto y el refuerzo festoneado que la FG800 en un cuerpo concierto más compacto con una escala más corta de 25 pulgadas.</strong> Ofrece la famosa claridad y proyección de Yamaha con una voz cálida y equilibrada, y es notablemente más fácil de abarcar — ideal para jugadores jóvenes, manos pequeñas y fingerstyle. Es la acústica con mejor relación calidad-precio para cualquiera que encuentre un dreadnought de tamaño completo demasiado grande.",
    products: [315]
  },
  {
    heading: "Yamaha FGX800C: The Best Electro-Acoustic for Beginners",
    heading_es: "Yamaha FGX800C: la mejor electro-acústica para principiantes",
    content: "<p><strong>The Yamaha FGX800C is the FG800 with a cutaway and a built-in System 66 preamp.</strong> You get the same solid spruce top and scalloped bracing — rich, resonant tone that improves with age — plus a tuner and 3-band EQ for plugging into amp, PA, or audio interface. It's the ideal choice if you want one guitar that works for unplugged practice and open mics or recording from day one.",
    content_es: "<p><strong>La Yamaha FGX800C es la FG800 con cutaway y preamplificador System 66 integrado.</strong> Tienes la misma tapa sólida de abeto y el refuerzo festoneado — un tono rico y resonante que mejora con la edad — más un afinador y un EQ de 3 bandas para conectarla a un amplificador, PA o interfaz de audio. Es la elección ideal si quieres una sola guitarra que funcione para la práctica sin amplificar y para micrófonos abiertos o grabación desde el primer día.",
    products: [314]
  },
  {
    heading: "Martin LX1: The Best Travel Acoustic for Beginners",
    heading_es: "Martin LX1: la mejor acústica de viaje para principiantes",
    content: "<p><strong>The Martin LX1 Little Martin squeezes a solid Sitka spruce top and the iconic Martin tone into a compact 15/16-size body with a short 23-inch scale.</strong> Mahogany-pattern HPL back and sides shrug off humidity and travel abuse, and the included gig bag makes it the ultimate take-anywhere guitar. It's the ideal companion for campfires, dorm rooms, and vacations — with a real Martin voice that sounds far bigger than its size.",
    content_es: "<p><strong>La Martin LX1 Little Martin concentra una tapa sólida de abeto Sitka y el icónico tono Martin en un cuerpo compacto de tamaño 15/16 con una escala corta de 23 pulgadas.</strong> El fondo y los aros de HPL con patrón de caoba resisten la humedad y los maltratos del viaje, y la funda incluida la convierte en la guitarra definitiva para llevar a cualquier parte. Es la compañera ideal para fogatas, dormitorios y vacaciones — con una voz Martin real que suena mucho más grande que su tamaño.",
    products: [316]
  },
  {
    heading: "Epiphone DR-100: The Best Ultra-Budget Beginner Acoustic",
    heading_es: "Epiphone DR-100: la mejor acústica de presupuesto ajustado para principiantes",
    content: "<p><strong>The Epiphone DR-100 is one of the best-selling beginner acoustics of all time — and the cheapest great-sounding option on this list.</strong> A laminated spruce top over mahogany back and sides delivers a full, resonant dreadnought voice, while Epiphone's SlimTaper neck keeps fretting easy for brand-new players. It's the perfect first guitar if you're testing the waters: affordable, dependable, and with a tone that punches well above its price.",
    content_es: "<p><strong>La Epiphone DR-100 es una de las acústicas para principiantes más vendidas de todos los tiempos — y la opción con mejor sonido más económica de esta lista.</strong> Una tapa de abeto laminado sobre fondo y aros de caoba ofrece una voz de dreadnought llena y resonante, mientras que el mástil SlimTaper de Epiphone facilita tocar a los músicos más novatos. Es la primera guitarra perfecta si estás probando el agua: asequible, fiable y con un tono que supera con creces su precio.",
    products: [461]
  },
  {
    heading: "Ibanez AW54: The Best Value Solid-Top Beginner Acoustic",
    heading_es: "Ibanez AW54: la mejor acústica de tapa sólida en relación calidad-precio",
    content: "<p><strong>The Ibanez AW54 is the most affordable way into a solid-top dreadnought.</strong> A solid okoume top over okoume back and sides delivers a warm, balanced voice, wrapped in an open-pore natural finish that shows off the grain. The comfortable nyatoh neck with a laurel fingerboard and chrome die-cast tuners keep it easy to play and quick to tune. It's a serious, grown-up acoustic that you'll genuinely enjoy improving on — for barely more than the DR-100.",
    content_es: "<p><strong>La Ibanez AW54 es la forma más asequible de entrar en un dreadnought de tapa sólida.</strong> Una tapa sólida de okume sobre fondo y aros de okume ofrece una voz cálida y equilibrada, con un acabado de poro abierto natural que luce la veta de la madera. El mástil cómodo de nyatoh con diapasón de laurel y afinadores die-cast cromados facilitan tocar y afinar. Es una acústica seria que disfrutarás mejorando — por apenas un poco más que la DR-100.",
    products: [460]
  },
  {
    heading: "Gretsch G9500 Jim Dandy: The Best Parlor Acoustic for Beginners",
    heading_es: "Gretsch G9500 Jim Dandy: la mejor acústica parlor para principiantes",
    content: "<p><strong>The Gretsch G9500 Jim Dandy is a compact parlor built on a short 24-inch scale — wonderfully easy for new players to hold and chord.</strong> Its X-braced body delivers that warm, vintage 1930s voice that's perfect for fingerstyle and blues, and the smaller body makes it a great couch or travel companion. If you want something a little different from the usual dreadnought, the Jim Dandy is a charming, budget-friendly first guitar that oozes retro style.",
    content_es: "<p><strong>La Gretsch G9500 Jim Dandy es una parlor compacta con una escala corta de 24 pulgadas — maravillosamente fácil de sostener y de hacer acordes para los nuevos músicos.</strong> Su cuerpo con refuerzo X ofrece esa voz vintage y cálida de los años 30, perfecta para fingerstyle y blues, y el cuerpo más pequeño la convierte en una gran compañera de sofá o de viaje. Si quieres algo distinto al dreadnought habitual, la Jim Dandy es una primera guitarra encantadora y asequible que desborda estilo retro.",
    products: [352]
  }
];
h.sections = sections;

// ---------- productTable ----------
const ptColumns = [
  { title: "Epiphone DR-100 Acoustic", title_es: "Epiphone DR-100 Acústica" },
  { title: "Fender CD-60S Acoustic", title_es: "Fender CD-60S Acústica" },
  { title: "Yamaha FG800 Acoustic", title_es: "Yamaha FG800 Acústica" },
  { title: "Yamaha FS800 Acoustic", title_es: "Yamaha FS800 Acústica" },
  { title: "Yamaha FGX800C", title_es: "Yamaha FGX800C" },
  { title: "Ibanez AW54 Artwood", title_es: "Ibanez AW54 Artwood" },
  { title: "Gretsch G9500 Jim Dandy", title_es: "Gretsch G9500 Jim Dandy" },
  { title: "Martin LX1 Little Martin", title_es: "Martin LX1 Little Martin" }
];

const pv = (v, es) => ({ value: v, value_es: es });

const ptRows = [
  { label: "Best For", label_es: "Ideal Para", values: [
    pv("Ultra-budget first acoustic", "Primera acústica de presupuesto ajustado"),
    pv("Budget first acoustic", "Primera acústica económica"),
    pv("Best value solid-top tone", "Mejor tono de tapa sólida en valor"),
    pv("Best for smaller hands & fingerstyle", "Mejor para manos pequeñas y fingerstyle"),
    pv("Best electro-acoustic for beginners", "Mejor electro-acústica para principiantes"),
    pv("Best value solid-top dreadnought", "Mejor dreadnought de tapa sólida en valor"),
    pv("Best parlor & retro value", "Mejor parlor y valor retro"),
    pv("Best travel & 3/4-size acoustic", "Mejor acústica de viaje y tamaño 3/4")
  ]},
  { label: "Top", label_es: "Tapa", values: [
    pv("Laminated spruce", "Abeto laminado"),
    pv("Solid spruce", "Abeto sólido"),
    pv("Solid spruce", "Abeto sólido"),
    pv("Solid spruce", "Abeto sólido"),
    pv("Solid spruce", "Abeto sólido"),
    pv("Solid okoume", "Okume sólido"),
    pv("Agathis", "Agathis"),
    pv("Solid Sitka spruce", "Abeto Sitka sólido")
  ]},
  { label: "Back & Sides", label_es: "Fondo y Aros", values: [
    pv("Mahogany", "Caoba"),
    pv("Mahogany", "Caoba"),
    pv("Rosewood", "Palo rosa"),
    pv("Nato & okoume", "Nato y okume"),
    pv("Nato & okoume", "Nato y okume"),
    pv("Okoume", "Okume"),
    pv("Agathis", "Agathis"),
    pv("Mahogany HPL", "HPL de caoba")
  ]},
  { label: "Body Shape", label_es: "Forma del Cuerpo", values: [
    pv("Dreadnought", "Dreadnought"),
    pv("Dreadnought", "Dreadnought"),
    pv("Dreadnought", "Dreadnought"),
    pv("Concert", "Concierto"),
    pv("Dreadnought cutaway", "Dreadnought cutaway"),
    pv("Dreadnought", "Dreadnought"),
    pv("Parlor", "Parlor"),
    pv("Modified 0 (15/16)", "0 modificado (15/16)")
  ]},
  { label: "Scale Length", label_es: "Longitud de Escala", values: [
    pv("25.5 in (648 mm)", "25,5\" (648 mm)"),
    pv("25.3 in (643 mm)", "25,3\" (643 mm)"),
    pv("25.6 in (650 mm)", "25,6\" (650 mm)"),
    pv("25 in (635 mm)", "25\" (635 mm)"),
    pv("25.6 in (650 mm)", "25,6\" (650 mm)"),
    pv("25.5 in (648 mm)", "25,5\" (648 mm)"),
    pv("24.1 in (612 mm)", "24,1\" (612 mm)"),
    pv("23 in (584 mm)", "23\" (584 mm)")
  ]},
  { label: "Electronics", label_es: "Electrónica", values: [
    pv("None", "Ninguna"),
    pv("None", "Ninguna"),
    pv("None", "Ninguna"),
    pv("None", "Ninguna"),
    pv("System 66", "System 66"),
    pv("None", "Ninguna"),
    pv("None", "Ninguna"),
    pv("None", "Ninguna")
  ]},
  { label: "Frets", label_es: "Trastes", values: [
    pv("20", "20"), pv("20", "20"), pv("20", "20"), pv("20", "20"),
    pv("20", "20"), pv("20", "20"), pv("18", "18"), pv("20", "20")
  ]}
];

h.productTable = {
  title: "Best Beginner Acoustic Guitars Compared",
  title_es: "Comparativa de las mejores guitarras acústicas para principiantes",
  columns: ptColumns,
  rows: ptRows
};

// ---------- verdict ----------
h.verdict = "The Yamaha FG800 is the best-value beginner acoustic of 2026 — rich solid-top tone for the money, with the FS800 matching it in a smaller body for smaller hands. The Epiphone DR-100 is the best ultra-budget first guitar and the Fender CD-60S the best budget pick. The Ibanez AW54 offers the best solid-top value if you want to spend a little more, and the Gretsch G9500 Jim Dandy is the best parlor for a retro twist. The FGX800C is the best electro-acoustic and the Martin LX1 the best travel pick.";
h.verdict_es = "La Yamaha FG800 es la acústica para principiantes con mejor relación calidad-precio de 2026 — un tono rico de tapa sólida por su precio, con la FS800 igualándola en un cuerpo más pequeño para manos pequeñas. La Epiphone DR-100 es la mejor primera guitarra de presupuesto ajustado y la Fender CD-60S la mejor económica. La Ibanez AW54 ofrece la mejor tapa sólida en valor si quieres gastar un poco más, y la Gretsch G9500 Jim Dandy es la mejor parlor para un toque retro. La FGX800C es la mejor electro-acústica y la Martin LX1 la mejor opción de viaje.";

// ---------- conclusion ----------
h.conclusion = "For a first acoustic in 2026, buy the best guitar your budget allows. The Epiphone DR-100 is the best ultra-budget pick and the Fender CD-60S the best budget all-rounder, with the Yamaha FG800 the best-value acoustic you can buy. Need a smaller body? The FS800 delivers the same value for smaller hands. Want to plug in? The FGX800C is the best electro-acoustic for beginners. The Ibanez AW54 is our favorite value solid-top dreadnought to grow on, and the Gretsch Jim Dandy is the charming parlor alternative. The Martin LX1 is the premium travel pick. Whichever you choose, budget for a professional setup — it makes any guitar play twice as well. <p><a href=\"/guides/acoustic-guitars-guide.html\" class=\"guide-link-btn\">Best Acoustic Guitars (Pro)</a> <a href=\"/guides/beginner-guitar.html\" class=\"guide-link-btn\">Best Beginner Guitars for Songwriting</a> <a href=\"/guides/best-beginner-electric-guitar.html\" class=\"guide-link-btn\">Best Electric Guitar for Beginners</a></p>";
h.conclusion_es = "Para tu primera acústica en 2026, compra la mejor guitarra que tu presupuesto permita. La Epiphone DR-100 es la mejor opción de presupuesto ajustado y la Fender CD-60S la mejor económica polivalente, con la Yamaha FG800 como la acústica con mejor relación calidad-precio que puedes comprar. ¿Necesitas un cuerpo más pequeño? La FS800 ofrece el mismo valor para manos pequeñas. ¿Quieres conectarla? La FGX800C es la mejor electro-acústica para principiantes. La Ibanez AW54 es nuestra dreadnought de tapa sólida favorita en valor para crecer con ella, y la Gretsch Jim Dandy es la encantadora alternativa parlor. La Martin LX1 es la opción premium de viaje. Elijas la que elijas, presupuesta un ajuste profesional — hace que cualquier guitarra se toque el doble de bien. <p>También te interesa: <a href=\"/guides/acoustic-guitars-guide_es.html\" class=\"guide-link-btn\">Mejores Guitarras Acústicas (Pro)</a> <a href=\"/guides/beginner-guitar_es.html\" class=\"guide-link-btn\">Mejores Guitarras para Principiantes y Composición</a> <a href=\"/guides/best-beginner-electric-guitar_es.html\" class=\"guide-link-btn\">Mejor Guitarra Eléctrica para Principiantes</a></p>";

// ---------- description ----------
h.description = "Best acoustic guitars for beginners 2026: Epiphone DR-100, Fender CD-60S, Yamaha FG800, FS800, FGX800C, Ibanez AW54, Gretsch G9500 Jim Dandy, Martin LX1. Comfortable, playable, worth the money.";
h.description_es = "Mejores guitarras acústicas para principiantes 2026: Epiphone DR-100, Fender CD-60S, Yamaha FG800, FS800, FGX800C, Ibanez AW54, Gretsch G9500 Jim Dandy, Martin LX1. Cómodas, tocables y que valen el dinero.";

// ---------- featuredSnippet updates ----------
h.featuredSnippet.text_en = "The Yamaha FG800 is the best-value beginner acoustic guitar of 2026 with its rich solid-spruce-top tone. The Fender CD-60S is the best budget pick, and the Epiphone DR-100 the best ultra-budget first guitar.";
h.featuredSnippet.text_es = "La Yamaha FG800 es la acústica para principiantes con mejor relación calidad-precio de 2026, con su rico tono de tapa sólida de abeto. La Fender CD-60S es la mejor económica y la Epiphone DR-100 la mejor primera guitarra de presupuesto ajustado.";

// FAQ answers referencing removed Taylor models -> update
h.featuredSnippet.faq_a1_en = "The Yamaha FG800 is the best-value beginner acoustic — solid spruce top tone that rivals guitars twice the price. The Fender CD-60S is the best budget pick, and the Epiphone DR-100 the best ultra-budget first guitar.";
h.featuredSnippet.faq_a1_es = "La Yamaha FG800 es la mejor en relación calidad-precio — tono de tapa sólida de abeto que rivaliza con guitarras del doble de precio. La Fender CD-60S es la mejor económica y la Epiphone DR-100 la mejor primera guitarra de presupuesto ajustado.";
h.featuredSnippet.faq_a3_en = "A solid top (FG800, AW54, CD-60S) sounds richer and improves with age — worth the extra money. Laminate tops like the DR-100 are more affordable and durable for kids or travel but sound a little thinner. Buy a solid top if you can stretch.";
h.featuredSnippet.faq_a3_es = "Una tapa sólida (FG800, AW54, CD-60S) suena más rica y mejora con la edad — vale la pena el dinero extra. Las tapas laminadas como la DR-100 son más asequibles y duraderas para niños o viajes pero suenan un poco más delgadas. Compra una tapa sólida si puedes.";
h.featuredSnippet.faq_a4_en = "A compact guitar like the Gretsch Jim Dandy (24-inch scale) or the Martin LX1 is ideal for kids, small hands, or travel. But a full-size guitar like the Yamaha FG800 is the best choice for most adult beginners.";
h.featuredSnippet.faq_a4_es = "Una guitarra compacta como la Gretsch Jim Dandy (escala de 24 pulgadas) o la Martin LX1 es ideal para niños, manos pequeñas o viajes. Pero una guitarra de tamaño completo como la Yamaha FG800 es la mejor opción para la mayoría de los principiantes adultos.";

// ---------- verdictProsCons (8) ----------
h.verdictProsCons = [
  {
    name: "Fender CD-60S Acoustic", name_es: "Fender CD-60S Acústica",
    pros: ["Solid spruce top at an affordable price", "Comfortable neck and easy-to-reach frets for beginners", "Balanced tone that suits any playing style", "Proven reliability from the world's most famous guitar brand"],
    pros_es: ["Tapa sólida de abeto a un precio asequible", "Mástil cómodo y trastes fáciles de alcanzar para principiantes", "Tono equilibrado que se adapta a cualquier estilo", "Fiabilidad probada de la marca de guitarras más famosa del mundo"],
    cons: ["Laminate mahogany back and sides sound less rich than solid wood", "Slightly heavy dreadnought body for small players", "Stock strings can feel stiff — a setup and lighter strings help", "No electronics for amplified playing"],
    cons_es: ["El fondo y los aros de caoba laminada suenan menos ricos que la madera maciza", "El cuerpo dreadnought es algo pesado para jugadores pequeños", "Las cuerdas de fábrica pueden sentirse rígidas — un ajuste y cuerdas más ligeras ayudan", "Sin electrónica para tocar amplificada"]
  },
  {
    name: "Yamaha FG800 Acoustic", name_es: "Yamaha FG800 Acústica",
    pros: ["The best-value acoustic tone on the market", "Scalloped bracing delivers surprising resonance and projection", "Rock-solid reliability — the default teacher recommendation", "Rosewood back and sides add depth and warmth"],
    pros_es: ["El mejor tono acústico en relación calidad-precio del mercado", "El refuerzo festoneado ofrece resonancia y proyección sorprendentes", "Fiabilidad sólida — la recomendación estándar de los profesores", "El fondo y los aros de palo rosa añaden profundidad y calidez"],
    cons: ["Wider neck may be a stretch for small hands", "Plain looks compared to flashier brands", "No electronics included", "Needs a setup out of the box to play its best"],
    cons_es: ["El mástil más ancho puede ser un estiramiento para manos pequeñas", "Aspecto sencillo comparado con marcas más llamativas", "Sin electrónica incluida", "Necesita un ajuste al salir de la caja para rendir al máximo"]
  },
  {
    name: "Yamaha FS800 Acoustic", name_es: "Yamaha FS800 Acústica",
    pros: ["Same solid-top Yamaha tone as the FG800", "Compact concert body suits smaller hands", "Shorter 25-inch scale makes chords easier"],
    pros_es: ["El mismo tono Yamaha de tapa sólida que la FG800", "El cuerpo concierto compacto se adapta a manos pequeñas", "La escala más corta de 25 pulgadas facilita los acordes"],
    cons: ["Slightly less bass projection than a dreadnought", "Plain looks compared to flashier brands", "No electronics included", "Needs a setup out of the box to play its best"],
    cons_es: ["Un poco menos de proyección de graves que un dreadnought", "Aspecto sencillo comparado con marcas más llamativas", "Sin electrónica incluida", "Necesita un ajuste al salir de la caja para rendir al máximo"]
  },
  {
    name: "Yamaha FGX800C", name_es: "Yamaha FGX800C",
    pros: ["FG800 tone plus cutaway and System 66 preamp", "Built-in tuner and 3-band EQ for stage and studio", "Solid spruce top that improves with age", "One guitar for acoustic and amplified playing"],
    pros_es: ["Tono FG800 más cutaway y preamplificador System 66", "Afinador integrado y EQ de 3 bandas para escenario y estudio", "Tapa sólida de abeto que mejora con la edad", "Una guitarra para tocar acústica y amplificada"],
    cons: ["Costs more than the FG800", "Electronics need a 9V battery", "Cutaway slightly reduces body resonance", "Heavier than the plain acoustic"],
    cons_es: ["Cuesta más que la FG800", "La electrónica necesita una pila de 9V", "El cutaway reduce ligeramente la resonancia del cuerpo", "Más pesada que la acústica simple"]
  },
  {
    name: "Martin LX1 Little Martin", name_es: "Martin LX1 Little Martin",
    pros: ["Real Martin tone in a compact body", "Durable HPL back and sides for travel", "Short 23-inch scale suits kids and small hands", "Includes a quality gig bag"],
    pros_es: ["Tono Martin real en un cuerpo compacto", "Fondo y aros HPL duraderos para viajar", "La escala corta de 23 pulgadas se adapta a niños y manos pequeñas", "Incluye una funda de calidad"],
    cons: ["Smaller body projects less volume", "Premium price for a travel-size guitar", "Richlite fingerboard divides opinion", "Not a full-size acoustic feel"],
    cons_es: ["El cuerpo más pequeño proyecta menos volumen", "Precio premium para una guitarra de viaje", "El diapasón de Richlite divide opiniones", "No es la sensación de una acústica de tamaño completo"]
  },
  {
    name: "Epiphone DR-100 Acoustic", name_es: "Epiphone DR-100 Acústica",
    pros: ["The most affordable great-sounding acoustic here", "SlimTaper neck is very comfortable for new players", "Full dreadnought voice that punches above its price", "Tried-and-true value from a classic brand"],
    pros_es: ["La acústica con mejor sonido más asequible de aquí", "El mástil SlimTaper es muy cómodo para nuevos músicos", "Voz de dreadnought completa que supera su precio", "Valor probado de una marca clásica"],
    cons: ["Laminated top sounds a little less rich than solid wood", "No electronics for amplified playing", "Stock setup can benefit from a professional adjustment"],
    cons_es: ["La tapa laminada suena un poco menos rica que la madera maciza", "Sin electrónica para tocar amplificada", "El ajuste de fábrica puede beneficiarse de un ajuste profesional"]
  },
  {
    name: "Ibanez AW54 Artwood", name_es: "Ibanez AW54 Artwood",
    pros: ["Affordable solid okoume top for real resonance", "Open-pore natural finish shows off the wood grain", "Comfortable nyatoh neck and laurel fingerboard", "Great value for players who want to grow"],
    pros_es: ["Tapa sólida de okume asequible para resonancia real", "Acabado de poro abierto natural que luce la veta", "Mástil cómodo de nyatoh y diapasón de laurel", "Gran valor para jugadores que quieren crecer"],
    cons: ["No electronics for amplified playing", "Needs a setup out of the box to play its best", "Less-known brand for beginners than Fender or Yamaha"],
    cons_es: ["Sin electrónica para tocar amplificada", "Necesita un ajuste al salir de la caja para rendir al máximo", "Marca menos conocida para principiantes que Fender o Yamaha"]
  },
  {
    name: "Gretsch G9500 Jim Dandy", name_es: "Gretsch G9500 Jim Dandy",
    pros: ["Compact parlor with a short 24-inch scale", "Warm, vintage 1930s voice great for fingerstyle", "Comfortable and easy to hold for new players", "Affordable retro style that stands out"],
    pros_es: ["Parlor compacta con escala corta de 24 pulgadas", "Voz vintage cálida de los años 30 ideal para fingerstyle", "Cómoda y fácil de sostener para nuevos músicos", "Estilo retro asequible que destaca"],
    cons: ["Smaller body projects less volume than a dreadnought", "Not ideal for heavy strumming at higher volume", "Less common than a full-size acoustic"],
    cons_es: ["El cuerpo más pequeño proyecta menos volumen que un dreadnought", "No es ideal para rasgueos fuertes a alto volumen", "Menos habitual que una acústica de tamaño completo"]
  }
];

fs.writeFileSync(fp, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('guide rewritten OK');
