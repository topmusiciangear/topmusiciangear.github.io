const fs = require('fs');
const path = require('path');
const dir = __dirname;

const productsPath = path.join(dir, 'data', 'products.json');
const guidesPath = path.join(dir, 'data', 'guides.json');

// ============ PRODUCTS: id=24 HD 600 -> HD 490 Pro Plus ============
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
const prod = products.find(p => p.id === 24);
if (!prod) { console.error('product 24 not found'); process.exit(1); }

prod.title = 'Sennheiser HD 490 Pro Plus';
prod.title_es = 'Sennheiser HD 490 Pro Plus';
prod.brand = 'Sennheiser';
prod.category = 'headphones';
prod.price = 499;
prod.rating = 4.6;
prod.reviews = 164;
prod.badge = 'premium';
prod.desc = 'Modern open-back reference for mixing. Ultra-precise 38mm drivers, wide dimensional soundstage, switchable mixing/producing ear pads, and the dearVR MIX-SE plugin for confident mix translation.';
prod.desc_es = 'Referencia abierta moderna para mezcla. Drivers de 38mm ultraprecisos, escenario sonoro amplio y dimensional, almohadillas intercambiables de mezcla/producci\u00f3n y el plugin dearVR MIX-SE para una traducci\u00f3n de mezcla segura.';
prod.img = 'https://r2.gear4music.com/media/102/1028202/1200/preview.jpg';
prod.stores = {
  'musicstore': 'https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=https%3A%2F%2Fwww.musicstore.com%2Fen_OE%2FEUR%2FSennheiser-HD-490-Pro-Plus%2Fart-REC0016605-000',
  'gear4music': 'https://www.gear4music.com/Recording-and-Computers/Sennheiser-HD-490-Pro-Plus-Open-Back-Headphones/62YL',
  'amazon': 'https://www.amazon.com/dp/B0CP6B497Z'
};
fs.writeFileSync(productsPath, JSON.stringify(products, null, 2), 'utf8');
console.log('products.json updated: id=24 -> HD 490 Pro Plus');

// ============ GUIDES ============
let guides = JSON.parse(fs.readFileSync(guidesPath, 'utf8'));

// ---- helper: rename the comparison guide and rewrite it ----
function findGuide(id) { return guides.find(g => g.id === id); }
const cmp = findGuide('hd600-vs-dt990');
if (!cmp) { console.error('guide hd600-vs-dt990 not found'); process.exit(1); }

// new image for HD 490 Pro Plus
const NEW_IMG = 'https://r2.gear4music.com/media/102/1028202/1200/preview.jpg';

// ---- 1) comparison guide: hd600-vs-dt990 -> hd490-pro-vs-dt990 ----
cmp.id = 'hd490-pro-vs-dt990';
cmp.title = 'HD 490 Pro vs DT 990 Pro: Open-Back for Mixing?';
cmp.title_es = 'HD 490 Pro vs DT 990 Pro: \u00bfAbiertos para Mezclar?';
cmp.badge = 'bestSeller';
cmp.image = NEW_IMG;
cmp.intro = 'The Sennheiser HD 490 Pro Plus and Beyerdynamic DT 990 Pro are two of the most capable open-back headphones for mixing.';
cmp.intro_es = 'Los Sennheiser HD 490 Pro Plus y Beyerdynamic DT 990 Pro son dos de los auriculares abiertos m\u00e1s capaces para mezclar.';

cmp.sections[0].heading = 'Is the HD 490 Pro Plus the Best for Reference Mixing?';
cmp.sections[0].heading_es = '\u00bfEs el HD 490 Pro Plus el Mejor para Mezcla de Referencia?';
cmp.sections[0].content = '<p><strong>The HD 490 Pro Plus is the modern successor every mixing engineer has been waiting for: a neutral, uncolored reference that finally fixes the old 300-ohm low-end complaint.</strong> Its 130-ohm impedance drives easily from an audio interface, laptop, or phone while its low-frequency cylinder system delivers the deepest, most defined bass of any Sennheiser open-back under $500. The midrange stays honest \u2014 vocals, guitars, and strings sound lifelike with realism that rivals headphones costing twice as much. Two switchable ear pad sets (mixing and producing) let you tune the presentation to the job, and the included dearVR MIX-SE plugin adds a virtual room reference for translation checks.</p>';
cmp.sections[0].content_es = '<p><strong>El HD 490 Pro Plus es el sucesor moderno que todo ingeniero de mezcla esperaba: una referencia neutra y sin coloraci\u00f3n que por fin arregla la antigua queja de graves de los 300 ohmios.</strong> Su impedancia de 130 ohmios se maneja f\u00e1cil desde una interfaz de audio, laptop o tel\u00e9fono, mientras que su sistema de cilindro de baja frecuencia ofrece los graves m\u00e1s profundos y definidos de cualquier Sennheiser abierto por menos de $500. El rango medio sigue siendo honesto \u2014 las voces, guitarras y cuerdas suenan realistas con un realismo que rivaliza con auriculares del doble de precio. Dos juegos de almohadillas intercambiables (mezcla y producci\u00f3n) te permiten ajustar la presentaci\u00f3n al trabajo, y el plugin dearVR MIX-SE incluido a\u00f1ade una referencia de sala virtual para comprobar la traducci\u00f3n.</p>';

cmp.sections[2].heading = 'Which Is Better for Mix Translation \u2014 Neutral or Exciting?';
cmp.sections[2].heading_es = '\u00bfQu\u00e9 Es Mejor para la Traducci\u00f3n de Mezcla \u2014 Neutral o Emocionante?';
cmp.sections[2].content = '<p><strong>The HD 490 Pro Plus reveals exactly what is in the track for perfect mix translation, while the DT 990 Pro\u0027s V-shaped sound requires learning its signature to avoid mix errors.</strong> With the HD 490 Pro Plus, you hear exactly what is in the track. Mixes made on them translate beautifully because you are not compensating for coloration \u2014 and at 130 ohms they reach full level from an interface, unlike the 300-ohm classics. With the DT 990 Pro, you must learn its sound signature or risk mixes with too much bass or too little treble from compensating for the boosted response. However, the DT 990\u0027s extended treble is excellent for spotting sibilance, and its soundstage is noticeably wider than the HD 490 Pro Plus\u0027 more intimate presentation. Many engineers use both: DT 990 for tracking and editing, HD 490 Pro Plus for final mix decisions.</p>';
cmp.sections[2].content_es = '<p><strong>Los HD 490 Pro Plus revelan exactamente lo que hay en la pista para una traducci\u00f3n perfecta de la mezcla, mientras que el sonido en forma de V de los DT 990 Pro requiere aprender su firma sonora para evitar errores de mezcla.</strong> Con los HD 490 Pro Plus, escuchas exactamente lo que hay en la pista. Las mezclas hechas con ellos se traducen maravillosamente porque no est\u00e1s compensando la coloraci\u00f3n \u2014 y a 130 ohmios alcanzan su nivel completo desde una interfaz, a diferencia de los cl\u00e1sicos de 300 ohmios. Con los DT 990 Pro, debes aprender su firma sonora o arriesgarte a mezclas con demasiados graves o muy pocos agudos por compensar la respuesta potenciada. Sin embargo, los agudos extendidos de los DT 990 son excelentes para detectar sibilancias, y su escenario sonoro es notablemente m\u00e1s amplio que la presentaci\u00f3n m\u00e1s \u00edntima de los HD 490 Pro Plus. Muchos ingenieros usan ambos: DT 990 para grabar y editar, HD 490 Pro Plus para decisiones finales de mezcla.</p>';

