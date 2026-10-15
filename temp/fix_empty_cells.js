// Rellena las 18 celdas vacias y corrige las cabeceras genericas de MG vs Xenyx.
// Datos: Plugin Boutique (precios), catalogs de Excite/Baby Audio/iZotope/TE,
// specs oficiales teenage.engineering/guides/ep-133 (conectividad y pila).
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gf = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gf, 'utf8'));
const b = fs.readFileSync(BASE + 'build-guides.js', 'utf8');
const pb = id => { const m = b.match(new RegExp('(^|\\n)\\s*'+id+':\\s*\\{[\\s\\S]*?\\n\\s*\\},','m')); const p = m && m[0].match(/pluginboutique:\s*"([^"]+)"/); return p ? p[1] : null; };
const G = id => guides.find(x => x.id === id);

// ---------- 1. beatmaker-plugins: Baby Audio Transit 2 ----------
{
  const c = G('beatmaker-plugins').comparison;
  const VALS = {
    'Type':     ['Transition FX with motion modes', 'FX de transición con modos de movimiento'],
    'Main Use': ['Transitions, rhythmic FX motion', 'Transiciones, movimiento rítmico de FX'],
    'Tracks':   ['Per-instance', 'Por instancia'],
    'Best For': ['Filling gaps between sections', 'Rellenar huecos entre secciones'],
  };
  let n = 0;
  c.rows.forEach(r => { const v = VALS[r.label]; if (v) { r.val2 = v[0]; r.val2_es = v[1]; n++; } });
  console.log('beatmaker-plugins: ' + n + ' celdas de Baby Audio Transit 2 rellenadas');
}

// ---------- 2. ai-tools-plugins: precios + iZotope Neutron 5 ----------
{
  const c = G('ai-tools-plugins').comparison;
  const PRE = [pb(383), pb(381), pb(385), pb(384), pb(386)];
  const fp = c.rows.find(r => r.label === 'Estimated Price');
  ['val','val2','val3','val4','val5'].forEach((k, i) => { fp[k] = PRE[i]; fp[k + '_es'] = PRE[i]; });
  console.log('ai-tools-plugins: fila de precios -> ' + JSON.stringify(PRE));

  const N5 = {
    'Type':       ['AI mixing suite (8 modules)', 'Suite de mezcla con IA (8 módulos)'],
    'AI Features':['Masking detection, automatic EQ and balance', 'Detección de enmascaramiento, EQ y balance automáticos'],
    'Tracks':     ['Multi-track', 'Multitrack'],
    'Best For':   ['Fast, repeatable mix decisions', 'Decisiones de mezcla rápidas y repetibles'],
  };
  let n = 0;
  c.rows.forEach(r => { const v = N5[r.label]; if (v) { r.val2 = v[0]; r.val2_es = v[1]; n++; } });
  console.log('ai-tools-plugins: ' + n + ' celdas de iZotope Neutron 5 rellenadas');
}

// ---------- 3. best-hardware-samplers: Connectivity + Battery ----------
{
  const t = G('best-hardware-samplers').productTable;
  const idx = n => t.columns.findIndex(c => c.title === n);
  const set = (label, colTitle, en, es) => {
    const r = t.rows.find(x => x.label === label);
    const j = idx(colTitle);
    if (!r) { console.log('   !! no existe la fila ' + label); return; }
    if (j < 0) { console.log('   !! no existe la columna ' + colTitle); return; }
    r.values[j] = { value: en, value_es: es };
  };
  // teenage.engineering/guides/ep-133 -> line in/out 3.5mm, sync, MIDI, USB-C, 4x AAA
  set('Connectivity', 'Teenage Engineering EP-133 K.O. II',
      '3.5mm line in/out, sync, MIDI in/out, USB-C, built-in mic',
      'Entrada/salida de línea de 3,5 mm, sync, MIDI in/out, USB-C, micrófono integrado');
  set('Battery', 'Teenage Engineering EP-133 K.O. II', '4x AAA or USB-C bus power', '4 pilas AAA o alimentación por USB-C');
  set('Connectivity', 'Akai MPC Live III',
      'USB-C, MIDI in/out, built-in mic and speakers',
      'USB-C, MIDI in/out, micrófono y altavoces integrados');
  set('Battery', 'Akai MPC Live III', 'Rechargeable battery', 'Batería recargable');
  set('Connectivity', 'Polyend Tracker Mini',
      'Built-in mic, stereo line I/O, USB-C',
      'Micrófono integrado, E/S de línea estéreo, USB-C');
  set('Battery', 'Polyend Tracker Mini', 'Up to 8 hours', 'Hasta 8 horas');
  console.log('best-hardware-samplers: 6 celdas rellenadas (3 productos x 2 filas)');
}

// ---------- 4. MG vs Xenyx: cabeceras genericas -> modelos ----------
// En las guias "vs" el build saca los titulos de featuredSnippet.name1_en/name2_en
{
  const g = G('yamaha-mg-vs-behringer-xenyx');
  const f = g.featuredSnippet;
  console.log('MG vs Xenyx ANTES  EN: ' + f.name1_en + ' | ' + f.name2_en + '   ES: ' + f.name1_es + ' | ' + f.name2_es);
  f.name1_en = 'Yamaha MG10XU';  f.name1_es = 'Yamaha MG10XU';
  f.name2_en = 'Behringer Xenyx X1222USB'; f.name2_es = 'Behringer Xenyx X1222USB';
  console.log('MG vs Xenyx DESPUES EN: ' + f.name1_en + ' | ' + f.name2_en + '   ES: ' + f.name1_es + ' | ' + f.name2_es);
}

fs.writeFileSync(gf, JSON.stringify(guides, null, 2), 'utf8');

// ---------- verificacion: repetir el escaneo de celdas vacias ----------
console.log('\n--- reverificando celdas vacias en todo el sitio ---');
let vacias = 0;
guides.forEach(g => {
  if (g.comparison && g.comparison.headers && g.comparison.headers.length) {
    const n = g.comparison.headers.length;
    g.comparison.rows.forEach(r => {
      for (let j = 1; j <= n; j++) {
        const k = 'val' + (j === 1 ? '' : j);
        if (r[k] === undefined || String(r[k]).trim() === '') { vacias++; console.log('   !! ' + g.id + ' | ' + g.comparison.headers[j-1] + ' | ' + r.label); }
      }
    });
  }
  if (g.comparison && !Array.isArray(g.comparison.headers) && Array.isArray(g.comparison.rows)) {
    const f = g.featuredSnippet || {};
    const n = (f.name1_en && f.name2_en) ? 2 : ((g.verdictProsCons||[]).length === 2 ? 2 : 0);
    if (n === 2) g.comparison.rows.forEach(r => {
      ['val1','val2'].forEach((k, j) => {
        if (r[k] === undefined || String(r[k]).trim() === '') { vacias++; console.log('   !! ' + g.id + ' | ' + (j===0?f.name1_en:f.name2_en) + ' | ' + r.label); }
      });
    });
  }
  if (g.productTable && g.productTable.columns) {
    g.productTable.rows.forEach(r => g.productTable.columns.forEach((c, j) => {
      if (!r.values[j] || String(r.values[j].value || '').trim() === '') { vacias++; console.log('   !! ' + g.id + ' | ' + c.title + ' | ' + r.label); }
    }));
  }
});
console.log('celdas vacias que quedan: ' + vacias);
const cjk = (JSON.stringify(guides).match(/[\u4e00-\u9fff]/g) || []);
console.log('CJK: ' + (cjk.length ? [...new Set(cjk)].join('') : 'ninguno'));