// DETECTA NOMBRES VIEJOS: lo que pone en tabla/veredictos que ya no existe
// en el catalogo (porque lo renombramos, lo cambiamos o lo quitamos)
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
const P = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : P.products;

const norm = s => String(s).toLowerCase().replace(/\([^)]*\)/g, ' ').replace(/[^a-z0-9]+/g, ' ').trim();
const IGN = ['the','a','an','and','with','for','of','in','pro','plus','series','each','set','pair',
  'mkii','mk','ii','iii','gen','version','power','powered','speaker','microphone','mic','digital','usb',
  'xlr','guitar','bass','pedal','keyboard','audio','studio','wireless','system','interface','monitor',
  'headphones','synth','synthesizer','sampler','drum','mixer','amplifier','plugin','bundle','edition',
  'complete','black','white','model','original','classic','ptm','twin','stereo'];
const key = s => norm(s).split(' ').filter(w => w.length > 1 && IGN.indexOf(w) < 0);

// resuelve un nombre de tabla/veredicto contra un producto del catalogo
function resuelve(nombre) {
  const n = norm(nombre);
  if (!n) return null;
  // 1) titulo exacto (normalizado)
  let hit = arr.find(p => norm(p.title) === n);
  if (hit) return { p: hit, como: 'exacto' };
  // 2) el titulo empieza por el nombre  ("UA Del-Verb" -> "Universal Audio Del-Verb" no, pero
  //    "Boss DD-8 digital Delay" -> "Boss DD-8 Digital Delay")
  hit = arr.find(p => { const t = norm(p.title); return t.indexOf(n) === 0 || n.indexOf(t) === 0; });
  if (hit) return { p: hit, como: 'prefijo' };
  // 3) coincidencia por tokens significativos
  const k = key(nombre);
  if (!k.length) return null;
  let mejor = null, mejorScore = 0;
  arr.forEach(p => {
    const kp = key(p.title);
    if (!kp.length) return;
    const inter = k.filter(w => kp.indexOf(w) > -1).length;
    const score = inter / Math.max(k.length, kp.length);
    if (inter >= 2 && score > mejorScore) { mejorScore = score; mejor = p; }
  });
  if (mejor && mejorScore >= 0.45) return { p: mejor, como: 'parecido (' + Math.round(mejorScore * 100) + '%)' };
  return null;
}

const filas = [];
guides.forEach(g => {
  const vistos = new Map();
  const meter = (n, donde) => {
    if (!n) return;
    const k = donde + '||' + norm(n);
    if (vistos.has(k)) return;
    vistos.set(k, true);
    const r = resuelve(n);
    if (!r) {
      if (!filas.some(f => f.gid === g.id && f.nombre === n)) filas.push({ gid: g.id, titulo: g.title_es, nombre: n, donde: [] });
      const f = filas.find(x => x.gid === g.id && x.nombre === n);
      if (f && f.donde.indexOf(donde) < 0) f.donde.push(donde);
    }
  };
  if (g.productTable) g.productTable.columns.forEach(c => meter(c.title, 'TABLA'));
  (g.verdictProsCons || []).forEach(v => meter(v.name || v.title, 'VEREDICTOS'));
  (g.featuredSnippet && g.featuredSnippet.verdictProducts ? [] : []);
});

console.log('=== NOMBRES VIEJOS EN TABLA / VEREDICTOS ===');
console.log('guias revisadas: ' + guides.length);
console.log('nombres que NO existen en el catalogo: ' + filas.length + '\n');
filas.forEach((f, i) => {
  console.log((i + 1) + '. ' + f.nombre + '   [' + f.donde.join(' + ') + ']');
  console.log('    guia: ' + f.titulo + '  (' + f.gid + ')');
  const r = resuelve(f.nombre);
  const sugerencia = arr.filter(p => {
    const n = norm(f.nombre);
    const t = norm(p.title);
    return t.indexOf(n.split(' ').slice(-1)[0]) > -1 || n.split(' ').slice(-1)[0] === norm(p.title).split(' ')[0];
  });
  console.log('');
});
fs.writeFileSync(BASE + 'temp/stale_names.txt', filas.map(f => f.gid + ' | ' + f.nombre + ' | ' + f.donde.join('+')).join('\n'));
console.log('guardado: temp/stale_names.txt');