cmp.sections[3].heading = 'Which Open-Back Wins: HD 490 Pro vs DT 990 Pro for Mixing?';
cmp.sections[3].heading_es = 'Cu\u00e1l Gana: HD 490 Pro vs DT 990 Pro para Mezclar';
cmp.sections[3].content = '<p><strong>For pure mixing accuracy, the Sennheiser HD 490 Pro Plus is the better tool.</strong> Its neutral response means you can trust what you hear, and its low impedance means it works from any interface. Every professional engineer should own a pair. The Beyerdynamic DT 990 Pro excels for tracking, editing, and long sessions where comfortable velour pads and exciting sound reduce fatigue. If you can only buy one, get the HD 490 Pro Plus if you mix, and the DT 990 if you track. Better yet, own both \u2014 they complement each other perfectly as the yin and yang of open-back headphones.</p> <p>Compare the HD 490 Pro Plus and DT 990 Pro against other studio staples in our <a href="/guides/best-headphones.html">best studio headphones guide</a>. For long listening sessions at the mix position, both keep their composure hour after hour.</p>';
cmp.sections[3].content_es = '<p><strong>Para precisi\u00f3n de mezcla pura, los Sennheiser HD 490 Pro Plus son la mejor herramienta.</strong> Su respuesta neutra significa que puedes confiar en lo que escuchas, y su baja impedancia significa que funciona desde cualquier interfaz. Todo ingeniero profesional deber\u00eda tener un par. Los Beyerdynamic DT 990 Pro sobresalen para grabaci\u00f3n, edici\u00f3n y sesiones largas donde las almohadillas de velour c\u00f3modas y el sonido emocionante reducen la fatiga. Si solo puedes comprar uno, elige los HD 490 Pro Plus si mezclas, y los DT 990 si grabas. Mejor a\u00fan, ten ambos: se complementan perfectamente como el yin y el yang de los auriculares abiertos.</p> <p>Compara el HD 490 Pro Plus y el DT 990 Pro con otros cl\u00e1sicos de estudio en nuestra <a href="/guides/best-headphones_es.html">gu\u00eda de los mejores auriculares de estudio</a>. Para sesiones largas de escucha en la posici\u00f3n de mezcla, ambos mantienen la calma hora tras hora.</p>';

cmp.conclusion = 'The HD 490 Pro Plus gives you the unvarnished truth \u2014 the modern scalpel of critical listening, now with real low end and easy-to-drive 130-ohm impedance. The DT 990 Pro gives spacious, exciting sound \u2014 the sledgehammer of high-detail editing. Own both if you can. <p>You may also like: <a href="/guides/best-headphones.html">Best Studio Headphones for Mixing & Tracking</a>, <a href="/guides/open-headphones.html">Best Open-Back Headphones for Mixing</a>, and <a href="/guides/dt770-vs-dt990.html">DT 770 Pro vs DT 990 Pro</a>.</p>';
cmp.conclusion_es = 'Los HD 490 Pro Plus te dan la verdad sin adornos: el bistur\u00ed moderno de la escucha cr\u00edtica, ahora con graves reales e impedancia de 130 ohmios f\u00e1cil de alimentar. Los DT 990 Pro te dan un sonido espacioso y emocionante: el mazo de la edici\u00f3n de alto detalle. Ten ambos si puedes. <p>Tambi\u00e9n te puede interesar: <a href="/guides/best-headphones_es.html">Mejores Auriculares de Estudio para Mezcla y Seguimiento</a>, <a href="/guides/open-headphones_es.html">Mejores Auriculares Abiertos para Mezcla</a> y <a href="/guides/dt770-vs-dt990_es.html">DT 770 Pro vs DT 990 Pro</a>.</p>';
cmp.verdict = 'HD 490 Pro Plus for reference mixing accuracy. DT 990 Pro for tracking comfort and detailed editing.';
cmp.verdict_es = 'HD 490 Pro Plus para precisi\u00f3n de mezcla de referencia. DT 990 Pro para comodidad de grabaci\u00f3n y edici\u00f3n detallada.';
cmp.description = 'I check every mix on both. The HD 490 Pro Plus is the modern reference, the DT 990 is the excavator \u2014 together they catch what speakers miss.';
cmp.description_es = 'Reviso cada mezcla en ambos. El HD 490 Pro Plus es la referencia moderna, el DT 990 la excavadora \u2014 juntos atrapan lo que los altavoces pierden.';

