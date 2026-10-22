const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'hd490-pro-vs-dt990');

// --- Impedance / phone corrections ---
// sections[0] EN
g.sections[0].content = g.sections[0].content
  .replace('Its 130-ohm impedance drives easily from audio interface, laptop, or phone while',
           'Its 130-ohm impedance is optimized for modern audio interfaces and high-end laptops, though it benefits greatly from a dedicated amplifier, while');
// sections[0] ES
g.sections[0].content_es = g.sections[0].content_es
  .replace('Su impedancia de 130 ohmios se maneja fácil desde una interfaz de audio, un portátil o un teléfono, mientras que',
           'Su impedancia de 130 ohmios está optimizada para interfaces de audio modernas y portátiles de gama alta, aunque se beneficia enormemente de un amplificador dedicado, mientras que');

// FAQ a3 EN
g.featuredSnippet.faq_a3_en =
  "No — 130 ohms is optimized for modern audio interfaces and high-end laptops, though it benefits greatly from a dedicated amplifier. The DT 990 Pro comes in 250-ohm (and 32-ohm) versions — the 250-ohm requires a headphone amp or a strong interface output. Neither is ideal straight from a phone, but the 490 is easier to drive.";
// FAQ a3 ES
g.featuredSnippet.faq_a3_es =
  "No — 130 ohmios está optimizado para interfaces de audio modernas y portátiles de gama alta, aunque se beneficia enormemente de un amplificador dedicado. Las DT 990 Pro vienen en versiones de 250 ohm (y 32 ohm) — la de 250 ohm exige un amplificador de auriculares o una salida de interfaz potente. Ninguna es ideal directa a un móvil, pero las 490 son más fáciles de alimentar.";

// featuredSnippet text
g.featuredSnippet.text_en = g.featuredSnippet.text_en.replace('130-ohm ease', '130-ohm design');
g.featuredSnippet.text_es = g.featuredSnippet.text_es.replace('130 ohmios y dearVR MIX-SE incluido', '130 ohmios y dearVR MIX-SE incluido');

// verdictProsCons[0].pros[1]
g.verdictProsCons[0].pros[1] = '130-ohm impedance optimized for modern audio interfaces and high-end laptops — benefits greatly from a dedicated amp';
g.verdictProsCons[0].pros_es[1] = 'Impedancia de 130 ohmios optimizada para interfaces de audio modernas y portátiles de gama alta — se beneficia enormemente de un amplificador dedicado';

// verdictProsCons[0].cons[4] (weight)
g.verdictProsCons[0].cons[4] = 'Modern 260 g mechanical design is extremely comfortable, though it applies slightly firm lateral pressure at first';
g.verdictProsCons[0].cons_es[4] = 'Diseño mecánico moderno de 260 g extremadamente cómodo, aunque ejerce una presión lateral inicial ligeramente firme';

// verdictProsCons[1].pros[2] (DT 990)
g.verdictProsCons[1].pros[2] = 'Classic 250-ohm studio design that makes the most of dedicated amplifiers and mixing consoles';
g.verdictProsCons[1].pros_es[2] = 'Diseño clásico de estudio de 250 ohmios que aprovecha al máximo la potencia de los amplificadores dedicados y las consolas de mezcla';

// --- Verdict field (user-provided) ---
const vEs = '<p><strong><span class="product-name">Sennheiser HD 490 Pro</span> sale ganando en la comparativa por un margen claro de ingeniería.</strong> Se consolida como la referencia abierta moderna para mezcla y masterización debido a su innovador sistema de dos almohadillas intercambiables (que cambian físicamente la respuesta de frecuencia), su distorsión ultra baja en graves y una comodidad ergonómica insuperable en jornadas largas de estudio. Es una inversión de futuro que elimina la fatiga auditiva.</p><p><strong><span class="product-name">Beyerdynamic DT 990 Pro</span></strong> se mantiene como el rey imbatible del presupuesto. Son unos auriculares de mezcla abiertos con una legendaria extensión de graves y un escenario sonoro espacioso que revela colas de reverb y colocación estéreo con precisión quirúrgica. Aunque su pico de agudos (los famosos "agudos Beyer") puede resultar punzante y su cable fijo de 250 Ohms exige un amplificador dedicado obligatorio, por un tercio del precio de los Sennheiser siguen siendo una herramienta de edición brutal para estudios caseros que están empezando.</p>';
const vEn = '<p><strong><span class="product-name">Sennheiser HD 490 Pro</span> wins the comparison by a clear engineering margin.</strong> It establishes itself as the modern open reference for mixing and mastering thanks to its innovative dual swappable ear pad system (which physically changes the frequency response), its ultra-low bass distortion and unmatched ergonomic comfort on long studio sessions. It is a future-proof investment that eliminates listening fatigue.</p><p><strong><span class="product-name">Beyerdynamic DT 990 Pro</span></strong> remains the unbeatable budget king. These open mixing headphones offer legendary bass extension and a spacious soundstage that reveals reverb tails and stereo placement with surgical precision. Although its treble peak (the famous "Beyer treble") can be piercing and its fixed 250-ohm cable demands a dedicated amplifier, at a third of the Sennheiser\'s price they remain a brutal editing tool for home studios just starting out.</p>';
g.verdict = vEn;
g.verdict_es = vEs;

// sections[0] content: also fix "drives easily" phrase already done.
// sections[3] content: "low impedance means it works from any interface" -> keep but soften? User only asked pros/cons, but also says tablas veredictos faqs textos informacion correcta. We'll adjust.
g.sections[3].content = g.sections[3].content.replace('its low impedance means it works from any interface', 'its 130-ohm impedance is optimized for modern audio interfaces and high-end laptops, though it benefits greatly from a dedicated amplifier');
g.sections[3].content_es = g.sections[3].content_es.replace('su baja impedancia significa que funciona desde cualquier interfaz', 'su impedancia de 130 ohmios está optimizada para interfaces de audio modernas y portátiles de gama alta, aunque se beneficia enormemente de un amplificador dedicado');

fs.writeFileSync('data/guides.json', JSON.stringify(guides, null, 2));
console.log('done');
