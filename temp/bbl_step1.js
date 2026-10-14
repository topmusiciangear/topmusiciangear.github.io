const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const die = (m) => { console.log('!! ' + m); process.exit(1); };

// ==================== CATALOGO ====================
const pj = BASE + 'data/products.json';
const PJ = JSON.parse(fs.readFileSync(pj, 'utf8'));
const arr = Array.isArray(PJ) ? PJ : PJ.products;
const get = (id) => { const p = arr.find(y => y.id === id); if (!p) die('catalogo ' + id + ' no existe'); return p; };

const p163 = get(163);
p163.price = 599;
p163.desc = "A true passive vintage Jazz Bass at a modern price. North American alder body, roasted hard maple C neck with Edgeless rolled edges, Marcus Vintage-J Revolution set in '70s spacing, bone nut, premium open-gear tuners.";
p163.desc_es = "Un Jazz Bass vintage realmente pasivo a precio moderno. Cuerpo de aliso norteamericano, mástil C de maple duro tostado con bordes sin arista, set Marcus Vintage-J Revolution con separación de los 70, cejuela de hueso y clavijas open-gear premium.";

const p164 = get(164);
p164.price = 649;
p164.desc = 'Blacked-out metal bass. Basswood body, 6-bolt maple Thin C neck, 24 X-Jumbo rosewood board, Schecter Diamond P plus SuperRock MM pickups with master volume/blend and an active 2-band EQ.';
p164.desc_es = 'Bajo negro para metal. Cuerpo de tilo, mástil Thin C de maple con 6 pernos, diapasón de palisandro 24 X-Jumbo, pastillas Schecter Diamond P y SuperRock MM con master volume/blend y EQ activa de 2 bandas.';

const p165 = get(165);
p165.price = 649;
p165.desc = 'Ash body with a spalted maple top in Natural Satin, thin-U 5-piece maple/jatoba neck, 24 XJ frets, passive ESP SB-4 humbuckers plus a switchable ABQ-3 active 3-band EQ, black nickel hardware.';
p165.desc_es = 'Cuerpo de fresno con tapa de arce en Satin Natural, mástil fino en U de 5 piezas maple/jatoba, 24 trastes XJ, humbuckers pasivas ESP SB-4 más EQ activa ABQ-3 de 3 bandas conmutable, herrajes black nickel.';
if (p165.stores.gear4music) { delete p165.stores.gear4music; console.log('catalogo 165: fuera link G4M (era la version FRETLESS, otro producto)'); }
fs.writeFileSync(pj, JSON.stringify(PJ, null, 2));
console.log('catalogo: 163/164/165 descripciones + precios corregidos');

