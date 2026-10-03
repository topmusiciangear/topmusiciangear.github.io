const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const gi = G.findIndex(x => x.id === 'best-bass-amps');
const g = G[gi];
const V = (value, value_es) => ({ value, value_es });
// featured: 483->552, append 490
g.featuredProducts = g.featuredProducts.map(id => id === 483 ? 552 : id);
g.featuredProducts.push(490);
// table: rename col + Katana rows
const ci = g.productTable.columns.findIndex(c => /Spark LIVE/.test(c.title));
g.productTable.columns[ci] = { title: 'Boss Katana-110 Bass', title_es: 'Boss Katana-110 Bass' };
const rows = {};
g.productTable.rows.forEach(r => { rows[r.label] = r; });
const setK = (label, en, es) => { rows[label].values[ci] = V(en, es); };
setK('Best For', 'Gig-ready modeling combo', 'Combo de modelado para bolos');
setK('Type', 'Modeling combo, Class AB', 'Combo de modelado, Clase AB');
setK('Power', '60W RMS (110W peak)', '60W RMS (110W pico)');
setK('Channels', '1 + 6 memories', '1 + 6 memorias');
setK('Speaker', '1x10" + tweeter', '1x10" + tweeter');
setK('Outputs', 'XLR DI, USB, phones', 'DI XLR, USB, auriculares');
setK('Reverb / FX', '4 FX sections, 60+ FX', '4 secciones FX, 60+ efectos');
setK('Weight', '16.8 kg (37 lb)', '16,8 kg (37 lb)');
// table: add Rumble col
g.productTable.columns.push({ title: 'Fender Rumble 40 V3', title_es: 'Fender Rumble 40 V3' });
const addR = (label, en, es) => { rows[label].values.push(V(en, es)); };
addR('Best For', 'Bedroom-to-stage classic tone', 'Tono clásico de casa al bolo');
addR('Type', 'Analog combo', 'Combo analógico');
addR('Power', '40W', '40W');
addR('Channels', '1, footswitchable drive', '1, drive conmutable por pedal');
addR('Speaker', '1x10" Special Design', '1x10" Special Design');
addR('Outputs', 'XLR, phones', 'XLR, auriculares');
addR('Reverb / FX', 'Drive + Bright/Contour/Vintage', 'Drive + Bright/Contour/Vintage');
addR('Weight', '8.2 kg (18 lb)', '8,2 kg (18 lb)');
// SEC4 shared paragraph
const s4 = g.sections[4];
s4.products = s4.products.map(id => id === 483 ? 552 : id);
s4.content = s4.content.split('The Positive Grid Spark LIVE is a 150W four-channel smart amp that works as a combo, a mini PA and a studio speaker in one wireless box — ideal for rehearsals, silent rooms and song covering.').join('The Boss Katana-110 Bass is a 60W modeling combo with three amp voices, 60+ Boss effects and a 10-inch woofer plus tweeter — ideal for gigs, rehearsals and silent recording.');
s4.content_es = s4.content_es.split('El Positive Grid Spark LIVE es un amplificador inteligente de 150W y cuatro canales que funciona como combo, mini PA y altavoz de estudio en una sola caja inalámbrica — ideal para ensayos, habitaciones insonorizadas y sacar canciones a la primera.').join('El Boss Katana-110 Bass es un combo de modelado de 60W con tres voces de ampli, más de 60 efectos Boss y woofer de 10 pulgadas más tweeter — ideal para bolos, ensayos y grabación silenciosa.');
// SEC5 -> Katana closer look
const s5 = g.sections[5];
s5.heading = 'Boss Katana-110 Bass: A Closer Look';
s5.heading_es = 'Boss Katana-110 Bass: análisis detallado';
s5.content = '<strong>Boss Katana-110 Bass.</strong> On the plus side: 60W Class AB combo with three amp voices (Vintage/Flat/Modern) and 60+ Boss effects; XLR DI plus USB recording built in. Watch out: 16.8 kg is heavy for a 1x10; deep editing lives in Tone Studio.';
s5.content_es = '<strong>Boss Katana-110 Bass.</strong> En el lado positivo: Combo Clase AB de 60W con tres voces de ampli (Vintage/Flat/Modern) y más de 60 efectos Boss; DI XLR más grabación USB integrados. Ojo: 16,8 kg pesan para un 1x10; la edición profunda vive en Tone Studio.';
s5.products = [552];
// append Rumble section
g.sections.push({
  heading: 'Fender Rumble 40 V3: The Bedroom-to-Stage Standard',
  heading_es: 'Fender Rumble 40 V3: El estándar de casa al escenario',
  content: '<strong>The Rumble 40 V3 is the amp beginners keep and pros respect: 40W through a 10-inch Special Design speaker at just 8.2 kg.</strong> Foot-switchable overdrive, Bright/Contour/Vintage voicings, 4-band EQ and an XLR line out with ground lift cover practice, rehearsal and small gigs. Aux in plus headphone jack for silent practice. $270 street — the safest first amp recommendation.',
  content_es: '<strong>El Rumble 40 V3 es el ampli que los principiantes conservan y los pros respetan: 40W por un Special Design de 10 pulgadas con solo 8,2 kg.</strong> Overdrive conmutable por pedal, voces Bright/Contour/Vintage, EQ de 4 bandas y salida de línea XLR con ground lift cubren práctica, ensayo y bolos pequeños. Entrada aux más jack de auriculares para práctica silenciosa. $270 de calle — la recomendación más segura como primer ampli.',
  products: [490]
});
// verdicts
const VD = (name, pros, cons, pros_es, cons_es) => ({ name, name_es: name, pros, cons, pros_es, cons_es });
g.verdictProsCons[g.verdictProsCons.findIndex(x => /Spark LIVE/.test(x.name))] = VD('Boss Katana-110 Bass',
  ['60W Class AB combo with 3 amp voices and 60+ Boss effects', 'XLR DI plus USB recording with cab emulation', 'Power control down to 1W for silent practice', '6 memories plus GA-FC foot control ready'],
  ['16.8 kg is heavy for a 1x10 combo', 'Deep editing needs Tone Studio app', 'Single 10-inch speaker cannot move big-stage air', 'Bluetooth streaming needs the BT-DUAL adaptor'],
  ['Combo Clase AB de 60W con 3 voces de ampli y más de 60 efectos Boss', 'DI XLR más grabación USB con emulación de cabina', 'Control de potencia hasta 1W para práctica silenciosa', '6 memorias y listo para pedalera GA-FC'],
  ['16,8 kg pesan para un combo 1x10', 'La edición profunda requiere la app Tone Studio', 'Un solo 10 pulgadas no mueve aire de escenario grande', 'El streaming Bluetooth necesita el adaptador BT-DUAL']);
