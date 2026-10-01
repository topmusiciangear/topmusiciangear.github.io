// fx-plugins: REBUILD - focus on CREATIVE sound design effects only
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const V = (value, value_es) => ({ value, value_es });
const W = (t) => ({ title: t, title_es: t });

const g = G.find(x => x.id === 'fx-plugins');

// Creative effects that exist in catalog
const products = [
  'Soundtoys 5.5 Bundle',      // 32 - multi-fx creative suite
  'Eventide Blackhole',        // 238 - massive creative reverb
  'Cableguys ShaperBox 3',     // 374 - rhythmic modulation suite
  'XLN Audio RC-20 Retro Color', // 375 - lo-fi creative color
  'Cableguys HalfTime',        // 376 - creative half-speed/timestretch
  'Baby Audio Transit 2',      // 377 - creative delay/modulation
  'Devious Machines Infiltrator 2', // 380 - glitch sequencer
  'iZotope Trash',             // 386 - creative distortion
  'Excite Audio Lifeline Expanse',  // 387 - creative spatial
  'Excite Audio Motion: Harmonic',  // 394 - creative harmonic modulation
  'Arturia Chorus JUN-6',      // 390 - creative chorus
  'D16 Group Repeater Delay',  // 392 - creative delay
  'Baby Audio Smooth Operator Pro'  // 472 - spectral resonance suppression
];
g.productTable.columns = products.map(W);

// Creative-focused spec rows
const rows = [
  { label: 'Category', values: [
    V('Multi-fx Creative Suite', 'Suite multi-fx creativa'),
    V('Creative Reverb', 'Reverb creativo'),
    V('Rhythmic Modulation Suite', 'Suite modulación rítmica'),
    V('Lo-Fi Color / Degradation', 'Color Lo-Fi / Degradación'),
    V('Time-Stretch / Half-Speed', 'Time-Stretch / Half-Speed'),
    V('Creative Delay / Modulation', 'Delay creativo / Modulación'),
    V('Glitch Sequencer / Multi-FX', 'Secuenciador Glitch / Multi-FX'),
    V('Creative Distortion', 'Distorsión creativa'),
    V('Creative Spatial / Reverb', 'Espacial creativo / Reverb'),
    V('Harmonic Modulation', 'Modulación armónica'),
    V('Creative Chorus', 'Chorus creativo'),
    V('Creative Delay', 'Delay creativo'),
    V('Spectral Resonance Control', 'Control resonancia espectral')
  ]},
  { label: 'Best For', values: [
    V('All-in-one creative sound design', 'Diseño sonoro creativo todo en uno'),
    V('Massive impossible spaces, ambient', 'Espacios imposibles masivos, ambient'),
    V('Rhythmic gating, sidechain, stutter, tape stop', 'Gating rítmico, sidechain, stutter, tape stop'),
    V('Instant vintage lo-fi vibe, character', 'Vibe vintage lo-fi instantánea, carácter'),
    V('Half-speed effects, slow-mo textures', 'Efectos half-speed, texturas slow-mo'),
    V('Complex modulated delays, rhythmic echoes', 'Delays modulados complejos, ecos rítmicos'),
    V('Glitch, IDM, micro-rhythms, chaos', 'Glitch, IDM, micro-ritmos, caos'),
    V('Multiband distortion, tone destruction', 'Distorsión multibanda, destrucción tonal'),
    V('Evolving spatial textures, cinematic', 'Texturas espaciales evolutivas, cinematográficas'),
    V('Harmonic animation, spectral movement', 'Animación armónica, movimiento espectral'),
    V('Lush chorus, Juno-style width', 'Chorus exuberante, ancho estilo Juno'),
    V('Complex delay patterns, rhythmic echoes', 'Patrones delay complejos, ecos rítmicos'),
    V('Auto-suppress harsh resonances, clarity', 'Auto-suprimir resonancias duras, claridad')
  ]},
  { label: 'Format', values: products.map(() => V('VST/AU/AAX', 'VST/AU/AAX')) },
  { label: 'Price', values: [
    V('$499', '$499'),
    V('$199', '$199'),
    V('$299', '$299'),
    V('$99', '$99'),
    V('$99', '$99'),
    V('$99', '$99'),
    V('$199', '$199'),
    V('$99', '$99'),
    V('$149', '$149'),
    V('$149', '$149'),
    V('$99', '$99'),
    V('$99', '$99'),
    V('$99', '$99')
  ]},
  { label: 'Key Feature', values: [
    V('21 effects, modulation matrix, Effect Rack', '21 efectos, matriz modulación, Effect Rack'),
    V('Gravity reversal, 500+ presets, Ribbon ctrl', 'Inversión Gravity, 500+ presets, control Ribbon'),
    V('9 modulation bands, drawable curves, MIDI', '9 bandas modulación, curvas dibujables, MIDI'),
    V('6 modules: wobble, drop, noise, space, etc', '6 módulos: wobble, drop, noise, space, etc'),
    V('Half-speed, quarter-speed, tape stop', 'Half-speed, quarter-speed, tape stop'),
    V('Dual engines, groove, modulation, freeze', 'Dual engines, groove, modulación, freeze'),
    V('28 modules, step sequencer, macro knobs', '28 módulos, secuenciador pasos, macros'),
    V('Multiband, 6 models, convolution, envelopes', 'Multibanda, 6 modelos, convolución, envolventes'),
    V('3 engines, shimmer, swarm, reflect', '3 motores, shimmer, swarm, reflect'),
    V('Harmonic/inharmonic, flux, drift, warp', 'Armónico/inharmónico, flux, drift, warp'),
    V('Authentic Juno-106 chorus, stereo width', 'Chorus Juno-106 auténtico, ancho estéreo'),
    V('Multi-tap, diffusion, modulation, ping-pong', 'Multi-tap, difusión, modulación, ping-pong'),
    V('Auto-detect resonances, spectral smoothing', 'Auto-detectar resonancias, suavizado espectral')
  ]}
];
g.productTable.rows = rows;

