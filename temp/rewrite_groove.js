const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(DIR + 'data/products.json', 'utf8'));
const guides = JSON.parse(fs.readFileSync(DIR + 'data/guides.json', 'utf8'));
const P = id => products.find(y => y.id === id);

// ---------- A. fix 615-620 (real imgs + keyed stores) ----------
P(615).img = 'https://cdn11.bigcommerce.com/s-4hc0jwsnnq/products/50564/images/276956/TEE0194_1__40883.1769510092.386.513.jpg?c=1';
P(615).stores = { andertons: 'https://www.andertons.co.uk/teenage-engineering-ep-133-ko-ii-128mb-edition/' };
Object.assign(P(616), {
  price: 799,
  img: 'https://media.sweetwater.com/m/products/image/43bab172a1Eo4RBxwl97bcMBhuxX6AtoQ1ATQMQW.jpg?ha=43bab172a1749829ef939a4c9669f290123aaaec&quality=82&width=750',
  stores: {}
});
P(617).img = 'https://cdn11.bigcommerce.com/s-4hc0jwsnnq/images/stencil/1280x1280/products/30725/127559/P-6_T__63857.1725874595.jpg?c=1';
P(617).stores = { andertons: 'https://www.andertons.co.uk/roland-p6-aira-compact-creative-sampler-sound-module/' };
P(618).img = 'https://cdn11.bigcommerce.com/s-4hc0jwsnnq/images/stencil/1280x1280/products/3442/12631/443768-Circuit-Rhythm_overhead_Track-1_HR__25718.1714747892.jpg?c=1';
P(618).stores = { andertons: 'https://www.andertons.co.uk/novation-circuit-rhythm/' };
P(619).img = 'https://media.sweetwater.com/m/products/image/4a6c8f44d2GfKtNdXLek50VRrWCU6GlapPKcO3fq.png?ha=4a6c8f44d28d6d73c93ba66106c267c63e8078c8&quality=82&width=750';
P(619).stores = { andertons: 'https://www.andertons.co.uk/akai-mpc-x-se-standalone-music-production-centre/' };
P(620).img = 'https://cdn11.bigcommerce.com/s-4hc0jwsnnq/products/21118/images/72903/444985-Maschine-Plus__17233.1715250577.386.513.jpg?c=1';
P(620).stores = { andertons: 'https://www.andertons.co.uk/native-instruments-maschine-plus/' };

// ---------- B. new products 621-625 ----------
products.push(
  { id: 621, title: 'Yamaha SEQTRAK', title_es: 'Yamaha SEQTRAK', brand: 'Yamaha', category: 'drum-machine', price: 299, rating: 4.6, reviews: 25, badge: 'backpack',
    desc: 'Bar-style portable workstation with AWM2 + FM engines, onboard sampling, speaker, mic and rechargeable battery. The OP-Z successor with real Yamaha sound.',
    desc_es: 'Estación portátil en formato barra con motores AWM2 + FM, sampling integrado, altavoz, micro y batería recargable. El sucesor del OP-Z con sonido Yamaha de verdad.',
    img: 'https://uk.yamaha.com/en/files/Image-Index_SEQTRAK_2000x2000_tcm117-2158126.jpg?impolicy=resize&imwid=735&imhei=735',
    stores: { amazon: 'https://www.amazon.com/dp/B0CR6RH2SN' } },
  { id: 622, title: 'Elektron Model:Samples', title_es: 'Elektron Model:Samples', brand: 'Elektron', category: 'drum-machine', price: 249, rating: 4.8, reviews: 33, badge: 'value',
    desc: 'Six-track sample groovebox with the legendary Elektron sequencer: parameter locks, trig conditions and knob-per-function control at entry price.',
    desc_es: 'Groovebox de samples de seis pistas con el legendario secuenciador Elektron: parameter locks, trig conditions y un mando por función a precio de entrada.',
    img: 'https://cdn11.bigcommerce.com/s-4hc0jwsnnq/images/stencil/1280x1280/products/3323/12183/317483-MS%2520Front__96871.1728032369.jpg?c=1',
    stores: { andertons: 'https://www.andertons.co.uk/elektron-model-samples-lightweight-six-track-groovebox-p111001-1/' } },
  { id: 623, title: 'Sonicware Liven Lofi-12', title_es: 'Sonicware Liven Lofi-12', brand: 'Sonicware', category: 'drum-machine', price: 239, rating: 4.2, reviews: 49, badge: 'retro',
    desc: '12-bit retro sampling groovebox with 4-track sequencer, 12 track FX + 9 master FX, laidback swing knob, battery power and built-in speaker.',
    desc_es: 'Groovebox de sampling retro de 12 bits con secuenciador de 4 pistas, 12 FX por pista + 9 master, mando laidback para swing, batería y altavoz integrado.',
    img: 'https://sonicware.eu/wp-content/uploads/2023/02/LIVEN_Lofi-12_Top_WhiteBack_HiRes.jpg',
    stores: { amazon: 'https://www.amazon.com/dp/B0BLTJD1PT' } },
  { id: 624, title: 'Korg Volca Sample 2', title_es: 'Korg Volca Sample 2', brand: 'Korg', category: 'drum-machine', price: 119, rating: 4.8, reviews: 8, badge: 'budget',
    desc: 'Pocket sample sequencer with 200 slots, 10 parts, motion sequencing, pattern chaining and USB sample transfer. The cheapest ticket into real hardware.',
    desc_es: 'Secuenciador de samples de bolsillo con 200 slots, 10 partes, motion sequencing, cadena de patrones y transferencia USB. El boleto más barato al hardware real.',
    img: 'https://cdn11.bigcommerce.com/s-4hc0jwsnnq/images/stencil/1280x1280/products/2905/10510/403619-1597925674984__01109.1714746102.jpg?c=1',
    stores: { andertons: 'https://www.andertons.co.uk/korg-volca-sample-2/' } },
  { id: 625, title: 'Polyend Tracker Mini', title_es: 'Polyend Tracker Mini', brand: 'Polyend', category: 'drum-machine', price: 659, rating: 4.8, reviews: 6, badge: 'tracker',
    desc: 'Handheld vertical-tracker workstation: stereo sampling, 5 synth/drum engines, 16 tracks, 8-hour battery and mic. A full studio in a game-console body.',
    desc_es: 'Estación tracker vertical de mano: sampling estéreo, 5 motores de sinte/batería, 16 pistas, 8 horas de batería y micro. Un estudio completo en cuerpo de consola.',
    img: 'https://cdn11.bigcommerce.com/s-4hc0jwsnnq/images/stencil/1280x1280/products/28093/108674/P-TRACKERMINI2_01__64725.1720010572.jpg?c=1',
    stores: { andertons: 'https://www.andertons.co.uk/polyend-tracker-mini-20/' } }
);