// quitar tambien el boton G4M del B-204SM en TEST_SHOP_BTN
const bj = BASE + 'build-guides.js';
let bsrc = fs.readFileSync(bj, 'utf8');
const i165 = bsrc.search(/\n  165: \{/);
const m165 = /\n  \d+: \{/.exec(bsrc.slice(i165 + 2));
const end165 = i165 + 2 + m165.index + 1;
let blk165 = bsrc.slice(i165 + 1, end165);
if (blk165.includes('gear4music')) {
  blk165 = blk165.replace(/^\s*gear4music: "[^"]*",?\s*$/m, '');
  bsrc = bsrc.slice(0, i165 + 1) + blk165 + bsrc.slice(end165);
  fs.writeFileSync(bj, bsrc);
  console.log('TEST 165: fuera boton G4M (fretless)');
} else console.log('TEST 165: ya sin G4M');

// ==================== GUIA ====================
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === 'budget-bass-like-expensive');
if (g.sections.length !== 17) die('secciones inesperadas: ' + g.sections.length + ' (step1 ya aplicado?)');

const ORDER = [
  ["Squier Classic Vibe '60s Jazz Bass", 157],
  ['Sire Marcus Miller V5 4-String Bass', 163],
  ['Sterling by Music Man StingRay Ray4', 161],
  ['Yamaha TRBX304', 159],
  ['Ibanez SR300E', 160],
  ['Schecter Stiletto Stealth 4 Bass', 164],
  ['ESP LTD B-204SM Bass Guitar', 165],
  ['Fender Player II Precision Bass', 441],
  ['Fender Player II Jazz Bass', 442],
  ["Epiphone Thunderbird '64 Bass", 162]
];
const IDS = ORDER.map(o => o[1]);

// --- 1. featured
g.featuredProducts = IDS.slice();
console.log('featured: 10 productos -> ' + IDS.length);

// --- 2. secciones que desaparecen (listado exacto)
const DROP = [1, 11, 13, 15, 16];
console.log('\n--- SECCIONES QUE DESAPARECEN COMPLETAS ---');
DROP.forEach(i => {
  const s = g.sections[i];
  console.log(' [' + i + '] "' + s.heading + '" | prods ' + JSON.stringify(s.products) + ' | ' + (s.content || '').length + ' car EN / ' + (s.content_es || '').length + ' ES');
});
DROP.forEach(i => { if (!g.sections[i]) die('seccion ' + i + ' vacia'); });
g.sections = g.sections.filter((_, i) => !DROP.includes(i));
console.log('secciones: 17 -> ' + g.sections.length);

// --- 3. sobreviews: quitar productos salientes
const newProds = {
  "Squier Classic Vibe '60s Jazz Bass: A Vintage Tone King": [157, 163],
  'Passive vs Active Bass Electronics: The Real Difference and How to Choose': [157, 163, 159, 160, 165, 164],
  'The Honest Verdict: What Makes a Cheap Bass Sound Expensive?': [157, 163, 161, 159, 160]
};
g.sections.forEach(s => {
  const np = newProds[s.heading];
  if (np) {
    const before = JSON.stringify(s.products);
    s.products = np;
    console.log('overview "' + s.heading.slice(0, 45) + '": ' + before + ' -> ' + JSON.stringify(np));
  }
});

// --- 4. headings unicos
const RENAME = {
  'Sire Marcus Miller V5 4-String Bass: A Closer Look': ['Sire Marcus Miller V5: Signature Pedigree, Modest Money', 'Sire Marcus Miller V5: pedigree de firma, precio modesto'],
  'Schecter Stiletto Stealth 4 Bass: A Closer Look': ['Schecter Stiletto Stealth 4: Blacked Out for Metal', 'Schecter Stiletto Stealth 4: negro total para metal'],
  'ESP LTD B-204SM Bass Guitar: A Closer Look': ['ESP LTD B-204SM: A Spalted Maple Showstopper', 'ESP LTD B-204SM: un arce moteado que enamora'],
  'Fender Player II Jazz Bass: A Closer Look': ['Fender Player II Jazz Bass: The Best-Value Workhorse', 'Fender Player II Jazz Bass: el todoterreno con mejor precio'],
  'Fender Player II Precision Bass: A Closer Look': ['Fender Player II Precision Bass: Studio-Ready Simplicity', 'Fender Player II Precision Bass: la sencillez lista para estudio']
};
let renamed = 0;
g.sections.forEach(s => {
  const pair = RENAME[s.heading];
  if (pair) { s.heading = pair[0]; s.heading_es = pair[1]; renamed++; }
});
console.log('headings fuera de plantilla: ' + renamed + '/5');
if (renamed !== 5) die('faltan renombres: ' + renamed);

// --- 5. reescribir 3 reviews con specs oficiales corregidas
const byProd = (id) => g.sections.find(s => (s.products || [])[0] === id);
const set = (id, en, es) => { const s = byProd(id); if (!s) die('sin review ' + id); s.content = en; s.content_es = es; };

set(163,
  '<p><strong>Few budget instruments borrow this much credibility from a signature name — and this one is genuinely, fully passive.</strong> North American alder, a roasted hard maple C neck with Edgeless rolled edges, a bone nut and the Marcus Vintage-J Revolution set in the \'70s bridge spacing Marcus played on his own Fender. The Marcus Miller Vintage-S bridge and premium open-gear tuners finish a build that looks and feels like a far more expensive vintage Jazz.</p><p><strong>The honest trade.</strong> It is passive all the way down, so there is no EQ to rescue a bad amp or a muddy mix, and open-gear tuners and generic hardware are where the money stops. For players chasing clarity, tuning stability and vintage warmth without a battery, nothing at this price gets closer.</p>',
  '<p><strong>Pocos instrumentos económicos toman prestada tanta credibilidad de un nombre propio, y este es de verdad totalmente pasivo.</strong> Aliso norteamericano, mástil C de maple duro tostado con bordes Edgeless redondeados, cejuela de hueso y el set Marcus Vintage-J Revolution con la separación de los 70 que usaba Marcus en su propio Fender. El puente Marcus Miller Vintage-S y las clavijas open-gear premium cierran una construcción que parece y se siente como un Jazz vintage mucho más caro.</p><p><strong>Lo honesto.</strong> Es pasivo de principio a fin, así que no hay EQ que rescate un ampli malo ni una mezcla embarullada, y en las clavijas abiertas y el hardware genérico se acaba el presupuesto. Para quien busca claridad, estabilidad de afinación y calidez vintage sin batería, nada a este precio se acerca.</p>');

set(164,
  '<p><strong>Dark stages and down-tuned riffs are the Stiletto Stealth 4\'s natural hábitat.</strong> A Schecter Diamond P in the neck and a SuperRock MM in the bridge feed a lightweight basswood body through master volume, blend and an active 2-band EQ, while the 6-bolt maple Thin C neck with a 16-inch radius rosewood board stays fast across 24 X-Jumbo frets. Blacked-out hardware completes the metal-ready posture.</p><p><strong>The honest trade.</strong> The 2-band EQ is minimal, the S-Tek bridge is workmanlike rather than exotic, and vintage warmth simply is not in its vocabulary — Motown sessions or a jazz trio will want a rounder voice elsewhere in this list. For rock and metal speed, attack and sustain, nothing at the price punches harder.</p>',
  '<p><strong>Los escenarios oscuros y los riffs graves son el hábitat natural del Stiletto Stealth 4.</strong> Una Schecter Diamond P en el mástil y una SuperRock MM en el puente alimentan un cuerpo ligero de tilo mediante master volume, blend y una EQ activa de 2 bandas, mientras el mástil Thin C de maple con 6 pernos, radio de 16 pulgadas y diapasón de palisandro con 24 trastes XJ se mantiene veloz. Los herrajes ennegrecidos completan la postura lista para el metal.</p><p><strong>Lo honesto.</strong> La EQ de 2 bandas es mínima, el puente S-Tek es funcional más que exótico, y la calidez vintage sencillamente no está en su vocabulario: una sesión Motown o un trío de jazz pedirán una voz más redonda en otro lugar de esta lista. Para velocidad, ataque y sustain en rock y metal, nada a este precio pega más fuerte.</p>');

set(165,
  '<p><strong>Figured stage appeal meets pragmatic circuitry in the B-204SM.</strong> A spalted maple top over an ash body dresses a bass that is otherwise all business: 24 XJ frets, a fast thin-U 5-piece maple/jatoba neck, and passive ESP SB-4 humbuckers feeding a switchable ABQ-3 active 3-band EQ with black nickel hardware.</p><p><strong>The honest trade.</strong> The 40 mm nut and deep U profile are aimed at players who already know their way around a U shape, the switchable electronics mean one more thing to set correctly before a show, and the ash-plus-spalted-maple look is the real draw — tone here is clear and modern rather than idiosyncratic vintage. It is a stage rocker that photographs as well as it performs.</p>',
  '<p><strong>El atractivo veteado y la circuitería pragmática conviven en el B-204SM.</strong> Una tapa de arce moteado sobre un cuerpo de fresno viste un bajo que por lo demás es puro trabajo: 24 trastes XJ, un rápido mástil fino en U de 5 piezas maple/jatoba y humbuckers pasivas ESP SB-4 que alimentan una EQ activa ABQ-3 de 3 bandas conmutable, con herrajes black nickel.</p><p><strong>Lo honesto.</strong> La cejuela de 40 mm y el perfil profundo en U apuntan a quien ya conoce ese perfil, la electrónica conmutable significa un ajuste más que dejar bien antes de un concierto, y el aspecto fresno + arce moteado es el gran argumento: el tono aquí es claro y moderno, no un vintage con personalidad propria. Es un bajo de escenario que fotografía tan bien como toca.</p>');

console.log('reviews 163/164/165 reescritas con specs oficiales');
fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
console.log('\nSTEP1 OK');