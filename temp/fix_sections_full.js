// Update fx-plugins sections with full content
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

const g = G.find(x => x.id === 'fx-plugins');

g.sections = [
  {
    heading: 'Creative Effects: Choosing Tools That Inspire',
    heading_es: 'Efectos creativos: cómo elegir herramientas que inspiran',
    content: '<p><strong>Creative effects plugins are the difference between a mix that works and a mix that has a personality.</strong> Reverbs, delays, and modulation turn a dry recording into a performance that pulls the listener in.</p><p><strong>Start with a reverb that does several rooms well.</strong> You need convincing halls, plates, and rooms for realism, plus a creative mode for washes and pads. One versatile reverb with tweakable early reflections covers more ground than three one-trick reverbs.</p><p><strong>Delay is a timing instrument, not just an echo.</strong> Sync to your session tempo, add filtered and dotted patterns, and use short slapback for width. A delay with tap tempo and a tone control handles nearly every delay idea you will have.</p><p><strong>Modulation adds motion that keeps mixes alive.</strong> Chorus, flanger, phaser, and tremolo each bring a different texture. Most producers need two or three of these, not one of everything — choose the ones that fit the music you make.</p><p><strong>Experiment, but keep a reset button.</strong> Creative plugins reward pushing parameters past sensible values. A plugin with an easy default state and visible controls lets you get wild and come back to a known-good sound without losing the session.',
    content_es: '<p><strong>Los plugins de efectos creativos son la diferencia entre una mezcla que funciona y una que tiene personalidad.</strong> Las reverberaciones, delays y modulaciones convierten una grabación seca en una interpretación que atrae al oyente.</p><p><strong>Empieza con una reverberación que haga bien varias salas.</strong> Necesitas salas, placas y ambientes convincentes para realismo, además de un modo creativo para lavados y pads. Una reverberación versátil con primeros reflejos ajustables rinde más que tres reverberaciones de una sola idea.</p><p><strong>El delay es un instrumento rítmico, no sólo un eco.</strong> Sincroniza con el tempo de tu sesión, añade patrones filtrados y con puntillo, y usa slapback corto para ganar anchura. Un delay con tap tempo y control de tono maneja casi todas las ideas de delay que tendrás.</p><p><strong>La modulación añade movimiento que mantiene vivas las mezclas.</strong> El chorus, flanger, phaser y trémolo aportan cada uno una textura diferente. La mayoría de los productores necesitan dos o tres de estos, no uno de cada — elige los que se ajusten a la música que haces.</p><p><strong>Experimenta, pero conserva un botón de reinicio.</strong> Los plugins creativos se benefician de llevar los parámetros más allá de valores sensatos. Un plugin con un estado por defecto fácil y controles visibles te permite volverte loco y regresar a un sonido conocido sin perder la sesión.',
    products: []
  },
  {
    heading: 'Is the Soundtoys 5.5 Bundle the Most Creative Effects Collection?',
    heading_es: '¿Es el Soundtoys 5.5 Bundle la colección de efectos más creativa?',
    content: '<strong>Soundtoys is where you go when you want to break the rules and add character that nothing else can replicate. </strong>Decapitator is my secret weapon for adding analog warmth, grit, and harmonic saturation to anything — vocals that need attitude, drums that need punch, bass that needs to cut through, or the entire mix bus for that gluey analog vibe. The five saturation models emulate everything from classic American console transformers to British channel strip overdrive. EchoBoy is the most musical delay plugin ever made, hands down: it models twenty delay types from pristine digital delays to warped and warbling tape echoes, vintage analog bucket-brigade delays, and multi-head tape slap. Little AlterBoy transforms vocals instantly with formant shifting and pitch manipulation — great for creative effects, harmonies, and that \'robot voice\' that sounds musical. The new SuperPlate reverb models vintage plate reverbs with stunning realism, and SpaceBlender adds modern spatial effects that sit beautifully in a dense mix. Effect Rack lets you chain any five of these effects together in one plugin instance. For twenty-three effects, it\'s the most creative, most inspiring bundle in the entire plugin world. Something from Soundtoys appears on virtually every mix.',
    content_es: '<strong>Soundtoys es a lo que recurres cuando quieres romper las reglas y añadir carácter que nada más puede replicar. </strong>Decapitator es mi arma secreta para añadir calidez analógica, textura y saturación armónica a cualquier cosa — voces que necesitan actitud, batería que necesita pegada, bajo que necesita destacar, o el bus de mezcla completo para esa vibra analógica cohesiva. Los cinco modelos de saturación emulan desde transformadores de consola americana clásica hasta overdrive de channel strip británico. EchoBoy es el plugin de delay más musical jamás creado, sin discusión: modela veinte tipos de delay desde delays digitales impecables hasta ecos de cinta deformados y vacilantes, delays analógicos vintage de tipo bucket-brigade, y slap de cinta multi-cabezal. Little AlterBoy transforma voces instantáneamente con desplazamiento de formantes y manipulación de tono — genial para efectos creativos, armonías y esa \'voz robot\' que suena musical. El nuevo reverb SuperPlate modela reverberaciones de placa vintage con un buen realismo, y SpaceBlender añade efectos espaciales modernos que se asientan de forma natural en una mezcla densa. Effect Rack te permite encadenar hasta cinco de estos efectos juntos en una sola instancia de plugin. Por veintitrés efectos, es el bundle más creativo e inspirador del mundo de los plugins. Uso algo de Soundtoys en literalmente cada mezcla.',
    products: [32]
  },
  {
    heading: 'Is the Eventide Blackhole the Best Creative Reverb Plugin for Music Production?',
    heading_es: '¿Es el Eventide Blackhole el mejor plugin de reverb creativo para producción musical?',
    content: '<strong>Eventide Blackhole is the single most creative reverb plugin ever made, and it is available right now on Plugin Boutique. </strong>Born from Eventide rackmounts like the DSP4000 and H8000FW and distilled through the well-regarded Space pedal into a native plugin, Blackhole does what no other reverb can: it creates virtual spaces that could never exist in reality. Producer after producer calls it their secret weapon, and it shows up on many hit records from ambient, cinematic, electronic, and pop genres. The famous Gravity control reverses arrow of time by inverting the decay — a one-knob creative effect you cannot get anywhere else. The massive, ever-shifting tails are perfect for guitars, strings, pads and vocals, while a Freeze mode lets you drone endlessly. It comes with over 50 presets made by Eventide artists, full NKS support, and a latency-free workflow. If you want a reverb that becomes an instrument, Blackhole is it.',
    content_es: '<strong>Eventide Blackhole es el plugin de reverb más creativo jamás creado, y está disponible en Plugin Boutique. </strong>Nacido del hardware de rack de Eventide como el DSP4000 y el H8000FW y del legendario pedal Space convertido en plugin nativo, Blackhole hace lo que ninguna otra reverb puede: crear mundos que no podrían existir en la realidad. Productores de varios géneros lo consideran su arma secreta, y aparece en un millón de discos de ambient, cine y pop. El famoso control Gravity invierte la caída de la reverb, como si el tiempo corriera hacia atrás — un efecto creativo de una sola perilla que no puedes conseguir en ningún otro lugar. Las colas masivas y en constante cambio son perfectas para guitarras, cuerdas, pads y voces, y un modo Freeze te permite congelar sonidos. Incluye más de 50 presets creados por artistas de Eventide, compatibilidad NKS y un proceso sencillo. Cuando la reverb es el instrumento, Blackhole lo es todo.',
    products: [238]
  },
  {
    heading: 'Cableguys ShaperBox 3: The Ultimate Rhythmic Modulation Suite',
    heading_es: 'Cableguys ShaperBox 3: La suite definitiva de modulación rítmica',
    content: '<strong>ShaperBox 3 is the Swiss Army knife of rhythmic modulation.</strong> Nine independent bands let you draw custom curves for Volume, Filter, Pan, Width, Time, Flanger, and Drive — all sync\'d to your DAW tempo. The Cable feature lets you route any band\'s modulation to another band\'s parameters for wild cross-modulation. MIDI trigger mode turns it into a performance instrument. For electronic, trap, and hip-hop producers, this is the #1 tool for sidechain, stutters, tape stops, and rhythmic gating.',
    content_es: '<strong>ShaperBox 3 es la navaja suiza de la modulación rítmica.</strong> Nueve bandas independientes te permiten dibujar curvas personalizadas para Volumen, Filtro, Pan, Ancho, Tiempo, Flanger y Drive — todas sincronizadas con el tempo de tu DAW. La función Cable permite rutar la modulación de cualquier banda a los parámetros de otra para cross-modulación salvaje. El modo trigger MIDI lo convierte en un instrumento de actuación. Para productores de electrónica, trap e hip-hop, es la herramienta #1 para sidechain, stutters, tape stops y gating rítmico.',
    products: [374]
  },
  {
    heading: 'XLN Audio RC-20 Retro Color: Instant Lo-Fi Character',
    heading_es: 'XLN Audio RC-20 Retro Color: Carácter Lo-Fi instantáneo',
    content: '<strong>RC-20 Retro Color gives you instant vintage vibe in six modules.</strong> Wobble adds pitch drift and instability. Drop simulates vinyl dropouts. Noise adds vinyl crackle, tape hiss, and digital artifacts. Space adds reverb and dimension. Magnetic adds saturation and compression. Digital adds bit-crushing and sample rate reduction. Each module has a simple mix knob — turn it up for character, down for clean. Incredible value at $99.',
    content_es: '<strong>RC-20 Retro Color te da vibe vintage instantáneo en seis módulos.</strong> Wobble añade deriva de pitch e inestabilidad. Drop simula saltos de vinilo. Noise añade crepitus de vinilo, hiss de cinta y artefactos digitales. Space añade reverb y dimensión. Magnetic añade saturación y compresión. Digital añade bit-crushing y reducción de sample rate. Cada módulo tiene un simple knob de mix — súbelo para carácter, bájalo para limpio. Valor increíble a $99.',
    products: [375]
  },
  {
    heading: 'Cableguys HalfTime: Half-Speed and Tape Stop Effects',
    heading_es: 'Cableguys HalfTime: Efectos half-speed y tape stop',
    content: '<strong>HalfTime does one thing perfectly: half-speed and quarter-speed effects with natural pitch/formant separation.</strong> Three modes: Half-Speed (classic slowed-down vibe), Quarter-Speed (extreme slow-mo), and Tape Stop (authentic tape slow-down with pitch drop). MIDI trigger lets you fire effects live. The pitch/formant separation means vocals and instruments stay recognizable, not chipmunked. Essential for trap, hip-hop, and electronic transitions.',
    content_es: '<strong>HalfTime hace una cosa perfecta: efectos half-speed y quarter-speed con separación natural de pitch/formante.</strong> Tres modos: Half-Speed (vibe clásico ralentizado), Quarter-Speed (slow-mo extremo), y Tape Stop (ralentizado de cinta auténtico con caída de pitch). Trigger MIDI para disparar efectos en vivo. La separación pitch/formante mantiene voces e instrumentos reconocibles, no con voz de ardilla. Esencial para transiciones de trap, hip-hop y electrónica.',
    products: [376]
  },
  {
    heading: 'Baby Audio Transit 2: Dual-Engine Creative Delay',
    heading_es: 'Baby Audio Transit 2: Delay creativo de doble motor',
    content: '<strong>Transit 2 is a creative delay playground with two independent engines.</strong> Each engine has Groove (rhythmic feel), Modulation (chorus/flanger/phaser), and a Freeze button for infinite textures. The Macro knobs let you morph between snapshots in real time. Great for dub delays, rhythmic echoes, and sound design. The visual feedback shows exactly what each engine is doing.',
    content_es: '<strong>Transit 2 es un patio de juegos de delay creativo con dos motores independientes.</strong> Cada motor tiene Groove (sentido rítmico), Modulación (chorus/flanger/phaser) y un botón Freeze para texturas infinitas. Los Macros te permiten morphear entre snapshots en tiempo real. Genial para dub delays, ecos rítmicos y diseño sonoro. El feedback visual muestra exactamente qué hace cada motor.',
    products: [377]
  },
  {
    heading: 'Devious Machines Infiltrator 2: The Glitch Sequencer',
    heading_es: 'Devious Machines Infiltrator 2: El secuenciador glitch',
    content: '<strong>Infiltrator 2 turns any loop into IDM/glitch chaos with a step sequencer controlling 28 effect modules.</strong> Each step can have different probability, creating controlled randomness. Modules include filters, pitch shifters, reverses, delays, stutters, and more. Macro knobs let you perform live. The ultimate tool for turning boring loops into micro-rhythmic masterpieces.',
    content_es: '<strong>Infiltrator 2 convierte cualquier loop en caos IDM/glitch con un secuenciador de pasos controlando 28 módulos de efectos.</strong> Cada paso puede tener probabilidad diferente, creando aleatoriedad controlada. Módulos incluyen filtros, pitch shifters, reversas, delays, stutters, y más. Macros para actuación en vivo. La herramienta definitiva para convertir loops aburridos en obras maestras micro-rítmicas.',
    products: [380]
  },
  {
    heading: 'iZotope Trash: Multiband Distortion Powerhouse',
    heading_es: 'iZotope Trash: Potencia de distorsión multibanda',
    content: '<strong>Trash is the most comprehensive distortion plugin on the market.</strong> Up to 4 bands with 60+ distortion models (tube, tape, fuzz, bit-crush, wave-shape, and more). Each band has its own envelope follower, convolution, and modulation. The spectral display shows exactly what you\'re destroying. From subtle tube warmth to total sonic annihilation — and everything in between.',
    content_es: '<strong>Trash es el plugin de distorsión más completo del mercado.</strong> Hasta 4 bandas con 60+ modelos de distorsión (tubo, cinta, fuzz, bit-crush, wave-shaping, y más). Cada banda tiene su propio envelope follower, convolución y modulación. El display espectral muestra exactamente qué estás destruyendo. Desde calidez de tubo sutil hasta aniquilación sónica total — y todo lo intermedio.',
    products: [386]
  },
  {
    heading: 'Excite Audio Lifeline Expanse: Evolving Spatial Textures',
    heading_es: 'Excite Audio Lifeline Expanse: Texturas espaciales evolutivas',
    content: '<strong>Lifeline Expanse creates cinematic spatial textures with three engines.</strong> Shimmer adds pitch-shifted reflections. Swarm creates dense, evolving clouds. Reflect adds realistic early reflections and tails. Every parameter can be modulated. Designed for ambient, cinematic, and post-production sound design where space is an instrument.',
    content_es: '<strong>Lifeline Expanse crea texturas espaciales cinematográficas con tres motores.</strong> Shimmer añade reflexiones con pitch-shift. Swarm crea nubes densas y evolutivas. Reflect añade reflexiones tempranas y colas realistas. Cada parámetro puede modularse. Diseñado para ambient, cine y post-producción donde el espacio es un instrumento.',
    products: [387]
  },
  {
    heading: 'Excite Audio Motion: Harmonic Spectral Animation',
    heading_es: 'Excite Audio Motion: Animación espectral armónica',
    content: '<strong>Motion animates the harmonic content of any sound.</strong> It separates harmonic and inharmonic components, then applies Flux (organic drift), Drift (slow modulation), and Warp (aggressive transformation) modes. Creates movement from static pads, adds life to synths, and generates evolving textures from simple tones. Unique spectral tool for sound designers.',
    content_es: '<strong>Motion anima el contenido armónico de cualquier sonido.</strong> Separa componentes armónicos e inarmónicos, luego aplica modos Flux (deriva orgánica), Drift (modulación lenta) y Warp (transformación agresiva). Crea movimiento desde pads estáticos, da vida a sintes, y genera texturas evolutivas desde tonos simples. Herramienta espectral única para diseñadores sonoros.',
    products: [394]
  },
  {
    heading: 'Arturia Chorus JUN-6: Authentic Juno Chorus',
    heading_es: 'Arturia Chorus JUN-6: Chorus Juno auténtico',
    content: '<strong>The JUN-6 models the legendary Roland Juno-106 chorus circuit.</strong> Two modes: I (slow, subtle) and II (faster, wider). That\'s it — no depth, no rate, no mix. Just authentic Juno chorus that instantly widens anything. Incredible value at $99. Mono in, stereo out. Does one thing perfectly.',
    content_es: '<strong>El JUN-6 modela el legendario circuito chorus del Roland Juno-106.</strong> Dos modos: I (lento, sutil) y II (más rápido, ancho). Eso es todo — sin depth, sin rate, sin mix. Solo chorus Juno auténtico que ensancha al instante. Valor increíble a $99. Entrada mono, salida stereo. Hace una cosa perfecta.',
    products: [390]
  },
  {
    heading: 'D16 Group Repeater Delay: 23 Models of Delay',
    heading_es: 'D16 Group Repeater Delay: 23 modelos de delay',
    content: '<strong>Repeater Delay covers the entire history of delay in one plugin.</strong> 23 models: tape echoes (Space Echo, Echoplex), BBD analogs (Memory Man, DM-2), digital classics (2290, PCM42), and diffusion/reverb modes. Multi-tap with independent ping-pong, stereo spread, and modulation per tap. Sync to tempo or free time. The dub producer\'s dream delay.',
    content_es: '<strong>Repeater Delay cubre toda la historia del delay en un plugin.</strong> 23 modelos: tape echoes (Space Echo, Echoplex), análogos BBD (Memory Man, DM-2), digitales clásicos (2290, PCM42), y modos difusión/reverb. Multi-tap con ping-pong independiente, spread estéreo y modulación por tap. Sync a tempo o tiempo libre. El delay soñado para productores de dub.',
    products: [392]
  },
  {
    heading: 'Baby Audio Smooth Operator Pro: Spectral Resonance Control',
    heading_es: 'Baby Audio Smooth Operator Pro: Control resonancia espectral',
    content: '<strong>Smooth Operator Pro auto-detects and suppresses harsh resonances in real time.</strong> The spectral display shows problem frequencies; the algorithm smooths them without dulling the source. Sidechain input lets you duck resonances only when another signal plays (e.g., vocals). Saves hours of surgical EQ work. Not a creative effect per se, but essential for clean mixes.',
    content_es: '<strong>Smooth Operator Pro auto-detecta y suprime resonancias duras en tiempo real.</strong> El display espectral muestra frecuencias problemáticas; el algoritmo las suaviza sin apagar la fuente. Entrada sidechain permite duckear resonancias solo cuando otra señal suena (ej. voces). Ahorra horas de trabajo de EQ quirúrgico. No es efecto creativo per se, pero esencial para mezclas limpias.',
    products: [472]
  }
];

fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
console.log('fx-plugins sections updated with full content');