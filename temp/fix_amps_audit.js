const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const P = require(DIR + 'data/products.json');
const G = require(DIR + 'data/guides.json');
function rep(obj, key, oldS, newS, tag) {
  if (!obj[key] || !obj[key].includes(oldS)) { console.log('MISS [' + tag + ']: ' + oldS.slice(0, 90)); process.exitCode = 1; return; }
  obj[key] = obj[key].split(oldS).join(newS);
  console.log('OK ' + tag);
}
function swapArr(arr, oldS, newS, tag) {
  const i = arr.indexOf(oldS);
  if (i === -1) { console.log('MISS [' + tag + ']: ' + oldS.slice(0, 90)); process.exitCode = 1; return; }
  arr[i] = newS; console.log('OK ' + tag);
}

// ===== 1. Catalog: Spark 2 watts 20 -> 50 =====
const p294 = P.find(x => x.id === 294);
rep(p294, 'desc', '20 watts of full-range stereo', '50 watts of full-range stereo', 'p294w');
rep(p294, 'desc_es', '20 vatios de estéreo de rango completo', '50 vatios de estéreo de rango completo', 'p294w-es');

const g = G.find(x => x.id === 'guitar-bass-amps');
const S = i => g.sections[i];
const vpc = g.verdictProsCons;
const byName = n => vpc.find(v => v.name === n);

// ===== 2. Table fixes =====
const pt = g.productTable;
for (const row of pt.rows) {
  const F = t => row.values.find(v => (v.value || '').includes(t) || (v.value_es || '').includes(t));
  if (row.label === 'Outputs') {
    const rb = row.values[4];
    if (rb.value === 'XLR DI out, FX loop, aux in, headphone out') { rb.value = 'XLR DI out, FX loop, aux in, headphone out, ext speaker out'; rb.value_es = 'Salida DI XLR, loop de FX, entrada aux, auriculares, salida para cabina de extensión'; console.log('OK table-rb210-out'); }
    const dsl = row.values[3];
    if (dsl.value === 'FX loop, 2x speaker out') { dsl.value = 'FX loop, speaker out'; dsl.value_es = 'FX loop, salida de altavoz'; console.log('OK table-dsl-out'); }
    const r5 = row.values[5];
    if (r5.value === 'XLR D.I., headphones') { r5.value = 'XLR D.I., headphones, ext speaker out'; r5.value_es = 'D. I. XLR, auriculares, salida para cabina de extensión'; console.log('OK table-r500-out'); }
    const sp = row.values[9];
    if (sp.value === 'USB-C recording, headphone, aux, optional battery') { sp.value = 'USB-C recording, line out, headphone, aux, optional battery'; sp.value_es = 'Grabación USB-C, salida de línea, auriculares, aux, batería opcional'; console.log('OK table-spark-out'); }
  }
}

// ===== 3. 5th PRO for all 10 products =====
const fifth = [
  ['Fender Blues Junior IV', 'Pedal-friendly clean platform — takes overdrive and delay pedals exceptionally well', 'Plataforma limpia ideal para pedales — acepta overdrives y delays de maravilla'],
  ['Boss Katana-50 EX Gen 3', 'Power scaling (0.5W/25W/50W) keeps cranked-amp tone at bedroom volume', 'Escalado de potencia (0,5W/25W/50W) mantiene el tono saturado a volumen de dormitorio'],
  ['Vox AC30', 'External speaker output drives a second cab for bigger stages', 'Salida para cabina externa mueve una segunda pantalla en escenarios grandes'],
  ['Marshall DSL40CR', 'Series FX loop with bypass switch keeps delay and reverb clean behind the preamp', 'Loop de efectos en serie con bypass mantiene delays y reverbs limpios tras el previo'],
  ['Ampeg Rocket Bass RB-210', 'Extension speaker output unlocks the full 500W for big stages', 'La salida para cabina de extensión libera los 500W completos en escenarios grandes'],
  ['Fender Rumble 500 V3', 'Extension speaker output unlocks the full 500W when 350W runs out', 'La salida para cabina de extensión libera los 500W completos cuando los 350W se quedan cortos'],
  ['Fender Rumble 200 V3', 'Extension speaker output unlocks the full 200W when 140W runs out', 'La salida para cabina de extensión libera los 200W completos cuando los 140W se quedan cortos'],
  ['Ampeg Rocket Bass RB-115', 'Extension speaker output unlocks the full 200W when 100W runs out', 'La salida para cabina de extensión libera los 200W completos cuando los 100W se quedan cortos'],
  ['Yamaha THR30II Wireless Desktop Amp', 'USB doubles as an audio interface with Cubase included — record without extra gear', 'El USB funciona como interfaz de audio con Cubase incluido — graba sin equipo extra'],
  ['Positive Grid Spark 2', 'Onboard 60-second looper plus 33 amp models — write and layer without a DAW', 'Looper de 60 segundos más 33 modelos de ampli — compone y graba capas sin DAW']
];
for (const [name, en, es] of fifth) {
  const v = byName(name);
  if (!v) { console.log('MISS fifth-pro: ' + name); process.exitCode = 1; continue; }
  if (v.pros.length !== 4) { console.log('SKIP fifth-pro (len=' + v.pros.length + '): ' + name); continue; }
  v.pros.push(en); v.pros_es.push(es); console.log('OK fifth-pro ' + name);
}

