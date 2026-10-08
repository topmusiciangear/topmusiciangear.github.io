const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(DIR + 'data/products.json', 'utf8'));
const guides = JSON.parse(fs.readFileSync(DIR + 'data/guides.json', 'utf8'));

// 0. PRX ONE (each)
const prx = products.find(y => y.id === 109);
if (!prx.desc.endsWith('(each)')) prx.desc += ' (each)';
if (!prx.desc_es.endsWith('(cada uno)')) prx.desc_es += ' (cada uno)';

// 1. new subs
products.push(
  { id: 630, title: 'Alto Professional TS18S', title_es: 'Alto Professional TS18S', brand: 'Alto Professional', category: 'live_sound', price: 799, rating: 4.6, reviews: 20, badge: 'budget-king',
    desc: '2500W peak 18-inch budget beast with 137 dB max SPL, braced MDF cabinet, DSP tunings (Off/Live/DJ) and phase alignment. Maximum chest-thump per dollar (each).',
    desc_es: 'Bestia económica de 2500 W pico y 18 pulgadas con 137 dB SPL máximo, caja MDF reforzada, DSP (Off/Live/DJ) y alineación de fase. Máxima pegada por dólar (cada uno).',
    img: 'https://www.altoprofessional.com/images/products/TS18_34_D1-web1.jpg',
    stores: { gear4music: 'https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FPA-DJ-and-Lighting%2FAlto-Professional-TS18S-18-Active-PA-Subwoofer%2F5UAD' } },
  { id: 631, title: 'JBL EON718S', title_es: 'JBL EON718S', brand: 'JBL', category: 'live_sound', price: 1089, rating: 4.7, reviews: 25, badge: 'workhorse',
    desc: '1500W peak 18-inch workhorse with 131 dB max SPL, birch-ply cabinet, backlit LCD, dbx DriveRack DSP and Bluetooth app control. The touring DJ standard (each).',
    desc_es: 'Caballo de batalla de 1500 W pico y 18 pulgadas con 131 dB SPL máximo, caja de abedul, LCD retroiluminada, DSP dbx DriveRack y app Bluetooth. El estándar de DJs itinerantes (cada uno).',
    img: 'https://adn.harmanpro.com/productattachment/10491/product_attachment/x_large_2x-245ed2323d6d6c0bfcb0a0b77f2f1615.webp',
    stores: { gear4music: 'https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FPA-DJ-and-Lighting%2FJBL-EON718S-18-Active-PA-Subwoofer%2F4644' } }
);

// 2. guide
const d = guides.find(x => x.id === 'best-live-subwoofers');
console.log('TABLE ROWS:', d.productTable.rows.map(r => r.label));
d.verdictProsCons = d.verdictProsCons.filter(v => !/PRX ONE/.test(v.name));
d.sections = d.sections.filter(s => !/PRX ONE/.test(s.heading || ''));
d.sections.forEach(s => { if (Array.isArray(s.products)) s.products = s.products.filter(p => p !== 109); });
d.featuredProducts = [233, 234, 235, 236, 237, 630, 631];

const C = (en, es) => ({ title: en, title_es: es || en });
const V = (en, es) => ({ value: en, value_es: es || en });
d.productTable.columns.push(C('Alto Professional TS18S'), C('JBL EON718S'));
const byLabel = {
  'Best For': [V('Maximum chest-thump per dollar, budget gigs', 'Máxima pegada por dólar, conciertos baratos'), V('Touring DJs and bands, the reliable standard', 'DJs itinerantes y bandas, el estándar fiable')],
  'Estimated Price': [V('$799.00'), V('$1,089.00')],
  'Type': [V('Powered subwoofer', 'Subwoofer activo'), V('Powered subwoofer', 'Subwoofer activo')],
  'Power': [V('2500W (peak)'), V('1500W (peak)')],
  'Driver': [V('18" woofer'), V('18" woofer')],
  'Frequency Response': [V('35 Hz – 100 Hz'), V('40 Hz – 120 Hz')],
  'Max SPL': [V('137 dB'), V('131 dB')],
  'Coverage': [V('Omni (sub)', 'Omni (sub)'), V('Omni (sub)', 'Omni (sub)')],
  'DSP': [V('DSP tunings + phase alignment', 'DSP + alineación de fase'), V('dbx DriveRack + LCD + Bluetooth app', 'dbx DriveRack + LCD + app Bluetooth')],
  'Inputs': [V('2x XLR/combo + 2x XLR thru', '2x XLR/combo + 2x XLR thru'), V('2x XLR/combo + 2x XLR thru', '2x XLR/combo + 2x XLR thru')],
  'Weight': [V('93 lb (42.2 kg)', '93 lb (42,2 kg)'), V('81.5 lb (37 kg)', '81,5 lb (37 kg)')]
};
let missing = [];
d.productTable.rows.forEach(r => {
  const add = byLabel[r.label];
  if (add) r.values.push(...add); else missing.push(r.label);
});
console.log('rows without mapping:', JSON.stringify(missing));