// ---------- C. samplers guide GEN2 touch-ups ----------
const samp = guides.find(x => x.title === 'Best Samplers & Beat Making: Complete Guide');
const vpc16 = samp.verdictProsCons.find(v => v.name === 'Akai MPC Key 37');
const col16 = samp.productTable.columns.find(c => c.title === 'Akai MPC Key 37');
const priceRow = samp.productTable.rows.find(r => r.label === 'Estimated Price');
priceRow.values[6] = '$799';

// ---------- D. rewrite grooveboxes guide ----------
const d = guides.find(x => x.title === 'Best Grooveboxes & Compact Drum Machines');
d.id = 'compact-rhythm-devices';
d.title = 'Top Compact Rhythm Devices & Pocket Samplers';
d.title_es = 'Los mejores dispositivos de ritmo compactos y samplers de bolsillo';
d.titleTag_es = 'Dispositivos de Ritmo Compactos y Samplers de Bolsillo';
d.intro = 'Big studios stay home; these ten boxes fit in a backpack and run on batteries. From viral pocket samplers to bar-shaped workstations, these are the compact rhythm devices that prove small hits harder.';
d.intro_es = 'Los grandes estudios se quedan en casa; estas diez cajas caben en una mochila y funcionan con batería. Del sampler de bolsillo viral a la estación en forma de barra, estos son los dispositivos compactos de ritmo que demuestran que lo pequeño pega más fuerte.';
d.featuredProducts = [617, 615, 621, 622, 618, 623, 624, 625, 144, 128];
d.description = 'Top compact rhythm devices & pocket samplers 2026: EP-133 vs P-6 vs SEQTRAK vs Model:Samples. Ten battery-powered beat boxes compared. Read the verdict.';
d.description_es = 'Mejores dispositivos de ritmo compactos y samplers de bolsillo 2026: EP-133 vs P-6 vs SEQTRAK vs Model:Samples. Diez cajas de beats a batería comparadas. Lee el veredicto.';
d.comparison = { rows: [] };

