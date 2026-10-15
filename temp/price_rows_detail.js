const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));

// 1) que contiene "Price Tier"?
['best-condenser-mics','best-5-string-basses'].forEach(id => {
  const r = guides.find(g=>g.id===id).productTable.rows.find(x=>/Price Tier/i.test(x.label));
  console.log(id + ' > ' + r.label + ': ' + r.values.map(v=>v.value).join(' | '));
});
['monitor-setup','best-digital-pianos'].forEach(id => {
  const r = guides.find(g=>g.id===id).productTable.rows.find(x=>/^price/i.test(x.label) && !/tier/i.test(x.label));
  console.log(id + ' > ' + r.label + ': ' + r.values.map(v=>v.value).join(' | '));
});

// 2) el SPA o algun script depende de esas filas?
console.log('\n=== dependencias del label en el codigo ===');
['js/app.js','js/app.min.js','js/shop-buttons.js','build-guides.js','build-deals.js','scripts/seo-audit.js'].forEach(f => {
  const p = BASE + f;
  if (!fs.existsSync(p)) { console.log('  ' + f + ': no existe'); return; }
  const s = fs.readFileSync(p,'utf8');
  const hits = ['Estimated Price','Precio estimado','Price Tier','Price (USD)'].filter(k => s.indexOf(k) > -1);
  console.log('  ' + f.padEnd(24) + (hits.length ? 'menciona: ' + hits.join(', ') : 'ninguna mencion'));
});

// 3) ¿alguna guia se queda SIN filas si quito el precio? (minimo 1 fila)
console.log('\n=== impacto por guia ===');
let sinFilas = 0, quitan = 0;
guides.forEach(g => {
  if (g.productTable) {
    const n = g.productTable.rows.length;
    const quito = g.productTable.rows.filter(r => /^(estimated price|precio estimado|price \(usd\)|price|precio)$/i.test(String(r.label).trim()));
    if (quito.length) { quitan += quito.length; if (n - quito.length < 1) { sinFilas++; console.log('  !! ' + g.id + ' se quedaria con ' + (n-quito.length) + ' filas'); } }
  }
  if (g.comparison && Array.isArray(g.comparison.rows)) {
    const n = g.comparison.rows.length;
    const quito = g.comparison.rows.filter(r => /^(estimated price|precio estimado|price \(usd\)|price|precio)$/i.test(String(r.label).trim()));
    if (quito.length) { quitan += quito.length; if (n - quito.length < 1) { sinFilas++; console.log('  !! ' + g.id + ' se quedaria con ' + (n-quito.length) + ' filas'); } }
  }
});
console.log('filas a quitar: ' + quitan + ' | guias que se quedarian sin filas: ' + sinFilas);

// 4) ¿alguna tabla tiene ya OTRA fila de precio con otro nombre?
console.log('\n=== otras filas sospechosas de ser precio ===');
guides.forEach(g => {
  const rows = (g.productTable ? g.productTable.rows : (g.comparison ? g.comparison.rows : [])) || [];
  rows.forEach(r => {
    const l = String(r.label||'');
    if (!/^(estimated price|precio estimado|price \(usd\)|price|precio)$/i.test(l.trim()) && /(price|precio|cost|msrp|€|\$|£)/i.test(l))
      console.log('  ' + g.id + ' | "' + l + '" | ' + (r.values ? r.values.map(v=>v.value).slice(0,3).join(' | ') : Object.values(r).filter(v=>typeof v==='string').slice(1,4).join(' | ')));
  });
});