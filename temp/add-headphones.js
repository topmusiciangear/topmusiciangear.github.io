const fs = require('fs');
const file = 'data/products.json';
const list = JSON.parse(fs.readFileSync(file, 'utf8').replace(/^\ufeff/, ''));

function g4m(url) {
  return 'https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=' +
    encodeURIComponent(url);
}

// Audio-Technica ATH-R30x (open-back, ~$99)
const r30x = {
  id: 427,
  title: 'Audio-Technica ATH-R30x',
  title_es: 'Audio-Technica ATH-R30x',
  brand: 'Audio-Technica',
  category: 'headphones',
  price: 99,
  rating: 4.5,
  reviews: 120,
  badge: 'new',
  desc: 'The gateway into Audio-Technica\'s reference R-Series at an entry-level price. Open-back 40mm drivers deliver a wide, natural soundstage with well-defined lows, transparent mids and smooth highs, in a featherlight 210g frame with velour pads that stay comfortable for long sessions. Its 36-ohm impedance drives easily from any interface, laptop or phone.',
  desc_es: 'La puerta de entrada a la serie de referencia R de Audio-Technica a un precio de nivel inicial. Los drivers abiertos de 40mm ofrecen un escenario sonoro amplio y natural con graves definidos, medios transparentes y agudos suaves, en un chasis ultraligero de 210 g con almohadillas de velour que se mantienen cómodas en sesiones largas. Su impedancia de 36 ohmios se maneja fácilmente desde cualquier interfaz, laptop o teléfono.',
  img: 'https://r2.gear4music.com/media/122/1221168/1200/preview.jpg',
  stores: {
    amazon: 'https://www.amazon.com/dp/B0DYQ12RFJ',
    gear4music: g4m('https://www.gear4music.com/Recording-and-Computers/Audio-Technica-ATH-R30X-Pure-Open-Back-Reference-Headphones/76US')
  },
  oos: false
};

// Samson SR850 (semi-open, ~$40)
const sr850 = {
  id: 428,
  title: 'Samson SR850',
  title_es: 'Samson SR850',
  brand: 'Samson',
  category: 'headphones',
  price: 39.9,
  rating: 4.5,
  reviews: 4100,
  badge: 'bestValue',
  desc: 'The low-cost phenomenon of the budget studio world. Semi-open 50mm drivers with neodymium magnets deliver a transparent response, pronounced bass and clear, airy highs for under $50, with a self-adjusting headband and velour earcups that make it a favorite starter pair for musicians and podcasters on a tight budget.',
  desc_es: 'El fenómeno low-cost del mundo del estudio económico. Los drivers semiabiertos de 50mm con imanes de neodimio ofrecen una respuesta transparente, graves pronunciados y agudos claros y aireados por menos de $50, con una diadema autoajustable y almohadillas de velour que lo convierten en el par inicial favorito de músicos y podcasters con presupuesto ajustado.',
  img: 'https://r2.gear4music.com/media/2/24517/1200/preview_1.jpg',
  stores: {
    amazon: 'https://www.amazon.com/dp/B002LBSEQS',
    zzounds: 'https://www.zzounds.com/a--925521/item--SAMSR850C',
    reverb: 'https://reverb.com/p/samson-sr850-sr-series-semi-open-back-over-ear-studio-headphones'
  },
  oos: false
};

list.push(r30x, sr850);
fs.writeFileSync(file, JSON.stringify(list, null, 2), 'utf8');
console.log('Added ids 427 (R30x) and 428 (SR850). Total:', list.length);
