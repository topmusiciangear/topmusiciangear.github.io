// beatmaker-plugins: la tabla y los veredictos tienen 5, pero la guia tiene 6 productos.
// Se anade Excite Audio Motion: Harmonic (6a columna + veredicto 4+4) y se corrige
// el nombre viejo "D16 Repeater" -> "D16 Group Repeater Delay".
// Specs: excite-audio.com/motionharmonic
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gf = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gf, 'utf8'));
const b = fs.readFileSync(BASE+'build-guides.js','utf8');
const g = guides.find(x => x.id === 'beatmaker-plugins');
const c = g.comparison;

const pb = id => {
  const m = b.match(new RegExp('(^|\\n)\\s*' + id + ':\\s*\\{[\\s\\S]*?\\n\\s*\\},','m'));
  const p = m && m[0].match(/pluginboutique:\s*"([^"]+)"/);
  return p ? p[1] : null;
};
const PRECIO = { 375: pb(375), 377: pb(377), 382: pb(382), 387: pb(387), 392: pb(392), 394: pb(394) };
console.log('precios Plugin Boutique: ' + JSON.stringify(PRECIO));

// ---- 1. cabecera 6 + nombre viejo del D16 ----
console.log('\nheaders ANTES (' + c.headers.length + '): ' + c.headers.join(' | '));
c.headers[4] = 'D16 Group Repeater Delay';
if (c.headers.indexOf('Excite Audio Motion: Harmonic') < 0) c.headers.push('Excite Audio Motion: Harmonic');
console.log('headers DESPUES (' + c.headers.length + '): ' + c.headers.join(' | '));

// ---- 2. valores de la columna 6 (Motion: Harmonic) ----
const V = {
  'Estimated Price': [PRECIO[394], PRECIO[394]],
  'Type':            ['Distortion / bitcrush / filter', 'Distorsión / bitcrush / filtro'],
  'Main Use':        ['Harmonic distortion, filter sweeps', 'Distorsión armónica, barridos de filtro'],
  'Tracks':          ['Per-instance', 'Por instancia'],
  'Best For':        ['Movement and evolving texture on beats', 'Movimiento y textura cambiante en los beats'],
};
c.rows.forEach(r => {
  const v = V[r.label];
  if (v) { r.val6 = v[0]; r.val6_es = v[1]; }
});
console.log('columna 6 añadida en ' + c.rows.filter(r => r.val6).length + ' de ' + c.rows.length + ' filas');

// ---- 3. precios de la fila con los valores reales de Plugin Boutique ----
const fp = c.rows.find(r => r.label === 'Estimated Price');
if (fp) {
  fp.val = PRECIO[375]; fp.val2 = PRECIO[377]; fp.val3 = PRECIO[382]; fp.val4 = PRECIO[387]; fp.val5 = PRECIO[392];
  ['val','val2','val3','val4','val5','val6'].forEach(k => { fp[k + '_es'] = fp[k]; });
  console.log('precios: ' + JSON.stringify({ val: fp.val, val2: fp.val2, val3: fp.val3, val4: fp.val4, val5: fp.val5, val6: fp.val6 }));
}

// ---- 4. veredicto del D16 con el nombre actual + veredicto nuevo ----
const viD16 = g.verdictProsCons.findIndex(v => v.name === 'D16 Repeater' || v.name === 'D16 Group Repeater Delay');
if (viD16 > -1) { g.verdictProsCons[viD16].name = 'D16 Group Repeater Delay'; if (g.verdictProsCons[viD16].title !== undefined) g.verdictProsCons[viD16].title = 'D16 Group Repeater Delay'; console.log('veredicto D16 renombrado'); }

if (!g.verdictProsCons.some(v => v.name === 'Excite Audio Motion: Harmonic')) {
  g.verdictProsCons.push({
    name: 'Excite Audio Motion: Harmonic',
    name_es: 'Excite Audio Motion: Harmonic',
    pros: [
      'Six macro sliders can be assigned to any parameter, so you automate movement instead of dialling it in',
      'Distortion blends tape, tube and fuzz characters into one continuous control',
      'Bitcrusher, peak filter and LP/HP filter in a single plug-in covers most of what a beat needs for grit',
      'Audio-reactive envelope makes the effect respond to the beat without any sidechain setup'
    ],
    cons: [
      'The Hexagon controller takes practice — it is not a set-and-forget plug-in',
      'Drawing cursor paths is fun on screen and slow in a session with a deadline',
      'No presets built for lo-fi or boom-bap specifically, they are generic and experimental',
      'Peak filter and bitcrush add CPU load for what is essentially a colour effect'
    ],
    pros_es: [
      'Seis macros asignables a cualquier parámetro: automatizas el movimiento en vez de ajustarlo a mano',
      'La distorsión mezcla，国务院 smoothly tape, tube y fuzz en un único control continuo',
      'Bitcrusher, filtro de picos y LP/HP en un solo plugin cubren casi todo lo que un beat necesita para ensuciarlo',
      'La envolvente reactiva al audio hace que el efecto responda al beat sin montar sidechain'
    ],
    cons_es: [
      'El controlador hexagonal requiere práctica: no es un plugin de configurar y olvidar',
      'Dibujar rutas del cursor entretiene en pantalla y ralentiza una sesión con fecha de entrega',
      'No trae presets específicos de lo-fi ni boom-bap, son genéricos y experimentales',
      'El filtro de picos y el bitcrush añaden carga de CPU para lo que es, en el fondo, un efecto de color'
    ]
  });
  // corregir un texto que se me coló en español
  const v = g.verdictProsCons[g.verdictProsCons.length - 1];
  v.pros_es[1] = 'La distorsión mezcla de forma continua los caracteres tape, tube y fuzz en un único control';
  console.log('veredicto de Motion: Harmonic añadido (4/4 EN+ES)');
}

fs.writeFileSync(gf, JSON.stringify(guides, null, 2), 'utf8');

// ---- verificacion ----
const P = JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
const arr = Array.isArray(P) ? P : P.products;
const titles = arr.map(p => p.title);
const ids = new Set();
(g.featuredProducts||[]).forEach(i=>ids.add(i));
g.sections.forEach(s=>(s.products||[]).forEach(i=>ids.add(i)));
console.log('\n--- RESULTADO ---');
console.log('productos en la guia : ' + ids.size);
console.log('columnas de tabla    : ' + c.headers.length);
console.log('veredictos           : ' + g.verdictProsCons.length);
console.log('cabeceras fuera del catalogo: ' + c.headers.filter(h => titles.indexOf(h) < 0).join('; ') || 'ninguna');
console.log('veredictos fuera del catalogo: ' + g.verdictProsCons.filter(v => titles.indexOf(v.name) < 0).map(v=>v.name).join('; ') || 'ninguno');
c.rows.forEach(r => console.log('  ' + r.label.padEnd(18) + ' | ' + ['val','val2','val3','val4','val5','val6'].filter(k=>r[k]!==undefined).map(k=>r[k]).join(' | ')));
const cjk = (JSON.stringify(g).match(/[\u4e00-\u9fff]/g)||[]);
console.log('CJK en la guia: ' + (cjk.length ? [...new Set(cjk)].join('') : 'ninguno'));