const S = (heading, heading_es, content, content_es, pid) => ({ heading, heading_es, content, content_es, products: [pid] });
d.sections = [
  S('How to Pick a Beat Box That Fits Your Bag',
    'Cómo elegir una caja de beats que quepa en tu mochila',
    '<p><strong>Battery, weight and one-hand control decide everything when the studio is your backpack.</strong> Pocket samplers sketch ideas anywhere but demand menu shortcuts; bar and grid grooveboxes trade pocketability for playability. Pick by travel habit first, sound engine second.</p><p>The ten below all run portable and cost less than a flagship workstation — sorted from smallest to most complete, with honest trade-offs for each.</p>',
    '<p><strong>Batería, peso y control con una mano lo deciden todo cuando el estudio es tu mochila.</strong> Los samplers de bolsillo bocetan en cualquier parte pero exigen atajos de menú; las grooveboxes de barra y rejilla cambian bolsillo por tocabilidad. Elige primero por hábito de viaje, segundo por motor de sonido.</p><p>Las diez de abajo funcionan portátiles y cuestan menos que una estación insignia — ordenadas de menor a más completa, con concesiones honestas cada una.</p>',
    null).products = undefined,
  S('Grain Surgery in Your Palm: AIRA Compact P-6',
    'Cirugía granular en la palma: AIRA Compact P-6',
    '<p><strong>Sixteen voices, a granular engine and twenty master effects in 300 grams.</strong> The P-6 samples phones over USB-C, twists grains into textures and sequences 64 steps with probability — the deepest pocket sampler Roland ever made.</p><p>The four-character screen speaks in shortcuts and the mini pads resist finger-drumming. For sound designers who travel light, nothing this small goes this deep.</p>',
    '<p><strong>Dieciséis voces, motor granular y veinte efectos master en 300 gramos.</strong> El P-6 samplea móviles por USB-C, retuerce granos hasta texturas y secuencia 64 pasos con probabilidad — el sampler de bolsillo más profundo que Roland hizo jamás.</p><p>La pantalla de cuatro caracteres habla en atajos y los minipads se resisten al finger-drumming. Para diseñadores de sonido que viajan ligeros, nada tan pequeño llega tan hondo.</p>',
    617),
  S('The Viral Sketchpad: EP-133 K.O. II',
    'El bloc viral: EP-133 K.O. II',
    '<p><strong>A calculator that outsells grooveboxes — because ideas become beats in seconds.</strong> The K.O. II records the world through its mic, chops on pressure-sensitive keys and slams punch-in effects live, all in a tablet-thin chassis.</p><p>Sixty-four megabytes fill fast, there is no song mode and the plastic asks for care. As pure portable fun that fits any bag, it remains undefeated.</p>',
    '<p><strong>Una calculadora que vende más que grooveboxes — porque las ideas se vuelven beats en segundos.</strong> El K.O. II graba el mundo con su micro, trocea en teclas sensibles a la presión y dispara punch-in en vivo, todo en un chasis fino como tableta.</p><p>Los 64 MB se llenan rápido, no hay modo canción y el plástico pide cuidado. Como diversión portátil pura que cabe en cualquier bolso, sigue invicto.</p>',
    615),
  S('The Bar That Replaced the OP-Z: Yamaha SEQTRAK',
    'La barra que jubiló al OP-Z: Yamaha SEQTRAK',
    '<p><strong>Two thousand sounds, two real synth engines and sampling in a 500-gram bar.</strong> SEQTRAK pairs AWM2 breadth with four-operator FM depth, records over Wi-Fi, plays through its own speaker and edits from a best-in-class phone app.</p><p>Deep editing lives in the app, not the hardware, and there is no native sample slicing on the unit. For travelers wanting one complete studio bar, it is the new default.</p>',
    '<p><strong>Dos mil sonidos, dos motores de sinte reales y sampling en una barra de 500 gramos.</strong> SEQTRAK junta la amplitud AWM2 con la profundidad FM de cuatro operadores, graba por Wi-Fi, suena por su propio altavoz y se edita desde una app de móvil de primera.</p><p>La edición profunda vive en la app, no en el hardware, y no hay troceo nativo en la unidad. Para viajeros que quieren una sola barra-estudio completa, es el nuevo estándar.</p>',
    621),
  S('Elektron Thinking, Entry Money: Model:Samples',
    'Pensar Elektron, pagar entrada: Model:Samples',
    '<p><strong>Six sample tracks wired to parameter locks and trig conditions for the price of a plugin bundle.</strong> One knob per function, 64 steps per pattern and 300 Splice-curated sounds make it the fastest Elektron to learn.</p><p>It plays samples but records none — everything arrives over USB — and 64 MB is gone quickly. For DAWless sequencing on a budget, no workflow teaches more per dollar.</p>',
    '<p><strong>Seis pistas de samples cableadas a parameter locks y trig conditions por el precio de un paquete de plugins.</strong> Un mando por función, 64 pasos por patrón y 300 sonidos curados por Splice lo hacen el Elektron más rápido de aprender.</p><p>Reproduce samples pero no graba ninguno — todo llega por USB — y los 64 MB vuelan. Para secuenciar DAWless con poco presupuesto, ningún flujo enseña más por dólar.</p>',
    622),
  S('No Pixels, Just Ears: Circuit Rhythm',
    'Sin píxeles, solo oídos: Circuit Rhythm',
    '<p><strong>Thirty-two glowing pads, eight sample tracks and zero menus between you and the beat.</strong> Rhythm samples straight in, slices and resamples in the box, fires Grid FX from the grid and runs four hours unplugged.</p><p>Backup lives in the Components app, memory per project is finite and you will memorize light combos. For live performers who mix with their ears, that is pure speed.</p>',
    '<p><strong>Treinta y dos pads luminosos, ocho pistas de sample y cero menús entre tú y el beat.</strong> Rhythm samplea directo, trocea y resamplea dentro, dispara Grid FX desde la rejilla y aguanta cuatro horas sin cables.</p><p>El respaldo vive en la app Components, la memoria por proyecto es finita y memorizarás combos de luces. Para directos que mezclan con los oídos, eso es velocidad pura.</p>',
    618),
  S('Dust by Design: Liven Lofi-12',
    'Polvo por diseño: Liven Lofi-12',
    '<p><strong>Twelve-bit grit, a four-track sequencer and a Laidback knob for instant drunk swing.</strong> The Lofi-12 samples in crusty 12-bit, plays chromatically across two octaves of keys and stacks twelve track effects plus nine master effects.</p><p>Four-second samples cap ambitions, time-stretch is basic and the plastic feels budget. For nineties-texture beats on the couch, nothing fakes it this honestly.</p>',
    '<p><strong>Crudeza de 12 bits, secuenciador de cuatro pistas y mando Laidback para swing borracho instantáneo.</strong> El Lofi-12 samplea en 12 bits crujientes, toca cromático en dos octavas de teclas y apila doce efectos por pista más nueve master.</p><p>Los samples de cuatro segundos topan ambiciones, el time-stretch es básico y el plástico se siente barato. Para beats con textura noventera en el sofá, nada lo finge tan honesto.</p>',
    623),
  S('The Cheapest Way In: Volca Sample 2',
    'La entrada más barata: Volca Sample 2',
    '<p><strong>Two hundred sample slots, ten parts and motion sequencing for pocket money.</strong> The Volca Sample 2 doubles memory over the original, chains sixteen patterns into songs and dumps libraries over USB in seconds.</p><p>Eight megabytes total, AA batteries and a single reverb keep expectations honest. As the first hardware sampler for curious beginners, it has no rival at the price.</p>',
    '<p><strong>Doscientos slots de sample, diez partes y motion sequencing por calderilla.</strong> El Volca Sample 2 dobla la memoria del original, encadena dieciséis patrones en canciones y vuelca librerías por USB en segundos.</p><p>Ocho megas totales, pilas AA y una sola reverb mantienen honestas las expectativas. Como primer sampler hardware para curiosos, no tiene rival a ese precio.</p>',
    624),
  S('Math You Can Hold: Tracker Mini',
    'Matemáticas que se tocan: Tracker Mini',
    '<p><strong>Sixteen vertical tracks of samples, five synth engines and a mic in 350 grams.</strong> The Mini composes, resamples, mixes and masters whole songs on eight hours of battery — then streams fourteen stereo tracks to the DAW.</p><p>The button-and-cursor workflow takes weeks, and clicky keys hate quiet nights. For composers who think in numbers, no portable box goes further.</p>',
    '<p><strong>Dieciséis pistas verticales de samples, cinco motores de sinte y un micro en 350 gramos.</strong> El Mini compone, resamplea, mezcla y masteriza temas enteros con ocho horas de batería — y luego envía catorce pistas estéreo al DAW.</p><p>El flujo de botones y cursor tarda semanas, y las teclas ruidosas odian las noches silenciosas. Para compositores que piensan en números, ninguna caja portátil llega más lejos.</p>',
    625),
  S('FM on a Knob Budget: Model:Cycles',
    'FM con presupuesto de mandos: Model:Cycles',
    '<p><strong>Six FM Machines, Elektron sequencing and USB-C power in 800 grams.</strong> Cycles turns FM inside out: every machine is a playable instrument, and parameter locks animate them into evolving grooves.</p><p>There is no sampling at all, the screen is tiny and knob steps feel coarse. For textured electronic sketches anywhere, it is the cheapest Elektron brain.</p>',
    '<p><strong>Seis Machines FM, secuenciación Elektron y alimentación USB-C en 800 gramos.</strong> Cycles pone el FM del revés: cada máquina es un instrumento tocable, y los parameter locks las animan en grooves vivos.</p><p>No hay sampling en absoluto, la pantalla es mini y los saltos de mando se sienten toscos. Para bocetos electrónicos con textura en cualquier parte, es el cerebro Elektron más barato.</p>',
    144),
  S('Roland Classics to Go: TR-6S',
    'Clásicos Roland para llevar: TR-6S',
    '<p><strong>The 808, 909 and 606 in a battery-powered box half the size of its big sister.</strong> The TR-6S runs authentic ACB models plus editable FM and samples, with probability, sub-steps and motion recording.</p><p>Six tracks, one shared knob and digital-only outputs remind you of the compromise. For Roland drums in a backpack, it is the smart buy over the flagship.</p>',
    '<p><strong>La 808, 909 y 606 en una caja a baterías de medio tamaño que su hermana mayor.</strong> La TR-6S corre modelos ACB auténticos más FM editable y samples, con probabilidad, sub-pasos y grabación de movimiento.</p><p>Seis pistas, un solo mando compartido y salidas solo digitales recuerdan la concesión. Para baterías Roland en la mochila, es la compra inteligente frente al insignia.</p>',
    128)
];

