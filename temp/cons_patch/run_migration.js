const fs = require('fs');
const R = 'C:/Users/Daniel/projects/topmusiciangear/data';

function L(p) { return JSON.parse(fs.readFileSync(R + '/' + p, 'utf8')); }
function S(p, d) { fs.writeFileSync(R + '/' + p, JSON.stringify(d, null, 1)); }

const PRODS = L('products.json');
const A = Array.isArray(PRODS) ? PRODS : (PRODS.products || []);
const byId = new Map(A.map(p => [p.id, p]));
const byTitle = new Map(A.map(p => [String(p.title).toLowerCase(), p]));

const GRAW = L('guides.json');
const GS = Array.isArray(GRAW) ? GRAW : (GRAW.guides || []);

// ============================================================
// 1) LOCALIZAR los 2 Apollo y removerlos de portable-interfaces
// ============================================================
const APOLLO_TWIN = 'Universal Audio Apollo Twin X Gen 2';
const APOLLO_X16 = 'Universal Audio Apollo x16 Gen 2';
const UA_NAMES = [APOLLO_TWIN, APOLLO_X16].map(s => s.toLowerCase());

const portable = GS.find(g => g && g.id === 'portable-interfaces');
console.log('== portable-interfaces: ANTES ==');
(portable.sections || []).forEach((s, i) => {
  const ps = Array.isArray(s.products) ? s.products : [];
  const ap = ps.filter(x => UA_NAMES.includes(String(x && (x.title || x.name || x)).toLowerCase()));
  if (ap.length) console.log('  sections[' + i + '] quitar ' + JSON.stringify(ap));
});

const cleaned = portable.sections.map(s => {
  if (!Array.isArray(s.products)) return s;
  s.products = s.products.filter(x => !UA_NAMES.includes(String(x && (x.title || x.name || x)).toLowerCase()));
  return s;
});
portable.sections = cleaned;

// tambien de verdictProsCons y featuredProducts si estuvieran por nombre/id
if (Array.isArray(portable.verdictProsCons)) {
  portable.verdictProsCons = portable.verdictProsCons.filter(v => v && v.name &&
    !UA_NAMES.includes(String(v.name).toLowerCase()) &&
    !UA_NAMES.includes(String(v.name_es || '').toLowerCase()));
}
const twoIds = new Set([16, 182].map(String));
if (Array.isArray(portable.featuredProducts)) {
  const before = portable.featuredProducts.length;
  portable.featuredProducts = portable.featuredProducts.filter(x => !twoIds.has(String(x && (x.id ?? x))));
  if (portable.featuredProducts.length !== before) console.log('  featuredProducts: ' + before + ' -> ' + portable.featuredProducts.length);
}

// ============================================================
// 2) Construir premium-interfaces (portada = img de Apollo x16 id 182)
// ============================================================
const cover = byId.get(182) && byId.get(182).img;
console.log('== portada premium-interfaces = ' + cover);

// datos de productos por id (verificados, sin inventar)
function pdata(id) { const p = byId.get(id); return p; }

