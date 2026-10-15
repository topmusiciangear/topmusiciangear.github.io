// Tabla nueva + prosa de los tres niveles con Apollo Twin X y Neumann TLM 102
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const F = BASE + 'data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const guia = g.find(x => x.id === 'starter-studio');
const arr = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const list = Array.isArray(arr) ? arr : arr.products;
const byId = {}; list.forEach(p => byId[p.id] = p);
const src = fs.readFileSync(BASE + 'build-guides.js', 'utf8');
const ini = src.indexOf('const TEST_SHOP_BTN = {');
const bloque = src.slice(ini, src.indexOf('\n};', ini));
function emp(t, i) { let d = 0; for (let j = i; j < t.length; j++) { if (t[j] === '{') d++; else if (t[j] === '}') { d--; if (!d) return j; } } return -1; }
function amazon(id) {
  const m = new RegExp('(?:^|\\n)(\\s*)' + id + ':\\s*\\{').exec(bloque);
  if (!m) return null;
  const e = bloque.slice(m.index + m[1].length, emp(bloque, m.index + m[1].length + (m[0].length - m[1].length) - 1) + 1);
  const a = /amazon:\s*"\$([\d,.]+)"/.exec(e);
  return a ? Number(a[1].replace(/[^0-9.]/g, '')) : null;
}
function precio(id, base) {
  if (base === 'amazon') { const a = amazon(id); return a === null ? byId[id].price : a; }
  return byId[id].price;
}
const log = [];
const ok = m => log.push('  ok  ' + m);
const no = m => log.push('  FALTA  ' + m);

const BASE_P = 'amazon';
const col = (en, es) => ({ value: en, value_es: es });
const fila = (l, le, v) => ({ label: l, label_es: le, values: v });

const NIV = [
  { items: [[15, 1], [297, 1], [609, 1], [58, 1], [170, 1], [633, 2]] },
  { items: [[18, 1], [3, 1], [25, 1], [58, 1], [170, 1], [116, 2]] },
  { items: [[16, 1], [674, 1], [26, 1], [58, 1], [170, 1], [20, 2]] }
];
const TOT = NIV.map(n => Math.round(n.items.reduce((s, [id, m]) => s + precio(id, BASE_P) * m, 0)));

/* ═══ 1) TABLA ═══ */
const t = guia.productTable;
t.columns = [
  { title: 'Tier 1: Essential', title_es: 'Nivel 1: Esencial' },
  { title: 'Tier 2: Pro Producer (Recommended)', title_es: 'Nivel 2: Productor Pro (recomendado)' },
  { title: 'Tier 3: The Definitive Studio', title_es: 'Nivel 3: El estudio definitivo' }
];

