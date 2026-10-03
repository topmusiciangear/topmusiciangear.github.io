// MEGA-FIX audit A+B+C (D excluded). Reports misses, does not guess.
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const misses = [];
function R(id, oldStr, newStr, expect) {
  const gi = G.findIndex(x => x.id === id);
  let s = JSON.stringify(G[gi]);
  const n = s.split(oldStr).length - 1;
  if (n === 0) { misses.push(id + ' MISS: ' + JSON.stringify(oldStr.slice(0, 70))); return; }
  if (expect && n !== expect) { misses.push(id + ' COUNT ' + n + '!=' + expect + ': ' + JSON.stringify(oldStr.slice(0, 70))); }
  s = s.split(oldStr).join(newStr);
  G[gi] = JSON.parse(s);
}
const RX = (id, field, pattern, rep) => {
  const gi = G.findIndex(x => x.id === id);
  const g = G[gi];
  const hit = (obj) => {
    let n = 0;
    const re = new RegExp(pattern, 'g');
    for (const k of Object.keys(obj)) {
      if (typeof obj[k] === 'string' && re.test(obj[k])) { obj[k] = obj[k].replace(new RegExp(pattern, 'g'), rep); n++; }
    }
    return n;
  };
  let n = hit(g);
  (g.sections || []).forEach(s => { n += hit(s); });
  if (!n) misses.push(id + ' RXMISS: ' + pattern + ' in ' + field);
};

// ---------- trailing spaces on titles ----------
G.forEach(gg => {
  ['title', 'title_es', 'titleTag', 'titleTag_es'].forEach(f => {
    if (typeof gg[f] === 'string' && / $/.test(gg[f])) gg[f] = gg[f].replace(/ +$/, '');
  });
});