// Verdicts for all 13 creative products
const VD = (name, pros, cons, pros_es, cons_es) => ({ name, name_es: name, pros, cons, pros_es, cons_es });
g.verdictProsCons = [
  VD('Soundtoys 5.5 Bundle',
    ['21 creative effects in one rack', 'Effect Rack for parallel chains', 'Rhythm-sync modulation on everything', 'Industry standard for creative producers'],
    ['Expensive upfront', 'No individual purchases', 'CPU heavy with multiple instances', 'Deep learning curve'],
    ['21 efectos creativos en un rack', 'Effect Rack para cadenas paralelas', 'Modulación sync-rítmica en todo', 'Estándar para productores creativos'],
    ['Costoso pago inicial', 'No venta individual', 'CPU pesado con múltiples instancias', 'Curva aprendizaje profunda']),
  VD('Eventide Blackhole',
    ['Unique massive spaces impossible in hardware', 'Gravity modulation reverses decay', '500+ presets, Ribbon for live play', 'Secret weapon for ambient/cinematic'],
    ['Niche — not for realistic rooms', 'No early reflections control', 'Can overwhelm dense mixes', 'VST2/AU/AAX only (no VST3/CLAP)'],
    ['Espacios masivos únicos imposibles en hardware', 'Modulación Gravity invierte decaimiento', '500+ presets, Ribbon para directo', 'Arma secreta para ambient/cinematográfico'],
    ['Nicho — no para salas realistas', 'Sin control reflexiones tempranas', 'Puede abrumar mezclas densas', 'Solo VST2/AU/AAX (sin VST3/CLAP)']),
  VD('Cableguys ShaperBox 3',
    ['9 bands of drawable rhythmic modulation', 'Volume/Filter/Pan/Width/Time/Flanger/Drive', 'MIDI trigger + cable for sidechain', 'Ultimate creative gating/stutter tool'],
    ['No VST3/CLAP yet', 'Can be overwhelming at first', 'No preset sharing across DAWs', 'Requires rhythmic thinking'],
    ['9 bandas modulación rítmica dibujables', 'Volumen/Filtro/Pan/Ancho/Tiempo/Flanger/Drive', 'Trigger MIDI + cable para sidechain', 'Herramienta creativa gating/stutter definitiva'],
    ['Sin VST3/CLAP aún', 'Puede abrumar al principio', 'Sin compartir presets entre DAWs', 'Requiere pensamiento rítmico']),
  VD('XLN Audio RC-20 Retro Color',
    ['6 modules: wobble, drop, noise, space, magnetic, digital', 'Instant lo-fi character on anything', 'Simple UI, immediate results', 'Great on drums, synths, vocals'],
    ['Limited deep editing per module', 'Can sound "samey" if overused', 'No VST3/CLAP', 'Not for subtle enhancement'],
    ['6 módulos: wobble, drop, noise, space, magnetic, digital', 'Carácter lo-fi instantáneo en cualquier cosa', 'UI simple, resultados inmediatos', 'Genial en bateria, sintes, voces'],
    ['Edición profunda limitada por módulo', 'Puede sonar "igual" si se abusa', 'Sin VST3/CLAP', 'No para realce sutil']),
  VD('Cableguys HalfTime',
    ['Half-speed, quarter-speed, tape stop modes', 'Pitch-formant separation sounds natural', 'MIDI trigger for live performance', 'Instant slow-mo texture generator'],
    ['Single-purpose (but does it perfectly)', 'No VST3/CLAP', 'Limited parameters', 'Can sound gimmicky if overused'],
    ['Modos half-speed, quarter-speed, tape stop', 'Separación pitch-formante suena natural', 'Trigger MIDI para directo', 'Generador texturas slow-mo instantáneo'],
    ['Propósito único (pero lo hace perfecto)', 'Sin VST3/CLAP', 'Parámetros limitados', 'Puede sonar truco si se abusa']),
  VD('Baby Audio Transit 2',
    ['Dual delay engines with groove & modulation', 'Freeze button for infinite textures', 'Macro knobs for quick morphing', 'Super fun for sound design'],
    ['Can get chaotic fast', 'No VST3/CLAP', 'Preset browser could be better', 'Not for bread-and-butter delays'],
    ['Dual engines delay con groove y modulación', 'Botón Freeze para texturas infinitas', 'Macros para morphing rápido', 'Súper divertido para diseño sonoro'],
    ['Puede volverse caótico rápido', 'Sin VST3/CLAP', 'Navegador presets mejorable', 'No para delays pan-comidos']),
  VD('Devious Machines Infiltrator 2',
    ['28 effects modules in step sequencer', 'Probability per step = controlled chaos', 'Macro knobs for live performance', 'Turns loops into IDM/glitch instantly'],
    ['Steep learning curve', 'No VST3/CLAP', 'Can destroy audio if not careful', 'Niche workflow'],
    ['28 módulos efectos en secuenciador pasos', 'Probabilidad por paso = caos controlado', 'Macros para actuación en vivo', 'Convierte loops en IDM/glitch al instante'],
    ['Curva aprendizaje pronunciada', 'Sin VST3/CLAP', 'Puede destruir audio si no cuidas', 'Flujo trabajo nicho']),
  VD('iZotope Trash',
    ['Multiband distortion with 60+ models', 'Convolution + envelopes + modulation', 'Spectral display with real-time control', 'From subtle warmth to total destruction'],
    ['iZotope license system (Product Portal)', 'CPU heavy with all bands active', 'Overkill for simple saturation', 'Subscription model for updates'],
    ['Distorsión multibanda con 60+ modelos', 'Convolución + envolventes + modulación', 'Display espectral con control tiempo real', 'Desde calidez sutil a destrucción total'],
    ['Sistema licencias iZotope (Product Portal)', 'CPU pesado con todas bandas activas', 'Excesivo para saturación simple', 'Modelo suscripción actualizaciones']),
  VD('Excite Audio Lifeline Expanse',
    ['3 engines: shimmer, swarm, reflect', 'Evolving spatial textures', 'Modulation on every parameter', 'Cinematic sound design powerhouse'],
    ['Niche — not a bread-and-butter verb', 'High CPU', 'No VST3/CLAP', 'Can be hard to tame in mix'],
    ['3 motores: shimmer, swarm, reflect', 'Texturas espaciales evolutivas', 'Modulación en cada parámetro', 'Potencia diseño sonoro cinematográfico'],
    ['Nicho — no es reverb pan-comido', 'CPU alto', 'Sin VST3/CLAP', 'Puede ser difícil domar en mezcla']),
  VD('Excite Audio Motion: Harmonic',
    ['Harmonic/inharmonic spectral processing', 'Flux, drift, warp modulation modes', 'Creates movement from static sounds', 'Unique spectral animation tool'],
    ['Very niche use case', 'High CPU', 'No VST3/CLAP', 'Steep learning curve'],
    ['Procesamiento espectral armónico/inharmónico', 'Modos modulación flux, drift, warp', 'Crea movimiento desde sonidos estáticos', 'Herramienta única animación espectral'],
    ['Caso uso muy nicho', 'CPU alto', 'Sin VST3/CLAP', 'Curva aprendizaje pronunciada']),
  VD('Arturia Chorus JUN-6',
    ['Authentic Juno-106 chorus circuit modeling', 'Simple 2-button UI (I/II modes)', 'Instant stereo width and movement', 'Incredible value at $99'],
    ['Only chorus — no other FX', 'No depth/rate controls (fixed)', 'No VST3/CLAP', 'Mono in / stereo out only'],
    ['Modelado circuito chorus Juno-106 auténtico', 'UI simple 2 botones (modos I/II)', 'Ancho estéreo y movimiento instantáneo', 'Valor increíble a $99'],
    ['Solo chorus — sin otros FX', 'Sin controles depth/rate (fijos)', 'Sin VST3/CLAP', 'Solo mono in / stereo out']),
  VD('D16 Group Repeater Delay',
    ['23 delay models: tape, BBD, digital, diffusion', 'Multi-tap with ping-pong, stereo spread', 'Modulation section per tap', 'Great for dub, ambient, rhythmic echoes'],
    ['UI feels dated', 'No VST3/CLAP', 'Can be CPU heavy', 'Overwhelming parameter count'],
    ['23 modelos delay: tape, BBD, digital, difusión', 'Multi-tap con ping-pong, spread estéreo', 'Sección modulación por tap', 'Genial para dub, ambient, ecos rítmicos'],
    ['UI se siente antigua', 'Sin VST3/CLAP', 'Puede ser CPU pesado', 'Cantidad parámetros abrumadora']),
  VD('Baby Audio Smooth Operator Pro',
    ['Auto-detects & suppresses harsh resonances', 'Spectral smoothing without dulling', 'Sidechain input for dynamic control', 'Saves hours of surgical EQ work'],
    ['Not a creative effect per se', 'Can remove "character" if overdone', 'No VST3/CLAP', 'Pro version needed for full features'],
    ['Auto-detecta y suprime resonancias duras', 'Suavizado espectral sin apagar', 'Entrada sidechain para control dinámico', 'Ahorra horas de EQ quirúrgico'],
    ['No es efecto creativo per se', 'Puede quitar "carácter" si se abusa', 'Sin VST3/CLAP', 'Versión Pro necesaria para features completas'])
];

fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
console.log('fx-plugins REBUILT: cols=' + g.productTable.columns.length + ' rows=' + g.productTable.rows.length + ' verdict=' + g.verdictProsCons.length);
console.log('Products:', g.productTable.columns.map(c => c.title).join(', '));