t.rows = [
  fila('What Each Build Is For', 'Para qué sirve cada montaje', [
    col('Record and mix in a small room, with real powered speakers from day one.',
      'Grabar y mezclar en una habitación pequeña, con altavoces alimentados de verdad desde el primer día.'),
    col('Record vocals properly and mix what you capture, with real stereo image instead of a guess.',
      'Grabar voz en condiciones y mezclar lo que capturas, con imagen estéreo real en vez de suposiciones.'),
    col('Track and master for release with a Neumann capsule and analogue modelling on board.',
      'Grabar y masterizar para publicar con una cápsula Neumann y modelado analógico a bordo.')
  ]),
  fila('Audio Interface', 'Interfaz de audio', [
    col('Focusrite Scarlett 2i2 4th Gen', 'Focusrite Scarlett 2i2 4th Gen'),
    col('SSL 2+ MKII — analogue console preamps', 'SSL 2+ MKII — previos de consola analógica'),
    col('Universal Audio Apollo Twin X Gen 2 — Unison preamps and UAD-2 DSP', 'Universal Audio Apollo Twin X Gen 2 — previos Unison y DSP UAD-2')
  ]),
  fila('Main Microphone', 'Micrófono principal', [
    col('Rode NT1 Signature (pure XLR)', 'Rode NT1 Signature (XLR puro)'),
    col('Rode NT1 5th Gen (USB/XLR hybrid, 32-bit float)', 'Rode NT1 5th Gen (híbrido USB/XLR, 32 bits float)'),
    col('Neumann TLM 102 (premium German capsule)', 'Neumann TLM 102 (cápsula alemana premium)')
  ]),
  fila('Headphones', 'Auriculares', [
    col('Audio-Technica ATH-M20x — basic isolation', 'Audio-Technica ATH-M20x — aislamiento básico'),
    col('Audio-Technica ATH-M50x — the modern reference', 'Audio-Technica ATH-M50x — la referencia moderna'),
    col('Sony MDR-7506 — the clinical loupe for catching errors', 'Sony MDR-7506 — la lupa clínica para cazar errores')
  ]),
  fila('Studio Monitors', 'Monitores de estudio', [
    col('KRK Rokit 5 G5 (pair) — the king of small rooms', 'KRK Rokit 5 G5 (par) — el rey de las habitaciones'),
    col('JBL 305P MkII (pair) — three-dimensional stereo image', 'JBL 305P MkII (par) — imagen estéreo tridimensional'),
    col('KRK Rokit 7 G5 (pair) — 7-inch low-end impact', 'KRK Rokit 7 G5 (par) — impacto de graves de 7 pulgadas')
  ]),
  fila('Acoustic Treatment', 'Tratamiento acústico', [
    col('G4M Squarewave panels (4-pack)', 'Paneles G4M Squarewave (paquete de 4)'),
    col('G4M Squarewave panels (4-pack)', 'Paneles G4M Squarewave (paquete de 4)'),
    col('G4M Squarewave panels (4-pack)', 'Paneles G4M Squarewave (paquete de 4)')
  ]),
  fila('Standout Strengths', 'Puntos fuertes', [
    col('A complete chain with powered speakers from day one. Rear LCD on every monitor.',
      'Cadena completa con altavoces alimentados desde el primer día. Pantalla LCD en cada monitor.'),
    col('32-bit float means the take never clips, and USB-C means it records anywhere without an interface.',
      'El 32 bits float evita que la toma sature, y el USB-C graba en cualquier sitio sin interfaz.'),
    col('Unison preamps and a Neumann capsule: the analogue modelling happens before the converter.',
      'Previos Unison y cápsula Neumann: el modelado analógico ocurre antes del convertidor.')
  ]),
  fila('Estimated Cost', 'Inversión estimada', TOT.map(v => {
    const s = '~$' + v.toLocaleString('en-US');
    const es = '~$' + v.toLocaleString('es-ES').replace(/ /g, ' ');
    return col(s, es.replace(/ | /g, '.'));
  }))
];
ok('tabla reescrita: ' + t.rows.length + ' filas x 3 columnas');
ok('totales: ~$' + TOT.join(' / ~$'));

// verificar que el total de la tabla = suma de los botones
NIV.forEach((n, c) => {
  const s = n.items.reduce((a, [id, m]) => a + precio(id, BASE_P) * m, 0);
  const puesto = parseInt(t.rows[7].values[c].value.replace(/[^0-9]/g, ''), 10);
  (Math.round(s) === puesto ? ok : no)('col ' + (c + 1) + ': suma $' + Math.round(s) + ' vs tabla ~$' + puesto);
});

