const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const die = (m) => { console.log('!! ' + m); process.exit(1); };

// IMAGENES PENDIENTES DEL USUARIO (G4M) — el script no corre sin ellas
const IMG_BB234 = 'https://shop.usa.yamaha.com/media/catalog/product/cache/6517c62f5899ad6aa0ba23ceb3eeff97/3/a/3a070ac30dcf4e068153143e124a2af8_12073_a4053d844079393a84ee7aeb40287db9.jpg';
const IMG_TMB30 = 'https://www.ibanez.com/common/product_artist_file/file/p_region_TMB30_BK_1P_03.png';
if (!IMG_BB234 || !IMG_TMB30) die('faltan imagenes G4M: BB234 y TMB30');

// ---------- 1. CATALOGO 681 + 682 ----------
const pj = BASE + 'data/products.json';
const P = JSON.parse(fs.readFileSync(pj, 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
if (arr.some(x => x.id === 681 || x.id === 682)) die('681/682 ya existen');
arr.push({
  id: 681, title: 'Yamaha BB234', title_es: 'Yamaha BB234', brand: 'Yamaha',
  category: 'bass', price: 359,
  desc: 'Indestructible alder workhorse with ceramic V3 P/J pickups, slim maple neck and passive Vol/Vol/Tone. 21 frets, 34-inch scale, open-gear tuners — a decade-long beginner bass.',
  desc_es: 'Caballo de batalla de aliso con pastillas cerámicas V3 P/J, mástil fino de maple y Vol/Vol/Tono pasivos. 21 trastes, escala 34 pulgadas, clavijas abiertas: un bajo para una década.',
  img: IMG_BB234, image: IMG_BB234, stores: {}, excludeStores: ['reverb']
});
arr.push({
  id: 682, title: 'Ibanez TMB30 Talman', title_es: 'Ibanez TMB30 Talman', brand: 'Ibanez',
  category: 'bass', price: 249,
  desc: '30-inch short-scale offset bass with Dynamix P/J pickups, poplar body and jatoba board. Passive 2xVol/Tone, vintage tuners — PJ versatility with zero stretch.',
  desc_es: 'Bajo offset de escala corta 30 pulgadas con pastillas Dynamix P/J, cuerpo de álamo y diapasón de jatoba. Pasivo 2xVol/Tono, clavijas vintage: versatilidad PJ sin estirarse.',
  img: IMG_TMB30, image: IMG_TMB30,
  stores: {
    amazon: 'https://www.amazon.com/Ibanez-TMB30-Talman-Standard-Black/dp/B01BLLE250',
    musicstore: 'https://www.musicstore.com/en_OE/EUR/Ibanez-Standard-TMB30-MGR-Mint-Green/art-BAS0010182-000'
  },
  excludeStores: ['reverb']
});
fs.writeFileSync(pj, JSON.stringify(P, null, 2));
console.log('catalogo: alta 681 BB234 + 682 TMB30');

// ---------- 2. TEST ----------
const bj = BASE + 'build-guides.js';
let src = fs.readFileSync(bj, 'utf8');
const ini = src.indexOf('const TEST_SHOP_BTN');
const abre = src.indexOf('{', ini);
const anchor = '  680: {';
const ai = src.indexOf(anchor, abre);
if (ai === -1) die('ancla 680 no encontrada');
src = src.slice(0, ai) + '  681: {\n    prices: {\n    },\n    urls: {\n    }\n  },\n  682: {\n    prices: {\n      musicstore: "€241.00"\n    },\n    urls: {\n      amazon: "https://www.amazon.com/Ibanez-TMB30-Talman-Standard-Black/dp/B01BLLE250",\n      musicstore: "https://www.musicstore.com/en_OE/EUR/Ibanez-Standard-TMB30-MGR-Mint-Green/art-BAS0010182-000"\n    }\n  },\n' + src.slice(ai);
fs.writeFileSync(bj, src);
try { new Function(fs.readFileSync(bj, 'utf8')); console.log('TEST 681/682 creados'); }
catch (err) { die('ROTO: ' + err.message); }

// ---------- 3. GUIA ----------
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === 'beginner-bass-guitars');
if (g.featuredProducts.length !== 8) die('featured inesperado: ' + g.featuredProducts.length);

g.featuredProducts.push(681, 682);
g.sections[0].products.push(681, 682);

g.sections.push({
  heading: 'Yamaha BB234: A PJ Workhorse for a Decade',
  heading_es: 'Yamaha BB234: un PJ todoterreno para una década',
  products: [681],
  content: '<p><strong>The BB234 is the buy-it-once beginner bass.</strong> A solid alder body with ceramic V3 P/J pickups delivers clean, punchy tone with serious output, while the slim maple neck (thinner than previous BBs) and 21 medium frets keep learning fatigue-free. Passive Vol/Vol/Tone means zero batteries and zero menus.</p><p><strong>The honest trade.</strong> Full 34-inch scale demands real stretching from small hands, there is no active EQ option for modern slap tones, and plain finishes bore players who want stage flash. Around ~$359, it is the safe pick that lasts a decade.</p>',
  content_es: '<p><strong>El BB234 es el bajo de principiante para comprar una sola vez.</strong> Cuerpo sólido de aliso con pastillas cerámicas V3 P/J de tono limpio y pegada con salida seria, mientras el mástil fino de maple (más delgado que BBs anteriores) y 21 trastes medianos evitan la fatiga. Vol/Vol/Tono pasivos: cero baterías y cero menús.</p><p><strong>Lo honesto.</strong> La escala completa de 34 pulgadas exige estirar manos pequeñas, no hay opción activa para slap moderno y los acabados sobrios aburren a quien quiere flash. Por ~$359, es la compra segura que dura una década.</p>'
});
g.sections.push({
  heading: 'Ibanez TMB30: Short-Scale PJ on a Budget',
  heading_es: 'Ibanez TMB30: PJ de escala corta económico',
  products: [682],
  content: '<p><strong>The TMB30 answers the Bronco with two pickups.</strong> A 30-inch short scale in an offset Talman body with poplar warmth, Dynamix P/J pickups cover thump to snap while low tension keeps beginner fingers pain-free. Passive 2xVol/Tone, jatoba board, vintage tuners and B10 bridge — photogenic and simple.</p><p><strong>The honest trade.</strong> 20 frets and basic hardware cap soloing and finesse, and short scale flops with heavy strings. Around ~$249, it is silly value for a compact PJ — ideal for kids, converts and couch practice.</p>',
  content_es: '<p><strong>El TMB30 responde al Bronco con dos pastillas.</strong> Escala corta de 30 pulgadas en cuerpo offset Talman con calidez de álamo, pastillas Dynamix P/J del thump al snap mientras la baja tensión cuida dedos principiantes. Pasivo 2xVol/Tono, jatoba, clavijas vintage y puente B10: fotogénico y simple.</p><p><strong>Lo honesto.</strong> 20 trastes y hardware básico limitan solos y finura, y la escala corta flojea con cuerdas gruesas. Por ~$249, es valor absurdo para un PJ compacto: ideal para niños, conversos y sillón.</p>'
});
console.log('reviews agregadas');

// Tabla: columnas 9 y 10
const NCOL = g.productTable.columns.length;
if (NCOL !== 8) die('columnas inesperadas: ' + NCOL);
g.productTable.columns.push({ title: 'Yamaha BB234', title_es: 'Yamaha BB234' });
g.productTable.columns.push({ title: 'Ibanez TMB30 Talman', title_es: 'Ibanez TMB30 Talman' });
const cols = {
  'Yamaha BB234': {
    'Best For': ['Tough PJ workhorse for years', 'PJ todoterreno para años'],
    'Estimated Price': ['~$359', '~$359'],
    'Body Wood': ['Alder', 'Aliso'],
    'Neck': ['Maple, 21 frets', 'Maple, 21 trastes'],
    'Frets & Fretboard': ['21, rosewood', '21, palisandro'],
    'Pickups': ['Ceramic P/J (V3)', 'Cerámica P/J (V3)'],
    'Active/Passive': ['Passive', 'Pasiva'],
    'Scale Length': ['34 in (864 mm)', '34 in (864 mm)'],
    'Electronics': ['Vol, vol, tone', 'Vol, vol, tono'],
    'Tuners': ['Lightweight open-gear', 'Open-gear ligeras'],
    'Weight': ['Not published (varies by unit)', 'No publicado (varía por unidad)'] },
  'Ibanez TMB30 Talman': {
    'Best For': ['Short-scale PJ versatility', 'PJ versátil en escala corta'],
    'Estimated Price': ['~$249', '~$249'],
    'Body Wood': ['Poplar', 'Álamo'],
    'Neck': ['Maple, 20 frets', 'Maple, 20 trastes'],
    'Frets & Fretboard': ['20, jatoba', '20, jatoba'],
    'Pickups': ['Dynamix P/J', 'Dynamix P/J'],
    'Active/Passive': ['Passive', 'Pasiva'],
    'Scale Length': ['30 in (762 mm)', '30 in (762 mm)'],
    'Electronics': ['2x vol, tone', '2x vol, tono'],
    'Tuners': ['Vintage-style', 'Estilo vintage'],
    'Weight': ['Not published (varies by unit)', 'No publicado (varía por unidad)'] }
};
g.productTable.rows.forEach(r => {
  if (r.values.length !== NCOL) die('fila desalineada: ' + r.label);
  ['Yamaha BB234', 'Ibanez TMB30 Talman'].forEach(t => {
    const v = (cols[t] || {})[r.label];
    if (!v) die('sin valores ' + t + ' / ' + r.label);
    r.values.push({ value: v[0], value_es: v[1] });
  });
});
console.log('tabla: 10 columnas');

// Veredictos
const mkV = (name, pros, cons, pros_es, cons_es) => ({ name, name_es: name, pros, cons, pros_es, cons_es });
g.verdictProsCons.push(mkV('Yamaha BB234',
  ['Ceramic V3 P/J with serious clean output', 'Slim maple neck, 21 frets, fatigue-free learning', 'Passive Vol/Vol/Tone — no batteries, no menus', 'Alder body and open-gear tuners built for the road'],
  ['34-inch scale stretches small hands', 'No active EQ for modern slap tones', 'Plain finishes bore flash seekers', '~$359 costs more than short-scale rivals'],
  ['P/J cerámicas V3 con salida seria y limpia', 'Mástil fino de maple, 21 trastes, aprendizaje sin fatiga', 'Vol/Vol/Tono pasivos: sin baterías ni menús', 'Aliso y clavijas abiertas hechos para la gira'],
  ['La escala de 34 estira manos pequeñas', 'Sin EQ activa para slap moderno', 'Los acabados sobrios aburren', '~$359 cuesta más que rivales cortos']));
g.verdictProsCons.push(mkV('Ibanez TMB30 Talman',
  ['30-inch short scale, zero stretch, low tension', 'Dynamix P/J covers thump to snap', 'Passive simplicity with photogenic offset style', 'Ridiculous value near ~$249'],
  ['20 frets and basic hardware cap finesse', 'Short scale flops with heavy strings', 'Single pickup character per position, no blending magic', 'Light body can neck-dive on cheap straps'],
  ['Escala corta de 30: cero estirón, baja tensión', 'Dynamix P/J del thump al snap', 'Simplicidad pasiva con estilo offset fotogénico', 'Valor absurdo por ~$249'],
  ['20 trastes y hardware básico limitan finura', 'La escala corta flojea con cuerdas gruesas', 'Un carácter por pastilla, sin magia de mezcla', 'El cuerpo ligero cabecea con correas baratas']));
console.log('veredictos: ' + g.verdictProsCons.length);
fs.writeFileSync(gj, JSON.stringify(guides, null, 2));

// ---------- VERIFICACION ----------
const all = JSON.stringify(g);
console.log('BB234 menciones:', (all.match(/BB234/g) || []).length);
console.log('TMB30 menciones:', (all.match(/TMB30/g) || []).length);
console.log('desalineadas:', g.productTable.rows.filter(r => r.values.length !== 10).length);
console.log('paridad:', g.verdictProsCons.every(v => v.pros.length === v.pros_es.length && v.cons.length === v.cons_es.length && v.pros.length >= 4 && v.cons.length >= 4));
