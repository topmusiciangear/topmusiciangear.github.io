const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = G.find(x => x.id === 'best-5-string-basses');
const V = (value, value_es) => ({ value, value_es });
let s = JSON.stringify(g);
const R = [
  // intro
  ['Doce bajos de cinco cuerdas en tres gamas, spec por spec verificadas.', 'Doce bajos de cinco cuerdas en tres gamas, con cada spec verificada.'],
  ['premium (más de $1.300) para insignias de estudio.', 'premium (más de $1.300) para buques insignia de estudio.'],
  // sec0
  ['con concesiones audibles en los bordes.', 'con concesiones que se escuchan.'],
  ['compra Si graves definitivos: geometría multiescala', 'accede a Si graves definitivos: geometría multiescala'],
  // sec1
  ['Activa el boost y el Si grave gana peso genuino — la entrada hecha bien.', 'Al activar el boost, el Si grave gana peso genuino — una entrada bien resuelta.'],
  // sec3
  ['aún el estirón económico inteligente.', 'sigue siendo el salto económico inteligente.'],
  // sec6
  ['Encuerda a través del cuerpo para máximo sustain del Si o top-load para ataque.', 'El encordado a través del cuerpo da máximo sustain del Si; el top-load da ataque.'],
  // sec7
  ['Nota: descontinuado a favor de la SR505A, caza stock restante.', 'Nota: descontinuado a favor de la SR505A, toca cazar stock restante.'],
  // sec8
  ['La madera varía por acabado (álamo o arce blando) — el tono no.', 'La madera varía por acabado (álamo o arce blando) — el tono, no.'],
  // sec13
  ['Para puntos de partida por presupuesto revisa', 'Para opciones por presupuesto, revisa'],
  // table
  ['Tilo (Jabon)', 'Tilo (jabón)'],
  ['unión miter 6 tornillos', 'unión inglete 6 tornillos'],
  ['Boost Phat II (2Vol+Tono)', 'Boost Phat II (2 volúmenes+Tono)'],
  ['Vol+Balance+2 bandas + Perf EQ 5 posic.', 'Vol+Balance+2 bandas + Perf EQ 5 posiciones'],
  ['New Gen 4 perillas activa + push/pull', 'Activa New Gen 4 perillas + push/pull'],
  // verdicts
  ['Mástil fino GSR5 recibe conversos de 4 cuerdas', 'Mástil fino GSR5 acoge a conversos de 4 cuerdas'],
  ['Spacing 16,5 mm mantiene estiramientos cuerdos', 'Spacing 16,5 mm mantiene estiramientos razonables'],
  ['Las pasivas piden el boost activado para gruñir', 'Las pasivas requieren el boost activado para gruñir'],
  ['Previo 2 bandas 9V moldea funk y rock rápido', 'Previo 2 bandas 9V moldea funk y rock con rapidez'],
  ['Mástil C fino recibe manos pequeñas', 'Mástil C fino acoge manos pequeñas'],
  ['Comprable ahora en zzounds y Andertons', 'Disponible ahora en zzounds y Andertons'],
  ['Unión miter 6 tornillos, cuerda B rocosa', 'Unión inglete 6 tornillos, cuerda B sólida como roca'],
  ['Descontinuado: caza stock restante o usado', 'Descontinuado: toca cazar stock restante o usado'],
  ['El switch de medios pide leer el manual', 'El switch de medios requiere leer el manual'],
  ['Pastillas alnico diseñadas por Fender, totalmente pasivo', 'Pastillas alnico diseñadas por Fender, totalmente pasivas'],
  ['Solo enlace G4M deslistado verificado en tiendas', 'Solo enlace G4M deslistado verificado'],
  ['El poliéster brillo muestra swirls', 'El poliéster brillo muestra remolinos'],
  ['Cuerpo chambered, grafito, trastes inox', 'Cuerpo aligerado, grafito, trastes inox'],
  ['Funda, rampa y bloqueos incluidos', 'Funda, rampa y cierres incluidos'],
  ['La ergonomía headless divide tradicionalistas', 'La ergonomía headless divide a los tradicionalistas'],
  ['Solo G4M verificado en tiendas', 'Solo G4M verificado'],
  ['Solo preorder Andertons verificado en tiendas', 'Solo preorder Andertons verificado'],
  ['Los trastes abanico piden adaptar la izquierda', 'Los trastes abanico requieren adaptar la mano izquierda'],
  // faq
  ['Principiantes mejor pasivo; músicos de bolo aprovechan la EQ activa.', 'Para principiantes, mejor pasivo; los músicos de bolo aprovechan la EQ activa.']
];
let fails = [];
R.forEach(([a, b]) => {
  const ae = a.split('"').join('\\"'), be = b.split('"').join('\\"');
  if (!s.includes(ae)) { fails.push(a.slice(0, 55)); return; }
  s = s.split(ae).join(be);
});
// FAQ q5/a swap fix (EN+ES, guide + snippet)
let g2 = JSON.parse(s);
const gg = g2.id === 'best-5-string-basses' ? g2 : null;
const f5 = gg.faq.find(f => /Gen 2 or New Gen|Gen 2 o New Gen/.test(f.q) || /Gen 2 or New Gen|Gen 2 o New Gen/.test(f.a_es));
if (f5) {
  const qEN = 'Sire V7 Gen 2 or New Gen?', aEN = 'Gen 2 runs 18 volts across two 9V batteries with a fuller control set — buy used if you find one. New Gen streamlines to a 4-knob preamp with stainless frets and Edgeless board, £729 new at Andertons. Same V7 platform, simpler workflow.';
  const qES = '¿Sire V7 Gen 2 o New Gen?', aES = 'La Gen 2 corre 18 voltios en dos pilas 9V con más controles — cómprala usada si aparece. La New Gen simplifica a previo de 4 perillas con trastes inox y diapasón Edgeless, £729 nueva en Andertons. Misma plataforma V7, flujo más simple.';
  f5.q = qEN; f5.a = aEN; f5.q_es = qES; f5.a_es = aES;
  const sn = gg.featuredSnippet;
  sn.faq_q5_en = qEN; sn.faq_a5_en = aEN; sn.faq_q5_es = qES; sn.faq_a5_es = aES;
}
// Active/Passive row after Electronics
const rows = gg.productTable.rows;
const ei = rows.findIndex(r => r.label === 'Electronics');
rows.splice(ei + 1, 0, { label: 'Active / Passive', values: [
  V('Active (Phat II boost)', 'Activo (boost Phat II)'),
  V('Active 9V (2-band)', 'Activo 9V (2 bandas)'),
  V('Active (2-band + Perf EQ)', 'Activo (2 bandas + Perf EQ)'),
  V('Passive', 'Pasivo'),
  V('Active/passive (push/pull)', 'Activo/pasivo (push/pull)'),
  V('Passive', 'Pasivo'),
  V('Active (3-band + bypass)', 'Activo (3 bandas + bypass)'),
  V('Passive', 'Pasivo'),
  V('Passive', 'Pasivo'),
  V('Active 18V (3-band)', 'Activo 18V (3 bandas)'),
  V('Active (Vari-mid + bypass)', 'Activo (Vari-mid + bypass)'),
  V('Active/passive (EMG)', 'Activo/pasivo (EMG)')
]});
fs.writeFileSync('data/guides.json', JSON.stringify(gg.__x || G.map(x => x.id === gg.id ? gg : x), null, 2));
console.log('fails: ' + fails.length);
fails.forEach(f => console.log('  MISS: ' + f));
console.log('rows: ' + gg.productTable.rows.map(r => r.label).join(' / '));