const COLS = ['Roland AIRA Compact P-6', 'Teenage Engineering EP-133 K.O. II', 'Yamaha SEQTRAK', 'Elektron Model:Samples', 'Novation Circuit Rhythm', 'Sonicware Liven Lofi-12', 'Korg Volca Sample 2', 'Polyend Tracker Mini', 'Elektron Model:Cycles', 'Roland TR-6S'];
const col = t => ({ title: t, title_es: t });
const R = (label, label_es, values, values_es) => ({ label, label_es, values, values_es: values_es || values });
d.productTable = {
  title: 'Top Compact Rhythm Devices Compared in This Guide',
  title_es: 'Los mejores dispositivos compactos de ritmo comparados en esta guía',
  columns: COLS.map(col),
  rows: [
    R('Best For', 'Ideal para',
      ['Granular pocket sampling', 'Viral pocket sketching', 'Backpack all-in-one studio', 'Affordable Elektron sequencing', 'Screenless live sampling', '12-bit lo-fi nostalgia', 'Cheapest hardware sampling', 'Tracker composing anywhere', 'FM groove sketching', 'ACB classics to go'],
      ['Sampling granular de bolsillo', 'Bocetos virales de bolsillo', 'Estudio todo en uno de mochila', 'Secuenciación Elektron asequible', 'Sampling en vivo sin pantalla', 'Nostalgia lo-fi de 12 bits', 'Sampling hardware más barato', 'Componer con tracker en cualquier parte', 'Bocetos groove FM', 'Clásicos ACB para llevar']),
    R('Estimated Price', 'Precio estimado', ['$269', '$299', '$299', '$349', '$429', '$239', '$149', '$699', '$349', '$449'], ['$269', '$299', '$299', '$349', '$429', '$239', '$149', '$699', '$349', '$449']),
    R('Type', 'Tipo',
      ['Pocket sampler', 'Pocket sampler', 'Bar workstation', 'Groovebox', 'Groovebox', 'Groovebox', 'Pocket sampler', 'Handheld tracker', 'Groovebox', 'Compact drum machine'],
      ['Sampler de bolsillo', 'Sampler de bolsillo', 'Estación en barra', 'Groovebox', 'Groovebox', 'Groovebox', 'Sampler de bolsillo', 'Tracker de mano', 'Groovebox', 'Caja de ritmos compacta']),
    R('Sound Engine', 'Motor de sonido',
      ['Granular + sampling', 'Sampling + punch-in FX', 'AWM2 + FM + sampling', 'Sampling', 'Sampling', '12-bit sampling', 'Sampling', 'Sampling + 5 synth engines', 'FM synthesis', 'ACB + FM + samples'],
      ['Granular + sampling', 'Sampling + punch-in FX', 'AWM2 + FM + sampling', 'Sampling', 'Sampling', 'Sampling 12 bits', 'Sampling', 'Sampling + 5 motores', 'Síntesis FM', 'ACB + FM + samples']),
    R('Tracks', 'Pistas',
      ['16 voices', '12 voices', '128-note poly', '6 tracks', '8 tracks', '10 voices', '10 parts', '16 tracks', '6 tracks', '6 tracks'],
      ['16 voces', '12 voces', 'Polifonía 128 notas', '6 pistas', '8 pistas', '10 voces', '10 partes', '16 pistas', '6 pistas', '6 pistas']),
    R('Sequencer', 'Secuenciador',
      ['64-step + probability', 'Punch-in live seq.', 'Step seq. + automation', '64-step p-locks', '32-step grid + FX', '4-track step seq.', '16-step motion seq.', 'Vertical tracker', '64-step p-locks', 'Step seq. + probability'],
      ['64 pasos + probabilidad', 'Sec. punch-in en vivo', 'Pasos + automatización', '64 pasos p-locks', 'Rejilla 32 pasos + FX', '4 pistas por pasos', '16 pasos con motion', 'Tracker vertical', '64 pasos p-locks', 'Pasos + probabilidad']),
    R('Effects', 'Efectos',
      ['20 MFX + delay/reverb', 'Punch-in 2.0 FX', 'Insert + master FX', 'Delay + reverb sends', 'Grid FX + delay/reverb', '12 track + 9 master FX', 'Reverb + isolator', 'Performance + master FX', 'Delay + reverb sends', 'Reverb + delay'],
      ['20 MFX + delay/reverb', 'Punch-in 2.0 FX', 'Inserción + master FX', 'Envíos delay/reverb', 'Grid FX + delay/reverb', '12 por pista + 9 master FX', 'Reverb + isolador', 'Performance + master FX', 'Envíos delay/reverb', 'Reverb + delay']),
    R('Battery', 'Batería',
      ['3 h rechargeable', 'Battery powered', 'Rechargeable battery', 'USB powered', '4 h rechargeable', 'Battery powered', '6xAA batteries', '8 h rechargeable', 'USB powered', 'AA / USB'],
      ['3 h recargable', 'A baterías', 'Batería recargable', 'Por USB', '4 h recargable', 'A baterías', '6 pilas AA', '8 h recargable', 'Por USB', 'AA / USB'])
  ]
};

