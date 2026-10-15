// Limpia los restos de importe en "Price Tier" y el "Mid-Range" sin traducir
const fs = require('fs');
const f = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const guides = JSON.parse(fs.readFileSync(f, 'utf8'));

const limpia = v => String(v)
  .replace(/\s*\((?:under|from|about|over|más de|menos de|less than|from|up to|hasta)?\s*[~$€£][^)]*\)\s*/gi, '')
  .replace(/\s+/g, ' ').trim();

let n = 0;
guides.forEach(g => {
  const rows = (g.productTable ? g.productTable.rows : (g.comparison ? g.comparison.rows : [])) || [];
  rows.forEach(r => {
    if (!/^price tier|^gama de precios$/i.test(String(r.label||'').trim())) return;
    if (Array.isArray(r.values)) {
      r.values.forEach(v => {
        if (!v) return;
        if (/[~$€£]/.test(v.value)) { v.value = limpia(v.value); n++; }
        if (v.value_es && /[~$€£]/.test(v.value_es)) { v.value_es = limpia(v.value_es); n++; }
        // "Mid-Range" sin traducir en la version ES
        if (v.value_es && /^mid-range$/i.test(v.value_es.trim())) { v.value_es = 'Medio'; n++; }
      });
    }
  });
});
console.log('celdas de "Price Tier" corregidas: ' + n);

// verificacion: ningun importe en las tablas
const RE = /[$€£]\s?[0-9]/;
let restos = 0;
guides.forEach(g => {
  const rows = (g.productTable ? g.productTable.rows : (g.comparison ? g.comparison.rows : [])) || [];
  rows.forEach(r => {
    const vals = Array.isArray(r.values)
      ? r.values.map(v => (v.value||'') + ' || ' + (v.value_es||''))
      : Object.keys(r).filter(k=>/^val\d*$/.test(k)).map(k => (r[k]||'') + ' || ' + (r[k+'_es']||''));
    vals.forEach(v => { if (RE.test(v)) { restos++; console.log('   !! ' + g.id + ' | "' + r.label + '" -> "' + v.trim() + '"'); } });
  });
});
console.log('\nimportes que quedan en tablas: ' + restos);

// integridad final
let desajuste = 0, sinFilas = 0;
guides.forEach(g => {
  if (g.productTable) {
    const n = g.productTable.columns.length;
    if (!g.productTable.rows.length) { sinFilas++; console.log('   !! ' + g.id + ' con productTable sin filas'); }
    g.productTable.rows.forEach(r => { if (r.values.length !== n) { desajuste++; console.log('   !! ' + g.id + ' / ' + r.label + ': ' + r.values.length + ' vs ' + n); } });
  }
});
console.log('celdas desajustadas: ' + desajuste + ' | guias con tabla sin filas: ' + sinFilas);

if (restos === 0 && desajuste === 0) { fs.writeFileSync(f, JSON.stringify(guides, null, 2), 'utf8'); console.log('\nguides.json escrito'); }
else console.log('\nNO se escribe');