/* ═══ 2) SECCION DE PRESUPUESTOS ═══ */
const s1 = guia.sections.find(s => (s.heading_es || '').indexOf('Los tres presupuestos') > -1);
if (s1) {
  s1.heading = 'The Three Budgets: What Each Tier Actually Buys';
  s1.heading_es = 'Los tres presupuestos: qué compra cada nivel';
  s1.content =
    '<p><strong>These are not factory bundles.</strong> They are three builds assembled from individual products, priced at the button total you will actually pay on Amazon. What separates them is not a bigger brand, it is a bigger part of the signal chain.</p>' +
    '<p><strong>Tier 1 at $998</strong> is already a finished studio: a Scarlett 2i2, an NT1 Signature, a pair of powered 5-inch monitors, ATH-M20x headphones, a stand and four acoustic panels. Nothing in that list is aspirational. The KRK Rokit 5 G5 pair is the reason it works as a first home: powered, with a rear LCD you can re-aim for the corner it ends up in.</p>' +
    '<p><strong>Tier 2 at $1,077</strong> spends about $80 more on three things that change how you work. The NT1 5th Generation records 32-bit float, which means a loud take cannot clip and you stop riding the gain. The SSL 2+ MKII brings analogue console preamps. And the monitors change too — the JBL 305P MkII pair adds a waveguide, and the sweet spot gets noticeably wider. This is the tier most people should buy.</p>' +
    '<p><strong>Tier 3 at $2,537</strong> is the one that doubles the budget, and it is worth being honest about why. The Apollo Twin X Gen 2 carries Unison preamps and UAD-2 DSP inside the chassis, so analogue modelling happens before the converter. The TLM 102 puts a Neumann capsule on a microphone you can still afford, with an integrated pop screen that makes the $49 filter necessary in the lower tiers redundant. If you are on a laptop with Thunderbolt and you mix other people’s work, this is where it stops being a hobby.</p>' +
    '<p>All three already pay for acoustic treatment, because that is the part that decides whether the rest works. A $269 microphone in an untreated bedroom records the bedroom.</p>';
  s1.content_es =
    '<p><strong>No son packs de fábrica.</strong> Son tres montajes armados con productos sueltos, con el precio que verás en los botones de Amazon. Lo que los separa no es una marca mejor, es una parte más grande de la cadena de señal.</p>' +
    '<p><strong>El Nivel 1 por $998</strong> ya es un estudio terminado: una Scarlett 2i2, un NT1 Signature, un par de monitores alimentados de 5 pulgadas, auriculares ATH-M20x, un soporte y cuatro paneles acústicos. Nada de esa lista es aspiracional. El par de KRK Rokit 5 G5 es la razón por la que funciona como primer hogar: van alimentados y con una pantalla LCD trasera que puedes reorientar según la esquina en la que acaben.</p>' +
    '<p><strong>El Nivel 2 por $1.077</strong> gasta unos $80 más en tres cosas que cambian cómo trabajas. El NT1 5th Generation graba en 32 bits float, así que una toma fuerte no puede saturar y dejas de vigilar la ganancia. La SSL 2+ MKII trae previos de consola analógica. Y los monitores también cambian: el par de JBL 305P MkII añade una guía de onda y la zona de escucha se ensancha claramente. Este es el nivel que debería comprar la mayoría.</p>' +
    '<p><strong>El Nivel 3 por $2.537</strong> es el que duplica el presupuesto, y conviene ser honesto sobre por qué. El Apollo Twin X Gen 2 lleva dentro previos Unison y DSP UAD-2, así que el modelado analógico ocurre antes del convertidor. El TLM 102 pone una cápsula Neumann en un micrófono que todavía puedes permitirte, con un antipop integrado que hace innecesario el filtro de $49 que sí necesitan los niveles de abajo. Si trabajas desde un portátil con Thunderbolt y mezclas trabajo de otros, aquí es donde deja de ser un pasatiempo.</p>' +
    '<p>Los tres pagan ya el tratamiento acústico, porque esa es la parte que decide si el resto funciona. Un micrófono de $269 en un dormitorio sin tratar graba el dormitorio.</p>';
  ok('seccion de presupuestos reescrita (EN + ES)');
} else no('seccion de presupuestos no encontrada');

fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log(log.join('\n'));
console.log('\n  fila de totales: ' + JSON.stringify(t.rows[7].values.map(v => v.value + ' / ' + v.value_es)));
console.log('  mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