// featuredSnippet
const fs2 = cmp.featuredSnippet;
fs2.title_en = 'Sennheiser HD 490 Pro Plus vs Beyerdynamic DT 990 Pro: Which One Should You Choose?';
fs2.text_en = 'The Sennheiser HD 490 Pro Plus is the modern reference for critical mixing: neutral response, deep bass, 130-ohm ease, and dearVR MIX-SE included. The Beyerdynamic DT 990 Pro is the top open-back value with an exciting V-shape and treble energy.';
fs2.name1_en = 'Sennheiser HD 490 Pro Plus';
fs2.price1 = '499';
fs2.key1 = 'The Modern Reference Standard with Real Low End';
fs2.best1_en = 'Critical mixing reference';
fs2.rating1 = 4.6;
fs2.faq_q1_en = 'I mix mostly on headphones at night \u2014 do I want the accurate HD 490 Pro Plus or the detail-revealing DT 990 for catching problems?';
fs2.faq_a1_en = 'Buy the HD 490 Pro Plus ($499) for critical mixing: its neutral, natural frequency response shows the truth without coloration, it drives from any interface at 130 ohms, and its deep low end means you can trust bass decisions. Buy the DT 990 Pro ($169) if you want a bigger, more exciting open-back sound with strong treble detail on a budget.';
fs2.faq_q2_en = 'What is the difference between the HD 490 Pro Plus and the DT 990 Pro?';
fs2.faq_a2_en = 'The HD 490 Pro Plus ($499) has a neutral, natural response with a legendary midrange, the deepest bass of any Sennheiser open-back under $500, 130-ohm ease, and two switchable ear pad sets. The DT 990 Pro ($169) has a V-shaped response with boosted bass and treble, a wider soundstage and more energy, but its treble peak can fool you into cutting highs that are fine. The 490 is honest; the 990 is exciting.';
fs2.specs = [
  { label_es: 'Tipo', label_en: 'Type', val1: 'Open-back', val2: 'Open-back' },
  { label_es: 'Respuesta de Frecuencia', label_en: 'Frequency Response', val1: '5 Hz \u2013 36 kHz', val2: '5 Hz \u2013 35 kHz' },
  { label_es: 'Impedancia', label_en: 'Impedance', val1: '130 \u03a9', val2: '80 / 250 \u03a9' },
  { label_es: 'Driver', label_en: 'Driver', val1: '38 mm dynamic', val2: '45 mm dynamic' },
  { label_es: 'SPL', label_en: 'SPL', val1: '105 dB', val2: '96 dB' }
];
fs2.title_es = 'Sennheiser HD 490 Pro Plus vs Beyerdynamic DT 990 Pro: \u00bfCu\u00e1l deber\u00edas elegir?';
fs2.text_es = 'Los Sennheiser HD 490 Pro Plus son la referencia moderna para mezcla cr\u00edtica: respuesta neutra, graves profundos, 130 ohmios y dearVR MIX-SE incluido. Los Beyerdynamic DT 990 Pro son los mejores abiertos econ\u00f3micos con sonido en forma de V.';
fs2.name1_es = 'Sennheiser HD 490 Pro Plus';
fs2.best1_es = 'Mezcla de referencia y precisi\u00f3n neutra';
fs2.key1_es = 'La Referencia Moderna con Graves Reales';
fs2.faq_q1_es = 'Mezclo sobre todo con auriculares de noche \u2014 \u00bfquiero el preciso HD 490 Pro Plus o el DT 990 que revela detalles para cazar problemas?';
fs2.faq_a1_es = 'Compra las HD 490 Pro Plus ($499) para mezcla cr\u00edtica: su respuesta neutra y natural muestra la verdad sin coloraci\u00f3n, funcionan desde cualquier interfaz a 130 ohmios y sus graves profundos significan que puedes confiar en las decisiones de bajos. Compra las DT 990 Pro ($169) si quieres un sonido abierto m\u00e1s grande y emocionante con gran detalle en agudos a buen precio.';
fs2.faq_q2_es = '\u00bfCu\u00e1l es la diferencia entre las HD 490 Pro Plus y las DT 990 Pro?';
fs2.faq_a2_es = 'Las HD 490 Pro Plus ($499) tienen una respuesta neutra y natural con una gama media legendaria, los graves m\u00e1s profundos de cualquier Sennheiser abierto por menos de $500, facilidad de 130 ohmios y dos juegos de almohadillas intercambiables. Las DT 990 Pro ($169) tienen respuesta en V con graves y agudos potenciados, escenario m\u00e1s amplio y m\u00e1s energ\u00eda, pero su pico de agudos puede enga\u00f1arte para cortar altos que est\u00e1n bien. Las 490 son honestas; las 990 son emocionantes.';
fs2.faq_q3_en = 'Do the HD 490 Pro Plus or the DT 990 Pro need a headphone amplifier?';
fs2.faq_a3_en = 'No \u2014 and that is the HD 490 Pro Plus\u0027 biggest advantage over the old 300-ohm classics. At 130 ohms with 105 dB sensitivity, it reaches full level from any audio interface, laptop, or even a phone. The DT 990 Pro ($169) comes in 250-ohm (and 32-ohm) versions \u2014 the 250-ohm benefits from a headphone amp or a strong interface output. Neither is ideal straight from a phone, but the 490 is far easier to drive.';
fs2.faq_q4_en = 'Is the HD 490 Pro Plus worth $330 more than the DT 990 Pro for mixing?';
fs2.faq_a4_en = 'If critical mixing is your main use and you want real low end plus modern build, yes. The HD 490 Pro Plus ($499) has a neutral, natural response that shows you the truth with no coloration, deep defined bass, and far less fatigue on long sessions than the bright DT 990 Pro ($169). The 990 has a bigger soundstage and more treble detail, but that peak can fool you into cutting highs that are fine. Buy the 490 for reference mixing; buy the 990 if you want a bigger, more exciting sound on a budget.';
fs2.faq_q5_en = 'Which headphones have better midrange accuracy for vocal mixing?';
fs2.faq_a5_en = 'The Sennheiser HD 490 Pro Plus is renowned for its neutral, natural midrange reproduction, making it the modern gold standard for vocal mixing and acoustic music. The Beyerdynamic DT 990 Pro has a V-shaped frequency response with boosted bass and treble that can mask midrange detail. For vocal work, HD 490 Pro Plus wins.';
fs2.faq_q3_es = '\u00bfNecesitan las HD 490 Pro Plus o las DT 990 Pro un amplificador de auriculares?';
fs2.faq_a3_es = 'No \u2014 y esa es la mayor ventaja de las HD 490 Pro Plus sobre los cl\u00e1sicos de 300 ohmios. A 130 ohmios con sensibilidad de 105 dB, alcanzan su nivel completo desde cualquier interfaz de audio, laptop o incluso un tel\u00e9fono. Las DT 990 Pro ($169) vienen en versiones de 250 ohm (y 32 ohm) \u2014 la de 250 ohm se beneficia de un amplificador de auriculares o una salida de interfaz potente. Ninguna es ideal directa a un m\u00f3vil, pero las 490 son mucho m\u00e1s f\u00e1ciles de alimentar.';
fs2.faq_q4_es = '\u00bfMerecen las HD 490 Pro Plus $330 m\u00e1s que las DT 990 Pro para mezclar?';
fs2.faq_a4_es = 'Si tu uso principal es mezcla cr\u00edtica y quieres graves reales adem\u00e1s de construcci\u00f3n moderna, s\u00ed. Las HD 490 Pro Plus ($499) tienen una respuesta neutra y natural que muestra la verdad sin color, graves profundos y definidos, y son mucho menos cansadas en sesiones largas que las brillantes DT 990 Pro ($169). Las 990 tienen un escenario m\u00e1s grande y m\u00e1s detalle en agudos, pero ese pico puede enga\u00f1arte para cortar altos que est\u00e1n bien. Compra las 490 para mezcla de referencia; compra las 990 si quieres un sonido m\u00e1s grande y emocionante con presupuesto ajustado.';
fs2.faq_q5_es = '\u00bfQu\u00e9 auriculares tienen mejor precisi\u00f3n en medios para mezcla vocal?';
fs2.faq_a5_es = 'Los Sennheiser HD 490 Pro Plus son reconocidos por su reproducci\u00f3n neutral de medios, el est\u00e1ndar moderno para mezcla vocal y m\u00fasica ac\u00fastica. Los Beyerdynamic DT 990 Pro tienen respuesta en V con graves y agudos potenciados que pueden enmascarar detalles. Para voces, HD 490 Pro Plus gana.';

// verdictProsCons
cmp.verdictProsCons[0].name = 'Sennheiser HD 490 Pro Plus';
cmp.verdictProsCons[0].name_es = 'Sennheiser HD 490 Pro Plus';
cmp.verdictProsCons[0].pros = [
  'Modern reference neutrality with the deepest, most defined bass of any Sennheiser open-back under $500',
  '130-ohm impedance drives easily from any interface, laptop, or phone \u2014 no amp required',
  'Two switchable ear pad sets (mixing + producing) tune the sound to the job',
  'Washable, replaceable pads and open-frame architecture keep THD under 0.2%',
  'Includes dearVR MIX-SE plugin for virtual-room mix translation checks'
];
cmp.verdictProsCons[0].pros_es = [
  'Neutralidad de referencia moderna con los graves m\u00e1s profundos y definidos de cualquier Sennheiser abierto por menos de $500',
  'Impedancia de 130 ohmios que funciona desde cualquier interfaz, laptop o tel\u00e9fono \u2014 sin amplificador',
  'Dos juegos de almohadillas intercambiables (mezcla + producci\u00f3n) ajustan el sonido al trabajo',
  'Almohadillas lavables y reemplazables y arquitectura de marco abierto mantienen el THD bajo 0.2%',
  'Incluye el plugin dearVR MIX-SE para comprobar la traducci\u00f3n de mezcla en sala virtual'
];
cmp.verdictProsCons[0].cons = [
  'Open-back leaks sound \u2014 unusable while recording vocals with a live microphone',
  '$499 \u2014 a real spend versus the $169 DT 990 Pro',
  'Needs a quiet room to get the full benefit of the open design'
];
cmp.verdictProsCons[0].cons_es = [
  'Abiertos, fugan sonido \u2014 inutilizables al grabar voces con un micr\u00f3fono activo',
  '$499 \u2014 un gasto real frente a las DT 990 Pro de $169',
  'Necesitan una habitaci\u00f3n silenciosa para aprovechar el dise\u00f1o abierto'
];

