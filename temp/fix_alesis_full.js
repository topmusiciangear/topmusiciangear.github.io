const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

/* ---------- 1. PRODUCT 1052 ---------- */
const pFile = path.join(ROOT, 'data', 'products.json');
const products = JSON.parse(fs.readFileSync(pFile, 'utf8'));
const a = products.find(p => p.id === 1052);
if (!a) throw new Error('product 1052 not found');

const IMG = 'https://r2.gear4music.com/media/109/1096267/1200/preview.jpg';
a.img = IMG;
a.image = IMG;
a.desc = 'Alesis ELEVATE 4 studio monitors, sold as a pair. Elliptical tweeter waveguide for a wide sweet spot, dedicated subwoofer output, dense MDF cabinet, 4-inch woofer and 1-inch silk dome tweeter, 50 W RMS (25 W per channel, Class AB), 68 Hz-20 kHz, front headphone jack and bass-boost switch.';
a.desc_es = 'Monitores de estudio Alesis ELEVATE 4, vendidos por pares. Guía de ondas elíptica para un punto dulce amplio, salida dedicada para subwoofer, gabinete de MDF denso, woofer de 4 pulgadas y tweeter de seda de 1 pulgada, 50 W RMS (25 W por canal, Clase AB), 68 Hz-20 kHz, salida de auriculares frontal e interruptor de refuerzo de graves.';
a.stores.amazon = 'https://www.amazon.com/dp/B01IR7CFJG';
fs.writeFileSync(pFile, JSON.stringify(products, null, 2));

/* ---------- 2. GUIDE ---------- */
const gFile = path.join(ROOT, 'data', 'guides.json');
const guides = JSON.parse(fs.readFileSync(gFile, 'utf8'));
const g = guides.find(x => x.id === 'best-home-studio-speakers');
if (!g) throw new Error('guide not found');

/* --- 2a. Section 6: remove Edifier, keep the "bookshelf vs monitor" angle --- */
const s6 = g.sections[6];
s6.heading = 'The Most Popular Speakers in This Price Range Are Not Monitors';
s6.heading_es = 'Los altavoces más vendidos de esta franja no son monitores';
s6.content = '<p><strong>The most-bought pair in this price range is a powered bookshelf speaker, and that is exactly why it needs its own paragraph.</strong> A four-inch driver, a soft-dome tweeter, 42 W RMS, a rear port and two RCA inputs so a turntable and a laptop can stay plugged in at the same time. It sounds good. It is genuinely good at what it is.</p><p><strong>A powered speaker and a studio monitor are different tools, and the difference is not marketing.</strong> A monitor gives you a waveguide that controls off-axis response so the mix holds together when you move your head, a reference curve you can learn, a balanced input that does not drag your interface noise floor into the room, and EQ with published centre frequencies.</p><p><strong>A bookshelf pair gives you none of that.</strong> The bass and treble knobs are plain tone controls with no stated frequencies, the inputs are unbalanced RCA only, and there is no room correction of any kind. Mix on one and every decision sounds better than it will on a phone, in a car or on a club system.</p><p><strong>So who should buy it?</strong> If you write, edit video, stream or just listen, it is excellent value and it is the pair I would buy with my own money. If you are mixing and need your work to translate, take a monitor from this list instead. The Mackie CR4.5 at $129.99 is the one to beat: for about twelve dollars more you get a waveguide, a location switch and a bigger woofer.</p>';
s6.content_es = '<p><strong>El par más vendido de esta franja de precio es un altavoz de estantería amplificado, y por eso mismo necesita su propio párrafo.</strong> Un driver de 4 pulgadas, un tweeter de cúpula blanda, 42 W RMS, puerto trasero y dos entradas RCA para dejar conectados a la vez el tocadiscos y el portátil. Suena bien. Es genuinamente bueno en lo suyo.</p><p><strong>Un altavoz amplificado y un monitor de estudio son herramientas distintas, y la diferencia no es marketing.</strong> Un monitor te da una guía de ondas que controla la respuesta fuera del eje para que la mezcla aguante cuando mueves la cabeza, una curva de referencia que puedes aprenderte, una entrada balanceada que no arrastra el ruido de tu interfaz a la sala y un EQ con frecuencias centrales publicadas.</p><p><strong>Un par de estantería no te da nada de eso.</strong> Los mandos de graves y agudos son controles de tono sin frecuencias indicadas, las entradas son solo RCA sin balancear y no hay corrección de sala de ningún tipo. Si mezclas con él, cada decisión te sonará mejor de lo que sonará en un móvil, en el coche o en el equipo de un club.</p><p><strong>¿Y quién debería comprarlo?</strong> Si compones, editas vídeo, haces streaming o simplemente escuchas música, es una compra excelente y es el par que me llevaría yo. Si mezclas y necesitas que tu trabajo se traduzca fuera, coge un monitor de esta lista. El Mackie CR4.5 a $129.99 es la referencia a batir: por unos doce dólares más tienes guía de ondas, conmutador de ubicación y un woofer más grande.</p>';