// ===== 4. Rumble 500 fixes (nuance + units + mugre) =====
const r500 = byName('Fender Rumble 500 V3');
swapArr(r500.pros, '500 watts through two 10-inch Eminence speakers', '500 watts with an extension cab (350W standalone) through two 10-inch Eminence speakers', 'r500p0-en');
swapArr(r500.pros_es, '500 vatios a través de dos altavoces Eminence de 10 pulgadas', '500 vatios con cabina de extensión (350W solo) a través de dos altavoces Eminence de 10 pulgadas', 'r500p0-es');
swapArr(r500.pros_es, 'Con 16.56 kg sigue siendo ligero para un combo de 500 vatios, con salida directa XLR', 'Con 16,6 kg sigue siendo ligero para un combo de 500 vatios, con salida directa XLR', 'r500p3-es');
swapArr(r500.pros_es, 'Overdrive incorporado que añade mugre cuando la necesitas', 'Overdrive incorporado que añade garra cuando la necesitas', 'r500mugre');
for (const c of r500.cons) { if (c.includes('23 lbs')) { r500.cons[r500.cons.indexOf(c)] = 'Para bajistas de 5 cuerdas, los dobles 10" comprimen el Si grave — el Rumble 200 V3 (15") lo resuelve limpio'; console.log('OK r500con-en(n/a?)'); } }
swapArr(r500.cons, 'For 5-string players, dual 10" compresses the low B — Rumble 200 V3 (15") handles it cleanly at 23 lbs', 'For 5-string players, dual 10" compresses the low B — the Rumble 200 V3 (15") handles it cleanly', 'r500con-en');
swapArr(r500.cons_es, 'Para bajistas de 5 cuerdas, los dobles 10" comprimen el Si grave — el Rumble 200 V3 (15") lo resuelve limpio con 10,4 kg', 'Para bajistas de 5 cuerdas, los dobles 10" comprimen el Si grave — el Rumble 200 V3 (15") lo resuelve limpio', 'r500con-es');
swapArr(r500.cons_es, 'Dos altavoces de 10 pulgadas favorecen la pegada sobre graves tipo subwoofer — Si grave flojo en 5 cuerdas a volumen de bolo', 'Dos altavoces de 10 pulgadas favorecen la pegada sobre graves tipo subwoofer — Si grave flojo en 5 cuerdas en conciertos', 'r500bolo');

// ===== 5. RB-210 cons ES: cab spanglish =====
const rb210v = byName('Ampeg Rocket Bass RB-210');
swapArr(rb210v.pros_es, 'La voz de bajo estilo SVT de Ampeg en un combo autónomo — sin cabeza y cab que transportar por separado', 'La voz de bajo estilo SVT de Ampeg en un combo autónomo — sin cabezal ni pantalla que transportar por separado', 'rb210cab');

// ===== 6. DSL cons ES =====
const dsl = byName('Marshall DSL40CR');
swapArr(dsl.cons_es, 'Con 22,9 kg el combo es un levantamiento pesado para los ensayos semanales', 'Con 22,9 kg el combo pesa mucho para cargarlo a los ensayos semanales', 'dslpeso');
swapArr(dsl.cons_es, 'La reverb digital cumple pero no iguala la profundidad de un tank de muelles dedicado', 'La reverb digital cumple pero no iguala la profundidad de una reverb de muelles dedicada', 'dsltank');

// ===== 7. Vox cons ES =====
const vox = byName('Vox AC30');
swapArr(vox.cons_es, 'Muy pesado — un esfuerzo llevarlo a los conciertos', 'Muy pesado — cuesta llevarlo a los conciertos', 'voxpesado');

// ===== 8. Section headings (marketing -> factual) =====
rep(S(2), 'heading', 'Fender Blues Junior IV: The Most Recorded Small Amp', 'Fender Blues Junior IV: The 15-Watt Tube Classic', 'h-bj-en');
rep(S(2), 'heading_es', 'Fender Blues Junior IV: El ampli pequeño más grabado', 'Fender Blues Junior IV: El clásico valvular de 15 vatios', 'h-bj-es');
rep(S(11), 'heading', 'Positive Grid Spark 2: Practice That Plays Back', 'Positive Grid Spark 2: Smart Practice That Feels Like Play', 'h-sp-en');
rep(S(11), 'heading_es', 'Positive Grid Spark 2: Práctica que te devuelve la jugada', 'Positive Grid Spark 2: Práctica inteligente que engancha', 'h-sp-es');

