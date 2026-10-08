const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(DIR + 'data/products.json', 'utf8'));
const guides = JSON.parse(fs.readFileSync(DIR + 'data/guides.json', 'utf8'));

// 1. ICOA photo
products.find(y => y.id === 494).img = 'https://r2.gear4music.com/media/52/524280/1200/preview.jpg';

// 2. EVERSE 12
products.push({
  id: 626, title: 'Electro-Voice EVERSE 12', title_es: 'Electro-Voice EVERSE 12',
  brand: 'Electro-Voice', category: 'live_sound', price: 999, rating: 5, reviews: 1, badge: 'battery',
  desc: 'Battery-powered 12-inch PA with 126 dB output, 12-hour battery, 4-channel mixer, Bluetooth and QuickSmart app control. The cordless outdoor gig king.',
  desc_es: 'PA de 12 pulgadas a batería con 126 dB, 12 horas de autonomía, mezclador de 4 canales, Bluetooth y app QuickSmart. El rey sin cables del aire libre.',
  img: 'https://cdn11.bigcommerce.com/s-7659a/images/stencil/1280x1280/products/44077/160745/EV_EVERSE12_Black_White_Hero_Left__54743.1738178266.png?c=2',
  stores: { gear4music: 'https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FPA-DJ-and-Lighting%2FElectro-Voice-Everse-12-Battery-Powered-PA-Speaker-Black%2F653Q' }
});

// 3. guide table + verdicts + sections
const d = guides.find(x => x.id === 'live-sound-pa');
const C = (en, es) => ({ title: en, title_es: es || en });
const V = (en, es) => ({ value: en, value_es: es || en });
d.productTable.columns.push(C('QSC K12.2 Powered Speaker'), C('Alto Professional TS412'), C('Electro-Voice EVERSE 12'));
const newVals = [
  [V('Pro bands and DJs, the reference standard', 'Bandas y DJs pro, el estándar de referencia'), V('Maximum SPL per dollar for budget gigs', 'Máximo SPL por dólar para conciertos baratos'), V('Battery-powered outdoor gigs and events', 'Conciertos y eventos al aire libre a batería')],
  [V('$899.99'), V('$349.00–$399'), V('$999.00')],
  [V('Powered PA speaker', 'Altavoz PA activo'), V('Powered PA speaker', 'Altavoz PA activo'), V('Battery-powered PA speaker', 'Altavoz PA a batería')],
  [V('2000W (peak)'), V('2500W (peak)'), V('400W (peak)')],
  [V('12" + 1.4" HF'), V('12" + 1" HF'), V('12" + 1" HF')],
  [V('50 Hz – 20 kHz'), V('53 Hz – 20 kHz'), V('45 Hz – 20 kHz')],
  [V('132 dB'), V('132 dB'), V('126 dB')],
  [V('75° axisymmetric', '75° axisimétrico'), V('90° x 60°'), V('100° x 60°')],
  [V('Intrinsic Correction DSP + presets', 'DSP Intrinsic Correction + presets'), V('DSP + app control + Bluetooth', 'DSP + app + Bluetooth'), V('QuickSmart DSP + app + Bluetooth', 'QuickSmart DSP + app + Bluetooth')],
  [V('2x XLR/combo + 3.5mm + XLR thru', '2x XLR/combo + 3,5 mm + XLR thru'), V('2x XLR/combo + XLR out + Bluetooth', '2x XLR/combo + XLR salida + Bluetooth'), V('2x XLR/combo + 3.5mm + XLR out', '2x XLR/combo + 3,5 mm + XLR salida')],
  [V('39 lb (17.7 kg)', '39 lb (17,7 kg)'), V('33 lb (15 kg)', '33 lb (15 kg)'), V('31.2 lb (14.16 kg)', '31,2 lb (14,16 kg)')]
];
d.productTable.rows.forEach((r, i) => r.values.push(...newVals[i]));