/* --- 2b. Section 8: English heading + content, corrected ES --- */
const s8 = g.sections[8];
s8.heading = 'Alesis ELEVATE 4: Elliptical Waveguide and a Sub Out Under $150';
s8.content = '<strong>The ELEVATE 4 brings three things to this price that most budget monitors leave out:</strong> (1) An elliptical waveguide: the silk tweeter sits in an oval horn that spreads the highs wide, so the stereo image holds up when you move across the desk. (2) A dedicated subwoofer output: a real rear connection for adding a powered sub later, something the Mackie, M-Audio and PreSonus pairs here cannot do. (3) A dense MDF cabinet: a heavy wood box that keeps resonances and cabinet buzz out of the low mids when you turn it up.<br><br>The honest limits are the ones you would expect at this price. There is no XLR, no rear EQ and no room correction, and the published response stops at 68 Hz, so kick drums and 808s need a sub to be judged properly. At 50 W RMS (25 W per channel, Class AB) it also runs out of headroom before the Behringer. What it does have is a front headphone jack and a bass-boost switch, which make it easy to live with on a desk.';
s8.content_es = '<strong>El ELEVATE 4 aporta tres cosas a este precio que casi ningún monitor económico incluye:</strong> (1) Guía de ondas elíptica: el tweeter de seda va montado en una bocina ovalada que reparte los agudos a lo ancho, así la imagen estéreo aguanta cuando te mueves por el escritorio. (2) Salida dedicada para subwoofer: una conexión trasera real para añadir un sub activo más adelante, algo que los Mackie, M-Audio y PreSonus de la lista no pueden hacer. (3) Gabinete de MDF denso: una caja de madera pesada que mantiene resonancias y vibraciones fuera de los medios-graves cuando subes el volumen.<br><br>Los límites son los esperables en esta gama. No hay XLR, ni EQ trasero, ni corrección de sala, y la respuesta publicada se queda en 68 Hz, así que para juzgar bombos y 808 hace falta un sub. Con 50 W RMS (25 W por canal, Clase AB) también se queda sin margen antes que el Behringer. Lo que sí tiene es salida de auriculares frontal y un interruptor de refuerzo de graves, dos detalles que hacen muy fácil convivir con él en un escritorio.';
s8.specs = {
  'Woofer': '4" (102 mm)',
  'Tweeter': '1" silk dome, elliptical waveguide',
  'Power': '50 W RMS (2 x 25 W, Class AB)',
  'Frequency response': '68 Hz - 20 kHz',
  'Inputs': '1/4" TRS + RCA',
  'Outputs': 'Subwoofer out, 3.5 mm headphone',
  'Cabinet': 'MDF, rear port',
  'Dimensions': '183 x 157 x 235 mm',
  'Weight': '2.3 kg each'
};

/* --- 2c. Verdict: swap the Edifier paragraph for the Alesis one --- */
g.verdict = g.verdict.replace(/<p><strong><span class="product-name">Edifier R1280T<\/span><\/strong>[^]*?<\/p>\s*$/,
  '<p><strong><span class="product-name">Alesis ELEVATE 4</span></strong> — A 4-inch woofer and 1-inch silk dome on 50 W RMS (25 W per channel, Class AB), 68 Hz to 20 kHz, with an elliptical waveguide, a rear subwoofer output and a front headphone jack.</p>');
g.verdict_es = g.verdict_es.replace(/<p><strong><span class="product-name">Edifier R1280T<\/span><\/strong>[^]*?<\/p>\s*$/,
  '<p><strong><span class="product-name">Alesis ELEVATE 4</span></strong> — Woofer de 4 pulgadas y cúpula de seda de 1 pulgada con 50 W RMS (25 W por canal, Clase AB), de 68 Hz a 20 kHz, con guía de ondas elíptica, salida de subwoofer trasera y salida de auriculares frontal.</p>');

