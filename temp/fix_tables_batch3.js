// Batch 3: EW-D + VoxDoubler + bx_console + Launchkey49 + MCU Pro + EVO 4.
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const V = (value, value_es) => ({ value, value_es });

// ---------- 1. stage-mics: EW-D column + verdict + section ----------
{
  const g = G.find(x => x.id === 'stage-mics');
  g.productTable.columns.push({ title: 'Sennheiser EW-D Dual Wireless System', title_es: 'Sennheiser EW-D Dual Wireless System' });
  const rows = {};
  g.productTable.rows.forEach(r => { rows[r.label] = r; });
  rows['Best For'].values.push(V('Wireless live vocals', 'Voces en vivo sin cables'));
  rows['Type'].values.push(V('Digital wireless system', 'Sistema inalámbrico digital'));
  rows['Polar Pattern'].values.push(V('Cardioid (MMD 835)', 'Cardioide (MMD 835)'));
  rows['Frequency Response'].values.push(V('20 Hz – 20 kHz', '20 Hz – 20 kHz'));
  rows['Sensitivity'].values.push(V('N/A (digital transmission)', 'N/A (transmisión digital)'));
  rows['Output Impedance'].values.push(V('XLR receiver output', 'Salida XLR de receptor'));
  rows['Weight'].values.push(V('System (receiver + 2 transmitters)', 'Sistema (receptor + 2 transmisores)'));
  rows['Signal-to-Noise Ratio'].values.push(V('Not published', 'No publicado'));
  rows['Dynamic Range'].values.push(V('134 dB', '134 dB'));
  rows['THD at Max SPL'].values.push(V('Not published', 'No publicado'));
  rows['Capsule / Diaphragm'].values.push(V('MMD 835 dynamic (handheld) + ME 2 lavalier', 'MMD 835 dinámico (mano) + ME 2 lavalier'));
  rows['Pad & High-Pass Filter'].values.push(V('None (gain set automatically)', 'Ninguno (ganancia automática)'));
  rows['Phantom Power'].values.push(V('None required', 'No requiere'));
  rows['Dimensions'].values.push(V('Half-rack receiver + handheld/bodypack', 'Receptor half-rack + mano/petaca'));
  g.verdictProsCons.push({
    name: 'Sennheiser EW-D Dual Wireless System', name_es: 'Sennheiser EW-D Dual Wireless System',
    pros: ['No transmitter gain-setting needed thanks to 134 dB range and 1.9 ms latency', 'MMD 835 handheld plus ME 2 lavalier cover vocals and speech in one set', 'Bluetooth app with auto frequency setup finds clean channels fast', '56 MHz bandwidth with up to 90 channels for crowded RF'],
    cons: ['Most expensive route to cut the cable in this guide', 'Two transmitters to power, charge and keep track of', 'UHF coordination still required in crowded RF environments', 'Dynamic MMD 835 plus lavalier only — no condenser handheld option', 'Half-rack receiver plus antennas to place and power'],
    pros_es: ['Sin ajustar ganancia en transmisores gracias a 134 dB y 1,9 ms de latencia', 'Mano MMD 835 más lavalier ME 2 cubren voz y palabra en un set', 'App Bluetooth con configuración automática que encuentra canales limpios rápido', '56 MHz de ancho con hasta 90 canales para RF saturada'],
    cons_es: ['La ruta más cara para cortar el cable de esta guía', 'Dos transmisores que alimentar, cargar y no perder', 'La coordinación UHF sigue siendo necesaria en RF saturada', 'Solo dinámico MMD 835 más lavalier — sin mano de condensador', 'Receptor half-rack más antenas que colocar y alimentar']
  });
  g.sections.push({
    heading: 'Is the Sennheiser EW-D the Best Wireless System for Live Vocals?',
    heading_es: '¿Es el Sennheiser EW-D el mejor sistema inalámbrico para voces en vivo?',
    content: '<p><strong>The Sennheiser EW-D cuts the cable without the analog-wireless headaches.</strong> This dual set pairs an EW-D EM receiver with an SKM-S handheld carrying the MMD 835 dynamic capsule and an SK bodypack with ME 2 lavalier. Digital transmission delivers 20 Hz to 20 kHz audio with 134 dB of dynamic range and 1.9 ms latency — and you never set transmitter gain. Bluetooth app control with automatic frequency setup finds clean spectrum in seconds.</p><p><strong>The catch: </strong>it costs multiples of a wired SM58 rig, needs charged batteries and basic UHF coordination. But for singers who move, it is the most transparent wireless in this guide.</p>',
    content_es: '<p><strong>El Sennheiser EW-D corta el cable sin los dolores de cabeza del inalámbrico analógico.</strong> Este set dual combina un receptor EW-D EM con mano SKM-S de cápsula dinámica MMD 835 y petaca SK con lavalier ME 2. La transmisión digital entrega audio de 20 Hz a 20 kHz con 134 dB de rango dinámico y 1,9 ms de latencia — y nunca ajustas ganancia en transmisores. La app Bluetooth con configuración automática encuentra espectro limpio en segundos.</p><p><strong>El inconveniente: </strong>cuesta múltiplos de un equipo SM58 con cable, necesita baterías cargadas y coordinación UHF básica. Pero para cantantes que se mueven, es el inalámbrico más transparente de esta guía.</p>',
    products: [93]
  });
  g.verdict += ' EW-D is the wireless pick — digital clarity without touching transmitter gain.';
  g.verdict_es += ' El EW-D es la opción inalámbrica — claridad digital sin tocar la ganancia.';
  g.conclusion = g.conclusion.replace('Keep an SM57 in the kit for guitar amps, snares and horns, and you can cover any stage in the world.',
    'Cutting the cable? The Sennheiser EW-D gives you handheld and lavalier with digital clarity and no gain-setting. Keep an SM57 in the kit for guitar amps, snares and horns, and you can cover any stage in the world.');
  g.conclusion_es = g.conclusion_es.replace('Mantén un SM57 en el equipo para amplificadores de guitarra, cajas y metales, y podrás cubrir cualquier escenario del mundo.',
    '¿Sin cables? El Sennheiser EW-D te da mano y lavalier con claridad digital y sin ajustar ganancias. Mantén un SM57 en el equipo para amplificadores de guitarra, cajas y metales, y podrás cubrir cualquier escenario del mundo.');
}

