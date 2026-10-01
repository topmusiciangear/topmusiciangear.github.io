// best-mic-for-podcasting: fix invented MaxSPL/DR + add 4 cols + 4 verdicts.
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = G.find(x => x.id === 'best-mic-for-podcasting');
const V = (value, value_es) => ({ value, value_es });
const rows = {};
g.productTable.rows.forEach(r => { rows[r.label] = r; });
// EN->ES map from SM58 column (index 0) for reused values
const esOf = {};
Object.values(rows).forEach(r => { esOf[r.values[0].value] = r.values[0].value_es; });
const T = en => V(en, esOf[en] || en);
// 1. fix fabricated estimates
rows['Max SPL'].values.forEach(v => {
  if (/est\./.test(v.value)) { v.value = 'Not published'; v.value_es = 'No publicado'; }
});
const dr = rows['Dynamic Range'].values;
dr.forEach(v => {
  if (/marketing/.test(v.value)) { v.value = 'Not published'; v.value_es = 'No publicado'; }
});
// 2. new columns
g.productTable.columns.push(
  { title: 'Rode NT1 Signature Series', title_es: 'Rode NT1 Signature Series' },
  { title: 'Behringer XM8500 Ultravoice', title_es: 'Behringer XM8500 Ultravoice' },
  { title: 'Shure MV7+', title_es: 'Shure MV7+' },
  { title: 'Hollyland MELO P1', title_es: 'Hollyland MELO P1' }
);
const C = {
  'Best For': [V('Silent studio vocals', 'Voces de estudio silenciosas'), V('Ultra-budget vocals', 'Voces ultra-económicas'), V('USB/XLR podcasting with DSP', 'Podcasting USB/XLR con DSP'), V('Wireless multi-source recording', 'Grabación inalámbrica multifuente')],
  'Type': [V('Condenser (1-inch LDC), XLR', 'Condensador (1 pulgada), XLR'), V('Dynamic, passive', 'Dinámico, pasivo'), V('Dynamic hybrid, USB-C + XLR', 'Dinámico híbrido, USB-C + XLR'), V('Wireless system (dynamic + condenser)', 'Sistema inalámbrico (dinámico + condensador)')],
  'Polar Pattern': [V('Cardioid', 'Cardioide'), V('Cardioid', 'Cardioide'), V('Cardioid', 'Cardioide'), V('Cardioid', 'Cardioide')],
  'Frequency Response': [V('20 Hz – 20 kHz', '20 Hz – 20 kHz'), V('50 Hz – 15 kHz', '50 Hz – 15 kHz'), V('50 Hz – 16 kHz', '50 Hz – 16 kHz'), V('20 Hz – 20 kHz (condenser)', '20 Hz – 20 kHz (condensador)')],
  'Sensitivity': [V('-32 dB re 1V/Pa (25 mV)', '-32 dB re 1V/Pa (25 mV)'), V('-70 dB (mfr)', '-70 dB (fabricante)'), V('-55 dBV/Pa (XLR)', '-55 dBV/Pa (XLR)'), T('Not published')],
  'Self-Noise': [V('4 dBA', '4 dBA'), T('N/A (passive dynamic)'), T('N/A (passive dynamic)'), T('Not published')],
  'Max SPL': [V('142 dB SPL', '142 dB SPL'), T('Not published'), V('128 dB (USB)', '128 dB (USB)'), V('132 dB (condenser)', '132 dB (condensador)')],
  'Output / Preamp': [V('100 Ω', '100 Ω'), V('150 Ω', '150 Ω'), T('Not published'), T('Not published')],
  'Signal-to-Noise Ratio': [T('Not published'), T('Not published'), T('Not published'), T('Not published')],
  'Dynamic Range': [T('Not published'), T('Not published'), T('Not published'), V('116 dB (system)', '116 dB (sistema)')],
  'THD at Max SPL': [T('Not published'), T('Not published'), T('Not published'), T('Not published')],
  'Capsule / Diaphragm': [V('HF6 1-inch true condenser', 'HF6 real de 1 pulgada'), V('Dynamic vocal capsule', 'Cápsula dinámica vocal'), V('Dynamic broadcast capsule', 'Cápsula dinámica broadcast'), V('1-inch LDC + dynamic (interchangeable)', 'LDC de 1 pulgada + dinámico (intercambiables)')],
  'Pad & High-Pass Filter': [V('None', 'Ninguno'), V('None', 'Ninguno'), V('DSP HPF (USB)', 'HPF por DSP (USB)'), V('None (AI denoise instead)', 'Ninguno (denoise por IA)')],
  'Phantom Power': [V('+48 V', '+48 V'), T('None required'), V('5 V (USB); none (XLR)', '5 V (USB); ninguno (XLR)'), V('Rechargeable batteries', 'Baterías recargables')],
  'Dimensions': [V('52 × 52 × 189 mm', '52 × 52 × 189 mm'), T('Not published'), T('Not published'), V('Ø55 × 199 mm (mic)', 'Ø55 × 199 mm (micro)')],
  'Weight': [V('313 g', '313 g'), T('Not published'), T('Not published'), V('312 g dynamic / 255 g condenser', '312 g dinámico / 255 g condensador')]
};
Object.entries(C).forEach(([label, vals]) => rows[label].values.push(...vals));
g.verdictProsCons.push(
  { name: 'Rode NT1 Signature Series', name_es: 'Rode NT1 Signature Series',
    pros: ['4dBA self-noise with 142dB max SPL — silence plus headroom', 'HF6 1-inch capsule with shockmount, pop filter and XLR cable included', 'Simple P48 operation with no software or menus', 'Warm silky NT1 character that flatters any voice'],
    cons: ['Needs a treated room and an interface to shine', 'No pad or filter switches onboard', 'Single cardioid pattern only', 'Costs six times the XM8500'],
    pros_es: ['4dBA de ruido propio con 142dB de SPL — silencio más margen', 'HF6 de 1 pulgada con suspensión, antipop y cable XLR incluidos', 'Operación simple P48 sin software ni menús', 'Carácter NT1 cálido que favorece cualquier voz'],
    cons_es: ['Necesita sala tratada e interfaz para brillar', 'Sin pad ni filtros a bordo', 'Solo patrón cardioide', 'Cuesta seis veces el XM8500'] },
  { name: 'Behringer XM8500 Ultravoice', name_es: 'Behringer XM8500 Ultravoice',
    pros: ['SM58-adjacent sound for the price of a cable', 'Nothing to lose at $25 — perfect live spare', 'No phantom or power needed, ever', 'Works for vocals, amps and podcasting alike'],
    cons: ['A step below the SM58 in blind tests', 'Finish and grille wear faster with gigging', 'Low output needs clean interface gain', 'No USB path for direct recording'],
    pros_es: ['Sonido cercano al SM58 por el precio de un cable', 'Nada que perder a $25 — repuesto perfecto en vivo', 'Sin phantom ni alimentación, nunca', 'Vale para voces, amplis y podcast por igual'],
    cons_es: ['Un paso por debajo del SM58 en pruebas ciegas', 'Acabado y rejilla se gastan antes con bolos', 'La salida baja pide ganancia limpia', 'Sin ruta USB para grabación directa'] },
  { name: 'Shure MV7+', name_es: 'Shure MV7+',
    pros: ['USB-C plus XLR — record now, upgrade to interface later', 'Onboard DSP: Auto Level, denoiser, popper stopper and reverb', 'Touch panel with customizable LED mute indicator', '-55dBV output hot enough to skip Cloudlifters'],
    cons: ['MOTIV app required for the full DSP feature set', 'USB caps at 48kHz while rivals reach 96kHz', 'Bulkier on a desk stand than compact rivals', 'Premium price over USB-only alternatives'],
    pros_es: ['USB-C más XLR — graba hoy, mejora a interfaz después', 'DSP a bordo: Auto Level, denoise, popper stopper y reverb', 'Panel táctil con LED de silencio personalizable', '-55dBV suficientes para prescindir de Cloudlifters'],
    cons_es: ['La app MOTIV es necesaria para todo el DSP', 'El USB topa en 48kHz mientras rivales llegan a 96kHz', 'Más voluminoso que rivales compactos', 'Precio premium sobre alternativas solo USB'] },
  { name: 'Hollyland MELO P1', name_es: 'Hollyland MELO P1',
    pros: ['Dynamic plus condenser capsules swap for any source', '32-bit float with 116dB range — clipping is history', '25dB AI denoise cleans noisy rooms automatically', '12-hour battery with 60m range; mixer blends four sources'],
    cons: ['Young ecosystem with fewer long-term reviews', 'Phone and app dependent workflow', 'Heaviest handheld here at 312g', 'Premium price for podcast-first buyers'],
    pros_es: ['Cápsulas dinámica y de condensador intercambiables para cada fuente', '32 bits flotantes con 116dB — el clipping es historia', 'Denoise por IA de 25dB limpia salas ruidosas solo', '12 horas de batería con 60m de alcance; mezcla cuatro fuentes'],
    cons_es: ['Ecosistema joven con menos reseñas a largo plazo', 'Flujo dependiente de teléfono y app', 'El mano más pesado aquí con 312g', 'Precio premium para compradores de podcast'] }
);
g.verdict += ' NT1 Signature for silent treated rooms, XM8500 for $25 spares, MV7+ for USB/XLR DSP flexibility.';
g.verdict_es += ' NT1 Signature para salas tratadas silenciosas, XM8500 como repuesto de $25, MV7+ por flexibilidad DSP USB/XLR.';
fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
const gg = JSON.parse(fs.readFileSync('data/guides.json', 'utf8')).find(x => x.id === 'best-mic-for-podcasting');
const union = [...new Set(gg.sections.flatMap(s => s.products))];
console.log('cards=' + union.length + ' cols=' + gg.productTable.columns.length + ' verdict=' + gg.verdictProsCons.length +
  ' rowsok=' + gg.productTable.rows.every(r => r.values.length === gg.productTable.columns.length));
console.log('est. restantes: ' + gg.productTable.rows.flatMap(r => r.values.map((v, i) => /est\.|marketing/.test(v.value) ? r.label + '[' + i + ']=' + v.value : null)).filter(Boolean).join(' | '));
