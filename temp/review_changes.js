// Revision de las 2 afirmaciones del usuario contra las reglas del sitio
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));

// 1) ¿El sitio traduce las cabeceras de tabla al español?
console.log('=== CONVENCION DEL SITIO: cabeceras de tabla EN vs ES ===');
const muestras = ['best-monitors','best-microphone','live-sound-pa','budget-mics','best-headphones'];
muestras.forEach(id=>{
  const g = guides.find(x=>x.id===id);
  if(!g || !g.productTable) return;
  console.log('\n' + id + ':');
  g.productTable.rows.slice(0,6).forEach(r=>{
    console.log('  EN "' + r.label + '"   ->   ES "' + (r.label_es||'(SIN CAMPO)') + '"');
  });
});

// 2) ¿hay alguna guia con cabeceras de tabla en ingles en la version ES?
console.log('\n\n=== ¿ALGUNA GUIA USA INGLES EN LAS CABECERAS ES? ===');
const guias = guides.filter(g=>g.productTable);
console.log('guias con productTable: ' + guias.length);
let sinTraducir = 0, conTraducir = 0;
const detalle = [];
guias.forEach(g=>{
  const rows = g.productTable.rows||[];
  const sinEs = rows.filter(r=>!r.label_es || r.label_es===r.label).length;
  if (sinEs===rows.length && rows.length) { sinTraducir++; detalle.push(g.id+' ('+rows.length+' filas sin traducir)'); }
  else conTraducir++;
});
console.log('guias con cabeceras 100% traducidas al ES: ' + conTraducir);
console.log('guias con cabeceras sin traducir:           ' + sinTraducir);
detalle.slice(0,10).forEach(d=>console.log('  ' + d));

// 3) el problema de la fila "Signal Chain Role": ¿los 3 valores son iguales?
console.log('\n\n=== FILA DE ROL: ¿justifica los precios? ===');
const s = guides.find(x=>x.id==='starter-studio');
const fila = s.productTable.rows[0];
console.log('etiqueta: "' + fila.label + '"');
fila.values.forEach((v,i)=>{
  console.log('  col' + i + ' (' + s.productTable.columns[i].title + '): "' + v.value + '"');
});
const unicos = [...new Set(fila.values.map(v=>v.value))];
console.log('valores distintos: ' + unicos.length + ' -> ' + (unicos.length===1 ? 'TODOS IGUALES: la fila no aporta informacion' : 'ok'));

// 4) title / title_es coherentes
console.log('\n\n=== TITULOS ===');
['starter-studio'].forEach(id=>{
  const g = guides.find(x=>x.id===id);
  console.log('  title      : ' + g.title);
  console.log('  titleTag   : ' + g.titleTag);
  console.log('  title_es   : ' + g.title_es);
  console.log('  titleTag_es: ' + g.titleTag_es);
  console.log('  -> title_es y titleTag_es distintos? ' + (g.title_es !== g.titleTag_es));
});