/* --- 2d. Meta description --- */
g.description = 'Home studio monitors under $150 compared: Mackie, PreSonus, M-Audio, Behringer and Alesis, with measured bass and honest picks.';
g.description_es = 'Monitores de estudio por menos de $150 comparados: Mackie, PreSonus, M-Audio, Behringer y Alesis, con graves medidos y compras honestas.';

/* --- 2e. FAQ --- */
g.faq[2].a = 'A monitor is built to be measured. It has a waveguide to control off-axis response, a defined reference curve you can learn, usually a balanced input, and rear EQ with published frequencies. A powered bookshelf pair has none of that: unbalanced RCA only, plain tone controls with no stated frequencies and no room correction. It is a very good speaker and the most bought option here, but mixes will sound better on it than they really are.';
g.faq[2].a_es = 'Un monitor está hecho para ser medido. Lleva guía de ondas para controlar la respuesta fuera del eje, una curva de referencia definida que puedes aprenderte, normalmente entrada balanceada y un EQ trasero con frecuencias publicadas. Un par de estantería amplificado no tiene nada de eso: solo RCA sin balancear, mandos de tono sin frecuencias indicadas y ninguna corrección de sala. Es un altavoz muy bueno y el más vendido de la lista, pero tus mezclas sonarán mejor en él de lo que son de verdad.';

/* --- 2f. Product table: rebuild the Alesis column (was misaligned val/val_es) --- */
const alesis = {
  'Woofer': { value: '4" woofer', value_es: 'Woofer de 4"' },
  'Bass extension (stated)': { value: '68 Hz - 20 kHz', value_es: '68 Hz - 20 kHz' },
  'Power (RMS)': { value: '50 W (2x25 W, Class AB)', value_es: '50 W (2x25 W, Clase AB)' },
  'Port Location': { value: 'Rear', value_es: 'Trasero' },
  'Max SPL': { value: 'Not published', value_es: 'No publicada' },
  'Balanced input': { value: '1/4" TRS + RCA (no XLR)', value_es: 'TRS 1/4" + RCA (sin XLR)' },
  'Room correction': { value: 'Bass-boost switch only', value_es: 'Solo refuerzo de graves' },
  'Bluetooth': { value: 'No', value_es: 'No' },
  'Isolation included': { value: 'No', value_es: 'No' },
  'A true studio monitor?': { value: 'Yes', value_es: 'Sí' }
};
g.productTable.rows.forEach(row => {
  const src = alesis[row.label];
  if (!src) throw new Error('unexpected table row: ' + row.label);
  row.values[5] = { value: src.value, value_es: src.value_es };
});

/* --- 2g. Pros/cons accuracy --- */
const vpc = g.verdictProsCons.find(v => v.name === 'Alesis ELEVATE 4');
vpc.pros = [
  'Elliptical waveguide for a wide sweet spot',
  'Dedicated subwoofer output: unique at this price',
  'Dense MDF cabinet: no resonances at high volume',
  'Front headphone jack and bass-boost switch',
  '50 W RMS per pair, Class AB, at an entry-level price'
];
vpc.pros_es = [
  'Guía de ondas elíptica: punto dulce amplio y tolerante',
  'Salida de subwoofer trasera: única en esta gama de precio',
  'Gabinete de MDF denso: sin resonancias a volumen alto',
  'Salida de auriculares frontal e interruptor de graves',
  '50 W RMS por par en Clase AB a precio de entrada'
];
vpc.cons = [
  'No balanced XLR input, only TRS and RCA',
  'Response stops at 68 Hz: a sub is needed for deep bass',
  'No rear EQ or room correction',
  'Discontinued by Alesis: stock depends on remaining dealer inventory'
];
vpc.cons_es = [
  'Sin entrada XLR balanceada, solo TRS y RCA',
  'Respuesta hasta 68 Hz: hace falta un sub para graves profundos',
  'Sin EQ trasero ni corrección de sala',
  'Descatalogado por Alesis: el stock depende del inventario de las tiendas'
];

fs.writeFileSync(gFile, JSON.stringify(guides, null, 2));

/* ---------- 3. TEST_SHOP_BTN ---------- */
const bFile = path.join(ROOT, 'build-guides.js');
let b = fs.readFileSync(bFile, 'utf8');
if (!/^\s*1052:\s*\{/m.test(b)) {
  const anchor = '  1051: {';
  const entry = '  1052: {\n    prices: {\n      gear4music: "£142.00",\n      musicstore: "€119.00"\n    }\n  },\n';
  b = b.replace(anchor, entry + anchor);
  fs.writeFileSync(bFile, b);
}

console.log('OK');
