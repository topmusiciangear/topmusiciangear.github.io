const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(DIR + 'data/products.json', 'utf8'));
const guides = JSON.parse(fs.readFileSync(DIR + 'data/guides.json', 'utf8'));

// 0. EVERSE photo (user URL)
products.find(y => y.id === 626).img = 'https://r2.gear4music.com/media/102/1026985/1200/preview.jpg';

// 1. new products
products.push(
  { id: 627, title: 'Fender Mustang GTX100', title_es: 'Fender Mustang GTX100', brand: 'Fender', category: 'amps', price: 499, rating: 4.5, reviews: 112, badge: 'modeling',
    desc: '100W stage modeling workstation with 40 amp models, 200 presets, 12-inch Celestion, stereo XLR outs and included 7-button footswitch with 60-second looper.',
    desc_es: 'Estación de modelado de 100 W con 40 modelos de ampli, 200 presets, Celestion de 12 pulgadas, salidas XLR estéreo y pedalera de 7 botones con looper de 60 segundos.',
    img: 'https://www.fender.com/cdn/shop/files/2310700000_amp_frt_001_nr.png?v=1764775207&width=1445',
    stores: { gear4music: 'https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FGuitar-and-Bass%2FFender-Mustang-GTX-100-1x12-Combo%2F3AQE' } },
  { id: 628, title: 'Markbass CMD 102P IV', title_es: 'Markbass CMD 102P IV', brand: 'Markbass', category: 'amps', price: 1199, rating: 4.8, reviews: 15, badge: 'pro-bass',
    desc: 'Featherweight 2x10 pro bass combo: 300W standalone (500W with extension), bi-band limiter, 4-band EQ with Old School filter and studio-grade XLR out at 37.7 lb.',
    desc_es: 'Combo de bajo pro 2x10 pluma: 300 W solo (500 W con extensión), limitador bi-banda, EQ de 4 bandas con filtro Old School y XLR de estudio en 17,1 kg.',
    img: 'https://markbass.it/wp-content/uploads/cmd_102_p_front.png__1980x1980_q85_subsampling-2.png',
    stores: {} },
  { id: 629, title: 'Fender Tone Master Deluxe Reverb', title_es: 'Fender Tone Master Deluxe Reverb', brand: 'Fender', category: 'amps', price: 1199, rating: 4.8, reviews: 30, badge: 'digital-tube',
    desc: 'The 22W tube legend reborn digital: 100W Class-D, Jensen N-12K Neo, convolution spring reverb and tremolo, 6-way attenuation to 0.2W and XLR IR out at 23 lb.',
    desc_es: 'La leyenda valvular de 22 W renacida digital: 100 W Class-D, Jensen N-12K Neo, reverb de muelles y trémolo por convolución, atenuador de 6 vías hasta 0,2 W y XLR con IR en 10,4 kg.',
    img: 'https://www.fender.com/cdn/shop/files/2274100000_amp_frt_001_nr.png?v=1742796701&width=1445',
    stores: { gear4music: 'https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FGuitar-and-Bass%2FFender-Tone-Master-Deluxe-Reverb%2F2ZW9' } }
);