console.log('comparison guide rewritten ->', cmp.id);

// ---- 2) best-headphones: sec 2 + related text ----
const bh = findGuide('best-headphones');
bh.sections[2].heading = 'Is the Sennheiser HD 490 Pro Plus the Best Headphones for Studio Monitoring and Mixing?';
bh.sections[2].heading_es = '\u00bfEs el Sennheiser HD 490 Pro Plus el Mejor Auricular para Monitoreo y Mezcla de Estudio?';
bh.sections[2].content = '<strong>If you\u0027re mixing, you need an open-back reference. </strong>The HD 490 Pro Plus is the most natural, neutral open-back reference under $1,000 \u2014 and now with real low end. No boosted bass, no hyped highs \u2014 just truth, and at 130 ohms it drives from any interface. I\u0027ve A/B\u0027d these against $3,000 headphones and the HD 490 Pro Plus holds its own. They reveal what your mix actually sounds like, and that\u0027s exactly what you want when making decisions.';
bh.sections[2].content_es = '<strong>Si est\u00e1s mezclando, necesitas una referencia abierta. </strong>Los HD 490 Pro Plus son la referencia abierta m\u00e1s natural y neutra por menos de $1,000 \u2014 y ahora con graves reales. Sin graves exagerados, sin agudos artificiales \u2014 solo verdad, y a 130 ohmios funcionan desde cualquier interfaz. Los he comparado con auriculares de $3,000 y los HD 490 Pro Plus se mantienen firmes. Revelan c\u00f3mo suena realmente tu mezcla, y eso es exactamente lo que quieres al tomar decisiones.';

bh.conclusion = 'Need one pair for everything? Get the DT 770 Pro. Mixing only? HD 490 Pro Plus. Starting out? ATH-M50x. Budget? MDR-7506. Each has its strengths depending on the job. If I could only keep one, it\u0027d be the HD 490 Pro Plus \u2014 but that\u0027s because I mix more than I track. <p>For more headphone guides, see our <a href="/guides/open-headphones.html">best open-back headphones guide</a>, <a href="/guides/budget-headphones.html">budget headphones guide</a>, <a href="/guides/tracking-headphones.html">tracking headphones guide</a>, and our <a href="/guides/dt770-vs-dt990.html">DT 770 vs DT 990 comparison</a>.</p>';
bh.conclusion_es = '\u00bfNecesitas un par para todo? Consigue los DT 770 Pro. \u00bfSolo mezcla? HD 490 Pro Plus. \u00bfEmpezando? ATH-M50x. \u00bfPresupuesto? MDR-7506. Tengo los cuatro y uso diferentes seg\u00fan el trabajo. Si solo pudiera quedarme con uno, ser\u00eda el HD 490 Pro Plus \u2014 pero es porque mezclo m\u00e1s de lo que grabo. <p>Para m\u00e1s gu\u00edas de auriculares, consulta nuestra <a href="/guides/open-headphones_es.html">gu\u00eda de auriculares abiertos</a>, <a href="/guides/budget-headphones_es.html">gu\u00eda de auriculares econ\u00f3micos</a>, <a href="/guides/tracking-headphones_es.html">gu\u00eda de auriculares de grabaci\u00f3n</a>, y nuestra <a href="/guides/dt770-vs-dt990_es.html">comparativa DT 770 vs DT 990</a>.</p> <p>Tambi\u00e9n te puede interesar: <a href="/guides/budget-headphones_es.html">Mejores Auriculares de Estudio Econ\u00f3micos por Menos de $150</a>, <a href="/guides/open-headphones_es.html">Mejores Auriculares Abiertos para Mezcla</a> y <a href="/guides/tracking-headphones_es.html">Mejores Auriculares Cerrados para Mezcla y Grabaci\u00f3n</a>.</p>';
bh.verdict = 'DT 770 Pro for versatility, HD 490 Pro Plus for mixing';
bh.verdict_es = 'DT 770 Pro para versatilidad, HD 490 Pro Plus para mezcla';
bh.description = 'BEST studio headphones for mixing & monitoring 2026. DT 770 vs HD 490 Pro Plus vs ATH-M50x compared. See which wins. Best pick: DT 770 Pro.';
bh.description_es = 'Los MEJORES auriculares de estudio 2026. DT 770 vs HD 490 Pro Plus vs ATH-M50x comparados. \u00bfCu\u00e1l es el tuyo? Mejor compra: DT 770 Pro.';

// productTable: replace HD 600 column
if (bh.productTable && bh.productTable.columns) {
  bh.productTable.columns = bh.productTable.columns.map(c => {
    if ((c.title || '').includes('HD 600')) { c.title = 'Sennheiser HD 490 Pro Plus'; c.title_es = 'Sennheiser HD 490 Pro Plus'; }
    return c;
  });
  bh.productTable.rows.forEach(r => {
    if (r.values && Array.isArray(r.values) && r.values.length === bh.productTable.columns.length) {
      // index 1 is HD600 column
      const i = bh.productTable.columns.findIndex(c => c.title === 'Sennheiser HD 490 Pro Plus');
      if (i >= 0 && r.values[i]) {
        const map = {
          'Best For': { value: 'Modern reference mixing', value_es: 'Mezcla de referencia moderna' },
          'Type': { value: 'Open-back', value_es: 'Abiertos' },
          'Driver Size': { value: '38mm', value_es: '38mm' },
          'Impedance': { value: '130 \u03a9', value_es: '130 \u03a9' },
          'Sensitivity': { value: '105 dB', value_es: '105 dB' },
          'Frequency Response': { value: '5 Hz \u2013 36 kHz', value_es: '5 Hz \u2013 36 kHz' },
          'Cable': { value: 'Detachable (2 included)', value_es: 'Desmontable (2 incluidos)' },
          'Weight': { value: '260 g', value_es: '260 g' },
          'Price': { value: '$499', value_es: '$499' }
        };
        if (map[r.label]) { r.values[i].value = map[r.label].value; r.values[i].value_es = map[r.label].value_es; }
      }
    }
  });
  console.log('best-headphones productTable updated');
}

