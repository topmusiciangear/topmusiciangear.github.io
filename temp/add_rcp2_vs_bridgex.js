var fs = require('fs');
var BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
var fails = [];
function must(cond, msg) { if (!cond) { fails.push(msg); } }

var d = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
must(Array.isArray(d), 'guides.json is not an array');
if (d.find(function (x) { return x.id === 'rodecaster-pro2-vs-bridgecast-x'; })) {
  console.log('Guide already exists, aborting');
  process.exit(1);
}

var guide = {
  id: 'rodecaster-pro2-vs-bridgecast-x',
  title: 'RØDECaster Pro II vs Bridge Cast X: Best Streaming Mixer?',
  title_es: 'RØDECaster Pro II vs Bridge Cast X: ¿mejor mezclador de streaming?',
  titleTag: 'RØDECaster Pro II vs Bridge Cast X: Which Wins?',
  titleTag_es: 'RØDECaster Pro II vs Bridge Cast X: ¿cuál gana?',
  category: 'streaming',
  image: 'https://r2.gear4music.com/media/106/1068690/1200/preview.jpg',
  badge: 'bestSeller',
  intro: 'The RØDECaster Pro II and the Roland Bridge Cast X are the two flagship desks for creators who want hardware control over their stream, and they could not think more differently: one is a radio studio from the future built around voice quality and discussion formats, the other is a gamer command center that merges audio and video into a single box. Both handle live streams and heavy OBS workloads — here is how they compare, because there is no absolute winner, only the right tool for each type of creator.',
  intro_es: 'El RØDECaster Pro II y el Roland Bridge Cast X son los dos escritorios insignia para creadores que quieren control físico de su directo, y no pueden pensar más distinto: uno es un estudio de radio del futuro construido alrededor de la calidad de voz y los formatos de debate, el otro es un centro de mando gamer que fusiona audio y vídeo en una sola caja. Ambos manejan directos y cargas pesadas de OBS — esto es lo que destaca de cada uno, porque no hay una ganadora absoluta, solo la herramienta ideal para cada tipo de creador',
  sections: [
    {
      heading: 'Radio Studio or Gamer Command Center? The 30-Second Answer',
      heading_es: '¿Estudio de radio o centro de mando gamer? La respuesta en 30 segundos',
      content: '<p><strong>If your show lives or dies by voice quality, guests and discussion formats, the RØDECaster Pro II wins.</strong> Four Neutrik combo inputs feed 76dB Revolution preamps that drive an SM7B with no booster, APHEX processing fattens every voice on the hardware itself, long-throw faders ride music smoothly, and multitrack recording to microSD keeps working even when the PC does not. <strong>If you are a solo creator focused on gaming who wants fewer cables on a small desk, the Roland Bridge Cast X wins.</strong> HDMI capture and mixing live in one compact box, dual-bus mixing splits what you hear from what Twitch hears, and voice FX plus Game EQ presets tune the rig for competitive play. Same problem, opposite philosophies.</p>',
      content_es: '<p><strong>Si tu programa vive o muere por la calidad de voz, los invitados y los formatos de debate, el RØDECaster Pro II gana.</strong> Cuatro entradas combo Neutrik alimentan previos Revolution de 76dB que mueven un SM7B sin booster, el procesado APHEX engorda cada voz en el propio hardware, los faders de largo recorrido pasean la música con suavidad, y la grabación multitrack a microSD sigue funcionando aunque el PC no. <strong>Si eres un creador en solitario enfocado al gaming que quiere menos cables en un escritorio pequeño, el Roland Bridge Cast X gana.</strong> La captura HDMI y la mezcla viven en una sola caja compacta, la mezcla de doble bus separa lo que tú oyes de lo que oye Twitch, y los efectos de voz más los presets de Game EQ ajustan el equipo para el juego competitivo. El mismo problema, filosofías opuestas.</p>',
      products: [248, 240],
      skipMedia: true
    },
    {
      heading: 'Four Mics, Zero Fear: Why the RØDECaster Pro II Is the Radio Studio',
      heading_es: 'Cuatro micros y cero miedo: por qué el RØDECaster Pro II es el estudio de radio',
      content: '<p><strong>The RØDECaster Pro II is a broadcast console that runs the whole show on its own quad-core hardware.</strong> Four balanced Neutrik combo jacks take microphones, instruments and line sources, and the 76dB Revolution preamps (-131.5dBV EIN) stay quiet with any dynamic, so there is no Cloudlifter on the desk and no PC plugin chain to babysit. Every channel carries studio-grade APHEX processing — Aural Exciter, Big Bottom and Compellor plus compressor, noise gate, high-pass filter, de-esser and three-band EQ — through nine assignable channels with six physical faders for organic music rides and a 5.5-inch touchscreen that shows levels at a glance.</p><p><strong>The reliability story is the real selling point.</strong> Dual USB-C feeds two computers at once, eight SMART pads fire OBS commands, music ducking and voice FX across 64 banked actions, Bluetooth and Wi-Fi/Ethernet bring in phone and remote guests, and multitrack or stereo recording goes to microSD, USB storage or computer. Buyers rate it 4.4/5 across 1,285 reviews. The honest trade: there is no video capture anywhere in the box, so console streamers still buy a separate capture card.</p>',
      content_es: '<p><strong>El RØDECaster Pro II es una consola de broadcast que corre todo el programa en su propio hardware de cuatro núcleos.</strong> Cuatro jacks combo Neutrik balanceados aceptan micrófonos, instrumentos y fuentes de línea, y los previos Revolution de 76dB (-131.5dBV EIN) se mantienen silenciosos con cualquier dinámico, así que no hay Cloudlifter en el escritorio ni cadena de plugins en el PC que vigilar. Cada canal lleva procesado APHEX de nivel estudio — Aural Exciter, Big Bottom y Compellor más compresor, puerta de ruido, filtro paso-alto, de-esser y ecualizador de tres bandas — en nueve canales asignables con seis faders físicos para paseos de música orgánicos y una pantalla táctil de 5.5 pulgadas que muestra los niveles de un vistazo.</p><p><strong>La historia de la fiabilidad es el verdadero argumento de venta.</strong> El doble USB-C alimenta dos ordenadores a la vez, ocho pads SMART disparan comandos de OBS, bajada de música y efectos de voz en 64 acciones con bancos, Bluetooth y Wi-Fi/Ethernet meten llamadas e invitados remotos, y la grabación multitrack o estéreo va a microSD, USB u ordenador. Los compradores lo valoran con 4.4/5 en 1,285 reseñas. El trato honesto: no hay captura de vídeo en la caja, así que los streamers de consola siguen necesitando una capturadora aparte.</p>',
      products: [248]
    },
    {
      heading: 'One Box for Game, Camera and Chat: Why the Bridge Cast X Rules Small Desks',
      heading_es: 'Una caja para juego, cámara y chat: por qué el Bridge Cast X manda en escritorios pequeños',
      content: '<p><strong>The Bridge Cast X unifies audio and video so a solo gamer stops collecting boxes.</strong> Two HDMI inputs plus HDMI thru take a PS5, a Switch or a camera (up to 4K60 on input/thru, up to 1080p60 out over USB), two USB-C ports cover the gaming and streaming computers, and the aux input pulls phone audio into the mix — no external capture card, no repatching to change setups. The dual-bus design runs a STREAM MIX for the audience and a PERSONAL MIX for your headphones independently, adjusted on fast knobs mid-match, while 32-bit floating-point DSP keeps every source dedicated to gaming and streaming.</p><p><strong>The flavor is pure gaming, not radio purity.</strong> One XLR input with 48V phantom hosts a serious broadcast mic, and the VT-derived voice changer, five customizable Game EQ presets (footstep boosts for shooters included), EQ, compressor, de-esser, noise suppressor and reverb tune the rig for fun and competition rather than locution. Six assignable pads hold up to 30 OBS commands, sound FX and music shortcuts, and BGM CAST adds royalty-free music through the Bridge Cast app. The honest trade: a second guest mic on the desk does not fit, and there is no standalone multitrack recording to SD.</p>',
      content_es: '<p><strong>El Bridge Cast X unifica audio y vídeo para que el gamer en solitario deje de acumular cajas.</strong> Dos entradas HDMI más HDMI thru aceptan una PS5, una Switch o una cámara (hasta 4K60 en entrada/thru, hasta 1080p60 por USB), dos puertos USB-C cubren los ordenadores de juego y streaming, y la entrada auxiliar mete el audio del teléfono en la mezcla — sin capturadora externa, sin recablear para cambiar de setup. El diseño de doble bus corre una mezcla STREAM para la audiencia y una mezcla PERSONAL para tus auriculares de forma independiente, ajustadas con perillas rápidas en plena partida, mientras el DSP interno de 32 bits en coma flotante mantiene cada fuente dedicada al juego y al streaming.</p><p><strong>El sabor es puro gaming, no pureza radial.</strong> Una entrada XLR con phantom de 48V acoge un micro serio de broadcast, y el cambiador de voz derivado de la serie VT, cinco presets personalizables de Game EQ (con realce de pasos para shooters), EQ, compresor, de-esser, supresor de ruido y reverb ajustan el equipo para la diversión y la competición más que para la locución. Seis pads asignables guardan hasta 30 comandos de OBS, efectos y atajos de música, y BGM CAST añade música libre de derechos desde la app Bridge Cast. El trato honesto: un segundo micro de invitado en el escritorio no cabe, y no hay grabación multitrack autónoma a SD.</p>',
      products: [240]
    },
    {
      heading: 'Consoles, Guests and Headroom: How to Choose Without Regret',
      heading_es: 'Consolas, invitados y espacio: cómo elegir sin arrepentirte',
      content: '<p><strong>Buy the Roland Bridge Cast X if you stream solo, play on console and crave desk space.</strong> One compact box replaces the capture card, mixes game, chat, mic and music on two independent buses, and tunes itself to competitive play — the fastest path from unboxing to a clean Twitch feed. <strong>Buy the RØDECaster Pro II if your channel is growing toward a general entertainment show, in-person interviews or simply the best possible vocal sound.</strong> Four XLR inputs, 76dB of clean gain, hardware APHEX and multitrack recording survive crashed PCs and guest-filled desks alike. Dual-PC routing is a tie: both handle gaming-plus-streaming computers well. Voice-first future means Rode; solo gaming present means Roland.</p>',
      content_es: '<p><strong>Compra el Roland Bridge Cast X si transmites en solitario, juegas en consola y quieres espacio en el escritorio.</strong> Una sola caja compacta reemplaza la capturadora, mezcla juego, chat, micro y música en dos buses independientes, y se ajusta al juego competitivo — el camino más rápido del unboxing a un feed limpio de Twitch. <strong>Compra el RØDECaster Pro II si tu canal evoluciona hacia un show de entretenimiento general, entrevistas en persona o simplemente el mejor sonido vocal posible.</strong> Cuatro entradas XLR, 76dB de ganancia limpia, APHEX en hardware y grabación multitrack sobreviven tanto a PCs caídos como a escritorios llenos de invitados. En ruteo de doble PC hay empate: ambos manejan bien los ordenadores de juego más streaming. Futuro con voz primero significa Rode; presente de gaming en solitario significa Roland.</p>',
      products: [248, 240],
      skipMedia: true
    }
  ],
  conclusion: 'The RØDECaster Pro II wins on voice quality, guests and reliability — four XLR inputs, 76dB Revolution preamps, hardware APHEX and multitrack recording that outlives a crashed PC. The Roland Bridge Cast X wins on space and versatility — HDMI capture plus dual-bus mixing in one compact gamer box. <p>Looking for more? Check the <a href="/guides/stream-controllers.html" class="guide-link-btn">best stream controllers and mixers</a> guide, the <a href="/guides/streaming-interfaces.html" class="guide-link-btn">best streaming and podcast interfaces</a> and the <a href="/guides/rodecaster-pro2-vs-dlz-creator.html" class="guide-link-btn">RØDECaster Pro II vs DLZ Creator</a> battle</p>',
  conclusion_es: 'El RØDECaster Pro II gana en calidad de voz, invitados y fiabilidad — cuatro entradas XLR, previos Revolution de 76dB, APHEX en hardware y grabación multitrack que sobrevive a un PC caído. El Roland Bridge Cast X gana en espacio y versatilidad — captura HDMI más mezcla de doble bus en una sola caja gamer compacta. <p>¿Buscas más? Consulta la <a href="/guides/stream-controllers_es.html" class="guide-link-btn">guía de mejores controladores y mezcladores de streaming</a> la <a href="/guides/streaming-interfaces_es.html" class="guide-link-btn">de mejores interfaces de streaming y podcast</a> y el <a href="/guides/rodecaster-pro2-vs-dlz-creator_es.html" class="guide-link-btn">duelo RØDECaster Pro II vs DLZ Creator</a></p>',
  verdict: 'The RØDECaster Pro II is the voice-first pick for shows, interviews and guests with pro preamps built in. The Roland Bridge Cast X is the space-saving pick for solo gamers who want capture and mixing in one box.',
  verdict_es: 'El RØDECaster Pro II es la opción de voz primero para programas, entrevistas e invitados con previos pro integrados. El Roland Bridge Cast X es la opción compacta para gamers en solitario que quieren captura y mezcla en una sola caja.',
  verdictProsCons: [
    {
      name: 'RØDECaster Pro II',
      name_es: 'RØDECaster Pro II',
      pros: [
        'All mixing and FX run on quad-core hardware — a frozen PC never kills your stream',
        'Four Neutrik combo inputs with 76dB Revolution preamps drive an SM7B with no booster',
        'Hardware APHEX chain (Aural Exciter, Big Bottom, Compellor) plus gate, de-esser and 3-band EQ per channel',
        'Eight SMART pads fire OBS commands, music ducking and voice FX across 64 banked actions',
        'Multitrack or stereo recording to microSD, USB storage or computer, plus dual USB-C for two computers'
      ],
      pros_es: [
        'Toda la mezcla y los FX corren en hardware de cuatro núcleos — un PC congelado nunca mata tu directo',
        'Cuatro entradas combo Neutrik con previos Revolution de 76dB mueven un SM7B sin booster',
        'Cadena APHEX en hardware (Aural Exciter, Big Bottom, Compellor) más puerta, de-esser y EQ de 3 bandas por canal',
        'Ocho pads SMART disparan comandos de OBS, bajada de música y efectos de voz en 64 acciones con bancos',
        'Grabación multitrack o estéreo a microSD, USB u ordenador, más doble USB-C para dos ordenadores'
      ],
      cons: [
        'No video capture — console streamers still need a separate capture card and cable',
        'Overkill if you stream solo and never plug a second microphone',
        'Higher price tier than the Bridge Cast X for a gaming-only desk',
        'Deep channel editing is menu-driven on the 5.5-inch touchscreen rather than knob-per-function',
        'No hardware sends or inserts — you cannot route outboard gear into a channel'
      ],
      cons_es: [
        'Sin captura de vídeo — los streamers de consola siguen necesitando capturadora y cable aparte',
        'Excesivo si transmites en solitario y nunca conectas un segundo micrófono',
        'Escalón de precio más alto que el Bridge Cast X para un escritorio solo de gaming',
        'La edición profunda de canales se maneja por menús en la pantalla de 5.5 pulgadas en lugar de una perilla por función',
        'Sin sends ni inserts de hardware — no puedes insertar equipo externo en un canal'
      ]
    },
    {
      name: 'Roland Bridge Cast X',
      name_es: 'Roland Bridge Cast X',
      pros: [
        'HDMI capture and mixing in one compact box — consoles and cameras connect with no external card',
        'Dual-bus mixing splits your headphone mix from the audience mix on fast dedicated knobs',
        'VT-derived voice changer plus five customizable Game EQ presets tune the rig for competitive play',
        'Two USB-C ports cover gaming and streaming computers, including single-cable video to the stream PC',
        '32-bit floating-point DSP with BGM CAST royalty-free music and up to 30 pad shortcuts for OBS and FX'
      ],
      pros_es: [
        'Captura HDMI y mezcla en una sola caja compacta — consolas y cámaras se conectan sin tarjeta externa',
        'La mezcla de doble bus separa tu escucha de la mezcla de la audiencia con perillas rápidas dedicadas',
        'Cambiador de voz derivado de VT más cinco presets personalizables de Game EQ ajustan el equipo al juego competitivo',
        'Dos puertos USB-C cubren los ordenadores de juego y streaming, incluido vídeo por un solo cable al PC de stream',
        'DSP interno de 32 bits en coma flotante con música libre de derechos BGM CAST y hasta 30 atajos en pads para OBS y FX'
      ],
      cons: [
        'Single XLR input — a guest sitting next to you has nowhere to plug a second mic',
        'No standalone multitrack or SD recording like a broadcast console offers',
        'Gaming-first knobs and pads cannot ride music as smoothly as long-throw faders',
        'Mic preamp gain figure is not published, so there is no 70dB-plus clean-gain claim to lean on',
        'Needs USB bus power at 5V/3A or a compatible PD adapter, which is sold separately'
      ],
      cons_es: [
        'Una sola entrada XLR — un invitado sentado a tu lado no tiene dónde enchufar un segundo micro',
        'Sin grabación multitrack autónoma ni a SD como ofrece una consola de broadcast',
        'Las perillas y pads de enfoque gamer no pasean la música con la suavidad de unos faders largos',
        'La cifra de ganancia del previo no está publicada, así que no hay reclamo de 70dB limpios en que apoyarse',
        'Necesita alimentación USB de 5V/3A o un adaptador PD compatible, que se vende por separado'
      ]
    }
  ],
  featuredProducts: [248, 240],
  relatedGuides: ['stream-controllers', 'streaming-interfaces', 'rodecaster-pro2-vs-dlz-creator', 'stream-deck-plus-xl-vs-razer', 'best-digital-mixers'],
  description: 'RØDECaster Pro II vs Roland Bridge Cast X for streamers and creators: radio-studio voice quality and guests against gamer capture and dual-bus mixing in one box.',
  description_es: 'RØDECaster Pro II vs Roland Bridge Cast X para streamers y creadores: calidad de voz de estudio de radio e invitados contra captura gamer y mezcla de doble bus en una sola caja.',
  featuredSnippet: {
    title_en: 'RØDECaster Pro II vs Roland Bridge Cast X: Best Streaming Mixer Compared',
    text_en: 'The RØDECaster Pro II runs a four-mic broadcast studio on its own hardware with 76dB Revolution preamps, APHEX processing and multitrack recording. The Roland Bridge Cast X merges HDMI video capture and dual-bus audio mixing in one compact gamer box.',
    name1_en: 'RØDECaster Pro II',
    name2_en: 'Roland Bridge Cast X',
    price1: '699',
    price2: '499',
    type1: 'Broadcast Console',
    type2: 'Streaming Mixer',
    key1: 'Four XLR studio with hardware APHEX',
    key2: 'HDMI capture plus dual-bus mixing',
    best1_en: 'Voice-first shows, interviews and guests',
    best2_en: 'Solo gamers with consoles and cameras',
    brand1: 'Rode',
    brand2: 'Roland',
    rating1: 4.4,
    rating2: 4.7,
    title_es: 'RØDECaster Pro II vs Roland Bridge Cast X: comparativa del mejor mezclador de streaming',
    text_es: 'El RØDECaster Pro II corre un estudio de broadcast de cuatro micros en su propio hardware con previos Revolution de 76dB, procesado APHEX y grabación multitrack. El Roland Bridge Cast X fusiona captura de vídeo HDMI y mezcla de audio de doble bus en una sola caja gamer compacta.',
    name1_es: 'RØDECaster Pro II',
    name2_es: 'Roland Bridge Cast X',
    best1_es: 'Programas de voz, entrevistas e invitados',
    best2_es: 'Gamers en solitario con consolas y cámaras',
    key1_es: 'Estudio de cuatro XLR con APHEX en hardware',
    key2_es: 'Captura HDMI más mezcla de doble bus',
    faq_q1_en: 'Which is better for streaming, the RØDECaster Pro II or the Roland Bridge Cast X?',
    faq_a1_en: 'For streaming it depends on your format. The RØDECaster Pro II is better for voice-first shows, interviews and guests thanks to four XLR inputs, 76dB Revolution preamps and hardware APHEX processing. The Roland Bridge Cast X is better for solo gamers with consoles and cameras because it merges HDMI capture and dual-bus mixing in one compact box. Both handle dual-PC routing well.',
    faq_q2_en: 'Can I stream a PS5 or Switch without a separate capture card?',
    faq_a2_en: 'With the Roland Bridge Cast X, yes: two HDMI inputs plus HDMI thru take consoles and cameras with up to 4K60 on input and thru and up to 1080p60 out over USB to the stream computer. With the RØDECaster Pro II, no: it is audio-only, so console streamers still need a separate video capture card.',
    faq_q3_en: 'Which sounds better with a Shure SM7B?',
    faq_a3_en: 'The RØDECaster Pro II is the safer choice for an SM7B: its 76dB Revolution preamps with -131.5dBV EIN drive the mic cleanly with no external booster, plus APHEX processing on every channel. Roland says the Bridge Cast X runs broadcast-grade XLR mics with no activators, but it publishes no gain figure, so there is no comparable clean-gain claim.',
    faq_q4_en: 'Which is better for a dual-PC streaming setup?',
    faq_a4_en: 'It is a tie. The RØDECaster Pro II feeds two computers at once over dual USB-C while the whole mix keeps running on hardware. The Bridge Cast X dedicates its two USB-C ports to gaming and streaming computers, including single-cable audio and video to the stream PC. Pick by format, not by dual-PC support.',
    faq_q5_en: 'Which should a beginner buy?',
    faq_a5_en: 'A solo gamer on a small desk should buy the Roland Bridge Cast X: fewer boxes, fewer cables and gaming-tuned presets from day one. A creator growing toward interviews, guests or the best possible vocal sound should buy the RØDECaster Pro II: four mics, real faders and multitrack recording leave headroom to grow.',
    faq_q1_es: '¿Cuál es mejor para streaming, el RØDECaster Pro II o el Roland Bridge Cast X?',
    faq_a1_es: 'Para streaming depende de tu formato. El RØDECaster Pro II es mejor para programas de voz, entrevistas e invitados gracias a cuatro entradas XLR, previos Revolution de 76dB y procesado APHEX en hardware. El Roland Bridge Cast X es mejor para gamers en solitario con consolas y cámaras porque fusiona captura HDMI y mezcla de doble bus en una sola caja compacta. Ambos manejan bien el ruteo de doble PC.',
    faq_q2_es: '¿Puedo transmitir una PS5 o Switch sin capturadora aparte?',
    faq_a2_es: 'Con el Roland Bridge Cast X, sí: dos entradas HDMI más HDMI thru aceptan consolas y cámaras con hasta 4K60 en entrada y thru y hasta 1080p60 por USB al ordenador de stream. Con el RØDECaster Pro II, no: es solo audio, así que los streamers de consola siguen necesitando una capturadora de vídeo aparte.',
    faq_q3_es: '¿Cuál suena mejor con un Shure SM7B?',
    faq_a3_es: 'El RØDECaster Pro II es la opción más segura para un SM7B: sus previos Revolution de 76dB con -131.5dBV EIN mueven el micro limpiamente sin booster externo, más procesado APHEX en cada canal. Roland dice que el Bridge Cast X mueve micros XLR de broadcast sin activadores, pero no publica cifra de ganancia, así que no hay reclamo comparable de ganancia limpia.',
    faq_q4_es: '¿Cuál es mejor para un setup de streaming con doble PC?',
    faq_a4_es: 'Hay empate. El RØDECaster Pro II alimenta dos ordenadores a la vez por doble USB-C mientras toda la mezcla sigue corriendo en hardware. El Bridge Cast X dedica sus dos puertos USB-C a los ordenadores de juego y streaming, incluido audio y vídeo por un solo cable al PC de stream. Elige por formato, no por el soporte de doble PC.',
    faq_q5_es: '¿Cuál debería comprar un principiante?',
    faq_a5_es: 'Un gamer en solitario con escritorio pequeño debería comprar el Roland Bridge Cast X: menos cajas, menos cables y presets de gaming desde el primer día. Un creador que crece hacia entrevistas, invitados o el mejor sonido vocal posible debería comprar el RØDECaster Pro II: cuatro micros, faders reales y grabación multitrack dejan espacio para crecer.',
    specs: [
      { label_en: 'Type', label_es: 'Tipo', val1: 'All-in-one broadcast console', val2: 'Dual-bus streaming mixer + video capture' },
      { label_en: 'Best For', label_es: 'Ideal para', val1: 'Voice-first shows, interviews and guests', val2: 'Solo gaming with consoles and cameras' },
      { label_en: 'Mic Inputs', label_es: 'Entradas de micrófono', val1: '4x Neutrik combo (mic/line/instrument)', val2: '1x XLR with 48V phantom + headset mic jack' },
      { label_en: 'Mic Preamps', label_es: 'Preámplificadores', val1: '76dB Revolution, -131.5dBV EIN', val2: 'Not published (XLR in -87 to -12 dBu)' },
      { label_en: 'Video Capture', label_es: 'Captura de vídeo', val1: 'None — audio only', val2: '2x HDMI in + thru up to 4K60; USB out up to 1080p60' },
      { label_en: 'Mix Control', label_es: 'Control de mezcla', val1: '9 channels, 6 physical + 3 virtual faders', val2: '2 buses (STREAM + PERSONAL), knob control' },
      { label_en: 'Pads', label_es: 'Pads', val1: '8 SMART pads, 64 actions across banks', val2: '6 assignable pads, up to 30 shortcuts' },
      { label_en: 'Voice Processing', label_es: 'Procesado de voz', val1: 'APHEX suite + EQ, gate, de-esser', val2: 'VT voice changer + 5 Game EQ presets' },
      { label_en: 'Connectivity', label_es: 'Conectividad', val1: 'Dual USB-C, Bluetooth, Wi-Fi, Ethernet', val2: '2x USB-C, 2x HDMI in, HDMI thru, aux in' },
      { label_en: 'Recording', label_es: 'Grabación', val1: 'Multitrack/stereo to microSD, USB or computer', val2: 'Not published — via USB to computer' },
      { label_en: 'Price', label_es: 'Precio', val1: '', val2: '' }
    ]
  },
  comparison: {
    rows: [
      { label: 'Estimated Price', label_es: 'Precio estimado', val1: '~$699', val2: '~$499', val1_es: '~$699', val2_es: '~$499' },
      { label: 'Type', label_es: 'Tipo', val1: 'All-in-one broadcast console', val2: 'Dual-bus streaming mixer + video capture', val1_es: 'Consola de broadcast todo-en-uno', val2_es: 'Mezclador de doble bus + captura de vídeo' },
      { label: 'Best For', label_es: 'Ideal para', val1: 'Voice-first shows, interviews and guests', val2: 'Solo gaming with consoles and cameras', val1_es: 'Programas de voz, entrevistas e invitados', val2_es: 'Gaming en solitario con consolas y cámaras' },
      { label: 'Mic Inputs', label_es: 'Entradas de micrófono', val1: '4x Neutrik combo (mic/line/instrument)', val2: '1x XLR with 48V phantom + headset mic jack', val1_es: '4x combo Neutrik (micro/línea/instrumento)', val2_es: '1x XLR con phantom de 48V + jack de micro de diadema' },
      { label: 'Mic Preamps', label_es: 'Preámplificadores', val1: '76dB Revolution, -131.5dBV EIN', val2: 'Not published (XLR in -87 to -12 dBu)', val1_es: '76dB Revolution, -131.5dBV EIN', val2_es: 'No publicado (entrada XLR de -87 a -12 dBu)' },
      { label: 'Video Capture', label_es: 'Captura de vídeo', val1: 'None — audio only', val2: '2x HDMI in + thru up to 4K60; USB out up to 1080p60', val1_es: 'Ninguna — solo audio', val2_es: '2x HDMI in + thru hasta 4K60; USB hasta 1080p60' },
      { label: 'Mix Control', label_es: 'Control de mezcla', val1: '9 channels, 6 physical + 3 virtual faders', val2: '2 buses (STREAM + PERSONAL), knob control', val1_es: '9 canales, 6 faders físicos + 3 virtuales', val2_es: '2 buses (STREAM + PERSONAL), control por perillas' },
      { label: 'Pads', label_es: 'Pads', val1: '8 SMART pads, 64 actions across banks', val2: '6 assignable pads, up to 30 shortcuts', val1_es: '8 pads SMART, 64 acciones con bancos', val2_es: '6 pads asignables, hasta 30 atajos' },
      { label: 'Voice Processing', label_es: 'Procesado de voz', val1: 'APHEX suite + EQ, gate, de-esser', val2: 'VT voice changer + 5 Game EQ presets', val1_es: 'Suite APHEX + EQ, puerta, de-esser', val2_es: 'Cambiador de voz VT + 5 presets de Game EQ' },
      { label: 'Connectivity', label_es: 'Conectividad', val1: 'Dual USB-C, Bluetooth, Wi-Fi, Ethernet', val2: '2x USB-C, 2x HDMI in, HDMI thru, aux in', val1_es: 'Doble USB-C, Bluetooth, Wi-Fi, Ethernet', val2_es: '2x USB-C, 2x HDMI in, HDMI thru, entrada aux' },
      { label: 'Recording', label_es: 'Grabación', val1: 'Multitrack/stereo to microSD, USB or computer', val2: 'Not published — via USB to computer', val1_es: 'Multitrack/estéreo a microSD, USB u ordenador', val2_es: 'No publicado — por USB al ordenador' }
    ]
  },
  aboutName: 'Streaming Mixers & Controllers',
  verdictSideBySide: true,
  datePublished: '2026-10-13'
};

d.push(guide);
fs.writeFileSync(BASE + 'data/guides.json', JSON.stringify(d, null, 2));
console.log('Guide added. Total guides: ' + d.length);
if (fails.length) { console.log('FAIL:\n' + fails.join('\n')); process.exit(1); }
console.log('DONE');
