// 13 correcciones verificadas contra el texto actual.
// Cada una cita el problema y la razon.
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gf = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gf, 'utf8'));
const g = guides.find(x => x.id === 'starter-studio');

// ═══ 1) KRK: woofer de 8" -> 7" (verificado en krkmusic.com: 7" woven Kevlar,
//        97W LF + 48W HF = 145W, 110 dB max SPL). El 8" es el Rokit 8.
const FIX_KRK_ANTES = 'El KRK Rokit 7 G5 tiene un woofer de 8 pulgadas de Kevlar trenzado y potencia de verdad — el más con autoridad de esta lista — pero ponlo contra una pared desnuda y el bajo volverá rebotando y te mentirá.';
const FIX_KRK_DESPUES = 'El KRK Rokit 7 G5 monta un woofer de 7 pulgadas de fibra de Kevlar trenzada y 145 vatios de amplificación Clase D — el componente con más autoridad de esta lista — pero ponlo contra una pared desnuda y el bajo rebotará contra ti y te mentirá.';

// El EN tambien dice "8-inch woven Kevlar woofer" -> corregir a 7
const FIX_KRK_EN_ANTES = 'The 7-inch cabinet carries an 8-inch woven Kevlar woofer and a 4-inch midrange, bi-amped at 140 watts.';
const FIX_KRK_EN_DESPUES = 'The cabinet carries a 7-inch woven Kevlar aramid woofer and a 1-inch silk-dome tweeter, bi-amped at 145 watts total — 97 on the low end, 48 on the high.';

// ═══ 2) "es la misma interfaz" -> aclara que el Definitivo salta a la SSL
const FIX_IGUAL_ANTES = 'El Definitivo por $905 es la misma interfaz, el condensador NT1 Signature, el MDR-7506 estándar de radiodifusión, y monitores de verdad — un par de KRK Rokit 7 G5.';
const FIX_IGUAL_DESPUES = 'El Definitivo por $905 da el salto a la SSL 2+ MKII —la misma del nivel intermedio—, cambia el condensador por el NT1 Signature, cambia los auriculares por el MDR-7506 estándar de radiodifusión y añade monitores de verdad: un par de KRK Rokit 7 G5.';

// ═══ 3) nombre completo de la interfaz: SSL 2+ -> SSL 2+ MKII
const FIX_SSL_ANTES = 'La 2i2 y la SSL 2+ dan las dos dos preamplificadores de micrófono y conversión de 24 bits.';
const FIX_SSL_DESPUES = 'La Scarlett 2i2 4th Gen y la SSL 2+ MKII ofrecen dos preamplificadores de micrófono y conversión de 24 bits cada una.';
const FIX_4K_ANTES = 'El botón 4K Legacy de la SSL 2+ MKII activa';
const FIX_4K_DESPUES = 'El botón 4K Legacy de la SSL 2+ MKII activa'; // ya correcto

// ═══ 5) soporte: "para que el micro no esté en tu mano" -> natural
const FIX_STAND_ANTES = 'un soporte para que el micro no esté en tu mano';
const FIX_STAND_DESPUES = 'un soporte para no tener que sostener el micrófono en la mano';

// ═══ 6) "la que nadie presupuesta" -> "la que casi nadie presupuesta"
const FIX_PRESUP_ANTES = 'La sala es la última pieza y la que nadie presupuesta.';
const FIX_PRESUP_DESPUES = 'La sala es la última pieza, y la que casi nadie presupuesta.';

// ═══ 7) "Monitores que no puedes saltarte" -> no calco
const FIX_SKIP_ANTES = 'Monitores que no puedes saltarte (y los que sí)';
const FIX_SKIP_DESPUES = 'Monitores que no puedes ignorar (y los que sí)';

// ═══ 8) "no son trapping de graves" -> "trampas de graves"
const FIX_TRAP_ANTES = 'Diez centímetros de espuma no son trapping de graves.';
const FIX_TRAP_DESPUES = 'Diez centímetros de espuma no son trampas de graves.';

// ═══ 9) "deshace el micrófono" -> "arruina el rendimiento"
const FIX_CABLE_ANTES = 'un cable que zumba o atenúa los agudos deshace el micrófono por el que pagaste';
const FIX_CABLE_DESPUES = 'un cable que zumba o atenúa los agudos arruina el rendimiento del micrófono por el que pagaste';

// ═══ 10) "para dar forma tú" -> cierre gramatical
const FIX_SHAPE_ANTES = 'Si quieres una captura neutra para dar forma tú, la transparencia de la Scarlett gana.';
const FIX_SHAPE_DESPUES = 'Si quieres una captura neutra y darte forma tú mismo en la mezcla, la transparencia de la Scarlett gana.';

// ═══ 11) falta la preposicion "A"
// ═══ 12) "volverá rebotando" -> "rebotará"  (ya cubierto en FIX_KRK)

