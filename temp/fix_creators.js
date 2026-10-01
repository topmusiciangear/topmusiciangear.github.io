// mics-for-creators: card 197->252 (prose/table describe PodMic USB),
// +6 table columns +6 verdicts.
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = G.find(x => x.id === 'mics-for-creators');
g.sections[0].products = [194, 252, 253, 195, 196, 276, 279, 284, 287, 291, 292];

const V = (value, value_es) => ({ value, value_es });
g.productTable.columns.push(
  { title: 'Audio-Technica AT2020', title_es: 'Audio-Technica AT2020' },
  { title: 'Samson Q2U USB/XLR', title_es: 'Samson Q2U USB/XLR' },
  { title: 'FIFINE AmpliGame AM8', title_es: 'FIFINE AmpliGame AM8' },
  { title: 'Maono PM461 USB', title_es: 'Maono PM461 USB' },
  { title: 'TONOR TC-777 USB', title_es: 'TONOR TC-777 USB' },
  { title: 'Rode NT-USB Mini', title_es: 'Rode NT-USB Mini' }
);
const rows = {};
g.productTable.rows.forEach(r => { rows[r.label] = r; });
rows['Best For'].values.push(
  V('Studio condenser vocals', 'Voces con condensador de estudio'),
  V('Budget USB/XLR all-rounder', 'Todo terreno USB/XLR económico'),
  V('Streaming with RGB control', 'Streaming con control RGB'),
  V('Budget USB voice', 'Voz USB económica'),
  V('Ultra-budget starter', 'Inicio ultra-económico'),
  V('Premium compact USB', 'USB compacto premium')
);
rows['Connection'].values.push(
  V('XLR', 'XLR'),
  V('USB-C + XLR', 'USB-C + XLR'),
  V('USB-C + XLR', 'USB-C + XLR'),
  V('USB', 'USB'),
  V('USB', 'USB'),
  V('USB-C', 'USB-C')
);
rows['Mic Type'].values.push(
  V('Condenser cardioid', 'Condensador cardioide'),
  V('Dynamic cardioid', 'Dinámico cardioide'),
  V('Dynamic cardioid', 'Dinámico cardioide'),
  V('Condenser cardioid', 'Condensador cardioide'),
  V('Condenser cardioid', 'Condensador cardioide'),
  V('Condenser cardioid', 'Condensador cardioide')
);
rows['Recording'].values.push(
  V('Analog XLR — interface decides', 'XLR analógico — decide la interfaz'),
  V('16-bit/48kHz', '16-bit/48kHz'),
  V('16-bit/48kHz', '16-bit/48kHz'),
  V('USB 2.0 (rate not published)', 'USB 2.0 (tasa no publicada)'),
  V('16-bit/44.1kHz', '16-bit/44,1kHz'),
  V('24-bit/48kHz', '24-bit/48kHz')
);
g.verdictProsCons.push(
  { name: 'Audio-Technica AT2020', name_es: 'Audio-Technica AT2020',
    pros: ['Industry-standard condenser sound under $100', 'Detailed 20Hz–20kHz response with 144dB max SPL', 'Needs only phantom power — no batteries or software', 'Equally at home on vocals, guitars and overheads'],
    cons: ['XLR only — needs an interface, no USB path', 'Pivot mount only, no shockmount or cable included', 'Picks up room noise in untreated spaces', 'Fixed cardioid with no pad or filter switches'],
    pros_es: ['Sonido de condensador estándar por menos de $100', 'Respuesta detallada de 20Hz–20kHz con 144dB de SPL máximo', 'Solo necesita phantom — sin baterías ni software', 'Igual de válido en voces, guitarras y overheads'],
    cons_es: ['Solo XLR — necesita interfaz, sin ruta USB', 'Solo montura pivotante, sin suspensión ni cable', 'Capta ruido de sala en espacios sin tratar', 'Cardioide fijo sin pad ni filtros'] },
  { name: 'Samson Q2U USB/XLR', name_es: 'Samson Q2U USB/XLR',
    pros: ['USB today, XLR tomorrow — the future-proof budget pick', 'Decade of positive reviews from podcasters', 'Full accessory kit: stand, tripod, pop filter, both cables', 'Dynamic capsule rejects room noise and keyboard clicks'],
    cons: ['Mini-USB (not USB-C) port feels dated', 'Warm, forward voicing — less detailed for singing', 'Needs plenty of interface gain in XLR mode', 'On/off switch instead of tap-to-mute'],
    pros_es: ['USB hoy, XLR mañana — la opción económica de futuro', 'Una década de reseñas positivas de podcasters', 'Kit completo: soporte, trípode, antipop y ambos cables', 'La cápsula dinámica rechaza ruido de sala y teclado'],
    cons_es: ['El puerto mini-USB (no USB-C) se siente anticuado', 'Voz cálida y presente — menos detalle para cantar', 'Pide bastante ganancia en modo XLR', 'Interruptor on/off en vez de silencio táctil'] },
  { name: 'FIFINE AmpliGame AM8', name_es: 'FIFINE AmpliGame AM8',
    pros: ['USB and XLR outputs for streaming now, interface later', 'Tap-to-mute, gain knob and headphone monitoring onboard', 'Controllable RGB that suits on-camera setups', 'Dynamic capsule ignores keyboard clicks and echo'],
    cons: ['16-bit ceiling while rivals record 24-bit', 'Dynamic needs more gain than condensers', 'No companion app or software EQ', 'Bulky with the shockmount on small desks'],
    pros_es: ['Salidas USB y XLR para streaming hoy e interfaz después', 'Silencio táctil, perilla de ganancia y monitorización a bordo', 'RGB controlable que queda bien en cámara', 'La cápsula dinámica ignora teclado y eco'],
    cons_es: ['Techo de 16 bits mientras rivales graban 24 bits', 'El dinámico pide más ganancia que un condensador', 'Sin app compañera ni EQ por software', 'Voluminoso con la suspensión en escritorios pequeños'] },
  { name: 'Maono PM461 USB', name_es: 'Maono PM461 USB',
    pros: ['Gain knob and mute button on the body', 'Tripod, shockmount and cable in the box', 'Wide 20Hz–20kHz response for a budget condenser', 'Cheapest way to get hardware gain control'],
    cons: ['No headphone jack for monitoring', 'Small 14mm capsule sounds thinner than large condensers', 'No software or app support', 'Short 1.5m cable limits placement'],
    pros_es: ['Perilla de ganancia y botón de silencio en el cuerpo', 'Trípode, suspensión y cable en la caja', 'Respuesta amplia de 20Hz–20kHz para un condensador económico', 'La forma más barata de tener ganancia física'],
    cons_es: ['Sin salida de auriculares para monitorizar', 'La cápsula pequeña de 14 mm suena más fina que un condensador grande', 'Sin software ni app', 'El cable corto de 1,5 m limita la colocación'] },
  { name: 'TONOR TC-777 USB', name_es: 'TONOR TC-777 USB',
    pros: ['Cheapest way to sound better than a webcam mic', 'Full kit: tripod, shockmount and pop filter included', 'True plug-and-play with no drivers', 'Cardioid pattern isolates your voice'],
    cons: ['100Hz roll-off thins deep voices', 'No headphone jack for monitoring', 'Fixed non-detachable cable', '16-bit/44.1kHz only'],
    pros_es: ['La forma más barata de sonar mejor que un micro de webcam', 'Kit completo: trípode, suspensión y antipop incluidos', 'Plug-and-play real sin drivers', 'El cardioide aísla tu voz'],
    cons_es: ['El corte en 100Hz adelgaza voces profundas', 'Sin salida de auriculares', 'Cable fijo no desmontable', 'Solo 16 bits/44,1 kHz'] },
  { name: 'Rode NT-USB Mini', name_es: 'Rode NT-USB Mini',
    pros: ['Premium Rode build with magnetic desk stand', 'Clear 24-bit/48kHz condenser sound', 'Headphone output with zero-latency monitoring', 'Works with Rode Connect mixing software'],
    cons: ['No gain knob on the body', 'USB-only with no XLR upgrade path', 'Price sits at the top of the budget range', 'Condenser prefers a quieter room'],
    pros_es: ['Construcción Rode premium con base magnética', 'Sonido de condensador claro a 24 bits/48 kHz', 'Salida de auriculares sin latencia', 'Funciona con el software Rode Connect'],
    cons_es: ['Sin perilla de ganancia en el cuerpo', 'Solo USB, sin ruta a XLR', 'Precio en lo alto del rango económico', 'El condensador prefiere una sala silenciosa'] }
);
fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
const gg = JSON.parse(fs.readFileSync('data/guides.json', 'utf8')).find(x => x.id === 'mics-for-creators');
const union = [...new Set(gg.sections.flatMap(s => s.products))];
console.log('cards=' + union.length + ' cols=' + gg.productTable.columns.length + ' verdict=' + gg.verdictProsCons.length +
  ' rowsok=' + gg.productTable.rows.every(r => r.values.length === gg.productTable.columns.length));
