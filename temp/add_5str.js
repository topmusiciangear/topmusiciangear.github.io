// Add catalog ids 538-549 (5-string basses, all verified 02/10/2026).
const fs = require('fs');
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const AW = (mid, clean) => 'https://www.awin1.com/cread.php?awinmid=' + mid + '&awinaffid=2891111&ued=' + encodeURIComponent(clean);
const G4M = c => AW('1117', c);
const MS = c => AW('63816', c);
const ZZ = code => 'https://www.zzounds.com/a--925521/item--' + code;
P.push(
  {
    id: 538, title: 'Ibanez GSR205B Gio Bass', title_es: 'Ibanez GSR205B Gio Bass', brand: 'Ibanez', category: 'basses', price: 299.99, rating: 4.5, reviews: 12,
    desc: '34-inch 5-string with passive Dynamix H neck plus bridge humbuckers and Phat II active bass boost. Okoume body, GSR5 maple neck, 22 medium frets and B15 bridge with 16.5 mm spacing. The cheapest honest five.',
    desc_es: 'Cinco cuerdas 34" con humbuckers pasivos Dynamix H en mástil más puente y boost activo Phat II. Cuerpo de okoume, mástil GSR5 de arce, 22 trastes medium y puente B15 con spacing 16,5 mm. El cinco cuerdas honesto más barato.',
    img: 'https://r2.gear4music.com/media/136/1369862/1200/preview.jpg',
    stores: { gear4music: G4M('https://www.gear4music.com/Guitar-and-Bass/Ibanez-GSR205B-GIO-5-String-Bass-Weathered-Black/2AOD'), musicstore: MS('https://www.musicstore.com/en_OT/EUR/Ibanez-GSR-205-Black-/art-BAS0000649-000'), zzounds: ZZ('IBAGSR205') }
  },
  {
    id: 539, title: 'Sterling by Music Man SUB Ray5', title_es: 'Sterling by Music Man SUB Ray5', brand: 'Sterling by Music Man', category: 'basses', price: 449, rating: 4.0, reviews: 21,
    desc: '34-inch StingRay voice with a high-output ceramic humbucker and 9V 2-band active preamp. Jabon body, hard maple neck and board, 12-inch radius, 21 medium frets, 45 mm nut and 6-bolt joint. No gig bag included.',
    desc_es: 'Voz StingRay 34" con humbucker cerámico de alta salida y previo activo 2 bandas a 9V. Cuerpo de jabón, mástil y diapasón de arce duro, radio 12", 21 trastes medium, cejuela 45 mm y unión 6 tornillos. Sin funda incluida.',
    img: 'https://cdn11.bigcommerce.com/s-4hc0jwsnnq/images/stencil/1280x1280/products/25427/285280/RAY5CHBM1%2520%282%29__64341.1770265205.jpg?c=1',
    stores: { andertons: 'https://www.andertons.co.uk/sterling-by-music-man-sub-ray-5-chopper-blue-mn/', zzounds: ZZ('SBMRAY5') }
  },
  {
    id: 540, title: 'Yamaha TRBX305 Bass', title_es: 'Yamaha TRBX305 Bass', brand: 'Yamaha', category: 'basses', price: 499.99, rating: 4.8, reviews: 13,
    desc: '34-inch 5-string with YGD M3 ceramic humbuckers, master Volume plus balancer plus 2-band EQ and 5-way Performance EQ switch. Solid mahogany body, 5-piece maple and mahogany neck, rosewood board with 24 medium frets.',
    desc_es: 'Cinco cuerdas 34" con humbuckers cerámicos YGD M3, Volumen master más balance más EQ 2 bandas y switch Performance EQ de 5 posiciones. Cuerpo sólido de caoba, mástil 5 piezas arce y caoba, diapasón palisandro con 24 trastes medium.',
    img: 'https://r2.gear4music.com/media/6/67664/1200/preview.jpg',
    stores: { gear4music: G4M('https://www.gear4music.com/Guitar-and-Bass/Yamaha-TRBX305-5-String-Bass-Black/QTJ'), andertons: 'https://www.andertons.co.uk/yamaha-trbx305-5-string-bass-guitar-in-black/' }
  },
  {
    id: 541, title: 'Squier Affinity Jazz Bass V', title_es: 'Squier Affinity Jazz Bass V', brand: 'Squier', category: 'basses', price: 399.99,
    desc: '34-inch passive 5-string with ceramic single-coil J pickups and VVT wiring — not the Active version. Poplar body, maple C neck with satin finish, laurel 9.5-inch board, 20 medium-jumbo frets and 47.6 mm bone nut.',
    desc_es: 'Cinco cuerdas pasivo 34" con single-coils J cerámicas y cableado VVT — no es la versión Active. Cuerpo de álamo, mástil C de arce satinado, diapasón laurel 9,5", 20 trastes medium-jumbo y cejuela hueso 47,6 mm.',
    img: 'https://cdn11.bigcommerce.com/s-4hc0jwsnnq/images/stencil/1280x1280/products/21146/72971/437281-Screenshot%25202021-03-18%2520at%252012.28.13__95970.1757519861.jpg?c=1',
    stores: { andertons: 'https://www.andertons.co.uk/squier-affinity-jazz-bass-v-in-3-colour-sunburst-with-indian-laurel-fingerboard/', zzounds: ZZ('SQU0378651') }
  },
  {
    id: 542, title: 'Sire Marcus Miller V7 New Gen 5-String', title_es: 'Sire Marcus Miller V7 New Gen 5-String', brand: 'Sire', category: 'basses', price: 729,
    desc: 'Current V7 generation (successor to the Gen 2) with simplified 4-knob active preamp plus push-pull active/passive. Alder body, hard maple C neck, ebony Edgeless board 9.5 inch, medium-jumbo stainless frets and bone 46 mm nut.',
    desc_es: 'Generación V7 actual (sucesora de la Gen 2) con previo activo simplificado de 4 perillas más push/pull activo/pasivo. Cuerpo de aliso, mástil C de arce duro, diapasón ébano Edgeless 9,5", trastes inox medium-jumbo y cejuela hueso 46 mm.',
    img: 'https://cdn11.bigcommerce.com/s-4hc0jwsnnq/images/stencil/1280x1280/products/50294/274353/V7A5TS_1__29705.1786718513.jpg?c=1',
    stores: { andertons: 'https://www.andertons.co.uk/sire-v7-alder5-new-gen-bass-guitar--tobacco-sunburst/' }
  },
  {
    id: 543, title: 'Yamaha BB435 Bass', title_es: 'Yamaha BB435 Bass', brand: 'Yamaha', category: 'basses', price: 659.99,
    desc: '34-inch passive 5-string with YGD Custom V5 Alnico V PJ pickups and VVT wiring. Solid alder body, 5-piece maple and mahogany 6-bolt miter neck, rosewood board with 21 medium frets and Vintage Plus convertible bridge.',
    desc_es: 'Cinco cuerdas pasivo 34" con pastillas PJ YGD Custom V5 Alnico V y cableado VVT. Cuerpo sólido de aliso, mástil 5 piezas arce y caoba con unión miter 6 tornillos, diapasón palisandro con 21 trastes medium y puente convertible Vintage Plus.',
    img: 'https://r2.gear4music.com/media/67/670099/1200/preview.jpg',
    stores: { gear4music: G4M('https://www.gear4music.com/Guitar-and-Bass/Yamaha-BB-435-5-String-Bass-Black/3VDA'), amazon: 'https://www.amazon.com/Yamaha-BB435-5-String-Bass-Guitar/dp/B074F3MQ9M' }
  },
  {
    id: 544, title: 'Ibanez SR505E Bass', title_es: 'Ibanez SR505E Bass', brand: 'Ibanez', category: 'basses', price: 799.99,
    desc: '34-inch 5-string with passive Bartolini BH2 pickups — not Nordstrand (that is the SR505N) — plus Custom 3-band EQ with bypass and mid switch. Okoume body, SR5 5-piece jatoba and walnut neck, rosewood board with 24 medium frets and Accu-cast B505 bridge. Discontinued: hunt remaining stock.',
    desc_es: 'Cinco cuerdas 34" con pastillas pasivas Bartolini BH2 — no Nordstrand (esa es la SR505N) — más EQ Custom 3 bandas con bypass y switch de medios. Cuerpo de okoume, mástil SR5 5 piezas jatoba y nogal, diapasón palisandro con 24 trastes medium y puente Accu-cast B505. Descontinuado: busca stock restante.',
    img: 'https://cdn11.bigcommerce.com/s-4hc0jwsnnq/images/stencil/1280x1280/products/59917/425833/SH-114-2649%2520%282%29__18420.1789564304.jpg?c=1',
    stores: { zzounds: ZZ('IBASR505E') }
  },
  {
    id: 545, title: "Squier Classic Vibe '70s Jazz Bass V", title_es: "Squier Classic Vibe '70s Jazz Bass V", brand: 'Squier', category: 'basses', price: 479.99, rating: 4.5, reviews: 13,
    desc: "34-inch passive 5-string with Fender-Designed alnico single-coils in 70s spacing. Poplar or soft maple body by finish, maple C neck, 9.5-inch board with 20 narrow-tall frets, black block inlays and nickel hardware.",
    desc_es: 'Cinco cuerdas pasivo 34" con single-coils alnico diseñadas por Fender en spacing 70s. Cuerpo álamo o arce blando según acabado, mástil C de arce, diapasón 9,5" con 20 trastes narrow tall, bloques negros y hardware níquel.',
    img: 'https://r2.gear4music.com/media/44/447474/1200/preview.jpg',
    stores: { gear4music: G4M('https://www.gear4music.com/Guitar-and-Bass/Squier-Classic-Vibe-70s-5-String-Jazz-Bass-MN-Natural/2U5P'), zzounds: ZZ('SQU0374550') }
  },
  {
    id: 546, title: 'Fender American Professional II Jazz Bass V', title_es: 'Fender American Professional II Jazz Bass V', brand: 'Fender', category: 'basses', price: 1999,
    desc: 'US-built 34-inch passive 5-string with dual V-Mod II single-coils. Alder body (roasted pine on select colors), maple Slim C neck with rolled edges and sculpted heel, 9.5-inch board with 20 narrow-tall frets and HiMass Vintage convertible bridge. Molded hardshell included.',
    desc_es: 'Cinco cuerdas USA pasivo 34" con dobles single-coils V-Mod II. Cuerpo aliso (pino tostado en colores selectos), mástil Slim C de arce con bordes matados y talón esculpido, diapasón 9,5" con 20 trastes narrow tall y puente convertible HiMass Vintage. Estuche rígido incluido.',
    img: 'https://r2.gear4music.com/media/60/606915/1200/preview.jpg',
    stores: { gear4music: G4M('https://www.gear4music.com/Guitar-and-Bass/Fender-American-Professional-II-Jazz-Bass-V-RW-Olympic-White/3J06') }
  },
  {
    id: 547, title: 'Ernie Ball Music Man StingRay Special 5', title_es: 'Ernie Ball Music Man StingRay Special 5', brand: 'Ernie Ball Music Man', category: 'basses', price: 2799,
    desc: '34-inch 5-string with high-output neodymium humbucker (dual-HH optional) and 18V 3-band active preamp with 3/5-way switching. Select hardwoods body, roasted maple 5-bolt neck, 11-inch radius board with 22 stainless wide frets and vintage top-loaded bridge.',
    desc_es: 'Cinco cuerdas 34" con humbucker de neodimio de alta salida (doble HH opcional) y previo activo 18V de 3 bandas con conmutación 3/5 vías. Cuerpo maderas selectas, mástil arce tostado 5 tornillos, diapasón radio 11" con 22 trastes inox anchos y puente vintage top-loaded.',
    img: 'https://r2.gear4music.com/media/109/1096359/1200/preview.jpg',
    stores: { zzounds: ZZ('MUMSRS5') }
  },
  {
    id: 548, title: 'Ibanez EHB1005MS Headless Bass', title_es: 'Ibanez EHB1005MS Headless Bass', brand: 'Ibanez', category: 'basses', price: 1349.99, rating: 4.7, reviews: 12,
    desc: 'Multiscale headless 5-string from 33 inches (G) to 35 inches (B) with passive Bartolini BH2 pickups and Vari-mid 3-band EQ plus bypass. Chambered American basswood body, EHB5 5-piece roasted maple and walnut neck with graphite rods, roasted birdseye board with 24 stainless frets, MR5HS 18 mm bridge, gig bag included.',
    desc_es: 'Cinco cuerdas headless multiescala de 33" (G) a 35" (B) con pastillas pasivas Bartolini BH2 y EQ Vari-mid 3 bandas más bypass. Cuerpo chambered de tilo americano, mástil EHB5 5 piezas arce tostado y nogal con grafito, diapasón birdseye tostado con 24 trastes inox, puente MR5HS 18 mm, funda incluida.',
    img: 'https://r2.gear4music.com/media/60/608178/1200/preview.jpg',
    stores: { gear4music: G4M('https://www.gear4music.com/Guitar-and-Bass/Ibanez-EHB1005MS-Bass-Workshop-Black-Flat/39X2'), zzounds: ZZ('IBAEHB1005MS') }
  },
  {
    id: 549, title: 'Dingwall Combustion 5-String Bass', title_es: 'Dingwall Combustion 5-String Bass', brand: 'Dingwall', category: 'basses', price: 2049,
    desc: 'Multiscale 5-string from 34 inches (G) to 37 inches (B) with 2 or 3 FD-3N neodymium pickups, EMG 3-band preamp with Quad-tone rotary and active/passive switch. Swamp-ash 2-3 piece body, 5-piece maple medium-thin C neck, 240 mm radius maple or pau ferro board with banjo frets. Averages 8.75 lb.',
    desc_es: 'Cinco cuerdas multiescala de 34" (G) a 37" (B) con 2 o 3 pastillas FD-3N de neodimio, previo EMG 3 bandas con rotary Quad-tone y switch activo/pasivo. Cuerpo fresno 2-3 piezas, mástil C medio-fino 5 piezas de arce, diapasón radio 240 mm arce o pau ferro con trastes banjo. Promedio 8,75 lb.',
    img: 'https://cdn11.bigcommerce.com/s-4hc0jwsnnq/images/stencil/1280x1280/products/19218/269677/532746-11287%2520%281%29__23904.1768365120.jpg?c=1',
    stores: { andertons: 'https://www.andertons.co.uk/dingwall-combustion-5-string-bass-in-natural-gloss-mn/', musicstore: MS('https://www.musicstore.com/en_US/USD/Dingwall-Combustion-5-3PU-MN-Natural-13734/art-BAS0012293-000') }
  }
);
fs.writeFileSync('data/products.json', JSON.stringify(P, null, 2));
console.log('total: ' + P.length + ' | max: ' + Math.max(...P.map(p => p.id)));