const VV = (name, pros, cons, pros_es, cons_es) => ({ name, name_es: name, pros, cons, pros_es, cons_es });
d.verdictProsCons.push(
  VV('QSC K12.2 Powered Speaker',
    ['Industry-standard reliability bands ask for by name', '2000W with 132 dB of clean headroom', 'Intrinsic Correction DSP plus deep preset library', '75° axisymmetric coverage fills rooms evenly'],
    ['Premium price over budget boxes', 'No battery option for outdoor gigs', 'ABS cabinet scuffs with heavy touring', 'Menu diving for advanced DSP scenes'],
    ['Fiabilidad estándar que las bandas piden por nombre', '2000 W con 132 dB de headroom limpio', 'DSP Intrinsic Correction más gran librería de presets', 'Cobertura axisimétrica de 75° que llena parejo'],
    ['Precio premium frente a cajas baratas', 'Sin opción a batería para exteriores', 'El ABS se marca con giras duras', 'Buceo por menús para escenas DSP avanzadas']),
  VV('Alto Professional TS412',
    ['2500W peak and 132 dB for very little money', 'Bluetooth streaming plus free app control', 'Fanless cooling runs silent and reliable', 'Pole, wedge or flown with M10 points'],
    ['Plastic cabinet, not birch ply', 'Single XLR output limits linking', 'App needed for custom EQ curves', 'Resale value below big brands'],
    ['2500 W pico y 132 dB por muy poco dinero', 'Streaming Bluetooth más app gratis', 'Sin ventilador: silenciosa y fiable', 'Trípode, cuña o volada con puntos M10'],
    ['Caja plástica, no contrachapado', 'Una sola salida XLR limita enlaces', 'La app es necesaria para EQ personalizada', 'Reventa menor que grandes marcas']),
  VV('Electro-Voice EVERSE 12',
    ['12+ hours of battery for cordless gigs', '126 dB from a 31 lb grab-and-go box', '4-channel mixer with phantom and FX', 'IP43 weatherized for outdoor shows'],
    ['400W runs out before big rooms', 'Premium price for battery freedom', 'Single 12-inch, no deep sub lows', 'App pairing fumbles mid-gig sometimes'],
    ['12+ horas de batería para conciertos sin cables', '126 dB en caja de 14 kg para llevar', 'Mezclador de 4 canales con phantom y FX', 'IP43 contra clima para shows fuera'],
    ['Los 400 W se quedan cortos en salas grandes', 'Precio premium por libertad a batería', 'Un solo 12 pulgadas, sin subgraves hondos', 'El enlace de app falla a mitad de show a veces'])
);

const S = (heading, heading_es, content, content_es, pid) => ({ heading, heading_es, content, content_es, products: [pid] });
d.sections.push(
  S('The Rider-Friendly Standard: QSC K12.2',
    'El estándar de los riders: QSC K12.2',
    '<p><strong>When the venue asks what you are bringing, K12.2 ends the conversation.</strong> Two thousand watts, 132 dB peak and Intrinsic Correction DSP in a 39 lb ABS box — the reference bands, DJs and rental houses have trusted for a decade.</p><p>You pay for the badge, there is no battery, and deep DSP scenes hide in menus. For working pros who bill by the gig, no speaker holds value like it.</p>',
    '<p><strong>Cuando la sala pregunta qué traes, K12.2 termina la conversación.</strong> Dos mil vatios, 132 dB pico y DSP Intrinsic Correction en caja ABS de 17,7 kg — la referencia que bandas, DJs y rentadoras confían hace una década.</p><p>Pagas la insignia, no hay batería, y las escenas DSP hondas se esconden en menús. Para pros que facturan por fecha, ningún altavoz conserva valor como él.</p>',
    106),
  S('Loud for Less: Alto TS412',
    'Fuerte por poco: Alto TS412',
    '<p><strong>Twenty-five hundred watts and 132 dB for the price of a dinner date.</strong> The TS412 pairs Bluetooth streaming and app control with a 3-channel mixer and fanless Class-D cool — the loudest box per dollar in the 12-inch class.</p><p>The cabinet is molded plastic, there is one XLR out, and custom EQ needs the app. For emerging bands counting every bill, nothing touches it.</p>',
    '<p><strong>Dos mil quinientos vatios y 132 dB por el precio de una cena.</strong> El TS412 junta streaming Bluetooth y app con mezclador de 3 canales y frío Class-D sin ventilador — la caja más fuerte por dólar en 12 pulgadas.</p><p>La caja es plástico moldeado, hay una sola salida XLR, y el EQ personalizado pide la app. Para bandas emergentes que cuentan cada billete, nada lo toca.</p>',
    153),
  S('No Outlet, No Problem: EV EVERSE 12',
    'Sin enchufe, sin problema: EV EVERSE 12',
    '<p><strong>Twelve hours of battery, 126 dB and a full mixer where no cable reaches.</strong> The EVERSE 12 runs weddings, street sets and ceremonies on its Li-ion pack, with phantom power, feedback suppression and app control onboard.</p><p>Four hundred watts will not cover big rooms, battery freedom costs premium, and deep lows need a sub. For cordless ceremonies and outdoor gigs, it stands alone.</p>',
    '<p><strong>Doce horas de batería, 126 dB y mezclador completo donde no llega ningún cable.</strong> El EVERSE 12 corre bodas, calle y ceremonias con su pack de litio, con phantom, anti-feedback y app a bordo.</p><p>Cuatrocientos vatios no cubren salas grandes, la libertad a batería cuesta premium, y los graves hondos piden sub. Para ceremonias sin cables y aire libre, no tiene rival.</p>',
    626)
);

fs.writeFileSync(DIR + 'data/products.json', JSON.stringify(products, null, 2));
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(guides, null, 2));
console.log('done | products:', products.length, '| cols:', d.productTable.columns.length, '| vpc:', d.verdictProsCons.length, '| sections:', d.sections.length);