const V = (name, pros, cons, pros_es, cons_es) => ({ name, name_es: name, pros, cons, pros_es, cons_es });
d.verdictProsCons = [
  V('Roland AIRA Compact P-6',
    ['Granular engine in a 300-gram pocket box', '20 master FX inherited from the SP series', 'USB-C sampling straight from phones', '64-step sequencer with probability'],
    ['4-character screen demands menu shortcuts', 'Mini pads resist finger-drumming', 'Limited polyphony for dense stacks', '3-hour battery ends long sessions'],
    ['Motor granular en caja de 300 gramos', '20 master FX heredados de la serie SP', 'Sampling por USB-C directo del móvil', 'Secuenciador de 64 pasos con probabilidad'],
    ['La pantalla de 4 caracteres exige atajos', 'Los minipads se resisten al finger-drumming', 'Polifonía limitada para pilas densas', 'La batería de 3 horas corta sesiones largas']),
  V('Teenage Engineering EP-133 K.O. II',
    ['Fastest idea-to-beat workflow under $300', 'Punch-in 2.0 FX for live flair', 'Built-in mic plus pressure-sensitive keys', 'Tablet-thin design goes anywhere'],
    ['64 MB memory caps longer phrases', 'No song mode for full arrangements', 'Delicate plastic needs careful hands', 'No serious resampling inside'],
    ['El flujo más rápido de la idea al beat por menos de 300 $', 'Punch-in 2.0 para lucirse en vivo', 'Micro integrado más teclas sensibles', 'Diseño fino como tableta que va a todas partes'],
    ['Los 64 MB topan frases largas', 'Sin modo canción para arreglos', 'El plástico delicado pide cuidado', 'Sin resampling serio dentro']),
  V('Yamaha SEQTRAK',
    ['AWM2 + FM engines with 2,000 sounds', 'Onboard sampling, speaker and mic', 'Wi-Fi sample transfer, no cables', 'Best-in-class phone app editing'],
    ['Deep editing needs the mobile app', 'No native sample slicing on hardware', 'Bar shape fits bags, not pockets', 'Wireless features vary by region'],
    ['Motores AWM2 + FM con 2.000 sonidos', 'Sampling, altavoz y micro integrados', 'Samples por Wi-Fi, sin cables', 'Edición en app de móvil de primera'],
    ['La edición profunda pide la app móvil', 'Sin troceo nativo en el hardware', 'La forma de barra cabe en mochilas, no en bolsillos', 'Lo inalámbrico varía por región']),
  V('Elektron Model:Samples',
    ['Real Elektron sequencer at entry price', 'Knob-per-function, no menu diving', 'Per-track polyrhythm and scale settings', '300 Splice-curated sounds included'],
    ['Plays samples but records none', '64 MB memory fills quickly', 'File browsing feels clunky', 'No battery without optional handle'],
    ['Secuenciador Elektron real a precio de entrada', 'Un mando por función, sin menús', 'Polirritmia y escala por pista', '300 sonidos curados por Splice incluidos'],
    ['Reproduce samples pero no graba ninguno', 'Los 64 MB se llenan rápido', 'Navegar archivos se siente torpe', 'Sin batería sin el mango opcional']),
  V('Novation Circuit Rhythm',
    ['Screenless grid keeps ears in charge', 'Samples, slices and resamples in the box', 'Grid FX built for live transitions', '4-hour rechargeable battery included'],
    ['No waveform view anywhere', 'Backup depends on the Components app', 'Limited memory per project', '8 monophonic tracks restrict layering'],
    ['La rejilla sin pantalla deja el mando en los oídos', 'Samplea, trocea y resamplea dentro', 'Grid FX hechos para transiciones en vivo', 'Batería recargable de 4 horas incluida'],
    ['Sin vista de onda en ningún lado', 'El respaldo depende de la app Components', 'Memoria limitada por proyecto', '8 pistas monofónicas limitan las capas']),
  V('Sonicware Liven Lofi-12',
    ['True 12-bit retro sampling engine', 'Laidback knob for instant organic swing', 'Two-octave keyboard for chromatic play', 'Battery plus speaker for couch sessions'],
    ['Rigid plastic feels budget', '4-second samples cap ambitions', 'No advanced time-stretching', 'Niche sound, not an all-rounder'],
    ['Motor retro real de sampling a 12 bits', 'Mando Laidback para swing orgánico al instante', 'Teclado de dos octavas para tocar cromático', 'Batería más altavoz para sesiones de sofá'],
    ['El plástico rígido se siente barato', 'Los samples de 4 segundos topan ambiciones', 'Sin time-stretching avanzado', 'Sonido de nicho, no todoterreno']),
  V('Korg Volca Sample 2',
    ['Unbeatable price for real hardware', '200 slots with fast USB transfer', 'Motion sequencing automates on the fly', 'Pattern chaining builds full songs'],
    ['8 MB total memory is tiny', 'AA batteries, no lithium inside', 'Single reverb, basic effects', 'Tiny knobs punish big fingers'],
    ['Precio imbatible por hardware real', '200 slots con transferencia USB veloz', 'El motion sequencing automatiza al vuelo', 'La cadena de patrones arma canciones enteras'],
    ['8 MB totales son minúsculos', 'Pilas AA, sin litio dentro', 'Una sola reverb, efectos básicos', 'Los mini mandos castigan dedos grandes']),
  V('Polyend Tracker Mini',
    ['Full tracker workflow in 350 grams', 'Stereo sampling plus 5 synth/drum engines', '8-hour battery with travel case', '14 stereo USB tracks to the DAW'],
    ['Button-and-cursor learning curve is steep', 'Clicky keys hate quiet nights', 'No grid pads for rhythmic live play', 'Premium price for the size'],
    ['Flujo tracker completo en 350 gramos', 'Sampling estéreo más 5 motores', '8 horas de batería con funda de viaje', '14 pistas USB estéreo al DAW'],
    ['La curva de botones y cursor es empinada', 'Las teclas ruidosas odian noches tranquilas', 'Sin pads de rejilla para directo rítmico', 'Precio premium para el tamaño']),
  V('Elektron Model:Cycles',
    ['Elektron sequencing at entry price', '6 FM tracks, parameter locks', 'CV/Gate out for modular', 'Compact, USB-C powered'],
    ['No sampling (FM only)', 'No touchscreen', 'Small screen', 'Knob steps feel coarse for smooth sweeps'],
    ['Secuenciación Elektron a precio de entrada', '6 pistas FM, parameter locks', 'CV/Gate out modular', 'Compacto, por USB-C'],
    ['Sin sampling (solo FM)', 'Sin pantalla táctil', 'Pantalla pequeña', 'Los saltos de mando entorpecen barridos suaves']),
  V('Roland TR-6S',
    ['6 ACB models + samples, compact', 'Battery or USB powered', 'Probability, sub-step, groove', 'Battery-powered ACB drums that fit in a backpack'],
    ['Only 6 tracks', 'Small screen', 'Digital outs only', 'Single knob slows live level rides'],
    ['6 modelos ACB + samples, compacto', 'Batería o USB', 'Probabilidad, sub-paso, groove', 'Baterías ACB a pilas que caben en una mochila'],
    ['Solo 6 pistas', 'Pantalla pequeña', 'Solo salidas digitales', 'Un solo mando ralentiza niveles en directo'])
];