// 2. guide
const d = guides.find(x => x.id === 'guitar-bass-amps');
d.featuredProducts = [71, 557, 73, 74, 76, 556, 503, 294, 627, 628, 629];
d.sections = d.sections.filter(s => !/RB-210|Rumble 200|Spark LIVE/.test(s.heading));
d.sections.find(s => s.heading === 'Bass Amps: What You Actually Need').products = [76, 556, 628];
const S = (heading, heading_es, content, content_es, pid) => ({ heading, heading_es, content, content_es, products: [pid] });
d.sections.push(
  S('The Stage Modeling Workstation: Mustang GTX100',
    'La estación de modelado para el escenario: Mustang GTX100',
    '<p><strong>Forty amps, two hundred presets and a seven-button footswitch in the box.</strong> The GTX100 pushes 100 watts through a custom Celestion 12, models Fender cleans to high-gain monsters plus bass rigs, and feeds the PA through stereo XLR — with a 60-second looper on tap.</p><p>It is still a digital box, not glowing glass, and deep edits live in the app. For gigging modelers who want everything included, nothing packs more per dollar.</p>',
    '<p><strong>Cuarenta amplis, doscientos presets y pedalera de siete botones en la caja.</strong> El GTX100 empuja 100 vatios por un Celestion 12 a medida, modela cleans Fender hasta distorsiones brutales más rigs de bajo, y alimenta la PA por XLR estéreo — con looper de 60 segundos a mano.</p><p>Sigue siendo caja digital, no vidrio incandescente, y la edición honda vive en la app. Para modeladores de directo que lo quieren todo incluido, nada da más por dólar.</p>',
    627),
  S('Featherweight Thump: Markbass CMD 102P IV',
    'Pegada pluma: Markbass CMD 102P IV',
    '<p><strong>Five hundred watts of hi-fi bass thunder at thirty-eight pounds.</strong> The CMD 102P IV pairs dual neodymium tens and a sweet tweeter with the signature bi-band limiter, 4-band EQ plus Old School filter, and a studio-grade XLR out.</p><p>Three hundred watts standalone until you add a cab, premium price, and tweeter hiss bothers purists. For jazz, funk and rock pros counting kilograms, it is the gold standard.</p>',
    '<p><strong>Quinientos vatios de trueno hi-fi en diecisiete kilos.</strong> El CMD 102P IV junta dieces de neodimio y tweeter dulce con el limitador bi-banda insignia, EQ de 4 bandas más filtro Old School, y XLR de estudio.</p><p>Trescientos vatios solo hasta sumar cabina, precio premium, y el tweeter molesta a puristas. Para pros de jazz, funk y rock que cuentan kilos, es el estándar de oro.</p>',
    628),
  S('Tubes Without Tubes: Tone Master Deluxe Reverb',
    'Válvulas sin válvulas: Tone Master Deluxe Reverb',
    '<p><strong>The most famous tube tone ever, minus the hernia and the maintenance.</strong> The Tone Master Deluxe Reverb models the 22-watt circuit through a Jensen N-12K Neo, with convolution spring reverb and tremolo, a 6-way attenuator down to 0.2 watts, and XLR IR out — at 23 pounds.</p><p>Purists still hear ones and zeros, and it costs real tube money. For Deluxe Reverb tone at bedroom volume and fly-date weight, it is a marvel.</p>',
    '<p><strong>El tono valvular más famoso, menos la hernia y el mantenimiento.</strong> El Tone Master Deluxe Reverb modela el circuito de 22 vatios por un Jensen N-12K Neo, con reverb de muelles y trémolo por convolución, atenuador de 6 vías hasta 0,2 vatios, y XLR con IR — en 10,4 kilos.</p><p>Los puristas aún oyen unos y ceros, y cuesta dinero valvular de verdad. Para tono Deluxe Reverb a volumen dormitorio y peso de avión, es una maravilla.</p>',
    629)
);

