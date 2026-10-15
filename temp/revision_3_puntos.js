// Revision de las 3 correcciones propuestas
const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const s = g.find(x => x.id === 'starter-studio');
const log = [];

function enGuia(campo, de, a) {
  const antes = s[campo];
  if (typeof antes !== 'string') { log.push('  ?     ' + campo + ' no es texto'); return; }
  if (!antes.includes(de)) { log.push('  FALLA ' + campo + ': no encontre el texto original'); return; }
  s[campo] = antes.split(de).join(a);
  log.push('  ok    ' + campo);
}
function enSeccion(i, campo, de, a) {
  enGuia('tmp', de, a); // no usado
  const sec = s.sections[i];
  if (!sec[campo].includes(de)) { log.push('  FALLA seccion[' + i + '].' + campo + ': texto original no encontrado'); return; }
  sec[campo] = sec[campo].split(de).join(a);
  log.push('  ok    seccion[' + i + '].' + campo);
}

/* ── PUNTO 1 · la geometria del escritorio (NO se cambia el escritorio, se aclara) ──
   Razon: el escritorio esta DEBAJO del tweeter, y por eso mismo la dispersion vertical
   estrecha es la que lo corrige. Cambiarlo por "estudio domestico" rompe la causa. */
enSeccion(1, 'content',
  'the waveguide throws the high frequencies sideways instead of back off your desk, which is the single biggest colouration problem a bedroom has.',
  'the waveguide throws the high frequencies sideways instead of down onto the desk surface beneath the speaker, which is where desk reflection — the single most common colouration in a home studio — comes from.');

enSeccion(1, 'content_es',
  'y la guía de onda lanza los agudos hacia los lados en lugar de rebotarlos contra tu escritorio, que es la coloración más típica de un dormitorio.',
  'y la guía de onda lanza los agudos hacia los lados en lugar de mandarlos contra la superficie del escritorio que hay bajo el tweeter, que es de donde viene la reflexión de la mesa: la coloración más habitual en un estudio doméstico.');

enSeccion(6, 'content',
  'so energy goes out into the room rather than down onto the surface behind the speaker and straight back at your ears.',
  'so energy goes out across the room rather than down onto the desk beneath the speaker and straight back up at your ears.');

enSeccion(6, 'content_es',
  'así que la energía sale hacia la sala en vez de caer contra la superficie de detrás del monitor y volver de rebote a tus oídos.',
  'así que la energía sale hacia la sala en vez de caer contra el escritorio que hay bajo el monitor y volver de rebote a tus oídos.');

/* ── PUNTO 2 · el antipop (el NT1 Signature YA TRAE uno de serie) ──
   Verificado en rode.com: "Studio-grade shock mount and pop filter ... included".
   El SM6 lleva el filtro antipop integrado. No hay nada que anadir al Nivel 1,
   pero si que hay que arreglar la frase del Nivel 3 que daba a entender que los
   niveles de abajo compraban un filtro aparte. */
enSeccion(1, 'content',
  'with an integrated pop screen that makes the $49 filter in the lower tiers redundant',
  'with an integrated pop screen that turns the optional pop filter of the lower tiers into a purchase you can skip');
enSeccion(1, 'content',
  'with an integrated pop screen that makes the filter in the lower tiers redundant',
  'with an integrated pop screen that turns the optional pop filter of the lower tiers into a purchase you can skip');

enSeccion(1, 'content_es',
  'con un antipop integrado que hace innecesario el filtro de los niveles de abajo',
  'con un antipop integrado que convierte el filtro antipop opcional de los niveles de abajo en una compra que te puedes ahorrar');
enSeccion(1, 'content_es',
  'con un antipop integrado que hace innecesario el filtro de $49 que sí necesitan los niveles de abajo',
  'con un antipop integrado que convierte el filtro antipop opcional de los niveles de abajo en una compra que te puedes ahorrar');