// ---------- 2. vocal-plugins: VoxDoubler column + verdict ----------
{
  const g = G.find(x => x.id === 'vocal-plugins');
  g.productTable.columns.push({ title: 'Sonnox VoxDoubler', title_es: 'Sonnox VoxDoubler' });
  const rows = {};
  g.productTable.rows.forEach(r => { rows[r.label] = r; });
  rows['Best For'].values.push(V('Natural vocal doubles', 'Dobles vocales naturales'));
  rows['Type'].values.push(V('Vocal doubler (Thicken + Widen)', 'Doblador vocal (Thicken + Widen)'));
  rows['Format'].values.push(V('VST3/AU/AAX', 'VST3/AU/AAX'));
  rows['Platforms'].values.push(V('macOS & Windows', 'macOS y Windows'));
  rows['Copy Protection'].values.push(V('iLok', 'iLok'));
  rows['Latency'].values.push(V('Low', 'Baja'));
  rows['Standout Feature'].values.push(V('Thicken + Widen, pitch/timing humanisation', 'Thicken + Widen, humanización de tono/tiempo'));
  g.verdictProsCons.push({
    name: 'Sonnox VoxDoubler', name_es: 'Sonnox VoxDoubler',
    pros: ['Two dedicated modules — Thicken for weight, Widen for stereo spread', 'Pitch and timing humanisation for believable, non-robotic doubles', 'Aux mode processes the doubles independently on a bus', 'Depth control keeps the lead vocal in focus against the layers'],
    cons: ['Does one job only — no EQ, compression or tuning', 'Easy to overdo width on lead vocals', 'Premium price for a single-effect plugin', 'Requires iLok authorization'],
    pros_es: ['Dos módulos dedicados — Thicken para cuerpo, Widen para apertura estéreo', 'Humanización de tono y tiempo para dobles creíbles y no robóticos', 'El modo Aux procesa los dobles por separado en un bus', 'El control Depth mantiene la voz principal enfocada entre capas'],
    cons_es: ['Hace un solo trabajo — sin EQ, compresión ni afinación', 'Fácil pasarse de apertura en voces principales', 'Precio premium para un plugin de un solo efecto', 'Requiere autorización iLok']
  });
  g.verdict += ' VoxDoubler creates believable doubles without tracking twice.';
  g.verdict_es += ' VoxDoubler crea dobles creíbles sin grabar dos veces.';
}

