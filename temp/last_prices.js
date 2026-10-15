// Ultimos 4 imports que quedaban dentro de celdas descriptivas.
// Se reescriben con texto natural en vez de dejar la cifra suelta.
const fs = require('fs');
const f = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const guides = JSON.parse(fs.readFileSync(f, 'utf8'));

// [guia, etiqueta de fila, texto viejo, texto nuevo EN, texto nuevo ES]
const CAMBIOS = [
  ['monitor-setup', 'Best For',
   'Budget decoupling for small nearfields; 5 angles, $39.99 pack of 4',
   'Budget decoupling for small nearfields; 5 angles, sold as a 4-pack',
   'Desacoplo económico para nearfields pequeños; 5 ángulos, se vende en pack de 4'],
  ['fx-plugins', 'Key Feature',
   'Authentic Juno-106 chorus, 2 modes, $49',
   'Authentic Juno-106 chorus, 2 modes',
   'Coro auténtico del Juno-106, 2 modos'],
  ['best-condenser-mics', 'Best For',
   'Transformer warmth under $300',
   'Transformer warmth without the pro-tier price tag',
   'Calidez de transformador sin precio de gama profesional'],
  ['pro-tools-vs-cubase', 'Pricing Model',
   'Subscription $299/yr or $599 perpetual (Studio)',
   'Subscription or perpetual licence (Studio)',
   'Licencia por suscripción o perpetua (Studio)'],
];

let n = 0;
CAMBIOS.forEach(([gid, etiqueta, viejo, nuevoEN, nuevoES]) => {
  const g = guides.find(x => x.id === gid);
  const filas = (g.productTable ? g.productTable.rows : (g.comparison ? g.comparison.rows : [])) || [];
  const fila = filas.find(r => String(r.label||'').trim() === etiqueta);
  if (!fila) { console.log('!! ' + gid + ': no existe la fila "' + etiqueta + '"'); return; }
  const targets = Array.isArray(fila.values)
    ? fila.values
    : Object.keys(fila).filter(k => /^val\d*$/.test(k)).map(k => ({ v: fila[k], set: x => { fila[k] = x; } }));
  let hit = 0;
  targets.forEach(t => {
    const val = Array.isArray(t) ? t : (t.v || '');
    if (String(val).indexOf(viejo) > -1) {
      if (Array.isArray(t)) { t[0] = nuevoEN; t[1] = nuevoES; }
      else { t.set(nuevoEN); t.set(nuevoES); }
      hit++; n++;
    }
  });
  console.log((hit ? 'OK  ' : '!!  ') + gid + ' / ' + etiqueta + ': ' + hit + ' celda(s)');
});

// ---- verificacion ----
const RE = /[$€£]\s?[0-9]/;
let restos = 0;
guides.forEach(g => {
  const filas = (g.productTable ? g.productTable.rows : (g.comparison ? g.comparison.rows : [])) || [];
  filas.forEach(r => {
    const vals = Array.isArray(r.values)
      ? r.values.map(v => (v.value||'') + ' || ' + (v.value_es||''))
      : Object.keys(r).filter(k=>/^val\d*$/.test(k)).map(k => (r[k]||'') + ' || ' + (r[k+'_es']||''));
    vals.forEach(v => { if (RE.test(v)) { restos++; console.log('   !! ' + g.id + ' | "' + r.label + '" -> "' + v.trim() + '"'); } });
  });
});
console.log('\nimportes en tablas: ' + restos);

let desajuste = 0;
guides.forEach(g => {
  if (g.productTable) { const n2 = g.productTable.columns.length; g.productTable.rows.forEach(r => { if (r.values.length !== n2) { desajuste++; console.log('   !! ' + g.id + ' / ' + r.label); } }); }
});
console.log('celdas desajustadas: ' + desajuste);
const cjk = (JSON.stringify(guides).match(/[\u4e00-\u9fff]/g)||[]);
console.log('CJK: ' + (cjk.length ? [...new Set(cjk)].join('') : 'ninguno'));

if (restos === 0 && desajuste === 0 && n === CAMBIOS.length) { fs.writeFileSync(f, JSON.stringify(guides, null, 2), 'utf8'); console.log('\nguides.json escrito'); }
else console.log('\nNO se escribe');