// ===== 9. ES natural pass (sections) =====
rep(S(0), 'content_es', 'cubren decenas de sonidos sin temblar paredes.', 'cubren decenas de sonidos sin derribar las paredes.', 's0a');
rep(S(0), 'content_es', 'un modelador de 50 vatios con escalado de potencia practica en susurro y cubre bolos pequeños. Los pedales aman plataformas valvulares limpias;', 'un modelador de 50 vatios con escalado de potencia permite practicar en voz baja y cubre conciertos pequeños. Los pedales rinden mejor en plataformas valvulares limpias;', 's0b');
rep(S(1), 'content_es', 'así que el bajo pide altavoces dedicados y headroom.', 'así que el bajo pide altavoces dedicados y margen dinámico.', 's1a');
rep(S(1), 'content_es', 'potencia Clase-D ligera, XLR direct out para mesa, loop de efectos, aux in y salida de auriculares para practicar en silencio.', 'potencia Clase-D ligera, salida directa XLR a mesa, loop de efectos, entrada aux y salida de auriculares para practicar en silencio.', 's1b');
rep(S(1), 'content_es', 'Cualquiera cubre ensayo, escenario y grabación sin rack aparte.', 'Cualquiera de ellos cubre ensayo, escenario y grabación sin rack aparte.', 's1c');
rep(S(2), 'content_es', 'Para bolos en salas y grabaciones honestas,', 'Para conciertos en salas y grabaciones honestas,', 's2a');
rep(S(2), 'content_es', 'He grabado con él junto a amplis cristalinos y el Junior siempre necesitó menos proceso para sentirse vivo.', 'He grabado con él junto a amplis de limpio cristalino y el Junior siempre necesitó menos procesado para sentirse vivo.', 's2b');
rep(S(3), 'content_es', 'el EX lo corrige exactamente.', 'el EX lo soluciona.', 's3a');
rep(S(3), 'content_es', 'si necesitas salida de línea y las expectativas del altavoz antes de comprar.', 'si necesitas salida de línea y lo que esperas del altavoz antes de comprar.', 's3b');
rep(S(4), 'content_es', 'He estado junto a pilas donde el AC30 simplemente sonaba terminado, con la guitarra al frente de la mezcla de forma natural. Es pesado y fuerte por diseño.', 'He tocado junto a pantallas 4x12 donde el AC30 simplemente sonaba redondo, con la guitarra al frente de la mezcla de forma natural. Es pesado y fuerte por diseño.', 's4a');
rep(S(4), 'content_es', 'Revisa ayuda para transporte, límites de volumen en escenario y canales que necesitas antes de comprar.', 'Revisa si tienes ayuda para transportarlo, límites de volumen en escenario y canales que necesitas antes de comprar.', 's4b');
rep(S(5), 'content_es', 'y volver a un Marshall multivoz se sintió como si el ampli tocara la mitad por mí.', 'y volver a un Marshall multivoz se sintió como si el ampli hiciera la mitad del trabajo.', 's5a');
rep(S(7), 'content_es', 'overdrive conmutable para filo, amplia modelación tonal y salida XLR a mesa.', 'overdrive conmutable para filo, amplio abanico tonal y salida XLR a mesa.', 's7a');
rep(S(7), 'content_es', 'En palabras sencillas, se mantiene claro a alto volumen en vez de desarmarse.', 'En palabras sencillas, se mantiene claro a alto volumen en vez de embarrarse.', 's7b');
rep(S(7), 'content_es', 'mientras el Rumble simplemente se sentaba en la mezcla, de la salsa al rock, sin complicaciones.', 'mientras el Rumble simplemente encajaba en la mezcla, de la salsa al rock, sin complicaciones.', 's7c');
rep(S(8), 'content_es', 'El overdrive conmutable por pedal más el trío Bright/Contour/Vintage cubre del thump Motown al grind moderno,', 'El overdrive conmutable por pedal más el trío Bright/Contour/Vintage cubre de la pegada Motown al grind moderno,', 's8a');
rep(S(9), 'content_es', 'y la diferencia en el Si es del día a la noche.', 'y la diferencia en el Si es como de la noche al día.', 's9a');
rep(S(10), 'content_es', 'para que practicar el bajo tenga verdadero peso de graves.', 'para que el bajo tenga verdadero peso de graves.', 's10a');
rep(S(10), 'content_es', 'Pensado para guitarristas caseros, compositores y grabadores que quieren prestaciones pro a volumen de escritorio.', 'Pensado para guitarristas caseros, compositores y quienes graban en casa y quieren prestaciones pro a volumen de escritorio.', 's10b');
rep(S(11), 'content_es', 'Pensado para principiantes, compositores y buskers que quieren progresar divirtiéndose.', 'Pensado para principiantes, compositores y músicos callejeros que quieren progresar divirtiéndose.', 's11a');

