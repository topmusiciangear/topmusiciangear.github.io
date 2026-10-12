var fs = require('fs');
var p = 'data/guides.json';
var d = JSON.parse(fs.readFileSync(p, 'utf8'));

// 1. Fix best-keyboard hub FAQ Q6
var hub = d.find(function(x){return x.id==='best-keyboard'});
if (hub && hub.featuredSnippet) {
  var fsn = hub.featuredSnippet;
  fsn.faq_q6_es = '¿Qué teclado compro para tocar en directo en lugar de en casa?';
  fsn.faq_a6_es = 'En el escenario mandan el peso ligero, las divisiones de teclado (splits), los setlists organizados y las salidas directas a la PA. Nuestra guía te muestra los mejores modelos para directo, desde el Nord Electro 7 de 9,2 kg hasta las estaciones de trabajo (workstations) insignia. Si es para casa, prioriza el tacto de las teclas y los altavoces integrados.';
  console.log('Fixed best-keyboard hub FAQ Q6');
}

// 2. Fix best-stage-keyboards FAQs
var stage = d.find(function(x){return x.id==='best-stage-keyboards'});
if (stage && stage.featuredSnippet) {
  var fsn = stage.featuredSnippet;
  
  // Q1 - weight
  fsn.faq_q1_es = '¿Cuánto debe pesar un teclado para tocar en directo?';
  fsn.faq_a1_es = 'El peso ideal está entre 8 y 14 kg: lo bastante ligero para llevarlo en un viaje con funda. Las workstations insignia de 88 teclas (Montage M8x, Fantom 8 EX) pesan 27–28 kg y exigen soporte firme, flight case y un compañero dispuesto.';
  
  // Q2 - XLR
  fsn.faq_q2_es = '¿Necesito salidas XLR en un teclado de directo?';
  fsn.faq_a2_es = 'Ayudan mucho: la salida XLR va directo a la mesa de sala sin caja DI y con menos ruido en tiradas largas. RD-2000 EX, YC88, Montage M8x, Fantom 8 EX y Grandstage X las traen; Stage 4, Electro 7, AstroLab y CK88 no.';
  
  // Q3 - two-tier rig, change "bolos" to "conciertos"
  fsn.faq_q3_es = '¿Merece la pena un rig de doble piso en directo?';
  fsn.faq_a3_es = 'Un teclado cubre la mayoría de conciertos en salas. Los profesionales en sets largos usan dos pisos: un 88 contrapesado (Stage 4, RD-2000 EX) abajo para pianos y un 61 ligero (Electro 7, sinte) arriba para órgano y solos. Mira la sección de la regla del doble piso en esta guía.';
  
  console.log('Fixed best-stage-keyboards FAQs Q1-Q3');
}

// 3. Replace all "bolos" -> "conciertos" in guides.json (ES fields only)
function fixBolos(obj) {
  if (typeof obj === 'string') {
    return obj.replace(/\bbolos\b/g, 'conciertos');
  }
  if (Array.isArray(obj)) {
    return obj.map(fixBolos);
  }
  if (obj && typeof obj === 'object') {
    var out = {};
    for (var k in obj) {
      // Only fix Spanish fields or content fields that might have Spanish text
      if (typeof obj[k] === 'string' && (k.endsWith('_es') || k.includes('es') || k.includes('content') || k.includes('desc'))) {
        out[k] = fixBolos(obj[k]);
      } else {
        out[k] = fixBolos(obj[k]);
      }
    }
    return out;
  }
  return obj;
}

var fixed = fixBolos(d);
fs.writeFileSync(p, JSON.stringify(fixed, null, 2));
console.log('Replaced all "bolos" -> "conciertos"');
console.log('Done');