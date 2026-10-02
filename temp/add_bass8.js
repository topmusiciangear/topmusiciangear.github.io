// Add catalog ids 528-535 (home-office basses, all verified 02/10/2026).
const fs = require('fs');
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const AW = (mid, clean) => 'https://www.awin1.com/cread.php?awinmid=' + mid + '&awinaffid=2891111&ued=' + encodeURIComponent(clean);
const G4M = c => AW('1117', c);
const MS = c => AW('63816', c);
const ZZ = code => 'https://www.zzounds.com/a--925521/item--' + code;

P.push(
  {
    id: 528, title: 'Ibanez EHB1000 Headless Bass', title_es: 'Ibanez EHB1000 Headless Bass', brand: 'Ibanez', category: 'basses', price: 1299.99,
    desc: 'Headless 34-inch-scale bass with chambered American basswood body, Bartolini BH2 pickups and Vari-mid 3-band EQ with bypass. Five-piece roasted maple/walnut neck, stainless-steel frets and MR5HS bridge in a compact, desk-friendly footprint.',
    desc_es: 'Bajo headless de escala 34" con cuerpo chambered de tilo americano, pastillas Bartolini BH2 y EQ Vari-mid de 3 bandas con bypass. Mástil de 5 piezas arce tostado/nogal, trastes de acero inoxidable y puente MR5HS en huella compacta de escritorio.',
    img: 'https://www.ibanez.com/common/product_artist_file/file/p_region_EHB1000_AOM_1P_02.png',
    stores: {
      andertons: 'https://www.andertons.co.uk/ibanez-ehb1000-aom-arctic-ocean-matte/',
      musicstore: MS('https://www.musicstore.com/de_AT/EUR/Ibanez-Bass-Workshop-EHB1000-AOM-Arctic-Ocean-Matte/art-BAS0012614-000'),
      amazon: 'https://www.amazon.com/Ibanez-Bass-Workshop-EHB1000-Guitar/dp/B0CLVSD6WX'
    }
  },
  {
    id: 529, title: 'Sire Marcus Miller M6 Headless Bass', title_es: 'Sire Marcus Miller M6 Headless Bass', brand: 'Sire', category: 'basses', price: 699, rating: 5.0, reviews: 2,
    desc: 'Multiscale headless 4-string (33 to 34.5 inches) with Marcus Pure-H Revolution humbuckers and Heritage-3 preamp. Mahogany body, five-piece maple/mahogany C neck, Edgeless rosewood board and stainless frets.',
    desc_es: 'Headless multiescala de 4 cuerdas (33 a 34,5") con humbuckers Marcus Pure-H Revolution y previo Heritage-3. Cuerpo de caoba, mástil C de 5 piezas arce/caoba, diapasón palisandro Edgeless y trastes inoxidables.',
    img: 'https://www.sire-usa.com/cdn/shop/files/M6_4_MA_SATIN_1.png?v=1748584434',
    stores: { andertons: 'https://www.andertons.co.uk/sire-m6-headless-4string-bass-in-black-satin/' }
  },
  {
    id: 530, title: 'Traveler Guitar Ultra-Light Bass', title_es: 'Traveler Guitar Ultra-Light Bass', brand: 'Traveler Guitar', category: 'basses', price: 399.99, rating: 4.7, reviews: 3,
    desc: '30-inch-scale travel bass weighing just 1.55 kg and 33.75 inches long. Passive Shadow piezo pickup, detachable lap-rest frame, neck-through maple construction. Runs to any amp or interface with no battery.',
    desc_es: 'Bajo de viaje de escala 30", solo 1,55 kg y 85,7 cm de largo. Piezo pasivo Shadow, marco lap-rest desmontable, construcción neck-through de arce. Funciona con cualquier ampli o interfaz sin batería.',
    img: 'https://r2.gear4music.com/media/73/731572/1200/preview.jpg',
    stores: {
      gear4music: G4M('https://www.gear4music.com/Guitar-and-Bass/Traveler-Ultra-Light-Bass-Gloss-Black/47KY'),
      amazon: 'https://www.amazon.com/Traveler-Guitar-Ultra-Light-Acoustic-Electric-Travel/dp/B007TWGLPU'
    }
  },
  {
    id: 531, title: 'Traveler Guitar TB-4P Bass', title_es: 'Traveler Guitar TB-4P Bass', brand: 'Traveler Guitar', category: 'basses', price: 549.99,
    desc: '32-inch medium-scale travel bass with Duncan Designed split-coil P pickup and active Volume plus Tone. Built-in headphone amp with clean, boost, overdrive and distortion plus aux-in for silent hotel practice on 2xAAA.',
    desc_es: 'Bajo de viaje de escala media 32" con split-coil P Duncan Designed y Volumen más Tono activos. Amplificador de auriculares integrado con clean, boost, overdrive y distorsión más aux-in para practicar en silencio en hoteles con 2xAAA.',
    img: 'https://www.travelerguitar.com/cdn/shop/files/tb-4p-bass-bass-4682667.jpg?crop=center&height=1200&v=1783451110&width=1200',
    stores: { amazon: 'https://www.amazon.com/dp/B08P38ZWDD' }
  },
  {
    id: 532, title: 'Kala U-Bass Solid Body', title_es: 'Kala U-Bass Solid Body', brand: 'Kala', category: 'basses', price: 369,
    desc: 'Solid-body 23.5-inch-scale bass tuned EADG like a full bass in ukulele size. Passive split-coil pickup with Volume and Tone, offset okoume body, 22 laurel frets. Massive sub lows from a carry-on footprint.',
    desc_es: 'Bajo solid-body de escala 23,5" afinado EADG como un bajo real en tamaño ukelele. Pastilla split-coil pasiva con Volumen y Tono, cuerpo offset de okoume, 22 trastes de laurel. Subgraves masivos en huella de equipaje de mano.',
    img: 'https://r2.gear4music.com/media/121/1219005/1200/preview.jpg',
    stores: {
      gear4music: G4M('https://www.gear4music.com/Guitar-and-Bass/Kala-U-Bass-Solid-Body-Fretted-Red/74VX'),
      amazon: 'https://www.amazon.com/Kala-4-String-Ukulele-Tobacco-SB-TB-FS/dp/B0CHN59TV3'
    }
  },
  {
    id: 533, title: 'Fender Player II Mustang Bass PJ', title_es: 'Fender Player II Mustang Bass PJ', brand: 'Fender', category: 'basses', price: 849.99, rating: 4.9, reviews: 10,
    desc: '30-inch (762 mm) short-scale with Player Series Alnico 5 split-coil P plus single-coil J. Alder body, Modern C maple neck, 19 medium-jumbo frets and 3-way switching. The classic short-scale, fully versatile.',
    desc_es: 'Escala corta 30" (762 mm) con split-coil P más single-coil J Alnico 5 Player Series. Cuerpo de aliso, mástil Modern C de arce, 19 trastes medium-jumbo y conmutador de 3 posiciones. El clásico de escala corta, totalmente versátil.',
    img: 'https://r2.gear4music.com/media/109/1095787/1200/preview.jpg',
    stores: {
      gear4music: G4M('https://www.gear4music.com/Guitar-and-Bass/Fender-Player-II-Mustang-Bass-PJ-MN-3-Color-Sunburst/6HVQ'),
      andertons: 'https://www.andertons.co.uk/fender-player-ii-mustang-bass-pj-maple-fingerboard-3color-sunburst/',
      musicstore: MS('https://www.musicstore.com/de_AT/EUR/Fender-Player-II-Mustang-Bass-PJ-MN-3-Color-Sunburst/art-BAS0012733-004'),
      zzounds: ZZ('FEN0140492')
    }
  },
  {
    id: 534, title: 'Gretsch G2220 Junior Jet Bass II', title_es: 'Gretsch G2220 Junior Jet Bass II', brand: 'Gretsch', category: 'basses', price: 299.99, rating: 3.9, reviews: 8,
    desc: '30.3-inch (770 mm) short-scale single-cut with dual single-coil pickups on current production (older versions had mini-humbuckers). Basswood Jet body, bolt-on maple neck, 20 medium-jumbo frets. Classic looks, easy reach.',
    desc_es: 'Single-cut de escala corta 30,3" (770 mm) con dos pastillas single-coil en producción actual (versiones anteriores con mini-humbuckers). Cuerpo Jet de tilo, mástil atornillado de arce, 20 trastes medium-jumbo. Estética clásica, alcance fácil.',
    img: 'https://r2.gear4music.com/media/32/325168/1200/preview.jpg',
    stores: {
      amazon: 'https://www.amazon.com/Gretsch-G2220-Junior-Bass-Short-Scale/dp/B09NYLL9QK',
      gear4music: G4M('https://www.gear4music.com/G4M/Gretsch-G2220-Electromatic-Jr-Jet-II-Bass-Torino-Green/28HL')
    }
  },
  {
    id: 535, title: 'Jackson JS1X Concert Bass Minion', title_es: 'Jackson JS1X Concert Bass Minion', brand: 'Jackson', category: 'basses', price: 219.99, rating: 4.6, reviews: 16,
    desc: '28.6-inch (726 mm) micro-scale with passive PJ pairing — Jackson P-style neck plus J-style bridge pickups, dual volumes and master tone. Poplar Concert body, one-piece maple speed neck, amaranth 12-inch board with 22 jumbo frets and sharkfin inlays.',
    desc_es: 'Micro-escala 28,6" (726 mm) con PJ pasivo — pastillas Jackson estilo P en mástil más J en puente, dos volúmenes y tono master. Cuerpo Concert de álamo, mástil speed de arce de una pieza, diapasón amaranto 12" con 22 trastes jumbo e incrustaciones sharkfin.',
    img: 'https://r2.gear4music.com/media/48/488750/1200/preview.jpg',
    stores: {
      gear4music: G4M('https://www.gear4music.com/Guitar-and-Bass/Jackson-JS-Series-Concert-Bass-Minion-JS1X-Satin-Black/2KD5'),
      andertons: 'https://www.andertons.co.uk/jackson-js-1x-cb-minion-w-amaranth-fretboard-srn-blk/',
      musicstore: MS('https://www.musicstore.com/en_OT/EUR/Jackson-JS-Series-Concert-Bass-Minion-JS1X-Satin-Black/art-BAS0009914-000'),
      amazon: 'https://www.amazon.com/Jackson-Concert-Minion-Electric-Guitar/dp/B07G3CPM4T'
    }
  }
);
fs.writeFileSync('data/products.json', JSON.stringify(P, null, 2));
console.log('total: ' + P.length + ' | max: ' + Math.max(...P.map(p => p.id)));