// ---------- B: typos/placeholders ----------
// KH80 $549
R('best-monitors-for-small-rooms', 'It is each and you will want', 'At $549 each, it is not cheap, and you will want', 1);
// 8010A $399 rephrase EN+ES
R('best-monitors-for-small-rooms', 'each it is the most expensive per driver in this guide', 'at $399 each it is pricey for a 3-inch monitor', 1);
R('best-monitors-for-small-rooms', 'por unidad es el más caro por altavoz de esta guía', 'por $399 la unidad, es caro para un monitor de 3 pulgadas', 1);
// sm57/sm58
R('sm57-vs-sm58', 'They cost each, they\'re', 'They cost about $99 each, they\'re', 1);
R('sm57-vs-sm58', 'compra AMBOS. Cada uno es virtualmente', 'compra AMBOS. Ambos cuestan unos $99 cada uno. Cada uno es virtualmente', 1);
// budget-monitors conclusion prices
R('budget-monitors', 'The JBL 305P MkII each beats', 'At $149 each, the JBL 305P MkII beats', 1);
R('budget-monitors', 'The Kali LP-6 V2 each adds', 'At $199 each, the Kali LP-6 V2 adds', 1);
R('budget-monitors', 'The KRK Rokit 7 G5 each is', 'At $269 each, the KRK Rokit 7 G5 is', 1);
R('budget-monitors', 'And if you can stretch each, the Yamaha HS8', 'And if you can stretch to $399 each, the Yamaha HS8', 1);
// kh7050
R('kh750-vs-7050c', '" cheaper than the KH 750 DSP"', '"At $1,095, about $650 cheaper than the KH 750 DSP"', 1);
R('kh750-vs-7050c', '" más barato que el KH 750 DSP"', '"A $1.095, unos $650 más barato que el KH 750 DSP"', 1);
// monitor-setup $798/$89/$887
R('monitor-setup', 'on Yamaha HS8s and on K&M stands. That\'s total for', 'on a pair of Yamaha HS8s ($798) and on K&M stands ($89 a pair). That\'s $887 total for', 1);
R('monitor-setup', 'Gasta en Yamaha HS8 y en soportes K&M. Es lo que cuesta', 'Gasta $798 en un par de Yamaha HS8 y $89 en soportes K&M. Son $887 lo que cuesta', 1);
// podcasting rephrase
R('best-mic-for-podcasting', 'it’s the best entry point — with an interface it totals;', 'it’s the best entry point — pair it with any interface and you’re recording for little more;', 1);
R('best-mic-for-podcasting', 'Es el mejor punto de entrada — con una interfaz totaliza;', 'Es el mejor punto de entrada — añade cualquier interfaz y estarás grabando por poco más;', 1);
// thump $400
R('budget-pa-systems', 'At each, it delivers 1400W', 'At $400 each, it delivers 1400W', 1);
R('budget-pa-systems', 'A un precio asequible, entrega 1400W', 'A $400 cada uno, entrega 1400W', 1);
// squarewave $79
R('studio-furniture', 'covers a small room\'s critical spots for.', 'covers a small room\'s critical spots for $79.', 1);
R('studio-furniture', 'cubre los puntos críticos de una sala pequeña por poco dinero.', 'cubre los puntos críticos de una sala pequeña por solo $79.', 1);
// ssl talkback
R('scarlett-vs-ssl', 'interfaces costing or more.', 'interfaces costing $1,000 or more.', 1);
// scarlett-vs-motu 4
R('scarlett-vs-motu', 'la característica mata de la MOTU', 'la característica estrella de la MOTU', 1);
R('scarlett-vs-motu', '¿qué interfaz gana a ?', '¿qué interfaz gana?', 1);
R('scarlett-vs-motu', 'Ambas son USB-C alimentadas por bus', 'Ambas se alimentan por bus USB-C', 1);
R('scarlett-vs-motu', 'las ayuda a sentarse en la mezcla', 'las ayuda a encajar en la mezcla', 1);
// budget-headphones 2
R('budget-headphones', 'y sigo pensándolo después de dos décadas', 'y lo sigo afirmando después de dos décadas', 1);
R('budget-headphones', 'son el más preciso de los seis', 'son los más precisos de los seis', 1);
// apollo
R('apollo-vs-babyface', 'drivers que nunca te peleen', 'drivers que nunca te dan problemas', 1);
// hs8
R('hs8-vs-rokit-7', 'Si puedes costear ambos, forman', 'Si tu presupuesto te permite comprar ambos, forman', 1);
// best-interface stick + table headers in intro_es
R('best-interface', 'interfaces tipo stick USB económicas', 'interfaces USB compactas económicas', 1);
R('best-interface', '<th>USB Alimentada</th><th>Desktop</th>', '<th>Alimentación por USB</th><th>Sobremesa</th>', 1);
R('best-interface', '<th>Rackmount</th>', '<th>En rack</th>', 1);
// budget-mics
R('budget-mics', 'cada uno es la elección para un trabajo específico', 'cada uno es la mejor opción para un uso específico', 1);
// studio-subwoofers
R('studio-subwoofers', 'Finding accurate studio subwoofer under $700', 'Finding an accurate studio subwoofer under $700', 1);
// open-headphones gender
R('open-headphones', 'Las ATH-R70x', 'Los ATH-R70x', 1);
R('open-headphones', 'Y las HD 560S', 'Y los HD 560S', 1);
// mixing recall/pumping
R('mixing-plugins', 'precisión, recall y la cadena', 'precisión, recuperación (recall) y la cadena', 1);
R('mixing-plugins', 'sin pumping', 'sin bombeo', 1);
// guitar-pedals
R('guitar-pedals', 'bloques de construcción del sonido', 'la base de tu sonido', 1);
// budget-interfaces piloto
R('budget-interfaces', 'la opción piloto automático', 'la opción de piloto automático', 1);
// dt770 jugada
R('dt770-vs-dt990', 'ambos son la jugada.', 'lo mejor es tener ambos.', 1);
// drum-machine beatmaking
R('best-drum-machine', 'beat making', 'beatmaking', 10);
R('best-drum-machine', 'beat making', 'creación de beats', 10);
// adam period
R('adam-vs-genelec', 'para la mezcla crítica', 'para la mezcla crítica.', 1);
// zlx period
R('zlx-vs-k12', 'sonido en vivo portátil', 'sonido en vivo portátil.', 1);
// ableton-fl
R('ableton-vs-fl-studio', 'La Vista Session de Ableton', 'La vista Sesión (Session View) de Ableton', 1);
// guitar-home-office
R('best-guitar-home-office', 'from Enyand Lava', 'from Enya and Lava', 1);
// practice-amps presets
R('best-practice-amps', 'efectos, presets y práctica', 'efectos, preajustes y práctica', 1);
// ts9 complete
R('ts9-vs-bd2', 'Tras usar ambos extensamente', 'Tras usar ambos a fondo en directo y en estudio.', 1);
// looper complete
R('best-looper-pedals', 'Tras probar los loopers más vendidos en ensayos y en directo', 'Tras probar los loopers más vendidos en ensayos y en directo, estos son los mejores.', 1);
// digital-mixers
R('best-digital-mixers', 'Grado Gira', 'Gama para giras');
R('best-digital-mixers', 'combina preamps,', 'combina previos,', 1);
R('best-digital-mixers', 'mejores mezcladoras compactas', 'mejores mezcladores compactos', 1);
R('best-digital-mixers', 'comparativa de mezcladoras profesionales', 'comparativa de mezcladores profesionales', 1);
R('best-digital-mixers', 'Para rigs de giras', 'Para los equipos de gira', 1);
// nord
R('nord-stage-4-vs-montage-m8x', 'legendary organd synth', 'legendary organ and synth', 1);
R('nord-stage-4-vs-montage-m8x', 'por Montage..', 'por Montage.', 1);
R('nord-stage-4-vs-montage-m8x', 'Montage M8X', 'Montage M8x', 5);
// beginner-bass
R('beginner-bass-guitars', 'you need a instrument', 'you need an instrument', 1);
// pro-interfaces
R('pro-interfaces', 'ofrece proceso UAD DSP', 'ofrece procesamiento UAD DSP', 1);
R('pro-interfaces', 'Universal audio Apollo x16 gen 2', 'Universal Audio Apollo x16 Gen 2', 1);
// pro-plugins period
R('pro-plugins', 'de Native Instruments', 'de Native Instruments.', 1);
// nx912
R('nx912-vs-pxm12mp', 'NX 912-SMA 9 is for the loudes', 'NX 912-SMA is for the loudest', 1);
R('nx912-vs-pxm12mp', 'como cuña de piso como caja principal', 'como cuña de piso o como caja principal', 1);
// mics creators casing
R('mics-for-creators', 'grabes voiceovers', 'grabes locuciones', 1);
// wireless rig
R('best-wireless-iems', 'primer rig económico', 'primer equipo económico', 1);
R('best-wireless-iems', 'los rigs en expansión', 'los equipos en expansión', 1);
// beatmaker
R('beatmaker-plugins', 'Cortes samples, programes baterías o construyas loops, estos son', 'Tanto si troceas samples como si programas baterías o construyes loops, estos son', 1);
R('beatmaker-plugins', 'añaden carácter, vibra e inspiración', 'añaden carácter, ambiente e inspiración', 1);
// wireless-intercom
R('wireless-intercom-systems', 'sistemas de Intercomunicación inalámbrica para Conciertos y Eventos en vivo', 'sistemas de intercomunicación inalámbrica para conciertos y eventos en vivo', 1);
R('wireless-intercom-systems', 'true-wireless', 'inalámbrico real', 3);
R('wireless-intercom-systems', 'sin bodypack', 'sin petaca', 1);
// micro vsM58
R('best-microphone', 'SM57 vsM58 Comparison', 'SM57 vs SM58 Comparison', 1);
R('best-microphone', 'Comparativa SM57 vs M58', 'Comparativa SM57 vs SM58', 1);
// stage-mics
R('stage-mics', 'better tha cardioid', 'better than cardioid', 1);
// guitar-bass-amps
R('guitar-bass-amps', 'amp you choose defines', 'the amp you choose defines', 1);
// electric-guitar euro
R('best-electric-guitar', 'Mejor acabado por euro en el rango Squier', 'Mejor acabado por el precio en el rango Squier', 1);
// re20
R('re20-vs-sm7b', 'This why it has become', 'This is why it has become', 1);
// katana
R('katana-vs-dsl', 'génerosin un pedalboard', 'géneros sin un pedalboard', 1);
// samplers
R('best-samplers-drum-computers', 'Sin bateria', 'Sin batería', 1);
// overdrive
R('best-overdrive-distortion', 'Every guitarist needs one of these for any guitarist.', 'Every guitarist needs one of these.', 1);
// digital-pianos
R('best-digital-pianos', 'Transiciones seamless, sin load times', 'Transiciones fluidas, sin tiempos de carga', 1);
R('best-digital-pianos', 'Cambio sonido seamless', 'Cambio de sonido fluido', 1);
// xr18
R('xr18-vs-m32r', 'the price of the M32R\'s', 'the price of the M32R', 1);
// active
R('active-vs-passive-pa', 'have amplifier built directly', 'have an amplifier built directly', 1);
// pro-microphones
R('pro-microphones', 'A innovative dual-circuit', 'An innovative dual-circuit', 1);
// pro-synths
R('pro-synths', 'than the this synthesizer', 'than this synthesizer', 1);
// pro-daw referencia x2
R('pro-daw', 'es el referencia', 'es la referencia', 2);
// instrument
R('best-instrument-mics', 'Congand bongo', 'Conga and bongo', 1);
// streaming
R('streaming-interfaces', 'needs more tha good mic', 'needs more than a good mic', 1);
// rodecaster
R('rodecaster-pro2-vs-dlz-creator', 'Mackie dLZ creator', 'Mackie DLZ Creator', 2);
// ai-tools
R('ai-tools-plugins', 'You remain control, but', 'You remain in control, but', 1);
// di-box
R('di-box', 'función de fusión', 'función de mezcla', 1);
// usb-mics float x2
R('usb-mics', 'Sin 32 bits float en', 'Sin 32 bits flotantes en', 1);
R('usb-mics', 'El 32 bits float solo', 'El 32 bits flotantes solo', 1);
// tracking
R('tracking-headphones', 'Ya grabes voces, batería o una banda completa,', 'Ya estés grabando voces, batería o una banda completa,', 1);
// amp-modelers
R('best-amp-modelers', 'iK multimedia tONEX ONE+', 'IK Multimedia TONEX ONE+', 1);
R('best-amp-modelers', 'Boss gX-1', 'Boss GX-1', 1);
// ie900
R('ie900-vs-se846', ' supera en precio al IE 900 manteniendo', 'El SE846 supera en precio al IE 900 manteniendo', 1);
// ribbon intro + sections
R('best-ribbon-mics', 'micrófonos ribbon', 'micrófonos de cinta', 5);
// in-ear
R('best-in-ear-monitors', 'Ajuste profundo complicado orejas pequeñas', 'Ajuste profundo complicado para orejas pequeñas', 1);
R('best-in-ear-monitors', 'Microfonía cable sin clip camisa', 'Microfonía del cable sin clip para la camisa', 1);
// fender-guide
R('fender-guide', 'corta través de un conjunto', 'corta a través de un conjunto', 1);
// live-sound-pa
R('live-sound-pa', 'Mejores mezcladoras para sonido en vivo', 'Mejores mezcladores para sonido en vivo', 1);
R('live-sound-pa', 'acústica del Salón', 'acústica de la sala', 1);
// beginner-electric
R('best-beginner-electric-guitar', 'Menos de unos $350 / £250:', 'Por menos de $350 / £250:', 1);
// bass-practice
R('best-bass-practice-amps', 'con tono con simulación de cabina', 'con simulación de cabina', 1);
// compact-mixers
R('best-compact-mixers', 'es el mixer analógico económico', 'es el mezclador analógico económico', 1);
// ableton-logic
R('ableton-vs-logic', 'por tu dinero.', 'por su dinero.', 1);
// pro-headphones
R('pro-headphones', 'el sonido de un futuro audiófilo', 'el sonido audiófilo del futuro', 1);
// pro-basses
R('pro-basses', 'puede morir a media actuación', 'puede agotarse a media actuación', 1);
// pro-mixers
R('pro-mixers', 'Pesado a ~33 lbs', 'Pesa ~33 lb (15 kg)', 1);
// fender-bass palm
R('fender-bass-guide', 'líneas palm-muted', 'líneas con palm-mute', 1);
// sm7b naming + pro
R('sm7b-vs-nt1', 'NT1 5ª Generación', 'NT1 5th Generation', 2);
R('sm7b-vs-nt1', 'las voces suenen pro.', 'las voces suenen profesionales.', 1);
// player alder
R('player-strat-vs-pacifica', 'Cuerpo de alder, la misma madera', 'Cuerpo de aliso, la misma madera', 1);
// volt uA
R('scarlett-vs-volt', '¿Suena mejor la uA Volt 2', '¿Suena mejor la UA Volt 2', 1);
// monitors revelan/masegura
R('best-monitors', 'los revelan..', 'los revelan.', 1);
R('best-monitors', 'másegura', 'más segura', 1);
// k371
R('k371-vs-mdr7506', 'dominate the under- closed-back', 'dominate the under-$150 closed-back', 1);
// blx288
R('blx288-vs-ewd', 'Transmision analogo con leve piso', 'Transmisión analógica con leve piso', 1);
R('blx288-vs-ewd', 'mas caro que alternativas analogas', 'más caro que alternativas análogas', 1);
R('blx288-vs-ewd', 'desde el telefono', 'desde el teléfono', 1);
// stage-wireless
R('stage-wireless', 'SShure BLX288', 'Shure BLX288', 1);
R('stage-wireless', 'es el referencia', 'es la referencia', 1);
// fabfilter
R('fabfilter-vs-ozone', '¿Es ozone 12', '¿Es Ozone 12', 1);
// daw-beginners
R('best-daw-for-beginners', 'FL Studio (, lifetime free updates)', 'FL Studio (lifetime free updates)', 1);
R('best-daw-for-beginners', 'FL Studio ( lifetime)', 'FL Studio', 1);
R('best-daw-for-beginners', 'Logic Pro ( one-time)', 'Logic Pro', 1);
// grooveboxes
R('best-grooveboxes', 'Novation circuit tracks', 'Novation Circuit Tracks', 1);
R('best-grooveboxes', 'Secuenciación Elektron precio entrada', 'Secuenciación Elektron a precio de entrada', 1);
// reverb-delay
R('best-reverb-delay', 'depends on whether consider ambiance', 'depends on whether you want ambiance', 1);
R('best-reverb-delay', 'Boss rC-5 loop station', 'Boss RC-5 Loop Station', 1);
// precision
R('precision-vs-jazz', 'Duff McKagall', 'Duff McKagan', 1);
R('precision-vs-jazz', 'This why session players', 'This is why session players', 1);
// budget-basslike
R('budget-bass-like-expensive', 'No necesitas gastar para conseguir', 'No necesitas gastar más de $1.000 para conseguir', 1);
// pro-monitors S-ART
R('pro-monitors', "ADAM's-ART", "ADAM's S-ART", 1);
R('pro-monitors', 'its-ART', 'its S-ART', 1);
// beat-making
R('beat-making', 'es una ordenador completa', 'es un ordenador completo', 1);
// stage-wedges
R('stage-wedges', 'la electro-voice pXM-12mP', 'la Electro-Voice PXM-12MP', 1);
// stream-deck
R('stream-deck-plus-xl-vs-razer', 'lo convierten el escritorio', 'lo convierten en el escritorio', 1);
// eg26
R('best-electric-guitars-2026', 'para todos los Estilos', 'para todos los estilos', 1);
// shotgun
R('best-shotgun-mics', 'sobrevive a locuciones húmedas', 'sobrevive a localizaciones húmedas', 1);
// b5 medium
R('best-5-string-basses', '22 trastes medium cubren', '22 trastes medianos cubren', 1);
// american-pro garble
R('american-pro-vs-les-paul', 'que los atornillados no igualan que los diseños atornillados no pueden replicar.', 'que los diseños atornillados no pueden replicar.', 1);
// m50x aftermarket
R('m50x-vs-mdr7506', 'requiriendo reemplazo aftermarket', 'requiriendo un repuesto compatible', 1);
// me90 MX5->Flex Prime + garbles + intro completion
R('me90-vs-mx5', 'El MX5 es mejor', 'El Flex Prime es mejor', 2);
R('me90-vs-mx5', 'A menos que el Flex Prime y es la forma más barata', 'Cuesta menos que el Flex Prime y es la forma más barata', 1);
R('me90-vs-mx5', 'Más que la ME-90, y el flujo', 'Más caro que la ME-90, y el flujo', 1);
R('me90-vs-mx5', 'con amplificadores reales y en el estudio', 'con amplificadores reales y en el estudio, este es el veredicto.', 1);
// jbl ending
R('jbl-vs-kali', 'debería tomar esta decisión por ti.', 'deja que la acústica de tu sala tome esta decisión por ti.', 1);
// fender-guide already; beginner action regex on 2 fields
RX('beginner-guitar', 'content_es', '\\baction\\b', 'acción');
RX('beginner-guitar', 'content_es', '\\bAction\\b', 'Acción');
// daw-guide pago
R('daw-guide', 'A de pago único con todas', 'De pago único, con todas', 1);
// fenderbass done; m50x done; sm7b done; sc stream c grab + fumbling
R('stream-controllers', 'something you c grab', 'something you can grab', 1);
R('stream-controllers', 'se paga solo en fumbling ahorrado.', 'se paga solo evitando errores a tientas.', 1);
// ssl done; monitors done; k371 done; blx done; wireless done; fab done; daw done; groove done; reverb done; precision done
// 7050 done; monitor done; podcast done; thump done; square done; motu done; budget-monitors done; ssl2 done
// hd490
R('hd490-pro-vs-dt990', '— un gasto real frente a las DT 990 Pro', 'Precio premium — un gasto real frente a las DT 990 Pro', 1);
// wi done; productTable? no. fender done; sm7b done; sc done; bg done

fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
console.log('MISSES (' + misses.length + '):');
console.log(misses.join('\n') || 'none');