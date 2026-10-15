// starter-studio: 8 errores reportados + 2 hallados de paso (| suelto, specs del Rokit en ES)
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const F = BASE + 'data/guides.json';

const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const guia = g.find(x => x.id === 'starter-studio');

let aplicados = 0, fallidos = 0;
function cam(obj, viejo, nuevo, etiqueta) {
  const t = typeof obj === 'string' ? obj : JSON.stringify(obj);
  if (t.indexOf(viejo) < 0) { console.log('  FALTA  ' + etiqueta + ': "' + viejo.slice(0, 62) + '"'); fallidos++; return; }
  if (typeof obj === 'string') { guia.__obj = obj; }
  // aplicacion sobre el contenedor real
  if (typeof guia.__campo === 'string') { /* no usado */ }
  // hacemos la sustitucion en el lugar correspondiente
  if (Array.isArray(obj)) {
    const i = obj.findIndex(x => typeof x === 'string' && x.indexOf(viejo) > -1);
    if (i > -1) { obj[i] = obj[i].replace(viejo, nuevo); aplicados++; console.log('  ok  ' + etiqueta); return; }
  }
  console.log('  FALTA (array)  ' + etiqueta);
  fallidos++;
}

// ── 1) "te wish suerte" -> "te desea suerte" ──
const ag = guia.sections.find(s => (s.content_es || '').indexOf('te wish suerte') > -1);
if (ag) { ag.content_es = ag.content_es.replace('te wish suerte', 'te desea suerte'); aplicados++; console.log('  ok  1) te wish suerte -> te desea suerte'); }
else { fallidos++; console.log('  FALTA 1)'); }

// ── 2) "necessary Adelantan" (resto del ingles) ──
const sm = guia.sections.find(s => (s.content_es || '').indexOf('Necessary Adelantan') > -1);
if (sm) {
  sm.content_es = sm.content_es.replace(
    'El mismo cardioide y el mismo pico de presencia que Necessary Adelantan una guitarra también retroceden una voz principal contra un PA potente',
    'El mismo cardioide y el mismo pico de presencia que hacen avanzar una guitarra también hacen retroceder una voz principal contra un PA potente');
  aplicados++; console.log('  ok  2) "necessary Adelantan" eliminado');
} else { fallidos++; console.log('  FALTA 2)'); }

// ── 3) "serves" -> "sirven" (veredicto MDR-7506) ──
const vm = guia.verdictProsCons.find(v => (v.pros_es || []).some(p => p.indexOf('serves') > -1));
if (vm) {
  vm.pros_es = vm.pros_es.map(p => p.replace('también serves para grabar', 'también sirven para grabar'));
  aplicados++; console.log('  ok  3) serves -> sirven');
} else { fallidos++; console.log('  FALTA 3)'); }

// ── 4) woofer de ocho pulgadas -> specs reales (EN ya corregido: 7", tweeter 1", 145 W) ──
const rok = guia.sections.find(s => (s.content_es || '').indexOf('woofer de ocho pulgadas') > -1);
if (rok) {
  rok.content_es = rok.content_es.replace(
    'La caja de siete pulgadas monta un woofer de ocho pulgadas de Kevlar trenzado y un midrange de cuatro, biamplificado a 140 vatios.',
    'La caja de siete pulgadas monta un woofer de aramida de Kevlar trenzado de 7 pulgadas y un tweeter de cúpula de seda de 1 pulgada, biamplificado a 145 vatios en total: 97 para el grave y 48 para el agudo.');
  aplicados++; console.log('  ok  4) specs del Rokit corregidos en ES (8"->7", midrange 4" -> tweeter 1", 140 W -> 145 W)');
} else { fallidos++; console.log('  FALTA 4)'); }

// ── 5) "250 ohms of ruggedness" / "250 ohmios de robustez" -> spec inventada, EN y ES ──
const sm2 = guia.sections.find(s => (s.content_es || '').indexOf('250 ohmios') > -1);
if (sm2) {
  sm2.content = sm2.content.replace(
    '250 ohms of ruggedness, a windscreen that has survived decades of being dropped, and a price that makes buying two a sensible decision rather than a extravagance.',
    'A body that has survived decades of being dropped, a windscreen to match, and a price that makes buying two a sensible decision rather than an extravagance.');
  sm2.content_es = sm2.content_es.replace(
    '250 ohmios de robustez, un antiviento que ha sobrevivido décadas de caídas y un precio que hace que comprar dos sea sensato y no un capricho.',
    'Un cuerpo que ha sobrevivido décadas de caídas, un antiviento a su altura y un precio que hace que comprar dos sea sensato y no un capricho.');
  aplicados++; console.log('  ok  5) "250 ohmios de robustez" eliminada en EN y ES (spec inventada)');
} else { fallidos++; console.log('  FALTA 5)'); }

// ── 6) "ampliador pequeno" -> "amplificador pequeno" ──
const mdr = guia.sections.find(s => (s.content_es || '').indexOf('un ampliador pequeño') > -1);
if (mdr) {
  mdr.content_es = mdr.content_es.replace('puede hacer falta un ampliador pequeño', 'puede hacer falta un amplificador pequeño');
  aplicados++; console.log('  ok  6) ampliador -> amplificador');
} else { fallidos++; console.log('  FALTA 6)'); }

// ── 7) "por traduccion" -> mal sentido; EN tambien ──
if (mdr) {
  mdr.content = mdr.content.replace(
    'Buy it for translation, not for comfort',
    'Buy it for what it tells you about your mix, not for comfort');
  mdr.content_es = mdr.content_es.replace(
    'Cómpralo por traducción, no por comodidad',
    'Cómpralo por lo que te dice de tu mezcla, no por comodidad');
  aplicados++; console.log('  ok  7) "por traducción" corregido en EN y ES');
} else { fallidos++; console.log('  FALTA 7)'); }

// ── 8) "plana, honesta, sin color." tras punto -> mayuscula ──
const m20 = guia.sections.find(s => (s.content_es || '').indexOf('plana, honesta, sin color.') > -1);
if (m20) {
  m20.content_es = m20.content_es.replace('que carga el M50x.</strong> plana, honesta, sin color.', 'que carga el M50x.</strong> Plana, honesta, sin color.');
  aplicados++; console.log('  ok  8) "plana" -> "Plana" tras el punto');
} else { fallidos++; console.log('  FALTA 8)'); }

// ── 9) "|" suelto en la seccion Auto Gain ──
if (ag) {
  const antes = ag.content_es;
  ag.content_es = ag.content_es.replace('120 dB de rango dinámico: cifras de| líder de su categoría', '120 dB de rango dinámico: cifras de líder de su categoría');
  console.log(ag.content_es !== antes ? '  ok  9) "|" suelto eliminado' : '  --   9) no habia "|" (ya limpio)');
}

// ── 10) "a extravagance" -> "an extravagance" (EN) ──
if (sm2) {
  sm2.content = sm2.content.replace('rather than a extravagance', 'rather than an extravagance');
  console.log('  ok  10) "a extravagance" -> "an extravagance"');
}

delete guia.__obj; delete guia.__campo;

fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + aplicados + ' | fallidos: ' + fallidos);
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
