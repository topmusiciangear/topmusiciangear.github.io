const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
const P = JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
const arr = Array.isArray(P) ? P : P.products;

['beatmaker-plugins','ai-tools-plugins','best-hardware-samplers'].forEach(id => {
  const g = guides.find(x=>x.id===id);
  const c = g.comparison || g.productTable;
  const cols = c.headers || c.columns.map(x=>x.title);
  console.log('\n############ ' + id + ' — ' + g.title);
  console.log('columnas: ' + cols.map((t,i)=>i+':'+t).join(' | '));
  const filas = c.rows || [];
  filas.forEach(r => {
    const vals = cols.map((_, j) => {
      const v = c.headers ? r['val' + (j===1?'':j)] : (r.values[j] ? r.values[j].value : '');
      return (v === undefined ? '<<VACIA>>' : (v === null ? '<<null>>' : String(v)));
    });
    console.log('  ' + (r.label||'?').padEnd(18) + ' | ' + vals.map(v => v.length > 34 ? v.slice(0,34) : v).join(' | '));
  });
});

console.log('\n\n=== FICHAS de los productos con celdas vacias ===');
['Baby Audio Transit 2','iZotope Neutron 5','Sonible smart:EQ 4','Mastering The Mix MIXVAULT','Sonible smart:limit','iZotope Trash','Teenage Engineering EP-133 K.O. II','Akai MPC Live III','Polyend Tracker Mini'].forEach(n => {
  const p = arr.find(x => x.title === n);
  if (!p) { console.log('\n  ' + n + ': NO ESTA EN EL CATALOGO'); return; }
  console.log('\n  ' + p.title + ' (id ' + p.id + ') $' + p.price);
  console.log('     desc: ' + String(p.desc||'').slice(0, 200));
});