g.verdictProsCons.push(VD('Fender Rumble 40 V3',
  ['40W classic Fender tone at just 8.2 kg', 'Foot-switchable overdrive plus Bright/Contour/Vintage', 'XLR line out with ground lift for FOH', '$270 street with 4.5 stars from 5,000+ reviews'],
  ['40W runs out of headroom with loud drummers', 'Single channel, no effects beyond drive', 'No tweeter for modern slap brightness', '10-inch speaker lacks deep sub-bass extension'],
  ['Tono clásico Fender de 40W con solo 8,2 kg', 'Overdrive conmutable por pedal más Bright/Contour/Vintage', 'Salida de línea XLR con ground lift para FOH', '$270 de calle con 4,5 estrellas en más de 5.000 reseñas'],
  ['40W se quedan cortos con baterías ruidosas', 'Un solo canal, sin efectos más allá del drive', 'Sin tweeter para el brillo slap moderno', 'El 10 pulgadas no baja a subgraves profundos']));
// conclusion + short verdict
g.conclusion = g.conclusion.split(', the Positive Grid Spark LIVE is a 150W smart combo, mini PA and studio speaker in one wireless box, and the Orange').join(', the Boss Katana-110 Bass is a 60W modeling combo with Boss effects, the Fender Rumble 40 V3 is the bedroom-to-stage standard at $270, and the Orange');
g.conclusion_es = g.conclusion_es.split(', el Positive Grid Spark LIVE es un combo inteligente de 150W, mini PA y altavoz de estudio en una sola caja inalámbrica, y el Orange').join(', el Boss Katana-110 Bass es un combo de modelado de 60W con efectos Boss, el Fender Rumble 40 V3 es el estándar de casa al escenario a $270, y el Orange');
g.verdict = g.verdict.split(', the Spark LIVE is the versatile 4-in-1 smart amp for rehearsals and silent practice, and the Orange').join(', the Katana-110 Bass is the gig-ready modeling combo, the Rumble 40 V3 is the safe first-amp pick, and the Orange');
g.verdict_es = g.verdict_es.split(', el Spark LIVE es el amplificador inteligente 4 en 1 versátil para ensayos y práctica silenciosa, y el Orange').join(', el Katana-110 Bass es el combo de modelado listo para bolos, el Rumble 40 V3 es la compra segura como primer ampli, y el Orange');
G[gi] = g;
fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
const chk = JSON.stringify(g);
console.log('Spark left:', chk.split('Spark').length - 1, '| Katana:', chk.split('Katana-110').length - 1, '| Rumble40:', chk.split('Rumble 40 V3').length - 1);