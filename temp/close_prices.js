// Cierre: precios fuera de las tablas
//  a) "Price Tier" sin importes (el guion anterior no llego a escribir)
//  b) 3 celdas descriptivas con precio incrustado
const fs = require('fs');
const f = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const guides = JSON.parse(fs.readFileSync(f, 'utf8'));

const limpia = v => String(v)
  .replace(/\s*\((?:under|over|from|about|less than|up to|más de|menos de|de|hasta)?\s*[$€£~][^)]*\)\s*/gi, '')
  .replace(/\s+/g, ' ').trim();

let tier = 0;
// ---- a) Price Tier: quitar importes y traducir restos ----
guides.forEach(g => {
  const filas = (g.productTable ? g.productTable.rows : (g.comparison ? g.comparison.rows : [])) || [];
  filas.forEach(r => {
    if (!/^price tier|^gama de precios$/i.test(String(r.label||'').trim())) return;
    if (Array.isArray(r.values)) {
      r.values.forEach(v => {
        if (!v) return;
        if (/[$€£]/.test(v.value))   { v.value   = limpia(v.value);   tier++; }
        if (v.value_es && /[$€£]/.test(v.value_es)) { v.value_es = limpia(v.value_es); tier++; }
        if (v.value_es && /^mid-range$/i.test(v.value_es.trim())) { v.value_es = 'Medio'; tier++; }
      });
    } else {
      Object.keys(r).filter(k => /^val\d*$/.test(k)).forEach(k => {
        if (r[k] && /[$€£]/.test(r[k])) { r[k] = limpia(r[k]); tier++; }
        const es = k + '_es';
        if (r[es] && /[$€£]/.test(r[es])) { r[es] = limpia(r[es]); tier++; }
        if (r[es] && /^mid-range$/i.test(r[es].trim())) { r[es] = 'Medio'; tier++; }
      });
    }
  });
});
console.log('celdas de "Price Tier" sin importe: ' + tier);

// ---- b) celdas descriptivas con precio incrustado ----
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
   'Suscripción anual o perpetua (Studio)'],
];
let n = 0;
CAMBIOS.forEach(([gid, etiqueta, viejo, nuevoEN, nuevoES]) => {
  const g = guides.find(x => x.id === gid);
  const filas = (g.productTable ? g.productTable.rows : (g.comparison ? g.comparison.rows : [])) || [];
  const fila = filas.find(r => String(r.label||'').trim() === etiqueta);
  if (!fila) { console.log('!! ' + gid + ': no existe la fila "' + etiqueta + '"'); return; }
  let hit = 0;
  if (Array.isArray(fila.values)) {
    fila.values.forEach(v => {
      if (!v) return;
      if (String(v.value).indexOf(viejo) > -1)     { v.value = nuevoEN; v.value_es = nuevoES; hit++; }
      else if (String(v.value_es||'').indexOf(viejo) > -1) { v.value = nuevoEN; v.value_es = nuevoES; hit++; }
    });
  } else {
    Object.keys(fila).filter(k => /^val\d*$/.test(k)).forEach(k => {
      if (String(fila[k]).indexOf(viejo) > -1) { fila[k] = nuevoEN; fila[k+'_es'] = nuevoES; hit++; }
    });
  }
  console.log((hit ? 'OK  ' : '!!  ') + gid + ' / ' + etiqueta + ': ' + hit + ' celda(s)');
  n += hit;
});
console.log('celdas descriptivas reescritas: ' + n);

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
console.log('\nimportes que quedan en tablas: ' + restos);

let desajuste = 0, sinFilas = 0;
guides.forEach(g => {
  if (g.productTable) {
    const nc = g.productTable.columns.length;
    if (!g.productTable.rows.length) { sinFilas++; }
    g.productTable.rows.forEach(r => { if (r.values.length !== nc) { desajuste++; console.log('   !! ' + g.id + ' / ' + r.label + ': ' + r.values.length + ' vs ' + nc); } });
  }
});
console.log('celdas desajustadas: ' + desajuste + ' | guias con productTable sin filas: ' + sinFilas);
const cjk = (JSON.stringify(guides).match(/[\u4e00-\u9fff]/g)||[]);
console.log('CJK: ' + (cjk.length ? [...new Set(cjk)].join('') : 'ninguno'));

if (restos === 0 && desajuste === 0 && sinFilas === 0 && n === CAMBIOS.length) { fs.writeFileSync(f, JSON.stringify(guides, null, 2), 'utf8'); console.log('\nguides.json escrito'); }
else console.log('\nNO se escribe');