// featuredSnippet faqs
if (bh.featuredSnippet) {
  const f = bh.featuredSnippet;
  f.faq_q2_en = 'Are the Sennheiser HD 490 Pro Plus the best open-back headphones for mixing?';
  f.faq_a2_en = 'For critical mixing, yes. The Sennheiser HD 490 Pro Plus ($499) has a natural, neutral frequency response, deep defined low end, and 130-ohm ease that make it the modern reference standard for critical listening \u2014 no coloration, no flattering, just the truth. Its open-back design sounds open and honest, and the included dearVR MIX-SE plugin adds a virtual-room check.';
  f.faq_q2_es = '\u00bfSon los Sennheiser HD 490 Pro Plus los mejores auriculares abiertos para mezclar?';
  f.faq_a2_es = 'Para mezcla cr\u00edtica, s\u00ed. Los Sennheiser HD 490 Pro Plus ($499) tienen una respuesta en frecuencia natural y neutra, graves profundos y definidos y facilidad de 130 ohmios que los convierten en el est\u00e1ndar de referencia moderno para escucha cr\u00edtica \u2014 sin color, sin halagos, solo la verdad. Su dise\u00f1o abierto suena amplio y honesto, y el plugin dearVR MIX-SE incluido a\u00f1ade una comprobaci\u00f3n en sala virtual.';
  f.faq_a5_en = 'They are excellent for detail, with a caveat. The Beyerdynamic DT 990 Pro ($169) has an expansive open-back soundstage and detailed treble, ideal for hearing reverb tails, sibilance and high-frequency detail. The same boosted treble can feel fatiguing on long sessions and can tempt you to cut highs that are actually fine. Great for surgical listening; pair them with a reference like the HD 490 Pro Plus if you want to double-check.';
  f.faq_a5_es = 'Son excelentes para el detalle, con un matiz. Las Beyerdynamic DT 990 Pro ($169) tienen un escenario abierto expansivo y agudos detallados, ideales para o\u00edr colas de reverb, sibilancia y detalle en altas frecuencias. Esos mismos agudos realzados pueden cansar en sesiones largas y tentarte a cortar frecuencias que en realidad est\u00e1n bien. Geniales para escucha quir\u00fargica; acomp\u00e1\u00f1alas de una referencia como la HD 490 Pro Plus para verificar.';
}

// verdictProsCons
bh.verdictProsCons.forEach(v => {
  if ((v.name || '').includes('HD 600')) {
    v.name = 'Sennheiser HD 490 Pro Plus'; v.name_es = 'Sennheiser HD 490 Pro Plus';
    v.pros = [
      'One of the most natural, neutral open-back references under $1,000 \u2014 now with real, defined low end',
      'A/B tested against $3,000 headphones and holds its own',
      'Open-back wide soundstage \u2014 panned instruments sound like distinct 3D objects',
      '130-ohm impedance drives from any interface \u2014 no amp required'
    ];
    v.pros_es = [
      'Una de las referencias abiertas m\u00e1s naturales y neutras por menos de $1,000 \u2014 ahora con graves reales y definidos',
      'Comparados contra auriculares de $3,000 y aguantan el tipo',
      'Escenario abierto y amplio \u2014 los instrumentos paneados suenan como objetos 3D distintos',
      'Impedancia de 130 ohmios que funciona desde cualquier interfaz \u2014 sin amplificador'
    ];
    v.cons = [
      'Open-back leaks sound \u2014 unusable while recording vocals with a live microphone',
      '$499 \u2014 premium price, though it replaces the need for a dedicated headphone amp',
      'Needs a quiet room to get the full benefit of the open design'
    ];
    v.cons_es = [
      'Abiertos, fugan sonido \u2014 inutilizables al grabar voces con un micr\u00f3fono activo',
      '$499 \u2014 precio premium, aunque elimina la necesidad de un amplificador dedicado',
      'Necesitan una habitaci\u00f3n silenciosa para aprovechar el dise\u00f1o abierto'
    ];
  }
});

// ---- 3) open-headphones: sec 1 + related ----
const oh = findGuide('open-headphones');
oh.image = NEW_IMG;
oh.sections[1].heading = 'Is the Sennheiser HD 490 Pro Plus the Best Headphones for Studio Monitoring and Mixing?';
oh.sections[1].heading_es = '\u00bfEs el Sennheiser HD 490 Pro Plus el Mejor Auricular para Monitoreo y Mezcla de Estudio?';
oh.sections[1].content = '<strong>The Sennheiser HD 490 Pro Plus is the modern successor to the HD 600 reference line \u2014 the neutral, translation-friendly open-back, now with real low end and easy-to-drive 130-ohm impedance. </strong>The frequency response is so neutral that mixes translate perfectly across different systems \u2014 studio monitors, car stereos, laptop speakers, and earbuds. There\u0027s no hyped bass to fool you into thinking your low end is bigger than it is, and no scooped mids to hide problems in the 500Hz to 2kHz range where most vocal and guitar energy lives. For pure mixing accuracy, the HD 490 Pro Plus holds its ground against headphones costing far more. The open-back design gives you a wide, natural soundstage that closed-back headphones simply cannot replicate \u2014 pan a guitar hard left and a piano hard right and they sound like distinct, three-dimensional objects in space. The two switchable ear pad sets (mixing and producing) tune the sound to the task, and the included dearVR MIX-SE plugin adds a virtual-room check for translation. If you want to know what your mix actually sounds like before you release it to the world, start here. The HD 490 Pro Plus doesn\u0027t flatter your mix \u2014 it reveals it.';
oh.sections[1].content_es = '<strong>Los Sennheiser HD 490 Pro Plus son el sucesor moderno de la l\u00ednea de referencia HD 600 \u2014 el abierto neutro que traduce bien las mezclas, ahora con graves reales e impedancia de 130 ohmios f\u00e1cil de alimentar. </strong>La respuesta de frecuencia es tan neutra que las mezclas se traducen perfectamente entre diferentes sistemas \u2014 monitores de estudio, est\u00e9reo de auto, altavoces de laptop e incluso auriculares in-ear. No hay graves exagerados para enga\u00f1arte haci\u00e9ndote pensar que tus graves son m\u00e1s grandes de lo que son, ni medios hundidos para esconder problemas en el rango de 500Hz a 2kHz donde vive la mayor parte de la energ\u00eda vocal y de guitarra. En precisi\u00f3n pura de mezcla, los HD 490 Pro Plus mantienen su posici\u00f3n contra auriculares que cuestan mucho m\u00e1s. El dise\u00f1o abierto te da un escenario sonoro amplio y natural que los auriculares cerrados simplemente no pueden replicar \u2014 panoramiza una guitarra fuerte a la izquierda y un piano fuerte a la derecha y suenan como objetos tridimensionales distintos en el espacio. Los dos juegos de almohadillas intercambiables (mezcla y producci\u00f3n) ajustan el sonido a la tarea, y el plugin dearVR MIX-SE incluido a\u00f1ade una comprobaci\u00f3n de traducci\u00f3n en sala virtual. Si quieres saber c\u00f3mo suena realmente tu mezcla antes de lanzarla al mundo, empieza aqu\u00ed. Los HD 490 Pro Plus no halagan tu mezcla \u2014 la revelan.';

