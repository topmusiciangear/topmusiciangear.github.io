// fx-plugins: apply all technical corrections from user
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const V = (value, value_es) => ({ value, value_es });
const W = (t) => ({ title: t, title_es: t });

const g = G.find(x => x.id === 'fx-plugins');

// 1. REMOVE Smooth Operator Pro (not creative), REPLACE with Baby Audio Spaced Out
const titles = g.productTable.columns.map(c => c.title);
const idxSmooth = titles.indexOf('Baby Audio Smooth Operator Pro');
if (idxSmooth > -1) {
  titles.splice(idxSmooth, 1);
}

// Add Baby Audio Spaced Out instead
if (!titles.includes('Baby Audio Spaced Out')) {
  titles.push('Baby Audio Spaced Out');
}

// Update columns
g.productTable.columns = titles.map(W);

// Update productTable rows - remove Smooth Operator column, add Spaced Out
const rows = g.productTable.rows;
const removeIdx = idxSmooth;

rows.forEach(row => {
  if (removeIdx > -1) row.values.splice(removeIdx, 1);
  // Add Spaced Out values at the end
  const spacedOutValues = {
    'Type': V('Delay / Reverb / Spatial', 'Delay / Reverb / Espacial'),
    'Best For': V('Futuristic spatial delay & reverb', 'Delay espacial y reverb futurista'),
    'Key Feature': V('8 delay modes, reverb, pitch, filter, freeze', '8 modos delay, reverb, pitch, filter, freeze'),
    'Modulation Depth': V('Deep (LFOs + envelopes + macros)', 'Profunda (LFOs + envolventes + macros)'),
    'Sound Design Potential': V('High (delay as spatial instrument)', 'Alta (delay como instrumento espacial)'),
    'CPU Load': V('Low-Moderate', 'Baja-Moderada'),
    'Formats': V('VST2/VST3/AU/AAX/CLAP', 'VST2/VST3/AU/AAX/CLAP')
  }[row.label];
  if (spacedOutValues) row.values.push(spacedOutValues);
});

