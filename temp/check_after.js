const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));

console.log('=== guias con tabla (productTable o comparison) y 0 filas ===');
['best-samplers-drum-computers','compact-rhythm-devices'].forEach(id => {
  const g = guides.find(x=>x.id===id);
  const t = g.productTable, c = g.comparison;
  console.log('\n' + id + ':');
  console.log('  productTable: ' + (t ? (t.columns.length) + ' col, ' + t.rows.length + ' filas' : 'no existe'));
  console.log('  comparison  : ' + (c ? ('headers=' + (c.headers ? c.headers.length : 'sin headers') + ', rows=' + (c.rows ? c.rows.length : 0)) : 'no existe'));
  if (c && !c.headers && (!c.rows || !c.rows.length)) console.log('  -> la tabla NUNCA se renderizo (sin cabeceras): inofensivo');
});

console.log('\n=== Price Tier pendiente de limpiar ===');
guides.forEach(g => {
  const rows = (g.productTable ? g.productTable.rows : (g.comparison ? g.comparison.rows : [])) || [];
  rows.forEach(r => {
    if (/^price tier|^gama de precios$/i.test(String(r.label||'').trim())) {
      console.log('\n  ' + g.id + ' | ' + r.label);
      const vals = Array.isArray(r.values) ? r.values.map(v=>v.value) : Object.keys(r).filter(k=>/^val/.test(k)).map(k=>r[k]);
      console.log('     EN: ' + vals.join(' | '));
      if (r.values && r.values[0]) console.log('     ES: ' + r.values.map(v=>v.value_es).join(' | '));
    }
  });
});