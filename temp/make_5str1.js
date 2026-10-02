// best-5-string-basses PART 1: skeleton + table + verdicts.
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
if (G.some(x => x.id === 'best-5-string-basses')) { console.log('EXISTS - abort'); process.exit(1); }
const V = (value, value_es) => ({ value, value_es });
const W = (t) => ({ title: t, title_es: t });
const VD = (name, pros, cons, pros_es, cons_es) => ({ name, name_es: name, pros, cons, pros_es, cons_es });
const AUTHOR = { '@type': 'Person', name: 'Daniel Carnago', givenName: 'Daniel', familyName: 'Carnago', alternateName: 'Cuban3Beats', jobTitle: 'Professional Musician & Audio Engineer', description: 'Touring musician with 20+ years of experience performing on world stages including Glastonbury, Broadway, and Abbey Road.', url: 'https://topmusiciangear.com/about.html', sameAs: ['https://www.youtube.com/@Cuban3Beats', 'https://open.spotify.com/artist/3HMtcts1AYCzkI4pBQKRzX', 'https://www.tiktok.com/@cuban3beats', 'https://www.facebook.com/Cuban3Beats/', 'https://www.instagram.com/cuban3beats', 'https://x.com/Cuban3Beats'], knowsAbout: ['Audio Engineering', 'Music Production', 'Live Sound', 'Studio Recording', 'Music Gear'] };

const g = {
  id: 'best-5-string-basses',
  title: 'Best 5-String Basses by Price: Budget, Mid-Range and Premium',
  title_es: 'Mejores bajos de 5 cuerdas por precio: económicos, medios y premium',
  titleTag: '12 Best 5-String Basses Compared (2026)',
  titleTag_es: '12 mejores bajos de 5 cuerdas comparados (2026)',
  category: 'basses',
  image: 'https://r2.gear4music.com/media/60/608178/1200/preview.jpg',
  badge: 'recommended',
  intro: 'Twelve five-strings in three price tiers, verified spec by spec. Budget (under $500) for starting on five, mid-range ($500–$1,100) for gigging workhorses, premium (over $1,300) for studio flagships. Every B-string claim below was checked against manufacturer spec sheets — including the corrections nobody else makes.',
  intro_es: 'Doce bajos de cinco cuerdas en tres gamas, spec por spec verificadas. Económicos (menos de $500) para empezar en cinco, medios ($500–$1.100) para caballos de batalla, premium (más de $1.300) para insignias de estudio. Cada afirmación sobre la quinta cuerda se verificó contra fichas del fabricante — incluidas correcciones que nadie más hace.',
  sections: [],
  conclusion: '',
  conclusion_es: '',
  verdict: '',
  verdict_es: '',
  featuredProducts: [538, 539, 540, 541, 542, 543, 544, 545, 546, 547, 548, 549],
  description: '12 five-string basses compared by price: TRBX305 leads budget, BB435 leads mid-range, StingRay Special leads premium. Specs, prices and verdict. (2026)',
  description_es: '12 bajos de 5 cuerdas comparados por precio: TRBX305 lidera económicos, BB435 medios, StingRay Special premium. Specs, precios y veredicto. (2026)',
  featuredSnippet: {},
  relatedGuides: ['beginner-bass-guitars', 'best-bass-under-700', 'fender-bass-guide', 'best-bass-home-office', 'budget-bass-like-expensive'],
  author: AUTHOR,
  aboutName: 'Basses',
  productTable: { columns: [], rows: [] },
  verdictProsCons: [],
  datePublished: '2026-10-02',
  faq: []
};