// ---------- 3. channel-strip-plugins: bx_console column + verdict ----------
{
  const g = G.find(x => x.id === 'channel-strip-plugins');
  g.productTable.columns.push({ title: 'Brainworx bx_console SSL 4000 E', title_es: 'Brainworx bx_console SSL 4000 E' });
  const rows = {};
  g.productTable.rows.forEach(r => { rows[r.label] = r; });
  rows['Best For'].values.push(V('Exact SSL console channel', 'Canal SSL exacto de consola'));
  rows['Type'].values.push(V('Channel strip (72ch TMT)', 'Channel strip (72 canales TMT)'));
  rows['Format'].values.push(V('VST2/VST3/AU/AAX', 'VST2/VST3/AU/AAX'));
  rows['Platforms'].values.push(V('macOS & Windows', 'macOS y Windows'));
  rows['Copy Protection'].values.push(V('PA account', 'Cuenta PA'));
  rows['Latency'].values.push(V('Low', 'Baja'));
  rows['Standout Feature'].values.push(V('72 TMT channels, black/brown EQ, E/G dynamics', '72 canales TMT, EQ negra/marrón, dinámica E/G'));
  g.verdictProsCons.push({
    name: 'Brainworx bx_console SSL 4000 E', name_es: 'Brainworx bx_console SSL 4000 E',
    pros: ['72 TMT channels — every instance sounds slightly different like hardware', 'Officially licensed SSL 4000 E with black and brown EQ revisions', 'Complete gate/expander, comp, 4-band EQ and filters per channel', 'Switchable E/G dynamics with external sidechain'],
    cons: ['Aggressive SSL character is not right for every source', '72 channels to audition slows decisions down', 'PA sale pricing makes the list price meaningless', 'Hardware-mirrored interface feels dense for beginners'],
    pros_es: ['72 canales TMT — cada instancia suena un poco distinta como el hardware', 'SSL 4000 E con licencia oficial y revisiones de EQ negra y marrón', 'Puerta/expansor, compresor, EQ de 4 bandas y filtros completos por canal', 'Dinámica E/G conmutable con sidechain externo'],
    cons_es: ['El carácter SSL agresivo no va con cada fuente', '72 canales que probar ralentizan las decisiones', 'Los precios de oferta PA dejan el precio de lista sin sentido', 'La interfaz espejo del hardware se siente densa para principiantes']
  });
  g.verdict += ' bx_console is the exact SSL channel for console purists.';
  g.verdict_es += ' bx_console es el canal SSL exacto para puristas de consola.';
}

// ---------- 4. midi-keyboards: Launchkey 49 column + verdict ----------
{
  const g = G.find(x => x.id === 'midi-keyboards');
  g.productTable.columns.push({ title: 'Novation Launchkey 49 MK4', title_es: 'Novation Launchkey 49 MK4' });
  const rows = {};
  g.productTable.rows.forEach(r => { rows[r.label] = r; });
  rows['Best For'].values.push(V('Best 49-key Ableton controller', 'Mejor controlador Ableton de 49 teclas'));
  rows['Type'].values.push(V('MIDI controller', 'Controlador MIDI'));
  rows['Keys'].values.push(V('49 semi-weighted', '49 semi-ponderadas'));
  rows['Pads'].values.push(V('16 FSR (polyphonic aftertouch)', '16 FSR (aftertouch polifónico)'));
  rows['Encoders / Knobs'].values.push(V('8 encoders + 9 faders', '8 encoders + 9 faders'));
  rows['Connectivity'].values.push(V('USB-C, MIDI out, sustain', 'USB-C, MIDI out, sustain'));
  rows['Weight'].values.push(V('4.08 kg (9.0 lb)', '4,08 kg'));
  g.verdictProsCons.push({
    name: 'Novation Launchkey 49 MK4', name_es: 'Novation Launchkey 49 MK4',
    pros: ['Deepest Ableton integration with clip and sequencer pad modes', '16 pads with polyphonic aftertouch plus 8 encoders and 9 faders', 'Plugin, Mixer, Sends and Transport encoder modes cover the DAW', 'Capture MIDI, quantise and undo buttons speed the workflow'],
    cons: ['Semi-weighted keys will not satisfy pianists', 'Pads are smaller than MPC-style controllers', 'Deepest features need Ableton — HUI elsewhere', 'No CV/gate outputs for hardware synths'],
    pros_es: ['La integración más profunda con Ableton, con modos de clips y secuenciador en pads', '16 pads con aftertouch polifónico más 8 encoders y 9 faders', 'Los modos Plugin, Mixer, Sends y Transport cubren el DAW', 'Los botones Capture MIDI, quantise y undo aceleran el flujo'],
    cons_es: ['Las teclas semi-ponderadas no satisfacen a pianistas', 'Los pads son más pequeños que en controladores estilo MPC', 'Las funciones profundas piden Ableton — HUI en el resto', 'Sin salidas CV/gate para sintes hardware']
  });
}

