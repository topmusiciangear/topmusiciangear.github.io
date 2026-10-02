// fx-plugins: Smooth(472)->Spaced Out(527); fix Lifeline + JUN-6 sections.
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const V = (value, value_es) => ({ value, value_es });
const W = (t) => ({ title: t, title_es: t });

const g = G.find(x => x.id === 'fx-plugins');

// 1. Columns: swap Smooth -> Spaced Out
const ci = g.productTable.columns.findIndex(c => c.title === 'Baby Audio Smooth Operator Pro');
g.productTable.columns[ci] = W('Baby Audio Spaced Out');

// 2. Rows: drop Smooth value, push Spaced Out value
const spacedVals = {
  'Type': V('Delay + Reverb Wet-FX Generator', 'Generador Wet-FX Delay + Reverb'),
  'Best For': V('Rhythmic echoes + evolving spaces in one', 'Ecos rítmicos + espacios evolutivos en uno'),
  'Key Feature': V('16-step Echo sequencer + Space reverb + X-Y mixer + Generate dice', 'Secuenciador Echo 16 pasos + reverb Space + mezclador X-Y + dado Generate'),
  'Modulation Depth': V('Deep (Ducker + Sync + Lift-Off + X-Y morph)', 'Profunda (Ducker + Sync + Lift-Off + morph X-Y)'),
  'Sound Design Potential': V('High (50+ effects, 125 presets, Generate)', 'Alta (50+ efectos, 125 presets, Generate)'),
  'CPU Load': V('Low-Moderate', 'Baja-Moderada'),
  'Formats': V('VST/VST3/AU/AAX', 'VST/VST3/AU/AAX')
};
g.productTable.rows.forEach(r => {
  r.values.splice(ci, 1);
  if (spacedVals[r.label]) r.values.push(spacedVals[r.label]);
});

// 3. featuredProducts 472 -> 527
g.featuredProducts = g.featuredProducts.map(id => id === 472 ? 527 : id);

// 4. Sections
const byProd = (id) => g.sections.find(s => (s.products || []).includes(id));
const smooth = byProd(472);
smooth.heading = 'Baby Audio Spaced Out: 21st-Century Space Echo';
smooth.heading_es = 'Baby Audio Spaced Out: Space Echo del siglo XXI';
smooth.content = '<strong>Spaced Out is Baby Audio\'s 21st-century answer to the Roland Space Echo — not an emulation, but three sections that behave like one instrument.</strong> Echoes is a 16-step delay sequencer synced to your DAW (Straight, 2x, Dotted, Triplet; Clean, LoFi, Hazy and Wonky Tape textures; Sustain plus Feedback Intensity; Dimension width; Reverse; analog-modeled filters). Space is a crystalline algorithmic reverb with four programs (Vacuum, Small Space, Medium Space, Outer Space) and four baked-in modulations (Lush, Trippy, Alien, Cosmic) morphed on an X-Y pad, plus Stardust shimmer, Mellow filter, Clean-Up density and Width. The central Mixer morphs Echoes against Space and Wet against Dry on one joystick, with a Generate dice that randomizes musically, a Ducker (plus quarter-note Sync for four-on-the-floor pumping) and Lift-Off glue (compression plus mid-side plus EQ). 125 presets, 50-plus effects combined, zero sub-menus, VST/VST3/AU/AAX. Future Music and Computer Music Plugin of the Year.';
smooth.content_es = '<strong>Spaced Out es la respuesta de Baby Audio al Roland Space Echo para el siglo XXI — no una emulación, sino tres secciones que se comportan como un instrumento.</strong> Echoes es un secuenciador de delay de 16 pasos sincronizado a tu DAW (Straight, 2x, Dotted, Triplet; texturas Clean, LoFi, Hazy y Wonky Tape; Intensity con Sustain más Feedback; Dimension de ancho; Reverse; filtros modelados analógicos). Space es una reverb algorítmica cristalina con cuatro programas (Vacuum, Small Space, Medium Space, Outer Space) y cuatro modulaciones integradas (Lush, Trippy, Alien, Cosmic) mezcladas en un pad X-Y, más Stardust shimmer, filtro Mellow, densidad Clean-Up y Width. El Mixer central mezcla Echoes contra Space y Wet contra Dry en un joystick, con dado Generate que aleatoriza musicalmente, Ducker (más Sync a negras para pumping four-on-the-floor) y pegamento Lift-Off (compresión más mid-side más EQ). 125 presets, más de 50 efectos combinados, cero submenús, VST/VST3/AU/AAX. Plugin del Año para Future Music y Computer Music.';
smooth.products = [527];

const life = byProd(387);
life.content = '<strong>Lifeline Expanse builds evolving spaces from five modules, not three.</strong> Format adds lo-fi character, Dirt adds saturation edge, Reave generates the core space, Width controls the stereo field and Space delivers the reverb tail — every parameter modulatable for cinematic movement. Designed for ambient, film and post-production where space itself is an instrument. VST/VST3/AU/AAX.';
life.content_es = '<strong>Lifeline Expanse construye espacios evolutivos desde cinco módulos, no tres.</strong> Format añade carácter lo-fi, Dirt añade filo de saturación, Reave genera el espacio central, Width controla el campo estéreo y Space entrega la cola de reverb — cada parámetro modulable para movimiento cinematográfico. Diseñado para ambient, cine y post-producción donde el espacio es un instrumento. VST/VST3/AU/AAX.';

const jun = byProd(390);
jun.heading = 'Arturia Chorus JUN-6: Authentic Juno Chorus for $49';
jun.heading_es = 'Arturia Chorus JUN-6: Chorus Juno auténtico por $49';
jun.content = '<strong>The JUN-6 models the legendary Roland Juno-106 chorus circuit — and Arturia expanded it beyond the hardware.</strong> Two modes: I (slow, subtle) and II (faster, wider), plus Mix and Depth controls the original never had. That is it: authentic Juno chorus that instantly widens anything, mono in and stereo out, for a $49 list price. Does one thing perfectly.';
jun.content_es = '<strong>El JUN-6 modela el legendario circuito chorus del Roland Juno-106 — y Arturia lo expandió más allá del hardware.</strong> Dos modos: I (lento, sutil) y II (más rápido, ancho), más controles Mix y Depth que el original nunca tuvo. Eso es todo: chorus Juno auténtico que ensancha al instante, entrada mono y salida estéreo, por precio de lista $49. Hace una cosa perfecta.';

fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
const gg = JSON.parse(fs.readFileSync('data/guides.json', 'utf8')).find(x => x.id === 'fx-plugins');
console.log('cols=' + gg.productTable.columns.length + ' rowsok=' + gg.productTable.rows.every(r => r.values.length === gg.productTable.columns.length) + ' verdict=' + gg.verdictProsCons.length + ' featured=' + gg.featuredProducts.join(','));
console.log('sections:', gg.sections.map(s => '[' + (s.products || []).join(',') + ']').join(' '));