d.conclusion = 'Pick by travel habit: pocket sketchers belong with the EP-133 K.O. II, the P-6 or the Volca Sample 2; backpack studios with SEQTRAK or the Tracker Mini; live hands with Circuit Rhythm or the Lofi-12. The Model:Samples and Model:Cycles teach Elektron thinking cheaply, and the TR-6S keeps Roland classics portable. <p><a href="/guides/best-drum-machine.html" class="guide-link-btn">Best Drum Machines & Beat Production</a> <a href="/guides/best-samplers-drum-computers.html" class="guide-link-btn">Best Samplers & Drum Computers for Beat Makers</a></p>';
d.conclusion_es = 'Elige por hábito de viaje: los bocetos de bolsillo piden el EP-133 K.O. II, el P-6 o el Volca Sample 2; los estudios de mochila piden SEQTRAK o Tracker Mini; las manos en vivo piden Circuit Rhythm o Lofi-12. Los Model:Samples y Model:Cycles enseñan a pensar Elektron por poco, y la TR-6S mantiene clásicos Roland portátiles. <p>También te interesa: <a href="/guides/best-drum-machine_es.html" class="guide-link-btn">Mejores Máquinas de Ritmo y Producción de Beats</a> <a href="/guides/best-samplers-drum-computers_es.html" class="guide-link-btn">Mejores samplers y cajas de ritmo para creadores de beats</a></p>';
d.verdict = 'The EP-133 K.O. II is the hype king of pocket sketching, the P-6 the deepest pocket sampler, and SEQTRAK the most complete travel studio. Model:Samples and Model:Cycles are the cheapest Elektron brains, Circuit Rhythm and Lofi-12 the live-hands picks, Volca Sample 2 the budget door, Tracker Mini the composer’s choice, and TR-6S the portable Roland.';
d.verdict_es = 'El EP-133 K.O. II es el rey del hype en bocetos de bolsillo, el P-6 el sampler de bolsillo más profundo, y SEQTRAK el estudio de viaje más completo. Model:Samples y Model:Cycles son los cerebros Elektron más baratos, Circuit Rhythm y Lofi-12 las opciones de manos en vivo, Volca Sample 2 la puerta barata, Tracker Mini la elección del compositor, y TR-6S la Roland portátil.';