oh.conclusion = 'If mixing accuracy is your only priority, get the HD 490 Pro Plus \u2014 it\u0027s the most honest open-back under $1,000, with real low end and 130-ohm ease. I\u0027ve done final mix decisions on the HD 490 Pro Plus that translated flawlessly to mastering-grade monitors, and that\u0027s the highest compliment I can give. If you need one headphone for everything including some open-back feel and the versatility to track, mix, and travel, the ATH-M50x is the practical choice that has never let me down. Ideally, own both: HD 490 Pro Plus for critical mixing, M50x for tracking and everyday use. That\u0027s the studio setup I run and I\u0027ve never looked back. <p>You may also like: <a href="/guides/best-headphones.html">Best Studio Headphones for Mixing & Tracking</a>, <a href="/guides/budget-headphones.html">Best Cheap Studio Headphones Under $150</a>, and <a href="/guides/tracking-headphones.html">Best Closed-Back Headphones for Mixing & Tracking</a>.</p>';
oh.conclusion_es = 'Si la precisi\u00f3n de mezcla es tu \u00fanica prioridad, consigue los HD 490 Pro Plus \u2014 son el abierto m\u00e1s honesto por menos de $1,000, con graves reales y facilidad de 130 ohmios. He hecho decisiones finales de mezcla en los HD 490 Pro Plus que se tradujeron impecablemente a monitores de grado masterizaci\u00f3n, y ese es el mayor cumplido que puedo dar. Si necesitas un auricular para todo, incluyendo algo de sensaci\u00f3n abierta y la versatilidad para grabar, mezclar y viajar, los ATH-M50x son la elecci\u00f3n pr\u00e1ctica que nunca me ha decepcionado. Idealmente, ten ambos: HD 490 Pro Plus para mezcla cr\u00edtica, M50x para grabaci\u00f3n y uso diario. Esa es la configuraci\u00f3n de estudio que uso y nunca he mirado atr\u00e1s. <p>Tambi\u00e9n te puede interesar: <a href="/guides/best-headphones_es.html">Mejores Auriculares de Estudio para Mezcla y Seguimiento</a>, <a href="/guides/budget-headphones_es.html">Mejores Auriculares de Estudio Econ\u00f3micos por Menos de $150</a> y <a href="/guides/tracking-headphones_es.html">Mejores Auriculares Cerrados para Mezcla y Grabaci\u00f3n</a>.</p>';
oh.verdict = 'HD 490 Pro Plus for pure mixing, ATH-M50x for versatility';
oh.verdict_es = 'HD 490 Pro Plus para mezcla pura, ATH-M50x para versatilidad';
oh.description = 'BEST open-back headphones for mixing 2026: HD 490 Pro Plus vs DT 990 Pro vs Sundara. HD 490 Pro Plus for pure mixing, wide soundstage for critical listening. Full review.';
oh.description_es = 'MEJORES auriculares abiertos para mezclar 2026: HD 490 Pro Plus vs DT 990 Pro vs Sundara. HD 490 Pro Plus para mezcla pura, escenario amplio para escucha cr\u00edtica.';

if (oh.productTable && oh.productTable.columns) {
  oh.productTable.columns = oh.productTable.columns.map(c => {
    if ((c.title || '').includes('HD 600')) { c.title = 'Sennheiser HD 490 Pro Plus'; c.title_es = 'Sennheiser HD 490 Pro Plus'; }
    return c;
  });
  oh.productTable.rows.forEach(r => {
    if (r.values && Array.isArray(r.values) && r.values.length === oh.productTable.columns.length) {
      const i = oh.productTable.columns.findIndex(c => c.title === 'Sennheiser HD 490 Pro Plus');
      if (i >= 0 && r.values[i]) {
        const map = {
          'Best For': { value: 'Modern reference mixing', value_es: 'Mezcla de referencia moderna' },
          'Type': { value: 'Open-back', value_es: 'Abiertos' },
          'Driver Size': { value: '38mm', value_es: '38mm' },
          'Impedance': { value: '130 \u03a9', value_es: '130 \u03a9' },
          'Sensitivity': { value: '105 dB', value_es: '105 dB' },
          'Frequency Response': { value: '5 Hz \u2013 36 kHz', value_es: '5 Hz \u2013 36 kHz' },
          'Cable': { value: 'Detachable (2 included)', value_es: 'Desmontable (2 incluidos)' },
          'Weight': { value: '260 g', value_es: '260 g' },
          'Price': { value: '$499', value_es: '$499' }
        };
        if (map[r.label]) { r.values[i].value = map[r.label].value; r.values[i].value_es = map[r.label].value_es; }
      }
    }
  });
  console.log('open-headphones productTable updated');
}

if (oh.featuredSnippet) {
  const f = oh.featuredSnippet;
  f.text_en = 'The Sennheiser HD 490 Pro Plus is the modern mixing engineer\u0027s reference \u2014 neutral response, real low end, 130-ohm ease. The frequency response is so neutral that mixes translate perfectly across different systems...';
  f.text_es = 'Los Sennheiser HD 490 Pro Plus son la referencia moderna del ingeniero de mezcla \u2014 respuesta neutra, graves reales, facilidad de 130 ohmios. La respuesta de frecuencia es tan neutra que las mezclas se traducen perfectamente entre diferentes sistemas...';
  f.faq_q1_en = 'Are the Sennheiser HD 490 Pro Plus the best open-back headphones for mixing?';
  f.faq_a1_en = 'For critical mixing, yes. The Sennheiser HD 490 Pro Plus ($499) delivers the most natural, neutral frequency response under $1,000 \u2014 its open-back design, deep defined low end, and 130-ohm ease make it the modern reference standard for mixing without listener fatigue. If accuracy is your priority, they are the ones to beat.';
  f.faq_q1_es = '\u00bfSon los Sennheiser HD 490 Pro Plus los mejores auriculares abiertos para mezclar?';
  f.faq_a1_es = 'Para mezcla cr\u00edtica, s\u00ed. Los Sennheiser HD 490 Pro Plus ($499) ofrecen la respuesta de frecuencia m\u00e1s natural y neutra por debajo de $1,000 \u2014 su dise\u00f1o abierto, graves profundos y definidos y facilidad de 130 ohmios los convierten en el est\u00e1ndar de referencia moderno para mezclar sin fatiga. Si la precisi\u00f3n es tu prioridad, son los mejores.';
  f.faq_a2_en = 'Only if you need a closed-back pair too. The ATH-M50x ($169) is a versatile closed-back monitor with collapsible convenience \u2014 great for tracking, traveling and checking low end with more weight than open-back cans. But for critical mixing, an open-back like the HD 490 Pro Plus or DT 990 gives a more honest stereo image. Many engineers own both: open-backs for mixing, the M50x for tracking and portability.';
  f.faq_a2_es = 'Solo si tambi\u00e9n necesitas un par cerrado. Las ATH-M50x ($169) son un monitor cerrado vers\u00e1til con conveniencia plegable \u2014 geniales para tracking, viajes y revisar el low end con m\u00e1s peso que las abiertas. Pero para mezcla cr\u00edtica, un abierto como el HD 490 Pro Plus o DT 990 da una imagen est\u00e9reo m\u00e1s honesta. Muchos ingenieros tienen ambos: abiertos para mezclar, las M50x para tracking y portabilidad.';
  f.faq_a4_en = 'No \u2014 and that\u0027s the point. The Sennheiser HD 490 Pro Plus run at only 130 ohms, so a basic audio interface, laptop, or even a phone can drive them to full level with clean dynamics and low end. If you want the benefit of a reference open-back without buying an amp, this is the one.';
  f.faq_a4_es = 'No \u2014 y ese es el punto. Los Sennheiser HD 490 Pro Plus tienen solo 130 ohmios, as\u00ed que una interfaz de audio b\u00e1sica, una laptop o incluso un tel\u00e9fono pueden moverlos a nivel completo con din\u00e1mica y graves limpios. Si quieres el beneficio de un abierto de referencia sin comprar un amplificador, este es el indicado.';
  f.faq_a5_en = 'No, they are closed-back. The M50x have sealed earcups that isolate sound, which is why they are included in this guide as an exception: their soundstage is unusually wide for a closed-back design, so they get used for mixing a lot. If you want true open-back isolation-free sound, look at the HD 490 Pro Plus or similar designs with vented earcups.';
  f.faq_a5_es = 'No, son cerrados. Los M50x tienen copas selladas que a\u00edslan el sonido, por eso est\u00e1n en esta gu\u00eda como excepci\u00f3n: su escenario sonoro es inusualmente amplio para un dise\u00f1o cerrado, as\u00ed que se usan mucho para mezclar. Si quieres sonido verdaderamente abierto sin aislamiento, mira los HD 490 Pro Plus o dise\u00f1os similares con copas ventiladas.';
}

