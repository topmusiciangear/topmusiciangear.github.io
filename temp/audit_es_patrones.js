// AUDIT ES PROFUNDO: patrones de calco, spanglish y formato (solo lectura)
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const g = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

const PATRONES = [
  // [regexFuente, etiqueta, nota]
  ['\\bvia\\b(?![\\w/])', 'via sin tilde', 'vía / a través de'],
  ['\\bperformance\\b', 'performance', 'rendimiento'],
  ['\\bworkflow\\b', 'workflow', 'flujo de trabajo'],
  ['\\bsetup\\b', 'setup', 'configuración / equipo'],
  ['\\bbundle\\b', 'bundle', 'pack / paquete'],
  ['\\bbudget\\b', 'budget en ES', 'presupuesto / económico'],
  ['\\bcheap\\b', 'cheap en ES', 'barato / económico'],
  ['\\baffordable\\b', 'affordable', 'asequible'],
  ['\\bhigh-end\\b|\\blow-end\\b', 'high/low-end', 'gama alta/baja'],
  ['\\bentry-level\\b', 'entry-level', 'gama de entrada'],
  ['\\bflagship\\b', 'flagship', 'buque insignia'],
  ['\\bmust-have\\b|\\bmust have\\b', 'must-have', 'imprescindible'],
  ['\\bdeal-breaker\\b', 'deal-breaker', 'motivo de descarte'],
  ['\\bgame changer\\b', 'game changer', 'cambio radical'],
  ['\\bdeep dive\\b', 'deep dive', 'análisis a fondo'],
  ['\\bhands-on\\b', 'hands-on', 'práctica / en mano'],
  ['\\bno-brainer\\b', 'no-brainer', 'decisión fácil'],
  ['\\bcaballo[s]? de batalla\\b', 'caballo de batalla (prohibido)', '—'],
  ['\\bsweet spot\\b', 'sweet spot en ES', 'punto ideal'],
  ['\\bpunto justo\\b', 'punto justo', 'punto ideal'],
  ['\\bheadroom\\b', 'headroom', 'margen dinámico'],
  ['\\bsoundstage\\b', 'soundstage', 'escena sonora'],
  ['\\bimaging\\b', 'imaging', 'imagen (estéreo)'],
  ['\\broom modes\\b', 'room modes', 'modos de sala'],
  ['\\bflutter\\b', 'flutter sin traducir', 'eco flotante'],
  ['\\bvalue for money\\b', 'value for money', 'relación calidad-precio'],
  ['\\bout of the box\\b', 'out of the box', 'nada más sacarlo de la caja'],
  ['\\bcheckea\\b|\\bchequea\\b', 'checkea', 'comprueba'],
  ['\\brankea\\b', 'rankea', 'clasifica'],
  ['\\bsample rate\\b', 'sample rate', 'frecuencia de muestreo'],
  ['\\bbit depth\\b', 'bit depth', 'profundidad de bits'],
  ['\\bnoise floor\\b', 'noise floor', 'ruido de fondo / umbral'],
  ['\\bcrossover\\b', 'crossover', 'cruce / divisor'],
  ['\\bboomy\\b|\\bboxy\\b', 'boomy/boxy', 'retumbante / encajonado'],
  ['\\bmuddy\\b', 'muddy', 'embarrado / con barro'],
  ['\\bharsh\\b', 'harsh', 'áspero / agresivo'],
  ['\\bpunchy\\b', 'punchy', 'contundente / con pegada'],
  ['\\bcrisp\\b', 'crisp', 'nítido'],
  ['\\bsilky\\b', 'silky', 'aterciopelado'],
  ['\\bairy\\b', 'airy', 'aéreo'],
  ['\\bscooped\\b', 'scooped', 'con medios recortados'],
  ['\\bclean\\b', 'clean como adjetivo ES', 'limpio'],
  ['\\bflat\\b', 'flat en ES', 'plana'],
  ['\\bdeal\\b', 'deal en ES', 'oferta'],
  ['\\bbeast\\b|\\bkiller\\b|\\binsane\\b', 'beast/killer/insane', 'marketing ingles'],
  ['\\bpremium\\b', 'premium', 'de gama alta'],
  ['\\bgama top\\b|\\bestudios top\\b', 'top como adjetivo', 'punteros / gama alta'],
  ['\\bclick\\b', 'click', 'clic'],
  ['\\bshipping\\b', 'shipping', 'envío'],
  ['\\bwarranty\\b', 'warranty', 'garantía'],
  ['\\bpre-order\\b|\\bpreorder\\b', 'pre-order', 'reserva'],
  ['\\bcheckout\\b', 'checkout', 'pago / caja'],
  ['\\breview\\b', 'review en ES', 'reseña / análisis'],
  ['\\bgig\\b', 'gig', 'concierto / actuación'],
  ['\\bhype\\b', 'hype', 'expectación / bombo'],
  ['\\ben lugar de con\\b', 'en lugar de con', 'en lugar de'],
  ['\\bsobrevivible\\b', 'sobrevivible', 'se puede tolerar'],
  ['\\bdepurar\\b', 'depurar (cables)', 'diagnosticar'],
  ['\\bempastre\\b', 'empastre', 'barro'],
  ['\\bexplosivas\\b', 'explosivas', 'plosivas'],
  ['\\boclusiv', 'oclusiva', 'plosiva'],
  ['\\bDoppler\\b', 'Doppler', 'filtro de escritorio'],
  ['\\bde con procesamiento\\b|\\bde con mandos\\b', 'de con', 'de'],
  ['\\bcabe destacar\\b', 'cabe destacar (relleno IA)', '—'],
  ['\\bes importante tener en cuenta\\b', 'es importante... (relleno IA)', '—'],
  ['\\bPairéalo\\b', 'Pairéalo', 'Combínalo'],
  ['\\bcompingando\\b', 'compingando', 'haciendo el comping'],
  ['\\bpotencienciador\\b', 'potencienciador (typo)', 'potenciador'],
  ['\\blosELO\\b', 'losELO (pegado roto)', '—'],
  ['\\bdB-A\\b', 'dB-A', 'dBA'],
  ['\\btiers\\b', 'tiers en ES', 'niveles']
];