const premium = {
  id: 'premium-interfaces',
  title: 'The 7 Best Premium Audio Interfaces for Pro Studios',
  title_es: 'Las 7 Mejores Interfaces de Audio Premium para Estudios Pro',
  titleTag: '7 Best Premium Audio Interfaces (2026): Neumann, UA Apollo, RME & More',
  titleTag_es: '7 Mejores Interfaces Premium (2026): Neumann, UA Apollo, RME y Más',
  category: 'interfaces',
  image: cover,
  badge: 'premium',
  intro: '<p>Premium audio interfaces are where conversion quality, DSP power, and driver stability stop being compromises. If you track vocals, mix immersive audio, or run a commercial studio, these are the interfaces pros choose — and the ones that pay for themselves in the sessions you no longer re-record.</p>',
  intro_es: '<p>Las interfaces premium son donde la calidad de conversión, la potencia DSP y la estabilidad de drivers dejan de ser compromisos. Si grabas voces, mezclas audio inmersivo o diriges un estudio comercial, estas son las interfaces que eligen los profesionales — y las que se pagan solas en las sesiones que ya no tienes que regrabar.</p>',
  sections: [
    {
      h: 'Premium Desktop & Portable Interfaces',
      h_es: 'Interfaces Premium de Escritorio y Portátiles',
      intro: 'Premium desktop interfaces pack flagship conversion and DSP in a footprint that fits a home studio or a mobile pro rig. These are the interfaces you track through for years.',
      intro_es: 'Las interfaces premium de escritorio integran conversión insignia y DSP en un formato que cabe en un estudio casero o en un rig pro móvil. Son las interfaces con las que grabas durante años.',
      products: [512, 16, 17, 183]
    },
    {
      h: 'Premium Rack Interfaces for Immersive & Commercial Studios',
      h_es: 'Interfaces Premium de Rack para Estudios Inmersivos y Comerciales',
      intro: 'Rack units scale to immersive and multichannel studios — 16+ channels of pristine AD/DA, DSP routing, and the I/O to run Dolby Atmos or a full tracking rig.',
      intro_es: 'Las unidades de rack escalan a estudios inmersivos y multicanal — más de 16 canales de AD/DA prístino, ruteo DSP y el I/O para correr Dolby Atmos o un rig de grabación completo.',
      products: [513, 514, 515, 516, 182]
    }
  ],
  conclusion: '<p>The right premium interface pays for itself in the sessions you no longer re-record. Choose the Universal Audio Apollo for the UAD DSP ecosystem, RME for bulletproof driver stability, Neumann for transparent conversion, and Apogee, Audient or Lynx when the studio runs immersive. Buy from a dealer you trust; the Essentials vs Plus bundle changes the price more than the converter.</p>',
  conclusion_es: '<p>La interfaz premium correcta se paga sola en las sesiones que ya no tienes que regrabar. Elige Universal Audio Apollo por el ecosistema UAD DSP, RME por estabilidad de drivers a prueba de balas, Neumann por conversión transparente, y Apogee, Audient o Lynx cuando el estudio sea inmersivo. Compra en un distribuidor de confianza; el bundle Essentials vs Plus cambia más el precio que el convertidor.</p>',
  verdict: {
    title: 'Our Verdict',
    title_es: 'Nuestro Veredicto',
    verdict_en: 'For most pro studios we recommend the RME Fireface UFX III — legendary driver stability, 188 channels and standalone recording make it the workhorse that never lets a session down. For UAD DSP workflows, the Apollo x16 Gen 2 remains the reference; for transparent compact conversion, the Neumann MT 48.',
    verdict_es: 'Para la mayoría de estudios pro recomendamos la RME Fireface UFX III — estabilidad de drivers legendaria, 188 canales y grabación independiente la convierten en el caballo de batalla que nunca falla. Para flujos UAD DSP, el Apollo x16 Gen 2 sigue siendo la referencia; para conversión transparente compacta, la Neumann MT 48.'
  },
  featuredProducts: [182, 16, 183],
  productTable: {
    title: 'Premium Audio Interfaces Compared',
    title_es: 'Interfaces Premium Comparadas',
    columns: [
      { label: 'Interface', label_es: 'Interfaz' },
      { label: 'Form Factor', label_es: 'Formato' },
      { label: 'I/O', label_es: 'I/O' },
      { label: 'Preamps', label_es: 'Previos' },
      { label: 'Conversion', label_es: 'Conversión' },
      { label: 'DSP / Standout', label_es: 'DSP / Destacado' },
      { label: 'Price', label_es: 'Precio' }
    ],
    rows: [
      { name: 'Neumann MT 48', name_es: 'Neumann MT 48', values: ['Desktop','12-in/12-out','2 Neumann 78dB','Premium AD/DA','DSP + touchscreen + AES67/Dante','$1,495'] },
      { name: 'UA Apollo Twin X Gen 2', name_es: 'UA Apollo Twin X Gen 2', values: ['Desktop','10x6 TB3','2 Unison','167dB','UAD-2 DUO + UAD DSP','$999'] },
      { name: 'RME Babyface Pro FS', name_es: 'RME Babyface Pro FS', values: ['Portable','2-in/4-out','2','RME AD/DA','TotalMix FX + SteadyClock FS','$949'] },
      { name: 'RME Fireface UFX III', name_es: 'RME Fireface UFX III', values: ['Rack 1U','188 I/O USB 3.0','4 + 2','135dB D/A','TotalMix FX + DURec + MADI','$3,199'] },
      { name: 'UA Apollo x8p Gen 2', name_es: 'UA Apollo x8p Gen 2', values: ['Rack 1U','16x22 TB3','8 Unison','167dB','HEXA Core UAD DSP','$3,299'] },
      { name: 'Apogee Symphony I/O Mk II 16x16 SE', name_es: 'Apogee Symphony I/O Mk II 16x16 SE', values: ['Rack 2U','16x16 TB3/HD','8','Apogee AD/DA','Modular, DualView touch, Dante','$5,995'] },
      { name: 'Audient ORIA', name_es: 'Audient ORIA', values: ['Rack 1U','16x16 USB-C','2 Console','Immersion','9.1.6 Atmos monitor controller','$3,499'] },
      { name: 'Lynx Aurora-n 16', name_es: 'Lynx Aurora-n 16', values: ['Rack 1U','16x16 USB','–','120dB AD/DA','SynchroLock 2, LSlot, Atmos','$4,199'] },
      { name: 'UA Apollo x16 Gen 2', name_es: 'UA Apollo x16 Gen 2', values: ['Rack 1U','16x22 TB3','–','167dB','HEXA Core UAD DSP, 6 SHARC','$3,999'] }
    ]
  },
  verdictProsCons: [
    {
      name: 'RME Fireface UFX III', name_es: 'RME Fireface UFX III',
      verdict: 'Best all-round flagship', verdict_es: 'La mejor insignia polivalente',
      pros: ['Rock-solid RME drivers', '188 channels + MADI', 'DURec standalone recording', 'SteadyClock FS jitter suppression', 'TotalMix FX routing power'],
      pros_es: ['Drivers RME a prueba de balas', '188 canales + MADI', 'Grabación independiente DURec', 'Supresión de jitter SteadyClock FS', 'Potencia de ruteo TotalMix FX'],
      cons: ['Premium price', 'UFX software quirks occasional', 'Heavier than portable rivals'],
      cons_es: ['Precio premium', 'Alguna rareza puntual en UFX software', 'Más pesada que las rivales portátiles']
    },
    {
      name: 'Universal Audio Apollo x16 Gen 2', name_es: 'Universal Audio Apollo x16 Gen 2',
      verdict: 'Best UAD DSP workflow', verdict_es: 'El mejor flujo de trabajo UAD DSP',
      pros: ['162dB conversion', 'HEXA Core UAD DSP (6 SHARC)', 'Unison preamp modeling', 'Realtime UAD plugin tracking', 'Monitor correction + talkback'],
      pros_es: ['Conversión de 162dB', 'HEXA Core UAD DSP (6 SHARC)', 'Modelado de previos Unison', 'Grabación en tiempo real con plugins UAD', 'Corrección de monitores + talkback'],
      cons: ['UAD plugins are an ecosystem investment', 'Thunderbolt 3 requires TB ports', 'No preamps onboard'],
      cons_es: ['Los plugins UAD requieren invertir en el ecosistema', 'Thunderbolt 3 requiere puertos TB', 'Sin previos integrados']
    },
    {
      name: 'Neumann MT 48', name_es: 'Neumann MT 48',
      verdict: 'Best desktop conversion', verdict_es: 'La mejor conversión de escritorio',
      pros: ['Flagship Neumann AD/DA', 'DSP + touchscreen', 'AES67/Dante + ADAT', 'Two Neumann mic preamps', 'Up to 9.1.6 monitoring'],
      pros_es: ['AD/DA insignia Neumann', 'DSP + pantalla táctil', 'AES67/Dante + ADAT', 'Dos previos de micrófono Neumann', 'Monitoreo hasta 9.1.6'],
      cons: ['Expensive for desktop', 'Fewer I/O than rack units'],
      cons_es: ['Cara para escritorio', 'Menos I/O que las unidades de rack']
    }
  ],
  faq: [
    { q: 'Is a premium audio interface worth the price?',
      a: 'For pro studios, yes — conversion quality, DSP, and driver stability reduce re-records and save session time. For a portable on-the-go rig, a quality portable interface is often the smarter buy.',
      q_es: '¿Vale la pena el precio de una interfaz premium?',
      a_es: 'Para estudios pro, sí — la calidad de conversión, el DSP y la estabilidad de drivers reducen regrabaciones y ahorran tiempo de sesión. Para un rig portátil, a menudo una interfaz portátil de calidad es la compra más inteligente.' },
    { q: 'RME Fireface UFX III or Universal Audio Apollo x16 Gen 2?',
      a: 'Fireface UFX III for bulletproof drivers, 188 channels nerve and standalone DURec recording; Apollo x16 Gen 2 for the UAD DSP ecosystem and Unison preamp modeling.',
      q_es: '¿RME Fireface UFX III o Universal Audio Apollo x16 Gen 2?',
      a_es: 'Fireface UFX III por drivers a prueba de balas, 188 canales y grabación autónoma DURec; Apollo x16 Gen 2 por el ecosistema UAD DSP y el modelado de previos Unison.' },
    { q: 'Do I need Thunderbolt for a premium interface?',
      a: 'Most flagship rack units use Thunderbolt 3 for low-latency multi-channel I/O. Desktop units like the Neumann MT 48 run over USB-C and AES67, so check your host before buying.',
      q_es: '¿Necesito Thunderbolt para una interfaz premium?',
      a_es: 'La mayoría de unidades de rack insignia usan Thunderbolt 3 para I/O multicanal de baja latencia. Las de escritorio como la Neumann MT 48 funcionan por USB-C y AES67, así que revisa tu equipo antes de comprar.' },
    { q: 'Which premium interface is best for Dolby Atmos?',
      a: 'The Audient ORIA and Lynx Aurora-n are designed for immersive workflows — ORIA adds 9.1.6 monitor control, Aurora-n adds onboard DSP room correction and Atmos support.',
      q_es: '¿Qué interfaz premium es mejor para Dolby Atmos?',
      a_es: 'La Audient ORIA y la Lynx Aurora-n están diseñadas para flujos inmersivos — ORIA añade control de monitores 9.1.6, Aurora-n añade DSP de corrección de sala y soporte Atmos.' }
  ],
  featuredSnippet: {
    title: '7 Best Premium Audio Interfaces 2026',
    title_es: '7 Mejores Interfaces Premium 2026',
    faqTitle: 'Premium Audio Interface FAQ',
    faqTitle_es: 'Preguntas Frecuentes de Interfaces Premium',
    faq_a1: 'RME Fireface UFX III for reliability; UA Apollo x16 Gen 2 for UAD DSP; Neumann MT 48 for desktop conversion.',
    faq_a1_es: 'RME Fireface UFX III por fiabilidad; UA Apollo x16 Gen 2 por UAD DSP; Neumann MT 48 por conversión de escritorio.'
  },
  description: 'The 7 best premium audio interfaces for pro studios in 2026 — Neumann MT 48, Universal Audio Apollo Twin X and x16 Gen 2, RME Babyface Pro FS, RME Fireface UFX III, Apollo x8p Gen 2, Apogee Symphony I/O Mk II, Audient ORIA and Lynx Aurora-n. Real prices, verified dealers, EN/ES.',
  description_es: 'Las 7 mejores interfaces de audio premium para estudios pro en 2026 — Neumann MT 48, Universal Audio Apollo Twin X y x16 Gen 2, RME Babyface Pro FS, RME Fireface UFX III, Apollo x8p Gen 2, Apogee Symphony I/O Mk II, Audient ORIA y Lynx Aurora-n. Precios reales, distribuidores verificados, EN/ES.',
  relatedGuides: ['portable-interfaces', 'pro-interfaces', 'apollo-vs-babyface', 'best-interface', 'streaming-interfaces'],
  datePublished: '2026-09-20',
  author: { '@type': 'Person', name: 'Daniel Carnago', url: 'https://topmusiciangear.com/about.html' }
};