const f = d.featuredSnippet;
f.title_en = 'Top Compact Rhythm Devices & Pocket Samplers';
f.title_es = 'Mejores dispositivos de ritmo compactos y samplers de bolsillo';
f.text_en = 'The Teenage Engineering EP-133 K.O. II is the fastest pocket sketchpad; the Roland P-6 is the deepest pocket sampler with a granular engine. Ten battery-powered beat boxes compared.';
f.text_es = 'El Teenage Engineering EP-133 K.O. II es el bloc de bolsillo más rápido; el Roland P-6 es el sampler de bolsillo más profundo con motor granular. Diez cajas de beats a batería comparadas.';
f.faq_q1_en = 'Is the Teenage Engineering EP-133 the best pocket sampler for beginners?';
f.faq_a1_en = 'For speed and fun, yes. The EP-133 K.O. II turns ideas into beats in seconds with its mic, pressure-sensitive keys and punch-in effects. The 64 MB memory and missing song mode limit full productions — pair it with a DAW or step up to the P-6 for deeper sampling.';
f.faq_q1_es = '¿Es el Teenage Engineering EP-133 el mejor sampler de bolsillo para empezar?';
f.faq_a1_es = 'Por velocidad y diversión, sí. El EP-133 K.O. II convierte ideas en beats en segundos con su micro, teclas sensibles y punch-in. Los 64 MB y la falta de modo canción limitan producciones enteras — combínalo con un DAW o sube al P-6 para sampling más hondo.';
f.faq_q2_en = 'Roland P-6 vs EP-133: which pocket sampler wins?';
f.faq_a2_en = 'Depth goes to the P-6: granular engine, 20 master effects, 64-step probability sequencing. Speed and charm go to the EP-133: faster sketching, better live punch-in fun. Sound designers pick the P-6; song sketchers pick the EP-133.';
f.faq_q2_es = 'Roland P-6 vs EP-133: ¿qué sampler de bolsillo gana?';
f.faq_a2_es = 'La profundidad es del P-6: motor granular, 20 master FX, 64 pasos con probabilidad. La velocidad y el encanto son del EP-133: bocetos más rápidos, punch-in más divertido. Diseñadores eligen P-6; bocetadores eligen EP-133.';
f.faq_q3_en = 'Does the Yamaha SEQTRAK work without the phone app?';
f.faq_a3_en = 'Beats and performance work standalone: sampling, sequencing, speaker and battery need no phone. Deep sound editing lives in the SEQTRAK app, and there is no on-device sample slicing. Think of the hardware as the instrument and the app as the editor.';
f.faq_q3_es = '¿Funciona el Yamaha SEQTRAK sin la app del móvil?';
f.faq_a3_es = 'Beats y directo funcionan autónomos: sampling, secuenciación, altavoz y batería no piden móvil. La edición profunda vive en la app SEQTRAK, y no hay troceo en la unidad. Piensa el hardware como instrumento y la app como editor.';
f.faq_q4_en = 'Elektron Model:Samples vs Model:Cycles: which one?';
f.faq_a4_en = 'Samples plays your sounds: six sample tracks with the Elektron sequencer, but it records nothing. Cycles synthesizes its own: six FM Machines, no sampling at all. Want your library on stage? Samples. Want FM textures from thin air? Cycles.';
f.faq_q4_es = 'Elektron Model:Samples vs Model:Cycles: ¿cuál?';
f.faq_a4_es = 'Samples toca tus sonidos: seis pistas de sample con secuenciador Elektron, pero no graba nada. Cycles sintetiza lo suyo: seis Machines FM, cero sampling. ¿Tu librería en el escenario? Samples. ¿Texturas FM de la nada? Cycles.';
f.faq_q5_en = 'Can a pocket groovebox replace a DAW?';
f.faq_a5_en = 'For sketching and live play, yes. Pocket boxes build patterns and songs, sequence drums and synths, and perform without a computer. Mixing, mastering and detailed editing still belong in a DAW — the classic flow is groovebox for ideas, DAW for polish.';
f.faq_a5_es = '¿Un groovebox de bolsillo reemplaza un DAW?';
f.faq_a5_es = 'Para bocetar y tocar en vivo, sí. Las cajas de bolsillo arman patrones y canciones, secuencian baterías y sintes y tocan sin PC. Mezclar, masterizar y editar fino siguen siendo del DAW — el flujo clásico es groovebox para ideas, DAW para pulir.';
f.faq_q6_en = 'Which compact box is easiest for a beginner?';
f.faq_a6_en = 'The Korg Volca Sample 2 is the cheapest start: 200 slots, motion sequencing and pattern chaining with almost no learning curve. The EP-133 is the most fun start. The Tracker Mini and Model:Cycles reward patience with far deeper instruments.';
f.faq_q6_es = '¿Qué caja compacta es más fácil para empezar?';
f.faq_a6_es = 'El Korg Volca Sample 2 es el inicio más barato: 200 slots, motion sequencing y cadena de patrones con curva casi nula. El EP-133 es el inicio más divertido. Tracker Mini y Model:Cycles premian la paciencia con instrumentos mucho más hondos.';
f.faq_q7_en = 'Is the Roland TR-6S enough for portable Roland drums?';
f.faq_a7_en = 'For most beat-makers, yes. The TR-6S packs authentic ACB models, editable FM, samples and probability sequencing into a battery-powered box. You lose tracks, individual outputs and faders versus the flagship — for the desk or the backpack, the 6S is the smarter buy.';
f.faq_q7_es = '¿Basta la Roland TR-6S para baterías Roland portátiles?';
f.faq_a7_es = 'Para la mayoría, sí. La TR-6S mete modelos ACB auténticos, FM editable, samples y probabilidad en una caja a baterías. Pierdes pistas, salidas individuales y faders frente al insignia — para el escritorio o la mochila, la 6S es la compra inteligente.';

// ---------- E. relatedGuides refs ----------
guides.forEach(gd => {
  if (Array.isArray(gd.relatedGuides)) {
    gd.relatedGuides = gd.relatedGuides.map(r => r === 'best-grooveboxes' ? 'compact-rhythm-devices' : r);
  }
});

fs.writeFileSync(DIR + 'data/products.json', JSON.stringify(products, null, 2));
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(guides, null, 2));
console.log('products:', products.length, '| new id:', d.id, '| sections:', d.sections.length, '| vpc:', d.verdictProsCons.length);
