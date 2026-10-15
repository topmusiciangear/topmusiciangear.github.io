const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));

// 1) el build depende de la fila de precio?
const b = fs.readFileSync(BASE+'build-guides.js','utf8');
console.log('=== referencias a "Estimated Price" en build-guides.js ===');
[...b.matchAll(/.{90}Estimated Price.{90}/gs)].slice(0,8).forEach(m=>console.log('  ...' + m[0].replace(/\s+/g,' ') + '...'));
console.log('\n=== otras referencias (price rows / precio) ===');
['priceRow','precioRow','rating row','"price"','\'price\''].forEach(k=>{
  const n = (b.split(k).length-1);
  if (n) console.log('  ' + k + ': ' + n + ' apariciones');
});
[...b.matchAll(/.{60}price rows.{100}/gs)].forEach(m=>console.log('  CONTEXTO: ...' + m[0].replace(/\s+/g,' ') + '...'));

// 2) que filas de precio hay
console.log('\n\n=== FILAS DE PRECIO EN TODAS LAS TABLAS ===');
const PRECIO = /precio|price|cost|coste|from \$|from €/i;
const porLabel = {};
const filas = [];
guides.forEach(g => {
  const meter = (label, label_es, esquema) => {
    if (!PRECIO.test(label || '')) return;
    (porLabel[label + ' / ' + (label_es||'')] = porLabel[label + ' / ' + (label_es||'')] || []).push(g.id + ' [' + esquema + ']');
    filas.push({ gid: g.id, label, esquema });
  };
  if (g.productTable) g.productTable.rows.forEach(r => meter(r.label, r.label_es, 'productTable'));
  if (g.comparison && Array.isArray(g.comparison.rows)) g.comparison.rows.forEach(r => meter(r.label, r.label_es, 'comparison'));
});
console.log('total de filas de precio: ' + filas.length + '\n');
Object.keys(porLabel).sort().forEach(k => {
  console.log('  "' + k + '" -> ' + porLabel[k].length + ' guias');
  console.log('      ' + porLabel[k].join(', '));
});
fs.writeFileSync(BASE+'temp/filas_precio.txt', filas.map(f=>f.gid+' | '+f.esquema+' | '+f.label).join('\n'));