['Ibanez GSR205B Gio Bass', 'Sterling by Music Man SUB Ray5', 'Yamaha TRBX305 Bass', 'Squier Affinity Jazz Bass V', 'Sire Marcus Miller V7 New Gen 5-String', 'Yamaha BB435 Bass', 'Ibanez SR505E Bass', "Squier Classic Vibe '70s Jazz Bass V", 'Fender American Professional II Jazz Bass V', 'Ernie Ball Music Man StingRay Special 5', 'Ibanez EHB1005MS Headless Bass', 'Dingwall Combustion 5-String Bass'].forEach(t => g.productTable.columns.push(W(t)));
const putRow = (label, arr) => g.productTable.rows.push({ label, values: arr });
putRow('Price Tier', [V('Budget (under $500)', 'Económico (menos de $500)'), V('Budget (under $500)', 'Económico (menos de $500)'), V('Budget (under $500)', 'Económico (menos de $500)'), V('Budget (under $500)', 'Económico (menos de $500)'), V('Mid-range ($500–$1,100)', 'Medio ($500–$1.100)'), V('Mid-range ($500–$1,100)', 'Medio ($500–$1.100)'), V('Mid-range ($500–$1,100)', 'Medio ($500–$1.100)'), V('Mid-range ($500–$1,100)', 'Medio ($500–$1.100)'), V('Premium (over $1,300)', 'Premium (más de $1.300)'), V('Premium (over $1,300)', 'Premium (más de $1.300)'), V('Premium (over $1,300)', 'Premium (más de $1.300)'), V('Premium (over $1,300)', 'Premium (más de $1.300)')]);
putRow('Body', [V('Okoume', 'Okoume'), V('Basswood (Jabon)', 'Tilo (Jabon)'), V('Solid mahogany', 'Caoba sólida'), V('Poplar', 'Álamo'), V('Alder', 'Aliso'), V('Solid alder', 'Aliso sólido'), V('Okoume', 'Okoume'), V('Poplar / soft maple by finish', 'Álamo / arce blando según acabado'), V('Alder (roasted pine select colors)', 'Aliso (pino tostado colores selectos)'), V('Select hardwoods', 'Maderas selectas'), V('Chambered American basswood', 'Tilo americano chambered'), V('Swamp ash, 2-3 piece', 'Fresno, 2-3 piezas')]);
putRow('Neck', [V('GSR5 maple', 'GSR5 arce'), V('Hard maple', 'Arce duro'), V('5-pc maple-mahogany', '5 piezas arce-caoba'), V('Maple C, satin', 'Arce C, satén'), V('Hard maple C', 'Arce duro C'), V('5-pc maple-mahogany, 6-bolt miter', '5 piezas arce-caoba, miter 6 tornillos'), V('SR5 5-pc jatoba-walnut', 'SR5 5 piezas jatoba-nogal'), V('Maple C', 'Arce C'), V('Maple Slim C, rolled edges', 'Arce Slim C, bordes matados'), V('Roasted maple, 5-bolt', 'Arce tostado, 5 tornillos'), V('EHB5 5-pc roasted maple-walnut + graphite', 'EHB5 5 piezas arce tostado-nogal + grafito'), V('5-pc maple, medium-thin C', '5 piezas arce, C medio-fino')]);
putRow('Scale Length', [V('34 in (864 mm)', '34" (864 mm)'), V('34 in (86.4 cm)', '34" (86,4 cm)'), V('34 in', '34"'), V('34 in (864 mm)', '34" (864 mm)'), V('34 in', '34"'), V('34 in', '34"'), V('34 in', '34"'), V('34 in (864 mm)', '34" (864 mm)'), V('34 in (864 mm)', '34" (864 mm)'), V('34 in (86.4 cm)', '34" (86,4 cm)'), V('33-35 in multiscale (G33-B35)', '33-35" multiescala (G33-B35)'), V('34-37 in multiscale (G34-B37)', '34-37" multiescala (G34-B37)')]);
putRow('Frets & Fretboard', [V('22 medium, jatoba', '22 medium, jatoba'), V('21 medium, maple, 12 in', '21 medium, arce, 12"'), V('24 medium, rosewood', '24 medium, palisandro'), V('20 medium jumbo, laurel 9.5 in', '20 medium jumbo, laurel 9,5"'), V('Medium-jumbo stainless, ebony Edgeless 9.5 in', 'Medium-jumbo inox, ébano Edgeless 9,5"'), V('21 medium, rosewood', '21 medium, palisandro'), V('24 medium, rosewood', '24 medium, palisandro'), V('20 narrow tall, 9.5 in, blocks', '20 narrow tall, 9,5", bloques'), V('20 narrow tall, 9.5 in', '20 narrow tall, 9,5"'), V('22 stainless wide, 11 in', '22 inox anchos, 11"'), V('24 stainless, roasted birdseye', '24 inox, birdseye tostado'), V('Banjo frets, 240 mm, maple/pau ferro', 'Trastes banjo, 240 mm, arce/pau ferro')]);
putRow('Pickups', [V('2x Dynamix H (passive)', '2x Dynamix H (pasivas)'), V('H-1 ceramic humbucker', 'Humbucker cerámico H-1'), V('2x M3 ceramic humbuckers', '2x humbuckers cerámicos M3'), V('2x ceramic single-coil J', '2x single-coils J cerámicas'), V('Marcus J set (active/passive)', 'Set Marcus J (activo/pasivo)'), V('YGD Custom V5 Alnico V PJ', 'YGD Custom V5 Alnico V PJ'), V('Bartolini BH2 (not Nordstrand)', 'Bartolini BH2 (no Nordstrand)'), V('Fender-Designed alnico single-coils', 'Single-coils alnico diseñadas por Fender'), V('V-Mod II x2', 'V-Mod II x2'), V('Neodymium humbucker (HH opt)', 'Humbucker neodimio (HH opc.)'), V('Bartolini BH2', 'Bartolini BH2'), V('2-3 FD-3N neodymium', '2-3 FD-3N neodimio')]);
putRow('Electronics', [V('Phat II bass boost (2Vol+Tone)', 'Boost Phat II (2Vol+Tono)'), V('2-band active 9V (Vol+Bass+Treble)', 'Activa 2 bandas 9V (Vol+Graves+Agudos)'), V('Vol+Balance+2-band + 5-way Perf EQ', 'Vol+Balance+2 bandas + Perf EQ 5 posic.'), V('Passive VVT', 'Pasiva VVT'), V('New Gen 4-knob active + push/pull', 'New Gen 4 perillas activa + push/pull'), V('Passive VVT', 'Pasiva VVT'), V('Custom 3-band + bypass + mid switch', 'Custom 3 bandas + bypass + switch medios'), V('Passive VVT', 'Pasiva VVT'), V('Passive VVT', 'Pasiva VVT'), V('18V 3-band + 3/5-way switch', '18V 3 bandas + switch 3/5 vías'), V('Vari-mid 3-band + bypass', 'Vari-mid 3 bandas + bypass'), V('EMG 3-band + Quad-tone + A/P', 'EMG 3 bandas + Quad-tone + A/P')]);
putRow('Bridge', [V('B15, 16.5 mm spacing', 'B15, spacing 16,5 mm'), V('Fixed heavy-duty', 'Fijo heavy-duty'), V('Not published', 'No publicado'), V('5-saddle standard', '5 selletas estándar'), V('Not published', 'No publicado'), V('Vintage Plus convertible', 'Vintage Plus convertible'), V('Accu-cast B505, 16.5 mm', 'Accu-cast B505, 16,5 mm'), V('5-saddle vintage', '5 selletas vintage'), V('HiMass Vintage convertible', 'HiMass Vintage convertible'), V('Vintage top-loaded', 'Vintage top-loaded'), V('MR5HS, 18 mm', 'MR5HS, 18 mm'), V('Dingwall minimalist', 'Dingwall minimalista')]);