const VV = (name, pros, cons, pros_es, cons_es) => ({ name, name_es: name, pros, cons, pros_es, cons_es });
d.verdictProsCons.push(
  VV('Alto Professional TS18S',
    ['2500W peak and 137 dB for very little money', 'DSP tunings plus 4-step phase alignment', 'Braced MDF cab with pole socket', 'Loudest budget 18-inch by far'],
    ['93 lb beast, bring a friend', 'No Bluetooth or app control', 'MDF, not birch ply', 'Needs a big van, not a hatchback'],
    ['2500 W pico y 137 dB por muy poco dinero', 'DSP más alineación de fase en 4 pasos', 'Caja MDF reforzada con vaso para mástil', 'El 18" barato más fuerte por lejos'],
    ['Bestia de 42 kg, trae un amigo', 'Sin Bluetooth ni app', 'MDF, no abedul', 'Pide furgón grande, no utilitario']),
  VV('JBL EON718S',
    ['1500W peak with trusted JBL reliability', 'dbx DriveRack DSP plus backlit LCD', 'Bluetooth app control from the dancefloor', 'Birch-ply cab with 7-year warranty'],
    ['81.5 lb, heavier than plastic rivals', 'Premium price over budget subs', 'No stereo imaging, omni as always', 'App pairing fumbles mid-gig sometimes'],
    ['1500 W pico con fiabilidad JBL probada', 'DSP dbx DriveRack más LCD retroiluminada', 'App Bluetooth desde la pista', 'Caja de abedul con 7 años de garantía'],
    ['37 kg, más pesado que rivales plásticos', 'Precio premium sobre subs baratos', 'Sin imagen estéreo, omni como siempre', 'La app falla a mitad de show a veces'])
);

const S = (heading, heading_es, content, content_es, pid) => ({ heading, heading_es, content, content_es, products: [pid] });
d.sections.push(
  S('Chest-Thump per Dollar: Alto TS18S',
    'Pegada por dólar: Alto TS18S',
    '<p><strong>Twenty-five hundred watts and 137 dB for the price of a dinner date.</strong> The TS18S is the loudest budget 18 there is: braced MDF, DSP tunings for Live and DJ, and phase alignment in four steps so tops and subs agree.</p><p>Ninety-three pounds with no app and no Bluetooth — this is old-school muscle. For emerging bands counting every bill, nothing moves more air per dollar.</p>',
    '<p><strong>Dos mil quinientos vatios y 137 dB por el precio de una cena.</strong> El TS18S es el 18 barato más fuerte que existe: MDF reforzado, DSP para Live y DJ, y alineación de fase en cuatro pasos para que tops y subs se entiendan.</p><p>Cuarenta y dos kilos sin app ni Bluetooth — músculo de la vieja escuela. Para bandas emergentes que cuentan cada billete, nada mueve más aire por dólar.</p>',
    630),
  S('The Touring Default: JBL EON718S',
    'El estándar itinerante: JBL EON718S',
    '<p><strong>Fifteen hundred watts of JBL-trusted low end with an LCD on the back.</strong> The EON718S pairs a custom 18 with dbx DriveRack brains — parametric EQ, delay, polarity — plus Bluetooth app control and a birch-ply cab with a 7-year warranty.</p><p>At 81.5 lb it is no featherweight, and you pay for the badge. For DJs and bands who live on the road, it is the safe pair of hands.</p>',
    '<p><strong>Mil quinientos vatios de graves con sello JBL y LCD atrás.</strong> El EON718S junta un 18 a medida con cerebro dbx DriveRack — EQ paramétrico, delay, polaridad — más app Bluetooth y caja de abedul con 7 años de garantía.</p><p>Con 37 kilos no es pluma, y la insignia se paga. Para DJs y bandas que viven en la ruta, es la apuesta segura.</p>',
    631)
);

fs.writeFileSync(DIR + 'data/products.json', JSON.stringify(products, null, 2));
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(guides, null, 2));
console.log('done | products:', products.length, '| cols:', d.productTable.columns.length, '| vpc:', d.verdictProsCons.length, '| sections:', d.sections.length);
