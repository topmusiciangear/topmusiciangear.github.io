const fs = require('fs');

// ---- Add 3 new products to products.json ----
{
  const fp = 'data/products.json';
  const p = JSON.parse(fs.readFileSync(fp, 'utf8'));
  const exists = id => p.some(x => x.id === id);

  const anchors = {
    462: {
      title: 'Squier Sonic Stratocaster HT',
      title_es: 'Squier Sonic Stratocaster HT',
      brand: 'Squier', category: 'guitars', price: 159, rating: 4.7, reviews: 91, badge: 'recommended',
      img: 'https://r2.gear4music.com/media/91/912607/1200/preview.jpg',
      desc: 'The Squier Sonic Stratocaster HT is the easiest first electric for absolute beginners. Its fixed hardtail bridge means zero tremolo fuss — the strings stay in tune, so you spend your time practicing, not tuning. A poplar body, slim C-shaped maple neck and 9.5-inch radius fingerboard make chords comfortable, and the three ceramic single-coils deliver the classic Strat sound with a simple 5-way switch, 21 frets and a 25.5-inch scale.',
      desc_es: 'La Squier Sonic Stratocaster HT es la primera eléctrica más fácil para principiantes absolutos. Su puente fijo hardtail elimina las complicaciones del trémolo: las cuerdas mantienen la afinación para que dediques tu tiempo a practicar, no a afinar. Un cuerpo de álamo, mástil de arce en C delgado y diapasón de radio 9,5" hacen cómodos los acordes, y las tres single coils cerámicas ofrecen el sonido Strat clásico con un simple conmutador de 5 posiciones, 21 trastes y escala de 25,5".',
      stores: {
        gear4music: 'https://www.gear4music.com/Guitar-and-Bass/Squier-Sonic-Stratocaster-HT-Arctic-White/5E35',
        amazon: 'https://www.amazon.com/Squire-Stratocaster-Electric-Fingerboard-Pickguard/dp/B0BVGSD36S',
        zzounds: 'https://www.zzounds.com/item--SQU0373252',
        andertons: 'https://www.andertons.co.uk/squier-sonic-stratocaster-ht-electric-guitar-arctic-white/'
      },
      excludeStores: ['musicstore', 'reverb']
    },
    463: {
      title: 'Ibanez Gio GRG121DX',
      title_es: 'Ibanez Gio GRG121DX',
      brand: 'Ibanez', category: 'guitars', price: 199, rating: 4.8, reviews: 319, badge: 'recommended',
      img: 'https://r2.gear4music.com/media/33/335583/1200/preview.jpg',
      desc: 'The Ibanez Gio GRG121DX is the perfect beginner guitar for rock and metal. A fast, slim GRG maple neck, two IBZ-6 humbuckers and a fixed F106 bridge deliver thick, punchy distortion without the tuning headaches of a floating tremolo. The poplar body, 24 frets and 25.5-inch scale give you the speed and heavy tone of a much pricier RG, at a fraction of the cost — ideal for beginners who love hard rock, punk and metal.',
      desc_es: 'La Ibanez Gio GRG121DX es la guitarra perfecta para principiantes que quieren rock y metal. Un mástil GRG de arce rápido y delgado, dos humbuckers IBZ-6 y un puente fijo F106 ofrecen una distorsión gruesa y contundente sin los problemas de afinación de un trémolo flotante. El cuerpo de álamo, 24 trastes y escala de 25,5" dan la velocidad y el tono pesado de una RG mucho más cara, a una fracción del precio: ideal para quienes empiezan con hard rock, punk y metal.',
      stores: {
        gear4music: 'https://www.gear4music.com/Guitar-and-Bass/Ibanez-GRG121DX-GIO-Black-Flat/295D',
        andertons: 'https://www.andertons.co.uk/ibanez-grg121dx-bkf-gio-rg-series-hh-fixed-bridge-black-flat/',
        musicstore: 'https://www.musicstore.com/en_OE/EUR/Ibanez-GRG121DX-BKF-Black-Flat/art-GIT0034063-000',
        zzounds: 'https://www.zzounds.com/item--IBAGRG121DX'
      },
      excludeStores: ['amazon', 'reverb']
    },
    464: {
      title: 'Yamaha Revstar Element RSE20',
      title_es: 'Yamaha Revstar Element RSE20',
      brand: 'Yamaha', category: 'guitars', price: 439, rating: 4.8, reviews: 33, badge: 'topQuality',
      img: 'https://r2.gear4music.com/media/84/848538/1200/preview.jpg',
      desc: 'The Yamaha Revstar Element RSE20 is the higher-budget beginner guitar you will never outgrow. A chambered mahogany body with set-in neck gives warm, singing sustain, while the two Alnico V humbuckers (VH3n/VH3b) deliver rich classic-rock tone. The push-pull Dry Switch adds a high-pass filter for extra clarity, and the tune-o-matic bridge with stopbar keeps tuning rock-solid. A 24.75-inch scale and comfortable C-neck make it a joy to play from day one.',
      desc_es: 'La Yamaha Revstar Element RSE20 es la guitarra de mayor presupuesto para principiantes que nunca superarás. Un cuerpo de caoba ahuecada con mástil set-in ofrece un sustain cálido y cantarín, mientras que las dos humbuckers de Alnico V (VH3n/VH3b) dan un tono de rock clásico rico. El Dry Switch push-pull añade un filtro de paso alto para más claridad, y el puente tune-o-matic con tope mantiene la afinación impecable. Una escala de 24,75" y un mástil en C cómodo la hacen un placer desde el primer día.',
      stores: {
        gear4music: 'https://www.gear4music.com/Guitar-and-Bass/Yamaha-Revstar-Element-RSE20-Vintage-White/4PBT',
        andertons: 'https://www.andertons.co.uk/yamaha-revstar-element-rse20-vintage-white/',
        zzounds: 'https://www.zzounds.com/item--YAMRSE20',
        amazon: 'https://www.amazon.com/dp/B09NYLQF5L'
      },
      excludeStores: ['musicstore', 'reverb']
    }
  };

  Object.keys(anchors).forEach(id => {
    id = Number(id);
    const a = anchors[id];
    if (exists(id)) { console.error('id ' + id + ' already exists'); process.exit(1); }
    p.push({
      id, title: a.title, title_es: a.title_es, brand: a.brand, category: a.category,
      price: a.price, rating: a.rating, reviews: a.reviews, badge: a.badge,
      desc: a.desc, desc_es: a.desc_es, img: a.img, stores: a.stores,
      excludeStores: a.excludeStores, oos: []
    });
  });

  fs.writeFileSync(fp, JSON.stringify(p, null, 2) + '\n', 'utf8');
  console.log('products.json: added 462, 463, 464');
}