g.verdictProsCons.push(
  VD('Ibanez GSR205B Gio Bass',
    ['Cheapest honest five at $299.99', 'Phat II boost adds real low-end weight', 'Thin GSR5 neck welcomes 4-string converts', '16.5 mm spacing keeps stretches sane'],
    ['Passive pickups need the boost engaged to growl', 'Basic hardware throughout', 'Resale value is minimal', 'No gig bag included'],
    ['El cinco cuerdas honesto más barato a $299,99', 'El boost Phat II añade peso real en graves', 'Mástil fino GSR5 recibe conversos de 4 cuerdas', 'Spacing 16,5 mm mantiene estiramientos cuerdos'],
    ['Las pasivas piden el boost activado para gruñir', 'Hardware básico en todo', 'Reventa mínima', 'Sin funda incluida']),
  VD('Sterling by Music Man SUB Ray5',
    ['Real StingRay thump near $450, not $2,800', 'High-output ceramic humbucker cuts any mix', '9V 2-band preamp shapes funk and rock fast', 'In stock at Andertons with 6-bolt stability'],
    ['Street price is ~$460, not the old ~$350', 'No gig bag included', 'Single pickup limits clean voices', 'Jabon body dents easier than ash'],
    ['Thump StingRay real cerca de $460, no $2.800', 'Humbucker cerámico de alta salida corta cualquier mezcla', 'Previo 2 bandas 9V moldea funk y rock rápido', 'En stock en Andertons con estabilidad 6 tornillos'],
    ['El precio real ronda $460, no los viejos ~$350', 'Sin funda incluida', 'Una sola pastilla limita voces limpias', 'El cuerpo de jabón se abolla antes que el fresno']),
  VD('Yamaha TRBX305 Bass',
    ['M3 ceramics plus 5-way Performance EQ cover slap, pick and fingers', '5-piece neck and Yamaha QC at ~$500 street', '24 frets for full-range soloing', 'In stock at G4M and Andertons'],
    ['Street price is ~$500, not the old ~$400', 'Mahogany body adds shoulder weight', 'No passive bypass mode', 'Plain looks next to flashier rivals'],
    ['Cerámicas M3 más Perf EQ 5 posiciones cubren slap, púa y dedos', 'Mástil 5 piezas y QC Yamaha a ~$500 de calle', '24 trastes para solos de rango completo', 'En stock en G4M y Andertons'],
    ['El precio real ronda $500, no los viejos ~$400', 'El cuerpo de caoba añade peso al hombro', 'Sin modo bypass pasivo', 'Estética sobria frente a rivales llamativos']),
  VD('Squier Affinity Jazz Bass V',
    ['Classic J look and voice near $400 street', 'Passive VVT — zero battery anxiety', 'Slim C neck welcomes small hands', 'Buyable now at zzounds and Andertons'],
    ['Not the Active version — check the listing twice', 'Poplar body, basic chrome hardware', 'No gig bag included', 'Single-coils hum under neon rigs'],
    ['Estética y voz J clásicas cerca de $400 de calle', 'VVT pasiva — cero ansiedad de batería', 'Mástil C fino recibe manos pequeñas', 'Comprable ahora en zzounds y Andertons'],
    ['No es la versión Active — revisa el anuncio dos veces', 'Cuerpo de álamo, hardware cromado básico', 'Sin funda incluida', 'Las singles zumban bajo neones']),
  VD('Sire Marcus Miller V7 New Gen 5-String',
    ['Current New Gen: 4-knob preamp, stainless frets, Edgeless board', 'Alder body with ebony board at £729 in stock', 'Push/pull active-passive covers vintage and modern', 'Bone 46 mm nut, pro setup foundation'],
    ['Gen 2 18V (2x9V) heritage simplified — voltage unstated on New Gen', 'Only Andertons verified in our stores', 'Dot inlays, no blocks at this price', 'No gig bag included'],
    ['New Gen actual: previo 4 perillas, trastes inox, diapasón Edgeless', 'Cuerpo aliso con ébano a £729 en stock', 'Push/pull activo-pasivo cubre vintage y moderno', 'Cejuela hueso 46 mm, base para setup pro'],
    ['Herencia 18V (2x9V) de Gen 2 simplificada — voltaje no declarado en New Gen', 'Solo Andertons verificado en nuestras tiendas', 'Inlays dot, sin bloques a este precio', 'Sin funda incluida']),
  VD('Yamaha BB435 Bass',
    ['YGD Alnico V PJ with passive VVT — vintage done right', 'Convertible through-body/top-load bridge adds sustain options', '6-bolt miter joint, rock-solid B string', '$659.99 street with Amazon and G4M coverage'],
    ['No active option for modern slap voices', '21 frets only', 'Heavier than headless/multiscale rivals', 'Plain finishes next to exotic tops'],
    ['PJ YGD Alnico V con VVT pasiva — vintage bien hecho', 'Puente convertible a través-cuerpo/carga superior con opciones de sustain', 'Unión miter 6 tornillos, cuerda B rocosa', '$659,99 de calle con cobertura Amazon y G4M'],
    ['Sin opción activa para voces slap modernas', 'Solo 21 trastes', 'Más pesado que rivales headless/multiescala', 'Acabados sobrios frente a tapas exóticas']),
  VD('Ibanez SR505E Bass',
    ['Okoume body with 5-pc jatoba-walnut neck, featherweight feel', 'Three-band Custom EQ with bypass and mid switch', 'Accu-cast B505 with tight 16.5 mm spacing', '24 frets for full-range work'],
    ['Bartolini BH2 — not Nordstrand (that is the SR505N)', 'Discontinued: hunt remaining stock or used', 'Only zzounds delisted link verified', 'Mid switch needs manual reading'],
    ['Cuerpo okoume con mástil 5 piezas jatoba-nogal, sensación pluma', 'EQ Custom 3 bandas con bypass y switch de medios', 'Accu-cast B505 con spacing ajustado 16,5 mm', '24 trastes para trabajo completo'],
    ['Bartolini BH2 — no Nordstrand (esa es la SR505N)', 'Descontinuado: caza stock restante o usado', 'Solo enlace zzounds deslistado verificado', 'El switch de medios pide leer el manual']),
  VD("Squier Classic Vibe '70s Jazz Bass V",
    ['70s J voice with blocks, binding and nickel hardware', 'Fender-Designed alnico pickups, fully passive', '$479.99 street with G4M and zzounds coverage', 'Narrow-tall frets play fast'],
    ['Soft maple or poplar varies by finish', 'Vintage 5-saddle bridge, no quick adjustment', 'No gig bag included', 'Gloss neck sticks in humid gigs'],
    ['Voz J 70s con bloques, binding y níquel', 'Pastillas alnico diseñadas por Fender, totalmente pasivo', '$479,99 de calle con cobertura G4M y zzounds', 'Trastes narrow tall rápidos'],
    ['Arce blando o álamo varía por acabado', 'Puente vintage 5 selletas, sin ajuste rápido', 'Sin funda incluida', 'Mástil brillo se pega en bolos húmedos']),
  VD('Fender American Professional II Jazz Bass V',
    ['US-built flagship with V-Mod II pickups', 'Rolled edges and sculpted heel, supreme comfort', 'HiMass Vintage convertible bridge', 'Molded hardshell case included'],
    ['Street is $1,999+, not the old ~$1,900', 'Only G4M delisted link verified in our stores', 'Alder unless you pay up for roasted pine colors', 'Passive only at flagship money'],
    ['Insignia USA con pastillas V-Mod II', 'Bordes matados y talón esculpido, confort supremo', 'Puente convertible HiMass Vintage', 'Estuche rígido moldeado incluido'],
    ['La calle es $1.999+, no los viejos ~$1.900', 'Solo enlace G4M deslistado verificado en tiendas', 'Aliso salvo pagar colores pino tostado', 'Solo pasivo por dinero insignia']),
  VD('Ernie Ball Music Man StingRay Special 5',
    ['Neodymium humbucker with 18V 3-band headroom', 'Roasted maple neck, stainless frets, 5-bolt joint', 'The funk punch benchmark, H or HH', '$2,799 street verified'],
    ['Flagship money for one core voice', 'No G4M/Andertons/MS links verified', 'Heavy hardware adds shoulder load', 'Gloss polyester shows swirls'],
    ['Humbucker neodimio con headroom 18V 3 bandas', 'Mástil arce tostado, trastes inox, unión 5 tornillos', 'La referencia del punch funk, H o HH', '$2.799 de calle verificado'],
    ['Dinero insignia por una voz central', 'Sin enlaces G4M/Andertons/MS verificados', 'Hardware pesado suma al hombro', 'El poliéster brillo muestra swirls']),
  VD('Ibanez EHB1005MS Headless Bass',
    ['Per-string scale 33 to 35 inches — the clearest low B here', 'Bartolini BH2 plus Vari-mid with bypass', 'Chambered body, graphite rods, stainless frets', 'Gig bag, ramp and locks included, £1,044 at G4M'],
    ['Headless ergonomics divide traditionalists', 'DoubleBall strings cost more', 'Only G4M verified in our stores', 'Minimalist looks, no exotic top'],
    ['Escala por cuerda 33 a 35" — el Si grave más claro aquí', 'Bartolini BH2 más Vari-mid con bypass', 'Cuerpo chambered, grafito, trastes inox', 'Funda, rampa y bloqueos incluidos, £1.044 en G4M'],
    ['La ergonomía headless divide tradicionalistas', 'Las cuerdas DoubleBall cuestan más', 'Solo G4M verificado en tiendas', 'Estética mínima, sin tapa exótica']),
  VD('Dingwall Combustion 5-String Bass',
    ['Fan 34 to 37 inches — the most defined low end on sale', '2 or 3 FD-3N neodymium pickups with Quad-tone', 'EMG 3-band plus active/passive switch', 'Averages 8.75 lb despite the scale'],
    ['Street is ~$2,699+/£2,049, not the old ~$2,000', 'Only Andertons preorder verified in our stores', 'Fan frets demand left-hand adjustment', 'Polarizing minimal aesthetics'],
    ['Abanico 34 a 37" — el grave más definido a la venta', '2 o 3 pastillas FD-3N neodimio con Quad-tone', 'EMG 3 bandas más switch activo/pasivo', 'Promedia 8,75 lb pese a la escala'],
    ['La calle es ~$2.699+/£2.049, no los viejos ~$2.000', 'Solo preorder Andertons verificado en tiendas', 'Los trastes abanico piden adaptar la izquierda', 'Estética mínima polarizante'])
);

G.push(g);
fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
console.log('part1: cols=' + g.productTable.columns.length + ' verdict=' + g.verdictProsCons.length + ' rowsok=' + g.productTable.rows.every(r => r.values.length === g.productTable.columns.length));