const HITS = [];
g.forEach(gg => {
  const t = JSON.stringify(gg);
  PATRONES.forEach(([re, et, sug]) => {
    const rx = new RegExp('.{0,60}' + re + '.{0,60}', 'gi');
    const m = [...t.matchAll(rx)];
    if (m.length) HITS.push({ guia: gg.id, patron: et, n: m.length, sug, ejs: [...new Set(m.map(x => x[0].replace(/<[^>]+>/g, ' ').replace(/\\"/g, '"').replace(/\s+/g, ' ').trim().slice(0, 130)))].slice(0, 3) });
  });
});
console.log('guias: ' + g.length + '  patrones: ' + PATRONES.length);
console.log('combinaciones guia+patron con hits: ' + HITS.length);
console.log('hits totales: ' + HITS.reduce((a, h) => a + h.n, 0));
// agrupar por patron
const porPatron = {};
HITS.forEach(h => { porPatron[h.patron] = porPatron[h.patron] || { n: 0, guias: [] }; porPatron[h.patron].n += h.n; porPatron[h.patron].guias.push(h.guia); });
console.log('\n=== POR PATRON (top) ===');
Object.entries(porPatron).sort((a, b) => b[1].n - a[1].n).slice(0, 30).forEach(([k, v]) =>
  console.log('  ' + String(v.n).padStart(4) + '  ' + k.padEnd(28) + v.guias.length + ' guias'));
fs.writeFileSync(B + 'temp/audit_es_patrones.json', JSON.stringify(HITS, null, 1));
console.log('\ndetalle en temp/audit_es_patrones.json');
