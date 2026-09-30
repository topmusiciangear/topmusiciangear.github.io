// budget-usb-mics: s0 skipMedia (Q2U gets its photo), cons 3->4/5,
// 2 pros topped to 4, 3 ES glitches fixed.
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = G.find(x => x.id === 'budget-usb-mics');
g.sections[0].skipMedia = true;
const V = n => g.verdictProsCons.find(v => v.name === n);
const addC = (n, en, es) => { const v = V(n); v.cons.push(en); v.cons_es.push(es); };
const addP = (n, en, es) => { const v = V(n); v.pros.push(en); v.pros_es.push(es); };

addC('Samson Q2U USB/XLR Microphone',
  'Mini-USB (not USB-C) port feels dated',
  'El puerto mini-USB (no USB-C) se siente anticuado');
addC('Maono PD200X Dynamic Microphone',
  'Dynamic capsule needs more gain than condensers — quiet voices need the knob up',
  'La cápsula dinámica pide más ganancia que un condensador — las voces suaves necesitan subir la perilla');
addC('HyperX SoloCast 2',
  'No XLR path for future upgrades',
  'Sin salida XLR para mejorar en el futuro');
addC('FIFINE AmpliTank K688 Dynamic USB/XLR Microphone',
  'No companion app or software EQ',
  'Sin app compañera ni EQ por software');
addC('FIFINE AmpliGame AM8 Dynamic USB Microphone',
  'USB-only — no XLR upgrade path',
  'Solo USB — sin ruta de mejora a XLR');
addC('Razer Seiren V3 Mini',
  'Fixed pickup pattern — no polar options',
  'Patrón de captación fijo — sin opciones polares');
addC('FIFINE AmpliGame A6V USB Gaming Microphone',
  'USB-only with no XLR upgrade path',
  'Solo USB, sin ruta a XLR');
addC('Rode NT-USB Mini Studio Condenser Microphone',
  'USB-only — no XLR version at this size',
  'Solo USB — sin versión XLR en este tamaño');
addC('HyperX SoloCast USB Condenser Microphone',
  'Basic desk stand — a boom arm is almost mandatory',
  'El soporte es básico — casi exige un brazo articulado');
addC('TONOR TC-777 USB Microphone',
  'Fixed USB cable — not detachable',
  'Cable USB fijo — no desmontable');
addC('Maono PM461 USB Microphone',
  'No software or app support — hardware controls only',
  'Sin software ni app — solo controles físicos');
addC('Blue Yeti Nano USB Condenser Microphone',
  'VO!CE effects require G Hub software running',
  'Los efectos VO!CE exigen el software G Hub en segundo plano');
addP('Blue Yeti Nano USB Condenser Microphone',
  'Headphone output with volume for direct monitoring',
  'Salida de auriculares con volumen para monitorización directa');
addC('FIFINE T669 USB Microphone Kit',
  'Pop filter and arm are basic quality at this price',
  'Filtro y brazo de calidad básica a este precio');
addP('FIFINE T669 USB Microphone Kit',
  'Headphone jack for latency-free monitoring',
  'Salida de auriculares para monitorización sin latencia');

// ES glitches spotted while here
V('FIFINE AmpliGame A6V USB Gaming Microphone').pros_es =
  V('FIFINE AmpliGame A6V USB Gaming Microphone').pros_es.map(s =>
    s.replace('El mejor relación calidad-precio de su tipo', 'La mejor relación calidad-precio de su tipo'));
V('TONOR TC-777 USB Microphone').pros_es =
  V('TONOR TC-777 USB Microphone').pros_es.map(s =>
    s.replace('Unas 34.000 valoraciones — muy buenamente probado', 'Unas 34.000 valoraciones — ampliamente probado'));
V('FIFINE AmpliGame A6V USB Gaming Microphone').pros =
  V('FIFINE AmpliGame A6V USB Gaming Microphone').pros.map(s => s.trim());
V('Rode NT-USB Mini Studio Condenser Microphone').pros =
  V('Rode NT-USB Mini Studio Condenser Microphone').pros.map(s => s.trim());

fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
const gg = JSON.parse(fs.readFileSync('data/guides.json', 'utf8')).find(x => x.id === 'budget-usb-mics');
console.log('skipMedia s0: ' + gg.sections[0].skipMedia);
gg.verdictProsCons.forEach(v => console.log(' ' + v.name + ': p' + v.pros.length + '/c' + v.cons.length));