// table: drop RB-210 (idx 4) + Rumble 200 (idx 6), add 3 cols
const C = (en, es) => ({ title: en, title_es: es || en });
const V = (en, es) => ({ value: en, value_es: es || en });
d.productTable.columns = d.productTable.columns.filter((c, i) => i !== 4 && i !== 6);
d.productTable.columns.push(C('Fender Mustang GTX100'), C('Markbass CMD 102P IV'), C('Fender Tone Master Deluxe Reverb'));
const rowsNew = [
  [V('Stage modeling with footswitch control', 'Modelado de escenario con pedalera'), V('Featherweight pro bass fidelity', 'Fidelidad pro de bajo pluma'), V('Tube tone without tubes, any volume', 'Tono valvular sin válvulas, a todo volumen')],
  [V('$499.99'), V('$1,199.99'), V('$1,199.99')],
  [V('Digital modeling combo', 'Combo de modelado digital'), V('Bass combo', 'Combo de bajo'), V('Digital combo', 'Combo digital')],
  [V('100W'), V('300W (500W w/ ext cab)', '300 W (500 W con extensión)'), V('100W (22W tube sim)', '100 W (sim. valvular 22 W)')],
  [V('1 (200 presets)', '1 (200 presets)'), V('1'), V('2')],
  [V('1x12" Celestion'), V('2x10" + piezo tweeter'), V('1x12" Jensen Neo')],
  [V('Stereo XLR + FX loop', 'XLR estéreo + loop FX'), V('XLR DI + FX loop', 'XLR DI + loop FX'), V('XLR IR out', 'XLR con IR')],
  [V('Dozens of FX + 60s looper', 'Docenas de FX + looper 60 s'), V('4-band EQ + bi-band limiter', 'EQ 4 bandas + limitador bi-banda'), V('Spring reverb + tremolo', 'Reverb muelles + trémolo')],
  [V('22 lb (10 kg)', '22 lb (10 kg)'), V('37.7 lb (17.1 kg)', '37,7 lb (17,1 kg)'), V('23 lb (10.4 kg)', '23 lb (10,4 kg)')]
];
d.productTable.rows.forEach((r, i) => { r.values = r.values.filter((v, j) => j !== 4 && j !== 6); r.values.push(...rowsNew[i]); });

// verdicts: drop 2, add 3
const VV = (name, pros, cons, pros_es, cons_es) => ({ name, name_es: name, pros, cons, pros_es, cons_es });
d.verdictProsCons = d.verdictProsCons.filter(v => !/RB-210|Rumble 200/.test(v.name));
d.verdictProsCons.push(
  VV('Fender Mustang GTX100',
    ['100W stage modeling with 7-button footswitch included', '40 amp models plus bass rigs, 200 presets', 'Stereo XLR outs feed any PA directly', 'WiFi updates, Bluetooth editing and 60s looper'],
    ['Digital feel, not glowing tubes', 'Deep editing lives in the phone app', 'Single input, one instrument at a time', '22 lb, heavier than desktop rivals'],
    ['Modelado de 100 W con pedalera de 7 botones incluida', '40 modelos más rigs de bajo, 200 presets', 'XLR estéreo que alimenta cualquier PA directo', 'WiFi, edición Bluetooth y looper 60 s'],
    ['Tacto digital, no válvulas incandescentes', 'La edición honda vive en la app del móvil', 'Una entrada, un instrumento a la vez', '10 kg, más pesado que rivales de escritorio']),
  VV('Markbass CMD 102P IV',
    ['500W hi-fi thump at 37.7 lb', 'Bi-band limiter for punchy transients', '4-band EQ with Old School filter', 'Studio-grade balanced XLR out'],
    ['300W standalone until extension cab', 'Premium price for the badge', 'Tweeter hiss bothers purists', 'Maker lists it discontinued, buy retail stock'],
    ['500 W hi-fi en 17,1 kg', 'Limitador bi-banda para transitorios con pegada', 'EQ 4 bandas con filtro Old School', 'XLR balanceada de estudio'],
    ['300 W solo hasta cabina de extensión', 'Precio premium por la insignia', 'El tweeter molesta a puristas', 'El fabricante lo lista descatalogado, compra stock retail']),
  VV('Fender Tone Master Deluxe Reverb',
    ['Indistinguishable Deluxe Reverb tone, no tubes', '6-way attenuation down to 0.2W', 'XLR IR out with cab simulations', '23 lb pine cab with Jensen Neo'],
    ['Tube money for digital circuits', 'Purists hear ones and zeros', 'Reverb and tremolo only, no drive channel', 'Footswitch covers two functions only'],
    ['Tono Deluxe Reverb indistinguible, sin válvulas', 'Atenuador de 6 vías hasta 0,2 W', 'XLR con IR y simulaciones de caja', 'Caja de pino de 10,4 kg con Jensen Neo'],
    ['Dinero valvular por circuitos digitales', 'Los puristas oyen unos y ceros', 'Solo reverb y trémolo, sin canal drive', 'La pedalera cubre dos funciones nada más'])
);

