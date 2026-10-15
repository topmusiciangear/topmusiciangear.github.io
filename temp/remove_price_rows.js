// Quita las filas de precio de TODAS las tablas del sitio.
// Motivo: la tabla comparativa es texto estatico en el HTML y no se adapta a la
// geolocalizacion, mientras que los botones si. Asi el lector europeo veia una
// tabla en dolares y un boton en euros en la misma pagina.
// Se conservan "Price Tier" quitando solo el importe (sigue diciendo la gama).
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gf = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gf, 'utf8'));

const QUITAR = /^(estimated price|precio estimado|price \(usd\)|price|precio)$/i;
let quitadas = 0, guiasTocadas = 0;

guides.forEach(g => {
  let n = 0;
  if (g.productTable && Array.isArray(g.productTable.rows)) {
    const antes = g.productTable.rows.length;
    g.productTable.rows = g.productTable.rows.filter(r => { const ok = !QUITAR.test(String(r.label || '').trim()); if (!ok) n++; return ok; });
    if (g.productTable.rows.length !== antes) guiasTocadas++;
  }
  if (g.comparison && Array.isArray(g.comparison.rows)) {
    const antes = g.comparison.rows.length;
    g.comparison.rows = g.comparison.rows.filter(r => { const ok = !QUITAR.test(String(r.label || '').trim()); if (!ok) n++; return ok; });
    if (g.comparison.rows.length !== antes) guiasTocadas++;
  }
  // Price Tier: quitar solo el importe, conservar la gama
  const limpiar = v => String(v).replace(/\s*\((?:under|from|about|<)?\s*[~$€£][^)]*\)\s*/gi, '').replace(/\s+/g,' ').trim();
  [g.productTable ? g.productTable.rows : null, g.comparison ? g.comparison.rows : null].forEach(rows => {
    if (!rows) return;
    rows.forEach(r => {
      if (/^price tier|^gama de precios$/i.test(String(r.label||'').trim())) {
        if (Array.isArray(r.values)) {
          r.values.forEach(v => { if (v && /\(.*[~$€£].*\)/.test(v.value)) { v.value = limpiar(v.value); if (v.value_es) v.value_es = limpiar(v.value_es); n++; } });
        }
      }
    });
  });
  if (n) { quitadas += n; console.log('  ' + g.id.padEnd(34) + ' -' + n + (n > 1 ? ' celdas' : ' fila/celda')); }
});

console.log('\nfilas de precio eliminadas: ' + quitadas + ' | guias tocadas: ' + guiasTocadas);

// ---- verificacion ----
console.log('\n--- verificacion ---');
let quedan = 0;
const RE_IMPORTE = /[~$€£]\s?[0-9]/;
guides.forEach(g => {
  const rows = (g.productTable ? g.productTable.rows : (g.comparison ? g.comparison.rows : [])) || [];
  rows.forEach(r => {
    if (QUITAR.test(String(r.label||'').trim())) { quedan++; console.log('   !! sigue la fila ' + r.label + ' en ' + g.id); }
    const vals = Array.isArray(r.values) ? r.values.map(v=>v.value) : Object.keys(r).filter(k=>/^val/.test(k)).map(k=>r[k]);
    vals.forEach(v => {
      if (v && RE_IMPORTE.test(v)) console.log('   ?? ' + g.id + ' | "' + r.label + '" -> "' + v + '"');
    });
  });
});
console.log('filas de precio que quedan: ' + quedan);

const sinFilas = guides.filter(g => (g.productTable && !g.productTable.rows.length) || (g.comparison && Array.isArray(g.comparison.rows) && !g.comparison.rows.length));
console.log('guias con tabla sin filas: ' + sinFilas.length + (sinFilas.length ? ' -> ' + sinFilas.map(g=>g.id).join(', ') : ''));

// comprobar que celdas == columnas
let desajuste = 0;
guides.forEach(g => {
  if (g.productTable) {
    const n = g.productTable.columns.length;
    g.productTable.rows.forEach(r => { if (r.values.length !== n) { desajuste++; console.log('   !! ' + g.id + ' / ' + r.label + ': ' + r.values.length + ' vs ' + n); } });
  }
  if (g.comparison && Array.isArray(g.comparison.rows)) {
    const cab = g.comparison.headers ? g.comparison.headers.length : ((g.featuredSnippet||{}).name1_en ? 2 : 0);
    if (cab) g.comparison.rows.forEach(r => {
      const claves = Object.keys(r).filter(k => /^val\d*$/.test(k));
      const nCols = cab === 2 ? 2 : Math.min(cab, 5);
      const esperadas = cab === 2 ? ['val1','val2'] : ['val','val2','val3','val4','val5'].slice(0, cab);
      esperadas.forEach(k => { if (r[k] === undefined) { desajuste++; console.log('   !! ' + g.id + ' / ' + r.label + ': falta ' + k); } });
    });
  }
});
console.log('celdas desajustadas: ' + desajuste);
const cjk = (JSON.stringify(guides).match(/[\u4e00-\u9fff]/g)||[]);
console.log('CJK: ' + (cjk.length ? [...new Set(cjk)].join('') : 'ninguno'));

if (quedan === 0 && desajuste === 0) { fs.writeFileSync(gf, JSON.stringify(guides, null, 2), 'utf8'); console.log('\nguides.json escrito'); }
else console.log('\nNO se escribe');