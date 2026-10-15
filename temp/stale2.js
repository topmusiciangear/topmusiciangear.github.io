const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
const P = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
const norm = s => String(s).toLowerCase().replace(/\([^)]*\)/g, ' ').replace(/[^a-z0-9]+/g, ' ').trim();
const IGN = ['the','a','an','and','with','for','of','in','pro','plus','series','each','set','pair','mkii','mk','ii','iii','gen','version','power','powered','speaker','microphone','mic','digital','usb','xlr','guitar','bass','pedal','keyboard','audio','studio','wireless','system','interface','monitor','headphones','synth','synthesizer','sampler','drum','mixer','amplifier','plugin','bundle','edition','complete','black','white','model','original','classic','twin'];
const key = s => norm(s).split(' ').filter(w => w.length > 1 && IGN.indexOf(w) < 0);

// etiqueta corta = TODOS sus tokens aparecen, en ese orden, dentro de algun titulo
function esEtiquetaCorta(nombre) {
  const k = key(nombre);
  if (!k.length) return null;
  for (const p of arr) {
    const t = norm(p.title);
    let i = -1, ok = true;
    for (const w of k) { i = t.indexOf(w, i + 1); if (i < 0) { ok = false; break; } }
    if (ok) return p;
  }
  return null;
}

const filas = [];
guides.forEach(g => {
  const meter = (n, donde) => {
    if (!n) return;
    if (!filas.some(f => f.gid === g.id && f.nombre === n)) filas.push({ gid: g.id, titulo: g.title_es, nombre: n, donde: [] });
    const f = filas.find(x => x.gid === g.id && x.nombre === n);
    if (f.donde.indexOf(donde) < 0) f.donde.push(donde);
  };
  if (g.productTable) g.productTable.columns.forEach(c => meter(c.title, 'TABLA'));
  (g.verdictProsCons || []).forEach(v => meter(v.name || v.title, 'VEREDICTOS'));
});

const resuelto = [], obsoleto = [];
filas.forEach(f => {
  const corto = esEtiquetaCorta(f.nombre);
  if (corto) resuelto.push({ ...f, real: corto.title, id: corto.id });
  else {
    // buscar lo mas parecido en el catalogo
    let mejor = null, ms = 0;
    arr.forEach(p => {
      const a = key(f.nombre), b = key(p.title);
      const inter = a.filter(w => b.indexOf(w) > -1).length;
      const sc = inter / Math.max(a.length || 1, b.length || 1);
      if (inter >= 1 && sc > ms) { ms = sc; mejor = p; }
    });
    obsoleto.push({ ...f, parcido: mejor ? mejor.title + ' (id ' + mejor.id + ', ' + Math.round(ms * 100) + '%)' : 'nada parecido' });
  }
});

console.log('################ OBSOLETOS: el nombre NO corresponde a ningun producto');
console.log('(no es etiqueta corta, no es renombrado: es un nombre que se quedo)\n');
obsoleto.forEach((f, i) => {
  console.log((i + 1) + '. ' + f.nombre + '   [' + f.donde.join(' + ') + ']');
  console.log('    ' + f.titulo + '   [' + f.gid + ']');
  console.log('    lo más parecido en el catálogo: ' + f.parcido);
});
console.log('\n\n################ etiquetas cortas (correctas, no tocar): ' + resuelto.length);
resuelto.forEach(f => console.log('  ' + f.nombre.padEnd(28) + ' -> ' + f.real));