// verdict + conclusion updates
d.verdict = 'Boss Katana-50 EX for practice and stage (GA-FC support, Line Out and an upgraded speaker fix the standard 50 limits), Blues Junior IV for real tube tone (no headphone or DI out — mic it or play it loud), Mustang GTX100 for stage modeling with everything included, Tone Master Deluxe Reverb for tube tone without tubes. Spark 2 for smart practice with an optional battery for busking, THR30II Wireless for the desktop with line outs and a built-in battery. Bass: Rumble 500 for 2x10 punch (350W standalone, 500W with extension); RB-115 with 15-inch depth for classic lows (100W standalone, 200W with extension); Markbass CMD 102P IV for featherweight pro fidelity (300W standalone, 500W with extension).';
d.verdict_es = 'Boss Katana-50 EX para practicar y tocar (soporte GA-FC, salida de línea y altavoz mejorado corrigen los límites del 50 estándar), Blues Junior IV para tono valvular real (sin salida de auriculares ni DI — microfonéalo o tócalo fuerte), Mustang GTX100 para modelado de escenario con todo incluido, Tone Master Deluxe Reverb para tono valvular sin válvulas. Spark 2 para práctica inteligente con batería opcional para busking, THR30II Wireless para el escritorio con salidas de línea y batería integrada. Bajo: Rumble 500 para pegada 2x10 (350 W solo, 500 W con extensión); RB-115 con profundidad de 15 pulgadas para graves clásicos (100 W solo, 200 W con extensión); Markbass CMD 102P IV para fidelidad pro pluma (300 W solo, 500 W con extensión).';
d.conclusion = d.conclusion.replace(/, and the 150W Spark LIVE scales the concept to full-band rehearsals and small gigs,/, ',').replace(/the Fender Rumble 500 V3 and Ampeg RB-210 cover 4-string punch \(350W\/250W standalone, 500W with an extension cab\), while the Rumble 200 V3 and Ampeg RB-115 with 15-inch speakers handle the 5-string low B \(140W\/100W standalone, 200W with extension\)/, 'the Fender Rumble 500 V3 covers 4-string punch (350W standalone, 500W with an extension cab) and the Ampeg RB-115 brings 15-inch classic depth (100W standalone, 200W with extension), while the Markbass CMD 102P IV adds featherweight pro fidelity (300W standalone, 500W with extension)');
d.conclusion_es = d.conclusion_es.replace(/, y el Spark LIVE de 150W escala el concepto a ensayos con banda completa y conciertos pequeños,/, ',').replace(/el Fender Rumble 500 V3 y el Ampeg RB-210 cubren la pegada de 4 cuerdas \(350W\/250W solos, 500W con cabina de extensión\), mientras el Rumble 200 V3 y el Ampeg RB-115 con altavoces de 15 pulgadas manejan el Si grave de 5 cuerdas \(140W\/100W solos, 200W con extensión\)/, 'el Fender Rumble 500 V3 cubre la pegada de 4 cuerdas (350 W solo, 500 W con cabina de extensión) y el Ampeg RB-115 trae profundidad clásica de 15 pulgadas (100 W solo, 200 W con extensión), mientras el Markbass CMD 102P IV suma fidelidad pro pluma (300 W solo, 500 W con extensión)');

fs.writeFileSync(DIR + 'data/products.json', JSON.stringify(products, null, 2));
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(guides, null, 2));
console.log('done | products:', products.length, '| cols:', d.productTable.columns.length, '| vpc:', d.verdictProsCons.length, '| sections:', d.sections.length);
