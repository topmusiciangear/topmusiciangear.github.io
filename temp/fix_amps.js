// guitar-bass-amps: +2 table cols/verdicts (THR10II, Spark 2), rewrite 2 stale
// thematic sections (no prices, no off-guide models), append 8 per-product sections.
// beginner-bass-guitars: rewrite 3 stale thematic sections, append 13 per-product sections.
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const V = (value, value_es) => ({ value, value_es });
const W = (t) => ({ title: t, title_es: t });
const VD = (name, pros, cons, pros_es, cons_es) => ({ name, name_es: name, pros, cons, pros_es, cons_es });
const S = (heading, heading_es, content, content_es, products) => ({ heading, heading_es, content, content_es, products });

// ============ GUITAR-BASS-AMPS ============
{
  const g = G.find(x => x.id === 'guitar-bass-amps');
  ['Yamaha THR10II Desktop Modeling Amp', 'Positive Grid Spark 2'].forEach(t => g.productTable.columns.push(W(t)));
  const rows = {};
  g.productTable.rows.forEach(r => { rows[r.label] = r; });
  const put = (label, arr) => rows[label].values.push(...arr);
  put('Best For', [V('Desktop modeling for home and studio', 'Modelado de escritorio para casa y estudio'), V('Smart practice amp with app and AI jamming', 'Ampli de práctica inteligente con app y jamming IA')]);
  put('Type', [V('Desktop modeling, stereo', 'Modelado de escritorio, estéreo'), V('Smart modeling combo, stereo', 'Combo inteligente de modelado, estéreo')]);
  put('Power', [V('20W stereo', '20W estéreo'), V('50W stereo', '50W estéreo')]);
  put('Channels', [V('15 guitar + 3 bass + 3 acoustic models', '15 guitarra + 3 bajo + 3 acústica'), V('App-driven presets via ToneCloud', 'Presets por app vía ToneCloud')]);
  put('Speaker', [V('2x3" stereo', '2x3" estéreo'), V('2x4" stereo', '2x4" estéreo')]);
  put('Outputs', [V('USB interface, headphone, aux, line out', 'USB interfaz, auriculares, aux, line out'), V('USB-C recording, headphone, aux', 'Grabación USB-C, auriculares, aux')]);
  put('Reverb / FX', [V('Built-in FX + THR Remote app', 'FX integrados + app THR Remote'), V('Onboard FX + app + AI Smart Jam', 'FX a bordo + app + AI Smart Jam')]);
  put('Weight', [V('Desktop format, mains powered', 'Formato escritorio, red eléctrica'), V('Desktop format, mains powered', 'Formato escritorio, red eléctrica')]);

  g.verdictProsCons.push(
    VD('Yamaha THR10II Desktop Modeling Amp',
      ['Hi-fi looks that survive the living room', '15 guitar plus 3 bass plus 3 acoustic models', 'USB port doubles as recording interface', 'Full amp tone in headphones, total silence'],
      ['20 watts will not gig', '3-inch speakers cannot move air like a 12-inch', 'Deep editing needs the THR Remote app', 'Battery only on the Wireless version'],
      ['Estética hi-fi que sobrevive al salón', '15 modelos guitarra más 3 bajo más 3 acústica', 'El USB funciona como interfaz de grabación', 'Tono completo en auriculares, silencio total'],
      ['20 vatios no sirven para bolos', 'Altavoces 3" no mueven aire como un 12"', 'La edición profunda pide la app THR Remote', 'Batería solo en la versión Wireless']),
    VD('Positive Grid Spark 2',
      ['AI Smart Jam follows your playing', 'Over 25,000 ToneCloud presets', 'USB-C recording plus Bluetooth speaker in one', 'Voice-to-tab converter and 4-channel mixer'],
      ['Weak without the phone app nearby', '4-inch speakers, no stage volume', 'Smart features need updates and Bluetooth', 'Plastic build next to hi-fi wood looks'],
      ['AI Smart Jam sigue tu interpretación', 'Más de 25.000 presets ToneCloud', 'Grabación USB-C más altavoz Bluetooth en uno', 'Conversor voz-a-tab y mezclador 4 canales'],
      ['Flojo sin la app del teléfono cerca', 'Altavoces 4", sin volumen de escenario', 'Funciones smart piden updates y Bluetooth', 'Construcción plástico frente a madera hi-fi'])
  );

  g.sections[0].content = '<p><strong>The tube versus modeling debate matters less than matching the amp to the job.</strong> Tube amps compress and bloom when pushed — the Fender Blues Junior, Marshall DSL40CR and Vox AC30 in this guide all earn their keep that way. Modeling amps trade that last touch of tube feel for total versatility at home volume: the Boss Katana, Positive Grid Spark 2 and Yamaha THR10II each cover dozens of amp sounds without shaking the walls.</p><p><strong>Buy for your loudest real use case.</strong> A 15-watt tube combo is already extremely loud in a room; a 50-watt modeler with power scaling practices at whisper volume and still covers small stages. Pedals love clean tube platforms; modelers love players who want every sound now.</p><p>For head-to-head modeling comparisons, see <a class="guide-link-btn" href="/guides/best-practice-amps.html">Best practice amps</a> and <a class="guide-link-btn" href="/guides/best-bass-amps.html">Best bass amps</a>.</p>';
  g.sections[0].content_es = '<p><strong>El debate válvulas contra modelado importa menos que acertar con el uso.</strong> Los valvulares comprimen y florecen al apretarlos — el Fender Blues Junior, el Marshall DSL40CR y el Vox AC30 de esta guía se ganan el puesto así. Los de modelado cambian ese último toque valvular por versatilidad total a volumen doméstico: el Boss Katana, el Positive Grid Spark 2 y el Yamaha THR10II cubren decenas de sonidos sin temblar paredes.</p><p><strong>Compra para tu uso real más ruidoso.</strong> Un combo valvular de 15 vatios ya es muy ruidoso en una habitación; un modelador de 50 vatios con escalado de potencia practica en susurro y cubre bolos pequeños. Los pedales aman plataformas valvulares limpias; los modeladores aman a quien quiere todos los sonidos ya.</p><p>Para comparativas de modelado, revisa <a class="guide-link-btn" href="/guides/best-practice-amps_es.html">Mejores amplis de práctica</a> y <a class="guide-link-btn" href="/guides/best-bass-amps_es.html">Mejores amplis de bajo</a>.</p>';
  g.sections[1].content = '<p><strong>Bass amplification is about moving air: a guitar amp distorts and can damage itself on low frequencies, so bass needs dedicated speakers and headroom.</strong> Both combos in this guide solve it the modern way — 500 watts, lightweight Class-D power, dual 10-inch speakers with a tweeter, XLR direct out for the house, effects loop, aux in and headphone out for silent practice.</p><p><strong>The choice is character.</strong> The Ampeg Rocket Bass RB-210 brings the SVT-family grind with Super Grit Technology overdrive on demand; the Fender Rumble 500 V3 brings clean, punchy modern tone with built-in overdrive for edge. Either covers rehearsal, stage and recording without a separate rig.</p>';
  g.sections[1].content_es = '<p><strong>Amplificar bajo es mover aire: un ampli de guitarra distorsiona y puede dañarse con graves, así que el bajo pide altavoces dedicados y headroom.</strong> Ambos combos de esta guía lo resuelven a la moderna — 500 vatios, potencia Clase-D ligera, dos altavoces de 10" con tweeter, XLR direct out para mesa, loop de efectos, aux in y salida de auriculares para practicar en silencio.</p><p><strong>La elección es carácter.</strong> El Ampeg Rocket Bass RB-210 trae el grind familia SVT con overdrive Super Grit Technology a demanda; el Fender Rumble 500 V3 trae tono moderno limpio y pegado con overdrive integrado. Cualquiera cubre ensayo, escenario y grabación sin rack aparte.</p>';

  g.sections.push(
    S('Fender Blues Junior IV: The Most Recorded Small Amp', 'Fender Blues Junior IV: El ampli pequeño más grabado',
      '<strong>Fifteen watts of EL84 tube power through a 12-inch Jensen is the club-gig sweet spot.</strong> Loud enough to hang with a drummer when pushed, quiet enough to record without a fight. Three-band EQ plus spring reverb plus the FAT boost covers blues breakup to pushed Latin-jazz cleans, and it takes pedals like it was designed for them — because it was.',
      '<strong>Quince vatios EL84 valvulares por un Jensen de 12" es el punto dulce del bolo en club.</strong> Suficiente para aguantar un batería al apretarlo, contenido para grabar sin pelear. EQ de tres bandas más reverb de muelles más boost FAT cubren de breakup blues a limpios jazz-latinos empujados, y acepta pedales como si lo diseñaran para eso — porque así fue.', [71]),
    S('Boss Katana 50 Gen 3: The Do-Everything Practice Amp', 'Boss Katana 50 Gen 3: El ampli de práctica que lo hace todo',
      '<strong>Fifty watts with switchable output levels means one amp for bedroom, rehearsal and small stage.</strong> Multiple amp characters plus a full digital effects section drawn from flagship processors, Cabinet Resonance voicing and multi-band EQ for recording. The choice when one purchase must cover practice, writing and gigging.',
      '<strong>Cincuenta vatios con niveles de salida conmutables: un ampli para dormitorio, ensayo y bolo pequeño.</strong> Varios caracteres de ampli más sección digital completa heredada de procesadores insignia, voicing Cabinet Resonance y EQ multibanda para grabar. La elección cuando una compra debe cubrir práctica, composición y bolos.', [72]),
    S('Vox AC30: The Sound of British Rock', 'Vox AC30: El sonido del rock británico',
      '<strong>Thirty watts through two 12-inch Celestion Greenbacks, driven by four EL84s — the chime heard on countless records.</strong> The Normal channel stays glassy; Top Boost adds the cutting presence that sits above a dense band. At over 70 pounds it is furniture, not luggage — the price of real air movement.',
      '<strong>Treinta vatios por dos Celestion Greenback de 12", movidos por cuatro EL84 — el chime de incontables discos.</strong> El canal Normal se mantiene cristalino; el Top Boost añade la presencia cortante que se sienta sobre una banda densa. Con más de 32 kilos es mobiliario, no equipaje — el precio de mover aire de verdad.', [73]),
    S('Marshall DSL40CR: Classic Crunch at Sane Volume', 'Marshall DSL40CR: Crunch clásico a volumen sensato',
      '<strong>Forty watts of EL34 Marshall roar with two channels and four voices, from bluesy clean to saturated ultra gain.</strong> The 12-inch V-Type speaker, digital reverb and series effects loop make it a complete gigging rig in one combo. Punched mids and controlled low end that records without a fight.',
      '<strong>Cuarenta vatios de rugido Marshall EL34 con dos canales y cuatro voces, de limpio bluesero a ultra gain saturado.</strong> El altavoz V-Type de 12", la reverb digital y el loop de efectos en serie lo hacen un rig completo en un combo. Medios pegados y graves controlados que graban sin pelear.', [74]),
    S('Ampeg Rocket Bass RB-210: 500 Watts of SVT DNA', 'Ampeg Rocket Bass RB-210: 500 vatios de ADN SVT',
      '<strong>Dual custom 10-inch speakers plus horn, Legacy preamp and Super Grit Technology overdrive deliver the Ampeg grind at any volume.</strong> XLR direct out feeds the house while the combo covers the stage, and aux plus headphone make it a silent practice rig. Under 40 pounds for 500 honest watts.',
      '<strong>Dos altavoces custom de 10" más trompeta, previo Legacy y overdrive Super Grit Technology entregan el grind Ampeg a cualquier volumen.</strong> El XLR direct out alimenta la mesa mientras el combo cubre el escenario, y el aux más auriculares lo hacen rig silencioso. Menos de 18 kilos para 500 vatios honestos.', [75]),
    S('Fender Rumble 500 V3: Modern Bass Standard', 'Fender Rumble 500 V3: Estándar moderno de bajo',
      '<strong>Five hundred watts through dual Eminence 10s in a cabinet you carry with one hand.</strong> Clean, punchy tone with switchable overdrive for edge, plus XLR out for the house. From salsa tumbaos to rock to jazz, the working bassist combo that rehearses, gigs and records.',
      '<strong>Quinientos vatios por dos Eminence de 10" en una caja que se lleva con una mano.</strong> Tono limpio y pegado con overdrive conmutable para filo, más XLR para mesa. De tumbaos de salsa a rock a jazz, el combo del bajista trabajador que ensaya, toca y graba.', [76]),
    S('Yamaha THR10II: The Amp That Lives in Your Room', 'Yamaha THR10II: El ampli que vive en tu habitación',
      '<strong>Twenty stereo watts that look like hi-fi furniture and record like studio gear.</strong> Fifteen guitar models plus dedicated bass and acoustic voices, built-in effects shaped from a phone app, and a USB port that doubles as an audio interface. Headphone tone stays full at midnight.',
      '<strong>Veinte vatios estéreo con estética hi-fi que graban como equipo de estudio.</strong> Quince modelos de guitarra más voces de bajo y acústica, efectos integrados moldeados desde la app, y USB que funciona como interfaz de audio. El tono en auriculares se mantiene completo a medianoche.', [293]),
    S('Positive Grid Spark 2: Practice That Plays Back', 'Positive Grid Spark 2: Práctica que te devuelve la jugada',
      '<strong>Fifty stereo watts plus an app ecosystem: tens of thousands of ToneCloud presets, AI Smart Jam that follows your chords, and a voice-to-tab converter for learning songs.</strong> USB-C recording, Bluetooth speaker duty and a four-channel mixer covering bass and microphone turn the desk into a writing room.',
      '<strong>Cincuenta vatios estéreo más ecosistema de app: decenas de miles de presets ToneCloud, AI Smart Jam que sigue tus acordes y conversor voz-a-tab para aprender temas.</strong> Grabación USB-C, función altavoz Bluetooth y mezclador de cuatro canales para bajo y micro convierten el escritorio en sala de composición.', [294])
  );
}
fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
const gg = id => JSON.parse(fs.readFileSync('data/guides.json', 'utf8')).find(x => x.id === id);
const a = gg('guitar-bass-amps');
console.log('amps: cols=' + a.productTable.columns.length + ' verdict=' + a.verdictProsCons.length + ' rowsok=' + a.productTable.rows.every(r => r.values.length === a.productTable.columns.length) + ' sections=' + a.sections.length);
