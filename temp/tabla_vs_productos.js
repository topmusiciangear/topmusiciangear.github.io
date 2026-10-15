// COMPARA, por guia: productos REALES de la guia (ids) vs nombres de la tabla
// Si el numero coincide pero los miembros no -> hubo un reemplazo sin renombrar
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
const P = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
const byId = {}; arr.forEach(p => byId[p.id] = p);

const norm = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const IGN = ['the','a','an','and','with','for','of','in','pro','plus','series','each','set','pair','mkii','mk',
  'iii','ii','gen','version','power','powered','speaker','microphone','mic','digital','usb','xlr','guitar',
  'bass','pedal','keyboard','audio','studio','wireless','system','interface','monitor','headphones','synth',
  'synthesizer','sampler','drum','mixer','amplifier','plugin','bundle','edition','complete','black','white',
  'model','original','classic','pack','condenser','shotgun','dynamic','cardioid','vocal','kit','zone','core',
  'evo','reference','premium','standard','best','twin','stereo','pro'];
const key = s => norm(s).split(' ').filter(w => w.length > 1 && IGN.indexOf(w) < 0);
const codigo = s => key(s).find(w => /\d/.test(w)) || null;

// un nombre de tabla -> id de producto del catalogo (exacto, o etiqueta corta con mismo codigo)
function aId(nombre) {
  const n = norm(nombre);
  if (!n) return null;
  let p = arr.find(x => norm(x.title) === n);
  if (p) return p;
  const k = key(nombre), cod = codigo(nombre);
  const cands = arr.filter(x => {
    const kp = key(x.title);
    let i = -1, ok = true;
    for (const w of k) { i = kp.indexOf(w, i + 1); if (i < 0) { ok = false; break; } }
    return ok;
  });
  if (cod) {
    const exact = cands.filter(x => key(x.title).indexOf(cod) > -1);
    if (exact.length === 1) return exact[0];
    if (exact.length > 1) return exact[0];
  }
  if (cands.length === 1) return cands[0];
  if (cands.length > 1) {
    // desempate: el de titulo mas corto que contenga todos los tokens
    return cands.slice().sort((a, b) => key(a.title).length - key(b.title).length)[0];
  }
  return null;
}

const filas = [];
guides.forEach(g => {
  if (!g.productTable) return;
  const cols = g.productTable.columns.map(c => c.title);
  const ids = new Set();
  (g.featuredProducts || []).forEach(i => { if (byId[i]) ids.add(i); });
  (g.sections || []).forEach(s => (s.products || []).forEach(i => { if (byId[i]) ids.add(i); }));
  const reales = [...ids].map(i => ({ id: i, t: byId[i].title }));

  const colResueltos = cols.map(c => ({ nombre: c, prod: aId(c) }));
  const enTabla = new Set(colResueltos.filter(c => c.prod).map(c => c.prod.id));
  const sinResolver = colResueltos.filter(c => !c.prod).map(c => c.nombre);
  // productos reales que NO estan en la tabla
  const fuera = reales.filter(r => !enTabla.has(r.id));
  // filas de tabla que apuntan a un producto que no esta en la guia
  const ajenos = colResueltos.filter(c => c.prod && !ids.has(c.prod.id)).map(c => c.nombre + '  ->  ' + c.prod.title + ' (id ' + c.prod.id + ')');

  if (sinResolver.length || fuera.length || ajenos.length) {
    filas.push({ g, nCols: cols.length, nReales: reales.length, sinResolver, fuera, ajenos });
  }
});

console.log('=== GUIAS: productos reales vs tabla ===');
console.log('guias con productTable: ' + guides.filter(g => g.productTable).length);
console.log('con desajuste: ' + filas.length + '\n');
filas.forEach((r, i) => {
  console.log((i + 1) + '. ' + r.g.title_es + '  [' + r.g.id + ']');
  console.log('   productos en la guia: ' + r.nReales + ' | columnas en la tabla: ' + r.nCols +
    (r.nReales === r.nCols ? '   <-- MISMA CANTIDAD' : ''));
  if (r.sinResolver.length) console.log('   A) nombres de tabla que NO son ningun producto: ' + r.sinResolver.join(' ; '));
  if (r.ajenos.length)    console.log('   B) filas que apuntan a un producto de OTRA guia: ' + r.ajenos.join(' ; '));
  if (r.fuera.length)     console.log('   C) productos de la guia SIN fila en la tabla: ' + r.fuera.map(x => x.t + ' (id ' + x.id + ')').join(' ; '));
  console.log('');
});
fs.writeFileSync(BASE + 'temp/tabla_vs_productos.txt', filas.map((r, i) =>
  (i + 1) + '. ' + r.gid + ' | ' + r.g.title_es + ' | tabla ' + r.nCols + ' vs productos ' + r.nReales +
  ' | A: ' + (r.sinResolver.join('; ') || '-') + ' | B: ' + (r.ajenos.join('; ') || '-') +
  ' | C: ' + (r.fuera.map(x => x.t).join('; ') || '-')
).join('\n'));
console.log('guardado: temp/tabla_vs_productos.txt');