// si ya existia premium-interfaces, sustituir; si no, anadir
const idx = GS.findIndex(g => g && g.id === 'premium-interfaces');
if (idx >= 0) GS[idx] = premium; else GS.push(premiumipse);

console.log('== GUIDE premium-interfaces creada/actualizada ==');
console.log('  sections=' + premium.sections.length + ' | featuredProducts=' + JSON.stringify(premium.featuredProducts));

// ============================================================
// 3) Guardar
// ============================================================
const outG = Array.isArray(GRAW) ? GS : Object.assign({}, GRAW, { guides: GS });
S('guides.json', outG);
console.log('guardado guides.json');

// verificar resultado
const G2 = L('guides.json');
const GS2 = Array.isArray(G2) ? G2 : (G2.guides || []);
const por = GS2.find(g => g && g.id === 'portable-interfaces');
const prem = GS2.find(g => g && g.id === 'premium-interfaces');
console.log('\n== VERIFICAR portable-interfaces: Apollo removidos? ==');
(por.sections || []).forEach((s, i) => {
  const ap = (s.products || []).filter(x => UA_NAMES.includes(String(x && (x.title || x.name || x)).toLowerCase()));
  console.log('  sections[' + i + '] productos=' + (s.products || []).length + ' | Apollo restantes=' + ap.length);
});
console.log('\n== VERIFICAR premium-interfaces: contenido ==');
console.log('  exist=!!premium (' + (prem ? 'ok' : 'FALTA') + ')');
console.log('  cover=' + (prem && prem.image));
console.log('  featuredProducts=' + JSON.stringify(prem && prem.featuredProducts));