// ---------- 5. midi-controllers: MCU Pro column + verdict ----------
{
  const g = G.find(x => x.id === 'midi-controllers');
  g.productTable.columns.push({ title: 'Mackie MCU Pro', title_es: 'Mackie MCU Pro' });
  const rows = {};
  g.productTable.rows.forEach(r => { rows[r.label] = r; });
  rows['Best For'].values.push(V('Classic 9-fader MCU control', 'Control MCU clásico de 9 faders'));
  rows['Faders'].values.push(V('9 motorized, 100mm', '9 motorizados, 100 mm'));
  rows['Protocol'].values.push(V('MCU/HUI/Logic', 'MCU/HUI/Logic'));
  rows['Key Features'].values.push(V('V-Pots, LCD scribble, jog wheel', 'V-Pots, LCD, jog wheel'));
  rows['Connectivity'].values.push(V('USB, MIDI', 'USB, MIDI'));
  rows['Display'].values.push(V('LCD scribble strips', 'LCD por canal'));
  rows['Assignable Buttons'].values.push(V('118 + 8 assignable', '118 + 8 asignables'));
  rows['Expandable'].values.push(V('Yes (XT/C4)', 'Sí (XT/C4)'));
  rows['Bundled Software'].values.push(V('Waveform OEM + PT First', 'Waveform OEM + PT First'));
  rows['Build'].values.push(V('Metal chassis', 'Chasis metálico'));
  rows['Price'].values.push(V('$1,299', '$1,299'));
  g.verdictProsCons.push({
    name: 'Mackie MCU Pro', name_es: 'Mackie MCU Pro',
    pros: ['Nine 100mm Alps motorized faders with touch sensitivity', 'Speaks MCU, HUI and Logic Control — works with virtually any DAW', 'Backlit LCD scribble strips with track names and meters', 'Expandable with XT Pro and C4 Pro units'],
    cons: ['Large 16.5-inch footprint dominates small desks', 'USB 1.1 MIDI-era connectivity, no Ethernet', 'Display tech older than UF8 and S1 screens', 'Premium price for the protocol generation'],
    pros_es: ['Nueve faders Alps motorizados de 100 mm con sensibilidad táctil', 'Habla MCU, HUI y Logic Control — funciona con casi cualquier DAW', 'LCD retroiluminados con nombres de pista y medidores', 'Ampliable con unidades XT Pro y C4 Pro'],
    cons_es: ['Sus 16,5 pulgadas dominan escritorios pequeños', 'Conectividad USB 1.1 de era MIDI, sin Ethernet', 'Pantallas más antiguas que las de UF8 y S1', 'Precio premium para su generación de protocolo']
  });
  g.verdict += ' For classic MCU control with nine faders, the Mackie MCU Pro remains the reference.';
  g.verdict_es += ' Para control MCU clásico con nueve faders, el Mackie MCU Pro sigue siendo la referencia.';
  g.conclusion = g.conclusion.replace('Together, these two categories cover every control need in a modern studio.',
    'For classic nine-fader MCU control, the Mackie MCU Pro remains the reference. Together, these two categories cover every control need in a modern studio.');
  g.conclusion_es = g.conclusion_es.replace('Juntas, estas dos categorías cubren todas las necesidades de control en un estudio moderno.',
    'Para control MCU clásico con nueve faders, el Mackie MCU Pro sigue siendo la referencia. Juntas, estas dos categorías cubren todas las necesidades de control en un estudio moderno.');
}