// 2. Fix all verdicts - remove Smooth Operator, add Spaced Out, fix VST3/CLAP cons
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
    ['Can be overwhelming at first', 'No preset sharing across DAWs', 'Requires rhythmic thinking'],
    ['9 bandas modulación rítmica dibujables', 'Volumen/Filtro/Pan/Ancho/Tiempo/Flanger/Drive', 'Trigger MIDI + cable para sidechain', 'Herramienta creativa gating/stutter definitiva'],
    ['Puede abrumar al principio', 'Sin compartir presets entre DAWs', 'Requiere pensamiento rítmico']),
  VD('XLN Audio RC-20 Retro Color',
    ['6 modules: wobble, drop, noise, space, magnetic, digital', 'Instant lo-fi character on anything', 'Simple UI, immediate results', 'Great on drums, synths, vocals'],
    ['Limited deep editing per module', 'Can sound "samey" if overused', 'Not for subtle enhancement'],
    ['6 módulos: wobble, drop, noise, space, magnetic, digital', 'Carácter lo-fi instantáneo en cualquier cosa', 'UI simple, resultados inmediatos', 'Genial en bateria, sintes, voces'],
    ['Edición profunda limitada por módulo', 'Puede sonar "igual" si se abusa', 'No para realce sutil']),
  VD('Cableguys HalfTime',
    ['Half-speed, quarter-speed, tape stop modes', 'Pitch-formant separation sounds natural', 'MIDI trigger for live performance', 'Instant slow-mo texture generator'],
    ['Single-purpose (but does it perfectly)', 'Limited parameters', 'Can sound gimmicky if overused'],
    ['Modos half-speed, quarter-speed, tape stop', 'Separación pitch-formante suena natural', 'Trigger MIDI para directo', 'Generador texturas slow-mo instantáneo'],
    ['Propósito único (pero lo hace perfecto)', 'Parámetros limitados', 'Puede sonar truco si se abusa']),
  VD('Baby Audio Transit 2',
    ['Dual delay engines with groove & modulation', 'Freeze button for infinite textures', 'Macro knobs for quick morphing', 'Super fun for sound design'],
    ['Can get chaotic fast', 'Preset browser could be better', 'Not for bread-and-butter delays'],
    ['Dual engines delay con groove y modulación', 'Botón Freeze para texturas infinitas', 'Macros para morphing rápido', 'Súper divertido para diseño sonoro'],
    ['Puede volverse caótico rápido', 'Navegador presets mejorable', 'No para delays pan-comidos']),
  VD('Devious Machines Infiltrator 2',
    ['28 effects modules in step sequencer', 'Probability per step = controlled chaos', 'Macro knobs for live performance', 'Turns loops into IDM/glitch instantly'],
    ['Steep learning curve', 'Can destroy audio if not careful', 'Niche workflow'],
    ['28 módulos efectos en secuenciador pasos', 'Probabilidad por paso = caos controlado', 'Macros para actuación en vivo', 'Convierte loops en IDM/glitch al instante'],
    ['Curva aprendizaje pronunciada', 'Puede destruir audio si no cuidas', 'Flujo trabajo nicho']),
  VD('iZotope Trash',
    ['Multiband distortion with 60+ models', 'Convolution + envelopes + modulation', 'Spectral display with real-time control', 'From subtle warmth to total destruction'],
    ['iZotope Product Portal license system', 'CPU heavy with all bands active', 'Overkill for simple saturation'],
    ['Distorsión multibanda con 60+ modelos', 'Convolución + envolventes + modulación', 'Display espectral con control tiempo real', 'Desde calidez sutil a destrucción total'],
    ['Sistema licencias iZotope (Product Portal)', 'CPU pesado con todas bandas activas', 'Excesivo para saturación simple']),
  VD('Excite Audio Lifeline Expanse',
    ['5 modules: Format, Dirt, Reave, Width, Space', 'Evolving spatial textures, cinematic', 'Modulation on every parameter', 'Cinematic sound design powerhouse'],
    ['Niche — not a bread-and-butter verb', 'High CPU', 'Can be hard to tame in mix'],
    ['5 módulos: Format, Dirt, Reave, Width, Space', 'Texturas espaciales evolutivas, cinematográficas', 'Modulación en cada parámetro', 'Potencia diseño sonoro cinematográfico'],
    ['Nicho — no es reverb pan-comido', 'CPU alto', 'Puede ser difícil domar en mezcla']),
  VD('Excite Audio Motion: Harmonic',
    ['Harmonic/inharmonic spectral processing', 'Flux, drift, warp modulation modes', 'Creates movement from static sounds', 'Unique spectral animation tool'],
    ['Very niche use case', 'High CPU', 'Steep learning curve'],
    ['Procesamiento espectral armónico/inharmónico', 'Modos modulación flux, drift, warp', 'Crea movimiento desde sonidos estáticos', 'Herramienta única animación espectral'],
    ['Caso uso muy nicho', 'CPU alto', 'Curva aprendizaje pronunciada']),
  VD('Arturia Chorus JUN-6',
    ['Authentic Juno-106 chorus circuit modeling', 'Includes Mix & Depth controls (expanded from hardware)', 'Instant stereo width and movement', 'Incredible value at $49'],
    ['Only chorus — no other FX', 'Mono in / stereo out only'],
    ['Modelado circuito chorus Juno-106 auténtico', 'Incluye controles Mix & Depth (expandido vs hardware)', 'Ancho estéreo y movimiento instantáneo', 'Valor increíble a $49'],
    ['Solo chorus — sin otros FX', 'Solo mono in / stereo out']),
  VD('D16 Group Repeater Delay',
    ['23 delay models: tape, BBD, digital, diffusion', 'Multi-tap with ping-pong, stereo spread', 'Modulation section per tap', 'Great for dub, ambient, rhythmic echoes'],
    ['UI feels dated', 'Can be CPU heavy', 'Overwhelming parameter count'],
    ['23 modelos delay: tape, BBD, digital, difusión', 'Multi-tap con ping-pong, spread estéreo', 'Sección modulación por tap', 'Genial para dub, ambient, ecos rítmicos'],
    ['UI se siente antigua', 'Puede ser CPU pesado', 'Cantidad parámetros abrumadora']),
  VD('Baby Audio Spaced Out',
    ['8 delay modes + reverb + pitch + filter + freeze', 'Futuristic spatial sound design', 'Deep modulation with LFOs/envelopes/macros', 'Incredible value, VST3/CLAP native'],
    ['Can be overwhelming at first', 'Not for simple delay tasks', 'Freeze can create CPU spikes'],
    ['8 modos delay + reverb + pitch + filter + freeze', 'Diseño sonoro espacial futurista', 'Modulación profunda con LFOs/envolventes/macros', 'Valor increíble, VST3/CLAP nativo'],
    ['Puede abrumar al principio', 'No para delays simples', 'Freeze puede crear picos CPU'])
];

fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
console.log('fx-plugins corrections applied:');
console.log('Products:', g.productTable.columns.map(c => c.title).join(', '));
console.log('Verdicts:', g.verdictProsCons.length);