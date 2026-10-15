// ESTRICTO: el codigo de modelo (token con digitos) de la tabla/veredicto debe
// aparecer EXACTAMENTE en el producto del catalogo. Si no, el nombre se quedo viejo.
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
const P = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : P.products;

const norm = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const IGN = ['the','a','an','and','with','for','of','in','pro','plus','series','each','set','pair',
  'mkii','mk','iii','ii','gen','version','power','powered','speaker','microphone','mic','digital','usb',
  'xlr','guitar','bass','pedal','keyboard','audio','studio','wireless','system','interface','monitor',
  'headphones','synth','synthesizer','sampler','drum','mixer','amplifier','plugin','bundle','edition',
  'complete','black','white','model','original','classic','pack','condenser','shotgun','dynamic',
  'cardioid','reference','best','premium','standard','vocal','kit','zone','core','evo'];
const key = s => norm(s).split(' ').filter(w => w.length > 1 && IGN.indexOf(w) < 0);
const codigo = s => key(s).find(w => /\d/.test(w)) || null;

const nombres = new Map();  // nombre -> Set(gid)
guides.forEach(g => {
  const meter = n => {
    if (!n) return;
    const k = norm(n);
    if (!nombres.has(n)) nombres.set(n, new Set());
    nombres.get(n).add(g.id);
  };
  if (g.productTable) g.productTable.columns.forEach(c => meter(c.title));
  (g.verdictProsCons || []).forEach(v => meter(v.name || v.title));
});

const malos = [];
nombres.forEach((gids, nombre) => {
  const k = key(nombre);
  if (!k.length) return;
  const cod = codigo(nombre);
  const candidatos = arr.filter(p => {
    const kp = key(p.title);
    let i = -1, ok = true;
    for (const w of k) { i = kp.indexOf(w, i + 1); if (i < 0) { ok = false; break; } }
    return ok;
  });
  // caso 1: ningun producto contiene TODOS los tokens -> nombre generico/renombrado
  if (!candidatos.length) {
    malos.push({ nombre, gids: [...gids], motivo: 'ningun producto contiene todos sus tokens', cod, cand: null });
    return;
  }
  // caso 2: hay candidatos pero ninguno tiene el codigo de modelo -> nombre VIEJO
  if (cod) {
    const conCod = candidatos.filter(p => key(p.title).indexOf(cod) > -1);
    if (!conCod.length) {
      malos.push({ nombre, gids: [...gids], motivo: 'el codigo "' + cod + '" ya no existe', cod, cand: candidatos[0] });
    }
  }
});

console.log('=== NOMBRES VIEJOS (codigo de modelo que ya no existe) ===');
console.log('nombres distintos revisados: ' + nombres.size);
console.log('sospechosos: ' + malos.length + '\n');
const gInfo = id => { const g = guides.find(x => x.id === id); return g ? g.title_es : id; };
malos.forEach((m, i) => {
  console.log((i + 1) + '. ' + m.nombre);
  console.log('    ' + m.motivo);
  console.log('    catalogado mas cercano: ' + (m.cand ? m.cand.title + ' (id ' + m.cand.id + ')' : 'NINGUNO'));
  m.gids.forEach(g => console.log('    en: ' + gInfo(g) + '  [' + g + ']'));
  console.log('');
});
fs.writeFileSync(BASE + 'temp/stale_strict.txt', malos.map(m =>
  m.nombre + ' | ' + m.motivo + ' | catalogo: ' + (m.cand ? m.cand.title : 'NINGUNO') + ' | guias: ' + m.gids.join(',')
).join('\n'));
console.log('guardado: temp/stale_strict.txt');