// ===== 10. EN touch-ups (same calques) =====
rep(S(0), 'content', 'each cover dozens of amp sounds without shaking the walls.', 'each cover dozens of amp sounds without bringing the house down.', 's0en');
rep(S(4), 'content', 'I have stood next to stacks where the AC30 simply sounded finished, with guitars sitting forward in the mix naturally.', 'I have stood next to 4x12 stacks where the AC30 simply sounded complete, with guitars sitting forward in the mix naturally.', 's4en');
rep(S(5), 'content', 'coming back to a multi-voice Marshall felt like the amp was doing half the playing.', 'coming back to a multi-voice Marshall felt like the amp was doing half the work.', 's5en');

// ===== 11. FAQ fixes (9-band, libras, punto de rotura, chime/headroom) =====
const F2 = g.featuredSnippet;
rep(F2, 'faq_a6_en', '9-band EQ', '4-band EQ', 'faq6en-eq');
rep(F2, 'faq_a6_es', 'con EQ de 9 bandas', 'con EQ de 4 bandas', 'faq6es-eq');
rep(F2, 'faq_a6_es', 'en un combo de 36.5 libras,', 'en un combo de 16,6 kg,', 'faq6es-lb');
rep(F2, 'faq_a1_es', 'y su punto de rotura a volúmenes aptos para escenario.', 'y su punto de saturación a volúmenes aptos para escenario.', 'faq1es');
rep(F2, 'faq_a3_es', 'es famoso por su chime y headroom', 'es famoso por su chime y su margen dinámico', 'faq3es');

// ===== 12. New FAQs q7-q10 (555, 556, 503, 294) =====
Object.assign(F2, {
  faq_q7_en: 'Is the Fender Rumble 200 V3 good for 5-string bass?',
  faq_a7_en: 'Yes — the 15-inch Eminence keeps the low B round and defined where dual 10s choke. 140W standalone covers rehearsal; add an 8-ohm extension cab for the full 200W on stage.',
  faq_q7_es: '¿Es el Fender Rumble 200 V3 bueno para bajo de 5 cuerdas?',
  faq_a7_es: 'Sí — el Eminence de 15 pulgadas mantiene el Si grave redondo y definido donde los dobles 10 se ahogan. Los 140W solos cubren el ensayo; suma una cabina de extensión de 8 ohmios para los 200W completos en escenario.',
  faq_q8_en: 'Is the Ampeg RB-115 worth it over the Rumble 200?',
  faq_a8_en: 'If you want SVT tone — yes: Legacy preamp, footswitchable SGT overdrive and Lavoce depth. If you want maximum value in a 15-inch combo, the Rumble 200 wins.',
  faq_q8_es: '¿Vale la pena el Ampeg RB-115 frente al Rumble 200?',
  faq_a8_es: 'Si buscas tono SVT — sí: previo Legacy, overdrive SGT conmutable por pedal y profundidad Lavoce. Si buscas el mejor valor en un combo de 15 pulgadas, el Rumble 200 gana.',
  faq_q9_en: 'Is the THR30II Wireless worth the upgrade over the THR10II?',
  faq_a9_en: 'Yes for recording and gigging: 30W stereo, dedicated line outs, a wireless receiver and a built-in ~5-hour battery. For desk-only practice, the THR10II costs less.',
  faq_q9_es: '¿Vale la pena el THR30II Wireless sobre el THR10II?',
  faq_a9_es: 'Sí para grabar y tocar: 30W estéreo, salidas de línea dedicadas, receptor inalámbrico y batería integrada de ~5 horas. Solo para el escritorio, el THR10II cuesta menos.',
  faq_q10_en: 'Can the Spark 2 run on battery for busking?',
  faq_a10_en: 'Yes with the optional Spark Battery (sold separately): up to 12 hours at mid volume. Without it, the Spark 2 needs wall power.',
  faq_q10_es: '¿Funciona el Spark 2 con batería para tocar en la calle?',
  faq_a10_es: 'Sí con la Spark Battery opcional (se vende aparte): hasta 12 horas a volumen medio. Sin ella, el Spark 2 pide enchufe.'
});

fs.writeFileSync(DIR + 'data/products.json', JSON.stringify(P, null, 2));
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(G, null, 2));
console.log('DONE exit=' + (process.exitCode || 0));