const REGLAS = [
  // [etiqueta, campo, antes, despues]
  ['KRK 7" woofer (ES)', 'secMonitores', FIX_KRK_ANTES, FIX_KRK_DESPUES],
  ['KRK 7" woofer (EN)', 'secMonitoresEN', FIX_KRK_EN_ANTES, FIX_KRK_EN_DESPUES],
  ['"misma interfaz" aclarada', 'secBudgets', FIX_IGUAL_ANTES, FIX_IGUAL_DESPUES],
  ['nombre SSL completo', 'secInterfaces', FIX_SSL_ANTES, FIX_SSL_DESPUES],
  ['soporte natural', 'secBudgets', FIX_STAND_ANTES, FIX_STAND_DESPUES],
  ['"casi nadie presupuesta"', 'secChain', FIX_PRESUP_ANTES, FIX_PRESUP_DESPUES],
  ['"no puedes ignorar"', 'headMonitores', FIX_SKIP_ANTES, FIX_SKIP_DESPUES],
  ['"trampas de graves"', 'secRoom', FIX_TRAP_ANTES, FIX_TRAP_DESPUES],
  ['"arruina el rendimiento"', 'secLast100', FIX_CABLE_ANTES, FIX_CABLE_DESPUES],
  ['"darte forma tú mismo"', 'secInterfaces', FIX_SHAPE_ANTES, FIX_SHAPE_DESPUES]
];

// localizar cada seccion por su heading para no depender del indice
const SEC = {
  secChain:       g.sections.find(s=>/Start With the Signal Chain/.test(s.heading)),
  secBudgets:     g.sections.find(s=>/Three Budgets/.test(s.heading)),
  secInterfaces:  g.sections.find(s=>/Why a \$299/.test(s.heading)),
  secDyn:         g.sections.find(s=>/Dynamic vs the Condenser/.test(s.heading)),
  secMonitores:   g.sections.find(s=>/Monitors You Cannot/.test(s.heading)),
  secRoom:        g.sections.find(s=>/Treat the Room/.test(s.heading)),
  secLast100:     g.sections.find(s=>/Where to Spend/.test(s.heading))
};

let ok = 0, fallos = [];
REGLAS.forEach(([etiqueta, campo, antes, despues])=>{
  let aplicado = false;
  if (campo === 'headMonitores') {
    if (SEC.secMonitores && SEC.secMonitores.heading_es === antes) { SEC.secMonitores.heading_es = despues; aplicado = true; }
  } else {
    const s = SEC[campo];
    if (s && typeof s.content_es === 'string' && s.content_es.indexOf(antes) > -1) {
      s.content_es = s.content_es.split(antes).join(despues); aplicado = true;
    }
    if (campo === 'secMonitoresEN' && s && s.content.indexOf(antes) > -1) {
      s.content = s.content.split(antes).join(despues); aplicado = true;
    }
  }
  if (aplicado) { ok++; console.log('  OK   ' + etiqueta); }
  else { fallos.push(etiqueta); console.log('  FALLA ' + etiqueta + '  (no encontrado)'); }
});

// ═══ 12) "A un micrófono dinámico" — falta la preposicion ═══
const dyn = SEC.secDyn;
if (dyn && dyn.content_es.indexOf('Un micrófono dinámico como el SM57 no le importa') > -1) {
  dyn.content_es = dyn.content_es.replace(
    'Un micrófono dinámico como el SM57 no le importa lo ruidosa que esté la sala.',
    'A un micrófono dinámico como el SM57 no le importa lo ruidosa que esté la sala.'
  );
  ok++; console.log('  OK   "A un micrófono dinámico" (preposicion)');
} else { fallos.push('preposicion A'); console.log('  FALLA preposicion A'); }

// EN equivalente: "A dynamic mic like the SM57" ya lleva la A implicita, no cambia

fs.writeFileSync(gf, JSON.stringify(guides, null, 2), 'utf8');
console.log('\naplicadas: ' + ok + ' / ' + REGLAS.length + '+1');
if (fallos.length) console.log('fallos: ' + fallos.join(', '));

// ═══ VERIFICACION: ningun problema debe quedar ═══
const s = JSON.stringify(g);
const CHECKS = [
  ['woofer de 8 pulgadas', /woofer de 8 pulgadas/i],
  ['8-inch woven Kevlar woofer', /8-inch woven Kevlar woofer/i],
  ['las dos dos', /las dos dos/i],
  ['para dar forma tú,', /para dar forma tú,/i],
  ['la que nadie presupuesta', /la que nadie presupuesta/i],
  ['no puedes saltarte', /no puedes saltarte/i],
  ['el más con autoridad', /el más con autoridad/i],
  ['trapping de graves', /trapping de graves/i],
  ['deshace el micrófono', /deshace el micrófono/i],
  ['volverá rebotando', /volverá rebotando/i],
  ['es la misma interfaz', /es la misma interfaz/i],
  ['para que el micro no esté en tu mano', /para que el micro no esté en tu mano/i]
];
console.log('\n=== ¿QUEDAN PROBLEMAS? ===');
let quedan = 0;
CHECKS.forEach(([label, re])=>{ if(s.match(re)) { quedan++; console.log('  !! ' + label); } });
console.log(quedan===0 ? '  ninguno' : quedan + ' pendientes');
const cjk = (s.match(/[\u4e00-\u9fff]/g)||[]);
console.log('CJK: ' + (cjk.length ? [...new Set(cjk)].join('') : 'ninguno'));