oh.verdictProsCons.forEach(v => {
  if ((v.name || '').includes('HD 600')) {
    v.name = 'Sennheiser HD 490 Pro Plus'; v.name_es = 'Sennheiser HD 490 Pro Plus';
    v.pros = [
      'The modern successor to the HD 600 reference \u2014 neutral response now with real, defined low end',
      'Neutral response translates perfectly across monitors, car stereos, and earbuds',
      '130-ohm ease: drives from any interface, laptop, or phone \u2014 no amp required',
      'Two switchable ear pad sets and dearVR MIX-SE included for translation checks'
    ];
    v.pros_es = [
      'El sucesor moderno de la referencia HD 600 \u2014 respuesta neutra ahora con graves reales y definidos',
      'La respuesta neutra se traduce perfectamente entre monitores, equipos de coche y auriculares',
      'Facilidad de 130 ohmios: funciona desde cualquier interfaz, laptop o tel\u00e9fono \u2014 sin amplificador',
      'Dos juegos de almohadillas intercambiables y dearVR MIX-SE incluido para comprobar la traducci\u00f3n'
    ];
    v.cons = [
      'Open-back leaks sound \u2014 unusable while recording vocals with a live mic',
      '$499 \u2014 a real spend versus budget closed-backs',
      'Needs a quiet room to get the full benefit of the open design'
    ];
    v.cons_es = [
      'Abiertos, fugan sonido \u2014 inutilizables al grabar voces con un micr\u00f3fono activo',
      '$499 \u2014 un gasto real frente a los cerrados econ\u00f3micos',
      'Necesitan una habitaci\u00f3n silenciosa para aprovechar el dise\u00f1o abierto'
    ];
  }
});

// ---- 4) best-headphones-for-mixing: secs 0, 4 + related ----
const bm = findGuide('best-headphones-for-mixing');
bm.sections[0].content = bm.sections[0].content
  .replace('<a href="/guides/hd600-vs-dt990.html">DT 990 Pro or HD 600</a>', '<a href="/guides/hd490-pro-vs-dt990.html">DT 990 Pro or HD 490 Pro Plus</a>');
bm.sections[0].content_es = bm.sections[0].content_es
  .replace('<a href="/guides/hd600-vs-dt990_es.html">DT 990 Pro o HD 600</a>', '<a href="/guides/hd490-pro-vs-dt990_es.html">DT 990 Pro o HD 490 Pro Plus</a>')
  .replace('<a href="/guides/hd600-vs-dt990_es.html">DT 990 Pro o HD 600</a>', '<a href="/guides/hd490-pro-vs-dt990_es.html">DT 990 Pro o HD 490 Pro Plus</a>');

bm.sections[4].heading = 'Is the Sennheiser HD 490 Pro Plus the Best Reference Headphones for Mixing?';
bm.sections[4].heading_es = '\u00bfEs el Sennheiser HD 490 Pro Plus el Mejor Auricular de Referencia para Mezclar?';
bm.sections[4].content = '<p><strong>The Sennheiser HD 490 Pro Plus ($499) is the modern gold standard for reference headphones \u2014 the successor to the HD 600, used in mastering studios worldwide.</strong> Their frequency response is virtually flat, with no coloration or hyped frequencies, and unlike the old 300-ohm classics they add deep, defined low end at an easy-to-drive 130 ohms. What you hear is exactly what is in your mix. If a mix sounds good on HD 490 Pro Plus, it will sound good anywhere.</p><p><strong>Why mastering engineers choose the HD 490 Pro Plus: </strong>Complete neutrality with modern low-end extension. There is no bass boost, no treble spike, no midrange scoop. The HD 490 Pro Plus reveals every mix flaw \u2014 harsh frequencies, phase issues, muddiness, and stereo imbalance. Two switchable ear pad sets tune the presentation, and the included dearVR MIX-SE plugin adds a virtual-room translation check. If you are serious about mixing and mastering, the HD 490 Pro Plus is the ultimate quality check.</p><p><strong>The downsides: </strong>At $499, they cost more than the DT 990 Pro \u2014 but they replace the need for a dedicated headphone amplifier that the 300-ohm classics demanded, so the real-world cost gap narrows. Like all open-backs, they leak sound and are not ideal for bass-heavy genres without a second opinion from speakers or closed-backs.</p><p>Compare the HD 490 Pro Plus to the DT 990 in our <a href="/guides/hd490-pro-vs-dt990.html">HD 490 Pro vs DT 990 comparison</a>.</p>';
bm.sections[4].content_es = '<p><strong>Los Sennheiser HD 490 Pro Plus ($499) son el est\u00e1ndar de oro moderno para auriculares de referencia \u2014el sucesor de los HD 600, usados en estudios de masterizaci\u00f3n en todo el mundo.</strong> Su respuesta de frecuencia es virtualmente plana, sin coloraci\u00f3n ni frecuencias potenciadas, y a diferencia de los cl\u00e1sicos de 300 ohmios a\u00f1aden graves profundos y definidos a unos f\u00e1ciles 130 ohmios. Lo que escuchas es exactamente lo que hay en tu mezcla. Si una mezcla suena bien en HD 490 Pro Plus, sonar\u00e1 bien en cualquier sitio.</p><p><strong>Por qu\u00e9 los ingenieros de masterizaci\u00f3n eligen los HD 490 Pro Plus: </strong>Neutralidad completa con extensi\u00f3n moderna de graves. No hay potenciaci\u00f3n de graves, ni pico de agudos, ni recorte de medios. Los HD 490 Pro Plus revelan cada defecto de la mezcla \u2014frecuencias \u00e1speras, problemas de fase, turbiedad y desequilibrio est\u00e9reo. Dos juegos de almohadillas intercambiables ajustan la presentaci\u00f3n, y el plugin dearVR MIX-SE incluido a\u00f1ade una comprobaci\u00f3n de traducci\u00f3n en sala virtual. Si hablas en serio sobre mezcla y masterizaci\u00f3n, los HD 490 Pro Plus son el control de calidad definitivo.</p><p><strong>Los inconvenientes: </strong>A $499, cuestan m\u00e1s que las DT 990 Pro \u2014 pero eliminan la necesidad del amplificador de auriculares dedicado que exig\u00edan los cl\u00e1sicos de 300 ohmios, as\u00ed que la brecha de coste real se estrecha. Como todos los abiertos, filtran sonido y no son ideales para g\u00e9neros con muchos graves sin una segunda opini\u00f3n de altavoces o cerrados.</p><p>Compara los HD 490 Pro Plus con los DT 990 en nuestra <a href="/guides/hd490-pro-vs-dt990_es.html">comparativa HD 490 Pro vs DT 990</a>.</p>';

bm.conclusion = bm.conclusion
  .replace('If you can invest more, the Sennheiser HD 600 ($399) offers reference-level neutrality for mastering.', 'If you can invest more, the Sennheiser HD 490 Pro Plus ($499) offers modern reference-level neutrality with real low end for mastering \u2014 no headphone amp required.')
  .replace('and <a href="/guides/hd600-vs-dt990.html">HD 600 vs DT 990 Pro</a>', 'and <a href="/guides/hd490-pro-vs-dt990.html">HD 490 Pro vs DT 990 Pro</a>');