// ---------- 6. budget-interfaces: EVO 4 column + verdict + section ----------
{
  const g = G.find(x => x.id === 'budget-interfaces');
  g.productTable.columns.push({ title: 'Audient EVO 4', title_es: 'Audient EVO 4' });
  const rows = {};
  g.productTable.rows.forEach(r => { rows[r.label] = r; });
  rows['Best For'].values.push(V('Auto-gain entry interface', 'Interfaz de entrada con auto-ganancia'));
  rows['Type'].values.push(V('Audio interface', 'Interfaz de audio'));
  rows['Inputs / Outputs'].values.push(V('2-in / 2-out', '2 entradas / 2 salidas'));
  rows['Preamps'].values.push(V('2 EVO, 58 dB gain', '2 EVO, 58 dB'));
  rows['Sample Rate'].values.push(V('96 kHz', '96 kHz'));
  rows['Bit Depth'].values.push(V('24-bit', '24 bits'));
  rows['Connectivity'].values.push(V('USB-C', 'USB-C'));
  rows['Special Features'].values.push(V('Smartgain, loopback, JFET DI', 'Smartgain, loopback, DI JFET'));
  g.verdictProsCons.push({
    name: 'Audient EVO 4', name_es: 'Audient EVO 4',
    pros: ['Smartgain sets input levels automatically — ideal for beginners', '113 dB converters with clean EVO preamps', 'Loopback for streaming and sampling system audio', 'JFET instrument input for direct guitar and bass'],
    cons: ['96 kHz ceiling while rivals reach 192 kHz', 'Two channels only with no expansion', 'Compact plastic build', 'No MIDI I/O'],
    pros_es: ['Smartgain ajusta los niveles solo — ideal para principiantes', 'Conversores de 113 dB con previos EVO limpios', 'Loopback para streaming y samplear audio del sistema', 'Entrada de instrumento JFET para guitarra y bajo directos'],
    cons_es: ['Techo de 96 kHz mientras rivales llegan a 192 kHz', 'Solo dos canales sin expansión', 'Construcción compacta de plástico', 'Sin MIDI']
  });
  g.sections.push({
    heading: 'Is the Audient EVO 4 the Best Smart Interface for Beginners?',
    heading_es: '¿Es la Audient EVO 4 la mejor interfaz inteligente para principiantes?',
    content: '<p><strong>The Audient EVO 4 sets its own gain — the hardest part of recording, done for you.</strong> Two EVO mic preamps with 58 dB of gain, 113 dB converters and Smartgain auto-leveling that nails input levels while you play. Add loopback for streaming, a JFET DI for guitar and bus-powered USB-C in a box that costs less than a plugin bundle.</p><p><strong>The catch: </strong>96 kHz ceiling, two channels with no expansion and no MIDI. But for a first interface that removes gain-staging fear, nothing touches it.</p>',
    content_es: '<p><strong>La Audient EVO 4 ajusta su propia ganancia — lo más difícil de grabar, hecho por ti.</strong> Dos previos EVO con 58 dB de ganancia, conversores de 113 dB y Smartgain que clava los niveles mientras tocas. Suma loopback para streaming, DI JFET para guitarra y USB-C alimentado por bus en una caja que cuesta menos que un bundle de plugins.</p><p><strong>El inconveniente: </strong>techo de 96 kHz, dos canales sin expansión y sin MIDI. Pero como primera interfaz que elimina el miedo a la ganancia, nada la toca.</p>',
    products: [262]
  });
  g.verdict += ' EVO 4 is the autopilot pick — Smartgain for beginners.';
  g.verdict_es += ' La EVO 4 es la opción piloto automático — Smartgain para principiantes.';
  g.conclusion = g.conclusion.replace('Any of these will serve you well',
    'On a tight budget with zero experience? The EVO 4 sets its own gain. Any of these will serve you well');
  g.conclusion_es = g.conclusion_es.replace('No puedes equivocarte con ninguna de estas',
    '¿Presupuesto justo y cero experiencia? La EVO 4 ajusta su propia ganancia. No puedes equivocarte con ninguna de estas');
}

fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
const gg = id => JSON.parse(fs.readFileSync('data/guides.json', 'utf8')).find(x => x.id === id);
['stage-mics', 'vocal-plugins', 'channel-strip-plugins', 'midi-keyboards', 'midi-controllers', 'budget-interfaces'].forEach(id => {
  const g = gg(id);
  const union = [...new Set(g.sections.flatMap(s => s.products))];
  console.log(id + ': cards=' + union.length + ' cols=' + g.productTable.columns.length + ' verdict=' + g.verdictProsCons.length +
    ' rowsok=' + g.productTable.rows.every(r => r.values.length === g.productTable.columns.length));
});
