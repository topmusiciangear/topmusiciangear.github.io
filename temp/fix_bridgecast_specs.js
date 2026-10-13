const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === 'bridge-cast-x-vs-rodecaster-pro2');
if (!g) throw new Error('guia no encontrada');

// Guardia: confirmar la orientacion de columnas ANTES de escribir nada.
// val1 = Bridge Cast X (name1), val2 = RØDECaster (name2). Verificado arriba.
if (!/Bridge Cast X/.test(g.featuredSnippet.name1_en)) throw new Error('name1 no es el Bridge Cast X: abortando');
if (!/RØDECaster/.test(g.featuredSnippet.name2_en)) throw new Error('name2 no es el RØDECaster: abortando');

const BRIDGE = 'Bridge Cast X';
const RODEC = 'RØDECaster Pro II';

const PRE_EN = 'Not published — input range -87 to -12 dBu (max 0 dBu), 8 kΩ impedance';
const PRE_ES = 'No publicado — rango de entrada de -87 a -12 dBu (máx 0 dBu), impedancia de 8 kΩ';
const REC_EN = 'No standalone recorder — 2 mix buses (Stream + Personal) on separate USB outputs, 24-bit AD/DA with 32-bit float internal processing';
const REC_ES = 'Sin grabador independiente — 2 buses de mezcla (Stream + Personal) en salidas USB separadas, AD/DA de 24 bits con procesamiento interno en 32 bits flotantes';

const RODEC_PRE_EN = '76dB Revolution, -131.5dBV EIN';
const RODEC_PRE_ES = '76dB Revolution, -131.5dBV EIN';
const RODEC_REC_EN = 'Multitrack/stereo to microSD, USB or computer';
const RODEC_REC_ES = 'Multitrack/estéreo a microSD, USB u ordenador';

const log = [];
let fail = 0;

// ============================================================
// 1) comparison.rows
// ============================================================
[['Mic Preamps', PRE_EN, PRE_ES, RODEC_PRE_EN, RODEC_PRE_ES],
 ['Recording', REC_EN, REC_ES, RODEC_REC_EN, RODEC_REC_ES]].forEach(([label, bEn, bEs, rEn, rEs]) => {
  const row = g.comparison.rows.find(r => r.label === label);
  if (!row) { console.log('[!!] fila no encontrada: ' + label); fail++; return; }
  console.log(label + '  [ANTES]  val1=' + row.val1 + '  |  val2=' + row.val2);
  row.val1 = bEn; row.val1_es = bEs;      // Bridge Cast X
  row.val2 = rEn; row.val2_es = rEs;      // RØDECaster (inalterado, reasignado para blindar)
  console.log(label + '  [DESPUES] val1=' + row.val1 + '  |  val2=' + row.val2);
  log.push('comparison.rows / ' + label);
});

// ============================================================
// 2) featuredSnippet.specs
// ============================================================
[['Mic Preamps', PRE_EN, PRE_ES, RODEC_PRE_EN, RODEC_PRE_ES],
 ['Recording', REC_EN, REC_ES, RODEC_REC_EN, RODEC_REC_ES]].forEach(([label, bEn, bEs, rEn, rEs]) => {
  const s = (g.featuredSnippet.specs || []).find(x => x.label_en === label);
  if (!s) { console.log('[!!] spec no encontrada: ' + label); fail++; return; }
  console.log('specs.' + label + '  [ANTES]  val1=' + s.val1 + '  |  val2=' + s.val2);
  s.val1 = bEn;
  s.val2 = rEn;
  console.log('specs.' + label + '  [DESPUES] val1=' + s.val1 + '  |  val2=' + s.val2);
  log.push('featuredSnippet.specs / ' + label);
});

// ============================================================
// 3) FAQ 3: el criterio se mantiene, ahora citando la ficha tecnica real
// ============================================================
const f = g.featuredSnippet;
f.faq_a3_en = "The RØDECaster Pro II is the safer choice for an SM7B: its 76dB Revolution preamps with -131.5dBV EIN drive the mic cleanly with no external booster, plus APHEX processing on every channel. Roland publishes no gain figure for the Bridge Cast X — its spec sheet lists only the input level range (-87 to -12 dBu, max 0 dBu) and an 8 kΩ input impedance — so there is no comparable clean-gain claim to put next to those 76dB.";
f.faq_a3_es = "El RØDECaster Pro II es la opción más segura para un SM7B: sus previos Revolution de 76dB con -131.5dBV EIN mueven el micro limpiamente sin booster externo, más procesado APHEX en cada canal. Roland no publica ninguna cifra de ganancia para el Bridge Cast X: su ficha técnica solo recoge el rango de nivel de entrada (-87 a -12 dBu, máx 0 dBu) y una impedancia de entrada de 8 kΩ, así que no hay un reclamo de ganancia limpia comparable que poner al lado de esos 76dB.";
log.push('FAQ 3 EN+ES: ahora cita los datos reales de la ficha oficial de Roland');

// ============================================================
// 4) VERIFICACION DE ORIENTACION antes de escribir
// ============================================================
const preRow = g.comparison.rows.find(r => r.label === 'Mic Preamps');
const recRow = g.comparison.rows.find(r => r.label === 'Recording');
const checks = [
  ['Mic Preamps col1 es del Bridge Cast X', /8 kΩ/.test(preRow.val1)],
  ['Mic Preamps col2 sigue siendo el RØDECaster', /76dB Revolution/.test(preRow.val2)],
  ['Recording col1 es del Bridge Cast X', /32-bit float internal processing/.test(recRow.val1)],
  ['Recording col2 sigue siendo el RØDECaster', /microSD/.test(recRow.val2)],
  // Ojo: "70dB" YA aparece legitimamente en verdictProsCons[0].cons como NEGACION
  // ("no hay reclamo de 70dB limpios"). Lo que no debe existir es una AFIRMACION
  // positiva de 70 dB de ganancia en las filas de la tabla ni en la FAQ 3.
  ['tablas sin afirmacion de 70 dB de ganancia', !/70 ?dB/.test(preRow.val1) && !/70 ?dB/.test(recRow.val1)],
  ['el contra del Bridge Cast X sigue siendo una negacion', /no 70dB/.test(g.verdictProsCons[0].cons[3]) && /no hay reclamo de 70dB/.test(g.verdictProsCons[0].cons_es[3])],
  ['FAQ3 dice que Roland no publica ganancia', /publishes no gain figure/.test(f.faq_a3_en) && /no publica ninguna cifra de ganancia/.test(f.faq_a3_es)]
];
console.log('');
checks.forEach(([n, ok]) => { if (!ok) fail++; console.log('  ' + (ok ? 'OK  ' : '[!!] ') + n); });

if (fail) { console.log('\nABORTADO por ' + fail + ' fallo(s). No se escribe nada.'); process.exit(1); }

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
console.log('\nESCRITO. ' + log.length + ' cambios:');
log.forEach(l => console.log('  - ' + l));