bm.conclusion_es = bm.conclusion_es
  .replace('Si puedes invertir m\u00e1s, los Sennheiser HD 600 ($399) ofrecen neutralidad de referencia.', 'Si puedes invertir m\u00e1s, los Sennheiser HD 490 Pro Plus ($499) ofrecen neutralidad de referencia moderna con graves reales para masterizaci\u00f3n \u2014 sin amplificador.')
  .replace('y <a href="/guides/hd600-vs-dt990_es.html">HD 600 vs DT 990 Pro</a>', 'y <a href="/guides/hd490-pro-vs-dt990_es.html">HD 490 Pro vs DT 990 Pro</a>');

if (bm.productTable && bm.productTable.columns) {
  bm.productTable.columns = bm.productTable.columns.map(c => {
    if ((c.title || '').includes('HD 600')) { c.title = 'Sennheiser HD 490 Pro Plus'; c.title_es = 'Sennheiser HD 490 Pro Plus'; }
    return c;
  });
  bm.productTable.rows.forEach(r => {
    if (r.values && Array.isArray(r.values) && r.values.length === bm.productTable.columns.length) {
      const i = bm.productTable.columns.findIndex(c => c.title === 'Sennheiser HD 490 Pro Plus');
      if (i >= 0 && r.values[i]) {
        const map = {
          'Best For': { value: 'Modern reference mixing', value_es: 'Mezcla de referencia moderna' },
          'Type': { value: 'Open-back', value_es: 'Abiertos' },
          'Driver Size': { value: '38mm', value_es: '38mm' },
          'Impedance': { value: '130 \u03a9', value_es: '130 \u03a9' },
          'Sensitivity': { value: '105 dB', value_es: '105 dB' },
          'Frequency Response': { value: '5 Hz \u2013 36 kHz', value_es: '5 Hz \u2013 36 kHz' },
          'Cable': { value: 'Detachable (2 included)', value_es: 'Desmontable (2 incluidos)' },
          'Weight': { value: '260 g', value_es: '260 g' },
          'Price': { value: '$499', value_es: '$499' }
        };
        if (map[r.label]) { r.values[i].value = map[r.label].value; r.values[i].value_es = map[r.label].value_es; }
      }
    }
  });
  console.log('best-headphones-for-mixing productTable updated');
}

if (bm.featuredSnippet) {
  const f = bm.featuredSnippet;
  f.faq_a2_en = 'Open-back (DT 990 Pro, HD 490 Pro Plus) for critical mixing \u2014 wider soundstage, more natural sound. Closed-back (DT 770 Pro, M50x) for tracking and noisy environments.';
  f.faq_a3_en = 'For 32 ohm headphones (M50x, MDR-7506) no. For 250 ohm (DT 990/770 Pro) a good interface like Scarlett 2i2 is enough. For 300 ohm (HD 600), a dedicated amp is recommended \u2014 the HD 490 Pro Plus at 130 ohms needs no amp at all.';
  f.faq_a4_en = 'Yes, with open-back reference headphones like the HD 490 Pro Plus or DT 990 Pro. Always check your master on multiple systems (headphones, speakers, phone, car) to ensure translation.';
}

bm.verdictProsCons.forEach(v => {
  if ((v.name || '').includes('HD 600')) {
    v.name = 'Sennheiser HD 490 Pro Plus'; v.name_es = 'Sennheiser HD 490 Pro Plus';
    v.pros = [
      'Modern gold-standard reference neutrality \u2014 a virtually flat response that reveals every mix flaw',
      'Deep, defined low end and 130-ohm ease \u2014 no dedicated headphone amp needed',
      'Detailed 5 Hz\u201336 kHz response with excellent midrange accuracy',
      'Two switchable ear pad sets, detachable cables, and dearVR MIX-SE included'
    ];
    v.pros_es = [
      'Neutralidad de referencia de oro moderna \u2014 una respuesta pr\u00e1cticamente plana que revela cada fallo de la mezcla',
      'Graves profundos y definidos y facilidad de 130 ohmios \u2014 sin amplificador de auriculares dedicado',
      'Respuesta detallada de 5 Hz\u201336 kHz con excelente precisi\u00f3n en medios',
      'Dos juegos de almohadillas intercambiables, cables desmontables y dearVR MIX-SE incluidos'
    ];
    v.cons = [
      'Cuestan $499 \u2014 m\u00e1s del triple que el DT 990 Pro con el mismo rol de auricular abierto',
      'El dise\u00f1o abierto filtra sonido y no a\u00edsla, igual que el DT 990',
      'Los graves profundos siguen siendo de un abierto \u2014 para sub-bass extremo a\u00f1ade un segundo auricular o altavoces'
    ];
    v.cons_es = [
      'Cuestan $499 \u2014 m\u00e1s del triple que el DT 990 Pro con el mismo rol abierto',
      'El dise\u00f1o abierto filtra sonido y no a\u00edsla, igual que el DT 990',
      'Los graves profundos siguen siendo de un abierto \u2014 para sub-bass extremo a\u00f1ade un segundo auricular o altavoces'
    ];
  }
});

// ---- 5) generic global replacements across ALL guides for remaining HD 600 mentions ----
let text = JSON.stringify(guides, null, 2);

// Protect intentional historical references to the original HD 600 (successor phrasing,
// the 300-ohm amp FAQ) so the global \bHD 600\b replace below does not corrupt them.
const protect = [
  'successor to the HD 600 reference line',
  'sucesor moderno de la l\u00ednea de referencia HD 600',
  'The modern successor to the HD 600 reference',
  'El sucesor moderno de la referencia HD 600',
  'the successor to the HD 600, used in mastering studios worldwide',
  'el sucesor de los HD 600',
  'For 300 ohm (HD 600), a dedicated amp is recommended'
];
text = protect.reduce((acc, p, i) => acc.replace(p, '@@HD600PROTECT' + i + '@@'), text);

// Remove leftover stray hd600-vs-dt990 links in any guide body -> hd490-pro-vs-dt990
text = text.replace(/\/guides\/hd600-vs-dt990(_es)?\.html/g, '/guides/hd490-pro-vs-dt990$1.html');

// remaining "HD 600" mentions that aren't part of "HD 490 Pro Plus" or "HD 600 series" etc.
// (in guide bodies outside the rewritten ones: dt770-vs-dt990 conclusion, starter-studio references)
text = text.replace(/\bHD 600\b/g, 'HD 490 Pro Plus');

// restore the intentional historical HD 600 references
text = protect.reduce((acc, p, i) => acc.replace('@@HD600PROTECT' + i + '@@', p), text);

fs.writeFileSync(guidesPath, text, 'utf8');
console.log('guides.json written');

// ---- 6) verify ----
const after = JSON.parse(fs.readFileSync(guidesPath, 'utf8'));
const leftover = JSON.stringify(after).match(/HD 600/g);
console.log('leftover "HD 600" mentions:', leftover ? leftover.length : 0);
console.log('leftover slug hd600-vs-dt990:', (JSON.stringify(after).match(/hd600-vs-dt990/g) || []).length);
const g = after.find(g => g.id === 'hd490-pro-vs-dt990');
console.log('new guide exists:', !!g, '| sections:', g ? g.sections.length : 0);