// ---- Add TEST_SHOP_BTN prices to build-guides.js ----
{
  const fp = 'build-guides.js';
  let s = fs.readFileSync(fp, 'utf8');
  const entries = {
    '462': '{prices:{gear4music:"' + '\u00a3' + '159.00",amazon:"$249.99",zzounds:"$219.99",andertons:"' + '\u00a3' + '159.00"}},',
    '463': '{prices:{gear4music:"' + '\u00a3' + '199.00",andertons:"' + '\u00a3' + '209.00",musicstore:"' + '\u20ac' + '211.00",zzounds:"$229.99"}},',
    '464': '{prices:{gear4music:"' + '\u00a3' + '439.00",andertons:"' + '\u00a3' + '399.00",zzounds:"$549.99",amazon:"$539.99"}},'
  };
  // Insert after the id 461 entry
  const marker = '461: {prices:{amazon:"$169.00",gear4music:"' + '\u00a3' + '155.00"},oos:["zzounds"]}';
  if (s.indexOf(marker) === -1) { console.error('marker 461 not found'); process.exit(1); }
  const insert = marker + '\n  ' + entries['462'] + '\n  ' + entries['463'] + '\n  ' + entries['464'];
  s = s.split(marker).join(insert);
  fs.writeFileSync(fp, s, 'utf8');
  console.log('build-guides.js: added TEST_SHOP_BTN for 462/463/464');
}
console.log('\nPHASE 1 DONE');