/* ── PUNTO 3 · puerto trasero del HS8 (VERIFICADO) ──
   mixonline: "The cabinet's rear-firing port"; Les Numeriques: "La face arriere
   accueille l'event du bass reflex"; Audio Appraisal: "rear ported enclosures,
   can't be placed against a wall". Manual oficial: al menos 1,5 m de las paredes. */
enSeccion(7, 'content',
  'The trade is physical: 250 by 390 by 334 mm and 10.2 kg each. This is a speaker that wants depth on the desk and distance from the wall behind it, and it is the first thing in this guide that will refuse to fit in a cramped corner.',
  'The trade is physical, and it is written on the back panel. The reflex port fires out of the rear, which is why Yamaha asks for at least 1.5 metres between the speakers and any wall or corner. The cabinet is 250 by 390 by 334 mm and 10.2 kg each. That is the exact opposite of the front-ported Eris Studio 5 in the first tier, which can sit a few centimetres from a wall without penalty, and it is why the HS8 is the first thing in this guide that will refuse to fit a cramped corner.');

enSeccion(7, 'content_es',
  'El precio es físico: 250 por 390 por 334 mm y 10.2 kg cada uno. Es un altavoz que quiere fondo de escritorio y distancia de la pared de detrás, y es lo primero de esta guía que se negará a caber en un rincón apretado.',
  'El precio es físico, y está escrito en la parte de atrás. El puerto de graves dispara por la cara posterior, y por eso Yamaha pide al menos 1,5 metros entre los monitores y cualquier pared o esquina. La caja mide 250 por 390 por 334 mm y pesa 10.2 kg cada una. Es justo lo contrario del Eris Studio 5 del primer nivel, que es de puerto frontal y puede colocarse a pocos centímetros de una pared sin penalización, y por eso el HS8 es lo primero de esta guía que se negará a caber en un rincón apretado.');

/* ── Misma imprecision en la guia de monitores ── */
const g2 = g.find(x => x.id === 'best-monitors-for-small-rooms');
let fuera = 0;
g2.sections.forEach(sec => {
  if (sec.content && /surface behind the speaker/.test(sec.content)) {
    sec.content = sec.content.replace(/refusing to spray off the desk surface behind the speaker/,
      'refusing to spray down onto the desk surface beneath it');
    fuera++;
  }
  if (sec.content_es && /superficie de detrás del monitor/.test(sec.content_es)) {
    sec.content_es = sec.content_es.replace(/esparcir por la superficie del escritorio que tiene detrás/,
      'esparcir contra el escritorio que tiene debajo');
    fuera++;
  }
});
log.push('  ok    best-monitors-for-small-rooms: ' + fuera + ' frase(s) con la misma geometria corregida');

fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log(log.join('\n'));

/* CONTROL */
const s2 = JSON.parse(fs.readFileSync(F, 'utf8')).find(x => x.id === 'starter-studio');
const txt = JSON.stringify(s2);
console.log('\n=== CONTROL ===');
console.log('  "behind the speaker" / "detrás del monitor" : ' + (txt.match(/behind the speaker|detrás del monitor/g) || []).length + ' (debe ser 0)');
console.log('  "bajo el tweeter" / "beneath the speaker"    : ' + (txt.match(/beneath the speaker|bajo el tweeter/g) || []).length);
console.log('  "puerto trasero" / "rear" en la sec. [7]    : ' + (/rear-firing port/.test(s2.sections[7].content) && /puerto de graves dispara por la cara posterior/.test(s2.sections[7].content_es) ? 'si, EN y ES' : 'NO'));
console.log('  1,5 m / 1.5 metros                            : ' + (/1\.5 metres/.test(s2.sections[7].content) && /1,5 metros/.test(s2.sections[7].content_es) ? 'si, EN y ES' : 'NO'));
console.log('  antipop opcional                              : ' + (/optional pop filter/.test(s2.sections[1].content) && /filtro antipop opcional/.test(s2.sections[1].content_es) ? 'si, EN y ES' : 'NO'));
console.log('  queda "$49 filter"                            : ' + (txt.match(/\$49 filter|filtro de \$49/g) || []).length);
console.log('  mojibake                                      : ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
