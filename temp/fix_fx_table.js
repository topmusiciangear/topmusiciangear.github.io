// fx-plugins: improve productTable - remove Price row, add meaningful specs
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const V = (value, value_es) => ({ value, value_es });
const W = (t) => ({ title: t, title_es: t });

const g = G.find(x => x.id === 'fx-plugins');

// Replace rows with better specs for creative effects
const rows = [
  { label: 'Type', values: [
    V('Multi-FX Bundle (21 effects)', 'Bundle Multi-FX (21 efectos)'),
    V('Algorithmic Reverb', 'Reverb Algorítmico'),
    V('Rhythmic Modulation Suite', 'Suite Modulación Rítmica'),
    V('Lo-Fi / Character Processor', 'Procesador Lo-Fi / Carácter'),
    V('Time-Stretch / Pitch Effect', 'Time-Stretch / Efecto Pitch'),
    V('Dual-Engine Creative Delay', 'Delay Creativo Dual-Engine'),
    V('Step-Sequenced Multi-FX', 'Multi-FX Secuenciado por Pasos'),
    V('Multiband Distortion', 'Distorsión Multibanda'),
    V('Spatial / Reverb (3 engines)', 'Espacial / Reverb (3 motores)'),
    V('Harmonic Spectral Processor', 'Procesador Espectral Armónico'),
    V('Chorus (Juno-106 modeling)', 'Chorus (modelado Juno-106)'),
    V('Delay (23 models)', 'Delay (23 modelos)'),
    V('Spectral Resonance Suppressor', 'Supresor Resonancia Espectral')
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
  { label: 'Key Feature', values: [
    V('Effect Rack: chain 5 effects, modulation matrix', 'Effect Rack: encadena 5 efectos, matriz modulación'),
    V('Gravity knob reverses decay (time inversion)', 'Knob Gravity invierte decaimiento (inversión tiempo)'),
    V('9 drawable curves, Cable cross-modulation, MIDI', '9 curvas dibujables, Cable cross-modulación, MIDI'),
    V('6 modules: Wobble, Drop, Noise, Space, Magnetic, Digital', '6 módulos: Wobble, Drop, Noise, Space, Magnetic, Digital'),
    V('Pitch/formant separation = natural slow-down', 'Separación pitch/formante = slow-down natural'),
    V('Groove, Modulation, Freeze per engine, Macro morph', 'Groove, Modulación, Freeze por motor, Macro morph'),
    V('28 modules, probability per step, Macro knobs', '28 módulos, probabilidad por paso, Macro knobs'),
    V('60+ models, 4 bands, envelopes, convolution, spectral', '60+ modelos, 4 bandas, envolventes, convolución, espectral'),
    V('Shimmer/Swarm/Reflect engines, full modulation', 'Motores Shimmer/Swarm/Reflect, modulación total'),
    V('Harmonic/inharmonic split, Flux/Drift/Warp modes', 'Split armónico/inharmónico, modos Flux/Drift/Warp'),
    V('Authentic Juno-106 chorus circuit, 2 modes', 'Circuito chorus Juno-106 auténtico, 2 modos'),
    V('Tape/BBD/Digital/Diffusion, multi-tap, per-tap mod', 'Tape/BBD/Digital/Difusión, multi-tap, mod por tap'),
    V('Real-time resonance detection, spectral smoothing', 'Detección resonancias tiempo real, suavizado espectral')
  ]},
  { label: 'Modulation Depth', values: [
    V('Extensive (per-effect + rack macros)', 'Extensa (por efecto + macros rack)'),
    V('Deep (Gravity + LFOs + Ribbon)', 'Profunda (Gravity + LFOs + Ribbon)'),
    V('Extreme (9 bands × drawable curves)', 'Extrema (9 bandas × curvas dibujables)'),
    V('Moderate (per-module mix + rate)', 'Moderada (mix + rate por módulo)'),
    V('None (fixed effect)', 'Ninguna (efecto fijo)'),
    V('Deep (Groove + Mod + Macros per engine)', 'Profunda (Groove + Mod + Macros por motor)'),
    V('Extreme (probability + 28 modules + Macros)', 'Extrema (probabilidad + 28 módulos + Macros)'),
    V('Extensive (envelopes + LFOs + convolution)', 'Extensa (envolventes + LFOs + convolución)'),
    V('Full (every parameter modulatable)', 'Total (todo parámetro modulable)'),
    V('Extensive (Flux/Drift/Warp + LFOs)', 'Extensa (Flux/Drift/Warp + LFOs)'),
    V('None (fixed circuit behavior)', 'Ninguna (comportamiento circuito fijo)'),
    V('Deep (per-tap modulation + sync)', 'Profunda (modulación por tap + sync)'),
    V('None (automatic adaptive)', 'Ninguna (adaptativa automática)')
  ]},
  { label: 'Sound Design Potential', values: [
    V('Infinite (21 effects + rack chaining)', 'Infinita (21 efectos + encadenado rack)'),
    V('High (unique impossible spaces)', 'Alta (espacios imposibles únicos)'),
    V('Extreme (rhythmic sound mangling)', 'Extrema (destrucción sonora rítmica)'),
    V('High (instant character injection)', 'Alta (inyección carácter instantánea)'),
    V('Specialized (time-domain manipulation)', 'Especializada (manipulación dominio tiempo)'),
    V('High (delay as instrument)', 'Alta (delay como instrumento)'),
    V('Extreme (controlled chaos generator)', 'Extrema (generador caos controlado)'),
    V('Extreme (spectral destruction)', 'Extrema (destrucción espectral)'),
    V('High (cinematic space design)', 'Alta (diseño espacio cinematográfico)'),
    V('Specialized (harmonic animation)', 'Especializada (animación armónica)'),
    V('Focused (classic chorus color)', 'Enfocada (color chorus clásico)'),
    V('High (delay history in one box)', 'Alta (historia delay en una caja)'),
    V('Utility (cleanup, not creative)', 'Utilidad (limpieza, no creativa)')
  ]},
  { label: 'CPU Load', values: [
    V('High (multiple instances heavy)', 'Alta (múltiples instancias pesadas)'),
    V('Low-Moderate', 'Baja-Moderada'),
    V('Moderate-High (9 bands)', 'Moderada-Alta (9 bandas)'),
    V('Low', 'Baja'),
    V('Low', 'Baja'),
    V('Moderate', 'Moderada'),
    V('Moderate-High (28 modules)', 'Moderada-Alta (28 módulos)'),
    V('High (4 bands + spectral)', 'Alta (4 bandas + espectral)'),
    V('High (3 engines + modulation)', 'Alta (3 motores + modulación)'),
    V('Moderate', 'Moderada'),
    V('Low', 'Baja'),
    V('Moderate', 'Moderada'),
    V('Low-Moderate', 'Baja-Moderada')
  ]},
  { label: 'Formats', values: [
    V('VST2/VST3/AU/AAX/CLAP', 'VST2/VST3/AU/AAX/CLAP'),
    V('VST2/AU/AAX (no VST3/CLAP)', 'VST2/AU/AAX (sin VST3/CLAP)'),
    V('VST2/VST3/AU/AAX/CLAP', 'VST2/VST3/AU/AAX/CLAP'),
    V('VST2/VST3/AU/AAX/CLAP', 'VST2/VST3/AU/AAX/CLAP'),
    V('VST2/VST3/AU/AAX/CLAP', 'VST2/VST3/AU/AAX/CLAP'),
    V('VST2/VST3/AU/AAX/CLAP', 'VST2/VST3/AU/AAX/CLAP'),
    V('VST2/VST3/AU/AAX/CLAP', 'VST2/VST3/AU/AAX/CLAP'),
    V('VST2/VST3/AU/AAX', 'VST2/VST3/AU/AAX'),
    V('VST2/VST3/AU/AAX/CLAP', 'VST2/VST3/AU/AAX/CLAP'),
    V('VST2/VST3/AU/AAX/CLAP', 'VST2/VST3/AU/AAX/CLAP'),
    V('VST2/VST3/AU/AAX/CLAP', 'VST2/VST3/AU/AAX/CLAP'),
    V('VST2/VST3/AU/AAX/CLAP', 'VST2/VST3/AU/AAX/CLAP'),
    V('VST2/VST3/AU/AAX/CLAP', 'VST2/VST3/AU/AAX/CLAP')
  ]}
];
g.productTable.rows = rows;

fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
console.log('fx-plugins table updated: rows=' + g.productTable.rows.length);
console.log('Row labels:', g.productTable.rows.map(r => r.label).join(', '));